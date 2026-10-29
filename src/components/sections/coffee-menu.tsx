import { SectionHeading } from "@/components/ui/section-heading";
import { Photo } from "@/components/ui/photo";
import { menuItems } from "@/data/site";
export function CoffeeMenu() { return <section id="menu" className="section menu-section"><div className="container"><SectionHeading eyebrow="Choose best coffee" title="Popular Coffee Menu" centered/><div className="coffee-menu">{menuItems.map(item => <article className="menu-item" key={item.name}><Photo file={item.image} alt={item.name} width={150} height={160}/><div><h3>{item.name}</h3><p>2/3 espresso, 1/3 steamed milk</p><div className="menu-price"><span/>${item.price}</div></div></article>)}</div></div></section>; }
