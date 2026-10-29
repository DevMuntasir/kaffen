from pathlib import Path
import subprocess,json,re
root=Path(__file__).resolve().parents[1]
items=[('midnight-hero.webp','photo-1514432324607-a09d9b4aefdd',1600),('journey-selection.webp','photo-1611854779393-1b2da9d400fe',700),('journey-roast.webp','photo-1495474472287-4d71bcdd2085',700),('journey-finish.webp','photo-1514432324607-a09d9b4aefdd',700),('midnight-mobile.webp','photo-1511920170033-f8396924c348',1000)]
manifest=[]
for name,photo,width in items:
 url=f'https://images.unsplash.com/{photo}?q=85&w={width}&auto=format&fit=crop&fm=webp'
 subprocess.run(['curl','-fLsS','--retry','2',url,'-o',str(root/'public/images'/name)],check=True)
 manifest.append({'file':'/images/'+name,'source':url})
for name,family in [('playfair','Playfair+Display:ital,wght@0,400;1,400'),('inter','Inter:wght@300;400;500;600')]:
 css=subprocess.check_output(['curl','-fLsS','https://fonts.googleapis.com/css2?family='+family+'&display=swap']).decode()
 for i,url in enumerate(dict.fromkeys(re.findall(r'url\((https[^)]+)\)',css))):
  filename=name+'-'+str(i)+'.ttf'
  subprocess.run(['curl','-fLsS',url,'-o',str(root/'public/fonts'/filename)],check=True)
  css=css.replace(url,'/fonts/'+filename)
 (root/'src/styles'/(name+'.css')).write_text(css)
(root/'docs/obsidian-assets.json').write_text(json.dumps(manifest,indent=2))
print('Reference images and fonts downloaded')
