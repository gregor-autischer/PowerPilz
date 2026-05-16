/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ri = globalThis, gr = ri.ShadowRoot && (ri.ShadyCSS === void 0 || ri.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, fr = Symbol(), lo = /* @__PURE__ */ new WeakMap();
let Dn = class {
  constructor(e, i, r) {
    if (this._$cssResult$ = !0, r !== fr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (gr && e === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (e = lo.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && lo.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const xa = (t) => new Dn(typeof t == "string" ? t : t + "", void 0, fr), Z = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((r, o, n) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[n + 1], t[0]);
  return new Dn(i, t, fr);
}, Sa = (t, e) => {
  if (gr) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const r = document.createElement("style"), o = ri.litNonce;
    o !== void 0 && r.setAttribute("nonce", o), r.textContent = i.cssText, t.appendChild(r);
  }
}, co = gr ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const r of e.cssRules) i += r.cssText;
  return xa(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: $a, defineProperty: ka, getOwnPropertyDescriptor: Ea, getOwnPropertyNames: Ca, getOwnPropertySymbols: za, getPrototypeOf: Ta } = Object, We = globalThis, ho = We.trustedTypes, Ma = ho ? ho.emptyScript : "", Ni = We.reactiveElementPolyfillSupport, Tt = (t, e) => t, ni = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Ma : null;
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
} }, br = (t, e) => !$a(t, e), uo = { attribute: !0, type: String, converter: ni, reflect: !1, useDefault: !1, hasChanged: br };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), We.litPropertyMetadata ?? (We.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let pt = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = uo) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const r = Symbol(), o = this.getPropertyDescriptor(e, r, i);
      o !== void 0 && ka(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, i, r) {
    const { get: o, set: n } = Ea(this.prototype, e) ?? { get() {
      return this[i];
    }, set(s) {
      this[i] = s;
    } };
    return { get: o, set(s) {
      const a = o == null ? void 0 : o.call(this);
      n == null || n.call(this, s), this.requestUpdate(e, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? uo;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Tt("elementProperties"))) return;
    const e = Ta(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Tt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Tt("properties"))) {
      const i = this.properties, r = [...Ca(i), ...za(i)];
      for (const o of r) this.createProperty(o, i[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [r, o] of i) this.elementProperties.set(r, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const o = this._$Eu(i, r);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const o of r) i.unshift(co(o));
    } else e !== void 0 && i.push(co(e));
    return i;
  }
  static _$Eu(e, i) {
    const r = i.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const r of i.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Sa(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostConnected) == null ? void 0 : r.call(i);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostDisconnected) == null ? void 0 : r.call(i);
    });
  }
  attributeChangedCallback(e, i, r) {
    this._$AK(e, r);
  }
  _$ET(e, i) {
    var n;
    const r = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, r);
    if (o !== void 0 && r.reflect === !0) {
      const s = (((n = r.converter) == null ? void 0 : n.toAttribute) !== void 0 ? r.converter : ni).toAttribute(i, r.type);
      this._$Em = e, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var n, s;
    const r = this.constructor, o = r._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = r.getPropertyOptions(o), c = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((n = a.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? a.converter : ni;
      this._$Em = o;
      const d = c.fromAttribute(i, a.type);
      this[o] = d ?? ((s = this._$Ej) == null ? void 0 : s.get(o)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, i, r, o = !1, n) {
    var s;
    if (e !== void 0) {
      const a = this.constructor;
      if (o === !1 && (n = this[e]), r ?? (r = a.getPropertyOptions(e)), !((r.hasChanged ?? br)(n, i) || r.useDefault && r.reflect && n === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(a._$Eu(e, r)))) return;
      this.C(e, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: r, reflect: o, wrapped: n }, s) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? i ?? this[e]), n !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (i = void 0), this._$AL.set(e, i)), o === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, s] of this._$Ep) this[n] = s;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [n, s] of o) {
        const { wrapped: a } = s, c = this[n];
        a !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, s, c);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (r = this._$EO) == null || r.forEach((o) => {
        var n;
        return (n = o.hostUpdate) == null ? void 0 : n.call(o);
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
    (i = this._$EO) == null || i.forEach((r) => {
      var o;
      return (o = r.hostUpdated) == null ? void 0 : o.call(r);
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
pt.elementStyles = [], pt.shadowRootOptions = { mode: "open" }, pt[Tt("elementProperties")] = /* @__PURE__ */ new Map(), pt[Tt("finalized")] = /* @__PURE__ */ new Map(), Ni == null || Ni({ ReactiveElement: pt }), (We.reactiveElementVersions ?? (We.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mt = globalThis, _o = (t) => t, si = Mt.trustedTypes, po = si ? si.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, On = "$lit$", Ve = `lit$${Math.random().toFixed(9).slice(2)}$`, Rn = "?" + Ve, Aa = `<${Rn}>`, it = document, Pt = () => it.createComment(""), It = (t) => t === null || typeof t != "object" && typeof t != "function", vr = Array.isArray, Pa = (t) => vr(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Li = `[ 	
\f\r]`, wt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, mo = /-->/g, yo = />/g, Xe = RegExp(`>|${Li}(?:([^\\s"'>=/]+)(${Li}*=${Li}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), go = /'/g, fo = /"/g, Nn = /^(?:script|style|textarea|title)$/i, Ln = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), y = Ln(1), be = Ln(2), rt = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), bo = /* @__PURE__ */ new WeakMap(), et = it.createTreeWalker(it, 129);
function Hn(t, e) {
  if (!vr(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return po !== void 0 ? po.createHTML(e) : e;
}
const Ia = (t, e) => {
  const i = t.length - 1, r = [];
  let o, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = wt;
  for (let a = 0; a < i; a++) {
    const c = t[a];
    let d, u, h = -1, _ = 0;
    for (; _ < c.length && (s.lastIndex = _, u = s.exec(c), u !== null); ) _ = s.lastIndex, s === wt ? u[1] === "!--" ? s = mo : u[1] !== void 0 ? s = yo : u[2] !== void 0 ? (Nn.test(u[2]) && (o = RegExp("</" + u[2], "g")), s = Xe) : u[3] !== void 0 && (s = Xe) : s === Xe ? u[0] === ">" ? (s = o ?? wt, h = -1) : u[1] === void 0 ? h = -2 : (h = s.lastIndex - u[2].length, d = u[1], s = u[3] === void 0 ? Xe : u[3] === '"' ? fo : go) : s === fo || s === go ? s = Xe : s === mo || s === yo ? s = wt : (s = Xe, o = void 0);
    const p = s === Xe && t[a + 1].startsWith("/>") ? " " : "";
    n += s === wt ? c + Aa : h >= 0 ? (r.push(d), c.slice(0, h) + On + c.slice(h) + Ve + p) : c + Ve + (h === -2 ? a : p);
  }
  return [Hn(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class Dt {
  constructor({ strings: e, _$litType$: i }, r) {
    let o;
    this.parts = [];
    let n = 0, s = 0;
    const a = e.length - 1, c = this.parts, [d, u] = Ia(e, i);
    if (this.el = Dt.createElement(d, r), et.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = et.nextNode()) !== null && c.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(On)) {
          const _ = u[s++], p = o.getAttribute(h).split(Ve), m = /([.?@])?(.*)/.exec(_);
          c.push({ type: 1, index: n, name: m[2], strings: p, ctor: m[1] === "." ? Oa : m[1] === "?" ? Ra : m[1] === "@" ? Na : fi }), o.removeAttribute(h);
        } else h.startsWith(Ve) && (c.push({ type: 6, index: n }), o.removeAttribute(h));
        if (Nn.test(o.tagName)) {
          const h = o.textContent.split(Ve), _ = h.length - 1;
          if (_ > 0) {
            o.textContent = si ? si.emptyScript : "";
            for (let p = 0; p < _; p++) o.append(h[p], Pt()), et.nextNode(), c.push({ type: 2, index: ++n });
            o.append(h[_], Pt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Rn) c.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(Ve, h + 1)) !== -1; ) c.push({ type: 7, index: n }), h += Ve.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const r = it.createElement("template");
    return r.innerHTML = e, r;
  }
}
function mt(t, e, i = t, r) {
  var s, a;
  if (e === rt) return e;
  let o = r !== void 0 ? (s = i._$Co) == null ? void 0 : s[r] : i._$Cl;
  const n = It(e) ? void 0 : e._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== n && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), n === void 0 ? o = void 0 : (o = new n(t), o._$AT(t, i, r)), r !== void 0 ? (i._$Co ?? (i._$Co = []))[r] = o : i._$Cl = o), o !== void 0 && (e = mt(t, o._$AS(t, e.values), o, r)), e;
}
class Da {
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
    const { el: { content: i }, parts: r } = this._$AD, o = ((e == null ? void 0 : e.creationScope) ?? it).importNode(i, !0);
    et.currentNode = o;
    let n = et.nextNode(), s = 0, a = 0, c = r[0];
    for (; c !== void 0; ) {
      if (s === c.index) {
        let d;
        c.type === 2 ? d = new Rt(n, n.nextSibling, this, e) : c.type === 1 ? d = new c.ctor(n, c.name, c.strings, this, e) : c.type === 6 && (d = new La(n, this, e)), this._$AV.push(d), c = r[++a];
      }
      s !== (c == null ? void 0 : c.index) && (n = et.nextNode(), s++);
    }
    return et.currentNode = it, o;
  }
  p(e) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, i), i += r.strings.length - 2) : r._$AI(e[i])), i++;
  }
}
class Rt {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, r, o) {
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = r, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    e = mt(this, e, i), It(e) ? e === E || e == null || e === "" ? (this._$AH !== E && this._$AR(), this._$AH = E) : e !== this._$AH && e !== rt && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Pa(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== E && It(this._$AH) ? this._$AA.nextSibling.data = e : this.T(it.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var n;
    const { values: i, _$litType$: r } = e, o = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = Dt.createElement(Hn(r.h, r.h[0]), this.options)), r);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === o) this._$AH.p(i);
    else {
      const s = new Da(o, this), a = s.u(this.options);
      s.p(i), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = bo.get(e.strings);
    return i === void 0 && bo.set(e.strings, i = new Dt(e)), i;
  }
  k(e) {
    vr(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, o = 0;
    for (const n of e) o === i.length ? i.push(r = new Rt(this.O(Pt()), this.O(Pt()), this, this.options)) : r = i[o], r._$AI(n), o++;
    o < i.length && (this._$AR(r && r._$AB.nextSibling, o), i.length = o);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, i); e !== this._$AB; ) {
      const o = _o(e).nextSibling;
      _o(e).remove(), e = o;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class fi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, r, o, n) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = e, this.name = i, this._$AM = o, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = E;
  }
  _$AI(e, i = this, r, o) {
    const n = this.strings;
    let s = !1;
    if (n === void 0) e = mt(this, e, i, 0), s = !It(e) || e !== this._$AH && e !== rt, s && (this._$AH = e);
    else {
      const a = e;
      let c, d;
      for (e = n[0], c = 0; c < n.length - 1; c++) d = mt(this, a[r + c], i, c), d === rt && (d = this._$AH[c]), s || (s = !It(d) || d !== this._$AH[c]), d === E ? e = E : e !== E && (e += (d ?? "") + n[c + 1]), this._$AH[c] = d;
    }
    s && !o && this.j(e);
  }
  j(e) {
    e === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Oa extends fi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === E ? void 0 : e;
  }
}
class Ra extends fi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== E);
  }
}
class Na extends fi {
  constructor(e, i, r, o, n) {
    super(e, i, r, o, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = mt(this, e, i, 0) ?? E) === rt) return;
    const r = this._$AH, o = e === E && r !== E || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, n = e !== E && (r === E || o);
    o && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class La {
  constructor(e, i, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    mt(this, e);
  }
}
const Hi = Mt.litHtmlPolyfillSupport;
Hi == null || Hi(Dt, Rt), (Mt.litHtmlVersions ?? (Mt.litHtmlVersions = [])).push("3.3.2");
const Ha = (t, e, i) => {
  const r = (i == null ? void 0 : i.renderBefore) ?? e;
  let o = r._$litPart$;
  if (o === void 0) {
    const n = (i == null ? void 0 : i.renderBefore) ?? null;
    r._$litPart$ = o = new Rt(e.insertBefore(Pt(), n), n, void 0, i ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = globalThis;
let L = class extends pt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ha(i, this.renderRoot, this.renderOptions);
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
    return rt;
  }
};
var In;
L._$litElement$ = !0, L.finalized = !0, (In = tt.litElementHydrateSupport) == null || In.call(tt, { LitElement: L });
const Bi = tt.litElementPolyfillSupport;
Bi == null || Bi({ LitElement: L });
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
const Ba = { attribute: !0, type: String, converter: ni, reflect: !1, hasChanged: br }, Fa = (t = Ba, e, i) => {
  const { kind: r, metadata: o } = i;
  let n = globalThis.litPropertyMetadata.get(o);
  if (n === void 0 && globalThis.litPropertyMetadata.set(o, n = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), r === "accessor") {
    const { name: s } = i;
    return { set(a) {
      const c = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(s, c, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, t, a), a;
    } };
  }
  if (r === "setter") {
    const { name: s } = i;
    return function(a) {
      const c = this[s];
      e.call(this, a), this.requestUpdate(s, c, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function I(t) {
  return (e, i) => typeof i == "object" ? Fa(t, e, i) : ((r, o, n) => {
    const s = o.hasOwnProperty(n);
    return o.constructor.createProperty(n, r), s ? Object.getOwnPropertyDescriptor(o, n) : void 0;
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
const Va = { ATTRIBUTE: 1 }, Wa = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Ua = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, r) {
    this._$Ct = e, this._$AM = i, this._$Ci = r;
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
const Bn = "important", ja = " !" + Bn, M = Wa(class extends Ua {
  constructor(t) {
    var e;
    if (super(t), t.type !== Va.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t) {
    return Object.keys(t).reduce((e, i) => {
      const r = t[i];
      return r == null ? e : e + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
    }, "");
  }
  update(t, [e]) {
    const { style: i } = t.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(e)), this.render(e);
    for (const r of this.ft) e[r] == null && (this.ft.delete(r), r.includes("-") ? i.removeProperty(r) : i[r] = null);
    for (const r in e) {
      const o = e[r];
      if (o != null) {
        this.ft.add(r);
        const n = typeof o == "string" && o.endsWith(ja);
        r.includes("-") || n ? i.setProperty(r, n ? o.slice(0, -11) : o, n ? Bn : "") : i[r] = o;
      }
    }
    return rt;
  }
}), N = (t, e) => {
  if (e)
    return t.states[e];
}, F = (t, e) => {
  const i = N(t, e);
  if (!i)
    return null;
  const r = Number(i.state);
  return Number.isFinite(r) ? r : null;
}, U = (t, e) => {
  const i = N(t, e);
  if (!i)
    return;
  const r = i.attributes.unit_of_measurement;
  return typeof r == "string" ? r : void 0;
}, oi = (t, e) => {
  const i = N(t, e);
  return i == null ? void 0 : i.state;
}, ie = (t, e = "hybrid") => t === "history" || t === "statistics" || t === "hybrid" ? t : t === "auto" || e === "auto" ? "hybrid" : e, Fn = 3e4, Ka = 10 * 6e4, Ga = 1440, Xa = 1e4, Ya = 2e3, Vn = 40, bi = /* @__PURE__ */ new Map(), Fi = /* @__PURE__ */ new Map(), Vi = /* @__PURE__ */ new Map(), vo = /* @__PURE__ */ new WeakMap(), wo = /* @__PURE__ */ new WeakMap(), xo = /* @__PURE__ */ new WeakMap(), So = /* @__PURE__ */ new WeakMap(), wr = (t, e = Ga) => {
  if (t.length <= e)
    return t;
  if (e <= 2)
    return [t[0], t[t.length - 1]];
  const i = t.slice(1, -1), r = Math.max(1, Math.floor((e - 2) / 2)), o = i.length / r, n = [t[0]];
  for (let c = 0; c < r; c += 1) {
    const d = Math.floor(c * o), u = Math.max(d + 1, Math.floor((c + 1) * o)), h = i.slice(d, u);
    if (h.length === 0)
      continue;
    let _ = h[0], p = h[0];
    for (const m of h)
      m.value < _.value && (_ = m), m.value > p.value && (p = m);
    if (_.ts <= p.ts ? (n.push(_), p !== _ && n.push(p)) : (n.push(p), _ !== p && n.push(_)), n.length >= e - 1)
      break;
  }
  if (n.push(t[t.length - 1]), n.length <= e)
    return n;
  const s = [n[0]], a = (n.length - 2) / (e - 2);
  for (let c = 0; c < e - 2; c += 1) {
    const d = 1 + Math.floor(c * a);
    s.push(n[d]);
  }
  return s.push(n[n.length - 1]), s;
}, Wn = (t, e) => {
  const i = e ? Xa : Ya;
  return !Number.isFinite(t) || t <= 0 || i <= 1 ? Math.max(0, Math.floor(t)) : Math.max(0, Math.floor(t / i) * i);
}, Za = (t) => {
  const e = (r) => {
    if (typeof r == "string") {
      const o = Date.parse(r);
      return Number.isFinite(o) ? o : null;
    }
    if (typeof r == "number" && Number.isFinite(r)) {
      if (r > 1e12)
        return Math.floor(r);
      if (r > 0)
        return Math.floor(r * 1e3);
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
  for (const r of i) {
    const o = e(r);
    if (o !== null)
      return o;
  }
  return null;
}, ai = (t, e, i) => {
  const r = [...t, ...e].filter((n) => Number.isFinite(n.ts) && Number.isFinite(n.value) && n.ts >= i).sort((n, s) => n.ts - s.ts);
  if (r.length <= 1)
    return r;
  const o = [];
  return r.forEach((n) => {
    const s = o[o.length - 1];
    if (s && Math.abs(s.ts - n.ts) <= 0.5) {
      o[o.length - 1] = n;
      return;
    }
    o.push(n);
  }), wr(o);
}, qa = (t, e, i = Date.now()) => {
  if (!Array.isArray(t))
    return { entityId: null, points: [] };
  const r = [];
  let o = null;
  for (const a of t) {
    if (!a || typeof a != "object")
      continue;
    const c = a;
    o === null && typeof c.entity_id == "string" && c.entity_id.length > 0 && (o = c.entity_id);
    const d = Number(c.state), u = Za(c);
    !Number.isFinite(d) || u === null || r.push({ ts: u, value: d });
  }
  const n = i - e, s = r.filter((a) => a.ts >= n).sort((a, c) => a.ts - c.ts);
  return {
    entityId: o,
    points: wr(s)
  };
}, vi = (t, e, i) => `${t}|${e}|${i}`, ae = (t) => t.map((e) => ({ ts: e.ts, value: e.value })), Wi = (t) => {
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
}, Ja = (t) => Wi(t.start) ?? Wi(t.end) ?? Wi(t.last_reset), Qa = (t) => {
  const e = [
    t.state,
    t.mean,
    t.sum,
    t.max,
    t.min,
    t.change
  ];
  for (const i of e) {
    const r = Number(i);
    if (Number.isFinite(r))
      return r;
  }
  return null;
}, el = (t, e, i = Date.now()) => {
  if (!Array.isArray(t))
    return [];
  const r = [];
  t.forEach((s) => {
    if (!s || typeof s != "object")
      return;
    const a = s, c = Ja(a), d = Qa(a);
    c === null || d === null || r.push({ ts: c, value: d });
  });
  const o = i - e, n = r.filter((s) => s.ts >= o).sort((s, a) => s.ts - a.ts);
  return wr(n);
}, Un = (t) => {
  const e = So.get(t);
  if (e)
    return e;
  const i = /* @__PURE__ */ new Map();
  return So.set(t, i), i;
}, jn = (t, e, i) => {
  const r = Un(t), o = r.get(e);
  return o ? o.expiresAt <= i ? (r.delete(e), null) : o.supported : null;
}, $o = (t, e, i, r) => {
  Un(t).set(e, {
    supported: i,
    expiresAt: r + Ka
  });
}, tl = (t) => {
  const e = vo.get(t);
  if (e)
    return e;
  const i = /* @__PURE__ */ new Map();
  return vo.set(t, i), i;
}, Kn = async (t, e, i, r, o, n) => {
  const s = new Date(r).toISOString(), a = e.join(","), c = `history/period/${s}?filter_entity_id=${encodeURIComponent(a)}&minimal_response&no_attributes`;
  let d;
  try {
    d = await t("GET", c);
  } catch {
    const _ = {};
    return e.forEach((p) => {
      _[p] = [];
    }), _;
  }
  const u = Array.isArray(d) ? d : [], h = {};
  return u.forEach((_, p) => {
    const m = qa(_, i, o), f = e[p], g = m.entityId ?? f;
    g && (h[g] = m.points);
  }), e.forEach((_) => {
    _ in h || (h[_] = []), n && bi.set(vi("history", _, i), {
      expiresAt: o + Fn,
      points: ae(h[_])
    });
  }), h;
}, il = (t, e, i, r, o) => {
  const n = tl(t);
  let s = n.get(e);
  return s || (s = {
    entityIds: /* @__PURE__ */ new Set(),
    waiters: []
  }, n.set(e, s)), i.forEach((a) => s == null ? void 0 : s.entityIds.add(a)), new Promise((a, c) => {
    s == null || s.waiters.push({ entityIds: [...i], resolve: a, reject: c }), (s == null ? void 0 : s.flushTimer) === void 0 && (s.flushTimer = setTimeout(async () => {
      const d = n.get(e);
      if (!d)
        return;
      n.delete(e);
      const u = Array.from(d.entityIds);
      try {
        const h = await Kn(
          t,
          u,
          r,
          o,
          Date.now(),
          !0
        );
        d.waiters.forEach((_) => {
          const p = {};
          _.entityIds.forEach((m) => {
            p[m] = ae(h[m] ?? []);
          }), _.resolve(p);
        });
      } catch (h) {
        d.waiters.forEach((_) => _.reject(h));
      }
    }, Vn));
  });
}, rl = (t) => {
  const e = wo.get(t);
  if (e)
    return e;
  const i = /* @__PURE__ */ new Map();
  return wo.set(t, i), i;
}, ol = async (t, e, i, r) => {
  const o = [...r], n = new Date(e).toISOString(), s = new Date(i).toISOString(), a = xo.get(t), c = a ? [a] : ["recorder/statistics_during_period", "history/statistics_during_period"];
  let d;
  for (const u of c)
    try {
      const h = await t({
        type: u,
        start_time: n,
        end_time: s,
        statistic_ids: o,
        period: "5minute",
        types: ["state", "mean", "sum"]
      });
      return xo.set(t, u), h;
    } catch (h) {
      d = h;
    }
  throw d;
}, nl = async (t, e) => {
  if (e.length === 0)
    return /* @__PURE__ */ new Set();
  try {
    const i = await t({
      type: "recorder/get_statistics_metadata",
      statistic_ids: e
    });
    if (!Array.isArray(i))
      return null;
    const r = /* @__PURE__ */ new Set();
    return i.forEach((o) => {
      if (!o || typeof o != "object")
        return;
      const n = o.statistic_id;
      typeof n == "string" && n.length > 0 && r.add(n);
    }), r;
  } catch {
    return null;
  }
}, Gn = async (t, e, i, r, o, n) => {
  let s;
  try {
    s = await ol(t, r, o, e);
  } catch {
    const p = new Set(e), m = {};
    return e.forEach((f) => {
      m[f] = [];
    }), {
      pointsByEntity: m,
      unsupportedEntityIds: p
    };
  }
  const a = s && typeof s == "object" && !Array.isArray(s) ? s : {}, c = {}, d = /* @__PURE__ */ new Set(), u = [];
  e.forEach((p) => {
    if (!Object.prototype.hasOwnProperty.call(a, p)) {
      c[p] = [], u.push(p);
      return;
    }
    const m = el(a[p], i, o);
    c[p] = m, $o(t, p, !0, o), n && bi.set(vi("statistics", p, i), {
      expiresAt: o + Fn,
      points: ae(m)
    });
  });
  const h = [];
  u.forEach((p) => {
    const m = jn(t, p, o);
    if (m !== !0) {
      if (m === !1) {
        d.add(p);
        return;
      }
      h.push(p);
    }
  });
  const _ = await nl(t, h);
  return _ !== null ? h.forEach((p) => {
    const m = _.has(p);
    $o(t, p, m, o), m || d.add(p);
  }) : h.forEach((p) => {
    d.add(p);
  }), {
    pointsByEntity: c,
    unsupportedEntityIds: d
  };
}, sl = (t, e, i, r, o) => {
  const n = rl(t);
  let s = n.get(e);
  return s || (s = {
    entityIds: /* @__PURE__ */ new Set(),
    waiters: []
  }, n.set(e, s)), i.forEach((a) => s == null ? void 0 : s.entityIds.add(a)), new Promise((a, c) => {
    s == null || s.waiters.push({ entityIds: [...i], resolve: a, reject: c }), (s == null ? void 0 : s.flushTimer) === void 0 && (s.flushTimer = setTimeout(async () => {
      const d = n.get(e);
      if (!d)
        return;
      n.delete(e);
      const u = Array.from(d.entityIds);
      try {
        const h = await Gn(
          t,
          u,
          r,
          o,
          Date.now(),
          !0
        );
        d.waiters.forEach((_) => {
          const p = {
            pointsByEntity: {},
            unsupportedEntityIds: /* @__PURE__ */ new Set()
          };
          _.entityIds.forEach((m) => {
            p.pointsByEntity[m] = ae(h.pointsByEntity[m] ?? []), h.unsupportedEntityIds.has(m) && p.unsupportedEntityIds.add(m);
          }), _.resolve(p);
        });
      } catch (h) {
        d.waiters.forEach((_) => _.reject(h));
      }
    }, Vn));
  });
}, Xn = async (t, e, i, r) => {
  const o = t.callApi, n = Array.from(new Set(e.filter((g) => g.length > 0)));
  if (!o || n.length === 0)
    return {};
  const s = Date.now(), a = typeof r == "number" && Number.isFinite(r) ? Math.max(s - i, Math.floor(r)) : s - i, c = a <= s - i + 1e3, d = Wn(a, c), u = {}, h = [];
  if (n.forEach((g) => {
    if (c) {
      const v = vi("history", g, i), b = bi.get(v);
      if (b && b.expiresAt > s) {
        u[g] = ae(b.points);
        return;
      }
    }
    h.push(g);
  }), h.length === 0)
    return u;
  if (c) {
    const g = `${d}|${i}`, v = await il(
      o,
      g,
      h,
      i,
      d
    );
    return h.forEach((b) => {
      u[b] = ae(v[b] ?? []);
    }), u;
  }
  const _ = [...h].sort(), p = `${d}|${i}|${_.join(",")}`, m = Fi.get(p);
  if (m) {
    const g = await m;
    return h.forEach((v) => {
      u[v] = ae(g[v] ?? []);
    }), u;
  }
  const f = (async () => Kn(
    o,
    h,
    i,
    d,
    s,
    c
  ))();
  Fi.set(p, f);
  try {
    const g = await f;
    return h.forEach((v) => {
      u[v] = ae(g[v] ?? []);
    }), u;
  } finally {
    Fi.delete(p);
  }
}, Yn = async (t, e, i, r) => {
  const o = t.callWS, n = Array.from(new Set(e.filter((b) => b.length > 0)));
  if (!o || n.length === 0)
    return {
      pointsByEntity: {},
      unsupportedEntityIds: new Set(n)
    };
  const s = Date.now(), a = typeof r == "number" && Number.isFinite(r) ? Math.max(s - i, Math.floor(r)) : s - i, c = a <= s - i + 1e3, d = Wn(a, c), u = {}, h = [], _ = /* @__PURE__ */ new Set();
  if (n.forEach((b) => {
    if (jn(o, b, s) === !1) {
      u[b] = [], _.add(b);
      return;
    }
    if (c) {
      const k = vi("statistics", b, i), w = bi.get(k);
      if (w && w.expiresAt > s) {
        u[b] = ae(w.points);
        return;
      }
    }
    h.push(b);
  }), h.length === 0)
    return {
      pointsByEntity: u,
      unsupportedEntityIds: _
    };
  const p = (b) => (h.forEach((x) => {
    u[x] = ae(b.pointsByEntity[x] ?? []), b.unsupportedEntityIds.has(x) && _.add(x);
  }), {
    pointsByEntity: u,
    unsupportedEntityIds: _
  });
  if (c) {
    const b = `${d}|${i}`, x = await sl(
      o,
      b,
      h,
      i,
      d
    );
    return p(x);
  }
  const m = [...h].sort(), f = `${d}|${i}|${m.join(",")}`, g = Vi.get(f);
  if (g) {
    const b = await g;
    return p(b);
  }
  const v = (async () => Gn(
    o,
    h,
    i,
    d,
    s,
    c
  ))();
  Vi.set(f, v);
  try {
    const b = await v;
    return p(b);
  } finally {
    Vi.delete(f);
  }
}, al = async (t, e, i, r) => {
  const o = await Yn(
    t,
    e,
    i,
    r
  ), n = {};
  e.forEach((c) => {
    c.length !== 0 && (n[c] = ae(o.pointsByEntity[c] ?? []));
  });
  const s = Array.from(o.unsupportedEntityIds).filter((c) => c.length > 0);
  if (s.length === 0)
    return n;
  const a = await Xn(
    t,
    s,
    i,
    r
  );
  return s.forEach((c) => {
    n[c] = ae(a[c] ?? []);
  }), n;
}, Ue = async (t, e, i, r) => {
  const o = ie(r == null ? void 0 : r.dataSource, "hybrid");
  return o === "history" ? Xn(t, e, i, r == null ? void 0 : r.startMs) : o === "statistics" ? (await Yn(
    t,
    e,
    i,
    r == null ? void 0 : r.startMs
  )).pointsByEntity : al(t, e, i, r == null ? void 0 : r.startMs);
}, ko = {
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
}, _e = (t) => {
  if (Array.isArray(t) && t.length >= 3) {
    const o = t.slice(0, 3).map((n) => Number(n));
    if (o.every((n) => Number.isFinite(n))) {
      const [n, s, a] = o.map((c) => Math.max(0, Math.min(255, Math.round(c))));
      return `${n}, ${s}, ${a}`;
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
  if (e in ko)
    return `var(--rgb-${e}, ${ko[e]})`;
  const i = /^#([a-fA-F0-9]{3})$/, r = /^#([a-fA-F0-9]{6})$/;
  if (i.test(e)) {
    const [, o] = e.match(i) ?? [];
    if (!o)
      return null;
    const n = parseInt(o[0] + o[0], 16), s = parseInt(o[1] + o[1], 16), a = parseInt(o[2] + o[2], 16);
    return `${n}, ${s}, ${a}`;
  }
  if (r.test(e)) {
    const [, o] = e.match(r) ?? [];
    if (!o)
      return null;
    const n = parseInt(o.slice(0, 2), 16), s = parseInt(o.slice(2, 4), 16), a = parseInt(o.slice(4, 6), 16);
    return `${n}, ${s}, ${a}`;
  }
  return null;
}, ve = (t, e = "") => {
  const i = _e(t);
  if (i)
    return `rgb(${i})`;
  if (typeof t == "string" && t.trim().length > 0) {
    const r = t.trim(), o = r.toLowerCase();
    if (o !== "none" && o !== "default")
      return r;
  }
  return e;
}, xe = (t) => {
  const e = _e(t);
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
}, xr = (t, e, i) => {
  const r = t.map((o) => ({
    x: o.x / 100 * e,
    y: o.y / 100 * i,
    value: o.value,
    ts: o.ts
  }));
  return ll(r, e);
}, ll = (t, e) => {
  if (t.length <= 3)
    return t;
  const i = Math.max(24, Math.min(t.length, Math.round(e)));
  if (t.length <= i)
    return Eo(t);
  const r = [];
  r.push(t[0]);
  const o = (t.length - 1) / (i - 1);
  for (let n = 1; n < i - 1; n += 1) {
    const s = Math.floor(n * o), a = Math.max(s + 1, Math.floor((n + 1) * o)), c = t.slice(s, Math.min(t.length, a));
    if (c.length === 0)
      continue;
    const d = c.reduce(
      (h, _) => (h.x += _.x, h.y += _.y, h.value += _.value, h.ts += _.ts, h),
      { x: 0, y: 0, value: 0, ts: 0 }
    ), u = c.length;
    r.push({
      x: d.x / u,
      y: d.y / u,
      value: d.value / u,
      ts: d.ts / u
    });
  }
  return r.push(t[t.length - 1]), Eo(r);
}, Eo = (t) => {
  if (t.length <= 3)
    return t;
  const e = [t[0]];
  for (let i = 1; i < t.length - 1; i += 1) {
    const r = t[i - 1], o = t[i], n = t[i + 1];
    e.push({
      x: o.x,
      y: (r.y + o.y * 2 + n.y) / 4,
      value: (r.value + o.value * 2 + n.value) / 4,
      ts: o.ts
    });
  }
  return e.push(t[t.length - 1]), e;
}, Co = {
  "": 0,
  k: 1,
  m: -1,
  M: 2,
  G: 3,
  T: 4
}, or = ["", "k", "M", "G", "T"], Se = (t, e) => {
  const i = typeof t == "number" && Number.isFinite(t) ? Math.round(t) : e;
  return Math.max(0, Math.min(4, i));
}, te = (t) => {
  if (!t)
    return null;
  const e = t.trim();
  if (e.length === 0)
    return null;
  if (e.endsWith("Wh")) {
    const i = e.slice(0, -2), o = Co[i === "K" ? "k" : i];
    return o === void 0 ? null : {
      family: "energy",
      prefixPower: o,
      factor: Math.pow(1e3, o),
      canonicalUnit: "Wh"
    };
  }
  if (e.endsWith("W")) {
    const i = e.slice(0, -1), o = Co[i === "K" ? "k" : i];
    return o === void 0 ? null : {
      family: "power",
      prefixPower: o,
      factor: Math.pow(1e3, o),
      canonicalUnit: "W"
    };
  }
  return null;
}, cl = (t, e) => {
  const i = Math.max(0, Math.min(or.length - 1, e)), r = or[i] ?? "";
  return t === "energy" ? `${r}Wh` : `${r}W`;
}, dl = (t) => {
  if (!Number.isFinite(t) || t <= 0)
    return 0;
  let e = 0, i = t;
  for (; i >= 1e3 && e < or.length - 1; )
    i /= 1e3, e += 1;
  return e;
}, Ot = (t, e, i, r) => {
  const o = r.nullWithUnit === !0;
  if (t === null)
    return o && e ? `-- ${e}` : "--";
  const n = te(e);
  if (!r.enabled || !n)
    return `${t.toFixed(i)} ${e}`.trim();
  const s = t < 0 ? "-" : "", a = Math.abs(t) * n.factor, c = dl(a), d = cl(n.family, c), u = a / Math.pow(1e3, c), h = c === 0 ? r.baseDecimals : r.prefixedDecimals;
  return `${s}${u.toFixed(h)} ${d}`.trim();
}, hl = (t) => {
  const e = Object.keys(t), i = {};
  if (e.length === 0)
    return {
      comparable: !1,
      family: null,
      canonicalUnit: null,
      factors: i
    };
  let r = null, o = null;
  for (const n of e) {
    const s = te(t[n]);
    if (!s)
      return {
        comparable: !1,
        family: null,
        canonicalUnit: null,
        factors: i
      };
    if (r === null)
      r = s.family, o = s.canonicalUnit;
    else if (r !== s.family)
      return {
        comparable: !1,
        family: null,
        canonicalUnit: null,
        factors: i
      };
    i[n] = s.factor;
  }
  return {
    comparable: !0,
    family: r,
    canonicalUnit: o,
    factors: i
  };
}, ul = 500, _l = 250, pl = 1e3, ot = (t, e, i) => {
  let r, o, n, s = !1, a = !1;
  const c = t.style.touchAction;
  t.style.touchAction = "manipulation";
  const d = () => {
    r !== void 0 && (clearTimeout(r), r = void 0);
  }, u = () => {
    o !== void 0 && (clearTimeout(o), o = void 0);
  }, h = (g) => {
    g.button === 0 && (i.stopPropagation && g.stopPropagation(), s = !1, u(), i.hasHold && (d(), r = setTimeout(() => {
      s = !0, r = void 0, e.onHold(), o = setTimeout(() => {
        s = !1, o = void 0;
      }, pl);
    }, ul)));
  }, _ = () => {
    d();
  }, p = () => {
    d(), s || (s = !1);
  }, m = (g) => {
    if (i.stopPropagation && g.stopPropagation(), s) {
      s = !1, u(), g.stopPropagation();
      return;
    }
    i.hasDoubleTap ? a ? (a = !1, n !== void 0 && (clearTimeout(n), n = void 0), e.onDoubleTap()) : (a = !0, n = setTimeout(() => {
      a = !1, n = void 0, e.onTap();
    }, _l)) : e.onTap();
  }, f = (g) => {
    (s || r !== void 0) && g.preventDefault();
  };
  return t.addEventListener("pointerdown", h, { passive: !0 }), t.addEventListener("pointerup", _, { passive: !0 }), t.addEventListener("pointercancel", p, { passive: !0 }), t.addEventListener("pointerleave", p, { passive: !0 }), t.addEventListener("click", m), t.addEventListener("contextmenu", f), {
    destroy: () => {
      d(), u(), n !== void 0 && clearTimeout(n), t.removeEventListener("pointerdown", h), t.removeEventListener("pointerup", _), t.removeEventListener("pointercancel", p), t.removeEventListener("pointerleave", p), t.removeEventListener("click", m), t.removeEventListener("contextmenu", f), t.style.touchAction = c;
    }
  };
}, yt = (t) => {
  const e = t.getContext("2d");
  if (!e)
    return null;
  const i = t.offsetWidth || t.getBoundingClientRect().width, r = t.offsetHeight || t.getBoundingClientRect().height, o = Math.max(1, Math.round(i)), n = Math.max(1, Math.round(r)), s = Math.max(1, window.devicePixelRatio || 1), a = Math.max(1, Math.round(o * s)), c = Math.max(1, Math.round(n * s));
  return (t.width !== a || t.height !== c) && (t.width = a, t.height = c), e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, t.width, t.height), e.setTransform(s, 0, 0, s, 0, 0), { ctx: e, width: o, height: n };
}, Ie = (t, e) => {
  const i = document.createElement("span");
  i.style.position = "absolute", i.style.opacity = "0", i.style.pointerEvents = "none", i.style.color = e, t.appendChild(i);
  const r = getComputedStyle(i).color;
  return i.remove(), r || "rgb(158, 158, 158)";
}, ml = (t, e) => {
  const i = t.trim(), r = i.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (r) {
    const d = r.slice(1, 4).map((u) => Math.max(0, Math.min(255, Math.round(Number(u)))));
    if (d.every((u) => Number.isFinite(u)))
      return [d[0], d[1], d[2]];
  }
  let o = e == null ? void 0 : e.ctx;
  if (o === void 0 && (o = document.createElement("canvas").getContext("2d"), e && (e.ctx = o)), !o) return null;
  o.fillStyle = "#000000", o.fillStyle = i;
  const n = o.fillStyle, a = (typeof n == "string" ? n.trim() : "").match(/^#([a-f\d]{6})$/i);
  if (!a) return null;
  const c = a[1];
  return [
    parseInt(c.slice(0, 2), 16),
    parseInt(c.slice(2, 4), 16),
    parseInt(c.slice(4, 6), 16)
  ];
}, gt = (t, e, i) => {
  const r = ml(t, i);
  if (!r) return t;
  const o = Math.max(0, Math.min(1, e));
  return `rgba(${r[0]}, ${r[1]}, ${r[2]}, ${o})`;
}, li = (t, e, i, r) => {
  if (!(e.length < 2)) {
    t.beginPath(), t.moveTo(e[0].x, e[0].y);
    for (let o = 1; o < e.length; o += 1)
      t.lineTo(e[o].x, e[o].y);
    t.strokeStyle = i, t.lineWidth = r, t.lineCap = "round", t.lineJoin = "round", t.stroke();
  }
}, nr = (t, e, i, r, o = 0.24, n = 0, s) => {
  if (e.length < 2) return;
  const a = e[0], c = e[e.length - 1];
  let d = e[0].y;
  for (let h = 1; h < e.length; h += 1)
    e[h].y < d && (d = e[h].y);
  const u = t.createLinearGradient(0, d, 0, r);
  u.addColorStop(0, gt(i, o, s)), u.addColorStop(1, gt(i, n, s)), t.beginPath(), t.moveTo(a.x, a.y);
  for (let h = 1; h < e.length; h += 1)
    t.lineTo(e[h].x, e[h].y);
  t.lineTo(c.x, r), t.lineTo(a.x, r), t.closePath(), t.fillStyle = u, t.fill();
}, yl = (t, e, i, r) => {
  if (!(e.length < 2 || i.length < 2)) {
    t.beginPath(), t.moveTo(e[0].x, e[0].y);
    for (let o = 1; o < e.length; o += 1)
      t.lineTo(e[o].x, e[o].y);
    for (let o = i.length - 1; o >= 0; o -= 1)
      t.lineTo(i[o].x, i[o].y);
    t.closePath(), t.fillStyle = r, t.fill();
  }
}, zo = (t) => {
  if (!Number.isFinite(t) || t <= 0) return 1;
  const e = Math.floor(Math.log10(t)), i = Math.pow(10, e), r = t / i;
  let o;
  return r <= 1 ? o = 1 : r <= 2 ? o = 2 : r <= 5 ? o = 5 : o = 10, o * i;
}, gl = (t, e) => {
  const i = [];
  for (let r = 1; r < t.length; r += 1) {
    const o = t[r - 1], n = t[r], s = o.value <= e, a = n.value <= e;
    if (s === a || Math.abs(n.value - o.value) <= 1e-9) {
      i.push({ start: o, end: n, low: s });
      continue;
    }
    const c = Math.max(0, Math.min(1, (e - o.value) / (n.value - o.value))), d = {
      x: o.x + (n.x - o.x) * c,
      y: o.y + (n.y - o.y) * c,
      value: e
    };
    i.push({ start: o, end: d, low: s }), i.push({ start: d, end: n, low: a });
  }
  return i;
}, fl = (t) => {
  const e = [];
  for (const i of t) {
    if (e.length === 0) {
      e.push({ low: i.low, points: [i.start, i.end] });
      continue;
    }
    const r = e[e.length - 1], o = r.points[r.points.length - 1], n = Math.abs(o.x - i.start.x) <= 0.01 && Math.abs(o.y - i.start.y) <= 0.01;
    r.low === i.low && n ? r.points.push(i.end) : e.push({ low: i.low, points: [i.start, i.end] });
  }
  return e;
}, bl = (t, e, i, r, o) => {
  t.lineWidth = o, t.lineCap = "round", t.lineJoin = "round";
  for (const n of e)
    t.beginPath(), t.moveTo(n.start.x, n.start.y), t.lineTo(n.end.x, n.end.y), t.strokeStyle = n.low ? r : i, t.stroke();
}, vl = (t, e, i = 5) => {
  if (!Number.isFinite(t) || !Number.isFinite(e) || i < 2)
    return [t, e].filter((c) => Number.isFinite(c));
  if (Math.abs(e - t) < 1e-9)
    return [t];
  const r = zo(e - t), o = zo(r / (i - 1)), n = Math.floor(t / o) * o, s = Math.ceil(e / o) * o, a = [];
  for (let c = n; c <= s + o / 2; c += o)
    a.push(Number(c.toFixed(10)));
  return a;
}, Ut = "purple", To = "black", wl = {
  battery: "battery_percentage",
  battery_secondary: "battery_secondary_percentage"
}, Je = (t) => {
  if (typeof t != "string") return;
  const e = t.trim();
  return e.length > 0 ? e : void 0;
}, Mo = (t, e) => {
  var r, o;
  const i = (o = (r = t.states[e]) == null ? void 0 : r.attributes) == null ? void 0 : o.friendly_name;
  return typeof i == "string" && i.length > 0 ? i : void 0;
}, sr = (t, e) => {
  var r, o;
  const i = (o = (r = t.states[e]) == null ? void 0 : r.attributes) == null ? void 0 : o.unit_of_measurement;
  return typeof i == "string" ? i : void 0;
}, Ui = (t, e, i) => {
  if (i)
    return ve(To, To);
  if (Array.isArray(t))
    return ve(t, Ut);
  if (typeof t == "string") {
    const r = t.trim();
    if (r.length > 0 && r !== "state")
      return ve(r, Ut);
  }
  return ve(Ut, Ut);
}, ji = [
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
], Ki = (t, e) => e.defaultVisible ? t[e.visibleKey] !== !1 : t[e.visibleKey] === !0, xl = [
  { prefix: "solar", category: "solar", count: 4 },
  { prefix: "grid", category: "grid", count: 2 },
  { prefix: "grid_secondary", category: "grid_secondary", count: 2 },
  { prefix: "home", category: "home", count: 8 }
], Zn = (t, e) => {
  const i = e, r = [], o = (h) => {
    if (!Ki(i, h)) return;
    const _ = Je(i[h.entityKey]);
    if (!_) return;
    const p = Je(i[h.labelKey]) ?? Mo(t, _) ?? _, m = Ui(i[h.trendColorKey], h.category, !1), f = sr(t, _) ?? "", g = {
      id: _,
      nodeKey: h.nodeKey,
      entityId: _,
      label: p,
      color: m,
      unit: f,
      isPercentage: f === "%",
      isSubBlock: !1,
      category: h.category
    };
    return r.push(g), g;
  }, n = /* @__PURE__ */ new Map();
  for (const h of ji) {
    const _ = o(h);
    _ && n.set(h.nodeKey, _);
  }
  const s = (h, _, p, m, f, g) => {
    const v = Je(i[h]);
    v && r.push({
      id: v,
      nodeKey: m,
      entityId: v,
      label: `${Je(i[_]) ?? g} %`,
      color: Ui(i[p], f, !1),
      unit: "%",
      isPercentage: !0,
      isSubBlock: !1,
      category: f
    });
  };
  Ki(i, ji[4]) && s(
    "battery_percentage_entity",
    "battery_label",
    "battery_trend_color",
    "battery_percentage",
    "battery",
    "Battery"
  ), Ki(i, ji[5]) && s(
    "battery_secondary_percentage_entity",
    "battery_secondary_label",
    "battery_secondary_trend_color",
    "battery_secondary_percentage",
    "battery_secondary",
    "Battery 2"
  );
  const a = [];
  for (const h of xl)
    for (let _ = 1; _ <= h.count; _ += 1) {
      const p = `${h.prefix}_sub_${_}`;
      if (i[`${p}_enabled`] !== !0) continue;
      const m = Je(i[`${p}_entity`]);
      if (!m) continue;
      const f = Je(i[`${p}_label`]) ?? Mo(t, m) ?? m, g = Ui(void 0, h.category, !0), v = sr(t, m) ?? "", b = {
        id: m,
        nodeKey: p,
        entityId: m,
        label: f,
        color: g,
        unit: v,
        isPercentage: v === "%",
        isSubBlock: !0,
        category: h.category
      };
      r.push(b), h.prefix === "solar" && i[`${p}_state_mode`] !== !0 && a.push(b);
    }
  const c = n.get("home");
  if (c && i.home_auto_calculate === !0) {
    const h = Sl(i, t, c.unit, n.get("solar"));
    h && (c.computed = h);
  }
  const d = n.get("solar");
  d && i.solar_auto_calculate === !0 && a.length > 0 && (d.computed = $l(d.unit, a));
  const u = /* @__PURE__ */ new Set();
  return r.filter((h) => u.has(h.entityId) ? !1 : (u.add(h.entityId), !0));
}, Sl = (t, e, i, r) => {
  var c;
  const o = [], n = {}, s = {}, a = (d, u) => {
    const h = Je(t[d]);
    h && (o.push(h), n[h] = sr(e, h) ?? "", s[h] = u);
  };
  if (t.solar_visible !== !1 && a("solar_entity", 1), t.grid_visible !== !1 && a("grid_entity", 1), t.grid_secondary_visible === !0 && a("grid_secondary_entity", 1), t.battery_visible !== !1 && a("battery_entity", -1), t.battery_secondary_visible === !0 && a("battery_secondary_entity", -1), o.length !== 0) {
    if (t.solar_auto_calculate === !0 && ((c = r == null ? void 0 : r.computed) == null ? void 0 : c.mode) === "auto_solar") {
      const d = r.entityId, u = o.indexOf(d);
      if (u >= 0) {
        o.splice(u, 1), delete n[d], delete s[d];
        for (const h of r.computed.dependencies)
          o.includes(h) || (o.push(h), n[h] = r.computed.unitsByEntityId[h] ?? "", s[h] = 1);
      }
    }
    return {
      mode: "auto_home",
      dependencies: o,
      unitsByEntityId: n,
      signsByEntityId: s,
      outputUnit: i
    };
  }
}, $l = (t, e) => {
  const i = [], r = {}, o = {};
  for (const n of e)
    i.push(n.entityId), r[n.entityId] = n.unit, o[n.entityId] = 1;
  return {
    mode: "auto_solar",
    dependencies: i,
    unitsByEntityId: r,
    signsByEntityId: o,
    outputUnit: t
  };
}, kl = (t, e, i) => {
  if (i) {
    const o = t.find((n) => n.id === i);
    if (o) return o;
  }
  const r = wl[e];
  if (r) {
    const o = t.find((n) => n.nodeKey === r);
    if (o) return o;
  }
  return t.find((o) => o.nodeKey === e);
}, qn = (t) => {
  const e = /* @__PURE__ */ new Set();
  for (const i of t)
    if (e.add(i.entityId), i.computed)
      for (const r of i.computed.dependencies) e.add(r);
  return Array.from(e);
}, El = (t, e) => {
  if (t.length === 0) return 0;
  if (e <= t[0].ts) return t[0].value;
  if (e >= t[t.length - 1].ts) return t[t.length - 1].value;
  let i = 0, r = t.length - 1;
  for (; r - i > 1; ) {
    const c = i + r >> 1;
    t[c].ts <= e ? i = c : r = c;
  }
  const o = t[i], n = t[r], s = n.ts - o.ts;
  if (s <= 0) return o.value;
  const a = (e - o.ts) / s;
  return o.value + (n.value - o.value) * a;
}, Cl = (t, e) => {
  const i = t.dependencies.map((u) => ({
    id: u,
    unit: t.unitsByEntityId[u] ?? "",
    sign: t.signsByEntityId[u] ?? 1,
    points: e.get(u) ?? []
  })).filter((u) => u.points.length > 0);
  if (i.length === 0) return [];
  const r = /* @__PURE__ */ new Set();
  for (const u of i)
    for (const h of u.points) r.add(h.ts);
  const o = Array.from(r).sort((u, h) => u - h), n = /* @__PURE__ */ new Map();
  let s = null;
  for (const u of i) {
    const h = te(u.unit);
    h && (n.set(u.id, h.factor), s ?? (s = h.family));
  }
  const a = te(t.outputUnit), c = a && a.family === s ? a.factor : 1, d = [];
  for (const u of o) {
    let h = 0;
    for (const p of i) {
      const m = El(p.points, u), f = n.get(p.id) ?? 1;
      h += p.sign * m * f;
    }
    const _ = c > 0 ? h / c : h;
    Number.isFinite(_) && d.push({ ts: u, value: _ });
  }
  return d;
}, Jn = (t, e) => t.computed ? Cl(t.computed, e) : e.get(t.entityId) ?? [], zl = 64, Tl = 56, Ml = 12, Al = 24, Sr = "11px system-ui, -apple-system, sans-serif", Pl = "var(--secondary-text-color, #757575)", Qn = "rgba(127, 127, 127, 0.18)", Il = (t, e) => {
  var A;
  const i = yt(t);
  if (!i) return null;
  const { ctx: r, width: o, height: n } = i, s = e.host ?? document.body, a = Ie(s, Pl), c = zl, d = o - Tl, u = Ml, h = n - Al, _ = Math.max(1, d - c), p = Math.max(1, h - u), m = (P) => Dl(P, {
    innerLeft: c,
    innerRight: d,
    innerTop: u,
    innerBottom: h,
    innerWidth: _,
    innerHeight: p,
    startMs: e.startMs,
    endMs: e.endMs
  });
  if (e.series.length === 0)
    return lr(r, c, u, _, p, a), m([]);
  const f = Math.max(1, e.endMs - e.startMs), g = { ctx: void 0 };
  if (e.mode === "stacked-percent") {
    const P = Ll(
      r,
      e,
      s,
      { innerLeft: c, innerTop: u, innerBottom: h, innerWidth: _, innerHeight: p },
      f,
      a,
      g
    );
    return Io(r, e, c, h, _, a), m(P);
  }
  const v = [], b = [];
  for (const P of e.series)
    e.mode === "overlay" && P.isPercentage ? b.push(P) : v.push(P);
  const x = es(v), k = Ao(x.map((P) => P.points)), w = b.length > 0 ? Ao(b.map((P) => P.points)) : null;
  ar(
    r,
    k,
    c,
    u,
    p,
    "left",
    ((A = x[0]) == null ? void 0 : A.canonicalUnit) ?? e.primaryAxisLabel ?? "",
    e.tickCount ?? 5,
    e.decimals,
    a
  ), w && ar(
    r,
    w,
    d,
    u,
    p,
    "right",
    "%",
    e.tickCount ?? 5,
    0,
    a
  );
  const S = e.lineWidth ?? 1.6, $ = x.length, T = [];
  for (let P = x.length - 1; P >= 0; P -= 1) {
    const D = x[P], O = Po(
      D.points,
      e.startMs,
      f,
      k,
      c,
      _,
      u,
      p
    ), H = Ie(s, D.color);
    O.length >= 2 && ((e.mode === "single" || $ === 1) && nr(r, O, H, h, 0.24, 0, g), li(r, O, H, S)), T.push({
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
  for (const P of b) {
    const D = Po(
      P.points,
      e.startMs,
      f,
      w ?? { min: 0, max: 100 },
      c,
      _,
      u,
      p
    ), O = Ie(s, P.color);
    D.length >= 2 && (r.save(), r.setLineDash([4, 3]), li(r, D, O, S), r.restore()), T.push({
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
  return Io(r, e, c, h, _, a), m(T);
}, Dl = (t, e) => {
  const i = Math.max(1, e.endMs - e.startMs), r = (s) => {
    const c = (Math.max(e.innerLeft, Math.min(e.innerRight, s)) - e.innerLeft) / Math.max(1, e.innerWidth);
    return e.startMs + c * i;
  }, o = (s) => {
    const a = Math.max(0, Math.min(1, (s - e.startMs) / i));
    return e.innerLeft + a * e.innerWidth;
  }, n = (s) => t.map((a) => ({
    seriesId: a.id,
    label: a.label,
    resolvedColor: a.resolvedColor,
    value: is(a.rawPoints, s),
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
    pixelToTimestamp: r,
    timestampToPixel: o,
    valuesAt: n
  };
}, Ao = (t) => {
  let e = 1 / 0, i = -1 / 0;
  for (const o of t)
    for (const n of o)
      Number.isFinite(n.value) && (n.value < e && (e = n.value), n.value > i && (i = n.value));
  if (!Number.isFinite(e) || !Number.isFinite(i))
    return { min: 0, max: 1 };
  if (e === i) {
    const o = Math.abs(e) * 0.1 || 1;
    return { min: e - o, max: i + o };
  }
  e >= 0 && (e = 0);
  const r = i - e;
  return { min: e - r * 0.05, max: i + r * 0.05 };
}, Po = (t, e, i, r, o, n, s, a) => {
  const c = Math.max(1e-9, r.max - r.min);
  return t.filter((d) => Number.isFinite(d.ts) && Number.isFinite(d.value)).map((d) => {
    const u = Math.max(0, Math.min(1, (d.ts - e) / i)), h = Math.max(0, Math.min(1, (d.value - r.min) / c));
    return {
      x: o + u * n,
      y: s + (1 - h) * a
    };
  });
}, es = (t) => {
  const e = t.map((o) => ({ s: o, parsed: te(o.unit) }));
  let i = null, r = !0;
  for (const o of e) {
    if (!o.parsed) {
      r = !1;
      break;
    }
    if (i === null)
      i = o.parsed.family;
    else if (i !== o.parsed.family) {
      r = !1;
      break;
    }
  }
  return r ? e.map(({ s: o, parsed: n }) => {
    if (!n)
      return { ...o, canonicalUnit: o.unit, rawPoints: o.points };
    const s = n.factor, a = o.points.map((c) => ({
      ts: c.ts,
      value: c.value * s
    }));
    return { ...o, points: a, canonicalUnit: n.canonicalUnit, rawPoints: o.points };
  }) : t.map((o) => ({ ...o, canonicalUnit: o.unit, rawPoints: o.points }));
}, ar = (t, e, i, r, o, n, s, a, c, d) => {
  const u = Math.max(1e-9, e.max - e.min), h = u * 0.07, _ = vl(e.min, e.max, a).filter(
    (m) => m > e.min + h && m < e.max - h
  ), p = [e.min, ..._, e.max];
  t.save(), t.font = Sr, t.fillStyle = d, t.textBaseline = "middle", t.textAlign = n === "left" ? "right" : "left";
  for (const m of p) {
    const f = (m - e.min) / u, g = r + (1 - f) * o, v = n === "left" ? i - 6 : i + 6;
    t.fillText(Nl(m, s, c), v, g), n === "left" && (t.strokeStyle = Qn, t.lineWidth = 1, t.beginPath(), t.moveTo(i, g + 0.5), t.lineTo(i + (t.canvas.width - 1e-3), g + 0.5), t.stroke());
  }
  t.restore();
}, Io = (t, e, i, r, o, n) => {
  const s = Math.max(1, e.endMs - e.startMs), a = s * 0.07, c = ts(s), d = Rl(e.startMs, e.endMs).filter(
    (h) => h.ms > e.startMs + a && h.ms < e.endMs - a
  ), u = [
    { ms: e.startMs, label: c(new Date(e.startMs)), align: "left" },
    ...d.map((h) => ({ ms: h.ms, label: h.label, align: "center" })),
    { ms: e.endMs, label: c(new Date(e.endMs)), align: "right" }
  ];
  t.save(), t.font = Sr, t.fillStyle = n, t.textBaseline = "top";
  for (const h of u) {
    const _ = (h.ms - e.startMs) / s;
    if (_ < 0 || _ > 1) continue;
    const p = i + _ * o;
    t.strokeStyle = Qn, t.lineWidth = 1, t.beginPath(), t.moveTo(p + 0.5, r - 4), t.lineTo(p + 0.5, r), t.stroke(), t.textAlign = h.align, t.fillText(h.label, p, r + 4);
  }
  t.restore();
}, At = 3600 * 1e3, fe = 24 * At, ts = (t) => t <= 6 * At ? (e) => `${dt(e.getHours())}:${dt(e.getMinutes())}` : t <= 2 * fe ? (e) => `${dt(e.getHours())}:00` : t <= 200 * fe ? (e) => `${dt(e.getDate())}.${dt(e.getMonth() + 1)}` : (e) => `${dt(e.getMonth() + 1)}/${String(e.getFullYear()).slice(2)}`, Ol = (t) => t <= 6 * At ? At : t <= 2 * fe ? 6 * At : t <= 14 * fe ? fe : t <= 90 * fe ? 7 * fe : t <= 200 * fe ? 14 * fe : 30 * fe, Rl = (t, e) => {
  const i = e - t, r = Ol(i), o = ts(i), n = Math.ceil(t / r) * r, s = [];
  for (let a = n; a <= e && (s.push({ ms: a, label: o(new Date(a)) }), !(s.length > 16)); a += r)
    ;
  return s;
}, dt = (t) => String(t).padStart(2, "0"), Nl = (t, e, i) => {
  const r = Math.abs(t), o = i !== void 0 ? i : r >= 100 ? 0 : r >= 10 ? 1 : 2, n = t.toFixed(o);
  return e ? `${n} ${e}` : n;
}, Ll = (t, e, i, r, o, n, s) => {
  const a = e.series.filter((f) => !f.isPercentage);
  if (a.length === 0)
    return lr(t, r.innerLeft, r.innerTop, r.innerWidth, r.innerHeight, n), [];
  const c = es(a), d = Hl(c, e.startMs, e.endMs, 256);
  if (d.length < 2)
    return lr(t, r.innerLeft, r.innerTop, r.innerWidth, r.innerHeight, n), [];
  const u = c.map(
    (f) => d.map((g) => Math.max(0, is(f.points, g)))
  ), h = d.map((f, g) => {
    let v = 0;
    for (const b of u) v += b[g];
    return v;
  });
  ar(
    t,
    { min: 0, max: 100 },
    r.innerLeft,
    r.innerTop,
    r.innerHeight,
    "left",
    "%",
    e.tickCount ?? 5,
    0,
    n
  );
  let _ = d.map((f) => ({
    x: Do(f, e.startMs, o, r.innerLeft, r.innerWidth),
    y: r.innerBottom
  }));
  const p = [], m = d.map(() => 0);
  for (let f = 0; f < c.length; f += 1) {
    const g = c[f], v = u[f], b = [], x = [];
    for (let w = 0; w < d.length; w += 1) {
      const S = d[w];
      m[w] += v[w];
      const $ = h[w], T = $ > 0 ? m[w] / $ * 100 : 0, A = $ > 0 ? v[w] / $ * 100 : 0, P = Math.max(0, Math.min(1, T / 100));
      b.push({
        x: Do(S, e.startMs, o, r.innerLeft, r.innerWidth),
        y: r.innerTop + (1 - P) * r.innerHeight
      }), x.push({ ts: S, value: A });
    }
    const k = Ie(i, g.color);
    yl(t, b, _, gt(k, 0.45, s)), li(t, b, k, e.lineWidth ?? 1.4), _ = b, p.push({
      id: g.id,
      label: g.label,
      resolvedColor: k,
      rawUnit: "%",
      canonicalUnit: "%",
      axis: "primary",
      isPercentage: !0,
      points: x,
      rawPoints: x
    });
  }
  return p;
}, Hl = (t, e, i, r) => {
  if (i <= e) return [];
  const o = Math.max(2, Math.min(r, 512)), n = (i - e) / (o - 1), s = [];
  for (let c = 0; c < o; c += 1)
    s.push(e + c * n);
  return t.some((c) => c.points.some((d) => d.ts >= e && d.ts <= i)) ? s : [];
}, is = (t, e) => {
  if (t.length === 0) return 0;
  if (e <= t[0].ts) return t[0].value;
  if (e >= t[t.length - 1].ts) return t[t.length - 1].value;
  let i = 0, r = t.length - 1;
  for (; r - i > 1; ) {
    const c = i + r >> 1;
    t[c].ts <= e ? i = c : r = c;
  }
  const o = t[i], n = t[r], s = n.ts - o.ts;
  if (s <= 0) return o.value;
  const a = (e - o.ts) / s;
  return o.value + (n.value - o.value) * a;
}, Do = (t, e, i, r, o) => {
  const n = Math.max(0, Math.min(1, (t - e) / i));
  return r + n * o;
}, lr = (t, e, i, r, o, n) => {
  t.save(), t.font = Sr, t.fillStyle = n, t.textAlign = "center", t.textBaseline = "middle", t.fillText("No data", e + r / 2, i + o / 2), t.restore();
};
var Bl = Object.defineProperty, rs = (t, e, i, r) => {
  for (var o = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = s(e, i, o) || o);
  return o && Bl(e, i, o), o;
};
const Fl = 180, Or = class Or extends L {
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
    this._closing || (this._closing = !0, setTimeout(() => this.remove(), Fl));
  }
  renderFooter() {
    return E;
  }
  /** Render an inner sub-modal that lives above the main dialog. */
  renderInner() {
    return E;
  }
  renderHeaderExtras() {
    return E;
  }
  render() {
    return y`
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
    return e === E ? E : y`<footer class="ppd-footer">${e}</footer>`;
  }
};
Or.styles = Z`
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
let le = Or;
rs([
  I({ type: String })
], le.prototype, "dialogTitle");
rs([
  C()
], le.prototype, "_closing");
const Ye = (t, e = 2) => String(t).padStart(e, "0"), Vl = (t) => {
  const e = new Date(t), i = -e.getTimezoneOffset(), r = i >= 0 ? "+" : "-", o = Math.abs(i);
  return `${e.getFullYear()}-${Ye(e.getMonth() + 1)}-${Ye(e.getDate())}T${Ye(e.getHours())}:${Ye(e.getMinutes())}:${Ye(e.getSeconds())}${r}${Ye(Math.floor(o / 60))}:${Ye(o % 60)}`;
}, Wl = (t) => /[",\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t, Ul = (t) => {
  var a;
  const e = t.filter((c) => c.points.length > 0), i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set();
  for (const c of e) {
    const d = /* @__PURE__ */ new Map();
    for (const u of c.points)
      d.set(u.ts, u.value), r.add(u.ts);
    i.set(c.entityId, d);
  }
  const o = [...r].sort((c, d) => c - d), n = [], s = [
    "timestamp",
    ...e.map(
      (c) => Wl(c.unit ? `${c.label} (${c.unit})` : c.label)
    )
  ];
  n.push(s.join(","));
  for (const c of o) {
    const d = [Vl(c)];
    for (const u of e) {
      const h = (a = i.get(u.entityId)) == null ? void 0 : a.get(c);
      d.push(h !== void 0 && Number.isFinite(h) ? String(h) : "");
    }
    n.push(d.join(","));
  }
  return n.join(`
`) + `
`;
}, jl = (t, e) => {
  const i = new Blob(["\uFEFF" + e], {
    type: "text/csv;charset=utf-8"
  }), r = URL.createObjectURL(i), o = document.createElement("a");
  o.href = r, o.download = t, o.style.display = "none", document.body.appendChild(o), o.click(), document.body.removeChild(o), setTimeout(() => URL.revokeObjectURL(r), 0);
}, Oo = (t) => t.normalize("NFKD").replace(/[\u0300-\u036F]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "export";
function z(t) {
  var r;
  const e = ((r = t == null ? void 0 : t.locale) == null ? void 0 : r.language) ?? (t == null ? void 0 : t.language) ?? "en";
  return String(e).split("-")[0].toLowerCase() === "de" ? "de" : "en";
}
const cr = {
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
  "timer.editor.companion_entity": "PowerPilz Smart Timer entity",
  "timer.editor.companion_help": "A PowerPilz Smart Timer helper (switch.* entity created by the Companion integration). The card reads its `target_entity`, `on_datetime` and `off_datetime` attributes and uses the `powerpilz_companion.set_timer` service to update times.",
  "timer.placeholder_companion": "Pick a PowerPilz Smart Timer entity in the card settings to configure this card.",
  "timer.editor.name": "Name",
  "timer.editor.subtitle": "Subtitle",
  "timer.editor.icon": "Icon",
  "timer.editor.icon_color": "Icon color",
  "timer.editor.active_color": "Active timer color",
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
  // --- Energy card editor ---
  "energy.editor.intro": "Highly flexible energy flow card with configurable main nodes, trends, sub-nodes, auto calculations, export highlighting, and advanced unit handling.",
  // Section titles
  "energy.editor.section_identity": "Identity",
  "energy.editor.section_display_mode": "Display mode",
  "energy.editor.section_interactions": "Interactions",
  "energy.editor.section_center_visuals": "Center visuals",
  "energy.editor.section_units_trend": "Units and Trend settings",
  "energy.editor.section_auto_scaling": "Auto scaling",
  "energy.editor.section_display_format": "Display format",
  "energy.editor.section_trend_source": "Trend source",
  "energy.editor.section_solar_node": "Solar node",
  "energy.editor.section_grid_node": "Grid node",
  "energy.editor.section_grid_2_node": "Grid 2 node",
  "energy.editor.section_home_node": "Home node",
  "energy.editor.section_battery_node": "Battery node",
  "energy.editor.section_battery_2_node": "Battery 2 node",
  "energy.editor.section_calculation": "Calculation",
  "energy.editor.section_trend": "Trend",
  "energy.editor.section_export": "Export",
  "energy.editor.section_sign_convention": "Sign convention",
  "energy.editor.section_alert": "Alert",
  "energy.editor.section_tap_behavior": "Tap behavior",
  "energy.editor.section_solar_sub_blocks": "Solar sub blocks",
  "energy.editor.section_grid_1_sub_blocks": "Grid 1 sub blocks",
  "energy.editor.section_grid_2_sub_blocks": "Grid 2 sub blocks",
  "energy.editor.section_home_sub_blocks": "Home sub blocks",
  "energy.editor.block_n": "Block {n}",
  // Trend source dropdown
  "energy.editor.trend_source_auto": "Auto (recommended)",
  "energy.editor.trend_source_statistics": "Statistics (fastest)",
  "energy.editor.trend_source_history": "History (raw)",
  // Helpers
  "energy.editor.solar_auto_calc_help": "When enabled, the solar main node shows the sum of enabled solar sub-node entities instead of the solar entity. Solar sub-nodes with State mode enabled are excluded from this sum.",
  "energy.editor.home_auto_calc_help": "When enabled, the home main node is calculated as solar + grid + grid 2 - battery - battery 2 using compatible unit conversion.",
  "energy.editor.grid_export_highlight_help": "When enabled, negative grid values (energy exported to the grid) are highlighted in the trend with the export color.",
  "energy.editor.grid_export_icon_highlight_help": "When enabled, the grid icon switches to the export icon color while the grid value is negative.",
  "energy.editor.grid_visible_help": "When enabled, the main grid node is shown. When disabled, the grid node is hidden.",
  "energy.editor.grid_secondary_visible_help": "When enabled, the second grid node is shown. When disabled, the second grid node is hidden.",
  "energy.editor.solar_visible_help": "When enabled, the main solar node is shown. When disabled, the solar node is hidden.",
  "energy.editor.solar_flow_direction_help": "Flow direction: + value animates from Solar to Center. 0 or - value shows no solar flow.",
  "energy.editor.home_visible_help": "When enabled, the main home node is shown. When disabled, the home node is hidden.",
  "energy.editor.home_flow_direction_help": "Flow direction: + value animates from Center to Home. 0 or - value shows no home flow.",
  "energy.editor.battery_visible_help": "When enabled, the main battery node is shown. When disabled, the battery node is hidden.",
  "energy.editor.battery_flow_direction_help": "Flow direction: + value animates from Center to Battery (charging). - value animates Battery to Center (discharging).",
  "energy.editor.battery_secondary_visible_help": "When enabled, the second battery node is shown. When disabled, the second battery node is hidden.",
  "energy.editor.battery_secondary_flow_direction_help": "Flow direction: + value animates from Center to Battery 2 (charging). - value animates Battery 2 to Center (discharging).",
  "energy.editor.battery_low_alert_color_help": "Color used for battery low-threshold alert styling (icon and low trend section).",
  "energy.editor.battery_invert_flow_help": "Reverse the animated arrow direction (charge / discharge). Use this when your inverter reports the opposite sign for charge/discharge than what PowerPilz expects.",
  "energy.editor.battery_invert_value_sign_help": "Flip the sign of the displayed kW/W value and the power trend graph. Independent from the flow toggle. Does not affect the SOC %.",
  "energy.editor.grid_flow_direction_help": "Flow direction: + value animates from Grid to Center (import). - value animates from Center to Grid (export).",
  "energy.editor.grid_secondary_flow_direction_help": "Flow direction: + value animates from Grid 2 to Center (import). - value animates from Center to Grid 2 (export).",
  "energy.editor.sub_node_identity_value_render_help": "In default mode, this sub-node renders the entity as numeric value + unit.",
  "energy.editor.sub_node_state_mode_help": "When enabled, this sub-node displays the entity state text (for example AUS/WW/HZ) instead of numeric value + unit.",
  "energy.editor.solar_sub_node_state_mode_help": "When enabled, this solar sub-node displays entity state text instead of numeric value + unit and is excluded from Solar auto-calc.",
  "energy.editor.auto_scale_units_help": "Automatically formats values with metric prefixes (for example W/kW/MW and Wh/kWh/MWh).",
  "energy.editor.unit_field_help": "Optional unit override/fallback. Used when entities have no unit and as preferred output unit for auto-calculated values.",
  "energy.editor.decimals_default_help": "Default decimal precision for displayed values and fallback when base/prefixed decimals are not set.",
  "energy.editor.decimals_base_help": "Decimal precision for base units (W, Wh) when Auto unit scaling is enabled.",
  "energy.editor.decimals_prefixed_help": "Decimal precision for prefixed units (kW, MW, kWh, MWh) when Auto unit scaling is enabled.",
  "energy.editor.trend_source_help": "Controls where trend data is fetched from. In most setups, keep Auto (recommended), which prefers statistics and falls back to history automatically.",
  "energy.editor.node_actions_enabled_help": "When on, each node has its own tap/hold/double-tap, configured inside that node's own Interactions section. Tap defaults to the zoom view, long-press to the node detail dialog. The card-level Tap/Hold/Double-tap fields below are then no longer applied to node clicks.",
  "energy.editor.node_interaction_help": "Choose what happens when you tap, long-press or double-tap this node. Long-press defaults to opening the PowerPilz node detail dialog with a history graph.",
  "energy.editor.default_entity_help": "Default entity used by card-level more-info actions. Each main node and sub-block can override its own entity via its Interactions section.",
  // Field labels (LABELS map)
  "energy.editor.name": "Name",
  "energy.editor.home_visible": "Show home",
  "energy.editor.solar_visible": "Show solar",
  "energy.editor.grid_visible": "Show grid",
  "energy.editor.grid_secondary_visible": "Show grid 2",
  "energy.editor.battery_visible": "Show battery",
  "energy.editor.battery_secondary_visible": "Show battery 2",
  "energy.editor.battery_dual_alignment": "Battery 2 alignment",
  "energy.editor.home_auto_calculate": "Auto-calc home",
  "energy.editor.solar_auto_calculate": "Auto-calc solar",
  "energy.editor.home_entity": "Home sensor",
  "energy.editor.solar_entity": "Solar sensor",
  "energy.editor.grid_entity": "Grid sensor",
  "energy.editor.grid_secondary_entity": "Grid 2 sensor",
  "energy.editor.battery_entity": "Battery sensor",
  "energy.editor.battery_percentage_entity": "Battery SoC sensor",
  "energy.editor.battery_secondary_entity": "Battery 2 sensor",
  "energy.editor.battery_secondary_percentage_entity": "Battery 2 SoC sensor",
  "energy.editor.solar_sub_enabled": "Enable solar sub",
  "energy.editor.solar_sub_entity": "Solar sub sensor",
  "energy.editor.solar_sub_label": "Solar sub name",
  "energy.editor.solar_sub_icon": "Solar sub icon",
  "energy.editor.solar_sub_icon_color": "Solar sub color",
  "energy.editor.home_sub_enabled": "Enable home sub",
  "energy.editor.home_sub_entity": "Home sub sensor",
  "energy.editor.home_sub_label": "Home sub name",
  "energy.editor.home_sub_icon": "Home sub icon",
  "energy.editor.home_sub_icon_color": "Home sub color",
  "energy.editor.solar_label": "Solar name",
  "energy.editor.home_label": "Home name",
  "energy.editor.grid_label": "Grid name",
  "energy.editor.grid_secondary_label": "Grid 2 name",
  "energy.editor.battery_label": "Battery name",
  "energy.editor.battery_secondary_label": "Battery 2 name",
  "energy.editor.solar_icon": "Solar icon",
  "energy.editor.solar_icon_color": "Solar icon color",
  "energy.editor.solar_trend": "Solar trend",
  "energy.editor.solar_trend_color": "Solar trend color",
  "energy.editor.grid_icon": "Grid icon",
  "energy.editor.grid_icon_color": "Grid icon color",
  "energy.editor.grid_secondary_icon": "Grid 2 icon",
  "energy.editor.grid_secondary_icon_color": "Grid 2 icon color",
  "energy.editor.grid_secondary_trend": "Grid 2 trend",
  "energy.editor.grid_secondary_trend_color": "Grid 2 trend color",
  "energy.editor.grid_trend": "Grid trend",
  "energy.editor.grid_trend_color": "Grid trend color",
  "energy.editor.grid_export_highlight": "Highlight export in trend",
  "energy.editor.grid_export_trend_color": "Export trend color",
  "energy.editor.grid_export_icon_highlight": "Highlight export icon",
  "energy.editor.grid_export_icon_color": "Export icon color",
  "energy.editor.home_icon": "Home icon",
  "energy.editor.home_icon_color": "Home icon color",
  "energy.editor.home_trend": "Home trend",
  "energy.editor.home_trend_color": "Home trend color",
  "energy.editor.battery_icon": "Battery icon",
  "energy.editor.battery_icon_color": "Battery icon color",
  "energy.editor.battery_trend": "Battery trend",
  "energy.editor.battery_trend_color": "Battery trend color",
  "energy.editor.battery_secondary_icon": "Battery 2 icon",
  "energy.editor.battery_secondary_icon_color": "Battery 2 icon color",
  "energy.editor.battery_secondary_trend": "Battery 2 trend",
  "energy.editor.battery_secondary_trend_color": "Battery 2 trend color",
  "energy.editor.shared_trend_scale": "Shared trend scale",
  "energy.editor.trend_data_source": "Trend source",
  "energy.editor.battery_low_alert": "Low battery alert",
  "energy.editor.battery_low_threshold": "Low battery %",
  "energy.editor.battery_low_alert_color": "Low alert color",
  "energy.editor.battery_secondary_low_alert": "Battery 2 low alert",
  "energy.editor.battery_secondary_low_threshold": "Battery 2 low %",
  "energy.editor.battery_secondary_low_alert_color": "Low alert color",
  "energy.editor.battery_invert_flow": "Reverse flow direction",
  "energy.editor.battery_invert_value_sign": "Flip displayed value sign",
  "energy.editor.battery_secondary_invert_flow": "Reverse flow direction",
  "energy.editor.battery_secondary_invert_value_sign": "Flip displayed value sign",
  "energy.editor.core_icon": "Core icon",
  "energy.editor.core_icon_color": "Core icon color",
  "energy.editor.flow_color": "Flow line color",
  "energy.editor.unit": "Unit",
  "energy.editor.decimals": "Decimals",
  "energy.editor.auto_scale_units": "Auto unit scaling",
  "energy.editor.decimals_base_unit": "Decimals (base unit)",
  "energy.editor.decimals_prefixed_unit": "Decimals (prefixed units)",
  "energy.editor.entity": "Action entity",
  "energy.editor.tap_action": "Tap behavior",
  "energy.editor.hold_action": "Hold behavior (default: 24h overview)",
  "energy.editor.double_tap_action": "Double tap behavior",
  "energy.editor.node_actions_enabled": "Enable per-node interactions",
  "energy.editor.node_tap_action": "Tap behavior (default: zoom view)",
  "energy.editor.node_hold_action": "Hold behavior (default: node detail)",
  "energy.editor.node_double_tap_action": "Double tap behavior",
  // Sub-block field labels
  "energy.editor.sub_field_enabled": "Enabled",
  "energy.editor.sub_field_entity": "Entity",
  "energy.editor.sub_field_label": "Label",
  "energy.editor.sub_field_icon": "Icon",
  "energy.editor.sub_field_icon_color": "Color",
  "energy.editor.sub_field_state_mode": "State mode",
  "energy.editor.sub_field_tap_action": "Tap behavior",
  "energy.editor.sub_field_hold_action": "Hold behavior",
  "energy.editor.sub_field_double_tap_action": "Double tap behavior",
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
  "graph.editor.section_units_and_format": "Units and format",
  "graph.editor.section_actions": "Actions",
  "graph.editor.section_display_format": "Display format",
  "graph.editor.section_auto_scaling": "Auto scaling",
  "graph.editor.section_identity": "Identity",
  "graph.editor.section_appearance": "Appearance",
  "graph.editor.entity_slot": "Sensor {n}",
  "graph.editor.entity_picker": "Sensor",
  "graph.editor.entity_enabled": "Enabled",
  "graph.editor.entity_name": "Name",
  "graph.editor.entity_show_icon": "Show icon",
  "graph.editor.entity_icon": "Icon",
  "graph.editor.entity_icon_color": "Icon color",
  "graph.editor.entity_trend_color": "Graph color",
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
}, Kl = {
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
  "timer.editor.companion_entity": "PowerPilz Smart Timer-Entität",
  "timer.editor.companion_help": "Ein PowerPilz Smart Timer-Helfer (switch.* Entität, angelegt von der Companion Integration). Die Karte liest automatisch deren `target_entity`-, `on_datetime`- und `off_datetime`-Attribute und nutzt den `powerpilz_companion.set_timer`-Service zum Setzen der Zeiten.",
  "timer.placeholder_companion": "Wähle in den Karten-Einstellungen eine PowerPilz Smart Timer-Entität aus, um diese Karte zu konfigurieren.",
  "timer.editor.name": "Name",
  "timer.editor.subtitle": "Untertitel",
  "timer.editor.icon": "Symbol",
  "timer.editor.icon_color": "Symbolfarbe",
  "timer.editor.active_color": "Farbe für aktiven Timer",
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
  // --- Energy card editor ---
  "energy.editor.intro": "Flexible Energiefluss-Karte mit konfigurierbaren Haupt-Knoten, Verläufen, Sub-Knoten, Auto-Berechnungen, Export-Hervorhebung und erweiterter Einheiten-Behandlung.",
  // Section titles
  "energy.editor.section_identity": "Identität",
  "energy.editor.section_display_mode": "Anzeige-Modus",
  "energy.editor.section_interactions": "Interaktionen",
  "energy.editor.section_center_visuals": "Zentrum-Darstellung",
  "energy.editor.section_units_trend": "Einheiten- und Verlaufs-Einstellungen",
  "energy.editor.section_auto_scaling": "Auto-Skalierung",
  "energy.editor.section_display_format": "Anzeige-Format",
  "energy.editor.section_trend_source": "Verlaufs-Quelle",
  "energy.editor.section_solar_node": "Solar-Knoten",
  "energy.editor.section_grid_node": "Netz-Knoten",
  "energy.editor.section_grid_2_node": "Netz 2-Knoten",
  "energy.editor.section_home_node": "Haus-Knoten",
  "energy.editor.section_battery_node": "Batterie-Knoten",
  "energy.editor.section_battery_2_node": "Batterie 2-Knoten",
  "energy.editor.section_calculation": "Berechnung",
  "energy.editor.section_trend": "Verlauf",
  "energy.editor.section_export": "Einspeisung",
  "energy.editor.section_sign_convention": "Vorzeichen-Konvention",
  "energy.editor.section_alert": "Alarm",
  "energy.editor.section_tap_behavior": "Tap-Verhalten",
  "energy.editor.section_solar_sub_blocks": "Solar Sub-Blöcke",
  "energy.editor.section_grid_1_sub_blocks": "Netz 1 Sub-Blöcke",
  "energy.editor.section_grid_2_sub_blocks": "Netz 2 Sub-Blöcke",
  "energy.editor.section_home_sub_blocks": "Haus Sub-Blöcke",
  "energy.editor.block_n": "Block {n}",
  // Trend source dropdown
  "energy.editor.trend_source_auto": "Auto (empfohlen)",
  "energy.editor.trend_source_statistics": "Statistik (am schnellsten)",
  "energy.editor.trend_source_history": "Verlauf (Rohdaten)",
  // Helpers
  "energy.editor.solar_auto_calc_help": "Wenn aktiviert, zeigt der Solar-Hauptknoten die Summe der aktivierten Solar-Sub-Knoten-Entitäten statt der Solar-Entität. Solar-Sub-Knoten im Status-Modus werden von dieser Summe ausgenommen.",
  "energy.editor.home_auto_calc_help": "Wenn aktiviert, wird der Haus-Hauptknoten als Solar + Netz + Netz 2 - Batterie - Batterie 2 mit kompatibler Einheiten-Umrechnung berechnet.",
  "energy.editor.grid_export_highlight_help": "Wenn aktiviert, werden negative Netzwerte (Einspeisung ins Netz) im Verlauf mit der Einspeise-Farbe hervorgehoben.",
  "energy.editor.grid_export_icon_highlight_help": "Wenn aktiviert, wechselt das Netz-Symbol zur Einspeise-Symbolfarbe, solange der Netzwert negativ ist.",
  "energy.editor.grid_visible_help": "Wenn aktiviert, wird der Haupt-Netzknoten angezeigt. Wenn deaktiviert, wird der Netz-Knoten ausgeblendet.",
  "energy.editor.grid_secondary_visible_help": "Wenn aktiviert, wird der zweite Netz-Knoten angezeigt. Wenn deaktiviert, wird der zweite Netz-Knoten ausgeblendet.",
  "energy.editor.solar_visible_help": "Wenn aktiviert, wird der Haupt-Solarknoten angezeigt. Wenn deaktiviert, wird der Solar-Knoten ausgeblendet.",
  "energy.editor.solar_flow_direction_help": "Flussrichtung: + Wert animiert von Solar zum Zentrum. 0 oder - Wert zeigt keinen Solar-Fluss.",
  "energy.editor.home_visible_help": "Wenn aktiviert, wird der Haupt-Hausknoten angezeigt. Wenn deaktiviert, wird der Haus-Knoten ausgeblendet.",
  "energy.editor.home_flow_direction_help": "Flussrichtung: + Wert animiert vom Zentrum zum Haus. 0 oder - Wert zeigt keinen Haus-Fluss.",
  "energy.editor.battery_visible_help": "Wenn aktiviert, wird der Haupt-Batterieknoten angezeigt. Wenn deaktiviert, wird der Batterie-Knoten ausgeblendet.",
  "energy.editor.battery_flow_direction_help": "Flussrichtung: + Wert animiert vom Zentrum zur Batterie (Laden). - Wert animiert von der Batterie zum Zentrum (Entladen).",
  "energy.editor.battery_secondary_visible_help": "Wenn aktiviert, wird der zweite Batterie-Knoten angezeigt. Wenn deaktiviert, wird der zweite Batterie-Knoten ausgeblendet.",
  "energy.editor.battery_secondary_flow_direction_help": "Flussrichtung: + Wert animiert vom Zentrum zu Batterie 2 (Laden). - Wert animiert von Batterie 2 zum Zentrum (Entladen).",
  "energy.editor.battery_low_alert_color_help": "Farbe für die Batterie-Unterspannungs-Warnung (Symbol und unterer Verlaufsbereich).",
  "energy.editor.battery_invert_flow_help": "Animierte Pfeilrichtung umkehren (Laden / Entladen). Verwende dies, wenn dein Wechselrichter das umgekehrte Vorzeichen für Laden/Entladen meldet als von PowerPilz erwartet.",
  "energy.editor.battery_invert_value_sign_help": "Vorzeichen des angezeigten kW/W-Werts und des Leistungs-Verlaufsgraphen umkehren. Unabhängig vom Fluss-Schalter. Beeinflusst den SOC % nicht.",
  "energy.editor.grid_flow_direction_help": "Flussrichtung: + Wert animiert vom Netz zum Zentrum (Bezug). - Wert animiert vom Zentrum zum Netz (Einspeisung).",
  "energy.editor.grid_secondary_flow_direction_help": "Flussrichtung: + Wert animiert von Netz 2 zum Zentrum (Bezug). - Wert animiert vom Zentrum zu Netz 2 (Einspeisung).",
  "energy.editor.sub_node_identity_value_render_help": "Im Standard-Modus zeigt dieser Sub-Knoten die Entität als numerischen Wert + Einheit.",
  "energy.editor.sub_node_state_mode_help": "Wenn aktiviert, zeigt dieser Sub-Knoten den Status-Text der Entität (z.B. AUS/WW/HZ) statt numerischer Wert + Einheit.",
  "energy.editor.solar_sub_node_state_mode_help": "Wenn aktiviert, zeigt dieser Solar-Sub-Knoten den Status-Text der Entität statt numerischer Wert + Einheit und wird von der Solar-Auto-Berechnung ausgenommen.",
  "energy.editor.auto_scale_units_help": "Formatiert Werte automatisch mit metrischen Präfixen (z.B. W/kW/MW und Wh/kWh/MWh).",
  "energy.editor.unit_field_help": "Optionale Einheit (Override/Fallback). Wird verwendet, wenn Entitäten keine Einheit haben, und als bevorzugte Ausgabe-Einheit für auto-berechnete Werte.",
  "energy.editor.decimals_default_help": "Standard-Nachkommastellen für angezeigte Werte und Fallback, wenn Basis-/Präfix-Nachkommastellen nicht gesetzt sind.",
  "energy.editor.decimals_base_help": "Nachkommastellen für Basis-Einheiten (W, Wh) wenn Auto-Einheiten-Skalierung aktiv ist.",
  "energy.editor.decimals_prefixed_help": "Nachkommastellen für skalierte Einheiten (kW, MW, kWh, MWh) wenn Auto-Einheiten-Skalierung aktiv ist.",
  "energy.editor.trend_source_help": "Steuert, woher die Verlaufsdaten geholt werden. In den meisten Setups Auto (empfohlen) belassen - bevorzugt Statistik und fällt automatisch auf Verlauf zurück.",
  "energy.editor.node_actions_enabled_help": "Wenn aktiv, hat jeder Knoten eigene Tap/Hold/Doppeltap-Aktionen, konfiguriert im jeweiligen Interaktionen-Abschnitt. Tap öffnet standardmäßig die Zoom-Ansicht, Lange-Tipp das Knoten-Detail-Fenster. Die karten-weiten Tap/Hold/Doppeltap-Felder unten werden dann nicht mehr auf Knoten-Klicks angewendet.",
  "energy.editor.node_interaction_help": "Wähle, was beim Tap, Lange-Tipp oder Doppeltap auf diesen Knoten passieren soll. Lange-Tipp öffnet standardmäßig das PowerPilz Knoten-Detail-Fenster mit Verlaufsgraph.",
  "energy.editor.default_entity_help": "Standard-Entität für karten-weite More-Info-Aktionen. Jeder Haupt-Knoten und Sub-Block kann seine eigene Entität über den Interaktionen-Abschnitt überschreiben.",
  // Field labels
  "energy.editor.name": "Name",
  "energy.editor.home_visible": "Haus anzeigen",
  "energy.editor.solar_visible": "Solar anzeigen",
  "energy.editor.grid_visible": "Netz anzeigen",
  "energy.editor.grid_secondary_visible": "Netz 2 anzeigen",
  "energy.editor.battery_visible": "Batterie anzeigen",
  "energy.editor.battery_secondary_visible": "Batterie 2 anzeigen",
  "energy.editor.battery_dual_alignment": "Batterie 2-Ausrichtung",
  "energy.editor.home_auto_calculate": "Haus auto-berechnen",
  "energy.editor.solar_auto_calculate": "Solar auto-berechnen",
  "energy.editor.home_entity": "Haus-Sensor",
  "energy.editor.solar_entity": "Solar-Sensor",
  "energy.editor.grid_entity": "Netz-Sensor",
  "energy.editor.grid_secondary_entity": "Netz 2-Sensor",
  "energy.editor.battery_entity": "Batterie-Sensor",
  "energy.editor.battery_percentage_entity": "Batterie SoC-Sensor",
  "energy.editor.battery_secondary_entity": "Batterie 2-Sensor",
  "energy.editor.battery_secondary_percentage_entity": "Batterie 2 SoC-Sensor",
  "energy.editor.solar_sub_enabled": "Solar-Sub aktivieren",
  "energy.editor.solar_sub_entity": "Solar-Sub Sensor",
  "energy.editor.solar_sub_label": "Solar-Sub Name",
  "energy.editor.solar_sub_icon": "Solar-Sub Symbol",
  "energy.editor.solar_sub_icon_color": "Solar-Sub Farbe",
  "energy.editor.home_sub_enabled": "Haus-Sub aktivieren",
  "energy.editor.home_sub_entity": "Haus-Sub Sensor",
  "energy.editor.home_sub_label": "Haus-Sub Name",
  "energy.editor.home_sub_icon": "Haus-Sub Symbol",
  "energy.editor.home_sub_icon_color": "Haus-Sub Farbe",
  "energy.editor.solar_label": "Solar-Name",
  "energy.editor.home_label": "Haus-Name",
  "energy.editor.grid_label": "Netz-Name",
  "energy.editor.grid_secondary_label": "Netz 2-Name",
  "energy.editor.battery_label": "Batterie-Name",
  "energy.editor.battery_secondary_label": "Batterie 2-Name",
  "energy.editor.solar_icon": "Solar-Symbol",
  "energy.editor.solar_icon_color": "Solar-Symbolfarbe",
  "energy.editor.solar_trend": "Solar-Verlauf",
  "energy.editor.solar_trend_color": "Solar-Verlaufsfarbe",
  "energy.editor.grid_icon": "Netz-Symbol",
  "energy.editor.grid_icon_color": "Netz-Symbolfarbe",
  "energy.editor.grid_secondary_icon": "Netz 2-Symbol",
  "energy.editor.grid_secondary_icon_color": "Netz 2-Symbolfarbe",
  "energy.editor.grid_secondary_trend": "Netz 2-Verlauf",
  "energy.editor.grid_secondary_trend_color": "Netz 2-Verlaufsfarbe",
  "energy.editor.grid_trend": "Netz-Verlauf",
  "energy.editor.grid_trend_color": "Netz-Verlaufsfarbe",
  "energy.editor.grid_export_highlight": "Einspeisung im Verlauf hervorheben",
  "energy.editor.grid_export_trend_color": "Einspeisung Verlaufsfarbe",
  "energy.editor.grid_export_icon_highlight": "Einspeise-Symbol hervorheben",
  "energy.editor.grid_export_icon_color": "Einspeise-Symbolfarbe",
  "energy.editor.home_icon": "Haus-Symbol",
  "energy.editor.home_icon_color": "Haus-Symbolfarbe",
  "energy.editor.home_trend": "Haus-Verlauf",
  "energy.editor.home_trend_color": "Haus-Verlaufsfarbe",
  "energy.editor.battery_icon": "Batterie-Symbol",
  "energy.editor.battery_icon_color": "Batterie-Symbolfarbe",
  "energy.editor.battery_trend": "Batterie-Verlauf",
  "energy.editor.battery_trend_color": "Batterie-Verlaufsfarbe",
  "energy.editor.battery_secondary_icon": "Batterie 2-Symbol",
  "energy.editor.battery_secondary_icon_color": "Batterie 2-Symbolfarbe",
  "energy.editor.battery_secondary_trend": "Batterie 2-Verlauf",
  "energy.editor.battery_secondary_trend_color": "Batterie 2-Verlaufsfarbe",
  "energy.editor.shared_trend_scale": "Gemeinsame Verlaufs-Skala",
  "energy.editor.trend_data_source": "Verlaufs-Quelle",
  "energy.editor.battery_low_alert": "Batterie-Tief-Alarm",
  "energy.editor.battery_low_threshold": "Batterie tief %",
  "energy.editor.battery_low_alert_color": "Alarmfarbe",
  "energy.editor.battery_secondary_low_alert": "Batterie 2-Tief-Alarm",
  "energy.editor.battery_secondary_low_threshold": "Batterie 2 tief %",
  "energy.editor.battery_secondary_low_alert_color": "Alarmfarbe",
  "energy.editor.battery_invert_flow": "Flussrichtung umkehren",
  "energy.editor.battery_invert_value_sign": "Vorzeichen des Werts umkehren",
  "energy.editor.battery_secondary_invert_flow": "Flussrichtung umkehren",
  "energy.editor.battery_secondary_invert_value_sign": "Vorzeichen des Werts umkehren",
  "energy.editor.core_icon": "Zentrum-Symbol",
  "energy.editor.core_icon_color": "Zentrum-Symbolfarbe",
  "energy.editor.flow_color": "Flusslinien-Farbe",
  "energy.editor.unit": "Einheit",
  "energy.editor.decimals": "Nachkommastellen",
  "energy.editor.auto_scale_units": "Auto-Einheiten-Skalierung",
  "energy.editor.decimals_base_unit": "Nachkommastellen (Basis-Einheit)",
  "energy.editor.decimals_prefixed_unit": "Nachkommastellen (skalierte Einheit)",
  "energy.editor.entity": "Aktions-Entität",
  "energy.editor.tap_action": "Tap-Verhalten",
  "energy.editor.hold_action": "Hold-Verhalten (Standard: 24h-Übersicht)",
  "energy.editor.double_tap_action": "Doppeltap-Verhalten",
  "energy.editor.node_actions_enabled": "Pro-Knoten-Interaktionen aktivieren",
  "energy.editor.node_tap_action": "Tap-Verhalten (Standard: Zoom-Ansicht)",
  "energy.editor.node_hold_action": "Hold-Verhalten (Standard: Knoten-Detail)",
  "energy.editor.node_double_tap_action": "Doppeltap-Verhalten",
  // Sub-block field labels
  "energy.editor.sub_field_enabled": "Aktiviert",
  "energy.editor.sub_field_entity": "Entität",
  "energy.editor.sub_field_label": "Beschriftung",
  "energy.editor.sub_field_icon": "Symbol",
  "energy.editor.sub_field_icon_color": "Farbe",
  "energy.editor.sub_field_state_mode": "Status-Modus",
  "energy.editor.sub_field_tap_action": "Tap-Verhalten",
  "energy.editor.sub_field_hold_action": "Hold-Verhalten",
  "energy.editor.sub_field_double_tap_action": "Doppeltap-Verhalten",
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
  "graph.editor.section_units_and_format": "Einheiten & Format",
  "graph.editor.section_actions": "Aktionen",
  "graph.editor.section_display_format": "Anzeige-Format",
  "graph.editor.section_auto_scaling": "Auto-Skalierung",
  "graph.editor.section_identity": "Identität",
  "graph.editor.section_appearance": "Darstellung",
  "graph.editor.entity_slot": "Sensor {n}",
  "graph.editor.entity_picker": "Sensor",
  "graph.editor.entity_enabled": "Aktiviert",
  "graph.editor.entity_name": "Name",
  "graph.editor.entity_show_icon": "Symbol anzeigen",
  "graph.editor.entity_icon": "Symbol",
  "graph.editor.entity_icon_color": "Symbolfarbe",
  "graph.editor.entity_trend_color": "Graph-Farbe",
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
}, Gl = { en: cr, de: Kl };
function l(t, e, i) {
  let n = (Gl[t === "de" ? "de" : "en"] ?? cr)[e] ?? cr[e] ?? e;
  if (i)
    for (const [s, a] of Object.entries(i))
      n = n.replace(new RegExp(`\\{${s}\\}`, "g"), String(a));
  return n;
}
function re(t, e) {
  return l(t, `weekday.short.${(e % 7 + 7) % 7}`);
}
var Xl = Object.defineProperty, K = (t, e, i, r) => {
  for (var o = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = s(e, i, o) || o);
  return o && Xl(e, i, o), o;
};
const dr = "power-pilz-energy-node-dialog", jt = [
  { id: "24h", label: "24 h", hours: 24 },
  { id: "48h", label: "48 h", hours: 48 },
  { id: "7d", label: "7 d", hours: 168 },
  { id: "30d", label: "30 d", hours: 720 },
  { id: "90d", label: "90 d", hours: 2160 },
  { id: "6m", label: "6 M", hours: 720 * 6 },
  { id: "1y", label: "1 J", hours: 24 * 365 }
], Yl = "7d", Ro = (t) => {
  const e = document.createElement(dr);
  e.hass = t.hass, e.energyConfig = t.config, e.focusedNodeKey = t.focusedNodeKey, e.overview = t.overview === !0, document.body.appendChild(e);
}, Rr = class Rr extends le {
  constructor() {
    super(...arguments), this.focusedNodeKey = "", this.overview = !1, this._allSeries = [], this._selectedIds = /* @__PURE__ */ new Set(), this._mode = "single", this._presetId = Yl, this._useCustomRange = !1, this._customStartIso = "", this._customEndIso = "", this._historyByEntity = /* @__PURE__ */ new Map(), this._loading = !1, this._openPopover = null, this._focusedEntityIdOverride = null, this._fetchAbort = 0, this._chartContext = null, this._canvasLogicalSize = { width: 0, height: 0 }, this._onDocumentMouseDown = (e) => {
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
      const r = i.getBoundingClientRect(), o = e.clientX - r.left, n = e.clientY - r.top, s = this._chartContext;
      if (o < s.innerLeft || o > s.innerRight || n < s.innerTop || n > s.innerBottom) {
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
      const i = this._activeWindow(), r = Ul(
        e.map((a) => ({
          label: a.label,
          entityId: a.entityId,
          unit: a.unit,
          points: this._historyByEntity.get(a.entityId) ?? []
        }))
      ), o = Oo(this.dialogTitle || "energy"), n = new Date(i.endMs).toISOString().slice(0, 10), s = `powerpilz-${o}-${Oo(this._windowLabel())}-${n}.csv`;
      jl(s, r);
    };
  }
  // ------------------------------------------------------------
  // Lifecycle
  // ------------------------------------------------------------
  connectedCallback() {
    if (super.connectedCallback(), this._allSeries = Zn(this.hass, this.energyConfig), !this._customStartIso || !this._customEndIso) {
      const e = /* @__PURE__ */ new Date(), i = new Date(e.getTime() - 168 * 3600 * 1e3);
      this._customEndIso = No(e), this._customStartIso = No(i);
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
    return kl(this._allSeries, this.focusedNodeKey, this._focusedEntityIdOverride);
  }
  _titleForFocusedNode() {
    if (this.overview)
      return l(z(this.hass), "energy.overview_title");
    const e = this._resolveFocusedSeries();
    if (e) return e.label;
    const r = this.energyConfig[`${this.focusedNodeKey}_label`];
    return typeof r == "string" && r.trim().length > 0 ? r.trim() : this.focusedNodeKey;
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
      const o = Kt(this._customStartIso), n = Kt(this._customEndIso);
      if (o !== null && n !== null && n > o)
        return { startMs: o, endMs: n };
    }
    const e = jt.find((o) => o.id === this._presetId) ?? jt[1], i = Date.now();
    return { startMs: i - e.hours * 3600 * 1e3, endMs: i };
  }
  /** True when the user has the custom range toggle on but their start
   *  / end inputs are not a valid window (start ≥ end or unparseable). */
  _customRangeInvalid() {
    if (!this._useCustomRange) return !1;
    const e = Kt(this._customStartIso), i = Kt(this._customEndIso);
    return e === null || i === null || i <= e;
  }
  // ------------------------------------------------------------
  // History fetching
  // ------------------------------------------------------------
  async _fetchHistory() {
    const e = ++this._fetchAbort;
    this._loading = !0, this._loadError = void 0;
    const i = this._activeWindow(), r = i.endMs - i.startMs, o = r > 48 * 3600 * 1e3 ? "statistics" : "hybrid", n = this._activeEntityIds();
    if (n.length === 0) {
      this._loading = !1, this._historyByEntity = /* @__PURE__ */ new Map();
      return;
    }
    try {
      const s = await Ue(
        this.hass,
        n,
        r,
        { startMs: i.startMs, dataSource: o }
      );
      if (e !== this._fetchAbort) return;
      const a = /* @__PURE__ */ new Map();
      for (const c of n)
        a.set(c, s[c] ?? []);
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
    const e = this._allSeries.filter((r) => this._selectedIds.has(r.id)), i = this._resolveFocusedSeries();
    return i && !e.includes(i) && e.push(i), qn(e);
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
    const i = this._activeWindow(), r = this._buildChartSeries();
    this._chartContext = Il(e, {
      mode: this._mode,
      series: r,
      startMs: i.startMs,
      endMs: i.endMs,
      host: this.renderRoot
    });
    const o = e.getBoundingClientRect();
    if (this._canvasLogicalSize = {
      width: Math.max(1, o.width),
      height: Math.max(1, o.height)
    }, this._hover && this._chartContext) {
      const n = this._chartContext.timestampToPixel(this._hover.ts);
      this._hover = { canvasX: n, ts: this._hover.ts };
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
      points: Jn(e, this._historyByEntity)
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
    return y`
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
        ${this._loading ? y`<div class="pp-chart-overlay">Lade…</div>` : E}
        ${this._loadError ? y`<div class="pp-chart-overlay error">${this._loadError}</div>` : E}
      </div>
    `;
  }
  _renderHoverOverlay() {
    if (!this._hover || !this._chartContext) return E;
    const e = this._chartContext, { width: i, height: r } = this._canvasLogicalSize;
    if (i <= 0 || r <= 0) return E;
    const o = this._hover.canvasX / i * 100, n = e.valuesAt(this._hover.ts).filter(
      (a) => Number.isFinite(a.value)
    ), s = o < 60;
    return y`
      <div
        class="pp-hover-line"
        style=${M({ left: `${o}%` })}
        aria-hidden="true"
      ></div>
      <div
        class="pp-tooltip ${s ? "right" : "left"}"
        style=${M({
      left: s ? `${o}%` : "auto",
      right: s ? "auto" : `${100 - o}%`
    })}
      >
        <div class="pp-tooltip-time">${Zl(this._hover.ts)}</div>
        ${n.length === 0 ? y`<div class="pp-tooltip-row muted">—</div>` : n.map((a) => y`
              <div class="pp-tooltip-row">
                <span class="pp-tooltip-swatch" style=${M({ background: a.resolvedColor })}></span>
                <span class="pp-tooltip-label">${a.label}</span>
                <span class="pp-tooltip-value">${ql(a.value, a.rawUnit)}</span>
              </div>
            `)}
      </div>
    `;
  }
  _windowLabel() {
    var e;
    return this._useCustomRange ? "Custom" : ((e = jt.find((i) => i.id === this._presetId)) == null ? void 0 : e.label) ?? this._presetId;
  }
  _renderDownloadButton() {
    const e = this._loading || this._historyByEntity.size === 0 || this._selectedIds.size === 0, i = l(z(this.hass), "energy.download_csv");
    return y`
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
    return y`
      <div class="pp-segmented">
        ${[
      { id: "single", label: "Einzeln" },
      { id: "overlay", label: "Überlagert" },
      { id: "stacked-percent", label: "Gestapelt %" }
    ].map((i) => y`
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
    return y`
      <div class="pp-range-bar">
        ${jt.map((r) => y`
          <button
            class="pp-range-btn ${!this._useCustomRange && this._presetId === r.id ? "active" : ""}"
            @click=${() => this._onPresetClick(r.id)}
          >${r.label}</button>
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
          ${e ? this._renderDatePopover() : E}
        </div>
      </div>
    `;
  }
  _renderDatePopover() {
    const e = this._customRangeInvalid();
    return y`
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
        ${e ? y`<div class="pp-popover-err">Start muss vor Ende liegen.</div>` : E}
      </div>
    `;
  }
  _renderEntityTrigger() {
    const e = this._openPopover === "entities", i = this._mode === "single", r = this._resolveFocusedSeries(), o = this._allSeries.length, n = this._selectedIds.size, s = i ? y`
          ${r ? y`<span class="pp-dropdown-swatch" style=${M({ background: r.color })}></span>` : E}
          <span class="pp-dropdown-label">${(r == null ? void 0 : r.label) ?? "—"}</span>
        ` : y`
          <ha-icon icon="mdi:format-list-checkbox"></ha-icon>
          <span class="pp-dropdown-label">${n}/${o}</span>
        `;
    return y`
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
        ${e ? this._renderEntityPopover() : E}
      </div>
    `;
  }
  _renderEntityPopover() {
    var n;
    const e = this._groupSeriesByCategory(), i = this._mode === "single", r = this._mode === "stacked-percent", o = (n = this._resolveFocusedSeries()) == null ? void 0 : n.id;
    return y`
      <div class="pp-popover pp-entity-popover" data-pp-popover="entities">
        <div class="pp-popover-title">
          <span>${i ? "Entität" : "Entitäten"}</span>
          ${i ? E : y`
                <div class="pp-entity-quick">
                  <button class="pp-link" @click=${() => this._onSelectFocused()}>Nur fokussiert</button>
                  <button class="pp-link" @click=${() => this._onSelectAll()}>Alle</button>
                </div>
              `}
        </div>
        ${r ? y`<div class="pp-popover-hint">Prozent-Entitäten sind in der Stacked-Ansicht ausgeschlossen.</div>` : E}
        <div class="pp-entity-scroll">
          ${e.map((s) => y`
            <div class="pp-entity-group">
              <div class="pp-entity-group-title">${s.title}</div>
              ${s.items.map((a) => this._renderEntityRow(a, {
      isSingle: i,
      stackedExcludes: r,
      focusedId: o
    }))}
            </div>
          `)}
        </div>
      </div>
    `;
  }
  _renderEntityRow(e, i) {
    const r = i.stackedExcludes && e.isPercentage;
    if (i.isSingle) {
      const n = e.id === i.focusedId;
      return y`
        <button
          type="button"
          class="pp-entity-row pp-entity-row-radio ${n ? "active" : ""}"
          title=${e.entityId}
          @click=${() => this._onPickFocusedSeries(e.id)}
        >
          <span class="pp-radio-dot ${n ? "checked" : ""}"></span>
          <span class="pp-entity-swatch" style=${M({ background: e.color })}></span>
          <span class="pp-entity-label">${e.label}</span>
          <span class="pp-entity-unit">${e.unit}</span>
        </button>
      `;
    }
    const o = this._selectedIds.has(e.id) && !r;
    return y`
      <label
        class="pp-entity-row ${r ? "disabled" : ""}"
        title=${e.entityId}
      >
        <input
          type="checkbox"
          .checked=${o}
          ?disabled=${r}
          @change=${() => this._onToggleSeries(e.id)}
        />
        <span class="pp-entity-swatch" style=${M({ background: e.color })}></span>
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
    ], r = /* @__PURE__ */ new Map();
    for (const o of this._allSeries) {
      const n = r.get(o.category) ?? [];
      n.push(o), r.set(o.category, n);
    }
    return i.filter((o) => r.has(o)).map((o) => ({ title: e[o], items: r.get(o) ?? [] }));
  }
};
Rr.styles = [
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
let B = Rr;
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
customElements.get(dr) || customElements.define(dr, B);
const No = (t) => {
  const e = (a) => String(a).padStart(2, "0"), i = t.getFullYear(), r = e(t.getMonth() + 1), o = e(t.getDate()), n = e(t.getHours()), s = e(t.getMinutes());
  return `${i}-${r}-${o}T${n}:${s}`;
}, Kt = (t) => {
  if (!t) return null;
  const e = new Date(t).getTime();
  return Number.isFinite(e) ? e : null;
}, Gt = (t) => String(t).padStart(2, "0"), Zl = (t) => {
  const e = new Date(t), i = `${Gt(e.getDate())}.${Gt(e.getMonth() + 1)}.${e.getFullYear()}`, r = `${Gt(e.getHours())}:${Gt(e.getMinutes())}`;
  return `${i} ${r}`;
}, ql = (t, e) => {
  if (!Number.isFinite(t)) return "—";
  const i = Math.abs(t), r = i >= 100 ? 0 : i >= 10 ? 1 : 2, o = t.toFixed(r);
  return e ? `${o} ${e}` : o;
};
var Jl = Object.defineProperty, je = (t, e, i, r) => {
  for (var o = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = s(e, i, o) || o);
  return o && Jl(e, i, o), o;
};
const Gi = (t) => {
  if (typeof t != "string") return;
  const e = t.trim();
  return e.length > 0 ? e : void 0;
}, hr = "power-pilz-energy-node-zoom-overlay", Ql = 240, Xi = 1440 * 60 * 1e3, Lo = 1.8, ec = (t) => {
  const e = document.createElement(hr);
  e.hass = t.hass, e.energyConfig = t.config, e.focusedNodeKey = t.focusedNodeKey, e.originRect = t.originRect, e.cardRect = t.cardRect, document.body.appendChild(e);
}, Nr = class Nr extends L {
  constructor() {
    super(...arguments), this.focusedNodeKey = "", this._phase = "opening", this._historyByEntity = /* @__PURE__ */ new Map(), this._series = [], this._fetchAbort = 0, this._colorCache = {}, this._lastCanvasPoints = [], this._lastCanvasSize = { width: 0, height: 0 }, this._onKeyDown = (e) => {
      e.key === "Escape" && this._close();
    }, this._onBackdropClick = (e) => {
      e.target === e.currentTarget && this._close();
    }, this._onPointerMove = (e) => {
      const i = this.renderRoot.querySelector(".pp-zoom-area");
      if (!i || this._lastCanvasPoints.length < 2) return;
      const r = i.getBoundingClientRect(), o = e.clientX - r.left, n = e.clientY - r.top;
      if (o < 0 || o > r.width || n < 0 || n > r.height) {
        this._hover && (this._hover = void 0);
        return;
      }
      const s = o / r.width * this._lastCanvasSize.width, a = this._nearestPoint(s);
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
    super.connectedCallback(), this._series = Zn(this.hass, this.energyConfig);
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
    this._phase !== "closing" && (this._phase = "closing", setTimeout(() => this.remove(), Ql));
  }
  // ------------------------------------------------------------
  // Data
  // ------------------------------------------------------------
  async _fetchHistory() {
    const e = ++this._fetchAbort;
    if (!this._focused) return;
    const i = qn([this._focused]);
    if (i.length === 0) return;
    const r = "hybrid", o = Date.now() - Xi;
    try {
      const n = await Ue(
        this.hass,
        i,
        Xi,
        { startMs: o, dataSource: r }
      );
      if (e !== this._fetchAbort) return;
      const s = /* @__PURE__ */ new Map();
      for (const a of i) s.set(a, n[a] ?? []);
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
    const r = yt(e), o = yt(i);
    if (!r || !o) return;
    const n = Jn(this._focused, this._historyByEntity);
    if (n.length < 2) {
      this._lastCanvasPoints = [], this._lastCanvasSize = { width: r.width, height: r.height };
      return;
    }
    const s = Date.now(), a = s - Xi, c = n.filter((w) => w.ts >= a && w.ts <= s), d = c.length >= 2 ? c : n;
    let u = 1 / 0, h = -1 / 0;
    for (const w of d)
      Number.isFinite(w.value) && (w.value < u && (u = w.value), w.value > h && (h = w.value));
    if (!Number.isFinite(u) || !Number.isFinite(h)) {
      this._lastCanvasPoints = [];
      return;
    }
    if (u === h) {
      const w = Math.abs(u) * 0.1 || 1;
      u -= w, h += w;
    }
    const _ = (h - u) * 0.06, p = u - _, f = h + _ - p, g = s - a, v = d.filter((w) => Number.isFinite(w.ts) && Number.isFinite(w.value)).map((w) => {
      const S = Math.max(0, Math.min(1, (w.ts - a) / g)), $ = Math.max(0, Math.min(1, (w.value - p) / f));
      return {
        x: S * r.width,
        y: (1 - $) * r.height,
        ts: w.ts,
        value: w.value
      };
    });
    if (v.length < 2) {
      this._lastCanvasPoints = [];
      return;
    }
    const b = this.renderRoot, x = Ie(b, this._focused.color), k = this._thresholdConfig();
    if (k.threshold === null)
      nr(r.ctx, v, x, r.height, 0.24, 0, this._colorCache), li(o.ctx, v, x, Lo);
    else {
      const w = v.map((A) => ({
        x: A.x,
        y: A.y,
        value: A.value
      })), S = Ie(b, k.color), $ = gl(w, k.threshold), T = fl($);
      for (const A of T)
        nr(
          r.ctx,
          A.points,
          A.low ? S : x,
          r.height,
          0.24,
          0,
          this._colorCache
        );
      bl(o.ctx, $, x, S, Lo);
    }
    this._lastCanvasPoints = v, this._lastCanvasSize = { width: r.width, height: r.height };
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
    const e = this.energyConfig, i = this.focusedNodeKey, r = -1e-6;
    if (i === "grid" && e.grid_export_highlight === !0)
      return {
        threshold: r,
        color: ve(
          e.grid_export_trend_color ?? "red",
          "red"
        )
      };
    if (i === "grid_secondary" && e.grid_secondary_export_highlight === !0)
      return {
        threshold: r,
        color: ve(
          e.grid_secondary_export_trend_color ?? "red",
          "red"
        )
      };
    if ((i === "battery" || i === "battery_secondary") && ((o = this._focused) != null && o.isPercentage) && e[`${i}_low_alert`] === !0) {
      const n = e[`${i}_low_threshold`];
      return {
        threshold: typeof n == "number" && Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : 20,
        color: ve(
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
    let r = 0, o = i.length - 1;
    for (; o - r > 1; ) {
      const a = r + o >> 1;
      i[a].x <= e ? r = a : o = a;
    }
    const n = i[r], s = i[o];
    return n ? s ? Math.abs(n.x - e) <= Math.abs(s.x - e) ? n : s : n : s;
  }
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  render() {
    if (!this._focused)
      return y`<div class="pp-zoom-catcher" @click=${this._onBackdropClick}></div>`;
    const e = this._effectiveContainerRect(), i = 6, r = 2, o = this.originRect.left + this.originRect.width / 2, n = this.originRect.top + this.originRect.height / 2, s = Math.max(this.originRect.width, e.width - i * 2), a = Math.max(this.originRect.height, e.height - i * 2), c = Math.min(s, this.originRect.width * r), d = Math.min(a, this.originRect.height * r);
    let u = o - c / 2, h = n - d / 2;
    u = Math.max(e.left + i, Math.min(e.left + e.width - c - i, u)), h = Math.max(e.top + i, Math.min(e.top + e.height - d - i, h));
    const _ = this._phase !== "open", p = this._phase === "closing", m = _ || p, f = this.originRect.width / c, g = this.originRect.height / d, v = this.originRect.left - u, b = this.originRect.top - h, x = {
      left: `${u}px`,
      top: `${h}px`,
      width: `${c}px`,
      height: `${d}px`,
      transform: m ? `translate(${v}px, ${b}px) scale(${f}, ${g})` : "translate(0, 0) scale(1, 1)",
      transformOrigin: "0 0"
    }, k = this._buildView();
    return y`
      <div
        class="pp-zoom-catcher"
        @click=${this._onBackdropClick}
      >
        <div
          class="pp-zoom-shell ${this._focused.category} ${this._phase === "open" ? "is-open" : ""} ${p ? "is-closing" : ""}"
          style=${M(x)}
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
              .icon=${k.iconName}
              style=${M(k.iconStyle)}
            ></ha-icon>
            <div class="pp-zoom-value">${this._displayValueText(k.formattedValue)}</div>
            <div class="pp-zoom-label">${k.label}</div>
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
    if (!this._hover || !this._focused) return E;
    const e = this.renderRoot.querySelector(".pp-zoom-area");
    if (!e) return E;
    const { width: i, height: r } = this._lastCanvasSize;
    if (i <= 0 || r <= 0) return E;
    const o = e.offsetWidth || e.getBoundingClientRect().width, n = e.offsetHeight || e.getBoundingClientRect().height, s = this._hover.logicalX / i * o, a = this._hover.logicalY / r * n;
    return y`
      <div
        class="pp-zoom-hover-dot"
        aria-hidden="true"
        style=${M({
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
    const i = this.energyConfig, r = this._configDecimals(i);
    return `${Ot(
      this._hover.value,
      this._focused.unit,
      r,
      this._unitFormatOptions(i)
    )} · ${tc(this._hover.ts)}`;
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
    const e = this._focused, i = this.energyConfig, r = this._unitFormatOptions(i), o = this._configDecimals(i);
    return this.focusedNodeKey === "battery" || this.focusedNodeKey === "battery_secondary" ? this._buildBatteryView(this.focusedNodeKey, i, e.label) : this._buildPowerView(e, i, r, o);
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
  _buildPowerView(e, i, r, o) {
    const n = this._liveValueOf(e), s = Ot(n, e.unit, o, r), a = i[`${e.nodeKey}_icon`] ?? this._fallbackIcon(e.nodeKey);
    let c = i[`${e.nodeKey}_icon_color`];
    const d = n !== null && Number.isFinite(n) && n < 0;
    return e.nodeKey === "grid" && i.grid_export_icon_highlight === !0 && d ? c = i.grid_export_icon_color ?? "red" : e.nodeKey === "grid_secondary" && i.grid_secondary_export_icon_highlight === !0 && d && (c = i.grid_secondary_export_icon_color ?? "red"), {
      iconName: a,
      iconStyle: xe(c),
      formattedValue: s,
      label: e.label
    };
  }
  /** Battery nodes — show the SOC value, the dynamic battery icon
   *  reflecting both charge direction and SOC level, and the low-alert
   *  color override when the configured threshold is reached. */
  _buildBatteryView(e, i, r) {
    const o = e === "battery" ? "battery_percentage_entity" : "battery_secondary_percentage_entity", n = e === "battery" ? "battery_entity" : "battery_secondary_entity", s = `${e}_icon`, a = `${e}_icon_color`, c = `${e}_low_alert`, d = `${e}_low_threshold`, u = `${e}_low_alert_color`, h = Gi(i[o]), _ = Gi(i[n]), p = _ ? U(this.hass, _) : void 0, m = typeof p == "string" && p.trim() === "%", f = h ? F(this.hass, h) : null, g = _ ? F(this.hass, _) : null, v = f !== null ? f : m ? g : null, b = v !== null ? `${Math.round(Math.max(0, Math.min(100, v)))}%` : "—", x = this._batteryIcon(
      v,
      m ? null : g,
      i[s]
    ), k = i[c] === !0, w = this._normalizeBatteryThreshold(i[d]), $ = k && v !== null && v <= w ? i[u] ?? "red" : i[a], T = Gi(i[`${e}_label`]) ?? r;
    return {
      iconName: x,
      iconStyle: xe($),
      formattedValue: b,
      label: T
    };
  }
  /** Mirrors energy-card.batteryIcon. Different MDI variants by SOC
   *  bucket; charging gets its own icon regardless of level. */
  _batteryIcon(e, i, r) {
    if (i !== null && i > 0.01)
      return "mdi:battery-charging";
    if (e === null)
      return r ?? "mdi:battery-outline";
    const n = Math.max(0, Math.min(100, e));
    return n < 5 ? "mdi:battery-outline" : n >= 95 ? "mdi:battery" : `mdi:battery-${Math.max(10, Math.min(90, Math.round(n / 10) * 10))}`;
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
      let i = 0, r = null;
      for (const s of e.computed.dependencies) {
        const a = F(this.hass, s);
        if (a === null) return null;
        const c = e.computed.unitsByEntityId[s] ?? "", d = e.computed.signsByEntityId[s] ?? 1, u = te(c), h = (u == null ? void 0 : u.factor) ?? 1;
        i += d * a * h, r ?? (r = (u == null ? void 0 : u.family) ?? null);
      }
      const o = te(e.computed.outputUnit), n = o && o.family === r ? o.factor : 1;
      return n > 0 ? i / n : i;
    }
    return F(this.hass, e.entityId);
  }
  _fallbackIcon(e) {
    return e.startsWith("solar") ? "mdi:weather-sunny" : e.startsWith("grid_secondary") || e.startsWith("grid") ? "mdi:transmission-tower" : e.startsWith("home") ? "mdi:home-lightning-bolt" : e.startsWith("battery_secondary") ? "mdi:battery-outline" : e.startsWith("battery") ? "mdi:battery" : "mdi:flash";
  }
};
Nr.styles = Z`
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
let pe = Nr;
je([
  I({ attribute: !1 })
], pe.prototype, "hass");
je([
  I({ attribute: !1 })
], pe.prototype, "energyConfig");
je([
  I({ type: String })
], pe.prototype, "focusedNodeKey");
je([
  I({ attribute: !1 })
], pe.prototype, "originRect");
je([
  I({ attribute: !1 })
], pe.prototype, "cardRect");
je([
  C()
], pe.prototype, "_phase");
je([
  C()
], pe.prototype, "_historyByEntity");
je([
  C()
], pe.prototype, "_hover");
customElements.get(hr) || customElements.define(hr, pe);
const Xt = (t) => String(t).padStart(2, "0"), tc = (t) => {
  const e = new Date(t);
  return `${Xt(e.getDate())}.${Xt(e.getMonth() + 1)}. ${Xt(e.getHours())}:${Xt(e.getMinutes())}`;
}, ze = "0.7.2";
var ic = Object.defineProperty, rc = Object.getOwnPropertyDescriptor, $r = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? rc(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && ic(e, i, o), o;
};
const oc = 4, nc = 8, Ho = 2, sc = /* @__PURE__ */ new Set(["solar", "home", "grid", "grid_secondary"]), ac = (t) => ({
  select: {
    mode: "dropdown",
    options: [
      { label: l(t, "energy.editor.trend_source_auto"), value: "auto" },
      { label: l(t, "energy.editor.trend_source_statistics"), value: "statistics" },
      { label: l(t, "energy.editor.trend_source_history"), value: "history" }
    ]
  }
}), lc = (t, e, i) => {
  const r = `${t}_sub_${e}`, o = sc.has(t);
  return [
    {
      type: "grid",
      name: "",
      schema: [
        { name: `${r}_enabled`, selector: { boolean: {} } }
      ]
    },
    {
      type: "expandable",
      name: "",
      title: l(i, "energy.editor.section_identity"),
      icon: "mdi:view-list-outline",
      expanded: !0,
      schema: [
        {
          type: "grid",
          name: "",
          columns: 2,
          schema: [
            { name: `${r}_entity`, selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } } },
            { name: `${r}_label`, selector: { text: {} } }
          ]
        },
        {
          type: "grid",
          name: "",
          columns: 2,
          schema: [
            {
              name: `${r}_icon`,
              selector: { icon: {} },
              context: { icon_entity: `${r}_entity` }
            },
            {
              name: `${r}_icon_color`,
              selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } },
              helper: l(i, "energy.editor.sub_node_identity_value_render_help"),
              description: l(i, "energy.editor.sub_node_identity_value_render_help")
            }
          ]
        }
      ]
    },
    ...o ? [
      {
        type: "expandable",
        name: "",
        title: l(i, "energy.editor.section_display_mode"),
        icon: "mdi:form-dropdown",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: `${r}_state_mode`,
                selector: { boolean: {} },
                helper: t === "solar" ? l(i, "energy.editor.solar_sub_node_state_mode_help") : l(i, "energy.editor.sub_node_state_mode_help"),
                description: t === "solar" ? l(i, "energy.editor.solar_sub_node_state_mode_help") : l(i, "energy.editor.sub_node_state_mode_help")
              }
            ]
          }
        ]
      }
    ] : [],
    Qe(r, i)
  ];
}, Yt = (t, e, i, r, o) => ({
  type: "expandable",
  name: "",
  title: e,
  icon: i,
  expanded: !1,
  schema: Array.from({ length: r }, (n, s) => ({
    type: "expandable",
    name: "",
    title: l(o, "energy.editor.block_n", { n: s + 1 }),
    icon: "mdi:view-grid-outline",
    expanded: !1,
    schema: lc(t, s + 1, o)
  }))
}), cc = (t, e, i) => ({
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
}), ge = (t, e) => ({
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
}), dc = (t) => {
  const e = ie(t, "hybrid");
  return e === "hybrid" ? "auto" : e;
}, hc = (t) => t === "auto" || t === "history" || t === "statistics" || t === "hybrid" ? t : "auto", Qe = (t, e, i) => ({
  type: "expandable",
  name: "",
  title: i ?? l(e, "energy.editor.section_interactions"),
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
          helper: l(e, "energy.editor.node_interaction_help"),
          description: l(e, "energy.editor.node_interaction_help")
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
}), uc = (t) => [
  cc(l(t, "energy.editor.section_center_visuals"), "mdi:palette-outline", [
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
    title: l(t, "energy.editor.section_units_trend"),
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
        title: l(t, "energy.editor.section_auto_scaling"),
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
                helper: l(t, "energy.editor.auto_scale_units_help"),
                description: l(t, "energy.editor.auto_scale_units_help")
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
                helper: l(t, "energy.editor.decimals_prefixed_help"),
                description: l(t, "energy.editor.decimals_prefixed_help")
              },
              {
                name: "decimals_base_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: l(t, "energy.editor.decimals_base_help"),
                description: l(t, "energy.editor.decimals_base_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "energy.editor.section_display_format"),
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
                helper: l(t, "energy.editor.unit_field_help"),
                description: l(t, "energy.editor.unit_field_help")
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: l(t, "energy.editor.decimals_default_help"),
                description: l(t, "energy.editor.decimals_default_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "energy.editor.section_trend_source"),
        icon: "mdi:database-search",
        expanded: !0,
        schema: [
          {
            type: "grid",
            name: "",
            schema: [
              {
                name: "trend_data_source",
                selector: ac(t),
                helper: l(t, "energy.editor.trend_source_help"),
                description: l(t, "energy.editor.trend_source_help")
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
    title: l(t, "energy.editor.section_solar_node"),
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
            helper: l(t, "energy.editor.solar_visible_help"),
            description: l(t, "energy.editor.solar_visible_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "energy.editor.section_identity"),
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
                helper: l(t, "energy.editor.solar_flow_direction_help"),
                description: l(t, "energy.editor.solar_flow_direction_help")
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
      ge(l(t, "energy.editor.section_calculation"), [
        {
          name: "solar_auto_calculate",
          selector: { boolean: {} },
          helper: l(t, "energy.editor.solar_auto_calc_help"),
          description: l(t, "energy.editor.solar_auto_calc_help")
        }
      ]),
      ge(l(t, "energy.editor.section_trend"), [
        { name: "solar_trend", selector: { boolean: {} } },
        {
          name: "solar_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      Qe("solar", t)
    ]
  },
  {
    type: "expandable",
    name: "",
    title: l(t, "energy.editor.section_grid_node"),
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
            helper: l(t, "energy.editor.grid_visible_help"),
            description: l(t, "energy.editor.grid_visible_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "energy.editor.section_identity"),
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
                helper: l(t, "energy.editor.grid_flow_direction_help"),
                description: l(t, "energy.editor.grid_flow_direction_help")
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
      ge(l(t, "energy.editor.section_trend"), [
        { name: "grid_trend", selector: { boolean: {} } },
        {
          name: "grid_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      ge(l(t, "energy.editor.section_export"), [
        {
          name: "grid_export_highlight",
          selector: { boolean: {} },
          helper: l(t, "energy.editor.grid_export_highlight_help"),
          description: l(t, "energy.editor.grid_export_highlight_help")
        },
        {
          name: "grid_export_trend_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        },
        {
          name: "grid_export_icon_highlight",
          selector: { boolean: {} },
          helper: l(t, "energy.editor.grid_export_icon_highlight_help"),
          description: l(t, "energy.editor.grid_export_icon_highlight_help")
        },
        {
          name: "grid_export_icon_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        }
      ]),
      Qe("grid", t)
    ]
  },
  {
    type: "expandable",
    name: "",
    title: l(t, "energy.editor.section_grid_2_node"),
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
            helper: l(t, "energy.editor.grid_secondary_visible_help"),
            description: l(t, "energy.editor.grid_secondary_visible_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "energy.editor.section_identity"),
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
                helper: l(t, "energy.editor.grid_secondary_flow_direction_help"),
                description: l(t, "energy.editor.grid_secondary_flow_direction_help")
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
      ge(l(t, "energy.editor.section_trend"), [
        { name: "grid_secondary_trend", selector: { boolean: {} } },
        {
          name: "grid_secondary_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      ge(l(t, "energy.editor.section_export"), [
        {
          name: "grid_secondary_export_highlight",
          selector: { boolean: {} },
          helper: l(t, "energy.editor.grid_export_highlight_help"),
          description: l(t, "energy.editor.grid_export_highlight_help")
        },
        {
          name: "grid_secondary_export_trend_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        },
        {
          name: "grid_secondary_export_icon_highlight",
          selector: { boolean: {} },
          helper: l(t, "energy.editor.grid_export_icon_highlight_help"),
          description: l(t, "energy.editor.grid_export_icon_highlight_help")
        },
        {
          name: "grid_secondary_export_icon_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        }
      ]),
      Qe("grid_secondary", t)
    ]
  },
  {
    type: "expandable",
    name: "",
    title: l(t, "energy.editor.section_home_node"),
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
            helper: l(t, "energy.editor.home_visible_help"),
            description: l(t, "energy.editor.home_visible_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "energy.editor.section_identity"),
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
                helper: l(t, "energy.editor.home_flow_direction_help"),
                description: l(t, "energy.editor.home_flow_direction_help")
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
      ge(l(t, "energy.editor.section_calculation"), [
        {
          name: "home_auto_calculate",
          selector: { boolean: {} },
          helper: l(t, "energy.editor.home_auto_calc_help"),
          description: l(t, "energy.editor.home_auto_calc_help")
        }
      ]),
      ge(l(t, "energy.editor.section_trend"), [
        { name: "home_trend", selector: { boolean: {} } },
        {
          name: "home_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      Qe("home", t)
    ]
  },
  {
    type: "expandable",
    name: "",
    title: l(t, "energy.editor.section_battery_node"),
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
            helper: l(t, "energy.editor.battery_visible_help"),
            description: l(t, "energy.editor.battery_visible_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "energy.editor.section_identity"),
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
                helper: l(t, "energy.editor.battery_flow_direction_help"),
                description: l(t, "energy.editor.battery_flow_direction_help")
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
      ge(l(t, "energy.editor.section_trend"), [
        { name: "battery_trend", selector: { boolean: {} } },
        {
          name: "battery_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      {
        type: "expandable",
        name: "",
        title: l(t, "energy.editor.section_sign_convention"),
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
                helper: l(t, "energy.editor.battery_invert_flow_help"),
                description: l(t, "energy.editor.battery_invert_flow_help")
              },
              {
                name: "battery_invert_value_sign",
                selector: { boolean: {} },
                helper: l(t, "energy.editor.battery_invert_value_sign_help"),
                description: l(t, "energy.editor.battery_invert_value_sign_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "energy.editor.section_alert"),
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
                helper: l(t, "energy.editor.battery_low_alert_color_help"),
                description: l(t, "energy.editor.battery_low_alert_color_help")
              }
            ]
          }
        ]
      },
      Qe("battery", t)
    ]
  },
  {
    type: "expandable",
    name: "",
    title: l(t, "energy.editor.section_battery_2_node"),
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
            helper: l(t, "energy.editor.battery_secondary_visible_help"),
            description: l(t, "energy.editor.battery_secondary_visible_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "energy.editor.section_identity"),
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
                helper: l(t, "energy.editor.battery_secondary_flow_direction_help"),
                description: l(t, "energy.editor.battery_secondary_flow_direction_help")
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
      ge(l(t, "energy.editor.section_trend"), [
        { name: "battery_secondary_trend", selector: { boolean: {} } },
        {
          name: "battery_secondary_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      {
        type: "expandable",
        name: "",
        title: l(t, "energy.editor.section_sign_convention"),
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
                helper: l(t, "energy.editor.battery_invert_flow_help"),
                description: l(t, "energy.editor.battery_invert_flow_help")
              },
              {
                name: "battery_secondary_invert_value_sign",
                selector: { boolean: {} },
                helper: l(t, "energy.editor.battery_invert_value_sign_help"),
                description: l(t, "energy.editor.battery_invert_value_sign_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "energy.editor.section_alert"),
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
                helper: l(t, "energy.editor.battery_low_alert_color_help"),
                description: l(t, "energy.editor.battery_low_alert_color_help")
              }
            ]
          }
        ]
      },
      Qe("battery_secondary", t)
    ]
  },
  Yt("solar", l(t, "energy.editor.section_solar_sub_blocks"), "mdi:solar-power-variant", oc, t),
  Yt("grid", l(t, "energy.editor.section_grid_1_sub_blocks"), "mdi:transmission-tower", Ho, t),
  Yt("grid_secondary", l(t, "energy.editor.section_grid_2_sub_blocks"), "mdi:transmission-tower", Ho, t),
  Yt("home", l(t, "energy.editor.section_home_sub_blocks"), "mdi:flash", nc, t),
  {
    type: "expandable",
    name: "",
    title: l(t, "energy.editor.section_tap_behavior"),
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
            helper: l(t, "energy.editor.node_actions_enabled_help"),
            description: l(t, "energy.editor.node_actions_enabled_help")
          }
        ]
      },
      {
        name: "entity",
        selector: { entity: {} },
        helper: l(t, "energy.editor.default_entity_help"),
        description: l(t, "energy.editor.default_entity_help")
      },
      { name: "tap_action", selector: { ui_action: {} } },
      { name: "hold_action", selector: { ui_action: {} } },
      { name: "double_tap_action", selector: { ui_action: {} } }
    ]
  }
];
let ci = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => {
      const e = t.name ?? "", i = e.match(
        /^(solar|home|grid|grid_secondary)_sub_(\d+)_(enabled|entity|label|icon|icon_color|state_mode|tap_action|hold_action|double_tap_action)$/
      );
      if (i) {
        const [, , , r] = i;
        return this.subLabelMap()[r] ?? r;
      }
      return this.labelMap()[e] ?? e;
    }, this.computeHelper = (t) => {
      const e = t.name ?? "", i = z(this.hass);
      if (e === "solar_entity")
        return l(i, "energy.editor.solar_flow_direction_help");
      if (e === "grid_entity")
        return l(i, "energy.editor.grid_flow_direction_help");
      if (e === "grid_secondary_entity")
        return l(i, "energy.editor.grid_secondary_flow_direction_help");
      if (e === "home_entity")
        return l(i, "energy.editor.home_flow_direction_help");
      if (e === "battery_entity")
        return l(i, "energy.editor.battery_flow_direction_help");
      if (e === "battery_secondary_entity")
        return l(i, "energy.editor.battery_secondary_flow_direction_help");
      if (/^(solar|home|grid|grid_secondary)_sub_\d+_icon_color$/.test(e))
        return l(i, "energy.editor.sub_node_identity_value_render_help");
      if (/^(home|grid|grid_secondary)_sub_\d+_state_mode$/.test(e))
        return l(i, "energy.editor.sub_node_state_mode_help");
      if (/^solar_sub_\d+_state_mode$/.test(e))
        return l(i, "energy.editor.solar_sub_node_state_mode_help");
      if (e === "solar_visible")
        return l(i, "energy.editor.solar_visible_help");
      if (e === "home_visible")
        return l(i, "energy.editor.home_visible_help");
      if (e === "battery_visible")
        return l(i, "energy.editor.battery_visible_help");
      if (e === "battery_secondary_visible")
        return l(i, "energy.editor.battery_secondary_visible_help");
      if (e === "solar_auto_calculate")
        return l(i, "energy.editor.solar_auto_calc_help");
      if (e === "home_auto_calculate")
        return l(i, "energy.editor.home_auto_calc_help");
      if (e === "grid_visible")
        return l(i, "energy.editor.grid_visible_help");
      if (e === "grid_secondary_visible")
        return l(i, "energy.editor.grid_secondary_visible_help");
      if (e === "grid_export_highlight" || e === "grid_secondary_export_highlight")
        return l(i, "energy.editor.grid_export_highlight_help");
      if (e === "grid_export_icon_highlight" || e === "grid_secondary_export_icon_highlight")
        return l(i, "energy.editor.grid_export_icon_highlight_help");
      if (e === "battery_low_alert_color" || e === "battery_secondary_low_alert_color")
        return l(i, "energy.editor.battery_low_alert_color_help");
      if (e === "unit")
        return l(i, "energy.editor.unit_field_help");
      if (e === "decimals")
        return l(i, "energy.editor.decimals_default_help");
      if (e === "decimals_base_unit")
        return l(i, "energy.editor.decimals_base_help");
      if (e === "decimals_prefixed_unit")
        return l(i, "energy.editor.decimals_prefixed_help");
      if (e === "trend_data_source")
        return l(i, "energy.editor.trend_source_help");
      if (e === "auto_scale_units")
        return l(i, "energy.editor.auto_scale_units_help");
    }, this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM")
        return;
      const i = t.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i))
        return;
      const r = {
        ...i,
        trend_data_source: hc(i.trend_data_source),
        type: "custom:power-pilz-energy-card"
      };
      this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: r },
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
      trend_data_source: dc(t.trend_data_source),
      debug_performance: t.debug_performance ?? !1,
      decimals: t.decimals ?? 1,
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: t.decimals_base_unit ?? t.decimals ?? 1,
      decimals_prefixed_unit: t.decimals_prefixed_unit ?? t.decimals ?? 1,
      node_actions_enabled: t.node_actions_enabled ?? !0,
      type: "custom:power-pilz-energy-card"
    };
  }
  labelMap() {
    const t = z(this.hass);
    return {
      name: l(t, "energy.editor.name"),
      home_visible: l(t, "energy.editor.home_visible"),
      solar_visible: l(t, "energy.editor.solar_visible"),
      grid_visible: l(t, "energy.editor.grid_visible"),
      grid_secondary_visible: l(t, "energy.editor.grid_secondary_visible"),
      battery_visible: l(t, "energy.editor.battery_visible"),
      battery_secondary_visible: l(t, "energy.editor.battery_secondary_visible"),
      battery_dual_alignment: l(t, "energy.editor.battery_dual_alignment"),
      home_auto_calculate: l(t, "energy.editor.home_auto_calculate"),
      solar_auto_calculate: l(t, "energy.editor.solar_auto_calculate"),
      home_entity: l(t, "energy.editor.home_entity"),
      solar_entity: l(t, "energy.editor.solar_entity"),
      grid_entity: l(t, "energy.editor.grid_entity"),
      grid_secondary_entity: l(t, "energy.editor.grid_secondary_entity"),
      battery_entity: l(t, "energy.editor.battery_entity"),
      battery_percentage_entity: l(t, "energy.editor.battery_percentage_entity"),
      battery_secondary_entity: l(t, "energy.editor.battery_secondary_entity"),
      battery_secondary_percentage_entity: l(t, "energy.editor.battery_secondary_percentage_entity"),
      solar_sub_enabled: l(t, "energy.editor.solar_sub_enabled"),
      solar_sub_entity: l(t, "energy.editor.solar_sub_entity"),
      solar_sub_label: l(t, "energy.editor.solar_sub_label"),
      solar_sub_icon: l(t, "energy.editor.solar_sub_icon"),
      solar_sub_icon_color: l(t, "energy.editor.solar_sub_icon_color"),
      home_sub_enabled: l(t, "energy.editor.home_sub_enabled"),
      home_sub_entity: l(t, "energy.editor.home_sub_entity"),
      home_sub_label: l(t, "energy.editor.home_sub_label"),
      home_sub_icon: l(t, "energy.editor.home_sub_icon"),
      home_sub_icon_color: l(t, "energy.editor.home_sub_icon_color"),
      solar_label: l(t, "energy.editor.solar_label"),
      home_label: l(t, "energy.editor.home_label"),
      grid_label: l(t, "energy.editor.grid_label"),
      grid_secondary_label: l(t, "energy.editor.grid_secondary_label"),
      battery_label: l(t, "energy.editor.battery_label"),
      battery_secondary_label: l(t, "energy.editor.battery_secondary_label"),
      solar_icon: l(t, "energy.editor.solar_icon"),
      solar_icon_color: l(t, "energy.editor.solar_icon_color"),
      solar_trend: l(t, "energy.editor.solar_trend"),
      solar_trend_color: l(t, "energy.editor.solar_trend_color"),
      grid_icon: l(t, "energy.editor.grid_icon"),
      grid_icon_color: l(t, "energy.editor.grid_icon_color"),
      grid_secondary_icon: l(t, "energy.editor.grid_secondary_icon"),
      grid_secondary_icon_color: l(t, "energy.editor.grid_secondary_icon_color"),
      grid_secondary_trend: l(t, "energy.editor.grid_secondary_trend"),
      grid_secondary_trend_color: l(t, "energy.editor.grid_secondary_trend_color"),
      grid_trend: l(t, "energy.editor.grid_trend"),
      grid_trend_color: l(t, "energy.editor.grid_trend_color"),
      grid_export_highlight: l(t, "energy.editor.grid_export_highlight"),
      grid_export_trend_color: l(t, "energy.editor.grid_export_trend_color"),
      grid_export_icon_highlight: l(t, "energy.editor.grid_export_icon_highlight"),
      grid_export_icon_color: l(t, "energy.editor.grid_export_icon_color"),
      grid_secondary_export_highlight: l(t, "energy.editor.grid_export_highlight"),
      grid_secondary_export_trend_color: l(t, "energy.editor.grid_export_trend_color"),
      grid_secondary_export_icon_highlight: l(t, "energy.editor.grid_export_icon_highlight"),
      grid_secondary_export_icon_color: l(t, "energy.editor.grid_export_icon_color"),
      home_icon: l(t, "energy.editor.home_icon"),
      home_icon_color: l(t, "energy.editor.home_icon_color"),
      home_trend: l(t, "energy.editor.home_trend"),
      home_trend_color: l(t, "energy.editor.home_trend_color"),
      battery_icon: l(t, "energy.editor.battery_icon"),
      battery_icon_color: l(t, "energy.editor.battery_icon_color"),
      battery_trend: l(t, "energy.editor.battery_trend"),
      battery_trend_color: l(t, "energy.editor.battery_trend_color"),
      battery_secondary_icon: l(t, "energy.editor.battery_secondary_icon"),
      battery_secondary_icon_color: l(t, "energy.editor.battery_secondary_icon_color"),
      battery_secondary_trend: l(t, "energy.editor.battery_secondary_trend"),
      battery_secondary_trend_color: l(t, "energy.editor.battery_secondary_trend_color"),
      shared_trend_scale: l(t, "energy.editor.shared_trend_scale"),
      trend_data_source: l(t, "energy.editor.trend_data_source"),
      battery_low_alert: l(t, "energy.editor.battery_low_alert"),
      battery_low_threshold: l(t, "energy.editor.battery_low_threshold"),
      battery_low_alert_color: l(t, "energy.editor.battery_low_alert_color"),
      battery_secondary_low_alert: l(t, "energy.editor.battery_secondary_low_alert"),
      battery_secondary_low_threshold: l(t, "energy.editor.battery_secondary_low_threshold"),
      battery_secondary_low_alert_color: l(t, "energy.editor.battery_secondary_low_alert_color"),
      battery_invert_flow: l(t, "energy.editor.battery_invert_flow"),
      battery_invert_value_sign: l(t, "energy.editor.battery_invert_value_sign"),
      battery_secondary_invert_flow: l(t, "energy.editor.battery_secondary_invert_flow"),
      battery_secondary_invert_value_sign: l(t, "energy.editor.battery_secondary_invert_value_sign"),
      core_icon: l(t, "energy.editor.core_icon"),
      core_icon_color: l(t, "energy.editor.core_icon_color"),
      flow_color: l(t, "energy.editor.flow_color"),
      unit: l(t, "energy.editor.unit"),
      decimals: l(t, "energy.editor.decimals"),
      auto_scale_units: l(t, "energy.editor.auto_scale_units"),
      decimals_base_unit: l(t, "energy.editor.decimals_base_unit"),
      decimals_prefixed_unit: l(t, "energy.editor.decimals_prefixed_unit"),
      entity: l(t, "energy.editor.entity"),
      tap_action: l(t, "energy.editor.tap_action"),
      hold_action: l(t, "energy.editor.hold_action"),
      double_tap_action: l(t, "energy.editor.double_tap_action"),
      node_actions_enabled: l(t, "energy.editor.node_actions_enabled"),
      solar_tap_action: l(t, "energy.editor.node_tap_action"),
      solar_hold_action: l(t, "energy.editor.node_hold_action"),
      solar_double_tap_action: l(t, "energy.editor.node_double_tap_action"),
      grid_tap_action: l(t, "energy.editor.node_tap_action"),
      grid_hold_action: l(t, "energy.editor.node_hold_action"),
      grid_double_tap_action: l(t, "energy.editor.node_double_tap_action"),
      grid_secondary_tap_action: l(t, "energy.editor.node_tap_action"),
      grid_secondary_hold_action: l(t, "energy.editor.node_hold_action"),
      grid_secondary_double_tap_action: l(t, "energy.editor.node_double_tap_action"),
      home_tap_action: l(t, "energy.editor.node_tap_action"),
      home_hold_action: l(t, "energy.editor.node_hold_action"),
      home_double_tap_action: l(t, "energy.editor.node_double_tap_action"),
      battery_tap_action: l(t, "energy.editor.node_tap_action"),
      battery_hold_action: l(t, "energy.editor.node_hold_action"),
      battery_double_tap_action: l(t, "energy.editor.node_double_tap_action"),
      battery_secondary_tap_action: l(t, "energy.editor.node_tap_action"),
      battery_secondary_hold_action: l(t, "energy.editor.node_hold_action"),
      battery_secondary_double_tap_action: l(t, "energy.editor.node_double_tap_action")
    };
  }
  subLabelMap() {
    const t = z(this.hass);
    return {
      enabled: l(t, "energy.editor.sub_field_enabled"),
      entity: l(t, "energy.editor.sub_field_entity"),
      label: l(t, "energy.editor.sub_field_label"),
      icon: l(t, "energy.editor.sub_field_icon"),
      icon_color: l(t, "energy.editor.sub_field_icon_color"),
      state_mode: l(t, "energy.editor.sub_field_state_mode"),
      tap_action: l(t, "energy.editor.sub_field_tap_action"),
      hold_action: l(t, "energy.editor.sub_field_hold_action"),
      double_tap_action: l(t, "energy.editor.sub_field_double_tap_action")
    };
  }
  render() {
    if (!this.hass || !this._config)
      return E;
    const t = z(this.hass);
    return y`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ze}
      </div>
      <div style="margin: 0 0 14px; color: var(--secondary-text-color); line-height: 1.4;">
        ${l(t, "energy.editor.intro")}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${uc(t)}
        .computeLabel=${this.computeLabel}
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
$r([
  I({ attribute: !1 })
], ci.prototype, "hass", 2);
$r([
  C()
], ci.prototype, "_config", 2);
ci = $r([
  ce("power-pilz-energy-card-editor")
], ci);
var _c = Object.defineProperty, pc = Object.getOwnPropertyDescriptor, Re = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? pc(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && _c(e, i, o), o;
};
const W = 0.01, xt = 1, ht = 1440 * 60 * 1e3, Bo = 300 * 1e3, Fo = 60 * 1e3, mc = 350, Vo = 4, Wo = 8, Yi = 2, yc = 260, gc = 220, Uo = -1e-6, Ze = "red", fc = "var(--rgb-primary-text-color, 33, 33, 33)", bc = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), jo = "powerpilz-energy-node-detail", Ko = "powerpilz-energy-node-zoom";
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
    const e = (t == null ? void 0 : t.states) ?? {}, i = Object.keys(e), r = (...u) => u.find((h) => h in e), o = (u) => i.find((h) => h.startsWith(`${u}.`)), n = r("sensor.dev_home_power", "sensor.house_consumption_power") ?? o("sensor") ?? "sensor.dev_home_power", s = r("sensor.dev_solar_power", "sensor.solar_production_power") ?? o("sensor"), a = r("sensor.dev_grid_power", "sensor.grid_power") ?? o("sensor"), c = r("sensor.dev_battery_power", "sensor.home_battery_power") ?? o("sensor"), d = r("sensor.dev_battery_soc", "sensor.home_battery_soc") ?? o("sensor");
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
      home_entity: n,
      home_auto_calculate: !1,
      solar_auto_calculate: !1,
      solar_entity: s,
      grid_entity: a,
      battery_entity: c,
      battery_percentage_entity: d,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      auto_scale_units: !1,
      decimals: xt,
      decimals_base_unit: xt,
      decimals_prefixed_unit: xt
    };
  }
  setConfig(t) {
    const e = t.home_entity ?? t.consumption_entity ?? "sensor.dev_home_power", i = typeof t.decimals == "number" && Number.isFinite(t.decimals) ? Math.min(3, Math.max(0, Math.round(t.decimals))) : xt, r = Se(t.decimals_base_unit, i), o = Se(t.decimals_prefixed_unit, i);
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
      decimals_base_unit: r,
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
      return y`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return y``;
    const t = this._config, e = t.decimals ?? xt, i = t.home_visible !== !1, r = t.solar_visible !== !1, o = t.grid_visible !== !1, n = o && t.grid_secondary_visible === !0, s = t.battery_visible !== !1, a = s && t.battery_secondary_visible === !0, c = this.normalizeBatteryDualAlignment(t.battery_dual_alignment), d = r ? this.collectSubBlocks("solar", t) : [], u = d.filter((R) => !R.stateMode), h = o ? this.collectSubBlocks("grid", t) : [], _ = n ? this.collectSubBlocks("grid_secondary", t) : [], p = i ? this.collectSubBlocks("home", t) : [], m = (R, wa) => R !== null ? R : this.preview ? wa : null, f = m(F(this.hass, t.home_entity), 3.2), g = r ? m(F(this.hass, t.solar_entity), 4.1) : null, v = o ? m(F(this.hass, t.grid_entity), -1.3) : null, b = n ? m(F(this.hass, t.grid_secondary_entity), 0.2) : null, x = s ? m(F(this.hass, t.battery_entity), 1.5) : null, k = m(F(this.hass, t.battery_percentage_entity), 72), w = a ? m(F(this.hass, t.battery_secondary_entity), 0) : null, S = m(
      F(this.hass, t.battery_secondary_percentage_entity),
      85
    ), $ = t.unit ?? "kW", T = U(this.hass, t.solar_entity) ?? $, A = U(this.hass, t.grid_entity) ?? $, P = U(this.hass, t.grid_secondary_entity) ?? $, D = U(this.hass, t.battery_entity), O = U(this.hass, t.battery_percentage_entity), H = U(this.hass, t.battery_secondary_entity), Q = U(this.hass, t.battery_secondary_percentage_entity), ee = D ?? $, Te = H ?? $, Ne = this.resolveBatteryPercentage(
      k,
      x,
      D
    ), Le = this.resolveBatteryPercentage(
      S,
      w,
      H
    ), wi = !!this.readConfigString(t.battery_percentage_entity) || this.isPercentageUnit(D), xi = !!this.readConfigString(t.battery_secondary_percentage_entity) || this.isPercentageUnit(H), bt = t.solar_auto_calculate === !0 ? this.resolveAutoSolarUnit(t, u, $) : T, vt = t.solar_auto_calculate === !0 ? this.computeAutoSolarValueFromSubBlocks(u, bt) : g, Si = t.home_auto_calculate === !0 ? this.resolveAutoHomeUnit(t, $, bt) : U(this.hass, t.home_entity) ?? $, Lt = t.home_auto_calculate === !0 ? this.computeAutoHomeValueFromNodeValues(
      {
        solar: vt,
        grid: v,
        grid_secondary: b,
        battery: x,
        battery_secondary: w
      },
      {
        solar: bt,
        grid: A,
        grid_secondary: P,
        battery: ee,
        battery_secondary: Te
      },
      Si
    ) : f, xs = wi ? O ?? "%" : ee, Ss = xi ? Q ?? "%" : Te, $s = this.toUnidirectionalFlow(vt), ks = this.toUnidirectionalFlow(Lt), Es = this.toBidirectionalFlow(v), Cs = this.toBidirectionalFlow(b), zs = this.sumComparableValues([
      { value: v, unit: A },
      { value: b, unit: P }
    ]), Ts = v === null && b === null ? "none" : this.toBidirectionalFlow(zs), Ms = t.battery_invert_flow === !0, As = t.battery_secondary_invert_flow === !0, Gr = Ms && x !== null ? -x : x, Xr = As && w !== null ? -w : w, Ps = this.toBidirectionalFlow(Gr), Is = this.toBidirectionalFlow(Xr), Ds = this.sumComparableValues([
      { value: Gr, unit: ee },
      { value: Xr, unit: Te }
    ]), Os = x === null && w === null ? "none" : this.toBidirectionalFlow(Ds), Rs = t.battery_invert_value_sign === !0, Ns = t.battery_secondary_invert_value_sign === !0, Yr = Rs && x !== null ? -x : x, Zr = Ns && w !== null ? -w : w, Ls = this.hasConfiguredAction(t), $i = !this.isEditorPreview() && Ls, Hs = this.iconColorStyle(t.solar_icon_color), Bs = this.iconColorStyle(t.home_icon_color), Fs = this.iconShapeStyle(t.core_icon_color), ki = new Set(p.map((R) => R.index)), lt = new Set(d.map((R) => R.index)), Vs = ki.has(7) && ki.has(8), Ws = [5, 6, 7, 8].some((R) => ki.has(R)), Us = lt.has(1) && lt.has(2) && !lt.has(3) && !lt.has(4), js = lt.has(3) && lt.has(4), qr = n && (Us && Vs || js && Ws), Ks = n && !qr, Ei = p.some((R) => R.index >= 7), Jr = this.homeSubPositions(Ei), Qr = this.gridSubPositions(n), eo = this.gridSecondarySubPositions(), to = this.solarSubPositions(
      Ei,
      Ks,
      qr
    ), io = p.filter((R) => R.index <= (Ei ? 8 : 6)), Ci = o ? { col: 1, row: n ? 2 : 3, colSpan: 2, rowSpan: 2 } : null, zi = n ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 } : null, Ti = s ? {
      col: a && c === "center" ? 2 : 3,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, Mi = a ? {
      col: c === "left" ? 1 : c === "right" ? 5 : 4,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, G = this.computeGridBounds(
      i,
      r,
      o,
      n,
      s,
      a,
      Ci,
      zi,
      Ti,
      Mi,
      d,
      h,
      _,
      io,
      to,
      Qr,
      eo,
      Jr
    ), Ai = r ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, G) : null, Ht = Ci ? this.normalizePlacement(Ci, G) : null, Bt = zi ? this.normalizePlacement(zi, G) : null, Pi = i ? this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, G) : null, Ft = Ti ? this.normalizePlacement(Ti, G) : null, Vt = Mi ? this.normalizePlacement(Mi, G) : null, ro = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, G), Gs = this.normalizePositions(to, G), Xs = this.normalizePositions(Qr, G), Ys = this.normalizePositions(eo, G), Zs = this.normalizePositions(Jr, G), oo = this.normalizeBatteryThreshold(t.battery_low_threshold), no = !!t.battery_low_alert, so = this.normalizeBatteryThreshold(t.battery_secondary_low_threshold), ao = !!t.battery_secondary_low_alert, Wt = this.resolveColor(Ze), Ii = this.resolveColor(t.battery_low_alert_color, Wt), Di = this.resolveColor(
      t.battery_secondary_low_alert_color,
      Wt
    ), Oi = no && Ne !== null && Ne <= oo, qs = this.iconColorStyle(
      Oi ? Ii : t.battery_icon_color
    ), Js = this.batteryIcon(
      Ne,
      this.isPercentageUnit(D) ? null : x,
      t.battery_icon
    ), Ri = ao && Le !== null && Le <= so, Qs = this.iconColorStyle(
      Ri ? Di : t.battery_secondary_icon_color
    ), ea = this.batteryIcon(
      Le,
      this.isPercentageUnit(H) ? null : w,
      t.battery_secondary_icon
    ), ta = v !== null && Number.isFinite(v) && v < 0, ia = b !== null && Number.isFinite(b) && b < 0, ra = this.iconColorStyle(
      t.grid_export_icon_highlight === !0 && ta ? t.grid_export_icon_color : t.grid_icon_color
    ), oa = this.iconColorStyle(
      t.grid_secondary_export_icon_highlight === !0 && ia ? t.grid_secondary_export_icon_color : t.grid_secondary_icon_color
    ), na = { "--flow-color-rgb": this.toRgbCss(t.flow_color) ?? fc }, ct = this.resolveColor("purple"), sa = this.resolveColor(t.solar_trend_color, ct), aa = this.resolveColor(t.grid_trend_color, ct), la = this.resolveColor(t.grid_secondary_trend_color, ct), ca = this.resolveColor(t.grid_export_trend_color, Wt), da = this.resolveColor(
      t.grid_secondary_export_trend_color,
      Wt
    ), ha = this.resolveColor(t.home_trend_color, ct), ua = this.resolveColor(t.battery_trend_color, ct), _a = this.resolveColor(t.battery_secondary_trend_color, ct), pa = t.grid_export_highlight === !0 ? Uo : null, ma = t.grid_secondary_export_highlight === !0 ? Uo : null, ya = no && wi ? oo : null, ga = wi ? Ne : Yr, fa = ao && xi ? so : null, ba = xi ? Le : Zr, va = this.buildFlowSegments(
      Pi,
      ro,
      Ai,
      [
        ...Ht ? [{ placement: Ht, direction: Es }] : [],
        ...Bt ? [{ placement: Bt, direction: Cs }] : []
      ],
      Ts,
      [
        ...Ft ? [{ placement: Ft, direction: Ps }] : [],
        ...Vt ? [{ placement: Vt, direction: Is }] : []
      ],
      Os,
      $s,
      ks,
      G
    );
    return y`
      <ha-card
        class=${$i ? "interactive" : ""}
        tabindex=${$i ? 0 : -1}
        role=${$i ? "button" : "article"}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div
            class="energy-grid"
            style=${M({
      ...na,
      "--grid-columns": `${G.cols}`,
      "--grid-rows": `${G.rows}`,
      "--grid-aspect": `${G.cols} / ${G.rows}`
    })}
          >
            ${va.map(
      (R) => this.renderFlowLine(R.orientation, R.direction, {
        ...R.orientation === "horizontal" ? {
          left: `${R.left}%`,
          top: `calc(${R.top}% - (var(--flow-line-size) / 2))`,
          width: `${R.width}%`
        } : {
          left: `calc(${R.left}% - (var(--flow-line-size) / 2))`,
          top: `${R.top}%`,
          height: `${R.height}%`
        }
      })
    )}
            ${this.renderSubNodeConnectors()}

            ${r && Ai ? y`
                  <div
                    class="energy-value solar ${vt === null ? "missing" : ""}"
                    data-pp-node-key="solar"
                    style=${M(this.gridPlacementStyle(Ai))}
                  >
                    ${this.renderTrend("solar", vt, bt, !!t.solar_trend, sa, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.solar_icon ?? "mdi:weather-sunny"}
                        style=${M(Hs)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(vt, bt, e)}</div>
                      <div class="energy-label">${t.solar_label}</div>
                    </div>
                  </div>
                ` : E}

            ${o && Ht ? y`
                  <div
                    class="energy-value grid ${v === null ? "missing" : ""}"
                    data-pp-node-key="grid"
                    style=${M(this.gridPlacementStyle(Ht))}
                  >
                    ${this.renderTrend(
      "grid",
      v,
      A,
      !!t.grid_trend,
      aa,
      pa,
      ca
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.grid_icon ?? "mdi:transmission-tower"}
                        style=${M(ra)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(v, A, e)}</div>
                      <div class="energy-label">${t.grid_label}</div>
                    </div>
                  </div>
                ` : E}

            ${n && Bt ? y`
                  <div
                    class="energy-value grid-secondary ${b === null ? "missing" : ""}"
                    data-pp-node-key="grid_secondary"
                    style=${M(this.gridPlacementStyle(Bt))}
                  >
                    ${this.renderTrend(
      "grid_secondary",
      b,
      P,
      !!t.grid_secondary_trend,
      la,
      ma,
      da
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${M(oa)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(b, P, e)}</div>
                      <div class="energy-label">${t.grid_secondary_label}</div>
                    </div>
                  </div>
                ` : E}

            ${i && Pi ? y`
                  <div
                    class="energy-value home ${Lt === null ? "missing" : ""}"
                    data-pp-node-key="home"
                    style=${M(this.gridPlacementStyle(Pi))}
                  >
                    ${this.renderTrend("home", Lt, Si, !!t.home_trend, ha, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.home_icon ?? "mdi:home-lightning-bolt"}
                        style=${M(Bs)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(Lt, Si, e)}</div>
                      <div class="energy-label">${t.home_label}</div>
                    </div>
                  </div>
                ` : E}

            ${this._showSubBlocks ? this.renderSubNodes("solar", d, Gs, e) : E}
            ${this._showSubBlocks ? this.renderSubNodes("grid", h, Xs, e) : E}
            ${this._showSubBlocks ? this.renderSubNodes("grid_secondary", _, Ys, e) : E}
            ${this._showSubBlocks ? this.renderSubNodes("home", io, Zs, e) : E}

            ${s && Ft ? y`
                  <div
                    class="energy-value battery ${x === null ? "missing" : ""}"
                    data-pp-node-key="battery"
                    style=${M(this.gridPlacementStyle(Ft))}
                  >
                    ${this.renderTrend(
      "battery",
      ga,
      xs,
      !!t.battery_trend,
      ua,
      ya,
      Ii
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon class="energy-icon" .icon=${Js} style=${M(qs)}></ha-icon>
                        ${Ne !== null ? y`
                              <div
                                class="battery-percentage ${Oi ? "alert" : ""}"
                                style=${M(Oi ? { color: Ii } : {})}
                              >
                                ${this.formatBatteryPercentage(Ne)}
                              </div>
                            ` : E}
                      </div>
                      <div class="energy-number">${this.formatValue(Yr, ee, e)}</div>
                      <div class="energy-label">${t.battery_label}</div>
                    </div>
                  </div>
                ` : E}

            ${a && Vt ? y`
                  <div
                    class="energy-value battery-secondary ${w === null ? "missing" : ""}"
                    data-pp-node-key="battery_secondary"
                    style=${M(this.gridPlacementStyle(Vt))}
                  >
                    ${this.renderTrend(
      "battery_secondary",
      ba,
      Ss,
      !!t.battery_secondary_trend,
      _a,
      fa,
      Di
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${ea}
                          style=${M(Qs)}
                        ></ha-icon>
                        ${Le !== null ? y`
                              <div
                                class="battery-percentage ${Ri ? "alert" : ""}"
                                style=${M(Ri ? { color: Di } : {})}
                              >
                                ${this.formatBatteryPercentage(Le)}
                              </div>
                            ` : E}
                      </div>
                      <div class="energy-number">${this.formatValue(Zr, Te, e)}</div>
                      <div class="energy-label">${t.battery_secondary_label}</div>
                    </div>
                  </div>
                ` : E}

            <div class="home-core" style=${M(this.gridPlacementStyle(ro))}>
              <div class="home-core-icon" style=${M(Fs)}>
                <ha-icon .icon=${t.core_icon ?? "mdi:home"}></ha-icon>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderFlowLine(t, e, i) {
    const r = e === "none" ? `flow-line dynamic ${t}` : `flow-line dynamic ${t} active ${e}`;
    return y`<div class=${r} style=${M(i)} aria-hidden="true"></div>`;
  }
  renderSubNodeConnectors() {
    return !this._showSubBlocks || this._subNodeConnectorSegments.length === 0 ? E : y`
      <div class="subnode-connectors" aria-hidden="true">
        ${this._subNodeConnectorSegments.map(
      (t) => y`
            <div
              class="subnode-connector-segment ${t.node}"
              style=${M({
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
    const i = [], r = t === "solar" ? "mdi:solar-power-variant" : t === "home" ? "mdi:flash" : "mdi:transmission-tower", o = t === "solar" ? "Solar" : t === "home" ? "Home" : t === "grid" ? "Grid" : "Grid 2", n = t === "solar" ? Vo : t === "home" ? Wo : Yi;
    for (let h = 1; h <= n; h += 1) {
      const _ = e[`${t}_sub_${h}_enabled`] === !0, p = this.readConfigString(e[`${t}_sub_${h}_entity`]);
      if (!_ || !p)
        continue;
      const m = e[`${t}_sub_${h}_state_mode`] === !0;
      i.push({
        key: `${t}_${h}`,
        index: h,
        icon: this.readConfigString(e[`${t}_sub_${h}_icon`]) ?? r,
        iconStyle: this.iconColorStyle(e[`${t}_sub_${h}_icon_color`]),
        label: this.readConfigString(e[`${t}_sub_${h}_label`]) ?? `${o} ${h}`,
        value: F(this.hass, p),
        unit: U(this.hass, p) ?? e.unit ?? "kW",
        stateMode: m,
        stateText: m ? oi(this.hass, p) : void 0
      });
    }
    if (i.length > 0)
      return i;
    if (t !== "solar" && t !== "home")
      return [];
    const s = t === "solar" ? !!e.solar_sub_enabled : !!e.home_sub_enabled, a = t === "solar" ? e.solar_sub_entity : e.home_sub_entity;
    if (!s || !a)
      return [];
    const c = t === "solar" ? e.solar_sub_icon ?? r : e.home_sub_icon ?? r, d = t === "solar" ? e.solar_sub_icon_color : e.home_sub_icon_color, u = t === "solar" ? e.solar_sub_label ?? "Solar Sub" : e.home_sub_label ?? "Home Load";
    return [
      {
        key: `${t}_legacy`,
        index: 1,
        icon: c,
        iconStyle: this.iconColorStyle(d),
        label: u,
        value: F(this.hass, a),
        unit: U(this.hass, a) ?? e.unit ?? "kW",
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
    return Object.entries(t).forEach(([r, o]) => {
      i[Number(r)] = {
        row: o.row - e.minRow + 1,
        col: o.col - e.minCol + 1
      };
    }), i;
  }
  computeGridBounds(t, e, i, r, o, n, s, a, c, d, u, h, _, p, m, f, g, v) {
    const b = [{ col: 3, row: 3, colSpan: 2, rowSpan: 2 }];
    t && b.push({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }), e && b.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }), i && s && b.push(s), r && a && b.push(a), o && c && b.push(c), n && d && b.push(d), u.forEach(($) => {
      const T = m[$.index];
      T && b.push({ col: T.col, row: T.row, colSpan: 1, rowSpan: 1 });
    }), h.forEach(($) => {
      const T = f[$.index];
      T && b.push({ col: T.col, row: T.row, colSpan: 1, rowSpan: 1 });
    }), _.forEach(($) => {
      const T = g[$.index];
      T && b.push({ col: T.col, row: T.row, colSpan: 1, rowSpan: 1 });
    }), p.forEach(($) => {
      const T = v[$.index];
      T && b.push({ col: T.col, row: T.row, colSpan: 1, rowSpan: 1 });
    });
    const x = Math.min(...b.map(($) => $.col)), k = Math.max(...b.map(($) => $.col + ($.colSpan ?? 1) - 1)), w = Math.min(...b.map(($) => $.row)), S = Math.max(...b.map(($) => $.row + ($.rowSpan ?? 1) - 1));
    return {
      minCol: x,
      maxCol: k,
      minRow: w,
      maxRow: S,
      cols: k - x + 1,
      rows: S - w + 1
    };
  }
  placementCenter(t, e) {
    const i = t.colSpan ?? 1, r = t.rowSpan ?? 1;
    return {
      x: (t.col - 1 + i / 2) / e.cols * 100,
      y: (t.row - 1 + r / 2) / e.rows * 100
    };
  }
  buildFlowSegments(t, e, i, r, o, n, s, a, c, d) {
    const u = this.placementCenter(e, d), h = [], _ = (m, f, g, v) => {
      const b = Math.min(m, f), x = Math.abs(f - m);
      x <= W || h.push({
        orientation: "horizontal",
        direction: v,
        left: b,
        top: g,
        width: x,
        height: 0
      });
    }, p = (m, f, g, v) => {
      const b = Math.min(m, f), x = Math.abs(f - m);
      x <= W || h.push({
        orientation: "vertical",
        direction: v,
        left: g,
        top: b,
        width: 0,
        height: x
      });
    };
    if (t) {
      const m = this.placementCenter(t, d);
      _(u.x, m.x, u.y, c);
    }
    if (i) {
      const m = this.placementCenter(i, d);
      p(m.y, u.y, u.x, a);
    }
    if (r.length === 1) {
      const [{ placement: m, direction: f }] = r, g = this.placementCenter(m, d);
      _(g.x, u.x, u.y, f);
    } else if (r.length >= 2) {
      const m = r.map((v) => ({
        direction: v.direction,
        center: this.placementCenter(v.placement, d)
      })).sort((v, b) => v.center.y - b.center.y), f = Math.min(...m.map((v) => v.center.x)), g = u.x - (u.x - f) * 0.5;
      _(u.x, g, u.y, o), m.forEach((v) => {
        const b = v.center.y > u.y + W ? this.reverseFlowDirection(v.direction) : v.direction;
        p(u.y, v.center.y, g, b), _(v.center.x, g, v.center.y, v.direction);
      });
    }
    if (n.length === 1) {
      const [{ placement: m, direction: f }] = n, g = this.placementCenter(m, d);
      p(u.y, g.y, u.x, f);
    } else if (n.length >= 2) {
      const m = n.map((v) => ({
        placement: v.placement,
        direction: v.direction,
        center: this.placementCenter(v.placement, d)
      })).sort((v, b) => v.center.y - b.center.y), f = Math.min(
        ...m.map((v) => (v.placement.row - 1) / d.rows * 100)
      ), g = Math.max(u.y + W, f);
      p(u.y, g, u.x, s), m.forEach((v) => {
        const b = v.center.x < u.x - W ? this.reverseFlowDirection(v.direction) : v.direction;
        _(u.x, v.center.x, g, b), p(g, v.center.y, v.center.x, v.direction);
      });
    }
    return h;
  }
  renderSubNodes(t, e, i, r) {
    return e.length === 0 ? E : y`
      ${e.map((o) => {
      var p;
      const n = i[o.index];
      if (!n)
        return E;
      const s = {
        "grid-column": `${n.col}`,
        "grid-row": `${n.row}`
      }, a = ((p = o.stateText) == null ? void 0 : p.trim()) ?? "", c = o.stateMode, d = a.length === 0, u = c ? d ? "--" : a : this.formatValue(o.value, o.unit, r), h = c ? { value: u, unit: "" } : this.splitFormattedValueAndUnit(u, o.unit), _ = c ? d : o.value === null;
      return y`
            <div
              class="energy-sub-value ${t}-sub sub-col-${n.col} ${this._compactSubBlocks ? "compact" : ""} ${_ ? "missing" : ""}"
              data-key=${o.key}
              data-pp-node-key="${t}_sub_${o.index}"
              style=${M(s)}
            >
              <div class="energy-sub-content">
                <ha-icon class="energy-sub-icon" .icon=${o.icon} style=${M(o.iconStyle)}></ha-icon>
                <div class="energy-sub-number">${this._compactSubBlocks ? h.value : u}</div>
                ${c ? E : y`<div class="energy-sub-unit">${h.unit}</div>`}
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
    const r = t.unit;
    if (r && r.trim().length > 0)
      return r;
    const o = e.map((s) => s.unit).find((s) => typeof s == "string" && s.trim().length > 0);
    if (o)
      return o;
    const n = U(this.hass, t.solar_entity);
    return n && n.trim().length > 0 ? n : i;
  }
  computeAutoSolarValueFromSubBlocks(t, e) {
    const i = t.filter(
      (c) => c.value !== null && Number.isFinite(c.value)
    );
    if (i.length === 0)
      return null;
    const r = i.reduce((c, d) => c + d.value, 0);
    let o = null, n = 0;
    for (const c of i) {
      const d = te(c.unit);
      if (!d)
        return r <= W ? 0 : r;
      if (o === null)
        o = d.family;
      else if (o !== d.family)
        return r <= W ? 0 : r;
      n += c.value * d.factor;
    }
    let s = n;
    const a = te(e);
    return a && o !== null && a.family === o && a.factor > 0 && (s /= a.factor), Number.isFinite(s) ? s <= W ? 0 : s : null;
  }
  homeComputationDependencies(t) {
    const e = [], i = (r, o) => {
      o && e.push({ role: r, entityId: o });
    };
    return t.solar_visible !== !1 && i("solar", this.readConfigString(t.solar_entity)), t.grid_visible !== !1 && (i("grid", this.readConfigString(t.grid_entity)), t.grid_secondary_visible === !0 && i("grid_secondary", this.readConfigString(t.grid_secondary_entity))), t.battery_visible !== !1 && (i("battery", this.readConfigString(t.battery_entity)), t.battery_secondary_visible === !0 && i("battery_secondary", this.readConfigString(t.battery_secondary_entity))), e;
  }
  resolveAutoHomeUnit(t, e, i) {
    const r = t.unit;
    if (r && r.trim().length > 0)
      return r;
    if (t.solar_auto_calculate === !0 && t.solar_visible !== !1 && i && i.trim().length > 0)
      return i;
    const o = this.homeComputationDependencies(t);
    for (const n of o) {
      const s = U(this.hass, n.entityId);
      if (s && s.trim().length > 0)
        return s;
    }
    return e;
  }
  computeAutoHomeValueFromNodeValues(t, e, i) {
    if (!Object.values(t).some((u) => u != null && Number.isFinite(u)))
      return null;
    const o = {};
    let n = 0;
    e && Object.keys(t).forEach((u) => {
      const h = t[u], _ = e[u];
      h != null && Number.isFinite(h) && (n += 1, _ && (o[u] = _));
    });
    const s = Object.keys(o).length === n ? hl(o) : { comparable: !1, family: null, factors: {} }, a = s.comparable ? s.factors : void 0, c = (u) => {
      const h = t[u];
      if (h == null || !Number.isFinite(h))
        return 0;
      const _ = (a == null ? void 0 : a[u]) ?? 1;
      return h * _;
    };
    let d = c("solar") + c("grid") + c("grid_secondary") - c("battery") - c("battery_secondary");
    if (a && i) {
      const u = te(i);
      u && s.family !== null && u.family === s.family && u.factor > 0 && (d /= u.factor);
    }
    return Number.isFinite(d) ? d <= W ? 0 : d : null;
  }
  sumComparableValues(t) {
    const e = t.filter(
      (o) => o.value !== null && Number.isFinite(o.value)
    );
    if (e.length === 0)
      return null;
    let i = null, r = 0;
    for (const o of e) {
      const n = te(o.unit);
      if (!n)
        return e.reduce((s, a) => s + a.value, 0);
      if (i === null)
        i = n.family;
      else if (i !== n.family)
        return e.reduce((s, a) => s + a.value, 0);
      r += o.value * n.factor;
    }
    return r;
  }
  renderTrend(t, e, i, r, o, n, s) {
    return r ? (this._trendDrawConfig[t] = {
      currentValue: e,
      unit: i,
      color: o,
      threshold: n,
      thresholdColor: s
    }, y`
      <div class="node-trend" aria-hidden="true">
        <canvas class="node-trend-canvas-area" data-node=${t}></canvas>
      </div>
      <div class="node-trend-line" aria-hidden="true">
        <canvas class="node-trend-canvas-line" data-node=${t}></canvas>
      </div>
    `) : (delete this._trendDrawConfig[t], E);
  }
  trendPoints(t, e) {
    const i = Date.now(), r = i - ht, o = this._trendSeries[t] ?? [];
    let n = 0;
    for (; n < o.length && o[n].ts < r; )
      n += 1;
    const s = n > 0 ? o.slice(n) : [...o];
    return e !== null && Number.isFinite(e) && s.push({ ts: i, value: e }), s;
  }
  buildThresholdTrendSegments(t, e) {
    const i = [];
    for (let r = 1; r < t.length; r += 1) {
      const o = t[r - 1], n = t[r], s = o.value <= e, a = n.value <= e;
      if (s === a || Math.abs(n.value - o.value) <= W) {
        i.push({
          start: o,
          end: n,
          low: s
        });
        continue;
      }
      const c = (e - o.value) / (n.value - o.value), d = Math.max(0, Math.min(1, c)), u = {
        x: o.x + (n.x - o.x) * d,
        y: o.y + (n.y - o.y) * d,
        value: e,
        ts: o.ts + (n.ts - o.ts) * d
      };
      i.push({
        start: o,
        end: u,
        low: s
      }), i.push({
        start: u,
        end: n,
        low: a
      });
    }
    return i;
  }
  toTrendCoordinates(t, e) {
    var v, b;
    const r = Date.now() - ht, o = 0, n = 100, s = t.map((x) => x.value), a = (e == null ? void 0 : e.min) ?? Math.min(...s), c = (e == null ? void 0 : e.max) ?? Math.max(...s);
    if (!Number.isFinite(a) || !Number.isFinite(c))
      return [];
    const d = 20, u = 80, h = Math.max(c - a, W), _ = t.map((x) => {
      const k = Math.max(0, Math.min(100, (x.ts - r) / ht * 100)), w = o + k / 100 * (n - o), S = h <= W ? 0.5 : (x.value - a) / h, $ = u - S * (u - d);
      return { x: w, y: $, value: x.value, ts: x.ts };
    }), p = ((v = _[0]) == null ? void 0 : v.x) ?? o, m = ((b = _[_.length - 1]) == null ? void 0 : b.x) ?? n, f = Math.max(0, m - p), g = 18;
    if (_.length >= 2 && f < g) {
      const x = n - g, k = Math.max(o, Math.min(x, m - g));
      if (f <= W) {
        const S = g / (_.length - 1);
        return _.map(($, T) => ({
          ...$,
          x: Math.max(o, Math.min(n, k + S * T))
        }));
      }
      const w = g / f;
      return _.map((S) => ({
        ...S,
        x: Math.max(o, Math.min(n, k + (S.x - p) * w))
      }));
    }
    return _;
  }
  toCanvasPoints(t, e, i) {
    return xr(t, e, i);
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
    if (Object.entries(t).forEach(([n, s]) => {
      if (!this.isSharedScaleParticipant(n))
        return;
      const a = (e == null ? void 0 : e[n]) ?? 1;
      s.forEach((c) => i.push(c.value * a));
    }), i.length === 0)
      return null;
    const r = Math.min(...i), o = Math.max(...i);
    return !Number.isFinite(r) || !Number.isFinite(o) ? null : { min: r, max: o };
  }
  resolveSharedTrendUnitFactors(t) {
    const e = Object.keys(t).filter(
      (o) => this.isSharedScaleParticipant(o)
    );
    if (e.length === 0)
      return null;
    let i = null;
    const r = {};
    for (const o of e) {
      const n = this._trendDrawConfig[o];
      if (!n)
        return null;
      const s = te(n.unit);
      if (!s)
        return null;
      if (i === null)
        i = s.family;
      else if (i !== s.family)
        return null;
      r[o] = s.factor;
    }
    return r;
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
    const e = t.getBoundingClientRect(), i = e.width <= yc || e.height <= gc;
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
    const t = this.renderRoot.querySelector(".energy-grid"), e = this.renderRoot.querySelector(".energy-value.home"), i = this.renderRoot.querySelector(".energy-value.solar"), r = this.renderRoot.querySelector(".energy-value.grid"), o = this.renderRoot.querySelector(".energy-value.grid-secondary");
    if (!t) {
      this._subNodeConnectorSegments.length > 0 && (this._subNodeConnectorSegments = []);
      return;
    }
    const n = t.getBoundingClientRect(), s = e == null ? void 0 : e.getBoundingClientRect(), a = i == null ? void 0 : i.getBoundingClientRect(), c = r == null ? void 0 : r.getBoundingClientRect(), d = o == null ? void 0 : o.getBoundingClientRect(), u = s ? s.left + s.width / 2 : 0, h = a ? a.top + a.height / 2 : 0, _ = c ? c.left + c.width / 2 : 0, p = d ? d.left + d.width / 2 : 0, m = (w) => w - n.left, f = (w) => w - n.top, g = (w) => Math.round(w * 10) / 10, v = [], b = (w, S, $, T) => {
      const A = Math.min(w, S), P = Math.abs(S - w);
      P <= 0.5 || v.push({
        node: T,
        left: g(A),
        top: g($ - 1),
        width: g(P),
        height: 2
      });
    }, x = (w, S, $, T) => {
      const A = Math.min(w, S), P = Math.abs(S - w);
      P <= 0.5 || v.push({
        node: T,
        left: g($ - 1),
        top: g(A),
        width: 2,
        height: g(P)
      });
    };
    s && this.renderRoot.querySelectorAll(".energy-sub-value.home-sub").forEach((w) => {
      const S = w.getBoundingClientRect(), $ = S.top + S.height / 2, T = S.left + S.width / 2 < u ? S.right : S.left, A = $, P = $ < s.top ? s.top : $ > s.bottom ? s.bottom : $, D = m(u), O = f(A), H = f(P), Q = m(T);
      b(Q, D, O, "home"), x(O, H, D, "home");
    }), a && this.renderRoot.querySelectorAll(".energy-sub-value.solar-sub").forEach((w) => {
      const S = w.getBoundingClientRect(), $ = S.left + S.width / 2, T = S.top + S.height / 2 < h ? S.bottom : S.top, A = $, P = $ < a.left ? a.left : $ > a.right ? a.right : $, D = f(h), O = m(A), H = m(P), Q = f(T);
      x(Q, D, O, "solar"), b(O, H, D, "solar");
    }), c && this.renderRoot.querySelectorAll(".energy-sub-value.grid-sub").forEach((w) => {
      const S = w.getBoundingClientRect(), $ = S.top + S.height / 2, T = S.left + S.width / 2 < _ ? S.right : S.left, A = $, P = $ < c.top ? c.top : $ > c.bottom ? c.bottom : $, D = m(_), O = f(A), H = f(P), Q = m(T);
      b(Q, D, O, "grid"), x(O, H, D, "grid");
    }), d && this.renderRoot.querySelectorAll(".energy-sub-value.grid_secondary-sub").forEach((w) => {
      const S = w.getBoundingClientRect(), $ = S.top + S.height / 2, T = S.left + S.width / 2 < p ? S.right : S.left, A = $, P = $ < d.top ? d.top : $ > d.bottom ? d.bottom : $, D = m(p), O = f(A), H = f(P), Q = m(T);
      b(Q, D, O, "grid_secondary"), x(O, H, D, "grid_secondary");
    }), v.length === this._subNodeConnectorSegments.length && v.every(
      (w, S) => {
        var $, T, A, P, D;
        return w.node === (($ = this._subNodeConnectorSegments[S]) == null ? void 0 : $.node) && w.left === ((T = this._subNodeConnectorSegments[S]) == null ? void 0 : T.left) && w.top === ((A = this._subNodeConnectorSegments[S]) == null ? void 0 : A.top) && w.width === ((P = this._subNodeConnectorSegments[S]) == null ? void 0 : P.width) && w.height === ((D = this._subNodeConnectorSegments[S]) == null ? void 0 : D.height);
      }
    ) || (this._subNodeConnectorSegments = v);
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
    var h;
    const t = this.perfNow(), e = this.collectTrendCanvases(".node-trend-canvas-area"), i = this.collectTrendCanvases(".node-trend-canvas-line"), r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
    e.forEach((_, p) => {
      const m = this.prepareTrendCanvas(_);
      m && r.set(p, m);
    }), i.forEach((_, p) => {
      const m = this.prepareTrendCanvas(_);
      m && o.set(p, m);
    });
    const n = {};
    Object.keys(this._trendDrawConfig).forEach((_) => {
      const p = this._trendDrawConfig[_];
      if (!p)
        return;
      const m = this.trendPoints(_, p.currentValue);
      m.length >= 2 && (n[_] = m);
    });
    const s = ((h = this._config) == null ? void 0 : h.shared_trend_scale) === !0, a = s ? this.resolveSharedTrendUnitFactors(n) : null, c = s ? this.computeTrendValueRange(n, a ?? void 0) : null;
    let d = 0, u = 0;
    Object.keys(this._trendDrawConfig).forEach((_) => {
      const p = this._trendDrawConfig[_];
      if (!p)
        return;
      const m = r.get(_), f = o.get(_);
      if (!m || !f)
        return;
      const g = n[_];
      if (!g || g.length < 2)
        return;
      const v = s && a !== null && this.isSharedScaleParticipant(_), b = v ? (a == null ? void 0 : a[_]) ?? 1 : 1, x = v ? this.scaleTrendSeries(g, b) : g, k = v ? c : null, w = this.toTrendCoordinates(x, k);
      if (w.length < 2)
        return;
      const S = this.toCanvasPoints(w, m.width, m.height), $ = this.toCanvasPoints(w, f.width, f.height);
      this.drawTrendArea(
        m.ctx,
        S,
        p.color,
        m.height,
        p.threshold,
        p.thresholdColor
      ), this.drawTrendLine(f.ctx, $, p.color, p.threshold, p.thresholdColor), d += 1, u += $.length;
    }), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - t),
      series: d,
      points: u,
      shared_scale: s,
      shared_scale_units: a ? "canonical" : "raw"
    });
  }
  collectTrendCanvases(t) {
    const e = /* @__PURE__ */ new Map();
    return this.renderRoot.querySelectorAll(t).forEach((i) => {
      const r = i.dataset.node;
      !r || r !== "solar" && r !== "grid" && r !== "grid_secondary" && r !== "home" && r !== "battery" && r !== "battery_secondary" || e.set(r, i);
    }), e;
  }
  prepareTrendCanvas(t) {
    return yt(t);
  }
  drawTrendArea(t, e, i, r, o, n) {
    if (e.length < 2)
      return;
    const s = this.resolveCanvasColor(i);
    if (o === null) {
      this.fillTrendAreaRun(t, e, s, r);
      return;
    }
    const a = this.resolveCanvasColor(n), c = this.buildThresholdTrendSegments(e, o);
    this.buildAreaRunsFromSegments(c).forEach((u) => {
      this.fillTrendAreaRun(t, u.points, u.low ? a : s, r);
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
      const r = e[e.length - 1], o = r.points[r.points.length - 1], n = Math.abs(o.x - i.start.x) <= 0.01 && Math.abs(o.y - i.start.y) <= 0.01;
      r.low === i.low && n ? r.points.push(i.end) : e.push({
        low: i.low,
        points: [i.start, i.end]
      });
    }
    return e;
  }
  fillTrendAreaRun(t, e, i, r) {
    if (e.length < 2)
      return;
    const o = e[0], n = e[e.length - 1], s = Math.min(...e.map((c) => c.y)), a = t.createLinearGradient(0, s, 0, r);
    a.addColorStop(0, this.withAlpha(i, 0.24)), a.addColorStop(1, this.withAlpha(i, 0)), t.beginPath(), t.moveTo(o.x, o.y), e.slice(1).forEach((c) => t.lineTo(c.x, c.y)), t.lineTo(n.x, r), t.lineTo(o.x, r), t.closePath(), t.fillStyle = a, t.fill();
  }
  drawTrendLine(t, e, i, r, o) {
    if (e.length < 2)
      return;
    const n = this.resolveCanvasColor(i), s = this.resolveCanvasColor(o);
    if (r === null) {
      this.strokeTrendPolyline(t, e, n, 1.5);
      return;
    }
    this.buildThresholdTrendSegments(e, r).forEach((c) => {
      this.strokeTrendSegment(t, c.start, c.end, c.low ? s : n, 1.5);
    });
  }
  strokeTrendPolyline(t, e, i, r) {
    e.length < 2 || (t.beginPath(), t.moveTo(e[0].x, e[0].y), e.slice(1).forEach((o) => t.lineTo(o.x, o.y)), t.strokeStyle = i, t.lineWidth = r, t.lineCap = "round", t.lineJoin = "round", t.stroke());
  }
  strokeTrendSegment(t, e, i, r, o) {
    t.beginPath(), t.moveTo(e.x, e.y), t.lineTo(i.x, i.y), t.strokeStyle = r, t.lineWidth = o, t.lineCap = "round", t.lineJoin = "round", t.stroke();
  }
  resolveCanvasColor(t) {
    return Ie(this.renderRoot, t);
  }
  withAlpha(t, e) {
    return gt(t, e, this._canvasColorContextCache);
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
    var o, n;
    const t = this.renderRoot.querySelector("ha-card");
    if (!t || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const i = !!((o = this._config.hold_action) != null && o.action && this._config.hold_action.action !== "none") || this.holdDefaultEnabled(), r = !!((n = this._config.double_tap_action) != null && n.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = ot(
      t,
      {
        onTap: () => this.fireAction("tap"),
        onHold: () => this.fireAction("hold"),
        onDoubleTap: () => this.fireAction("double_tap")
      },
      { hasHold: i, hasDoubleTap: r }
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
      var c;
      const i = e.dataset.ppNodeKey;
      if (!i) return;
      const r = this.hasNodeAction(i, "hold"), o = ((c = this.nodeActionConfig(i, "hold")) == null ? void 0 : c.action) === "none", n = r || !o, s = this.hasNodeAction(i, "double_tap"), a = ot(
        e,
        {
          onTap: () => this.fireNodeAction(i, "tap", e),
          onHold: () => this.fireNodeAction(i, "hold", e),
          onDoubleTap: () => this.fireNodeAction(i, "double_tap", e)
        },
        { hasHold: n, hasDoubleTap: s, stopPropagation: !0 }
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
    let r = this.nodeActionConfig(t, e);
    if (e === "tap" && (!r || !r.action) && (r = { action: Ko }), e === "hold" && (!r || !r.action) && (r = { action: jo }), !r || !r.action || r.action === "none")
      return;
    if (r.action === jo) {
      this.openNodeDetailDialog(t);
      return;
    }
    if (r.action === Ko) {
      this.openNodeZoomOverlay(t, i);
      return;
    }
    const o = {
      ...this._config,
      tap_action: e === "tap" ? r : this._config.tap_action,
      hold_action: e === "hold" ? r : this._config.hold_action,
      double_tap_action: e === "double_tap" ? r : this._config.double_tap_action,
      // Use the node's primary entity for more-info if no explicit entity in actionConfig.
      entity: r.entity ?? this.nodeEntityId(t) ?? this._config.entity
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
    const r = this.renderRoot.querySelector("ha-card"), o = r == null ? void 0 : r.getBoundingClientRect();
    ec({
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
    !this._config || !this.hass || Ro({
      hass: this.hass,
      config: this._config,
      focusedNodeKey: t
    });
  }
  openOverviewDialog() {
    !this._config || !this.hass || Ro({
      hass: this.hass,
      config: this._config,
      focusedNodeKey: "",
      overview: !0
    });
  }
  updated(t) {
    t.has("_config") && this.setupActionHandler(), this.updateComplete.then(() => this.setupNodeActionHandlers());
    const e = t.get("_config"), i = t.has("_config") && this.shouldRefreshTrendOnConfigChange(e, this._config), r = t.get("hass"), o = t.has("hass") && this.didRelevantEntityStateChange(r);
    (t.has("preview") || t.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (t.has("_config") ? i && this.scheduleConfigRefresh() : t.has("hass") && this._isVisible && o && this.maybeRefreshTrendHistory(), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (t.has("_config") ? i && this.scheduleConfigRefresh(!0) : t.has("hass") && o && this.maybeRefreshTrendHistory(!1, !0), this._trendResizeObserver && this._trendResizeObserver.disconnect());
    const n = t.has("_config") || t.has("_trendSeries") || t.has("_showSubBlocks") || t.has("preview") || t.has("editMode") || o;
    n && this.updateSubBlockVisibility(), (!this.shouldRunLiveRuntime() || this._isVisible) && n && (this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
  }
  maybeRefreshTrendHistory(t = !1, e = !1) {
    if (!this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview())
      return;
    t && (this._lastTrendRefresh = 0);
    const i = Date.now();
    !t && i - this._lastTrendRefresh < Bo || (this._lastTrendRefresh = i, this.refreshTrendHistory(t, e));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(bc) || this.hasEditorLikeAncestor();
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
          const r = i.toLowerCase();
          if (r.includes("preview") || r.includes("editor") || r.includes("card-picker"))
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
    }, mc));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(t = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(t), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Bo), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.syncTrendResizeObserver(), this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this.clearConfigRefreshTimer(), this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._subNodeConnectorRaf !== void 0 && (window.cancelAnimationFrame(this._subNodeConnectorRaf), this._subNodeConnectorRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
  }
  async refreshTrendHistory(t = !1, e = !1) {
    var n, s;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !e)
      return;
    const i = this._config, r = ie(i.trend_data_source, "hybrid"), o = this.enabledTrendNodes(i);
    if (o.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const a = this.perfNow(), c = {}, d = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set();
      let f = Number.POSITIVE_INFINITY;
      const g = Date.now() - ht;
      for (const S of o) {
        if (S === "home" && i.home_auto_calculate === !0) {
          const D = this.homeComputationDependencies(i);
          if (D.length === 0) {
            c[S] = [];
            continue;
          }
          u.set(S, D), h.set(S, this.resolveAutoHomeUnit(i, i.unit ?? "kW"));
          const O = this._trendSeries[S] ?? [];
          if (t || O.length === 0) {
            _.add(S), D.forEach((ee) => {
              p.add(ee.entityId), m.delete(ee.entityId);
            });
            continue;
          }
          const H = ((n = O[O.length - 1]) == null ? void 0 : n.ts) ?? g, Q = Math.max(g, H - Fo);
          f = Math.min(f, Q), D.forEach((ee) => {
            p.has(ee.entityId) || m.add(ee.entityId);
          });
          continue;
        }
        const $ = this.trendEntityId(S, i);
        if (!$)
          continue;
        d.set(S, $);
        const T = this._trendSeries[S] ?? [];
        if (t || T.length === 0 || p.has($)) {
          p.add($), m.delete($);
          continue;
        }
        if (p.has($))
          continue;
        m.add($);
        const A = ((s = T[T.length - 1]) == null ? void 0 : s.ts) ?? g, P = Math.max(g, A - Fo);
        f = Math.min(f, P);
      }
      let v = 0;
      const b = p.size > 0 ? await (async () => {
        const S = this.perfNow(), $ = await Ue(
          this.hass,
          Array.from(p),
          ht,
          { dataSource: r }
        );
        return v = this.perfNow() - S, $;
      })() : {};
      let x = 0;
      const k = m.size > 0 ? await (async () => {
        const S = this.perfNow(), $ = await Ue(
          this.hass,
          Array.from(m),
          ht,
          {
            startMs: Number.isFinite(f) ? f : g,
            dataSource: r
          }
        );
        return x = this.perfNow() - S, $;
      })() : {};
      d.forEach((S, $) => {
        const T = this._trendSeries[$] ?? [];
        if (p.has(S)) {
          const A = b[S] ?? [];
          c[$] = A.length > 0 ? A : T.filter((P) => P.ts >= g);
          return;
        }
        if (m.has(S)) {
          const A = k[S] ?? [];
          c[$] = ai(T, A, g);
          return;
        }
        c[$] = T.filter((A) => A.ts >= g);
      }), u.forEach((S, $) => {
        const T = this._trendSeries[$] ?? [], A = this.computeAutoHomeTrendFromFetchedDependencies(
          S,
          b,
          k,
          p,
          m,
          g,
          h.get($) ?? i.unit ?? "kW"
        );
        if (_.has($)) {
          c[$] = A.length > 0 ? A : T.filter((P) => P.ts >= g);
          return;
        }
        c[$] = ai(T, A, g);
      });
      const w = this.sameTrendSeriesKeys(c, this._trendSeries) && Object.keys(c).every(
        (S) => this.areTrendSeriesEqual(c[S] ?? [], this._trendSeries[S] ?? [])
      );
      w || (this._trendSeries = c), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - a),
        force_full: t,
        nodes: o.length,
        full_entities: p.size,
        incremental_entities: m.size,
        data_source: r,
        full_fetch_ms: this.toPerfMs(v),
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
      const n = this.readConfigString(o);
      n && e.add(n);
    };
    i(t.home_entity), i(t.solar_entity), i(t.grid_entity), i(t.grid_secondary_entity), i(t.battery_entity), i(t.battery_percentage_entity), i(t.battery_secondary_entity), i(t.battery_secondary_percentage_entity), t.solar_sub_enabled && i(t.solar_sub_entity), t.home_sub_enabled && i(t.home_sub_entity);
    const r = (o, n) => {
      for (let s = 1; s <= n; s += 1)
        t[`${o}_sub_${s}_enabled`] === !0 && i(t[`${o}_sub_${s}_entity`]);
    };
    return r("solar", Vo), r("home", Wo), r("grid", Yi), r("grid_secondary", Yi), Array.from(e);
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
        const r = this.homeComputationDependencies(t).map((o) => `${o.role}:${o.entityId}`).sort().join(",");
        e.push(`home:auto:${r}`);
        return;
      }
      e.push(`${i}:${this.trendEntityId(i, t) ?? ""}`);
    }), e.sort().join("|");
  }
  shouldRefreshTrendOnConfigChange(t, e) {
    return !t || !e ? !0 : this.trendHistorySignature(t) !== this.trendHistorySignature(e);
  }
  computeAutoHomeTrendFromFetchedDependencies(t, e, i, r, o, n, s) {
    const a = {}, c = {};
    return t.forEach((d) => {
      const u = r.has(d.entityId) ? e[d.entityId] ?? [] : o.has(d.entityId) ? i[d.entityId] ?? [] : [];
      a[d.role] = u.filter((_) => Number.isFinite(_.ts) && Number.isFinite(_.value) && _.ts >= n).sort((_, p) => _.ts - p.ts);
      const h = U(this.hass, d.entityId);
      h && (c[d.role] = h);
    }), this.computeAutoHomeTrendSeries(a, n, c, s);
  }
  computeAutoHomeTrendSeries(t, e, i, r) {
    const o = [];
    if (Object.values(t).forEach((s) => {
      s.forEach((a) => {
        Number.isFinite(a.ts) && a.ts >= e && o.push(a.ts);
      });
    }), o.length === 0)
      return [];
    o.sort((s, a) => s - a);
    const n = [];
    return o.forEach((s) => {
      const a = n[n.length - 1];
      (a === void 0 || Math.abs(a - s) > 0.5) && n.push(s);
    }), n.map((s) => {
      const a = this.computeAutoHomeValueFromNodeValues({
        solar: this.interpolateTrendSeriesValue(t.solar ?? [], s),
        grid: this.interpolateTrendSeriesValue(t.grid ?? [], s),
        grid_secondary: this.interpolateTrendSeriesValue(t.grid_secondary ?? [], s),
        battery: this.interpolateTrendSeriesValue(t.battery ?? [], s),
        battery_secondary: this.interpolateTrendSeriesValue(t.battery_secondary ?? [], s)
      }, i, r);
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
    let r = 0, o = t.length - 1;
    for (; r <= o; ) {
      const u = Math.floor((r + o) / 2), h = t[u];
      if (Math.abs(h.ts - e) <= 0.5)
        return h.value;
      h.ts < e ? r = u + 1 : o = u - 1;
    }
    const n = Math.max(1, Math.min(t.length - 1, r)), s = t[n - 1], a = t[n], c = a.ts - s.ts;
    if (Math.abs(c) <= W)
      return a.value;
    const d = (e - s.ts) / c;
    return s.value + (a.value - s.value) * d;
  }
  sameTrendSeriesKeys(t, e) {
    const i = Object.keys(t).sort(), r = Object.keys(e).sort();
    return i.length === r.length && i.every((o, n) => o === r[n]);
  }
  areTrendSeriesEqual(t, e) {
    if (t.length !== e.length)
      return !1;
    for (let i = 0; i < t.length; i += 1) {
      const r = t[i], o = e[i];
      if (r.ts !== o.ts || Math.abs(r.value - o.value) > 1e-4)
        return !1;
    }
    return !0;
  }
  hasConfiguredAction(t) {
    var r;
    return t.details_navigation_path || [t.tap_action, t.hold_action, t.double_tap_action].some(
      (o) => o && o.action && o.action !== "none"
    ) ? !0 : ((r = t.hold_action) == null ? void 0 : r.action) !== "none";
  }
  holdDefaultEnabled() {
    var e;
    return this._config ? !((e = this._config.hold_action) == null ? void 0 : e.action) : !1;
  }
  fireAction(t) {
    if (this.isEditorPreview() || !this._config)
      return;
    const e = `${t}_action`;
    let i = this._config[e], r = this._config;
    if (!i && t === "tap" && this._config.details_navigation_path && (i = { action: "navigate", navigation_path: this._config.details_navigation_path }, r = { ...this._config, tap_action: i }), t === "hold" && !i && this.holdDefaultEnabled()) {
      this.openOverviewDialog();
      return;
    }
    if (!(!i || !i.action || i.action === "none")) {
      if (i.action === "more-info" && !r.entity) {
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
          detail: { config: r, action: t },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  toUnidirectionalFlow(t) {
    return t === null || t <= W ? "none" : "forward";
  }
  toBidirectionalFlow(t) {
    return t === null || Math.abs(t) <= W ? "none" : t > 0 ? "forward" : "backward";
  }
  reverseFlowDirection(t) {
    return t === "forward" ? "backward" : t === "backward" ? "forward" : "none";
  }
  formatValue(t, e, i) {
    var r, o, n;
    return Ot(t, e, i, {
      enabled: ((r = this._config) == null ? void 0 : r.auto_scale_units) === !0,
      baseDecimals: ((o = this._config) == null ? void 0 : o.decimals_base_unit) ?? i,
      prefixedDecimals: ((n = this._config) == null ? void 0 : n.decimals_prefixed_unit) ?? i
    });
  }
  splitFormattedValueAndUnit(t, e) {
    const i = t.trim(), r = e.trim();
    if (i.length === 0)
      return { value: "--", unit: r };
    if (r.length === 0)
      return { value: i, unit: "" };
    const o = ` ${r}`;
    if (i.endsWith(o))
      return {
        value: i.slice(0, Math.max(0, i.length - o.length)).trim(),
        unit: r
      };
    const n = i.lastIndexOf(" ");
    return n > 0 ? {
      value: i.slice(0, n).trim(),
      unit: i.slice(n + 1).trim()
    } : { value: i, unit: r };
  }
  formatBatteryPercentage(t) {
    return `${Math.round(this.normalizeBatteryThreshold(t))}%`;
  }
  batteryIcon(t, e, i) {
    if (e !== null && e > W)
      return "mdi:battery-charging";
    if (t === null)
      return i ?? "mdi:battery-outline";
    const r = this.normalizeBatteryThreshold(t);
    return r < 5 ? "mdi:battery-outline" : r >= 95 ? "mdi:battery" : `mdi:battery-${Math.max(10, Math.min(90, Math.round(r / 10) * 10))}`;
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
      const i = t.trim(), r = i.toLowerCase();
      return r === "none" || r === "default" ? {} : {
        "--icon-color": i,
        "--shape-color": `color-mix(in srgb, ${i} 14%, var(--ha-card-background, var(--card-background-color, white)))`
      };
    }
    return {};
  }
  resolveColor(t, e = "") {
    return ve(t, e);
  }
  toRgbCss(t) {
    return _e(t);
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
}, os = (t, e) => {
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
}, ns = (t, e) => {
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
}, ss = (t, e) => {
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
}, as = (t, e) => {
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
}, ls = (t, e) => {
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
}, cs = (t, e) => {
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
}, ds = (t, e) => {
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
}, hs = (t) => t === "column" ? "column" : "row", kr = (t, e = 24) => {
  const i = typeof t == "number" ? t : typeof t == "string" ? Number.parseInt(t, 10) : NaN;
  return i === 6 || i === 12 || i === 24 || i === 48 || i === 72 || i === 168 || i === 336 || i === 720 ? i : e;
}, Er = (t) => typeof t != "number" || !Number.isFinite(t) ? 1.5 : Math.max(0.5, Math.min(6, t)), us = (t, e, i, r) => {
  var s;
  if (e)
    return e;
  const o = t[i], n = (s = o == null ? void 0 : o.attributes) == null ? void 0 : s.friendly_name;
  return typeof n == "string" && n.trim().length > 0 ? n.trim() : `Entity ${r}`;
}, _s = (t, e, i, r) => {
  if (r)
    return Ot(t, e, i, {
      ...r,
      nullWithUnit: !0
    });
  if (t === null)
    return e ? `-- ${e}` : "--";
  const o = `${t.toFixed(i)} ${e}`.trim();
  return o.length > 0 ? o : "--";
}, vc = 4, ps = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, Go = "When enabled, hovering over the graph shows the value and timestamp for that point in the legend.", Xo = "When enabled, the area below each trend line is filled with a semi-transparent gradient.", Yo = "When enabled, all entities share the same Y-axis scale. When disabled, each entity auto-scales independently.", Zo = "When enabled, the graph area is clipped so it does not extend behind the legend labels.", qo = "Thickness of the trend lines in pixels.", Jo = "Controls where trend data is fetched from. Hybrid prefers statistics and falls back to history automatically.", Qo = "The time window shown in the graph.", en = "Controls whether entity legend items are displayed in a row or column layout.", tn = "When enabled, all entity values are normalized as percentages of a reference total, so the graph always fills 0–100%.", rn = "The entity whose value represents 100%. Defaults to the last enabled entity in the stack.", on = "When enabled, the 100% total is auto-calculated by summing all other entities. Useful when you don't have a total meter.", nn = "Default entity used by more-info actions. Required when tap/hold/double-tap is set to 'More info'.", sn = "Automatically formats values with metric prefixes (e.g. W/kW/MW and Wh/kWh/MWh).", an = "Optional unit override. Used when entities have no unit_of_measurement attribute.", ln = "Default decimal precision for displayed values.", cn = "Decimal precision for base units (W, Wh) when auto unit scaling is enabled.", dn = "Decimal precision for prefixed units (kW, MW, kWh, MWh) when auto unit scaling is enabled.", wc = (t, e) => ({
  type: "expandable",
  name: "",
  title: l(e, "graph.editor.entity_slot", { n: t }),
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
      title: l(e, "graph.editor.section_identity"),
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
      title: l(e, "graph.editor.section_appearance"),
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
                  default_color: ps[t] ?? "purple"
                }
              }
            }
          ]
        }
      ]
    }
  ]
}), ms = (t = !1, e = !1, i = "en") => {
  const r = {
    type: "expandable",
    name: "",
    title: l(i, "graph.editor.section_graph_settings"),
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
            helper: en,
            description: en
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
            helper: Qo,
            description: Qo
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
            helper: Jo,
            description: Jo
          }
        ]
      }
    ]
  }, o = [
    {
      type: "grid",
      name: "",
      columns: 2,
      schema: [
        {
          name: "hover_enabled",
          selector: { boolean: {} },
          helper: Go,
          description: Go
        },
        {
          name: "fill_area_enabled",
          selector: { boolean: {} },
          helper: Xo,
          description: Xo
        },
        {
          name: "shared_trend_scale",
          selector: { boolean: {} },
          helper: Yo,
          description: Yo
        },
        {
          name: "clip_graph_to_labels",
          selector: { boolean: {} },
          helper: Zo,
          description: Zo
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
          helper: qo,
          description: qo
        }
      ]
    }
  ], n = {
    type: "expandable",
    name: "",
    title: l(i, "graph.editor.section_display_options"),
    icon: "mdi:tune-variant",
    expanded: !1,
    schema: o
  }, s = [];
  if (t) {
    const d = [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "normalize_stack_to_percent",
            selector: { boolean: {} },
            helper: tn,
            description: tn
          }
        ]
      }
    ];
    e && d.push(
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
            helper: rn,
            description: rn
          },
          {
            name: "percent_reference_auto",
            selector: { boolean: {} },
            helper: on,
            description: on
          }
        ]
      }
    ), s.push({
      type: "expandable",
      name: "",
      title: l(i, "graph.editor.section_stacked_percent"),
      icon: "mdi:percent-outline",
      expanded: !1,
      schema: d
    });
  }
  const a = {
    type: "expandable",
    name: "",
    title: l(i, "graph.editor.section_actions"),
    icon: "mdi:gesture-tap",
    expanded: !1,
    schema: [
      {
        name: "entity",
        selector: { entity: {} },
        helper: nn,
        description: nn
      },
      { name: "tap_action", selector: { ui_action: {} } },
      { name: "hold_action", selector: { ui_action: {} } },
      { name: "double_tap_action", selector: { ui_action: {} } }
    ]
  }, c = {
    type: "expandable",
    name: "",
    title: l(i, "graph.editor.section_units_and_format"),
    icon: "mdi:format-list-numbered",
    expanded: !1,
    schema: [
      {
        type: "expandable",
        name: "",
        title: l(i, "graph.editor.section_display_format"),
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
                helper: an,
                description: an
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: ln,
                description: ln
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(i, "graph.editor.section_auto_scaling"),
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
                helper: sn,
                description: sn
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
                helper: cn,
                description: cn
              },
              {
                name: "decimals_prefixed_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: dn,
                description: dn
              }
            ]
          }
        ]
      }
    ]
  };
  return [
    r,
    n,
    ...s,
    ...Array.from({ length: vc }, (d, u) => wc(u + 1, i)),
    c,
    a
  ];
}, Me = (t) => {
  if (typeof t == "string")
    return t.length > 0 ? t : void 0;
}, ys = (t) => t === "column" ? "column" : "row", gs = (t) => kr(t), fs = (t) => Er(t), Zt = (t, e, i) => {
  const r = t ?? e;
  return Array.isArray(r) || typeof r == "string" && r.trim().length > 0 ? r : ps[i] ?? "purple";
}, bs = (t) => ({
  trend_data_source: ie(t.trend_data_source, "hybrid"),
  entity_1: Me(t.entity_1) ?? Me(t.entity),
  entity_1_name: Me(t.entity_1_name),
  entity_1_enabled: t.entity_1_enabled ?? !0,
  entity_1_show_icon: t.entity_1_show_icon ?? !0,
  entity_1_icon: t.entity_1_icon ?? t.icon,
  entity_1_icon_color: t.entity_1_icon_color ?? t.icon_color,
  entity_1_trend_color: Zt(t.entity_1_trend_color, t.trend_color, 1),
  entity_2: Me(t.entity_2),
  entity_2_name: Me(t.entity_2_name),
  entity_2_enabled: t.entity_2_enabled ?? !1,
  entity_2_show_icon: t.entity_2_show_icon ?? !0,
  entity_2_icon: t.entity_2_icon,
  entity_2_trend_color: Zt(t.entity_2_trend_color, void 0, 2),
  entity_3: Me(t.entity_3),
  entity_3_name: Me(t.entity_3_name),
  entity_3_enabled: t.entity_3_enabled ?? !1,
  entity_3_show_icon: t.entity_3_show_icon ?? !0,
  entity_3_icon: t.entity_3_icon,
  entity_3_trend_color: Zt(t.entity_3_trend_color, void 0, 3),
  entity_4: Me(t.entity_4),
  entity_4_name: Me(t.entity_4_name),
  entity_4_enabled: t.entity_4_enabled ?? !1,
  entity_4_show_icon: t.entity_4_show_icon ?? !0,
  entity_4_icon: t.entity_4_icon,
  entity_4_trend_color: Zt(t.entity_4_trend_color, void 0, 4)
}), xc = {
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
}, vs = (t, e = {}, i = "en") => {
  const r = t.name ?? "", o = r.match(/^entity_(\d+)_(enabled|name|show_icon|icon|icon_color|trend_color)$/);
  if (o) {
    const [, , a] = o, d = {
      enabled: "graph.editor.entity_enabled",
      name: "graph.editor.entity_name",
      show_icon: "graph.editor.entity_show_icon",
      icon: "graph.editor.entity_icon",
      icon_color: "graph.editor.entity_icon_color",
      trend_color: "graph.editor.entity_trend_color"
    }[a];
    return d ? l(i, d) : a;
  }
  if (r.match(/^entity_(\d+)$/))
    return l(i, "graph.editor.entity_picker");
  if (e[r]) return e[r];
  const s = xc[r];
  return s ? l(i, s) : r;
};
var Sc = Object.defineProperty, $c = Object.getOwnPropertyDescriptor, Cr = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? $c(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && Sc(e, i, o), o;
};
let di = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => vs(t, {}, z(this.hass)), this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM")
        return;
      const i = t.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i))
        return;
      const r = {
        ...i,
        type: "custom:power-pilz-graph-card"
      };
      this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: r },
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
      legend_layout: ys(t.legend_layout),
      timeframe_hours: gs(t.timeframe_hours),
      hover_enabled: t.hover_enabled ?? !0,
      fill_area_enabled: t.fill_area_enabled ?? !0,
      shared_trend_scale: t.shared_trend_scale ?? !1,
      debug_performance: t.debug_performance ?? !1,
      decimals: t.decimals ?? 1,
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: t.decimals_base_unit ?? t.decimals ?? 1,
      decimals_prefixed_unit: t.decimals_prefixed_unit ?? t.decimals ?? 1,
      line_thickness: fs(t.line_thickness),
      clip_graph_to_labels: t.clip_graph_to_labels ?? !1,
      ...bs(t)
    };
    this._config = e;
  }
  render() {
    if (!this.hass || !this._config)
      return E;
    const t = ms(!1, !1, z(this.hass));
    return y`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ze}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${t}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Cr([
  I({ attribute: !1 })
], di.prototype, "hass", 2);
Cr([
  C()
], di.prototype, "_config", 2);
di = Cr([
  ce("power-pilz-graph-card-editor")
], di);
var kc = Object.defineProperty, Ec = Object.getOwnPropertyDescriptor, Ke = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Ec(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && kc(e, i, o), o;
};
const St = 1, hn = 24, un = 300 * 1e3, Cc = 60 * 1e3, zc = 350, qt = 0.01, $t = 4, Tc = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", Mc = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), _n = {
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
      const r = t.clientX - i.left, o = t.clientY - i.top;
      if (r < 0 || r > i.width || o < 0 || o > i.height) {
        this.clearHoverState();
        return;
      }
      const n = this.findNearestHoverPoint(r, o);
      if (!n) {
        this.clearHoverState();
        return;
      }
      const s = this._hoverState;
      s && s.slot === n.slot && Math.abs(s.x - n.x) <= 0.2 && Math.abs(s.y - n.y) <= 0.2 && Math.abs(s.value - n.value) <= 1e-4 && s.color === n.color || (this._hoverState = n);
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
    const e = (t == null ? void 0 : t.states) ?? {}, i = Object.keys(e), r = (...d) => d.find((u) => u in e), o = (d) => i.find((u) => u.startsWith(`${d}.`)), n = r("sensor.dev_home_power", "sensor.home_power") ?? o("sensor") ?? "sensor.dev_home_power", s = r("sensor.dev_solar_power", "sensor.solar_power"), a = r("sensor.dev_grid_power", "sensor.grid_power"), c = r("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-card",
      legend_layout: "row",
      timeframe_hours: hn,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      auto_scale_units: !1,
      entity_1: n,
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
      entity_4: c,
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
    const e = typeof t.decimals == "number" && Number.isFinite(t.decimals) ? Math.min(3, Math.max(0, Math.round(t.decimals))) : St, i = Se(t.decimals_base_unit, e), r = Se(t.decimals_prefixed_unit, e), o = this.readConfigString(t.entity), n = this.readConfigString(t.icon), s = this.readConfigString(t.entity_1) ?? o ?? "sensor.dev_home_power";
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
      decimals_prefixed_unit: r,
      entity_1: s,
      entity_1_name: this.readConfigString(t.entity_1_name),
      entity_1_enabled: t.entity_1_enabled ?? !0,
      entity_1_show_icon: t.entity_1_show_icon ?? !0,
      entity_1_icon: t.entity_1_icon ?? n ?? "mdi:chart-line",
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
      return y`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return y``;
    const t = this._config, e = t.decimals ?? St, i = this.normalizeLineThickness(t.line_thickness), r = this.collectSeriesEntries(t, e), o = this.normalizeLegendLayout(t.legend_layout), n = t.hover_enabled !== !1, s = this.hasConfiguredAction(t), a = !this.isEditorPreview() && s, c = this._hoverState, d = t.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, u = d > 0 ? { top: `${d}px` } : {}, h = c ? {
      left: `${c.x}px`,
      top: `${c.y + d}px`,
      "--hover-dot-color": c.color
    } : {};
    return this._drawConfigs = r.map((_) => ({
      slot: _.slot,
      currentValue: _.currentValue,
      unit: _.unit,
      color: _.trendColor,
      lineWidth: i
    })), y`
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
          <div class="card-trend" style=${M(u)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${M(u)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${n && c ? y`<div class="hover-dot" aria-hidden="true" style=${M(h)}></div>` : E}

          <div class="content">
            <div class="series-list layout-${o}">
              ${r.length === 0 ? y`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : r.map(
      (_) => this.renderSeriesItem(
        _,
        c && c.slot === _.slot ? c : null
      )
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderSeriesItem(t, e) {
    const i = e === null ? null : this.convertSharedScaleHoverValue(t.slot, e.value), r = e === null ? null : this.formatHoverTimestamp(e.ts), o = i === null ? t.secondary : `${this.formatValue(i, t.unit, t.decimals)} - ${r ?? ""}`;
    return y`
      <div class="state-item" data-slot=${String(t.slot)}>
        ${t.showIcon ? y`
              <div class="icon-wrap">
                <div class="icon-shape" style=${M(t.iconStyle)}>
                  <ha-icon .icon=${t.icon}></ha-icon>
                </div>
              </div>
            ` : E}
        <div class="info">
          <div class="primary">${t.name}</div>
          <div class="secondary">${o}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(t, e) {
    const i = [];
    for (let r = 1; r <= $t; r += 1) {
      const o = r, n = this.slotEnabled(o, t), s = this.slotEntityId(o, t);
      if (!n || !s)
        continue;
      const a = this.entityName(this.slotCustomName(o, t), s, r), c = F(this.hass, s), d = t.unit ?? U(this.hass, s) ?? "", u = this.formatValue(c, d, e), h = this.slotIcon(o, t), _ = this.iconStyle(this.slotIconColor(o, t)), p = this.resolveColor(_n[o], Tc), m = this.resolveColor(this.slotTrendColor(o, t), p);
      i.push({
        slot: o,
        entityId: s,
        name: a,
        secondary: u,
        unit: d,
        decimals: e,
        currentValue: c,
        icon: h,
        showIcon: this.slotShowIcon(o, t),
        iconStyle: _,
        trendColor: m
      });
    }
    return i;
  }
  slotEntityId(t, e) {
    return os(t, e);
  }
  slotCustomName(t, e) {
    return ns(t, e);
  }
  slotEnabled(t, e) {
    return ss(t, e);
  }
  slotShowIcon(t, e) {
    return as(t, e);
  }
  slotIcon(t, e) {
    return ls(t, e);
  }
  slotIconColor(t, e) {
    return cs(t, e);
  }
  slotTrendColor(t, e) {
    return ds(t, e);
  }
  entityName(t, e, i) {
    return us(this.hass.states, t, e, i);
  }
  formatValue(t, e, i) {
    var r, o, n;
    return _s(t, e, i, {
      enabled: ((r = this._config) == null ? void 0 : r.auto_scale_units) === !0,
      baseDecimals: ((o = this._config) == null ? void 0 : o.decimals_base_unit) ?? i,
      prefixedDecimals: ((n = this._config) == null ? void 0 : n.decimals_prefixed_unit) ?? i
    });
  }
  formatHoverTimestamp(t) {
    const e = new Date(t), i = "de-AT", r = new Intl.DateTimeFormat(i, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    }).format(e);
    if (this.trendWindowMs(this._config) <= 1440 * 60 * 1e3)
      return r;
    const o = new Intl.DateTimeFormat(i, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(e);
    return `${r} ${o}`;
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
    return hs(t);
  }
  normalizeTimeframeHours(t) {
    return kr(t, hn);
  }
  trendWindowMs(t) {
    return this.normalizeTimeframeHours(t == null ? void 0 : t.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(t) {
    return Er(t);
  }
  normalizeTrendColor(t, e, i) {
    const r = t ?? e;
    return Array.isArray(r) || typeof r == "string" && r.trim().length > 0 ? r : _n[i];
  }
  iconStyle(t) {
    return xe(t);
  }
  resolveColor(t, e = "") {
    return ve(t, e);
  }
  trendPoints(t, e) {
    const i = Date.now(), r = i - this.trendWindowMs(this._config), o = this._trendSeries[t] ?? [];
    let n = 0;
    for (; n < o.length && o[n].ts < r; )
      n += 1;
    const s = n > 0 ? o.slice(n) : [...o];
    return e !== null && Number.isFinite(e) && s.push({ ts: i, value: e }), s;
  }
  toTrendCoordinates(t, e, i) {
    var b, x;
    const o = Date.now() - e, n = 0, s = 100, a = t.map((k) => k.value), c = (i == null ? void 0 : i.min) ?? Math.min(...a), d = (i == null ? void 0 : i.max) ?? Math.max(...a);
    if (!Number.isFinite(c) || !Number.isFinite(d))
      return [];
    const u = 20, h = 80, _ = Math.max(d - c, qt), p = t.map((k) => {
      const w = Math.max(0, Math.min(100, (k.ts - o) / e * 100)), S = n + w / 100 * (s - n), $ = _ <= qt ? 0.5 : (k.value - c) / _, T = h - $ * (h - u);
      return { x: S, y: T, value: k.value, ts: k.ts };
    }), m = ((b = p[0]) == null ? void 0 : b.x) ?? n, f = ((x = p[p.length - 1]) == null ? void 0 : x.x) ?? s, g = Math.max(0, f - m), v = 18;
    if (p.length >= 2 && g < v) {
      const k = s - v, w = Math.max(n, Math.min(k, f - v));
      if (g <= qt) {
        const $ = v / (p.length - 1);
        return p.map((T, A) => ({
          ...T,
          x: Math.max(n, Math.min(s, w + $ * A))
        }));
      }
      const S = v / g;
      return p.map(($) => ({
        ...$,
        x: Math.max(n, Math.min(s, w + ($.x - m) * S))
      }));
    }
    return p;
  }
  toCanvasPoints(t, e, i) {
    return xr(t, e, i).map((r) => ({
      x: r.x,
      y: r.y,
      value: r.value,
      ts: r.ts
    }));
  }
  computeTrendValueRange(t, e) {
    const i = [];
    if (Object.entries(t).forEach(([n, s]) => {
      const a = Number(n), c = (e == null ? void 0 : e[a]) ?? 1;
      s.forEach((d) => i.push(d.value * c));
    }), i.length === 0)
      return null;
    const r = Math.min(...i), o = Math.max(...i);
    return !Number.isFinite(r) || !Number.isFinite(o) ? null : { min: r, max: o };
  }
  resolveSharedScaleFactors(t) {
    let e = null;
    const i = {};
    Object.keys(t).map((n) => Number(n)).filter((n) => Number.isFinite(n) && n >= 1 && n <= $t).forEach((n) => {
      const s = n, a = this._drawConfigs.find((d) => d.slot === s);
      if (!a)
        return;
      const c = te(a.unit);
      if (!c) {
        e = null, i[s] = NaN;
        return;
      }
      if (e === null)
        e = c.family;
      else if (e !== c.family) {
        e = null, i[s] = NaN;
        return;
      }
      i[s] = c.factor;
    });
    const r = Object.keys(t);
    if (r.length === 0)
      return null;
    const o = Object.values(i).some((n) => !Number.isFinite(n ?? NaN));
    return e === null || o || Object.keys(i).length !== r.length ? null : i;
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
    var f, g;
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
    const r = this.prepareTrendCanvas(e), o = this.prepareTrendCanvas(i);
    if (!r || !o) {
      this._linePointsBySlot = {}, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const n = ((f = this._config) == null ? void 0 : f.fill_area_enabled) !== !1, s = this.trendWindowMs(this._config), a = {};
    this._drawConfigs.forEach((v) => {
      const b = this.trendPoints(v.slot, v.currentValue);
      b.length >= 2 && (a[v.slot] = b);
    });
    const c = ((g = this._config) == null ? void 0 : g.shared_trend_scale) === !0, d = c ? this.resolveSharedScaleFactors(a) : null;
    this._sharedScaleCanonical = d !== null, this._sharedScaleFactors = d ?? {};
    const u = c ? this.computeTrendValueRange(a, d ?? void 0) : null, h = {};
    let _ = 0, p = 0;
    [...this._drawConfigs].sort((v, b) => b.slot - v.slot).forEach((v) => {
      const b = a[v.slot];
      if (!b || b.length < 2)
        return;
      const x = (d == null ? void 0 : d[v.slot]) ?? 1, k = d ? this.scaleTrendSeries(b, x) : b, w = this.toTrendCoordinates(k, s, u);
      if (w.length < 2)
        return;
      const S = this.toCanvasPoints(w, r.width, r.height), $ = this.toCanvasPoints(w, o.width, o.height);
      n && this.drawTrendArea(r.ctx, S, v.color, r.height), this.drawTrendLine(o.ctx, $, v.color, v.lineWidth), h[v.slot] = $, _ += 1, p += $.length;
    }), this._linePointsBySlot = h, this._hoverState && !h[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - t),
      series: _,
      points: p,
      fill_area: n,
      shared_scale: c,
      shared_scale_units: this._sharedScaleCanonical ? "canonical" : "raw"
    });
  }
  prepareTrendCanvas(t) {
    return yt(t);
  }
  drawTrendArea(t, e, i, r) {
    if (e.length < 2)
      return;
    const o = this.resolveCanvasColor(i), n = e[0], s = e[e.length - 1], a = Math.min(...e.map((d) => d.y)), c = t.createLinearGradient(0, a, 0, r);
    c.addColorStop(0, this.withAlpha(o, 0.24)), c.addColorStop(1, this.withAlpha(o, 0)), t.beginPath(), t.moveTo(n.x, n.y), e.slice(1).forEach((d) => t.lineTo(d.x, d.y)), t.lineTo(s.x, r), t.lineTo(n.x, r), t.closePath(), t.fillStyle = c, t.fill();
  }
  drawTrendLine(t, e, i, r) {
    if (e.length < 2)
      return;
    const o = this.resolveCanvasColor(i);
    this.strokeTrendPolyline(t, e, o, r);
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
    let i = null, r = Number.POSITIVE_INFINITY;
    for (const o of this._drawConfigs) {
      const n = this._linePointsBySlot[o.slot];
      if (!n || n.length < 2)
        continue;
      const s = this.interpolateCanvasPoint(n, t);
      if (!s)
        continue;
      const a = Math.abs(s.y - e);
      a < r && (r = a, i = {
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
    const i = t[0], r = t[t.length - 1];
    if (e <= i.x)
      return { x: e, y: i.y, value: i.value, ts: i.ts };
    if (e >= r.x)
      return { x: e, y: r.y, value: r.value, ts: r.ts };
    for (let o = 1; o < t.length; o += 1) {
      const n = t[o - 1], s = t[o];
      if (e > s.x)
        continue;
      const a = s.x - n.x;
      if (Math.abs(a) <= qt)
        return { x: e, y: s.y, value: s.value, ts: s.ts };
      const c = (e - n.x) / a;
      return {
        x: e,
        y: n.y + (s.y - n.y) * c,
        value: n.value + (s.value - n.value) * c,
        ts: n.ts + (s.ts - n.ts) * c
      };
    }
    return { x: e, y: r.y, value: r.value, ts: r.ts };
  }
  strokeTrendPolyline(t, e, i, r) {
    e.length < 2 || (t.beginPath(), t.moveTo(e[0].x, e[0].y), e.slice(1).forEach((o) => t.lineTo(o.x, o.y)), t.strokeStyle = i, t.lineWidth = r, t.lineCap = "round", t.lineJoin = "round", t.stroke());
  }
  resolveCanvasColor(t) {
    return Ie(this.renderRoot, t);
  }
  withAlpha(t, e) {
    return gt(t, e, this._canvasColorContextCache);
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
    var r, o;
    const t = this.renderRoot.querySelector("ha-card");
    if (!t || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const e = !!((r = this._config.hold_action) != null && r.action && this._config.hold_action.action !== "none"), i = !!((o = this._config.double_tap_action) != null && o.action && this._config.double_tap_action.action !== "none");
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
    const e = t.get("_config"), i = t.has("_config") && this.shouldRefreshTrendOnConfigChange(e, this._config), r = t.get("hass"), o = t.has("hass") && this.didTrackedEntityStateChange(r);
    (t.has("preview") || t.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (t.has("_config") ? (i && this.scheduleConfigRefresh(), this.clearHoverState()) : t.has("hass") && this._isVisible && o && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (t.has("_config") ? (i && this.scheduleConfigRefresh(!0), this.clearHoverState()) : t.has("hass") && o && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((s = this._config) == null ? void 0 : s.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset();
    const n = t.has("_config") || t.has("_trendSeries") || t.has("_graphTopInset") || t.has("preview") || t.has("editMode") || o;
    (!this.shouldRunLiveRuntime() || this._isVisible) && n && this.scheduleTrendCanvasDraw();
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
    const r = e.getBoundingClientRect(), o = i.getBoundingClientRect(), n = Math.max(0, Math.ceil(o.bottom - r.top));
    Math.abs(n - this._graphTopInset) > 0.5 && (this._graphTopInset = n);
  }
  maybeRefreshTrendHistory(t = !1, e = !1) {
    if (!this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview())
      return;
    t && (this._lastTrendRefresh = 0);
    const i = Date.now();
    !t && i - this._lastTrendRefresh < un || (this._lastTrendRefresh = i, this.refreshTrendHistory(t, e));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(Mc) || this.hasEditorLikeAncestor();
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
          const r = i.toLowerCase();
          if (r.includes("preview") || r.includes("editor") || r.includes("card-picker"))
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
    }, zc));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(t = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(t), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, un), this.updateComplete.then(() => {
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
    const i = this._config, r = {}, o = this.trendWindowMs(i), n = ie(i.trend_data_source, "hybrid"), s = this.enabledSlots(i);
    if (s.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const c = this.perfNow(), d = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
      let _ = Number.POSITIVE_INFINITY;
      const p = Date.now() - o;
      for (const x of s) {
        const k = this.slotEntityId(x, i);
        if (!k)
          continue;
        d.set(x, k);
        const w = this._trendSeries[x] ?? [];
        if (t || w.length === 0 || u.has(k)) {
          u.add(k), h.delete(k);
          continue;
        }
        if (u.has(k))
          continue;
        h.add(k);
        const S = ((a = w[w.length - 1]) == null ? void 0 : a.ts) ?? p, $ = Math.max(p, S - Cc);
        _ = Math.min(_, $);
      }
      let m = 0;
      const f = u.size > 0 ? await (async () => {
        const x = this.perfNow(), k = await Ue(
          this.hass,
          Array.from(u),
          o,
          { dataSource: n }
        );
        return m = this.perfNow() - x, k;
      })() : {};
      let g = 0;
      const v = h.size > 0 ? await (async () => {
        const x = this.perfNow(), k = await Ue(
          this.hass,
          Array.from(h),
          o,
          {
            startMs: Number.isFinite(_) ? _ : p,
            dataSource: n
          }
        );
        return g = this.perfNow() - x, k;
      })() : {};
      d.forEach((x, k) => {
        const w = this._trendSeries[k] ?? [];
        if (u.has(x)) {
          const S = f[x] ?? [];
          r[k] = S.length > 0 ? S : w.filter(($) => $.ts >= p);
          return;
        }
        if (h.has(x)) {
          const S = v[x] ?? [];
          r[k] = ai(w, S, p);
          return;
        }
        r[k] = w.filter((S) => S.ts >= p);
      });
      const b = this.sameTrendSeriesKeys(r, this._trendSeries) && Object.keys(r).map((x) => Number(x)).filter((x) => Number.isFinite(x) && x >= 1 && x <= $t).every((x) => {
        const k = x;
        return this.areTrendSeriesEqual(r[k] ?? [], this._trendSeries[k] ?? []);
      });
      b || (this._trendSeries = r), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - c),
        window_ms: o,
        force_full: t,
        slots: s.length,
        full_entities: u.size,
        incremental_entities: h.size,
        data_source: n,
        full_fetch_ms: this.toPerfMs(m),
        incremental_fetch_ms: this.toPerfMs(g),
        series_changed: !b
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(t) {
    const e = [];
    for (let i = 1; i <= $t; i += 1) {
      const r = i;
      this.slotEnabled(r, t) && this.slotEntityId(r, t) && e.push(r);
    }
    return e;
  }
  trackedEntityIds(t) {
    const e = /* @__PURE__ */ new Set();
    return this.enabledSlots(t).forEach((i) => {
      const r = this.slotEntityId(i, t);
      r && e.add(r);
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
      const r = i, o = this.slotEnabled(r, t), n = this.slotEnabled(r, e), s = o ? this.slotEntityId(r, t) : void 0, a = n ? this.slotEntityId(r, e) : void 0;
      if (o !== n || s !== a)
        return !0;
    }
    return !1;
  }
  sameTrendSeriesKeys(t, e) {
    const i = Object.keys(t).sort(), r = Object.keys(e).sort();
    return i.length === r.length && i.every((o, n) => o === r[n]);
  }
  areTrendSeriesEqual(t, e) {
    if (t.length !== e.length)
      return !1;
    for (let i = 0; i < t.length; i += 1) {
      const r = t[i], o = e[i];
      if (r.ts !== o.ts || Math.abs(r.value - o.value) > 1e-4)
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
var Ac = Object.defineProperty, Pc = Object.getOwnPropertyDescriptor, zr = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Pc(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && Ac(e, i, o), o;
};
let hi = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => vs(t, {}, z(this.hass)), this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM")
        return;
      const i = t.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i))
        return;
      const r = {
        ...i,
        type: "custom:power-pilz-graph-stack-card"
      };
      this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: r },
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
      legend_layout: ys(t.legend_layout),
      timeframe_hours: gs(t.timeframe_hours),
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
      line_thickness: fs(t.line_thickness),
      clip_graph_to_labels: t.clip_graph_to_labels ?? !1,
      ...bs(t)
    };
    this._config = e;
  }
  render() {
    if (!this.hass || !this._config)
      return E;
    const t = this._config.normalize_stack_to_percent ?? !1, e = ms(!0, t, z(this.hass));
    return y`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ze}
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
zr([
  I({ attribute: !1 })
], hi.prototype, "hass", 2);
zr([
  C()
], hi.prototype, "_config", 2);
hi = zr([
  ce("power-pilz-graph-stack-card-editor")
], hi);
var Ic = Object.defineProperty, Dc = Object.getOwnPropertyDescriptor, Ge = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Dc(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && Ic(e, i, o), o;
};
const kt = 1, pn = 24, mn = 300 * 1e3, Oc = 60 * 1e3, Rc = 350, qe = 0.01, ut = 4, Nc = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", Lc = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), yn = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let ke = class extends L {
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
      const r = t.clientX - i.left, o = t.clientY - i.top;
      if (r < 0 || r > i.width || o < 0 || o > i.height) {
        this.clearHoverState();
        return;
      }
      const n = this.findNearestHoverPoint(r, o);
      if (!n) {
        this.clearHoverState();
        return;
      }
      const s = this._hoverState;
      s && s.slot === n.slot && Math.abs(s.x - n.x) <= 0.2 && Math.abs(s.y - n.y) <= 0.2 && Math.abs(s.value - n.value) <= 1e-4 && s.color === n.color || (this._hoverState = n);
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
    const e = (t == null ? void 0 : t.states) ?? {}, i = Object.keys(e), r = (...d) => d.find((u) => u in e), o = (d) => i.find((u) => u.startsWith(`${d}.`)), n = r("sensor.dev_home_power", "sensor.home_power") ?? o("sensor") ?? "sensor.dev_home_power", s = r("sensor.dev_solar_power", "sensor.solar_power"), a = r("sensor.dev_grid_power", "sensor.grid_power"), c = r("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: "row",
      timeframe_hours: pn,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      normalize_stack_to_percent: !1,
      auto_scale_units: !1,
      entity_1: n,
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
      entity_4: c,
      entity_4_enabled: !1,
      entity_4_show_icon: !0,
      entity_4_icon: "mdi:chart-timeline-variant",
      entity_4_trend_color: "green",
      decimals: kt,
      decimals_base_unit: kt,
      decimals_prefixed_unit: kt
    };
  }
  setConfig(t) {
    const e = typeof t.decimals == "number" && Number.isFinite(t.decimals) ? Math.min(3, Math.max(0, Math.round(t.decimals))) : kt, i = Se(t.decimals_base_unit, e), r = Se(t.decimals_prefixed_unit, e), o = this.readConfigString(t.entity), n = this.readConfigString(t.icon), s = this.readConfigString(t.entity_1) ?? o ?? "sensor.dev_home_power";
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
      decimals_prefixed_unit: r,
      entity_1: s,
      entity_1_name: this.readConfigString(t.entity_1_name),
      entity_1_enabled: t.entity_1_enabled ?? !0,
      entity_1_show_icon: t.entity_1_show_icon ?? !0,
      entity_1_icon: t.entity_1_icon ?? n ?? "mdi:chart-line",
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
      return y`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return y``;
    const t = this._config, e = t.decimals ?? kt, i = this.normalizeLineThickness(t.line_thickness), r = t.normalize_stack_to_percent === !0, o = this.collectSeriesEntries(t, e), n = this.withStackedCurrentValues(o, r, t), s = this.normalizeLegendLayout(t.legend_layout), a = t.hover_enabled !== !1, c = this.hasConfiguredAction(t), d = !this.isEditorPreview() && c, u = this._hoverState, h = t.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, _ = h > 0 ? { top: `${h}px` } : {}, p = u ? {
      left: `${u.x}px`,
      top: `${u.y + h}px`,
      "--hover-dot-color": u.color
    } : {};
    return this._drawConfigs = o.map((m) => ({
      slot: m.slot,
      currentValue: m.currentValue,
      unit: m.unit,
      color: m.trendColor,
      lineWidth: i
    })), y`
      <ha-card
        class=${d ? "interactive" : ""}
        tabindex=${d ? 0 : -1}
        role=${d ? "button" : "article"}
        @keydown=${this.handleCardKeyDown}
      >
        <div
          class="container"
          @pointermove=${this.handlePointerMove}
          @pointerleave=${this.handlePointerLeave}
          @pointercancel=${this.handlePointerLeave}
        >
          <div class="card-trend" style=${M(_)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${M(_)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${a && u ? y`<div class="hover-dot" aria-hidden="true" style=${M(p)}></div>` : E}

          <div class="content">
            <div class="series-list layout-${s}">
              ${o.length === 0 ? y`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph Stack card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : n.map(
      (m) => this.renderSeriesItem(
        m,
        u && u.slot === m.slot ? u : null
      )
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderSeriesItem(t, e) {
    const i = e === null ? null : this.convertStackedHoverValue(t.slot, e.value), r = e === null ? null : this.formatHoverTimestamp(e.ts), o = i === null ? t.secondary : `${this.formatValue(i, t.unit, t.decimals)} - ${r ?? ""}`;
    return y`
      <div class="state-item" data-slot=${String(t.slot)}>
        ${t.showIcon ? y`
              <div class="icon-wrap">
                <div class="icon-shape" style=${M(t.iconStyle)}>
                  <ha-icon .icon=${t.icon}></ha-icon>
                </div>
              </div>
            ` : E}
        <div class="info">
          <div class="primary">${t.name}</div>
          <div class="secondary">${o}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(t, e) {
    const i = [];
    for (let r = 1; r <= ut; r += 1) {
      const o = r, n = this.slotEnabled(o, t), s = this.slotEntityId(o, t);
      if (!n || !s)
        continue;
      const a = this.entityName(this.slotCustomName(o, t), s, r), c = F(this.hass, s), d = t.unit ?? U(this.hass, s) ?? "", u = this.formatValue(c, d, e), h = this.slotIcon(o, t), _ = this.iconStyle(this.slotIconColor(o, t)), p = this.resolveColor(yn[o], Nc), m = this.resolveColor(this.slotTrendColor(o, t), p);
      i.push({
        slot: o,
        entityId: s,
        name: a,
        secondary: u,
        unit: d,
        decimals: e,
        currentValue: c,
        icon: h,
        showIcon: this.slotShowIcon(o, t),
        iconStyle: _,
        trendColor: m
      });
    }
    return i;
  }
  resolvePercentReference(t, e) {
    const i = e.percent_reference_slot, r = typeof i == "number" ? i : typeof i == "string" && i.length > 0 ? Number(i) : NaN, o = Number.isFinite(r) && r >= 1 && r <= ut ? r : void 0;
    return { refSlot: o !== void 0 && t.some((s) => s.slot === o) ? o : void 0, auto: e.percent_reference_auto === !0 };
  }
  withStackedCurrentValues(t, e, i) {
    var p;
    const r = this.resolveStackUnitFactors(t), { refSlot: o, auto: n } = e ? this.resolvePercentReference(t, i) : { refSlot: void 0, auto: !1 }, s = (m) => m.currentValue === null || !Number.isFinite(m.currentValue) ? 0 : r ? m.currentValue * (r[m.slot] ?? 1) : m.currentValue;
    let a, c;
    if (e && o !== void 0 && !n) {
      const m = t.find((f) => f.slot === o);
      a = m ? s(m) : 0, c = o;
    } else e && n ? (a = t.reduce((m, f) => f.slot !== o ? m + s(f) : m, 0), c = o) : (a = t.reduce((m, f) => m + s(f), 0), c = (p = t[t.length - 1]) == null ? void 0 : p.slot);
    const d = Number.isFinite(a) && Math.abs(a) > qe;
    let u = 0, h = 0, _ = !1;
    return t.map((m) => {
      const f = o !== void 0 && m.slot === o && !n;
      m.currentValue !== null && Number.isFinite(m.currentValue) && (f || (u += m.currentValue, r && (h += m.currentValue * (r[m.slot] ?? 1))), _ = !0);
      let g;
      if (!_)
        g = null;
      else if (e)
        if (!d)
          g = 0;
        else if (f)
          g = 100;
        else if (o !== void 0 || n) {
          const b = s(m);
          g = Math.max(0, Math.min(100, b / a * 100));
        } else {
          const b = r ? h : u;
          g = m.slot === c ? 100 : Math.max(0, Math.min(100, b / a * 100));
        }
      else
        g = r ? h / (r[m.slot] ?? 1) : u;
      const v = e ? "%" : m.unit;
      return {
        ...m,
        unit: v,
        secondary: this.formatValue(g, v, m.decimals)
      };
    });
  }
  slotEntityId(t, e) {
    return os(t, e);
  }
  slotCustomName(t, e) {
    return ns(t, e);
  }
  slotEnabled(t, e) {
    return ss(t, e);
  }
  slotShowIcon(t, e) {
    return as(t, e);
  }
  slotIcon(t, e) {
    return ls(t, e);
  }
  slotIconColor(t, e) {
    return cs(t, e);
  }
  slotTrendColor(t, e) {
    return ds(t, e);
  }
  entityName(t, e, i) {
    return us(this.hass.states, t, e, i);
  }
  formatValue(t, e, i) {
    var r, o, n;
    return _s(t, e, i, {
      enabled: ((r = this._config) == null ? void 0 : r.auto_scale_units) === !0,
      baseDecimals: ((o = this._config) == null ? void 0 : o.decimals_base_unit) ?? i,
      prefixedDecimals: ((n = this._config) == null ? void 0 : n.decimals_prefixed_unit) ?? i
    });
  }
  formatHoverTimestamp(t) {
    const e = new Date(t), i = "de-AT", r = new Intl.DateTimeFormat(i, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    }).format(e);
    if (this.trendWindowMs(this._config) <= 1440 * 60 * 1e3)
      return r;
    const o = new Intl.DateTimeFormat(i, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(e);
    return `${r} ${o}`;
  }
  resolveStackUnitFactors(t) {
    if (t.length === 0)
      return null;
    let e = null;
    const i = {};
    for (const r of t) {
      const o = te(r.unit);
      if (!o)
        return null;
      if (e === null)
        e = o.family;
      else if (e !== o.family)
        return null;
      i[r.slot] = o.factor;
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
    return hs(t);
  }
  normalizeTimeframeHours(t) {
    return kr(t, pn);
  }
  trendWindowMs(t) {
    return this.normalizeTimeframeHours(t == null ? void 0 : t.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(t) {
    return Er(t);
  }
  normalizeTrendColor(t, e, i) {
    const r = t ?? e;
    return Array.isArray(r) || typeof r == "string" && r.trim().length > 0 ? r : yn[i];
  }
  iconStyle(t) {
    return xe(t);
  }
  resolveColor(t, e = "") {
    return ve(t, e);
  }
  trendPoints(t, e) {
    const i = Date.now(), r = i - this.trendWindowMs(this._config), o = this._trendSeries[t] ?? [];
    let n = 0;
    for (; n < o.length && o[n].ts < r; )
      n += 1;
    const s = n > 0 ? o.slice(n) : [...o];
    return e !== null && Number.isFinite(e) && s.push({ ts: i, value: e }), s;
  }
  toTrendCoordinates(t, e, i) {
    var b, x;
    const o = Date.now() - e, n = 0, s = 100, a = t.map((k) => k.value), c = (i == null ? void 0 : i.min) ?? Math.min(...a), d = (i == null ? void 0 : i.max) ?? Math.max(...a);
    if (!Number.isFinite(c) || !Number.isFinite(d))
      return [];
    const u = 20, h = 80, _ = Math.max(d - c, qe), p = t.map((k) => {
      const w = Math.max(0, Math.min(100, (k.ts - o) / e * 100)), S = n + w / 100 * (s - n), $ = _ <= qe ? 0.5 : (k.value - c) / _, T = h - $ * (h - u);
      return { x: S, y: T, value: k.value, ts: k.ts };
    }), m = ((b = p[0]) == null ? void 0 : b.x) ?? n, f = ((x = p[p.length - 1]) == null ? void 0 : x.x) ?? s, g = Math.max(0, f - m), v = 18;
    if (p.length >= 2 && g < v) {
      const k = s - v, w = Math.max(n, Math.min(k, f - v));
      if (g <= qe) {
        const $ = v / (p.length - 1);
        return p.map((T, A) => ({
          ...T,
          x: Math.max(n, Math.min(s, w + $ * A))
        }));
      }
      const S = v / g;
      return p.map(($) => ({
        ...$,
        x: Math.max(n, Math.min(s, w + ($.x - m) * S))
      }));
    }
    return p;
  }
  toCanvasPoints(t, e, i) {
    return xr(t, e, i).map((r) => ({
      x: r.x,
      y: r.y,
      value: r.value,
      ts: r.ts
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
    var b, x, k;
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
    const r = this.prepareTrendCanvas(e), o = this.prepareTrendCanvas(i);
    if (!r || !o) {
      this._linePointsBySlot = {}, this._stackCanonicalMode = !1, this._stackCanonicalFactors = {}, this._stackNormalizeToPercent = !1, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const n = ((b = this._config) == null ? void 0 : b.fill_area_enabled) !== !1, s = ((x = this._config) == null ? void 0 : x.normalize_stack_to_percent) === !0, a = ((k = this._config) == null ? void 0 : k.shared_trend_scale) === !0, c = this.resolveStackUnitFactors(this._drawConfigs);
    this._stackCanonicalMode = c !== null, this._stackCanonicalFactors = c ?? {}, this._stackNormalizeToPercent = s;
    const d = this.trendWindowMs(this._config), u = {}, h = s ? this.resolvePercentReference(
      this._drawConfigs,
      this._config
    ) : { refSlot: void 0, auto: !1 }, _ = this.buildStackedTrendSeries(d, c ?? void 0, h.refSlot, h.auto), p = s ? this.normalizeStackedSeriesToPercent(_, h.refSlot, h.auto) : _, m = s ? { min: 0, max: 100 } : a ? this.computeStackedValueRange(p) : null;
    let f = 0, g = 0;
    [...this._drawConfigs].sort((w, S) => S.slot - w.slot).forEach((w) => {
      const S = p[w.slot] ?? [];
      if (S.length < 2)
        return;
      const $ = this.toTrendCoordinates(S, d, m);
      if ($.length < 2)
        return;
      const T = this.toCanvasPoints($, r.width, r.height), A = this.toCanvasPoints($, o.width, o.height);
      n && this.drawTrendArea(r.ctx, T, w.color, r.height), this.drawTrendLine(o.ctx, A, w.color, w.lineWidth), u[w.slot] = A, f += 1, g += A.length;
    }), this._linePointsBySlot = u, this._hoverState && !u[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - t),
      series: f,
      points: g,
      fill_area: n,
      shared_scale: a,
      normalize_percent: s,
      stack_units: this._stackCanonicalMode ? "canonical" : "raw"
    });
  }
  buildStackedTrendSeries(t, e, i, r) {
    const o = {}, n = [...this._drawConfigs].sort((c, d) => c.slot - d.slot), s = i !== void 0 && !r;
    let a = null;
    return n.forEach((c) => {
      const d = this.trendPoints(c.slot, c.currentValue);
      if (d.length === 0)
        return;
      const u = this.normalizeTrendSeries(d, t);
      if (u.length === 0)
        return;
      const h = (e == null ? void 0 : e[c.slot]) ?? 1, _ = h === 1 ? u : u.map((m) => ({
        ts: m.ts,
        value: m.value * h
      }));
      if (s && c.slot === i) {
        o[c.slot] = _;
        return;
      }
      const p = a ? this.sumTrendSeries(a, _) : _;
      o[c.slot] = p, a = p;
    }), o;
  }
  normalizeTrendSeries(t, e) {
    const i = Date.now() - e, r = [...t].filter((n) => Number.isFinite(n.ts) && Number.isFinite(n.value) && n.ts >= i).sort((n, s) => n.ts - s.ts);
    if (r.length === 0)
      return [];
    const o = [];
    return r.forEach((n) => {
      const s = o[o.length - 1];
      s && Math.abs(s.ts - n.ts) <= 0.5 ? o[o.length - 1] = n : o.push(n);
    }), o;
  }
  sumTrendSeries(t, e) {
    return t.length === 0 ? [...e] : e.length === 0 ? [...t] : this.mergeTimestamps(t, e).map((r) => ({
      ts: r,
      value: this.interpolateTrendValue(t, r) + this.interpolateTrendValue(e, r)
    }));
  }
  mergeTimestamps(t, e) {
    const i = [];
    let r = 0, o = 0;
    const n = (s) => {
      const a = i[i.length - 1];
      (a === void 0 || Math.abs(a - s) > 0.5) && i.push(s);
    };
    for (; r < t.length || o < e.length; ) {
      const s = r < t.length ? t[r].ts : Number.POSITIVE_INFINITY, a = o < e.length ? e[o].ts : Number.POSITIVE_INFINITY;
      s <= a ? (n(s), r += 1, Math.abs(s - a) <= 0.5 && (o += 1)) : (n(a), o += 1);
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
    let r = 0, o = t.length - 1;
    for (; r <= o; ) {
      const u = Math.floor((r + o) / 2), h = t[u];
      if (Math.abs(h.ts - e) <= 0.5)
        return h.value;
      h.ts < e ? r = u + 1 : o = u - 1;
    }
    const n = Math.max(1, Math.min(t.length - 1, r)), s = t[n - 1], a = t[n], c = a.ts - s.ts;
    if (Math.abs(c) <= qe)
      return a.value;
    const d = (e - s.ts) / c;
    return s.value + (a.value - s.value) * d;
  }
  computeStackedValueRange(t) {
    const e = [];
    if (Object.values(t).forEach((o) => {
      o.forEach((n) => e.push(n.value));
    }), e.length === 0)
      return null;
    const i = Math.min(...e), r = Math.max(...e);
    return !Number.isFinite(i) || !Number.isFinite(r) ? null : { min: i, max: r };
  }
  normalizeStackedSeriesToPercent(t, e, i) {
    const r = {}, o = Object.keys(t).map((a) => Number(a)).filter((a) => Number.isFinite(a) && a >= 1 && a <= ut).sort((a, c) => a - c);
    if (o.length === 0)
      return r;
    let n, s;
    if (e !== void 0 && !i)
      n = t[e] ?? [], s = e;
    else if (i) {
      const a = e !== void 0 ? o.filter((c) => c !== e) : o;
      s = a[a.length - 1] ?? o[o.length - 1], n = t[s] ?? [];
    } else
      s = o[o.length - 1], n = t[s] ?? [];
    return n.length < 1 || o.forEach((a) => {
      const c = t[a] ?? [];
      c.length !== 0 && (r[a] = c.map((d) => {
        const u = this.interpolateTrendValue(n, d.ts);
        if (!Number.isFinite(u) || Math.abs(u) <= qe)
          return { ts: d.ts, value: 0 };
        if (a === s)
          return { ts: d.ts, value: 100 };
        if (e !== void 0 && a === e && !i)
          return { ts: d.ts, value: 100 };
        const h = d.value / u * 100;
        return {
          ts: d.ts,
          value: Math.max(0, h)
        };
      }));
    }), r;
  }
  prepareTrendCanvas(t) {
    return yt(t);
  }
  drawTrendArea(t, e, i, r) {
    if (e.length < 2)
      return;
    const o = this.resolveCanvasColor(i), n = e[0], s = e[e.length - 1], a = Math.min(...e.map((d) => d.y)), c = t.createLinearGradient(0, a, 0, r);
    c.addColorStop(0, this.withAlpha(o, 0.24)), c.addColorStop(1, this.withAlpha(o, 0)), t.beginPath(), t.moveTo(n.x, n.y), e.slice(1).forEach((d) => t.lineTo(d.x, d.y)), t.lineTo(s.x, r), t.lineTo(n.x, r), t.closePath(), t.fillStyle = c, t.fill();
  }
  drawTrendLine(t, e, i, r) {
    if (e.length < 2)
      return;
    const o = this.resolveCanvasColor(i);
    this.strokeTrendPolyline(t, e, o, r);
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
    let i = null, r = Number.POSITIVE_INFINITY;
    for (const o of this._drawConfigs) {
      const n = this._linePointsBySlot[o.slot];
      if (!n || n.length < 2)
        continue;
      const s = this.interpolateCanvasPoint(n, t);
      if (!s)
        continue;
      const a = Math.abs(s.y - e);
      a < r && (r = a, i = {
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
    const i = t[0], r = t[t.length - 1];
    if (e <= i.x)
      return { x: e, y: i.y, value: i.value, ts: i.ts };
    if (e >= r.x)
      return { x: e, y: r.y, value: r.value, ts: r.ts };
    for (let o = 1; o < t.length; o += 1) {
      const n = t[o - 1], s = t[o];
      if (e > s.x)
        continue;
      const a = s.x - n.x;
      if (Math.abs(a) <= qe)
        return { x: e, y: s.y, value: s.value, ts: s.ts };
      const c = (e - n.x) / a;
      return {
        x: e,
        y: n.y + (s.y - n.y) * c,
        value: n.value + (s.value - n.value) * c,
        ts: n.ts + (s.ts - n.ts) * c
      };
    }
    return { x: e, y: r.y, value: r.value, ts: r.ts };
  }
  strokeTrendPolyline(t, e, i, r) {
    e.length < 2 || (t.beginPath(), t.moveTo(e[0].x, e[0].y), e.slice(1).forEach((o) => t.lineTo(o.x, o.y)), t.strokeStyle = i, t.lineWidth = r, t.lineCap = "round", t.lineJoin = "round", t.stroke());
  }
  resolveCanvasColor(t) {
    return Ie(this.renderRoot, t);
  }
  withAlpha(t, e) {
    return gt(t, e, this._canvasColorContextCache);
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
    var r, o;
    const t = this.renderRoot.querySelector("ha-card");
    if (!t || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const e = !!((r = this._config.hold_action) != null && r.action && this._config.hold_action.action !== "none"), i = !!((o = this._config.double_tap_action) != null && o.action && this._config.double_tap_action.action !== "none");
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
    const e = t.get("_config"), i = t.has("_config") && this.shouldRefreshTrendOnConfigChange(e, this._config), r = t.get("hass"), o = t.has("hass") && this.didTrackedEntityStateChange(r);
    (t.has("preview") || t.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (t.has("_config") ? (i && this.scheduleConfigRefresh(), this.clearHoverState()) : t.has("hass") && this._isVisible && o && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (t.has("_config") ? (i && this.scheduleConfigRefresh(!0), this.clearHoverState()) : t.has("hass") && o && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((s = this._config) == null ? void 0 : s.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset();
    const n = t.has("_config") || t.has("_trendSeries") || t.has("_graphTopInset") || t.has("preview") || t.has("editMode") || o;
    (!this.shouldRunLiveRuntime() || this._isVisible) && n && this.scheduleTrendCanvasDraw();
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
    const r = e.getBoundingClientRect(), o = i.getBoundingClientRect(), n = Math.max(0, Math.ceil(o.bottom - r.top));
    Math.abs(n - this._graphTopInset) > 0.5 && (this._graphTopInset = n);
  }
  maybeRefreshTrendHistory(t = !1, e = !1) {
    if (!this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview())
      return;
    t && (this._lastTrendRefresh = 0);
    const i = Date.now();
    !t && i - this._lastTrendRefresh < mn || (this._lastTrendRefresh = i, this.refreshTrendHistory(t, e));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(Lc) || this.hasEditorLikeAncestor();
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
          const r = i.toLowerCase();
          if (r.includes("preview") || r.includes("editor") || r.includes("card-picker"))
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
    }, Rc));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(t = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(t), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, mn), this.updateComplete.then(() => {
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
    const i = this._config, r = {}, o = this.trendWindowMs(i), n = ie(i.trend_data_source, "hybrid"), s = this.enabledSlots(i);
    if (s.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const c = this.perfNow(), d = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
      let _ = Number.POSITIVE_INFINITY;
      const p = Date.now() - o;
      for (const x of s) {
        const k = this.slotEntityId(x, i);
        if (!k)
          continue;
        d.set(x, k);
        const w = this._trendSeries[x] ?? [];
        if (t || w.length === 0 || u.has(k)) {
          u.add(k), h.delete(k);
          continue;
        }
        if (u.has(k))
          continue;
        h.add(k);
        const S = ((a = w[w.length - 1]) == null ? void 0 : a.ts) ?? p, $ = Math.max(p, S - Oc);
        _ = Math.min(_, $);
      }
      let m = 0;
      const f = u.size > 0 ? await (async () => {
        const x = this.perfNow(), k = await Ue(
          this.hass,
          Array.from(u),
          o,
          { dataSource: n }
        );
        return m = this.perfNow() - x, k;
      })() : {};
      let g = 0;
      const v = h.size > 0 ? await (async () => {
        const x = this.perfNow(), k = await Ue(
          this.hass,
          Array.from(h),
          o,
          {
            startMs: Number.isFinite(_) ? _ : p,
            dataSource: n
          }
        );
        return g = this.perfNow() - x, k;
      })() : {};
      d.forEach((x, k) => {
        const w = this._trendSeries[k] ?? [];
        if (u.has(x)) {
          const S = f[x] ?? [];
          r[k] = S.length > 0 ? S : w.filter(($) => $.ts >= p);
          return;
        }
        if (h.has(x)) {
          const S = v[x] ?? [];
          r[k] = ai(w, S, p);
          return;
        }
        r[k] = w.filter((S) => S.ts >= p);
      });
      const b = this.sameTrendSeriesKeys(r, this._trendSeries) && Object.keys(r).map((x) => Number(x)).filter((x) => Number.isFinite(x) && x >= 1 && x <= ut).every((x) => {
        const k = x;
        return this.areTrendSeriesEqual(r[k] ?? [], this._trendSeries[k] ?? []);
      });
      b || (this._trendSeries = r), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - c),
        window_ms: o,
        force_full: t,
        slots: s.length,
        full_entities: u.size,
        incremental_entities: h.size,
        data_source: n,
        full_fetch_ms: this.toPerfMs(m),
        incremental_fetch_ms: this.toPerfMs(g),
        series_changed: !b
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(t) {
    const e = [];
    for (let i = 1; i <= ut; i += 1) {
      const r = i;
      this.slotEnabled(r, t) && this.slotEntityId(r, t) && e.push(r);
    }
    return e;
  }
  trackedEntityIds(t) {
    const e = /* @__PURE__ */ new Set();
    return this.enabledSlots(t).forEach((i) => {
      const r = this.slotEntityId(i, t);
      r && e.add(r);
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
      const r = i, o = this.slotEnabled(r, t), n = this.slotEnabled(r, e), s = o ? this.slotEntityId(r, t) : void 0, a = n ? this.slotEntityId(r, e) : void 0;
      if (o !== n || s !== a)
        return !0;
    }
    return !1;
  }
  sameTrendSeriesKeys(t, e) {
    const i = Object.keys(t).sort(), r = Object.keys(e).sort();
    return i.length === r.length && i.every((o, n) => o === r[n]);
  }
  areTrendSeriesEqual(t, e) {
    if (t.length !== e.length)
      return !1;
    for (let i = 0; i < t.length; i += 1) {
      const r = t[i], o = e[i];
      if (r.ts !== o.ts || Math.abs(r.value - o.value) > 1e-4)
        return !1;
    }
    return !0;
  }
};
ke.styles = Z`
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
], ke.prototype, "hass", 2);
Ge([
  I({ type: Boolean })
], ke.prototype, "preview", 2);
Ge([
  I({ type: Boolean })
], ke.prototype, "editMode", 2);
Ge([
  C()
], ke.prototype, "_config", 2);
Ge([
  C()
], ke.prototype, "_trendSeries", 2);
Ge([
  C()
], ke.prototype, "_graphTopInset", 2);
Ge([
  C()
], ke.prototype, "_hoverState", 2);
ke = Ge([
  ce("power-pilz-graph-stack-card")
], ke);
var Hc = Object.defineProperty, Bc = Object.getOwnPropertyDescriptor, Tr = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Bc(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && Hc(e, i, o), o;
};
const Fc = [
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
let ui = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => this.labels()[t.name ?? ""] ?? t.name ?? "", this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM")
        return;
      const i = t.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i))
        return;
      const r = {
        ...i,
        type: "custom:power-pilz-wallbox-card"
      };
      this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: r },
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
    const t = z(this.hass);
    return {
      name: l(t, "wallbox.editor.name"),
      icon: l(t, "wallbox.editor.icon"),
      icon_color: l(t, "wallbox.editor.icon_color"),
      power_entity: l(t, "wallbox.editor.power_entity"),
      status_entity: l(t, "wallbox.editor.status_entity"),
      mode_entity: l(t, "wallbox.editor.mode_entity"),
      command_entity: l(t, "wallbox.editor.command_entity"),
      show_mode_selector: l(t, "wallbox.editor.show_mode"),
      show_live_value: l(t, "wallbox.editor.show_live"),
      show_command_button: l(t, "wallbox.editor.show_button"),
      decimals: l(t, "wallbox.editor.decimals"),
      auto_scale_units: l(t, "wallbox.editor.auto_scale"),
      decimals_base_unit: l(t, "wallbox.editor.decimals_base"),
      decimals_prefixed_unit: l(t, "wallbox.editor.decimals_prefixed")
    };
  }
  render() {
    return !this.hass || !this._config ? E : y`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ze}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Fc}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Tr([
  I({ attribute: !1 })
], ui.prototype, "hass", 2);
Tr([
  C()
], ui.prototype, "_config", 2);
ui = Tr([
  ce("power-pilz-wallbox-card-editor")
], ui);
var Vc = Object.defineProperty, nt = (t, e, i, r) => {
  for (var o = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = s(e, i, o) || o);
  return o && Vc(e, i, o), o;
};
const Wc = 0.01, gn = "power-pilz-wallbox-mode-menu-portal-style", Lr = class Lr extends L {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._actionBusy = !1, this._modeMenuOpen = !1, this._modeMenuOptionCount = 0, this.toggleModeMenu = (e) => {
      var s;
      if (e.stopPropagation(), this.isEditorPreview() || !((s = this._config) != null && s.mode_entity) || this._actionBusy)
        return;
      const i = N(this.hass, this._config.mode_entity), r = (i == null ? void 0 : i.state) ?? "", o = this.getModeOptions(i);
      if (o.length === 0)
        return;
      if (this._modeMenuOpen) {
        this.closeModeMenuPortal();
        return;
      }
      const n = e.currentTarget;
      n && this.openModeMenuPortal(n, o, r || o[0] || "Mode");
    }, this.selectModeOption = async (e) => {
      var o;
      if (!((o = this._config) != null && o.mode_entity))
        return;
      const i = N(this.hass, this._config.mode_entity);
      if (!i || i.state === e)
        return;
      const r = this.entityDomain(this._config.mode_entity);
      await Promise.resolve(
        this.hass.callService(r, "select_option", {
          entity_id: this._config.mode_entity,
          option: e
        })
      );
    }, this.handleActionClick = async (e) => {
      if (this.isEditorPreview() || !this._config || this._actionBusy)
        return;
      e.stopPropagation(), this.closeModeMenuPortal();
      const i = F(this.hass, this._config.power_entity), r = oi(this.hass, this._config.status_entity), o = this.isCharging(r, i, this._config.command_entity), n = this.resolveActionCommand(o);
      if (n) {
        this._actionBusy = !0;
        try {
          await Promise.resolve(this.hass.callService(n.domain, n.service, n.data));
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
    const i = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(i), o = (...d) => d.find((u) => u in i), n = (d) => r.find((u) => u.startsWith(`${d}.`)), s = o("sensor.dev_wallbox_power", "sensor.wallbox_power") ?? n("sensor") ?? "sensor.dev_wallbox_power", a = o("input_select.dev_wallbox_mode", "select.wallbox_charging_mode") ?? n("input_select") ?? n("select"), c = o("input_boolean.dev_wallbox_enabled", "switch.wallbox_charging_enabled") ?? n("input_boolean") ?? n("switch");
    return {
      type: "custom:power-pilz-wallbox-card",
      name: "Wallbox",
      power_entity: s,
      status_entity: o("sensor.dev_wallbox_status", "sensor.wallbox_status"),
      mode_entity: a,
      command_entity: c,
      decimals: 1,
      auto_scale_units: !1,
      decimals_base_unit: 1,
      decimals_prefixed_unit: 1
    };
  }
  setConfig(e) {
    const i = e.power_entity ?? "sensor.dev_wallbox_power", r = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : 1;
    this._config = {
      ...e,
      icon: e.icon ?? "mdi:power-plug",
      name: e.name ?? l(z(this.hass), "wallbox.default_name"),
      show_mode_selector: e.show_mode_selector ?? !0,
      show_live_value: e.show_live_value ?? !0,
      show_command_button: e.show_command_button ?? !0,
      decimals: r,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: Se(e.decimals_base_unit, r),
      decimals_prefixed_unit: Se(e.decimals_prefixed_unit, r),
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
    const e = z(this.hass);
    if (!this._config)
      return y`<ha-card>${l(e, "common.invalid_config")}</ha-card>`;
    if (!this.hass)
      return y``;
    const i = this._config, r = F(this.hass, i.power_entity), o = r !== null ? r : this.preview ? 7.2 : null, n = U(this.hass, i.power_entity) ?? "kW", s = oi(this.hass, i.status_entity), a = s || (this.preview ? "charging" : s), c = N(this.hass, i.mode_entity), d = (c == null ? void 0 : c.state) ?? (this.preview ? "Eco" : ""), u = this.getModeOptions(c), h = u.length > 0 ? u : this.preview ? ["Eco", "Fast", "Solar"] : u, _ = this.isCharging(a, o, i.command_entity), p = this.resolveActionCommand(_), m = _ ? l(e, "wallbox.stop") : l(e, "wallbox.start"), f = _ ? "mdi:pause" : "mdi:play", g = this.statusLabel(a, _), v = this.formatPower(o, n, i.decimals ?? 1), b = this.showModeSelector(i, h), x = this.showLiveValue(i), k = this.showCommandButton(i), w = this.isEditorPreview() || this._actionBusy || !i.mode_entity || h.length === 0, S = d || h[0] || l(e, "wallbox.mode_fallback"), $ = this._modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down", T = this.iconStyle(i.icon_color), P = Number(x) + Number(k) === 1, D = b && x && k, O = P && x, H = P && k || D, Q = O || H, ee = x && !O, Te = k && !H, Ne = b || ee || Te, Le = b ? ee || Te ? Te ? "actions" : "actions no-command" : "actions mode-only" : "actions no-mode";
    return (!b || w) && this._modeMenuOpen && this.closeModeMenuPortal(), y`
      <ha-card>
        <div class="container">
          <div class="state-item ${Q ? "compact-state" : ""}">
            <div class="icon-wrap">
              <div class="icon-shape" style=${M(T)}>
                <ha-icon .icon=${i.icon ?? "mdi:ev-station"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${i.name}</div>
              <div class="secondary">${l(e, "wallbox.ev_charger")}</div>
            </div>

            ${Q ? y`
                  <div class="compact-trailing ${H ? "button-only" : ""}">
                    ${O ? y`
                          <div class="compact-live-value">
                            <span>${g}</span>
                            <span class="dot">•</span>
                            <span>${v}</span>
                          </div>
                        ` : y``}

                    ${H ? y`
                          <button
                            type="button"
                            class="action-button"
                            ?disabled=${this.isEditorPreview() || this._actionBusy || !p}
                            @click=${this.handleActionClick}
                            title=${m}
                            aria-label=${m}
                          >
                            <ha-icon .icon=${f}></ha-icon>
                          </button>
                        ` : y``}
                  </div>
                ` : y``}
          </div>

          ${Ne ? y`
                <div class=${Le}>
                  ${b ? y`
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
                      ` : y``}

                  ${ee ? y`
                        <div class="live-value">
                          <span>${g}</span>
                          <span class="dot">•</span>
                          <span>${v}</span>
                        </div>
                      ` : y``}

                  ${Te ? y`
                        <button
                          type="button"
                          class="action-button"
                          ?disabled=${this.isEditorPreview() || this._actionBusy || !p}
                          @click=${this.handleActionClick}
                          title=${m}
                          aria-label=${m}
                        >
                          <ha-icon .icon=${f}></ha-icon>
                        </button>
                      ` : y``}
                </div>
              ` : y``}
        </div>
      </ha-card>
    `;
  }
  getModeOptions(e) {
    const i = e == null ? void 0 : e.attributes.options;
    if (Array.isArray(i)) {
      const r = i.filter(
        (o) => typeof o == "string" && o.trim().length > 0
      );
      if (r.length > 0)
        return Array.from(new Set(r));
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
    const r = z(this.hass);
    if (!e)
      return i ? l(r, "wallbox.status_charging") : l(r, "wallbox.status_idle");
    const n = `wallbox.status_${e.toLowerCase().replace(/[_\s-]+/g, "_")}`, s = l(r, n);
    return s !== n ? s : e.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().split(" ").map((a) => a && a.charAt(0).toLocaleUpperCase() + a.slice(1)).join(" ");
  }
  formatPower(e, i, r) {
    var n, s, a;
    const o = e === null ? null : Math.abs(e);
    return Ot(o, i, r, {
      enabled: ((n = this._config) == null ? void 0 : n.auto_scale_units) === !0,
      baseDecimals: ((s = this._config) == null ? void 0 : s.decimals_base_unit) ?? r,
      prefixedDecimals: ((a = this._config) == null ? void 0 : a.decimals_prefixed_unit) ?? r,
      nullWithUnit: !0
    });
  }
  isCharging(e, i, r) {
    var o;
    if (e) {
      const n = e.toLowerCase();
      if (["charging", "active", "running", "on", "start", "started"].includes(n))
        return !0;
      if (["idle", "paused", "stopped", "off", "standby", "complete"].includes(n))
        return !1;
    }
    if (r) {
      const n = (o = oi(this.hass, r)) == null ? void 0 : o.toLowerCase();
      if (n === "on")
        return !0;
      if (n === "off")
        return !1;
    }
    return i !== null && i > Wc;
  }
  parseServiceAction(e) {
    if (!e)
      return null;
    const [i, r] = e.split(".");
    return !i || !r ? null : { domain: i, service: r };
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
    const i = this._config, r = this.parseServiceAction(e ? i.stop_service : i.start_service);
    if (r) {
      const o = this.objectValue(e ? i.stop_service_data : i.start_service_data);
      return i.command_entity && o.entity_id === void 0 && (o.entity_id = i.command_entity), { ...r, data: o };
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
    if (document.getElementById(gn))
      return;
    const e = document.createElement("style");
    e.id = gn, e.textContent = `
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
    const r = e ?? this.currentModeButton();
    if (!r)
      return;
    const o = r.getBoundingClientRect(), n = 8, s = 6, a = Math.max(96, Math.min(280, window.innerHeight - n * 2)), c = Math.min(
      a,
      this._modeMenuOptionCount * 34 + Math.max(0, this._modeMenuOptionCount - 1) * 4 + 14
    ), d = i.offsetHeight > 0 ? Math.min(a, i.offsetHeight) : c, u = Math.max(120, Math.round(o.width)), h = window.innerHeight - o.bottom - n, _ = h < d + s && o.top - n > h;
    let p = o.left;
    p = Math.max(n, Math.min(p, window.innerWidth - u - n));
    let m = _ ? o.top - s - d : o.bottom + s;
    m = Math.max(n, Math.min(m, window.innerHeight - d - n)), i.style.maxHeight = `${a}px`, i.style.width = `${u}px`, i.style.left = `${Math.round(p)}px`, i.style.top = `${Math.round(m)}px`;
  }
  openModeMenuPortal(e, i, r) {
    this.closeModeMenuPortal(), this.ensureModeMenuPortalStyles();
    const o = document.createElement("div");
    o.className = "power-pilz-mode-menu-backdrop", o.addEventListener("click", () => {
      this.closeModeMenuPortal();
    });
    const n = document.createElement("div");
    n.className = "power-pilz-mode-menu-portal", n.setAttribute("role", "listbox"), i.forEach((s) => {
      const a = document.createElement("button");
      a.type = "button", a.className = `power-pilz-mode-menu-option ${s === r ? "selected" : ""}`, a.dataset.option = s, a.setAttribute("role", "option"), a.setAttribute("aria-selected", s === r ? "true" : "false"), a.textContent = s, a.addEventListener("click", (c) => {
        var u;
        c.stopPropagation();
        const d = ((u = c.currentTarget) == null ? void 0 : u.dataset.option) ?? "";
        d && (this.closeModeMenuPortal(), this.selectModeOption(d));
      }), n.append(a);
    }), document.body.append(o), document.body.append(n), this._modeMenuBackdrop = o, this._modeMenuPortal = n, this._modeMenuOptionCount = i.length, this._modeMenuOpen = !0, this.positionModeMenuPortal(e);
  }
  closeModeMenuPortal() {
    this._modeMenuPortal && (this._modeMenuPortal.remove(), this._modeMenuPortal = void 0), this._modeMenuBackdrop && (this._modeMenuBackdrop.remove(), this._modeMenuBackdrop = void 0), this._modeMenuOptionCount = 0, this._modeMenuOpen && (this._modeMenuOpen = !1);
  }
};
Lr.styles = Z`
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
let ye = Lr;
nt([
  I({ attribute: !1 })
], ye.prototype, "hass");
nt([
  I({ type: Boolean })
], ye.prototype, "preview");
nt([
  I({ type: Boolean })
], ye.prototype, "editMode");
nt([
  I({ reflect: !0, type: String })
], ye.prototype, "layout");
nt([
  C()
], ye.prototype, "_config");
nt([
  C()
], ye.prototype, "_actionBusy");
nt([
  C()
], ye.prototype, "_modeMenuOpen");
class Uc extends ye {
}
customElements.get("power-pilz-wallbox-card") || customElements.define("power-pilz-wallbox-card", ye);
customElements.get("power-pilz-wallbox-card-v2") || customElements.define("power-pilz-wallbox-card-v2", Uc);
var jc = Object.defineProperty, Kc = Object.getOwnPropertyDescriptor, Mr = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? Kc(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && jc(e, i, o), o;
};
let _i = class extends L {
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
    const i = z(this.hass);
    return {
      type: "expandable",
      name: "",
      title: t === 1 ? l(i, "switch.editor.state_1_title") : l(i, "switch.editor.state_n_title", { n: t }),
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
    const t = z(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: l(t, "switch.editor.section_identity"),
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
        title: l(t, "switch.editor.section_layout"),
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
                      { label: l(t, "switch.editor.layout_horizontal"), value: "horizontal" },
                      { label: l(t, "switch.editor.layout_vertical"), value: "vertical" }
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
                      { label: l(t, "switch.editor.slider_small"), value: "small" },
                      { label: l(t, "switch.editor.slider_medium"), value: "medium" },
                      { label: l(t, "switch.editor.slider_large"), value: "large" }
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
        title: l(t, "switch.editor.section_slider"),
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
        title: l(t, "switch.editor.section_state_custom"),
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
    const t = z(this.hass), e = {
      name: l(t, "switch.editor.name"),
      subtitle: l(t, "switch.editor.subtitle"),
      icon: l(t, "switch.editor.icon"),
      icon_color: l(t, "switch.editor.icon_color"),
      dim_inactive_icon: l(t, "switch.editor.dim_inactive_icon"),
      entity: l(t, "switch.editor.entity"),
      card_layout: l(t, "switch.editor.card_layout"),
      slider_size: l(t, "switch.editor.slider_size"),
      slider_color: l(t, "switch.editor.slider_color"),
      use_custom_icons: l(t, "switch.editor.use_custom_icons")
    };
    for (let i = 1; i <= 5; i++)
      e[`state_${i}_color`] = l(t, "switch.editor.state_color"), e[`state_${i}_icon`] = l(t, "switch.editor.state_icon");
    return e;
  }
  render() {
    return !this.hass || !this._config ? E : y`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ze}
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
Mr([
  I({ attribute: !1 })
], _i.prototype, "hass", 2);
Mr([
  C()
], _i.prototype, "_config", 2);
_i = Mr([
  ce("power-pilz-switch-card-editor")
], _i);
var Gc = Object.defineProperty, Nt = (t, e, i, r) => {
  for (var o = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = s(e, i, o) || o);
  return o && Gc(e, i, o), o;
};
const Xc = 5, fn = 4, Yc = {
  small: "36%",
  medium: "48%",
  large: "62%"
}, Hr = class Hr extends L {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this.handleSegmentTap = (e) => {
      e.stopPropagation();
      const i = e.currentTarget;
      if (!(i instanceof HTMLElement)) return;
      const r = i.dataset.option;
      r && this.selectOption(r);
    }, this.handleCardTap = () => {
      var n;
      if (!((n = this._config) != null && n.entity) || this.isEditorPreview()) return;
      const e = N(this.hass, this._config.entity);
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
    const i = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(i), o = (s) => r.find((a) => a.startsWith(`${s}.`));
    return {
      type: "custom:power-pilz-switch-card",
      entity: o("input_select") ?? o("select") ?? "input_select.mode",
      name: "Mode"
    };
  }
  setConfig(e) {
    var r;
    if (!e.entity)
      throw new Error("Entity is required");
    const i = (r = this._config) == null ? void 0 : r.card_layout;
    this._config = {
      ...e,
      icon: e.icon ?? "mdi:toggle-switch-outline",
      name: e.name ?? l(z(this.hass), "switch.default_name")
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
    const r = i.filter(
      (n) => typeof n == "string" && n.trim().length > 0
    );
    return Array.from(new Set(r)).slice(0, Xc);
  }
  activeIndex(e, i) {
    const r = e.indexOf(i);
    return r >= 0 ? r : 0;
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
    const r = `state_${e + 1}_color`, o = i[r], n = _e(o);
    if (n) return `rgba(${n}, 0.25)`;
    const s = _e(i.slider_color);
    return s ? `rgba(${s}, 0.25)` : null;
  }
  /** Resolve segment text color for the active state index. */
  segmentActiveColor(e) {
    const i = this._config;
    if (!i) return null;
    const r = `state_${e + 1}_color`, o = i[r], n = _e(o);
    if (n) return `rgb(${n})`;
    const s = _e(i.slider_color);
    return s ? `rgb(${s})` : null;
  }
  /** Get custom icon for a state index, or null. */
  stateIcon(e) {
    const i = this._config;
    if (!(i != null && i.use_custom_icons)) return null;
    const r = `state_${e + 1}_icon`, o = i[r];
    return typeof o == "string" && o.length > 0 ? o : null;
  }
  segmentContent(e) {
    const i = this.stateIcon(e);
    if (i)
      return y`<ha-icon class="seg-icon" .icon=${i}></ha-icon>`;
    if (e === 0)
      return y`<span class="seg-symbol"><span class="seg-dot"></span></span>`;
    const r = Array.from({ length: e }, () => y`<span class="seg-bar"></span>`);
    return y`<span class="seg-symbol seg-bars">${r}</span>`;
  }
  // --- Slider template (shared between layouts) ---
  renderSlider(e, i, r, o) {
    return y`
      <div class="slider-track">
        <div class="slider-pill" style=${M(r)}></div>
        ${e.map(
      (n, s) => y`
            <button
              type="button"
              class="slider-segment ${s === i ? "active" : ""}"
              style=${s === i && o ? M({ color: o }) : E}
              data-option=${n}
              ?disabled=${this.isEditorPreview()}
              @click=${this.handleSegmentTap}
              title=${n}
              aria-label=${n}
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
    var r;
    if (!((r = this._config) != null && r.entity) || this.isEditorPreview()) return;
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
    var k;
    if (!this._config)
      return y`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return y``;
    const e = this._config, i = N(this.hass, e.entity), r = (i == null ? void 0 : i.state) ?? "", o = this.getOptions(i), n = this.activeIndex(o, r), s = n === 0 && e.dim_inactive_icon !== !1, a = this.iconStyle(s ? "disabled" : e.icon_color), c = o.length, d = c > 0 ? n / c * 100 : 0, u = c > 0 ? 100 / c : 100, h = (k = i == null ? void 0 : i.attributes) == null ? void 0 : k.friendly_name, _ = e.subtitle || r || l(z(this.hass), "common.unknown"), p = this.resolvedCardLayout(), m = this.resolvedSliderSize(), f = Yc[m], g = c > 1, v = this.pillColor(n), b = {
      width: `calc(${u}% - ${fn * 2}px)`,
      left: `calc(${d}% + ${fn}px)`
    };
    v && (b["background-color"] = v);
    const x = this.segmentActiveColor(n);
    return p === "vertical" ? y`
        <ha-card @click=${this.handleCardTap}>
          <div class="container vertical">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${M(a)}>
                  <ha-icon .icon=${e.icon ?? "mdi:toggle-switch-outline"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${e.name || h || l(z(this.hass), "switch.default_name")}</div>
                <div class="secondary">${_}</div>
              </div>
            </div>
            ${g ? y`
                  <div class="slider-row">
                    ${this.renderSlider(o, n, b, x)}
                  </div>
                ` : y``}
          </div>
        </ha-card>
      ` : y`
      <ha-card @click=${this.handleCardTap}>
        <div class="container horizontal">
          <div class="state-item">
            <div class="icon-wrap">
              <div class="icon-shape" style=${M(a)}>
                <ha-icon .icon=${e.icon ?? "mdi:toggle-switch-outline"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${e.name || h || l(z(this.hass), "switch.default_name")}</div>
              <div class="secondary">${_}</div>
            </div>
            ${g ? y`
                  <div class="slider-wrap" style=${M({ width: f })}>
                    ${this.renderSlider(o, n, b, x)}
                  </div>
                ` : y``}
          </div>
        </div>
      </ha-card>
    `;
  }
};
Hr.styles = Z`
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
let De = Hr;
Nt([
  I({ attribute: !1 })
], De.prototype, "hass");
Nt([
  I({ type: Boolean })
], De.prototype, "preview");
Nt([
  I({ type: Boolean })
], De.prototype, "editMode");
Nt([
  I({ reflect: !0, type: String })
], De.prototype, "layout");
Nt([
  C()
], De.prototype, "_config");
class Zc extends De {
}
customElements.get("power-pilz-switch-card") || customElements.define("power-pilz-switch-card", De);
customElements.get("power-pilz-switch-card-v2") || customElements.define("power-pilz-switch-card-v2", Zc);
var qc = Object.defineProperty, oe = (t, e, i, r) => {
  for (var o = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = s(e, i, o) || o);
  return o && qc(e, i, o), o;
};
const ur = "power-pilz-schedule-edit-dialog", Zi = [
  { key: "monday", dayIndex: 1 },
  { key: "tuesday", dayIndex: 2 },
  { key: "wednesday", dayIndex: 3 },
  { key: "thursday", dayIndex: 4 },
  { key: "friday", dayIndex: 5 },
  { key: "saturday", dayIndex: 6 },
  { key: "sunday", dayIndex: 0 }
], Jt = 15, Jc = 15, ue = 1440;
function bn() {
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
const Br = class Br extends le {
  constructor() {
    super(...arguments), this.scheduleEntityId = "", this._blocks = bn(), this._uniformBlocks = [], this._sameForAll = !1, this._loading = !0, this._saving = !1, this._dirty = !1, this._handleSave = async () => {
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
        const i = Zi.map((r) => this._blocks[r.key]).find((r) => Array.isArray(r) && r.length > 0);
        this._uniformBlocks = i ? [...i] : [];
      }
      this._sameForAll = e, this._dirty = !0;
    }, this._handleTrackPointerDown = (e) => {
      if (e.button !== 0 || this._loading || this._loadError || e.target.closest(".pp-block")) return;
      const i = e.currentTarget, r = i.dataset.day;
      if (!r) return;
      e.preventDefault();
      try {
        i.setPointerCapture(e.pointerId);
      } catch {
      }
      const o = this._pxToMin(i, e.clientX);
      this._drag = {
        day: r,
        trackEl: i,
        pointerId: e.pointerId,
        startMin: o,
        endMin: o
      };
    }, this._handleTrackPointerMove = (e) => {
      const i = e.currentTarget, r = i.dataset.day;
      if (this._moveDrag && e.pointerId === this._moveDrag.pointerId) {
        const o = i.getBoundingClientRect(), s = (e.clientX - this._moveDrag.anchorClientX) / o.width * ue;
        let a = Math.round(s / Jt) * Jt;
        const c = -this._moveDrag.origFrom, d = ue - this._moveDrag.origTo;
        a < c && (a = c), a > d && (a = d), a !== this._moveDrag.deltaMin && (this._moveDrag = {
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
      if (r) {
        const o = this._pxToMin(i, e.clientX);
        (!this._cursor || this._cursor.day !== r || this._cursor.min !== o) && (this._cursor = { day: r, min: o });
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
      const r = Math.min(i.startMin, i.endMin), o = Math.max(i.startMin, i.endMin);
      if (o - r < Jc) return;
      const n = this._blocksForDay(i.day);
      n.some(
        (a) => qi(X(a.from), X(a.to), r, o)
      ) || (n.push({ from: _t(r), to: _t(o) }), this._setBlocksForDay(i.day, n));
    }, this._handleBlockPointerDown = (e) => {
      if (e.button !== 0 || this._loading || this._loadError) return;
      const i = e.currentTarget, r = i.dataset.day, o = parseInt(i.dataset.index ?? "-1", 10);
      if (!r || o < 0) return;
      const n = i.parentElement;
      if (!n) return;
      const a = this._blocksForDay(r)[o];
      if (a) {
        e.preventDefault(), e.stopPropagation();
        try {
          n.setPointerCapture(e.pointerId);
        } catch {
        }
        this._moveDrag = {
          day: r,
          index: o,
          trackEl: n,
          pointerId: e.pointerId,
          origFrom: X(a.from),
          origTo: X(a.to),
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
      this._updateEditingField("from", vn(e.target.value));
    }, this._handleEditToChange = (e) => {
      this._updateEditingField("to", vn(e.target.value));
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
    var i, r, o;
    const e = z(this.hass);
    try {
      const n = (r = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : r[this.scheduleEntityId];
      if (!n) {
        this._loadError = l(e, "schedule.edit_dialog.error_not_found", {
          entity: this.scheduleEntityId
        });
        return;
      }
      const s = (o = n.attributes) == null ? void 0 : o.week_blocks, a = bn();
      if (s && typeof s == "object" && !Array.isArray(s))
        for (const c of Object.keys(a)) {
          const d = s[c];
          Array.isArray(d) && (a[c] = d.filter((u) => u && typeof u == "object").map((u) => {
            const h = u, _ = {
              from: String(h.from ?? "00:00:00"),
              to: String(h.to ?? "00:00:00")
            };
            return h.data && typeof h.data == "object" && !Array.isArray(h.data) && (_.data = h.data), _;
          }));
        }
      this._blocks = a;
    } catch (n) {
      this._loadError = String((n == null ? void 0 : n.message) || n);
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
    const r = Qc(i);
    this._sameForAll ? this._uniformBlocks = r : this._blocks = { ...this._blocks, [e]: r }, this._dirty = !0;
  }
  // ------------------------------------------------------------
  // Pointer interaction — paint new blocks, move existing blocks,
  // and track cursor position for the live time hint.
  // ------------------------------------------------------------
  _pxToMin(e, i) {
    const r = e.getBoundingClientRect(), o = (i - r.left) / r.width, n = Math.max(0, Math.min(ue, Math.round(o * ue)));
    return Math.round(n / Jt) * Jt;
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
      const d = this._blocksForDay(e.day)[e.index];
      if (!d) return;
      this._editing = {
        day: e.day,
        index: e.index,
        from: _r(d.from),
        to: _r(d.to),
        dataText: d.data ? JSON.stringify(d.data, null, 2) : ""
      };
      return;
    }
    const i = e.origFrom + e.deltaMin, r = e.origTo + e.deltaMin, o = this._blocksForDay(e.day), n = o[e.index];
    if (!n || o.some((c, d) => d === e.index ? !1 : qi(X(c.from), X(c.to), i, r))) return;
    const a = {
      from: _t(i),
      to: _t(r)
    };
    n.data && (a.data = n.data), o[e.index] = a, this._setBlocksForDay(e.day, o);
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
    const e = z(this.hass), { day: i, index: r, from: o, to: n, dataText: s } = this._editing, a = X(o), c = X(n);
    if (isNaN(a) || isNaN(c)) {
      this._editing = { ...this._editing, error: l(e, "schedule.edit_dialog.err_time") };
      return;
    }
    if (c <= a) {
      this._editing = { ...this._editing, error: l(e, "schedule.edit_dialog.err_order") };
      return;
    }
    let d;
    const u = s.trim();
    if (u)
      try {
        const m = JSON.parse(u);
        if (typeof m != "object" || m === null || Array.isArray(m))
          throw new Error("not an object");
        d = m;
      } catch {
        this._editing = {
          ...this._editing,
          dataError: l(e, "schedule.edit_dialog.err_data")
        };
        return;
      }
    const h = this._blocksForDay(i);
    if (h.some(
      (m, f) => f !== r && qi(X(m.from), X(m.to), a, c)
    )) {
      this._editing = { ...this._editing, error: l(e, "schedule.edit_dialog.err_overlap") };
      return;
    }
    const p = {
      from: _t(a, o),
      to: _t(c, n)
    };
    d && (p.data = d), h[r] = p, this._setBlocksForDay(i, h), this._editing = void 0;
  }
  _deleteEditingBlock() {
    if (!this._editing) return;
    const { day: e, index: i } = this._editing, r = this._blocksForDay(e).filter((o, n) => n !== i);
    this._setBlocksForDay(e, r), this._editing = void 0;
  }
  _cancelBlockEdit() {
    this._editing = void 0;
  }
  // ------------------------------------------------------------
  // Title resolution
  // ------------------------------------------------------------
  _resolveTitle() {
    var i, r, o, n;
    if (this.dialogTitle) return this.dialogTitle;
    const e = z(this.hass);
    return ((n = (o = (r = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : r[this.scheduleEntityId]) == null ? void 0 : o.attributes) == null ? void 0 : n.friendly_name) ?? l(e, "schedule.edit_dialog.default_title");
  }
  willUpdate() {
    const e = this._resolveTitle();
    this.dialogTitle !== e && !this.dialogTitle && (this.dialogTitle = e);
  }
  // ------------------------------------------------------------
  // Render hooks (consumed by PowerPilzDialogBase)
  // ------------------------------------------------------------
  renderBody() {
    const e = z(this.hass);
    if (this._loading)
      return y`<div class="msg">${l(e, "common.loading") || "Loading…"}</div>`;
    if (this._loadError)
      return y`<div class="msg error">${this._loadError}</div>`;
    const i = this._sameForAll ? [{ key: "monday", label: l(e, "schedule.edit_dialog.all_days") }] : Zi.map((r) => ({ key: r.key, label: re(e, r.dayIndex) }));
    return y`
      <div class="editor">
        <div class="pp-toolbar">
          <label class="pp-toggle">
            <input
              type="checkbox"
              .checked=${this._sameForAll}
              @change=${this._toggleSameForAll}
            />
            <span>${l(e, "schedule.edit_dialog.same_for_all")}</span>
          </label>
        </div>
        <div class="hour-header">
          <div class="day-col"></div>
          <div class="hour-labels">
            ${[0, 6, 12, 18, 24].map(
      (r) => y`<span style=${M({ left: `${r / 24 * 100}%` })}>${String(r).padStart(2, "0")}</span>`
    )}
          </div>
        </div>
        ${i.map((r) => this._renderDayRow(r.key, r.label))}
        <div class="hint">${l(e, "schedule.edit_dialog.hint_v3")}</div>
      </div>
    `;
  }
  renderFooter() {
    const e = z(this.hass);
    return y`
      <button class="ppd-btn flat" @click=${() => this.close()} ?disabled=${this._saving}>
        ${l(e, "common.cancel")}
      </button>
      <button
        class="ppd-btn primary"
        @click=${this._handleSave}
        ?disabled=${this._saving || !this._dirty || !!this._loadError}
      >
        ${this._saving ? l(e, "common.saving") || "Saving…" : l(e, "common.save") || "Save"}
      </button>
    `;
  }
  renderInner() {
    var o;
    if (!this._editing) return E;
    const e = z(this.hass), i = this._editing, r = re(
      e,
      ((o = Zi.find((n) => n.key === i.day)) == null ? void 0 : o.dayIndex) ?? 0
    );
    return y`
      <div class="inner-backdrop" @click=${this._cancelBlockEdit}>
        <div class="inner-dialog" @click=${(n) => n.stopPropagation()}>
          <header>
            <h3>
              ${l(e, "schedule.edit_dialog.block_title", { day: r })}
            </h3>
            <button class="close-x" @click=${this._cancelBlockEdit} aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="inner-body">
            <label class="field">
              <span>${l(e, "schedule.edit_dialog.from")}</span>
              <input
                type="time"
                .value=${i.from.slice(0, 5)}
                @change=${this._handleEditFromChange}
              />
            </label>
            <label class="field">
              <span>${l(e, "schedule.edit_dialog.to")}</span>
              <input
                type="time"
                .value=${i.to.slice(0, 5)}
                @change=${this._handleEditToChange}
              />
            </label>
            <label class="field">
              <span>
                ${l(e, "schedule.edit_dialog.data")}
                <small>${l(e, "schedule.edit_dialog.data_help")}</small>
              </span>
              <textarea
                rows="4"
                spellcheck="false"
                placeholder='{"mode": "heat"}'
                .value=${i.dataText}
                @input=${this._handleEditDataChange}
              ></textarea>
              ${i.dataError ? y`<span class="err">${i.dataError}</span>` : E}
            </label>
            ${i.error ? y`<div class="err">${i.error}</div>` : E}
          </div>
          <footer>
            <button class="ppd-btn danger" @click=${this._deleteEditingBlock}>
              ${l(e, "schedule.edit_dialog.delete")}
            </button>
            <div class="spacer"></div>
            <button class="ppd-btn flat" @click=${this._cancelBlockEdit}>
              ${l(e, "common.cancel")}
            </button>
            <button class="ppd-btn primary" @click=${() => this._saveBlockEdit()}>
              ${l(e, "common.save")}
            </button>
          </footer>
        </div>
      </div>
    `;
  }
  _renderDayRow(e, i) {
    var s, a;
    const r = this._blocksForDay(e);
    let o = E;
    if (((s = this._drag) == null ? void 0 : s.day) === e) {
      const c = Math.min(this._drag.startMin, this._drag.endMin), d = Math.max(this._drag.startMin, this._drag.endMin);
      if (d > c) {
        const u = c / ue * 100, h = (d - c) / ue * 100;
        o = y`
          <div
            class="pp-block ghost"
            style=${M({ left: `${u}%`, width: `${h}%` })}
          >
            <span class="pp-block-label">
              ${Et(c)}–${Et(d)}
            </span>
          </div>
        `;
      }
    }
    let n = E;
    if (((a = this._cursor) == null ? void 0 : a.day) === e && !this._drag && !this._moveDrag) {
      const c = this._cursor.min / ue * 100;
      n = y`
        <div class="pp-cursor-chip" style=${M({ left: `${c}%` })}>
          ${Et(this._cursor.min)}
        </div>
      `;
    }
    return y`
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
          ${r.map((c, d) => {
      var x, k, w;
      const u = ((x = this._moveDrag) == null ? void 0 : x.day) === e && this._moveDrag.index === d, h = X(c.from), _ = X(c.to), p = u ? h + (((k = this._moveDrag) == null ? void 0 : k.deltaMin) ?? 0) : h, m = u ? _ + (((w = this._moveDrag) == null ? void 0 : w.deltaMin) ?? 0) : _, f = p / ue * 100, g = (m - p) / ue * 100, v = u ? Et(p) : c.from.slice(0, 5), b = u ? Et(m) : c.to.slice(0, 5);
      return y`
              <div
                class="pp-block ${u ? "moving" : ""}"
                data-day=${e}
                data-index=${d}
                style=${M({ left: `${f}%`, width: `${g}%` })}
                @pointerdown=${this._handleBlockPointerDown}
                title="${v}–${b}"
              >
                <span class="pp-block-label">${v}–${b}</span>
              </div>
            `;
    })}
          ${o}
          ${n}
        </div>
      </div>
    `;
  }
};
Br.styles = [
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
let Y = Br;
oe([
  I({ attribute: !1 })
], Y.prototype, "hass");
oe([
  I({ type: String })
], Y.prototype, "scheduleEntityId");
oe([
  C()
], Y.prototype, "_blocks");
oe([
  C()
], Y.prototype, "_uniformBlocks");
oe([
  C()
], Y.prototype, "_sameForAll");
oe([
  C()
], Y.prototype, "_loading");
oe([
  C()
], Y.prototype, "_loadError");
oe([
  C()
], Y.prototype, "_saving");
oe([
  C()
], Y.prototype, "_dirty");
oe([
  C()
], Y.prototype, "_drag");
oe([
  C()
], Y.prototype, "_moveDrag");
oe([
  C()
], Y.prototype, "_editing");
oe([
  C()
], Y.prototype, "_cursor");
function X(t) {
  if (!t || typeof t != "string") return 0;
  const e = t.split(":"), i = parseInt(e[0] ?? "0", 10), r = parseInt(e[1] ?? "0", 10), o = parseInt(e[2] ?? "0", 10);
  return isNaN(i) || isNaN(r) ? 0 : i * 60 + r + (isNaN(o) ? 0 : o / 60);
}
function _t(t, e) {
  const i = Math.max(0, Math.min(ue, t)), r = Math.floor(i / 60), o = Math.floor(i % 60);
  let n = 0;
  if (e) {
    const s = e.split(":"), a = parseInt(s[2] ?? "0", 10);
    isNaN(a) || (n = a);
  }
  return r === 24 && o === 0 && n === 0 ? "24:00:00" : `${String(r).padStart(2, "0")}:${String(o).padStart(2, "0")}:${String(n).padStart(2, "0")}`;
}
function Et(t) {
  const e = Math.max(0, Math.min(ue, t)), i = Math.floor(e / 60), r = e % 60;
  return `${String(i).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function _r(t) {
  if (!t) return "00:00:00";
  const e = t.split(":"), i = (e[0] ?? "00").padStart(2, "0"), r = (e[1] ?? "00").padStart(2, "0"), o = (e[2] ?? "00").padStart(2, "0");
  return `${i}:${r}:${o}`;
}
function vn(t) {
  return _r(t);
}
function qi(t, e, i, r) {
  return t < r && i < e;
}
function Qc(t) {
  const e = t.map((r) => ({
    from: r.from,
    to: r.to,
    data: r.data,
    s: X(r.from),
    e: X(r.to)
  })).filter((r) => r.e > r.s).sort((r, o) => r.s - o.s), i = [];
  for (const r of e) {
    const o = i[i.length - 1], n = !!r.data || !!(o != null && o.data);
    o && !n && X(o.to) >= r.s ? X(o.to) < r.e && (o.to = r.to) : i.push({
      from: r.from,
      to: r.to,
      ...r.data ? { data: r.data } : {}
    });
  }
  return i;
}
customElements.get(ur) || customElements.define(ur, Y);
function ed(t) {
  if (!t.scheduleEntityId) return;
  const e = document.createElement(ur);
  e.hass = t.hass, e.scheduleEntityId = t.scheduleEntityId, t.title && (e.dialogTitle = t.title), document.body.appendChild(e);
}
const ws = Z`
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
var td = Object.defineProperty, id = Object.getOwnPropertyDescriptor, Ar = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? id(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && td(e, i, o), o;
};
let pi = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => this.labelMap()[t.name ?? ""] ?? t.name ?? "", this.computeHelper = (t) => this.helperMap()[t.name ?? ""], this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM") return;
      const i = t.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i)) return;
      const r = { ...i };
      delete r.use_companion, delete r.companion_entity, delete r.schedule_entity, delete r.switch_entity, delete r.mode_entity, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: { ...r, type: "custom:power-pilz-schedule-card" } },
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
    const t = z(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: l(t, "schedule.editor.section_entities"),
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
            helper: l(t, "schedule.editor.companion_help"),
            description: l(t, "schedule.editor.companion_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "schedule.editor.section_identity"),
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
        title: l(t, "schedule.editor.section_layout"),
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
                      { label: l(t, "schedule.editor.layout_horizontal"), value: "horizontal" },
                      { label: l(t, "schedule.editor.layout_vertical"), value: "vertical" }
                    ]
                  }
                },
                helper: l(t, "schedule.editor.card_layout_help"),
                description: l(t, "schedule.editor.card_layout_help")
              },
              {
                name: "time_window",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: [
                      { label: l(t, "schedule.editor.tw_24"), value: "24" },
                      { label: l(t, "schedule.editor.tw_12"), value: "12" },
                      { label: l(t, "schedule.editor.tw_6"), value: "6" }
                    ]
                  }
                },
                helper: l(t, "schedule.editor.time_window_help"),
                description: l(t, "schedule.editor.time_window_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "schedule.editor.section_appearance"),
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
                helper: l(t, "schedule.editor.active_color_help"),
                description: l(t, "schedule.editor.active_color_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "schedule.editor.section_display"),
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
        title: l(t, "schedule.editor.section_actions"),
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
    const t = z(this.hass);
    return {
      entity: l(t, "schedule.editor.companion_entity"),
      name: l(t, "schedule.editor.name"),
      subtitle: l(t, "schedule.editor.subtitle"),
      icon: l(t, "schedule.editor.icon"),
      icon_color: l(t, "schedule.editor.icon_color"),
      card_layout: l(t, "schedule.editor.card_layout"),
      time_window: l(t, "schedule.editor.time_window"),
      active_color: l(t, "schedule.editor.active_color"),
      show_day_selector: l(t, "schedule.editor.show_day_selector"),
      show_mode_control: l(t, "schedule.editor.show_mode_control"),
      show_now_indicator: l(t, "schedule.editor.show_now_indicator"),
      show_time_labels: l(t, "schedule.editor.show_time_labels"),
      tap_action: l(t, "schedule.editor.tap_action"),
      hold_action: l(t, "schedule.editor.hold_action"),
      double_tap_action: l(t, "schedule.editor.double_tap_action")
    };
  }
  helperMap() {
    const t = z(this.hass);
    return {
      entity: l(t, "schedule.editor.companion_help"),
      card_layout: l(t, "schedule.editor.card_layout_help"),
      time_window: l(t, "schedule.editor.time_window_help"),
      active_color: l(t, "schedule.editor.active_color_help"),
      show_day_selector: l(t, "schedule.editor.show_day_help"),
      show_mode_control: l(t, "schedule.editor.show_mode_help"),
      show_now_indicator: l(t, "schedule.editor.show_now_help"),
      show_time_labels: l(t, "schedule.editor.show_labels_help")
    };
  }
  render() {
    return !this.hass || !this._config ? E : y`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ze}
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
Ar([
  I({ attribute: !1 })
], pi.prototype, "hass", 2);
Ar([
  C()
], pi.prototype, "_config", 2);
pi = Ar([
  ce("power-pilz-schedule-card-editor")
], pi);
var rd = Object.defineProperty, st = (t, e, i, r) => {
  for (var o = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = s(e, i, o) || o);
  return o && rd(e, i, o), o;
};
const wn = "powerpilz-schedule-edit", Ji = [
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
], Fr = class Fr extends L {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._selectedDay = (/* @__PURE__ */ new Date()).getDay(), this._tick = 0, this.handleDaySelect = (e) => {
      e.stopPropagation();
      const i = e.currentTarget;
      if (!(i instanceof HTMLElement)) return;
      const r = parseInt(i.dataset.day ?? "0", 10);
      this._selectedDay = r;
    }, this.handleModeChange = async (e) => {
      var d;
      e.stopPropagation();
      const i = this._modeEntityId;
      if (this.isEditorPreview() || !i) return;
      const r = N(this.hass, i);
      if (!r) return;
      const o = ((d = r.attributes) == null ? void 0 : d.options) ?? [];
      if (o.length === 0) return;
      const s = (o.indexOf(r.state) + 1) % o.length, a = o[s], c = i.split(".")[0];
      await this.hass.callService(c, "select_option", {
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
      entity: Object.keys(i).find((n) => {
        var a;
        if (!n.startsWith("select.")) return !1;
        const s = (a = i[n]) == null ? void 0 : a.attributes;
        return !!(s != null && s.mode_names) && (s == null ? void 0 : s.week_blocks) !== void 0;
      }) ?? ""
    };
  }
  setConfig(e) {
    const i = e, r = e.entity || i.companion_entity || "";
    this._config = {
      ...e,
      entity: r,
      icon: e.icon ?? "mdi:clock-outline",
      name: e.name ?? l(z(this.hass), "schedule.default_name"),
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
    var r, o, n, s;
    const e = this._scheduleEntityId;
    if (!e) return;
    const i = (s = (n = (o = (r = this.hass) == null ? void 0 : r.states) == null ? void 0 : o[e]) == null ? void 0 : n.attributes) == null ? void 0 : s.target_entity;
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
    var s, a, c, d, u, h;
    const e = this.renderRoot.querySelector("ha-card");
    if (!e) return;
    (s = this._actionCleanup) == null || s.destroy();
    const i = !!((c = (a = this._config) == null ? void 0 : a.hold_action) != null && c.action) && this._config.hold_action.action !== "none", r = !((u = (d = this._config) == null ? void 0 : d.hold_action) != null && u.action), o = i || r, n = !!((h = this._config) != null && h.double_tap_action) && this._config.double_tap_action.action !== void 0 && this._config.double_tap_action.action !== "none";
    this._actionCleanup = ot(
      e,
      {
        onTap: () => this._fireAction("tap"),
        onHold: () => this._fireAction("hold"),
        onDoubleTap: () => this._fireAction("double_tap")
      },
      { hasHold: o, hasDoubleTap: n }
    );
  }
  _fireAction(e) {
    if (this.isEditorPreview() || !this._config) return;
    const i = `${e}_action`;
    let r = this._config[i];
    if (e === "tap" && (!r || !r.action)) {
      this._modeEntityId && (r = { action: "fire-dom-event" }, this.handleModeChange(new Event("tap")));
      return;
    }
    if (e === "hold" && (!r || !r.action) && (r = { action: wn }), !(!r || !r.action || r.action === "none")) {
      if (r.action === wn) {
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
    !e || !this.hass || ed({ hass: this.hass, scheduleEntityId: e });
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
    var o, n, s;
    const e = this._scheduleEntityId;
    if (!e) return {};
    const i = (s = (n = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : n[e]) == null ? void 0 : s.attributes, r = i == null ? void 0 : i.week_blocks;
    return r && typeof r == "object" && !Array.isArray(r) ? r : {};
  }
  dayKey(e) {
    return Ji[e] ?? "monday";
  }
  blocksForDay(e) {
    const r = this._weekBlocks()[this.dayKey(e)];
    return Array.isArray(r) ? r : [];
  }
  timeToMinutes(e) {
    const i = (e || "").split(":"), r = parseInt(i[0] ?? "0", 10), o = parseInt(i[1] ?? "0", 10);
    return (isNaN(r) ? 0 : r) * 60 + (isNaN(o) ? 0 : o);
  }
  nowMinutes() {
    const e = /* @__PURE__ */ new Date();
    return e.getHours() * 60 + e.getMinutes();
  }
  resolvedTimeWindow() {
    var s;
    const e = ((s = this._config) == null ? void 0 : s.time_window) ?? "24";
    if (e === "24") return { start: 0, end: 1440 };
    const i = e === "12" ? 360 : 180, r = this.nowMinutes(), o = Math.max(0, r - i), n = Math.min(1440, r + i);
    return { start: o, end: n };
  }
  resolvedActiveColor() {
    var i;
    const e = _e((i = this._config) == null ? void 0 : i.active_color);
    return e ? `rgb(${e})` : "var(--primary-color, rgb(3, 169, 244))";
  }
  resolvedActiveColorAlpha(e) {
    var r;
    const i = _e((r = this._config) == null ? void 0 : r.active_color);
    return i ? `rgba(${i}, ${e})` : `rgba(var(--rgb-primary-color, 3, 169, 244), ${e})`;
  }
  isDeviceOn() {
    var a, c, d;
    const e = this.modeValue().toLowerCase();
    if (e === "on") return !0;
    if (e === "off") return !1;
    const i = this._scheduleEntityId, r = i ? (d = (c = (a = this.hass) == null ? void 0 : a.states) == null ? void 0 : c[i]) == null ? void 0 : d.attributes : void 0;
    if (typeof (r == null ? void 0 : r.schedule_active) == "boolean")
      return r.schedule_active;
    const o = (/* @__PURE__ */ new Date()).getDay(), n = this.blocksForDay(o), s = this.nowMinutes();
    return n.some((u) => {
      const h = this.timeToMinutes(u.from), _ = this.timeToMinutes(u.to);
      return s >= h && s < _;
    });
  }
  /** Returns the *logical* mode ("on"/"off"/"auto") by reverse-mapping
   *  the helper's current display state via the `mode_names` attribute. */
  modeValue() {
    var n;
    const e = this._modeEntityId;
    if (!e) return "auto";
    const i = N(this.hass, e), r = (i == null ? void 0 : i.state) ?? "auto", o = (n = i == null ? void 0 : i.attributes) == null ? void 0 : n.mode_names;
    if (o && typeof o == "object") {
      for (const [s, a] of Object.entries(o))
        if (typeof a == "string" && a === r) return s;
    }
    return r;
  }
  /** Maps a logical mode back to the user-facing display name from the
   *  helper's `mode_names` attribute. */
  modeLabel(e) {
    var r;
    const i = this._modeEntityId;
    if (i) {
      const o = N(this.hass, i), n = (r = o == null ? void 0 : o.attributes) == null ? void 0 : r.mode_names;
      if (n && typeof n == "object") {
        const s = n[e.toLowerCase()];
        if (typeof s == "string" && s) return s;
      }
    }
    return e;
  }
  // --- Render ---
  renderTimeline() {
    const e = this._config, { start: i, end: r } = this.resolvedTimeWindow(), o = r - i, n = this.blocksForDay(this._selectedDay), s = this.resolvedActiveColor(), a = this.resolvedActiveColorAlpha(0.3);
    this._tick;
    const c = this.nowMinutes(), d = this._selectedDay === (/* @__PURE__ */ new Date()).getDay(), u = e.show_now_indicator !== !1 && d && c >= i && c <= r, h = e.show_time_labels !== !1, _ = [];
    if (h) {
      const p = Math.ceil(i / 60), m = Math.floor(r / 60), f = o > 720 ? 6 : o > 360 ? 3 : 2;
      for (let g = p; g <= m; g += f) {
        const v = g * 60;
        v >= i && v <= r && _.push({ hour: g >= 24 ? 0 : g, pct: (v - i) / o * 100 });
      }
    }
    return y`
      <div class="timeline-container">
        ${h ? y`
              <div class="time-labels">
                ${_.map(
      (p) => y`<span class="time-label" style=${M({ left: `${p.pct}%` })}>${String(p.hour).padStart(2, "0")}</span>`
    )}
              </div>
            ` : E}
        <div class="timeline-track">
          ${n.map((p) => {
      const m = this.timeToMinutes(p.from), f = this.timeToMinutes(p.to), g = Math.max(m, i), v = Math.min(f, r);
      if (v <= g) return E;
      const b = (g - i) / o * 100, x = (v - g) / o * 100;
      return y`
              <div
                class="timeline-block"
                style=${M({
        left: `${b}%`,
        width: `${x}%`,
        "background-color": a
      })}
              ></div>
            `;
    })}
          ${u ? y`
                <div
                  class="now-indicator"
                  style=${M({
      left: `${(c - i) / o * 100}%`,
      "background-color": s
    })}
                ></div>
              ` : E}
        </div>
      </div>
    `;
  }
  renderDaySelector() {
    const e = (/* @__PURE__ */ new Date()).getDay();
    return y`
      <div class="day-selector">
        ${Ji.map((i, r) => y`
          <button
            type="button"
            class="day-btn ${r === this._selectedDay ? "active" : ""} ${r === e ? "today" : ""}"
            data-day=${r}
            @click=${this.handleDaySelect}
          >
            ${re(z(this.hass), r)}
          </button>
        `)}
      </div>
    `;
  }
  renderModeButton() {
    const e = this.modeValue(), i = e.toLowerCase(), r = i === "on" ? "mdi:power" : i === "off" ? "mdi:power-off" : "mdi:clock-outline", o = this.modeLabel(e);
    return y`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${e}">
        <ha-icon .icon=${r}></ha-icon>
        <span class="mode-label">${o}</span>
      </button>
    `;
  }
  /** Demo card for the dashboard card-picker preview (preview=true,
   *  no entity yet). Renders the regular layout with hardcoded mock
   *  blocks so users see what the card actually looks like. */
  _renderDemo() {
    const e = this._config, { start: i, end: r } = this.resolvedTimeWindow(), o = r - i, n = this.resolvedActiveColor(), s = this.resolvedActiveColorAlpha(0.3), a = this.nowMinutes(), c = e.show_now_indicator !== !1 && a >= i && a <= r, d = e.show_time_labels !== !1, u = e.show_day_selector !== !1, h = e.card_layout === "vertical", _ = [
      { startMin: 360, endMin: 510 },
      { startMin: 1020, endMin: 1320 }
    ], p = [];
    if (d) {
      const g = Math.ceil(i / 60), v = Math.floor(r / 60), b = o > 720 ? 6 : o > 360 ? 3 : 2;
      for (let x = g; x <= v; x += b) {
        const k = x * 60;
        k >= i && k <= r && p.push({ hour: x >= 24 ? 0 : x, pct: (k - i) / o * 100 });
      }
    }
    const m = (/* @__PURE__ */ new Date()).getDay(), f = z(this.hass);
    return y`
      <ha-card>
        <div class="container ${h ? "vertical" : "horizontal"}">
          <div class="row row-header">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${M(this.iconStyle(e.icon_color))}>
                  <ha-icon .icon=${e.icon ?? "mdi:clock-outline"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${e.name || l(f, "schedule.default_name")}</div>
                <div class="secondary">${e.subtitle || "Auto"}</div>
              </div>
              <button type="button" class="mode-btn" disabled>
                <ha-icon icon="mdi:clock-outline"></ha-icon>
                <span class="mode-label">Auto</span>
              </button>
            </div>
          </div>
          ${u ? y`
                <div class="row row-days">
                  <div class="day-selector">
                    ${Ji.map((g, v) => y`
                      <button type="button" class="day-btn ${v === m ? "active today" : ""}" disabled>
                        ${re(f, v)}
                      </button>
                    `)}
                  </div>
                </div>
              ` : E}
          <div class="row row-timeline">
            <div class="timeline-container">
              ${d ? y`
                    <div class="time-labels">
                      ${p.map(
      (g) => y`<span class="time-label" style=${M({ left: `${g.pct}%` })}>${String(g.hour).padStart(2, "0")}</span>`
    )}
                    </div>
                  ` : E}
              <div class="timeline-track">
                ${_.map((g) => {
      const v = (g.startMin - i) / o * 100, b = (g.endMin - g.startMin) / o * 100;
      return y`
                    <div class="timeline-block" style=${M({
        left: `${v}%`,
        width: `${b}%`,
        "background-color": s
      })}></div>
                  `;
    })}
                ${c ? y`
                      <div class="now-indicator" style=${M({
      left: `${(a - i) / o * 100}%`,
      "background-color": n
    })}></div>
                    ` : E}
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  render() {
    var p, m;
    if (!this._config) return y`<ha-card>${l(z(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return y``;
    if (!this._scheduleEntityId) {
      if (this.preview) return this._renderDemo();
      const f = z(this.hass);
      return y`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:clock-outline"></ha-icon>
            <div class="placeholder-text">${l(f, "schedule.placeholder_companion")}</div>
          </div>
        </ha-card>
      `;
    }
    const e = this._config, i = (m = (p = N(this.hass, this._scheduleEntityId)) == null ? void 0 : p.attributes) == null ? void 0 : m.friendly_name, r = this.modeValue(), o = e.subtitle || this.modeLabel(r), n = e.show_day_selector !== !1, s = e.show_mode_control !== !1 && !!this._modeEntityId, a = e.show_time_labels !== !1, c = e.card_layout === "vertical", d = !c && !n && !s && !a, h = this.isDeviceOn() ? this.iconStyle(e.icon_color) : this.iconStyle("disabled"), _ = y`
      <div class="state-item">
        <div class="icon-wrap">
          <div class="icon-shape" style=${M(h)}>
            <ha-icon .icon=${e.icon ?? "mdi:clock-outline"}></ha-icon>
          </div>
        </div>
        <div class="info">
          <div class="primary">${e.name || i || l(z(this.hass), "schedule.default_name")}</div>
          <div class="secondary">${o}</div>
        </div>
        ${s ? this.renderModeButton() : E}
      </div>
    `;
    return y`
      <ha-card>
        <div class="container ${c ? "vertical" : "horizontal"}${d ? " compact-inline" : ""}">
          <div class="row row-header">${_}</div>
          ${n ? y`<div class="row row-days">${this.renderDaySelector()}</div>` : E}
          <div class="row row-timeline">${this.renderTimeline()}</div>
        </div>
      </ha-card>
    `;
  }
};
Fr.styles = [
  ws,
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
let Ee = Fr;
st([
  I({ attribute: !1 })
], Ee.prototype, "hass");
st([
  I({ type: Boolean })
], Ee.prototype, "preview");
st([
  I({ type: Boolean })
], Ee.prototype, "editMode");
st([
  I({ reflect: !0, type: String })
], Ee.prototype, "layout");
st([
  C()
], Ee.prototype, "_config");
st([
  C()
], Ee.prototype, "_selectedDay");
st([
  C()
], Ee.prototype, "_tick");
customElements.get("power-pilz-schedule-card") || customElements.define("power-pilz-schedule-card", Ee);
var od = Object.defineProperty, de = (t, e, i, r) => {
  for (var o = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = s(e, i, o) || o);
  return o && od(e, i, o), o;
};
const pr = "power-pilz-event-schedule-edit-dialog", Qi = [
  { key: "monday", dayIndex: 1 },
  { key: "tuesday", dayIndex: 2 },
  { key: "wednesday", dayIndex: 3 },
  { key: "thursday", dayIndex: 4 },
  { key: "friday", dayIndex: 5 },
  { key: "saturday", dayIndex: 6 },
  { key: "sunday", dayIndex: 0 }
], Qt = 15, He = 1440;
function xn() {
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
const Vr = class Vr extends le {
  constructor() {
    super(...arguments), this.scheduleEntityId = "", this._events = xn(), this._uniformEvents = [], this._sameForAll = !1, this._loading = !0, this._saving = !1, this._dirty = !1, this._handleSave = async () => {
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
        const i = Qi.map((r) => this._events[r.key]).find((r) => Array.isArray(r) && r.length > 0);
        this._uniformEvents = i ? [...i] : [];
      }
      this._sameForAll = e, this._dirty = !0;
    }, this._handleTrackClick = (e) => {
      if (this._loading || this._loadError || e.target.closest(".pp-pin") || this._pinDrag) return;
      const i = e.currentTarget, r = i.dataset.day;
      if (!r) return;
      const o = this._pxToMin(i, e.clientX), n = this._eventsForDay(r);
      n.some((s) => Be(s.time) === o) || (n.push({ time: er(o) }), this._setEventsForDay(r, n));
    }, this._handleTrackPointerMove = (e) => {
      const i = e.currentTarget, r = i.dataset.day;
      if (this._pinDrag && e.pointerId === this._pinDrag.pointerId) {
        const o = i.getBoundingClientRect(), s = (e.clientX - this._pinDrag.anchorClientX) / o.width * He;
        let a = Math.round(s / Qt) * Qt;
        const c = -this._pinDrag.origMin, d = He - this._pinDrag.origMin;
        a < c && (a = c), a > d && (a = d), a !== this._pinDrag.deltaMin && (this._pinDrag = {
          ...this._pinDrag,
          deltaMin: a,
          moved: this._pinDrag.moved || a !== 0
        });
        return;
      }
      if (r) {
        const o = this._pxToMin(i, e.clientX);
        (!this._cursor || this._cursor.day !== r || this._cursor.min !== o) && (this._cursor = { day: r, min: o });
      }
    }, this._handleTrackPointerLeave = (e) => {
      this._pinDrag || (this._cursor = void 0);
    }, this._handlePinPointerDown = (e) => {
      if (e.button !== 0 || this._loading || this._loadError) return;
      const i = e.currentTarget, r = i.dataset.day, o = parseInt(i.dataset.index ?? "-1", 10);
      if (!r || o < 0) return;
      const n = i.parentElement;
      if (!n) return;
      const a = this._eventsForDay(r)[o];
      if (a) {
        e.preventDefault(), e.stopPropagation();
        try {
          n.setPointerCapture(e.pointerId);
        } catch {
        }
        this._pinDrag = {
          day: r,
          index: o,
          trackEl: n,
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
          time: $n(s.time),
          dataText: s.data ? JSON.stringify(s.data, null, 2) : ""
        };
        return;
      }
      const r = this._eventsForDay(i.day), o = r[i.index];
      if (o) {
        const n = i.origMin + i.deltaMin;
        if (!r.some((a, c) => c !== i.index && Be(a.time) === n)) {
          const a = { time: er(n) };
          o.data && (a.data = o.data), r[i.index] = a, this._setEventsForDay(i.day, r);
        }
      }
      setTimeout(() => {
        this._pinDrag = void 0;
      }, 0);
    }, this._handleEditTimeChange = (e) => {
      this._updateEditingField("time", $n(e.target.value));
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
    var i, r, o;
    const e = z(this.hass);
    try {
      const n = (r = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : r[this.scheduleEntityId];
      if (!n) {
        this._loadError = l(e, "event_schedule.edit_dialog.error_not_found", {
          entity: this.scheduleEntityId
        });
        return;
      }
      const s = (o = n.attributes) == null ? void 0 : o.week_events, a = xn();
      if (s && typeof s == "object" && !Array.isArray(s))
        for (const c of Object.keys(a)) {
          const d = s[c];
          Array.isArray(d) && (a[c] = d.filter((u) => u && typeof u == "object").map((u) => {
            const h = u, _ = { time: String(h.time ?? "00:00:00") };
            return h.data && typeof h.data == "object" && !Array.isArray(h.data) && (_.data = h.data), _;
          }));
        }
      this._events = a;
    } catch (n) {
      this._loadError = String((n == null ? void 0 : n.message) || n);
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
    const r = nd(i);
    this._sameForAll ? this._uniformEvents = r : this._events = { ...this._events, [e]: r }, this._dirty = !0;
  }
  // ------------------------------------------------------------
  // Click-to-insert interaction
  // ------------------------------------------------------------
  _pxToMin(e, i) {
    const r = e.getBoundingClientRect(), o = (i - r.left) / r.width, n = Math.max(0, Math.min(He, Math.round(o * He)));
    return Math.round(n / Qt) * Qt;
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
    const e = z(this.hass), { day: i, index: r, time: o, dataText: n } = this._editing, s = Be(o);
    if (isNaN(s)) {
      this._editing = { ...this._editing, error: l(e, "schedule.edit_dialog.err_time") };
      return;
    }
    let a;
    const c = n.trim();
    if (c)
      try {
        const _ = JSON.parse(c);
        if (typeof _ != "object" || _ === null || Array.isArray(_))
          throw new Error("not an object");
        a = _;
      } catch {
        this._editing = {
          ...this._editing,
          dataError: l(e, "schedule.edit_dialog.err_data")
        };
        return;
      }
    const d = this._eventsForDay(i);
    if (d.some((_, p) => p !== r && Be(_.time) === s)) {
      this._editing = { ...this._editing, error: l(e, "schedule.edit_dialog.err_overlap") };
      return;
    }
    const h = { time: er(s, o) };
    a && (h.data = a), d[r] = h, this._setEventsForDay(i, d), this._editing = void 0;
  }
  _deleteEditing() {
    if (!this._editing) return;
    const { day: e, index: i } = this._editing, r = this._eventsForDay(e).filter((o, n) => n !== i);
    this._setEventsForDay(e, r), this._editing = void 0;
  }
  _cancelEdit() {
    this._editing = void 0;
  }
  // ------------------------------------------------------------
  // Title + lifecycle
  // ------------------------------------------------------------
  _resolveTitle() {
    var i, r, o, n;
    if (this.dialogTitle) return this.dialogTitle;
    const e = z(this.hass);
    return ((n = (o = (r = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : r[this.scheduleEntityId]) == null ? void 0 : o.attributes) == null ? void 0 : n.friendly_name) ?? l(e, "event_schedule.edit_dialog.default_title");
  }
  willUpdate() {
    const e = this._resolveTitle();
    this.dialogTitle !== e && !this.dialogTitle && (this.dialogTitle = e);
  }
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  renderBody() {
    const e = z(this.hass);
    if (this._loading)
      return y`<div class="msg">${l(e, "common.loading") || "Loading…"}</div>`;
    if (this._loadError)
      return y`<div class="msg error">${this._loadError}</div>`;
    const i = this._sameForAll ? [{ key: "monday", label: l(e, "schedule.edit_dialog.all_days") }] : Qi.map((r) => ({ key: r.key, label: re(e, r.dayIndex) }));
    return y`
      <div class="editor">
        <div class="pp-toolbar">
          <label class="pp-toggle">
            <input
              type="checkbox"
              .checked=${this._sameForAll}
              @change=${this._toggleSameForAll}
            />
            <span>${l(e, "schedule.edit_dialog.same_for_all")}</span>
          </label>
        </div>
        <div class="hour-header">
          <div class="day-col"></div>
          <div class="hour-labels">
            ${[0, 6, 12, 18, 24].map(
      (r) => y`<span style=${M({ left: `${r / 24 * 100}%` })}>${String(r).padStart(2, "0")}</span>`
    )}
          </div>
        </div>
        ${i.map((r) => this._renderDayRow(r.key, r.label))}
        <div class="hint">${l(e, "event_schedule.edit_dialog.hint_v2")}</div>
      </div>
    `;
  }
  renderFooter() {
    const e = z(this.hass);
    return y`
      <button class="ppd-btn flat" @click=${() => this.close()} ?disabled=${this._saving}>
        ${l(e, "common.cancel")}
      </button>
      <button
        class="ppd-btn primary"
        @click=${this._handleSave}
        ?disabled=${this._saving || !this._dirty || !!this._loadError}
      >
        ${this._saving ? l(e, "common.saving") || "Saving…" : l(e, "common.save") || "Save"}
      </button>
    `;
  }
  renderInner() {
    var o;
    if (!this._editing) return E;
    const e = z(this.hass), i = this._editing, r = re(
      e,
      ((o = Qi.find((n) => n.key === i.day)) == null ? void 0 : o.dayIndex) ?? 0
    );
    return y`
      <div class="inner-backdrop" @click=${() => this._cancelEdit()}>
        <div class="inner-dialog" @click=${(n) => n.stopPropagation()}>
          <header>
            <h3>${l(e, "event_schedule.edit_dialog.edit_title", { day: r })}</h3>
            <button class="close-x" @click=${() => this._cancelEdit()} aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="inner-body">
            <label class="field">
              <span>${l(e, "event_schedule.edit_dialog.time")}</span>
              <input
                type="time"
                .value=${i.time.slice(0, 5)}
                @change=${this._handleEditTimeChange}
              />
            </label>
            <label class="field">
              <span>
                ${l(e, "schedule.edit_dialog.data")}
                <small>${l(e, "schedule.edit_dialog.data_help")}</small>
              </span>
              <textarea
                rows="4"
                spellcheck="false"
                .value=${i.dataText}
                @input=${this._handleEditDataChange}
              ></textarea>
              ${i.dataError ? y`<span class="err">${i.dataError}</span>` : E}
            </label>
            ${i.error ? y`<div class="err">${i.error}</div>` : E}
          </div>
          <footer>
            <button class="ppd-btn danger" @click=${() => this._deleteEditing()}>
              ${l(e, "schedule.edit_dialog.delete")}
            </button>
            <div class="spacer"></div>
            <button class="ppd-btn flat" @click=${() => this._cancelEdit()}>
              ${l(e, "common.cancel")}
            </button>
            <button class="ppd-btn primary" @click=${() => this._saveEdit()}>
              ${l(e, "common.save")}
            </button>
          </footer>
        </div>
      </div>
    `;
  }
  _renderDayRow(e, i) {
    var o;
    let r = E;
    if (((o = this._cursor) == null ? void 0 : o.day) === e && !this._pinDrag) {
      const n = this._cursor.min / He * 100;
      r = y`
        <div class="pp-cursor-chip" style=${M({ left: `${n}%` })}>
          ${Sn(this._cursor.min)}
        </div>
      `;
    }
    return y`
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
          ${this._eventsForDay(e).map((n, s) => {
      var h, _;
      const a = Be(n.time), c = ((h = this._pinDrag) == null ? void 0 : h.day) === e && this._pinDrag.index === s, d = c ? a + (((_ = this._pinDrag) == null ? void 0 : _.deltaMin) ?? 0) : a, u = d / He * 100;
      return y`
              <div
                class="pp-pin ${c ? "moving" : ""}"
                data-day=${e}
                data-index=${s}
                style=${M({ left: `${u}%` })}
                title="${Sn(d)}"
                @pointerdown=${this._handlePinPointerDown}
              ></div>
            `;
    })}
          ${r}
        </div>
      </div>
    `;
  }
};
Vr.styles = [
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
let q = Vr;
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
  const e = t.split(":"), i = parseInt(e[0] ?? "0", 10), r = parseInt(e[1] ?? "0", 10), o = parseInt(e[2] ?? "0", 10);
  return isNaN(i) || isNaN(r) ? 0 : i * 60 + r + (isNaN(o) ? 0 : o / 60);
}
function er(t, e) {
  const i = Math.max(0, Math.min(He, t)), r = Math.floor(i / 60), o = Math.floor(i % 60);
  let n = 0;
  if (e) {
    const s = e.split(":"), a = parseInt(s[2] ?? "0", 10);
    isNaN(a) || (n = a);
  }
  return r === 24 && o === 0 && n === 0 ? "24:00:00" : `${String(r).padStart(2, "0")}:${String(o).padStart(2, "0")}:${String(n).padStart(2, "0")}`;
}
function Sn(t) {
  const e = Math.max(0, Math.min(He, t)), i = Math.floor(e / 60), r = e % 60;
  return `${String(i).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function $n(t) {
  if (!t) return "00:00:00";
  const e = t.split(":"), i = (e[0] ?? "00").padStart(2, "0"), r = (e[1] ?? "00").padStart(2, "0"), o = (e[2] ?? "00").padStart(2, "0");
  return `${i}:${r}:${o}`;
}
function nd(t) {
  return t.filter((e) => typeof (e == null ? void 0 : e.time) == "string").slice().sort((e, i) => Be(e.time) - Be(i.time));
}
customElements.get(pr) || customElements.define(pr, q);
function sd(t) {
  if (!t.scheduleEntityId) return;
  const e = document.createElement(pr);
  e.hass = t.hass, e.scheduleEntityId = t.scheduleEntityId, t.title && (e.dialogTitle = t.title), document.body.appendChild(e);
}
var ad = Object.defineProperty, ld = Object.getOwnPropertyDescriptor, Pr = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? ld(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && ad(e, i, o), o;
};
let mi = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => this.labelMap()[t.name ?? ""] ?? t.name ?? "", this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM") return;
      const i = t.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i)) return;
      const r = { ...i };
      this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: { ...r, type: "custom:power-pilz-event-schedule-card" } },
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
    const t = z(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: l(t, "event_schedule.editor.section_entities"),
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
            helper: l(t, "event_schedule.editor.entity_help"),
            description: l(t, "event_schedule.editor.entity_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "event_schedule.editor.section_identity"),
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
        title: l(t, "event_schedule.editor.section_layout"),
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
                      { label: l(t, "event_schedule.editor.layout_horizontal"), value: "horizontal" },
                      { label: l(t, "event_schedule.editor.layout_vertical"), value: "vertical" }
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
                      { label: l(t, "event_schedule.editor.tw_24"), value: "24" },
                      { label: l(t, "event_schedule.editor.tw_12"), value: "12" },
                      { label: l(t, "event_schedule.editor.tw_6"), value: "6" }
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
        title: l(t, "event_schedule.editor.section_appearance"),
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
        title: l(t, "event_schedule.editor.section_display"),
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
        title: l(t, "event_schedule.editor.section_actions"),
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
    const t = z(this.hass);
    return {
      entity: l(t, "event_schedule.editor.entity"),
      name: l(t, "event_schedule.editor.name"),
      subtitle: l(t, "event_schedule.editor.subtitle"),
      icon: l(t, "event_schedule.editor.icon"),
      icon_color: l(t, "event_schedule.editor.icon_color"),
      card_layout: l(t, "event_schedule.editor.card_layout"),
      time_window: l(t, "event_schedule.editor.time_window"),
      active_color: l(t, "event_schedule.editor.active_color"),
      show_day_selector: l(t, "event_schedule.editor.show_day_selector"),
      show_mode_control: l(t, "event_schedule.editor.show_mode_control"),
      show_trigger_button: l(t, "event_schedule.editor.show_trigger_button"),
      show_now_indicator: l(t, "event_schedule.editor.show_now_indicator"),
      show_time_labels: l(t, "event_schedule.editor.show_time_labels"),
      tap_action: l(t, "event_schedule.editor.tap_action"),
      hold_action: l(t, "event_schedule.editor.hold_action"),
      double_tap_action: l(t, "event_schedule.editor.double_tap_action")
    };
  }
  render() {
    return !this.hass || !this._config ? E : y`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ze}
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
Pr([
  I({ attribute: !1 })
], mi.prototype, "hass", 2);
Pr([
  C()
], mi.prototype, "_config", 2);
mi = Pr([
  ce("power-pilz-event-schedule-card-editor")
], mi);
var cd = Object.defineProperty, at = (t, e, i, r) => {
  for (var o = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = s(e, i, o) || o);
  return o && cd(e, i, o), o;
};
const kn = "powerpilz-event-schedule-edit", tr = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
], Wr = class Wr extends L {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._selectedDay = (/* @__PURE__ */ new Date()).getDay(), this._tick = 0, this.handleDaySelect = (e) => {
      e.stopPropagation();
      const i = e.currentTarget;
      if (!(i instanceof HTMLElement)) return;
      const r = parseInt(i.dataset.day ?? "0", 10);
      this._selectedDay = r;
    }, this.handleModeChange = async (e) => {
      var c;
      e.stopPropagation();
      const i = this._modeEntityId;
      if (this.isEditorPreview() || !i) return;
      const r = N(this.hass, i);
      if (!r) return;
      const o = ((c = r.attributes) == null ? void 0 : c.options) ?? [];
      if (o.length === 0) return;
      const s = (o.indexOf(r.state) + 1) % o.length, a = i.split(".")[0];
      await this.hass.callService(a, "select_option", {
        entity_id: i,
        option: o[s]
      });
    }, this.handleTriggerNow = async (e) => {
      var n, s, a;
      e.stopPropagation();
      const i = this._scheduleEntityId;
      if (this.isEditorPreview() || !i) return;
      const r = (a = (s = (n = this.hass) == null ? void 0 : n.states) == null ? void 0 : s[i]) == null ? void 0 : a.attributes;
      if ((r == null ? void 0 : r.pulse_running) === !0) return;
      const o = r == null ? void 0 : r.pulse_blocked_until;
      if (typeof o == "string") {
        const c = Date.parse(o);
        if (Number.isFinite(c) && c > Date.now()) return;
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
      entity: Object.keys(i).find((n) => {
        var a;
        if (!n.startsWith("select.")) return !1;
        const s = (a = i[n]) == null ? void 0 : a.attributes;
        return (s == null ? void 0 : s.schedule_kind) === "events";
      }) ?? ""
    };
  }
  setConfig(e) {
    this._config = {
      ...e,
      entity: e.entity ?? "",
      icon: e.icon ?? "mdi:bell-ring-outline",
      name: e.name ?? l(z(this.hass), "event_schedule.default_name"),
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
    var s, a, c, d, u, h;
    const e = this.renderRoot.querySelector("ha-card");
    if (!e) return;
    (s = this._actionCleanup) == null || s.destroy();
    const i = !!((c = (a = this._config) == null ? void 0 : a.hold_action) != null && c.action) && this._config.hold_action.action !== "none", r = !((u = (d = this._config) == null ? void 0 : d.hold_action) != null && u.action), o = i || r, n = !!((h = this._config) != null && h.double_tap_action) && this._config.double_tap_action.action !== void 0 && this._config.double_tap_action.action !== "none";
    this._actionCleanup = ot(
      e,
      {
        onTap: () => this._fireAction("tap"),
        onHold: () => this._fireAction("hold"),
        onDoubleTap: () => this._fireAction("double_tap")
      },
      { hasHold: o, hasDoubleTap: n }
    );
  }
  _fireAction(e) {
    if (this.isEditorPreview() || !this._config) return;
    const i = `${e}_action`;
    let r = this._config[i];
    if (e === "tap" && (!r || !r.action)) {
      this._modeEntityId && this.handleModeChange(new Event("tap"));
      return;
    }
    if (e === "hold" && (!r || !r.action) && (r = { action: kn }), !(!r || !r.action || r.action === "none")) {
      if (r.action === kn) {
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
    !e || !this.hass || sd({ hass: this.hass, scheduleEntityId: e });
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
    var o, n, s;
    const e = this._scheduleEntityId;
    if (!e) return {};
    const i = (s = (n = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : n[e]) == null ? void 0 : s.attributes, r = i == null ? void 0 : i.week_events;
    return r && typeof r == "object" && !Array.isArray(r) ? r : {};
  }
  dayKey(e) {
    return tr[e] ?? "monday";
  }
  eventsForDay(e) {
    const r = this._weekEvents()[this.dayKey(e)];
    return Array.isArray(r) ? r : [];
  }
  timeToMinutes(e) {
    const i = (e || "").split(":"), r = parseInt(i[0] ?? "0", 10), o = parseInt(i[1] ?? "0", 10);
    return (isNaN(r) ? 0 : r) * 60 + (isNaN(o) ? 0 : o);
  }
  nowMinutes() {
    const e = /* @__PURE__ */ new Date();
    return e.getHours() * 60 + e.getMinutes();
  }
  resolvedTimeWindow() {
    var s;
    const e = ((s = this._config) == null ? void 0 : s.time_window) ?? "24";
    if (e === "24") return { start: 0, end: 1440 };
    const i = e === "12" ? 360 : 180, r = this.nowMinutes(), o = Math.max(0, r - i), n = Math.min(1440, r + i);
    return { start: o, end: n };
  }
  resolvedActiveColor() {
    var i;
    const e = _e((i = this._config) == null ? void 0 : i.active_color);
    return e ? `rgb(${e})` : "var(--primary-color, rgb(3, 169, 244))";
  }
  modeValue() {
    var n;
    const e = this._modeEntityId;
    if (!e) return "auto";
    const i = N(this.hass, e), r = (i == null ? void 0 : i.state) ?? "auto", o = (n = i == null ? void 0 : i.attributes) == null ? void 0 : n.mode_names;
    if (o && typeof o == "object") {
      for (const [s, a] of Object.entries(o))
        if (typeof a == "string" && a === r) return s;
    }
    return r;
  }
  modeLabel(e) {
    var r;
    const i = this._modeEntityId;
    if (i) {
      const o = N(this.hass, i), n = (r = o == null ? void 0 : o.attributes) == null ? void 0 : r.mode_names;
      if (n && typeof n == "object") {
        const s = n[e.toLowerCase()];
        if (typeof s == "string" && s) return s;
      }
    }
    return e;
  }
  renderTimeline() {
    const e = this._config, { start: i, end: r } = this.resolvedTimeWindow(), o = r - i, n = this.eventsForDay(this._selectedDay), s = this.resolvedActiveColor();
    this._tick;
    const a = this.nowMinutes(), c = this._selectedDay === (/* @__PURE__ */ new Date()).getDay(), d = e.show_now_indicator !== !1 && c && a >= i && a <= r, u = e.show_time_labels !== !1, h = [];
    if (u) {
      const _ = Math.ceil(i / 60), p = Math.floor(r / 60), m = o > 720 ? 6 : o > 360 ? 3 : 2;
      for (let f = _; f <= p; f += m) {
        const g = f * 60;
        g >= i && g <= r && h.push({ hour: f >= 24 ? 0 : f, pct: (g - i) / o * 100 });
      }
    }
    return y`
      <div class="timeline-container">
        ${u ? y`
              <div class="time-labels">
                ${h.map(
      (_) => y`<span class="time-label" style=${M({ left: `${_.pct}%` })}>${String(_.hour).padStart(2, "0")}</span>`
    )}
              </div>
            ` : E}
        <div class="timeline-track">
          ${n.map((_) => {
      const p = this.timeToMinutes(_.time);
      if (p < i || p > r) return E;
      const m = (p - i) / o * 100;
      return y`
              <div
                class="timeline-pin"
                style=${M({
        left: `${m}%`,
        "background-color": s
      })}
              ></div>
            `;
    })}
          ${d ? y`
                <div
                  class="now-indicator"
                  style=${M({
      left: `${(a - i) / o * 100}%`,
      "background-color": s
    })}
                ></div>
              ` : E}
        </div>
      </div>
    `;
  }
  renderDaySelector() {
    const e = (/* @__PURE__ */ new Date()).getDay();
    return y`
      <div class="day-selector">
        ${tr.map((i, r) => y`
          <button
            type="button"
            class="day-btn ${r === this._selectedDay ? "active" : ""} ${r === e ? "today" : ""}"
            data-day=${r}
            @click=${this.handleDaySelect}
          >
            ${re(z(this.hass), r)}
          </button>
        `)}
      </div>
    `;
  }
  renderModeButton() {
    const e = this.modeValue(), r = e.toLowerCase() === "off" ? "mdi:power-off" : "mdi:clock-outline", o = this.modeLabel(e);
    return y`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${e}">
        <ha-icon .icon=${r}></ha-icon>
        <span class="mode-label">${o}</span>
      </button>
    `;
  }
  /** Demo card for the dashboard card-picker preview (preview=true,
   *  no entity yet). */
  _renderDemo() {
    const e = this._config, { start: i, end: r } = this.resolvedTimeWindow(), o = r - i, n = this.resolvedActiveColor(), s = this.nowMinutes(), a = e.show_now_indicator !== !1 && s >= i && s <= r, c = e.show_time_labels !== !1, d = e.show_day_selector !== !1, u = e.card_layout === "vertical", h = [450, 720, 1155], _ = [];
    if (c) {
      const f = Math.ceil(i / 60), g = Math.floor(r / 60), v = o > 720 ? 6 : o > 360 ? 3 : 2;
      for (let b = f; b <= g; b += v) {
        const x = b * 60;
        x >= i && x <= r && _.push({ hour: b >= 24 ? 0 : b, pct: (x - i) / o * 100 });
      }
    }
    const p = (/* @__PURE__ */ new Date()).getDay(), m = z(this.hass);
    return y`
      <ha-card>
        <div class="container ${u ? "vertical" : "horizontal"}">
          <div class="row row-header">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${M(this.iconStyle(e.icon_color))}>
                  <ha-icon .icon=${e.icon ?? "mdi:bell-ring-outline"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${e.name || l(m, "event_schedule.default_name")}</div>
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
          ${d ? y`
                <div class="row row-days">
                  <div class="day-selector">
                    ${tr.map((f, g) => y`
                      <button type="button" class="day-btn ${g === p ? "active today" : ""}" disabled>
                        ${re(m, g)}
                      </button>
                    `)}
                  </div>
                </div>
              ` : E}
          <div class="row row-timeline">
            <div class="timeline-container">
              ${c ? y`
                    <div class="time-labels">
                      ${_.map(
      (f) => y`<span class="time-label" style=${M({ left: `${f.pct}%` })}>${String(f.hour).padStart(2, "0")}</span>`
    )}
                    </div>
                  ` : E}
              <div class="timeline-track">
                ${h.map((f) => {
      if (f < i || f > r) return E;
      const g = (f - i) / o * 100;
      return y`
                    <div class="timeline-pin" style=${M({
        left: `${g}%`,
        "background-color": n
      })}></div>
                  `;
    })}
                ${a ? y`
                      <div class="now-indicator" style=${M({
      left: `${(s - i) / o * 100}%`,
      "background-color": n
    })}></div>
                    ` : E}
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderTriggerNowButton() {
    var u, h, _;
    const e = this._scheduleEntityId, i = e ? (_ = (h = (u = this.hass) == null ? void 0 : u.states) == null ? void 0 : h[e]) == null ? void 0 : _.attributes : void 0, r = (i == null ? void 0 : i.pulse_running) === !0, o = i == null ? void 0 : i.pulse_blocked_until, n = typeof o == "string" ? Date.parse(o) : NaN, s = Number.isFinite(n) && n > Date.now(), a = r || s, c = z(this.hass);
    let d = l(c, "event_schedule.trigger_now");
    if (r)
      d = l(c, "event_schedule.trigger_now_blocked_running");
    else if (s) {
      const p = new Date(n), m = String(p.getHours()).padStart(2, "0"), f = String(p.getMinutes()).padStart(2, "0"), g = String(p.getSeconds()).padStart(2, "0");
      d = l(c, "event_schedule.trigger_now_blocked_cooldown", {
        time: `${m}:${f}:${g}`
      });
    }
    return y`
      <button
        type="button"
        class="trigger-now-btn"
        ?disabled=${a}
        @click=${this.handleTriggerNow}
        title=${d}
      >
        <ha-icon icon="mdi:play"></ha-icon>
      </button>
    `;
  }
  render() {
    var p, m;
    if (!this._config) return y`<ha-card>${l(z(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return y``;
    if (!this._scheduleEntityId) {
      if (this.preview) return this._renderDemo();
      const f = z(this.hass);
      return y`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:bell-ring-outline"></ha-icon>
            <div class="placeholder-text">${l(f, "event_schedule.placeholder")}</div>
          </div>
        </ha-card>
      `;
    }
    const e = this._config, i = (m = (p = N(this.hass, this._scheduleEntityId)) == null ? void 0 : p.attributes) == null ? void 0 : m.friendly_name, r = this.modeValue(), o = e.subtitle || this.modeLabel(r), n = e.show_day_selector !== !1, s = e.show_mode_control !== !1 && !!this._modeEntityId, a = e.show_trigger_button !== !1, c = e.show_time_labels !== !1, d = e.card_layout === "vertical", u = !d && !n && !s && !a && !c, h = this.iconStyle(e.icon_color), _ = y`
      <div class="state-item">
        <div class="icon-wrap">
          <div class="icon-shape" style=${M(h)}>
            <ha-icon .icon=${e.icon ?? "mdi:bell-ring-outline"}></ha-icon>
          </div>
        </div>
        <div class="info">
          <div class="primary">${e.name || i || l(z(this.hass), "event_schedule.default_name")}</div>
          <div class="secondary">${o}</div>
        </div>
        ${a ? this.renderTriggerNowButton() : E}
        ${s ? this.renderModeButton() : E}
      </div>
    `;
    return y`
      <ha-card>
        <div class="container ${d ? "vertical" : "horizontal"}${u ? " compact-inline" : ""}">
          <div class="row row-header">${_}</div>
          ${n ? y`<div class="row row-days">${this.renderDaySelector()}</div>` : E}
          <div class="row row-timeline">${this.renderTimeline()}</div>
        </div>
      </ha-card>
    `;
  }
};
Wr.styles = [
  ws,
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
let Ce = Wr;
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
var dd = Object.defineProperty, hd = Object.getOwnPropertyDescriptor, Ir = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? hd(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && dd(e, i, o), o;
};
let yi = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (t) => this.labelMap()[t.name ?? ""] ?? t.name ?? "", this.computeHelper = (t) => this.helperMap()[t.name ?? ""], this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM") return;
      const i = t.detail.value;
      !i || typeof i != "object" || Array.isArray(i) || this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: { ...i, type: "custom:power-pilz-timer-card" } },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(t) {
    const e = { ...t };
    delete e.use_companion, delete e.switch_entity, delete e.on_datetime_entity, delete e.off_datetime_entity, delete e.active_entity, this._config = {
      ...e,
      type: "custom:power-pilz-timer-card"
    };
  }
  buildSchema() {
    const t = z(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: l(t, "timer.editor.section_entities"),
        icon: "mdi:connection",
        expanded: !0,
        schema: [
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
            helper: l(t, "timer.editor.companion_help"),
            description: l(t, "timer.editor.companion_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "timer.editor.section_identity"),
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
                context: { icon_entity: "companion_entity" }
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
        title: l(t, "timer.editor.section_appearance"),
        icon: "mdi:palette-outline",
        expanded: !1,
        schema: [
          {
            name: "active_color",
            selector: { ui_color: { include_state: !1, include_none: !0, default_color: "primary" } },
            helper: l(t, "timer.editor.active_color_help"),
            description: l(t, "timer.editor.active_color_help")
          }
        ]
      }
    ];
  }
  labelMap() {
    const t = z(this.hass);
    return {
      companion_entity: l(t, "timer.editor.companion_entity"),
      name: l(t, "timer.editor.name"),
      subtitle: l(t, "timer.editor.subtitle"),
      icon: l(t, "timer.editor.icon"),
      icon_color: l(t, "timer.editor.icon_color"),
      active_color: l(t, "timer.editor.active_color")
    };
  }
  helperMap() {
    const t = z(this.hass);
    return {
      companion_entity: l(t, "timer.editor.companion_help"),
      active_color: l(t, "timer.editor.active_color_help")
    };
  }
  render() {
    return !this.hass || !this._config ? E : y`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ze}
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
Ir([
  I({ attribute: !1 })
], yi.prototype, "hass", 2);
Ir([
  C()
], yi.prototype, "_config", 2);
yi = Ir([
  ce("power-pilz-timer-card-editor")
], yi);
var ud = Object.defineProperty, ne = (t, e, i, r) => {
  for (var o = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = s(e, i, o) || o);
  return o && ud(e, i, o), o;
};
const En = "power-pilz-timer-picker-portal-style", ei = "powerpilz_companion";
function Cn(t) {
  const e = new Date(t.includes("T") ? t : t.replace(" ", "T"));
  return isNaN(e.getTime()) ? null : e;
}
const Ur = class Ur extends L {
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
    const i = (e == null ? void 0 : e.states) ?? {};
    return {
      type: "custom:power-pilz-timer-card",
      companion_entity: Object.keys(i).find((n) => {
        var a;
        if (!n.startsWith("switch.")) return !1;
        const s = (a = i[n]) == null ? void 0 : a.attributes;
        return typeof (s == null ? void 0 : s.target_entity) == "string" && ("on_datetime" in (s ?? {}) || "off_datetime" in (s ?? {}));
      }) ?? "",
      name: "Timer"
    };
  }
  setConfig(e) {
    const i = { ...e };
    delete i.use_companion, delete i.switch_entity, delete i.on_datetime_entity, delete i.off_datetime_entity, delete i.active_entity, this._config = {
      ...i,
      icon: e.icon ?? "mdi:timer-outline",
      name: e.name ?? l(z(this.hass), "timer.default_name")
    };
  }
  // ---------- Companion entity / attribute resolvers ----------
  get _activeEntityId() {
    var e;
    return (e = this._config) == null ? void 0 : e.companion_entity;
  }
  get _switchEntityId() {
    var o, n, s, a;
    const e = (o = this._config) == null ? void 0 : o.companion_entity;
    if (!e) return;
    const i = (s = (n = this.hass) == null ? void 0 : n.states) == null ? void 0 : s[e], r = (a = i == null ? void 0 : i.attributes) == null ? void 0 : a.target_entity;
    return typeof r == "string" ? r : void 0;
  }
  _companionAttr(e) {
    var r, o, n, s, a;
    const i = (r = this._config) == null ? void 0 : r.companion_entity;
    if (i)
      return (a = (s = (n = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : n[i]) == null ? void 0 : s.attributes) == null ? void 0 : a[e];
  }
  _getOnDatetime() {
    const e = this._companionAttr("on_datetime");
    return typeof e == "string" ? Cn(e) : null;
  }
  _getOffDatetime() {
    const e = this._companionAttr("off_datetime");
    return typeof e == "string" ? Cn(e) : null;
  }
  _direction() {
    const e = this._companionAttr("direction");
    return e === "on_only" || e === "off_only" ? e : "both";
  }
  _hasOnSupport() {
    return this._direction() !== "off_only";
  }
  _hasOffSupport() {
    var e;
    return this._direction() === "on_only" ? !1 : !!((e = this._config) != null && e.companion_entity);
  }
  _companionStateIcon() {
    const e = this._companionAttr("state_icons");
    if (!e || typeof e != "object") return;
    const i = this.isActive() ? "active" : "inactive", r = e[i];
    return typeof r == "string" && r ? r : void 0;
  }
  _companionStateName() {
    const e = this._companionAttr("state_names");
    if (!e || typeof e != "object") return;
    const i = this.isActive() ? "active" : "inactive", r = e[i];
    return typeof r == "string" && r ? r : void 0;
  }
  /** For select-target Companion timers, the label the user configured
   *  for the start-boundary option (e.g. "On" or "Boost"). Returns
   *  undefined for non-select targets. */
  _onOptionLabel() {
    const e = this._companionAttr("on_option_label");
    return typeof e == "string" && e ? e : void 0;
  }
  /** Label for the end-boundary option. Same caveats as above. */
  _offOptionLabel() {
    const e = this._companionAttr("off_option_label");
    return typeof e == "string" && e ? e : void 0;
  }
  /** Raw stored on/off option values on the companion (logical keys for
   *  Smart-Schedule targets, display names for generic selects). */
  _storedOnOption() {
    const e = this._companionAttr("on_option");
    return typeof e == "string" ? e : "";
  }
  _storedOffOption() {
    const e = this._companionAttr("off_option");
    return typeof e == "string" ? e : "";
  }
  /** True if the target is a select/input_select whose options the
   *  user can pick from in the picker. */
  _targetHasOptions() {
    var o, n, s;
    const e = this._switchEntityId;
    if (!e) return !1;
    const i = (n = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : n[e], r = (s = i == null ? void 0 : i.attributes) == null ? void 0 : s.options;
    return Array.isArray(r) && r.length > 0 && (e.startsWith("select.") || e.startsWith("input_select."));
  }
  /** Resolve a stored option value (logical key or display name) into
   *  the user-facing display name using the target's option list.
   *  Falls back to the value itself if not found. */
  _resolveOptionLabel(e) {
    var r;
    return e ? ((r = this._targetOptions().find((o) => o.value === e)) == null ? void 0 : r.label) ?? e : "";
  }
  /** Returns the selectable option pairs as [value, label] where value
   *  is what gets sent to set_timer (logical key for Smart Schedule,
   *  display name for generic selects) and label is the UI text. */
  _targetOptions() {
    var n, s, a, c;
    const e = this._switchEntityId;
    if (!e) return [];
    const i = (s = (n = this.hass) == null ? void 0 : n.states) == null ? void 0 : s[e];
    if (!i) return [];
    const r = (a = i.attributes) == null ? void 0 : a.options;
    if (!Array.isArray(r)) return [];
    const o = (c = i.attributes) == null ? void 0 : c.mode_names;
    if (o && typeof o == "object" && !Array.isArray(o)) {
      const d = /* @__PURE__ */ new Map();
      for (const [u, h] of Object.entries(o))
        typeof h == "string" && d.set(h, u);
      return r.map((u) => ({
        value: d.get(u) ?? u,
        label: u
      }));
    }
    return r.map((d) => ({
      value: d,
      label: d
    }));
  }
  _resolvedIcon() {
    var e;
    return this._companionStateIcon() ?? ((e = this._config) == null ? void 0 : e.icon) ?? "mdi:timer-outline";
  }
  async _writeOnDatetime(e, i) {
    var n;
    const r = (n = this._config) == null ? void 0 : n.companion_entity;
    if (!r) return;
    const o = {
      entity_id: r,
      on: e
    };
    i !== void 0 && (o.on_option = i), await this.hass.callService(ei, "set_timer", o);
  }
  async _writeOffDatetime(e, i) {
    var n;
    const r = (n = this._config) == null ? void 0 : n.companion_entity;
    if (!r) return;
    const o = {
      entity_id: r,
      off: e
    };
    i !== void 0 && (o.off_option = i), await this.hass.callService(ei, "set_timer", o);
  }
  /** Clear the on-boundary so it won't fire on the next activation.
   *  Passes an empty string to `set_timer` which the integration
   *  interprets as "clear this field". */
  async _clearOnDatetime() {
    var i;
    const e = (i = this._config) == null ? void 0 : i.companion_entity;
    e && await this.hass.callService(ei, "set_timer", {
      entity_id: e,
      on: ""
    });
  }
  /** Clear the off-boundary so it won't fire on the next activation. */
  async _clearOffDatetime() {
    var i;
    const e = (i = this._config) == null ? void 0 : i.companion_entity;
    e && await this.hass.callService(ei, "set_timer", {
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
    if (document.getElementById(En)) return;
    const e = document.createElement("style");
    e.id = En, e.textContent = `
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
    i.className = "pp-timer-portal", i.addEventListener("click", (r) => r.stopPropagation()), document.body.append(e), document.body.append(i), this._portalBackdrop = e, this._portal = i, this._portalScrollListener = () => this.positionPortal(), window.addEventListener("scroll", this._portalScrollListener, !0), window.addEventListener("resize", this._portalScrollListener), this.renderPortalContent(), this.positionPortal();
  }
  closePortal() {
    this._portal && (this._portal.remove(), this._portal = void 0), this._portalBackdrop && (this._portalBackdrop.remove(), this._portalBackdrop = void 0), this._portalScrollListener && (window.removeEventListener("scroll", this._portalScrollListener, !0), window.removeEventListener("resize", this._portalScrollListener), this._portalScrollListener = void 0);
  }
  renderPortalContent() {
    if (!this._portal) return;
    const e = z(this.hass);
    if (this._portal.replaceChildren(), this._confirmingCancel) {
      const w = document.createElement("div");
      w.className = "pp-label", w.textContent = l(e, "timer.cancel_title"), this._portal.append(w);
      const S = document.createElement("div");
      S.className = "pp-hint", S.textContent = l(e, "timer.cancel_hint"), this._portal.append(S);
      const $ = document.createElement("div");
      $.className = "pp-actions";
      const T = document.createElement("button");
      T.type = "button", T.className = "pp-act cancel", T.textContent = l(e, "timer.keep_timer"), T.addEventListener("click", () => this.handleDismissConfirm()), $.append(T);
      const A = document.createElement("button");
      A.type = "button", A.className = "pp-act danger", A.textContent = l(e, "timer.cancel_timer"), A.addEventListener("click", () => {
        this.handleConfirmCancel();
      }), $.append(A), this._portal.append($);
      return;
    }
    const i = this._targetHasOptions() ? this._resolveOptionLabel(this._pickOnOption) || this._onOptionLabel() : this._onOptionLabel(), r = this._targetHasOptions() ? this._resolveOptionLabel(this._pickOffOption) || this._offOptionLabel() : this._offOptionLabel(), o = i ? l(e, "timer.set_to_at", { option: i }) : l(e, "timer.turn_on_at"), n = r ? l(e, "timer.set_to_at", { option: r }) : l(e, "timer.turn_off_at_optional"), s = this._pickingOn ? o : n, a = this._pickingOn && this._hasOffSupport() && this._hasOnSupport(), c = this._pickingOff && this._hasOnSupport() && this._hasOffSupport() && !this._skippedOn, d = this._pickingOn ? r ? l(e, "timer.only_option", { option: r }) : l(e, "timer.only_off") : i ? l(e, "timer.only_option", { option: i }) : l(e, "timer.only_on"), u = this._pickingOn ? this.handleSkipOn : this.handleSkipOff, h = a || c, _ = this._pickingOn ? this.handleSetOn : this.handleSetOff, p = this.next7Days(), m = Array.from({ length: 24 }, (w, S) => S), f = document.createElement("div");
    f.className = "pp-label", f.textContent = s, this._portal.append(f);
    const g = document.createElement("div");
    g.className = "pp-days", p.forEach((w) => {
      const S = document.createElement("button");
      S.type = "button", S.className = `pp-day-btn ${w.day === this._pickDay ? "active" : ""}`, S.textContent = w.label, S.addEventListener("click", () => {
        this._pickDay = w.day, this.renderPortalContent();
      }), g.append(S);
    }), this._portal.append(g);
    const v = document.createElement("div");
    if (v.className = "pp-hours", m.forEach((w) => {
      const S = document.createElement("button");
      S.type = "button", S.className = `pp-hour-btn ${w === this._pickHour ? "active" : ""}`, S.textContent = String(w).padStart(2, "0"), S.addEventListener("click", () => {
        this._pickHour = w, this.renderPortalContent();
      }), v.append(S);
    }), this._portal.append(v), this._targetHasOptions()) {
      const w = document.createElement("div");
      w.className = "pp-option-row";
      const S = document.createElement("span");
      S.className = "pp-option-label", S.textContent = l(e, "timer.mode_label"), w.append(S);
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
    const b = document.createElement("div");
    b.className = "pp-actions";
    const x = document.createElement("button");
    if (x.type = "button", x.className = "pp-act cancel", x.textContent = l(e, "common.cancel"), x.addEventListener("click", () => this.handleCancelPick()), b.append(x), h) {
      const w = document.createElement("button");
      w.type = "button", w.className = "pp-act skip", w.textContent = d, w.addEventListener("click", () => {
        u();
      }), b.append(w);
    }
    const k = document.createElement("button");
    k.type = "button", k.className = "pp-act confirm", k.textContent = l(e, "common.set"), k.addEventListener("click", () => {
      _();
    }), b.append(k), this._portal.append(b);
  }
  positionPortal() {
    var p;
    const e = this._portal;
    if (!e) return;
    const i = (p = this.renderRoot) == null ? void 0 : p.querySelector("ha-card");
    if (!i) return;
    const r = i.getBoundingClientRect(), o = 8, n = 8;
    e.style.visibility = "hidden", e.style.left = "0", e.style.top = "0", e.style.width = `${Math.max(280, r.width)}px`;
    const s = e.offsetHeight, a = e.offsetWidth, c = window.innerHeight - r.bottom - o, d = r.top - o, u = c < s + n && d > c;
    let h = r.left;
    h = Math.max(o, Math.min(h, window.innerWidth - a - o));
    let _ = u ? r.top - n - s : r.bottom + n;
    _ = Math.max(o, Math.min(_, window.innerHeight - s - o)), e.style.left = `${Math.round(h)}px`, e.style.top = `${Math.round(_)}px`, e.style.visibility = "visible";
  }
  // --- Helpers ---
  isEditorPreview() {
    return this.preview || this.editMode;
  }
  isActive() {
    var e;
    return ((e = N(this.hass, this._activeEntityId)) == null ? void 0 : e.state) === "on";
  }
  switchIsOn() {
    var e;
    return ((e = N(this.hass, this._switchEntityId)) == null ? void 0 : e.state) === "on";
  }
  formatDatetime(e) {
    const i = z(this.hass), r = re(i, e.getDay()), o = String(e.getHours()).padStart(2, "0"), n = String(e.getMinutes()).padStart(2, "0");
    return `${r} ${o}:${n}`;
  }
  timeUntil(e) {
    const i = z(this.hass), r = e.getTime() - Date.now();
    if (r <= 0) return l(i, "timer.time_now");
    const o = Math.floor(r / 36e5), n = Math.floor(r % 36e5 / 6e4);
    if (o > 24) {
      const s = Math.floor(o / 24);
      return l(i, "timer.time_in_dh", { d: s, h: o % 24 });
    }
    return o > 0 ? l(i, "timer.time_in_hm", { h: o, m: n }) : l(i, "timer.time_in_m", { m: n });
  }
  next7Days() {
    const e = z(this.hass), i = [], r = /* @__PURE__ */ new Date();
    for (let o = 0; o < 7; o++) {
      const n = new Date(r);
      n.setDate(n.getDate() + o), n.setHours(0, 0, 0, 0);
      const s = o === 0 ? l(e, "common.today") : o === 1 ? l(e, "common.tomorrow") : re(e, n.getDay());
      i.push({ day: o, label: s, date: n });
    }
    return i;
  }
  buildDatetime(e, i) {
    const r = /* @__PURE__ */ new Date();
    r.setDate(r.getDate() + e), r.setHours(i, 0, 0, 0);
    const o = r.getFullYear(), n = String(r.getMonth() + 1).padStart(2, "0"), s = String(r.getDate()).padStart(2, "0");
    return `${o}-${n}-${s} ${String(i).padStart(2, "0")}:00:00`;
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
    const r = z(this.hass), o = this._companionStateName();
    if (!e)
      return o ?? (i ? l(r, "common.on") : l(r, "common.off"));
    const n = this._getOnDatetime(), s = this._getOffDatetime(), a = [];
    n && a.push(l(r, "timer.subtitle_on", { time: this.formatDatetime(n) })), s && a.push(l(r, "timer.subtitle_off", { time: this.formatDatetime(s) }));
    const c = a.join(" → ");
    return o && c ? `${o} · ${c}` : o || c || l(r, "timer.timer_active");
  }
  render() {
    var d, u, h, _;
    const e = z(this.hass);
    if (!this._config) return y`<ha-card>${l(e, "common.invalid_config")}</ha-card>`;
    if (!this.hass) return y``;
    if (!this._activeEntityId)
      return y`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:timer-outline"></ha-icon>
            <div class="placeholder-text">${l(e, "timer.placeholder_companion")}</div>
          </div>
        </ha-card>
      `;
    const i = this._config, r = this.isActive(), o = this.switchIsOn(), n = xe(o ? i.icon_color : "disabled"), s = ((u = (d = N(this.hass, this._switchEntityId)) == null ? void 0 : d.attributes) == null ? void 0 : u.friendly_name) ?? ((_ = (h = N(this.hass, this._activeEntityId)) == null ? void 0 : h.attributes) == null ? void 0 : _.friendly_name), a = i.subtitle || this.buildSubtitle(r, o), c = l(e, "timer.default_name");
    return y`
      <ha-card>
        <div class="container">
          <div class="state-item">
            <div class="icon-wrap">
              <div class="icon-shape" style=${M(n)}>
                <ha-icon .icon=${this._resolvedIcon()}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${i.name || s || c}</div>
              <div class="secondary">${a}</div>
            </div>
            ${r ? y`
                  <button type="button" class="action-btn active" @click=${this.handleBadgeClick} title=${l(e, "timer.cancel_timer")}>
                    <ha-icon icon="mdi:timer-sand"></ha-icon>
                    <span>${l(e, "common.active")}</span>
                  </button>
                ` : y`
                  <button type="button" class="action-btn set" @click=${this.handleOpenPicker} title=${l(e, "common.set")}>
                    <ha-icon icon="mdi:timer-plus-outline"></ha-icon>
                    <span>${l(e, "common.set")}</span>
                  </button>
                `}
          </div>
        </div>
      </ha-card>
    `;
  }
};
Ur.styles = Z`
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
let j = Ur;
ne([
  I({ attribute: !1 })
], j.prototype, "hass");
ne([
  I({ type: Boolean })
], j.prototype, "preview");
ne([
  I({ type: Boolean })
], j.prototype, "editMode");
ne([
  I({ reflect: !0, type: String })
], j.prototype, "layout");
ne([
  C()
], j.prototype, "_config");
ne([
  C()
], j.prototype, "_pickingOn");
ne([
  C()
], j.prototype, "_pickingOff");
ne([
  C()
], j.prototype, "_skippedOn");
ne([
  C()
], j.prototype, "_pickOnOption");
ne([
  C()
], j.prototype, "_pickOffOption");
ne([
  C()
], j.prototype, "_confirmingCancel");
ne([
  C()
], j.prototype, "_pickDay");
ne([
  C()
], j.prototype, "_pickHour");
class _d extends j {
}
customElements.get("power-pilz-timer-card") || customElements.define("power-pilz-timer-card", j);
customElements.get("power-pilz-timer-card-v2") || customElements.define("power-pilz-timer-card-v2", _d);
function mr(t, e) {
  if (t.length === 0) return "";
  if (t.length === 1) {
    const n = e(t[0]);
    return `M ${n.x} ${n.y}`;
  }
  const i = pd(t), r = [], o = e(t[0]);
  r.push(`M ${o.x} ${o.y}`);
  for (let n = 0; n < t.length - 1; n++) {
    const s = t[n], a = t[n + 1], c = a.x - s.x;
    if (c <= 0) {
      const _ = e(a);
      r.push(`L ${_.x} ${_.y}`);
      continue;
    }
    const d = e({ x: s.x + c / 3, y: s.y + i[n] * c / 3 }), u = e({ x: a.x - c / 3, y: a.y - i[n + 1] * c / 3 }), h = e(a);
    r.push(`C ${d.x} ${d.y}, ${u.x} ${u.y}, ${h.x} ${h.y}`);
  }
  return r.join(" ");
}
function pd(t) {
  const e = t.length;
  if (e < 2) return e === 1 ? [0] : [];
  const i = [], r = [];
  for (let n = 0; n < e - 1; n++) {
    const s = t[n + 1].x - t[n].x;
    i.push(s), r.push(s === 0 ? 0 : (t[n + 1].y - t[n].y) / s);
  }
  const o = new Array(e).fill(0);
  if (e === 2)
    return o[0] = r[0], o[1] = r[0], o;
  for (let n = 1; n < e - 1; n++)
    if (r[n - 1] === 0 || r[n] === 0 || r[n - 1] > 0 != r[n] > 0)
      o[n] = 0;
    else {
      const s = 2 * i[n] + i[n - 1], a = i[n] + 2 * i[n - 1];
      o[n] = (s + a) / (s / r[n - 1] + a / r[n]);
    }
  return o[0] = zn(i[0], i[1], r[0], r[1]), o[e - 1] = zn(i[e - 2], i[e - 3], r[e - 2], r[e - 3]), o;
}
function zn(t, e, i, r) {
  if (t + e === 0) return 0;
  let o = ((2 * t + e) * i - t * r) / (t + e);
  return o > 0 != i > 0 ? 0 : i > 0 != r > 0 && Math.abs(o) > Math.abs(3 * i) ? 3 * i : o;
}
var md = Object.defineProperty, J = (t, e, i, r) => {
  for (var o = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = s(e, i, o) || o);
  return o && md(e, i, o), o;
};
const yr = "power-pilz-heating-curve-edit-dialog", Ct = [
  { key: "monday", dayIndex: 1 },
  { key: "tuesday", dayIndex: 2 },
  { key: "wednesday", dayIndex: 3 },
  { key: "thursday", dayIndex: 4 },
  { key: "friday", dayIndex: 5 },
  { key: "saturday", dayIndex: 6 },
  { key: "sunday", dayIndex: 0 }
], se = 15, Fe = 1440, ti = 1e3, zt = 220, Ae = 30, Pe = 14, ir = 22;
function Tn() {
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
const jr = class jr extends le {
  constructor() {
    super(...arguments), this.curveEntityId = "", this._points = Tn(), this._uniformPoints = [], this._loading = !0, this._saving = !1, this._dirty = !1, this._sameForAll = !1, this._valueMin = 5, this._valueMax = 30, this._unit = "°C", this._handleSvgPointerDown = (e) => {
      if (this._loading || this._loadError || e.button !== 0) return;
      const i = e.currentTarget, r = i.dataset.day;
      if (!r) return;
      const n = e.target.closest("[data-point-index]");
      if (n) {
        const c = parseInt(
          n.dataset.pointIndex ?? "-1",
          10
        );
        if (c >= 0) {
          e.preventDefault();
          try {
            i.setPointerCapture(e.pointerId);
          } catch {
          }
          this._drag = {
            day: r,
            pointIndex: c,
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
      this._addPointAt(r, s, a);
    }, this._handleSvgPointerMove = (e) => {
      const i = e.currentTarget, r = i.dataset.day;
      if (this._drag && e.pointerId === this._drag.pointerId) {
        const o = e.clientX - this._drag.anchorClientX, n = e.clientY - this._drag.anchorClientY;
        if (!this._drag.moved && o * o + n * n < 16) return;
        this._drag.moved = !0;
        const { minutes: s, value: a } = this._svgToData(this._drag.svgEl, e.clientX, e.clientY);
        this._movePoint(this._drag.day, this._drag.pointIndex, s, a);
        return;
      }
      if (r) {
        const { minutes: o } = this._svgToData(i, e.clientX, e.clientY), n = Math.round(o / se) * se, s = Math.max(0, Math.min(Fe, n));
        (!this._cursor || this._cursor.day !== r || this._cursor.min !== s) && (this._cursor = { day: r, min: s });
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
      var n, s;
      e.stopPropagation();
      const i = e.currentTarget, r = (s = (n = i.parentElement) == null ? void 0 : n.parentElement) == null ? void 0 : s.dataset.day, o = parseInt(i.dataset.pointIndex ?? "-1", 10);
      !r || o < 0 || this._deletePoint(r, o);
    }, this._toggleSameForAll = () => {
      const e = !this._sameForAll;
      if (e) {
        const i = Ct.map((r) => this._points[r.key]).find((r) => Array.isArray(r) && r.length > 0);
        this._uniformPoints = i ? [...i] : [...this._points.monday];
      }
      this._sameForAll = e, this._dirty = !0;
    }, this._copyDay = (e) => {
      e.stopPropagation();
      const r = e.currentTarget.dataset.day;
      r && (this._clipboard = {
        source: r,
        points: this._pointsForDay(r).map((o) => ({ ...o }))
      });
    }, this._pasteDay = (e) => {
      e.stopPropagation();
      const r = e.currentTarget.dataset.day;
      !r || !this._clipboard || this._setPointsForDay(r, this._clipboard.points.map((o) => ({ ...o })));
    }, this._handleEditTimeChange = (e) => {
      if (!this._editing) return;
      const i = e.target.value;
      this._editing = { ...this._editing, time: gd(i), error: void 0 };
    }, this._handleEditValueChange = (e) => {
      if (!this._editing) return;
      const i = e.target.value, r = parseFloat(i);
      this._editing = {
        ...this._editing,
        value: Number.isFinite(r) ? r : this._editing.value,
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
    var i, r;
    const e = z(this.hass);
    try {
      const o = (r = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : r[this.curveEntityId];
      if (!o) {
        this._loadError = l(e, "heating_curve.edit_dialog.error_not_found", {
          entity: this.curveEntityId
        });
        return;
      }
      const n = o.attributes ?? {}, s = n.week_points, a = Tn();
      if (s && typeof s == "object" && !Array.isArray(s))
        for (const p of Object.keys(a)) {
          const m = s[p];
          Array.isArray(m) && (a[p] = m.filter((f) => !!f && typeof f == "object").map((f) => ({
            time: String(f.time ?? "00:00:00"),
            value: typeof f.value == "number" ? f.value : Number(f.value)
          })).filter((f) => Number.isFinite(f.value)).sort((f, g) => he(f.time) - he(g.time)));
        }
      this._points = a;
      const c = Number(n.value_min), d = Number(n.value_max);
      Number.isFinite(c) && (this._valueMin = c), Number.isFinite(d) && d > this._valueMin && (this._valueMax = d), typeof n.unit == "string" && (this._unit = n.unit);
      const u = (this._valueMin + this._valueMax) / 2;
      let h = !1;
      for (const p of Object.keys(this._points))
        this._points[p].length === 0 && (this._points[p] = [{ time: "12:00:00", value: ii(u) }], h = !0);
      h && (this._dirty = !0), Ct.every(
        (p) => fd(this._points[p.key], this._points.monday)
      ) && this._points.monday.length > 0 ? (this._sameForAll = !0, this._uniformPoints = [...this._points.monday]) : (this._sameForAll = n.same_for_all_days === !0, this._sameForAll && (this._uniformPoints = [...this._points.monday]));
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
    const r = [...i].sort((o, n) => he(o.time) - he(n.time));
    this._sameForAll ? this._uniformPoints = r : this._points = { ...this._points, [e]: r }, this._dirty = !0;
  }
  _addPointAt(e, i, r) {
    const o = Math.round(i / se) * se, n = rr(o), s = ii(this._clamp(r)), a = this._pointsForDay(e);
    a.some((c) => c.time === n) || (a.push({ time: n, value: s }), this._setPointsForDay(e, a));
  }
  _movePoint(e, i, r, o) {
    const n = this._pointsForDay(e);
    if (i < 0 || i >= n.length) return;
    const s = Math.round(r / se) * se, a = i > 0 ? he(n[i - 1].time) + se : 0, c = i < n.length - 1 ? he(n[i + 1].time) - se : Fe, d = Math.max(a, Math.min(c, s));
    n[i] = {
      time: rr(d),
      value: ii(this._clamp(o))
    }, this._setPointsForDay(e, n);
  }
  _deletePoint(e, i) {
    const r = this._pointsForDay(e);
    r.length <= 1 || this._setPointsForDay(e, r.filter((o, n) => n !== i));
  }
  _clamp(e) {
    return Math.max(this._valueMin, Math.min(this._valueMax, e));
  }
  // ------------------------------------------------------------
  // Coordinate mapping
  // ------------------------------------------------------------
  _svgToData(e, i, r) {
    const o = e.createSVGPoint();
    o.x = i, o.y = r;
    const n = e.getScreenCTM(), s = n ? o.matrixTransform(n.inverse()) : { x: 0, y: 0 }, a = ti - 2 * Ae, c = zt - Pe - ir, d = Math.max(0, Math.min(a, s.x - Ae)), u = Math.max(0, Math.min(c, s.y - Pe)), h = d / a * Fe, _ = this._valueMax - u / c * (this._valueMax - this._valueMin);
    return { minutes: h, value: _ };
  }
  _saveEdit() {
    if (!this._editing) return;
    const e = z(this.hass), { day: i, index: r, time: o, value: n } = this._editing, s = he(o);
    if (!Number.isFinite(s)) {
      this._editing = { ...this._editing, error: l(e, "heating_curve.edit_dialog.err_time") };
      return;
    }
    const a = this._pointsForDay(i), c = Math.round(s / se) * se, d = r > 0 ? he(a[r - 1].time) + se : 0, u = r < a.length - 1 ? he(a[r + 1].time) - se : Fe;
    if (c < d || c > u) {
      this._editing = { ...this._editing, error: l(e, "heating_curve.edit_dialog.err_overlap") };
      return;
    }
    a[r] = { time: rr(c), value: ii(this._clamp(n)) }, this._setPointsForDay(i, a), this._editing = void 0;
  }
  _deleteEditing() {
    if (!this._editing) return;
    const e = z(this.hass), { day: i, index: r } = this._editing, o = this._pointsForDay(i);
    if (o.length <= 1) {
      this._editing = { ...this._editing, error: l(e, "heating_curve.edit_dialog.err_last_point") };
      return;
    }
    this._setPointsForDay(i, o.filter((n, s) => s !== r)), this._editing = void 0;
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
    var i, r, o, n;
    if (this.dialogTitle) return this.dialogTitle;
    const e = z(this.hass);
    return ((n = (o = (r = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : r[this.curveEntityId]) == null ? void 0 : o.attributes) == null ? void 0 : n.friendly_name) ?? l(e, "heating_curve.edit_dialog.default_title");
  }
  renderBody() {
    const e = z(this.hass);
    if (this._loading) return y`<div class="msg">${l(e, "common.loading") || "Loading…"}</div>`;
    if (this._loadError) return y`<div class="msg error">${this._loadError}</div>`;
    const i = this._sameForAll ? [Ct[0]] : Ct;
    return y`
      <div class="hc-toolbar">
        <label class="hc-toggle">
          <input
            type="checkbox"
            .checked=${this._sameForAll}
            @change=${this._toggleSameForAll}
          />
          <span>${l(e, "heating_curve.edit_dialog.same_for_all")}</span>
        </label>
        <span class="hc-range">
          ${l(e, "heating_curve.edit_dialog.range_label")}: ${this._valueMin}${this._unit} – ${this._valueMax}${this._unit}
        </span>
      </div>
      <div class="hc-editor">
        ${i.map((r) => this._renderDayRow(r.key, r.dayIndex, e))}
      </div>
      <div class="hint">${l(e, "heating_curve.edit_dialog.hint")}</div>
    `;
  }
  renderFooter() {
    const e = z(this.hass);
    return y`
      <button class="ppd-btn flat" @click=${() => this.close()} ?disabled=${this._saving}>
        ${l(e, "common.cancel")}
      </button>
      <button
        class="ppd-btn primary"
        @click=${this._handleSave}
        ?disabled=${this._saving || !this._dirty || !!this._loadError}
      >
        ${this._saving ? l(e, "common.saving") || "Saving…" : l(e, "common.save") || "Save"}
      </button>
    `;
  }
  renderInner() {
    var n;
    if (!this._editing) return E;
    const e = z(this.hass), i = this._editing, r = this._sameForAll ? l(e, "heating_curve.edit_dialog.all_days") : re(e, ((n = Ct.find((s) => s.key === i.day)) == null ? void 0 : n.dayIndex) ?? 0), o = this._pointsForDay(i.day).length > 1;
    return y`
      <div class="inner-backdrop" @click=${() => this._cancelEdit()}>
        <div class="inner-dialog" @click=${(s) => s.stopPropagation()}>
          <header>
            <h3>${l(e, "heating_curve.edit_dialog.edit_title", { day: r })}</h3>
            <button class="close-x" @click=${() => this._cancelEdit()} aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="inner-body">
            <label class="field">
              <span>${l(e, "heating_curve.edit_dialog.time")}</span>
              <input
                type="time"
                .value=${i.time.slice(0, 5)}
                @change=${this._handleEditTimeChange}
              />
            </label>
            <label class="field">
              <span>${l(e, "heating_curve.edit_dialog.value")} (${this._unit})</span>
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
            ${i.error ? y`<div class="err">${i.error}</div>` : E}
          </div>
          <footer>
            <button
              class="ppd-btn danger"
              @click=${() => this._deleteEditing()}
              ?disabled=${!o}
            >
              ${l(e, "heating_curve.edit_dialog.delete")}
            </button>
            <div class="spacer"></div>
            <button class="ppd-btn flat" @click=${() => this._cancelEdit()}>
              ${l(e, "common.cancel")}
            </button>
            <button class="ppd-btn primary" @click=${() => this._saveEdit()}>
              ${l(e, "common.save")}
            </button>
          </footer>
        </div>
      </div>
    `;
  }
  _renderDayRow(e, i, r) {
    var v, b;
    const o = this._pointsForDay(e), n = this._sameForAll ? l(r, "heating_curve.edit_dialog.all_days") : re(r, i), s = ti - 2 * Ae, a = zt - Pe - ir, c = Math.max(1e-4, this._valueMax - this._valueMin), d = (x) => ({
      x: Ae + x.x / Fe * s,
      y: Pe + (1 - (x.y - this._valueMin) / c) * a
    }), u = o.map((x) => ({ x: he(x.time), y: x.value })).sort((x, k) => x.x - k.x), h = mr(u, d), _ = ((v = this._cursor) == null ? void 0 : v.day) === e && !this._drag, p = _ ? Ae + this._cursor.min / Fe * s : 0, m = _ ? p / ti * 100 : 0, f = !!this._clipboard, g = ((b = this._clipboard) == null ? void 0 : b.source) === e;
    return y`
      <div class="hc-row">
        <div class="hc-row-head">
          <span class="hc-day">${n}</span>
          <div class="hc-row-actions">
            <button
              class="ppd-btn flat tiny"
              data-day=${e}
              @click=${this._copyDay}
              title=${l(r, "heating_curve.edit_dialog.copy")}
            >
              <ha-icon icon="mdi:content-copy"></ha-icon>
            </button>
            <button
              class="ppd-btn flat tiny"
              data-day=${e}
              @click=${this._pasteDay}
              ?disabled=${!f || g}
              title=${l(r, "heating_curve.edit_dialog.paste")}
            >
              <ha-icon icon="mdi:content-paste"></ha-icon>
            </button>
          </div>
        </div>
        <div class="hc-svg-wrap">
          ${_ ? y`<div class="pp-cursor-chip" style=${M({ left: `${m}%` })}>
                ${yd(this._cursor.min)}
              </div>` : E}
        <svg
          class="hc-svg"
          viewBox="0 0 ${ti} ${zt}"
          preserveAspectRatio="none"
          data-day=${e}
          @pointerdown=${this._handleSvgPointerDown}
          @pointermove=${this._handleSvgPointerMove}
          @pointerup=${this._handleSvgPointerUp}
          @pointercancel=${this._handleSvgPointerUp}
          @pointerleave=${this._handleSvgPointerLeave}
        >
          ${this._renderGrid(s, a)}
          ${_ ? be`
            <line
              x1=${p} x2=${p}
              y1=${Pe} y2=${zt - ir}
              stroke="var(--primary-text-color)"
              stroke-width="0.8"
              stroke-dasharray="2 2"
              opacity="0.4"
              pointer-events="none"
            />
          ` : E}
          ${h ? be`<path d=${h}
                fill="none"
                stroke="var(--primary-color, #03a9f4)"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                vector-effect="non-scaling-stroke"
              />` : E}
          ${o.map((x, k) => {
      const w = d({ x: he(x.time), y: x.value });
      return be`
              <g class="hc-point-grp">
                <circle
                  data-point-index=${k}
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
                  x=${w.x} y=${zt - 4}
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
    const r = [0, 6, 12, 18, 24], o = 4;
    return be`
      ${r.map((n) => {
      const s = Ae + n / 24 * e;
      return be`
          <line x1=${s} x2=${s}
            y1=${Pe} y2=${Pe + i}
            stroke="rgba(127,127,127,0.18)" stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
          <text x=${s} y=${Pe - 4}
            text-anchor="middle" class="hc-axis-label"
          >${String(n).padStart(2, "0")}</text>`;
    })}
      ${Array.from({ length: o + 1 }, (n, s) => {
      const a = s / o, c = Pe + a * i, d = this._valueMax - a * (this._valueMax - this._valueMin);
      return be`
          <line x1=${Ae} x2=${Ae + e}
            y1=${c} y2=${c}
            stroke="rgba(127,127,127,0.12)" stroke-width="1"
            stroke-dasharray=${s === 0 || s === o ? "0" : "2 4"}
            vector-effect="non-scaling-stroke"
          />
          <text x=${Ae - 4} y=${c + 3}
            text-anchor="end" class="hc-axis-label"
          >${d.toFixed(0)}</text>`;
    })}
    `;
  }
};
jr.styles = [
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
let V = jr;
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
  const e = t.split(":"), i = parseInt(e[0] ?? "0", 10), r = parseInt(e[1] ?? "0", 10);
  return isNaN(i) || isNaN(r) ? 0 : i * 60 + r;
}
function rr(t) {
  const e = Math.max(0, Math.min(Fe, Math.round(t))), i = Math.floor(e / 60), r = e % 60;
  return i === 24 && r === 0 ? "24:00:00" : `${String(i).padStart(2, "0")}:${String(r).padStart(2, "0")}:00`;
}
function yd(t) {
  const e = Math.max(0, Math.min(Fe, Math.round(t))), i = Math.floor(e / 60), r = e % 60;
  return `${String(i).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function ii(t) {
  return Math.round(t * 10) / 10;
}
function gd(t) {
  if (!t) return "00:00:00";
  const e = t.split(":"), i = (e[0] ?? "00").padStart(2, "0"), r = (e[1] ?? "00").padStart(2, "0"), o = (e[2] ?? "00").padStart(2, "0");
  return `${i}:${r}:${o}`;
}
function fd(t, e) {
  if (t.length !== e.length) return !1;
  for (let i = 0; i < t.length; i += 1)
    if (t[i].time !== e[i].time || t[i].value !== e[i].value) return !1;
  return !0;
}
customElements.get(yr) || customElements.define(yr, V);
function bd(t) {
  if (!t.curveEntityId) return;
  const e = document.createElement(yr);
  e.hass = t.hass, e.curveEntityId = t.curveEntityId, t.title && (e.dialogTitle = t.title), document.body.appendChild(e);
}
var vd = Object.defineProperty, wd = Object.getOwnPropertyDescriptor, Dr = (t, e, i, r) => {
  for (var o = r > 1 ? void 0 : r ? wd(e, i) : e, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = (r ? s(e, i, o) : s(o)) || o);
  return r && o && vd(e, i, o), o;
};
let gi = class extends L {
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
    const t = z(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: l(t, "heating_curve.editor.section_entities"),
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
            helper: l(t, "heating_curve.editor.entity_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: l(t, "heating_curve.editor.section_identity"),
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
        title: l(t, "heating_curve.editor.section_appearance"),
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
        title: l(t, "heating_curve.editor.section_display"),
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
        title: l(t, "heating_curve.editor.section_actions"),
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
    const t = z(this.hass);
    return {
      entity: l(t, "heating_curve.editor.entity"),
      name: l(t, "heating_curve.editor.name"),
      subtitle: l(t, "heating_curve.editor.subtitle"),
      icon: l(t, "heating_curve.editor.icon"),
      icon_color: l(t, "heating_curve.editor.icon_color"),
      active_color: l(t, "heating_curve.editor.active_color"),
      show_day_selector: l(t, "heating_curve.editor.show_day_selector"),
      show_mode_control: l(t, "heating_curve.editor.show_mode_control"),
      show_now_indicator: l(t, "heating_curve.editor.show_now_indicator"),
      show_time_labels: l(t, "heating_curve.editor.show_time_labels"),
      tap_action: l(t, "heating_curve.editor.tap_action"),
      hold_action: l(t, "heating_curve.editor.hold_action"),
      double_tap_action: l(t, "heating_curve.editor.double_tap_action")
    };
  }
  render() {
    return !this.hass || !this._config ? E : y`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ze}
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
Dr([
  I({ attribute: !1 })
], gi.prototype, "hass", 2);
Dr([
  C()
], gi.prototype, "_config", 2);
gi = Dr([
  ce("power-pilz-heating-curve-card-editor")
], gi);
var xd = Object.defineProperty, ft = (t, e, i, r) => {
  for (var o = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (o = s(e, i, o) || o);
  return o && xd(e, i, o), o;
};
const Mn = "powerpilz-heating-curve-edit", An = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
], Kr = class Kr extends L {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._selectedDay = (/* @__PURE__ */ new Date()).getDay(), this._tick = 0, this.handleDaySelect = (e) => {
      e.stopPropagation();
      const i = e.currentTarget;
      if (!(i instanceof HTMLElement)) return;
      const r = parseInt(i.dataset.day ?? "0", 10);
      this._selectedDay = r;
    }, this.handleModeChange = async (e) => {
      var c;
      e.stopPropagation();
      const i = this._entityId;
      if (this.isEditorPreview() || !i) return;
      const r = N(this.hass, i);
      if (!r) return;
      const o = ((c = r.attributes) == null ? void 0 : c.options) ?? [];
      if (o.length === 0) return;
      const s = (o.indexOf(r.state) + 1) % o.length, a = i.split(".")[0];
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
        const n = (s = i[o]) == null ? void 0 : s.attributes;
        return !!(n != null && n.mode_names) && (n == null ? void 0 : n.week_points) !== void 0;
      }) ?? ""
    };
  }
  setConfig(e) {
    this._config = {
      ...e,
      icon: e.icon ?? "mdi:chart-bell-curve-cumulative",
      name: e.name ?? l(z(this.hass), "heating_curve.default_name"),
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
    var s, a, c, d, u, h;
    const e = this.renderRoot.querySelector("ha-card");
    if (!e) return;
    (s = this._actionCleanup) == null || s.destroy();
    const i = !!((c = (a = this._config) == null ? void 0 : a.hold_action) != null && c.action) && this._config.hold_action.action !== "none", r = !((u = (d = this._config) == null ? void 0 : d.hold_action) != null && u.action), o = i || r, n = !!((h = this._config) != null && h.double_tap_action) && this._config.double_tap_action.action !== void 0 && this._config.double_tap_action.action !== "none";
    this._actionCleanup = ot(
      e,
      {
        onTap: () => this._fireAction("tap"),
        onHold: () => this._fireAction("hold"),
        onDoubleTap: () => this._fireAction("double_tap")
      },
      { hasHold: o, hasDoubleTap: n }
    );
  }
  _fireAction(e) {
    if (this.isEditorPreview() || !this._config) return;
    const i = `${e}_action`;
    let r = this._config[i];
    if (e === "tap" && (!r || !r.action)) {
      this._entityId && this.handleModeChange(new Event("tap"));
      return;
    }
    if (e === "hold" && (!r || !r.action) && (r = { action: Mn }), !(!r || !r.action || r.action === "none")) {
      if (r.action === Mn) {
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
    !e || !this.hass || bd({ hass: this.hass, curveEntityId: e });
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
    var i, r, o;
    const e = this._entityId;
    if (e)
      return (o = (r = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : r[e]) == null ? void 0 : o.attributes;
  }
  _weekPoints() {
    const e = this._entityAttrs(), i = e == null ? void 0 : e.week_points;
    return i && typeof i == "object" && !Array.isArray(i) ? i : {};
  }
  _valueRange() {
    const e = this._entityAttrs(), i = Number(e == null ? void 0 : e.value_min), r = Number(e == null ? void 0 : e.value_max);
    return {
      min: Number.isFinite(i) ? i : 5,
      max: Number.isFinite(r) ? r : 30
    };
  }
  _unit() {
    var i;
    const e = (i = this._entityAttrs()) == null ? void 0 : i.unit;
    return typeof e == "string" ? e : "°C";
  }
  _dayKey(e) {
    return An[e] ?? "monday";
  }
  _pointsForDay(e) {
    const r = this._weekPoints()[this._dayKey(e)];
    return Array.isArray(r) ? r.map((o) => ({
      x: this._timeToMin(String(o.time ?? "00:00:00")),
      y: typeof o.value == "number" ? o.value : Number(o.value)
    })).filter((o) => Number.isFinite(o.x) && Number.isFinite(o.y)).sort((o, n) => o.x - n.x) : [];
  }
  _timeToMin(e) {
    const i = e.split(":"), r = parseInt(i[0] ?? "0", 10), o = parseInt(i[1] ?? "0", 10);
    return (isNaN(r) ? 0 : r) * 60 + (isNaN(o) ? 0 : o);
  }
  _nowMin() {
    const e = /* @__PURE__ */ new Date();
    return e.getHours() * 60 + e.getMinutes();
  }
  _resolvedActiveColor() {
    var i;
    const e = _e((i = this._config) == null ? void 0 : i.active_color);
    return e ? `rgb(${e})` : "var(--primary-color, rgb(3, 169, 244))";
  }
  _modeValue() {
    var n;
    const e = this._entityId;
    if (!e) return "auto";
    const i = N(this.hass, e), r = (i == null ? void 0 : i.state) ?? "auto", o = (n = i == null ? void 0 : i.attributes) == null ? void 0 : n.mode_names;
    if (o && typeof o == "object") {
      for (const [s, a] of Object.entries(o))
        if (typeof a == "string" && a === r) return s;
    }
    return r;
  }
  _modeLabel(e) {
    var r;
    const i = this._entityId;
    if (i) {
      const o = N(this.hass, i), n = (r = o == null ? void 0 : o.attributes) == null ? void 0 : r.mode_names;
      if (n && typeof n == "object") {
        const s = n[e.toLowerCase()];
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
    const i = this._pointsForDay(this._selectedDay), { min: r, max: o } = this._valueRange(), n = this._resolvedActiveColor(), s = this._selectedDay === (/* @__PURE__ */ new Date()).getDay(), a = e.show_now_indicator !== !1 && s, c = this._nowMin(), d = [];
    if (i.length > 0) {
      i[0].x > 0 && d.push({ x: 0, y: i[0].y }), d.push(...i);
      const b = i[i.length - 1];
      b.x < 1440 && d.push({ x: 1440, y: b.y });
    }
    const u = 1e3, h = 80, _ = Math.max(1e-4, o - r), m = mr(d, (b) => ({
      x: b.x / 1440 * u,
      y: (1 - (b.y - r) / _) * h
    })), f = d.length >= 2 ? `${m} L ${u} ${h} L 0 ${h} Z` : "", g = e.show_time_labels !== !1, v = g ? Pn() : [];
    return y`
      <div class="curve-container">
        ${g ? y`
              <div class="time-labels">
                ${v.map(
      (b) => y`<span class="time-label" style=${M({ left: `${b.pct}%` })}>${String(b.hour).padStart(2, "0")}</span>`
    )}
              </div>
            ` : E}
        <svg
          viewBox="0 0 ${u} ${h}"
          preserveAspectRatio="none"
          class="curve-svg"
        >
          ${d.length >= 2 && f ? be`
            <path d=${f} fill=${n} fill-opacity="0.18" />
          ` : E}
          ${m ? be`
            <path d=${m}
              fill="none"
              stroke=${n}
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
            />
          ` : E}
          ${a ? be`
            <line
              x1=${c / 1440 * u}
              x2=${c / 1440 * u}
              y1="0" y2=${h}
              stroke=${n}
              stroke-width="1.5"
              stroke-dasharray="3 3"
              vector-effect="non-scaling-stroke"
            />
          ` : E}
        </svg>
      </div>
    `;
  }
  renderDaySelector() {
    const e = (/* @__PURE__ */ new Date()).getDay();
    return y`
      <div class="day-selector">
        ${An.map((i, r) => y`
          <button
            type="button"
            class="day-btn ${r === this._selectedDay ? "active" : ""} ${r === e ? "today" : ""}"
            data-day=${r}
            @click=${this.handleDaySelect}
          >
            ${re(z(this.hass), r)}
          </button>
        `)}
      </div>
    `;
  }
  renderModeButton() {
    const e = this._modeValue(), i = e.toLowerCase(), r = i === "on" ? "mdi:fire" : i === "off" ? "mdi:power-off" : "mdi:chart-bell-curve-cumulative";
    return y`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${e}">
        <ha-icon .icon=${r}></ha-icon>
        <span class="mode-label">${this._modeLabel(e)}</span>
      </button>
    `;
  }
  /** Demo card for the dashboard card-picker preview (preview=true,
   *  no entity yet). Renders a typical day-curve so users see what
   *  the card actually does. */
  _renderDemo() {
    const e = this._config, i = z(this.hass), r = this._resolvedActiveColor(), o = e.show_day_selector !== !1, n = e.show_mode_control !== !1, s = (/* @__PURE__ */ new Date()).getDay(), a = [
      { x: 0, y: 17 },
      { x: 360, y: 19 },
      { x: 480, y: 21.5 },
      { x: 720, y: 20 },
      { x: 1020, y: 21 },
      { x: 1320, y: 18.5 },
      { x: 1440, y: 17 }
    ], c = 1e3, d = 80, u = 15, _ = 23 - u, m = mr(a, (b) => ({
      x: b.x / 1440 * c,
      y: (1 - (b.y - u) / _) * d
    })), f = `${m} L ${c} ${d} L 0 ${d} Z`, g = this._nowMin(), v = e.show_now_indicator !== !1;
    return y`
      <ha-card>
        <div class="container">
          <div class="row row-header">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${M(this.iconStyle(e.icon_color))}>
                  <ha-icon .icon=${e.icon ?? "mdi:chart-bell-curve-cumulative"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${e.name || l(i, "heating_curve.default_name")}</div>
                <div class="secondary">${e.subtitle || "21.0 °C · Auto"}</div>
              </div>
              ${n ? y`
                <button type="button" class="mode-btn" disabled>
                  <ha-icon icon="mdi:clock-outline"></ha-icon>
                  <span class="mode-label">Auto</span>
                </button>
              ` : E}
            </div>
          </div>
          ${o ? y`
            <div class="row row-days">
              <div class="day-selector">
                ${[0, 1, 2, 3, 4, 5, 6].map((b) => y`
                  <button type="button" class="day-btn ${b === s ? "active today" : ""}" disabled>
                    ${re(i, b)}
                  </button>
                `)}
              </div>
            </div>
          ` : E}
          <div class="row row-curve">
            <div class="curve-container">
              ${e.show_time_labels !== !1 ? y`
                    <div class="time-labels">
                      ${Pn().map(
      (b) => y`<span class="time-label" style=${M({ left: `${b.pct}%` })}>${String(b.hour).padStart(2, "0")}</span>`
    )}
                    </div>
                  ` : E}
              <svg viewBox="0 0 ${c} ${d}" preserveAspectRatio="none" class="curve-svg">
                <path d=${f} fill=${r} fill-opacity="0.18" />
                <path d=${m}
                  fill="none"
                  stroke=${r}
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  vector-effect="non-scaling-stroke"
                />
                ${v ? be`
                  <line
                    x1=${g / 1440 * c}
                    x2=${g / 1440 * c}
                    y1="0" y2=${d}
                    stroke=${r}
                    stroke-width="1.5"
                    stroke-dasharray="3 3"
                    vector-effect="non-scaling-stroke"
                  />
                ` : E}
              </svg>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  render() {
    var p, m;
    if (!this._config) return y`<ha-card>${l(z(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return y``;
    if (!this._entityId) {
      if (this.preview) return this._renderDemo();
      const f = z(this.hass);
      return y`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:chart-bell-curve-cumulative"></ha-icon>
            <div class="placeholder-text">${l(f, "heating_curve.placeholder")}</div>
          </div>
        </ha-card>
      `;
    }
    const e = this._config, i = (m = (p = N(this.hass, this._entityId)) == null ? void 0 : p.attributes) == null ? void 0 : m.friendly_name, r = this._modeValue(), o = this._currentValue(), n = this._unit(), s = e.subtitle || (o !== null ? `${o.toFixed(1)} ${n} · ${this._modeLabel(r)}` : this._modeLabel(r)), a = e.show_day_selector !== !1, c = e.show_mode_control !== !1, d = e.show_time_labels !== !1, u = !a && !c && !d, _ = this._isDeviceOn() ? this.iconStyle(e.icon_color) : this.iconStyle("disabled");
    return y`
      <ha-card>
        <div class="container${u ? " compact-inline" : ""}">
          <div class="row row-header">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${M(_)}>
                  <ha-icon .icon=${e.icon ?? "mdi:chart-bell-curve-cumulative"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${e.name || i || l(z(this.hass), "heating_curve.default_name")}</div>
                <div class="secondary">${s}</div>
              </div>
              ${c ? this.renderModeButton() : E}
            </div>
          </div>
          ${a ? y`<div class="row row-days">${this.renderDaySelector()}</div>` : E}
          <div class="row row-curve">${this.renderCurvePreview()}</div>
        </div>
      </ha-card>
    `;
  }
};
Kr.styles = Z`
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
let Oe = Kr;
ft([
  I({ attribute: !1 })
], Oe.prototype, "hass");
ft([
  I({ type: Boolean })
], Oe.prototype, "preview");
ft([
  I({ type: Boolean })
], Oe.prototype, "editMode");
ft([
  C()
], Oe.prototype, "_config");
ft([
  C()
], Oe.prototype, "_selectedDay");
ft([
  C()
], Oe.prototype, "_tick");
customElements.get("power-pilz-heating-curve-card") || customElements.define("power-pilz-heating-curve-card", Oe);
function Pn() {
  return [0, 6, 12, 18, 24].map((t) => ({
    hour: t >= 24 ? 0 : t,
    pct: t / 24 * 100
  }));
}
window.customCards = window.customCards || [];
const Sd = [
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
for (const t of Sd)
  window.customCards.some((e) => e.type === t.type) || window.customCards.push(t);
console.info(
  `%cPOWER PILZ%c v${ze}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
//# sourceMappingURL=power-pilz.js.map
