/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const li = globalThis, Kn = li.ShadowRoot && (li.ShadyCSS === void 0 || li.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Gn = Symbol(), Lo = /* @__PURE__ */ new WeakMap();
let ds = class {
  constructor(e, i, n) {
    if (this._$cssResult$ = !0, n !== Gn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Kn && e === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (e = Lo.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Lo.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ja = (t) => new ds(typeof t == "string" ? t : t + "", void 0, Gn), Z = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((n, o, r) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[r + 1], t[0]);
  return new ds(i, t, Gn);
}, Qa = (t, e) => {
  if (Kn) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const n = document.createElement("style"), o = li.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, t.appendChild(n);
  }
}, Ho = Kn ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return Ja(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: el, defineProperty: tl, getOwnPropertyDescriptor: il, getOwnPropertyNames: nl, getOwnPropertySymbols: ol, getPrototypeOf: rl } = Object, Ue = globalThis, Bo = Ue.trustedTypes, sl = Bo ? Bo.emptyScript : "", Vi = Ue.reactiveElementPolyfillSupport, Pt = (t, e) => t, di = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? sl : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, Yn = (t, e) => !el(t, e), Fo = { attribute: !0, type: String, converter: di, reflect: !1, useDefault: !1, hasChanged: Yn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Ue.litPropertyMetadata ?? (Ue.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let _t = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Fo) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(e, n, i);
      o !== void 0 && tl(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, n) {
    const { get: o, set: r } = il(this.prototype, e) ?? { get() {
      return this[i];
    }, set(s) {
      this[i] = s;
    } };
    return { get: o, set(s) {
      const a = o == null ? void 0 : o.call(this);
      r == null || r.call(this, s), this.requestUpdate(e, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Fo;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Pt("elementProperties"))) return;
    const e = rl(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Pt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Pt("properties"))) {
      const i = this.properties, n = [...nl(i), ...ol(i)];
      for (const o of n) this.createProperty(o, i[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [n, o] of i) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const o = this._$Eu(i, n);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const o of n) i.unshift(Ho(o));
    } else e !== void 0 && i.push(Ho(e));
    return i;
  }
  static _$Eu(e, i) {
    const n = i.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((i) => this.enableUpdating = i), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((i) => i(this));
  }
  addController(e) {
    var i;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) == null || i.call(e));
  }
  removeController(e) {
    var i;
    (i = this._$EO) == null || i.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const n of i.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Qa(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((i) => {
      var n;
      return (n = i.hostConnected) == null ? void 0 : n.call(i);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var n;
      return (n = i.hostDisconnected) == null ? void 0 : n.call(i);
    });
  }
  attributeChangedCallback(e, i, n) {
    this._$AK(e, n);
  }
  _$ET(e, i) {
    var r;
    const n = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, n);
    if (o !== void 0 && n.reflect === !0) {
      const s = (((r = n.converter) == null ? void 0 : r.toAttribute) !== void 0 ? n.converter : di).toAttribute(i, n.type);
      this._$Em = e, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var r, s;
    const n = this.constructor, o = n._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = n.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((r = a.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? a.converter : di;
      this._$Em = o;
      const c = l.fromAttribute(i, a.type);
      this[o] = c ?? ((s = this._$Ej) == null ? void 0 : s.get(o)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, i, n, o = !1, r) {
    var s;
    if (e !== void 0) {
      const a = this.constructor;
      if (o === !1 && (r = this[e]), n ?? (n = a.getPropertyOptions(e)), !((n.hasChanged ?? Yn)(r, i) || n.useDefault && n.reflect && r === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(a._$Eu(e, n)))) return;
      this.C(e, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: n, reflect: o, wrapped: r }, s) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? i ?? this[e]), r !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var n;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, s] of this._$Ep) this[r] = s;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, s] of o) {
        const { wrapped: a } = s, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, s, l);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (n = this._$EO) == null || n.forEach((o) => {
        var r;
        return (r = o.hostUpdate) == null ? void 0 : r.call(o);
      }), this.update(i)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$EO) == null || i.forEach((n) => {
      var o;
      return (o = n.hostUpdated) == null ? void 0 : o.call(n);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
_t.elementStyles = [], _t.shadowRootOptions = { mode: "open" }, _t[Pt("elementProperties")] = /* @__PURE__ */ new Map(), _t[Pt("finalized")] = /* @__PURE__ */ new Map(), Vi == null || Vi({ ReactiveElement: _t }), (Ue.reactiveElementVersions ?? (Ue.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const It = globalThis, Vo = (t) => t, hi = It.trustedTypes, Uo = hi ? hi.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, hs = "$lit$", Ve = `lit$${Math.random().toFixed(9).slice(2)}$`, us = "?" + Ve, al = `<${us}>`, it = document, Ot = () => it.createComment(""), Rt = (t) => t === null || typeof t != "object" && typeof t != "function", Xn = Array.isArray, ll = (t) => Xn(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Ui = `[ 	
\f\r]`, wt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Wo = /-->/g, jo = />/g, Ye = RegExp(`>|${Ui}(?:([^\\s"'>=/]+)(${Ui}*=${Ui}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ko = /'/g, Go = /"/g, ps = /^(?:script|style|textarea|title)$/i, _s = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), f = _s(1), ve = _s(2), nt = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), Yo = /* @__PURE__ */ new WeakMap(), et = it.createTreeWalker(it, 129);
function ms(t, e) {
  if (!Xn(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Uo !== void 0 ? Uo.createHTML(e) : e;
}
const cl = (t, e) => {
  const i = t.length - 1, n = [];
  let o, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = wt;
  for (let a = 0; a < i; a++) {
    const l = t[a];
    let c, h, d = -1, p = 0;
    for (; p < l.length && (s.lastIndex = p, h = s.exec(l), h !== null); ) p = s.lastIndex, s === wt ? h[1] === "!--" ? s = Wo : h[1] !== void 0 ? s = jo : h[2] !== void 0 ? (ps.test(h[2]) && (o = RegExp("</" + h[2], "g")), s = Ye) : h[3] !== void 0 && (s = Ye) : s === Ye ? h[0] === ">" ? (s = o ?? wt, d = -1) : h[1] === void 0 ? d = -2 : (d = s.lastIndex - h[2].length, c = h[1], s = h[3] === void 0 ? Ye : h[3] === '"' ? Go : Ko) : s === Go || s === Ko ? s = Ye : s === Wo || s === jo ? s = wt : (s = Ye, o = void 0);
    const _ = s === Ye && t[a + 1].startsWith("/>") ? " " : "";
    r += s === wt ? l + al : d >= 0 ? (n.push(c), l.slice(0, d) + hs + l.slice(d) + Ve + _) : l + Ve + (d === -2 ? a : _);
  }
  return [ms(t, r + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class Nt {
  constructor({ strings: e, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let r = 0, s = 0;
    const a = e.length - 1, l = this.parts, [c, h] = cl(e, i);
    if (this.el = Nt.createElement(c, n), et.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (o = et.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const d of o.getAttributeNames()) if (d.endsWith(hs)) {
          const p = h[s++], _ = o.getAttribute(d).split(Ve), m = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: r, name: m[2], strings: _, ctor: m[1] === "." ? hl : m[1] === "?" ? ul : m[1] === "@" ? pl : Si }), o.removeAttribute(d);
        } else d.startsWith(Ve) && (l.push({ type: 6, index: r }), o.removeAttribute(d));
        if (ps.test(o.tagName)) {
          const d = o.textContent.split(Ve), p = d.length - 1;
          if (p > 0) {
            o.textContent = hi ? hi.emptyScript : "";
            for (let _ = 0; _ < p; _++) o.append(d[_], Ot()), et.nextNode(), l.push({ type: 2, index: ++r });
            o.append(d[p], Ot());
          }
        }
      } else if (o.nodeType === 8) if (o.data === us) l.push({ type: 2, index: r });
      else {
        let d = -1;
        for (; (d = o.data.indexOf(Ve, d + 1)) !== -1; ) l.push({ type: 7, index: r }), d += Ve.length - 1;
      }
      r++;
    }
  }
  static createElement(e, i) {
    const n = it.createElement("template");
    return n.innerHTML = e, n;
  }
}
function mt(t, e, i = t, n) {
  var s, a;
  if (e === nt) return e;
  let o = n !== void 0 ? (s = i._$Co) == null ? void 0 : s[n] : i._$Cl;
  const r = Rt(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== r && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), r === void 0 ? o = void 0 : (o = new r(t), o._$AT(t, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = o : i._$Cl = o), o !== void 0 && (e = mt(t, o._$AS(t, e.values), o, n)), e;
}
class dl {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: n } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? it).importNode(i, !0);
    et.currentNode = o;
    let r = et.nextNode(), s = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new Ht(r, r.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, e) : l.type === 6 && (c = new _l(r, this, e)), this._$AV.push(c), l = n[++a];
      }
      s !== (l == null ? void 0 : l.index) && (r = et.nextNode(), s++);
    }
    return et.currentNode = it, o;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
}
class Ht {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, n, o) {
    this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = mt(this, e, i), Rt(e) ? e === k || e == null || e === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : e !== this._$AH && e !== nt && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ll(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== k && Rt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(it.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var r;
    const { values: i, _$litType$: n } = e, o = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = Nt.createElement(ms(n.h, n.h[0]), this.options)), n);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === o) this._$AH.p(i);
    else {
      const s = new dl(o, this), a = s.u(this.options);
      s.p(i), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Yo.get(e.strings);
    return i === void 0 && Yo.set(e.strings, i = new Nt(e)), i;
  }
  k(e) {
    Xn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const r of e) o === i.length ? i.push(n = new Ht(this.O(Ot()), this.O(Ot()), this, this.options)) : n = i[o], n._$AI(r), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); e !== this._$AB; ) {
      const o = Vo(e).nextSibling;
      Vo(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class Si {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, o, r) {
    this.type = 1, this._$AH = k, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = k;
  }
  _$AI(e, i = this, n, o) {
    const r = this.strings;
    let s = !1;
    if (r === void 0) e = mt(this, e, i, 0), s = !Rt(e) || e !== this._$AH && e !== nt, s && (this._$AH = e);
    else {
      const a = e;
      let l, c;
      for (e = r[0], l = 0; l < r.length - 1; l++) c = mt(this, a[n + l], i, l), c === nt && (c = this._$AH[l]), s || (s = !Rt(c) || c !== this._$AH[l]), c === k ? e = k : e !== k && (e += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    s && !o && this.j(e);
  }
  j(e) {
    e === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class hl extends Si {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === k ? void 0 : e;
  }
}
class ul extends Si {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== k);
  }
}
class pl extends Si {
  constructor(e, i, n, o, r) {
    super(e, i, n, o, r), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = mt(this, e, i, 0) ?? k) === nt) return;
    const n = this._$AH, o = e === k && n !== k || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, r = e !== k && (n === k || o);
    o && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class _l {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    mt(this, e);
  }
}
const Wi = It.litHtmlPolyfillSupport;
Wi == null || Wi(Nt, Ht), (It.litHtmlVersions ?? (It.litHtmlVersions = [])).push("3.3.2");
const ml = (t, e, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? e;
  let o = n._$litPart$;
  if (o === void 0) {
    const r = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = o = new Ht(e.insertBefore(Ot(), r), r, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = globalThis;
let L = class extends _t {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ml(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return nt;
  }
};
var cs;
L._$litElement$ = !0, L.finalized = !0, (cs = tt.litElementHydrateSupport) == null || cs.call(tt, { LitElement: L });
const ji = tt.litElementPolyfillSupport;
ji == null || ji({ LitElement: L });
(tt.litElementVersions ?? (tt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fl = { attribute: !0, type: String, converter: di, reflect: !1, hasChanged: Yn }, yl = (t = fl, e, i) => {
  const { kind: n, metadata: o } = i;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), n === "setter" && ((t = Object.create(t)).wrapped = !0), r.set(i.name, t), n === "accessor") {
    const { name: s } = i;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(s, l, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, t, a), a;
    } };
  }
  if (n === "setter") {
    const { name: s } = i;
    return function(a) {
      const l = this[s];
      e.call(this, a), this.requestUpdate(s, l, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function I(t) {
  return (e, i) => typeof i == "object" ? yl(t, e, i) : ((n, o, r) => {
    const s = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, n), s ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function C(t) {
  return I({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gl = { ATTRIBUTE: 1 }, vl = (t) => (...e) => ({ _$litDirective$: t, values: e });
let bl = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, n) {
    this._$Ct = e, this._$AM = i, this._$Ci = n;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fs = "important", wl = " !" + fs, z = vl(class extends bl {
  constructor(t) {
    var e;
    if (super(t), t.type !== gl.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce((e, i) => {
      const n = t[i];
      return n == null ? e : e + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${n};`;
    }, "");
  }
  update(t, [e]) {
    const { style: i } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const n of this.ft) e[n] == null && (this.ft.delete(n), n.includes("-") ? i.removeProperty(n) : i[n] = null);
    for (const n in e) {
      const o = e[n];
      if (o != null) {
        this.ft.add(n);
        const r = typeof o == "string" && o.endsWith(wl);
        n.includes("-") || r ? i.setProperty(n, r ? o.slice(0, -11) : o, r ? fs : "") : i[n] = o;
      }
    }
    return nt;
  }
}), R = (t, e) => {
  if (e)
    return t.states[e];
}, F = (t, e) => {
  const i = R(t, e);
  if (!i)
    return null;
  const n = Number(i.state);
  return Number.isFinite(n) ? n : null;
}, W = (t, e) => {
  const i = R(t, e);
  if (!i)
    return;
  const n = i.attributes.unit_of_measurement;
  return typeof n == "string" ? n : void 0;
}, ci = (t, e) => {
  const i = R(t, e);
  return i == null ? void 0 : i.state;
}, ie = (t, e = "hybrid") => t === "history" || t === "statistics" || t === "hybrid" ? t : t === "auto" || e === "auto" ? "hybrid" : e, ys = 3e4, xl = 10 * 6e4, Sl = 1440, $l = 1e4, El = 2e3, gs = 40, $i = /* @__PURE__ */ new Map(), Ki = /* @__PURE__ */ new Map(), Gi = /* @__PURE__ */ new Map(), Xo = /* @__PURE__ */ new WeakMap(), Zo = /* @__PURE__ */ new WeakMap(), qo = /* @__PURE__ */ new WeakMap(), Jo = /* @__PURE__ */ new WeakMap(), Zn = (t, e = Sl) => {
  if (t.length <= e)
    return t;
  if (e <= 2)
    return [t[0], t[t.length - 1]];
  const i = t.slice(1, -1), n = Math.max(1, Math.floor((e - 2) / 2)), o = i.length / n, r = [t[0]];
  for (let l = 0; l < n; l += 1) {
    const c = Math.floor(l * o), h = Math.max(c + 1, Math.floor((l + 1) * o)), d = i.slice(c, h);
    if (d.length === 0)
      continue;
    let p = d[0], _ = d[0];
    for (const m of d)
      m.value < p.value && (p = m), m.value > _.value && (_ = m);
    if (p.ts <= _.ts ? (r.push(p), _ !== p && r.push(_)) : (r.push(_), p !== _ && r.push(p)), r.length >= e - 1)
      break;
  }
  if (r.push(t[t.length - 1]), r.length <= e)
    return r;
  const s = [r[0]], a = (r.length - 2) / (e - 2);
  for (let l = 0; l < e - 2; l += 1) {
    const c = 1 + Math.floor(l * a);
    s.push(r[c]);
  }
  return s.push(r[r.length - 1]), s;
}, vs = (t, e) => {
  const i = e ? $l : El;
  return !Number.isFinite(t) || t <= 0 || i <= 1 ? Math.max(0, Math.floor(t)) : Math.max(0, Math.floor(t / i) * i);
}, kl = (t) => {
  const e = (n) => {
    if (typeof n == "string") {
      const o = Date.parse(n);
      return Number.isFinite(o) ? o : null;
    }
    if (typeof n == "number" && Number.isFinite(n)) {
      if (n > 1e12)
        return Math.floor(n);
      if (n > 0)
        return Math.floor(n * 1e3);
    }
    return null;
  }, i = [
    t.last_changed,
    t.last_updated,
    t.last_changed_ts,
    t.last_updated_ts,
    // Some minimal/compact responses use short keys.
    t.lc,
    t.lu
  ];
  for (const n of i) {
    const o = e(n);
    if (o !== null)
      return o;
  }
  return null;
}, ui = (t, e, i) => {
  const n = [...t, ...e].filter((r) => Number.isFinite(r.ts) && Number.isFinite(r.value) && r.ts >= i).sort((r, s) => r.ts - s.ts);
  if (n.length <= 1)
    return n;
  const o = [];
  return n.forEach((r) => {
    const s = o[o.length - 1];
    if (s && Math.abs(s.ts - r.ts) <= 0.5) {
      o[o.length - 1] = r;
      return;
    }
    o.push(r);
  }), Zn(o);
}, Cl = (t, e, i = Date.now()) => {
  if (!Array.isArray(t))
    return { entityId: null, points: [] };
  const n = [];
  let o = null;
  for (const a of t) {
    if (!a || typeof a != "object")
      continue;
    const l = a;
    o === null && typeof l.entity_id == "string" && l.entity_id.length > 0 && (o = l.entity_id);
    const c = Number(l.state), h = kl(l);
    !Number.isFinite(c) || h === null || n.push({ ts: h, value: c });
  }
  const r = i - e, s = n.filter((a) => a.ts >= r).sort((a, l) => a.ts - l.ts);
  return {
    entityId: o,
    points: Zn(s)
  };
}, Ei = (t, e, i) => `${t}|${e}|${i}`, ae = (t) => t.map((e) => ({ ts: e.ts, value: e.value })), Yi = (t) => {
  if (typeof t == "string") {
    const e = Date.parse(t);
    return Number.isFinite(e) ? e : null;
  }
  if (typeof t == "number" && Number.isFinite(t)) {
    if (t > 1e12)
      return Math.floor(t);
    if (t > 0)
      return Math.floor(t * 1e3);
  }
  return null;
}, Tl = (t) => Yi(t.start) ?? Yi(t.end) ?? Yi(t.last_reset), zl = (t) => {
  const e = [
    t.state,
    t.mean,
    t.sum,
    t.max,
    t.min,
    t.change
  ];
  for (const i of e) {
    const n = Number(i);
    if (Number.isFinite(n))
      return n;
  }
  return null;
}, Ml = (t, e, i = Date.now()) => {
  if (!Array.isArray(t))
    return [];
  const n = [];
  t.forEach((s) => {
    if (!s || typeof s != "object")
      return;
    const a = s, l = Tl(a), c = zl(a);
    l === null || c === null || n.push({ ts: l, value: c });
  });
  const o = i - e, r = n.filter((s) => s.ts >= o).sort((s, a) => s.ts - a.ts);
  return Zn(r);
}, bs = (t) => {
  const e = Jo.get(t);
  if (e)
    return e;
  const i = /* @__PURE__ */ new Map();
  return Jo.set(t, i), i;
}, ws = (t, e, i) => {
  const n = bs(t), o = n.get(e);
  return o ? o.expiresAt <= i ? (n.delete(e), null) : o.supported : null;
}, Qo = (t, e, i, n) => {
  bs(t).set(e, {
    supported: i,
    expiresAt: n + xl
  });
}, Al = (t) => {
  const e = Xo.get(t);
  if (e)
    return e;
  const i = /* @__PURE__ */ new Map();
  return Xo.set(t, i), i;
}, xs = async (t, e, i, n, o, r) => {
  const s = new Date(n).toISOString(), a = e.join(","), l = `history/period/${s}?filter_entity_id=${encodeURIComponent(a)}&minimal_response&no_attributes`;
  let c;
  try {
    c = await t("GET", l);
  } catch {
    const p = {};
    return e.forEach((_) => {
      p[_] = [];
    }), p;
  }
  const h = Array.isArray(c) ? c : [], d = {};
  return h.forEach((p, _) => {
    const m = Cl(p, i, o), g = e[_], y = m.entityId ?? g;
    y && (d[y] = m.points);
  }), e.forEach((p) => {
    p in d || (d[p] = []), r && $i.set(Ei("history", p, i), {
      expiresAt: o + ys,
      points: ae(d[p])
    });
  }), d;
}, Pl = (t, e, i, n, o) => {
  const r = Al(t);
  let s = r.get(e);
  return s || (s = {
    entityIds: /* @__PURE__ */ new Set(),
    waiters: []
  }, r.set(e, s)), i.forEach((a) => s == null ? void 0 : s.entityIds.add(a)), new Promise((a, l) => {
    s == null || s.waiters.push({ entityIds: [...i], resolve: a, reject: l }), (s == null ? void 0 : s.flushTimer) === void 0 && (s.flushTimer = setTimeout(async () => {
      const c = r.get(e);
      if (!c)
        return;
      r.delete(e);
      const h = Array.from(c.entityIds);
      try {
        const d = await xs(
          t,
          h,
          n,
          o,
          Date.now(),
          !0
        );
        c.waiters.forEach((p) => {
          const _ = {};
          p.entityIds.forEach((m) => {
            _[m] = ae(d[m] ?? []);
          }), p.resolve(_);
        });
      } catch (d) {
        c.waiters.forEach((p) => p.reject(d));
      }
    }, gs));
  });
}, Il = (t) => {
  const e = Zo.get(t);
  if (e)
    return e;
  const i = /* @__PURE__ */ new Map();
  return Zo.set(t, i), i;
}, Dl = async (t, e, i, n) => {
  const o = [...n], r = new Date(e).toISOString(), s = new Date(i).toISOString(), a = qo.get(t), l = a ? [a] : ["recorder/statistics_during_period", "history/statistics_during_period"];
  let c;
  for (const h of l)
    try {
      const d = await t({
        type: h,
        start_time: r,
        end_time: s,
        statistic_ids: o,
        period: "5minute",
        types: ["state", "mean", "sum"]
      });
      return qo.set(t, h), d;
    } catch (d) {
      c = d;
    }
  throw c;
}, Ol = async (t, e) => {
  if (e.length === 0)
    return /* @__PURE__ */ new Set();
  try {
    const i = await t({
      type: "recorder/get_statistics_metadata",
      statistic_ids: e
    });
    if (!Array.isArray(i))
      return null;
    const n = /* @__PURE__ */ new Set();
    return i.forEach((o) => {
      if (!o || typeof o != "object")
        return;
      const r = o.statistic_id;
      typeof r == "string" && r.length > 0 && n.add(r);
    }), n;
  } catch {
    return null;
  }
}, Ss = async (t, e, i, n, o, r) => {
  let s;
  try {
    s = await Dl(t, n, o, e);
  } catch {
    const _ = new Set(e), m = {};
    return e.forEach((g) => {
      m[g] = [];
    }), {
      pointsByEntity: m,
      unsupportedEntityIds: _
    };
  }
  const a = s && typeof s == "object" && !Array.isArray(s) ? s : {}, l = {}, c = /* @__PURE__ */ new Set(), h = [];
  e.forEach((_) => {
    if (!Object.prototype.hasOwnProperty.call(a, _)) {
      l[_] = [], h.push(_);
      return;
    }
    const m = Ml(a[_], i, o);
    l[_] = m, Qo(t, _, !0, o), r && $i.set(Ei("statistics", _, i), {
      expiresAt: o + ys,
      points: ae(m)
    });
  });
  const d = [];
  h.forEach((_) => {
    const m = ws(t, _, o);
    if (m !== !0) {
      if (m === !1) {
        c.add(_);
        return;
      }
      d.push(_);
    }
  });
  const p = await Ol(t, d);
  return p !== null ? d.forEach((_) => {
    const m = p.has(_);
    Qo(t, _, m, o), m || c.add(_);
  }) : d.forEach((_) => {
    c.add(_);
  }), {
    pointsByEntity: l,
    unsupportedEntityIds: c
  };
}, Rl = (t, e, i, n, o) => {
  const r = Il(t);
  let s = r.get(e);
  return s || (s = {
    entityIds: /* @__PURE__ */ new Set(),
    waiters: []
  }, r.set(e, s)), i.forEach((a) => s == null ? void 0 : s.entityIds.add(a)), new Promise((a, l) => {
    s == null || s.waiters.push({ entityIds: [...i], resolve: a, reject: l }), (s == null ? void 0 : s.flushTimer) === void 0 && (s.flushTimer = setTimeout(async () => {
      const c = r.get(e);
      if (!c)
        return;
      r.delete(e);
      const h = Array.from(c.entityIds);
      try {
        const d = await Ss(
          t,
          h,
          n,
          o,
          Date.now(),
          !0
        );
        c.waiters.forEach((p) => {
          const _ = {
            pointsByEntity: {},
            unsupportedEntityIds: /* @__PURE__ */ new Set()
          };
          p.entityIds.forEach((m) => {
            _.pointsByEntity[m] = ae(d.pointsByEntity[m] ?? []), d.unsupportedEntityIds.has(m) && _.unsupportedEntityIds.add(m);
          }), p.resolve(_);
        });
      } catch (d) {
        c.waiters.forEach((p) => p.reject(d));
      }
    }, gs));
  });
}, $s = async (t, e, i, n) => {
  const o = t.callApi, r = Array.from(new Set(e.filter((y) => y.length > 0)));
  if (!o || r.length === 0)
    return {};
  const s = Date.now(), a = typeof n == "number" && Number.isFinite(n) ? Math.max(s - i, Math.floor(n)) : s - i, l = a <= s - i + 1e3, c = vs(a, l), h = {}, d = [];
  if (r.forEach((y) => {
    if (l) {
      const b = Ei("history", y, i), v = $i.get(b);
      if (v && v.expiresAt > s) {
        h[y] = ae(v.points);
        return;
      }
    }
    d.push(y);
  }), d.length === 0)
    return h;
  if (l) {
    const y = `${c}|${i}`, b = await Pl(
      o,
      y,
      d,
      i,
      c
    );
    return d.forEach((v) => {
      h[v] = ae(b[v] ?? []);
    }), h;
  }
  const p = [...d].sort(), _ = `${c}|${i}|${p.join(",")}`, m = Ki.get(_);
  if (m) {
    const y = await m;
    return d.forEach((b) => {
      h[b] = ae(y[b] ?? []);
    }), h;
  }
  const g = (async () => xs(
    o,
    d,
    i,
    c,
    s,
    l
  ))();
  Ki.set(_, g);
  try {
    const y = await g;
    return d.forEach((b) => {
      h[b] = ae(y[b] ?? []);
    }), h;
  } finally {
    Ki.delete(_);
  }
}, Es = async (t, e, i, n) => {
  const o = t.callWS, r = Array.from(new Set(e.filter((v) => v.length > 0)));
  if (!o || r.length === 0)
    return {
      pointsByEntity: {},
      unsupportedEntityIds: new Set(r)
    };
  const s = Date.now(), a = typeof n == "number" && Number.isFinite(n) ? Math.max(s - i, Math.floor(n)) : s - i, l = a <= s - i + 1e3, c = vs(a, l), h = {}, d = [], p = /* @__PURE__ */ new Set();
  if (r.forEach((v) => {
    if (ws(o, v, s) === !1) {
      h[v] = [], p.add(v);
      return;
    }
    if (l) {
      const E = Ei("statistics", v, i), w = $i.get(E);
      if (w && w.expiresAt > s) {
        h[v] = ae(w.points);
        return;
      }
    }
    d.push(v);
  }), d.length === 0)
    return {
      pointsByEntity: h,
      unsupportedEntityIds: p
    };
  const _ = (v) => (d.forEach((x) => {
    h[x] = ae(v.pointsByEntity[x] ?? []), v.unsupportedEntityIds.has(x) && p.add(x);
  }), {
    pointsByEntity: h,
    unsupportedEntityIds: p
  });
  if (l) {
    const v = `${c}|${i}`, x = await Rl(
      o,
      v,
      d,
      i,
      c
    );
    return _(x);
  }
  const m = [...d].sort(), g = `${c}|${i}|${m.join(",")}`, y = Gi.get(g);
  if (y) {
    const v = await y;
    return _(v);
  }
  const b = (async () => Ss(
    o,
    d,
    i,
    c,
    s,
    l
  ))();
  Gi.set(g, b);
  try {
    const v = await b;
    return _(v);
  } finally {
    Gi.delete(g);
  }
}, Nl = async (t, e, i, n) => {
  const o = await Es(
    t,
    e,
    i,
    n
  ), r = {};
  e.forEach((l) => {
    l.length !== 0 && (r[l] = ae(o.pointsByEntity[l] ?? []));
  });
  const s = Array.from(o.unsupportedEntityIds).filter((l) => l.length > 0);
  if (s.length === 0)
    return r;
  const a = await $s(
    t,
    s,
    i,
    n
  );
  return s.forEach((l) => {
    r[l] = ae(a[l] ?? []);
  }), r;
}, We = async (t, e, i, n) => {
  const o = ie(n == null ? void 0 : n.dataSource, "hybrid");
  return o === "history" ? $s(t, e, i, n == null ? void 0 : n.startMs) : o === "statistics" ? (await Es(
    t,
    e,
    i,
    n == null ? void 0 : n.startMs
  )).pointsByEntity : Nl(t, e, i, n == null ? void 0 : n.startMs);
}, er = {
  red: "244, 67, 54",
  pink: "233, 30, 99",
  purple: "156, 39, 176",
  violet: "156, 39, 176",
  "deep-purple": "103, 58, 183",
  "deep-violet": "103, 58, 183",
  indigo: "63, 81, 181",
  blue: "33, 150, 243",
  "light-blue": "3, 169, 244",
  cyan: "0, 188, 212",
  teal: "0, 150, 136",
  green: "76, 175, 80",
  "light-green": "139, 195, 74",
  lime: "205, 220, 57",
  yellow: "255, 235, 59",
  amber: "255, 193, 7",
  orange: "255, 152, 0",
  "deep-orange": "255, 87, 34",
  brown: "121, 85, 72",
  "light-grey": "189, 189, 189",
  grey: "158, 158, 158",
  "dark-grey": "97, 97, 97",
  "blue-grey": "96, 125, 139",
  black: "0, 0, 0",
  white: "255, 255, 255",
  disabled: "189, 189, 189"
}, pe = (t) => {
  if (Array.isArray(t) && t.length >= 3) {
    const o = t.slice(0, 3).map((r) => Number(r));
    if (o.every((r) => Number.isFinite(r))) {
      const [r, s, a] = o.map((l) => Math.max(0, Math.min(255, Math.round(l))));
      return `${r}, ${s}, ${a}`;
    }
    return null;
  }
  if (typeof t != "string")
    return null;
  const e = t.trim().toLowerCase();
  if (e === "none")
    return null;
  if (e.startsWith("var(--rgb-"))
    return e;
  if (e === "state")
    return "var(--rgb-state-entity, var(--rgb-primary-color, 3, 169, 244))";
  if (e === "primary")
    return "var(--rgb-primary-color, 3, 169, 244)";
  if (e === "accent")
    return "var(--rgb-accent-color, 255, 152, 0)";
  if (e in er)
    return `var(--rgb-${e}, ${er[e]})`;
  const i = /^#([a-fA-F0-9]{3})$/, n = /^#([a-fA-F0-9]{6})$/;
  if (i.test(e)) {
    const [, o] = e.match(i) ?? [];
    if (!o)
      return null;
    const r = parseInt(o[0] + o[0], 16), s = parseInt(o[1] + o[1], 16), a = parseInt(o[2] + o[2], 16);
    return `${r}, ${s}, ${a}`;
  }
  if (n.test(e)) {
    const [, o] = e.match(n) ?? [];
    if (!o)
      return null;
    const r = parseInt(o.slice(0, 2), 16), s = parseInt(o.slice(2, 4), 16), a = parseInt(o.slice(4, 6), 16);
    return `${r}, ${s}, ${a}`;
  }
  return null;
}, be = (t, e = "") => {
  const i = pe(t);
  if (i)
    return `rgb(${i})`;
  if (typeof t == "string" && t.trim().length > 0) {
    const n = t.trim(), o = n.toLowerCase();
    if (o !== "none" && o !== "default")
      return n;
  }
  return e;
}, xe = (t) => {
  const e = pe(t);
  if (e)
    return {
      "--icon-color": `rgb(${e})`,
      "--shape-color": `rgba(${e}, 0.2)`
    };
  if (typeof t == "string" && t.trim().length > 0 && t !== "none") {
    const i = t.trim();
    return {
      "--icon-color": i,
      "--shape-color": `color-mix(in srgb, ${i} 20%, transparent)`
    };
  }
  return {};
}, qn = (t, e, i) => {
  const n = t.map((o) => ({
    x: o.x / 100 * e,
    y: o.y / 100 * i,
    value: o.value,
    ts: o.ts
  }));
  return Ll(n, e);
}, Ll = (t, e) => {
  if (t.length <= 3)
    return t;
  const i = Math.max(24, Math.min(t.length, Math.round(e)));
  if (t.length <= i)
    return tr(t);
  const n = [];
  n.push(t[0]);
  const o = (t.length - 1) / (i - 1);
  for (let r = 1; r < i - 1; r += 1) {
    const s = Math.floor(r * o), a = Math.max(s + 1, Math.floor((r + 1) * o)), l = t.slice(s, Math.min(t.length, a));
    if (l.length === 0)
      continue;
    const c = l.reduce(
      (d, p) => (d.x += p.x, d.y += p.y, d.value += p.value, d.ts += p.ts, d),
      { x: 0, y: 0, value: 0, ts: 0 }
    ), h = l.length;
    n.push({
      x: c.x / h,
      y: c.y / h,
      value: c.value / h,
      ts: c.ts / h
    });
  }
  return n.push(t[t.length - 1]), tr(n);
}, tr = (t) => {
  if (t.length <= 3)
    return t;
  const e = [t[0]];
  for (let i = 1; i < t.length - 1; i += 1) {
    const n = t[i - 1], o = t[i], r = t[i + 1];
    e.push({
      x: o.x,
      y: (n.y + o.y * 2 + r.y) / 4,
      value: (n.value + o.value * 2 + r.value) / 4,
      ts: o.ts
    });
  }
  return e.push(t[t.length - 1]), e;
}, ir = {
  "": 0,
  k: 1,
  m: -1,
  M: 2,
  G: 3,
  T: 4
}, dn = ["", "k", "M", "G", "T"], Se = (t, e) => {
  const i = typeof t == "number" && Number.isFinite(t) ? Math.round(t) : e;
  return Math.max(0, Math.min(4, i));
}, te = (t) => {
  if (!t)
    return null;
  const e = t.trim();
  if (e.length === 0)
    return null;
  if (e.endsWith("Wh")) {
    const i = e.slice(0, -2), o = ir[i === "K" ? "k" : i];
    return o === void 0 ? null : {
      family: "energy",
      prefixPower: o,
      factor: Math.pow(1e3, o),
      canonicalUnit: "Wh"
    };
  }
  if (e.endsWith("W")) {
    const i = e.slice(0, -1), o = ir[i === "K" ? "k" : i];
    return o === void 0 ? null : {
      family: "power",
      prefixPower: o,
      factor: Math.pow(1e3, o),
      canonicalUnit: "W"
    };
  }
  return null;
}, Hl = (t, e) => {
  const i = Math.max(0, Math.min(dn.length - 1, e)), n = dn[i] ?? "";
  return t === "energy" ? `${n}Wh` : `${n}W`;
}, Bl = (t) => {
  if (!Number.isFinite(t) || t <= 0)
    return 0;
  let e = 0, i = t;
  for (; i >= 1e3 && e < dn.length - 1; )
    i /= 1e3, e += 1;
  return e;
}, Lt = (t, e, i, n) => {
  const o = n.nullWithUnit === !0;
  if (t === null)
    return o && e ? `-- ${e}` : "--";
  const r = te(e);
  if (!n.enabled || !r)
    return `${t.toFixed(i)} ${e}`.trim();
  const s = t < 0 ? "-" : "", a = Math.abs(t) * r.factor, l = Bl(a), c = Hl(r.family, l), h = a / Math.pow(1e3, l), d = l === 0 ? n.baseDecimals : n.prefixedDecimals;
  return `${s}${h.toFixed(d)} ${c}`.trim();
}, Fl = (t) => {
  const e = Object.keys(t), i = {};
  if (e.length === 0)
    return {
      comparable: !1,
      family: null,
      canonicalUnit: null,
      factors: i
    };
  let n = null, o = null;
  for (const r of e) {
    const s = te(t[r]);
    if (!s)
      return {
        comparable: !1,
        family: null,
        canonicalUnit: null,
        factors: i
      };
    if (n === null)
      n = s.family, o = s.canonicalUnit;
    else if (n !== s.family)
      return {
        comparable: !1,
        family: null,
        canonicalUnit: null,
        factors: i
      };
    i[r] = s.factor;
  }
  return {
    comparable: !0,
    family: n,
    canonicalUnit: o,
    factors: i
  };
}, Vl = 500, Ul = 250, Wl = 1e3, ot = (t, e, i) => {
  let n, o, r, s = !1, a = !1;
  const l = t.style.touchAction;
  t.style.touchAction = "manipulation";
  const c = () => {
    n !== void 0 && (clearTimeout(n), n = void 0);
  }, h = () => {
    o !== void 0 && (clearTimeout(o), o = void 0);
  }, d = (y) => {
    y.button === 0 && (i.stopPropagation && y.stopPropagation(), s = !1, h(), i.hasHold && (c(), n = setTimeout(() => {
      s = !0, n = void 0, e.onHold(), o = setTimeout(() => {
        s = !1, o = void 0;
      }, Wl);
    }, Vl)));
  }, p = () => {
    c();
  }, _ = () => {
    c(), s || (s = !1);
  }, m = (y) => {
    if (i.stopPropagation && y.stopPropagation(), s) {
      s = !1, h(), y.stopPropagation();
      return;
    }
    i.hasDoubleTap ? a ? (a = !1, r !== void 0 && (clearTimeout(r), r = void 0), e.onDoubleTap()) : (a = !0, r = setTimeout(() => {
      a = !1, r = void 0, e.onTap();
    }, Ul)) : e.onTap();
  }, g = (y) => {
    (s || n !== void 0) && y.preventDefault();
  };
  return t.addEventListener("pointerdown", d, { passive: !0 }), t.addEventListener("pointerup", p, { passive: !0 }), t.addEventListener("pointercancel", _, { passive: !0 }), t.addEventListener("pointerleave", _, { passive: !0 }), t.addEventListener("click", m), t.addEventListener("contextmenu", g), {
    destroy: () => {
      c(), h(), r !== void 0 && clearTimeout(r), t.removeEventListener("pointerdown", d), t.removeEventListener("pointerup", p), t.removeEventListener("pointercancel", _), t.removeEventListener("pointerleave", _), t.removeEventListener("click", m), t.removeEventListener("contextmenu", g), t.style.touchAction = l;
    }
  };
}, ft = (t) => {
  const e = t.getContext("2d");
  if (!e)
    return null;
  const i = t.offsetWidth || t.getBoundingClientRect().width, n = t.offsetHeight || t.getBoundingClientRect().height, o = Math.max(1, Math.round(i)), r = Math.max(1, Math.round(n)), s = Math.max(1, window.devicePixelRatio || 1), a = Math.max(1, Math.round(o * s)), l = Math.max(1, Math.round(r * s));
  return (t.width !== a || t.height !== l) && (t.width = a, t.height = l), e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, t.width, t.height), e.setTransform(s, 0, 0, s, 0, 0), { ctx: e, width: o, height: r };
}, Ie = (t, e) => {
  const i = document.createElement("span");
  i.style.position = "absolute", i.style.opacity = "0", i.style.pointerEvents = "none", i.style.color = e, t.appendChild(i);
  const n = getComputedStyle(i).color;
  return i.remove(), n || "rgb(158, 158, 158)";
}, jl = (t, e) => {
  const i = t.trim(), n = i.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (n) {
    const c = n.slice(1, 4).map((h) => Math.max(0, Math.min(255, Math.round(Number(h)))));
    if (c.every((h) => Number.isFinite(h)))
      return [c[0], c[1], c[2]];
  }
  let o = e == null ? void 0 : e.ctx;
  if (o === void 0 && (o = document.createElement("canvas").getContext("2d"), e && (e.ctx = o)), !o) return null;
  o.fillStyle = "#000000", o.fillStyle = i;
  const r = o.fillStyle, a = (typeof r == "string" ? r.trim() : "").match(/^#([a-f\d]{6})$/i);
  if (!a) return null;
  const l = a[1];
  return [
    parseInt(l.slice(0, 2), 16),
    parseInt(l.slice(2, 4), 16),
    parseInt(l.slice(4, 6), 16)
  ];
}, yt = (t, e, i) => {
  const n = jl(t, i);
  if (!n) return t;
  const o = Math.max(0, Math.min(1, e));
  return `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${o})`;
}, pi = (t, e, i, n) => {
  if (!(e.length < 2)) {
    t.beginPath(), t.moveTo(e[0].x, e[0].y);
    for (let o = 1; o < e.length; o += 1)
      t.lineTo(e[o].x, e[o].y);
    t.strokeStyle = i, t.lineWidth = n, t.lineCap = "round", t.lineJoin = "round", t.stroke();
  }
}, hn = (t, e, i, n, o = 0.24, r = 0, s) => {
  if (e.length < 2) return;
  const a = e[0], l = e[e.length - 1];
  let c = e[0].y;
  for (let d = 1; d < e.length; d += 1)
    e[d].y < c && (c = e[d].y);
  const h = t.createLinearGradient(0, c, 0, n);
  h.addColorStop(0, yt(i, o, s)), h.addColorStop(1, yt(i, r, s)), t.beginPath(), t.moveTo(a.x, a.y);
  for (let d = 1; d < e.length; d += 1)
    t.lineTo(e[d].x, e[d].y);
  t.lineTo(l.x, n), t.lineTo(a.x, n), t.closePath(), t.fillStyle = h, t.fill();
}, Kl = (t, e, i, n) => {
  if (!(e.length < 2 || i.length < 2)) {
    t.beginPath(), t.moveTo(e[0].x, e[0].y);
    for (let o = 1; o < e.length; o += 1)
      t.lineTo(e[o].x, e[o].y);
    for (let o = i.length - 1; o >= 0; o -= 1)
      t.lineTo(i[o].x, i[o].y);
    t.closePath(), t.fillStyle = n, t.fill();
  }
}, nr = (t) => {
  if (!Number.isFinite(t) || t <= 0) return 1;
  const e = Math.floor(Math.log10(t)), i = Math.pow(10, e), n = t / i;
  let o;
  return n <= 1 ? o = 1 : n <= 2 ? o = 2 : n <= 5 ? o = 5 : o = 10, o * i;
}, Gl = (t, e) => {
  const i = [];
  for (let n = 1; n < t.length; n += 1) {
    const o = t[n - 1], r = t[n], s = o.value <= e, a = r.value <= e;
    if (s === a || Math.abs(r.value - o.value) <= 1e-9) {
      i.push({ start: o, end: r, low: s });
      continue;
    }
    const l = Math.max(0, Math.min(1, (e - o.value) / (r.value - o.value))), c = {
      x: o.x + (r.x - o.x) * l,
      y: o.y + (r.y - o.y) * l,
      value: e
    };
    i.push({ start: o, end: c, low: s }), i.push({ start: c, end: r, low: a });
  }
  return i;
}, Yl = (t) => {
  const e = [];
  for (const i of t) {
    if (e.length === 0) {
      e.push({ low: i.low, points: [i.start, i.end] });
      continue;
    }
    const n = e[e.length - 1], o = n.points[n.points.length - 1], r = Math.abs(o.x - i.start.x) <= 0.01 && Math.abs(o.y - i.start.y) <= 0.01;
    n.low === i.low && r ? n.points.push(i.end) : e.push({ low: i.low, points: [i.start, i.end] });
  }
  return e;
}, Xl = (t, e, i, n, o) => {
  t.lineWidth = o, t.lineCap = "round", t.lineJoin = "round";
  for (const r of e)
    t.beginPath(), t.moveTo(r.start.x, r.start.y), t.lineTo(r.end.x, r.end.y), t.strokeStyle = r.low ? n : i, t.stroke();
}, Zl = (t, e, i = 5) => {
  if (!Number.isFinite(t) || !Number.isFinite(e) || i < 2)
    return [t, e].filter((l) => Number.isFinite(l));
  if (Math.abs(e - t) < 1e-9)
    return [t];
  const n = nr(e - t), o = nr(n / (i - 1)), r = Math.floor(t / o) * o, s = Math.ceil(e / o) * o, a = [];
  for (let l = r; l <= s + o / 2; l += o)
    a.push(Number(l.toFixed(10)));
  return a;
}, Gt = "purple", or = "black", ql = {
  battery: "battery_percentage",
  battery_secondary: "battery_secondary_percentage"
}, Je = (t) => {
  if (typeof t != "string") return;
  const e = t.trim();
  return e.length > 0 ? e : void 0;
}, rr = (t, e) => {
  var n, o;
  const i = (o = (n = t.states[e]) == null ? void 0 : n.attributes) == null ? void 0 : o.friendly_name;
  return typeof i == "string" && i.length > 0 ? i : void 0;
}, un = (t, e) => {
  var n, o;
  const i = (o = (n = t.states[e]) == null ? void 0 : n.attributes) == null ? void 0 : o.unit_of_measurement;
  return typeof i == "string" ? i : void 0;
}, Xi = (t, e, i) => {
  if (i)
    return be(or, or);
  if (Array.isArray(t))
    return be(t, Gt);
  if (typeof t == "string") {
    const n = t.trim();
    if (n.length > 0 && n !== "state")
      return be(n, Gt);
  }
  return be(Gt, Gt);
}, Zi = [
  {
    nodeKey: "solar",
    category: "solar",
    entityKey: "solar_entity",
    labelKey: "solar_label",
    iconColorKey: "solar_icon_color",
    trendColorKey: "solar_trend_color",
    visibleKey: "solar_visible",
    defaultVisible: !0
  },
  {
    nodeKey: "grid",
    category: "grid",
    entityKey: "grid_entity",
    labelKey: "grid_label",
    iconColorKey: "grid_icon_color",
    trendColorKey: "grid_trend_color",
    visibleKey: "grid_visible",
    defaultVisible: !0
  },
  {
    nodeKey: "grid_secondary",
    category: "grid_secondary",
    entityKey: "grid_secondary_entity",
    labelKey: "grid_secondary_label",
    iconColorKey: "grid_secondary_icon_color",
    trendColorKey: "grid_secondary_trend_color",
    visibleKey: "grid_secondary_visible",
    defaultVisible: !1
  },
  {
    nodeKey: "home",
    category: "home",
    entityKey: "home_entity",
    labelKey: "home_label",
    iconColorKey: "home_icon_color",
    trendColorKey: "home_trend_color",
    visibleKey: "home_visible",
    defaultVisible: !0
  },
  {
    nodeKey: "battery",
    category: "battery",
    entityKey: "battery_entity",
    labelKey: "battery_label",
    iconColorKey: "battery_icon_color",
    trendColorKey: "battery_trend_color",
    visibleKey: "battery_visible",
    defaultVisible: !0
  },
  {
    nodeKey: "battery_secondary",
    category: "battery_secondary",
    entityKey: "battery_secondary_entity",
    labelKey: "battery_secondary_label",
    iconColorKey: "battery_secondary_icon_color",
    trendColorKey: "battery_secondary_trend_color",
    visibleKey: "battery_secondary_visible",
    defaultVisible: !1
  }
], qi = (t, e) => e.defaultVisible ? t[e.visibleKey] !== !1 : t[e.visibleKey] === !0, Jl = [
  { prefix: "solar", category: "solar", count: 4 },
  { prefix: "grid", category: "grid", count: 2 },
  { prefix: "grid_secondary", category: "grid_secondary", count: 2 },
  { prefix: "home", category: "home", count: 8 }
], ks = (t, e) => {
  const i = e, n = [], o = (d) => {
    if (!qi(i, d)) return;
    const p = Je(i[d.entityKey]);
    if (!p) return;
    const _ = Je(i[d.labelKey]) ?? rr(t, p) ?? p, m = Xi(i[d.trendColorKey], d.category, !1), g = un(t, p) ?? "", y = {
      id: p,
      nodeKey: d.nodeKey,
      entityId: p,
      label: _,
      color: m,
      unit: g,
      isPercentage: g === "%",
      isSubBlock: !1,
      category: d.category
    };
    return n.push(y), y;
  }, r = /* @__PURE__ */ new Map();
  for (const d of Zi) {
    const p = o(d);
    p && r.set(d.nodeKey, p);
  }
  const s = (d, p, _, m, g, y) => {
    const b = Je(i[d]);
    b && n.push({
      id: b,
      nodeKey: m,
      entityId: b,
      label: `${Je(i[p]) ?? y} %`,
      color: Xi(i[_], g, !1),
      unit: "%",
      isPercentage: !0,
      isSubBlock: !1,
      category: g
    });
  };
  qi(i, Zi[4]) && s(
    "battery_percentage_entity",
    "battery_label",
    "battery_trend_color",
    "battery_percentage",
    "battery",
    "Battery"
  ), qi(i, Zi[5]) && s(
    "battery_secondary_percentage_entity",
    "battery_secondary_label",
    "battery_secondary_trend_color",
    "battery_secondary_percentage",
    "battery_secondary",
    "Battery 2"
  );
  const a = [];
  for (const d of Jl)
    for (let p = 1; p <= d.count; p += 1) {
      const _ = `${d.prefix}_sub_${p}`;
      if (i[`${_}_enabled`] !== !0) continue;
      const m = Je(i[`${_}_entity`]);
      if (!m) continue;
      const g = Je(i[`${_}_label`]) ?? rr(t, m) ?? m, y = Xi(void 0, d.category, !0), b = un(t, m) ?? "", v = {
        id: m,
        nodeKey: _,
        entityId: m,
        label: g,
        color: y,
        unit: b,
        isPercentage: b === "%",
        isSubBlock: !0,
        category: d.category
      };
      n.push(v), d.prefix === "solar" && i[`${_}_state_mode`] !== !0 && a.push(v);
    }
  const l = r.get("home");
  if (l && i.home_auto_calculate === !0) {
    const d = Ql(i, t, l.unit, r.get("solar"));
    d && (l.computed = d);
  }
  const c = r.get("solar");
  c && i.solar_auto_calculate === !0 && a.length > 0 && (c.computed = ec(c.unit, a));
  const h = /* @__PURE__ */ new Set();
  return n.filter((d) => h.has(d.entityId) ? !1 : (h.add(d.entityId), !0));
}, Ql = (t, e, i, n) => {
  var l;
  const o = [], r = {}, s = {}, a = (c, h) => {
    const d = Je(t[c]);
    d && (o.push(d), r[d] = un(e, d) ?? "", s[d] = h);
  };
  if (t.solar_visible !== !1 && a("solar_entity", 1), t.grid_visible !== !1 && a("grid_entity", 1), t.grid_secondary_visible === !0 && a("grid_secondary_entity", 1), t.battery_visible !== !1 && a("battery_entity", -1), t.battery_secondary_visible === !0 && a("battery_secondary_entity", -1), o.length !== 0) {
    if (t.solar_auto_calculate === !0 && ((l = n == null ? void 0 : n.computed) == null ? void 0 : l.mode) === "auto_solar") {
      const c = n.entityId, h = o.indexOf(c);
      if (h >= 0) {
        o.splice(h, 1), delete r[c], delete s[c];
        for (const d of n.computed.dependencies)
          o.includes(d) || (o.push(d), r[d] = n.computed.unitsByEntityId[d] ?? "", s[d] = 1);
      }
    }
    return {
      mode: "auto_home",
      dependencies: o,
      unitsByEntityId: r,
      signsByEntityId: s,
      outputUnit: i
    };
  }
}, ec = (t, e) => {
  const i = [], n = {}, o = {};
  for (const r of e)
    i.push(r.entityId), n[r.entityId] = r.unit, o[r.entityId] = 1;
  return {
    mode: "auto_solar",
    dependencies: i,
    unitsByEntityId: n,
    signsByEntityId: o,
    outputUnit: t
  };
}, tc = (t, e, i) => {
  if (i) {
    const o = t.find((r) => r.id === i);
    if (o) return o;
  }
  const n = ql[e];
  if (n) {
    const o = t.find((r) => r.nodeKey === n);
    if (o) return o;
  }
  return t.find((o) => o.nodeKey === e);
}, Cs = (t) => {
  const e = /* @__PURE__ */ new Set();
  for (const i of t)
    if (e.add(i.entityId), i.computed)
      for (const n of i.computed.dependencies) e.add(n);
  return Array.from(e);
}, ic = (t, e) => {
  if (t.length === 0) return 0;
  if (e <= t[0].ts) return t[0].value;
  if (e >= t[t.length - 1].ts) return t[t.length - 1].value;
  let i = 0, n = t.length - 1;
  for (; n - i > 1; ) {
    const l = i + n >> 1;
    t[l].ts <= e ? i = l : n = l;
  }
  const o = t[i], r = t[n], s = r.ts - o.ts;
  if (s <= 0) return o.value;
  const a = (e - o.ts) / s;
  return o.value + (r.value - o.value) * a;
}, nc = (t, e) => {
  const i = t.dependencies.map((h) => ({
    id: h,
    unit: t.unitsByEntityId[h] ?? "",
    sign: t.signsByEntityId[h] ?? 1,
    points: e.get(h) ?? []
  })).filter((h) => h.points.length > 0);
  if (i.length === 0) return [];
  const n = /* @__PURE__ */ new Set();
  for (const h of i)
    for (const d of h.points) n.add(d.ts);
  const o = Array.from(n).sort((h, d) => h - d), r = /* @__PURE__ */ new Map();
  let s = null;
  for (const h of i) {
    const d = te(h.unit);
    d && (r.set(h.id, d.factor), s ?? (s = d.family));
  }
  const a = te(t.outputUnit), l = a && a.family === s ? a.factor : 1, c = [];
  for (const h of o) {
    let d = 0;
    for (const _ of i) {
      const m = ic(_.points, h), g = r.get(_.id) ?? 1;
      d += _.sign * m * g;
    }
    const p = l > 0 ? d / l : d;
    Number.isFinite(p) && c.push({ ts: h, value: p });
  }
  return c;
}, Ts = (t, e) => t.computed ? nc(t.computed, e) : e.get(t.entityId) ?? [], oc = 64, rc = 56, sc = 12, ac = 24, Jn = "11px system-ui, -apple-system, sans-serif", lc = "var(--secondary-text-color, #757575)", zs = "rgba(127, 127, 127, 0.18)", cc = (t, e) => {
  var A;
  const i = ft(t);
  if (!i) return null;
  const { ctx: n, width: o, height: r } = i, s = e.host ?? document.body, a = Ie(s, lc), l = oc, c = o - rc, h = sc, d = r - ac, p = Math.max(1, c - l), _ = Math.max(1, d - h), m = (P) => dc(P, {
    innerLeft: l,
    innerRight: c,
    innerTop: h,
    innerBottom: d,
    innerWidth: p,
    innerHeight: _,
    startMs: e.startMs,
    endMs: e.endMs
  });
  if (e.series.length === 0)
    return _n(n, l, h, p, _, a), m([]);
  const g = Math.max(1, e.endMs - e.startMs), y = { ctx: void 0 };
  if (e.mode === "stacked-percent") {
    const P = _c(
      n,
      e,
      s,
      { innerLeft: l, innerTop: h, innerBottom: d, innerWidth: p, innerHeight: _ },
      g,
      a,
      y
    );
    return lr(n, e, l, d, p, a), m(P);
  }
  const b = [], v = [];
  for (const P of e.series)
    e.mode === "overlay" && P.isPercentage ? v.push(P) : b.push(P);
  const x = Ms(b), E = sr(x.map((P) => P.points)), w = v.length > 0 ? sr(v.map((P) => P.points)) : null;
  pn(
    n,
    E,
    l,
    h,
    _,
    "left",
    ((A = x[0]) == null ? void 0 : A.canonicalUnit) ?? e.primaryAxisLabel ?? "",
    e.tickCount ?? 5,
    e.decimals,
    a
  ), w && pn(
    n,
    w,
    c,
    h,
    _,
    "right",
    "%",
    e.tickCount ?? 5,
    0,
    a
  );
  const S = e.lineWidth ?? 1.6, $ = x.length, T = [];
  for (let P = x.length - 1; P >= 0; P -= 1) {
    const D = x[P], O = ar(
      D.points,
      e.startMs,
      g,
      E,
      l,
      p,
      h,
      _
    ), H = Ie(s, D.color);
    O.length >= 2 && ((e.mode === "single" || $ === 1) && hn(n, O, H, d, 0.24, 0, y), pi(n, O, H, S)), T.push({
      id: D.id,
      label: D.label,
      resolvedColor: H,
      rawUnit: D.unit,
      canonicalUnit: D.canonicalUnit,
      axis: "primary",
      isPercentage: D.isPercentage,
      points: D.points,
      rawPoints: D.rawPoints
    });
  }
  for (const P of v) {
    const D = ar(
      P.points,
      e.startMs,
      g,
      w ?? { min: 0, max: 100 },
      l,
      p,
      h,
      _
    ), O = Ie(s, P.color);
    D.length >= 2 && (n.save(), n.setLineDash([4, 3]), pi(n, D, O, S), n.restore()), T.push({
      id: P.id,
      label: P.label,
      resolvedColor: O,
      rawUnit: P.unit,
      canonicalUnit: P.unit,
      axis: "secondary",
      isPercentage: !0,
      points: P.points,
      rawPoints: P.points
    });
  }
  return lr(n, e, l, d, p, a), m(T);
}, dc = (t, e) => {
  const i = Math.max(1, e.endMs - e.startMs), n = (s) => {
    const l = (Math.max(e.innerLeft, Math.min(e.innerRight, s)) - e.innerLeft) / Math.max(1, e.innerWidth);
    return e.startMs + l * i;
  }, o = (s) => {
    const a = Math.max(0, Math.min(1, (s - e.startMs) / i));
    return e.innerLeft + a * e.innerWidth;
  }, r = (s) => t.map((a) => ({
    seriesId: a.id,
    label: a.label,
    resolvedColor: a.resolvedColor,
    value: Ps(a.rawPoints, s),
    rawUnit: a.rawUnit,
    isPercentage: a.isPercentage
  }));
  return {
    innerLeft: e.innerLeft,
    innerRight: e.innerRight,
    innerTop: e.innerTop,
    innerBottom: e.innerBottom,
    innerWidth: e.innerWidth,
    innerHeight: e.innerHeight,
    startMs: e.startMs,
    endMs: e.endMs,
    rendered: t,
    pixelToTimestamp: n,
    timestampToPixel: o,
    valuesAt: r
  };
}, sr = (t) => {
  let e = 1 / 0, i = -1 / 0;
  for (const o of t)
    for (const r of o)
      Number.isFinite(r.value) && (r.value < e && (e = r.value), r.value > i && (i = r.value));
  if (!Number.isFinite(e) || !Number.isFinite(i))
    return { min: 0, max: 1 };
  if (e === i) {
    const o = Math.abs(e) * 0.1 || 1;
    return { min: e - o, max: i + o };
  }
  e >= 0 && (e = 0);
  const n = i - e;
  return { min: e - n * 0.05, max: i + n * 0.05 };
}, ar = (t, e, i, n, o, r, s, a) => {
  const l = Math.max(1e-9, n.max - n.min);
  return t.filter((c) => Number.isFinite(c.ts) && Number.isFinite(c.value)).map((c) => {
    const h = Math.max(0, Math.min(1, (c.ts - e) / i)), d = Math.max(0, Math.min(1, (c.value - n.min) / l));
    return {
      x: o + h * r,
      y: s + (1 - d) * a
    };
  });
}, Ms = (t) => {
  const e = t.map((o) => ({ s: o, parsed: te(o.unit) }));
  let i = null, n = !0;
  for (const o of e) {
    if (!o.parsed) {
      n = !1;
      break;
    }
    if (i === null)
      i = o.parsed.family;
    else if (i !== o.parsed.family) {
      n = !1;
      break;
    }
  }
  return n ? e.map(({ s: o, parsed: r }) => {
    if (!r)
      return { ...o, canonicalUnit: o.unit, rawPoints: o.points };
    const s = r.factor, a = o.points.map((l) => ({
      ts: l.ts,
      value: l.value * s
    }));
    return { ...o, points: a, canonicalUnit: r.canonicalUnit, rawPoints: o.points };
  }) : t.map((o) => ({ ...o, canonicalUnit: o.unit, rawPoints: o.points }));
}, pn = (t, e, i, n, o, r, s, a, l, c) => {
  const h = Math.max(1e-9, e.max - e.min), d = h * 0.07, p = Zl(e.min, e.max, a).filter(
    (m) => m > e.min + d && m < e.max - d
  ), _ = [e.min, ...p, e.max];
  t.save(), t.font = Jn, t.fillStyle = c, t.textBaseline = "middle", t.textAlign = r === "left" ? "right" : "left";
  for (const m of _) {
    const g = (m - e.min) / h, y = n + (1 - g) * o, b = r === "left" ? i - 6 : i + 6;
    t.fillText(pc(m, s, l), b, y), r === "left" && (t.strokeStyle = zs, t.lineWidth = 1, t.beginPath(), t.moveTo(i, y + 0.5), t.lineTo(i + (t.canvas.width - 1e-3), y + 0.5), t.stroke());
  }
  t.restore();
}, lr = (t, e, i, n, o, r) => {
  const s = Math.max(1, e.endMs - e.startMs), a = s * 0.07, l = As(s), c = uc(e.startMs, e.endMs).filter(
    (d) => d.ms > e.startMs + a && d.ms < e.endMs - a
  ), h = [
    { ms: e.startMs, label: l(new Date(e.startMs)), align: "left" },
    ...c.map((d) => ({ ms: d.ms, label: d.label, align: "center" })),
    { ms: e.endMs, label: l(new Date(e.endMs)), align: "right" }
  ];
  t.save(), t.font = Jn, t.fillStyle = r, t.textBaseline = "top";
  for (const d of h) {
    const p = (d.ms - e.startMs) / s;
    if (p < 0 || p > 1) continue;
    const _ = i + p * o;
    t.strokeStyle = zs, t.lineWidth = 1, t.beginPath(), t.moveTo(_ + 0.5, n - 4), t.lineTo(_ + 0.5, n), t.stroke(), t.textAlign = d.align, t.fillText(d.label, _, n + 4);
  }
  t.restore();
}, Dt = 3600 * 1e3, ge = 24 * Dt, As = (t) => t <= 6 * Dt ? (e) => `${dt(e.getHours())}:${dt(e.getMinutes())}` : t <= 2 * ge ? (e) => `${dt(e.getHours())}:00` : t <= 200 * ge ? (e) => `${dt(e.getDate())}.${dt(e.getMonth() + 1)}` : (e) => `${dt(e.getMonth() + 1)}/${String(e.getFullYear()).slice(2)}`, hc = (t) => t <= 6 * Dt ? Dt : t <= 2 * ge ? 6 * Dt : t <= 14 * ge ? ge : t <= 90 * ge ? 7 * ge : t <= 200 * ge ? 14 * ge : 30 * ge, uc = (t, e) => {
  const i = e - t, n = hc(i), o = As(i), r = Math.ceil(t / n) * n, s = [];
  for (let a = r; a <= e && (s.push({ ms: a, label: o(new Date(a)) }), !(s.length > 16)); a += n)
    ;
  return s;
}, dt = (t) => String(t).padStart(2, "0"), pc = (t, e, i) => {
  const n = Math.abs(t), o = i !== void 0 ? i : n >= 100 ? 0 : n >= 10 ? 1 : 2, r = t.toFixed(o);
  return e ? `${r} ${e}` : r;
}, _c = (t, e, i, n, o, r, s) => {
  const a = e.series.filter((g) => !g.isPercentage);
  if (a.length === 0)
    return _n(t, n.innerLeft, n.innerTop, n.innerWidth, n.innerHeight, r), [];
  const l = Ms(a), c = mc(l, e.startMs, e.endMs, 256);
  if (c.length < 2)
    return _n(t, n.innerLeft, n.innerTop, n.innerWidth, n.innerHeight, r), [];
  const h = l.map(
    (g) => c.map((y) => Math.max(0, Ps(g.points, y)))
  ), d = c.map((g, y) => {
    let b = 0;
    for (const v of h) b += v[y];
    return b;
  });
  pn(
    t,
    { min: 0, max: 100 },
    n.innerLeft,
    n.innerTop,
    n.innerHeight,
    "left",
    "%",
    e.tickCount ?? 5,
    0,
    r
  );
  let p = c.map((g) => ({
    x: cr(g, e.startMs, o, n.innerLeft, n.innerWidth),
    y: n.innerBottom
  }));
  const _ = [], m = c.map(() => 0);
  for (let g = 0; g < l.length; g += 1) {
    const y = l[g], b = h[g], v = [], x = [];
    for (let w = 0; w < c.length; w += 1) {
      const S = c[w];
      m[w] += b[w];
      const $ = d[w], T = $ > 0 ? m[w] / $ * 100 : 0, A = $ > 0 ? b[w] / $ * 100 : 0, P = Math.max(0, Math.min(1, T / 100));
      v.push({
        x: cr(S, e.startMs, o, n.innerLeft, n.innerWidth),
        y: n.innerTop + (1 - P) * n.innerHeight
      }), x.push({ ts: S, value: A });
    }
    const E = Ie(i, y.color);
    Kl(t, v, p, yt(E, 0.45, s)), pi(t, v, E, e.lineWidth ?? 1.4), p = v, _.push({
      id: y.id,
      label: y.label,
      resolvedColor: E,
      rawUnit: "%",
      canonicalUnit: "%",
      axis: "primary",
      isPercentage: !0,
      points: x,
      rawPoints: x
    });
  }
  return _;
}, mc = (t, e, i, n) => {
  if (i <= e) return [];
  const o = Math.max(2, Math.min(n, 512)), r = (i - e) / (o - 1), s = [];
  for (let l = 0; l < o; l += 1)
    s.push(e + l * r);
  return t.some((l) => l.points.some((c) => c.ts >= e && c.ts <= i)) ? s : [];
}, Ps = (t, e) => {
  if (t.length === 0) return 0;
  if (e <= t[0].ts) return t[0].value;
  if (e >= t[t.length - 1].ts) return t[t.length - 1].value;
  let i = 0, n = t.length - 1;
  for (; n - i > 1; ) {
    const l = i + n >> 1;
    t[l].ts <= e ? i = l : n = l;
  }
  const o = t[i], r = t[n], s = r.ts - o.ts;
  if (s <= 0) return o.value;
  const a = (e - o.ts) / s;
  return o.value + (r.value - o.value) * a;
}, cr = (t, e, i, n, o) => {
  const r = Math.max(0, Math.min(1, (t - e) / i));
  return n + r * o;
}, _n = (t, e, i, n, o, r) => {
  t.save(), t.font = Jn, t.fillStyle = r, t.textAlign = "center", t.textBaseline = "middle", t.fillText("No data", e + n / 2, i + o / 2), t.restore();
};
var fc = Object.defineProperty, Is = (t, e, i, n) => {
  for (var o = void 0, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = s(e, i, o) || o);
  return o && fc(e, i, o), o;
};
const yc = 180, ho = class ho extends L {
  constructor() {
    super(...arguments), this.dialogTitle = "", this._closing = !1, this.lockClose = !1, this._onKeyDown = (e) => {
      e.key !== "Escape" || this.lockClose || this._handleEscape(e);
    }, this._onBackdropClick = (e) => {
      e.target === e.currentTarget && !this.lockClose && this.close();
    }, this._stopClick = (e) => {
      e.stopPropagation();
    };
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("keydown", this._onKeyDown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("keydown", this._onKeyDown);
  }
  _handleEscape(e) {
    this.close();
  }
  // Close the dialog with the fade-out animation, then remove from DOM.
  close() {
    this._closing || (this._closing = !0, setTimeout(() => this.remove(), yc));
  }
  renderFooter() {
    return k;
  }
  /** Render an inner sub-modal that lives above the main dialog. */
  renderInner() {
    return k;
  }
  renderHeaderExtras() {
    return k;
  }
  render() {
    return f`
      <div
        class="ppd-backdrop ${this._closing ? "closing" : ""}"
        @click=${this._onBackdropClick}
      >
        <div
          class="ppd-dialog"
          role="dialog"
          aria-modal="true"
          aria-label=${this.dialogTitle}
          @click=${this._stopClick}
        >
          <header class="ppd-header">
            <h2 class="ppd-title">${this.dialogTitle}</h2>
            ${this.renderHeaderExtras()}
            <button
              class="ppd-close-x"
              aria-label="Close"
              @click=${() => this.close()}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="ppd-body">${this.renderBody()}</div>
          ${this._maybeFooter()}
          ${this.renderInner()}
        </div>
      </div>
    `;
  }
  _maybeFooter() {
    const e = this.renderFooter();
    return e === k ? k : f`<footer class="ppd-footer">${e}</footer>`;
  }
};
ho.styles = Z`
    :host {
      position: fixed;
      inset: 0;
      z-index: 10000;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      --ppd-max-width: 900px;
    }

    .ppd-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px 16px;
      animation: ppd-fade-in 0.18s ease;
    }
    .ppd-backdrop.closing { animation: ppd-fade-out 0.15s ease forwards; }

    @keyframes ppd-fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes ppd-fade-out { from { opacity: 1; } to { opacity: 0; } }

    .ppd-dialog {
      position: relative;
      background: var(--card-background-color, var(--primary-background-color, #fff));
      color: var(--primary-text-color, #212121);
      border-radius: 16px;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
      width: min(100%, var(--ppd-max-width));
      max-height: calc(100vh - 48px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: ppd-pop-in 0.22s cubic-bezier(0.2, 0.9, 0.3, 1.1);
    }
    @keyframes ppd-pop-in {
      from { opacity: 0; transform: translateY(10px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .ppd-header {
      padding: 14px 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
    }
    .ppd-title {
      margin: 0;
      flex: 1;
      font-size: 18px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .ppd-close-x {
      border: none;
      background: transparent;
      cursor: pointer;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-text-color);
    }
    .ppd-close-x:hover {
      background: color-mix(in srgb, currentColor 10%, transparent);
    }

    .ppd-body {
      padding: 16px 20px;
      overflow-y: auto;
      flex: 1;
      min-height: 200px;
    }

    .ppd-footer {
      padding: 12px 16px;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
      background: var(--secondary-background-color, transparent);
    }

    /* Standard button styling shared across PowerPilz dialogs. */
    button.ppd-btn {
      font: inherit;
      font-size: 14px;
      font-weight: 500;
      padding: 8px 20px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    button.ppd-btn:disabled { opacity: 0.55; cursor: default; }
    button.ppd-btn.flat {
      background: transparent;
      color: var(--primary-text-color, #212121);
    }
    button.ppd-btn.flat:hover:not(:disabled) {
      background: color-mix(in srgb, currentColor 10%, transparent);
    }
    button.ppd-btn.primary {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    button.ppd-btn.primary:hover:not(:disabled) {
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 90%, #000);
    }
    button.ppd-btn.danger {
      background: var(--error-color, #c62828);
      color: #fff;
    }
    button.ppd-btn.danger:hover:not(:disabled) {
      background: color-mix(in srgb, var(--error-color, #c62828) 85%, #000);
    }

    @media (max-width: 700px) {
      .ppd-backdrop { padding: 0; }
      .ppd-dialog {
        border-radius: 0;
        width: 100%;
        height: 100%;
        max-height: 100%;
      }
    }
  `;
let le = ho;
Is([
  I({ type: String })
], le.prototype, "dialogTitle");
Is([
  C()
], le.prototype, "_closing");
const Xe = (t, e = 2) => String(t).padStart(e, "0"), gc = (t) => {
  const e = new Date(t), i = -e.getTimezoneOffset(), n = i >= 0 ? "+" : "-", o = Math.abs(i);
  return `${e.getFullYear()}-${Xe(e.getMonth() + 1)}-${Xe(e.getDate())}T${Xe(e.getHours())}:${Xe(e.getMinutes())}:${Xe(e.getSeconds())}${n}${Xe(Math.floor(o / 60))}:${Xe(o % 60)}`;
}, vc = (t) => /[",\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t, bc = (t) => {
  var a;
  const e = t.filter((l) => l.points.length > 0), i = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set();
  for (const l of e) {
    const c = /* @__PURE__ */ new Map();
    for (const h of l.points)
      c.set(h.ts, h.value), n.add(h.ts);
    i.set(l.entityId, c);
  }
  const o = [...n].sort((l, c) => l - c), r = [], s = [
    "timestamp",
    ...e.map(
      (l) => vc(l.unit ? `${l.label} (${l.unit})` : l.label)
    )
  ];
  r.push(s.join(","));
  for (const l of o) {
    const c = [gc(l)];
    for (const h of e) {
      const d = (a = i.get(h.entityId)) == null ? void 0 : a.get(l);
      c.push(d !== void 0 && Number.isFinite(d) ? String(d) : "");
    }
    r.push(c.join(","));
  }
  return r.join(`
`) + `
`;
}, wc = (t, e) => {
  const i = new Blob(["\uFEFF" + e], {
    type: "text/csv;charset=utf-8"
  }), n = URL.createObjectURL(i), o = document.createElement("a");
  o.href = n, o.download = t, o.style.display = "none", document.body.appendChild(o), o.click(), document.body.removeChild(o), setTimeout(() => URL.revokeObjectURL(n), 0);
}, dr = (t) => t.normalize("NFKD").replace(/[\u0300-\u036F]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "export";
function M(t) {
  var n;
  const e = ((n = t == null ? void 0 : t.locale) == null ? void 0 : n.language) ?? (t == null ? void 0 : t.language) ?? "en";
  return String(e).split("-")[0].toLowerCase() === "de" ? "de" : "en";
}
const mn = {
  // --- Common ---
  "common.cancel": "Cancel",
  "common.set": "Set",
  "common.on": "On",
  "common.off": "Off",
  "common.active": "Active",
  "common.unknown": "Unknown",
  "common.invalid_config": "Invalid configuration",
  "common.today": "Today",
  "common.tomorrow": "Tomorrow",
  // --- Weekday short ---
  "weekday.short.0": "Sun",
  "weekday.short.1": "Mon",
  "weekday.short.2": "Tue",
  "weekday.short.3": "Wed",
  "weekday.short.4": "Thu",
  "weekday.short.5": "Fri",
  "weekday.short.6": "Sat",
  // --- Timer card ---
  "timer.default_name": "Timer",
  "timer.turn_on_at": "Turn ON at:",
  "timer.turn_off_at_optional": "Turn OFF at (optional):",
  "timer.only_on": "Only On",
  "timer.only_off": "Only Off",
  "timer.set_to_at": "Set to '{option}' at:",
  "timer.only_option": "Only '{option}'",
  "timer.mode_label": "Mode:",
  "timer.cancel_title": "Cancel this timer?",
  "timer.cancel_hint": "The scheduled action will be removed.",
  "timer.keep_timer": "Keep timer",
  "timer.cancel_timer": "Cancel timer",
  "timer.timer_active": "Timer active",
  "timer.time_now": "now",
  "timer.time_in_m": "in {m}m",
  "timer.time_in_hm": "in {h}h {m}m",
  "timer.time_in_dh": "in {d}d {h}h",
  "timer.subtitle_on": "On {time}",
  "timer.subtitle_off": "Off {time}",
  // Timer editor
  "timer.editor.section_entities": "Entities",
  "timer.editor.section_identity": "Identity",
  "timer.editor.section_appearance": "Appearance",
  "timer.editor.use_companion": "Use PowerPilz Companion integration",
  "timer.editor.use_companion_help": "When enabled (default), configure only one entity — a PowerPilz Smart Timer from the Companion integration — and the card derives the target device, on/off times and active flag from its attributes. When disabled, configure the four entities manually (device / on-time / off-time / active flag).",
  "timer.editor.companion_entity": "PowerPilz Smart Timer entity",
  "timer.editor.companion_help": "A PowerPilz Smart Timer helper (switch.* entity created by the Companion integration). The card automatically reads its `target_entity`, `on_datetime` and `off_datetime` attributes and uses the `powerpilz_companion.set_timer` service to update times.",
  "timer.placeholder_companion": "Pick a PowerPilz Smart Timer entity in the card settings to configure this card.",
  "timer.placeholder_manual": "Pick the four timer entities in the card settings to configure this card.",
  "timer.editor.switch_entity": "Device to control",
  "timer.editor.on_datetime_entity": "Turn-ON datetime helper",
  "timer.editor.off_datetime_entity": "Turn-OFF datetime helper (optional)",
  "timer.editor.active_entity": "Timer active flag",
  "timer.editor.name": "Name",
  "timer.editor.subtitle": "Subtitle",
  "timer.editor.icon": "Icon",
  "timer.editor.icon_color": "Icon color",
  "timer.editor.active_color": "Active timer color",
  "timer.editor.switch_help": "The device to control (switch, light, or input_boolean). This entity will be turned on/off at the scheduled time.",
  "timer.editor.on_help": "An input_datetime helper (with date AND time enabled) that stores when to turn the device ON. Create in Settings > Helpers > Add > Date and/or time. Enable both 'Date' and 'Time'. Then create an automation: trigger at this entity's time → turn on the device.",
  "timer.editor.off_help": "Optional: an input_datetime helper for the turn-OFF time. Same setup as the ON helper. If not set, the card only schedules turning on. Create a second automation: trigger at this entity's time → turn off the device.",
  "timer.editor.active_help": "An input_boolean that indicates whether a timer is currently pending. The card turns this on when scheduling and off when cancelling. Use it as a condition in your automations so they only fire when the timer is active.",
  "timer.editor.active_color_help": "Color used for the active timer badge and highlights.",
  // --- Schedule card ---
  "schedule.default_name": "Schedule",
  "schedule.timer_label": "Timer",
  // Schedule editor
  "schedule.editor.section_entities": "Entities",
  "schedule.editor.section_identity": "Identity",
  "schedule.editor.section_layout": "Layout",
  "schedule.editor.section_appearance": "Appearance",
  "schedule.editor.section_display": "Display options",
  "schedule.editor.section_actions": "Tap behavior",
  "schedule.editor.hold_action_help": "Default opens the inline schedule editor.",
  "schedule.editor.tap_action": "Tap action",
  "schedule.editor.hold_action": "Hold action (default: schedule editor)",
  "schedule.editor.double_tap_action": "Double-tap action",
  "schedule.edit_dialog.default_title": "Edit weekly schedule",
  "schedule.edit_dialog.error_no_ws": "Home Assistant websocket connection not available.",
  "schedule.edit_dialog.error_not_found": "Could not find a schedule helper for {entity}. Has it been deleted?",
  "schedule.edit_dialog.form_not_loaded": "The native schedule editor hasn't been loaded in this browser session yet. Open any schedule helper once under Settings → Helpers, then long-press the card again.",
  "schedule.edit_dialog.open_native_info": "Open in Home Assistant",
  "schedule.edit_dialog.hint": "Tap an empty area on a day to add a 1-hour block. Tap a block to remove it. 30-minute snap.",
  "schedule.edit_dialog.hint_v2": "Click and drag on a day to paint a block (15-minute snap). Click an existing block to edit its exact time, data, or delete it.",
  "schedule.edit_dialog.hint_v3": "Click and drag on an empty area to paint a new block. Click a block to edit it; drag it to move. Touching blocks merge automatically.",
  "schedule.edit_dialog.same_for_all": "Same plan for every day",
  "schedule.edit_dialog.all_days": "All days",
  "schedule.edit_dialog.block_title": "Edit block · {day}",
  "schedule.edit_dialog.event_title": "Edit event · {day}",
  "schedule.edit_dialog.event_time": "Time",
  "schedule.edit_dialog.from": "Start",
  "schedule.edit_dialog.to": "End",
  "schedule.edit_dialog.data": "Extra data (optional)",
  "schedule.edit_dialog.data_help": 'JSON object, e.g. {"mode": "heat", "target": 21}',
  "schedule.edit_dialog.delete": "Delete",
  "schedule.edit_dialog.err_time": "Invalid time — use HH:MM or HH:MM:SS.",
  "schedule.edit_dialog.err_order": "Start must be before end.",
  "schedule.edit_dialog.err_overlap": "This block overlaps another block on the same day.",
  "schedule.edit_dialog.err_data": 'Invalid JSON — must be an object literal like {"key": "value"}.',
  "schedule.trigger_now": "Trigger event now",
  "schedule.trigger_now_blocked_running": "Pulse running — trigger locked",
  "schedule.trigger_now_blocked_cooldown": "Cool-down active — available again at {time}",
  "event_schedule.default_name": "Event Schedule",
  "event_schedule.placeholder": "Pick a PowerPilz Smart Event Schedule entity in the card settings to configure this card.",
  "event_schedule.trigger_now": "Trigger event now",
  "event_schedule.trigger_now_blocked_running": "Pulse running — trigger locked",
  "event_schedule.trigger_now_blocked_cooldown": "Cool-down active — available again at {time}",
  "event_schedule.edit_dialog.default_title": "Edit weekly events",
  "event_schedule.edit_dialog.error_not_found": "Event schedule entity {entity} not found.",
  "event_schedule.edit_dialog.hint": "Click on an empty area of a day to add a pin (15-minute snap). Click an existing pin to edit its time or delete it.",
  "event_schedule.edit_dialog.hint_v2": "Click on an empty area to add a pin (15-minute snap). Click a pin to edit; drag it to move. Pins can't overlap.",
  "event_schedule.edit_dialog.edit_title": "Edit event · {day}",
  "event_schedule.edit_dialog.time": "Time",
  "event_schedule.editor.section_entities": "Entities",
  "event_schedule.editor.section_identity": "Identity",
  "event_schedule.editor.section_layout": "Layout",
  "event_schedule.editor.section_appearance": "Appearance",
  "event_schedule.editor.section_display": "Display options",
  "event_schedule.editor.section_actions": "Tap behavior",
  "event_schedule.editor.hold_action_help": "Default opens the inline event editor.",
  "event_schedule.editor.entity": "PowerPilz Smart Event Schedule entity",
  "event_schedule.editor.entity_help": "A PowerPilz Smart Event Schedule helper (select.* entity with schedule_kind=events from the PowerPilz Companion integration).",
  "event_schedule.editor.name": "Name",
  "event_schedule.editor.subtitle": "Subtitle",
  "event_schedule.editor.icon": "Icon",
  "event_schedule.editor.icon_color": "Icon color",
  "event_schedule.editor.card_layout": "Card layout",
  "event_schedule.editor.layout_horizontal": "Horizontal",
  "event_schedule.editor.layout_vertical": "Vertical",
  "event_schedule.editor.time_window": "Time window",
  "event_schedule.editor.tw_24": "24 h (full day)",
  "event_schedule.editor.tw_12": "12 h centered on now",
  "event_schedule.editor.tw_6": "6 h centered on now",
  "event_schedule.editor.active_color": "Pin color",
  "event_schedule.editor.show_day_selector": "Show day selector",
  "event_schedule.editor.show_mode_control": "Show mode button",
  "event_schedule.editor.show_trigger_button": "Show trigger-now button",
  "event_schedule.editor.show_now_indicator": "Show now indicator",
  "event_schedule.editor.show_time_labels": "Show time labels",
  "event_schedule.editor.tap_action": "Tap action",
  "event_schedule.editor.hold_action": "Hold action (default: event editor)",
  "event_schedule.editor.double_tap_action": "Double-tap action",
  "energy.download_csv": "Download data as CSV",
  "energy.overview_title": "Energy overview",
  "common.loading": "Loading…",
  "common.saving": "Saving…",
  "common.save": "Save",
  "schedule.placeholder_companion": "Pick a PowerPilz Smart Schedule entity in the card settings to configure this card.",
  "schedule.placeholder_manual": "Pick a schedule entity in the card settings to configure this card.",
  "schedule.editor.use_companion": "Use PowerPilz Companion integration",
  "schedule.editor.use_companion_help": "When enabled (default), configure only one entity — a PowerPilz Smart Schedule helper from the PowerPilz Companion integration — and the card reads the linked schedule and target device from its attributes. When disabled, configure the three entities manually (schedule / device / mode).",
  "schedule.editor.companion_entity": "PowerPilz Smart Schedule entity",
  "schedule.editor.companion_help": "A PowerPilz Smart Schedule helper (select.* entity from the PowerPilz Companion integration). The card reads the weekly plan and target device straight from its attributes. Edit the weekly plan by long-pressing the card.",
  "schedule.editor.schedule_entity": "Schedule entity",
  "schedule.editor.switch_entity": "Device entity",
  "schedule.editor.mode_entity": "Mode override entity",
  "schedule.editor.name": "Name",
  "schedule.editor.subtitle": "Subtitle",
  "schedule.editor.icon": "Icon",
  "schedule.editor.icon_color": "Icon color",
  "schedule.editor.card_layout": "Card layout",
  "schedule.editor.time_window": "Time window",
  "schedule.editor.active_color": "Active block color",
  "schedule.editor.show_day_selector": "Show day selector",
  "schedule.editor.show_mode_control": "Show mode button",
  "schedule.editor.show_now_indicator": "Show current time indicator",
  "schedule.editor.show_time_labels": "Show hour labels",
  "schedule.editor.layout_horizontal": "Horizontal",
  "schedule.editor.layout_vertical": "Vertical",
  "schedule.editor.tw_24": "24 hours (full day)",
  "schedule.editor.tw_12": "12 hours (±6h)",
  "schedule.editor.tw_6": "6 hours (±3h)",
  "schedule.editor.schedule_help": "A schedule helper entity (schedule domain). Create one in Settings > Devices & Services > Helpers > Add > Schedule. It defines the weekly on/off time blocks shown on the timeline. IMPORTANT: a schedule helper by itself does NOT turn any device on or off — it just has an on/off state based on the current time. You must create two automations that bridge the schedule to the device (see the 'Device entity' help text below for YAML).",
  "schedule.editor.switch_help": "The device this schedule controls (switch, light, or input_boolean). Automatically turned on/off when the mode changes to 'On' or 'Off' via the card. For the Auto mode (schedule-driven), you must create TWO automations in HA — one that fires when the schedule turns on and switches the device on, and one that does the opposite. Example YAML: triggers: [{trigger: state, entity_id: schedule.your_schedule, to: 'on'}], actions: [{action: switch.turn_on, target: {entity_id: switch.your_device}}]. Create a second mirror automation with to: 'off' and switch.turn_off. Optionally gate both with a condition that checks the mode entity is 'Auto' so manual overrides aren't immediately undone.",
  "schedule.editor.mode_help": "An input_select with options like 'Auto', 'On', 'Off' (create in Settings > Helpers > Dropdown). Controls the override mode: Timer/Auto = schedule runs normally, On = device always on, Off = device always off. Tap the card or mode button to cycle through modes. Use this entity as a condition in your schedule-to-device automations so they only fire when mode == 'Auto'.",
  "schedule.editor.time_window_help": "How many hours to display on the timeline. 24h shows the full day, 12h and 6h center on the current time.",
  "schedule.editor.active_color_help": "Color for the active (on) time blocks on the timeline.",
  "schedule.editor.card_layout_help": "Horizontal shows controls inline with the header. Vertical stacks everything for a taller card.",
  "schedule.editor.show_day_help": "Show or hide the weekday selector bar.",
  "schedule.editor.show_mode_help": "Show or hide the mode override button (Timer/On/Off) in the card header.",
  "schedule.editor.show_now_help": "Show a vertical line on the timeline at the current time.",
  "schedule.editor.show_labels_help": "Show hour labels above the timeline.",
  // --- Switch card ---
  "switch.default_name": "Mode",
  "switch.editor.section_identity": "Identity",
  "switch.editor.section_layout": "Layout",
  "switch.editor.section_slider": "Slider appearance",
  "switch.editor.section_state_custom": "State customization",
  "switch.editor.state_n_title": "State {n}",
  "switch.editor.state_1_title": "State 1 (Off / first option)",
  "switch.editor.name": "Name",
  "switch.editor.subtitle": "Subtitle",
  "switch.editor.icon": "Icon",
  "switch.editor.icon_color": "Icon color",
  "switch.editor.dim_inactive_icon": "Dim icon in first state (off)",
  "switch.editor.entity": "State entity",
  "switch.editor.card_layout": "Card layout",
  "switch.editor.slider_size": "Slider width",
  "switch.editor.slider_color": "Slider color",
  "switch.editor.use_custom_icons": "Custom icons per state",
  "switch.editor.state_color": "Color",
  "switch.editor.state_icon": "Icon",
  "switch.editor.layout_horizontal": "Horizontal (1 row)",
  "switch.editor.layout_vertical": "Vertical (2 rows)",
  "switch.editor.slider_small": "Small",
  "switch.editor.slider_medium": "Medium",
  "switch.editor.slider_large": "Large",
  // --- Wallbox card ---
  "wallbox.default_name": "Wallbox",
  "wallbox.ev_charger": "EV charger",
  "wallbox.start": "Start",
  "wallbox.stop": "Stop",
  "wallbox.mode_fallback": "Mode",
  "wallbox.status_charging": "Charging",
  "wallbox.status_ready": "Ready",
  "wallbox.status_idle": "Idle",
  "wallbox.status_paused": "Paused",
  "wallbox.status_complete": "Complete",
  "wallbox.editor.name": "Name",
  "wallbox.editor.icon": "Icon",
  "wallbox.editor.icon_color": "Icon color",
  "wallbox.editor.power_entity": "Power entity",
  "wallbox.editor.status_entity": "Status entity",
  "wallbox.editor.mode_entity": "Mode entity",
  "wallbox.editor.command_entity": "Command entity",
  "wallbox.editor.show_mode": "Show mode selector",
  "wallbox.editor.show_live": "Show live status and power",
  "wallbox.editor.show_button": "Show play/pause button",
  "wallbox.editor.decimals": "Decimals",
  "wallbox.editor.auto_scale": "Auto unit scaling (W↔kW, Wh↔kWh)",
  "wallbox.editor.decimals_base": "Decimals (base unit)",
  "wallbox.editor.decimals_prefixed": "Decimals (prefixed units)",
  // --- Graph cards (editor section titles + common labels) ---
  "graph.editor.section_graph_settings": "Graph settings",
  "graph.editor.section_display_options": "Display options",
  "graph.editor.section_stacked_percent": "Stacked percent",
  "graph.editor.section_units": "Units and format",
  "graph.editor.section_actions": "Actions",
  "graph.editor.section_display_format": "Display format",
  "graph.editor.section_auto_scaling": "Auto scaling",
  "graph.editor.entity_title": "Entity {n}",
  "graph.editor.layout": "Layout",
  "graph.editor.timeframe_hours": "Range",
  "graph.editor.hover_enabled": "Hover",
  "graph.editor.fill_area_enabled": "Area fill",
  "graph.editor.shared_trend_scale": "Shared scale",
  "graph.editor.trend_data_source": "Trend source",
  "graph.editor.clip_graph_to_labels": "Clip below labels",
  "graph.editor.line_thickness": "Line width",
  "graph.editor.unit": "Unit",
  "graph.editor.decimals": "Decimals",
  "graph.editor.auto_scale_units": "Auto unit scaling",
  "graph.editor.decimals_base_unit": "Decimals (base unit)",
  "graph.editor.decimals_prefixed_unit": "Decimals (prefixed units)",
  "graph.editor.normalize_stack_to_percent": "Normalize to 100%",
  "graph.editor.percent_reference_slot": "100% reference entity",
  "graph.editor.percent_reference_auto": "Auto-calculate reference",
  "graph.editor.entity": "Action entity",
  "graph.editor.tap_action": "Tap behavior",
  "graph.editor.hold_action": "Hold behavior",
  "graph.editor.double_tap_action": "Double tap behavior",
  // --- Heating curve card ---
  "heating_curve.default_name": "Heating Curve",
  "heating_curve.placeholder": "Pick a PowerPilz Smart Curve entity in the card settings to configure this card.",
  "heating_curve.edit_dialog.default_title": "Edit weekly heating curve",
  "heating_curve.edit_dialog.error_not_found": "Curve entity {entity} not found.",
  "heating_curve.edit_dialog.same_for_all": "Same curve every day",
  "heating_curve.edit_dialog.range_label": "Range",
  "heating_curve.edit_dialog.all_days": "All days",
  "heating_curve.edit_dialog.copy": "Copy day",
  "heating_curve.edit_dialog.paste": "Paste here",
  "heating_curve.edit_dialog.hint": "Tap an empty area to add a point. Drag a point to move it (15-minute snap on time). Click a point to edit time and temperature, or delete it (each day must keep at least one).",
  "heating_curve.edit_dialog.edit_title": "Edit point · {day}",
  "heating_curve.edit_dialog.time": "Time",
  "heating_curve.edit_dialog.value": "Temperature",
  "heating_curve.edit_dialog.delete": "Delete",
  "heating_curve.edit_dialog.err_time": "Invalid time",
  "heating_curve.edit_dialog.err_overlap": "Time collides with a neighbouring point",
  "heating_curve.edit_dialog.err_last_point": "Each day must keep at least one point",
  "heating_curve.editor.hold_action_help": "Default opens the inline curve editor.",
  "heating_curve.editor.section_entities": "Entities",
  "heating_curve.editor.section_identity": "Identity",
  "heating_curve.editor.section_appearance": "Appearance",
  "heating_curve.editor.section_display": "Display options",
  "heating_curve.editor.section_actions": "Tap behavior",
  "heating_curve.editor.entity": "PowerPilz Smart Curve entity",
  "heating_curve.editor.entity_help": "A PowerPilz Smart Curve helper (select.* entity from the Companion integration).",
  "heating_curve.editor.name": "Name",
  "heating_curve.editor.subtitle": "Subtitle",
  "heating_curve.editor.icon": "Icon",
  "heating_curve.editor.icon_color": "Icon color",
  "heating_curve.editor.active_color": "Curve color",
  "heating_curve.editor.show_day_selector": "Show day selector",
  "heating_curve.editor.show_mode_control": "Show mode button",
  "heating_curve.editor.show_now_indicator": "Show now indicator",
  "heating_curve.editor.show_time_labels": "Show time labels",
  "heating_curve.editor.tap_action": "Tap action",
  "heating_curve.editor.hold_action": "Hold action (default: curve editor)",
  "heating_curve.editor.double_tap_action": "Double-tap action"
}, xc = {
  // --- Common ---
  "common.cancel": "Abbrechen",
  "common.set": "Setzen",
  "common.on": "Ein",
  "common.off": "Aus",
  "common.active": "Aktiv",
  "common.unknown": "Unbekannt",
  "common.invalid_config": "Ungültige Konfiguration",
  "common.today": "Heute",
  "common.tomorrow": "Morgen",
  // --- Weekday short ---
  "weekday.short.0": "So",
  "weekday.short.1": "Mo",
  "weekday.short.2": "Di",
  "weekday.short.3": "Mi",
  "weekday.short.4": "Do",
  "weekday.short.5": "Fr",
  "weekday.short.6": "Sa",
  // --- Timer card ---
  "timer.default_name": "Timer",
  "timer.turn_on_at": "Einschalten um:",
  "timer.turn_off_at_optional": "Ausschalten um (optional):",
  "timer.only_on": "Nur Ein",
  "timer.only_off": "Nur Aus",
  "timer.set_to_at": "Auf '{option}' setzen um:",
  "timer.only_option": "Nur '{option}'",
  "timer.mode_label": "Modus:",
  "timer.cancel_title": "Diesen Timer abbrechen?",
  "timer.cancel_hint": "Die geplante Aktion wird entfernt.",
  "timer.keep_timer": "Timer behalten",
  "timer.cancel_timer": "Timer abbrechen",
  "timer.timer_active": "Timer aktiv",
  "timer.time_now": "jetzt",
  "timer.time_in_m": "in {m} Min",
  "timer.time_in_hm": "in {h}h {m}m",
  "timer.time_in_dh": "in {d}d {h}h",
  "timer.subtitle_on": "Ein {time}",
  "timer.subtitle_off": "Aus {time}",
  "timer.editor.section_entities": "Entitäten",
  "timer.editor.section_identity": "Erscheinungsbild",
  "timer.editor.section_appearance": "Farben",
  "timer.editor.use_companion": "PowerPilz Companion Integration nutzen",
  "timer.editor.use_companion_help": "Wenn aktiviert (Standard), musst du nur eine einzige Entität angeben — einen PowerPilz Smart Timer aus der Companion Integration — die Karte liest Zielgerät, Ein/Aus-Zeiten und Aktiv-Flag automatisch aus deren Attributen. Wenn deaktiviert, gibst du die vier Entitäten manuell an (Gerät / Einschalt-Zeit / Ausschalt-Zeit / Aktiv-Flag).",
  "timer.editor.companion_entity": "PowerPilz Smart Timer-Entität",
  "timer.editor.companion_help": "Ein PowerPilz Smart Timer-Helfer (switch.* Entität, angelegt von der Companion Integration). Die Karte liest automatisch deren `target_entity`-, `on_datetime`- und `off_datetime`-Attribute und nutzt den `powerpilz_companion.set_timer`-Service zum Setzen der Zeiten.",
  "timer.placeholder_companion": "Wähle in den Karten-Einstellungen eine PowerPilz Smart Timer-Entität aus, um diese Karte zu konfigurieren.",
  "timer.placeholder_manual": "Wähle in den Karten-Einstellungen die vier Timer-Entitäten aus, um diese Karte zu konfigurieren.",
  "timer.editor.switch_entity": "Zu steuerndes Gerät",
  "timer.editor.on_datetime_entity": "Einschalt-Zeit Helfer",
  "timer.editor.off_datetime_entity": "Ausschalt-Zeit Helfer (optional)",
  "timer.editor.active_entity": "Timer-Aktiv Flag",
  "timer.editor.name": "Name",
  "timer.editor.subtitle": "Untertitel",
  "timer.editor.icon": "Symbol",
  "timer.editor.icon_color": "Symbolfarbe",
  "timer.editor.active_color": "Farbe für aktiven Timer",
  "timer.editor.switch_help": "Das zu steuernde Gerät (switch, light oder input_boolean). Diese Entität wird zur geplanten Zeit ein- oder ausgeschaltet.",
  "timer.editor.on_help": "Ein input_datetime Helfer (mit Datum UND Zeit aktiviert), der den Einschaltzeitpunkt speichert. Erstellen unter Einstellungen > Geräte & Dienste > Helfer > Hinzufügen > Datum und/oder Zeit. Beide Optionen 'Datum' und 'Zeit' aktivieren. Dann eine Automation erstellen: Trigger bei Zeit dieser Entität → Gerät einschalten.",
  "timer.editor.off_help": "Optional: ein input_datetime Helfer für den Ausschaltzeitpunkt. Gleiches Setup wie der Einschalt-Helfer. Wenn nicht gesetzt, plant die Karte nur das Einschalten. Eine zweite Automation erstellen: Trigger bei Zeit dieser Entität → Gerät ausschalten.",
  "timer.editor.active_help": "Ein input_boolean, das anzeigt, ob ein Timer aktuell geplant ist. Die Karte schaltet ihn beim Planen ein und beim Abbrechen aus. Nutze ihn als Bedingung in den Automationen, damit sie nur feuern wenn der Timer aktiv ist.",
  "timer.editor.active_color_help": "Farbe für das Aktiv-Badge und Hervorhebungen.",
  // --- Schedule card ---
  "schedule.default_name": "Zeitplan",
  "schedule.timer_label": "Zeitschaltuhr",
  "schedule.editor.section_entities": "Entitäten",
  "schedule.editor.section_identity": "Erscheinungsbild",
  "schedule.editor.section_layout": "Layout",
  "schedule.editor.section_appearance": "Farben",
  "schedule.editor.section_display": "Anzeige-Optionen",
  "schedule.editor.section_actions": "Tap-Verhalten",
  "schedule.editor.hold_action_help": "Standard öffnet den Plan-Editor.",
  "schedule.editor.tap_action": "Tipp-Aktion",
  "schedule.editor.hold_action": "Lange-Tipp-Aktion (Standard: Plan-Editor)",
  "schedule.editor.double_tap_action": "Doppeltipp-Aktion",
  "schedule.edit_dialog.default_title": "Wochenplan bearbeiten",
  "schedule.edit_dialog.error_no_ws": "Home Assistant Websocket-Verbindung nicht verfügbar.",
  "schedule.edit_dialog.error_not_found": "Kein Zeitplan-Helfer für {entity} gefunden. Wurde er gelöscht?",
  "schedule.edit_dialog.form_not_loaded": "Der native Zeitplan-Editor wurde in dieser Browser-Session noch nicht geladen. Öffne einmal einen Zeitplan-Helfer unter Einstellungen → Helfer, dann drücke erneut lange auf die Karte.",
  "schedule.edit_dialog.open_native_info": "In Home Assistant öffnen",
  "schedule.edit_dialog.hint": "Tippe auf eine leere Stelle eines Tages, um einen 1-Stunden-Block hinzuzufügen. Tippe einen Block an, um ihn zu löschen. 30-Minuten-Raster.",
  "schedule.edit_dialog.hint_v2": "Klicken und ziehen auf einem Tag erstellt einen Block (15-Minuten-Raster). Klick auf einen Block öffnet das Detail-Fenster für exakte Zeit, Daten oder Löschen.",
  "schedule.edit_dialog.hint_v3": "Klicken und ziehen auf leerer Fläche erstellt einen neuen Block. Klick auf einen Block öffnet die Bearbeitung; ziehen verschiebt ihn. Aneinanderstoßende Blöcke werden automatisch zusammengeführt.",
  "schedule.edit_dialog.same_for_all": "Jeden Tag gleicher Plan",
  "schedule.edit_dialog.all_days": "Alle Tage",
  "schedule.edit_dialog.block_title": "Block bearbeiten · {day}",
  "schedule.edit_dialog.event_title": "Event bearbeiten · {day}",
  "schedule.edit_dialog.event_time": "Zeit",
  "schedule.edit_dialog.from": "Start",
  "schedule.edit_dialog.to": "Ende",
  "schedule.edit_dialog.data": "Zusätzliche Daten (optional)",
  "schedule.edit_dialog.data_help": 'JSON-Objekt, z.B. {"mode": "heat", "target": 21}',
  "schedule.edit_dialog.delete": "Löschen",
  "schedule.edit_dialog.err_time": "Ungültige Zeit — Format HH:MM oder HH:MM:SS.",
  "schedule.edit_dialog.err_order": "Start muss vor Ende liegen.",
  "schedule.edit_dialog.err_overlap": "Dieser Block überschneidet einen anderen Block am gleichen Tag.",
  "schedule.edit_dialog.err_data": 'Ungültiges JSON — muss ein Objekt-Literal sein, z.B. {"key": "value"}.',
  "schedule.trigger_now": "Event jetzt auslösen",
  "schedule.trigger_now_blocked_running": "Pulse läuft – Trigger gesperrt",
  "schedule.trigger_now_blocked_cooldown": "Cool-Down aktiv – wieder verfügbar um {time}",
  "event_schedule.default_name": "Event-Zeitschaltuhr",
  "event_schedule.placeholder": "Wähle in den Karten-Einstellungen eine PowerPilz Smart Event-Zeitschaltuhr-Entität, um diese Karte zu konfigurieren.",
  "event_schedule.trigger_now": "Event jetzt auslösen",
  "event_schedule.trigger_now_blocked_running": "Pulse läuft – Trigger gesperrt",
  "event_schedule.trigger_now_blocked_cooldown": "Cool-Down aktiv – wieder verfügbar um {time}",
  "event_schedule.edit_dialog.default_title": "Wochen-Events bearbeiten",
  "event_schedule.edit_dialog.error_not_found": "Event-Zeitschaltuhr {entity} nicht gefunden.",
  "event_schedule.edit_dialog.hint": "Klick auf leere Fläche eines Tages fügt einen Pin hinzu (15-Minuten-Raster). Klick auf einen vorhandenen Pin öffnet das Detail-Fenster für Zeit oder Löschen.",
  "event_schedule.edit_dialog.hint_v2": "Klick auf leere Fläche fügt einen Pin hinzu (15-Minuten-Raster). Klick auf einen Pin öffnet die Bearbeitung; ziehen verschiebt ihn. Pins dürfen sich nicht überlagern.",
  "event_schedule.edit_dialog.edit_title": "Event bearbeiten · {day}",
  "event_schedule.edit_dialog.time": "Zeit",
  "event_schedule.editor.section_entities": "Entitäten",
  "event_schedule.editor.section_identity": "Identität",
  "event_schedule.editor.section_layout": "Layout",
  "event_schedule.editor.section_appearance": "Aussehen",
  "event_schedule.editor.section_display": "Anzeigeoptionen",
  "event_schedule.editor.section_actions": "Tap-Verhalten",
  "event_schedule.editor.hold_action_help": "Standard öffnet den Event-Editor.",
  "event_schedule.editor.entity": "PowerPilz Smart Event-Zeitschaltuhr-Entität",
  "event_schedule.editor.entity_help": "Eine PowerPilz Smart Event-Zeitschaltuhr (select.*-Entität mit schedule_kind=events der PowerPilz Companion Integration).",
  "event_schedule.editor.name": "Name",
  "event_schedule.editor.subtitle": "Untertitel",
  "event_schedule.editor.icon": "Symbol",
  "event_schedule.editor.icon_color": "Symbol-Farbe",
  "event_schedule.editor.card_layout": "Karten-Layout",
  "event_schedule.editor.layout_horizontal": "Horizontal",
  "event_schedule.editor.layout_vertical": "Vertikal",
  "event_schedule.editor.time_window": "Zeitfenster",
  "event_schedule.editor.tw_24": "24 h (ganzer Tag)",
  "event_schedule.editor.tw_12": "12 h zentriert um jetzt",
  "event_schedule.editor.tw_6": "6 h zentriert um jetzt",
  "event_schedule.editor.active_color": "Pin-Farbe",
  "event_schedule.editor.show_day_selector": "Tagewahl anzeigen",
  "event_schedule.editor.show_mode_control": "Modus-Button anzeigen",
  "event_schedule.editor.show_trigger_button": "Trigger-Now-Button anzeigen",
  "event_schedule.editor.show_now_indicator": "Jetzt-Markierung anzeigen",
  "event_schedule.editor.show_time_labels": "Zeit-Beschriftungen anzeigen",
  "event_schedule.editor.tap_action": "Tap-Aktion",
  "event_schedule.editor.hold_action": "Lange-Tipp-Aktion (Standard: Event-Editor)",
  "event_schedule.editor.double_tap_action": "Doppeltap-Aktion",
  "energy.download_csv": "Daten als CSV herunterladen",
  "energy.overview_title": "Energie-Übersicht",
  "common.loading": "Lade…",
  "common.saving": "Speichere…",
  "common.save": "Speichern",
  "schedule.placeholder_companion": "Wähle in den Karten-Einstellungen eine PowerPilz Smart-Zeitschaltuhr-Entität aus, um diese Karte zu konfigurieren.",
  "schedule.placeholder_manual": "Wähle in den Karten-Einstellungen eine Zeitplan-Entität aus, um diese Karte zu konfigurieren.",
  "schedule.editor.use_companion": "PowerPilz Companion Integration nutzen",
  "schedule.editor.use_companion_help": "Wenn aktiviert (Standard), musst du nur eine einzige Entität angeben — einen PowerPilz Smart-Zeitschaltuhr-Helfer aus der PowerPilz Companion Integration — die Karte liest den verknüpften Zeitplan und das Zielgerät automatisch aus deren Attributen. Wenn deaktiviert, gibst du die drei Entitäten (Zeitplan / Gerät / Modus) manuell an.",
  "schedule.editor.companion_entity": "PowerPilz Smart-Zeitschaltuhr-Entität",
  "schedule.editor.companion_help": "Ein PowerPilz Smart-Zeitschaltuhr-Helfer (select.* Entität aus der PowerPilz Companion Integration). Die Karte liest den Wochenplan und das Zielgerät direkt aus deren Attributen. Wochenplan bearbeiten: lange auf die Karte drücken.",
  "schedule.editor.schedule_entity": "Zeitplan-Entität",
  "schedule.editor.switch_entity": "Geräte-Entität",
  "schedule.editor.mode_entity": "Modus-Override Entität",
  "schedule.editor.name": "Name",
  "schedule.editor.subtitle": "Untertitel",
  "schedule.editor.icon": "Symbol",
  "schedule.editor.icon_color": "Symbolfarbe",
  "schedule.editor.card_layout": "Karten-Layout",
  "schedule.editor.time_window": "Zeitfenster",
  "schedule.editor.active_color": "Farbe aktiver Blöcke",
  "schedule.editor.show_day_selector": "Wochentag-Auswahl anzeigen",
  "schedule.editor.show_mode_control": "Modus-Button anzeigen",
  "schedule.editor.show_now_indicator": "Aktuelle Zeit anzeigen",
  "schedule.editor.show_time_labels": "Stunden-Labels anzeigen",
  "schedule.editor.layout_horizontal": "Horizontal",
  "schedule.editor.layout_vertical": "Vertikal",
  "schedule.editor.tw_24": "24 Stunden (ganzer Tag)",
  "schedule.editor.tw_12": "12 Stunden (±6h)",
  "schedule.editor.tw_6": "6 Stunden (±3h)",
  "schedule.editor.schedule_help": "Ein Schedule-Helfer (Domain 'schedule'). Anlegen unter Einstellungen > Geräte & Dienste > Helfer > Hinzufügen > Zeitplan. Definiert die wöchentlichen Ein/Aus-Zeitblöcke für die Zeitleiste. WICHTIG: Ein Schedule-Helfer schaltet selbst KEIN Gerät ein oder aus — er hat nur einen eigenen Ein/Aus-Status basierend auf der aktuellen Zeit. Du musst zwei Automations anlegen, die den Schedule mit dem Gerät verbinden (siehe Hilfetext beim Feld 'Geräte-Entität' unten für YAML-Beispiel).",
  "schedule.editor.switch_help": "Das Gerät, das dieser Zeitplan steuert (switch, light oder input_boolean). Wird automatisch ein- bzw. ausgeschaltet wenn der Modus auf 'Ein' oder 'Aus' wechselt (manueller Override über die Karte). Für den Auto-Modus (Schedule-gesteuert) musst du ZWEI Automations in HA anlegen — eine die feuert wenn der Schedule angeht und das Gerät einschaltet, und eine die das Gegenteil tut. YAML-Beispiel: triggers: [{trigger: state, entity_id: schedule.dein_zeitplan, to: 'on'}], actions: [{action: switch.turn_on, target: {entity_id: switch.dein_geraet}}]. Zweite Automation spiegelverkehrt mit to: 'off' und switch.turn_off. Optional beide Automations mit einer Bedingung versehen, die prüft ob die Modus-Entität auf 'Auto' steht, damit manuelle Overrides nicht sofort wieder überschrieben werden.",
  "schedule.editor.mode_help": "Ein input_select mit Optionen wie 'Auto', 'On', 'Off' (anlegen unter Einstellungen > Helfer > Dropdown). Steuert den Override-Modus: Timer/Auto = Zeitplan läuft normal, Ein = Gerät immer an, Aus = Gerät immer aus. Tippen auf die Karte oder den Modus-Button wechselt den Modus. Nutze diese Entität als Bedingung in deinen Schedule-zu-Gerät Automations, damit sie nur feuern wenn Modus == 'Auto'.",
  "schedule.editor.time_window_help": "Wie viele Stunden auf der Zeitleiste angezeigt werden. 24h zeigt den ganzen Tag, 12h und 6h zentrieren sich auf die aktuelle Zeit.",
  "schedule.editor.active_color_help": "Farbe für die aktiven (eingeschalteten) Zeitblöcke.",
  "schedule.editor.card_layout_help": "Horizontal zeigt die Controls neben dem Header. Vertikal stapelt alles für eine höhere Karte.",
  "schedule.editor.show_day_help": "Wochentag-Auswahlleiste anzeigen oder verbergen.",
  "schedule.editor.show_mode_help": "Modus-Button (Timer/Ein/Aus) im Karten-Header anzeigen oder verbergen.",
  "schedule.editor.show_now_help": "Vertikale Linie auf der Zeitleiste bei der aktuellen Zeit anzeigen.",
  "schedule.editor.show_labels_help": "Stunden-Beschriftungen über der Zeitleiste anzeigen.",
  // --- Switch card ---
  "switch.default_name": "Modus",
  "switch.editor.section_identity": "Erscheinungsbild",
  "switch.editor.section_layout": "Layout",
  "switch.editor.section_slider": "Slider-Design",
  "switch.editor.section_state_custom": "Zustands-Anpassung",
  "switch.editor.state_n_title": "Zustand {n}",
  "switch.editor.state_1_title": "Zustand 1 (Aus / erste Option)",
  "switch.editor.name": "Name",
  "switch.editor.subtitle": "Untertitel",
  "switch.editor.icon": "Symbol",
  "switch.editor.icon_color": "Symbolfarbe",
  "switch.editor.dim_inactive_icon": "Symbol im ersten Zustand (Aus) ausgrauen",
  "switch.editor.entity": "Zustands-Entität",
  "switch.editor.card_layout": "Karten-Layout",
  "switch.editor.slider_size": "Slider-Breite",
  "switch.editor.slider_color": "Slider-Farbe",
  "switch.editor.use_custom_icons": "Eigene Symbole pro Zustand",
  "switch.editor.state_color": "Farbe",
  "switch.editor.state_icon": "Symbol",
  "switch.editor.layout_horizontal": "Horizontal (1 Zeile)",
  "switch.editor.layout_vertical": "Vertikal (2 Zeilen)",
  "switch.editor.slider_small": "Klein",
  "switch.editor.slider_medium": "Mittel",
  "switch.editor.slider_large": "Groß",
  // --- Wallbox card ---
  "wallbox.default_name": "Wallbox",
  "wallbox.ev_charger": "Ladestation",
  "wallbox.start": "Start",
  "wallbox.stop": "Stopp",
  "wallbox.mode_fallback": "Modus",
  "wallbox.status_charging": "Lädt",
  "wallbox.status_ready": "Bereit",
  "wallbox.status_idle": "Inaktiv",
  "wallbox.status_paused": "Pausiert",
  "wallbox.status_complete": "Abgeschlossen",
  "wallbox.editor.name": "Name",
  "wallbox.editor.icon": "Symbol",
  "wallbox.editor.icon_color": "Symbolfarbe",
  "wallbox.editor.power_entity": "Leistungs-Entität",
  "wallbox.editor.status_entity": "Status-Entität",
  "wallbox.editor.mode_entity": "Modus-Entität",
  "wallbox.editor.command_entity": "Steuer-Entität",
  "wallbox.editor.show_mode": "Modus-Auswahl anzeigen",
  "wallbox.editor.show_live": "Live-Status und Leistung anzeigen",
  "wallbox.editor.show_button": "Play/Pause-Button anzeigen",
  "wallbox.editor.decimals": "Nachkommastellen",
  "wallbox.editor.auto_scale": "Einheiten-Skalierung (W↔kW, Wh↔kWh)",
  "wallbox.editor.decimals_base": "Nachkommastellen (Basis-Einheit)",
  "wallbox.editor.decimals_prefixed": "Nachkommastellen (skalierte Einheit)",
  // --- Graph cards ---
  "graph.editor.section_graph_settings": "Graph-Einstellungen",
  "graph.editor.section_display_options": "Anzeige-Optionen",
  "graph.editor.section_stacked_percent": "Gestapelt in Prozent",
  "graph.editor.section_units": "Einheiten & Format",
  "graph.editor.section_actions": "Aktionen",
  "graph.editor.section_display_format": "Anzeige-Format",
  "graph.editor.section_auto_scaling": "Auto-Skalierung",
  "graph.editor.entity_title": "Entität {n}",
  "graph.editor.layout": "Layout",
  "graph.editor.timeframe_hours": "Zeitraum",
  "graph.editor.hover_enabled": "Hover",
  "graph.editor.fill_area_enabled": "Flächenfüllung",
  "graph.editor.shared_trend_scale": "Gemeinsame Skala",
  "graph.editor.trend_data_source": "Datenquelle",
  "graph.editor.clip_graph_to_labels": "Unterhalb Labels abschneiden",
  "graph.editor.line_thickness": "Linienstärke",
  "graph.editor.unit": "Einheit",
  "graph.editor.decimals": "Nachkommastellen",
  "graph.editor.auto_scale_units": "Einheiten-Skalierung",
  "graph.editor.decimals_base_unit": "Nachkommastellen (Basis-Einheit)",
  "graph.editor.decimals_prefixed_unit": "Nachkommastellen (skalierte Einheit)",
  "graph.editor.normalize_stack_to_percent": "Auf 100% normalisieren",
  "graph.editor.percent_reference_slot": "100%-Referenz-Entität",
  "graph.editor.percent_reference_auto": "Referenz automatisch berechnen",
  "graph.editor.entity": "Aktions-Entität",
  "graph.editor.tap_action": "Verhalten bei Tap",
  "graph.editor.hold_action": "Verhalten bei Halten",
  "graph.editor.double_tap_action": "Verhalten bei Doppeltap",
  // --- Heating curve card ---
  "heating_curve.default_name": "Heizkurve",
  "heating_curve.placeholder": "Wähle in den Karten-Einstellungen eine PowerPilz Smart-Curve-Entität.",
  "heating_curve.edit_dialog.default_title": "Wochen-Heizkurve bearbeiten",
  "heating_curve.edit_dialog.error_not_found": "Heizkurven-Entität {entity} nicht gefunden.",
  "heating_curve.edit_dialog.same_for_all": "Gleiche Kurve für jeden Tag",
  "heating_curve.edit_dialog.range_label": "Bereich",
  "heating_curve.edit_dialog.all_days": "Alle Tage",
  "heating_curve.edit_dialog.copy": "Tag kopieren",
  "heating_curve.edit_dialog.paste": "Hier einfügen",
  "heating_curve.edit_dialog.hint": "Auf eine leere Stelle tippen, um einen Punkt hinzuzufügen. Punkt ziehen, um ihn zu verschieben (15-Minuten-Raster auf der Zeit). Auf einen Punkt klicken, um Zeit und Temperatur zu bearbeiten oder ihn zu löschen (mindestens ein Punkt pro Tag bleibt erhalten).",
  "heating_curve.edit_dialog.edit_title": "Punkt bearbeiten · {day}",
  "heating_curve.edit_dialog.time": "Zeit",
  "heating_curve.edit_dialog.value": "Temperatur",
  "heating_curve.edit_dialog.delete": "Löschen",
  "heating_curve.edit_dialog.err_time": "Ungültige Zeit",
  "heating_curve.edit_dialog.err_overlap": "Zeit kollidiert mit benachbartem Punkt",
  "heating_curve.edit_dialog.err_last_point": "Mindestens ein Punkt pro Tag muss erhalten bleiben",
  "heating_curve.editor.hold_action_help": "Standard öffnet den Kurven-Editor.",
  "heating_curve.editor.section_entities": "Entitäten",
  "heating_curve.editor.section_identity": "Identität",
  "heating_curve.editor.section_appearance": "Erscheinungsbild",
  "heating_curve.editor.section_display": "Anzeige-Optionen",
  "heating_curve.editor.section_actions": "Tap-Verhalten",
  "heating_curve.editor.entity": "PowerPilz Smart-Curve-Entität",
  "heating_curve.editor.entity_help": "Eine PowerPilz Smart-Curve-Hilfsentität (select.* aus der Companion-Integration).",
  "heating_curve.editor.name": "Name",
  "heating_curve.editor.subtitle": "Untertitel",
  "heating_curve.editor.icon": "Symbol",
  "heating_curve.editor.icon_color": "Symbolfarbe",
  "heating_curve.editor.active_color": "Kurvenfarbe",
  "heating_curve.editor.show_day_selector": "Tagesauswahl anzeigen",
  "heating_curve.editor.show_mode_control": "Modus-Button anzeigen",
  "heating_curve.editor.show_now_indicator": "Jetzt-Marker anzeigen",
  "heating_curve.editor.show_time_labels": "Uhrzeitmarker anzeigen",
  "heating_curve.editor.tap_action": "Tap-Aktion",
  "heating_curve.editor.hold_action": "Lange-Tipp-Aktion (Standard: Kurven-Editor)",
  "heating_curve.editor.double_tap_action": "Doppeltap-Aktion"
}, Sc = { en: mn, de: xc };
function u(t, e, i) {
  let r = (Sc[t === "de" ? "de" : "en"] ?? mn)[e] ?? mn[e] ?? e;
  if (i)
    for (const [s, a] of Object.entries(i))
      r = r.replace(new RegExp(`\\{${s}\\}`, "g"), String(a));
  return r;
}
function ne(t, e) {
  return u(t, `weekday.short.${(e % 7 + 7) % 7}`);
}
var $c = Object.defineProperty, K = (t, e, i, n) => {
  for (var o = void 0, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = s(e, i, o) || o);
  return o && $c(e, i, o), o;
};
const fn = "power-pilz-energy-node-dialog", Yt = [
  { id: "24h", label: "24 h", hours: 24 },
  { id: "48h", label: "48 h", hours: 48 },
  { id: "7d", label: "7 d", hours: 168 },
  { id: "30d", label: "30 d", hours: 720 },
  { id: "90d", label: "90 d", hours: 2160 },
  { id: "6m", label: "6 M", hours: 720 * 6 },
  { id: "1y", label: "1 J", hours: 24 * 365 }
], Ec = "7d", hr = (t) => {
  const e = document.createElement(fn);
  e.hass = t.hass, e.energyConfig = t.config, e.focusedNodeKey = t.focusedNodeKey, e.overview = t.overview === !0, document.body.appendChild(e);
}, uo = class uo extends le {
  constructor() {
    super(...arguments), this.focusedNodeKey = "", this.overview = !1, this._allSeries = [], this._selectedIds = /* @__PURE__ */ new Set(), this._mode = "single", this._presetId = Ec, this._useCustomRange = !1, this._customStartIso = "", this._customEndIso = "", this._historyByEntity = /* @__PURE__ */ new Map(), this._loading = !1, this._openPopover = null, this._focusedEntityIdOverride = null, this._fetchAbort = 0, this._chartContext = null, this._canvasLogicalSize = { width: 0, height: 0 }, this._onDocumentMouseDown = (e) => {
      if (this._openPopover === null) return;
      e.composedPath().some((o) => o instanceof HTMLElement ? o.dataset.ppPopover === this._openPopover || o.dataset.ppPopoverTrigger === this._openPopover : !1) || (this._openPopover = null);
    }, this._onCustomStartChange = (e) => {
      this._customStartIso = e.target.value, this._useCustomRange && this._fetchHistory();
    }, this._onCustomEndChange = (e) => {
      this._customEndIso = e.target.value, this._useCustomRange && this._fetchHistory();
    }, this._onChartPointerMove = (e) => {
      if (!this._chartContext) return;
      const i = this.renderRoot.querySelector(".pp-chart-canvas");
      if (!i) return;
      const n = i.getBoundingClientRect(), o = e.clientX - n.left, r = e.clientY - n.top, s = this._chartContext;
      if (o < s.innerLeft || o > s.innerRight || r < s.innerTop || r > s.innerBottom) {
        this._hover && (this._hover = void 0);
        return;
      }
      const a = s.pixelToTimestamp(o);
      this._hover = { canvasX: o, ts: a };
    }, this._onChartPointerLeave = () => {
      this._hover && (this._hover = void 0);
    }, this._handleDownloadCsv = () => {
      if (this._loading || this._historyByEntity.size === 0) return;
      const e = this._allSeries.filter((a) => this._selectedIds.has(a.id));
      if (e.length === 0) return;
      const i = this._activeWindow(), n = bc(
        e.map((a) => ({
          label: a.label,
          entityId: a.entityId,
          unit: a.unit,
          points: this._historyByEntity.get(a.entityId) ?? []
        }))
      ), o = dr(this.dialogTitle || "energy"), r = new Date(i.endMs).toISOString().slice(0, 10), s = `powerpilz-${o}-${dr(this._windowLabel())}-${r}.csv`;
      wc(s, n);
    };
  }
  // ------------------------------------------------------------
  // Lifecycle
  // ------------------------------------------------------------
  connectedCallback() {
    if (super.connectedCallback(), this._allSeries = ks(this.hass, this.energyConfig), !this._customStartIso || !this._customEndIso) {
      const e = /* @__PURE__ */ new Date(), i = new Date(e.getTime() - 168 * 3600 * 1e3);
      this._customEndIso = ur(e), this._customStartIso = ur(i);
    }
    this.overview && (this._mode = "overlay", this._presetId = "24h"), this._selectedIds = new Set(this._defaultSelection().map((e) => e.id)), this.dialogTitle = this._titleForFocusedNode(), document.addEventListener("mousedown", this._onDocumentMouseDown, !0), this._fetchHistory();
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), document.removeEventListener("mousedown", this._onDocumentMouseDown, !0), (e = this._resizeObserver) == null || e.disconnect(), this._resizeObserver = void 0, this._renderRaf !== void 0 && (cancelAnimationFrame(this._renderRaf), this._renderRaf = void 0);
  }
  _togglePopover(e) {
    this._openPopover = this._openPopover === e ? null : e;
  }
  firstUpdated() {
    const e = this.renderRoot.querySelector(".pp-chart-canvas");
    e && (this._resizeObserver = new ResizeObserver(() => this._scheduleRender()), this._resizeObserver.observe(e), this._scheduleRender());
  }
  updated() {
    this._scheduleRender();
  }
  // ------------------------------------------------------------
  // Series resolution helpers (data layer in utils/energy-series)
  // ------------------------------------------------------------
  _resolveFocusedSeries() {
    return tc(this._allSeries, this.focusedNodeKey, this._focusedEntityIdOverride);
  }
  _titleForFocusedNode() {
    if (this.overview)
      return u(M(this.hass), "energy.overview_title");
    const e = this._resolveFocusedSeries();
    if (e) return e.label;
    const n = this.energyConfig[`${this.focusedNodeKey}_label`];
    return typeof n == "string" && n.trim().length > 0 ? n.trim() : this.focusedNodeKey;
  }
  _defaultSelection() {
    if (this.overview)
      return this._allSeries.filter((i) => !i.isSubBlock);
    const e = this._resolveFocusedSeries();
    return e ? [e] : this._allSeries.slice(0, 1);
  }
  // ------------------------------------------------------------
  // Range handling
  // ------------------------------------------------------------
  _activeWindow() {
    if (this._useCustomRange) {
      const o = Xt(this._customStartIso), r = Xt(this._customEndIso);
      if (o !== null && r !== null && r > o)
        return { startMs: o, endMs: r };
    }
    const e = Yt.find((o) => o.id === this._presetId) ?? Yt[1], i = Date.now();
    return { startMs: i - e.hours * 3600 * 1e3, endMs: i };
  }
  /** True when the user has the custom range toggle on but their start
   *  / end inputs are not a valid window (start ≥ end or unparseable). */
  _customRangeInvalid() {
    if (!this._useCustomRange) return !1;
    const e = Xt(this._customStartIso), i = Xt(this._customEndIso);
    return e === null || i === null || i <= e;
  }
  // ------------------------------------------------------------
  // History fetching
  // ------------------------------------------------------------
  async _fetchHistory() {
    const e = ++this._fetchAbort;
    this._loading = !0, this._loadError = void 0;
    const i = this._activeWindow(), n = i.endMs - i.startMs, o = n > 48 * 3600 * 1e3 ? "statistics" : "hybrid", r = this._activeEntityIds();
    if (r.length === 0) {
      this._loading = !1, this._historyByEntity = /* @__PURE__ */ new Map();
      return;
    }
    try {
      const s = await We(
        this.hass,
        r,
        n,
        { startMs: i.startMs, dataSource: o }
      );
      if (e !== this._fetchAbort) return;
      const a = /* @__PURE__ */ new Map();
      for (const l of r)
        a.set(l, s[l] ?? []);
      this._historyByEntity = a;
    } catch (s) {
      if (e !== this._fetchAbort) return;
      this._loadError = String((s == null ? void 0 : s.message) || s);
    } finally {
      e === this._fetchAbort && (this._loading = !1);
    }
  }
  /** Entity ids that need fetching for the current selection + mode.
   *  Always includes the focused series so the canvas keeps something
   *  to draw even after the user un-checks it. */
  _activeEntityIds() {
    const e = this._allSeries.filter((n) => this._selectedIds.has(n.id)), i = this._resolveFocusedSeries();
    return i && !e.includes(i) && e.push(i), Cs(e);
  }
  // ------------------------------------------------------------
  // Chart rendering
  // ------------------------------------------------------------
  _scheduleRender() {
    this._renderRaf === void 0 && (this._renderRaf = requestAnimationFrame(() => {
      this._renderRaf = void 0, this._renderChart();
    }));
  }
  _renderChart() {
    const e = this.renderRoot.querySelector(".pp-chart-canvas");
    if (!e) return;
    const i = this._activeWindow(), n = this._buildChartSeries();
    this._chartContext = cc(e, {
      mode: this._mode,
      series: n,
      startMs: i.startMs,
      endMs: i.endMs,
      host: this.renderRoot
    });
    const o = e.getBoundingClientRect();
    if (this._canvasLogicalSize = {
      width: Math.max(1, o.width),
      height: Math.max(1, o.height)
    }, this._hover && this._chartContext) {
      const r = this._chartContext.timestampToPixel(this._hover.ts);
      this._hover = { canvasX: r, ts: this._hover.ts };
    }
  }
  _buildChartSeries() {
    const e = this._allSeries.filter((i) => this._selectedIds.has(i.id));
    if (this._mode === "single") {
      const i = this._resolveFocusedSeries() ?? e[0];
      return i ? [this._descriptorToChartSeries(i)] : [];
    }
    return e.map((i) => this._descriptorToChartSeries(i));
  }
  _descriptorToChartSeries(e) {
    return {
      id: e.id,
      label: e.label,
      color: e.color,
      unit: e.unit,
      isPercentage: e.isPercentage,
      points: Ts(e, this._historyByEntity)
    };
  }
  // ------------------------------------------------------------
  // UI handlers
  // ------------------------------------------------------------
  _onPresetClick(e) {
    this._presetId = e, this._useCustomRange = !1, this._openPopover = null, this._fetchHistory();
  }
  _onModeChange(e) {
    this._mode = e;
  }
  _onToggleSeries(e) {
    const i = new Set(this._selectedIds);
    i.has(e) ? i.delete(e) : i.add(e), this._selectedIds = i, this._fetchHistory();
  }
  _onSelectAll() {
    this._selectedIds = new Set(this._allSeries.map((e) => e.id)), this._fetchHistory();
  }
  _onSelectFocused() {
    const e = this._resolveFocusedSeries();
    this._selectedIds = e ? /* @__PURE__ */ new Set([e.id]) : /* @__PURE__ */ new Set(), this._fetchHistory();
  }
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  renderBody() {
    return f`
      <div class="pp-toolbar">
        ${this._renderModeSwitch()}
        ${this._renderRangeBar()}
        ${this._renderDownloadButton()}
        ${this._renderEntityTrigger()}
      </div>
      <div
        class="pp-chart-wrap"
        @pointermove=${this._onChartPointerMove}
        @pointerleave=${this._onChartPointerLeave}
      >
        <canvas class="pp-chart-canvas"></canvas>
        ${this._renderHoverOverlay()}
        ${this._loading ? f`<div class="pp-chart-overlay">Lade…</div>` : k}
        ${this._loadError ? f`<div class="pp-chart-overlay error">${this._loadError}</div>` : k}
      </div>
    `;
  }
  _renderHoverOverlay() {
    if (!this._hover || !this._chartContext) return k;
    const e = this._chartContext, { width: i, height: n } = this._canvasLogicalSize;
    if (i <= 0 || n <= 0) return k;
    const o = this._hover.canvasX / i * 100, r = e.valuesAt(this._hover.ts).filter(
      (a) => Number.isFinite(a.value)
    ), s = o < 60;
    return f`
      <div
        class="pp-hover-line"
        style=${z({ left: `${o}%` })}
        aria-hidden="true"
      ></div>
      <div
        class="pp-tooltip ${s ? "right" : "left"}"
        style=${z({
      left: s ? `${o}%` : "auto",
      right: s ? "auto" : `${100 - o}%`
    })}
      >
        <div class="pp-tooltip-time">${kc(this._hover.ts)}</div>
        ${r.length === 0 ? f`<div class="pp-tooltip-row muted">—</div>` : r.map((a) => f`
              <div class="pp-tooltip-row">
                <span class="pp-tooltip-swatch" style=${z({ background: a.resolvedColor })}></span>
                <span class="pp-tooltip-label">${a.label}</span>
                <span class="pp-tooltip-value">${Cc(a.value, a.rawUnit)}</span>
              </div>
            `)}
      </div>
    `;
  }
  _windowLabel() {
    var e;
    return this._useCustomRange ? "Custom" : ((e = Yt.find((i) => i.id === this._presetId)) == null ? void 0 : e.label) ?? this._presetId;
  }
  _renderDownloadButton() {
    const e = this._loading || this._historyByEntity.size === 0 || this._selectedIds.size === 0, i = u(M(this.hass), "energy.download_csv");
    return f`
      <button
        class="pp-icon-btn"
        ?disabled=${e}
        @click=${this._handleDownloadCsv}
        title=${i}
        aria-label=${i}
      >
        <ha-icon icon="mdi:download"></ha-icon>
      </button>
    `;
  }
  _renderModeSwitch() {
    return f`
      <div class="pp-segmented">
        ${[
      { id: "single", label: "Einzeln" },
      { id: "overlay", label: "Überlagert" },
      { id: "stacked-percent", label: "Gestapelt %" }
    ].map((i) => f`
          <button
            class="pp-seg-btn ${this._mode === i.id ? "active" : ""}"
            @click=${() => this._onModeChange(i.id)}
          >${i.label}</button>
        `)}
      </div>
    `;
  }
  _renderRangeBar() {
    const e = this._openPopover === "date", i = this._customRangeInvalid();
    return f`
      <div class="pp-range-bar">
        ${Yt.map((n) => f`
          <button
            class="pp-range-btn ${!this._useCustomRange && this._presetId === n.id ? "active" : ""}"
            @click=${() => this._onPresetClick(n.id)}
          >${n.label}</button>
        `)}
        <div class="pp-popover-anchor">
          <button
            class="pp-range-btn ${this._useCustomRange ? "active" : ""} ${i ? "invalid" : ""}"
            data-pp-popover-trigger="date"
            @click=${() => this._onDateTriggerClick()}
            title="Eigener Zeitraum"
          >
            <ha-icon icon="mdi:calendar-range"></ha-icon>
          </button>
          ${e ? this._renderDatePopover() : k}
        </div>
      </div>
    `;
  }
  _renderDatePopover() {
    const e = this._customRangeInvalid();
    return f`
      <div class="pp-popover" data-pp-popover="date">
        <div class="pp-popover-title">Eigener Zeitraum</div>
        <label class="pp-popover-field">
          <span>Von</span>
          <input
            type="datetime-local"
            class=${e ? "invalid" : ""}
            .value=${this._customStartIso}
            @change=${this._onCustomStartChange}
          />
        </label>
        <label class="pp-popover-field">
          <span>Bis</span>
          <input
            type="datetime-local"
            class=${e ? "invalid" : ""}
            .value=${this._customEndIso}
            @change=${this._onCustomEndChange}
          />
        </label>
        ${e ? f`<div class="pp-popover-err">Start muss vor Ende liegen.</div>` : k}
      </div>
    `;
  }
  _renderEntityTrigger() {
    const e = this._openPopover === "entities", i = this._mode === "single", n = this._resolveFocusedSeries(), o = this._allSeries.length, r = this._selectedIds.size, s = i ? f`
          ${n ? f`<span class="pp-dropdown-swatch" style=${z({ background: n.color })}></span>` : k}
          <span class="pp-dropdown-label">${(n == null ? void 0 : n.label) ?? "—"}</span>
        ` : f`
          <ha-icon icon="mdi:format-list-checkbox"></ha-icon>
          <span class="pp-dropdown-label">${r}/${o}</span>
        `;
    return f`
      <div class="pp-popover-anchor pp-entity-trigger-wrap">
        <button
          class="pp-dropdown-btn ${e ? "open" : ""}"
          data-pp-popover-trigger="entities"
          @click=${() => this._togglePopover("entities")}
          title=${i ? "Entität wechseln" : "Entitäten auswählen"}
        >
          ${s}
          <ha-icon class="pp-dropdown-caret" icon="mdi:chevron-down"></ha-icon>
        </button>
        ${e ? this._renderEntityPopover() : k}
      </div>
    `;
  }
  _renderEntityPopover() {
    var r;
    const e = this._groupSeriesByCategory(), i = this._mode === "single", n = this._mode === "stacked-percent", o = (r = this._resolveFocusedSeries()) == null ? void 0 : r.id;
    return f`
      <div class="pp-popover pp-entity-popover" data-pp-popover="entities">
        <div class="pp-popover-title">
          <span>${i ? "Entität" : "Entitäten"}</span>
          ${i ? k : f`
                <div class="pp-entity-quick">
                  <button class="pp-link" @click=${() => this._onSelectFocused()}>Nur fokussiert</button>
                  <button class="pp-link" @click=${() => this._onSelectAll()}>Alle</button>
                </div>
              `}
        </div>
        ${n ? f`<div class="pp-popover-hint">Prozent-Entitäten sind in der Stacked-Ansicht ausgeschlossen.</div>` : k}
        <div class="pp-entity-scroll">
          ${e.map((s) => f`
            <div class="pp-entity-group">
              <div class="pp-entity-group-title">${s.title}</div>
              ${s.items.map((a) => this._renderEntityRow(a, {
      isSingle: i,
      stackedExcludes: n,
      focusedId: o
    }))}
            </div>
          `)}
        </div>
      </div>
    `;
  }
  _renderEntityRow(e, i) {
    const n = i.stackedExcludes && e.isPercentage;
    if (i.isSingle) {
      const r = e.id === i.focusedId;
      return f`
        <button
          type="button"
          class="pp-entity-row pp-entity-row-radio ${r ? "active" : ""}"
          title=${e.entityId}
          @click=${() => this._onPickFocusedSeries(e.id)}
        >
          <span class="pp-radio-dot ${r ? "checked" : ""}"></span>
          <span class="pp-entity-swatch" style=${z({ background: e.color })}></span>
          <span class="pp-entity-label">${e.label}</span>
          <span class="pp-entity-unit">${e.unit}</span>
        </button>
      `;
    }
    const o = this._selectedIds.has(e.id) && !n;
    return f`
      <label
        class="pp-entity-row ${n ? "disabled" : ""}"
        title=${e.entityId}
      >
        <input
          type="checkbox"
          .checked=${o}
          ?disabled=${n}
          @change=${() => this._onToggleSeries(e.id)}
        />
        <span class="pp-entity-swatch" style=${z({ background: e.color })}></span>
        <span class="pp-entity-label">${e.label}</span>
        <span class="pp-entity-unit">${e.unit}</span>
      </label>
    `;
  }
  _onPickFocusedSeries(e) {
    this._focusedEntityIdOverride = e, this._selectedIds = /* @__PURE__ */ new Set([e]), this.dialogTitle = this._titleForFocusedNode(), this._openPopover = null, this._fetchHistory();
  }
  _onDateTriggerClick() {
    if (!this._useCustomRange) {
      this._useCustomRange = !0, this._openPopover = "date", this._fetchHistory();
      return;
    }
    this._togglePopover("date");
  }
  _groupSeriesByCategory() {
    const e = {
      solar: "Solar",
      grid: "Grid",
      grid_secondary: "Grid 2",
      home: "Home",
      battery: "Batterie",
      battery_secondary: "Batterie 2",
      other: "Andere"
    }, i = [
      "solar",
      "grid",
      "grid_secondary",
      "home",
      "battery",
      "battery_secondary",
      "other"
    ], n = /* @__PURE__ */ new Map();
    for (const o of this._allSeries) {
      const r = n.get(o.category) ?? [];
      r.push(o), n.set(o.category, r);
    }
    return i.filter((o) => n.has(o)).map((o) => ({ title: e[o], items: n.get(o) ?? [] }));
  }
};
uo.styles = [
  le.styles,
  Z`
      :host { --ppd-max-width: 980px; }

      .pp-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
        margin-bottom: 12px;
      }

      .pp-segmented,
      .pp-range-bar {
        display: inline-flex;
        gap: 4px;
        flex-wrap: wrap;
        align-items: center;
        padding: 3px;
        border-radius: 10px;
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.06);
      }

      .pp-seg-btn,
      .pp-range-btn {
        font: inherit;
        font-size: 13px;
        font-weight: 500;
        border: none;
        background: transparent;
        color: var(--secondary-text-color);
        padding: 6px 12px;
        border-radius: 7px;
        cursor: pointer;
        line-height: 1;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .pp-seg-btn.active,
      .pp-range-btn.active {
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
      }
      .pp-seg-btn:hover:not(.active),
      .pp-range-btn:hover:not(.active) {
        color: var(--primary-text-color);
      }
      .pp-range-btn ha-icon { --mdc-icon-size: 16px; }

      .pp-range-btn.invalid {
        color: var(--error-color, #c62828);
      }

      .pp-icon-btn {
        font: inherit;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        background: var(--card-background-color, #fff);
        color: var(--secondary-text-color);
        width: 34px;
        height: 34px;
        border-radius: 8px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: none;
        transition: color 0.15s, background 0.15s;
      }
      .pp-icon-btn:hover:not([disabled]) {
        color: var(--primary-text-color);
        background: var(--secondary-background-color, #fafafa);
      }
      .pp-icon-btn[disabled] {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .pp-icon-btn ha-icon { --mdc-icon-size: 18px; }

      /* ----- Popovers (entity list, date picker) ----- */
      .pp-popover-anchor {
        position: relative;
        display: inline-flex;
        align-items: center;
      }
      .pp-popover {
        position: absolute;
        top: calc(100% + 6px);
        right: 0;
        min-width: 240px;
        background: var(--card-background-color, var(--primary-background-color, #fff));
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 10px;
        box-shadow: 0 8px 28px rgba(0, 0, 0, 0.22);
        padding: 12px;
        z-index: 20;
        animation: pp-pop-fade 0.12s ease;
      }
      @keyframes pp-pop-fade {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .pp-popover-title {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        color: var(--secondary-text-color);
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .pp-popover-title > span { flex: 1; }
      .pp-popover-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 12px;
        margin-bottom: 8px;
      }
      .pp-popover-field span {
        color: var(--secondary-text-color);
        font-size: 11px;
      }
      .pp-popover-field input {
        font: inherit;
        font-size: 13px;
        padding: 6px 8px;
        border-radius: 6px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        background: var(--secondary-background-color, #fafafa);
        color: var(--primary-text-color);
      }
      .pp-popover-field input.invalid {
        border-color: var(--error-color, #c62828);
      }
      .pp-popover-hint,
      .pp-popover-err {
        font-size: 11px;
        margin-top: 4px;
      }
      .pp-popover-hint { color: var(--secondary-text-color); }
      .pp-popover-err { color: var(--error-color, #c62828); }

      .pp-entity-popover {
        min-width: 280px;
        max-width: 360px;
      }
      .pp-entity-trigger-wrap { margin-left: auto; }

      /* ----- Dropdown-style trigger button ----- */
      .pp-dropdown-btn {
        font: inherit;
        font-size: 13px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 10px 6px 12px;
        max-width: 220px;
        height: 32px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.14));
        background: var(--card-background-color, var(--secondary-background-color, #fff));
        color: var(--primary-text-color);
        cursor: pointer;
        white-space: nowrap;
        transition: background 0.15s ease, border-color 0.15s ease;
      }
      .pp-dropdown-btn:hover {
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
      }
      .pp-dropdown-btn.open {
        border-color: var(--primary-color, #03a9f4);
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.08);
      }
      .pp-dropdown-btn ha-icon {
        --mdc-icon-size: 16px;
        flex: none;
      }
      .pp-dropdown-caret {
        margin-left: 2px;
        opacity: 0.7;
        transition: transform 0.15s ease;
      }
      .pp-dropdown-btn.open .pp-dropdown-caret {
        transform: rotate(180deg);
      }
      .pp-dropdown-label {
        font-variant-numeric: tabular-nums;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .pp-dropdown-swatch {
        width: 10px;
        height: 10px;
        border-radius: 3px;
        flex: none;
      }
      .pp-entity-scroll {
        max-height: min(50vh, 360px);
        overflow-y: auto;
        margin: 0 -4px;
        padding: 0 4px;
      }

      .pp-chart-wrap {
        position: relative;
        width: 100%;
        min-height: 320px;
        height: clamp(280px, 40vh, 420px);
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 14px;
      }
      .pp-chart-canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
      .pp-chart-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        color: var(--secondary-text-color);
        background: rgba(var(--rgb-card-background-color, 255, 255, 255), 0.55);
        backdrop-filter: blur(1px);
        pointer-events: none;
      }
      .pp-chart-overlay.error {
        color: var(--error-color, #c62828);
      }

      .pp-hover-line {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 1px;
        background: var(--secondary-text-color, #757575);
        opacity: 0.55;
        pointer-events: none;
        transform: translateX(-0.5px);
      }
      .pp-tooltip {
        position: absolute;
        top: 8px;
        background: var(--card-background-color, var(--primary-background-color, #fff));
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 8px;
        padding: 8px 10px;
        font-size: 12px;
        line-height: 1.45;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
        pointer-events: none;
        max-width: 240px;
        min-width: 140px;
        z-index: 5;
      }
      .pp-tooltip.right { transform: translateX(8px); }
      .pp-tooltip.left { transform: translateX(-8px); }
      .pp-tooltip-time {
        font-weight: 600;
        margin-bottom: 4px;
        white-space: nowrap;
      }
      .pp-tooltip-row {
        display: flex;
        align-items: center;
        gap: 6px;
        white-space: nowrap;
      }
      .pp-tooltip-row.muted { color: var(--secondary-text-color); }
      .pp-tooltip-swatch {
        width: 8px;
        height: 8px;
        border-radius: 2px;
        flex: none;
      }
      .pp-tooltip-label {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .pp-tooltip-value {
        font-variant-numeric: tabular-nums;
        font-weight: 500;
      }

      .pp-entity-quick { display: inline-flex; gap: 6px; }
      .pp-link {
        font: inherit;
        font-size: 11px;
        background: transparent;
        border: none;
        color: var(--primary-color, #03a9f4);
        cursor: pointer;
        padding: 2px 4px;
        text-transform: none;
        letter-spacing: 0;
      }
      .pp-link:hover { text-decoration: underline; }

      .pp-entity-group {
        margin-bottom: 10px;
      }
      .pp-entity-group-title {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.4px;
        color: var(--secondary-text-color);
        padding: 4px 0;
      }
      .pp-entity-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 6px;
        border-radius: 6px;
        cursor: pointer;
        font: inherit;
        font-size: 13px;
        text-align: left;
        width: 100%;
        background: transparent;
        color: var(--primary-text-color);
        border: none;
      }
      .pp-entity-row:hover { background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05); }
      .pp-entity-row.disabled {
        opacity: 0.45;
        cursor: not-allowed;
      }
      .pp-entity-row input[type="checkbox"] { accent-color: var(--primary-color); }
      .pp-entity-row-radio.active {
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.10);
      }
      .pp-radio-dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid var(--secondary-text-color, #757575);
        flex: none;
        position: relative;
      }
      .pp-radio-dot.checked {
        border-color: var(--primary-color, #03a9f4);
      }
      .pp-radio-dot.checked::after {
        content: "";
        position: absolute;
        inset: 2px;
        border-radius: 50%;
        background: var(--primary-color, #03a9f4);
      }
      .pp-entity-swatch {
        width: 12px;
        height: 12px;
        border-radius: 3px;
        flex: none;
      }
      .pp-entity-label {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .pp-entity-unit {
        color: var(--secondary-text-color);
        font-size: 12px;
        flex: none;
      }

      @media (max-width: 700px) {
        .pp-toolbar { gap: 8px; }
        .pp-chart-wrap { min-height: 240px; height: 36vh; }
      }
    `
];
let B = uo;
K([
  I({ attribute: !1 })
], B.prototype, "hass");
K([
  I({ attribute: !1 })
], B.prototype, "energyConfig");
K([
  I({ type: String })
], B.prototype, "focusedNodeKey");
K([
  I({ type: Boolean })
], B.prototype, "overview");
K([
  C()
], B.prototype, "_allSeries");
K([
  C()
], B.prototype, "_selectedIds");
K([
  C()
], B.prototype, "_mode");
K([
  C()
], B.prototype, "_presetId");
K([
  C()
], B.prototype, "_useCustomRange");
K([
  C()
], B.prototype, "_customStartIso");
K([
  C()
], B.prototype, "_customEndIso");
K([
  C()
], B.prototype, "_historyByEntity");
K([
  C()
], B.prototype, "_loading");
K([
  C()
], B.prototype, "_loadError");
K([
  C()
], B.prototype, "_hover");
K([
  C()
], B.prototype, "_openPopover");
K([
  C()
], B.prototype, "_focusedEntityIdOverride");
customElements.get(fn) || customElements.define(fn, B);
const ur = (t) => {
  const e = (a) => String(a).padStart(2, "0"), i = t.getFullYear(), n = e(t.getMonth() + 1), o = e(t.getDate()), r = e(t.getHours()), s = e(t.getMinutes());
  return `${i}-${n}-${o}T${r}:${s}`;
}, Xt = (t) => {
  if (!t) return null;
  const e = new Date(t).getTime();
  return Number.isFinite(e) ? e : null;
}, Zt = (t) => String(t).padStart(2, "0"), kc = (t) => {
  const e = new Date(t), i = `${Zt(e.getDate())}.${Zt(e.getMonth() + 1)}.${e.getFullYear()}`, n = `${Zt(e.getHours())}:${Zt(e.getMinutes())}`;
  return `${i} ${n}`;
}, Cc = (t, e) => {
  if (!Number.isFinite(t)) return "—";
  const i = Math.abs(t), n = i >= 100 ? 0 : i >= 10 ? 1 : 2, o = t.toFixed(n);
  return e ? `${o} ${e}` : o;
};
var Tc = Object.defineProperty, je = (t, e, i, n) => {
  for (var o = void 0, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = s(e, i, o) || o);
  return o && Tc(e, i, o), o;
};
const Ji = (t) => {
  if (typeof t != "string") return;
  const e = t.trim();
  return e.length > 0 ? e : void 0;
}, yn = "power-pilz-energy-node-zoom-overlay", zc = 240, Qi = 1440 * 60 * 1e3, pr = 1.8, Mc = (t) => {
  const e = document.createElement(yn);
  e.hass = t.hass, e.energyConfig = t.config, e.focusedNodeKey = t.focusedNodeKey, e.originRect = t.originRect, e.cardRect = t.cardRect, document.body.appendChild(e);
}, po = class po extends L {
  constructor() {
    super(...arguments), this.focusedNodeKey = "", this._phase = "opening", this._historyByEntity = /* @__PURE__ */ new Map(), this._series = [], this._fetchAbort = 0, this._colorCache = {}, this._lastCanvasPoints = [], this._lastCanvasSize = { width: 0, height: 0 }, this._onKeyDown = (e) => {
      e.key === "Escape" && this._close();
    }, this._onBackdropClick = (e) => {
      e.target === e.currentTarget && this._close();
    }, this._onPointerMove = (e) => {
      const i = this.renderRoot.querySelector(".pp-zoom-area");
      if (!i || this._lastCanvasPoints.length < 2) return;
      const n = i.getBoundingClientRect(), o = e.clientX - n.left, r = e.clientY - n.top;
      if (o < 0 || o > n.width || r < 0 || r > n.height) {
        this._hover && (this._hover = void 0);
        return;
      }
      const s = o / n.width * this._lastCanvasSize.width, a = this._nearestPoint(s);
      if (!a) {
        this._hover && (this._hover = void 0);
        return;
      }
      this._hover = {
        logicalX: a.x,
        logicalY: a.y,
        ts: a.ts,
        value: a.value
      };
    }, this._onPointerLeave = () => {
      this._hover && (this._hover = void 0);
    };
  }
  // ------------------------------------------------------------
  // Lifecycle
  // ------------------------------------------------------------
  connectedCallback() {
    super.connectedCallback(), this._series = ks(this.hass, this.energyConfig);
    const e = this._series.find((i) => i.nodeKey === this.focusedNodeKey);
    this.focusedNodeKey === "battery" ? this._focused = this._series.find((i) => i.nodeKey === "battery_percentage") ?? e : this.focusedNodeKey === "battery_secondary" ? this._focused = this._series.find((i) => i.nodeKey === "battery_secondary_percentage") ?? e : this._focused = e, document.addEventListener("keydown", this._onKeyDown), this._fetchHistory(), this._liveTimer = window.setInterval(() => this.requestUpdate(), 3e4);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), document.removeEventListener("keydown", this._onKeyDown), (e = this._resizeObserver) == null || e.disconnect(), this._resizeObserver = void 0, this._renderRaf !== void 0 && (cancelAnimationFrame(this._renderRaf), this._renderRaf = void 0), this._liveTimer !== void 0 && (clearInterval(this._liveTimer), this._liveTimer = void 0);
  }
  firstUpdated() {
    requestAnimationFrame(() => {
      this._phase = "open";
    });
    const e = this.renderRoot.querySelector(".pp-zoom-area");
    e && (this._resizeObserver = new ResizeObserver(() => this._scheduleRender()), this._resizeObserver.observe(e), this._scheduleRender());
  }
  updated() {
    this._scheduleRender();
  }
  _close() {
    this._phase !== "closing" && (this._phase = "closing", setTimeout(() => this.remove(), zc));
  }
  // ------------------------------------------------------------
  // Data
  // ------------------------------------------------------------
  async _fetchHistory() {
    const e = ++this._fetchAbort;
    if (!this._focused) return;
    const i = Cs([this._focused]);
    if (i.length === 0) return;
    const n = "hybrid", o = Date.now() - Qi;
    try {
      const r = await We(
        this.hass,
        i,
        Qi,
        { startMs: o, dataSource: n }
      );
      if (e !== this._fetchAbort) return;
      const s = /* @__PURE__ */ new Map();
      for (const a of i) s.set(a, r[a] ?? []);
      this._historyByEntity = s;
    } catch {
    }
  }
  // ------------------------------------------------------------
  // Trend drawing — direct area + line, no axes (matches the small
  // node's visual exactly).
  // ------------------------------------------------------------
  _scheduleRender() {
    this._renderRaf === void 0 && (this._renderRaf = requestAnimationFrame(() => {
      this._renderRaf = void 0, this._renderTrend();
    }));
  }
  _renderTrend() {
    if (!this._focused) return;
    const e = this.renderRoot.querySelector(".pp-zoom-area"), i = this.renderRoot.querySelector(".pp-zoom-line");
    if (!e || !i) return;
    const n = ft(e), o = ft(i);
    if (!n || !o) return;
    const r = Ts(this._focused, this._historyByEntity);
    if (r.length < 2) {
      this._lastCanvasPoints = [], this._lastCanvasSize = { width: n.width, height: n.height };
      return;
    }
    const s = Date.now(), a = s - Qi, l = r.filter((w) => w.ts >= a && w.ts <= s), c = l.length >= 2 ? l : r;
    let h = 1 / 0, d = -1 / 0;
    for (const w of c)
      Number.isFinite(w.value) && (w.value < h && (h = w.value), w.value > d && (d = w.value));
    if (!Number.isFinite(h) || !Number.isFinite(d)) {
      this._lastCanvasPoints = [];
      return;
    }
    if (h === d) {
      const w = Math.abs(h) * 0.1 || 1;
      h -= w, d += w;
    }
    const p = (d - h) * 0.06, _ = h - p, g = d + p - _, y = s - a, b = c.filter((w) => Number.isFinite(w.ts) && Number.isFinite(w.value)).map((w) => {
      const S = Math.max(0, Math.min(1, (w.ts - a) / y)), $ = Math.max(0, Math.min(1, (w.value - _) / g));
      return {
        x: S * n.width,
        y: (1 - $) * n.height,
        ts: w.ts,
        value: w.value
      };
    });
    if (b.length < 2) {
      this._lastCanvasPoints = [];
      return;
    }
    const v = this.renderRoot, x = Ie(v, this._focused.color), E = this._thresholdConfig();
    if (E.threshold === null)
      hn(n.ctx, b, x, n.height, 0.24, 0, this._colorCache), pi(o.ctx, b, x, pr);
    else {
      const w = b.map((A) => ({
        x: A.x,
        y: A.y,
        value: A.value
      })), S = Ie(v, E.color), $ = Gl(w, E.threshold), T = Yl($);
      for (const A of T)
        hn(
          n.ctx,
          A.points,
          A.low ? S : x,
          n.height,
          0.24,
          0,
          this._colorCache
        );
      Xl(o.ctx, $, x, S, pr);
    }
    this._lastCanvasPoints = b, this._lastCanvasSize = { width: n.width, height: n.height };
  }
  /**
   * Returns the per-node threshold + color override that the small
   * node uses for bichromatic rendering, or `{threshold: null}` when
   * no threshold applies for the focused node.
   *
   * - Grid / Grid 2: when `*_export_highlight` is on, samples below 0
   *   render in `*_export_trend_color`.
   * - Battery / Battery 2 (zoomed → SOC chart): when
   *   `*_low_alert` is on AND we're plotting a percentage entity,
   *   samples below `*_low_threshold` render in `*_low_alert_color`.
   */
  _thresholdConfig() {
    var o;
    const e = this.energyConfig, i = this.focusedNodeKey, n = -1e-6;
    if (i === "grid" && e.grid_export_highlight === !0)
      return {
        threshold: n,
        color: be(
          e.grid_export_trend_color ?? "red",
          "red"
        )
      };
    if (i === "grid_secondary" && e.grid_secondary_export_highlight === !0)
      return {
        threshold: n,
        color: be(
          e.grid_secondary_export_trend_color ?? "red",
          "red"
        )
      };
    if ((i === "battery" || i === "battery_secondary") && ((o = this._focused) != null && o.isPercentage) && e[`${i}_low_alert`] === !0) {
      const r = e[`${i}_low_threshold`];
      return {
        threshold: typeof r == "number" && Number.isFinite(r) ? Math.max(0, Math.min(100, r)) : 20,
        color: be(
          e[`${i}_low_alert_color`] ?? "red",
          "red"
        )
      };
    }
    return { threshold: null, color: "" };
  }
  _nearestPoint(e) {
    const i = this._lastCanvasPoints;
    if (i.length === 0) return;
    let n = 0, o = i.length - 1;
    for (; o - n > 1; ) {
      const a = n + o >> 1;
      i[a].x <= e ? n = a : o = a;
    }
    const r = i[n], s = i[o];
    return r ? s ? Math.abs(r.x - e) <= Math.abs(s.x - e) ? r : s : r : s;
  }
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  render() {
    if (!this._focused)
      return f`<div class="pp-zoom-catcher" @click=${this._onBackdropClick}></div>`;
    const e = this._effectiveContainerRect(), i = 6, n = 2, o = this.originRect.left + this.originRect.width / 2, r = this.originRect.top + this.originRect.height / 2, s = Math.max(this.originRect.width, e.width - i * 2), a = Math.max(this.originRect.height, e.height - i * 2), l = Math.min(s, this.originRect.width * n), c = Math.min(a, this.originRect.height * n);
    let h = o - l / 2, d = r - c / 2;
    h = Math.max(e.left + i, Math.min(e.left + e.width - l - i, h)), d = Math.max(e.top + i, Math.min(e.top + e.height - c - i, d));
    const p = this._phase !== "open", _ = this._phase === "closing", m = p || _, g = this.originRect.width / l, y = this.originRect.height / c, b = this.originRect.left - h, v = this.originRect.top - d, x = {
      left: `${h}px`,
      top: `${d}px`,
      width: `${l}px`,
      height: `${c}px`,
      transform: m ? `translate(${b}px, ${v}px) scale(${g}, ${y})` : "translate(0, 0) scale(1, 1)",
      transformOrigin: "0 0"
    }, E = this._buildView();
    return f`
      <div
        class="pp-zoom-catcher"
        @click=${this._onBackdropClick}
      >
        <div
          class="pp-zoom-shell ${this._focused.category} ${this._phase === "open" ? "is-open" : ""} ${_ ? "is-closing" : ""}"
          style=${z(x)}
          @click=${(w) => w.stopPropagation()}
          @pointermove=${this._onPointerMove}
          @pointerleave=${this._onPointerLeave}
        >
          <div class="pp-zoom-trend" aria-hidden="true">
            <canvas class="pp-zoom-area"></canvas>
          </div>
          <div class="pp-zoom-line-layer" aria-hidden="true">
            <canvas class="pp-zoom-line"></canvas>
          </div>
          <div class="pp-zoom-content">
            <ha-icon
              class="pp-zoom-icon"
              .icon=${E.iconName}
              style=${z(E.iconStyle)}
            ></ha-icon>
            <div class="pp-zoom-value">${this._displayValueText(E.formattedValue)}</div>
            <div class="pp-zoom-label">${E.label}</div>
          </div>
          ${this._renderHoverDot()}
        </div>
      </div>
    `;
  }
  /** Renders just a small dot at the hovered data point. The value is
   *  shown via `_displayValueText` in the header (graph-card UX).
   *
   *  The dot is a sibling of the trend canvases inside the shell, all
   *  filling the shell from corner to corner (`.pp-zoom-trend` uses
   *  `inset: 0` and the canvas inside has 100% width/height with no
   *  margin or padding). That means the canvas's content-box origin is
   *  at the shell's `(0, 0)`, so we can map logical canvas coordinates
   *  to shell-local pixels with a simple ratio — no offsetParent walk
   *  needed. */
  _renderHoverDot() {
    if (!this._hover || !this._focused) return k;
    const e = this.renderRoot.querySelector(".pp-zoom-area");
    if (!e) return k;
    const { width: i, height: n } = this._lastCanvasSize;
    if (i <= 0 || n <= 0) return k;
    const o = e.offsetWidth || e.getBoundingClientRect().width, r = e.offsetHeight || e.getBoundingClientRect().height, s = this._hover.logicalX / i * o, a = this._hover.logicalY / n * r;
    return f`
      <div
        class="pp-zoom-hover-dot"
        aria-hidden="true"
        style=${z({
      left: `${s}px`,
      top: `${a}px`,
      background: this._focused.color
    })}
      ></div>
    `;
  }
  /** Header value text: live state when not hovering, hovered value
   *  + timestamp during hover. Hover formatting uses the same auto-
   *  scaling and decimal options the small node would use, so a
   *  paused-on-trend header reads the same way as the live one. */
  _displayValueText(e) {
    if (!this._hover || !this._focused) return e;
    const i = this.energyConfig, n = this._configDecimals(i);
    return `${Lt(
      this._hover.value,
      this._focused.unit,
      n,
      this._unitFormatOptions(i)
    )} · ${Ac(this._hover.ts)}`;
  }
  _areaCanvasRect() {
    const e = this.renderRoot.querySelector(".pp-zoom-area");
    return (e == null ? void 0 : e.getBoundingClientRect()) ?? new DOMRect(0, 0, 1, 1);
  }
  /** The container the popover must stay inside. Falls back to the
   *  viewport when no card rect was provided (e.g. unit tests). */
  _effectiveContainerRect() {
    return this.cardRect ? {
      left: this.cardRect.left,
      top: this.cardRect.top,
      width: this.cardRect.width,
      height: this.cardRect.height
    } : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
  }
  // ------------------------------------------------------------
  // View construction — mirrors the small node's render-time logic so
  // the zoomed shell shows the SAME icon, color, formatted value and
  // label that the user sees on the energy card. Anything that affects
  // the small node visually has to be reflected here.
  // ------------------------------------------------------------
  _buildView() {
    const e = this._focused, i = this.energyConfig, n = this._unitFormatOptions(i), o = this._configDecimals(i);
    return this.focusedNodeKey === "battery" || this.focusedNodeKey === "battery_secondary" ? this._buildBatteryView(this.focusedNodeKey, i, e.label) : this._buildPowerView(e, i, n, o);
  }
  _configDecimals(e) {
    const i = e.decimals;
    return typeof i == "number" && Number.isFinite(i) ? Math.min(3, Math.max(0, Math.round(i))) : 1;
  }
  _unitFormatOptions(e) {
    const i = this._configDecimals(e);
    return {
      enabled: e.auto_scale_units === !0,
      baseDecimals: Se(e.decimals_base_unit, i),
      prefixedDecimals: Se(e.decimals_prefixed_unit, i),
      nullWithUnit: !0
    };
  }
  /** Power/energy nodes — also handles auto-calculated home/solar by
   *  replaying the descriptor's compute spec on current entity states. */
  _buildPowerView(e, i, n, o) {
    const r = this._liveValueOf(e), s = Lt(r, e.unit, o, n), a = i[`${e.nodeKey}_icon`] ?? this._fallbackIcon(e.nodeKey);
    let l = i[`${e.nodeKey}_icon_color`];
    const c = r !== null && Number.isFinite(r) && r < 0;
    return e.nodeKey === "grid" && i.grid_export_icon_highlight === !0 && c ? l = i.grid_export_icon_color ?? "red" : e.nodeKey === "grid_secondary" && i.grid_secondary_export_icon_highlight === !0 && c && (l = i.grid_secondary_export_icon_color ?? "red"), {
      iconName: a,
      iconStyle: xe(l),
      formattedValue: s,
      label: e.label
    };
  }
  /** Battery nodes — show the SOC value, the dynamic battery icon
   *  reflecting both charge direction and SOC level, and the low-alert
   *  color override when the configured threshold is reached. */
  _buildBatteryView(e, i, n) {
    const o = e === "battery" ? "battery_percentage_entity" : "battery_secondary_percentage_entity", r = e === "battery" ? "battery_entity" : "battery_secondary_entity", s = `${e}_icon`, a = `${e}_icon_color`, l = `${e}_low_alert`, c = `${e}_low_threshold`, h = `${e}_low_alert_color`, d = Ji(i[o]), p = Ji(i[r]), _ = p ? W(this.hass, p) : void 0, m = typeof _ == "string" && _.trim() === "%", g = d ? F(this.hass, d) : null, y = p ? F(this.hass, p) : null, b = g !== null ? g : m ? y : null, v = b !== null ? `${Math.round(Math.max(0, Math.min(100, b)))}%` : "—", x = this._batteryIcon(
      b,
      m ? null : y,
      i[s]
    ), E = i[l] === !0, w = this._normalizeBatteryThreshold(i[c]), $ = E && b !== null && b <= w ? i[h] ?? "red" : i[a], T = Ji(i[`${e}_label`]) ?? n;
    return {
      iconName: x,
      iconStyle: xe($),
      formattedValue: v,
      label: T
    };
  }
  /** Mirrors energy-card.batteryIcon. Different MDI variants by SOC
   *  bucket; charging gets its own icon regardless of level. */
  _batteryIcon(e, i, n) {
    if (i !== null && i > 0.01)
      return "mdi:battery-charging";
    if (e === null)
      return n ?? "mdi:battery-outline";
    const r = Math.max(0, Math.min(100, e));
    return r < 5 ? "mdi:battery-outline" : r >= 95 ? "mdi:battery" : `mdi:battery-${Math.max(10, Math.min(90, Math.round(r / 10) * 10))}`;
  }
  _normalizeBatteryThreshold(e) {
    return typeof e != "number" || !Number.isFinite(e) ? 20 : Math.max(0, Math.min(100, e));
  }
  /** Live value for a non-battery descriptor. Replays auto-calc on
   *  current entity states for home/solar when the descriptor was
   *  built with a compute spec, so the zoom header shows the same
   *  computed value the small node displays. */
  _liveValueOf(e) {
    if (e.computed) {
      let i = 0, n = null;
      for (const s of e.computed.dependencies) {
        const a = F(this.hass, s);
        if (a === null) return null;
        const l = e.computed.unitsByEntityId[s] ?? "", c = e.computed.signsByEntityId[s] ?? 1, h = te(l), d = (h == null ? void 0 : h.factor) ?? 1;
        i += c * a * d, n ?? (n = (h == null ? void 0 : h.family) ?? null);
      }
      const o = te(e.computed.outputUnit), r = o && o.family === n ? o.factor : 1;
      return r > 0 ? i / r : i;
    }
    return F(this.hass, e.entityId);
  }
  _fallbackIcon(e) {
    return e.startsWith("solar") ? "mdi:weather-sunny" : e.startsWith("grid_secondary") || e.startsWith("grid") ? "mdi:transmission-tower" : e.startsWith("home") ? "mdi:home-lightning-bolt" : e.startsWith("battery_secondary") ? "mdi:battery-outline" : e.startsWith("battery") ? "mdi:battery" : "mdi:flash";
  }
};
po.styles = Z`
    :host {
      position: fixed;
      inset: 0;
      z-index: 10000;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      /* Mirror the energy-card's :host vars so the inner content has
         the exact same typography, icon size and shape colors as the
         small node. */
      --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
      --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
      --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
      --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
      --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
      --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
      --icon-size: var(--mush-icon-size, 36px);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
    }

    /* Transparent click-catcher so taps outside the shell close the
       popover, but the page underneath stays fully visible. */
    .pp-zoom-catcher {
      position: fixed;
      inset: 0;
      background: transparent;
    }

    /* The shell mirrors .energy-value styling from the card, scaled up,
       and floats like a dropdown anchored on the clicked node.
       The animation goes through three states (driven from JS via the
       is-open / is-closing classes):
         - opening (no class): shell is at the origin frame, content is
           hidden, shadow is small.
         - is-open: shell at target frame, content visible, shadow full.
         - is-closing: shell collapsing back to origin, content fades
           out fast for a snappy dismiss.
       The transform uses a smooth out-quart bezier for opening (no
       overshoot, very natural arrival) and a snappier in-curve for
       closing. Shadow grows with the card so depth is communicated. */
    .pp-zoom-shell {
      position: fixed;
      box-sizing: border-box;
      border-radius: 16px;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      border: 1px solid rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.10);
      overflow: hidden;
      opacity: 0.85;
      transition:
        transform 340ms cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 340ms cubic-bezier(0.16, 1, 0.3, 1),
        opacity 200ms ease;
      will-change: transform, opacity, box-shadow;
    }
    .pp-zoom-shell.is-open {
      box-shadow: 0 18px 60px rgba(0, 0, 0, 0.26),
                  0 4px 14px rgba(0, 0, 0, 0.10);
      opacity: 1;
    }
    .pp-zoom-shell.is-closing {
      opacity: 0;
      transition:
        transform 200ms cubic-bezier(0.4, 0, 1, 1),
        box-shadow 180ms ease,
        opacity 180ms ease;
    }

    /* Trend canvases fill the entire shell behind the content — same z-order
       as in the small node. They fade in slightly behind the shell so the
       card appears to "expand first, then content reveals". */
    .pp-zoom-trend,
    .pp-zoom-line-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: 0;
      transition: opacity 220ms cubic-bezier(0.16, 1, 0.3, 1) 80ms;
    }
    .pp-zoom-shell.is-open .pp-zoom-trend { opacity: 1; }
    .pp-zoom-shell.is-open .pp-zoom-line-layer { opacity: 0.96; }
    .pp-zoom-shell.is-closing .pp-zoom-trend,
    .pp-zoom-shell.is-closing .pp-zoom-line-layer {
      transition: opacity 120ms ease 0ms;
      opacity: 0;
    }
    .pp-zoom-area,
    .pp-zoom-line {
      width: 100%;
      height: 100%;
      display: block;
    }

    /* Header bar at the top: icon left, value middle, label right.
       Same font and icon sizes as the small node's content so the
       text feels identical, just laid out horizontally to take
       advantage of the wider zoomed shell. The trend canvases
       continue to fill the entire shell behind this header. */
    .pp-zoom-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      box-sizing: border-box;
      pointer-events: none; /* clicks fall through to backdrop catcher */
      opacity: 0;
      transform: translateY(-2px);
      transition:
        opacity 200ms cubic-bezier(0.16, 1, 0.3, 1) 100ms,
        transform 220ms cubic-bezier(0.16, 1, 0.3, 1) 100ms;
    }
    .pp-zoom-shell.is-open .pp-zoom-content {
      opacity: 1;
      transform: translateY(0);
    }
    .pp-zoom-shell.is-closing .pp-zoom-content {
      transition:
        opacity 120ms ease 0ms,
        transform 120ms ease 0ms;
      opacity: 0;
      transform: translateY(-2px);
    }
    .pp-zoom-icon {
      --mdc-icon-size: calc(var(--icon-size) * 0.667);
      color: var(--icon-color);
      flex: none;
      display: flex;
      line-height: 0;
    }
    .pp-zoom-value {
      font-size: var(--card-primary-font-size);
      line-height: var(--card-primary-line-height);
      font-weight: var(--card-primary-font-weight);
      color: var(--primary-text-color);
      letter-spacing: 0.1px;
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }
    .pp-zoom-label {
      margin-left: auto;
      font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height);
      font-weight: var(--card-secondary-font-weight);
      color: var(--secondary-text-color);
      letter-spacing: 0.4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-left: 8px;
    }

    /* Hover indicator: a small dot at the data point — same look as
       the graph card's hover-dot. The header value swap (handled in
       _displayValueText) carries the actual reading. */
    .pp-zoom-hover-dot {
      position: absolute;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 0 2px var(--card-background-color, #fff);
      pointer-events: none;
      z-index: 2;
    }
  `;
let _e = po;
je([
  I({ attribute: !1 })
], _e.prototype, "hass");
je([
  I({ attribute: !1 })
], _e.prototype, "energyConfig");
je([
  I({ type: String })
], _e.prototype, "focusedNodeKey");
je([
  I({ attribute: !1 })
], _e.prototype, "originRect");
je([
  I({ attribute: !1 })
], _e.prototype, "cardRect");
je([
  C()
], _e.prototype, "_phase");
je([
  C()
], _e.prototype, "_historyByEntity");
je([
  C()
], _e.prototype, "_hover");
customElements.get(yn) || customElements.define(yn, _e);
const qt = (t) => String(t).padStart(2, "0"), Ac = (t) => {
  const e = new Date(t);
  return `${qt(e.getDate())}.${qt(e.getMonth() + 1)}. ${qt(e.getHours())}:${qt(e.getMinutes())}`;
}, Te = "0.7.1";
var Pc = Object.defineProperty, Ic = Object.getOwnPropertyDescriptor, Qn = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ic(e, i) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = (n ? s(e, i, o) : s(o)) || o);
  return n && o && Pc(e, i, o), o;
};
const Dc = 4, Oc = 8, _r = 2, Rc = /* @__PURE__ */ new Set(["solar", "home", "grid", "grid_secondary"]), Nc = (t, e) => {
  const i = `${t}_sub_${e}`, n = Rc.has(t);
  return [
    {
      type: "grid",
      name: "",
      schema: [
        { name: `${i}_enabled`, selector: { boolean: {} } }
      ]
    },
    {
      type: "expandable",
      name: "",
      title: "Identity",
      icon: "mdi:view-list-outline",
      expanded: !0,
      schema: [
        {
          type: "grid",
          name: "",
          columns: 2,
          schema: [
            { name: `${i}_entity`, selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } } },
            { name: `${i}_label`, selector: { text: {} } }
          ]
        },
        {
          type: "grid",
          name: "",
          columns: 2,
          schema: [
            {
              name: `${i}_icon`,
              selector: { icon: {} },
              context: { icon_entity: `${i}_entity` }
            },
            {
              name: `${i}_icon_color`,
              selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } },
              helper: Pn,
              description: Pn
            }
          ]
        }
      ]
    },
    ...n ? [
      {
        type: "expandable",
        name: "",
        title: "Display mode",
        icon: "mdi:form-dropdown",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: `${i}_state_mode`,
                selector: { boolean: {} },
                helper: t === "solar" ? Dn : In,
                description: t === "solar" ? Dn : In
              }
            ]
          }
        ]
      }
    ] : [],
    Qe(i)
  ];
}, Jt = (t, e, i, n) => ({
  type: "expandable",
  name: "",
  title: e,
  icon: i,
  expanded: !1,
  schema: Array.from({ length: n }, (o, r) => ({
    type: "expandable",
    name: "",
    title: `Block ${r + 1}`,
    icon: "mdi:view-grid-outline",
    expanded: !1,
    schema: Nc(t, r + 1)
  }))
}), Lc = (t, e, i) => ({
  type: "expandable",
  name: "",
  title: t,
  icon: e,
  expanded: !1,
  schema: [
    {
      type: "grid",
      name: "",
      schema: i
    }
  ]
}), ye = (t, e) => ({
  type: "expandable",
  name: "",
  title: t,
  icon: "mdi:view-list-outline",
  expanded: !0,
  schema: [
    {
      type: "grid",
      name: "",
      schema: e
    }
  ]
}), Hc = {
  select: {
    mode: "dropdown",
    options: [
      { label: "Auto (recommended)", value: "auto" },
      { label: "Statistics (fastest)", value: "statistics" },
      { label: "History (raw)", value: "history" }
    ]
  }
}, Bc = (t) => {
  const e = ie(t, "hybrid");
  return e === "hybrid" ? "auto" : e;
}, Fc = (t) => t === "auto" || t === "history" || t === "statistics" || t === "hybrid" ? t : "auto", gn = "When enabled, the solar main node shows the sum of enabled solar sub-node entities instead of the solar entity. Solar sub-nodes with State mode enabled are excluded from this sum.", vn = "When enabled, the home main node is calculated as solar + grid + grid 2 - battery - battery 2 using compatible unit conversion.", zt = "When enabled, negative grid values (energy exported to the grid) are highlighted in the trend with the export color.", Mt = "When enabled, the grid icon switches to the export icon color while the grid value is negative.", bn = "When enabled, the main grid node is shown. When disabled, the grid node is hidden.", wn = "When enabled, the second grid node is shown. When disabled, the second grid node is hidden.", xn = "When enabled, the main solar node is shown. When disabled, the solar node is hidden.", Sn = "Flow direction: + value animates from Solar to Center. 0 or - value shows no solar flow.", $n = "When enabled, the main home node is shown. When disabled, the home node is hidden.", En = "Flow direction: + value animates from Center to Home. 0 or - value shows no home flow.", kn = "When enabled, the main battery node is shown. When disabled, the battery node is hidden.", Cn = "Flow direction: + value animates from Center to Battery (charging). - value animates Battery to Center (discharging).", Tn = "When enabled, the second battery node is shown. When disabled, the second battery node is hidden.", zn = "Flow direction: + value animates from Center to Battery 2 (charging). - value animates Battery 2 to Center (discharging).", At = "Color used for battery low-threshold alert styling (icon and low trend section).", Qt = "Reverse the animated arrow direction (charge ↔ discharge). Use this when your inverter reports the opposite sign for charge/discharge than what PowerPilz expects.", ei = "Flip the sign of the displayed kW/W value and the power trend graph. Independent from the flow toggle. Does not affect the SOC %.", Mn = "Flow direction: + value animates from Grid to Center (import). - value animates from Center to Grid (export).", An = "Flow direction: + value animates from Grid 2 to Center (import). - value animates from Center to Grid 2 (export).", Pn = "In default mode, this sub-node renders the entity as numeric value + unit.", In = "When enabled, this sub-node displays the entity state text (for example AUS/WW/HZ) instead of numeric value + unit.", Dn = "When enabled, this solar sub-node displays entity state text instead of numeric value + unit and is excluded from Solar auto-calc.", On = "Automatically formats values with metric prefixes (for example W/kW/MW and Wh/kWh/MWh).", Rn = "Optional unit override/fallback. Used when entities have no unit and as preferred output unit for auto-calculated values.", Nn = "Default decimal precision for displayed values and fallback when base/prefixed decimals are not set.", Ln = "Decimal precision for base units (W, Wh) when Auto unit scaling is enabled.", Hn = "Decimal precision for prefixed units (kW, MW, kWh, MWh) when Auto unit scaling is enabled.", Bn = "Controls where trend data is fetched from. In most setups, keep Auto (recommended), which prefers statistics and falls back to history automatically.", mr = "When on, each node has its own tap/hold/double-tap, configured inside that node's own Interactions section. Tap defaults to the zoom view, long-press to the node detail dialog. The card-level Tap/Hold/Double-tap fields below are then no longer applied to node clicks.", fr = "Choose what happens when you tap, long-press or double-tap this node. Long-press defaults to opening the PowerPilz node detail dialog with a history graph.", Qe = (t, e = "Interactions") => ({
  type: "expandable",
  name: "",
  title: e,
  icon: "mdi:gesture-tap",
  expanded: !1,
  schema: [
    {
      type: "grid",
      name: "",
      schema: [
        {
          name: `${t}_tap_action`,
          selector: { ui_action: {} },
          helper: fr,
          description: fr
        },
        {
          name: `${t}_hold_action`,
          selector: { ui_action: {} }
        },
        {
          name: `${t}_double_tap_action`,
          selector: { ui_action: {} }
        }
      ]
    }
  ]
}), Vc = [
  Lc("Center visuals", "mdi:palette-outline", [
    { name: "core_icon", selector: { icon: {} }, context: { icon_entity: "home_entity" } },
    {
      name: "core_icon_color",
      selector: { ui_color: { include_state: !0, include_none: !0, default_color: "none" } }
    },
    {
      name: "flow_color",
      selector: { ui_color: { include_state: !0, include_none: !0, default_color: "none" } }
    }
  ]),
  {
    type: "expandable",
    name: "",
    title: "Units and Trend settings",
    icon: "mdi:chart-line",
    expanded: !1,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          { name: "shared_trend_scale", selector: { boolean: {} } }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Auto scaling",
        icon: "mdi:scale-balance",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "auto_scale_units",
                selector: { boolean: {} },
                helper: On,
                description: On
              }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "decimals_prefixed_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: Hn,
                description: Hn
              },
              {
                name: "decimals_base_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: Ln,
                description: Ln
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Display format",
        icon: "mdi:format-list-numbered",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "unit",
                selector: { text: {} },
                helper: Rn,
                description: Rn
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: Nn,
                description: Nn
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Trend source",
        icon: "mdi:database-search",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "trend_data_source",
                selector: Hc,
                helper: Bn,
                description: Bn
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: "expandable",
    name: "",
    title: "Solar node",
    icon: "mdi:weather-sunny",
    expanded: !1,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "solar_visible",
            selector: { boolean: {} },
            helper: xn,
            description: xn
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Identity",
        icon: "mdi:view-list-outline",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "solar_entity",
                selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } },
                helper: Sn,
                description: Sn
              },
              { name: "solar_label", selector: { text: {} } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "solar_icon", selector: { icon: {} }, context: { icon_entity: "solar_entity" } },
              {
                name: "solar_icon_color",
                selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
              }
            ]
          }
        ]
      },
      ye("Calculation", [
        {
          name: "solar_auto_calculate",
          selector: { boolean: {} },
          helper: gn,
          description: gn
        }
      ]),
      ye("Trend", [
        { name: "solar_trend", selector: { boolean: {} } },
        {
          name: "solar_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      Qe("solar")
    ]
  },
  {
    type: "expandable",
    name: "",
    title: "Grid node",
    icon: "mdi:transmission-tower",
    expanded: !1,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "grid_visible",
            selector: { boolean: {} },
            helper: bn,
            description: bn
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Identity",
        icon: "mdi:view-list-outline",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "grid_entity",
                selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } },
                helper: Mn,
                description: Mn
              },
              { name: "grid_label", selector: { text: {} } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "grid_icon", selector: { icon: {} }, context: { icon_entity: "grid_entity" } },
              {
                name: "grid_icon_color",
                selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
              }
            ]
          }
        ]
      },
      ye("Trend", [
        { name: "grid_trend", selector: { boolean: {} } },
        {
          name: "grid_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      ye("Export", [
        {
          name: "grid_export_highlight",
          selector: { boolean: {} },
          helper: zt,
          description: zt
        },
        {
          name: "grid_export_trend_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        },
        {
          name: "grid_export_icon_highlight",
          selector: { boolean: {} },
          helper: Mt,
          description: Mt
        },
        {
          name: "grid_export_icon_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        }
      ]),
      Qe("grid")
    ]
  },
  {
    type: "expandable",
    name: "",
    title: "Grid 2 node",
    icon: "mdi:transmission-tower",
    expanded: !1,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "grid_secondary_visible",
            selector: { boolean: {} },
            helper: wn,
            description: wn
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Identity",
        icon: "mdi:view-list-outline",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "grid_secondary_entity",
                selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } },
                helper: An,
                description: An
              },
              { name: "grid_secondary_label", selector: { text: {} } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "grid_secondary_icon", selector: { icon: {} }, context: { icon_entity: "grid_secondary_entity" } },
              {
                name: "grid_secondary_icon_color",
                selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
              }
            ]
          }
        ]
      },
      ye("Trend", [
        { name: "grid_secondary_trend", selector: { boolean: {} } },
        {
          name: "grid_secondary_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      ye("Export", [
        {
          name: "grid_secondary_export_highlight",
          selector: { boolean: {} },
          helper: zt,
          description: zt
        },
        {
          name: "grid_secondary_export_trend_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        },
        {
          name: "grid_secondary_export_icon_highlight",
          selector: { boolean: {} },
          helper: Mt,
          description: Mt
        },
        {
          name: "grid_secondary_export_icon_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        }
      ]),
      Qe("grid_secondary")
    ]
  },
  {
    type: "expandable",
    name: "",
    title: "Home node",
    icon: "mdi:home-lightning-bolt",
    expanded: !1,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "home_visible",
            selector: { boolean: {} },
            helper: $n,
            description: $n
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Identity",
        icon: "mdi:view-list-outline",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "home_entity",
                selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } },
                helper: En,
                description: En
              },
              { name: "home_label", selector: { text: {} } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "home_icon", selector: { icon: {} }, context: { icon_entity: "home_entity" } },
              {
                name: "home_icon_color",
                selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
              }
            ]
          }
        ]
      },
      ye("Calculation", [
        {
          name: "home_auto_calculate",
          selector: { boolean: {} },
          helper: vn,
          description: vn
        }
      ]),
      ye("Trend", [
        { name: "home_trend", selector: { boolean: {} } },
        {
          name: "home_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      Qe("home")
    ]
  },
  {
    type: "expandable",
    name: "",
    title: "Battery node",
    icon: "mdi:battery",
    expanded: !1,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "battery_visible",
            selector: { boolean: {} },
            helper: kn,
            description: kn
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Identity",
        icon: "mdi:view-list-outline",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "battery_entity",
                selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } },
                helper: Cn,
                description: Cn
              },
              { name: "battery_percentage_entity", selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "battery_label", selector: { text: {} } },
              { name: "battery_icon", selector: { icon: {} }, context: { icon_entity: "battery_entity" } }
            ]
          },
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "battery_icon_color",
                selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
              }
            ]
          }
        ]
      },
      ye("Trend", [
        { name: "battery_trend", selector: { boolean: {} } },
        {
          name: "battery_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      {
        type: "expandable",
        name: "",
        title: "Sign convention",
        icon: "mdi:swap-vertical",
        expanded: !1,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "battery_invert_flow",
                selector: { boolean: {} },
                helper: Qt,
                description: Qt
              },
              {
                name: "battery_invert_value_sign",
                selector: { boolean: {} },
                helper: ei,
                description: ei
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Alert",
        icon: "mdi:alert-outline",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "battery_low_alert", selector: { boolean: {} } },
              {
                name: "battery_low_threshold",
                selector: { number: { mode: "box", min: 0, max: 100, step: 1, unit_of_measurement: "%" } }
              }
            ]
          },
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "battery_low_alert_color",
                selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } },
                helper: At,
                description: At
              }
            ]
          }
        ]
      },
      Qe("battery")
    ]
  },
  {
    type: "expandable",
    name: "",
    title: "Battery 2 node",
    icon: "mdi:battery-outline",
    expanded: !1,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "battery_secondary_visible",
            selector: { boolean: {} },
            helper: Tn,
            description: Tn
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Identity",
        icon: "mdi:view-list-outline",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "battery_secondary_entity",
                selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } },
                helper: zn,
                description: zn
              },
              { name: "battery_secondary_percentage_entity", selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "battery_secondary_label", selector: { text: {} } },
              { name: "battery_secondary_icon", selector: { icon: {} }, context: { icon_entity: "battery_secondary_entity" } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "battery_secondary_icon_color",
                selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
              },
              {
                name: "battery_dual_alignment",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: ["center", "left", "right"]
                  }
                }
              }
            ]
          }
        ]
      },
      ye("Trend", [
        { name: "battery_secondary_trend", selector: { boolean: {} } },
        {
          name: "battery_secondary_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      {
        type: "expandable",
        name: "",
        title: "Sign convention",
        icon: "mdi:swap-vertical",
        expanded: !1,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "battery_secondary_invert_flow",
                selector: { boolean: {} },
                helper: Qt,
                description: Qt
              },
              {
                name: "battery_secondary_invert_value_sign",
                selector: { boolean: {} },
                helper: ei,
                description: ei
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Alert",
        icon: "mdi:alert-outline",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "battery_secondary_low_alert", selector: { boolean: {} } },
              {
                name: "battery_secondary_low_threshold",
                selector: { number: { mode: "box", min: 0, max: 100, step: 1, unit_of_measurement: "%" } }
              }
            ]
          },
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "battery_secondary_low_alert_color",
                selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } },
                helper: At,
                description: At
              }
            ]
          }
        ]
      },
      Qe("battery_secondary")
    ]
  },
  Jt("solar", "Solar sub blocks", "mdi:solar-power-variant", Dc),
  Jt("grid", "Grid 1 sub blocks", "mdi:transmission-tower", _r),
  Jt("grid_secondary", "Grid 2 sub blocks", "mdi:transmission-tower", _r),
  Jt("home", "Home sub blocks", "mdi:flash", Oc),
  {
    type: "expandable",
    name: "",
    title: "Tap behavior",
    icon: "mdi:gesture-tap",
    expanded: !1,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "node_actions_enabled",
            selector: { boolean: {} },
            helper: mr,
            description: mr
          }
        ]
      },
      {
        name: "entity",
        selector: { entity: {} },
        helper: "Default entity used by card-level more-info actions. Each main node and sub-block can override its own entity via its Interactions section.",
        description: "Default entity used by card-level more-info actions. Each main node and sub-block can override its own entity via its Interactions section."
      },
      { name: "tap_action", selector: { ui_action: {} } },
      { name: "hold_action", selector: { ui_action: {} } },
      { name: "double_tap_action", selector: { ui_action: {} } }
    ]
  }
], Uc = {
  name: "Name",
  home_visible: "Show home",
  solar_visible: "Show solar",
  grid_visible: "Show grid",
  grid_secondary_visible: "Show grid 2",
  battery_visible: "Show battery",
  battery_secondary_visible: "Show battery 2",
  battery_dual_alignment: "Battery 2 alignment",
  home_auto_calculate: "Auto-calc home",
  solar_auto_calculate: "Auto-calc solar",
  home_entity: "Home sensor",
  solar_entity: "Solar sensor",
  grid_entity: "Grid sensor",
  grid_secondary_entity: "Grid 2 sensor",
  battery_entity: "Battery sensor",
  battery_percentage_entity: "Battery SoC sensor",
  battery_secondary_entity: "Battery 2 sensor",
  battery_secondary_percentage_entity: "Battery 2 SoC sensor",
  solar_sub_enabled: "Enable solar sub",
  solar_sub_entity: "Solar sub sensor",
  solar_sub_label: "Solar sub name",
  solar_sub_icon: "Solar sub icon",
  solar_sub_icon_color: "Solar sub color",
  home_sub_enabled: "Enable home sub",
  home_sub_entity: "Home sub sensor",
  home_sub_label: "Home sub name",
  home_sub_icon: "Home sub icon",
  home_sub_icon_color: "Home sub color",
  solar_label: "Solar name",
  home_label: "Home name",
  grid_label: "Grid name",
  grid_secondary_label: "Grid 2 name",
  battery_label: "Battery name",
  battery_secondary_label: "Battery 2 name",
  solar_icon: "Solar icon",
  solar_icon_color: "Solar icon color",
  solar_trend: "Solar trend",
  solar_trend_color: "Solar trend color",
  grid_icon: "Grid icon",
  grid_icon_color: "Grid icon color",
  grid_secondary_icon: "Grid 2 icon",
  grid_secondary_icon_color: "Grid 2 icon color",
  grid_secondary_trend: "Grid 2 trend",
  grid_secondary_trend_color: "Grid 2 trend color",
  grid_trend: "Grid trend",
  grid_trend_color: "Grid trend color",
  grid_export_highlight: "Highlight export in trend",
  grid_export_trend_color: "Export trend color",
  grid_export_icon_highlight: "Highlight export icon",
  grid_export_icon_color: "Export icon color",
  grid_secondary_export_highlight: "Highlight export in trend",
  grid_secondary_export_trend_color: "Export trend color",
  grid_secondary_export_icon_highlight: "Highlight export icon",
  grid_secondary_export_icon_color: "Export icon color",
  home_icon: "Home icon",
  home_icon_color: "Home icon color",
  home_trend: "Home trend",
  home_trend_color: "Home trend color",
  battery_icon: "Battery icon",
  battery_icon_color: "Battery icon color",
  battery_trend: "Battery trend",
  battery_trend_color: "Battery trend color",
  battery_secondary_icon: "Battery 2 icon",
  battery_secondary_icon_color: "Battery 2 icon color",
  battery_secondary_trend: "Battery 2 trend",
  battery_secondary_trend_color: "Battery 2 trend color",
  shared_trend_scale: "Shared trend scale",
  trend_data_source: "Trend source",
  battery_low_alert: "Low battery alert",
  battery_low_threshold: "Low battery %",
  battery_low_alert_color: "Low alert color",
  battery_secondary_low_alert: "Battery 2 low alert",
  battery_secondary_low_threshold: "Battery 2 low %",
  battery_secondary_low_alert_color: "Low alert color",
  battery_invert_flow: "Reverse flow direction",
  battery_invert_value_sign: "Flip displayed value sign",
  battery_secondary_invert_flow: "Reverse flow direction",
  battery_secondary_invert_value_sign: "Flip displayed value sign",
  core_icon: "Core icon",
  core_icon_color: "Core icon color",
  flow_color: "Flow line color",
  unit: "Unit",
  decimals: "Decimals",
  auto_scale_units: "Auto unit scaling",
  decimals_base_unit: "Decimals (base unit)",
  decimals_prefixed_unit: "Decimals (prefixed units)",
  entity: "Action entity",
  tap_action: "Tap behavior",
  hold_action: "Hold behavior (default: 24h overview)",
  double_tap_action: "Double tap behavior",
  node_actions_enabled: "Enable per-node interactions",
  solar_tap_action: "Tap behavior (default: zoom view)",
  solar_hold_action: "Hold behavior (default: node detail)",
  solar_double_tap_action: "Double tap behavior",
  grid_tap_action: "Tap behavior (default: zoom view)",
  grid_hold_action: "Hold behavior (default: node detail)",
  grid_double_tap_action: "Double tap behavior",
  grid_secondary_tap_action: "Tap behavior (default: zoom view)",
  grid_secondary_hold_action: "Hold behavior (default: node detail)",
  grid_secondary_double_tap_action: "Double tap behavior",
  home_tap_action: "Tap behavior (default: zoom view)",
  home_hold_action: "Hold behavior (default: node detail)",
  home_double_tap_action: "Double tap behavior",
  battery_tap_action: "Tap behavior (default: zoom view)",
  battery_hold_action: "Hold behavior (default: node detail)",
  battery_double_tap_action: "Double tap behavior",
  battery_secondary_tap_action: "Tap behavior (default: zoom view)",
  battery_secondary_hold_action: "Hold behavior (default: node detail)",
  battery_secondary_double_tap_action: "Double tap behavior"
};
let _i = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => {
      const e = t.name ?? "", i = e.match(
        /^(solar|home|grid|grid_secondary)_sub_(\d+)_(enabled|entity|label|icon|icon_color|state_mode|tap_action|hold_action|double_tap_action)$/
      );
      if (i) {
        const [, , , n] = i;
        return {
          enabled: "Enabled",
          entity: "Entity",
          label: "Label",
          icon: "Icon",
          icon_color: "Color",
          state_mode: "State mode",
          tap_action: "Tap behavior",
          hold_action: "Hold behavior",
          double_tap_action: "Double tap behavior"
        }[n] ?? n;
      }
      return Uc[e] ?? e;
    }, this.computeHelper = (t) => {
      const e = t.name ?? "";
      if (e === "solar_entity")
        return Sn;
      if (e === "grid_entity")
        return Mn;
      if (e === "grid_secondary_entity")
        return An;
      if (e === "home_entity")
        return En;
      if (e === "battery_entity")
        return Cn;
      if (e === "battery_secondary_entity")
        return zn;
      if (/^(solar|home|grid|grid_secondary)_sub_\d+_icon_color$/.test(e))
        return Pn;
      if (/^(home|grid|grid_secondary)_sub_\d+_state_mode$/.test(e))
        return In;
      if (/^solar_sub_\d+_state_mode$/.test(e))
        return Dn;
      if (e === "solar_visible")
        return xn;
      if (e === "home_visible")
        return $n;
      if (e === "battery_visible")
        return kn;
      if (e === "battery_secondary_visible")
        return Tn;
      if (e === "solar_auto_calculate")
        return gn;
      if (e === "home_auto_calculate")
        return vn;
      if (e === "grid_visible")
        return bn;
      if (e === "grid_secondary_visible")
        return wn;
      if (e === "grid_export_highlight" || e === "grid_secondary_export_highlight")
        return zt;
      if (e === "grid_export_icon_highlight" || e === "grid_secondary_export_icon_highlight")
        return Mt;
      if (e === "battery_low_alert_color" || e === "battery_secondary_low_alert_color")
        return At;
      if (e === "unit")
        return Rn;
      if (e === "decimals")
        return Nn;
      if (e === "decimals_base_unit")
        return Ln;
      if (e === "decimals_prefixed_unit")
        return Hn;
      if (e === "trend_data_source")
        return Bn;
      if (e === "auto_scale_units")
        return On;
    }, this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM")
        return;
      const i = t.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i))
        return;
      const n = {
        ...i,
        trend_data_source: Fc(i.trend_data_source),
        type: "custom:power-pilz-energy-card"
      };
      this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: n },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(t) {
    this._config = {
      ...t,
      home_visible: t.home_visible ?? !0,
      solar_visible: t.solar_visible ?? !0,
      grid_visible: t.grid_visible ?? !0,
      grid_secondary_visible: t.grid_secondary_visible ?? !1,
      battery_visible: t.battery_visible ?? !0,
      battery_secondary_visible: t.battery_secondary_visible ?? !1,
      battery_dual_alignment: t.battery_dual_alignment ?? "center",
      home_auto_calculate: t.home_auto_calculate ?? !1,
      solar_auto_calculate: t.solar_auto_calculate ?? !1,
      grid_export_highlight: t.grid_export_highlight ?? !1,
      grid_export_trend_color: t.grid_export_trend_color ?? "red",
      grid_export_icon_highlight: t.grid_export_icon_highlight ?? !1,
      grid_export_icon_color: t.grid_export_icon_color ?? "red",
      grid_secondary_export_highlight: t.grid_secondary_export_highlight ?? !1,
      grid_secondary_export_trend_color: t.grid_secondary_export_trend_color ?? "red",
      grid_secondary_export_icon_highlight: t.grid_secondary_export_icon_highlight ?? !1,
      grid_secondary_export_icon_color: t.grid_secondary_export_icon_color ?? "red",
      battery_low_alert_color: t.battery_low_alert_color ?? "red",
      battery_secondary_low_alert_color: t.battery_secondary_low_alert_color ?? "red",
      battery_invert_flow: t.battery_invert_flow ?? !1,
      battery_invert_value_sign: t.battery_invert_value_sign ?? !1,
      battery_secondary_invert_flow: t.battery_secondary_invert_flow ?? !1,
      battery_secondary_invert_value_sign: t.battery_secondary_invert_value_sign ?? !1,
      shared_trend_scale: t.shared_trend_scale ?? !1,
      trend_data_source: Bc(t.trend_data_source),
      debug_performance: t.debug_performance ?? !1,
      decimals: t.decimals ?? 1,
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: t.decimals_base_unit ?? t.decimals ?? 1,
      decimals_prefixed_unit: t.decimals_prefixed_unit ?? t.decimals ?? 1,
      node_actions_enabled: t.node_actions_enabled ?? !0,
      type: "custom:power-pilz-energy-card"
    };
  }
  render() {
    return !this.hass || !this._config ? k : f`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Te}
      </div>
      <div style="margin: 0 0 14px; color: var(--secondary-text-color); line-height: 1.4;">
        Highly flexible energy flow card with configurable main nodes, trends, sub-nodes, auto calculations,
        export highlighting, and advanced unit handling.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Vc}
        .computeLabel=${this.computeLabel}
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Qn([
  I({ attribute: !1 })
], _i.prototype, "hass", 2);
Qn([
  C()
], _i.prototype, "_config", 2);
_i = Qn([
  ce("power-pilz-energy-card-editor")
], _i);
var Wc = Object.defineProperty, jc = Object.getOwnPropertyDescriptor, Re = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? jc(e, i) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = (n ? s(e, i, o) : s(o)) || o);
  return n && o && Wc(e, i, o), o;
};
const U = 0.01, xt = 1, ht = 1440 * 60 * 1e3, yr = 300 * 1e3, gr = 60 * 1e3, Kc = 350, vr = 4, br = 8, en = 2, Gc = 260, Yc = 220, wr = -1e-6, Ze = "red", Xc = "var(--rgb-primary-text-color, 33, 33, 33)", Zc = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), xr = "powerpilz-energy-node-detail", Sr = "powerpilz-energy-node-zoom";
let me = class extends L {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._showSubBlocks = !1, this._compactSubBlocks = !1, this._subNodeConnectorSegments = [], this._nodeActionHandlers = /* @__PURE__ */ new Map(), this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._isVisible = !1, this._liveRuntimeActive = !1, this._trendDrawConfig = {}, this._canvasColorContextCache = {}, this.handleCardKeyDown = (t) => {
      t.key !== "Enter" && t.key !== " " || (t.preventDefault(), this.fireAction("tap"));
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-energy-card-editor");
  }
  static async getStubConfig(t) {
    const e = (t == null ? void 0 : t.states) ?? {}, i = Object.keys(e), n = (...h) => h.find((d) => d in e), o = (h) => i.find((d) => d.startsWith(`${h}.`)), r = n("sensor.dev_home_power", "sensor.house_consumption_power") ?? o("sensor") ?? "sensor.dev_home_power", s = n("sensor.dev_solar_power", "sensor.solar_production_power") ?? o("sensor"), a = n("sensor.dev_grid_power", "sensor.grid_power") ?? o("sensor"), l = n("sensor.dev_battery_power", "sensor.home_battery_power") ?? o("sensor"), c = n("sensor.dev_battery_soc", "sensor.home_battery_soc") ?? o("sensor");
    return {
      type: "custom:power-pilz-energy-card",
      name: "Energy Flow",
      home_visible: !0,
      solar_visible: !0,
      grid_visible: !0,
      grid_secondary_visible: !1,
      battery_visible: !0,
      battery_secondary_visible: !1,
      battery_dual_alignment: "center",
      home_entity: r,
      home_auto_calculate: !1,
      solar_auto_calculate: !1,
      solar_entity: s,
      grid_entity: a,
      battery_entity: l,
      battery_percentage_entity: c,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      auto_scale_units: !1,
      decimals: xt,
      decimals_base_unit: xt,
      decimals_prefixed_unit: xt
    };
  }
  setConfig(t) {
    const e = t.home_entity ?? t.consumption_entity ?? "sensor.dev_home_power", i = typeof t.decimals == "number" && Number.isFinite(t.decimals) ? Math.min(3, Math.max(0, Math.round(t.decimals))) : xt, n = Se(t.decimals_base_unit, i), o = Se(t.decimals_prefixed_unit, i);
    this._config = {
      ...t,
      name: t.name ?? "Energy Flow",
      home_visible: t.home_visible ?? !0,
      solar_visible: t.solar_visible ?? !0,
      grid_visible: t.grid_visible ?? !0,
      grid_secondary_visible: t.grid_secondary_visible ?? !1,
      battery_visible: t.battery_visible ?? !0,
      battery_secondary_visible: t.battery_secondary_visible ?? !1,
      battery_dual_alignment: this.normalizeBatteryDualAlignment(t.battery_dual_alignment),
      home_entity: e,
      home_auto_calculate: t.home_auto_calculate ?? !1,
      solar_auto_calculate: t.solar_auto_calculate ?? !1,
      solar_entity: t.solar_entity ?? t.production_entity,
      solar_sub_enabled: t.solar_sub_enabled ?? !1,
      solar_sub_label: t.solar_sub_label ?? "Solar Sub",
      solar_sub_icon: t.solar_sub_icon ?? "mdi:solar-power-variant",
      home_sub_enabled: t.home_sub_enabled ?? !1,
      home_sub_label: t.home_sub_label ?? "Home Load",
      home_sub_icon: t.home_sub_icon ?? "mdi:flash",
      grid_label: t.grid_label ?? "Grid",
      grid_secondary_label: t.grid_secondary_label ?? "Grid 2",
      solar_label: t.solar_label ?? "Solar",
      home_label: t.home_label ?? "Home",
      battery_label: t.battery_label ?? "Battery",
      battery_secondary_label: t.battery_secondary_label ?? "Battery 2",
      solar_icon: t.solar_icon ?? "mdi:weather-sunny",
      grid_icon: t.grid_icon ?? "mdi:transmission-tower",
      grid_secondary_icon: t.grid_secondary_icon ?? "mdi:transmission-tower",
      home_icon: t.home_icon ?? "mdi:home-lightning-bolt",
      battery_secondary_icon: t.battery_secondary_icon ?? "mdi:battery-outline",
      core_icon: t.core_icon ?? "mdi:home",
      core_icon_color: t.core_icon_color,
      solar_trend: t.solar_trend ?? !1,
      grid_trend: t.grid_trend ?? !1,
      grid_secondary_trend: t.grid_secondary_trend ?? !1,
      home_trend: t.home_trend ?? !1,
      battery_trend: t.battery_trend ?? !1,
      battery_secondary_trend: t.battery_secondary_trend ?? !1,
      grid_export_highlight: t.grid_export_highlight ?? !1,
      grid_export_trend_color: t.grid_export_trend_color ?? Ze,
      grid_export_icon_highlight: t.grid_export_icon_highlight ?? !1,
      grid_export_icon_color: t.grid_export_icon_color ?? Ze,
      grid_secondary_export_highlight: t.grid_secondary_export_highlight ?? !1,
      grid_secondary_export_trend_color: t.grid_secondary_export_trend_color ?? Ze,
      grid_secondary_export_icon_highlight: t.grid_secondary_export_icon_highlight ?? !1,
      grid_secondary_export_icon_color: t.grid_secondary_export_icon_color ?? Ze,
      shared_trend_scale: t.shared_trend_scale ?? !1,
      debug_performance: t.debug_performance ?? !1,
      trend_data_source: ie(t.trend_data_source, "hybrid"),
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: n,
      decimals_prefixed_unit: o,
      battery_low_alert: t.battery_low_alert ?? !1,
      battery_low_threshold: this.normalizeBatteryThreshold(t.battery_low_threshold),
      battery_low_alert_color: t.battery_low_alert_color ?? Ze,
      battery_secondary_low_alert: t.battery_secondary_low_alert ?? !1,
      battery_secondary_low_threshold: this.normalizeBatteryThreshold(t.battery_secondary_low_threshold),
      battery_secondary_low_alert_color: t.battery_secondary_low_alert_color ?? Ze,
      battery_invert_flow: t.battery_invert_flow ?? !1,
      battery_invert_value_sign: t.battery_invert_value_sign ?? !1,
      battery_secondary_invert_flow: t.battery_secondary_invert_flow ?? !1,
      battery_secondary_invert_value_sign: t.battery_secondary_invert_value_sign ?? !1,
      flow_color: t.flow_color,
      decimals: i
    };
  }
  getCardSize() {
    return 4;
  }
  getGridOptions() {
    return {
      columns: 6,
      rows: 4,
      min_columns: 3,
      max_columns: 12,
      min_rows: 2,
      max_rows: 8
    };
  }
  getLayoutOptions() {
    return {
      grid_columns: 2,
      grid_rows: 4
    };
  }
  render() {
    if (!this._config)
      return f`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return f``;
    const t = this._config, e = t.decimals ?? xt, i = t.home_visible !== !1, n = t.solar_visible !== !1, o = t.grid_visible !== !1, r = o && t.grid_secondary_visible === !0, s = t.battery_visible !== !1, a = s && t.battery_secondary_visible === !0, l = this.normalizeBatteryDualAlignment(t.battery_dual_alignment), c = n ? this.collectSubBlocks("solar", t) : [], h = c.filter((N) => !N.stateMode), d = o ? this.collectSubBlocks("grid", t) : [], p = r ? this.collectSubBlocks("grid_secondary", t) : [], _ = i ? this.collectSubBlocks("home", t) : [], m = (N, qa) => N !== null ? N : this.preview ? qa : null, g = m(F(this.hass, t.home_entity), 3.2), y = n ? m(F(this.hass, t.solar_entity), 4.1) : null, b = o ? m(F(this.hass, t.grid_entity), -1.3) : null, v = r ? m(F(this.hass, t.grid_secondary_entity), 0.2) : null, x = s ? m(F(this.hass, t.battery_entity), 1.5) : null, E = m(F(this.hass, t.battery_percentage_entity), 72), w = a ? m(F(this.hass, t.battery_secondary_entity), 0) : null, S = m(
      F(this.hass, t.battery_secondary_percentage_entity),
      85
    ), $ = t.unit ?? "kW", T = W(this.hass, t.solar_entity) ?? $, A = W(this.hass, t.grid_entity) ?? $, P = W(this.hass, t.grid_secondary_entity) ?? $, D = W(this.hass, t.battery_entity), O = W(this.hass, t.battery_percentage_entity), H = W(this.hass, t.battery_secondary_entity), Q = W(this.hass, t.battery_secondary_percentage_entity), ee = D ?? $, ze = H ?? $, Ne = this.resolveBatteryPercentage(
      E,
      x,
      D
    ), Le = this.resolveBatteryPercentage(
      S,
      w,
      H
    ), ki = !!this.readConfigString(t.battery_percentage_entity) || this.isPercentageUnit(D), Ci = !!this.readConfigString(t.battery_secondary_percentage_entity) || this.isPercentageUnit(H), vt = t.solar_auto_calculate === !0 ? this.resolveAutoSolarUnit(t, h, $) : T, bt = t.solar_auto_calculate === !0 ? this.computeAutoSolarValueFromSubBlocks(h, vt) : y, Ti = t.home_auto_calculate === !0 ? this.resolveAutoHomeUnit(t, $, vt) : W(this.hass, t.home_entity) ?? $, Ft = t.home_auto_calculate === !0 ? this.computeAutoHomeValueFromNodeValues(
      {
        solar: bt,
        grid: b,
        grid_secondary: v,
        battery: x,
        battery_secondary: w
      },
      {
        solar: vt,
        grid: A,
        grid_secondary: P,
        battery: ee,
        battery_secondary: ze
      },
      Ti
    ) : g, Js = ki ? O ?? "%" : ee, Qs = Ci ? Q ?? "%" : ze, ea = this.toUnidirectionalFlow(bt), ta = this.toUnidirectionalFlow(Ft), ia = this.toBidirectionalFlow(b), na = this.toBidirectionalFlow(v), oa = this.sumComparableValues([
      { value: b, unit: A },
      { value: v, unit: P }
    ]), ra = b === null && v === null ? "none" : this.toBidirectionalFlow(oa), sa = t.battery_invert_flow === !0, aa = t.battery_secondary_invert_flow === !0, So = sa && x !== null ? -x : x, $o = aa && w !== null ? -w : w, la = this.toBidirectionalFlow(So), ca = this.toBidirectionalFlow($o), da = this.sumComparableValues([
      { value: So, unit: ee },
      { value: $o, unit: ze }
    ]), ha = x === null && w === null ? "none" : this.toBidirectionalFlow(da), ua = t.battery_invert_value_sign === !0, pa = t.battery_secondary_invert_value_sign === !0, Eo = ua && x !== null ? -x : x, ko = pa && w !== null ? -w : w, _a = this.hasConfiguredAction(t), zi = !this.isEditorPreview() && _a, ma = this.iconColorStyle(t.solar_icon_color), fa = this.iconColorStyle(t.home_icon_color), ya = this.iconShapeStyle(t.core_icon_color), Mi = new Set(_.map((N) => N.index)), lt = new Set(c.map((N) => N.index)), ga = Mi.has(7) && Mi.has(8), va = [5, 6, 7, 8].some((N) => Mi.has(N)), ba = lt.has(1) && lt.has(2) && !lt.has(3) && !lt.has(4), wa = lt.has(3) && lt.has(4), Co = r && (ba && ga || wa && va), xa = r && !Co, Ai = _.some((N) => N.index >= 7), To = this.homeSubPositions(Ai), zo = this.gridSubPositions(r), Mo = this.gridSecondarySubPositions(), Ao = this.solarSubPositions(
      Ai,
      xa,
      Co
    ), Po = _.filter((N) => N.index <= (Ai ? 8 : 6)), Pi = o ? { col: 1, row: r ? 2 : 3, colSpan: 2, rowSpan: 2 } : null, Ii = r ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 } : null, Di = s ? {
      col: a && l === "center" ? 2 : 3,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, Oi = a ? {
      col: l === "left" ? 1 : l === "right" ? 5 : 4,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, G = this.computeGridBounds(
      i,
      n,
      o,
      r,
      s,
      a,
      Pi,
      Ii,
      Di,
      Oi,
      c,
      d,
      p,
      Po,
      Ao,
      zo,
      Mo,
      To
    ), Ri = n ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, G) : null, Vt = Pi ? this.normalizePlacement(Pi, G) : null, Ut = Ii ? this.normalizePlacement(Ii, G) : null, Ni = i ? this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, G) : null, Wt = Di ? this.normalizePlacement(Di, G) : null, jt = Oi ? this.normalizePlacement(Oi, G) : null, Io = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, G), Sa = this.normalizePositions(Ao, G), $a = this.normalizePositions(zo, G), Ea = this.normalizePositions(Mo, G), ka = this.normalizePositions(To, G), Do = this.normalizeBatteryThreshold(t.battery_low_threshold), Oo = !!t.battery_low_alert, Ro = this.normalizeBatteryThreshold(t.battery_secondary_low_threshold), No = !!t.battery_secondary_low_alert, Kt = this.resolveColor(Ze), Li = this.resolveColor(t.battery_low_alert_color, Kt), Hi = this.resolveColor(
      t.battery_secondary_low_alert_color,
      Kt
    ), Bi = Oo && Ne !== null && Ne <= Do, Ca = this.iconColorStyle(
      Bi ? Li : t.battery_icon_color
    ), Ta = this.batteryIcon(
      Ne,
      this.isPercentageUnit(D) ? null : x,
      t.battery_icon
    ), Fi = No && Le !== null && Le <= Ro, za = this.iconColorStyle(
      Fi ? Hi : t.battery_secondary_icon_color
    ), Ma = this.batteryIcon(
      Le,
      this.isPercentageUnit(H) ? null : w,
      t.battery_secondary_icon
    ), Aa = b !== null && Number.isFinite(b) && b < 0, Pa = v !== null && Number.isFinite(v) && v < 0, Ia = this.iconColorStyle(
      t.grid_export_icon_highlight === !0 && Aa ? t.grid_export_icon_color : t.grid_icon_color
    ), Da = this.iconColorStyle(
      t.grid_secondary_export_icon_highlight === !0 && Pa ? t.grid_secondary_export_icon_color : t.grid_secondary_icon_color
    ), Oa = { "--flow-color-rgb": this.toRgbCss(t.flow_color) ?? Xc }, ct = this.resolveColor("purple"), Ra = this.resolveColor(t.solar_trend_color, ct), Na = this.resolveColor(t.grid_trend_color, ct), La = this.resolveColor(t.grid_secondary_trend_color, ct), Ha = this.resolveColor(t.grid_export_trend_color, Kt), Ba = this.resolveColor(
      t.grid_secondary_export_trend_color,
      Kt
    ), Fa = this.resolveColor(t.home_trend_color, ct), Va = this.resolveColor(t.battery_trend_color, ct), Ua = this.resolveColor(t.battery_secondary_trend_color, ct), Wa = t.grid_export_highlight === !0 ? wr : null, ja = t.grid_secondary_export_highlight === !0 ? wr : null, Ka = Oo && ki ? Do : null, Ga = ki ? Ne : Eo, Ya = No && Ci ? Ro : null, Xa = Ci ? Le : ko, Za = this.buildFlowSegments(
      Ni,
      Io,
      Ri,
      [
        ...Vt ? [{ placement: Vt, direction: ia }] : [],
        ...Ut ? [{ placement: Ut, direction: na }] : []
      ],
      ra,
      [
        ...Wt ? [{ placement: Wt, direction: la }] : [],
        ...jt ? [{ placement: jt, direction: ca }] : []
      ],
      ha,
      ea,
      ta,
      G
    );
    return f`
      <ha-card
        class=${zi ? "interactive" : ""}
        tabindex=${zi ? 0 : -1}
        role=${zi ? "button" : "article"}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div
            class="energy-grid"
            style=${z({
      ...Oa,
      "--grid-columns": `${G.cols}`,
      "--grid-rows": `${G.rows}`,
      "--grid-aspect": `${G.cols} / ${G.rows}`
    })}
          >
            ${Za.map(
      (N) => this.renderFlowLine(N.orientation, N.direction, {
        ...N.orientation === "horizontal" ? {
          left: `${N.left}%`,
          top: `calc(${N.top}% - (var(--flow-line-size) / 2))`,
          width: `${N.width}%`
        } : {
          left: `calc(${N.left}% - (var(--flow-line-size) / 2))`,
          top: `${N.top}%`,
          height: `${N.height}%`
        }
      })
    )}
            ${this.renderSubNodeConnectors()}

            ${n && Ri ? f`
                  <div
                    class="energy-value solar ${bt === null ? "missing" : ""}"
                    data-pp-node-key="solar"
                    style=${z(this.gridPlacementStyle(Ri))}
                  >
                    ${this.renderTrend("solar", bt, vt, !!t.solar_trend, Ra, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.solar_icon ?? "mdi:weather-sunny"}
                        style=${z(ma)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(bt, vt, e)}</div>
                      <div class="energy-label">${t.solar_label}</div>
                    </div>
                  </div>
                ` : k}

            ${o && Vt ? f`
                  <div
                    class="energy-value grid ${b === null ? "missing" : ""}"
                    data-pp-node-key="grid"
                    style=${z(this.gridPlacementStyle(Vt))}
                  >
                    ${this.renderTrend(
      "grid",
      b,
      A,
      !!t.grid_trend,
      Na,
      Wa,
      Ha
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.grid_icon ?? "mdi:transmission-tower"}
                        style=${z(Ia)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(b, A, e)}</div>
                      <div class="energy-label">${t.grid_label}</div>
                    </div>
                  </div>
                ` : k}

            ${r && Ut ? f`
                  <div
                    class="energy-value grid-secondary ${v === null ? "missing" : ""}"
                    data-pp-node-key="grid_secondary"
                    style=${z(this.gridPlacementStyle(Ut))}
                  >
                    ${this.renderTrend(
      "grid_secondary",
      v,
      P,
      !!t.grid_secondary_trend,
      La,
      ja,
      Ba
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${z(Da)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(v, P, e)}</div>
                      <div class="energy-label">${t.grid_secondary_label}</div>
                    </div>
                  </div>
                ` : k}

            ${i && Ni ? f`
                  <div
                    class="energy-value home ${Ft === null ? "missing" : ""}"
                    data-pp-node-key="home"
                    style=${z(this.gridPlacementStyle(Ni))}
                  >
                    ${this.renderTrend("home", Ft, Ti, !!t.home_trend, Fa, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.home_icon ?? "mdi:home-lightning-bolt"}
                        style=${z(fa)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(Ft, Ti, e)}</div>
                      <div class="energy-label">${t.home_label}</div>
                    </div>
                  </div>
                ` : k}

            ${this._showSubBlocks ? this.renderSubNodes("solar", c, Sa, e) : k}
            ${this._showSubBlocks ? this.renderSubNodes("grid", d, $a, e) : k}
            ${this._showSubBlocks ? this.renderSubNodes("grid_secondary", p, Ea, e) : k}
            ${this._showSubBlocks ? this.renderSubNodes("home", Po, ka, e) : k}

            ${s && Wt ? f`
                  <div
                    class="energy-value battery ${x === null ? "missing" : ""}"
                    data-pp-node-key="battery"
                    style=${z(this.gridPlacementStyle(Wt))}
                  >
                    ${this.renderTrend(
      "battery",
      Ga,
      Js,
      !!t.battery_trend,
      Va,
      Ka,
      Li
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon class="energy-icon" .icon=${Ta} style=${z(Ca)}></ha-icon>
                        ${Ne !== null ? f`
                              <div
                                class="battery-percentage ${Bi ? "alert" : ""}"
                                style=${z(Bi ? { color: Li } : {})}
                              >
                                ${this.formatBatteryPercentage(Ne)}
                              </div>
                            ` : k}
                      </div>
                      <div class="energy-number">${this.formatValue(Eo, ee, e)}</div>
                      <div class="energy-label">${t.battery_label}</div>
                    </div>
                  </div>
                ` : k}

            ${a && jt ? f`
                  <div
                    class="energy-value battery-secondary ${w === null ? "missing" : ""}"
                    data-pp-node-key="battery_secondary"
                    style=${z(this.gridPlacementStyle(jt))}
                  >
                    ${this.renderTrend(
      "battery_secondary",
      Xa,
      Qs,
      !!t.battery_secondary_trend,
      Ua,
      Ya,
      Hi
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${Ma}
                          style=${z(za)}
                        ></ha-icon>
                        ${Le !== null ? f`
                              <div
                                class="battery-percentage ${Fi ? "alert" : ""}"
                                style=${z(Fi ? { color: Hi } : {})}
                              >
                                ${this.formatBatteryPercentage(Le)}
                              </div>
                            ` : k}
                      </div>
                      <div class="energy-number">${this.formatValue(ko, ze, e)}</div>
                      <div class="energy-label">${t.battery_secondary_label}</div>
                    </div>
                  </div>
                ` : k}

            <div class="home-core" style=${z(this.gridPlacementStyle(Io))}>
              <div class="home-core-icon" style=${z(ya)}>
                <ha-icon .icon=${t.core_icon ?? "mdi:home"}></ha-icon>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderFlowLine(t, e, i) {
    const n = e === "none" ? `flow-line dynamic ${t}` : `flow-line dynamic ${t} active ${e}`;
    return f`<div class=${n} style=${z(i)} aria-hidden="true"></div>`;
  }
  renderSubNodeConnectors() {
    return !this._showSubBlocks || this._subNodeConnectorSegments.length === 0 ? k : f`
      <div class="subnode-connectors" aria-hidden="true">
        ${this._subNodeConnectorSegments.map(
      (t) => f`
            <div
              class="subnode-connector-segment ${t.node}"
              style=${z({
        left: `${t.left}px`,
        top: `${t.top}px`,
        width: `${t.width}px`,
        height: `${t.height}px`
      })}
            ></div>
          `
    )}
      </div>
    `;
  }
  collectSubBlocks(t, e) {
    if (!this.hass)
      return [];
    const i = [], n = t === "solar" ? "mdi:solar-power-variant" : t === "home" ? "mdi:flash" : "mdi:transmission-tower", o = t === "solar" ? "Solar" : t === "home" ? "Home" : t === "grid" ? "Grid" : "Grid 2", r = t === "solar" ? vr : t === "home" ? br : en;
    for (let d = 1; d <= r; d += 1) {
      const p = e[`${t}_sub_${d}_enabled`] === !0, _ = this.readConfigString(e[`${t}_sub_${d}_entity`]);
      if (!p || !_)
        continue;
      const m = e[`${t}_sub_${d}_state_mode`] === !0;
      i.push({
        key: `${t}_${d}`,
        index: d,
        icon: this.readConfigString(e[`${t}_sub_${d}_icon`]) ?? n,
        iconStyle: this.iconColorStyle(e[`${t}_sub_${d}_icon_color`]),
        label: this.readConfigString(e[`${t}_sub_${d}_label`]) ?? `${o} ${d}`,
        value: F(this.hass, _),
        unit: W(this.hass, _) ?? e.unit ?? "kW",
        stateMode: m,
        stateText: m ? ci(this.hass, _) : void 0
      });
    }
    if (i.length > 0)
      return i;
    if (t !== "solar" && t !== "home")
      return [];
    const s = t === "solar" ? !!e.solar_sub_enabled : !!e.home_sub_enabled, a = t === "solar" ? e.solar_sub_entity : e.home_sub_entity;
    if (!s || !a)
      return [];
    const l = t === "solar" ? e.solar_sub_icon ?? n : e.home_sub_icon ?? n, c = t === "solar" ? e.solar_sub_icon_color : e.home_sub_icon_color, h = t === "solar" ? e.solar_sub_label ?? "Solar Sub" : e.home_sub_label ?? "Home Load";
    return [
      {
        key: `${t}_legacy`,
        index: 1,
        icon: l,
        iconStyle: this.iconColorStyle(c),
        label: h,
        value: F(this.hass, a),
        unit: W(this.hass, a) ?? e.unit ?? "kW",
        stateMode: !1
      }
    ];
  }
  solarSubPositions(t, e = !1, i = !1) {
    return e ? {
      1: { row: 1, col: 5 },
      2: { row: 1, col: 6 },
      3: { row: 1, col: 2 },
      4: { row: 1, col: 1 }
    } : t || i ? {
      1: { row: 1, col: 2 },
      2: { row: 1, col: 1 },
      3: { row: 2, col: 2 },
      4: { row: 2, col: 1 }
    } : {
      1: { row: 1, col: 5 },
      2: { row: 1, col: 6 },
      3: { row: 1, col: 2 },
      4: { row: 1, col: 1 }
    };
  }
  homeSubPositions(t) {
    return t ? {
      1: { row: 5, col: 6 },
      2: { row: 5, col: 5 },
      3: { row: 6, col: 6 },
      4: { row: 6, col: 5 },
      5: { row: 2, col: 6 },
      6: { row: 2, col: 5 },
      7: { row: 1, col: 6 },
      8: { row: 1, col: 5 }
    } : {
      1: { row: 5, col: 6 },
      2: { row: 5, col: 5 },
      3: { row: 6, col: 6 },
      4: { row: 6, col: 5 },
      5: { row: 2, col: 6 },
      6: { row: 2, col: 5 }
    };
  }
  gridSubPositions(t) {
    return t ? {
      1: { row: 1, col: 1 },
      2: { row: 1, col: 2 }
    } : {
      1: { row: 5, col: 1 },
      2: { row: 5, col: 2 }
    };
  }
  gridSecondarySubPositions() {
    return {
      1: { row: 6, col: 1 },
      2: { row: 6, col: 2 }
    };
  }
  gridPlacementStyle(t) {
    const e = t.colSpan ?? 1, i = t.rowSpan ?? 1;
    return {
      "grid-column": `${t.col} / span ${e}`,
      "grid-row": `${t.row} / span ${i}`
    };
  }
  normalizePlacement(t, e) {
    return {
      col: t.col - e.minCol + 1,
      row: t.row - e.minRow + 1,
      colSpan: t.colSpan ?? 1,
      rowSpan: t.rowSpan ?? 1
    };
  }
  normalizePositions(t, e) {
    const i = {};
    return Object.entries(t).forEach(([n, o]) => {
      i[Number(n)] = {
        row: o.row - e.minRow + 1,
        col: o.col - e.minCol + 1
      };
    }), i;
  }
  computeGridBounds(t, e, i, n, o, r, s, a, l, c, h, d, p, _, m, g, y, b) {
    const v = [{ col: 3, row: 3, colSpan: 2, rowSpan: 2 }];
    t && v.push({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }), e && v.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }), i && s && v.push(s), n && a && v.push(a), o && l && v.push(l), r && c && v.push(c), h.forEach(($) => {
      const T = m[$.index];
      T && v.push({ col: T.col, row: T.row, colSpan: 1, rowSpan: 1 });
    }), d.forEach(($) => {
      const T = g[$.index];
      T && v.push({ col: T.col, row: T.row, colSpan: 1, rowSpan: 1 });
    }), p.forEach(($) => {
      const T = y[$.index];
      T && v.push({ col: T.col, row: T.row, colSpan: 1, rowSpan: 1 });
    }), _.forEach(($) => {
      const T = b[$.index];
      T && v.push({ col: T.col, row: T.row, colSpan: 1, rowSpan: 1 });
    });
    const x = Math.min(...v.map(($) => $.col)), E = Math.max(...v.map(($) => $.col + ($.colSpan ?? 1) - 1)), w = Math.min(...v.map(($) => $.row)), S = Math.max(...v.map(($) => $.row + ($.rowSpan ?? 1) - 1));
    return {
      minCol: x,
      maxCol: E,
      minRow: w,
      maxRow: S,
      cols: E - x + 1,
      rows: S - w + 1
    };
  }
  placementCenter(t, e) {
    const i = t.colSpan ?? 1, n = t.rowSpan ?? 1;
    return {
      x: (t.col - 1 + i / 2) / e.cols * 100,
      y: (t.row - 1 + n / 2) / e.rows * 100
    };
  }
  buildFlowSegments(t, e, i, n, o, r, s, a, l, c) {
    const h = this.placementCenter(e, c), d = [], p = (m, g, y, b) => {
      const v = Math.min(m, g), x = Math.abs(g - m);
      x <= U || d.push({
        orientation: "horizontal",
        direction: b,
        left: v,
        top: y,
        width: x,
        height: 0
      });
    }, _ = (m, g, y, b) => {
      const v = Math.min(m, g), x = Math.abs(g - m);
      x <= U || d.push({
        orientation: "vertical",
        direction: b,
        left: y,
        top: v,
        width: 0,
        height: x
      });
    };
    if (t) {
      const m = this.placementCenter(t, c);
      p(h.x, m.x, h.y, l);
    }
    if (i) {
      const m = this.placementCenter(i, c);
      _(m.y, h.y, h.x, a);
    }
    if (n.length === 1) {
      const [{ placement: m, direction: g }] = n, y = this.placementCenter(m, c);
      p(y.x, h.x, h.y, g);
    } else if (n.length >= 2) {
      const m = n.map((b) => ({
        direction: b.direction,
        center: this.placementCenter(b.placement, c)
      })).sort((b, v) => b.center.y - v.center.y), g = Math.min(...m.map((b) => b.center.x)), y = h.x - (h.x - g) * 0.5;
      p(h.x, y, h.y, o), m.forEach((b) => {
        const v = b.center.y > h.y + U ? this.reverseFlowDirection(b.direction) : b.direction;
        _(h.y, b.center.y, y, v), p(b.center.x, y, b.center.y, b.direction);
      });
    }
    if (r.length === 1) {
      const [{ placement: m, direction: g }] = r, y = this.placementCenter(m, c);
      _(h.y, y.y, h.x, g);
    } else if (r.length >= 2) {
      const m = r.map((b) => ({
        placement: b.placement,
        direction: b.direction,
        center: this.placementCenter(b.placement, c)
      })).sort((b, v) => b.center.y - v.center.y), g = Math.min(
        ...m.map((b) => (b.placement.row - 1) / c.rows * 100)
      ), y = Math.max(h.y + U, g);
      _(h.y, y, h.x, s), m.forEach((b) => {
        const v = b.center.x < h.x - U ? this.reverseFlowDirection(b.direction) : b.direction;
        p(h.x, b.center.x, y, v), _(y, b.center.y, b.center.x, b.direction);
      });
    }
    return d;
  }
  renderSubNodes(t, e, i, n) {
    return e.length === 0 ? k : f`
      ${e.map((o) => {
      var _;
      const r = i[o.index];
      if (!r)
        return k;
      const s = {
        "grid-column": `${r.col}`,
        "grid-row": `${r.row}`
      }, a = ((_ = o.stateText) == null ? void 0 : _.trim()) ?? "", l = o.stateMode, c = a.length === 0, h = l ? c ? "--" : a : this.formatValue(o.value, o.unit, n), d = l ? { value: h, unit: "" } : this.splitFormattedValueAndUnit(h, o.unit), p = l ? c : o.value === null;
      return f`
            <div
              class="energy-sub-value ${t}-sub sub-col-${r.col} ${this._compactSubBlocks ? "compact" : ""} ${p ? "missing" : ""}"
              data-key=${o.key}
              data-pp-node-key="${t}_sub_${o.index}"
              style=${z(s)}
            >
              <div class="energy-sub-content">
                <ha-icon class="energy-sub-icon" .icon=${o.icon} style=${z(o.iconStyle)}></ha-icon>
                <div class="energy-sub-number">${this._compactSubBlocks ? d.value : h}</div>
                ${l ? k : f`<div class="energy-sub-unit">${d.unit}</div>`}
                <div class="energy-sub-label">${o.label}</div>
              </div>
            </div>
          `;
    })}
    `;
  }
  readConfigString(t) {
    if (typeof t != "string")
      return;
    const e = t.trim();
    return e.length > 0 ? e : void 0;
  }
  resolveAutoSolarUnit(t, e, i) {
    const n = t.unit;
    if (n && n.trim().length > 0)
      return n;
    const o = e.map((s) => s.unit).find((s) => typeof s == "string" && s.trim().length > 0);
    if (o)
      return o;
    const r = W(this.hass, t.solar_entity);
    return r && r.trim().length > 0 ? r : i;
  }
  computeAutoSolarValueFromSubBlocks(t, e) {
    const i = t.filter(
      (l) => l.value !== null && Number.isFinite(l.value)
    );
    if (i.length === 0)
      return null;
    const n = i.reduce((l, c) => l + c.value, 0);
    let o = null, r = 0;
    for (const l of i) {
      const c = te(l.unit);
      if (!c)
        return n <= U ? 0 : n;
      if (o === null)
        o = c.family;
      else if (o !== c.family)
        return n <= U ? 0 : n;
      r += l.value * c.factor;
    }
    let s = r;
    const a = te(e);
    return a && o !== null && a.family === o && a.factor > 0 && (s /= a.factor), Number.isFinite(s) ? s <= U ? 0 : s : null;
  }
  homeComputationDependencies(t) {
    const e = [], i = (n, o) => {
      o && e.push({ role: n, entityId: o });
    };
    return t.solar_visible !== !1 && i("solar", this.readConfigString(t.solar_entity)), t.grid_visible !== !1 && (i("grid", this.readConfigString(t.grid_entity)), t.grid_secondary_visible === !0 && i("grid_secondary", this.readConfigString(t.grid_secondary_entity))), t.battery_visible !== !1 && (i("battery", this.readConfigString(t.battery_entity)), t.battery_secondary_visible === !0 && i("battery_secondary", this.readConfigString(t.battery_secondary_entity))), e;
  }
  resolveAutoHomeUnit(t, e, i) {
    const n = t.unit;
    if (n && n.trim().length > 0)
      return n;
    if (t.solar_auto_calculate === !0 && t.solar_visible !== !1 && i && i.trim().length > 0)
      return i;
    const o = this.homeComputationDependencies(t);
    for (const r of o) {
      const s = W(this.hass, r.entityId);
      if (s && s.trim().length > 0)
        return s;
    }
    return e;
  }
  computeAutoHomeValueFromNodeValues(t, e, i) {
    if (!Object.values(t).some((h) => h != null && Number.isFinite(h)))
      return null;
    const o = {};
    let r = 0;
    e && Object.keys(t).forEach((h) => {
      const d = t[h], p = e[h];
      d != null && Number.isFinite(d) && (r += 1, p && (o[h] = p));
    });
    const s = Object.keys(o).length === r ? Fl(o) : { comparable: !1, family: null, factors: {} }, a = s.comparable ? s.factors : void 0, l = (h) => {
      const d = t[h];
      if (d == null || !Number.isFinite(d))
        return 0;
      const p = (a == null ? void 0 : a[h]) ?? 1;
      return d * p;
    };
    let c = l("solar") + l("grid") + l("grid_secondary") - l("battery") - l("battery_secondary");
    if (a && i) {
      const h = te(i);
      h && s.family !== null && h.family === s.family && h.factor > 0 && (c /= h.factor);
    }
    return Number.isFinite(c) ? c <= U ? 0 : c : null;
  }
  sumComparableValues(t) {
    const e = t.filter(
      (o) => o.value !== null && Number.isFinite(o.value)
    );
    if (e.length === 0)
      return null;
    let i = null, n = 0;
    for (const o of e) {
      const r = te(o.unit);
      if (!r)
        return e.reduce((s, a) => s + a.value, 0);
      if (i === null)
        i = r.family;
      else if (i !== r.family)
        return e.reduce((s, a) => s + a.value, 0);
      n += o.value * r.factor;
    }
    return n;
  }
  renderTrend(t, e, i, n, o, r, s) {
    return n ? (this._trendDrawConfig[t] = {
      currentValue: e,
      unit: i,
      color: o,
      threshold: r,
      thresholdColor: s
    }, f`
      <div class="node-trend" aria-hidden="true">
        <canvas class="node-trend-canvas-area" data-node=${t}></canvas>
      </div>
      <div class="node-trend-line" aria-hidden="true">
        <canvas class="node-trend-canvas-line" data-node=${t}></canvas>
      </div>
    `) : (delete this._trendDrawConfig[t], k);
  }
  trendPoints(t, e) {
    const i = Date.now(), n = i - ht, o = this._trendSeries[t] ?? [];
    let r = 0;
    for (; r < o.length && o[r].ts < n; )
      r += 1;
    const s = r > 0 ? o.slice(r) : [...o];
    return e !== null && Number.isFinite(e) && s.push({ ts: i, value: e }), s;
  }
  buildThresholdTrendSegments(t, e) {
    const i = [];
    for (let n = 1; n < t.length; n += 1) {
      const o = t[n - 1], r = t[n], s = o.value <= e, a = r.value <= e;
      if (s === a || Math.abs(r.value - o.value) <= U) {
        i.push({
          start: o,
          end: r,
          low: s
        });
        continue;
      }
      const l = (e - o.value) / (r.value - o.value), c = Math.max(0, Math.min(1, l)), h = {
        x: o.x + (r.x - o.x) * c,
        y: o.y + (r.y - o.y) * c,
        value: e,
        ts: o.ts + (r.ts - o.ts) * c
      };
      i.push({
        start: o,
        end: h,
        low: s
      }), i.push({
        start: h,
        end: r,
        low: a
      });
    }
    return i;
  }
  toTrendCoordinates(t, e) {
    var b, v;
    const n = Date.now() - ht, o = 0, r = 100, s = t.map((x) => x.value), a = (e == null ? void 0 : e.min) ?? Math.min(...s), l = (e == null ? void 0 : e.max) ?? Math.max(...s);
    if (!Number.isFinite(a) || !Number.isFinite(l))
      return [];
    const c = 20, h = 80, d = Math.max(l - a, U), p = t.map((x) => {
      const E = Math.max(0, Math.min(100, (x.ts - n) / ht * 100)), w = o + E / 100 * (r - o), S = d <= U ? 0.5 : (x.value - a) / d, $ = h - S * (h - c);
      return { x: w, y: $, value: x.value, ts: x.ts };
    }), _ = ((b = p[0]) == null ? void 0 : b.x) ?? o, m = ((v = p[p.length - 1]) == null ? void 0 : v.x) ?? r, g = Math.max(0, m - _), y = 18;
    if (p.length >= 2 && g < y) {
      const x = r - y, E = Math.max(o, Math.min(x, m - y));
      if (g <= U) {
        const S = y / (p.length - 1);
        return p.map(($, T) => ({
          ...$,
          x: Math.max(o, Math.min(r, E + S * T))
        }));
      }
      const w = y / g;
      return p.map((S) => ({
        ...S,
        x: Math.max(o, Math.min(r, E + (S.x - _) * w))
      }));
    }
    return p;
  }
  toCanvasPoints(t, e, i) {
    return qn(t, e, i);
  }
  /** Battery trend graphs are always excluded from the shared-scale
   *  calculation: their natural unit is often `%` (SOC) which doesn't
   *  share an axis with the kW/W power graphs, and even when a battery
   *  graph plots power it represents a fundamentally different quantity
   *  (storage flow vs. consumption/generation). Each battery keeps its
   *  own independent y-range. */
  isSharedScaleParticipant(t) {
    return t !== "battery" && t !== "battery_secondary";
  }
  computeTrendValueRange(t, e) {
    const i = [];
    if (Object.entries(t).forEach(([r, s]) => {
      if (!this.isSharedScaleParticipant(r))
        return;
      const a = (e == null ? void 0 : e[r]) ?? 1;
      s.forEach((l) => i.push(l.value * a));
    }), i.length === 0)
      return null;
    const n = Math.min(...i), o = Math.max(...i);
    return !Number.isFinite(n) || !Number.isFinite(o) ? null : { min: n, max: o };
  }
  resolveSharedTrendUnitFactors(t) {
    const e = Object.keys(t).filter(
      (o) => this.isSharedScaleParticipant(o)
    );
    if (e.length === 0)
      return null;
    let i = null;
    const n = {};
    for (const o of e) {
      const r = this._trendDrawConfig[o];
      if (!r)
        return null;
      const s = te(r.unit);
      if (!s)
        return null;
      if (i === null)
        i = s.family;
      else if (i !== s.family)
        return null;
      n[o] = s.factor;
    }
    return n;
  }
  scaleTrendSeries(t, e) {
    return !Number.isFinite(e) || e === 1 ? t : t.map((i) => ({
      ts: i.ts,
      value: i.value * e
    }));
  }
  updateSubBlockVisibility() {
    const t = this.renderRoot.querySelector(".energy-grid");
    if (!t) {
      this._showSubBlocks && (this._showSubBlocks = !1), this._compactSubBlocks && (this._compactSubBlocks = !1);
      return;
    }
    const e = t.getBoundingClientRect(), i = e.width <= Gc || e.height <= Yc;
    i !== this._compactSubBlocks && (this._compactSubBlocks = i), this._showSubBlocks || (this._showSubBlocks = !0);
  }
  scheduleSubNodeConnectorDraw() {
    this._subNodeConnectorRaf === void 0 && (this._subNodeConnectorRaf = window.requestAnimationFrame(() => {
      this._subNodeConnectorRaf = void 0, this.drawSubNodeConnectors();
    }));
  }
  drawSubNodeConnectors() {
    if (!this._showSubBlocks) {
      this._subNodeConnectorSegments.length > 0 && (this._subNodeConnectorSegments = []);
      return;
    }
    const t = this.renderRoot.querySelector(".energy-grid"), e = this.renderRoot.querySelector(".energy-value.home"), i = this.renderRoot.querySelector(".energy-value.solar"), n = this.renderRoot.querySelector(".energy-value.grid"), o = this.renderRoot.querySelector(".energy-value.grid-secondary");
    if (!t) {
      this._subNodeConnectorSegments.length > 0 && (this._subNodeConnectorSegments = []);
      return;
    }
    const r = t.getBoundingClientRect(), s = e == null ? void 0 : e.getBoundingClientRect(), a = i == null ? void 0 : i.getBoundingClientRect(), l = n == null ? void 0 : n.getBoundingClientRect(), c = o == null ? void 0 : o.getBoundingClientRect(), h = s ? s.left + s.width / 2 : 0, d = a ? a.top + a.height / 2 : 0, p = l ? l.left + l.width / 2 : 0, _ = c ? c.left + c.width / 2 : 0, m = (w) => w - r.left, g = (w) => w - r.top, y = (w) => Math.round(w * 10) / 10, b = [], v = (w, S, $, T) => {
      const A = Math.min(w, S), P = Math.abs(S - w);
      P <= 0.5 || b.push({
        node: T,
        left: y(A),
        top: y($ - 1),
        width: y(P),
        height: 2
      });
    }, x = (w, S, $, T) => {
      const A = Math.min(w, S), P = Math.abs(S - w);
      P <= 0.5 || b.push({
        node: T,
        left: y($ - 1),
        top: y(A),
        width: 2,
        height: y(P)
      });
    };
    s && this.renderRoot.querySelectorAll(".energy-sub-value.home-sub").forEach((w) => {
      const S = w.getBoundingClientRect(), $ = S.top + S.height / 2, T = S.left + S.width / 2 < h ? S.right : S.left, A = $, P = $ < s.top ? s.top : $ > s.bottom ? s.bottom : $, D = m(h), O = g(A), H = g(P), Q = m(T);
      v(Q, D, O, "home"), x(O, H, D, "home");
    }), a && this.renderRoot.querySelectorAll(".energy-sub-value.solar-sub").forEach((w) => {
      const S = w.getBoundingClientRect(), $ = S.left + S.width / 2, T = S.top + S.height / 2 < d ? S.bottom : S.top, A = $, P = $ < a.left ? a.left : $ > a.right ? a.right : $, D = g(d), O = m(A), H = m(P), Q = g(T);
      x(Q, D, O, "solar"), v(O, H, D, "solar");
    }), l && this.renderRoot.querySelectorAll(".energy-sub-value.grid-sub").forEach((w) => {
      const S = w.getBoundingClientRect(), $ = S.top + S.height / 2, T = S.left + S.width / 2 < p ? S.right : S.left, A = $, P = $ < l.top ? l.top : $ > l.bottom ? l.bottom : $, D = m(p), O = g(A), H = g(P), Q = m(T);
      v(Q, D, O, "grid"), x(O, H, D, "grid");
    }), c && this.renderRoot.querySelectorAll(".energy-sub-value.grid_secondary-sub").forEach((w) => {
      const S = w.getBoundingClientRect(), $ = S.top + S.height / 2, T = S.left + S.width / 2 < _ ? S.right : S.left, A = $, P = $ < c.top ? c.top : $ > c.bottom ? c.bottom : $, D = m(_), O = g(A), H = g(P), Q = m(T);
      v(Q, D, O, "grid_secondary"), x(O, H, D, "grid_secondary");
    }), b.length === this._subNodeConnectorSegments.length && b.every(
      (w, S) => {
        var $, T, A, P, D;
        return w.node === (($ = this._subNodeConnectorSegments[S]) == null ? void 0 : $.node) && w.left === ((T = this._subNodeConnectorSegments[S]) == null ? void 0 : T.left) && w.top === ((A = this._subNodeConnectorSegments[S]) == null ? void 0 : A.top) && w.width === ((P = this._subNodeConnectorSegments[S]) == null ? void 0 : P.width) && w.height === ((D = this._subNodeConnectorSegments[S]) == null ? void 0 : D.height);
      }
    ) || (this._subNodeConnectorSegments = b);
  }
  syncTrendResizeObserver() {
    if (typeof ResizeObserver > "u")
      return;
    this._trendResizeObserver || (this._trendResizeObserver = new ResizeObserver(() => {
      this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw();
    })), this._trendResizeObserver.disconnect();
    const t = this.renderRoot.querySelector(".energy-grid");
    t && this._trendResizeObserver.observe(t), this.renderRoot.querySelectorAll(".energy-value").forEach((e) => {
      var i;
      (i = this._trendResizeObserver) == null || i.observe(e);
    });
  }
  scheduleTrendCanvasDraw() {
    this._trendCanvasRaf === void 0 && (this._trendCanvasRaf = window.requestAnimationFrame(() => {
      this._trendCanvasRaf = void 0, this.drawTrendCanvases();
    }));
  }
  drawTrendCanvases() {
    var d;
    const t = this.perfNow(), e = this.collectTrendCanvases(".node-trend-canvas-area"), i = this.collectTrendCanvases(".node-trend-canvas-line"), n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
    e.forEach((p, _) => {
      const m = this.prepareTrendCanvas(p);
      m && n.set(_, m);
    }), i.forEach((p, _) => {
      const m = this.prepareTrendCanvas(p);
      m && o.set(_, m);
    });
    const r = {};
    Object.keys(this._trendDrawConfig).forEach((p) => {
      const _ = this._trendDrawConfig[p];
      if (!_)
        return;
      const m = this.trendPoints(p, _.currentValue);
      m.length >= 2 && (r[p] = m);
    });
    const s = ((d = this._config) == null ? void 0 : d.shared_trend_scale) === !0, a = s ? this.resolveSharedTrendUnitFactors(r) : null, l = s ? this.computeTrendValueRange(r, a ?? void 0) : null;
    let c = 0, h = 0;
    Object.keys(this._trendDrawConfig).forEach((p) => {
      const _ = this._trendDrawConfig[p];
      if (!_)
        return;
      const m = n.get(p), g = o.get(p);
      if (!m || !g)
        return;
      const y = r[p];
      if (!y || y.length < 2)
        return;
      const b = s && a !== null && this.isSharedScaleParticipant(p), v = b ? (a == null ? void 0 : a[p]) ?? 1 : 1, x = b ? this.scaleTrendSeries(y, v) : y, E = b ? l : null, w = this.toTrendCoordinates(x, E);
      if (w.length < 2)
        return;
      const S = this.toCanvasPoints(w, m.width, m.height), $ = this.toCanvasPoints(w, g.width, g.height);
      this.drawTrendArea(
        m.ctx,
        S,
        _.color,
        m.height,
        _.threshold,
        _.thresholdColor
      ), this.drawTrendLine(g.ctx, $, _.color, _.threshold, _.thresholdColor), c += 1, h += $.length;
    }), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - t),
      series: c,
      points: h,
      shared_scale: s,
      shared_scale_units: a ? "canonical" : "raw"
    });
  }
  collectTrendCanvases(t) {
    const e = /* @__PURE__ */ new Map();
    return this.renderRoot.querySelectorAll(t).forEach((i) => {
      const n = i.dataset.node;
      !n || n !== "solar" && n !== "grid" && n !== "grid_secondary" && n !== "home" && n !== "battery" && n !== "battery_secondary" || e.set(n, i);
    }), e;
  }
  prepareTrendCanvas(t) {
    return ft(t);
  }
  drawTrendArea(t, e, i, n, o, r) {
    if (e.length < 2)
      return;
    const s = this.resolveCanvasColor(i);
    if (o === null) {
      this.fillTrendAreaRun(t, e, s, n);
      return;
    }
    const a = this.resolveCanvasColor(r), l = this.buildThresholdTrendSegments(e, o);
    this.buildAreaRunsFromSegments(l).forEach((h) => {
      this.fillTrendAreaRun(t, h.points, h.low ? a : s, n);
    });
  }
  buildAreaRunsFromSegments(t) {
    const e = [];
    for (const i of t) {
      if (e.length === 0) {
        e.push({
          low: i.low,
          points: [i.start, i.end]
        });
        continue;
      }
      const n = e[e.length - 1], o = n.points[n.points.length - 1], r = Math.abs(o.x - i.start.x) <= 0.01 && Math.abs(o.y - i.start.y) <= 0.01;
      n.low === i.low && r ? n.points.push(i.end) : e.push({
        low: i.low,
        points: [i.start, i.end]
      });
    }
    return e;
  }
  fillTrendAreaRun(t, e, i, n) {
    if (e.length < 2)
      return;
    const o = e[0], r = e[e.length - 1], s = Math.min(...e.map((l) => l.y)), a = t.createLinearGradient(0, s, 0, n);
    a.addColorStop(0, this.withAlpha(i, 0.24)), a.addColorStop(1, this.withAlpha(i, 0)), t.beginPath(), t.moveTo(o.x, o.y), e.slice(1).forEach((l) => t.lineTo(l.x, l.y)), t.lineTo(r.x, n), t.lineTo(o.x, n), t.closePath(), t.fillStyle = a, t.fill();
  }
  drawTrendLine(t, e, i, n, o) {
    if (e.length < 2)
      return;
    const r = this.resolveCanvasColor(i), s = this.resolveCanvasColor(o);
    if (n === null) {
      this.strokeTrendPolyline(t, e, r, 1.5);
      return;
    }
    this.buildThresholdTrendSegments(e, n).forEach((l) => {
      this.strokeTrendSegment(t, l.start, l.end, l.low ? s : r, 1.5);
    });
  }
  strokeTrendPolyline(t, e, i, n) {
    e.length < 2 || (t.beginPath(), t.moveTo(e[0].x, e[0].y), e.slice(1).forEach((o) => t.lineTo(o.x, o.y)), t.strokeStyle = i, t.lineWidth = n, t.lineCap = "round", t.lineJoin = "round", t.stroke());
  }
  strokeTrendSegment(t, e, i, n, o) {
    t.beginPath(), t.moveTo(e.x, e.y), t.lineTo(i.x, i.y), t.strokeStyle = n, t.lineWidth = o, t.lineCap = "round", t.lineJoin = "round", t.stroke();
  }
  resolveCanvasColor(t) {
    return Ie(this.renderRoot, t);
  }
  withAlpha(t, e) {
    return yt(t, e, this._canvasColorContextCache);
  }
  connectedCallback() {
    super.connectedCallback(), this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible && this.startLiveRuntime(!0)) : (this.maybeRefreshTrendHistory(!0, !0), this.updateComplete.then(() => {
      this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw();
    }));
  }
  disconnectedCallback() {
    this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.destroyActionHandler(), this.destroyNodeActionHandlers(), super.disconnectedCallback();
  }
  destroyActionHandler() {
    this._actionHandler && (this._actionHandler.destroy(), this._actionHandler = void 0);
  }
  destroyNodeActionHandlers() {
    this._nodeActionHandlers.forEach((t) => t.destroy()), this._nodeActionHandlers.clear();
  }
  setupActionHandler() {
    var o, r;
    const t = this.renderRoot.querySelector("ha-card");
    if (!t || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const i = !!((o = this._config.hold_action) != null && o.action && this._config.hold_action.action !== "none") || this.holdDefaultEnabled(), n = !!((r = this._config.double_tap_action) != null && r.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = ot(
      t,
      {
        onTap: () => this.fireAction("tap"),
        onHold: () => this.fireAction("hold"),
        onDoubleTap: () => this.fireAction("double_tap")
      },
      { hasHold: i, hasDoubleTap: n }
    );
  }
  /**
   * Binds tap/hold/double-tap handlers to every DOM element marked with
   * `data-pp-node-key`. Per-node actions stop event propagation so they
   * never double-fire the card-level action.
   *
   * Default behaviour (mushroom-parity, but per-node):
   *   - tap         → none (configurable via `<key>_tap_action`)
   *   - hold        → open node-detail dialog (configurable)
   *   - double-tap  → none (configurable)
   */
  setupNodeActionHandlers() {
    if (this.destroyNodeActionHandlers(), !this._config || this.isEditorPreview() || this._config.node_actions_enabled === !1) return;
    this.renderRoot.querySelectorAll("[data-pp-node-key]").forEach((e) => {
      var l;
      const i = e.dataset.ppNodeKey;
      if (!i) return;
      const n = this.hasNodeAction(i, "hold"), o = ((l = this.nodeActionConfig(i, "hold")) == null ? void 0 : l.action) === "none", r = n || !o, s = this.hasNodeAction(i, "double_tap"), a = ot(
        e,
        {
          onTap: () => this.fireNodeAction(i, "tap", e),
          onHold: () => this.fireNodeAction(i, "hold", e),
          onDoubleTap: () => this.fireNodeAction(i, "double_tap", e)
        },
        { hasHold: r, hasDoubleTap: s, stopPropagation: !0 }
      );
      this._nodeActionHandlers.set(i, a);
    });
  }
  nodeActionConfig(t, e) {
    const i = this._config;
    if (i)
      return i[`${t}_${e}_action`];
  }
  hasNodeAction(t, e) {
    const i = this.nodeActionConfig(t, e);
    return !!(i && i.action && i.action !== "none");
  }
  fireNodeAction(t, e, i) {
    if (this.isEditorPreview() || !this._config) return;
    let n = this.nodeActionConfig(t, e);
    if (e === "tap" && (!n || !n.action) && (n = { action: Sr }), e === "hold" && (!n || !n.action) && (n = { action: xr }), !n || !n.action || n.action === "none")
      return;
    if (n.action === xr) {
      this.openNodeDetailDialog(t);
      return;
    }
    if (n.action === Sr) {
      this.openNodeZoomOverlay(t, i);
      return;
    }
    const o = {
      ...this._config,
      tap_action: e === "tap" ? n : this._config.tap_action,
      hold_action: e === "hold" ? n : this._config.hold_action,
      double_tap_action: e === "double_tap" ? n : this._config.double_tap_action,
      // Use the node's primary entity for more-info if no explicit entity in actionConfig.
      entity: n.entity ?? this.nodeEntityId(t) ?? this._config.entity
    };
    this.dispatchEvent(
      new CustomEvent("hass-action", {
        detail: { config: o, action: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /** Resolves a node key (e.g. "solar", "home_sub_2") to its primary
   *  entity id by reading the corresponding config field. */
  nodeEntityId(t) {
    const e = this._config;
    if (!e) return;
    const i = e[`${t}_entity`];
    if (typeof i == "string" && i.trim().length > 0) return i.trim();
  }
  openNodeZoomOverlay(t, e) {
    if (!this._config || !this.hass) return;
    const i = e ?? this.renderRoot.querySelector(`[data-pp-node-key="${t}"]`);
    if (!i) return;
    const n = this.renderRoot.querySelector("ha-card"), o = n == null ? void 0 : n.getBoundingClientRect();
    Mc({
      hass: this.hass,
      config: this._config,
      focusedNodeKey: t,
      originRect: i.getBoundingClientRect(),
      cardRect: o
    });
  }
  /** Stub — wired up to the energy-node-dialog module in a separate
   *  phase. Kept here so per-node hold callbacks resolve cleanly. */
  openNodeDetailDialog(t) {
    !this._config || !this.hass || hr({
      hass: this.hass,
      config: this._config,
      focusedNodeKey: t
    });
  }
  openOverviewDialog() {
    !this._config || !this.hass || hr({
      hass: this.hass,
      config: this._config,
      focusedNodeKey: "",
      overview: !0
    });
  }
  updated(t) {
    t.has("_config") && this.setupActionHandler(), this.updateComplete.then(() => this.setupNodeActionHandlers());
    const e = t.get("_config"), i = t.has("_config") && this.shouldRefreshTrendOnConfigChange(e, this._config), n = t.get("hass"), o = t.has("hass") && this.didRelevantEntityStateChange(n);
    (t.has("preview") || t.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (t.has("_config") ? i && this.scheduleConfigRefresh() : t.has("hass") && this._isVisible && o && this.maybeRefreshTrendHistory(), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (t.has("_config") ? i && this.scheduleConfigRefresh(!0) : t.has("hass") && o && this.maybeRefreshTrendHistory(!1, !0), this._trendResizeObserver && this._trendResizeObserver.disconnect());
    const r = t.has("_config") || t.has("_trendSeries") || t.has("_showSubBlocks") || t.has("preview") || t.has("editMode") || o;
    r && this.updateSubBlockVisibility(), (!this.shouldRunLiveRuntime() || this._isVisible) && r && (this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
  }
  maybeRefreshTrendHistory(t = !1, e = !1) {
    if (!this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview())
      return;
    t && (this._lastTrendRefresh = 0);
    const i = Date.now();
    !t && i - this._lastTrendRefresh < yr || (this._lastTrendRefresh = i, this.refreshTrendHistory(t, e));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(Zc) || this.hasEditorLikeAncestor();
  }
  shouldRunLiveRuntime() {
    return !this.isEditorPreview();
  }
  hasEditorLikeAncestor() {
    let t = this;
    for (; t; ) {
      const e = t.tagName.toLowerCase();
      if (e.startsWith("hui-") && (e.includes("preview") || e.includes("editor") || e.includes("picker") || e.includes("dialog")))
        return !0;
      if (t instanceof HTMLElement) {
        const i = t.className;
        if (typeof i == "string") {
          const n = i.toLowerCase();
          if (n.includes("preview") || n.includes("editor") || n.includes("card-picker"))
            return !0;
        }
      }
      t = t.parentElement;
    }
    return !1;
  }
  perfNow() {
    return typeof performance < "u" && typeof performance.now == "function" ? performance.now() : Date.now();
  }
  toPerfMs(t) {
    return Math.round(t * 10) / 10;
  }
  logPerformance(t, e) {
    var i;
    if (((i = this._config) == null ? void 0 : i.debug_performance) === !0) {
      if (e) {
        console.debug("[PowerPilz][Energy]", t, e);
        return;
      }
      console.debug("[PowerPilz][Energy]", t);
    }
  }
  setupVisibilityObserver() {
    if (typeof IntersectionObserver > "u") {
      this._isVisible = !0;
      return;
    }
    this._visibilityObserver || (this._visibilityObserver = new IntersectionObserver((t) => {
      const e = t.some((i) => i.isIntersecting && i.intersectionRatio > 0);
      e !== this._isVisible && (this._isVisible = e, this.shouldRunLiveRuntime() && (e ? (this.startLiveRuntime(!0), this.syncTrendResizeObserver(), this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw()) : this.stopLiveRuntime()));
    }, { threshold: [0, 0.01] }), this._visibilityObserver.observe(this));
  }
  teardownVisibilityObserver() {
    this._visibilityObserver && (this._visibilityObserver.disconnect(), this._visibilityObserver = void 0), this._isVisible = typeof IntersectionObserver > "u";
  }
  scheduleConfigRefresh(t = !1) {
    !this.shouldRunLiveRuntime() && !t || !this._isVisible && !t || t && !this.isEditorPreview() || (this._configRefreshTimer !== void 0 && window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = window.setTimeout(() => {
      this._configRefreshTimer = void 0, this.maybeRefreshTrendHistory(!0, t);
    }, Kc));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(t = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(t), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, yr), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.syncTrendResizeObserver(), this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this.clearConfigRefreshTimer(), this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._subNodeConnectorRaf !== void 0 && (window.cancelAnimationFrame(this._subNodeConnectorRaf), this._subNodeConnectorRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
  }
  async refreshTrendHistory(t = !1, e = !1) {
    var r, s;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !e)
      return;
    const i = this._config, n = ie(i.trend_data_source, "hybrid"), o = this.enabledTrendNodes(i);
    if (o.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const a = this.perfNow(), l = {}, c = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Set(), _ = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set();
      let g = Number.POSITIVE_INFINITY;
      const y = Date.now() - ht;
      for (const S of o) {
        if (S === "home" && i.home_auto_calculate === !0) {
          const D = this.homeComputationDependencies(i);
          if (D.length === 0) {
            l[S] = [];
            continue;
          }
          h.set(S, D), d.set(S, this.resolveAutoHomeUnit(i, i.unit ?? "kW"));
          const O = this._trendSeries[S] ?? [];
          if (t || O.length === 0) {
            p.add(S), D.forEach((ee) => {
              _.add(ee.entityId), m.delete(ee.entityId);
            });
            continue;
          }
          const H = ((r = O[O.length - 1]) == null ? void 0 : r.ts) ?? y, Q = Math.max(y, H - gr);
          g = Math.min(g, Q), D.forEach((ee) => {
            _.has(ee.entityId) || m.add(ee.entityId);
          });
          continue;
        }
        const $ = this.trendEntityId(S, i);
        if (!$)
          continue;
        c.set(S, $);
        const T = this._trendSeries[S] ?? [];
        if (t || T.length === 0 || _.has($)) {
          _.add($), m.delete($);
          continue;
        }
        if (_.has($))
          continue;
        m.add($);
        const A = ((s = T[T.length - 1]) == null ? void 0 : s.ts) ?? y, P = Math.max(y, A - gr);
        g = Math.min(g, P);
      }
      let b = 0;
      const v = _.size > 0 ? await (async () => {
        const S = this.perfNow(), $ = await We(
          this.hass,
          Array.from(_),
          ht,
          { dataSource: n }
        );
        return b = this.perfNow() - S, $;
      })() : {};
      let x = 0;
      const E = m.size > 0 ? await (async () => {
        const S = this.perfNow(), $ = await We(
          this.hass,
          Array.from(m),
          ht,
          {
            startMs: Number.isFinite(g) ? g : y,
            dataSource: n
          }
        );
        return x = this.perfNow() - S, $;
      })() : {};
      c.forEach((S, $) => {
        const T = this._trendSeries[$] ?? [];
        if (_.has(S)) {
          const A = v[S] ?? [];
          l[$] = A.length > 0 ? A : T.filter((P) => P.ts >= y);
          return;
        }
        if (m.has(S)) {
          const A = E[S] ?? [];
          l[$] = ui(T, A, y);
          return;
        }
        l[$] = T.filter((A) => A.ts >= y);
      }), h.forEach((S, $) => {
        const T = this._trendSeries[$] ?? [], A = this.computeAutoHomeTrendFromFetchedDependencies(
          S,
          v,
          E,
          _,
          m,
          y,
          d.get($) ?? i.unit ?? "kW"
        );
        if (p.has($)) {
          l[$] = A.length > 0 ? A : T.filter((P) => P.ts >= y);
          return;
        }
        l[$] = ui(T, A, y);
      });
      const w = this.sameTrendSeriesKeys(l, this._trendSeries) && Object.keys(l).every(
        (S) => this.areTrendSeriesEqual(l[S] ?? [], this._trendSeries[S] ?? [])
      );
      w || (this._trendSeries = l), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - a),
        force_full: t,
        nodes: o.length,
        full_entities: _.size,
        incremental_entities: m.size,
        data_source: n,
        full_fetch_ms: this.toPerfMs(b),
        incremental_fetch_ms: this.toPerfMs(x),
        series_changed: !w
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledTrendNodes(t) {
    const e = [];
    return t.solar_trend && e.push("solar"), t.grid_trend && e.push("grid"), t.grid_secondary_visible && t.grid_secondary_trend && e.push("grid_secondary"), t.home_trend && e.push("home"), t.battery_trend && e.push("battery"), t.battery_secondary_visible && t.battery_secondary_trend && e.push("battery_secondary"), e;
  }
  trendEntityId(t, e) {
    switch (t) {
      case "solar":
        return e.solar_entity;
      case "grid":
        return e.grid_entity;
      case "grid_secondary":
        return e.grid_secondary_entity;
      case "home":
        return e.home_auto_calculate === !0 ? void 0 : e.home_entity;
      case "battery":
        return e.battery_percentage_entity ?? e.battery_entity;
      case "battery_secondary":
        return e.battery_secondary_percentage_entity ?? e.battery_secondary_entity;
      default:
        return;
    }
  }
  relevantEntityIds(t) {
    const e = /* @__PURE__ */ new Set(), i = (o) => {
      const r = this.readConfigString(o);
      r && e.add(r);
    };
    i(t.home_entity), i(t.solar_entity), i(t.grid_entity), i(t.grid_secondary_entity), i(t.battery_entity), i(t.battery_percentage_entity), i(t.battery_secondary_entity), i(t.battery_secondary_percentage_entity), t.solar_sub_enabled && i(t.solar_sub_entity), t.home_sub_enabled && i(t.home_sub_entity);
    const n = (o, r) => {
      for (let s = 1; s <= r; s += 1)
        t[`${o}_sub_${s}_enabled`] === !0 && i(t[`${o}_sub_${s}_entity`]);
    };
    return n("solar", vr), n("home", br), n("grid", en), n("grid_secondary", en), Array.from(e);
  }
  didRelevantEntityStateChange(t) {
    if (!this._config || !this.hass || !t)
      return !0;
    const e = this.relevantEntityIds(this._config);
    return e.length === 0 ? !1 : e.some((i) => t.states[i] !== this.hass.states[i]);
  }
  trendHistorySignature(t) {
    if (!t)
      return "";
    const e = [];
    return e.push(`source:${ie(t.trend_data_source, "hybrid")}`), this.enabledTrendNodes(t).forEach((i) => {
      if (i === "home" && t.home_auto_calculate === !0) {
        const n = this.homeComputationDependencies(t).map((o) => `${o.role}:${o.entityId}`).sort().join(",");
        e.push(`home:auto:${n}`);
        return;
      }
      e.push(`${i}:${this.trendEntityId(i, t) ?? ""}`);
    }), e.sort().join("|");
  }
  shouldRefreshTrendOnConfigChange(t, e) {
    return !t || !e ? !0 : this.trendHistorySignature(t) !== this.trendHistorySignature(e);
  }
  computeAutoHomeTrendFromFetchedDependencies(t, e, i, n, o, r, s) {
    const a = {}, l = {};
    return t.forEach((c) => {
      const h = n.has(c.entityId) ? e[c.entityId] ?? [] : o.has(c.entityId) ? i[c.entityId] ?? [] : [];
      a[c.role] = h.filter((p) => Number.isFinite(p.ts) && Number.isFinite(p.value) && p.ts >= r).sort((p, _) => p.ts - _.ts);
      const d = W(this.hass, c.entityId);
      d && (l[c.role] = d);
    }), this.computeAutoHomeTrendSeries(a, r, l, s);
  }
  computeAutoHomeTrendSeries(t, e, i, n) {
    const o = [];
    if (Object.values(t).forEach((s) => {
      s.forEach((a) => {
        Number.isFinite(a.ts) && a.ts >= e && o.push(a.ts);
      });
    }), o.length === 0)
      return [];
    o.sort((s, a) => s - a);
    const r = [];
    return o.forEach((s) => {
      const a = r[r.length - 1];
      (a === void 0 || Math.abs(a - s) > 0.5) && r.push(s);
    }), r.map((s) => {
      const a = this.computeAutoHomeValueFromNodeValues({
        solar: this.interpolateTrendSeriesValue(t.solar ?? [], s),
        grid: this.interpolateTrendSeriesValue(t.grid ?? [], s),
        grid_secondary: this.interpolateTrendSeriesValue(t.grid_secondary ?? [], s),
        battery: this.interpolateTrendSeriesValue(t.battery ?? [], s),
        battery_secondary: this.interpolateTrendSeriesValue(t.battery_secondary ?? [], s)
      }, i, n);
      return a === null ? null : { ts: s, value: a };
    }).filter((s) => s !== null);
  }
  interpolateTrendSeriesValue(t, e) {
    if (t.length === 0)
      return null;
    if (e <= t[0].ts)
      return t[0].value;
    const i = t[t.length - 1];
    if (e >= i.ts)
      return i.value;
    let n = 0, o = t.length - 1;
    for (; n <= o; ) {
      const h = Math.floor((n + o) / 2), d = t[h];
      if (Math.abs(d.ts - e) <= 0.5)
        return d.value;
      d.ts < e ? n = h + 1 : o = h - 1;
    }
    const r = Math.max(1, Math.min(t.length - 1, n)), s = t[r - 1], a = t[r], l = a.ts - s.ts;
    if (Math.abs(l) <= U)
      return a.value;
    const c = (e - s.ts) / l;
    return s.value + (a.value - s.value) * c;
  }
  sameTrendSeriesKeys(t, e) {
    const i = Object.keys(t).sort(), n = Object.keys(e).sort();
    return i.length === n.length && i.every((o, r) => o === n[r]);
  }
  areTrendSeriesEqual(t, e) {
    if (t.length !== e.length)
      return !1;
    for (let i = 0; i < t.length; i += 1) {
      const n = t[i], o = e[i];
      if (n.ts !== o.ts || Math.abs(n.value - o.value) > 1e-4)
        return !1;
    }
    return !0;
  }
  hasConfiguredAction(t) {
    var n;
    return t.details_navigation_path || [t.tap_action, t.hold_action, t.double_tap_action].some(
      (o) => o && o.action && o.action !== "none"
    ) ? !0 : ((n = t.hold_action) == null ? void 0 : n.action) !== "none";
  }
  holdDefaultEnabled() {
    var e;
    return this._config ? !((e = this._config.hold_action) == null ? void 0 : e.action) : !1;
  }
  fireAction(t) {
    if (this.isEditorPreview() || !this._config)
      return;
    const e = `${t}_action`;
    let i = this._config[e], n = this._config;
    if (!i && t === "tap" && this._config.details_navigation_path && (i = { action: "navigate", navigation_path: this._config.details_navigation_path }, n = { ...this._config, tap_action: i }), t === "hold" && !i && this.holdDefaultEnabled()) {
      this.openOverviewDialog();
      return;
    }
    if (!(!i || !i.action || i.action === "none")) {
      if (i.action === "more-info" && !n.entity) {
        this.dispatchEvent(
          new CustomEvent("hass-notification", {
            detail: { message: "PowerPilz: Set 'Action entity' in the card editor for more-info to work." },
            bubbles: !0,
            composed: !0
          })
        );
        return;
      }
      this.dispatchEvent(
        new CustomEvent("hass-action", {
          detail: { config: n, action: t },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  toUnidirectionalFlow(t) {
    return t === null || t <= U ? "none" : "forward";
  }
  toBidirectionalFlow(t) {
    return t === null || Math.abs(t) <= U ? "none" : t > 0 ? "forward" : "backward";
  }
  reverseFlowDirection(t) {
    return t === "forward" ? "backward" : t === "backward" ? "forward" : "none";
  }
  formatValue(t, e, i) {
    var n, o, r;
    return Lt(t, e, i, {
      enabled: ((n = this._config) == null ? void 0 : n.auto_scale_units) === !0,
      baseDecimals: ((o = this._config) == null ? void 0 : o.decimals_base_unit) ?? i,
      prefixedDecimals: ((r = this._config) == null ? void 0 : r.decimals_prefixed_unit) ?? i
    });
  }
  splitFormattedValueAndUnit(t, e) {
    const i = t.trim(), n = e.trim();
    if (i.length === 0)
      return { value: "--", unit: n };
    if (n.length === 0)
      return { value: i, unit: "" };
    const o = ` ${n}`;
    if (i.endsWith(o))
      return {
        value: i.slice(0, Math.max(0, i.length - o.length)).trim(),
        unit: n
      };
    const r = i.lastIndexOf(" ");
    return r > 0 ? {
      value: i.slice(0, r).trim(),
      unit: i.slice(r + 1).trim()
    } : { value: i, unit: n };
  }
  formatBatteryPercentage(t) {
    return `${Math.round(this.normalizeBatteryThreshold(t))}%`;
  }
  batteryIcon(t, e, i) {
    if (e !== null && e > U)
      return "mdi:battery-charging";
    if (t === null)
      return i ?? "mdi:battery-outline";
    const n = this.normalizeBatteryThreshold(t);
    return n < 5 ? "mdi:battery-outline" : n >= 95 ? "mdi:battery" : `mdi:battery-${Math.max(10, Math.min(90, Math.round(n / 10) * 10))}`;
  }
  normalizeBatteryThreshold(t) {
    return typeof t != "number" || !Number.isFinite(t) ? 20 : Math.max(0, Math.min(100, t));
  }
  resolveBatteryPercentage(t, e, i) {
    return t !== null ? t : this.isPercentageUnit(i) ? e : null;
  }
  isPercentageUnit(t) {
    return t ? t.trim() === "%" : !1;
  }
  normalizeBatteryDualAlignment(t) {
    return t === "left" || t === "right" ? t : "center";
  }
  iconColorStyle(t) {
    const e = this.resolveColor(t, "");
    return e ? { color: e } : {};
  }
  iconShapeStyle(t) {
    const e = this.toRgbCss(t);
    if (e)
      return {
        "--icon-color": `rgb(${e})`,
        "--shape-color": `color-mix(in srgb, rgb(${e}) 14%, var(--ha-card-background, var(--card-background-color, white)))`
      };
    if (typeof t == "string" && t.trim().length > 0) {
      const i = t.trim(), n = i.toLowerCase();
      return n === "none" || n === "default" ? {} : {
        "--icon-color": i,
        "--shape-color": `color-mix(in srgb, ${i} 14%, var(--ha-card-background, var(--card-background-color, white)))`
      };
    }
    return {};
  }
  resolveColor(t, e = "") {
    return be(t, e);
  }
  toRgbCss(t) {
    return pe(t);
  }
};
me.styles = Z`
    :host {
      display: block;
      container-type: inline-size;
      height: 100%;
      box-sizing: border-box;
      --spacing: var(--mush-spacing, 10px);
      --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
      --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
      --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
      --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
      --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
      --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
      --card-primary-letter-spacing: var(--mush-card-primary-letter-spacing, 0.1px);
      --card-secondary-letter-spacing: var(--mush-card-secondary-letter-spacing, 0.4px);
      --control-border-radius: var(--mush-control-border-radius, 12px);
      --icon-size: var(--mush-icon-size, 36px);
      --icon-border-radius: var(--mush-icon-border-radius, 50%);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
      --main-node-margin: 12px;
      --flow-line-size: 3px;
      --shape-color: color-mix(
        in srgb,
        var(--icon-color) 14%,
        var(--ha-card-background, var(--card-background-color, white))
      );
      --shape-color-soft: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
      --flow-color-rgb: var(--rgb-primary-text-color, 33, 33, 33);
      --flow-track-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.12);
    }

    ha-card {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: var(--mush-layout-align, center);
      height: 100%;
      background: var(--ha-card-background, var(--card-background-color, white));
      overflow: hidden;
    }

    ha-card.interactive {
      cursor: pointer;
    }

    ha-card.interactive:focus-visible {
      outline: 2px solid rgba(var(--flow-color-rgb), 0.45);
      outline-offset: 2px;
    }

    .energy-flow-container {
      height: 100%;
      min-height: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--spacing);
      box-sizing: border-box;
    }

    .energy-grid {
      position: relative;
      display: grid;
      grid-template-columns: repeat(var(--grid-columns, 6), minmax(0, 1fr));
      grid-template-rows: repeat(var(--grid-rows, 6), minmax(0, 1fr));
      gap: 4px;
      width: 100%;
      height: 100%;
      min-height: 0;
      border-radius: var(--control-border-radius);
      padding: 0;
      background: transparent;
      box-sizing: border-box;
      margin: 0 auto;
    }

    .energy-value {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      justify-self: stretch;
      align-self: stretch;
      margin: var(--main-node-margin);
      min-height: 0;
      min-width: 0;
      border-radius: calc(var(--control-border-radius) - 1px);
      padding: 8px 10px;
      background: var(--ha-card-background, var(--card-background-color, white));
      border: 1px solid rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.1);
      box-shadow: none;
      z-index: 2;
      box-sizing: border-box;
      overflow: hidden;
    }

    .node-trend {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 1;
    }

    .node-trend-line {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 0.96;
    }

    .node-trend-canvas-area,
    .node-trend-canvas-line {
      width: 100%;
      height: 100%;
      display: block;
    }

    .energy-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-width: 0;
    }

    .energy-value.solar {
      grid-column: 3 / span 2;
      grid-row: 1 / span 2;
    }

    .energy-value.grid {
      grid-column: 1 / span 2;
      grid-row: 3 / span 2;
    }

    .energy-value.home {
      grid-column: 5 / span 2;
      grid-row: 3 / span 2;
    }

    .energy-value.battery {
      grid-column: 3 / span 2;
      grid-row: 5 / span 2;
    }

    .energy-value.missing .energy-number {
      color: var(--disabled-text-color);
    }

    .subnode-connectors {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .subnode-connector-segment {
      position: absolute;
      background: color-mix(
        in srgb,
        var(--primary-text-color) 34%,
        var(--ha-card-background, var(--card-background-color, white))
      );
      border-radius: 999px;
    }

    .energy-sub-value {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      justify-self: center;
      align-self: center;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      min-width: 0;
      border-radius: calc(var(--control-border-radius) - 4px);
      padding: 3px 4px;
      background: var(--ha-card-background, var(--card-background-color, white));
      border: 1px solid rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.1);
      box-sizing: border-box;
      overflow: hidden;
      z-index: 2;
    }

    .energy-sub-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1px;
      min-width: 0;
      text-align: center;
      width: 100%;
      height: 100%;
    }

    .energy-sub-icon {
      --mdc-icon-size: calc(var(--icon-size) * 0.48);
      margin-bottom: 0;
      color: var(--icon-color);
      flex: 0 0 auto;
    }

    .energy-sub-number {
      font-size: calc(var(--card-secondary-font-size) - 1px);
      line-height: calc(var(--card-secondary-line-height) - 5px);
      font-weight: var(--card-primary-font-weight);
      color: var(--primary-text-color);
      letter-spacing: var(--card-primary-letter-spacing);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
      width: 100%;
    }

    .energy-sub-label {
      margin-top: 0;
      font-size: calc(var(--card-secondary-font-size) - 2px);
      line-height: calc(var(--card-secondary-line-height) - 6px);
      color: var(--secondary-text-color);
      font-weight: var(--card-secondary-font-weight);
      letter-spacing: var(--card-secondary-letter-spacing);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
      width: 100%;
    }

    .energy-sub-value.compact .energy-sub-icon,
    .energy-sub-value.compact .energy-sub-label {
      display: none;
    }

    .energy-sub-unit {
      display: none;
      margin-top: 0;
      font-size: calc(var(--card-secondary-font-size) - 2px);
      line-height: calc(var(--card-secondary-line-height) - 6px);
      color: var(--secondary-text-color);
      font-weight: var(--card-secondary-font-weight);
      letter-spacing: var(--card-secondary-letter-spacing);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
      width: 100%;
    }

    .energy-sub-value.compact .energy-sub-unit {
      display: block;
    }

    .energy-sub-value.missing .energy-sub-number {
      color: var(--disabled-text-color);
    }

    .energy-icon {
      --mdc-icon-size: calc(var(--icon-size) * 0.667);
      margin-bottom: 4px;
      color: var(--icon-color);
      flex: 0 0 auto;
    }

    .battery-top-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-bottom: 2px;
    }

    .battery-top-row .energy-icon {
      margin-bottom: 0;
    }

    .battery-percentage {
      font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height);
      color: var(--secondary-text-color);
      font-weight: var(--card-primary-font-weight);
      letter-spacing: var(--card-secondary-letter-spacing);
    }

    .battery-percentage.alert {
      color: var(--error-color, rgb(var(--rgb-red, 244, 67, 54)));
    }

    .energy-number {
      font-size: var(--card-primary-font-size);
      line-height: var(--card-primary-line-height);
      font-weight: var(--card-primary-font-weight);
      color: var(--primary-text-color);
      letter-spacing: var(--card-primary-letter-spacing);
      white-space: nowrap;
    }

    .energy-label {
      margin-top: 2px;
      font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height);
      color: var(--secondary-text-color);
      font-weight: var(--card-secondary-font-weight);
      letter-spacing: var(--card-secondary-letter-spacing);
    }

    .home-core {
      grid-column: 3 / span 2;
      grid-row: 3 / span 2;
      display: flex;
      align-items: center;
      justify-content: center;
      justify-self: center;
      align-self: center;
      z-index: 3;
    }

    .home-core-icon {
      position: relative;
      width: var(--icon-size);
      height: var(--icon-size);
      font-size: var(--icon-size);
      border-radius: var(--icon-border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--shape-color);
      transition-property: background-color, box-shadow;
      transition-duration: 280ms;
      transition-timing-function: ease-out;
      box-shadow: 0 0 0 1px transparent;
    }

    .home-core-icon ha-icon {
      --mdc-icon-size: var(--icon-symbol-size);
      color: var(--icon-color);
      display: flex;
      line-height: 0;
      transition: color 280ms ease-in-out;
    }

    .flow-line {
      position: absolute;
      border-radius: 999px;
      background: var(--flow-track-color);
      overflow: hidden;
      z-index: 1;
    }

    .flow-line::after {
      content: "";
      position: absolute;
      inset: 0;
      opacity: 0;
    }

    .flow-line.horizontal {
      height: var(--flow-line-size);
      top: calc(50% - (var(--flow-line-size) / 2));
    }

    .flow-line.vertical {
      width: var(--flow-line-size);
      left: calc(50% - (var(--flow-line-size) / 2));
    }

    .flow-line.left {
      left: 17%;
      right: 50%;
    }

    .flow-line.right {
      left: 50%;
      right: 17%;
    }

    .flow-line.top {
      top: 17%;
      bottom: 50%;
    }

    .flow-line.bottom {
      top: 50%;
      bottom: 17%;
    }

    .flow-line.active::after {
      opacity: 0.95;
    }

    .flow-line.horizontal.active.forward::after {
      background: linear-gradient(90deg, transparent 0%, rgba(var(--flow-color-rgb), 0.98) 50%, transparent 100%);
      animation: flow-horizontal-forward 1.8s linear infinite;
    }

    .flow-line.horizontal.active.backward::after {
      background: linear-gradient(270deg, transparent 0%, rgba(var(--flow-color-rgb), 0.98) 50%, transparent 100%);
      animation: flow-horizontal-backward 1.8s linear infinite;
    }

    .flow-line.vertical.active.forward::after {
      background: linear-gradient(180deg, transparent 0%, rgba(var(--flow-color-rgb), 0.98) 50%, transparent 100%);
      animation: flow-vertical-forward 1.8s linear infinite;
    }

    .flow-line.vertical.active.backward::after {
      background: linear-gradient(0deg, transparent 0%, rgba(var(--flow-color-rgb), 0.98) 50%, transparent 100%);
      animation: flow-vertical-backward 1.8s linear infinite;
    }

    @keyframes flow-horizontal-forward {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    @keyframes flow-horizontal-backward {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }

    @keyframes flow-vertical-forward {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(100%);
      }
    }

    @keyframes flow-vertical-backward {
      0% {
        transform: translateY(100%);
      }
      100% {
        transform: translateY(-100%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .flow-line.active::after {
        animation: none !important;
        opacity: 0.6;
      }
    }

    @container (max-width: 350px) {
      .energy-grid {
        gap: 3px;
        padding: 0;
        --main-node-margin: 8px;
      }

      .energy-value {
        padding: 6px 8px;
      }

    }

    @container (max-width: 300px) {
      .energy-grid {
        --main-node-margin: 4px;
      }
    }

    @container (max-width: 275px) {
      .energy-grid {
        gap: 2px;
        padding: 0;
        --main-node-margin: 0px;
      }

      .energy-value {
        padding: 4px 6px;
      }

      .energy-sub-value {
      }

      .energy-sub-icon {
        --mdc-icon-size: calc(var(--icon-size) * 0.42);
      }

      .energy-sub-number {
        font-size: calc(var(--card-secondary-font-size) - 2px);
        line-height: calc(var(--card-secondary-line-height) - 6px);
      }

      .energy-sub-label {
        font-size: calc(var(--card-secondary-font-size) - 3px);
        line-height: calc(var(--card-secondary-line-height) - 7px);
      }

      .energy-sub-unit {
        font-size: calc(var(--card-secondary-font-size) - 3px);
        line-height: calc(var(--card-secondary-line-height) - 7px);
      }

      .energy-icon {
        --mdc-icon-size: calc(var(--icon-size) * 0.52);
        margin-bottom: 2px;
      }

      .battery-top-row {
        gap: 4px;
        margin-bottom: 1px;
      }

      .battery-percentage {
        font-size: calc(var(--card-secondary-font-size) - 1px);
        line-height: calc(var(--card-secondary-line-height) - 1px);
      }

      .energy-number {
        font-size: calc(var(--card-primary-font-size) - 2px);
        line-height: calc(var(--card-primary-line-height) - 3px);
      }

      .energy-label {
        margin-top: 1px;
        font-size: calc(var(--card-secondary-font-size) - 1px);
        line-height: calc(var(--card-secondary-line-height) - 2px);
      }

    }
  `;
Re([
  I({ attribute: !1 })
], me.prototype, "hass", 2);
Re([
  I({ type: Boolean })
], me.prototype, "preview", 2);
Re([
  I({ type: Boolean })
], me.prototype, "editMode", 2);
Re([
  C()
], me.prototype, "_config", 2);
Re([
  C()
], me.prototype, "_trendSeries", 2);
Re([
  C()
], me.prototype, "_showSubBlocks", 2);
Re([
  C()
], me.prototype, "_compactSubBlocks", 2);
Re([
  C()
], me.prototype, "_subNodeConnectorSegments", 2);
me = Re([
  ce("power-pilz-energy-card")
], me);
const we = (t) => {
  if (typeof t != "string")
    return;
  const e = t.trim();
  return e.length > 0 ? e : void 0;
}, Ds = (t, e) => {
  switch (t) {
    case 1:
      return we(e.entity_1);
    case 2:
      return we(e.entity_2);
    case 3:
      return we(e.entity_3);
    case 4:
      return we(e.entity_4);
    default:
      return;
  }
}, Os = (t, e) => {
  switch (t) {
    case 1:
      return we(e.entity_1_name);
    case 2:
      return we(e.entity_2_name);
    case 3:
      return we(e.entity_3_name);
    case 4:
      return we(e.entity_4_name);
    default:
      return;
  }
}, Rs = (t, e) => {
  switch (t) {
    case 1:
      return e.entity_1_enabled !== !1;
    case 2:
      return e.entity_2_enabled === !0;
    case 3:
      return e.entity_3_enabled === !0;
    case 4:
      return e.entity_4_enabled === !0;
    default:
      return !1;
  }
}, Ns = (t, e) => {
  switch (t) {
    case 1:
      return e.entity_1_show_icon !== !1;
    case 2:
      return e.entity_2_show_icon !== !1;
    case 3:
      return e.entity_3_show_icon !== !1;
    case 4:
      return e.entity_4_show_icon !== !1;
    default:
      return !0;
  }
}, Ls = (t, e) => {
  switch (t) {
    case 1:
      return e.entity_1_icon ?? "mdi:chart-line";
    case 2:
      return e.entity_2_icon ?? "mdi:chart-line-variant";
    case 3:
      return e.entity_3_icon ?? "mdi:chart-bell-curve";
    case 4:
      return e.entity_4_icon ?? "mdi:chart-timeline-variant";
    default:
      return "mdi:chart-line";
  }
}, Hs = (t, e) => {
  switch (t) {
    case 1:
      return e.entity_1_icon_color;
    case 2:
      return e.entity_2_icon_color;
    case 3:
      return e.entity_3_icon_color;
    case 4:
      return e.entity_4_icon_color;
    default:
      return;
  }
}, Bs = (t, e) => {
  switch (t) {
    case 1:
      return e.entity_1_trend_color;
    case 2:
      return e.entity_2_trend_color;
    case 3:
      return e.entity_3_trend_color;
    case 4:
      return e.entity_4_trend_color;
    default:
      return;
  }
}, Fs = (t) => t === "column" ? "column" : "row", eo = (t, e = 24) => {
  const i = typeof t == "number" ? t : typeof t == "string" ? Number.parseInt(t, 10) : NaN;
  return i === 6 || i === 12 || i === 24 || i === 48 || i === 72 || i === 168 || i === 336 || i === 720 ? i : e;
}, to = (t) => typeof t != "number" || !Number.isFinite(t) ? 1.5 : Math.max(0.5, Math.min(6, t)), Vs = (t, e, i, n) => {
  var s;
  if (e)
    return e;
  const o = t[i], r = (s = o == null ? void 0 : o.attributes) == null ? void 0 : s.friendly_name;
  return typeof r == "string" && r.trim().length > 0 ? r.trim() : `Entity ${n}`;
}, Us = (t, e, i, n) => {
  if (n)
    return Lt(t, e, i, {
      ...n,
      nullWithUnit: !0
    });
  if (t === null)
    return e ? `-- ${e}` : "--";
  const o = `${t.toFixed(i)} ${e}`.trim();
  return o.length > 0 ? o : "--";
}, qc = 4, Ws = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, $r = "When enabled, hovering over the graph shows the value and timestamp for that point in the legend.", Er = "When enabled, the area below each trend line is filled with a semi-transparent gradient.", kr = "When enabled, all entities share the same Y-axis scale. When disabled, each entity auto-scales independently.", Cr = "When enabled, the graph area is clipped so it does not extend behind the legend labels.", Tr = "Thickness of the trend lines in pixels.", zr = "Controls where trend data is fetched from. Hybrid prefers statistics and falls back to history automatically.", Mr = "The time window shown in the graph.", Ar = "Controls whether entity legend items are displayed in a row or column layout.", Pr = "When enabled, all entity values are normalized as percentages of a reference total, so the graph always fills 0–100%.", Ir = "The entity whose value represents 100%. Defaults to the last enabled entity in the stack.", Dr = "When enabled, the 100% total is auto-calculated by summing all other entities. Useful when you don't have a total meter.", Or = "Default entity used by more-info actions. Required when tap/hold/double-tap is set to 'More info'.", Rr = "Automatically formats values with metric prefixes (e.g. W/kW/MW and Wh/kWh/MWh).", Nr = "Optional unit override. Used when entities have no unit_of_measurement attribute.", Lr = "Default decimal precision for displayed values.", Hr = "Decimal precision for base units (W, Wh) when auto unit scaling is enabled.", Br = "Decimal precision for prefixed units (kW, MW, kWh, MWh) when auto unit scaling is enabled.", Jc = {
  legend_layout: "Layout",
  timeframe_hours: "Range",
  hover_enabled: "Hover",
  fill_area_enabled: "Area fill",
  shared_trend_scale: "Shared scale",
  trend_data_source: "Trend source",
  clip_graph_to_labels: "Clip below labels",
  line_thickness: "Line width",
  unit: "Unit",
  decimals: "Decimals",
  auto_scale_units: "Auto unit scaling",
  decimals_base_unit: "Decimals (base unit)",
  decimals_prefixed_unit: "Decimals (prefixed units)",
  normalize_stack_to_percent: "Normalize to 100%",
  percent_reference_slot: "100% reference entity",
  percent_reference_auto: "Auto-calculate reference",
  entity: "Action entity",
  tap_action: "Tap behavior",
  hold_action: "Hold behavior",
  double_tap_action: "Double tap behavior"
}, Qc = (t) => ({
  type: "expandable",
  name: "",
  title: `Entity ${t}`,
  icon: "mdi:chart-line",
  expanded: t === 1,
  schema: [
    {
      type: "grid",
      name: "",
      schema: [
        { name: `entity_${t}_enabled`, selector: { boolean: {} } }
      ]
    },
    {
      type: "expandable",
      name: "",
      title: "Identity",
      icon: "mdi:view-list-outline",
      expanded: !0,
      schema: [
        {
          type: "grid",
          name: "",
          columns: 2,
          schema: [
            { name: `entity_${t}`, selector: { entity: { filter: { domain: "sensor" } } } },
            { name: `entity_${t}_name`, selector: { text: {} } }
          ]
        }
      ]
    },
    {
      type: "expandable",
      name: "",
      title: "Appearance",
      icon: "mdi:palette-outline",
      expanded: !0,
      schema: [
        {
          type: "grid",
          name: "",
          columns: 2,
          schema: [
            { name: `entity_${t}_show_icon`, selector: { boolean: {} } },
            { name: `entity_${t}_icon`, selector: { icon: {} }, context: { icon_entity: `entity_${t}` } },
            {
              name: `entity_${t}_icon_color`,
              selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
            },
            {
              name: `entity_${t}_trend_color`,
              selector: {
                ui_color: {
                  include_state: !0,
                  include_none: !1,
                  default_color: Ws[t] ?? "purple"
                }
              }
            }
          ]
        }
      ]
    }
  ]
}), js = (t = !1, e = !1) => {
  const i = {
    type: "expandable",
    name: "",
    title: "Graph settings",
    icon: "mdi:chart-line",
    expanded: !1,
    schema: [
      {
        type: "grid",
        name: "",
        columns: 2,
        schema: [
          {
            name: "legend_layout",
            selector: {
              select: {
                mode: "dropdown",
                options: ["row", "column"]
              }
            },
            helper: Ar,
            description: Ar
          },
          {
            name: "timeframe_hours",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { label: "6 hours", value: 6 },
                  { label: "12 hours", value: 12 },
                  { label: "24 hours", value: 24 },
                  { label: "48 hours", value: 48 },
                  { label: "3 days", value: 72 },
                  { label: "7 days", value: 168 },
                  { label: "14 days", value: 336 },
                  { label: "30 days", value: 720 }
                ]
              }
            },
            helper: Mr,
            description: Mr
          }
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "trend_data_source",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { label: "Hybrid (auto fallback)", value: "hybrid" },
                  { label: "Statistics (fastest)", value: "statistics" },
                  { label: "History (raw)", value: "history" }
                ]
              }
            },
            helper: zr,
            description: zr
          }
        ]
      }
    ]
  }, o = {
    type: "expandable",
    name: "",
    title: "Display options",
    icon: "mdi:tune-variant",
    expanded: !1,
    schema: [
      {
        type: "grid",
        name: "",
        columns: 2,
        schema: [
          {
            name: "hover_enabled",
            selector: { boolean: {} },
            helper: $r,
            description: $r
          },
          {
            name: "fill_area_enabled",
            selector: { boolean: {} },
            helper: Er,
            description: Er
          },
          {
            name: "shared_trend_scale",
            selector: { boolean: {} },
            helper: kr,
            description: kr
          },
          {
            name: "clip_graph_to_labels",
            selector: { boolean: {} },
            helper: Cr,
            description: Cr
          }
        ]
      },
      {
        type: "grid",
        name: "",
        columns: 2,
        schema: [
          {
            name: "line_thickness",
            selector: { number: { mode: "box", min: 0.5, max: 6, step: 0.1 } },
            helper: Tr,
            description: Tr
          }
        ]
      }
    ]
  }, r = [];
  if (t) {
    const l = [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "normalize_stack_to_percent",
            selector: { boolean: {} },
            helper: Pr,
            description: Pr
          }
        ]
      }
    ];
    e && l.push(
      {
        type: "grid",
        name: "",
        columns: 2,
        schema: [
          {
            name: "percent_reference_slot",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { label: "Last entity (default)", value: "" },
                  { label: "Entity 1", value: "1" },
                  { label: "Entity 2", value: "2" },
                  { label: "Entity 3", value: "3" },
                  { label: "Entity 4", value: "4" }
                ]
              }
            },
            helper: Ir,
            description: Ir
          },
          {
            name: "percent_reference_auto",
            selector: { boolean: {} },
            helper: Dr,
            description: Dr
          }
        ]
      }
    ), r.push({
      type: "expandable",
      name: "",
      title: "Stacked percent",
      icon: "mdi:percent-outline",
      expanded: !1,
      schema: l
    });
  }
  const s = {
    type: "expandable",
    name: "",
    title: "Actions",
    icon: "mdi:gesture-tap",
    expanded: !1,
    schema: [
      {
        name: "entity",
        selector: { entity: {} },
        helper: Or,
        description: Or
      },
      { name: "tap_action", selector: { ui_action: {} } },
      { name: "hold_action", selector: { ui_action: {} } },
      { name: "double_tap_action", selector: { ui_action: {} } }
    ]
  }, a = {
    type: "expandable",
    name: "",
    title: "Units and format",
    icon: "mdi:format-list-numbered",
    expanded: !1,
    schema: [
      {
        type: "expandable",
        name: "",
        title: "Display format",
        icon: "mdi:decimal",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "unit",
                selector: { text: {} },
                helper: Nr,
                description: Nr
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: Lr,
                description: Lr
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: "Auto scaling",
        icon: "mdi:scale-balance",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "auto_scale_units",
                selector: { boolean: {} },
                helper: Rr,
                description: Rr
              }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "decimals_base_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: Hr,
                description: Hr
              },
              {
                name: "decimals_prefixed_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: Br,
                description: Br
              }
            ]
          }
        ]
      }
    ]
  };
  return [
    i,
    o,
    ...r,
    ...Array.from({ length: qc }, (l, c) => Qc(c + 1)),
    a,
    s
  ];
}, Me = (t) => {
  if (typeof t == "string")
    return t.length > 0 ? t : void 0;
}, Ks = (t) => t === "column" ? "column" : "row", Gs = (t) => eo(t), Ys = (t) => to(t), ti = (t, e, i) => {
  const n = t ?? e;
  return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : Ws[i] ?? "purple";
}, Xs = (t) => ({
  trend_data_source: ie(t.trend_data_source, "hybrid"),
  entity_1: Me(t.entity_1) ?? Me(t.entity),
  entity_1_name: Me(t.entity_1_name),
  entity_1_enabled: t.entity_1_enabled ?? !0,
  entity_1_show_icon: t.entity_1_show_icon ?? !0,
  entity_1_icon: t.entity_1_icon ?? t.icon,
  entity_1_icon_color: t.entity_1_icon_color ?? t.icon_color,
  entity_1_trend_color: ti(t.entity_1_trend_color, t.trend_color, 1),
  entity_2: Me(t.entity_2),
  entity_2_name: Me(t.entity_2_name),
  entity_2_enabled: t.entity_2_enabled ?? !1,
  entity_2_show_icon: t.entity_2_show_icon ?? !0,
  entity_2_icon: t.entity_2_icon,
  entity_2_trend_color: ti(t.entity_2_trend_color, void 0, 2),
  entity_3: Me(t.entity_3),
  entity_3_name: Me(t.entity_3_name),
  entity_3_enabled: t.entity_3_enabled ?? !1,
  entity_3_show_icon: t.entity_3_show_icon ?? !0,
  entity_3_icon: t.entity_3_icon,
  entity_3_trend_color: ti(t.entity_3_trend_color, void 0, 3),
  entity_4: Me(t.entity_4),
  entity_4_name: Me(t.entity_4_name),
  entity_4_enabled: t.entity_4_enabled ?? !1,
  entity_4_show_icon: t.entity_4_show_icon ?? !0,
  entity_4_icon: t.entity_4_icon,
  entity_4_trend_color: ti(t.entity_4_trend_color, void 0, 4)
}), ed = {
  legend_layout: "graph.editor.layout",
  timeframe_hours: "graph.editor.timeframe_hours",
  hover_enabled: "graph.editor.hover_enabled",
  fill_area_enabled: "graph.editor.fill_area_enabled",
  shared_trend_scale: "graph.editor.shared_trend_scale",
  trend_data_source: "graph.editor.trend_data_source",
  clip_graph_to_labels: "graph.editor.clip_graph_to_labels",
  line_thickness: "graph.editor.line_thickness",
  unit: "graph.editor.unit",
  decimals: "graph.editor.decimals",
  auto_scale_units: "graph.editor.auto_scale_units",
  decimals_base_unit: "graph.editor.decimals_base_unit",
  decimals_prefixed_unit: "graph.editor.decimals_prefixed_unit",
  normalize_stack_to_percent: "graph.editor.normalize_stack_to_percent",
  percent_reference_slot: "graph.editor.percent_reference_slot",
  percent_reference_auto: "graph.editor.percent_reference_auto",
  entity: "graph.editor.entity",
  tap_action: "graph.editor.tap_action",
  hold_action: "graph.editor.hold_action",
  double_tap_action: "graph.editor.double_tap_action"
}, Zs = (t, e = {}, i = "en") => {
  const n = t.name ?? "", o = n.match(/^entity_(\d+)_(enabled|name|show_icon|icon|icon_color|trend_color)$/);
  if (o) {
    const [, , a] = o;
    return {
      enabled: i === "de" ? "Aktiviert" : "Enabled",
      name: "Name",
      show_icon: i === "de" ? "Symbol anzeigen" : "Show icon",
      icon: i === "de" ? "Symbol" : "Icon",
      icon_color: i === "de" ? "Symbolfarbe" : "Icon color",
      trend_color: i === "de" ? "Graph-Farbe" : "Graph color"
    }[a] ?? a;
  }
  if (n.match(/^entity_(\d+)$/))
    return "Sensor";
  if (e[n]) return e[n];
  const s = ed[n];
  return s ? u(i, s) : Jc[n] ?? n;
};
var td = Object.defineProperty, id = Object.getOwnPropertyDescriptor, io = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? id(e, i) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = (n ? s(e, i, o) : s(o)) || o);
  return n && o && td(e, i, o), o;
};
const nd = js(!1);
let mi = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => Zs(t, {}, M(this.hass)), this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM")
        return;
      const i = t.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i))
        return;
      const n = {
        ...i,
        type: "custom:power-pilz-graph-card"
      };
      this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: n },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(t) {
    const e = {
      ...t,
      type: "custom:power-pilz-graph-card",
      legend_layout: Ks(t.legend_layout),
      timeframe_hours: Gs(t.timeframe_hours),
      hover_enabled: t.hover_enabled ?? !0,
      fill_area_enabled: t.fill_area_enabled ?? !0,
      shared_trend_scale: t.shared_trend_scale ?? !1,
      debug_performance: t.debug_performance ?? !1,
      decimals: t.decimals ?? 1,
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: t.decimals_base_unit ?? t.decimals ?? 1,
      decimals_prefixed_unit: t.decimals_prefixed_unit ?? t.decimals ?? 1,
      line_thickness: Ys(t.line_thickness),
      clip_graph_to_labels: t.clip_graph_to_labels ?? !1,
      ...Xs(t)
    };
    this._config = e;
  }
  render() {
    return !this.hass || !this._config ? k : f`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Te}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${nd}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
io([
  I({ attribute: !1 })
], mi.prototype, "hass", 2);
io([
  C()
], mi.prototype, "_config", 2);
mi = io([
  ce("power-pilz-graph-card-editor")
], mi);
var od = Object.defineProperty, rd = Object.getOwnPropertyDescriptor, Ke = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? rd(e, i) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = (n ? s(e, i, o) : s(o)) || o);
  return n && o && od(e, i, o), o;
};
const St = 1, Fr = 24, Vr = 300 * 1e3, sd = 60 * 1e3, ad = 350, ii = 0.01, $t = 4, ld = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", cd = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), Ur = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let $e = class extends L {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._graphTopInset = 0, this._drawConfigs = [], this._linePointsBySlot = {}, this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._isVisible = !1, this._liveRuntimeActive = !1, this._canvasColorContextCache = {}, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this.handlePointerMove = (t) => {
      if (this.isEditorPreview()) {
        this.clearHoverState();
        return;
      }
      const e = this.renderRoot.querySelector(".card-trend");
      if (!e || !this._config || this._config.hover_enabled === !1) {
        this.clearHoverState();
        return;
      }
      const i = e.getBoundingClientRect();
      if (i.width <= 1 || i.height <= 1) {
        this.clearHoverState();
        return;
      }
      const n = t.clientX - i.left, o = t.clientY - i.top;
      if (n < 0 || n > i.width || o < 0 || o > i.height) {
        this.clearHoverState();
        return;
      }
      const r = this.findNearestHoverPoint(n, o);
      if (!r) {
        this.clearHoverState();
        return;
      }
      const s = this._hoverState;
      s && s.slot === r.slot && Math.abs(s.x - r.x) <= 0.2 && Math.abs(s.y - r.y) <= 0.2 && Math.abs(s.value - r.value) <= 1e-4 && s.color === r.color || (this._hoverState = r);
    }, this.handlePointerLeave = () => {
      this.clearHoverState();
    }, this.handleCardKeyDown = (t) => {
      t.key !== "Enter" && t.key !== " " || (t.preventDefault(), this.fireAction("tap"));
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-graph-card-editor");
  }
  static async getStubConfig(t) {
    const e = (t == null ? void 0 : t.states) ?? {}, i = Object.keys(e), n = (...c) => c.find((h) => h in e), o = (c) => i.find((h) => h.startsWith(`${c}.`)), r = n("sensor.dev_home_power", "sensor.home_power") ?? o("sensor") ?? "sensor.dev_home_power", s = n("sensor.dev_solar_power", "sensor.solar_power"), a = n("sensor.dev_grid_power", "sensor.grid_power"), l = n("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-card",
      legend_layout: "row",
      timeframe_hours: Fr,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      auto_scale_units: !1,
      entity_1: r,
      entity_1_enabled: !0,
      entity_1_show_icon: !0,
      entity_1_icon: "mdi:chart-line",
      entity_1_trend_color: "purple",
      entity_2: s,
      entity_2_enabled: !1,
      entity_2_show_icon: !0,
      entity_2_icon: "mdi:chart-line-variant",
      entity_2_trend_color: "blue",
      entity_3: a,
      entity_3_enabled: !1,
      entity_3_show_icon: !0,
      entity_3_icon: "mdi:chart-bell-curve",
      entity_3_trend_color: "amber",
      entity_4: l,
      entity_4_enabled: !1,
      entity_4_show_icon: !0,
      entity_4_icon: "mdi:chart-timeline-variant",
      entity_4_trend_color: "green",
      decimals: St,
      decimals_base_unit: St,
      decimals_prefixed_unit: St
    };
  }
  setConfig(t) {
    const e = typeof t.decimals == "number" && Number.isFinite(t.decimals) ? Math.min(3, Math.max(0, Math.round(t.decimals))) : St, i = Se(t.decimals_base_unit, e), n = Se(t.decimals_prefixed_unit, e), o = this.readConfigString(t.entity), r = this.readConfigString(t.icon), s = this.readConfigString(t.entity_1) ?? o ?? "sensor.dev_home_power";
    this._config = {
      ...t,
      type: "custom:power-pilz-graph-card",
      legend_layout: this.normalizeLegendLayout(t.legend_layout),
      timeframe_hours: this.normalizeTimeframeHours(t.timeframe_hours),
      line_thickness: this.normalizeLineThickness(t.line_thickness),
      clip_graph_to_labels: t.clip_graph_to_labels ?? !1,
      hover_enabled: t.hover_enabled ?? !0,
      fill_area_enabled: t.fill_area_enabled ?? !0,
      shared_trend_scale: t.shared_trend_scale ?? !1,
      debug_performance: t.debug_performance ?? !1,
      trend_data_source: ie(t.trend_data_source, "hybrid"),
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: i,
      decimals_prefixed_unit: n,
      entity_1: s,
      entity_1_name: this.readConfigString(t.entity_1_name),
      entity_1_enabled: t.entity_1_enabled ?? !0,
      entity_1_show_icon: t.entity_1_show_icon ?? !0,
      entity_1_icon: t.entity_1_icon ?? r ?? "mdi:chart-line",
      entity_1_icon_color: t.entity_1_icon_color ?? t.icon_color,
      entity_1_trend_color: this.normalizeTrendColor(t.entity_1_trend_color, t.trend_color, 1),
      entity_2: this.readConfigString(t.entity_2),
      entity_2_name: this.readConfigString(t.entity_2_name),
      entity_2_enabled: t.entity_2_enabled ?? !1,
      entity_2_show_icon: t.entity_2_show_icon ?? !0,
      entity_2_icon: t.entity_2_icon ?? "mdi:chart-line-variant",
      entity_2_trend_color: this.normalizeTrendColor(t.entity_2_trend_color, void 0, 2),
      entity_3: this.readConfigString(t.entity_3),
      entity_3_name: this.readConfigString(t.entity_3_name),
      entity_3_enabled: t.entity_3_enabled ?? !1,
      entity_3_show_icon: t.entity_3_show_icon ?? !0,
      entity_3_icon: t.entity_3_icon ?? "mdi:chart-bell-curve",
      entity_3_trend_color: this.normalizeTrendColor(t.entity_3_trend_color, void 0, 3),
      entity_4: this.readConfigString(t.entity_4),
      entity_4_name: this.readConfigString(t.entity_4_name),
      entity_4_enabled: t.entity_4_enabled ?? !1,
      entity_4_show_icon: t.entity_4_show_icon ?? !0,
      entity_4_icon: t.entity_4_icon ?? "mdi:chart-timeline-variant",
      entity_4_trend_color: this.normalizeTrendColor(t.entity_4_trend_color, void 0, 4),
      decimals: e
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      rows: 2,
      min_columns: 3,
      min_rows: 1
    };
  }
  getLayoutOptions() {
    return {
      grid_columns: 2
    };
  }
  render() {
    if (!this._config)
      return f`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return f``;
    const t = this._config, e = t.decimals ?? St, i = this.normalizeLineThickness(t.line_thickness), n = this.collectSeriesEntries(t, e), o = this.normalizeLegendLayout(t.legend_layout), r = t.hover_enabled !== !1, s = this.hasConfiguredAction(t), a = !this.isEditorPreview() && s, l = this._hoverState, c = t.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, h = c > 0 ? { top: `${c}px` } : {}, d = l ? {
      left: `${l.x}px`,
      top: `${l.y + c}px`,
      "--hover-dot-color": l.color
    } : {};
    return this._drawConfigs = n.map((p) => ({
      slot: p.slot,
      currentValue: p.currentValue,
      unit: p.unit,
      color: p.trendColor,
      lineWidth: i
    })), f`
      <ha-card
        class=${a ? "interactive" : ""}
        tabindex=${a ? 0 : -1}
        role=${a ? "button" : "article"}
        @keydown=${this.handleCardKeyDown}
      >
        <div
          class="container"
          @pointermove=${this.handlePointerMove}
          @pointerleave=${this.handlePointerLeave}
          @pointercancel=${this.handlePointerLeave}
        >
          <div class="card-trend" style=${z(h)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${z(h)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${r && l ? f`<div class="hover-dot" aria-hidden="true" style=${z(d)}></div>` : k}

          <div class="content">
            <div class="series-list layout-${o}">
              ${n.length === 0 ? f`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : n.map(
      (p) => this.renderSeriesItem(
        p,
        l && l.slot === p.slot ? l : null
      )
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderSeriesItem(t, e) {
    const i = e === null ? null : this.convertSharedScaleHoverValue(t.slot, e.value), n = e === null ? null : this.formatHoverTimestamp(e.ts), o = i === null ? t.secondary : `${this.formatValue(i, t.unit, t.decimals)} - ${n ?? ""}`;
    return f`
      <div class="state-item" data-slot=${String(t.slot)}>
        ${t.showIcon ? f`
              <div class="icon-wrap">
                <div class="icon-shape" style=${z(t.iconStyle)}>
                  <ha-icon .icon=${t.icon}></ha-icon>
                </div>
              </div>
            ` : k}
        <div class="info">
          <div class="primary">${t.name}</div>
          <div class="secondary">${o}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(t, e) {
    const i = [];
    for (let n = 1; n <= $t; n += 1) {
      const o = n, r = this.slotEnabled(o, t), s = this.slotEntityId(o, t);
      if (!r || !s)
        continue;
      const a = this.entityName(this.slotCustomName(o, t), s, n), l = F(this.hass, s), c = t.unit ?? W(this.hass, s) ?? "", h = this.formatValue(l, c, e), d = this.slotIcon(o, t), p = this.iconStyle(this.slotIconColor(o, t)), _ = this.resolveColor(Ur[o], ld), m = this.resolveColor(this.slotTrendColor(o, t), _);
      i.push({
        slot: o,
        entityId: s,
        name: a,
        secondary: h,
        unit: c,
        decimals: e,
        currentValue: l,
        icon: d,
        showIcon: this.slotShowIcon(o, t),
        iconStyle: p,
        trendColor: m
      });
    }
    return i;
  }
  slotEntityId(t, e) {
    return Ds(t, e);
  }
  slotCustomName(t, e) {
    return Os(t, e);
  }
  slotEnabled(t, e) {
    return Rs(t, e);
  }
  slotShowIcon(t, e) {
    return Ns(t, e);
  }
  slotIcon(t, e) {
    return Ls(t, e);
  }
  slotIconColor(t, e) {
    return Hs(t, e);
  }
  slotTrendColor(t, e) {
    return Bs(t, e);
  }
  entityName(t, e, i) {
    return Vs(this.hass.states, t, e, i);
  }
  formatValue(t, e, i) {
    var n, o, r;
    return Us(t, e, i, {
      enabled: ((n = this._config) == null ? void 0 : n.auto_scale_units) === !0,
      baseDecimals: ((o = this._config) == null ? void 0 : o.decimals_base_unit) ?? i,
      prefixedDecimals: ((r = this._config) == null ? void 0 : r.decimals_prefixed_unit) ?? i
    });
  }
  formatHoverTimestamp(t) {
    const e = new Date(t), i = "de-AT", n = new Intl.DateTimeFormat(i, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    }).format(e);
    if (this.trendWindowMs(this._config) <= 1440 * 60 * 1e3)
      return n;
    const o = new Intl.DateTimeFormat(i, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(e);
    return `${n} ${o}`;
  }
  convertSharedScaleHoverValue(t, e) {
    if (!this._sharedScaleCanonical)
      return e;
    const i = this._sharedScaleFactors[t];
    return typeof i != "number" || !Number.isFinite(i) || i <= 0 ? e : e / i;
  }
  readConfigString(t) {
    return we(t);
  }
  normalizeLegendLayout(t) {
    return Fs(t);
  }
  normalizeTimeframeHours(t) {
    return eo(t, Fr);
  }
  trendWindowMs(t) {
    return this.normalizeTimeframeHours(t == null ? void 0 : t.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(t) {
    return to(t);
  }
  normalizeTrendColor(t, e, i) {
    const n = t ?? e;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : Ur[i];
  }
  iconStyle(t) {
    return xe(t);
  }
  resolveColor(t, e = "") {
    return be(t, e);
  }
  trendPoints(t, e) {
    const i = Date.now(), n = i - this.trendWindowMs(this._config), o = this._trendSeries[t] ?? [];
    let r = 0;
    for (; r < o.length && o[r].ts < n; )
      r += 1;
    const s = r > 0 ? o.slice(r) : [...o];
    return e !== null && Number.isFinite(e) && s.push({ ts: i, value: e }), s;
  }
  toTrendCoordinates(t, e, i) {
    var v, x;
    const o = Date.now() - e, r = 0, s = 100, a = t.map((E) => E.value), l = (i == null ? void 0 : i.min) ?? Math.min(...a), c = (i == null ? void 0 : i.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const h = 20, d = 80, p = Math.max(c - l, ii), _ = t.map((E) => {
      const w = Math.max(0, Math.min(100, (E.ts - o) / e * 100)), S = r + w / 100 * (s - r), $ = p <= ii ? 0.5 : (E.value - l) / p, T = d - $ * (d - h);
      return { x: S, y: T, value: E.value, ts: E.ts };
    }), m = ((v = _[0]) == null ? void 0 : v.x) ?? r, g = ((x = _[_.length - 1]) == null ? void 0 : x.x) ?? s, y = Math.max(0, g - m), b = 18;
    if (_.length >= 2 && y < b) {
      const E = s - b, w = Math.max(r, Math.min(E, g - b));
      if (y <= ii) {
        const $ = b / (_.length - 1);
        return _.map((T, A) => ({
          ...T,
          x: Math.max(r, Math.min(s, w + $ * A))
        }));
      }
      const S = b / y;
      return _.map(($) => ({
        ...$,
        x: Math.max(r, Math.min(s, w + ($.x - m) * S))
      }));
    }
    return _;
  }
  toCanvasPoints(t, e, i) {
    return qn(t, e, i).map((n) => ({
      x: n.x,
      y: n.y,
      value: n.value,
      ts: n.ts
    }));
  }
  computeTrendValueRange(t, e) {
    const i = [];
    if (Object.entries(t).forEach(([r, s]) => {
      const a = Number(r), l = (e == null ? void 0 : e[a]) ?? 1;
      s.forEach((c) => i.push(c.value * l));
    }), i.length === 0)
      return null;
    const n = Math.min(...i), o = Math.max(...i);
    return !Number.isFinite(n) || !Number.isFinite(o) ? null : { min: n, max: o };
  }
  resolveSharedScaleFactors(t) {
    let e = null;
    const i = {};
    Object.keys(t).map((r) => Number(r)).filter((r) => Number.isFinite(r) && r >= 1 && r <= $t).forEach((r) => {
      const s = r, a = this._drawConfigs.find((c) => c.slot === s);
      if (!a)
        return;
      const l = te(a.unit);
      if (!l) {
        e = null, i[s] = NaN;
        return;
      }
      if (e === null)
        e = l.family;
      else if (e !== l.family) {
        e = null, i[s] = NaN;
        return;
      }
      i[s] = l.factor;
    });
    const n = Object.keys(t);
    if (n.length === 0)
      return null;
    const o = Object.values(i).some((r) => !Number.isFinite(r ?? NaN));
    return e === null || o || Object.keys(i).length !== n.length ? null : i;
  }
  scaleTrendSeries(t, e) {
    return !Number.isFinite(e) || e === 1 ? t : t.map((i) => ({
      ts: i.ts,
      value: i.value * e
    }));
  }
  syncTrendResizeObserver() {
    if (typeof ResizeObserver > "u")
      return;
    this._trendResizeObserver || (this._trendResizeObserver = new ResizeObserver(() => {
      this.updateGraphTopInset(), this.scheduleTrendCanvasDraw();
    })), this._trendResizeObserver.disconnect();
    const t = this.renderRoot.querySelector(".container");
    t && this._trendResizeObserver.observe(t);
    const e = this.renderRoot.querySelector(".series-list");
    e && this._trendResizeObserver.observe(e);
  }
  scheduleTrendCanvasDraw() {
    this._trendCanvasRaf === void 0 && (this._trendCanvasRaf = window.requestAnimationFrame(() => {
      this._trendCanvasRaf = void 0, this.drawTrendCanvases();
    }));
  }
  drawTrendCanvases() {
    var g, y;
    const t = this.perfNow();
    if (this._drawConfigs.length === 0) {
      this._linePointsBySlot = {}, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "no-draw-configs" });
      return;
    }
    const e = this.renderRoot.querySelector(".card-trend-canvas-area"), i = this.renderRoot.querySelector(".card-trend-canvas-line");
    if (!e || !i) {
      this._linePointsBySlot = {}, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "missing-canvas" });
      return;
    }
    const n = this.prepareTrendCanvas(e), o = this.prepareTrendCanvas(i);
    if (!n || !o) {
      this._linePointsBySlot = {}, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const r = ((g = this._config) == null ? void 0 : g.fill_area_enabled) !== !1, s = this.trendWindowMs(this._config), a = {};
    this._drawConfigs.forEach((b) => {
      const v = this.trendPoints(b.slot, b.currentValue);
      v.length >= 2 && (a[b.slot] = v);
    });
    const l = ((y = this._config) == null ? void 0 : y.shared_trend_scale) === !0, c = l ? this.resolveSharedScaleFactors(a) : null;
    this._sharedScaleCanonical = c !== null, this._sharedScaleFactors = c ?? {};
    const h = l ? this.computeTrendValueRange(a, c ?? void 0) : null, d = {};
    let p = 0, _ = 0;
    [...this._drawConfigs].sort((b, v) => v.slot - b.slot).forEach((b) => {
      const v = a[b.slot];
      if (!v || v.length < 2)
        return;
      const x = (c == null ? void 0 : c[b.slot]) ?? 1, E = c ? this.scaleTrendSeries(v, x) : v, w = this.toTrendCoordinates(E, s, h);
      if (w.length < 2)
        return;
      const S = this.toCanvasPoints(w, n.width, n.height), $ = this.toCanvasPoints(w, o.width, o.height);
      r && this.drawTrendArea(n.ctx, S, b.color, n.height), this.drawTrendLine(o.ctx, $, b.color, b.lineWidth), d[b.slot] = $, p += 1, _ += $.length;
    }), this._linePointsBySlot = d, this._hoverState && !d[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - t),
      series: p,
      points: _,
      fill_area: r,
      shared_scale: l,
      shared_scale_units: this._sharedScaleCanonical ? "canonical" : "raw"
    });
  }
  prepareTrendCanvas(t) {
    return ft(t);
  }
  drawTrendArea(t, e, i, n) {
    if (e.length < 2)
      return;
    const o = this.resolveCanvasColor(i), r = e[0], s = e[e.length - 1], a = Math.min(...e.map((c) => c.y)), l = t.createLinearGradient(0, a, 0, n);
    l.addColorStop(0, this.withAlpha(o, 0.24)), l.addColorStop(1, this.withAlpha(o, 0)), t.beginPath(), t.moveTo(r.x, r.y), e.slice(1).forEach((c) => t.lineTo(c.x, c.y)), t.lineTo(s.x, n), t.lineTo(r.x, n), t.closePath(), t.fillStyle = l, t.fill();
  }
  drawTrendLine(t, e, i, n) {
    if (e.length < 2)
      return;
    const o = this.resolveCanvasColor(i);
    this.strokeTrendPolyline(t, e, o, n);
  }
  hasConfiguredAction(t) {
    return [t.tap_action, t.hold_action, t.double_tap_action].some(
      (e) => e && e.action && e.action !== "none"
    );
  }
  fireAction(t) {
    if (this.isEditorPreview() || !this._config)
      return;
    const e = `${t}_action`, i = this._config[e];
    if (!(!i || !i.action || i.action === "none")) {
      if (i.action === "more-info" && !this._config.entity) {
        this.dispatchEvent(
          new CustomEvent("hass-notification", {
            detail: { message: "PowerPilz: Set 'Action entity' in the card editor for more-info to work." },
            bubbles: !0,
            composed: !0
          })
        );
        return;
      }
      this.dispatchEvent(
        new CustomEvent("hass-action", {
          detail: { config: this._config, action: t },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  clearHoverState() {
    this._hoverState && (this._hoverState = void 0);
  }
  findNearestHoverPoint(t, e) {
    let i = null, n = Number.POSITIVE_INFINITY;
    for (const o of this._drawConfigs) {
      const r = this._linePointsBySlot[o.slot];
      if (!r || r.length < 2)
        continue;
      const s = this.interpolateCanvasPoint(r, t);
      if (!s)
        continue;
      const a = Math.abs(s.y - e);
      a < n && (n = a, i = {
        slot: o.slot,
        x: s.x,
        y: s.y,
        value: s.value,
        ts: s.ts,
        color: o.color
      });
    }
    return i;
  }
  interpolateCanvasPoint(t, e) {
    if (t.length === 0)
      return null;
    const i = t[0], n = t[t.length - 1];
    if (e <= i.x)
      return { x: e, y: i.y, value: i.value, ts: i.ts };
    if (e >= n.x)
      return { x: e, y: n.y, value: n.value, ts: n.ts };
    for (let o = 1; o < t.length; o += 1) {
      const r = t[o - 1], s = t[o];
      if (e > s.x)
        continue;
      const a = s.x - r.x;
      if (Math.abs(a) <= ii)
        return { x: e, y: s.y, value: s.value, ts: s.ts };
      const l = (e - r.x) / a;
      return {
        x: e,
        y: r.y + (s.y - r.y) * l,
        value: r.value + (s.value - r.value) * l,
        ts: r.ts + (s.ts - r.ts) * l
      };
    }
    return { x: e, y: n.y, value: n.value, ts: n.ts };
  }
  strokeTrendPolyline(t, e, i, n) {
    e.length < 2 || (t.beginPath(), t.moveTo(e[0].x, e[0].y), e.slice(1).forEach((o) => t.lineTo(o.x, o.y)), t.strokeStyle = i, t.lineWidth = n, t.lineCap = "round", t.lineJoin = "round", t.stroke());
  }
  resolveCanvasColor(t) {
    return Ie(this.renderRoot, t);
  }
  withAlpha(t, e) {
    return yt(t, e, this._canvasColorContextCache);
  }
  connectedCallback() {
    super.connectedCallback(), this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible && this.startLiveRuntime(!0)) : (this.maybeRefreshTrendHistory(!0, !0), this.updateComplete.then(() => {
      this.updateGraphTopInset(), this.scheduleTrendCanvasDraw();
    }));
  }
  disconnectedCallback() {
    this.clearHoverState(), this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.destroyActionHandler(), super.disconnectedCallback();
  }
  destroyActionHandler() {
    this._actionHandler && (this._actionHandler.destroy(), this._actionHandler = void 0);
  }
  setupActionHandler() {
    var n, o;
    const t = this.renderRoot.querySelector("ha-card");
    if (!t || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const e = !!((n = this._config.hold_action) != null && n.action && this._config.hold_action.action !== "none"), i = !!((o = this._config.double_tap_action) != null && o.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = ot(
      t,
      {
        onTap: () => this.fireAction("tap"),
        onHold: () => this.fireAction("hold"),
        onDoubleTap: () => this.fireAction("double_tap")
      },
      { hasHold: e, hasDoubleTap: i }
    );
  }
  updated(t) {
    var s;
    t.has("_config") && this.setupActionHandler();
    const e = t.get("_config"), i = t.has("_config") && this.shouldRefreshTrendOnConfigChange(e, this._config), n = t.get("hass"), o = t.has("hass") && this.didTrackedEntityStateChange(n);
    (t.has("preview") || t.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (t.has("_config") ? (i && this.scheduleConfigRefresh(), this.clearHoverState()) : t.has("hass") && this._isVisible && o && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (t.has("_config") ? (i && this.scheduleConfigRefresh(!0), this.clearHoverState()) : t.has("hass") && o && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((s = this._config) == null ? void 0 : s.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset();
    const r = t.has("_config") || t.has("_trendSeries") || t.has("_graphTopInset") || t.has("preview") || t.has("editMode") || o;
    (!this.shouldRunLiveRuntime() || this._isVisible) && r && this.scheduleTrendCanvasDraw();
  }
  updateGraphTopInset() {
    const t = this._config;
    if (!t || t.clip_graph_to_labels !== !0) {
      this._graphTopInset !== 0 && (this._graphTopInset = 0);
      return;
    }
    const e = this.renderRoot.querySelector(".container"), i = this.renderRoot.querySelector(".series-list");
    if (!e || !i) {
      this._graphTopInset !== 0 && (this._graphTopInset = 0);
      return;
    }
    const n = e.getBoundingClientRect(), o = i.getBoundingClientRect(), r = Math.max(0, Math.ceil(o.bottom - n.top));
    Math.abs(r - this._graphTopInset) > 0.5 && (this._graphTopInset = r);
  }
  maybeRefreshTrendHistory(t = !1, e = !1) {
    if (!this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview())
      return;
    t && (this._lastTrendRefresh = 0);
    const i = Date.now();
    !t && i - this._lastTrendRefresh < Vr || (this._lastTrendRefresh = i, this.refreshTrendHistory(t, e));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(cd) || this.hasEditorLikeAncestor();
  }
  shouldRunLiveRuntime() {
    return !this.isEditorPreview();
  }
  hasEditorLikeAncestor() {
    let t = this;
    for (; t; ) {
      const e = t.tagName.toLowerCase();
      if (e.startsWith("hui-") && (e.includes("preview") || e.includes("editor") || e.includes("picker") || e.includes("dialog")))
        return !0;
      if (t instanceof HTMLElement) {
        const i = t.className;
        if (typeof i == "string") {
          const n = i.toLowerCase();
          if (n.includes("preview") || n.includes("editor") || n.includes("card-picker"))
            return !0;
        }
      }
      t = t.parentElement;
    }
    return !1;
  }
  perfNow() {
    return typeof performance < "u" && typeof performance.now == "function" ? performance.now() : Date.now();
  }
  toPerfMs(t) {
    return Math.round(t * 10) / 10;
  }
  logPerformance(t, e) {
    var i;
    if (((i = this._config) == null ? void 0 : i.debug_performance) === !0) {
      if (e) {
        console.debug("[PowerPilz][Graph]", t, e);
        return;
      }
      console.debug("[PowerPilz][Graph]", t);
    }
  }
  setupVisibilityObserver() {
    if (typeof IntersectionObserver > "u") {
      this._isVisible = !0;
      return;
    }
    this._visibilityObserver || (this._visibilityObserver = new IntersectionObserver((t) => {
      const e = t.some((i) => i.isIntersecting && i.intersectionRatio > 0);
      e !== this._isVisible && (this._isVisible = e, this.shouldRunLiveRuntime() && (e ? (this.startLiveRuntime(!0), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw()) : (this.clearHoverState(), this.stopLiveRuntime())));
    }, { threshold: [0, 0.01] }), this._visibilityObserver.observe(this));
  }
  teardownVisibilityObserver() {
    this._visibilityObserver && (this._visibilityObserver.disconnect(), this._visibilityObserver = void 0), this._isVisible = typeof IntersectionObserver > "u";
  }
  scheduleConfigRefresh(t = !1) {
    !this.shouldRunLiveRuntime() && !t || !this._isVisible && !t || t && !this.isEditorPreview() || (this._configRefreshTimer !== void 0 && window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = window.setTimeout(() => {
      this._configRefreshTimer = void 0, this.maybeRefreshTrendHistory(!0, t);
    }, ad));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(t = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(t), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Vr), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.updateGraphTopInset(), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this.clearConfigRefreshTimer(), this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
  }
  async refreshTrendHistory(t = !1, e = !1) {
    var a;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !e)
      return;
    const i = this._config, n = {}, o = this.trendWindowMs(i), r = ie(i.trend_data_source, "hybrid"), s = this.enabledSlots(i);
    if (s.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const l = this.perfNow(), c = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
      let p = Number.POSITIVE_INFINITY;
      const _ = Date.now() - o;
      for (const x of s) {
        const E = this.slotEntityId(x, i);
        if (!E)
          continue;
        c.set(x, E);
        const w = this._trendSeries[x] ?? [];
        if (t || w.length === 0 || h.has(E)) {
          h.add(E), d.delete(E);
          continue;
        }
        if (h.has(E))
          continue;
        d.add(E);
        const S = ((a = w[w.length - 1]) == null ? void 0 : a.ts) ?? _, $ = Math.max(_, S - sd);
        p = Math.min(p, $);
      }
      let m = 0;
      const g = h.size > 0 ? await (async () => {
        const x = this.perfNow(), E = await We(
          this.hass,
          Array.from(h),
          o,
          { dataSource: r }
        );
        return m = this.perfNow() - x, E;
      })() : {};
      let y = 0;
      const b = d.size > 0 ? await (async () => {
        const x = this.perfNow(), E = await We(
          this.hass,
          Array.from(d),
          o,
          {
            startMs: Number.isFinite(p) ? p : _,
            dataSource: r
          }
        );
        return y = this.perfNow() - x, E;
      })() : {};
      c.forEach((x, E) => {
        const w = this._trendSeries[E] ?? [];
        if (h.has(x)) {
          const S = g[x] ?? [];
          n[E] = S.length > 0 ? S : w.filter(($) => $.ts >= _);
          return;
        }
        if (d.has(x)) {
          const S = b[x] ?? [];
          n[E] = ui(w, S, _);
          return;
        }
        n[E] = w.filter((S) => S.ts >= _);
      });
      const v = this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((x) => Number(x)).filter((x) => Number.isFinite(x) && x >= 1 && x <= $t).every((x) => {
        const E = x;
        return this.areTrendSeriesEqual(n[E] ?? [], this._trendSeries[E] ?? []);
      });
      v || (this._trendSeries = n), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - l),
        window_ms: o,
        force_full: t,
        slots: s.length,
        full_entities: h.size,
        incremental_entities: d.size,
        data_source: r,
        full_fetch_ms: this.toPerfMs(m),
        incremental_fetch_ms: this.toPerfMs(y),
        series_changed: !v
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(t) {
    const e = [];
    for (let i = 1; i <= $t; i += 1) {
      const n = i;
      this.slotEnabled(n, t) && this.slotEntityId(n, t) && e.push(n);
    }
    return e;
  }
  trackedEntityIds(t) {
    const e = /* @__PURE__ */ new Set();
    return this.enabledSlots(t).forEach((i) => {
      const n = this.slotEntityId(i, t);
      n && e.add(n);
    }), Array.from(e);
  }
  didTrackedEntityStateChange(t) {
    if (!this._config || !this.hass || !t)
      return !0;
    const e = this.trackedEntityIds(this._config);
    return e.length === 0 ? !1 : e.some((i) => t.states[i] !== this.hass.states[i]);
  }
  shouldRefreshTrendOnConfigChange(t, e) {
    if (!t || !e || this.trendWindowMs(t) !== this.trendWindowMs(e) || ie(t.trend_data_source, "hybrid") !== ie(e.trend_data_source, "hybrid"))
      return !0;
    for (let i = 1; i <= $t; i += 1) {
      const n = i, o = this.slotEnabled(n, t), r = this.slotEnabled(n, e), s = o ? this.slotEntityId(n, t) : void 0, a = r ? this.slotEntityId(n, e) : void 0;
      if (o !== r || s !== a)
        return !0;
    }
    return !1;
  }
  sameTrendSeriesKeys(t, e) {
    const i = Object.keys(t).sort(), n = Object.keys(e).sort();
    return i.length === n.length && i.every((o, r) => o === n[r]);
  }
  areTrendSeriesEqual(t, e) {
    if (t.length !== e.length)
      return !1;
    for (let i = 0; i < t.length; i += 1) {
      const n = t[i], o = e[i];
      if (n.ts !== o.ts || Math.abs(n.value - o.value) > 1e-4)
        return !1;
    }
    return !0;
  }
};
$e.styles = Z`
    :host {
      display: block;
      container-type: inline-size;
      height: 100%;
      box-sizing: border-box;
      --spacing: var(--mush-spacing, 10px);
      --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
      --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
      --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
      --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
      --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
      --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
      --card-primary-letter-spacing: var(--mush-card-primary-letter-spacing, 0.1px);
      --card-secondary-letter-spacing: var(--mush-card-secondary-letter-spacing, 0.4px);
      --icon-size: var(--mush-icon-size, 36px);
      --icon-border-radius: var(--mush-icon-border-radius, 50%);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
      --shape-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      --series-item-min-width: 164px;
      --series-row-gap: 8px;
      --series-column-gap: 10px;
    }

    ha-card {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: var(--mush-layout-align, center);
      height: 100%;
      overflow: hidden;
    }

    .container {
      position: relative;
      height: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .card-trend {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 1;
    }

    .card-trend-line {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 0.96;
    }

    .hover-dot {
      position: absolute;
      left: 0;
      top: 0;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--hover-dot-color, var(--primary-color));
      transform: translate(-50%, -50%);
      z-index: 2;
      pointer-events: none;
    }

    .card-trend-canvas-area,
    .card-trend-canvas-line {
      width: 100%;
      height: 100%;
      display: block;
    }

    .content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      padding: var(--spacing);
      box-sizing: border-box;
    }

    .series-list {
      display: flex;
      width: 100%;
      min-height: 0;
      align-content: flex-start;
      gap: var(--series-row-gap) var(--series-column-gap);
    }

    .series-list.layout-row {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .series-list.layout-column {
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: repeat(2, minmax(0, auto));
      grid-auto-columns: minmax(var(--series-item-min-width), 1fr);
      column-gap: var(--series-column-gap);
      row-gap: var(--series-row-gap);
    }

    .state-item {
      display: flex;
      align-items: center;
      gap: var(--spacing);
      min-width: 0;
      flex: 1 1 var(--series-item-min-width);
    }

    .series-list.layout-column .state-item {
      min-width: var(--series-item-min-width);
      width: 100%;
    }

    .state-item.empty {
      flex: 1 1 100%;
    }

    .icon-wrap {
      position: relative;
      flex: none;
    }

    .icon-shape {
      position: relative;
      width: var(--icon-size);
      height: var(--icon-size);
      font-size: var(--icon-size);
      border-radius: var(--icon-border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--shape-color);
      transition-property: background-color, box-shadow;
      transition-duration: 280ms;
      transition-timing-function: ease-out;
      box-shadow: 0 0 0 1px transparent;
    }

    .icon-shape ha-icon {
      --mdc-icon-size: var(--icon-symbol-size);
      color: var(--icon-color);
      display: flex;
      line-height: 0;
      transition: color 280ms ease-in-out;
    }

    .info {
      min-width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .primary {
      font-weight: var(--card-primary-font-weight);
      font-size: var(--card-primary-font-size);
      line-height: var(--card-primary-line-height);
      letter-spacing: var(--card-primary-letter-spacing);
      color: var(--primary-text-color);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .secondary {
      font-weight: var(--card-secondary-font-weight);
      font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height);
      letter-spacing: var(--card-secondary-letter-spacing);
      color: var(--secondary-text-color);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    ha-card.interactive {
      cursor: pointer;
    }

    ha-card.interactive:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }
  `;
Ke([
  I({ attribute: !1 })
], $e.prototype, "hass", 2);
Ke([
  I({ type: Boolean })
], $e.prototype, "preview", 2);
Ke([
  I({ type: Boolean })
], $e.prototype, "editMode", 2);
Ke([
  C()
], $e.prototype, "_config", 2);
Ke([
  C()
], $e.prototype, "_trendSeries", 2);
Ke([
  C()
], $e.prototype, "_graphTopInset", 2);
Ke([
  C()
], $e.prototype, "_hoverState", 2);
$e = Ke([
  ce("power-pilz-graph-card")
], $e);
var dd = Object.defineProperty, hd = Object.getOwnPropertyDescriptor, no = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? hd(e, i) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = (n ? s(e, i, o) : s(o)) || o);
  return n && o && dd(e, i, o), o;
};
let fi = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => Zs(t, {}, M(this.hass)), this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM")
        return;
      const i = t.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i))
        return;
      const n = {
        ...i,
        type: "custom:power-pilz-graph-stack-card"
      };
      this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: n },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(t) {
    const e = {
      ...t,
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: Ks(t.legend_layout),
      timeframe_hours: Gs(t.timeframe_hours),
      hover_enabled: t.hover_enabled ?? !0,
      fill_area_enabled: t.fill_area_enabled ?? !0,
      shared_trend_scale: t.shared_trend_scale ?? !1,
      debug_performance: t.debug_performance ?? !1,
      normalize_stack_to_percent: t.normalize_stack_to_percent ?? !1,
      percent_reference_slot: t.percent_reference_slot,
      percent_reference_auto: t.percent_reference_auto ?? !1,
      decimals: t.decimals ?? 1,
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: t.decimals_base_unit ?? t.decimals ?? 1,
      decimals_prefixed_unit: t.decimals_prefixed_unit ?? t.decimals ?? 1,
      line_thickness: Ys(t.line_thickness),
      clip_graph_to_labels: t.clip_graph_to_labels ?? !1,
      ...Xs(t)
    };
    this._config = e;
  }
  render() {
    if (!this.hass || !this._config)
      return k;
    const t = this._config.normalize_stack_to_percent ?? !1, e = js(!0, t);
    return f`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Te}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${e}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
no([
  I({ attribute: !1 })
], fi.prototype, "hass", 2);
no([
  C()
], fi.prototype, "_config", 2);
fi = no([
  ce("power-pilz-graph-stack-card-editor")
], fi);
var ud = Object.defineProperty, pd = Object.getOwnPropertyDescriptor, Ge = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? pd(e, i) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = (n ? s(e, i, o) : s(o)) || o);
  return n && o && ud(e, i, o), o;
};
const Et = 1, Wr = 24, jr = 300 * 1e3, _d = 60 * 1e3, md = 350, qe = 0.01, ut = 4, fd = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", yd = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), Kr = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let Ee = class extends L {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._graphTopInset = 0, this._drawConfigs = [], this._linePointsBySlot = {}, this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._isVisible = !1, this._liveRuntimeActive = !1, this._canvasColorContextCache = {}, this._stackCanonicalMode = !1, this._stackCanonicalFactors = {}, this._stackNormalizeToPercent = !1, this.handlePointerMove = (t) => {
      if (this.isEditorPreview()) {
        this.clearHoverState();
        return;
      }
      const e = this.renderRoot.querySelector(".card-trend");
      if (!e || !this._config || this._config.hover_enabled === !1) {
        this.clearHoverState();
        return;
      }
      const i = e.getBoundingClientRect();
      if (i.width <= 1 || i.height <= 1) {
        this.clearHoverState();
        return;
      }
      const n = t.clientX - i.left, o = t.clientY - i.top;
      if (n < 0 || n > i.width || o < 0 || o > i.height) {
        this.clearHoverState();
        return;
      }
      const r = this.findNearestHoverPoint(n, o);
      if (!r) {
        this.clearHoverState();
        return;
      }
      const s = this._hoverState;
      s && s.slot === r.slot && Math.abs(s.x - r.x) <= 0.2 && Math.abs(s.y - r.y) <= 0.2 && Math.abs(s.value - r.value) <= 1e-4 && s.color === r.color || (this._hoverState = r);
    }, this.handlePointerLeave = () => {
      this.clearHoverState();
    }, this.handleCardKeyDown = (t) => {
      t.key !== "Enter" && t.key !== " " || (t.preventDefault(), this.fireAction("tap"));
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-graph-stack-card-editor");
  }
  static async getStubConfig(t) {
    const e = (t == null ? void 0 : t.states) ?? {}, i = Object.keys(e), n = (...c) => c.find((h) => h in e), o = (c) => i.find((h) => h.startsWith(`${c}.`)), r = n("sensor.dev_home_power", "sensor.home_power") ?? o("sensor") ?? "sensor.dev_home_power", s = n("sensor.dev_solar_power", "sensor.solar_power"), a = n("sensor.dev_grid_power", "sensor.grid_power"), l = n("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: "row",
      timeframe_hours: Wr,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      normalize_stack_to_percent: !1,
      auto_scale_units: !1,
      entity_1: r,
      entity_1_enabled: !0,
      entity_1_show_icon: !0,
      entity_1_icon: "mdi:chart-line",
      entity_1_trend_color: "purple",
      entity_2: s,
      entity_2_enabled: !1,
      entity_2_show_icon: !0,
      entity_2_icon: "mdi:chart-line-variant",
      entity_2_trend_color: "blue",
      entity_3: a,
      entity_3_enabled: !1,
      entity_3_show_icon: !0,
      entity_3_icon: "mdi:chart-bell-curve",
      entity_3_trend_color: "amber",
      entity_4: l,
      entity_4_enabled: !1,
      entity_4_show_icon: !0,
      entity_4_icon: "mdi:chart-timeline-variant",
      entity_4_trend_color: "green",
      decimals: Et,
      decimals_base_unit: Et,
      decimals_prefixed_unit: Et
    };
  }
  setConfig(t) {
    const e = typeof t.decimals == "number" && Number.isFinite(t.decimals) ? Math.min(3, Math.max(0, Math.round(t.decimals))) : Et, i = Se(t.decimals_base_unit, e), n = Se(t.decimals_prefixed_unit, e), o = this.readConfigString(t.entity), r = this.readConfigString(t.icon), s = this.readConfigString(t.entity_1) ?? o ?? "sensor.dev_home_power";
    this._config = {
      ...t,
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: this.normalizeLegendLayout(t.legend_layout),
      timeframe_hours: this.normalizeTimeframeHours(t.timeframe_hours),
      line_thickness: this.normalizeLineThickness(t.line_thickness),
      clip_graph_to_labels: t.clip_graph_to_labels ?? !1,
      hover_enabled: t.hover_enabled ?? !0,
      fill_area_enabled: t.fill_area_enabled ?? !0,
      shared_trend_scale: t.shared_trend_scale ?? !1,
      debug_performance: t.debug_performance ?? !1,
      trend_data_source: ie(t.trend_data_source, "hybrid"),
      normalize_stack_to_percent: t.normalize_stack_to_percent ?? !1,
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: i,
      decimals_prefixed_unit: n,
      entity_1: s,
      entity_1_name: this.readConfigString(t.entity_1_name),
      entity_1_enabled: t.entity_1_enabled ?? !0,
      entity_1_show_icon: t.entity_1_show_icon ?? !0,
      entity_1_icon: t.entity_1_icon ?? r ?? "mdi:chart-line",
      entity_1_icon_color: t.entity_1_icon_color ?? t.icon_color,
      entity_1_trend_color: this.normalizeTrendColor(t.entity_1_trend_color, t.trend_color, 1),
      entity_2: this.readConfigString(t.entity_2),
      entity_2_name: this.readConfigString(t.entity_2_name),
      entity_2_enabled: t.entity_2_enabled ?? !1,
      entity_2_show_icon: t.entity_2_show_icon ?? !0,
      entity_2_icon: t.entity_2_icon ?? "mdi:chart-line-variant",
      entity_2_trend_color: this.normalizeTrendColor(t.entity_2_trend_color, void 0, 2),
      entity_3: this.readConfigString(t.entity_3),
      entity_3_name: this.readConfigString(t.entity_3_name),
      entity_3_enabled: t.entity_3_enabled ?? !1,
      entity_3_show_icon: t.entity_3_show_icon ?? !0,
      entity_3_icon: t.entity_3_icon ?? "mdi:chart-bell-curve",
      entity_3_trend_color: this.normalizeTrendColor(t.entity_3_trend_color, void 0, 3),
      entity_4: this.readConfigString(t.entity_4),
      entity_4_name: this.readConfigString(t.entity_4_name),
      entity_4_enabled: t.entity_4_enabled ?? !1,
      entity_4_show_icon: t.entity_4_show_icon ?? !0,
      entity_4_icon: t.entity_4_icon ?? "mdi:chart-timeline-variant",
      entity_4_trend_color: this.normalizeTrendColor(t.entity_4_trend_color, void 0, 4),
      decimals: e
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      rows: 2,
      min_columns: 3,
      min_rows: 1
    };
  }
  getLayoutOptions() {
    return {
      grid_columns: 2
    };
  }
  render() {
    if (!this._config)
      return f`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return f``;
    const t = this._config, e = t.decimals ?? Et, i = this.normalizeLineThickness(t.line_thickness), n = t.normalize_stack_to_percent === !0, o = this.collectSeriesEntries(t, e), r = this.withStackedCurrentValues(o, n, t), s = this.normalizeLegendLayout(t.legend_layout), a = t.hover_enabled !== !1, l = this.hasConfiguredAction(t), c = !this.isEditorPreview() && l, h = this._hoverState, d = t.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, p = d > 0 ? { top: `${d}px` } : {}, _ = h ? {
      left: `${h.x}px`,
      top: `${h.y + d}px`,
      "--hover-dot-color": h.color
    } : {};
    return this._drawConfigs = o.map((m) => ({
      slot: m.slot,
      currentValue: m.currentValue,
      unit: m.unit,
      color: m.trendColor,
      lineWidth: i
    })), f`
      <ha-card
        class=${c ? "interactive" : ""}
        tabindex=${c ? 0 : -1}
        role=${c ? "button" : "article"}
        @keydown=${this.handleCardKeyDown}
      >
        <div
          class="container"
          @pointermove=${this.handlePointerMove}
          @pointerleave=${this.handlePointerLeave}
          @pointercancel=${this.handlePointerLeave}
        >
          <div class="card-trend" style=${z(p)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${z(p)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${a && h ? f`<div class="hover-dot" aria-hidden="true" style=${z(_)}></div>` : k}

          <div class="content">
            <div class="series-list layout-${s}">
              ${o.length === 0 ? f`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph Stack card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : r.map(
      (m) => this.renderSeriesItem(
        m,
        h && h.slot === m.slot ? h : null
      )
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderSeriesItem(t, e) {
    const i = e === null ? null : this.convertStackedHoverValue(t.slot, e.value), n = e === null ? null : this.formatHoverTimestamp(e.ts), o = i === null ? t.secondary : `${this.formatValue(i, t.unit, t.decimals)} - ${n ?? ""}`;
    return f`
      <div class="state-item" data-slot=${String(t.slot)}>
        ${t.showIcon ? f`
              <div class="icon-wrap">
                <div class="icon-shape" style=${z(t.iconStyle)}>
                  <ha-icon .icon=${t.icon}></ha-icon>
                </div>
              </div>
            ` : k}
        <div class="info">
          <div class="primary">${t.name}</div>
          <div class="secondary">${o}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(t, e) {
    const i = [];
    for (let n = 1; n <= ut; n += 1) {
      const o = n, r = this.slotEnabled(o, t), s = this.slotEntityId(o, t);
      if (!r || !s)
        continue;
      const a = this.entityName(this.slotCustomName(o, t), s, n), l = F(this.hass, s), c = t.unit ?? W(this.hass, s) ?? "", h = this.formatValue(l, c, e), d = this.slotIcon(o, t), p = this.iconStyle(this.slotIconColor(o, t)), _ = this.resolveColor(Kr[o], fd), m = this.resolveColor(this.slotTrendColor(o, t), _);
      i.push({
        slot: o,
        entityId: s,
        name: a,
        secondary: h,
        unit: c,
        decimals: e,
        currentValue: l,
        icon: d,
        showIcon: this.slotShowIcon(o, t),
        iconStyle: p,
        trendColor: m
      });
    }
    return i;
  }
  resolvePercentReference(t, e) {
    const i = e.percent_reference_slot, n = typeof i == "number" ? i : typeof i == "string" && i.length > 0 ? Number(i) : NaN, o = Number.isFinite(n) && n >= 1 && n <= ut ? n : void 0;
    return { refSlot: o !== void 0 && t.some((s) => s.slot === o) ? o : void 0, auto: e.percent_reference_auto === !0 };
  }
  withStackedCurrentValues(t, e, i) {
    var _;
    const n = this.resolveStackUnitFactors(t), { refSlot: o, auto: r } = e ? this.resolvePercentReference(t, i) : { refSlot: void 0, auto: !1 }, s = (m) => m.currentValue === null || !Number.isFinite(m.currentValue) ? 0 : n ? m.currentValue * (n[m.slot] ?? 1) : m.currentValue;
    let a, l;
    if (e && o !== void 0 && !r) {
      const m = t.find((g) => g.slot === o);
      a = m ? s(m) : 0, l = o;
    } else e && r ? (a = t.reduce((m, g) => g.slot !== o ? m + s(g) : m, 0), l = o) : (a = t.reduce((m, g) => m + s(g), 0), l = (_ = t[t.length - 1]) == null ? void 0 : _.slot);
    const c = Number.isFinite(a) && Math.abs(a) > qe;
    let h = 0, d = 0, p = !1;
    return t.map((m) => {
      const g = o !== void 0 && m.slot === o && !r;
      m.currentValue !== null && Number.isFinite(m.currentValue) && (g || (h += m.currentValue, n && (d += m.currentValue * (n[m.slot] ?? 1))), p = !0);
      let y;
      if (!p)
        y = null;
      else if (e)
        if (!c)
          y = 0;
        else if (g)
          y = 100;
        else if (o !== void 0 || r) {
          const v = s(m);
          y = Math.max(0, Math.min(100, v / a * 100));
        } else {
          const v = n ? d : h;
          y = m.slot === l ? 100 : Math.max(0, Math.min(100, v / a * 100));
        }
      else
        y = n ? d / (n[m.slot] ?? 1) : h;
      const b = e ? "%" : m.unit;
      return {
        ...m,
        unit: b,
        secondary: this.formatValue(y, b, m.decimals)
      };
    });
  }
  slotEntityId(t, e) {
    return Ds(t, e);
  }
  slotCustomName(t, e) {
    return Os(t, e);
  }
  slotEnabled(t, e) {
    return Rs(t, e);
  }
  slotShowIcon(t, e) {
    return Ns(t, e);
  }
  slotIcon(t, e) {
    return Ls(t, e);
  }
  slotIconColor(t, e) {
    return Hs(t, e);
  }
  slotTrendColor(t, e) {
    return Bs(t, e);
  }
  entityName(t, e, i) {
    return Vs(this.hass.states, t, e, i);
  }
  formatValue(t, e, i) {
    var n, o, r;
    return Us(t, e, i, {
      enabled: ((n = this._config) == null ? void 0 : n.auto_scale_units) === !0,
      baseDecimals: ((o = this._config) == null ? void 0 : o.decimals_base_unit) ?? i,
      prefixedDecimals: ((r = this._config) == null ? void 0 : r.decimals_prefixed_unit) ?? i
    });
  }
  formatHoverTimestamp(t) {
    const e = new Date(t), i = "de-AT", n = new Intl.DateTimeFormat(i, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    }).format(e);
    if (this.trendWindowMs(this._config) <= 1440 * 60 * 1e3)
      return n;
    const o = new Intl.DateTimeFormat(i, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(e);
    return `${n} ${o}`;
  }
  resolveStackUnitFactors(t) {
    if (t.length === 0)
      return null;
    let e = null;
    const i = {};
    for (const n of t) {
      const o = te(n.unit);
      if (!o)
        return null;
      if (e === null)
        e = o.family;
      else if (e !== o.family)
        return null;
      i[n.slot] = o.factor;
    }
    return Object.keys(i).length === t.length ? i : null;
  }
  convertStackedHoverValue(t, e) {
    if (this._stackNormalizeToPercent)
      return Math.max(0, Math.min(100, e));
    if (!this._stackCanonicalMode)
      return e;
    const i = this._stackCanonicalFactors[t];
    return typeof i != "number" || !Number.isFinite(i) || i <= 0 ? e : e / i;
  }
  readConfigString(t) {
    return we(t);
  }
  normalizeLegendLayout(t) {
    return Fs(t);
  }
  normalizeTimeframeHours(t) {
    return eo(t, Wr);
  }
  trendWindowMs(t) {
    return this.normalizeTimeframeHours(t == null ? void 0 : t.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(t) {
    return to(t);
  }
  normalizeTrendColor(t, e, i) {
    const n = t ?? e;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : Kr[i];
  }
  iconStyle(t) {
    return xe(t);
  }
  resolveColor(t, e = "") {
    return be(t, e);
  }
  trendPoints(t, e) {
    const i = Date.now(), n = i - this.trendWindowMs(this._config), o = this._trendSeries[t] ?? [];
    let r = 0;
    for (; r < o.length && o[r].ts < n; )
      r += 1;
    const s = r > 0 ? o.slice(r) : [...o];
    return e !== null && Number.isFinite(e) && s.push({ ts: i, value: e }), s;
  }
  toTrendCoordinates(t, e, i) {
    var v, x;
    const o = Date.now() - e, r = 0, s = 100, a = t.map((E) => E.value), l = (i == null ? void 0 : i.min) ?? Math.min(...a), c = (i == null ? void 0 : i.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const h = 20, d = 80, p = Math.max(c - l, qe), _ = t.map((E) => {
      const w = Math.max(0, Math.min(100, (E.ts - o) / e * 100)), S = r + w / 100 * (s - r), $ = p <= qe ? 0.5 : (E.value - l) / p, T = d - $ * (d - h);
      return { x: S, y: T, value: E.value, ts: E.ts };
    }), m = ((v = _[0]) == null ? void 0 : v.x) ?? r, g = ((x = _[_.length - 1]) == null ? void 0 : x.x) ?? s, y = Math.max(0, g - m), b = 18;
    if (_.length >= 2 && y < b) {
      const E = s - b, w = Math.max(r, Math.min(E, g - b));
      if (y <= qe) {
        const $ = b / (_.length - 1);
        return _.map((T, A) => ({
          ...T,
          x: Math.max(r, Math.min(s, w + $ * A))
        }));
      }
      const S = b / y;
      return _.map(($) => ({
        ...$,
        x: Math.max(r, Math.min(s, w + ($.x - m) * S))
      }));
    }
    return _;
  }
  toCanvasPoints(t, e, i) {
    return qn(t, e, i).map((n) => ({
      x: n.x,
      y: n.y,
      value: n.value,
      ts: n.ts
    }));
  }
  syncTrendResizeObserver() {
    if (typeof ResizeObserver > "u")
      return;
    this._trendResizeObserver || (this._trendResizeObserver = new ResizeObserver(() => {
      this.updateGraphTopInset(), this.scheduleTrendCanvasDraw();
    })), this._trendResizeObserver.disconnect();
    const t = this.renderRoot.querySelector(".container");
    t && this._trendResizeObserver.observe(t);
    const e = this.renderRoot.querySelector(".series-list");
    e && this._trendResizeObserver.observe(e);
  }
  scheduleTrendCanvasDraw() {
    this._trendCanvasRaf === void 0 && (this._trendCanvasRaf = window.requestAnimationFrame(() => {
      this._trendCanvasRaf = void 0, this.drawTrendCanvases();
    }));
  }
  drawTrendCanvases() {
    var v, x, E;
    const t = this.perfNow();
    if (this._drawConfigs.length === 0) {
      this._linePointsBySlot = {}, this._stackCanonicalMode = !1, this._stackCanonicalFactors = {}, this._stackNormalizeToPercent = !1, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "no-draw-configs" });
      return;
    }
    const e = this.renderRoot.querySelector(".card-trend-canvas-area"), i = this.renderRoot.querySelector(".card-trend-canvas-line");
    if (!e || !i) {
      this._linePointsBySlot = {}, this._stackCanonicalMode = !1, this._stackCanonicalFactors = {}, this._stackNormalizeToPercent = !1, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "missing-canvas" });
      return;
    }
    const n = this.prepareTrendCanvas(e), o = this.prepareTrendCanvas(i);
    if (!n || !o) {
      this._linePointsBySlot = {}, this._stackCanonicalMode = !1, this._stackCanonicalFactors = {}, this._stackNormalizeToPercent = !1, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const r = ((v = this._config) == null ? void 0 : v.fill_area_enabled) !== !1, s = ((x = this._config) == null ? void 0 : x.normalize_stack_to_percent) === !0, a = ((E = this._config) == null ? void 0 : E.shared_trend_scale) === !0, l = this.resolveStackUnitFactors(this._drawConfigs);
    this._stackCanonicalMode = l !== null, this._stackCanonicalFactors = l ?? {}, this._stackNormalizeToPercent = s;
    const c = this.trendWindowMs(this._config), h = {}, d = s ? this.resolvePercentReference(
      this._drawConfigs,
      this._config
    ) : { refSlot: void 0, auto: !1 }, p = this.buildStackedTrendSeries(c, l ?? void 0, d.refSlot, d.auto), _ = s ? this.normalizeStackedSeriesToPercent(p, d.refSlot, d.auto) : p, m = s ? { min: 0, max: 100 } : a ? this.computeStackedValueRange(_) : null;
    let g = 0, y = 0;
    [...this._drawConfigs].sort((w, S) => S.slot - w.slot).forEach((w) => {
      const S = _[w.slot] ?? [];
      if (S.length < 2)
        return;
      const $ = this.toTrendCoordinates(S, c, m);
      if ($.length < 2)
        return;
      const T = this.toCanvasPoints($, n.width, n.height), A = this.toCanvasPoints($, o.width, o.height);
      r && this.drawTrendArea(n.ctx, T, w.color, n.height), this.drawTrendLine(o.ctx, A, w.color, w.lineWidth), h[w.slot] = A, g += 1, y += A.length;
    }), this._linePointsBySlot = h, this._hoverState && !h[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - t),
      series: g,
      points: y,
      fill_area: r,
      shared_scale: a,
      normalize_percent: s,
      stack_units: this._stackCanonicalMode ? "canonical" : "raw"
    });
  }
  buildStackedTrendSeries(t, e, i, n) {
    const o = {}, r = [...this._drawConfigs].sort((l, c) => l.slot - c.slot), s = i !== void 0 && !n;
    let a = null;
    return r.forEach((l) => {
      const c = this.trendPoints(l.slot, l.currentValue);
      if (c.length === 0)
        return;
      const h = this.normalizeTrendSeries(c, t);
      if (h.length === 0)
        return;
      const d = (e == null ? void 0 : e[l.slot]) ?? 1, p = d === 1 ? h : h.map((m) => ({
        ts: m.ts,
        value: m.value * d
      }));
      if (s && l.slot === i) {
        o[l.slot] = p;
        return;
      }
      const _ = a ? this.sumTrendSeries(a, p) : p;
      o[l.slot] = _, a = _;
    }), o;
  }
  normalizeTrendSeries(t, e) {
    const i = Date.now() - e, n = [...t].filter((r) => Number.isFinite(r.ts) && Number.isFinite(r.value) && r.ts >= i).sort((r, s) => r.ts - s.ts);
    if (n.length === 0)
      return [];
    const o = [];
    return n.forEach((r) => {
      const s = o[o.length - 1];
      s && Math.abs(s.ts - r.ts) <= 0.5 ? o[o.length - 1] = r : o.push(r);
    }), o;
  }
  sumTrendSeries(t, e) {
    return t.length === 0 ? [...e] : e.length === 0 ? [...t] : this.mergeTimestamps(t, e).map((n) => ({
      ts: n,
      value: this.interpolateTrendValue(t, n) + this.interpolateTrendValue(e, n)
    }));
  }
  mergeTimestamps(t, e) {
    const i = [];
    let n = 0, o = 0;
    const r = (s) => {
      const a = i[i.length - 1];
      (a === void 0 || Math.abs(a - s) > 0.5) && i.push(s);
    };
    for (; n < t.length || o < e.length; ) {
      const s = n < t.length ? t[n].ts : Number.POSITIVE_INFINITY, a = o < e.length ? e[o].ts : Number.POSITIVE_INFINITY;
      s <= a ? (r(s), n += 1, Math.abs(s - a) <= 0.5 && (o += 1)) : (r(a), o += 1);
    }
    return i;
  }
  interpolateTrendValue(t, e) {
    if (t.length === 0)
      return 0;
    if (e <= t[0].ts)
      return t[0].value;
    const i = t[t.length - 1];
    if (e >= i.ts)
      return i.value;
    let n = 0, o = t.length - 1;
    for (; n <= o; ) {
      const h = Math.floor((n + o) / 2), d = t[h];
      if (Math.abs(d.ts - e) <= 0.5)
        return d.value;
      d.ts < e ? n = h + 1 : o = h - 1;
    }
    const r = Math.max(1, Math.min(t.length - 1, n)), s = t[r - 1], a = t[r], l = a.ts - s.ts;
    if (Math.abs(l) <= qe)
      return a.value;
    const c = (e - s.ts) / l;
    return s.value + (a.value - s.value) * c;
  }
  computeStackedValueRange(t) {
    const e = [];
    if (Object.values(t).forEach((o) => {
      o.forEach((r) => e.push(r.value));
    }), e.length === 0)
      return null;
    const i = Math.min(...e), n = Math.max(...e);
    return !Number.isFinite(i) || !Number.isFinite(n) ? null : { min: i, max: n };
  }
  normalizeStackedSeriesToPercent(t, e, i) {
    const n = {}, o = Object.keys(t).map((a) => Number(a)).filter((a) => Number.isFinite(a) && a >= 1 && a <= ut).sort((a, l) => a - l);
    if (o.length === 0)
      return n;
    let r, s;
    if (e !== void 0 && !i)
      r = t[e] ?? [], s = e;
    else if (i) {
      const a = e !== void 0 ? o.filter((l) => l !== e) : o;
      s = a[a.length - 1] ?? o[o.length - 1], r = t[s] ?? [];
    } else
      s = o[o.length - 1], r = t[s] ?? [];
    return r.length < 1 || o.forEach((a) => {
      const l = t[a] ?? [];
      l.length !== 0 && (n[a] = l.map((c) => {
        const h = this.interpolateTrendValue(r, c.ts);
        if (!Number.isFinite(h) || Math.abs(h) <= qe)
          return { ts: c.ts, value: 0 };
        if (a === s)
          return { ts: c.ts, value: 100 };
        if (e !== void 0 && a === e && !i)
          return { ts: c.ts, value: 100 };
        const d = c.value / h * 100;
        return {
          ts: c.ts,
          value: Math.max(0, d)
        };
      }));
    }), n;
  }
  prepareTrendCanvas(t) {
    return ft(t);
  }
  drawTrendArea(t, e, i, n) {
    if (e.length < 2)
      return;
    const o = this.resolveCanvasColor(i), r = e[0], s = e[e.length - 1], a = Math.min(...e.map((c) => c.y)), l = t.createLinearGradient(0, a, 0, n);
    l.addColorStop(0, this.withAlpha(o, 0.24)), l.addColorStop(1, this.withAlpha(o, 0)), t.beginPath(), t.moveTo(r.x, r.y), e.slice(1).forEach((c) => t.lineTo(c.x, c.y)), t.lineTo(s.x, n), t.lineTo(r.x, n), t.closePath(), t.fillStyle = l, t.fill();
  }
  drawTrendLine(t, e, i, n) {
    if (e.length < 2)
      return;
    const o = this.resolveCanvasColor(i);
    this.strokeTrendPolyline(t, e, o, n);
  }
  hasConfiguredAction(t) {
    return [t.tap_action, t.hold_action, t.double_tap_action].some(
      (e) => e && e.action && e.action !== "none"
    );
  }
  fireAction(t) {
    if (this.isEditorPreview() || !this._config)
      return;
    const e = `${t}_action`, i = this._config[e];
    if (!(!i || !i.action || i.action === "none")) {
      if (i.action === "more-info" && !this._config.entity) {
        this.dispatchEvent(
          new CustomEvent("hass-notification", {
            detail: { message: "PowerPilz: Set 'Action entity' in the card editor for more-info to work." },
            bubbles: !0,
            composed: !0
          })
        );
        return;
      }
      this.dispatchEvent(
        new CustomEvent("hass-action", {
          detail: { config: this._config, action: t },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  clearHoverState() {
    this._hoverState && (this._hoverState = void 0);
  }
  findNearestHoverPoint(t, e) {
    let i = null, n = Number.POSITIVE_INFINITY;
    for (const o of this._drawConfigs) {
      const r = this._linePointsBySlot[o.slot];
      if (!r || r.length < 2)
        continue;
      const s = this.interpolateCanvasPoint(r, t);
      if (!s)
        continue;
      const a = Math.abs(s.y - e);
      a < n && (n = a, i = {
        slot: o.slot,
        x: s.x,
        y: s.y,
        value: s.value,
        ts: s.ts,
        color: o.color
      });
    }
    return i;
  }
  interpolateCanvasPoint(t, e) {
    if (t.length === 0)
      return null;
    const i = t[0], n = t[t.length - 1];
    if (e <= i.x)
      return { x: e, y: i.y, value: i.value, ts: i.ts };
    if (e >= n.x)
      return { x: e, y: n.y, value: n.value, ts: n.ts };
    for (let o = 1; o < t.length; o += 1) {
      const r = t[o - 1], s = t[o];
      if (e > s.x)
        continue;
      const a = s.x - r.x;
      if (Math.abs(a) <= qe)
        return { x: e, y: s.y, value: s.value, ts: s.ts };
      const l = (e - r.x) / a;
      return {
        x: e,
        y: r.y + (s.y - r.y) * l,
        value: r.value + (s.value - r.value) * l,
        ts: r.ts + (s.ts - r.ts) * l
      };
    }
    return { x: e, y: n.y, value: n.value, ts: n.ts };
  }
  strokeTrendPolyline(t, e, i, n) {
    e.length < 2 || (t.beginPath(), t.moveTo(e[0].x, e[0].y), e.slice(1).forEach((o) => t.lineTo(o.x, o.y)), t.strokeStyle = i, t.lineWidth = n, t.lineCap = "round", t.lineJoin = "round", t.stroke());
  }
  resolveCanvasColor(t) {
    return Ie(this.renderRoot, t);
  }
  withAlpha(t, e) {
    return yt(t, e, this._canvasColorContextCache);
  }
  connectedCallback() {
    super.connectedCallback(), this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible && this.startLiveRuntime(!0)) : (this.maybeRefreshTrendHistory(!0, !0), this.updateComplete.then(() => {
      this.updateGraphTopInset(), this.scheduleTrendCanvasDraw();
    }));
  }
  disconnectedCallback() {
    this.clearHoverState(), this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.destroyActionHandler(), super.disconnectedCallback();
  }
  destroyActionHandler() {
    this._actionHandler && (this._actionHandler.destroy(), this._actionHandler = void 0);
  }
  setupActionHandler() {
    var n, o;
    const t = this.renderRoot.querySelector("ha-card");
    if (!t || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const e = !!((n = this._config.hold_action) != null && n.action && this._config.hold_action.action !== "none"), i = !!((o = this._config.double_tap_action) != null && o.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = ot(
      t,
      {
        onTap: () => this.fireAction("tap"),
        onHold: () => this.fireAction("hold"),
        onDoubleTap: () => this.fireAction("double_tap")
      },
      { hasHold: e, hasDoubleTap: i }
    );
  }
  updated(t) {
    var s;
    t.has("_config") && this.setupActionHandler();
    const e = t.get("_config"), i = t.has("_config") && this.shouldRefreshTrendOnConfigChange(e, this._config), n = t.get("hass"), o = t.has("hass") && this.didTrackedEntityStateChange(n);
    (t.has("preview") || t.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (t.has("_config") ? (i && this.scheduleConfigRefresh(), this.clearHoverState()) : t.has("hass") && this._isVisible && o && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (t.has("_config") ? (i && this.scheduleConfigRefresh(!0), this.clearHoverState()) : t.has("hass") && o && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((s = this._config) == null ? void 0 : s.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset();
    const r = t.has("_config") || t.has("_trendSeries") || t.has("_graphTopInset") || t.has("preview") || t.has("editMode") || o;
    (!this.shouldRunLiveRuntime() || this._isVisible) && r && this.scheduleTrendCanvasDraw();
  }
  updateGraphTopInset() {
    const t = this._config;
    if (!t || t.clip_graph_to_labels !== !0) {
      this._graphTopInset !== 0 && (this._graphTopInset = 0);
      return;
    }
    const e = this.renderRoot.querySelector(".container"), i = this.renderRoot.querySelector(".series-list");
    if (!e || !i) {
      this._graphTopInset !== 0 && (this._graphTopInset = 0);
      return;
    }
    const n = e.getBoundingClientRect(), o = i.getBoundingClientRect(), r = Math.max(0, Math.ceil(o.bottom - n.top));
    Math.abs(r - this._graphTopInset) > 0.5 && (this._graphTopInset = r);
  }
  maybeRefreshTrendHistory(t = !1, e = !1) {
    if (!this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview())
      return;
    t && (this._lastTrendRefresh = 0);
    const i = Date.now();
    !t && i - this._lastTrendRefresh < jr || (this._lastTrendRefresh = i, this.refreshTrendHistory(t, e));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(yd) || this.hasEditorLikeAncestor();
  }
  shouldRunLiveRuntime() {
    return !this.isEditorPreview();
  }
  hasEditorLikeAncestor() {
    let t = this;
    for (; t; ) {
      const e = t.tagName.toLowerCase();
      if (e.startsWith("hui-") && (e.includes("preview") || e.includes("editor") || e.includes("picker") || e.includes("dialog")))
        return !0;
      if (t instanceof HTMLElement) {
        const i = t.className;
        if (typeof i == "string") {
          const n = i.toLowerCase();
          if (n.includes("preview") || n.includes("editor") || n.includes("card-picker"))
            return !0;
        }
      }
      t = t.parentElement;
    }
    return !1;
  }
  perfNow() {
    return typeof performance < "u" && typeof performance.now == "function" ? performance.now() : Date.now();
  }
  toPerfMs(t) {
    return Math.round(t * 10) / 10;
  }
  logPerformance(t, e) {
    var i;
    if (((i = this._config) == null ? void 0 : i.debug_performance) === !0) {
      if (e) {
        console.debug("[PowerPilz][GraphStack]", t, e);
        return;
      }
      console.debug("[PowerPilz][GraphStack]", t);
    }
  }
  setupVisibilityObserver() {
    if (typeof IntersectionObserver > "u") {
      this._isVisible = !0;
      return;
    }
    this._visibilityObserver || (this._visibilityObserver = new IntersectionObserver((t) => {
      const e = t.some((i) => i.isIntersecting && i.intersectionRatio > 0);
      e !== this._isVisible && (this._isVisible = e, this.shouldRunLiveRuntime() && (e ? (this.startLiveRuntime(!0), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw()) : (this.clearHoverState(), this.stopLiveRuntime())));
    }, { threshold: [0, 0.01] }), this._visibilityObserver.observe(this));
  }
  teardownVisibilityObserver() {
    this._visibilityObserver && (this._visibilityObserver.disconnect(), this._visibilityObserver = void 0), this._isVisible = typeof IntersectionObserver > "u";
  }
  scheduleConfigRefresh(t = !1) {
    !this.shouldRunLiveRuntime() && !t || !this._isVisible && !t || t && !this.isEditorPreview() || (this._configRefreshTimer !== void 0 && window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = window.setTimeout(() => {
      this._configRefreshTimer = void 0, this.maybeRefreshTrendHistory(!0, t);
    }, md));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(t = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(t), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, jr), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.updateGraphTopInset(), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this.clearConfigRefreshTimer(), this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
  }
  async refreshTrendHistory(t = !1, e = !1) {
    var a;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !e)
      return;
    const i = this._config, n = {}, o = this.trendWindowMs(i), r = ie(i.trend_data_source, "hybrid"), s = this.enabledSlots(i);
    if (s.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const l = this.perfNow(), c = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
      let p = Number.POSITIVE_INFINITY;
      const _ = Date.now() - o;
      for (const x of s) {
        const E = this.slotEntityId(x, i);
        if (!E)
          continue;
        c.set(x, E);
        const w = this._trendSeries[x] ?? [];
        if (t || w.length === 0 || h.has(E)) {
          h.add(E), d.delete(E);
          continue;
        }
        if (h.has(E))
          continue;
        d.add(E);
        const S = ((a = w[w.length - 1]) == null ? void 0 : a.ts) ?? _, $ = Math.max(_, S - _d);
        p = Math.min(p, $);
      }
      let m = 0;
      const g = h.size > 0 ? await (async () => {
        const x = this.perfNow(), E = await We(
          this.hass,
          Array.from(h),
          o,
          { dataSource: r }
        );
        return m = this.perfNow() - x, E;
      })() : {};
      let y = 0;
      const b = d.size > 0 ? await (async () => {
        const x = this.perfNow(), E = await We(
          this.hass,
          Array.from(d),
          o,
          {
            startMs: Number.isFinite(p) ? p : _,
            dataSource: r
          }
        );
        return y = this.perfNow() - x, E;
      })() : {};
      c.forEach((x, E) => {
        const w = this._trendSeries[E] ?? [];
        if (h.has(x)) {
          const S = g[x] ?? [];
          n[E] = S.length > 0 ? S : w.filter(($) => $.ts >= _);
          return;
        }
        if (d.has(x)) {
          const S = b[x] ?? [];
          n[E] = ui(w, S, _);
          return;
        }
        n[E] = w.filter((S) => S.ts >= _);
      });
      const v = this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((x) => Number(x)).filter((x) => Number.isFinite(x) && x >= 1 && x <= ut).every((x) => {
        const E = x;
        return this.areTrendSeriesEqual(n[E] ?? [], this._trendSeries[E] ?? []);
      });
      v || (this._trendSeries = n), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - l),
        window_ms: o,
        force_full: t,
        slots: s.length,
        full_entities: h.size,
        incremental_entities: d.size,
        data_source: r,
        full_fetch_ms: this.toPerfMs(m),
        incremental_fetch_ms: this.toPerfMs(y),
        series_changed: !v
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(t) {
    const e = [];
    for (let i = 1; i <= ut; i += 1) {
      const n = i;
      this.slotEnabled(n, t) && this.slotEntityId(n, t) && e.push(n);
    }
    return e;
  }
  trackedEntityIds(t) {
    const e = /* @__PURE__ */ new Set();
    return this.enabledSlots(t).forEach((i) => {
      const n = this.slotEntityId(i, t);
      n && e.add(n);
    }), Array.from(e);
  }
  didTrackedEntityStateChange(t) {
    if (!this._config || !this.hass || !t)
      return !0;
    const e = this.trackedEntityIds(this._config);
    return e.length === 0 ? !1 : e.some((i) => t.states[i] !== this.hass.states[i]);
  }
  shouldRefreshTrendOnConfigChange(t, e) {
    if (!t || !e || this.trendWindowMs(t) !== this.trendWindowMs(e) || ie(t.trend_data_source, "hybrid") !== ie(e.trend_data_source, "hybrid"))
      return !0;
    for (let i = 1; i <= ut; i += 1) {
      const n = i, o = this.slotEnabled(n, t), r = this.slotEnabled(n, e), s = o ? this.slotEntityId(n, t) : void 0, a = r ? this.slotEntityId(n, e) : void 0;
      if (o !== r || s !== a)
        return !0;
    }
    return !1;
  }
  sameTrendSeriesKeys(t, e) {
    const i = Object.keys(t).sort(), n = Object.keys(e).sort();
    return i.length === n.length && i.every((o, r) => o === n[r]);
  }
  areTrendSeriesEqual(t, e) {
    if (t.length !== e.length)
      return !1;
    for (let i = 0; i < t.length; i += 1) {
      const n = t[i], o = e[i];
      if (n.ts !== o.ts || Math.abs(n.value - o.value) > 1e-4)
        return !1;
    }
    return !0;
  }
};
Ee.styles = Z`
    :host {
      display: block;
      container-type: inline-size;
      height: 100%;
      box-sizing: border-box;
      --spacing: var(--mush-spacing, 10px);
      --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
      --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
      --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
      --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
      --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
      --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
      --card-primary-letter-spacing: var(--mush-card-primary-letter-spacing, 0.1px);
      --card-secondary-letter-spacing: var(--mush-card-secondary-letter-spacing, 0.4px);
      --icon-size: var(--mush-icon-size, 36px);
      --icon-border-radius: var(--mush-icon-border-radius, 50%);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
      --shape-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      --series-item-min-width: 164px;
      --series-row-gap: 8px;
      --series-column-gap: 10px;
    }

    ha-card {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: var(--mush-layout-align, center);
      height: 100%;
      overflow: hidden;
    }

    .container {
      position: relative;
      height: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .card-trend {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 1;
    }

    .card-trend-line {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      opacity: 0.96;
    }

    .hover-dot {
      position: absolute;
      left: 0;
      top: 0;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--hover-dot-color, var(--primary-color));
      transform: translate(-50%, -50%);
      z-index: 2;
      pointer-events: none;
    }

    .card-trend-canvas-area,
    .card-trend-canvas-line {
      width: 100%;
      height: 100%;
      display: block;
    }

    .content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      padding: var(--spacing);
      box-sizing: border-box;
    }

    .series-list {
      display: flex;
      width: 100%;
      min-height: 0;
      align-content: flex-start;
      gap: var(--series-row-gap) var(--series-column-gap);
    }

    .series-list.layout-row {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .series-list.layout-column {
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: repeat(2, minmax(0, auto));
      grid-auto-columns: minmax(var(--series-item-min-width), 1fr);
      column-gap: var(--series-column-gap);
      row-gap: var(--series-row-gap);
    }

    .state-item {
      display: flex;
      align-items: center;
      gap: var(--spacing);
      min-width: 0;
      flex: 1 1 var(--series-item-min-width);
    }

    .series-list.layout-column .state-item {
      min-width: var(--series-item-min-width);
      width: 100%;
    }

    .state-item.empty {
      flex: 1 1 100%;
    }

    .icon-wrap {
      position: relative;
      flex: none;
    }

    .icon-shape {
      position: relative;
      width: var(--icon-size);
      height: var(--icon-size);
      font-size: var(--icon-size);
      border-radius: var(--icon-border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--shape-color);
      transition-property: background-color, box-shadow;
      transition-duration: 280ms;
      transition-timing-function: ease-out;
      box-shadow: 0 0 0 1px transparent;
    }

    .icon-shape ha-icon {
      --mdc-icon-size: var(--icon-symbol-size);
      color: var(--icon-color);
      display: flex;
      line-height: 0;
      transition: color 280ms ease-in-out;
    }

    .info {
      min-width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .primary {
      font-weight: var(--card-primary-font-weight);
      font-size: var(--card-primary-font-size);
      line-height: var(--card-primary-line-height);
      letter-spacing: var(--card-primary-letter-spacing);
      color: var(--primary-text-color);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .secondary {
      font-weight: var(--card-secondary-font-weight);
      font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height);
      letter-spacing: var(--card-secondary-letter-spacing);
      color: var(--secondary-text-color);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    ha-card.interactive {
      cursor: pointer;
    }

    ha-card.interactive:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }
  `;
Ge([
  I({ attribute: !1 })
], Ee.prototype, "hass", 2);
Ge([
  I({ type: Boolean })
], Ee.prototype, "preview", 2);
Ge([
  I({ type: Boolean })
], Ee.prototype, "editMode", 2);
Ge([
  C()
], Ee.prototype, "_config", 2);
Ge([
  C()
], Ee.prototype, "_trendSeries", 2);
Ge([
  C()
], Ee.prototype, "_graphTopInset", 2);
Ge([
  C()
], Ee.prototype, "_hoverState", 2);
Ee = Ge([
  ce("power-pilz-graph-stack-card")
], Ee);
var gd = Object.defineProperty, vd = Object.getOwnPropertyDescriptor, oo = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? vd(e, i) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = (n ? s(e, i, o) : s(o)) || o);
  return n && o && gd(e, i, o), o;
};
const bd = [
  { name: "name", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "icon", selector: { icon: {} }, context: { icon_entity: "power_entity" } },
      {
        name: "icon_color",
        selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
      }
    ]
  },
  { name: "power_entity", selector: { entity: { filter: { domain: "sensor" } } } },
  { name: "status_entity", selector: { entity: { filter: { domain: "sensor" } } } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "mode_entity", selector: { entity: { filter: { domain: ["input_select", "select"] } } } },
      {
        name: "command_entity",
        selector: { entity: { filter: { domain: ["input_boolean", "switch"] } } }
      }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "show_mode_selector", selector: { boolean: {} } },
      { name: "show_live_value", selector: { boolean: {} } },
      { name: "show_command_button", selector: { boolean: {} } }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } },
      { name: "auto_scale_units", selector: { boolean: {} } },
      { name: "decimals_base_unit", selector: { number: { mode: "box", min: 0, max: 4, step: 1 } } },
      { name: "decimals_prefixed_unit", selector: { number: { mode: "box", min: 0, max: 4, step: 1 } } }
    ]
  }
];
let yi = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => this.labels()[t.name ?? ""] ?? t.name ?? "", this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM")
        return;
      const i = t.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i))
        return;
      const n = {
        ...i,
        type: "custom:power-pilz-wallbox-card"
      };
      this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: n },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(t) {
    this._config = {
      ...t,
      show_mode_selector: t.show_mode_selector ?? !0,
      show_live_value: t.show_live_value ?? !0,
      show_command_button: t.show_command_button ?? !0,
      decimals: t.decimals ?? 1,
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: t.decimals_base_unit ?? t.decimals ?? 1,
      decimals_prefixed_unit: t.decimals_prefixed_unit ?? t.decimals ?? 1,
      type: "custom:power-pilz-wallbox-card"
    };
  }
  labels() {
    const t = M(this.hass);
    return {
      name: u(t, "wallbox.editor.name"),
      icon: u(t, "wallbox.editor.icon"),
      icon_color: u(t, "wallbox.editor.icon_color"),
      power_entity: u(t, "wallbox.editor.power_entity"),
      status_entity: u(t, "wallbox.editor.status_entity"),
      mode_entity: u(t, "wallbox.editor.mode_entity"),
      command_entity: u(t, "wallbox.editor.command_entity"),
      show_mode_selector: u(t, "wallbox.editor.show_mode"),
      show_live_value: u(t, "wallbox.editor.show_live"),
      show_command_button: u(t, "wallbox.editor.show_button"),
      decimals: u(t, "wallbox.editor.decimals"),
      auto_scale_units: u(t, "wallbox.editor.auto_scale"),
      decimals_base_unit: u(t, "wallbox.editor.decimals_base"),
      decimals_prefixed_unit: u(t, "wallbox.editor.decimals_prefixed")
    };
  }
  render() {
    return !this.hass || !this._config ? k : f`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Te}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${bd}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
oo([
  I({ attribute: !1 })
], yi.prototype, "hass", 2);
oo([
  C()
], yi.prototype, "_config", 2);
yi = oo([
  ce("power-pilz-wallbox-card-editor")
], yi);
var wd = Object.defineProperty, rt = (t, e, i, n) => {
  for (var o = void 0, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = s(e, i, o) || o);
  return o && wd(e, i, o), o;
};
const xd = 0.01, Gr = "power-pilz-wallbox-mode-menu-portal-style", _o = class _o extends L {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._actionBusy = !1, this._modeMenuOpen = !1, this._modeMenuOptionCount = 0, this.toggleModeMenu = (e) => {
      var s;
      if (e.stopPropagation(), this.isEditorPreview() || !((s = this._config) != null && s.mode_entity) || this._actionBusy)
        return;
      const i = R(this.hass, this._config.mode_entity), n = (i == null ? void 0 : i.state) ?? "", o = this.getModeOptions(i);
      if (o.length === 0)
        return;
      if (this._modeMenuOpen) {
        this.closeModeMenuPortal();
        return;
      }
      const r = e.currentTarget;
      r && this.openModeMenuPortal(r, o, n || o[0] || "Mode");
    }, this.selectModeOption = async (e) => {
      var o;
      if (!((o = this._config) != null && o.mode_entity))
        return;
      const i = R(this.hass, this._config.mode_entity);
      if (!i || i.state === e)
        return;
      const n = this.entityDomain(this._config.mode_entity);
      await Promise.resolve(
        this.hass.callService(n, "select_option", {
          entity_id: this._config.mode_entity,
          option: e
        })
      );
    }, this.handleActionClick = async (e) => {
      if (this.isEditorPreview() || !this._config || this._actionBusy)
        return;
      e.stopPropagation(), this.closeModeMenuPortal();
      const i = F(this.hass, this._config.power_entity), n = ci(this.hass, this._config.status_entity), o = this.isCharging(n, i, this._config.command_entity), r = this.resolveActionCommand(o);
      if (r) {
        this._actionBusy = !0;
        try {
          await Promise.resolve(this.hass.callService(r.domain, r.service, r.data));
        } finally {
          window.setTimeout(() => {
            this._actionBusy = !1;
          }, 250);
        }
      }
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-wallbox-card-editor");
  }
  static async getStubConfig(e) {
    const i = (e == null ? void 0 : e.states) ?? {}, n = Object.keys(i), o = (...c) => c.find((h) => h in i), r = (c) => n.find((h) => h.startsWith(`${c}.`)), s = o("sensor.dev_wallbox_power", "sensor.wallbox_power") ?? r("sensor") ?? "sensor.dev_wallbox_power", a = o("input_select.dev_wallbox_mode", "select.wallbox_charging_mode") ?? r("input_select") ?? r("select"), l = o("input_boolean.dev_wallbox_enabled", "switch.wallbox_charging_enabled") ?? r("input_boolean") ?? r("switch");
    return {
      type: "custom:power-pilz-wallbox-card",
      name: "Wallbox",
      power_entity: s,
      status_entity: o("sensor.dev_wallbox_status", "sensor.wallbox_status"),
      mode_entity: a,
      command_entity: l,
      decimals: 1,
      auto_scale_units: !1,
      decimals_base_unit: 1,
      decimals_prefixed_unit: 1
    };
  }
  setConfig(e) {
    const i = e.power_entity ?? "sensor.dev_wallbox_power", n = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : 1;
    this._config = {
      ...e,
      icon: e.icon ?? "mdi:power-plug",
      name: e.name ?? u(M(this.hass), "wallbox.default_name"),
      show_mode_selector: e.show_mode_selector ?? !0,
      show_live_value: e.show_live_value ?? !0,
      show_command_button: e.show_command_button ?? !0,
      decimals: n,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: Se(e.decimals_base_unit, n),
      decimals_prefixed_unit: Se(e.decimals_prefixed_unit, n),
      power_entity: i
    };
  }
  getCardSize() {
    return 2;
  }
  getGridOptions() {
    return {
      columns: 6,
      rows: 2,
      min_columns: 4,
      min_rows: 1,
      max_rows: 3
    };
  }
  // For HA < 2024.11
  getLayoutOptions() {
    return {
      grid_columns: 2,
      grid_rows: this.getCardSize()
    };
  }
  render() {
    const e = M(this.hass);
    if (!this._config)
      return f`<ha-card>${u(e, "common.invalid_config")}</ha-card>`;
    if (!this.hass)
      return f``;
    const i = this._config, n = F(this.hass, i.power_entity), o = n !== null ? n : this.preview ? 7.2 : null, r = W(this.hass, i.power_entity) ?? "kW", s = ci(this.hass, i.status_entity), a = s || (this.preview ? "charging" : s), l = R(this.hass, i.mode_entity), c = (l == null ? void 0 : l.state) ?? (this.preview ? "Eco" : ""), h = this.getModeOptions(l), d = h.length > 0 ? h : this.preview ? ["Eco", "Fast", "Solar"] : h, p = this.isCharging(a, o, i.command_entity), _ = this.resolveActionCommand(p), m = p ? u(e, "wallbox.stop") : u(e, "wallbox.start"), g = p ? "mdi:pause" : "mdi:play", y = this.statusLabel(a, p), b = this.formatPower(o, r, i.decimals ?? 1), v = this.showModeSelector(i, d), x = this.showLiveValue(i), E = this.showCommandButton(i), w = this.isEditorPreview() || this._actionBusy || !i.mode_entity || d.length === 0, S = c || d[0] || u(e, "wallbox.mode_fallback"), $ = this._modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down", T = this.iconStyle(i.icon_color), P = Number(x) + Number(E) === 1, D = v && x && E, O = P && x, H = P && E || D, Q = O || H, ee = x && !O, ze = E && !H, Ne = v || ee || ze, Le = v ? ee || ze ? ze ? "actions" : "actions no-command" : "actions mode-only" : "actions no-mode";
    return (!v || w) && this._modeMenuOpen && this.closeModeMenuPortal(), f`
      <ha-card>
        <div class="container">
          <div class="state-item ${Q ? "compact-state" : ""}">
            <div class="icon-wrap">
              <div class="icon-shape" style=${z(T)}>
                <ha-icon .icon=${i.icon ?? "mdi:ev-station"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${i.name}</div>
              <div class="secondary">${u(e, "wallbox.ev_charger")}</div>
            </div>

            ${Q ? f`
                  <div class="compact-trailing ${H ? "button-only" : ""}">
                    ${O ? f`
                          <div class="compact-live-value">
                            <span>${y}</span>
                            <span class="dot">•</span>
                            <span>${b}</span>
                          </div>
                        ` : f``}

                    ${H ? f`
                          <button
                            type="button"
                            class="action-button"
                            ?disabled=${this.isEditorPreview() || this._actionBusy || !_}
                            @click=${this.handleActionClick}
                            title=${m}
                            aria-label=${m}
                          >
                            <ha-icon .icon=${g}></ha-icon>
                          </button>
                        ` : f``}
                  </div>
                ` : f``}
          </div>

          ${Ne ? f`
                <div class=${Le}>
                  ${v ? f`
                        <div class="mode-select-wrap">
                          <button
                            type="button"
                            class="mode-select"
                            ?disabled=${w}
                            @click=${this.toggleModeMenu}
                            aria-haspopup="listbox"
                            aria-expanded=${this._modeMenuOpen ? "true" : "false"}
                            title="Charging mode"
                          >
                            <span class="mode-select-label">${S}</span>
                            <ha-icon class="mode-select-chevron" .icon=${$}></ha-icon>
                          </button>
                        </div>
                      ` : f``}

                  ${ee ? f`
                        <div class="live-value">
                          <span>${y}</span>
                          <span class="dot">•</span>
                          <span>${b}</span>
                        </div>
                      ` : f``}

                  ${ze ? f`
                        <button
                          type="button"
                          class="action-button"
                          ?disabled=${this.isEditorPreview() || this._actionBusy || !_}
                          @click=${this.handleActionClick}
                          title=${m}
                          aria-label=${m}
                        >
                          <ha-icon .icon=${g}></ha-icon>
                        </button>
                      ` : f``}
                </div>
              ` : f``}
        </div>
      </ha-card>
    `;
  }
  getModeOptions(e) {
    const i = e == null ? void 0 : e.attributes.options;
    if (Array.isArray(i)) {
      const n = i.filter(
        (o) => typeof o == "string" && o.trim().length > 0
      );
      if (n.length > 0)
        return Array.from(new Set(n));
    }
    return [];
  }
  showModeSelector(e, i) {
    return e.show_mode_selector === !1 ? !1 : !!e.mode_entity && Array.isArray(i) && i.length > 0;
  }
  showCommandButton(e) {
    return e.show_command_button !== !1;
  }
  showLiveValue(e) {
    return e.show_live_value !== !1;
  }
  statusLabel(e, i) {
    const n = M(this.hass);
    if (!e)
      return i ? u(n, "wallbox.status_charging") : u(n, "wallbox.status_idle");
    const r = `wallbox.status_${e.toLowerCase().replace(/[_\s-]+/g, "_")}`, s = u(n, r);
    return s !== r ? s : e.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().split(" ").map((a) => a && a.charAt(0).toLocaleUpperCase() + a.slice(1)).join(" ");
  }
  formatPower(e, i, n) {
    var r, s, a;
    const o = e === null ? null : Math.abs(e);
    return Lt(o, i, n, {
      enabled: ((r = this._config) == null ? void 0 : r.auto_scale_units) === !0,
      baseDecimals: ((s = this._config) == null ? void 0 : s.decimals_base_unit) ?? n,
      prefixedDecimals: ((a = this._config) == null ? void 0 : a.decimals_prefixed_unit) ?? n,
      nullWithUnit: !0
    });
  }
  isCharging(e, i, n) {
    var o;
    if (e) {
      const r = e.toLowerCase();
      if (["charging", "active", "running", "on", "start", "started"].includes(r))
        return !0;
      if (["idle", "paused", "stopped", "off", "standby", "complete"].includes(r))
        return !1;
    }
    if (n) {
      const r = (o = ci(this.hass, n)) == null ? void 0 : o.toLowerCase();
      if (r === "on")
        return !0;
      if (r === "off")
        return !1;
    }
    return i !== null && i > xd;
  }
  parseServiceAction(e) {
    if (!e)
      return null;
    const [i, n] = e.split(".");
    return !i || !n ? null : { domain: i, service: n };
  }
  entityDomain(e) {
    return e.split(".")[0];
  }
  objectValue(e) {
    return e && typeof e == "object" && !Array.isArray(e) ? e : {};
  }
  resolveActionCommand(e) {
    if (!this._config)
      return null;
    const i = this._config, n = this.parseServiceAction(e ? i.stop_service : i.start_service);
    if (n) {
      const o = this.objectValue(e ? i.stop_service_data : i.start_service_data);
      return i.command_entity && o.entity_id === void 0 && (o.entity_id = i.command_entity), { ...n, data: o };
    }
    return i.command_entity ? {
      domain: this.entityDomain(i.command_entity),
      service: e ? "turn_off" : "turn_on",
      data: { entity_id: i.command_entity }
    } : null;
  }
  iconStyle(e) {
    return xe(e);
  }
  disconnectedCallback() {
    this.closeModeMenuPortal(), super.disconnectedCallback();
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  ensureModeMenuPortalStyles() {
    if (document.getElementById(Gr))
      return;
    const e = document.createElement("style");
    e.id = Gr, e.textContent = `
      .power-pilz-mode-menu-portal {
        position: fixed;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 6px;
        box-sizing: border-box;
        border-radius: var(--mush-control-border-radius, 12px);
        border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, rgba(0, 0, 0, 0.12)));
        background: var(--ha-card-background, var(--card-background-color, #fff));
        box-shadow: var(--ha-card-box-shadow, 0 6px 16px rgba(0, 0, 0, 0.18));
        overflow-y: auto;
      }
      .power-pilz-mode-menu-backdrop {
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: transparent;
      }
      .power-pilz-mode-menu-option {
        cursor: pointer;
        border: none;
        border-radius: calc(var(--mush-control-border-radius, 12px) - 2px);
        margin: 0;
        padding: 0 10px;
        height: 34px;
        width: 100%;
        text-align: left;
        box-sizing: border-box;
        background: transparent;
        color: var(--primary-text-color);
        font-family: var(--paper-font-body1_-_font-family, inherit);
        font-size: var(--mush-card-primary-font-size, 14px);
        font-weight: var(--mush-card-primary-font-weight, 500);
        line-height: var(--mush-card-primary-line-height, 20px);
        letter-spacing: var(--mush-card-primary-letter-spacing, 0.1px);
      }
      .power-pilz-mode-menu-option:hover {
        background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
      }
      .power-pilz-mode-menu-option.selected {
        background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.12);
      }
    `, document.head.append(e);
  }
  currentModeButton() {
    var e;
    return (e = this.renderRoot) == null ? void 0 : e.querySelector(".mode-select");
  }
  positionModeMenuPortal(e) {
    const i = this._modeMenuPortal;
    if (!i)
      return;
    const n = e ?? this.currentModeButton();
    if (!n)
      return;
    const o = n.getBoundingClientRect(), r = 8, s = 6, a = Math.max(96, Math.min(280, window.innerHeight - r * 2)), l = Math.min(
      a,
      this._modeMenuOptionCount * 34 + Math.max(0, this._modeMenuOptionCount - 1) * 4 + 14
    ), c = i.offsetHeight > 0 ? Math.min(a, i.offsetHeight) : l, h = Math.max(120, Math.round(o.width)), d = window.innerHeight - o.bottom - r, p = d < c + s && o.top - r > d;
    let _ = o.left;
    _ = Math.max(r, Math.min(_, window.innerWidth - h - r));
    let m = p ? o.top - s - c : o.bottom + s;
    m = Math.max(r, Math.min(m, window.innerHeight - c - r)), i.style.maxHeight = `${a}px`, i.style.width = `${h}px`, i.style.left = `${Math.round(_)}px`, i.style.top = `${Math.round(m)}px`;
  }
  openModeMenuPortal(e, i, n) {
    this.closeModeMenuPortal(), this.ensureModeMenuPortalStyles();
    const o = document.createElement("div");
    o.className = "power-pilz-mode-menu-backdrop", o.addEventListener("click", () => {
      this.closeModeMenuPortal();
    });
    const r = document.createElement("div");
    r.className = "power-pilz-mode-menu-portal", r.setAttribute("role", "listbox"), i.forEach((s) => {
      const a = document.createElement("button");
      a.type = "button", a.className = `power-pilz-mode-menu-option ${s === n ? "selected" : ""}`, a.dataset.option = s, a.setAttribute("role", "option"), a.setAttribute("aria-selected", s === n ? "true" : "false"), a.textContent = s, a.addEventListener("click", (l) => {
        var h;
        l.stopPropagation();
        const c = ((h = l.currentTarget) == null ? void 0 : h.dataset.option) ?? "";
        c && (this.closeModeMenuPortal(), this.selectModeOption(c));
      }), r.append(a);
    }), document.body.append(o), document.body.append(r), this._modeMenuBackdrop = o, this._modeMenuPortal = r, this._modeMenuOptionCount = i.length, this._modeMenuOpen = !0, this.positionModeMenuPortal(e);
  }
  closeModeMenuPortal() {
    this._modeMenuPortal && (this._modeMenuPortal.remove(), this._modeMenuPortal = void 0), this._modeMenuBackdrop && (this._modeMenuBackdrop.remove(), this._modeMenuBackdrop = void 0), this._modeMenuOptionCount = 0, this._modeMenuOpen && (this._modeMenuOpen = !1);
  }
};
_o.styles = Z`
    :host {
      display: block;
      container-type: inline-size;
      height: 100%;
      box-sizing: border-box;
      --spacing: var(--mush-spacing, 10px);
      --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
      --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
      --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
      --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
      --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
      --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
      --card-primary-letter-spacing: var(--mush-card-primary-letter-spacing, 0.1px);
      --card-secondary-letter-spacing: var(--mush-card-secondary-letter-spacing, 0.4px);
      --control-border-radius: var(--mush-control-border-radius, 12px);
      --control-height: var(--mush-control-height, 42px);
      --control-button-ratio: var(--mush-control-button-ratio, 1);
      --control-icon-size: var(--mush-control-icon-size, 0.5em);
      --control-spacing: var(--mush-control-spacing, 12px);
      --icon-size: var(--mush-icon-size, 36px);
      --icon-border-radius: var(--mush-icon-border-radius, 50%);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
      --icon-color-disabled: rgb(var(--rgb-disabled, 189, 189, 189));
      --shape-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      --shape-color-disabled: rgba(var(--rgb-disabled, 189, 189, 189), 0.2);
    }

    ha-card {
      display: flex;
      flex-direction: column;
      justify-content: var(--mush-layout-align, center);
      box-sizing: border-box;
      height: 100%;
      overflow: visible;
    }

    .container {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      justify-content: space-between;
      height: 100%;
      min-height: 0;
      overflow: visible;
    }

    .state-item {
      display: flex;
      align-items: center;
      gap: var(--spacing);
      padding: var(--spacing);
      min-width: 0;
    }

    .state-item.compact-state {
      align-items: center;
    }

    .icon-wrap {
      position: relative;
      flex: none;
    }

    .icon-shape {
      position: relative;
      width: var(--icon-size);
      height: var(--icon-size);
      font-size: var(--icon-size);
      border-radius: var(--icon-border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--shape-color);
      transition-property: background-color, box-shadow;
      transition-duration: 280ms;
      transition-timing-function: ease-out;
      box-shadow: 0 0 0 1px transparent;
    }

    .icon-shape ha-icon {
      --mdc-icon-size: var(--icon-symbol-size);
      color: var(--icon-color);
      display: flex;
      line-height: 0;
      transition: color 280ms ease-in-out;
    }

    .info {
      min-width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .compact-trailing {
      margin-left: auto;
      min-width: 0;
      max-width: min(52%, 280px);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--spacing);
    }

    .compact-trailing.button-only {
      max-width: none;
    }

    .compact-live-value {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 6px;
      min-width: 0;
      color: var(--primary-text-color);
      font-size: var(--card-primary-font-size);
      font-weight: var(--card-primary-font-weight);
      line-height: var(--card-primary-line-height);
      letter-spacing: var(--card-primary-letter-spacing);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .compact-live-value .dot {
      color: var(--secondary-text-color);
    }

    .primary {
      font-weight: var(--card-primary-font-weight);
      font-size: var(--card-primary-font-size);
      line-height: var(--card-primary-line-height);
      letter-spacing: var(--card-primary-letter-spacing);
      color: var(--primary-text-color);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .secondary {
      font-weight: var(--card-secondary-font-weight);
      font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height);
      letter-spacing: var(--card-secondary-letter-spacing);
      color: var(--secondary-text-color);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .actions {
      display: grid;
      grid-template-columns: clamp(122px, 46%, 220px) minmax(0, 1fr) auto;
      align-items: center;
      column-gap: var(--control-spacing);
      row-gap: 8px;
      padding: var(--control-spacing);
      padding-top: 0;
      box-sizing: border-box;
      overflow: visible;
    }

    .mode-select-wrap {
      grid-column: 1;
      min-width: 0;
      max-width: none;
      width: 100%;
      height: var(--control-height);
      position: relative;
      overflow: visible;
    }

    .mode-select {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      border: none;
      border-radius: var(--control-border-radius);
      margin: 0;
      padding: 0 12px;
      box-sizing: border-box;
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, inherit);
      font-size: var(--card-primary-font-size);
      font-weight: var(--card-primary-font-weight);
      line-height: var(--card-primary-line-height);
      letter-spacing: var(--card-primary-letter-spacing);
      text-align: left;
    }

    .mode-select:disabled {
      cursor: not-allowed;
      color: rgb(var(--rgb-disabled, 189, 189, 189));
      background-color: rgba(var(--rgb-disabled, 189, 189, 189), 0.2);
    }

    .mode-select-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .mode-select-chevron {
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
      flex: none;
      margin-left: 10px;
      pointer-events: none;
    }

    .mode-select:disabled .mode-select-chevron {
      color: rgb(var(--rgb-disabled, 189, 189, 189));
    }

    .live-value {
      grid-column: 2;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 6px;
      min-width: 0;
      padding: 0 2px;
      color: var(--primary-text-color);
      font-size: var(--card-primary-font-size);
      font-weight: var(--card-primary-font-weight);
      line-height: var(--card-primary-line-height);
      letter-spacing: var(--card-primary-letter-spacing);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .live-value .dot {
      color: var(--secondary-text-color);
    }

    .action-button {
      grid-column: 3;
      justify-self: end;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--control-height);
      width: calc(var(--control-height) * var(--control-button-ratio));
      border-radius: var(--control-border-radius);
      border: none;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      line-height: 0;
      font-size: var(--control-height);
      margin-left: auto;
    }

    .actions.no-mode {
      grid-template-columns: minmax(0, 1fr) auto;
    }

    .actions.no-mode .live-value {
      grid-column: 1;
      justify-content: flex-start;
    }

    .actions.no-mode .action-button {
      grid-column: 2;
    }

    .actions.no-command {
      grid-template-columns: minmax(0, 1fr) auto;
    }

    .actions.no-command .mode-select-wrap {
      grid-column: 1;
    }

    .actions.no-command .live-value {
      grid-column: 2;
      justify-content: flex-start;
    }

    .actions.no-mode.no-command {
      grid-template-columns: minmax(0, 1fr);
    }

    .actions.no-mode.no-command .live-value {
      grid-column: 1;
      justify-content: flex-start;
    }

    .actions.mode-only {
      grid-template-columns: minmax(0, 1fr);
    }

    .actions.mode-only .mode-select-wrap {
      grid-column: 1;
    }

    .state-item.compact-state .action-button {
      height: var(--icon-size);
      width: var(--icon-size);
      font-size: var(--icon-size);
      border-radius: calc(var(--control-border-radius) - 2px);
      margin-left: 0;
      flex: none;
    }

    .action-button:disabled {
      cursor: not-allowed;
      background-color: rgba(var(--rgb-disabled, 189, 189, 189), 0.2);
    }

    .action-button ha-icon {
      --mdc-icon-size: var(--control-icon-size);
      color: var(--primary-text-color);
      pointer-events: none;
    }

    .action-button:disabled ha-icon {
      color: var(--icon-color-disabled);
    }

    /* Keep wallbox control placement deterministic across viewport sizes. */
  `;
let fe = _o;
rt([
  I({ attribute: !1 })
], fe.prototype, "hass");
rt([
  I({ type: Boolean })
], fe.prototype, "preview");
rt([
  I({ type: Boolean })
], fe.prototype, "editMode");
rt([
  I({ reflect: !0, type: String })
], fe.prototype, "layout");
rt([
  C()
], fe.prototype, "_config");
rt([
  C()
], fe.prototype, "_actionBusy");
rt([
  C()
], fe.prototype, "_modeMenuOpen");
class Sd extends fe {
}
customElements.get("power-pilz-wallbox-card") || customElements.define("power-pilz-wallbox-card", fe);
customElements.get("power-pilz-wallbox-card-v2") || customElements.define("power-pilz-wallbox-card-v2", Sd);
var $d = Object.defineProperty, Ed = Object.getOwnPropertyDescriptor, ro = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ed(e, i) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = (n ? s(e, i, o) : s(o)) || o);
  return n && o && $d(e, i, o), o;
};
let gi = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => this.labelMap()[t.name ?? ""] ?? t.name ?? "", this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM") return;
      const i = t.detail.value;
      !i || typeof i != "object" || Array.isArray(i) || this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: { ...i, type: "custom:power-pilz-switch-card" } },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(t) {
    this._config = {
      ...t,
      use_custom_icons: t.use_custom_icons ?? !1,
      dim_inactive_icon: t.dim_inactive_icon ?? !0,
      type: "custom:power-pilz-switch-card"
    };
  }
  stateSection(t, e) {
    const i = M(this.hass);
    return {
      type: "expandable",
      name: "",
      title: t === 1 ? u(i, "switch.editor.state_1_title") : u(i, "switch.editor.state_n_title", { n: t }),
      icon: e,
      expanded: t <= 3,
      schema: [
        {
          type: "grid",
          name: "",
          columns: 2,
          schema: [
            {
              name: `state_${t}_color`,
              selector: { ui_color: { include_state: !1, include_none: !0 } }
            },
            { name: `state_${t}_icon`, selector: { icon: {} } }
          ]
        }
      ]
    };
  }
  buildSchema() {
    const t = M(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: u(t, "switch.editor.section_identity"),
        icon: "mdi:card-text-outline",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "name", selector: { text: {} } },
              { name: "subtitle", selector: { text: {} } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
              {
                name: "icon_color",
                selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
              }
            ]
          },
          {
            name: "dim_inactive_icon",
            selector: { boolean: {} }
          },
          {
            name: "entity",
            selector: { entity: { filter: { domain: ["input_select", "select"] } } }
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "switch.editor.section_layout"),
        icon: "mdi:page-layout-body",
        expanded: !1,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "card_layout",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: [
                      { label: u(t, "switch.editor.layout_horizontal"), value: "horizontal" },
                      { label: u(t, "switch.editor.layout_vertical"), value: "vertical" }
                    ]
                  }
                }
              },
              {
                name: "slider_size",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: [
                      { label: u(t, "switch.editor.slider_small"), value: "small" },
                      { label: u(t, "switch.editor.slider_medium"), value: "medium" },
                      { label: u(t, "switch.editor.slider_large"), value: "large" }
                    ]
                  }
                }
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "switch.editor.section_slider"),
        icon: "mdi:tune-variant",
        expanded: !1,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "slider_color",
                selector: { ui_color: { include_state: !1, include_none: !0 } }
              },
              { name: "use_custom_icons", selector: { boolean: {} } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "switch.editor.section_state_custom"),
        icon: "mdi:palette-outline",
        expanded: !1,
        schema: [
          this.stateSection(1, "mdi:numeric-1-circle-outline"),
          this.stateSection(2, "mdi:numeric-2-circle-outline"),
          this.stateSection(3, "mdi:numeric-3-circle-outline"),
          this.stateSection(4, "mdi:numeric-4-circle-outline"),
          this.stateSection(5, "mdi:numeric-5-circle-outline")
        ]
      }
    ];
  }
  labelMap() {
    const t = M(this.hass), e = {
      name: u(t, "switch.editor.name"),
      subtitle: u(t, "switch.editor.subtitle"),
      icon: u(t, "switch.editor.icon"),
      icon_color: u(t, "switch.editor.icon_color"),
      dim_inactive_icon: u(t, "switch.editor.dim_inactive_icon"),
      entity: u(t, "switch.editor.entity"),
      card_layout: u(t, "switch.editor.card_layout"),
      slider_size: u(t, "switch.editor.slider_size"),
      slider_color: u(t, "switch.editor.slider_color"),
      use_custom_icons: u(t, "switch.editor.use_custom_icons")
    };
    for (let i = 1; i <= 5; i++)
      e[`state_${i}_color`] = u(t, "switch.editor.state_color"), e[`state_${i}_icon`] = u(t, "switch.editor.state_icon");
    return e;
  }
  render() {
    return !this.hass || !this._config ? k : f`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Te}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this.buildSchema()}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
ro([
  I({ attribute: !1 })
], gi.prototype, "hass", 2);
ro([
  C()
], gi.prototype, "_config", 2);
gi = ro([
  ce("power-pilz-switch-card-editor")
], gi);
var kd = Object.defineProperty, Bt = (t, e, i, n) => {
  for (var o = void 0, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = s(e, i, o) || o);
  return o && kd(e, i, o), o;
};
const Cd = 5, Yr = 4, Td = {
  small: "36%",
  medium: "48%",
  large: "62%"
}, mo = class mo extends L {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this.handleSegmentTap = (e) => {
      e.stopPropagation();
      const i = e.currentTarget;
      if (!(i instanceof HTMLElement)) return;
      const n = i.dataset.option;
      n && this.selectOption(n);
    }, this.handleCardTap = () => {
      var r;
      if (!((r = this._config) != null && r.entity) || this.isEditorPreview()) return;
      const e = R(this.hass, this._config.entity);
      if (!e) return;
      const i = this.getOptions(e);
      if (i.length === 0) return;
      const o = (this.activeIndex(i, e.state) + 1) % i.length;
      this.selectOption(i[o]);
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-switch-card-editor");
  }
  static async getStubConfig(e) {
    const i = (e == null ? void 0 : e.states) ?? {}, n = Object.keys(i), o = (s) => n.find((a) => a.startsWith(`${s}.`));
    return {
      type: "custom:power-pilz-switch-card",
      entity: o("input_select") ?? o("select") ?? "input_select.mode",
      name: "Mode"
    };
  }
  setConfig(e) {
    var n;
    if (!e.entity)
      throw new Error("Entity is required");
    const i = (n = this._config) == null ? void 0 : n.card_layout;
    this._config = {
      ...e,
      icon: e.icon ?? "mdi:toggle-switch-outline",
      name: e.name ?? u(M(this.hass), "switch.default_name")
    }, i !== void 0 && i !== e.card_layout && this.requestGridRebuild();
  }
  requestGridRebuild() {
    setTimeout(() => {
      this.dispatchEvent(
        new Event("ll-rebuild", { bubbles: !0, composed: !0 })
      );
    }, 0);
  }
  getCardSize() {
    var i;
    return (((i = this._config) == null ? void 0 : i.card_layout) ?? "horizontal") === "vertical" ? 2 : 1;
  }
  getGridOptions() {
    var i;
    return (((i = this._config) == null ? void 0 : i.card_layout) ?? "horizontal") === "vertical" ? { columns: 6, rows: 2, min_columns: 2, min_rows: 2, max_rows: 3 } : { columns: 6, rows: 1, min_columns: 4, min_rows: 1, max_rows: 2 };
  }
  getLayoutOptions() {
    return {
      grid_columns: 2,
      grid_rows: this.getCardSize()
    };
  }
  // --- Helpers ---
  isEditorPreview() {
    return this.preview || this.editMode;
  }
  entityDomain(e) {
    const i = e.indexOf(".");
    return i > 0 ? e.substring(0, i) : "input_select";
  }
  getOptions(e) {
    var o;
    const i = (o = e == null ? void 0 : e.attributes) == null ? void 0 : o.options;
    if (!Array.isArray(i)) return [];
    const n = i.filter(
      (r) => typeof r == "string" && r.trim().length > 0
    );
    return Array.from(new Set(n)).slice(0, Cd);
  }
  activeIndex(e, i) {
    const n = e.indexOf(i);
    return n >= 0 ? n : 0;
  }
  iconStyle(e) {
    return xe(e);
  }
  resolvedCardLayout() {
    var i;
    return ((i = this._config) == null ? void 0 : i.card_layout) === "vertical" ? "vertical" : "horizontal";
  }
  resolvedSliderSize() {
    var i;
    const e = (i = this._config) == null ? void 0 : i.slider_size;
    return e === "small" || e === "medium" || e === "large" ? e : "medium";
  }
  /** Resolve the pill background color for the active state index. */
  pillColor(e) {
    const i = this._config;
    if (!i) return null;
    const n = `state_${e + 1}_color`, o = i[n], r = pe(o);
    if (r) return `rgba(${r}, 0.25)`;
    const s = pe(i.slider_color);
    return s ? `rgba(${s}, 0.25)` : null;
  }
  /** Resolve segment text color for the active state index. */
  segmentActiveColor(e) {
    const i = this._config;
    if (!i) return null;
    const n = `state_${e + 1}_color`, o = i[n], r = pe(o);
    if (r) return `rgb(${r})`;
    const s = pe(i.slider_color);
    return s ? `rgb(${s})` : null;
  }
  /** Get custom icon for a state index, or null. */
  stateIcon(e) {
    const i = this._config;
    if (!(i != null && i.use_custom_icons)) return null;
    const n = `state_${e + 1}_icon`, o = i[n];
    return typeof o == "string" && o.length > 0 ? o : null;
  }
  segmentContent(e) {
    const i = this.stateIcon(e);
    if (i)
      return f`<ha-icon class="seg-icon" .icon=${i}></ha-icon>`;
    if (e === 0)
      return f`<span class="seg-symbol"><span class="seg-dot"></span></span>`;
    const n = Array.from({ length: e }, () => f`<span class="seg-bar"></span>`);
    return f`<span class="seg-symbol seg-bars">${n}</span>`;
  }
  // --- Slider template (shared between layouts) ---
  renderSlider(e, i, n, o) {
    return f`
      <div class="slider-track">
        <div class="slider-pill" style=${z(n)}></div>
        ${e.map(
      (r, s) => f`
            <button
              type="button"
              class="slider-segment ${s === i ? "active" : ""}"
              style=${s === i && o ? z({ color: o }) : k}
              data-option=${r}
              ?disabled=${this.isEditorPreview()}
              @click=${this.handleSegmentTap}
              title=${r}
              aria-label=${r}
            >
              ${this.segmentContent(s)}
            </button>
          `
    )}
      </div>
    `;
  }
  // --- Service calls ---
  async selectOption(e) {
    var n;
    if (!((n = this._config) != null && n.entity) || this.isEditorPreview()) return;
    const i = this.entityDomain(this._config.entity);
    await Promise.resolve(
      this.hass.callService(i, "select_option", {
        entity_id: this._config.entity,
        option: e
      })
    );
  }
  // --- Render ---
  render() {
    var E;
    if (!this._config)
      return f`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return f``;
    const e = this._config, i = R(this.hass, e.entity), n = (i == null ? void 0 : i.state) ?? "", o = this.getOptions(i), r = this.activeIndex(o, n), s = r === 0 && e.dim_inactive_icon !== !1, a = this.iconStyle(s ? "disabled" : e.icon_color), l = o.length, c = l > 0 ? r / l * 100 : 0, h = l > 0 ? 100 / l : 100, d = (E = i == null ? void 0 : i.attributes) == null ? void 0 : E.friendly_name, p = e.subtitle || n || u(M(this.hass), "common.unknown"), _ = this.resolvedCardLayout(), m = this.resolvedSliderSize(), g = Td[m], y = l > 1, b = this.pillColor(r), v = {
      width: `calc(${h}% - ${Yr * 2}px)`,
      left: `calc(${c}% + ${Yr}px)`
    };
    b && (v["background-color"] = b);
    const x = this.segmentActiveColor(r);
    return _ === "vertical" ? f`
        <ha-card @click=${this.handleCardTap}>
          <div class="container vertical">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${z(a)}>
                  <ha-icon .icon=${e.icon ?? "mdi:toggle-switch-outline"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${e.name || d || u(M(this.hass), "switch.default_name")}</div>
                <div class="secondary">${p}</div>
              </div>
            </div>
            ${y ? f`
                  <div class="slider-row">
                    ${this.renderSlider(o, r, v, x)}
                  </div>
                ` : f``}
          </div>
        </ha-card>
      ` : f`
      <ha-card @click=${this.handleCardTap}>
        <div class="container horizontal">
          <div class="state-item">
            <div class="icon-wrap">
              <div class="icon-shape" style=${z(a)}>
                <ha-icon .icon=${e.icon ?? "mdi:toggle-switch-outline"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${e.name || d || u(M(this.hass), "switch.default_name")}</div>
              <div class="secondary">${p}</div>
            </div>
            ${y ? f`
                  <div class="slider-wrap" style=${z({ width: g })}>
                    ${this.renderSlider(o, r, v, x)}
                  </div>
                ` : f``}
          </div>
        </div>
      </ha-card>
    `;
  }
};
mo.styles = Z`
    :host {
      display: block;
      container-type: inline-size;
      height: 100%;
      box-sizing: border-box;
      --spacing: var(--mush-spacing, 10px);
      --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
      --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
      --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
      --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
      --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
      --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
      --card-primary-letter-spacing: var(--mush-card-primary-letter-spacing, 0.1px);
      --card-secondary-letter-spacing: var(--mush-card-secondary-letter-spacing, 0.4px);
      --control-border-radius: var(--mush-control-border-radius, 12px);
      --control-height: var(--mush-control-height, 42px);
      --control-spacing: var(--mush-control-spacing, 12px);
      --icon-size: var(--mush-icon-size, 36px);
      --icon-border-radius: var(--mush-icon-border-radius, 50%);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
      --shape-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
    }

    ha-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      height: 100%;
      cursor: pointer;
      overflow: hidden;
    }

    /* --- Container layouts --- */

    .container.horizontal {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      justify-content: center;
      height: 100%;
      min-height: 0;
    }

    .container.vertical {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      justify-content: space-between;
      height: 100%;
      min-height: 0;
    }

    /* --- Header row --- */

    .state-item {
      display: flex;
      align-items: center;
      gap: var(--spacing);
      padding: var(--spacing);
      min-width: 0;
    }

    .icon-wrap {
      position: relative;
      flex: none;
    }

    .icon-shape {
      position: relative;
      width: var(--icon-size);
      height: var(--icon-size);
      font-size: var(--icon-size);
      border-radius: var(--icon-border-radius);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--shape-color);
      transition-property: background-color, box-shadow;
      transition-duration: 280ms;
      transition-timing-function: ease-out;
      box-shadow: 0 0 0 1px transparent;
    }

    .icon-shape ha-icon {
      --mdc-icon-size: var(--icon-symbol-size);
      color: var(--icon-color);
      display: flex;
      line-height: 0;
      transition: color 280ms ease-in-out;
    }

    .info {
      min-width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .primary {
      font-weight: var(--card-primary-font-weight);
      font-size: var(--card-primary-font-size);
      line-height: var(--card-primary-line-height);
      letter-spacing: var(--card-primary-letter-spacing);
      color: var(--primary-text-color);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .secondary {
      font-weight: var(--card-secondary-font-weight);
      font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height);
      letter-spacing: var(--card-secondary-letter-spacing);
      color: var(--secondary-text-color);
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    /* --- Slider: horizontal (inline) --- */

    .slider-wrap {
      margin-left: auto;
      flex: 0 1 auto;
      min-width: 0;
      max-width: 100%;
    }

    /* --- Slider: vertical (own row) --- */

    .slider-row {
      padding: 0 var(--control-spacing) var(--control-spacing);
      box-sizing: border-box;
    }

    /* --- Slider track (shared) --- */

    .slider-track {
      position: relative;
      display: flex;
      align-items: stretch;
      /* Match the icon circle height so the slider sits visually
         centered at the same Y as the icon to its left (and the
         schedule-card mode button, timer toggle, etc.). */
      height: var(--icon-size);
      border-radius: var(--control-border-radius);
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      overflow: hidden;
    }

    .slider-pill {
      position: absolute;
      top: 3px;
      bottom: 3px;
      left: 0;
      border-radius: calc(var(--control-border-radius) - 4px);
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
      transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                  background-color 0.3s ease;
      pointer-events: none;
      z-index: 0;
    }

    .slider-segment {
      position: relative;
      z-index: 1;
      flex: 1 1 0;
      min-width: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: none;
      margin: 0;
      padding: 0;
      cursor: pointer;
      color: var(--secondary-text-color);
      transition: color 0.2s ease;
      -webkit-tap-highlight-color: transparent;
      overflow: hidden;
    }

    .slider-segment.active {
      color: var(--primary-text-color);
    }

    /* --- Segment symbols --- */

    .seg-symbol {
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      pointer-events: none;
    }

    .seg-dot {
      display: block;
      width: 9px;
      height: 9px;
      border-radius: 50%;
      border: 1.5px solid currentColor;
      box-sizing: border-box;
    }

    .seg-bars {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
    }

    .seg-bar {
      display: block;
      width: 1.5px;
      height: 12px;
      border-radius: 1px;
      background-color: currentColor;
    }

    .seg-icon {
      --mdc-icon-size: 18px;
      display: flex;
      line-height: 0;
      pointer-events: none;
    }
  `;
let De = mo;
Bt([
  I({ attribute: !1 })
], De.prototype, "hass");
Bt([
  I({ type: Boolean })
], De.prototype, "preview");
Bt([
  I({ type: Boolean })
], De.prototype, "editMode");
Bt([
  I({ reflect: !0, type: String })
], De.prototype, "layout");
Bt([
  C()
], De.prototype, "_config");
class zd extends De {
}
customElements.get("power-pilz-switch-card") || customElements.define("power-pilz-switch-card", De);
customElements.get("power-pilz-switch-card-v2") || customElements.define("power-pilz-switch-card-v2", zd);
var Md = Object.defineProperty, oe = (t, e, i, n) => {
  for (var o = void 0, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = s(e, i, o) || o);
  return o && Md(e, i, o), o;
};
const Fn = "power-pilz-schedule-edit-dialog", tn = [
  { key: "monday", dayIndex: 1 },
  { key: "tuesday", dayIndex: 2 },
  { key: "wednesday", dayIndex: 3 },
  { key: "thursday", dayIndex: 4 },
  { key: "friday", dayIndex: 5 },
  { key: "saturday", dayIndex: 6 },
  { key: "sunday", dayIndex: 0 }
], ni = 15, Ad = 15, ue = 1440;
function Xr() {
  return {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  };
}
const fo = class fo extends le {
  constructor() {
    super(...arguments), this.scheduleEntityId = "", this._blocks = Xr(), this._uniformBlocks = [], this._sameForAll = !1, this._loading = !0, this._saving = !1, this._dirty = !1, this._handleSave = async () => {
      if (!(this._saving || !this.hass)) {
        this._saving = !0, this.lockClose = !0;
        try {
          const e = this._sameForAll ? {
            monday: this._uniformBlocks,
            tuesday: this._uniformBlocks,
            wednesday: this._uniformBlocks,
            thursday: this._uniformBlocks,
            friday: this._uniformBlocks,
            saturday: this._uniformBlocks,
            sunday: this._uniformBlocks
          } : this._blocks;
          await this.hass.callService(
            "powerpilz_companion",
            "set_schedule_blocks",
            {
              entity_id: this.scheduleEntityId,
              blocks: e
            }
          ), this._dirty = !1, this.close();
        } catch (e) {
          this._saving = !1, this.lockClose = !1, this._loadError = String((e == null ? void 0 : e.message) || e);
        }
      }
    }, this._toggleSameForAll = () => {
      const e = !this._sameForAll;
      if (e) {
        const i = tn.map((n) => this._blocks[n.key]).find((n) => Array.isArray(n) && n.length > 0);
        this._uniformBlocks = i ? [...i] : [];
      }
      this._sameForAll = e, this._dirty = !0;
    }, this._handleTrackPointerDown = (e) => {
      if (e.button !== 0 || this._loading || this._loadError || e.target.closest(".pp-block")) return;
      const i = e.currentTarget, n = i.dataset.day;
      if (!n) return;
      e.preventDefault();
      try {
        i.setPointerCapture(e.pointerId);
      } catch {
      }
      const o = this._pxToMin(i, e.clientX);
      this._drag = {
        day: n,
        trackEl: i,
        pointerId: e.pointerId,
        startMin: o,
        endMin: o
      };
    }, this._handleTrackPointerMove = (e) => {
      const i = e.currentTarget, n = i.dataset.day;
      if (this._moveDrag && e.pointerId === this._moveDrag.pointerId) {
        const o = i.getBoundingClientRect(), s = (e.clientX - this._moveDrag.anchorClientX) / o.width * ue;
        let a = Math.round(s / ni) * ni;
        const l = -this._moveDrag.origFrom, c = ue - this._moveDrag.origTo;
        a < l && (a = l), a > c && (a = c), a !== this._moveDrag.deltaMin && (this._moveDrag = {
          ...this._moveDrag,
          deltaMin: a,
          moved: this._moveDrag.moved || a !== 0
        });
        return;
      }
      if (this._drag && e.pointerId === this._drag.pointerId) {
        const o = this._pxToMin(this._drag.trackEl, e.clientX);
        o !== this._drag.endMin && (this._drag = { ...this._drag, endMin: o });
        return;
      }
      if (n) {
        const o = this._pxToMin(i, e.clientX);
        (!this._cursor || this._cursor.day !== n || this._cursor.min !== o) && (this._cursor = { day: n, min: o });
      }
    }, this._handleTrackPointerLeave = (e) => {
      this._moveDrag || this._drag || (this._cursor = void 0);
    }, this._handleTrackPointerUp = (e) => {
      if (this._moveDrag && e.pointerId === this._moveDrag.pointerId) {
        this._finishMoveDrag();
        return;
      }
      if (!this._drag || e.pointerId !== this._drag.pointerId) return;
      const i = this._drag;
      this._drag = void 0;
      try {
        i.trackEl.releasePointerCapture(i.pointerId);
      } catch {
      }
      const n = Math.min(i.startMin, i.endMin), o = Math.max(i.startMin, i.endMin);
      if (o - n < Ad) return;
      const r = this._blocksForDay(i.day);
      r.some(
        (a) => nn(Y(a.from), Y(a.to), n, o)
      ) || (r.push({ from: pt(n), to: pt(o) }), this._setBlocksForDay(i.day, r));
    }, this._handleBlockPointerDown = (e) => {
      if (e.button !== 0 || this._loading || this._loadError) return;
      const i = e.currentTarget, n = i.dataset.day, o = parseInt(i.dataset.index ?? "-1", 10);
      if (!n || o < 0) return;
      const r = i.parentElement;
      if (!r) return;
      const a = this._blocksForDay(n)[o];
      if (a) {
        e.preventDefault(), e.stopPropagation();
        try {
          r.setPointerCapture(e.pointerId);
        } catch {
        }
        this._moveDrag = {
          day: n,
          index: o,
          trackEl: r,
          pointerId: e.pointerId,
          origFrom: Y(a.from),
          origTo: Y(a.to),
          anchorClientX: e.clientX,
          deltaMin: 0,
          moved: !1
        };
      }
    }, this._handleTrackPointerCancel = (e) => {
      if (this._drag && e.pointerId === this._drag.pointerId) {
        try {
          this._drag.trackEl.releasePointerCapture(this._drag.pointerId);
        } catch {
        }
        this._drag = void 0;
      }
    }, this._handleEditFromChange = (e) => {
      this._updateEditingField("from", Zr(e.target.value));
    }, this._handleEditToChange = (e) => {
      this._updateEditingField("to", Zr(e.target.value));
    }, this._handleEditDataChange = (e) => {
      this._updateEditingField("dataText", e.target.value);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._loadSchedule();
  }
  _handleEscape(e) {
    this._saving || (this._editing ? this._cancelBlockEdit() : this.close());
  }
  // ------------------------------------------------------------
  // Load + save
  // ------------------------------------------------------------
  async _loadSchedule() {
    var i, n, o;
    const e = M(this.hass);
    try {
      const r = (n = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : n[this.scheduleEntityId];
      if (!r) {
        this._loadError = u(e, "schedule.edit_dialog.error_not_found", {
          entity: this.scheduleEntityId
        });
        return;
      }
      const s = (o = r.attributes) == null ? void 0 : o.week_blocks, a = Xr();
      if (s && typeof s == "object" && !Array.isArray(s))
        for (const l of Object.keys(a)) {
          const c = s[l];
          Array.isArray(c) && (a[l] = c.filter((h) => h && typeof h == "object").map((h) => {
            const d = h, p = {
              from: String(d.from ?? "00:00:00"),
              to: String(d.to ?? "00:00:00")
            };
            return d.data && typeof d.data == "object" && !Array.isArray(d.data) && (p.data = d.data), p;
          }));
        }
      this._blocks = a;
    } catch (r) {
      this._loadError = String((r == null ? void 0 : r.message) || r);
    } finally {
      this._loading = !1;
    }
  }
  // ------------------------------------------------------------
  // Block list helpers
  // ------------------------------------------------------------
  /** Returns the blocks for the given day, transparently routing to
   *  `_uniformBlocks` when same-for-all-days is enabled. */
  _blocksForDay(e) {
    if (this._sameForAll) return [...this._uniformBlocks];
    const i = this._blocks[e];
    return Array.isArray(i) ? [...i] : [];
  }
  _setBlocksForDay(e, i) {
    const n = Pd(i);
    this._sameForAll ? this._uniformBlocks = n : this._blocks = { ...this._blocks, [e]: n }, this._dirty = !0;
  }
  // ------------------------------------------------------------
  // Pointer interaction — paint new blocks, move existing blocks,
  // and track cursor position for the live time hint.
  // ------------------------------------------------------------
  _pxToMin(e, i) {
    const n = e.getBoundingClientRect(), o = (i - n.left) / n.width, r = Math.max(0, Math.min(ue, Math.round(o * ue)));
    return Math.round(r / ni) * ni;
  }
  _finishMoveDrag() {
    const e = this._moveDrag;
    if (!e) return;
    this._moveDrag = void 0;
    try {
      e.trackEl.releasePointerCapture(e.pointerId);
    } catch {
    }
    if (!e.moved || e.deltaMin === 0) {
      const c = this._blocksForDay(e.day)[e.index];
      if (!c) return;
      this._editing = {
        day: e.day,
        index: e.index,
        from: Vn(c.from),
        to: Vn(c.to),
        dataText: c.data ? JSON.stringify(c.data, null, 2) : ""
      };
      return;
    }
    const i = e.origFrom + e.deltaMin, n = e.origTo + e.deltaMin, o = this._blocksForDay(e.day), r = o[e.index];
    if (!r || o.some((l, c) => c === e.index ? !1 : nn(Y(l.from), Y(l.to), i, n))) return;
    const a = {
      from: pt(i),
      to: pt(n)
    };
    r.data && (a.data = r.data), o[e.index] = a, this._setBlocksForDay(e.day, o);
  }
  // ------------------------------------------------------------
  // Block-edit modal
  // ------------------------------------------------------------
  // Opening the edit modal is handled by `_finishMoveDrag` when the
  // pointer-down on a block doesn't turn into an actual drag.
  _updateEditingField(e, i) {
    this._editing && (this._editing = { ...this._editing, [e]: i, error: void 0, dataError: void 0 });
  }
  _saveBlockEdit() {
    if (!this._editing) return;
    const e = M(this.hass), { day: i, index: n, from: o, to: r, dataText: s } = this._editing, a = Y(o), l = Y(r);
    if (isNaN(a) || isNaN(l)) {
      this._editing = { ...this._editing, error: u(e, "schedule.edit_dialog.err_time") };
      return;
    }
    if (l <= a) {
      this._editing = { ...this._editing, error: u(e, "schedule.edit_dialog.err_order") };
      return;
    }
    let c;
    const h = s.trim();
    if (h)
      try {
        const m = JSON.parse(h);
        if (typeof m != "object" || m === null || Array.isArray(m))
          throw new Error("not an object");
        c = m;
      } catch {
        this._editing = {
          ...this._editing,
          dataError: u(e, "schedule.edit_dialog.err_data")
        };
        return;
      }
    const d = this._blocksForDay(i);
    if (d.some(
      (m, g) => g !== n && nn(Y(m.from), Y(m.to), a, l)
    )) {
      this._editing = { ...this._editing, error: u(e, "schedule.edit_dialog.err_overlap") };
      return;
    }
    const _ = {
      from: pt(a, o),
      to: pt(l, r)
    };
    c && (_.data = c), d[n] = _, this._setBlocksForDay(i, d), this._editing = void 0;
  }
  _deleteEditingBlock() {
    if (!this._editing) return;
    const { day: e, index: i } = this._editing, n = this._blocksForDay(e).filter((o, r) => r !== i);
    this._setBlocksForDay(e, n), this._editing = void 0;
  }
  _cancelBlockEdit() {
    this._editing = void 0;
  }
  // ------------------------------------------------------------
  // Title resolution
  // ------------------------------------------------------------
  _resolveTitle() {
    var i, n, o, r;
    if (this.dialogTitle) return this.dialogTitle;
    const e = M(this.hass);
    return ((r = (o = (n = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : n[this.scheduleEntityId]) == null ? void 0 : o.attributes) == null ? void 0 : r.friendly_name) ?? u(e, "schedule.edit_dialog.default_title");
  }
  willUpdate() {
    const e = this._resolveTitle();
    this.dialogTitle !== e && !this.dialogTitle && (this.dialogTitle = e);
  }
  // ------------------------------------------------------------
  // Render hooks (consumed by PowerPilzDialogBase)
  // ------------------------------------------------------------
  renderBody() {
    const e = M(this.hass);
    if (this._loading)
      return f`<div class="msg">${u(e, "common.loading") || "Loading…"}</div>`;
    if (this._loadError)
      return f`<div class="msg error">${this._loadError}</div>`;
    const i = this._sameForAll ? [{ key: "monday", label: u(e, "schedule.edit_dialog.all_days") }] : tn.map((n) => ({ key: n.key, label: ne(e, n.dayIndex) }));
    return f`
      <div class="editor">
        <div class="pp-toolbar">
          <label class="pp-toggle">
            <input
              type="checkbox"
              .checked=${this._sameForAll}
              @change=${this._toggleSameForAll}
            />
            <span>${u(e, "schedule.edit_dialog.same_for_all")}</span>
          </label>
        </div>
        <div class="hour-header">
          <div class="day-col"></div>
          <div class="hour-labels">
            ${[0, 6, 12, 18, 24].map(
      (n) => f`<span style=${z({ left: `${n / 24 * 100}%` })}>${String(n).padStart(2, "0")}</span>`
    )}
          </div>
        </div>
        ${i.map((n) => this._renderDayRow(n.key, n.label))}
        <div class="hint">${u(e, "schedule.edit_dialog.hint_v3")}</div>
      </div>
    `;
  }
  renderFooter() {
    const e = M(this.hass);
    return f`
      <button class="ppd-btn flat" @click=${() => this.close()} ?disabled=${this._saving}>
        ${u(e, "common.cancel")}
      </button>
      <button
        class="ppd-btn primary"
        @click=${this._handleSave}
        ?disabled=${this._saving || !this._dirty || !!this._loadError}
      >
        ${this._saving ? u(e, "common.saving") || "Saving…" : u(e, "common.save") || "Save"}
      </button>
    `;
  }
  renderInner() {
    var o;
    if (!this._editing) return k;
    const e = M(this.hass), i = this._editing, n = ne(
      e,
      ((o = tn.find((r) => r.key === i.day)) == null ? void 0 : o.dayIndex) ?? 0
    );
    return f`
      <div class="inner-backdrop" @click=${this._cancelBlockEdit}>
        <div class="inner-dialog" @click=${(r) => r.stopPropagation()}>
          <header>
            <h3>
              ${u(e, "schedule.edit_dialog.block_title", { day: n })}
            </h3>
            <button class="close-x" @click=${this._cancelBlockEdit} aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="inner-body">
            <label class="field">
              <span>${u(e, "schedule.edit_dialog.from")}</span>
              <input
                type="time"
                .value=${i.from.slice(0, 5)}
                @change=${this._handleEditFromChange}
              />
            </label>
            <label class="field">
              <span>${u(e, "schedule.edit_dialog.to")}</span>
              <input
                type="time"
                .value=${i.to.slice(0, 5)}
                @change=${this._handleEditToChange}
              />
            </label>
            <label class="field">
              <span>
                ${u(e, "schedule.edit_dialog.data")}
                <small>${u(e, "schedule.edit_dialog.data_help")}</small>
              </span>
              <textarea
                rows="4"
                spellcheck="false"
                placeholder='{"mode": "heat"}'
                .value=${i.dataText}
                @input=${this._handleEditDataChange}
              ></textarea>
              ${i.dataError ? f`<span class="err">${i.dataError}</span>` : k}
            </label>
            ${i.error ? f`<div class="err">${i.error}</div>` : k}
          </div>
          <footer>
            <button class="ppd-btn danger" @click=${this._deleteEditingBlock}>
              ${u(e, "schedule.edit_dialog.delete")}
            </button>
            <div class="spacer"></div>
            <button class="ppd-btn flat" @click=${this._cancelBlockEdit}>
              ${u(e, "common.cancel")}
            </button>
            <button class="ppd-btn primary" @click=${() => this._saveBlockEdit()}>
              ${u(e, "common.save")}
            </button>
          </footer>
        </div>
      </div>
    `;
  }
  _renderDayRow(e, i) {
    var s, a;
    const n = this._blocksForDay(e);
    let o = k;
    if (((s = this._drag) == null ? void 0 : s.day) === e) {
      const l = Math.min(this._drag.startMin, this._drag.endMin), c = Math.max(this._drag.startMin, this._drag.endMin);
      if (c > l) {
        const h = l / ue * 100, d = (c - l) / ue * 100;
        o = f`
          <div
            class="pp-block ghost"
            style=${z({ left: `${h}%`, width: `${d}%` })}
          >
            <span class="pp-block-label">
              ${kt(l)}–${kt(c)}
            </span>
          </div>
        `;
      }
    }
    let r = k;
    if (((a = this._cursor) == null ? void 0 : a.day) === e && !this._drag && !this._moveDrag) {
      const l = this._cursor.min / ue * 100;
      r = f`
        <div class="pp-cursor-chip" style=${z({ left: `${l}%` })}>
          ${kt(this._cursor.min)}
        </div>
      `;
    }
    return f`
      <div class="day-row">
        <div class="day-col">${i}</div>
        <div
          class="day-track"
          data-day=${e}
          @pointerdown=${this._handleTrackPointerDown}
          @pointermove=${this._handleTrackPointerMove}
          @pointerup=${this._handleTrackPointerUp}
          @pointercancel=${this._handleTrackPointerCancel}
          @pointerleave=${this._handleTrackPointerLeave}
        >
          ${n.map((l, c) => {
      var x, E, w;
      const h = ((x = this._moveDrag) == null ? void 0 : x.day) === e && this._moveDrag.index === c, d = Y(l.from), p = Y(l.to), _ = h ? d + (((E = this._moveDrag) == null ? void 0 : E.deltaMin) ?? 0) : d, m = h ? p + (((w = this._moveDrag) == null ? void 0 : w.deltaMin) ?? 0) : p, g = _ / ue * 100, y = (m - _) / ue * 100, b = h ? kt(_) : l.from.slice(0, 5), v = h ? kt(m) : l.to.slice(0, 5);
      return f`
              <div
                class="pp-block ${h ? "moving" : ""}"
                data-day=${e}
                data-index=${c}
                style=${z({ left: `${g}%`, width: `${y}%` })}
                @pointerdown=${this._handleBlockPointerDown}
                title="${b}–${v}"
              >
                <span class="pp-block-label">${b}–${v}</span>
              </div>
            `;
    })}
          ${o}
          ${r}
        </div>
      </div>
    `;
  }
};
fo.styles = [
  le.styles,
  Z`
      .msg {
        padding: 32px 8px;
        text-align: center;
        color: var(--secondary-text-color, #757575);
        font-size: 14px;
      }
      .msg.error { color: var(--error-color, #c62828); }

      /* ----- Weekly editor ----- */
      .editor { display: flex; flex-direction: column; gap: 6px; }
      .hour-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: 2px;
        font-size: 10px;
        color: var(--secondary-text-color, #757575);
      }
      .day-col {
        flex: none;
        width: 44px;
        font-size: 12px;
        font-weight: 600;
        color: var(--primary-text-color);
        text-align: left;
      }
      .hour-labels {
        position: relative;
        flex: 1;
        height: 14px;
      }
      .hour-labels span { position: absolute; transform: translateX(-50%); }
      .hour-labels span:first-child { transform: translateX(0); }
      .hour-labels span:last-child { transform: translateX(-100%); }
      .day-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .day-track {
        position: relative;
        flex: 1;
        height: 38px;
        border-radius: 8px;
        background:
          linear-gradient(to right,
            transparent 0%, transparent calc(25% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) calc(25% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) 25%,
            transparent 25%, transparent calc(50% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) calc(50% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) 50%,
            transparent 50%, transparent calc(75% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) calc(75% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) 75%,
            transparent 75%),
          rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
        cursor: crosshair;
        /* overflow visible so the cursor-time chip can render above
         * the track. Block/ghost positions are clamped to 0..100% so
         * nothing else leaks out. */
        overflow: visible;
        user-select: none;
        touch-action: none;
      }
      .pp-block {
        position: absolute;
        top: 3px; bottom: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: color-mix(in srgb, var(--primary-color, #03a9f4) 40%, transparent);
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
        transition: background 0.15s ease;
      }
      .pp-block:hover {
        background: color-mix(in srgb, var(--primary-color, #03a9f4) 60%, transparent);
      }
      .pp-block.ghost {
        background: color-mix(in srgb, var(--primary-color, #03a9f4) 25%, transparent);
        border: 1px dashed color-mix(in srgb, var(--primary-color, #03a9f4) 80%, transparent);
        pointer-events: none;
      }
      .pp-block-label {
        font-size: 10px;
        font-weight: 500;
        color: var(--primary-text-color);
        white-space: nowrap;
        padding: 0 6px;
        pointer-events: none;
      }
      .pp-block.moving {
        opacity: 0.85;
        cursor: grabbing;
      }

      /* ----- Toolbar (same-for-all toggle) ----- */
      .pp-toolbar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 2px 8px;
      }
      .pp-toggle {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--primary-text-color);
        cursor: pointer;
        user-select: none;
      }
      .pp-toggle input {
        accent-color: var(--primary-color, #03a9f4);
        cursor: pointer;
      }

      /* ----- Cursor time hint while hovering a track ----- */
      .pp-cursor-chip {
        position: absolute;
        top: -22px;
        transform: translateX(-50%);
        background: var(--primary-text-color);
        color: var(--card-background-color, #fff);
        font-size: 10px;
        font-weight: 600;
        padding: 2px 6px;
        border-radius: 4px;
        pointer-events: none;
        white-space: nowrap;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
        z-index: 5;
      }
      .pp-cursor-chip::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 3px solid transparent;
        border-top-color: var(--primary-text-color);
      }

      .hint {
        margin-top: 10px;
        font-size: 11px;
        color: var(--secondary-text-color, #757575);
        line-height: 1.4;
      }

      /* ----- Inner (block edit) modal ----- */
      .inner-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        animation: ppd-fade-in 0.14s ease;
        z-index: 10;
      }
      .inner-dialog {
        background: var(--card-background-color, var(--primary-background-color, #fff));
        border-radius: 14px;
        width: min(100%, 420px);
        max-height: calc(100vh - 120px);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: ppd-pop-in 0.18s cubic-bezier(0.2, 0.9, 0.3, 1.1);
      }
      .inner-dialog header {
        padding: 14px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .inner-dialog header h3 {
        margin: 0;
        flex: 1;
        font-size: 16px;
        font-weight: 600;
      }
      .inner-dialog .close-x {
        border: none;
        background: transparent;
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .inner-dialog footer {
        padding: 12px 16px;
        display: flex;
        gap: 8px;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .inner-body {
        padding: 14px 20px;
        overflow-y: auto;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 13px;
        color: var(--primary-text-color);
      }
      .field > span { font-weight: 500; }
      .field small {
        font-weight: 400;
        color: var(--secondary-text-color);
        margin-left: 6px;
      }
      .field input[type="time"],
      .field textarea {
        font: inherit;
        font-size: 14px;
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        background: var(--secondary-background-color, #fafafa);
        color: var(--primary-text-color);
      }
      .field textarea {
        resize: vertical;
        min-height: 80px;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 12px;
      }
      .err {
        color: var(--error-color, #c62828);
        font-size: 12px;
      }
      .spacer { flex: 1; }

      @media (max-width: 700px) {
        .day-col { width: 36px; font-size: 11px; }
        .day-track { height: 34px; }
      }
    `
];
let X = fo;
oe([
  I({ attribute: !1 })
], X.prototype, "hass");
oe([
  I({ type: String })
], X.prototype, "scheduleEntityId");
oe([
  C()
], X.prototype, "_blocks");
oe([
  C()
], X.prototype, "_uniformBlocks");
oe([
  C()
], X.prototype, "_sameForAll");
oe([
  C()
], X.prototype, "_loading");
oe([
  C()
], X.prototype, "_loadError");
oe([
  C()
], X.prototype, "_saving");
oe([
  C()
], X.prototype, "_dirty");
oe([
  C()
], X.prototype, "_drag");
oe([
  C()
], X.prototype, "_moveDrag");
oe([
  C()
], X.prototype, "_editing");
oe([
  C()
], X.prototype, "_cursor");
function Y(t) {
  if (!t || typeof t != "string") return 0;
  const e = t.split(":"), i = parseInt(e[0] ?? "0", 10), n = parseInt(e[1] ?? "0", 10), o = parseInt(e[2] ?? "0", 10);
  return isNaN(i) || isNaN(n) ? 0 : i * 60 + n + (isNaN(o) ? 0 : o / 60);
}
function pt(t, e) {
  const i = Math.max(0, Math.min(ue, t)), n = Math.floor(i / 60), o = Math.floor(i % 60);
  let r = 0;
  if (e) {
    const s = e.split(":"), a = parseInt(s[2] ?? "0", 10);
    isNaN(a) || (r = a);
  }
  return n === 24 && o === 0 && r === 0 ? "24:00:00" : `${String(n).padStart(2, "0")}:${String(o).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function kt(t) {
  const e = Math.max(0, Math.min(ue, t)), i = Math.floor(e / 60), n = e % 60;
  return `${String(i).padStart(2, "0")}:${String(n).padStart(2, "0")}`;
}
function Vn(t) {
  if (!t) return "00:00:00";
  const e = t.split(":"), i = (e[0] ?? "00").padStart(2, "0"), n = (e[1] ?? "00").padStart(2, "0"), o = (e[2] ?? "00").padStart(2, "0");
  return `${i}:${n}:${o}`;
}
function Zr(t) {
  return Vn(t);
}
function nn(t, e, i, n) {
  return t < n && i < e;
}
function Pd(t) {
  const e = t.map((n) => ({
    from: n.from,
    to: n.to,
    data: n.data,
    s: Y(n.from),
    e: Y(n.to)
  })).filter((n) => n.e > n.s).sort((n, o) => n.s - o.s), i = [];
  for (const n of e) {
    const o = i[i.length - 1], r = !!n.data || !!(o != null && o.data);
    o && !r && Y(o.to) >= n.s ? Y(o.to) < n.e && (o.to = n.to) : i.push({
      from: n.from,
      to: n.to,
      ...n.data ? { data: n.data } : {}
    });
  }
  return i;
}
customElements.get(Fn) || customElements.define(Fn, X);
function Id(t) {
  if (!t.scheduleEntityId) return;
  const e = document.createElement(Fn);
  e.hass = t.hass, e.scheduleEntityId = t.scheduleEntityId, t.title && (e.dialogTitle = t.title), document.body.appendChild(e);
}
const qs = Z`
  .placeholder {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    color: var(--secondary-text-color);
  }
  .placeholder ha-icon {
    --mdc-icon-size: 28px;
    opacity: 0.6;
    flex: none;
  }
  .placeholder-text {
    font-size: 13px;
    line-height: 1.4;
  }

  :host {
    display: block;
    container-type: size;
    height: 100%;
    box-sizing: border-box;
    --spacing: var(--mush-spacing, 10px);
    --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
    --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
    --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
    --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
    --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
    --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
    --card-primary-letter-spacing: var(--mush-card-primary-letter-spacing, 0.1px);
    --card-secondary-letter-spacing: var(--mush-card-secondary-letter-spacing, 0.4px);
    --control-border-radius: var(--mush-control-border-radius, 12px);
    --control-height: var(--mush-control-height, 42px);
    --control-spacing: var(--mush-control-spacing, 12px);
    --icon-size: var(--mush-icon-size, 36px);
    --icon-border-radius: var(--mush-icon-border-radius, 50%);
    --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
    --icon-color: var(--primary-text-color);
    --shape-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
  }

  ha-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
  }

  .container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    min-height: 0;
    justify-content: stretch;
  }

  .container > .row {
    flex: 1 1 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .container > .row-days,
  .container > .row-timeline {
    padding-left: var(--control-spacing);
    padding-right: var(--control-spacing);
  }

  /* Compact-inline: when day-picker, mode button, trigger button and
   * time labels are all off AND the card is rendered at single-row
   * height, the timeline collapses into the header row so the whole
   * card fits into a single mushroom-height line. The actual layout
   * switch is gated by a height container query so a multi-row card
   * keeps the stacked layout even with the class set. */
  @container (max-height: 80px) {
    .container.compact-inline {
      flex-direction: row;
      align-items: center;
    }
    .container.compact-inline > .row { flex: 0 0 auto; }
    .container.compact-inline > .row-header {
      flex: 0 1 auto;
      min-width: 0;
    }
    .container.compact-inline > .row-header .info { flex: 0 1 auto; min-width: 0; }
    .container.compact-inline > .row-header .state-item { padding-right: 0; }
    .container.compact-inline > .row-timeline,
    .container.compact-inline > .row-curve {
      flex: 1 1 auto;
      max-width: 60%;
      min-width: 0;
      padding-left: var(--spacing);
    }
  }

  .state-item {
    display: flex;
    align-items: center;
    gap: var(--spacing);
    padding: var(--spacing);
    min-width: 0;
  }

  .icon-wrap { position: relative; flex: none; }

  .icon-shape {
    width: var(--icon-size);
    height: var(--icon-size);
    font-size: var(--icon-size);
    border-radius: var(--icon-border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--shape-color);
    transition: background-color 280ms ease-out;
  }

  .icon-shape ha-icon {
    --mdc-icon-size: var(--icon-symbol-size);
    color: var(--icon-color);
    display: flex;
    line-height: 0;
  }

  .info { min-width: 0; flex: 1; display: flex; flex-direction: column; }

  .primary {
    font-weight: var(--card-primary-font-weight);
    font-size: var(--card-primary-font-size);
    line-height: var(--card-primary-line-height);
    letter-spacing: var(--card-primary-letter-spacing);
    color: var(--primary-text-color);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .secondary {
    font-weight: var(--card-secondary-font-weight);
    font-size: var(--card-secondary-font-size);
    line-height: var(--card-secondary-line-height);
    letter-spacing: var(--card-secondary-letter-spacing);
    color: var(--secondary-text-color);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .day-selector {
    display: flex;
    gap: 2px;
    border-radius: 8px;
    overflow: hidden;
    background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
  }

  .day-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    padding: 4px 0;
    margin: 0;
    cursor: pointer;
    font-family: var(--paper-font-body1_-_font-family, inherit);
    font-size: 11px;
    font-weight: 500;
    color: var(--secondary-text-color);
    transition: background-color 0.2s, color 0.2s;
    -webkit-tap-highlight-color: transparent;
    border-radius: 6px;
  }

  .day-btn.today {
    font-weight: 700;
    color: var(--primary-text-color);
  }

  .day-btn.active {
    background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
    color: var(--primary-text-color);
  }

  .timeline-container { position: relative; }

  .time-labels {
    position: absolute;
    left: 0;
    right: 0;
    bottom: calc(100% + 2px);
    height: 14px;
    font-size: 10px;
    color: var(--secondary-text-color);
    user-select: none;
    pointer-events: none;
  }

  .time-label {
    position: absolute;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .timeline-track {
    position: relative;
    height: var(--icon-size);
    border-radius: var(--control-border-radius);
    background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
    overflow: hidden;
    cursor: pointer;
  }

  .now-indicator {
    position: absolute;
    top: 2px;
    bottom: 2px;
    width: 2px;
    border-radius: 1px;
    transform: translateX(-1px);
    pointer-events: none;
    opacity: 0.9;
  }

  .mode-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border: none;
    background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
    border-radius: calc(var(--control-border-radius) - 2px);
    height: var(--icon-size);
    min-width: var(--icon-size);
    padding: 0 10px;
    margin: 0 0 0 auto;
    box-sizing: border-box;
    cursor: pointer;
    color: var(--primary-text-color);
    font-family: var(--paper-font-body1_-_font-family, inherit);
    font-size: var(--card-secondary-font-size);
    font-weight: 500;
    white-space: nowrap;
    transition: background-color 0.2s;
    -webkit-tap-highlight-color: transparent;
    flex: none;
  }

  .mode-btn ha-icon {
    --mdc-icon-size: 18px;
    display: flex;
    line-height: 0;
    flex: none;
  }

  .mode-label {
    min-width: 28px;
    text-align: center;
  }
`;
var Dd = Object.defineProperty, Od = Object.getOwnPropertyDescriptor, so = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Od(e, i) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = (n ? s(e, i, o) : s(o)) || o);
  return n && o && Dd(e, i, o), o;
};
let vi = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => this.labelMap()[t.name ?? ""] ?? t.name ?? "", this.computeHelper = (t) => this.helperMap()[t.name ?? ""], this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM") return;
      const i = t.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i)) return;
      const n = { ...i };
      delete n.use_companion, delete n.companion_entity, delete n.schedule_entity, delete n.switch_entity, delete n.mode_entity, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: { ...n, type: "custom:power-pilz-schedule-card" } },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(t) {
    const e = t, i = t.entity || e.companion_entity;
    this._config = {
      ...t,
      entity: i,
      show_day_selector: t.show_day_selector ?? !0,
      show_mode_control: t.show_mode_control ?? !0,
      show_now_indicator: t.show_now_indicator ?? !0,
      show_time_labels: t.show_time_labels ?? !0,
      type: "custom:power-pilz-schedule-card"
    };
  }
  buildSchema() {
    const t = M(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: u(t, "schedule.editor.section_entities"),
        icon: "mdi:connection",
        expanded: !0,
        schema: [
          {
            name: "entity",
            selector: {
              entity: {
                filter: {
                  domain: "select",
                  integration: "powerpilz_companion"
                }
              }
            },
            helper: u(t, "schedule.editor.companion_help"),
            description: u(t, "schedule.editor.companion_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "schedule.editor.section_identity"),
        icon: "mdi:card-text-outline",
        expanded: !1,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "name", selector: { text: {} } },
              { name: "subtitle", selector: { text: {} } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "icon",
                selector: { icon: {} },
                context: { icon_entity: "entity" }
              },
              {
                name: "icon_color",
                selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "schedule.editor.section_layout"),
        icon: "mdi:page-layout-body",
        expanded: !1,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "card_layout",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: [
                      { label: u(t, "schedule.editor.layout_horizontal"), value: "horizontal" },
                      { label: u(t, "schedule.editor.layout_vertical"), value: "vertical" }
                    ]
                  }
                },
                helper: u(t, "schedule.editor.card_layout_help"),
                description: u(t, "schedule.editor.card_layout_help")
              },
              {
                name: "time_window",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: [
                      { label: u(t, "schedule.editor.tw_24"), value: "24" },
                      { label: u(t, "schedule.editor.tw_12"), value: "12" },
                      { label: u(t, "schedule.editor.tw_6"), value: "6" }
                    ]
                  }
                },
                helper: u(t, "schedule.editor.time_window_help"),
                description: u(t, "schedule.editor.time_window_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "schedule.editor.section_appearance"),
        icon: "mdi:palette-outline",
        expanded: !1,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "active_color",
                selector: { ui_color: { include_state: !1, include_none: !0, default_color: "primary" } },
                helper: u(t, "schedule.editor.active_color_help"),
                description: u(t, "schedule.editor.active_color_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "schedule.editor.section_display"),
        icon: "mdi:tune-variant",
        expanded: !1,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "show_day_selector", selector: { boolean: {} } },
              { name: "show_mode_control", selector: { boolean: {} } },
              { name: "show_now_indicator", selector: { boolean: {} } },
              { name: "show_time_labels", selector: { boolean: {} } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "schedule.editor.section_actions"),
        icon: "mdi:gesture-tap",
        expanded: !1,
        schema: [
          {
            name: "tap_action",
            selector: { ui_action: {} }
          },
          {
            name: "hold_action",
            selector: { ui_action: {} }
          },
          {
            name: "double_tap_action",
            selector: { ui_action: {} }
          }
        ]
      }
    ];
  }
  labelMap() {
    const t = M(this.hass);
    return {
      entity: u(t, "schedule.editor.companion_entity"),
      name: u(t, "schedule.editor.name"),
      subtitle: u(t, "schedule.editor.subtitle"),
      icon: u(t, "schedule.editor.icon"),
      icon_color: u(t, "schedule.editor.icon_color"),
      card_layout: u(t, "schedule.editor.card_layout"),
      time_window: u(t, "schedule.editor.time_window"),
      active_color: u(t, "schedule.editor.active_color"),
      show_day_selector: u(t, "schedule.editor.show_day_selector"),
      show_mode_control: u(t, "schedule.editor.show_mode_control"),
      show_now_indicator: u(t, "schedule.editor.show_now_indicator"),
      show_time_labels: u(t, "schedule.editor.show_time_labels"),
      tap_action: u(t, "schedule.editor.tap_action"),
      hold_action: u(t, "schedule.editor.hold_action"),
      double_tap_action: u(t, "schedule.editor.double_tap_action")
    };
  }
  helperMap() {
    const t = M(this.hass);
    return {
      entity: u(t, "schedule.editor.companion_help"),
      card_layout: u(t, "schedule.editor.card_layout_help"),
      time_window: u(t, "schedule.editor.time_window_help"),
      active_color: u(t, "schedule.editor.active_color_help"),
      show_day_selector: u(t, "schedule.editor.show_day_help"),
      show_mode_control: u(t, "schedule.editor.show_mode_help"),
      show_now_indicator: u(t, "schedule.editor.show_now_help"),
      show_time_labels: u(t, "schedule.editor.show_labels_help")
    };
  }
  render() {
    return !this.hass || !this._config ? k : f`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Te}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this.buildSchema()}
        .computeLabel=${this.computeLabel}
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
so([
  I({ attribute: !1 })
], vi.prototype, "hass", 2);
so([
  C()
], vi.prototype, "_config", 2);
vi = so([
  ce("power-pilz-schedule-card-editor")
], vi);
var Rd = Object.defineProperty, st = (t, e, i, n) => {
  for (var o = void 0, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = s(e, i, o) || o);
  return o && Rd(e, i, o), o;
};
const qr = "powerpilz-schedule-edit", on = [
  "sunday",
  // 0 — JS Sun
  "monday",
  // 1
  "tuesday",
  // 2
  "wednesday",
  // 3
  "thursday",
  // 4
  "friday",
  // 5
  "saturday"
  // 6
], yo = class yo extends L {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._selectedDay = (/* @__PURE__ */ new Date()).getDay(), this._tick = 0, this.handleDaySelect = (e) => {
      e.stopPropagation();
      const i = e.currentTarget;
      if (!(i instanceof HTMLElement)) return;
      const n = parseInt(i.dataset.day ?? "0", 10);
      this._selectedDay = n;
    }, this.handleModeChange = async (e) => {
      var c;
      e.stopPropagation();
      const i = this._modeEntityId;
      if (this.isEditorPreview() || !i) return;
      const n = R(this.hass, i);
      if (!n) return;
      const o = ((c = n.attributes) == null ? void 0 : c.options) ?? [];
      if (o.length === 0) return;
      const s = (o.indexOf(n.state) + 1) % o.length, a = o[s], l = i.split(".")[0];
      await this.hass.callService(l, "select_option", {
        entity_id: i,
        option: a
      });
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-schedule-card-editor");
  }
  static async getStubConfig(e) {
    const i = (e == null ? void 0 : e.states) ?? {};
    return {
      type: "custom:power-pilz-schedule-card",
      entity: Object.keys(i).find((r) => {
        var a;
        if (!r.startsWith("select.")) return !1;
        const s = (a = i[r]) == null ? void 0 : a.attributes;
        return !!(s != null && s.mode_names) && (s == null ? void 0 : s.week_blocks) !== void 0;
      }) ?? ""
    };
  }
  setConfig(e) {
    const i = e, n = e.entity || i.companion_entity || "";
    this._config = {
      ...e,
      entity: n,
      icon: e.icon ?? "mdi:clock-outline",
      name: e.name ?? u(M(this.hass), "schedule.default_name"),
      time_window: e.time_window ?? "24",
      show_day_selector: e.show_day_selector ?? !0,
      show_mode_control: e.show_mode_control ?? !0,
      show_now_indicator: e.show_now_indicator ?? !0,
      show_time_labels: e.show_time_labels ?? !0
    };
  }
  // -------- Entity resolvers --------
  //
  // In v0.4+ the card only takes the Smart Schedule select entity; the
  // target device, mode list and weekly blocks all come from its
  // attributes. Legacy helpers that used to split this into three
  // entities are gone.
  get _scheduleEntityId() {
    var e;
    return ((e = this._config) == null ? void 0 : e.entity) || void 0;
  }
  /** The Smart Schedule select is both the schedule source AND the
   *  mode selector. Kept as a separate getter for readability at call
   *  sites. */
  get _modeEntityId() {
    return this._scheduleEntityId;
  }
  /** Target device that the helper drives — exposed on the select as
   *  the `target_entity` attribute. */
  get _switchEntityId() {
    var n, o, r, s;
    const e = this._scheduleEntityId;
    if (!e) return;
    const i = (s = (r = (o = (n = this.hass) == null ? void 0 : n.states) == null ? void 0 : o[e]) == null ? void 0 : r.attributes) == null ? void 0 : s.target_entity;
    return typeof i == "string" ? i : void 0;
  }
  getCardSize() {
    var e;
    return ((e = this._config) == null ? void 0 : e.show_day_selector) !== !1 ? 3 : 2;
  }
  getGridOptions() {
    var i;
    const e = ((i = this._config) == null ? void 0 : i.show_day_selector) !== !1;
    return {
      columns: 6,
      rows: e ? 3 : 2,
      min_columns: 3,
      min_rows: e ? 2 : 1,
      max_rows: e ? 4 : 3
    };
  }
  getLayoutOptions() {
    return { grid_columns: 2, grid_rows: this.getCardSize() };
  }
  firstUpdated() {
    this._bindActions();
  }
  updated(e) {
    (!this._actionCleanup || e.has("_config")) && this._bindActions();
  }
  _bindActions() {
    var s, a, l, c, h, d;
    const e = this.renderRoot.querySelector("ha-card");
    if (!e) return;
    (s = this._actionCleanup) == null || s.destroy();
    const i = !!((l = (a = this._config) == null ? void 0 : a.hold_action) != null && l.action) && this._config.hold_action.action !== "none", n = !((h = (c = this._config) == null ? void 0 : c.hold_action) != null && h.action), o = i || n, r = !!((d = this._config) != null && d.double_tap_action) && this._config.double_tap_action.action !== void 0 && this._config.double_tap_action.action !== "none";
    this._actionCleanup = ot(
      e,
      {
        onTap: () => this._fireAction("tap"),
        onHold: () => this._fireAction("hold"),
        onDoubleTap: () => this._fireAction("double_tap")
      },
      { hasHold: o, hasDoubleTap: r }
    );
  }
  _fireAction(e) {
    if (this.isEditorPreview() || !this._config) return;
    const i = `${e}_action`;
    let n = this._config[i];
    if (e === "tap" && (!n || !n.action)) {
      this._modeEntityId && (n = { action: "fire-dom-event" }, this.handleModeChange(new Event("tap")));
      return;
    }
    if (e === "hold" && (!n || !n.action) && (n = { action: qr }), !(!n || !n.action || n.action === "none")) {
      if (n.action === qr) {
        this._openScheduleEdit();
        return;
      }
      this.dispatchEvent(
        new CustomEvent("hass-action", {
          detail: { config: this._config, action: e },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  _openScheduleEdit() {
    const e = this._scheduleEntityId;
    !e || !this.hass || Id({ hass: this.hass, scheduleEntityId: e });
  }
  connectedCallback() {
    super.connectedCallback(), this._tickTimer || (this._tickTimer = window.setInterval(() => {
      this._tick++;
    }, 6e4));
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), this._tickTimer && (clearInterval(this._tickTimer), this._tickTimer = void 0), (e = this._actionCleanup) == null || e.destroy(), this._actionCleanup = void 0;
  }
  // --- Helpers ---
  isEditorPreview() {
    return this.preview || this.editMode;
  }
  iconStyle(e) {
    return xe(e);
  }
  _weekBlocks() {
    var o, r, s;
    const e = this._scheduleEntityId;
    if (!e) return {};
    const i = (s = (r = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : r[e]) == null ? void 0 : s.attributes, n = i == null ? void 0 : i.week_blocks;
    return n && typeof n == "object" && !Array.isArray(n) ? n : {};
  }
  dayKey(e) {
    return on[e] ?? "monday";
  }
  blocksForDay(e) {
    const n = this._weekBlocks()[this.dayKey(e)];
    return Array.isArray(n) ? n : [];
  }
  timeToMinutes(e) {
    const i = (e || "").split(":"), n = parseInt(i[0] ?? "0", 10), o = parseInt(i[1] ?? "0", 10);
    return (isNaN(n) ? 0 : n) * 60 + (isNaN(o) ? 0 : o);
  }
  nowMinutes() {
    const e = /* @__PURE__ */ new Date();
    return e.getHours() * 60 + e.getMinutes();
  }
  resolvedTimeWindow() {
    var s;
    const e = ((s = this._config) == null ? void 0 : s.time_window) ?? "24";
    if (e === "24") return { start: 0, end: 1440 };
    const i = e === "12" ? 360 : 180, n = this.nowMinutes(), o = Math.max(0, n - i), r = Math.min(1440, n + i);
    return { start: o, end: r };
  }
  resolvedActiveColor() {
    var i;
    const e = pe((i = this._config) == null ? void 0 : i.active_color);
    return e ? `rgb(${e})` : "var(--primary-color, rgb(3, 169, 244))";
  }
  resolvedActiveColorAlpha(e) {
    var n;
    const i = pe((n = this._config) == null ? void 0 : n.active_color);
    return i ? `rgba(${i}, ${e})` : `rgba(var(--rgb-primary-color, 3, 169, 244), ${e})`;
  }
  isDeviceOn() {
    var a, l, c;
    const e = this.modeValue().toLowerCase();
    if (e === "on") return !0;
    if (e === "off") return !1;
    const i = this._scheduleEntityId, n = i ? (c = (l = (a = this.hass) == null ? void 0 : a.states) == null ? void 0 : l[i]) == null ? void 0 : c.attributes : void 0;
    if (typeof (n == null ? void 0 : n.schedule_active) == "boolean")
      return n.schedule_active;
    const o = (/* @__PURE__ */ new Date()).getDay(), r = this.blocksForDay(o), s = this.nowMinutes();
    return r.some((h) => {
      const d = this.timeToMinutes(h.from), p = this.timeToMinutes(h.to);
      return s >= d && s < p;
    });
  }
  /** Returns the *logical* mode ("on"/"off"/"auto") by reverse-mapping
   *  the helper's current display state via the `mode_names` attribute. */
  modeValue() {
    var r;
    const e = this._modeEntityId;
    if (!e) return "auto";
    const i = R(this.hass, e), n = (i == null ? void 0 : i.state) ?? "auto", o = (r = i == null ? void 0 : i.attributes) == null ? void 0 : r.mode_names;
    if (o && typeof o == "object") {
      for (const [s, a] of Object.entries(o))
        if (typeof a == "string" && a === n) return s;
    }
    return n;
  }
  /** Maps a logical mode back to the user-facing display name from the
   *  helper's `mode_names` attribute. */
  modeLabel(e) {
    var n;
    const i = this._modeEntityId;
    if (i) {
      const o = R(this.hass, i), r = (n = o == null ? void 0 : o.attributes) == null ? void 0 : n.mode_names;
      if (r && typeof r == "object") {
        const s = r[e.toLowerCase()];
        if (typeof s == "string" && s) return s;
      }
    }
    return e;
  }
  // --- Render ---
  renderTimeline() {
    const e = this._config, { start: i, end: n } = this.resolvedTimeWindow(), o = n - i, r = this.blocksForDay(this._selectedDay), s = this.resolvedActiveColor(), a = this.resolvedActiveColorAlpha(0.3);
    this._tick;
    const l = this.nowMinutes(), c = this._selectedDay === (/* @__PURE__ */ new Date()).getDay(), h = e.show_now_indicator !== !1 && c && l >= i && l <= n, d = e.show_time_labels !== !1, p = [];
    if (d) {
      const _ = Math.ceil(i / 60), m = Math.floor(n / 60), g = o > 720 ? 6 : o > 360 ? 3 : 2;
      for (let y = _; y <= m; y += g) {
        const b = y * 60;
        b >= i && b <= n && p.push({ hour: y >= 24 ? 0 : y, pct: (b - i) / o * 100 });
      }
    }
    return f`
      <div class="timeline-container">
        ${d ? f`
              <div class="time-labels">
                ${p.map(
      (_) => f`<span class="time-label" style=${z({ left: `${_.pct}%` })}>${String(_.hour).padStart(2, "0")}</span>`
    )}
              </div>
            ` : k}
        <div class="timeline-track">
          ${r.map((_) => {
      const m = this.timeToMinutes(_.from), g = this.timeToMinutes(_.to), y = Math.max(m, i), b = Math.min(g, n);
      if (b <= y) return k;
      const v = (y - i) / o * 100, x = (b - y) / o * 100;
      return f`
              <div
                class="timeline-block"
                style=${z({
        left: `${v}%`,
        width: `${x}%`,
        "background-color": a
      })}
              ></div>
            `;
    })}
          ${h ? f`
                <div
                  class="now-indicator"
                  style=${z({
      left: `${(l - i) / o * 100}%`,
      "background-color": s
    })}
                ></div>
              ` : k}
        </div>
      </div>
    `;
  }
  renderDaySelector() {
    const e = (/* @__PURE__ */ new Date()).getDay();
    return f`
      <div class="day-selector">
        ${on.map((i, n) => f`
          <button
            type="button"
            class="day-btn ${n === this._selectedDay ? "active" : ""} ${n === e ? "today" : ""}"
            data-day=${n}
            @click=${this.handleDaySelect}
          >
            ${ne(M(this.hass), n)}
          </button>
        `)}
      </div>
    `;
  }
  renderModeButton() {
    const e = this.modeValue(), i = e.toLowerCase(), n = i === "on" ? "mdi:power" : i === "off" ? "mdi:power-off" : "mdi:clock-outline", o = this.modeLabel(e);
    return f`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${e}">
        <ha-icon .icon=${n}></ha-icon>
        <span class="mode-label">${o}</span>
      </button>
    `;
  }
  /** Demo card for the dashboard card-picker preview (preview=true,
   *  no entity yet). Renders the regular layout with hardcoded mock
   *  blocks so users see what the card actually looks like. */
  _renderDemo() {
    const e = this._config, { start: i, end: n } = this.resolvedTimeWindow(), o = n - i, r = this.resolvedActiveColor(), s = this.resolvedActiveColorAlpha(0.3), a = this.nowMinutes(), l = e.show_now_indicator !== !1 && a >= i && a <= n, c = e.show_time_labels !== !1, h = e.show_day_selector !== !1, d = e.card_layout === "vertical", p = [
      { startMin: 360, endMin: 510 },
      { startMin: 1020, endMin: 1320 }
    ], _ = [];
    if (c) {
      const y = Math.ceil(i / 60), b = Math.floor(n / 60), v = o > 720 ? 6 : o > 360 ? 3 : 2;
      for (let x = y; x <= b; x += v) {
        const E = x * 60;
        E >= i && E <= n && _.push({ hour: x >= 24 ? 0 : x, pct: (E - i) / o * 100 });
      }
    }
    const m = (/* @__PURE__ */ new Date()).getDay(), g = M(this.hass);
    return f`
      <ha-card>
        <div class="container ${d ? "vertical" : "horizontal"}">
          <div class="row row-header">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${z(this.iconStyle(e.icon_color))}>
                  <ha-icon .icon=${e.icon ?? "mdi:clock-outline"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${e.name || u(g, "schedule.default_name")}</div>
                <div class="secondary">${e.subtitle || "Auto"}</div>
              </div>
              <button type="button" class="mode-btn" disabled>
                <ha-icon icon="mdi:clock-outline"></ha-icon>
                <span class="mode-label">Auto</span>
              </button>
            </div>
          </div>
          ${h ? f`
                <div class="row row-days">
                  <div class="day-selector">
                    ${on.map((y, b) => f`
                      <button type="button" class="day-btn ${b === m ? "active today" : ""}" disabled>
                        ${ne(g, b)}
                      </button>
                    `)}
                  </div>
                </div>
              ` : k}
          <div class="row row-timeline">
            <div class="timeline-container">
              ${c ? f`
                    <div class="time-labels">
                      ${_.map(
      (y) => f`<span class="time-label" style=${z({ left: `${y.pct}%` })}>${String(y.hour).padStart(2, "0")}</span>`
    )}
                    </div>
                  ` : k}
              <div class="timeline-track">
                ${p.map((y) => {
      const b = (y.startMin - i) / o * 100, v = (y.endMin - y.startMin) / o * 100;
      return f`
                    <div class="timeline-block" style=${z({
        left: `${b}%`,
        width: `${v}%`,
        "background-color": s
      })}></div>
                  `;
    })}
                ${l ? f`
                      <div class="now-indicator" style=${z({
      left: `${(a - i) / o * 100}%`,
      "background-color": r
    })}></div>
                    ` : k}
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  render() {
    var _, m;
    if (!this._config) return f`<ha-card>${u(M(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return f``;
    if (!this._scheduleEntityId) {
      if (this.preview) return this._renderDemo();
      const g = M(this.hass);
      return f`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:clock-outline"></ha-icon>
            <div class="placeholder-text">${u(g, "schedule.placeholder_companion")}</div>
          </div>
        </ha-card>
      `;
    }
    const e = this._config, i = (m = (_ = R(this.hass, this._scheduleEntityId)) == null ? void 0 : _.attributes) == null ? void 0 : m.friendly_name, n = this.modeValue(), o = e.subtitle || this.modeLabel(n), r = e.show_day_selector !== !1, s = e.show_mode_control !== !1 && !!this._modeEntityId, a = e.show_time_labels !== !1, l = e.card_layout === "vertical", c = !l && !r && !s && !a, d = this.isDeviceOn() ? this.iconStyle(e.icon_color) : this.iconStyle("disabled"), p = f`
      <div class="state-item">
        <div class="icon-wrap">
          <div class="icon-shape" style=${z(d)}>
            <ha-icon .icon=${e.icon ?? "mdi:clock-outline"}></ha-icon>
          </div>
        </div>
        <div class="info">
          <div class="primary">${e.name || i || u(M(this.hass), "schedule.default_name")}</div>
          <div class="secondary">${o}</div>
        </div>
        ${s ? this.renderModeButton() : k}
      </div>
    `;
    return f`
      <ha-card>
        <div class="container ${l ? "vertical" : "horizontal"}${c ? " compact-inline" : ""}">
          <div class="row row-header">${p}</div>
          ${r ? f`<div class="row row-days">${this.renderDaySelector()}</div>` : k}
          <div class="row row-timeline">${this.renderTimeline()}</div>
        </div>
      </ha-card>
    `;
  }
};
yo.styles = [
  qs,
  Z`
      /* Blocks-mode marker: filled rectangle spanning from/to. */
      .timeline-block {
        position: absolute;
        top: 6px;
        bottom: 6px;
        border-radius: 6px;
        pointer-events: none;
      }
    `
];
let ke = yo;
st([
  I({ attribute: !1 })
], ke.prototype, "hass");
st([
  I({ type: Boolean })
], ke.prototype, "preview");
st([
  I({ type: Boolean })
], ke.prototype, "editMode");
st([
  I({ reflect: !0, type: String })
], ke.prototype, "layout");
st([
  C()
], ke.prototype, "_config");
st([
  C()
], ke.prototype, "_selectedDay");
st([
  C()
], ke.prototype, "_tick");
customElements.get("power-pilz-schedule-card") || customElements.define("power-pilz-schedule-card", ke);
var Nd = Object.defineProperty, de = (t, e, i, n) => {
  for (var o = void 0, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = s(e, i, o) || o);
  return o && Nd(e, i, o), o;
};
const Un = "power-pilz-event-schedule-edit-dialog", rn = [
  { key: "monday", dayIndex: 1 },
  { key: "tuesday", dayIndex: 2 },
  { key: "wednesday", dayIndex: 3 },
  { key: "thursday", dayIndex: 4 },
  { key: "friday", dayIndex: 5 },
  { key: "saturday", dayIndex: 6 },
  { key: "sunday", dayIndex: 0 }
], oi = 15, He = 1440;
function Jr() {
  return {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  };
}
const go = class go extends le {
  constructor() {
    super(...arguments), this.scheduleEntityId = "", this._events = Jr(), this._uniformEvents = [], this._sameForAll = !1, this._loading = !0, this._saving = !1, this._dirty = !1, this._handleSave = async () => {
      if (!(this._saving || !this.hass)) {
        this._saving = !0, this.lockClose = !0;
        try {
          const e = this._sameForAll ? {
            monday: this._uniformEvents,
            tuesday: this._uniformEvents,
            wednesday: this._uniformEvents,
            thursday: this._uniformEvents,
            friday: this._uniformEvents,
            saturday: this._uniformEvents,
            sunday: this._uniformEvents
          } : this._events;
          await this.hass.callService(
            "powerpilz_companion",
            "set_schedule_events",
            {
              entity_id: this.scheduleEntityId,
              events: e
            }
          ), this._dirty = !1, this.close();
        } catch (e) {
          this._saving = !1, this.lockClose = !1, this._loadError = String((e == null ? void 0 : e.message) || e);
        }
      }
    }, this._toggleSameForAll = () => {
      const e = !this._sameForAll;
      if (e) {
        const i = rn.map((n) => this._events[n.key]).find((n) => Array.isArray(n) && n.length > 0);
        this._uniformEvents = i ? [...i] : [];
      }
      this._sameForAll = e, this._dirty = !0;
    }, this._handleTrackClick = (e) => {
      if (this._loading || this._loadError || e.target.closest(".pp-pin") || this._pinDrag) return;
      const i = e.currentTarget, n = i.dataset.day;
      if (!n) return;
      const o = this._pxToMin(i, e.clientX), r = this._eventsForDay(n);
      r.some((s) => Be(s.time) === o) || (r.push({ time: sn(o) }), this._setEventsForDay(n, r));
    }, this._handleTrackPointerMove = (e) => {
      const i = e.currentTarget, n = i.dataset.day;
      if (this._pinDrag && e.pointerId === this._pinDrag.pointerId) {
        const o = i.getBoundingClientRect(), s = (e.clientX - this._pinDrag.anchorClientX) / o.width * He;
        let a = Math.round(s / oi) * oi;
        const l = -this._pinDrag.origMin, c = He - this._pinDrag.origMin;
        a < l && (a = l), a > c && (a = c), a !== this._pinDrag.deltaMin && (this._pinDrag = {
          ...this._pinDrag,
          deltaMin: a,
          moved: this._pinDrag.moved || a !== 0
        });
        return;
      }
      if (n) {
        const o = this._pxToMin(i, e.clientX);
        (!this._cursor || this._cursor.day !== n || this._cursor.min !== o) && (this._cursor = { day: n, min: o });
      }
    }, this._handleTrackPointerLeave = (e) => {
      this._pinDrag || (this._cursor = void 0);
    }, this._handlePinPointerDown = (e) => {
      if (e.button !== 0 || this._loading || this._loadError) return;
      const i = e.currentTarget, n = i.dataset.day, o = parseInt(i.dataset.index ?? "-1", 10);
      if (!n || o < 0) return;
      const r = i.parentElement;
      if (!r) return;
      const a = this._eventsForDay(n)[o];
      if (a) {
        e.preventDefault(), e.stopPropagation();
        try {
          r.setPointerCapture(e.pointerId);
        } catch {
        }
        this._pinDrag = {
          day: n,
          index: o,
          trackEl: r,
          pointerId: e.pointerId,
          origMin: Be(a.time),
          anchorClientX: e.clientX,
          deltaMin: 0,
          moved: !1
        };
      }
    }, this._handlePinPointerUp = (e) => {
      if (!this._pinDrag || e.pointerId !== this._pinDrag.pointerId) return;
      const i = this._pinDrag;
      try {
        i.trackEl.releasePointerCapture(i.pointerId);
      } catch {
      }
      if (!i.moved || i.deltaMin === 0) {
        const s = this._eventsForDay(i.day)[i.index];
        if (setTimeout(() => {
          this._pinDrag = void 0;
        }, 0), !s) return;
        this._editing = {
          day: i.day,
          index: i.index,
          time: es(s.time),
          dataText: s.data ? JSON.stringify(s.data, null, 2) : ""
        };
        return;
      }
      const n = this._eventsForDay(i.day), o = n[i.index];
      if (o) {
        const r = i.origMin + i.deltaMin;
        if (!n.some((a, l) => l !== i.index && Be(a.time) === r)) {
          const a = { time: sn(r) };
          o.data && (a.data = o.data), n[i.index] = a, this._setEventsForDay(i.day, n);
        }
      }
      setTimeout(() => {
        this._pinDrag = void 0;
      }, 0);
    }, this._handleEditTimeChange = (e) => {
      this._updateEditingField("time", es(e.target.value));
    }, this._handleEditDataChange = (e) => {
      this._updateEditingField("dataText", e.target.value);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._load();
  }
  _handleEscape(e) {
    this._saving || (this._editing ? this._cancelEdit() : this.close());
  }
  // ------------------------------------------------------------
  // Load + save
  // ------------------------------------------------------------
  async _load() {
    var i, n, o;
    const e = M(this.hass);
    try {
      const r = (n = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : n[this.scheduleEntityId];
      if (!r) {
        this._loadError = u(e, "event_schedule.edit_dialog.error_not_found", {
          entity: this.scheduleEntityId
        });
        return;
      }
      const s = (o = r.attributes) == null ? void 0 : o.week_events, a = Jr();
      if (s && typeof s == "object" && !Array.isArray(s))
        for (const l of Object.keys(a)) {
          const c = s[l];
          Array.isArray(c) && (a[l] = c.filter((h) => h && typeof h == "object").map((h) => {
            const d = h, p = { time: String(d.time ?? "00:00:00") };
            return d.data && typeof d.data == "object" && !Array.isArray(d.data) && (p.data = d.data), p;
          }));
        }
      this._events = a;
    } catch (r) {
      this._loadError = String((r == null ? void 0 : r.message) || r);
    } finally {
      this._loading = !1;
    }
  }
  // ------------------------------------------------------------
  // Event list helpers
  // ------------------------------------------------------------
  /** Reads the events for a given day, transparently routing to the
   *  uniform template when same-for-all-days is enabled. */
  _eventsForDay(e) {
    if (this._sameForAll) return [...this._uniformEvents];
    const i = this._events[e];
    return Array.isArray(i) ? [...i] : [];
  }
  _setEventsForDay(e, i) {
    const n = Ld(i);
    this._sameForAll ? this._uniformEvents = n : this._events = { ...this._events, [e]: n }, this._dirty = !0;
  }
  // ------------------------------------------------------------
  // Click-to-insert interaction
  // ------------------------------------------------------------
  _pxToMin(e, i) {
    const n = e.getBoundingClientRect(), o = (i - n.left) / n.width, r = Math.max(0, Math.min(He, Math.round(o * He)));
    return Math.round(r / oi) * oi;
  }
  // ------------------------------------------------------------
  // Edit modal
  // ------------------------------------------------------------
  _updateEditingField(e, i) {
    this._editing && (this._editing = {
      ...this._editing,
      [e]: i,
      error: void 0,
      dataError: void 0
    });
  }
  _saveEdit() {
    if (!this._editing) return;
    const e = M(this.hass), { day: i, index: n, time: o, dataText: r } = this._editing, s = Be(o);
    if (isNaN(s)) {
      this._editing = { ...this._editing, error: u(e, "schedule.edit_dialog.err_time") };
      return;
    }
    let a;
    const l = r.trim();
    if (l)
      try {
        const p = JSON.parse(l);
        if (typeof p != "object" || p === null || Array.isArray(p))
          throw new Error("not an object");
        a = p;
      } catch {
        this._editing = {
          ...this._editing,
          dataError: u(e, "schedule.edit_dialog.err_data")
        };
        return;
      }
    const c = this._eventsForDay(i);
    if (c.some((p, _) => _ !== n && Be(p.time) === s)) {
      this._editing = { ...this._editing, error: u(e, "schedule.edit_dialog.err_overlap") };
      return;
    }
    const d = { time: sn(s, o) };
    a && (d.data = a), c[n] = d, this._setEventsForDay(i, c), this._editing = void 0;
  }
  _deleteEditing() {
    if (!this._editing) return;
    const { day: e, index: i } = this._editing, n = this._eventsForDay(e).filter((o, r) => r !== i);
    this._setEventsForDay(e, n), this._editing = void 0;
  }
  _cancelEdit() {
    this._editing = void 0;
  }
  // ------------------------------------------------------------
  // Title + lifecycle
  // ------------------------------------------------------------
  _resolveTitle() {
    var i, n, o, r;
    if (this.dialogTitle) return this.dialogTitle;
    const e = M(this.hass);
    return ((r = (o = (n = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : n[this.scheduleEntityId]) == null ? void 0 : o.attributes) == null ? void 0 : r.friendly_name) ?? u(e, "event_schedule.edit_dialog.default_title");
  }
  willUpdate() {
    const e = this._resolveTitle();
    this.dialogTitle !== e && !this.dialogTitle && (this.dialogTitle = e);
  }
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  renderBody() {
    const e = M(this.hass);
    if (this._loading)
      return f`<div class="msg">${u(e, "common.loading") || "Loading…"}</div>`;
    if (this._loadError)
      return f`<div class="msg error">${this._loadError}</div>`;
    const i = this._sameForAll ? [{ key: "monday", label: u(e, "schedule.edit_dialog.all_days") }] : rn.map((n) => ({ key: n.key, label: ne(e, n.dayIndex) }));
    return f`
      <div class="editor">
        <div class="pp-toolbar">
          <label class="pp-toggle">
            <input
              type="checkbox"
              .checked=${this._sameForAll}
              @change=${this._toggleSameForAll}
            />
            <span>${u(e, "schedule.edit_dialog.same_for_all")}</span>
          </label>
        </div>
        <div class="hour-header">
          <div class="day-col"></div>
          <div class="hour-labels">
            ${[0, 6, 12, 18, 24].map(
      (n) => f`<span style=${z({ left: `${n / 24 * 100}%` })}>${String(n).padStart(2, "0")}</span>`
    )}
          </div>
        </div>
        ${i.map((n) => this._renderDayRow(n.key, n.label))}
        <div class="hint">${u(e, "event_schedule.edit_dialog.hint_v2")}</div>
      </div>
    `;
  }
  renderFooter() {
    const e = M(this.hass);
    return f`
      <button class="ppd-btn flat" @click=${() => this.close()} ?disabled=${this._saving}>
        ${u(e, "common.cancel")}
      </button>
      <button
        class="ppd-btn primary"
        @click=${this._handleSave}
        ?disabled=${this._saving || !this._dirty || !!this._loadError}
      >
        ${this._saving ? u(e, "common.saving") || "Saving…" : u(e, "common.save") || "Save"}
      </button>
    `;
  }
  renderInner() {
    var o;
    if (!this._editing) return k;
    const e = M(this.hass), i = this._editing, n = ne(
      e,
      ((o = rn.find((r) => r.key === i.day)) == null ? void 0 : o.dayIndex) ?? 0
    );
    return f`
      <div class="inner-backdrop" @click=${() => this._cancelEdit()}>
        <div class="inner-dialog" @click=${(r) => r.stopPropagation()}>
          <header>
            <h3>${u(e, "event_schedule.edit_dialog.edit_title", { day: n })}</h3>
            <button class="close-x" @click=${() => this._cancelEdit()} aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="inner-body">
            <label class="field">
              <span>${u(e, "event_schedule.edit_dialog.time")}</span>
              <input
                type="time"
                .value=${i.time.slice(0, 5)}
                @change=${this._handleEditTimeChange}
              />
            </label>
            <label class="field">
              <span>
                ${u(e, "schedule.edit_dialog.data")}
                <small>${u(e, "schedule.edit_dialog.data_help")}</small>
              </span>
              <textarea
                rows="4"
                spellcheck="false"
                .value=${i.dataText}
                @input=${this._handleEditDataChange}
              ></textarea>
              ${i.dataError ? f`<span class="err">${i.dataError}</span>` : k}
            </label>
            ${i.error ? f`<div class="err">${i.error}</div>` : k}
          </div>
          <footer>
            <button class="ppd-btn danger" @click=${() => this._deleteEditing()}>
              ${u(e, "schedule.edit_dialog.delete")}
            </button>
            <div class="spacer"></div>
            <button class="ppd-btn flat" @click=${() => this._cancelEdit()}>
              ${u(e, "common.cancel")}
            </button>
            <button class="ppd-btn primary" @click=${() => this._saveEdit()}>
              ${u(e, "common.save")}
            </button>
          </footer>
        </div>
      </div>
    `;
  }
  _renderDayRow(e, i) {
    var o;
    let n = k;
    if (((o = this._cursor) == null ? void 0 : o.day) === e && !this._pinDrag) {
      const r = this._cursor.min / He * 100;
      n = f`
        <div class="pp-cursor-chip" style=${z({ left: `${r}%` })}>
          ${Qr(this._cursor.min)}
        </div>
      `;
    }
    return f`
      <div class="day-row">
        <div class="day-col">${i}</div>
        <div
          class="day-track"
          data-day=${e}
          @click=${this._handleTrackClick}
          @pointermove=${this._handleTrackPointerMove}
          @pointerleave=${this._handleTrackPointerLeave}
          @pointerup=${this._handlePinPointerUp}
        >
          ${this._eventsForDay(e).map((r, s) => {
      var d, p;
      const a = Be(r.time), l = ((d = this._pinDrag) == null ? void 0 : d.day) === e && this._pinDrag.index === s, c = l ? a + (((p = this._pinDrag) == null ? void 0 : p.deltaMin) ?? 0) : a, h = c / He * 100;
      return f`
              <div
                class="pp-pin ${l ? "moving" : ""}"
                data-day=${e}
                data-index=${s}
                style=${z({ left: `${h}%` })}
                title="${Qr(c)}"
                @pointerdown=${this._handlePinPointerDown}
              ></div>
            `;
    })}
          ${n}
        </div>
      </div>
    `;
  }
};
go.styles = [
  le.styles,
  Z`
      .msg {
        padding: 32px 8px;
        text-align: center;
        color: var(--secondary-text-color, #757575);
        font-size: 14px;
      }
      .msg.error { color: var(--error-color, #c62828); }

      .editor { display: flex; flex-direction: column; gap: 6px; }
      .hour-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: 2px;
        font-size: 10px;
        color: var(--secondary-text-color, #757575);
      }
      .day-col {
        flex: none;
        width: 44px;
        font-size: 12px;
        font-weight: 600;
        color: var(--primary-text-color);
        text-align: left;
      }
      .hour-labels { position: relative; flex: 1; height: 14px; }
      .hour-labels span { position: absolute; transform: translateX(-50%); }
      .hour-labels span:first-child { transform: translateX(0); }
      .hour-labels span:last-child { transform: translateX(-100%); }

      .day-row { display: flex; align-items: center; gap: 8px; }
      .day-track {
        position: relative;
        flex: 1;
        height: 38px;
        border-radius: 8px;
        background:
          linear-gradient(to right,
            transparent 0%, transparent calc(25% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) calc(25% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) 25%,
            transparent 25%, transparent calc(50% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) calc(50% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) 50%,
            transparent 50%, transparent calc(75% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) calc(75% - 1px),
            rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08) 75%,
            transparent 75%),
          rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
        cursor: copy;
        /* overflow visible so the cursor-time chip can render above
         * the track. Pin positions are clamped, nothing else leaks. */
        overflow: visible;
        user-select: none;
      }

      .pp-pin {
        position: absolute;
        top: 50%;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: var(--primary-color, #03a9f4);
        box-shadow: 0 0 0 2px var(--card-background-color, #fff);
        transform: translate(-50%, -50%);
        cursor: grab;
        touch-action: none;
        transition: transform 0.12s ease;
      }
      .pp-pin:hover {
        transform: translate(-50%, -50%) scale(1.15);
      }
      .pp-pin.moving {
        cursor: grabbing;
        opacity: 0.9;
      }

      /* ----- Toolbar (same-for-all toggle) ----- */
      .pp-toolbar {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 2px 8px;
      }
      .pp-toggle {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--primary-text-color);
        cursor: pointer;
        user-select: none;
      }
      .pp-toggle input {
        accent-color: var(--primary-color, #03a9f4);
        cursor: pointer;
      }

      /* ----- Cursor time hint while hovering a track ----- */
      .pp-cursor-chip {
        position: absolute;
        top: -22px;
        transform: translateX(-50%);
        background: var(--primary-text-color);
        color: var(--card-background-color, #fff);
        font-size: 10px;
        font-weight: 600;
        padding: 2px 6px;
        border-radius: 4px;
        pointer-events: none;
        white-space: nowrap;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
        z-index: 5;
      }
      .pp-cursor-chip::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 3px solid transparent;
        border-top-color: var(--primary-text-color);
      }

      .hint {
        margin-top: 10px;
        font-size: 11px;
        color: var(--secondary-text-color, #757575);
        line-height: 1.4;
      }

      /* ----- Inner edit modal ----- */
      .inner-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        animation: ppd-fade-in 0.14s ease;
        z-index: 10;
      }
      .inner-dialog {
        background: var(--card-background-color, var(--primary-background-color, #fff));
        border-radius: 14px;
        width: min(100%, 420px);
        max-height: calc(100vh - 120px);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: ppd-pop-in 0.18s cubic-bezier(0.2, 0.9, 0.3, 1.1);
      }
      .inner-dialog header {
        padding: 14px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .inner-dialog header h3 { margin: 0; flex: 1; font-size: 16px; font-weight: 600; }
      .inner-dialog .close-x {
        border: none;
        background: transparent;
        cursor: pointer;
        width: 32px; height: 32px;
        border-radius: 50%;
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .inner-dialog footer {
        padding: 12px 16px;
        display: flex;
        gap: 8px;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .inner-body {
        padding: 14px 20px;
        overflow-y: auto;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .field { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: var(--primary-text-color); }
      .field > span { font-weight: 500; }
      .field small { font-weight: 400; color: var(--secondary-text-color); margin-left: 6px; }
      .field input[type="time"], .field textarea {
        font: inherit;
        font-size: 14px;
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        background: var(--secondary-background-color, #fafafa);
        color: var(--primary-text-color);
      }
      .field textarea {
        resize: vertical;
        min-height: 80px;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 12px;
      }
      .err { color: var(--error-color, #c62828); font-size: 12px; }
      .spacer { flex: 1; }

      @media (max-width: 700px) {
        .day-col { width: 36px; font-size: 11px; }
        .day-track { height: 34px; }
      }
    `
];
let q = go;
de([
  I({ attribute: !1 })
], q.prototype, "hass");
de([
  I({ type: String })
], q.prototype, "scheduleEntityId");
de([
  C()
], q.prototype, "_events");
de([
  C()
], q.prototype, "_uniformEvents");
de([
  C()
], q.prototype, "_sameForAll");
de([
  C()
], q.prototype, "_loading");
de([
  C()
], q.prototype, "_loadError");
de([
  C()
], q.prototype, "_saving");
de([
  C()
], q.prototype, "_dirty");
de([
  C()
], q.prototype, "_editing");
de([
  C()
], q.prototype, "_pinDrag");
de([
  C()
], q.prototype, "_cursor");
function Be(t) {
  if (!t || typeof t != "string") return 0;
  const e = t.split(":"), i = parseInt(e[0] ?? "0", 10), n = parseInt(e[1] ?? "0", 10), o = parseInt(e[2] ?? "0", 10);
  return isNaN(i) || isNaN(n) ? 0 : i * 60 + n + (isNaN(o) ? 0 : o / 60);
}
function sn(t, e) {
  const i = Math.max(0, Math.min(He, t)), n = Math.floor(i / 60), o = Math.floor(i % 60);
  let r = 0;
  if (e) {
    const s = e.split(":"), a = parseInt(s[2] ?? "0", 10);
    isNaN(a) || (r = a);
  }
  return n === 24 && o === 0 && r === 0 ? "24:00:00" : `${String(n).padStart(2, "0")}:${String(o).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function Qr(t) {
  const e = Math.max(0, Math.min(He, t)), i = Math.floor(e / 60), n = e % 60;
  return `${String(i).padStart(2, "0")}:${String(n).padStart(2, "0")}`;
}
function es(t) {
  if (!t) return "00:00:00";
  const e = t.split(":"), i = (e[0] ?? "00").padStart(2, "0"), n = (e[1] ?? "00").padStart(2, "0"), o = (e[2] ?? "00").padStart(2, "0");
  return `${i}:${n}:${o}`;
}
function Ld(t) {
  return t.filter((e) => typeof (e == null ? void 0 : e.time) == "string").slice().sort((e, i) => Be(e.time) - Be(i.time));
}
customElements.get(Un) || customElements.define(Un, q);
function Hd(t) {
  if (!t.scheduleEntityId) return;
  const e = document.createElement(Un);
  e.hass = t.hass, e.scheduleEntityId = t.scheduleEntityId, t.title && (e.dialogTitle = t.title), document.body.appendChild(e);
}
var Bd = Object.defineProperty, Fd = Object.getOwnPropertyDescriptor, ao = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Fd(e, i) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = (n ? s(e, i, o) : s(o)) || o);
  return n && o && Bd(e, i, o), o;
};
let bi = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => this.labelMap()[t.name ?? ""] ?? t.name ?? "", this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM") return;
      const i = t.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i)) return;
      const n = { ...i };
      this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: { ...n, type: "custom:power-pilz-event-schedule-card" } },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(t) {
    this._config = {
      ...t,
      show_day_selector: t.show_day_selector ?? !0,
      show_mode_control: t.show_mode_control ?? !0,
      show_trigger_button: t.show_trigger_button ?? !0,
      show_now_indicator: t.show_now_indicator ?? !0,
      show_time_labels: t.show_time_labels ?? !0,
      type: "custom:power-pilz-event-schedule-card"
    };
  }
  buildSchema() {
    const t = M(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: u(t, "event_schedule.editor.section_entities"),
        icon: "mdi:connection",
        expanded: !0,
        schema: [
          {
            name: "entity",
            selector: {
              entity: {
                filter: {
                  domain: "select",
                  integration: "powerpilz_companion"
                }
              }
            },
            helper: u(t, "event_schedule.editor.entity_help"),
            description: u(t, "event_schedule.editor.entity_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "event_schedule.editor.section_identity"),
        icon: "mdi:card-text-outline",
        expanded: !1,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "name", selector: { text: {} } },
              { name: "subtitle", selector: { text: {} } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "icon",
                selector: { icon: {} },
                context: { icon_entity: "entity" }
              },
              {
                name: "icon_color",
                selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "event_schedule.editor.section_layout"),
        icon: "mdi:page-layout-body",
        expanded: !1,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "card_layout",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: [
                      { label: u(t, "event_schedule.editor.layout_horizontal"), value: "horizontal" },
                      { label: u(t, "event_schedule.editor.layout_vertical"), value: "vertical" }
                    ]
                  }
                }
              },
              {
                name: "time_window",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: [
                      { label: u(t, "event_schedule.editor.tw_24"), value: "24" },
                      { label: u(t, "event_schedule.editor.tw_12"), value: "12" },
                      { label: u(t, "event_schedule.editor.tw_6"), value: "6" }
                    ]
                  }
                }
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "event_schedule.editor.section_appearance"),
        icon: "mdi:palette-outline",
        expanded: !1,
        schema: [
          {
            name: "active_color",
            selector: { ui_color: { include_state: !1, include_none: !0, default_color: "primary" } }
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "event_schedule.editor.section_display"),
        icon: "mdi:tune-variant",
        expanded: !1,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "show_day_selector", selector: { boolean: {} } },
              { name: "show_mode_control", selector: { boolean: {} } },
              { name: "show_trigger_button", selector: { boolean: {} } },
              { name: "show_now_indicator", selector: { boolean: {} } },
              { name: "show_time_labels", selector: { boolean: {} } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "event_schedule.editor.section_actions"),
        icon: "mdi:gesture-tap",
        expanded: !1,
        schema: [
          { name: "tap_action", selector: { ui_action: {} } },
          {
            name: "hold_action",
            selector: { ui_action: {} }
          },
          { name: "double_tap_action", selector: { ui_action: {} } }
        ]
      }
    ];
  }
  labelMap() {
    const t = M(this.hass);
    return {
      entity: u(t, "event_schedule.editor.entity"),
      name: u(t, "event_schedule.editor.name"),
      subtitle: u(t, "event_schedule.editor.subtitle"),
      icon: u(t, "event_schedule.editor.icon"),
      icon_color: u(t, "event_schedule.editor.icon_color"),
      card_layout: u(t, "event_schedule.editor.card_layout"),
      time_window: u(t, "event_schedule.editor.time_window"),
      active_color: u(t, "event_schedule.editor.active_color"),
      show_day_selector: u(t, "event_schedule.editor.show_day_selector"),
      show_mode_control: u(t, "event_schedule.editor.show_mode_control"),
      show_trigger_button: u(t, "event_schedule.editor.show_trigger_button"),
      show_now_indicator: u(t, "event_schedule.editor.show_now_indicator"),
      show_time_labels: u(t, "event_schedule.editor.show_time_labels"),
      tap_action: u(t, "event_schedule.editor.tap_action"),
      hold_action: u(t, "event_schedule.editor.hold_action"),
      double_tap_action: u(t, "event_schedule.editor.double_tap_action")
    };
  }
  render() {
    return !this.hass || !this._config ? k : f`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Te}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this.buildSchema()}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
ao([
  I({ attribute: !1 })
], bi.prototype, "hass", 2);
ao([
  C()
], bi.prototype, "_config", 2);
bi = ao([
  ce("power-pilz-event-schedule-card-editor")
], bi);
var Vd = Object.defineProperty, at = (t, e, i, n) => {
  for (var o = void 0, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = s(e, i, o) || o);
  return o && Vd(e, i, o), o;
};
const ts = "powerpilz-event-schedule-edit", an = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
], vo = class vo extends L {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._selectedDay = (/* @__PURE__ */ new Date()).getDay(), this._tick = 0, this.handleDaySelect = (e) => {
      e.stopPropagation();
      const i = e.currentTarget;
      if (!(i instanceof HTMLElement)) return;
      const n = parseInt(i.dataset.day ?? "0", 10);
      this._selectedDay = n;
    }, this.handleModeChange = async (e) => {
      var l;
      e.stopPropagation();
      const i = this._modeEntityId;
      if (this.isEditorPreview() || !i) return;
      const n = R(this.hass, i);
      if (!n) return;
      const o = ((l = n.attributes) == null ? void 0 : l.options) ?? [];
      if (o.length === 0) return;
      const s = (o.indexOf(n.state) + 1) % o.length, a = i.split(".")[0];
      await this.hass.callService(a, "select_option", {
        entity_id: i,
        option: o[s]
      });
    }, this.handleTriggerNow = async (e) => {
      var r, s, a;
      e.stopPropagation();
      const i = this._scheduleEntityId;
      if (this.isEditorPreview() || !i) return;
      const n = (a = (s = (r = this.hass) == null ? void 0 : r.states) == null ? void 0 : s[i]) == null ? void 0 : a.attributes;
      if ((n == null ? void 0 : n.pulse_running) === !0) return;
      const o = n == null ? void 0 : n.pulse_blocked_until;
      if (typeof o == "string") {
        const l = Date.parse(o);
        if (Number.isFinite(l) && l > Date.now()) return;
      }
      await this.hass.callService("powerpilz_companion", "trigger_event_now", {
        entity_id: i
      });
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-event-schedule-card-editor");
  }
  static async getStubConfig(e) {
    const i = (e == null ? void 0 : e.states) ?? {};
    return {
      type: "custom:power-pilz-event-schedule-card",
      entity: Object.keys(i).find((r) => {
        var a;
        if (!r.startsWith("select.")) return !1;
        const s = (a = i[r]) == null ? void 0 : a.attributes;
        return (s == null ? void 0 : s.schedule_kind) === "events";
      }) ?? ""
    };
  }
  setConfig(e) {
    this._config = {
      ...e,
      entity: e.entity ?? "",
      icon: e.icon ?? "mdi:bell-ring-outline",
      name: e.name ?? u(M(this.hass), "event_schedule.default_name"),
      time_window: e.time_window ?? "24",
      show_day_selector: e.show_day_selector ?? !0,
      show_mode_control: e.show_mode_control ?? !0,
      show_trigger_button: e.show_trigger_button ?? !0,
      show_now_indicator: e.show_now_indicator ?? !0,
      show_time_labels: e.show_time_labels ?? !0
    };
  }
  get _scheduleEntityId() {
    var e;
    return ((e = this._config) == null ? void 0 : e.entity) || void 0;
  }
  get _modeEntityId() {
    return this._scheduleEntityId;
  }
  getCardSize() {
    var e;
    return ((e = this._config) == null ? void 0 : e.show_day_selector) !== !1 ? 3 : 2;
  }
  getGridOptions() {
    var i;
    const e = ((i = this._config) == null ? void 0 : i.show_day_selector) !== !1;
    return {
      columns: 6,
      rows: e ? 3 : 2,
      min_columns: 3,
      min_rows: e ? 2 : 1,
      max_rows: e ? 4 : 3
    };
  }
  getLayoutOptions() {
    return { grid_columns: 2, grid_rows: this.getCardSize() };
  }
  firstUpdated() {
    this._bindActions();
  }
  updated(e) {
    (!this._actionCleanup || e.has("_config")) && this._bindActions();
  }
  _bindActions() {
    var s, a, l, c, h, d;
    const e = this.renderRoot.querySelector("ha-card");
    if (!e) return;
    (s = this._actionCleanup) == null || s.destroy();
    const i = !!((l = (a = this._config) == null ? void 0 : a.hold_action) != null && l.action) && this._config.hold_action.action !== "none", n = !((h = (c = this._config) == null ? void 0 : c.hold_action) != null && h.action), o = i || n, r = !!((d = this._config) != null && d.double_tap_action) && this._config.double_tap_action.action !== void 0 && this._config.double_tap_action.action !== "none";
    this._actionCleanup = ot(
      e,
      {
        onTap: () => this._fireAction("tap"),
        onHold: () => this._fireAction("hold"),
        onDoubleTap: () => this._fireAction("double_tap")
      },
      { hasHold: o, hasDoubleTap: r }
    );
  }
  _fireAction(e) {
    if (this.isEditorPreview() || !this._config) return;
    const i = `${e}_action`;
    let n = this._config[i];
    if (e === "tap" && (!n || !n.action)) {
      this._modeEntityId && this.handleModeChange(new Event("tap"));
      return;
    }
    if (e === "hold" && (!n || !n.action) && (n = { action: ts }), !(!n || !n.action || n.action === "none")) {
      if (n.action === ts) {
        this._openEditDialog();
        return;
      }
      this.dispatchEvent(
        new CustomEvent("hass-action", {
          detail: { config: this._config, action: e },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  _openEditDialog() {
    const e = this._scheduleEntityId;
    !e || !this.hass || Hd({ hass: this.hass, scheduleEntityId: e });
  }
  connectedCallback() {
    super.connectedCallback(), this._tickTimer || (this._tickTimer = window.setInterval(() => {
      this._tick++;
    }, 5e3));
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), this._tickTimer && (clearInterval(this._tickTimer), this._tickTimer = void 0), (e = this._actionCleanup) == null || e.destroy(), this._actionCleanup = void 0;
  }
  isEditorPreview() {
    return this.preview || this.editMode;
  }
  iconStyle(e) {
    return xe(e);
  }
  _weekEvents() {
    var o, r, s;
    const e = this._scheduleEntityId;
    if (!e) return {};
    const i = (s = (r = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : r[e]) == null ? void 0 : s.attributes, n = i == null ? void 0 : i.week_events;
    return n && typeof n == "object" && !Array.isArray(n) ? n : {};
  }
  dayKey(e) {
    return an[e] ?? "monday";
  }
  eventsForDay(e) {
    const n = this._weekEvents()[this.dayKey(e)];
    return Array.isArray(n) ? n : [];
  }
  timeToMinutes(e) {
    const i = (e || "").split(":"), n = parseInt(i[0] ?? "0", 10), o = parseInt(i[1] ?? "0", 10);
    return (isNaN(n) ? 0 : n) * 60 + (isNaN(o) ? 0 : o);
  }
  nowMinutes() {
    const e = /* @__PURE__ */ new Date();
    return e.getHours() * 60 + e.getMinutes();
  }
  resolvedTimeWindow() {
    var s;
    const e = ((s = this._config) == null ? void 0 : s.time_window) ?? "24";
    if (e === "24") return { start: 0, end: 1440 };
    const i = e === "12" ? 360 : 180, n = this.nowMinutes(), o = Math.max(0, n - i), r = Math.min(1440, n + i);
    return { start: o, end: r };
  }
  resolvedActiveColor() {
    var i;
    const e = pe((i = this._config) == null ? void 0 : i.active_color);
    return e ? `rgb(${e})` : "var(--primary-color, rgb(3, 169, 244))";
  }
  modeValue() {
    var r;
    const e = this._modeEntityId;
    if (!e) return "auto";
    const i = R(this.hass, e), n = (i == null ? void 0 : i.state) ?? "auto", o = (r = i == null ? void 0 : i.attributes) == null ? void 0 : r.mode_names;
    if (o && typeof o == "object") {
      for (const [s, a] of Object.entries(o))
        if (typeof a == "string" && a === n) return s;
    }
    return n;
  }
  modeLabel(e) {
    var n;
    const i = this._modeEntityId;
    if (i) {
      const o = R(this.hass, i), r = (n = o == null ? void 0 : o.attributes) == null ? void 0 : n.mode_names;
      if (r && typeof r == "object") {
        const s = r[e.toLowerCase()];
        if (typeof s == "string" && s) return s;
      }
    }
    return e;
  }
  renderTimeline() {
    const e = this._config, { start: i, end: n } = this.resolvedTimeWindow(), o = n - i, r = this.eventsForDay(this._selectedDay), s = this.resolvedActiveColor();
    this._tick;
    const a = this.nowMinutes(), l = this._selectedDay === (/* @__PURE__ */ new Date()).getDay(), c = e.show_now_indicator !== !1 && l && a >= i && a <= n, h = e.show_time_labels !== !1, d = [];
    if (h) {
      const p = Math.ceil(i / 60), _ = Math.floor(n / 60), m = o > 720 ? 6 : o > 360 ? 3 : 2;
      for (let g = p; g <= _; g += m) {
        const y = g * 60;
        y >= i && y <= n && d.push({ hour: g >= 24 ? 0 : g, pct: (y - i) / o * 100 });
      }
    }
    return f`
      <div class="timeline-container">
        ${h ? f`
              <div class="time-labels">
                ${d.map(
      (p) => f`<span class="time-label" style=${z({ left: `${p.pct}%` })}>${String(p.hour).padStart(2, "0")}</span>`
    )}
              </div>
            ` : k}
        <div class="timeline-track">
          ${r.map((p) => {
      const _ = this.timeToMinutes(p.time);
      if (_ < i || _ > n) return k;
      const m = (_ - i) / o * 100;
      return f`
              <div
                class="timeline-pin"
                style=${z({
        left: `${m}%`,
        "background-color": s
      })}
              ></div>
            `;
    })}
          ${c ? f`
                <div
                  class="now-indicator"
                  style=${z({
      left: `${(a - i) / o * 100}%`,
      "background-color": s
    })}
                ></div>
              ` : k}
        </div>
      </div>
    `;
  }
  renderDaySelector() {
    const e = (/* @__PURE__ */ new Date()).getDay();
    return f`
      <div class="day-selector">
        ${an.map((i, n) => f`
          <button
            type="button"
            class="day-btn ${n === this._selectedDay ? "active" : ""} ${n === e ? "today" : ""}"
            data-day=${n}
            @click=${this.handleDaySelect}
          >
            ${ne(M(this.hass), n)}
          </button>
        `)}
      </div>
    `;
  }
  renderModeButton() {
    const e = this.modeValue(), n = e.toLowerCase() === "off" ? "mdi:power-off" : "mdi:clock-outline", o = this.modeLabel(e);
    return f`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${e}">
        <ha-icon .icon=${n}></ha-icon>
        <span class="mode-label">${o}</span>
      </button>
    `;
  }
  /** Demo card for the dashboard card-picker preview (preview=true,
   *  no entity yet). */
  _renderDemo() {
    const e = this._config, { start: i, end: n } = this.resolvedTimeWindow(), o = n - i, r = this.resolvedActiveColor(), s = this.nowMinutes(), a = e.show_now_indicator !== !1 && s >= i && s <= n, l = e.show_time_labels !== !1, c = e.show_day_selector !== !1, h = e.card_layout === "vertical", d = [450, 720, 1155], p = [];
    if (l) {
      const g = Math.ceil(i / 60), y = Math.floor(n / 60), b = o > 720 ? 6 : o > 360 ? 3 : 2;
      for (let v = g; v <= y; v += b) {
        const x = v * 60;
        x >= i && x <= n && p.push({ hour: v >= 24 ? 0 : v, pct: (x - i) / o * 100 });
      }
    }
    const _ = (/* @__PURE__ */ new Date()).getDay(), m = M(this.hass);
    return f`
      <ha-card>
        <div class="container ${h ? "vertical" : "horizontal"}">
          <div class="row row-header">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${z(this.iconStyle(e.icon_color))}>
                  <ha-icon .icon=${e.icon ?? "mdi:bell-ring-outline"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${e.name || u(m, "event_schedule.default_name")}</div>
                <div class="secondary">${e.subtitle || "Auto"}</div>
              </div>
              <button type="button" class="trigger-now-btn" disabled>
                <ha-icon icon="mdi:play"></ha-icon>
              </button>
              <button type="button" class="mode-btn" disabled>
                <ha-icon icon="mdi:clock-outline"></ha-icon>
                <span class="mode-label">Auto</span>
              </button>
            </div>
          </div>
          ${c ? f`
                <div class="row row-days">
                  <div class="day-selector">
                    ${an.map((g, y) => f`
                      <button type="button" class="day-btn ${y === _ ? "active today" : ""}" disabled>
                        ${ne(m, y)}
                      </button>
                    `)}
                  </div>
                </div>
              ` : k}
          <div class="row row-timeline">
            <div class="timeline-container">
              ${l ? f`
                    <div class="time-labels">
                      ${p.map(
      (g) => f`<span class="time-label" style=${z({ left: `${g.pct}%` })}>${String(g.hour).padStart(2, "0")}</span>`
    )}
                    </div>
                  ` : k}
              <div class="timeline-track">
                ${d.map((g) => {
      if (g < i || g > n) return k;
      const y = (g - i) / o * 100;
      return f`
                    <div class="timeline-pin" style=${z({
        left: `${y}%`,
        "background-color": r
      })}></div>
                  `;
    })}
                ${a ? f`
                      <div class="now-indicator" style=${z({
      left: `${(s - i) / o * 100}%`,
      "background-color": r
    })}></div>
                    ` : k}
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderTriggerNowButton() {
    var h, d, p;
    const e = this._scheduleEntityId, i = e ? (p = (d = (h = this.hass) == null ? void 0 : h.states) == null ? void 0 : d[e]) == null ? void 0 : p.attributes : void 0, n = (i == null ? void 0 : i.pulse_running) === !0, o = i == null ? void 0 : i.pulse_blocked_until, r = typeof o == "string" ? Date.parse(o) : NaN, s = Number.isFinite(r) && r > Date.now(), a = n || s, l = M(this.hass);
    let c = u(l, "event_schedule.trigger_now");
    if (n)
      c = u(l, "event_schedule.trigger_now_blocked_running");
    else if (s) {
      const _ = new Date(r), m = String(_.getHours()).padStart(2, "0"), g = String(_.getMinutes()).padStart(2, "0"), y = String(_.getSeconds()).padStart(2, "0");
      c = u(l, "event_schedule.trigger_now_blocked_cooldown", {
        time: `${m}:${g}:${y}`
      });
    }
    return f`
      <button
        type="button"
        class="trigger-now-btn"
        ?disabled=${a}
        @click=${this.handleTriggerNow}
        title=${c}
      >
        <ha-icon icon="mdi:play"></ha-icon>
      </button>
    `;
  }
  render() {
    var _, m;
    if (!this._config) return f`<ha-card>${u(M(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return f``;
    if (!this._scheduleEntityId) {
      if (this.preview) return this._renderDemo();
      const g = M(this.hass);
      return f`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:bell-ring-outline"></ha-icon>
            <div class="placeholder-text">${u(g, "event_schedule.placeholder")}</div>
          </div>
        </ha-card>
      `;
    }
    const e = this._config, i = (m = (_ = R(this.hass, this._scheduleEntityId)) == null ? void 0 : _.attributes) == null ? void 0 : m.friendly_name, n = this.modeValue(), o = e.subtitle || this.modeLabel(n), r = e.show_day_selector !== !1, s = e.show_mode_control !== !1 && !!this._modeEntityId, a = e.show_trigger_button !== !1, l = e.show_time_labels !== !1, c = e.card_layout === "vertical", h = !c && !r && !s && !a && !l, d = this.iconStyle(e.icon_color), p = f`
      <div class="state-item">
        <div class="icon-wrap">
          <div class="icon-shape" style=${z(d)}>
            <ha-icon .icon=${e.icon ?? "mdi:bell-ring-outline"}></ha-icon>
          </div>
        </div>
        <div class="info">
          <div class="primary">${e.name || i || u(M(this.hass), "event_schedule.default_name")}</div>
          <div class="secondary">${o}</div>
        </div>
        ${a ? this.renderTriggerNowButton() : k}
        ${s ? this.renderModeButton() : k}
      </div>
    `;
    return f`
      <ha-card>
        <div class="container ${c ? "vertical" : "horizontal"}${h ? " compact-inline" : ""}">
          <div class="row row-header">${p}</div>
          ${r ? f`<div class="row row-days">${this.renderDaySelector()}</div>` : k}
          <div class="row row-timeline">${this.renderTimeline()}</div>
        </div>
      </ha-card>
    `;
  }
};
vo.styles = [
  qs,
  Z`
      /* Events-mode marker — small circle vertically centered in the
       * track, visually distinct from blocks-mode rectangles. */
      .timeline-pin {
        position: absolute;
        top: 50%;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        box-shadow: 0 0 0 2px var(--card-background-color, #fff);
      }

      /* Manual "trigger now" button — disabled while a pulse is
       * running or in cool-down. */
      .trigger-now-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
        border-radius: calc(var(--control-border-radius) - 2px);
        height: var(--icon-size);
        width: var(--icon-size);
        min-width: var(--icon-size);
        padding: 0;
        margin: 0 6px 0 auto;
        box-sizing: border-box;
        cursor: pointer;
        color: var(--primary-text-color);
        transition: background-color 0.2s, opacity 0.2s;
        -webkit-tap-highlight-color: transparent;
        flex: none;
      }
      .trigger-now-btn[disabled] { opacity: 0.4; cursor: not-allowed; }
      .trigger-now-btn + .mode-btn { margin-left: 0; }
      .trigger-now-btn ha-icon { --mdc-icon-size: 18px; display: flex; line-height: 0; }
    `
];
let Ce = vo;
at([
  I({ attribute: !1 })
], Ce.prototype, "hass");
at([
  I({ type: Boolean })
], Ce.prototype, "preview");
at([
  I({ type: Boolean })
], Ce.prototype, "editMode");
at([
  I({ reflect: !0, type: String })
], Ce.prototype, "layout");
at([
  C()
], Ce.prototype, "_config");
at([
  C()
], Ce.prototype, "_selectedDay");
at([
  C()
], Ce.prototype, "_tick");
customElements.get("power-pilz-event-schedule-card") || customElements.define("power-pilz-event-schedule-card", Ce);
var Ud = Object.defineProperty, Wd = Object.getOwnPropertyDescriptor, lo = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Wd(e, i) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = (n ? s(e, i, o) : s(o)) || o);
  return n && o && Ud(e, i, o), o;
};
let wi = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => this.labelMap()[t.name ?? ""] ?? t.name ?? "", this.computeHelper = (t) => this.helperMap()[t.name ?? ""], this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM") return;
      const i = t.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i)) return;
      const n = { ...i };
      n.use_companion !== !1 ? (delete n.switch_entity, delete n.on_datetime_entity, delete n.off_datetime_entity, delete n.active_entity) : delete n.companion_entity, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: { ...n, type: "custom:power-pilz-timer-card" } },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(t) {
    const e = t.use_companion !== void 0 ? t.use_companion !== !1 : !t.switch_entity;
    this._config = {
      ...t,
      use_companion: e,
      type: "custom:power-pilz-timer-card"
    };
  }
  buildSchema() {
    var n;
    const t = M(this.hass), e = ((n = this._config) == null ? void 0 : n.use_companion) !== !1;
    return [
      {
        type: "expandable",
        name: "",
        title: u(t, "timer.editor.section_entities"),
        icon: "mdi:connection",
        expanded: !0,
        schema: [
          {
            name: "use_companion",
            selector: { boolean: {} },
            helper: u(t, "timer.editor.use_companion_help"),
            description: u(t, "timer.editor.use_companion_help")
          },
          ...e ? [
            {
              name: "companion_entity",
              selector: {
                entity: {
                  filter: {
                    domain: "switch",
                    integration: "powerpilz_companion"
                  }
                }
              },
              helper: u(t, "timer.editor.companion_help"),
              description: u(t, "timer.editor.companion_help")
            }
          ] : [
            {
              name: "switch_entity",
              selector: { entity: { filter: { domain: ["switch", "light", "input_boolean", "climate", "fan"] } } },
              helper: u(t, "timer.editor.switch_help"),
              description: u(t, "timer.editor.switch_help")
            },
            {
              name: "on_datetime_entity",
              selector: { entity: { filter: { domain: "input_datetime" } } },
              helper: u(t, "timer.editor.on_help"),
              description: u(t, "timer.editor.on_help")
            },
            {
              name: "off_datetime_entity",
              selector: { entity: { filter: { domain: "input_datetime" } } },
              helper: u(t, "timer.editor.off_help"),
              description: u(t, "timer.editor.off_help")
            },
            {
              name: "active_entity",
              selector: { entity: { filter: { domain: "input_boolean" } } },
              helper: u(t, "timer.editor.active_help"),
              description: u(t, "timer.editor.active_help")
            }
          ]
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "timer.editor.section_identity"),
        icon: "mdi:card-text-outline",
        expanded: !1,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "name", selector: { text: {} } },
              { name: "subtitle", selector: { text: {} } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              {
                name: "icon",
                selector: { icon: {} },
                context: { icon_entity: e ? "companion_entity" : "switch_entity" }
              },
              {
                name: "icon_color",
                selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "timer.editor.section_appearance"),
        icon: "mdi:palette-outline",
        expanded: !1,
        schema: [
          {
            name: "active_color",
            selector: { ui_color: { include_state: !1, include_none: !0, default_color: "primary" } },
            helper: u(t, "timer.editor.active_color_help"),
            description: u(t, "timer.editor.active_color_help")
          }
        ]
      }
    ];
  }
  labelMap() {
    const t = M(this.hass);
    return {
      use_companion: u(t, "timer.editor.use_companion"),
      companion_entity: u(t, "timer.editor.companion_entity"),
      switch_entity: u(t, "timer.editor.switch_entity"),
      on_datetime_entity: u(t, "timer.editor.on_datetime_entity"),
      off_datetime_entity: u(t, "timer.editor.off_datetime_entity"),
      active_entity: u(t, "timer.editor.active_entity"),
      name: u(t, "timer.editor.name"),
      subtitle: u(t, "timer.editor.subtitle"),
      icon: u(t, "timer.editor.icon"),
      icon_color: u(t, "timer.editor.icon_color"),
      active_color: u(t, "timer.editor.active_color")
    };
  }
  helperMap() {
    const t = M(this.hass);
    return {
      use_companion: u(t, "timer.editor.use_companion_help"),
      companion_entity: u(t, "timer.editor.companion_help"),
      switch_entity: u(t, "timer.editor.switch_help"),
      on_datetime_entity: u(t, "timer.editor.on_help"),
      off_datetime_entity: u(t, "timer.editor.off_help"),
      active_entity: u(t, "timer.editor.active_help"),
      active_color: u(t, "timer.editor.active_color_help")
    };
  }
  render() {
    return !this.hass || !this._config ? k : f`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Te}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this.buildSchema()}
        .computeLabel=${this.computeLabel}
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
lo([
  I({ attribute: !1 })
], wi.prototype, "hass", 2);
lo([
  C()
], wi.prototype, "_config", 2);
wi = lo([
  ce("power-pilz-timer-card-editor")
], wi);
var jd = Object.defineProperty, re = (t, e, i, n) => {
  for (var o = void 0, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = s(e, i, o) || o);
  return o && jd(e, i, o), o;
};
const is = "power-pilz-timer-picker-portal-style", ri = "powerpilz_companion";
function ns(t) {
  const e = new Date(t.includes("T") ? t : t.replace(" ", "T"));
  return isNaN(e.getTime()) ? null : e;
}
const bo = class bo extends L {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._pickingOn = !1, this._pickingOff = !1, this._skippedOn = !1, this._pickOnOption = "", this._pickOffOption = "", this._confirmingCancel = !1, this._pickDay = 0, this._pickHour = 12, this.handleOpenPicker = (e) => {
      e.stopPropagation(), !this.isEditorPreview() && (this._pickingOn || this._pickingOff || (this._pickDay = 0, this._pickHour = (/* @__PURE__ */ new Date()).getHours() + 1, this._pickHour > 23 && (this._pickHour = 0, this._pickDay = 1), this._skippedOn = !1, this._pickOnOption = this._storedOnOption(), this._pickOffOption = this._storedOffOption(), this._hasOnSupport() ? this._pickingOn = !0 : this._pickingOff = !0));
    }, this.handleBadgeClick = (e) => {
      e.stopPropagation(), !this.isEditorPreview() && (this._confirmingCancel = !0);
    }, this.handleConfirmCancel = async () => {
      this._confirmingCancel = !1, await this.cancelTimer();
    }, this.handleDismissConfirm = () => {
      this._confirmingCancel = !1;
    }, this.handleSetOn = async () => {
      if (!this._config) return;
      const e = this.buildDatetime(this._pickDay, this._pickHour), i = this._targetHasOptions() ? this._pickOnOption : void 0;
      await this._writeOnDatetime(e, i), this._skippedOn = !1, this._pickingOn = !1, this._hasOffSupport() ? (this._pickHour = Math.min(this._pickHour + 1, 23), this._pickingOff = !0) : await this.activateTimer();
    }, this.handleSetOff = async () => {
      if (!this._hasOffSupport()) return;
      const e = this.buildDatetime(this._pickDay, this._pickHour), i = this._targetHasOptions() ? this._pickOffOption : void 0;
      await this._writeOffDatetime(e, i), this._skippedOn = !1, this._pickingOff = !1, await this.activateTimer();
    }, this.handleSkipOn = async () => {
      this._hasOffSupport() && (await this._clearOnDatetime(), this._skippedOn = !0, this._pickingOn = !1, this._pickHour = Math.min(this._pickHour + 1, 23), this._pickingOff = !0);
    }, this.handleSkipOff = async () => {
      await this._clearOffDatetime(), this._skippedOn = !1, this._pickingOff = !1, await this.activateTimer();
    }, this.handleCancelPick = () => {
      this._pickingOn = !1, this._pickingOff = !1, this._confirmingCancel = !1, this._skippedOn = !1;
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-timer-card-editor");
  }
  static async getStubConfig(e) {
    const i = (e == null ? void 0 : e.states) ?? {}, n = Object.keys(i), o = n.find((s) => {
      var l;
      if (!s.startsWith("switch.")) return !1;
      const a = (l = i[s]) == null ? void 0 : l.attributes;
      return typeof (a == null ? void 0 : a.target_entity) == "string" && ("on_datetime" in (a ?? {}) || "off_datetime" in (a ?? {}));
    });
    if (o)
      return {
        type: "custom:power-pilz-timer-card",
        use_companion: !0,
        companion_entity: o,
        name: "Timer"
      };
    const r = (s) => n.find((a) => a.startsWith(`${s}.`));
    return {
      type: "custom:power-pilz-timer-card",
      use_companion: !1,
      switch_entity: r("switch") ?? r("input_boolean") ?? "switch.device",
      on_datetime_entity: r("input_datetime") ?? "input_datetime.sched_on",
      active_entity: r("input_boolean") ?? "input_boolean.sched_active",
      name: "Timer"
    };
  }
  setConfig(e) {
    const i = e.use_companion !== void 0 ? e.use_companion !== !1 : !e.switch_entity;
    this._config = {
      ...e,
      use_companion: i,
      icon: e.icon ?? "mdi:timer-outline",
      name: e.name ?? u(M(this.hass), "timer.default_name")
    };
  }
  // ---------- Mode-aware entity / datetime resolvers ----------
  get _activeEntityId() {
    if (this._config)
      return this._config.use_companion === !1 ? this._config.active_entity : this._config.companion_entity;
  }
  get _switchEntityId() {
    var n, o, r;
    if (!this._config) return;
    if (this._config.use_companion === !1) return this._config.switch_entity;
    const e = (o = (n = this.hass) == null ? void 0 : n.states) == null ? void 0 : o[this._config.companion_entity ?? ""], i = (r = e == null ? void 0 : e.attributes) == null ? void 0 : r.target_entity;
    return typeof i == "string" ? i : void 0;
  }
  _companionAttr(e) {
    var n, o, r, s, a;
    const i = (n = this._config) == null ? void 0 : n.companion_entity;
    if (i)
      return (a = (s = (r = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : r[i]) == null ? void 0 : s.attributes) == null ? void 0 : a[e];
  }
  _getOnDatetime() {
    var e, i;
    if (((e = this._config) == null ? void 0 : e.use_companion) !== !1) {
      const n = this._companionAttr("on_datetime");
      return typeof n == "string" ? ns(n) : null;
    }
    return this.parseDatetime((i = this._config) == null ? void 0 : i.on_datetime_entity);
  }
  _getOffDatetime() {
    var e, i;
    if (((e = this._config) == null ? void 0 : e.use_companion) !== !1) {
      const n = this._companionAttr("off_datetime");
      return typeof n == "string" ? ns(n) : null;
    }
    return this.parseDatetime((i = this._config) == null ? void 0 : i.off_datetime_entity);
  }
  _direction() {
    var e, i;
    if (((e = this._config) == null ? void 0 : e.use_companion) !== !1) {
      const n = this._companionAttr("direction");
      return n === "on_only" || n === "off_only" ? n : "both";
    }
    return (i = this._config) != null && i.off_datetime_entity ? "both" : "on_only";
  }
  _hasOnSupport() {
    return this._direction() !== "off_only";
  }
  _hasOffSupport() {
    var i, n, o;
    return this._direction() === "on_only" ? !1 : ((i = this._config) == null ? void 0 : i.use_companion) !== !1 ? !!((n = this._config) != null && n.companion_entity) : !!((o = this._config) != null && o.off_datetime_entity);
  }
  _companionStateIcon() {
    var o;
    if (((o = this._config) == null ? void 0 : o.use_companion) === !1) return;
    const e = this._companionAttr("state_icons");
    if (!e || typeof e != "object") return;
    const i = this.isActive() ? "active" : "inactive", n = e[i];
    return typeof n == "string" && n ? n : void 0;
  }
  _companionStateName() {
    var o;
    if (((o = this._config) == null ? void 0 : o.use_companion) === !1) return;
    const e = this._companionAttr("state_names");
    if (!e || typeof e != "object") return;
    const i = this.isActive() ? "active" : "inactive", n = e[i];
    return typeof n == "string" && n ? n : void 0;
  }
  /** For select-target Companion timers, the label the user configured
   *  for the start-boundary option (e.g. "On" or "Boost"). Returns
   *  undefined for non-select targets or manual-mode cards. */
  _onOptionLabel() {
    var i;
    if (((i = this._config) == null ? void 0 : i.use_companion) === !1) return;
    const e = this._companionAttr("on_option_label");
    return typeof e == "string" && e ? e : void 0;
  }
  /** Label for the end-boundary option. Same caveats as above. */
  _offOptionLabel() {
    var i;
    if (((i = this._config) == null ? void 0 : i.use_companion) === !1) return;
    const e = this._companionAttr("off_option_label");
    return typeof e == "string" && e ? e : void 0;
  }
  /** Raw stored on/off option values on the companion (logical keys for
   *  Smart-Schedule targets, display names for generic selects). */
  _storedOnOption() {
    var i;
    if (((i = this._config) == null ? void 0 : i.use_companion) === !1) return "";
    const e = this._companionAttr("on_option");
    return typeof e == "string" ? e : "";
  }
  _storedOffOption() {
    var i;
    if (((i = this._config) == null ? void 0 : i.use_companion) === !1) return "";
    const e = this._companionAttr("off_option");
    return typeof e == "string" ? e : "";
  }
  /** True if the target is a select/input_select whose options the
   *  user can pick from in the picker. */
  _targetHasOptions() {
    var o, r, s, a;
    if (((o = this._config) == null ? void 0 : o.use_companion) === !1) return !1;
    const e = this._switchEntityId;
    if (!e) return !1;
    const i = (s = (r = this.hass) == null ? void 0 : r.states) == null ? void 0 : s[e], n = (a = i == null ? void 0 : i.attributes) == null ? void 0 : a.options;
    return Array.isArray(n) && n.length > 0 && (e.startsWith("select.") || e.startsWith("input_select."));
  }
  /** Resolve a stored option value (logical key or display name) into
   *  the user-facing display name using the target's option list.
   *  Falls back to the value itself if not found. */
  _resolveOptionLabel(e) {
    var n;
    return e ? ((n = this._targetOptions().find((o) => o.value === e)) == null ? void 0 : n.label) ?? e : "";
  }
  /** Returns the selectable option pairs as [value, label] where value
   *  is what gets sent to set_timer (logical key for Smart Schedule,
   *  display name for generic selects) and label is the UI text. */
  _targetOptions() {
    var r, s, a, l;
    const e = this._switchEntityId;
    if (!e) return [];
    const i = (s = (r = this.hass) == null ? void 0 : r.states) == null ? void 0 : s[e];
    if (!i) return [];
    const n = (a = i.attributes) == null ? void 0 : a.options;
    if (!Array.isArray(n)) return [];
    const o = (l = i.attributes) == null ? void 0 : l.mode_names;
    if (o && typeof o == "object" && !Array.isArray(o)) {
      const c = /* @__PURE__ */ new Map();
      for (const [h, d] of Object.entries(o))
        typeof d == "string" && c.set(d, h);
      return n.map((h) => ({
        value: c.get(h) ?? h,
        label: h
      }));
    }
    return n.map((c) => ({
      value: c,
      label: c
    }));
  }
  _resolvedIcon() {
    var e;
    return this._companionStateIcon() ?? ((e = this._config) == null ? void 0 : e.icon) ?? "mdi:timer-outline";
  }
  async _writeOnDatetime(e, i) {
    var o, r;
    if (((o = this._config) == null ? void 0 : o.use_companion) !== !1) {
      const s = (r = this._config) == null ? void 0 : r.companion_entity;
      if (!s) return;
      const a = {
        entity_id: s,
        on: e
      };
      i !== void 0 && (a.on_option = i), await this.hass.callService(ri, "set_timer", a);
      return;
    }
    const n = this._config.on_datetime_entity;
    n && await this.hass.callService(n.split(".")[0], "set_datetime", {
      entity_id: n,
      datetime: e
    });
  }
  async _writeOffDatetime(e, i) {
    var o, r;
    if (((o = this._config) == null ? void 0 : o.use_companion) !== !1) {
      const s = (r = this._config) == null ? void 0 : r.companion_entity;
      if (!s) return;
      const a = {
        entity_id: s,
        off: e
      };
      i !== void 0 && (a.off_option = i), await this.hass.callService(ri, "set_timer", a);
      return;
    }
    const n = this._config.off_datetime_entity;
    n && await this.hass.callService(n.split(".")[0], "set_datetime", {
      entity_id: n,
      datetime: e
    });
  }
  /** Clear the on-boundary so it won't fire on the next activation.
   *  Companion: passes an empty string to `set_timer` which the
   *  integration interprets as "clear this field". Manual mode: no-op,
   *  since `input_datetime.set_datetime` doesn't accept an empty value
   *  (the user's existing on time stays and their bridging automation
   *  will still fire on that schedule). */
  async _clearOnDatetime() {
    var i, n;
    if (((i = this._config) == null ? void 0 : i.use_companion) === !1) return;
    const e = (n = this._config) == null ? void 0 : n.companion_entity;
    e && await this.hass.callService(ri, "set_timer", {
      entity_id: e,
      on: ""
    });
  }
  /** Clear the off-boundary so it won't fire on the next activation.
   *  See `_clearOnDatetime` for the manual-mode caveat. */
  async _clearOffDatetime() {
    var i, n;
    if (((i = this._config) == null ? void 0 : i.use_companion) === !1) return;
    const e = (n = this._config) == null ? void 0 : n.companion_entity;
    e && await this.hass.callService(ri, "set_timer", {
      entity_id: e,
      off: ""
    });
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return { columns: 6, rows: 1, min_columns: 4, min_rows: 1, max_rows: 2 };
  }
  getLayoutOptions() {
    return { grid_columns: 2, grid_rows: 1 };
  }
  connectedCallback() {
    super.connectedCallback(), this._refreshTimer = window.setInterval(() => this.requestUpdate(), 6e4);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._refreshTimer && (clearInterval(this._refreshTimer), this._refreshTimer = void 0), this.closePortal();
  }
  updated() {
    this._pickingOn || this._pickingOff || this._confirmingCancel ? this.openPortal() : this.closePortal();
  }
  ensurePortalStyles() {
    if (document.getElementById(is)) return;
    const e = document.createElement("style");
    e.id = is, e.textContent = `
      .pp-timer-portal-backdrop {
        position: fixed; inset: 0; z-index: 9999; background: transparent;
      }
      .pp-timer-portal {
        position: fixed; z-index: 10000;
        background: var(--ha-card-background, var(--card-background-color, #fff));
        border-radius: var(--mush-control-border-radius, 12px);
        border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, rgba(0,0,0,0.12)));
        box-shadow: var(--ha-card-box-shadow, 0 8px 24px rgba(0,0,0,0.18));
        padding: 12px;
        box-sizing: border-box;
        display: flex; flex-direction: column; gap: 10px;
        font-family: var(--paper-font-body1_-_font-family, inherit);
        color: var(--primary-text-color);
      }
      .pp-timer-portal .pp-label { font-size: 12px; font-weight: 600; color: var(--primary-text-color); }
      .pp-timer-portal .pp-days { display: flex; gap: 4px; flex-wrap: wrap; }
      .pp-timer-portal .pp-day-btn {
        flex: 1; min-width: 56px; padding: 6px 4px; border: none; border-radius: 8px;
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
        font-family: inherit; font-size: 12px; font-weight: 500; color: var(--secondary-text-color);
        cursor: pointer; text-align: center; -webkit-tap-highlight-color: transparent;
      }
      .pp-timer-portal .pp-day-btn.active {
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15);
        color: var(--primary-color, rgb(3, 169, 244)); font-weight: 600;
      }
      .pp-timer-portal .pp-hours {
        display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px;
      }
      .pp-timer-portal .pp-hour-btn {
        padding: 6px 0; border: none; border-radius: 6px;
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
        font-family: inherit; font-size: 12px; font-weight: 500; color: var(--secondary-text-color);
        cursor: pointer; text-align: center; -webkit-tap-highlight-color: transparent;
      }
      .pp-timer-portal .pp-hour-btn.active {
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15);
        color: var(--primary-color, rgb(3, 169, 244)); font-weight: 600;
      }
      .pp-timer-portal .pp-option-row {
        display: flex; align-items: center; gap: 10px;
        padding: 4px 0 2px;
      }
      .pp-timer-portal .pp-option-label {
        font-size: 12px; font-weight: 600;
        color: var(--primary-text-color);
      }
      .pp-timer-portal .pp-option-select {
        flex: 1; font: inherit; font-size: 12px; font-weight: 500;
        padding: 6px 8px; border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
        color: var(--primary-text-color);
        cursor: pointer;
      }
      .pp-timer-portal .pp-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 4px; }
      .pp-timer-portal .pp-act {
        padding: 6px 16px; border: none; border-radius: 8px; font-family: inherit;
        font-size: 13px; font-weight: 600; cursor: pointer; -webkit-tap-highlight-color: transparent;
      }
      .pp-timer-portal .pp-act.cancel, .pp-timer-portal .pp-act.skip {
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
        color: var(--secondary-text-color);
      }
      .pp-timer-portal .pp-act.confirm {
        background: var(--primary-color, rgb(3, 169, 244)); color: white;
      }
      .pp-timer-portal .pp-act.danger {
        background: var(--error-color, rgb(219, 68, 55)); color: white;
      }
      .pp-timer-portal .pp-hint {
        font-size: 12px; color: var(--secondary-text-color); margin-top: -4px;
      }
    `, document.head.append(e);
  }
  openPortal() {
    if (this._portal) {
      this.renderPortalContent(), this.positionPortal();
      return;
    }
    this.ensurePortalStyles();
    const e = document.createElement("div");
    e.className = "pp-timer-portal-backdrop", e.addEventListener("click", () => this.handleCancelPick());
    const i = document.createElement("div");
    i.className = "pp-timer-portal", i.addEventListener("click", (n) => n.stopPropagation()), document.body.append(e), document.body.append(i), this._portalBackdrop = e, this._portal = i, this._portalScrollListener = () => this.positionPortal(), window.addEventListener("scroll", this._portalScrollListener, !0), window.addEventListener("resize", this._portalScrollListener), this.renderPortalContent(), this.positionPortal();
  }
  closePortal() {
    this._portal && (this._portal.remove(), this._portal = void 0), this._portalBackdrop && (this._portalBackdrop.remove(), this._portalBackdrop = void 0), this._portalScrollListener && (window.removeEventListener("scroll", this._portalScrollListener, !0), window.removeEventListener("resize", this._portalScrollListener), this._portalScrollListener = void 0);
  }
  renderPortalContent() {
    if (!this._portal) return;
    const e = M(this.hass);
    if (this._portal.replaceChildren(), this._confirmingCancel) {
      const w = document.createElement("div");
      w.className = "pp-label", w.textContent = u(e, "timer.cancel_title"), this._portal.append(w);
      const S = document.createElement("div");
      S.className = "pp-hint", S.textContent = u(e, "timer.cancel_hint"), this._portal.append(S);
      const $ = document.createElement("div");
      $.className = "pp-actions";
      const T = document.createElement("button");
      T.type = "button", T.className = "pp-act cancel", T.textContent = u(e, "timer.keep_timer"), T.addEventListener("click", () => this.handleDismissConfirm()), $.append(T);
      const A = document.createElement("button");
      A.type = "button", A.className = "pp-act danger", A.textContent = u(e, "timer.cancel_timer"), A.addEventListener("click", () => {
        this.handleConfirmCancel();
      }), $.append(A), this._portal.append($);
      return;
    }
    const i = this._targetHasOptions() ? this._resolveOptionLabel(this._pickOnOption) || this._onOptionLabel() : this._onOptionLabel(), n = this._targetHasOptions() ? this._resolveOptionLabel(this._pickOffOption) || this._offOptionLabel() : this._offOptionLabel(), o = i ? u(e, "timer.set_to_at", { option: i }) : u(e, "timer.turn_on_at"), r = n ? u(e, "timer.set_to_at", { option: n }) : u(e, "timer.turn_off_at_optional"), s = this._pickingOn ? o : r, a = this._pickingOn && this._hasOffSupport() && this._hasOnSupport(), l = this._pickingOff && this._hasOnSupport() && this._hasOffSupport() && !this._skippedOn, c = this._pickingOn ? n ? u(e, "timer.only_option", { option: n }) : u(e, "timer.only_off") : i ? u(e, "timer.only_option", { option: i }) : u(e, "timer.only_on"), h = this._pickingOn ? this.handleSkipOn : this.handleSkipOff, d = a || l, p = this._pickingOn ? this.handleSetOn : this.handleSetOff, _ = this.next7Days(), m = Array.from({ length: 24 }, (w, S) => S), g = document.createElement("div");
    g.className = "pp-label", g.textContent = s, this._portal.append(g);
    const y = document.createElement("div");
    y.className = "pp-days", _.forEach((w) => {
      const S = document.createElement("button");
      S.type = "button", S.className = `pp-day-btn ${w.day === this._pickDay ? "active" : ""}`, S.textContent = w.label, S.addEventListener("click", () => {
        this._pickDay = w.day, this.renderPortalContent();
      }), y.append(S);
    }), this._portal.append(y);
    const b = document.createElement("div");
    if (b.className = "pp-hours", m.forEach((w) => {
      const S = document.createElement("button");
      S.type = "button", S.className = `pp-hour-btn ${w === this._pickHour ? "active" : ""}`, S.textContent = String(w).padStart(2, "0"), S.addEventListener("click", () => {
        this._pickHour = w, this.renderPortalContent();
      }), b.append(S);
    }), this._portal.append(b), this._targetHasOptions()) {
      const w = document.createElement("div");
      w.className = "pp-option-row";
      const S = document.createElement("span");
      S.className = "pp-option-label", S.textContent = u(e, "timer.mode_label"), w.append(S);
      const $ = document.createElement("select");
      $.className = "pp-option-select";
      const T = this._pickingOn ? this._pickOnOption : this._pickOffOption;
      for (const A of this._targetOptions()) {
        const P = document.createElement("option");
        P.value = A.value, P.textContent = A.label, A.value === T && (P.selected = !0), $.append(P);
      }
      $.addEventListener("change", () => {
        this._pickingOn ? this._pickOnOption = $.value : this._pickOffOption = $.value, this.renderPortalContent();
      }), w.append($), this._portal.append(w);
    }
    const v = document.createElement("div");
    v.className = "pp-actions";
    const x = document.createElement("button");
    if (x.type = "button", x.className = "pp-act cancel", x.textContent = u(e, "common.cancel"), x.addEventListener("click", () => this.handleCancelPick()), v.append(x), d) {
      const w = document.createElement("button");
      w.type = "button", w.className = "pp-act skip", w.textContent = c, w.addEventListener("click", () => {
        h();
      }), v.append(w);
    }
    const E = document.createElement("button");
    E.type = "button", E.className = "pp-act confirm", E.textContent = u(e, "common.set"), E.addEventListener("click", () => {
      p();
    }), v.append(E), this._portal.append(v);
  }
  positionPortal() {
    var _;
    const e = this._portal;
    if (!e) return;
    const i = (_ = this.renderRoot) == null ? void 0 : _.querySelector("ha-card");
    if (!i) return;
    const n = i.getBoundingClientRect(), o = 8, r = 8;
    e.style.visibility = "hidden", e.style.left = "0", e.style.top = "0", e.style.width = `${Math.max(280, n.width)}px`;
    const s = e.offsetHeight, a = e.offsetWidth, l = window.innerHeight - n.bottom - o, c = n.top - o, h = l < s + r && c > l;
    let d = n.left;
    d = Math.max(o, Math.min(d, window.innerWidth - a - o));
    let p = h ? n.top - r - s : n.bottom + r;
    p = Math.max(o, Math.min(p, window.innerHeight - s - o)), e.style.left = `${Math.round(d)}px`, e.style.top = `${Math.round(p)}px`, e.style.visibility = "visible";
  }
  // --- Helpers ---
  isEditorPreview() {
    return this.preview || this.editMode;
  }
  isActive() {
    var e;
    return ((e = R(this.hass, this._activeEntityId)) == null ? void 0 : e.state) === "on";
  }
  switchIsOn() {
    var e;
    return ((e = R(this.hass, this._switchEntityId)) == null ? void 0 : e.state) === "on";
  }
  parseDatetime(e) {
    if (!e) return null;
    const i = R(this.hass, e);
    if (!i) return null;
    const n = i.attributes, o = n == null ? void 0 : n.year, r = n == null ? void 0 : n.month, s = n == null ? void 0 : n.day, a = n == null ? void 0 : n.hour, l = n == null ? void 0 : n.minute;
    if (typeof o == "number" && typeof r == "number" && typeof s == "number") {
      const h = new Date(o, r - 1, s, a ?? 0, l ?? 0, 0, 0);
      if (!isNaN(h.getTime())) return h;
    }
    const c = i.state;
    if (typeof c == "string" && c.length > 10 && c !== "unknown" && c !== "unavailable") {
      const h = new Date(c.replace(" ", "T"));
      return isNaN(h.getTime()) ? null : h;
    }
    return null;
  }
  formatDatetime(e) {
    const i = M(this.hass), n = ne(i, e.getDay()), o = String(e.getHours()).padStart(2, "0"), r = String(e.getMinutes()).padStart(2, "0");
    return `${n} ${o}:${r}`;
  }
  timeUntil(e) {
    const i = M(this.hass), n = e.getTime() - Date.now();
    if (n <= 0) return u(i, "timer.time_now");
    const o = Math.floor(n / 36e5), r = Math.floor(n % 36e5 / 6e4);
    if (o > 24) {
      const s = Math.floor(o / 24);
      return u(i, "timer.time_in_dh", { d: s, h: o % 24 });
    }
    return o > 0 ? u(i, "timer.time_in_hm", { h: o, m: r }) : u(i, "timer.time_in_m", { m: r });
  }
  next7Days() {
    const e = M(this.hass), i = [], n = /* @__PURE__ */ new Date();
    for (let o = 0; o < 7; o++) {
      const r = new Date(n);
      r.setDate(r.getDate() + o), r.setHours(0, 0, 0, 0);
      const s = o === 0 ? u(e, "common.today") : o === 1 ? u(e, "common.tomorrow") : ne(e, r.getDay());
      i.push({ day: o, label: s, date: r });
    }
    return i;
  }
  buildDatetime(e, i) {
    const n = /* @__PURE__ */ new Date();
    n.setDate(n.getDate() + e), n.setHours(i, 0, 0, 0);
    const o = n.getFullYear(), r = String(n.getMonth() + 1).padStart(2, "0"), s = String(n.getDate()).padStart(2, "0");
    return `${o}-${r}-${s} ${String(i).padStart(2, "0")}:00:00`;
  }
  async activateTimer() {
    const e = this._activeEntityId;
    e && await this.hass.callService(e.split(".")[0], "turn_on", {
      entity_id: e
    });
  }
  async cancelTimer() {
    const e = this._activeEntityId;
    e && await this.hass.callService(e.split(".")[0], "turn_off", {
      entity_id: e
    });
  }
  // --- Render ---
  buildSubtitle(e, i) {
    const n = M(this.hass), o = this._companionStateName();
    if (!e)
      return o ?? (i ? u(n, "common.on") : u(n, "common.off"));
    const r = this._getOnDatetime(), s = this._getOffDatetime(), a = [];
    r && a.push(u(n, "timer.subtitle_on", { time: this.formatDatetime(r) })), s && a.push(u(n, "timer.subtitle_off", { time: this.formatDatetime(s) }));
    const l = a.join(" → ");
    return o && l ? `${o} · ${l}` : o || l || u(n, "timer.timer_active");
  }
  render() {
    var c, h, d, p;
    const e = M(this.hass);
    if (!this._config) return f`<ha-card>${u(e, "common.invalid_config")}</ha-card>`;
    if (!this.hass) return f``;
    if (!this._activeEntityId) {
      const _ = this._config.use_companion !== !1 ? u(e, "timer.placeholder_companion") : u(e, "timer.placeholder_manual");
      return f`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:timer-outline"></ha-icon>
            <div class="placeholder-text">${_}</div>
          </div>
        </ha-card>
      `;
    }
    const i = this._config, n = this.isActive(), o = this.switchIsOn(), r = xe(o ? i.icon_color : "disabled"), s = ((h = (c = R(this.hass, this._switchEntityId)) == null ? void 0 : c.attributes) == null ? void 0 : h.friendly_name) ?? ((p = (d = R(this.hass, this._activeEntityId)) == null ? void 0 : d.attributes) == null ? void 0 : p.friendly_name), a = i.subtitle || this.buildSubtitle(n, o), l = u(e, "timer.default_name");
    return f`
      <ha-card>
        <div class="container">
          <div class="state-item">
            <div class="icon-wrap">
              <div class="icon-shape" style=${z(r)}>
                <ha-icon .icon=${this._resolvedIcon()}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${i.name || s || l}</div>
              <div class="secondary">${a}</div>
            </div>
            ${n ? f`
                  <button type="button" class="action-btn active" @click=${this.handleBadgeClick} title=${u(e, "timer.cancel_timer")}>
                    <ha-icon icon="mdi:timer-sand"></ha-icon>
                    <span>${u(e, "common.active")}</span>
                  </button>
                ` : f`
                  <button type="button" class="action-btn set" @click=${this.handleOpenPicker} title=${u(e, "common.set")}>
                    <ha-icon icon="mdi:timer-plus-outline"></ha-icon>
                    <span>${u(e, "common.set")}</span>
                  </button>
                `}
          </div>
        </div>
      </ha-card>
    `;
  }
};
bo.styles = Z`
    .placeholder {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      color: var(--secondary-text-color);
    }
    .placeholder ha-icon {
      --mdc-icon-size: 28px;
      opacity: 0.6;
      flex: none;
    }
    .placeholder-text {
      font-size: 13px;
      line-height: 1.4;
    }
    :host {
      display: block;
      container-type: inline-size;
      height: 100%;
      box-sizing: border-box;
      --spacing: var(--mush-spacing, 10px);
      --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
      --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
      --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
      --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
      --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
      --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
      --control-border-radius: var(--mush-control-border-radius, 12px);
      --control-spacing: var(--mush-control-spacing, 12px);
      --icon-size: var(--mush-icon-size, 36px);
      --icon-border-radius: var(--mush-icon-border-radius, 50%);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
      --shape-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
    }

    ha-card { display: flex; flex-direction: column; justify-content: center; box-sizing: border-box; height: 100%; overflow: hidden; }
    .container { display: flex; flex-direction: column; box-sizing: border-box; justify-content: center; height: 100%; min-height: 0; }

    /* Header */
    .state-item { display: flex; align-items: center; gap: var(--spacing); padding: var(--spacing); min-width: 0; }
    .icon-wrap { position: relative; flex: none; }
    .icon-shape {
      width: var(--icon-size); height: var(--icon-size); font-size: var(--icon-size);
      border-radius: var(--icon-border-radius); display: flex; align-items: center; justify-content: center;
      background-color: var(--shape-color); transition: background-color 280ms ease-out;
    }
    .icon-shape ha-icon { --mdc-icon-size: var(--icon-symbol-size); color: var(--icon-color); display: flex; line-height: 0; }
    .info { min-width: 0; flex: 1; display: flex; flex-direction: column; }
    .primary {
      font-weight: var(--card-primary-font-weight); font-size: var(--card-primary-font-size);
      line-height: var(--card-primary-line-height); color: var(--primary-text-color);
      text-overflow: ellipsis; overflow: hidden; white-space: nowrap;
    }
    .secondary {
      font-weight: var(--card-secondary-font-weight); font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height); color: var(--secondary-text-color);
      text-overflow: ellipsis; overflow: hidden; white-space: nowrap;
    }

    /* Action button (Set / Active) — matches wallbox play button size */
    .action-btn {
      display: flex; align-items: center; justify-content: center; gap: 6px;
      border: none; background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      border-radius: calc(var(--control-border-radius) - 2px);
      height: var(--icon-size); min-width: var(--icon-size);
      padding: 0 10px; margin: 0 0 0 auto; box-sizing: border-box;
      font-family: inherit; font-size: var(--card-secondary-font-size);
      font-weight: 500; color: var(--primary-text-color); white-space: nowrap;
      cursor: pointer; -webkit-tap-highlight-color: transparent;
      transition: background-color 0.2s; flex: none;
    }
    .action-btn ha-icon { --mdc-icon-size: 18px; display: flex; line-height: 0; flex: none; }
    .action-btn.active {
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15);
      color: var(--primary-color, rgb(3, 169, 244));
    }
  `;
let j = bo;
re([
  I({ attribute: !1 })
], j.prototype, "hass");
re([
  I({ type: Boolean })
], j.prototype, "preview");
re([
  I({ type: Boolean })
], j.prototype, "editMode");
re([
  I({ reflect: !0, type: String })
], j.prototype, "layout");
re([
  C()
], j.prototype, "_config");
re([
  C()
], j.prototype, "_pickingOn");
re([
  C()
], j.prototype, "_pickingOff");
re([
  C()
], j.prototype, "_skippedOn");
re([
  C()
], j.prototype, "_pickOnOption");
re([
  C()
], j.prototype, "_pickOffOption");
re([
  C()
], j.prototype, "_confirmingCancel");
re([
  C()
], j.prototype, "_pickDay");
re([
  C()
], j.prototype, "_pickHour");
class Kd extends j {
}
customElements.get("power-pilz-timer-card") || customElements.define("power-pilz-timer-card", j);
customElements.get("power-pilz-timer-card-v2") || customElements.define("power-pilz-timer-card-v2", Kd);
function Wn(t, e) {
  if (t.length === 0) return "";
  if (t.length === 1) {
    const r = e(t[0]);
    return `M ${r.x} ${r.y}`;
  }
  const i = Gd(t), n = [], o = e(t[0]);
  n.push(`M ${o.x} ${o.y}`);
  for (let r = 0; r < t.length - 1; r++) {
    const s = t[r], a = t[r + 1], l = a.x - s.x;
    if (l <= 0) {
      const p = e(a);
      n.push(`L ${p.x} ${p.y}`);
      continue;
    }
    const c = e({ x: s.x + l / 3, y: s.y + i[r] * l / 3 }), h = e({ x: a.x - l / 3, y: a.y - i[r + 1] * l / 3 }), d = e(a);
    n.push(`C ${c.x} ${c.y}, ${h.x} ${h.y}, ${d.x} ${d.y}`);
  }
  return n.join(" ");
}
function Gd(t) {
  const e = t.length;
  if (e < 2) return e === 1 ? [0] : [];
  const i = [], n = [];
  for (let r = 0; r < e - 1; r++) {
    const s = t[r + 1].x - t[r].x;
    i.push(s), n.push(s === 0 ? 0 : (t[r + 1].y - t[r].y) / s);
  }
  const o = new Array(e).fill(0);
  if (e === 2)
    return o[0] = n[0], o[1] = n[0], o;
  for (let r = 1; r < e - 1; r++)
    if (n[r - 1] === 0 || n[r] === 0 || n[r - 1] > 0 != n[r] > 0)
      o[r] = 0;
    else {
      const s = 2 * i[r] + i[r - 1], a = i[r] + 2 * i[r - 1];
      o[r] = (s + a) / (s / n[r - 1] + a / n[r]);
    }
  return o[0] = os(i[0], i[1], n[0], n[1]), o[e - 1] = os(i[e - 2], i[e - 3], n[e - 2], n[e - 3]), o;
}
function os(t, e, i, n) {
  if (t + e === 0) return 0;
  let o = ((2 * t + e) * i - t * n) / (t + e);
  return o > 0 != i > 0 ? 0 : i > 0 != n > 0 && Math.abs(o) > Math.abs(3 * i) ? 3 * i : o;
}
var Yd = Object.defineProperty, J = (t, e, i, n) => {
  for (var o = void 0, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = s(e, i, o) || o);
  return o && Yd(e, i, o), o;
};
const jn = "power-pilz-heating-curve-edit-dialog", Ct = [
  { key: "monday", dayIndex: 1 },
  { key: "tuesday", dayIndex: 2 },
  { key: "wednesday", dayIndex: 3 },
  { key: "thursday", dayIndex: 4 },
  { key: "friday", dayIndex: 5 },
  { key: "saturday", dayIndex: 6 },
  { key: "sunday", dayIndex: 0 }
], se = 15, Fe = 1440, si = 1e3, Tt = 220, Ae = 30, Pe = 14, ln = 22;
function rs() {
  return {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  };
}
const wo = class wo extends le {
  constructor() {
    super(...arguments), this.curveEntityId = "", this._points = rs(), this._uniformPoints = [], this._loading = !0, this._saving = !1, this._dirty = !1, this._sameForAll = !1, this._valueMin = 5, this._valueMax = 30, this._unit = "°C", this._handleSvgPointerDown = (e) => {
      if (this._loading || this._loadError || e.button !== 0) return;
      const i = e.currentTarget, n = i.dataset.day;
      if (!n) return;
      const r = e.target.closest("[data-point-index]");
      if (r) {
        const l = parseInt(
          r.dataset.pointIndex ?? "-1",
          10
        );
        if (l >= 0) {
          e.preventDefault();
          try {
            i.setPointerCapture(e.pointerId);
          } catch {
          }
          this._drag = {
            day: n,
            pointIndex: l,
            pointerId: e.pointerId,
            svgEl: i,
            anchorClientX: e.clientX,
            anchorClientY: e.clientY,
            moved: !1
          };
        }
        return;
      }
      e.preventDefault();
      const { minutes: s, value: a } = this._svgToData(i, e.clientX, e.clientY);
      this._addPointAt(n, s, a);
    }, this._handleSvgPointerMove = (e) => {
      const i = e.currentTarget, n = i.dataset.day;
      if (this._drag && e.pointerId === this._drag.pointerId) {
        const o = e.clientX - this._drag.anchorClientX, r = e.clientY - this._drag.anchorClientY;
        if (!this._drag.moved && o * o + r * r < 16) return;
        this._drag.moved = !0;
        const { minutes: s, value: a } = this._svgToData(this._drag.svgEl, e.clientX, e.clientY);
        this._movePoint(this._drag.day, this._drag.pointIndex, s, a);
        return;
      }
      if (n) {
        const { minutes: o } = this._svgToData(i, e.clientX, e.clientY), r = Math.round(o / se) * se, s = Math.max(0, Math.min(Fe, r));
        (!this._cursor || this._cursor.day !== n || this._cursor.min !== s) && (this._cursor = { day: n, min: s });
      }
    }, this._handleSvgPointerLeave = (e) => {
      this._drag || (this._cursor = void 0);
    }, this._handleSvgPointerUp = (e) => {
      if (!this._drag || e.pointerId !== this._drag.pointerId) return;
      const i = this._drag;
      try {
        i.svgEl.releasePointerCapture(i.pointerId);
      } catch {
      }
      if (this._drag = void 0, i.moved) return;
      const o = this._pointsForDay(i.day)[i.pointIndex];
      o && (this._editing = {
        day: i.day,
        index: i.pointIndex,
        time: o.time,
        value: o.value
      });
    }, this._handlePointDblClick = (e) => {
      var r, s;
      e.stopPropagation();
      const i = e.currentTarget, n = (s = (r = i.parentElement) == null ? void 0 : r.parentElement) == null ? void 0 : s.dataset.day, o = parseInt(i.dataset.pointIndex ?? "-1", 10);
      !n || o < 0 || this._deletePoint(n, o);
    }, this._toggleSameForAll = () => {
      const e = !this._sameForAll;
      if (e) {
        const i = Ct.map((n) => this._points[n.key]).find((n) => Array.isArray(n) && n.length > 0);
        this._uniformPoints = i ? [...i] : [...this._points.monday];
      }
      this._sameForAll = e, this._dirty = !0;
    }, this._copyDay = (e) => {
      e.stopPropagation();
      const n = e.currentTarget.dataset.day;
      n && (this._clipboard = {
        source: n,
        points: this._pointsForDay(n).map((o) => ({ ...o }))
      });
    }, this._pasteDay = (e) => {
      e.stopPropagation();
      const n = e.currentTarget.dataset.day;
      !n || !this._clipboard || this._setPointsForDay(n, this._clipboard.points.map((o) => ({ ...o })));
    }, this._handleEditTimeChange = (e) => {
      if (!this._editing) return;
      const i = e.target.value;
      this._editing = { ...this._editing, time: Zd(i), error: void 0 };
    }, this._handleEditValueChange = (e) => {
      if (!this._editing) return;
      const i = e.target.value, n = parseFloat(i);
      this._editing = {
        ...this._editing,
        value: Number.isFinite(n) ? n : this._editing.value,
        error: void 0
      };
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._loadCurve();
  }
  _handleEscape(e) {
    this._saving || (this._editing ? this._cancelEdit() : this.close());
  }
  // ------------------------------------------------------------
  // Load + save
  // ------------------------------------------------------------
  async _loadCurve() {
    var i, n;
    const e = M(this.hass);
    try {
      const o = (n = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : n[this.curveEntityId];
      if (!o) {
        this._loadError = u(e, "heating_curve.edit_dialog.error_not_found", {
          entity: this.curveEntityId
        });
        return;
      }
      const r = o.attributes ?? {}, s = r.week_points, a = rs();
      if (s && typeof s == "object" && !Array.isArray(s))
        for (const _ of Object.keys(a)) {
          const m = s[_];
          Array.isArray(m) && (a[_] = m.filter((g) => !!g && typeof g == "object").map((g) => ({
            time: String(g.time ?? "00:00:00"),
            value: typeof g.value == "number" ? g.value : Number(g.value)
          })).filter((g) => Number.isFinite(g.value)).sort((g, y) => he(g.time) - he(y.time)));
        }
      this._points = a;
      const l = Number(r.value_min), c = Number(r.value_max);
      Number.isFinite(l) && (this._valueMin = l), Number.isFinite(c) && c > this._valueMin && (this._valueMax = c), typeof r.unit == "string" && (this._unit = r.unit);
      const h = (this._valueMin + this._valueMax) / 2;
      let d = !1;
      for (const _ of Object.keys(this._points))
        this._points[_].length === 0 && (this._points[_] = [{ time: "12:00:00", value: ai(h) }], d = !0);
      d && (this._dirty = !0), Ct.every(
        (_) => qd(this._points[_.key], this._points.monday)
      ) && this._points.monday.length > 0 ? (this._sameForAll = !0, this._uniformPoints = [...this._points.monday]) : (this._sameForAll = r.same_for_all_days === !0, this._sameForAll && (this._uniformPoints = [...this._points.monday]));
    } catch (o) {
      this._loadError = String((o == null ? void 0 : o.message) || o);
    } finally {
      this._loading = !1;
    }
  }
  async _handleSave() {
    if (!(this._saving || !this.hass)) {
      this._saving = !0, this.lockClose = !0;
      try {
        let e;
        if (this._sameForAll) {
          const i = this._uniformPoints;
          e = {
            monday: i,
            tuesday: i,
            wednesday: i,
            thursday: i,
            friday: i,
            saturday: i,
            sunday: i
          };
        } else
          e = this._points;
        await this.hass.callService(
          "powerpilz_companion",
          "set_curve_points",
          { entity_id: this.curveEntityId, points: e }
        ), this._dirty = !1, this.close();
      } catch (e) {
        this._saving = !1, this.lockClose = !1, this._loadError = String((e == null ? void 0 : e.message) || e);
      }
    }
  }
  // ------------------------------------------------------------
  // Point manipulation
  // ------------------------------------------------------------
  /** Returns the editable points for the given day. Routes to the
   *  uniform template when same-for-all-days is on so all per-day
   *  state stays intact for restore on toggle-off. */
  _pointsForDay(e) {
    return this._sameForAll ? [...this._uniformPoints] : [...this._points[e]];
  }
  _setPointsForDay(e, i) {
    const n = [...i].sort((o, r) => he(o.time) - he(r.time));
    this._sameForAll ? this._uniformPoints = n : this._points = { ...this._points, [e]: n }, this._dirty = !0;
  }
  _addPointAt(e, i, n) {
    const o = Math.round(i / se) * se, r = cn(o), s = ai(this._clamp(n)), a = this._pointsForDay(e);
    a.some((l) => l.time === r) || (a.push({ time: r, value: s }), this._setPointsForDay(e, a));
  }
  _movePoint(e, i, n, o) {
    const r = this._pointsForDay(e);
    if (i < 0 || i >= r.length) return;
    const s = Math.round(n / se) * se, a = i > 0 ? he(r[i - 1].time) + se : 0, l = i < r.length - 1 ? he(r[i + 1].time) - se : Fe, c = Math.max(a, Math.min(l, s));
    r[i] = {
      time: cn(c),
      value: ai(this._clamp(o))
    }, this._setPointsForDay(e, r);
  }
  _deletePoint(e, i) {
    const n = this._pointsForDay(e);
    n.length <= 1 || this._setPointsForDay(e, n.filter((o, r) => r !== i));
  }
  _clamp(e) {
    return Math.max(this._valueMin, Math.min(this._valueMax, e));
  }
  // ------------------------------------------------------------
  // Coordinate mapping
  // ------------------------------------------------------------
  _svgToData(e, i, n) {
    const o = e.createSVGPoint();
    o.x = i, o.y = n;
    const r = e.getScreenCTM(), s = r ? o.matrixTransform(r.inverse()) : { x: 0, y: 0 }, a = si - 2 * Ae, l = Tt - Pe - ln, c = Math.max(0, Math.min(a, s.x - Ae)), h = Math.max(0, Math.min(l, s.y - Pe)), d = c / a * Fe, p = this._valueMax - h / l * (this._valueMax - this._valueMin);
    return { minutes: d, value: p };
  }
  _saveEdit() {
    if (!this._editing) return;
    const e = M(this.hass), { day: i, index: n, time: o, value: r } = this._editing, s = he(o);
    if (!Number.isFinite(s)) {
      this._editing = { ...this._editing, error: u(e, "heating_curve.edit_dialog.err_time") };
      return;
    }
    const a = this._pointsForDay(i), l = Math.round(s / se) * se, c = n > 0 ? he(a[n - 1].time) + se : 0, h = n < a.length - 1 ? he(a[n + 1].time) - se : Fe;
    if (l < c || l > h) {
      this._editing = { ...this._editing, error: u(e, "heating_curve.edit_dialog.err_overlap") };
      return;
    }
    a[n] = { time: cn(l), value: ai(this._clamp(r)) }, this._setPointsForDay(i, a), this._editing = void 0;
  }
  _deleteEditing() {
    if (!this._editing) return;
    const e = M(this.hass), { day: i, index: n } = this._editing, o = this._pointsForDay(i);
    if (o.length <= 1) {
      this._editing = { ...this._editing, error: u(e, "heating_curve.edit_dialog.err_last_point") };
      return;
    }
    this._setPointsForDay(i, o.filter((r, s) => s !== n)), this._editing = void 0;
  }
  _cancelEdit() {
    this._editing = void 0;
  }
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  willUpdate() {
    const e = this._resolveTitle();
    this.dialogTitle !== e && !this.dialogTitle && (this.dialogTitle = e);
  }
  _resolveTitle() {
    var i, n, o, r;
    if (this.dialogTitle) return this.dialogTitle;
    const e = M(this.hass);
    return ((r = (o = (n = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : n[this.curveEntityId]) == null ? void 0 : o.attributes) == null ? void 0 : r.friendly_name) ?? u(e, "heating_curve.edit_dialog.default_title");
  }
  renderBody() {
    const e = M(this.hass);
    if (this._loading) return f`<div class="msg">${u(e, "common.loading") || "Loading…"}</div>`;
    if (this._loadError) return f`<div class="msg error">${this._loadError}</div>`;
    const i = this._sameForAll ? [Ct[0]] : Ct;
    return f`
      <div class="hc-toolbar">
        <label class="hc-toggle">
          <input
            type="checkbox"
            .checked=${this._sameForAll}
            @change=${this._toggleSameForAll}
          />
          <span>${u(e, "heating_curve.edit_dialog.same_for_all")}</span>
        </label>
        <span class="hc-range">
          ${u(e, "heating_curve.edit_dialog.range_label")}: ${this._valueMin}${this._unit} – ${this._valueMax}${this._unit}
        </span>
      </div>
      <div class="hc-editor">
        ${i.map((n) => this._renderDayRow(n.key, n.dayIndex, e))}
      </div>
      <div class="hint">${u(e, "heating_curve.edit_dialog.hint")}</div>
    `;
  }
  renderFooter() {
    const e = M(this.hass);
    return f`
      <button class="ppd-btn flat" @click=${() => this.close()} ?disabled=${this._saving}>
        ${u(e, "common.cancel")}
      </button>
      <button
        class="ppd-btn primary"
        @click=${this._handleSave}
        ?disabled=${this._saving || !this._dirty || !!this._loadError}
      >
        ${this._saving ? u(e, "common.saving") || "Saving…" : u(e, "common.save") || "Save"}
      </button>
    `;
  }
  renderInner() {
    var r;
    if (!this._editing) return k;
    const e = M(this.hass), i = this._editing, n = this._sameForAll ? u(e, "heating_curve.edit_dialog.all_days") : ne(e, ((r = Ct.find((s) => s.key === i.day)) == null ? void 0 : r.dayIndex) ?? 0), o = this._pointsForDay(i.day).length > 1;
    return f`
      <div class="inner-backdrop" @click=${() => this._cancelEdit()}>
        <div class="inner-dialog" @click=${(s) => s.stopPropagation()}>
          <header>
            <h3>${u(e, "heating_curve.edit_dialog.edit_title", { day: n })}</h3>
            <button class="close-x" @click=${() => this._cancelEdit()} aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="inner-body">
            <label class="field">
              <span>${u(e, "heating_curve.edit_dialog.time")}</span>
              <input
                type="time"
                .value=${i.time.slice(0, 5)}
                @change=${this._handleEditTimeChange}
              />
            </label>
            <label class="field">
              <span>${u(e, "heating_curve.edit_dialog.value")} (${this._unit})</span>
              <input
                type="number"
                min=${this._valueMin}
                max=${this._valueMax}
                step="0.1"
                .value=${String(i.value)}
                @change=${this._handleEditValueChange}
                @input=${this._handleEditValueChange}
              />
            </label>
            ${i.error ? f`<div class="err">${i.error}</div>` : k}
          </div>
          <footer>
            <button
              class="ppd-btn danger"
              @click=${() => this._deleteEditing()}
              ?disabled=${!o}
            >
              ${u(e, "heating_curve.edit_dialog.delete")}
            </button>
            <div class="spacer"></div>
            <button class="ppd-btn flat" @click=${() => this._cancelEdit()}>
              ${u(e, "common.cancel")}
            </button>
            <button class="ppd-btn primary" @click=${() => this._saveEdit()}>
              ${u(e, "common.save")}
            </button>
          </footer>
        </div>
      </div>
    `;
  }
  _renderDayRow(e, i, n) {
    var b, v;
    const o = this._pointsForDay(e), r = this._sameForAll ? u(n, "heating_curve.edit_dialog.all_days") : ne(n, i), s = si - 2 * Ae, a = Tt - Pe - ln, l = Math.max(1e-4, this._valueMax - this._valueMin), c = (x) => ({
      x: Ae + x.x / Fe * s,
      y: Pe + (1 - (x.y - this._valueMin) / l) * a
    }), h = o.map((x) => ({ x: he(x.time), y: x.value })).sort((x, E) => x.x - E.x), d = Wn(h, c), p = ((b = this._cursor) == null ? void 0 : b.day) === e && !this._drag, _ = p ? Ae + this._cursor.min / Fe * s : 0, m = p ? _ / si * 100 : 0, g = !!this._clipboard, y = ((v = this._clipboard) == null ? void 0 : v.source) === e;
    return f`
      <div class="hc-row">
        <div class="hc-row-head">
          <span class="hc-day">${r}</span>
          <div class="hc-row-actions">
            <button
              class="ppd-btn flat tiny"
              data-day=${e}
              @click=${this._copyDay}
              title=${u(n, "heating_curve.edit_dialog.copy")}
            >
              <ha-icon icon="mdi:content-copy"></ha-icon>
            </button>
            <button
              class="ppd-btn flat tiny"
              data-day=${e}
              @click=${this._pasteDay}
              ?disabled=${!g || y}
              title=${u(n, "heating_curve.edit_dialog.paste")}
            >
              <ha-icon icon="mdi:content-paste"></ha-icon>
            </button>
          </div>
        </div>
        <div class="hc-svg-wrap">
          ${p ? f`<div class="pp-cursor-chip" style=${z({ left: `${m}%` })}>
                ${Xd(this._cursor.min)}
              </div>` : k}
        <svg
          class="hc-svg"
          viewBox="0 0 ${si} ${Tt}"
          preserveAspectRatio="none"
          data-day=${e}
          @pointerdown=${this._handleSvgPointerDown}
          @pointermove=${this._handleSvgPointerMove}
          @pointerup=${this._handleSvgPointerUp}
          @pointercancel=${this._handleSvgPointerUp}
          @pointerleave=${this._handleSvgPointerLeave}
        >
          ${this._renderGrid(s, a)}
          ${p ? ve`
            <line
              x1=${_} x2=${_}
              y1=${Pe} y2=${Tt - ln}
              stroke="var(--primary-text-color)"
              stroke-width="0.8"
              stroke-dasharray="2 2"
              opacity="0.4"
              pointer-events="none"
            />
          ` : k}
          ${d ? ve`<path d=${d}
                fill="none"
                stroke="var(--primary-color, #03a9f4)"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                vector-effect="non-scaling-stroke"
              />` : k}
          ${o.map((x, E) => {
      const w = c({ x: he(x.time), y: x.value });
      return ve`
              <g class="hc-point-grp">
                <circle
                  data-point-index=${E}
                  class="hc-hit"
                  cx=${w.x} cy=${w.y} r="14"
                  fill="transparent"
                  @dblclick=${this._handlePointDblClick}
                ></circle>
                <circle
                  cx=${w.x} cy=${w.y} r="6"
                  fill="var(--primary-color, #03a9f4)"
                  stroke="var(--card-background-color, white)"
                  stroke-width="2"
                  pointer-events="none"
                ></circle>
                <text
                  x=${w.x} y=${w.y - 12}
                  text-anchor="middle"
                  class="hc-label"
                  pointer-events="none"
                >${x.value.toFixed(1)}${this._unit}</text>
                <text
                  x=${w.x} y=${Tt - 4}
                  text-anchor="middle"
                  class="hc-time-label"
                  pointer-events="none"
                >${x.time.slice(0, 5)}</text>
              </g>`;
    })}
        </svg>
        </div>
      </div>
    `;
  }
  _renderGrid(e, i) {
    const n = [0, 6, 12, 18, 24], o = 4;
    return ve`
      ${n.map((r) => {
      const s = Ae + r / 24 * e;
      return ve`
          <line x1=${s} x2=${s}
            y1=${Pe} y2=${Pe + i}
            stroke="rgba(127,127,127,0.18)" stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
          <text x=${s} y=${Pe - 4}
            text-anchor="middle" class="hc-axis-label"
          >${String(r).padStart(2, "0")}</text>`;
    })}
      ${Array.from({ length: o + 1 }, (r, s) => {
      const a = s / o, l = Pe + a * i, c = this._valueMax - a * (this._valueMax - this._valueMin);
      return ve`
          <line x1=${Ae} x2=${Ae + e}
            y1=${l} y2=${l}
            stroke="rgba(127,127,127,0.12)" stroke-width="1"
            stroke-dasharray=${s === 0 || s === o ? "0" : "2 4"}
            vector-effect="non-scaling-stroke"
          />
          <text x=${Ae - 4} y=${l + 3}
            text-anchor="end" class="hc-axis-label"
          >${c.toFixed(0)}</text>`;
    })}
    `;
  }
};
wo.styles = [
  le.styles,
  Z`
      .msg {
        padding: 32px 8px;
        text-align: center;
        color: var(--secondary-text-color, #757575);
        font-size: 14px;
      }
      .msg.error { color: var(--error-color, #c62828); }

      .hc-toolbar {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 8px;
        flex-wrap: wrap;
      }
      .hc-toggle {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        cursor: pointer;
        user-select: none;
      }
      .hc-toggle input { width: 16px; height: 16px; cursor: pointer; }
      .hc-range {
        font-size: 12px;
        color: var(--secondary-text-color);
      }

      .hc-editor { display: flex; flex-direction: column; gap: 12px; }

      .hc-row {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px;
        border-radius: 10px;
        background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.03);
        position: relative;
        overflow: visible;
      }
      .hc-svg-wrap {
        position: relative;
        overflow: visible;
      }
      .hc-row-head {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .hc-day {
        flex: 1;
        font-weight: 600;
        font-size: 13px;
        color: var(--primary-text-color);
      }
      .hc-row-actions { display: flex; gap: 4px; }
      .ppd-btn.tiny {
        padding: 4px 8px;
        font-size: 12px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      .ppd-btn.tiny ha-icon {
        --mdc-icon-size: 16px;
        display: flex;
        line-height: 0;
      }

      .hc-svg {
        width: 100%;
        height: 180px;
        display: block;
        touch-action: none;
        user-select: none;
        cursor: crosshair;
      }
      .hc-svg .hc-hit { cursor: grab; }
      .hc-svg .hc-hit:active { cursor: grabbing; }
      .hc-axis-label {
        font-size: 10px;
        fill: var(--secondary-text-color);
        font-family: var(--paper-font-body1_-_font-family, inherit);
      }
      .hc-label {
        font-size: 11px;
        fill: var(--primary-text-color);
        font-family: var(--paper-font-body1_-_font-family, inherit);
        font-weight: 600;
      }
      .hc-time-label {
        font-size: 9px;
        fill: var(--secondary-text-color);
        font-family: var(--paper-font-body1_-_font-family, inherit);
      }
      /* ----- Cursor time hint while hovering a row ----- */
      .pp-cursor-chip {
        position: absolute;
        top: -22px;
        transform: translateX(-50%);
        background: var(--primary-text-color);
        color: var(--card-background-color, #fff);
        font-size: 10px;
        font-weight: 600;
        padding: 2px 6px;
        border-radius: 4px;
        pointer-events: none;
        white-space: nowrap;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18);
        z-index: 5;
      }
      .pp-cursor-chip::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 3px solid transparent;
        border-top-color: var(--primary-text-color);
      }

      .hint {
        margin-top: 12px;
        font-size: 11px;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }

      /* ----- Inner edit modal ----- */
      .inner-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        animation: ppd-fade-in 0.14s ease;
        z-index: 10;
      }
      .inner-dialog {
        background: var(--card-background-color, var(--primary-background-color, #fff));
        border-radius: 14px;
        width: min(100%, 420px);
        max-height: calc(100vh - 120px);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: ppd-pop-in 0.18s cubic-bezier(0.2, 0.9, 0.3, 1.1);
      }
      .inner-dialog header {
        padding: 14px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .inner-dialog header h3 { margin: 0; flex: 1; font-size: 16px; font-weight: 600; }
      .inner-dialog .close-x {
        border: none;
        background: transparent;
        cursor: pointer;
        width: 32px; height: 32px;
        border-radius: 50%;
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .inner-dialog footer {
        padding: 12px 16px;
        display: flex;
        gap: 8px;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
      }
      .inner-body {
        padding: 14px 20px;
        overflow-y: auto;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 13px;
        color: var(--primary-text-color);
      }
      .field > span { font-weight: 500; }
      .field input[type="time"], .field input[type="number"] {
        font: inherit;
        font-size: 14px;
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        background: var(--secondary-background-color, #fafafa);
        color: var(--primary-text-color);
      }
      .err { color: var(--error-color, #c62828); font-size: 12px; }
      .spacer { flex: 1; }
    `
];
let V = wo;
J([
  I({ attribute: !1 })
], V.prototype, "hass");
J([
  I({ type: String })
], V.prototype, "curveEntityId");
J([
  C()
], V.prototype, "_points");
J([
  C()
], V.prototype, "_uniformPoints");
J([
  C()
], V.prototype, "_loading");
J([
  C()
], V.prototype, "_loadError");
J([
  C()
], V.prototype, "_saving");
J([
  C()
], V.prototype, "_dirty");
J([
  C()
], V.prototype, "_sameForAll");
J([
  C()
], V.prototype, "_valueMin");
J([
  C()
], V.prototype, "_valueMax");
J([
  C()
], V.prototype, "_unit");
J([
  C()
], V.prototype, "_clipboard");
J([
  C()
], V.prototype, "_cursor");
J([
  C()
], V.prototype, "_editing");
function he(t) {
  if (!t || typeof t != "string") return 0;
  const e = t.split(":"), i = parseInt(e[0] ?? "0", 10), n = parseInt(e[1] ?? "0", 10);
  return isNaN(i) || isNaN(n) ? 0 : i * 60 + n;
}
function cn(t) {
  const e = Math.max(0, Math.min(Fe, Math.round(t))), i = Math.floor(e / 60), n = e % 60;
  return i === 24 && n === 0 ? "24:00:00" : `${String(i).padStart(2, "0")}:${String(n).padStart(2, "0")}:00`;
}
function Xd(t) {
  const e = Math.max(0, Math.min(Fe, Math.round(t))), i = Math.floor(e / 60), n = e % 60;
  return `${String(i).padStart(2, "0")}:${String(n).padStart(2, "0")}`;
}
function ai(t) {
  return Math.round(t * 10) / 10;
}
function Zd(t) {
  if (!t) return "00:00:00";
  const e = t.split(":"), i = (e[0] ?? "00").padStart(2, "0"), n = (e[1] ?? "00").padStart(2, "0"), o = (e[2] ?? "00").padStart(2, "0");
  return `${i}:${n}:${o}`;
}
function qd(t, e) {
  if (t.length !== e.length) return !1;
  for (let i = 0; i < t.length; i += 1)
    if (t[i].time !== e[i].time || t[i].value !== e[i].value) return !1;
  return !0;
}
customElements.get(jn) || customElements.define(jn, V);
function Jd(t) {
  if (!t.curveEntityId) return;
  const e = document.createElement(jn);
  e.hass = t.hass, e.curveEntityId = t.curveEntityId, t.title && (e.dialogTitle = t.title), document.body.appendChild(e);
}
var Qd = Object.defineProperty, eh = Object.getOwnPropertyDescriptor, co = (t, e, i, n) => {
  for (var o = n > 1 ? void 0 : n ? eh(e, i) : e, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = (n ? s(e, i, o) : s(o)) || o);
  return n && o && Qd(e, i, o), o;
};
let xi = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => this.labelMap()[t.name ?? ""] ?? t.name ?? "", this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM") return;
      const i = t.detail.value;
      !i || typeof i != "object" || Array.isArray(i) || this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: { ...i, type: "custom:power-pilz-heating-curve-card" } },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(t) {
    this._config = {
      ...t,
      show_day_selector: t.show_day_selector ?? !0,
      show_mode_control: t.show_mode_control ?? !0,
      show_now_indicator: t.show_now_indicator ?? !0,
      show_time_labels: t.show_time_labels ?? !0,
      type: "custom:power-pilz-heating-curve-card"
    };
  }
  buildSchema() {
    const t = M(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: u(t, "heating_curve.editor.section_entities"),
        icon: "mdi:connection",
        expanded: !0,
        schema: [
          {
            name: "entity",
            selector: {
              entity: {
                filter: { domain: "select", integration: "powerpilz_companion" }
              }
            },
            helper: u(t, "heating_curve.editor.entity_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "heating_curve.editor.section_identity"),
        icon: "mdi:card-text-outline",
        expanded: !1,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "name", selector: { text: {} } },
              { name: "subtitle", selector: { text: {} } }
            ]
          },
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "icon", selector: { icon: {} }, context: { icon_entity: "entity" } },
              { name: "icon_color", selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "heating_curve.editor.section_appearance"),
        icon: "mdi:palette-outline",
        expanded: !1,
        schema: [
          {
            name: "active_color",
            selector: { ui_color: { include_state: !1, include_none: !0, default_color: "primary" } }
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "heating_curve.editor.section_display"),
        icon: "mdi:tune-variant",
        expanded: !1,
        schema: [
          {
            type: "grid",
            name: "",
            columns: 2,
            schema: [
              { name: "show_day_selector", selector: { boolean: {} } },
              { name: "show_mode_control", selector: { boolean: {} } },
              { name: "show_now_indicator", selector: { boolean: {} } },
              { name: "show_time_labels", selector: { boolean: {} } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: u(t, "heating_curve.editor.section_actions"),
        icon: "mdi:gesture-tap",
        expanded: !1,
        schema: [
          { name: "tap_action", selector: { ui_action: {} } },
          {
            name: "hold_action",
            selector: { ui_action: {} }
          },
          { name: "double_tap_action", selector: { ui_action: {} } }
        ]
      }
    ];
  }
  labelMap() {
    const t = M(this.hass);
    return {
      entity: u(t, "heating_curve.editor.entity"),
      name: u(t, "heating_curve.editor.name"),
      subtitle: u(t, "heating_curve.editor.subtitle"),
      icon: u(t, "heating_curve.editor.icon"),
      icon_color: u(t, "heating_curve.editor.icon_color"),
      active_color: u(t, "heating_curve.editor.active_color"),
      show_day_selector: u(t, "heating_curve.editor.show_day_selector"),
      show_mode_control: u(t, "heating_curve.editor.show_mode_control"),
      show_now_indicator: u(t, "heating_curve.editor.show_now_indicator"),
      show_time_labels: u(t, "heating_curve.editor.show_time_labels"),
      tap_action: u(t, "heating_curve.editor.tap_action"),
      hold_action: u(t, "heating_curve.editor.hold_action"),
      double_tap_action: u(t, "heating_curve.editor.double_tap_action")
    };
  }
  render() {
    return !this.hass || !this._config ? k : f`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Te}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this.buildSchema()}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
co([
  I({ attribute: !1 })
], xi.prototype, "hass", 2);
co([
  C()
], xi.prototype, "_config", 2);
xi = co([
  ce("power-pilz-heating-curve-card-editor")
], xi);
var th = Object.defineProperty, gt = (t, e, i, n) => {
  for (var o = void 0, r = t.length - 1, s; r >= 0; r--)
    (s = t[r]) && (o = s(e, i, o) || o);
  return o && th(e, i, o), o;
};
const ss = "powerpilz-heating-curve-edit", as = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
], xo = class xo extends L {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._selectedDay = (/* @__PURE__ */ new Date()).getDay(), this._tick = 0, this.handleDaySelect = (e) => {
      e.stopPropagation();
      const i = e.currentTarget;
      if (!(i instanceof HTMLElement)) return;
      const n = parseInt(i.dataset.day ?? "0", 10);
      this._selectedDay = n;
    }, this.handleModeChange = async (e) => {
      var l;
      e.stopPropagation();
      const i = this._entityId;
      if (this.isEditorPreview() || !i) return;
      const n = R(this.hass, i);
      if (!n) return;
      const o = ((l = n.attributes) == null ? void 0 : l.options) ?? [];
      if (o.length === 0) return;
      const s = (o.indexOf(n.state) + 1) % o.length, a = i.split(".")[0];
      await this.hass.callService(a, "select_option", {
        entity_id: i,
        option: o[s]
      });
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-heating-curve-card-editor");
  }
  static async getStubConfig(e) {
    const i = (e == null ? void 0 : e.states) ?? {};
    return {
      type: "custom:power-pilz-heating-curve-card",
      entity: Object.keys(i).find((o) => {
        var s;
        if (!o.startsWith("select.")) return !1;
        const r = (s = i[o]) == null ? void 0 : s.attributes;
        return !!(r != null && r.mode_names) && (r == null ? void 0 : r.week_points) !== void 0;
      }) ?? ""
    };
  }
  setConfig(e) {
    this._config = {
      ...e,
      icon: e.icon ?? "mdi:chart-bell-curve-cumulative",
      name: e.name ?? u(M(this.hass), "heating_curve.default_name"),
      show_day_selector: e.show_day_selector ?? !0,
      show_mode_control: e.show_mode_control ?? !0,
      show_now_indicator: e.show_now_indicator ?? !0,
      show_time_labels: e.show_time_labels ?? !0
    };
  }
  get _entityId() {
    var e;
    return ((e = this._config) == null ? void 0 : e.entity) || void 0;
  }
  getCardSize() {
    var e;
    return ((e = this._config) == null ? void 0 : e.show_day_selector) !== !1 ? 3 : 2;
  }
  getGridOptions() {
    var i;
    const e = ((i = this._config) == null ? void 0 : i.show_day_selector) !== !1;
    return {
      columns: 6,
      rows: e ? 3 : 2,
      min_columns: 3,
      min_rows: e ? 2 : 1,
      max_rows: e ? 4 : 3
    };
  }
  getLayoutOptions() {
    return { grid_columns: 2, grid_rows: this.getCardSize() };
  }
  firstUpdated() {
    this._bindActions();
  }
  updated(e) {
    (!this._actionCleanup || e.has("_config")) && this._bindActions();
  }
  _bindActions() {
    var s, a, l, c, h, d;
    const e = this.renderRoot.querySelector("ha-card");
    if (!e) return;
    (s = this._actionCleanup) == null || s.destroy();
    const i = !!((l = (a = this._config) == null ? void 0 : a.hold_action) != null && l.action) && this._config.hold_action.action !== "none", n = !((h = (c = this._config) == null ? void 0 : c.hold_action) != null && h.action), o = i || n, r = !!((d = this._config) != null && d.double_tap_action) && this._config.double_tap_action.action !== void 0 && this._config.double_tap_action.action !== "none";
    this._actionCleanup = ot(
      e,
      {
        onTap: () => this._fireAction("tap"),
        onHold: () => this._fireAction("hold"),
        onDoubleTap: () => this._fireAction("double_tap")
      },
      { hasHold: o, hasDoubleTap: r }
    );
  }
  _fireAction(e) {
    if (this.isEditorPreview() || !this._config) return;
    const i = `${e}_action`;
    let n = this._config[i];
    if (e === "tap" && (!n || !n.action)) {
      this._entityId && this.handleModeChange(new Event("tap"));
      return;
    }
    if (e === "hold" && (!n || !n.action) && (n = { action: ss }), !(!n || !n.action || n.action === "none")) {
      if (n.action === ss) {
        this._openEdit();
        return;
      }
      this.dispatchEvent(
        new CustomEvent("hass-action", {
          detail: { config: this._config, action: e },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  _openEdit() {
    const e = this._entityId;
    !e || !this.hass || Jd({ hass: this.hass, curveEntityId: e });
  }
  connectedCallback() {
    super.connectedCallback(), this._tickTimer || (this._tickTimer = window.setInterval(() => {
      this._tick++;
    }, 6e4));
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), this._tickTimer && (clearInterval(this._tickTimer), this._tickTimer = void 0), (e = this._actionCleanup) == null || e.destroy(), this._actionCleanup = void 0;
  }
  // --- Helpers ---
  isEditorPreview() {
    return this.preview || this.editMode;
  }
  iconStyle(e) {
    return xe(e);
  }
  _entityAttrs() {
    var i, n, o;
    const e = this._entityId;
    if (e)
      return (o = (n = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : n[e]) == null ? void 0 : o.attributes;
  }
  _weekPoints() {
    const e = this._entityAttrs(), i = e == null ? void 0 : e.week_points;
    return i && typeof i == "object" && !Array.isArray(i) ? i : {};
  }
  _valueRange() {
    const e = this._entityAttrs(), i = Number(e == null ? void 0 : e.value_min), n = Number(e == null ? void 0 : e.value_max);
    return {
      min: Number.isFinite(i) ? i : 5,
      max: Number.isFinite(n) ? n : 30
    };
  }
  _unit() {
    var i;
    const e = (i = this._entityAttrs()) == null ? void 0 : i.unit;
    return typeof e == "string" ? e : "°C";
  }
  _dayKey(e) {
    return as[e] ?? "monday";
  }
  _pointsForDay(e) {
    const n = this._weekPoints()[this._dayKey(e)];
    return Array.isArray(n) ? n.map((o) => ({
      x: this._timeToMin(String(o.time ?? "00:00:00")),
      y: typeof o.value == "number" ? o.value : Number(o.value)
    })).filter((o) => Number.isFinite(o.x) && Number.isFinite(o.y)).sort((o, r) => o.x - r.x) : [];
  }
  _timeToMin(e) {
    const i = e.split(":"), n = parseInt(i[0] ?? "0", 10), o = parseInt(i[1] ?? "0", 10);
    return (isNaN(n) ? 0 : n) * 60 + (isNaN(o) ? 0 : o);
  }
  _nowMin() {
    const e = /* @__PURE__ */ new Date();
    return e.getHours() * 60 + e.getMinutes();
  }
  _resolvedActiveColor() {
    var i;
    const e = pe((i = this._config) == null ? void 0 : i.active_color);
    return e ? `rgb(${e})` : "var(--primary-color, rgb(3, 169, 244))";
  }
  _modeValue() {
    var r;
    const e = this._entityId;
    if (!e) return "auto";
    const i = R(this.hass, e), n = (i == null ? void 0 : i.state) ?? "auto", o = (r = i == null ? void 0 : i.attributes) == null ? void 0 : r.mode_names;
    if (o && typeof o == "object") {
      for (const [s, a] of Object.entries(o))
        if (typeof a == "string" && a === n) return s;
    }
    return n;
  }
  _modeLabel(e) {
    var n;
    const i = this._entityId;
    if (i) {
      const o = R(this.hass, i), r = (n = o == null ? void 0 : o.attributes) == null ? void 0 : n.mode_names;
      if (r && typeof r == "object") {
        const s = r[e.toLowerCase()];
        if (typeof s == "string" && s) return s;
      }
    }
    return e;
  }
  _isDeviceOn() {
    return this._modeValue().toLowerCase() !== "off";
  }
  _currentValue() {
    const e = this._entityAttrs(), i = e == null ? void 0 : e.current_value;
    return typeof i == "number" ? i : null;
  }
  // --- Render ---
  renderCurvePreview() {
    const e = this._config;
    this._tick;
    const i = this._pointsForDay(this._selectedDay), { min: n, max: o } = this._valueRange(), r = this._resolvedActiveColor(), s = this._selectedDay === (/* @__PURE__ */ new Date()).getDay(), a = e.show_now_indicator !== !1 && s, l = this._nowMin(), c = [];
    if (i.length > 0) {
      i[0].x > 0 && c.push({ x: 0, y: i[0].y }), c.push(...i);
      const v = i[i.length - 1];
      v.x < 1440 && c.push({ x: 1440, y: v.y });
    }
    const h = 1e3, d = 80, p = Math.max(1e-4, o - n), m = Wn(c, (v) => ({
      x: v.x / 1440 * h,
      y: (1 - (v.y - n) / p) * d
    })), g = c.length >= 2 ? `${m} L ${h} ${d} L 0 ${d} Z` : "", y = e.show_time_labels !== !1, b = y ? ls() : [];
    return f`
      <div class="curve-container">
        ${y ? f`
              <div class="time-labels">
                ${b.map(
      (v) => f`<span class="time-label" style=${z({ left: `${v.pct}%` })}>${String(v.hour).padStart(2, "0")}</span>`
    )}
              </div>
            ` : k}
        <svg
          viewBox="0 0 ${h} ${d}"
          preserveAspectRatio="none"
          class="curve-svg"
        >
          ${c.length >= 2 && g ? ve`
            <path d=${g} fill=${r} fill-opacity="0.18" />
          ` : k}
          ${m ? ve`
            <path d=${m}
              fill="none"
              stroke=${r}
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
            />
          ` : k}
          ${a ? ve`
            <line
              x1=${l / 1440 * h}
              x2=${l / 1440 * h}
              y1="0" y2=${d}
              stroke=${r}
              stroke-width="1.5"
              stroke-dasharray="3 3"
              vector-effect="non-scaling-stroke"
            />
          ` : k}
        </svg>
      </div>
    `;
  }
  renderDaySelector() {
    const e = (/* @__PURE__ */ new Date()).getDay();
    return f`
      <div class="day-selector">
        ${as.map((i, n) => f`
          <button
            type="button"
            class="day-btn ${n === this._selectedDay ? "active" : ""} ${n === e ? "today" : ""}"
            data-day=${n}
            @click=${this.handleDaySelect}
          >
            ${ne(M(this.hass), n)}
          </button>
        `)}
      </div>
    `;
  }
  renderModeButton() {
    const e = this._modeValue(), i = e.toLowerCase(), n = i === "on" ? "mdi:fire" : i === "off" ? "mdi:power-off" : "mdi:chart-bell-curve-cumulative";
    return f`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${e}">
        <ha-icon .icon=${n}></ha-icon>
        <span class="mode-label">${this._modeLabel(e)}</span>
      </button>
    `;
  }
  /** Demo card for the dashboard card-picker preview (preview=true,
   *  no entity yet). Renders a typical day-curve so users see what
   *  the card actually does. */
  _renderDemo() {
    const e = this._config, i = M(this.hass), n = this._resolvedActiveColor(), o = e.show_day_selector !== !1, r = e.show_mode_control !== !1, s = (/* @__PURE__ */ new Date()).getDay(), a = [
      { x: 0, y: 17 },
      { x: 360, y: 19 },
      { x: 480, y: 21.5 },
      { x: 720, y: 20 },
      { x: 1020, y: 21 },
      { x: 1320, y: 18.5 },
      { x: 1440, y: 17 }
    ], l = 1e3, c = 80, h = 15, p = 23 - h, m = Wn(a, (v) => ({
      x: v.x / 1440 * l,
      y: (1 - (v.y - h) / p) * c
    })), g = `${m} L ${l} ${c} L 0 ${c} Z`, y = this._nowMin(), b = e.show_now_indicator !== !1;
    return f`
      <ha-card>
        <div class="container">
          <div class="row row-header">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${z(this.iconStyle(e.icon_color))}>
                  <ha-icon .icon=${e.icon ?? "mdi:chart-bell-curve-cumulative"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${e.name || u(i, "heating_curve.default_name")}</div>
                <div class="secondary">${e.subtitle || "21.0 °C · Auto"}</div>
              </div>
              ${r ? f`
                <button type="button" class="mode-btn" disabled>
                  <ha-icon icon="mdi:clock-outline"></ha-icon>
                  <span class="mode-label">Auto</span>
                </button>
              ` : k}
            </div>
          </div>
          ${o ? f`
            <div class="row row-days">
              <div class="day-selector">
                ${[0, 1, 2, 3, 4, 5, 6].map((v) => f`
                  <button type="button" class="day-btn ${v === s ? "active today" : ""}" disabled>
                    ${ne(i, v)}
                  </button>
                `)}
              </div>
            </div>
          ` : k}
          <div class="row row-curve">
            <div class="curve-container">
              ${e.show_time_labels !== !1 ? f`
                    <div class="time-labels">
                      ${ls().map(
      (v) => f`<span class="time-label" style=${z({ left: `${v.pct}%` })}>${String(v.hour).padStart(2, "0")}</span>`
    )}
                    </div>
                  ` : k}
              <svg viewBox="0 0 ${l} ${c}" preserveAspectRatio="none" class="curve-svg">
                <path d=${g} fill=${n} fill-opacity="0.18" />
                <path d=${m}
                  fill="none"
                  stroke=${n}
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  vector-effect="non-scaling-stroke"
                />
                ${b ? ve`
                  <line
                    x1=${y / 1440 * l}
                    x2=${y / 1440 * l}
                    y1="0" y2=${c}
                    stroke=${n}
                    stroke-width="1.5"
                    stroke-dasharray="3 3"
                    vector-effect="non-scaling-stroke"
                  />
                ` : k}
              </svg>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  render() {
    var _, m;
    if (!this._config) return f`<ha-card>${u(M(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return f``;
    if (!this._entityId) {
      if (this.preview) return this._renderDemo();
      const g = M(this.hass);
      return f`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:chart-bell-curve-cumulative"></ha-icon>
            <div class="placeholder-text">${u(g, "heating_curve.placeholder")}</div>
          </div>
        </ha-card>
      `;
    }
    const e = this._config, i = (m = (_ = R(this.hass, this._entityId)) == null ? void 0 : _.attributes) == null ? void 0 : m.friendly_name, n = this._modeValue(), o = this._currentValue(), r = this._unit(), s = e.subtitle || (o !== null ? `${o.toFixed(1)} ${r} · ${this._modeLabel(n)}` : this._modeLabel(n)), a = e.show_day_selector !== !1, l = e.show_mode_control !== !1, c = e.show_time_labels !== !1, h = !a && !l && !c, p = this._isDeviceOn() ? this.iconStyle(e.icon_color) : this.iconStyle("disabled");
    return f`
      <ha-card>
        <div class="container${h ? " compact-inline" : ""}">
          <div class="row row-header">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${z(p)}>
                  <ha-icon .icon=${e.icon ?? "mdi:chart-bell-curve-cumulative"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${e.name || i || u(M(this.hass), "heating_curve.default_name")}</div>
                <div class="secondary">${s}</div>
              </div>
              ${l ? this.renderModeButton() : k}
            </div>
          </div>
          ${a ? f`<div class="row row-days">${this.renderDaySelector()}</div>` : k}
          <div class="row row-curve">${this.renderCurvePreview()}</div>
        </div>
      </ha-card>
    `;
  }
};
xo.styles = Z`
    .placeholder {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      color: var(--secondary-text-color);
    }
    .placeholder ha-icon { --mdc-icon-size: 28px; opacity: 0.6; flex: none; }
    .placeholder-text { font-size: 13px; line-height: 1.4; }

    :host {
      display: block;
      container-type: size;
      height: 100%;
      box-sizing: border-box;
      --spacing: var(--mush-spacing, 10px);
      --card-primary-font-size: var(--mush-card-primary-font-size, 14px);
      --card-secondary-font-size: var(--mush-card-secondary-font-size, 12px);
      --card-primary-font-weight: var(--mush-card-primary-font-weight, 500);
      --card-secondary-font-weight: var(--mush-card-secondary-font-weight, 400);
      --card-primary-line-height: var(--mush-card-primary-line-height, 20px);
      --card-secondary-line-height: var(--mush-card-secondary-line-height, 16px);
      --control-border-radius: var(--mush-control-border-radius, 12px);
      --control-spacing: var(--mush-control-spacing, 12px);
      --icon-size: var(--mush-icon-size, 36px);
      --icon-border-radius: var(--mush-icon-border-radius, 50%);
      --icon-symbol-size: var(--mush-icon-symbol-size, 0.667em);
      --icon-color: var(--primary-text-color);
      --shape-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
    }

    ha-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      height: 100%;
      overflow: hidden;
      cursor: pointer;
    }

    .container {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      height: 100%;
      min-height: 0;
    }
    .container > .row { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; justify-content: center; }
    .container > .row-days, .container > .row-curve {
      padding-left: var(--control-spacing);
      padding-right: var(--control-spacing);
    }

    .state-item { display: flex; align-items: center; gap: var(--spacing); padding: var(--spacing); min-width: 0; }
    .icon-wrap { position: relative; flex: none; }
    .icon-shape {
      width: var(--icon-size); height: var(--icon-size); font-size: var(--icon-size);
      border-radius: var(--icon-border-radius);
      display: flex; align-items: center; justify-content: center;
      background-color: var(--shape-color);
      transition: background-color 280ms ease-out;
    }
    .icon-shape ha-icon { --mdc-icon-size: var(--icon-symbol-size); color: var(--icon-color); display: flex; line-height: 0; }

    .info { min-width: 0; flex: 1; display: flex; flex-direction: column; }
    .primary {
      font-weight: var(--card-primary-font-weight);
      font-size: var(--card-primary-font-size);
      line-height: var(--card-primary-line-height);
      color: var(--primary-text-color);
      text-overflow: ellipsis; overflow: hidden; white-space: nowrap;
    }
    .secondary {
      font-weight: var(--card-secondary-font-weight);
      font-size: var(--card-secondary-font-size);
      line-height: var(--card-secondary-line-height);
      color: var(--secondary-text-color);
      text-overflow: ellipsis; overflow: hidden; white-space: nowrap;
    }

    .day-selector {
      display: flex;
      gap: 2px;
      border-radius: 8px;
      overflow: hidden;
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
    }
    .day-btn {
      flex: 1;
      display: flex; align-items: center; justify-content: center;
      border: none; background: none; padding: 4px 0; margin: 0;
      cursor: pointer;
      font-family: var(--paper-font-body1_-_font-family, inherit);
      font-size: 11px; font-weight: 500;
      color: var(--secondary-text-color);
      transition: background-color 0.2s, color 0.2s;
      -webkit-tap-highlight-color: transparent;
      border-radius: 6px;
    }
    .day-btn.today { font-weight: 700; color: var(--primary-text-color); }
    .day-btn.active {
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
      color: var(--primary-text-color);
    }

    /* Compact-inline: when day-picker, mode button and time labels are
     * all off AND the card is rendered at single-row height, the curve
     * collapses into the header row so the whole card fits into a
     * single mushroom-height line. Gated by a height container query so
     * a multi-row card keeps the stacked layout even with the class set. */
    @container (max-height: 80px) {
      .container.compact-inline {
        flex-direction: row;
        align-items: center;
      }
      .container.compact-inline > .row { flex: 0 0 auto; }
      .container.compact-inline > .row-header {
        flex: 0 1 auto;
        min-width: 0;
      }
      .container.compact-inline > .row-header .info { flex: 0 1 auto; min-width: 0; }
      .container.compact-inline > .row-header .state-item { padding-right: 0; }
      .container.compact-inline > .row-curve {
        flex: 1 1 auto;
        max-width: 60%;
        min-width: 0;
        padding-left: var(--spacing);
        padding-right: var(--spacing);
      }
    }

    .curve-container { position: relative; }
    .time-labels {
      position: absolute;
      left: 0; right: 0;
      bottom: calc(100% + 2px);
      height: 14px;
      font-size: 10px;
      color: var(--secondary-text-color);
      user-select: none;
      pointer-events: none;
    }
    .time-label {
      position: absolute;
      transform: translateX(-50%);
      white-space: nowrap;
    }
    .curve-svg {
      width: 100%;
      height: var(--icon-size);
      border-radius: var(--control-border-radius);
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      display: block;
    }

    .mode-btn {
      display: flex; align-items: center; justify-content: center;
      gap: 6px;
      border: none;
      background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      border-radius: calc(var(--control-border-radius) - 2px);
      height: var(--icon-size);
      min-width: var(--icon-size);
      padding: 0 10px;
      margin: 0 0 0 auto;
      box-sizing: border-box;
      cursor: pointer;
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, inherit);
      font-size: var(--card-secondary-font-size);
      font-weight: 500;
      white-space: nowrap;
      transition: background-color 0.2s;
      -webkit-tap-highlight-color: transparent;
      flex: none;
    }
    .mode-btn ha-icon { --mdc-icon-size: 18px; display: flex; line-height: 0; flex: none; }
    .mode-label { min-width: 28px; text-align: center; }
  `;
let Oe = xo;
gt([
  I({ attribute: !1 })
], Oe.prototype, "hass");
gt([
  I({ type: Boolean })
], Oe.prototype, "preview");
gt([
  I({ type: Boolean })
], Oe.prototype, "editMode");
gt([
  C()
], Oe.prototype, "_config");
gt([
  C()
], Oe.prototype, "_selectedDay");
gt([
  C()
], Oe.prototype, "_tick");
customElements.get("power-pilz-heating-curve-card") || customElements.define("power-pilz-heating-curve-card", Oe);
function ls() {
  return [0, 6, 12, 18, 24].map((t) => ({
    hour: t >= 24 ? 0 : t,
    pct: t / 24 * 100
  }));
}
window.customCards = window.customCards || [];
const ih = [
  {
    type: "power-pilz-energy-card",
    name: "PowerPilz Energy Card",
    description: "Mushroom-inspired card for live home energy metrics.",
    preview: !0
  },
  {
    type: "power-pilz-wallbox-card",
    name: "PowerPilz Wallbox Card",
    description: "Mushroom-inspired card focused on EV wallbox telemetry.",
    preview: !0
  },
  {
    type: "power-pilz-graph-card",
    name: "PowerPilz Graph Card",
    description: "Mushroom-style trend card with full-card historical graph.",
    preview: !0
  },
  {
    type: "power-pilz-graph-stack-card",
    name: "PowerPilz Graph Stack Card",
    description: "Mushroom-style cumulative stacked trend card for up to four entities.",
    preview: !0
  },
  {
    type: "power-pilz-switch-card",
    name: "PowerPilz Switch Card",
    description: "Mushroom-style mode selector with sliding pill for input_select / select entities.",
    preview: !0
  },
  {
    type: "power-pilz-schedule-card",
    name: "PowerPilz Schedule Card",
    description: "Visual time schedule card with 24h timeline, day selector and override controls.",
    preview: !0
  },
  {
    type: "power-pilz-event-schedule-card",
    name: "PowerPilz Event Schedule Card",
    description: "Weekly point-in-time triggers with pin-marker timeline, trigger-now button and cool-down state.",
    preview: !0
  },
  {
    type: "power-pilz-timer-card",
    name: "PowerPilz Timer Card",
    description: "Schedule a one-time future on/off action for any device within the next 7 days.",
    preview: !0
  },
  {
    type: "power-pilz-heating-curve-card",
    name: "PowerPilz Heating Curve Card",
    description: "Visual heating curve card with weekly setpoint shape, smooth interpolation and override modes.",
    preview: !0
  }
];
for (const t of ih)
  window.customCards.some((e) => e.type === t.type) || window.customCards.push(t);
console.info(
  `%cPOWER PILZ%c v${Te}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
//# sourceMappingURL=power-pilz.js.map
