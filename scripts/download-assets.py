"""Download the visible reference assets. Source URLs are retained in the manifest."""
import concurrent.futures, json, pathlib, re, urllib.request, subprocess
root = pathlib.Path(__file__).resolve().parents[1]
html = pathlib.Path('/tmp/kaffen.html').read_text()
urls = list(dict.fromkeys(re.findall(r'https://kaffen\.bslthemes\.com/wp-content/uploads/[^\s\"<>\)\']+\.(?:jpg|png|webp)', html)))
def download(url):
    path = root / 'public/images' / url.rsplit('/', 1)[-1]
    subprocess.run(['curl','-fLsS','--retry','2',url,'-o',str(path)],check=True)
    return { 'file': '/images/' + path.name, 'source': url }
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    assets = list(pool.map(download, urls))
(root / 'docs/asset-sources.json').write_text(json.dumps(assets, indent=2))
for name, family in [('oswald','Oswald:wght@300;400;500;600'),('roboto','Roboto:wght@400;500;700'),('merienda','Merienda:wght@400')]:
    req = urllib.request.Request('https://fonts.googleapis.com/css2?family='+family+'&display=swap', headers={'User-Agent':'Mozilla/5.0'})
    css = subprocess.check_output(['curl','-fLsS',req.full_url]).decode()
    for i,url in enumerate(dict.fromkeys(re.findall(r'url\((https[^)]+)\)',css))):
        filename = name + '-' + str(i) + '.woff2'
        subprocess.run(['curl','-fLsS',url,'-o',str(root / 'public/fonts' / filename)],check=True)
        css = css.replace(url, '/fonts/' + filename)
    (root / 'src/styles' / (name + '.css')).write_text(css)
print('Downloaded',len(assets),'reference images and local fonts.')
