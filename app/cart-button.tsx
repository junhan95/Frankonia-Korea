"use client";

import { cartMeta, cartPath } from "./cart-sections";
import { clearCart, removeItem, useCart } from "./cart-store";
import { localeRoute, type Lang } from "./site-config";
import SiteLink from "./site-link";

/**
 * MyCart in the header — the icon, the count on it, and the panel that opens
 * under it.
 *
 * It sits outside `nav.menu`, between the menu and the language switch, and
 * that placement is the point: the menu is where a reader goes to find
 * something, and this is where they go to see what they have already found.
 * It is also why it survives the 1240px fold that hides the menu into the
 * drawer — a basket a reader cannot see on a phone is a basket they forget
 * they filled. The panel does not survive it (there is no hover on touch);
 * below that width the icon is a link to the page and nothing else.
 *
 * The panel opens on hover and on focus, like every other panel in this bar.
 * It is a peek rather than a second cart page: the names, a way to take one
 * back out, and the way through to the page that can actually send them. Five
 * at most, because a panel that scrolls is a page.
 *
 * The only client component in the header besides the drawer and the language
 * switch. It carries no route table and no label set — `cart-sections` is two
 * dozen lines — so the bar stays server-rendered around it.
 */

const copy = {
  ko: {
    heading: "담긴 제품",
    empty: "아직 담긴 제품이 없습니다.",
    hint: "My Chamber 결과나 모델 목록에서 담아 두시면 여기에 모입니다.",
    more: (n: number) => `외 ${n}개`,
    open: "My Enquiry 열기",
    clear: "비우기",
    remove: (name: string) => `${name} 빼기`,
  },
  en: {
    heading: "In your cart",
    empty: "Nothing in the cart yet.",
    hint: "Add a chamber from a My Chamber result or from any model list and it collects here.",
    more: (n: number) => `and ${n} more`,
    open: "Open My Enquiry",
    clear: "Empty it",
    remove: (name: string) => `Remove ${name}`,
  },
} as const;

/** How many names the panel prints before it stops counting them out. */
const PEEK = 5;

export default function CartButton({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const meta = cartMeta[lang];
  const items = useCart();
  const href = localeRoute(lang, cartPath);
  const shown = items.slice(0, PEEK);
  const rest = items.length - shown.length;

  return (
    <div className="cart">
      <SiteLink
        className={items.length > 0 ? "cart-btn has-items" : "cart-btn"}
        href={href}
        aria-label={items.length > 0 ? meta.aria(items.length) : meta.ariaEmpty}
      >
        <svg className="cart-ico" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M2.5 4h2.6l2.4 10.6a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20.8 8H6" />
          <circle cx="10" cy="19.6" r="1.4" />
          <circle cx="17.4" cy="19.6" r="1.4" />
        </svg>
        {/* Hidden from assistive technology because the link's own name above
            already carries the count in words. */}
        {items.length > 0 && (
          <span className="cart-count" aria-hidden="true">{items.length}</span>
        )}
      </SiteLink>

      <div className="cart-peek">
        <div className="cart-panel">
          {items.length === 0 ? (
            <div className="cart-panel-empty">
              <b>{t.empty}</b>
              <span>{t.hint}</span>
            </div>
          ) : (
            <>
              <h6 className="cart-panel-h">
                {t.heading}
                <span>{items.length}</span>
              </h6>
              <ul className="cart-peek-list">
                {shown.map((item) => (
                  <li key={item.id}>
                    <span className="cart-peek-name">
                      <b>{item.name}</b>
                      {item.desc && <span>{item.desc}</span>}
                    </span>
                    <button
                      type="button"
                      className="cart-x"
                      aria-label={t.remove(item.name)}
                      onClick={() => removeItem(item.id)}
                    >
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M4 4l8 8M12 4l-8 8" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
              {rest > 0 && <p className="cart-peek-more">{t.more(rest)}</p>}
            </>
          )}
          <div className="cart-panel-foot">
            <SiteLink href={href}>{t.open}<span aria-hidden="true"> →</span></SiteLink>
            {items.length > 0 && (
              <button type="button" className="cart-clear" onClick={clearCart}>
                {t.clear}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
