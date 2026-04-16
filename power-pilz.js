/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ke = globalThis, nr = Ke.ShadowRoot && (Ke.ShadyCSS === void 0 || Ke.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ir = Symbol(), Pr = /* @__PURE__ */ new WeakMap();
let Mn = class {
  constructor(t, r, n) {
    if (this._$cssResult$ = !0, n !== ir) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (nr && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = Pr.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Pr.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const rs = (e) => new Mn(typeof e == "string" ? e : e + "", void 0, ir), st = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, i, s) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[s + 1], e[0]);
  return new Mn(r, e, ir);
}, ns = (e, t) => {
  if (nr) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), i = Ke.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = r.cssText, e.appendChild(n);
  }
}, Or = nr ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return rs(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is, defineProperty: ss, getOwnPropertyDescriptor: os, getOwnPropertyNames: as, getOwnPropertySymbols: ls, getPrototypeOf: cs } = Object, te = globalThis, Lr = te.trustedTypes, ds = Lr ? Lr.emptyScript : "", Et = te.reactiveElementPolyfillSupport, Le = (e, t) => e, Je = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ds : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let r = e;
  switch (t) {
    case Boolean:
      r = e !== null;
      break;
    case Number:
      r = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(e);
      } catch {
        r = null;
      }
  }
  return r;
} }, sr = (e, t) => !is(e, t), Ir = { attribute: !0, type: String, converter: Je, reflect: !1, useDefault: !1, hasChanged: sr };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), te.litPropertyMetadata ?? (te.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ve = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Ir) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, r);
      i !== void 0 && ss(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: i, set: s } = os(this.prototype, t) ?? { get() {
      return this[r];
    }, set(o) {
      this[r] = o;
    } };
    return { get: i, set(o) {
      const a = i == null ? void 0 : i.call(this);
      s == null || s.call(this, o), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ir;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Le("elementProperties"))) return;
    const t = cs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Le("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Le("properties"))) {
      const r = this.properties, n = [...as(r), ...ls(r)];
      for (const i of n) this.createProperty(i, r[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [n, i] of r) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, n] of this.elementProperties) {
      const i = this._$Eu(r, n);
      i !== void 0 && this._$Eh.set(i, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const i of n) r.unshift(Or(i));
    } else t !== void 0 && r.push(Or(t));
    return r;
  }
  static _$Eu(t, r) {
    const n = r.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((r) => r(this));
  }
  addController(t) {
    var r;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((r = t.hostConnected) == null || r.call(t));
  }
  removeController(t) {
    var r;
    (r = this._$EO) == null || r.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const n of r.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ns(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((r) => {
      var n;
      return (n = r.hostConnected) == null ? void 0 : n.call(r);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((r) => {
      var n;
      return (n = r.hostDisconnected) == null ? void 0 : n.call(r);
    });
  }
  attributeChangedCallback(t, r, n) {
    this._$AK(t, n);
  }
  _$ET(t, r) {
    var s;
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const o = (((s = n.converter) == null ? void 0 : s.toAttribute) !== void 0 ? n.converter : Je).toAttribute(r, n.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var s, o;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = n.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((s = a.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? a.converter : Je;
      this._$Em = i;
      const c = l.fromAttribute(r, a.type);
      this[i] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, r, n, i = !1, s) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (s = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? sr)(s, r) || n.useDefault && n.reflect && s === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, r, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: n, reflect: i, wrapped: s }, o) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? r ?? this[t]), s !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (r = void 0), this._$AL.set(t, r)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var n;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [s, o] of i) {
        const { wrapped: a } = o, l = this[s];
        a !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, o, l);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), (n = this._$EO) == null || n.forEach((i) => {
        var s;
        return (s = i.hostUpdate) == null ? void 0 : s.call(i);
      }), this.update(r)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var r;
    (r = this._$EO) == null || r.forEach((n) => {
      var i;
      return (i = n.hostUpdated) == null ? void 0 : i.call(n);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((r) => this._$ET(r, this[r]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
ve.elementStyles = [], ve.shadowRootOptions = { mode: "open" }, ve[Le("elementProperties")] = /* @__PURE__ */ new Map(), ve[Le("finalized")] = /* @__PURE__ */ new Map(), Et == null || Et({ ReactiveElement: ve }), (te.reactiveElementVersions ?? (te.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = globalThis, kr = (e) => e, Qe = Ie.trustedTypes, Nr = Qe ? Qe.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, An = "$lit$", ee = `lit$${Math.random().toFixed(9).slice(2)}$`, zn = "?" + ee, hs = `<${zn}>`, de = document, ke = () => de.createComment(""), Ne = (e) => e === null || typeof e != "object" && typeof e != "function", or = Array.isArray, us = (e) => or(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Tt = `[ 	
\f\r]`, Te = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Hr = /-->/g, Dr = />/g, se = RegExp(`>|${Tt}(?:([^\\s"'>=/]+)(${Tt}*=${Tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Br = /'/g, Fr = /"/g, Pn = /^(?:script|style|textarea|title)$/i, _s = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), E = _s(1), he = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), Vr = /* @__PURE__ */ new WeakMap(), le = de.createTreeWalker(de, 129);
function On(e, t) {
  if (!or(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Nr !== void 0 ? Nr.createHTML(t) : t;
}
const ms = (e, t) => {
  const r = e.length - 1, n = [];
  let i, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Te;
  for (let a = 0; a < r; a++) {
    const l = e[a];
    let c, d, h = -1, m = 0;
    for (; m < l.length && (o.lastIndex = m, d = o.exec(l), d !== null); ) m = o.lastIndex, o === Te ? d[1] === "!--" ? o = Hr : d[1] !== void 0 ? o = Dr : d[2] !== void 0 ? (Pn.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = se) : d[3] !== void 0 && (o = se) : o === se ? d[0] === ">" ? (o = i ?? Te, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? se : d[3] === '"' ? Fr : Br) : o === Fr || o === Br ? o = se : o === Hr || o === Dr ? o = Te : (o = se, i = void 0);
    const u = o === se && e[a + 1].startsWith("/>") ? " " : "";
    s += o === Te ? l + hs : h >= 0 ? (n.push(c), l.slice(0, h) + An + l.slice(h) + ee + u) : l + ee + (h === -2 ? a : u);
  }
  return [On(e, s + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class He {
  constructor({ strings: t, _$litType$: r }, n) {
    let i;
    this.parts = [];
    let s = 0, o = 0;
    const a = t.length - 1, l = this.parts, [c, d] = ms(t, r);
    if (this.el = He.createElement(c, n), le.currentNode = this.el.content, r === 2 || r === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = le.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(An)) {
          const m = d[o++], u = i.getAttribute(h).split(ee), _ = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: s, name: _[2], strings: u, ctor: _[1] === "." ? fs : _[1] === "?" ? ys : _[1] === "@" ? bs : ot }), i.removeAttribute(h);
        } else h.startsWith(ee) && (l.push({ type: 6, index: s }), i.removeAttribute(h));
        if (Pn.test(i.tagName)) {
          const h = i.textContent.split(ee), m = h.length - 1;
          if (m > 0) {
            i.textContent = Qe ? Qe.emptyScript : "";
            for (let u = 0; u < m; u++) i.append(h[u], ke()), le.nextNode(), l.push({ type: 2, index: ++s });
            i.append(h[m], ke());
          }
        }
      } else if (i.nodeType === 8) if (i.data === zn) l.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(ee, h + 1)) !== -1; ) l.push({ type: 7, index: s }), h += ee.length - 1;
      }
      s++;
    }
  }
  static createElement(t, r) {
    const n = de.createElement("template");
    return n.innerHTML = t, n;
  }
}
function xe(e, t, r = e, n) {
  var o, a;
  if (t === he) return t;
  let i = n !== void 0 ? (o = r._$Co) == null ? void 0 : o[n] : r._$Cl;
  const s = Ne(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== s && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), s === void 0 ? i = void 0 : (i = new s(e), i._$AT(e, r, n)), n !== void 0 ? (r._$Co ?? (r._$Co = []))[n] = i : r._$Cl = i), i !== void 0 && (t = xe(e, i._$AS(e, t.values), i, n)), t;
}
class ps {
  constructor(t, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: r }, parts: n } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? de).importNode(r, !0);
    le.currentNode = i;
    let s = le.nextNode(), o = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new De(s, s.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (c = new gs(s, this, t)), this._$AV.push(c), l = n[++a];
      }
      o !== (l == null ? void 0 : l.index) && (s = le.nextNode(), o++);
    }
    return le.currentNode = de, i;
  }
  p(t) {
    let r = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, r), r += n.strings.length - 2) : n._$AI(t[r])), r++;
  }
}
class De {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, r, n, i) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = n, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    t = xe(this, t, r), Ne(t) ? t === $ || t == null || t === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : t !== this._$AH && t !== he && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : us(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== $ && Ne(this._$AH) ? this._$AA.nextSibling.data = t : this.T(de.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: r, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = He.createElement(On(n.h, n.h[0]), this.options)), n);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === i) this._$AH.p(r);
    else {
      const o = new ps(i, this), a = o.u(this.options);
      o.p(r), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let r = Vr.get(t.strings);
    return r === void 0 && Vr.set(t.strings, r = new He(t)), r;
  }
  k(t) {
    or(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let n, i = 0;
    for (const s of t) i === r.length ? r.push(n = new De(this.O(ke()), this.O(ke()), this, this.options)) : n = r[i], n._$AI(s), i++;
    i < r.length && (this._$AR(n && n._$AB.nextSibling, i), r.length = i);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, r); t !== this._$AB; ) {
      const i = kr(t).nextSibling;
      kr(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 && (this._$Cv = t, (r = this._$AP) == null || r.call(this, t));
  }
}
class ot {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, n, i, s) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = t, this.name = r, this._$AM = i, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = $;
  }
  _$AI(t, r = this, n, i) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) t = xe(this, t, r, 0), o = !Ne(t) || t !== this._$AH && t !== he, o && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = s[0], l = 0; l < s.length - 1; l++) c = xe(this, a[n + l], r, l), c === he && (c = this._$AH[l]), o || (o = !Ne(c) || c !== this._$AH[l]), c === $ ? t = $ : t !== $ && (t += (c ?? "") + s[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class fs extends ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === $ ? void 0 : t;
  }
}
class ys extends ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== $);
  }
}
class bs extends ot {
  constructor(t, r, n, i, s) {
    super(t, r, n, i, s), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = xe(this, t, r, 0) ?? $) === he) return;
    const n = this._$AH, i = t === $ && n !== $ || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== $ && (n === $ || i);
    i && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class gs {
  constructor(t, r, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    xe(this, t);
  }
}
const $t = Ie.litHtmlPolyfillSupport;
$t == null || $t(He, De), (Ie.litHtmlVersions ?? (Ie.litHtmlVersions = [])).push("3.3.2");
const vs = (e, t, r) => {
  const n = (r == null ? void 0 : r.renderBefore) ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const s = (r == null ? void 0 : r.renderBefore) ?? null;
    n._$litPart$ = i = new De(t.insertBefore(ke(), s), s, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce = globalThis;
let U = class extends ve {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var r;
    const t = super.createRenderRoot();
    return (r = this.renderOptions).renderBefore ?? (r.renderBefore = t.firstChild), t;
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = vs(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return he;
  }
};
var Rn;
U._$litElement$ = !0, U.finalized = !0, (Rn = ce.litElementHydrateSupport) == null || Rn.call(ce, { LitElement: U });
const Rt = ce.litElementPolyfillSupport;
Rt == null || Rt({ LitElement: U });
(ce.litElementVersions ?? (ce.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ws = { attribute: !0, type: String, converter: Je, reflect: !1, hasChanged: sr }, xs = (e = ws, t, r) => {
  const { kind: n, metadata: i } = r;
  let s = globalThis.litPropertyMetadata.get(i);
  if (s === void 0 && globalThis.litPropertyMetadata.set(i, s = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(r.name, e), n === "accessor") {
    const { name: o } = r;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, e, a), a;
    } };
  }
  if (n === "setter") {
    const { name: o } = r;
    return function(a) {
      const l = this[o];
      t.call(this, a), this.requestUpdate(o, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function L(e) {
  return (t, r) => typeof r == "object" ? xs(e, t, r) : ((n, i, s) => {
    const o = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, n), o ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function O(e) {
  return L({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ss = { ATTRIBUTE: 1 }, Cs = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Es = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, r, n) {
    this._$Ct = t, this._$AM = r, this._$Ci = n;
  }
  _$AS(t, r) {
    return this.update(t, r);
  }
  update(t, r) {
    return this.render(...r);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ln = "important", Ts = " !" + Ln, M = Cs(class extends Es {
  constructor(e) {
    var t;
    if (super(e), e.type !== Ss.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return Object.keys(e).reduce((t, r) => {
      const n = e[r];
      return n == null ? t : t + `${r = r.includes("-") ? r : r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${n};`;
    }, "");
  }
  update(e, [t]) {
    const { style: r } = e.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const n of this.ft) t[n] == null && (this.ft.delete(n), n.includes("-") ? r.removeProperty(n) : r[n] = null);
    for (const n in t) {
      const i = t[n];
      if (i != null) {
        this.ft.add(n);
        const s = typeof i == "string" && i.endsWith(Ts);
        n.includes("-") || s ? r.setProperty(n, s ? i.slice(0, -11) : i, s ? Ln : "") : r[n] = i;
      }
    }
    return he;
  }
}), we = (e, t) => {
  if (t)
    return e.states[t];
}, D = (e, t) => {
  const r = we(e, t);
  if (!r)
    return null;
  const n = Number(r.state);
  return Number.isFinite(n) ? n : null;
}, H = (e, t) => {
  const r = we(e, t);
  if (!r)
    return;
  const n = r.attributes.unit_of_measurement;
  return typeof n == "string" ? n : void 0;
}, Ze = (e, t) => {
  const r = we(e, t);
  return r == null ? void 0 : r.state;
}, B = (e, t = "hybrid") => e === "history" || e === "statistics" || e === "hybrid" ? e : e === "auto" || t === "auto" ? "hybrid" : t, In = 3e4, $s = 10 * 6e4, Rs = 1440, Ms = 1e4, As = 2e3, kn = 40, at = /* @__PURE__ */ new Map(), Mt = /* @__PURE__ */ new Map(), At = /* @__PURE__ */ new Map(), Ur = /* @__PURE__ */ new WeakMap(), Wr = /* @__PURE__ */ new WeakMap(), jr = /* @__PURE__ */ new WeakMap(), Gr = /* @__PURE__ */ new WeakMap(), ar = (e, t = Rs) => {
  if (e.length <= t)
    return e;
  if (t <= 2)
    return [e[0], e[e.length - 1]];
  const r = e.slice(1, -1), n = Math.max(1, Math.floor((t - 2) / 2)), i = r.length / n, s = [e[0]];
  for (let l = 0; l < n; l += 1) {
    const c = Math.floor(l * i), d = Math.max(c + 1, Math.floor((l + 1) * i)), h = r.slice(c, d);
    if (h.length === 0)
      continue;
    let m = h[0], u = h[0];
    for (const _ of h)
      _.value < m.value && (m = _), _.value > u.value && (u = _);
    if (m.ts <= u.ts ? (s.push(m), u !== m && s.push(u)) : (s.push(u), m !== u && s.push(m)), s.length >= t - 1)
      break;
  }
  if (s.push(e[e.length - 1]), s.length <= t)
    return s;
  const o = [s[0]], a = (s.length - 2) / (t - 2);
  for (let l = 0; l < t - 2; l += 1) {
    const c = 1 + Math.floor(l * a);
    o.push(s[c]);
  }
  return o.push(s[s.length - 1]), o;
}, Nn = (e, t) => {
  const r = t ? Ms : As;
  return !Number.isFinite(e) || e <= 0 || r <= 1 ? Math.max(0, Math.floor(e)) : Math.max(0, Math.floor(e / r) * r);
}, zs = (e) => {
  const t = (n) => {
    if (typeof n == "string") {
      const i = Date.parse(n);
      return Number.isFinite(i) ? i : null;
    }
    if (typeof n == "number" && Number.isFinite(n)) {
      if (n > 1e12)
        return Math.floor(n);
      if (n > 0)
        return Math.floor(n * 1e3);
    }
    return null;
  }, r = [
    e.last_changed,
    e.last_updated,
    e.last_changed_ts,
    e.last_updated_ts,
    // Some minimal/compact responses use short keys.
    e.lc,
    e.lu
  ];
  for (const n of r) {
    const i = t(n);
    if (i !== null)
      return i;
  }
  return null;
}, et = (e, t, r) => {
  const n = [...e, ...t].filter((s) => Number.isFinite(s.ts) && Number.isFinite(s.value) && s.ts >= r).sort((s, o) => s.ts - o.ts);
  if (n.length <= 1)
    return n;
  const i = [];
  return n.forEach((s) => {
    const o = i[i.length - 1];
    if (o && Math.abs(o.ts - s.ts) <= 0.5) {
      i[i.length - 1] = s;
      return;
    }
    i.push(s);
  }), ar(i);
}, Ps = (e, t, r = Date.now()) => {
  if (!Array.isArray(e))
    return { entityId: null, points: [] };
  const n = [];
  let i = null;
  for (const a of e) {
    if (!a || typeof a != "object")
      continue;
    const l = a;
    i === null && typeof l.entity_id == "string" && l.entity_id.length > 0 && (i = l.entity_id);
    const c = Number(l.state), d = zs(l);
    !Number.isFinite(c) || d === null || n.push({ ts: d, value: c });
  }
  const s = r - t, o = n.filter((a) => a.ts >= s).sort((a, l) => a.ts - l.ts);
  return {
    entityId: i,
    points: ar(o)
  };
}, lt = (e, t, r) => `${e}|${t}|${r}`, V = (e) => e.map((t) => ({ ts: t.ts, value: t.value })), zt = (e) => {
  if (typeof e == "string") {
    const t = Date.parse(e);
    return Number.isFinite(t) ? t : null;
  }
  if (typeof e == "number" && Number.isFinite(e)) {
    if (e > 1e12)
      return Math.floor(e);
    if (e > 0)
      return Math.floor(e * 1e3);
  }
  return null;
}, Os = (e) => zt(e.start) ?? zt(e.end) ?? zt(e.last_reset), Ls = (e) => {
  const t = [
    e.state,
    e.mean,
    e.sum,
    e.max,
    e.min,
    e.change
  ];
  for (const r of t) {
    const n = Number(r);
    if (Number.isFinite(n))
      return n;
  }
  return null;
}, Is = (e, t, r = Date.now()) => {
  if (!Array.isArray(e))
    return [];
  const n = [];
  e.forEach((o) => {
    if (!o || typeof o != "object")
      return;
    const a = o, l = Os(a), c = Ls(a);
    l === null || c === null || n.push({ ts: l, value: c });
  });
  const i = r - t, s = n.filter((o) => o.ts >= i).sort((o, a) => o.ts - a.ts);
  return ar(s);
}, Hn = (e) => {
  const t = Gr.get(e);
  if (t)
    return t;
  const r = /* @__PURE__ */ new Map();
  return Gr.set(e, r), r;
}, Dn = (e, t, r) => {
  const n = Hn(e), i = n.get(t);
  return i ? i.expiresAt <= r ? (n.delete(t), null) : i.supported : null;
}, qr = (e, t, r, n) => {
  Hn(e).set(t, {
    supported: r,
    expiresAt: n + $s
  });
}, ks = (e) => {
  const t = Ur.get(e);
  if (t)
    return t;
  const r = /* @__PURE__ */ new Map();
  return Ur.set(e, r), r;
}, Bn = async (e, t, r, n, i, s) => {
  const o = new Date(n).toISOString(), a = t.join(","), l = `history/period/${o}?filter_entity_id=${encodeURIComponent(a)}&minimal_response&no_attributes`;
  let c;
  try {
    c = await e("GET", l);
  } catch {
    const m = {};
    return t.forEach((u) => {
      m[u] = [];
    }), m;
  }
  const d = Array.isArray(c) ? c : [], h = {};
  return d.forEach((m, u) => {
    const _ = Ps(m, r, i), x = t[u], f = _.entityId ?? x;
    f && (h[f] = _.points);
  }), t.forEach((m) => {
    m in h || (h[m] = []), s && at.set(lt("history", m, r), {
      expiresAt: i + In,
      points: V(h[m])
    });
  }), h;
}, Ns = (e, t, r, n, i) => {
  const s = ks(e);
  let o = s.get(t);
  return o || (o = {
    entityIds: /* @__PURE__ */ new Set(),
    waiters: []
  }, s.set(t, o)), r.forEach((a) => o == null ? void 0 : o.entityIds.add(a)), new Promise((a, l) => {
    o == null || o.waiters.push({ entityIds: [...r], resolve: a, reject: l }), (o == null ? void 0 : o.flushTimer) === void 0 && (o.flushTimer = setTimeout(async () => {
      const c = s.get(t);
      if (!c)
        return;
      s.delete(t);
      const d = Array.from(c.entityIds);
      try {
        const h = await Bn(
          e,
          d,
          n,
          i,
          Date.now(),
          !0
        );
        c.waiters.forEach((m) => {
          const u = {};
          m.entityIds.forEach((_) => {
            u[_] = V(h[_] ?? []);
          }), m.resolve(u);
        });
      } catch (h) {
        c.waiters.forEach((m) => m.reject(h));
      }
    }, kn));
  });
}, Hs = (e) => {
  const t = Wr.get(e);
  if (t)
    return t;
  const r = /* @__PURE__ */ new Map();
  return Wr.set(e, r), r;
}, Ds = async (e, t, r, n) => {
  const i = [...n], s = new Date(t).toISOString(), o = new Date(r).toISOString(), a = jr.get(e), l = a ? [a] : ["recorder/statistics_during_period", "history/statistics_during_period"];
  let c;
  for (const d of l)
    try {
      const h = await e({
        type: d,
        start_time: s,
        end_time: o,
        statistic_ids: i,
        period: "5minute",
        types: ["state", "mean", "sum"]
      });
      return jr.set(e, d), h;
    } catch (h) {
      c = h;
    }
  throw c;
}, Bs = async (e, t) => {
  if (t.length === 0)
    return /* @__PURE__ */ new Set();
  try {
    const r = await e({
      type: "recorder/get_statistics_metadata",
      statistic_ids: t
    });
    if (!Array.isArray(r))
      return null;
    const n = /* @__PURE__ */ new Set();
    return r.forEach((i) => {
      if (!i || typeof i != "object")
        return;
      const s = i.statistic_id;
      typeof s == "string" && s.length > 0 && n.add(s);
    }), n;
  } catch {
    return null;
  }
}, Fn = async (e, t, r, n, i, s) => {
  let o;
  try {
    o = await Ds(e, n, i, t);
  } catch {
    const u = new Set(t), _ = {};
    return t.forEach((x) => {
      _[x] = [];
    }), {
      pointsByEntity: _,
      unsupportedEntityIds: u
    };
  }
  const a = o && typeof o == "object" && !Array.isArray(o) ? o : {}, l = {}, c = /* @__PURE__ */ new Set(), d = [];
  t.forEach((u) => {
    if (!Object.prototype.hasOwnProperty.call(a, u)) {
      l[u] = [], d.push(u);
      return;
    }
    const _ = Is(a[u], r, i);
    l[u] = _, qr(e, u, !0, i), s && at.set(lt("statistics", u, r), {
      expiresAt: i + In,
      points: V(_)
    });
  });
  const h = [];
  d.forEach((u) => {
    const _ = Dn(e, u, i);
    if (_ !== !0) {
      if (_ === !1) {
        c.add(u);
        return;
      }
      h.push(u);
    }
  });
  const m = await Bs(e, h);
  return m !== null ? h.forEach((u) => {
    const _ = m.has(u);
    qr(e, u, _, i), _ || c.add(u);
  }) : h.forEach((u) => {
    c.add(u);
  }), {
    pointsByEntity: l,
    unsupportedEntityIds: c
  };
}, Fs = (e, t, r, n, i) => {
  const s = Hs(e);
  let o = s.get(t);
  return o || (o = {
    entityIds: /* @__PURE__ */ new Set(),
    waiters: []
  }, s.set(t, o)), r.forEach((a) => o == null ? void 0 : o.entityIds.add(a)), new Promise((a, l) => {
    o == null || o.waiters.push({ entityIds: [...r], resolve: a, reject: l }), (o == null ? void 0 : o.flushTimer) === void 0 && (o.flushTimer = setTimeout(async () => {
      const c = s.get(t);
      if (!c)
        return;
      s.delete(t);
      const d = Array.from(c.entityIds);
      try {
        const h = await Fn(
          e,
          d,
          n,
          i,
          Date.now(),
          !0
        );
        c.waiters.forEach((m) => {
          const u = {
            pointsByEntity: {},
            unsupportedEntityIds: /* @__PURE__ */ new Set()
          };
          m.entityIds.forEach((_) => {
            u.pointsByEntity[_] = V(h.pointsByEntity[_] ?? []), h.unsupportedEntityIds.has(_) && u.unsupportedEntityIds.add(_);
          }), m.resolve(u);
        });
      } catch (h) {
        c.waiters.forEach((m) => m.reject(h));
      }
    }, kn));
  });
}, Vn = async (e, t, r, n) => {
  const i = e.callApi, s = Array.from(new Set(t.filter((f) => f.length > 0)));
  if (!i || s.length === 0)
    return {};
  const o = Date.now(), a = typeof n == "number" && Number.isFinite(n) ? Math.max(o - r, Math.floor(n)) : o - r, l = a <= o - r + 1e3, c = Nn(a, l), d = {}, h = [];
  if (s.forEach((f) => {
    if (l) {
      const y = lt("history", f, r), b = at.get(y);
      if (b && b.expiresAt > o) {
        d[f] = V(b.points);
        return;
      }
    }
    h.push(f);
  }), h.length === 0)
    return d;
  if (l) {
    const f = `${c}|${r}`, y = await Ns(
      i,
      f,
      h,
      r,
      c
    );
    return h.forEach((b) => {
      d[b] = V(y[b] ?? []);
    }), d;
  }
  const m = [...h].sort(), u = `${c}|${r}|${m.join(",")}`, _ = Mt.get(u);
  if (_) {
    const f = await _;
    return h.forEach((y) => {
      d[y] = V(f[y] ?? []);
    }), d;
  }
  const x = (async () => Bn(
    i,
    h,
    r,
    c,
    o,
    l
  ))();
  Mt.set(u, x);
  try {
    const f = await x;
    return h.forEach((y) => {
      d[y] = V(f[y] ?? []);
    }), d;
  } finally {
    Mt.delete(u);
  }
}, Un = async (e, t, r, n) => {
  const i = e.callWS, s = Array.from(new Set(t.filter((b) => b.length > 0)));
  if (!i || s.length === 0)
    return {
      pointsByEntity: {},
      unsupportedEntityIds: new Set(s)
    };
  const o = Date.now(), a = typeof n == "number" && Number.isFinite(n) ? Math.max(o - r, Math.floor(n)) : o - r, l = a <= o - r + 1e3, c = Nn(a, l), d = {}, h = [], m = /* @__PURE__ */ new Set();
  if (s.forEach((b) => {
    if (Dn(i, b, o) === !1) {
      d[b] = [], m.add(b);
      return;
    }
    if (l) {
      const w = lt("statistics", b, r), S = at.get(w);
      if (S && S.expiresAt > o) {
        d[b] = V(S.points);
        return;
      }
    }
    h.push(b);
  }), h.length === 0)
    return {
      pointsByEntity: d,
      unsupportedEntityIds: m
    };
  const u = (b) => (h.forEach((v) => {
    d[v] = V(b.pointsByEntity[v] ?? []), b.unsupportedEntityIds.has(v) && m.add(v);
  }), {
    pointsByEntity: d,
    unsupportedEntityIds: m
  });
  if (l) {
    const b = `${c}|${r}`, v = await Fs(
      i,
      b,
      h,
      r,
      c
    );
    return u(v);
  }
  const _ = [...h].sort(), x = `${c}|${r}|${_.join(",")}`, f = At.get(x);
  if (f) {
    const b = await f;
    return u(b);
  }
  const y = (async () => Fn(
    i,
    h,
    r,
    c,
    o,
    l
  ))();
  At.set(x, y);
  try {
    const b = await y;
    return u(b);
  } finally {
    At.delete(x);
  }
}, Vs = async (e, t, r, n) => {
  const i = await Un(
    e,
    t,
    r,
    n
  ), s = {};
  t.forEach((l) => {
    l.length !== 0 && (s[l] = V(i.pointsByEntity[l] ?? []));
  });
  const o = Array.from(i.unsupportedEntityIds).filter((l) => l.length > 0);
  if (o.length === 0)
    return s;
  const a = await Vn(
    e,
    o,
    r,
    n
  );
  return o.forEach((l) => {
    s[l] = V(a[l] ?? []);
  }), s;
}, Se = async (e, t, r, n) => {
  const i = B(n == null ? void 0 : n.dataSource, "hybrid");
  return i === "history" ? Vn(e, t, r, n == null ? void 0 : n.startMs) : i === "statistics" ? (await Un(
    e,
    t,
    r,
    n == null ? void 0 : n.startMs
  )).pointsByEntity : Vs(e, t, r, n == null ? void 0 : n.startMs);
}, Yr = {
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
}, lr = (e) => {
  if (Array.isArray(e) && e.length >= 3) {
    const i = e.slice(0, 3).map((s) => Number(s));
    if (i.every((s) => Number.isFinite(s))) {
      const [s, o, a] = i.map((l) => Math.max(0, Math.min(255, Math.round(l))));
      return `${s}, ${o}, ${a}`;
    }
    return null;
  }
  if (typeof e != "string")
    return null;
  const t = e.trim().toLowerCase();
  if (t === "none")
    return null;
  if (t.startsWith("var(--rgb-"))
    return t;
  if (t === "state")
    return "var(--rgb-state-entity, var(--rgb-primary-color, 3, 169, 244))";
  if (t === "primary")
    return "var(--rgb-primary-color, 3, 169, 244)";
  if (t === "accent")
    return "var(--rgb-accent-color, 255, 152, 0)";
  if (t in Yr)
    return `var(--rgb-${t}, ${Yr[t]})`;
  const r = /^#([a-fA-F0-9]{3})$/, n = /^#([a-fA-F0-9]{6})$/;
  if (r.test(t)) {
    const [, i] = t.match(r) ?? [];
    if (!i)
      return null;
    const s = parseInt(i[0] + i[0], 16), o = parseInt(i[1] + i[1], 16), a = parseInt(i[2] + i[2], 16);
    return `${s}, ${o}, ${a}`;
  }
  if (n.test(t)) {
    const [, i] = t.match(n) ?? [];
    if (!i)
      return null;
    const s = parseInt(i.slice(0, 2), 16), o = parseInt(i.slice(2, 4), 16), a = parseInt(i.slice(4, 6), 16);
    return `${s}, ${o}, ${a}`;
  }
  return null;
}, cr = (e, t = "") => {
  const r = lr(e);
  if (r)
    return `rgb(${r})`;
  if (typeof e == "string" && e.trim().length > 0) {
    const n = e.trim(), i = n.toLowerCase();
    if (i !== "none" && i !== "default")
      return n;
  }
  return t;
}, dr = (e) => {
  const t = lr(e);
  if (t)
    return {
      "--icon-color": `rgb(${t})`,
      "--shape-color": `rgba(${t}, 0.2)`
    };
  if (typeof e == "string" && e.trim().length > 0 && e !== "none") {
    const r = e.trim();
    return {
      "--icon-color": r,
      "--shape-color": `color-mix(in srgb, ${r} 20%, transparent)`
    };
  }
  return {};
}, hr = (e, t, r) => {
  const n = e.map((i) => ({
    x: i.x / 100 * t,
    y: i.y / 100 * r,
    value: i.value,
    ts: i.ts
  }));
  return Us(n, t);
}, Us = (e, t) => {
  if (e.length <= 3)
    return e;
  const r = Math.max(24, Math.min(e.length, Math.round(t)));
  if (e.length <= r)
    return Xr(e);
  const n = [];
  n.push(e[0]);
  const i = (e.length - 1) / (r - 1);
  for (let s = 1; s < r - 1; s += 1) {
    const o = Math.floor(s * i), a = Math.max(o + 1, Math.floor((s + 1) * i)), l = e.slice(o, Math.min(e.length, a));
    if (l.length === 0)
      continue;
    const c = l.reduce(
      (h, m) => (h.x += m.x, h.y += m.y, h.value += m.value, h.ts += m.ts, h),
      { x: 0, y: 0, value: 0, ts: 0 }
    ), d = l.length;
    n.push({
      x: c.x / d,
      y: c.y / d,
      value: c.value / d,
      ts: c.ts / d
    });
  }
  return n.push(e[e.length - 1]), Xr(n);
}, Xr = (e) => {
  if (e.length <= 3)
    return e;
  const t = [e[0]];
  for (let r = 1; r < e.length - 1; r += 1) {
    const n = e[r - 1], i = e[r], s = e[r + 1];
    t.push({
      x: i.x,
      y: (n.y + i.y * 2 + s.y) / 4,
      value: (n.value + i.value * 2 + s.value) / 4,
      ts: i.ts
    });
  }
  return t.push(e[e.length - 1]), t;
}, Kr = {
  "": 0,
  k: 1,
  m: -1,
  M: 2,
  G: 3,
  T: 4
}, Ot = ["", "k", "M", "G", "T"], re = (e, t) => {
  const r = typeof e == "number" && Number.isFinite(e) ? Math.round(e) : t;
  return Math.max(0, Math.min(4, r));
}, J = (e) => {
  if (!e)
    return null;
  const t = e.trim();
  if (t.length === 0)
    return null;
  if (t.endsWith("Wh")) {
    const r = t.slice(0, -2), i = Kr[r === "K" ? "k" : r];
    return i === void 0 ? null : {
      family: "energy",
      prefixPower: i,
      factor: Math.pow(1e3, i),
      canonicalUnit: "Wh"
    };
  }
  if (t.endsWith("W")) {
    const r = t.slice(0, -1), i = Kr[r === "K" ? "k" : r];
    return i === void 0 ? null : {
      family: "power",
      prefixPower: i,
      factor: Math.pow(1e3, i),
      canonicalUnit: "W"
    };
  }
  return null;
}, Ws = (e, t) => {
  const r = Math.max(0, Math.min(Ot.length - 1, t)), n = Ot[r] ?? "";
  return e === "energy" ? `${n}Wh` : `${n}W`;
}, js = (e) => {
  if (!Number.isFinite(e) || e <= 0)
    return 0;
  let t = 0, r = e;
  for (; r >= 1e3 && t < Ot.length - 1; )
    r /= 1e3, t += 1;
  return t;
}, ur = (e, t, r, n) => {
  const i = n.nullWithUnit === !0;
  if (e === null)
    return i && t ? `-- ${t}` : "--";
  const s = J(t);
  if (!n.enabled || !s)
    return `${e.toFixed(r)} ${t}`.trim();
  const o = e < 0 ? "-" : "", a = Math.abs(e) * s.factor, l = js(a), c = Ws(s.family, l), d = a / Math.pow(1e3, l), h = l === 0 ? n.baseDecimals : n.prefixedDecimals;
  return `${o}${d.toFixed(h)} ${c}`.trim();
}, Gs = (e) => {
  const t = Object.keys(e), r = {};
  if (t.length === 0)
    return {
      comparable: !1,
      family: null,
      canonicalUnit: null,
      factors: r
    };
  let n = null, i = null;
  for (const s of t) {
    const o = J(e[s]);
    if (!o)
      return {
        comparable: !1,
        family: null,
        canonicalUnit: null,
        factors: r
      };
    if (n === null)
      n = o.family, i = o.canonicalUnit;
    else if (n !== o.family)
      return {
        comparable: !1,
        family: null,
        canonicalUnit: null,
        factors: r
      };
    r[s] = o.factor;
  }
  return {
    comparable: !0,
    family: n,
    canonicalUnit: i,
    factors: r
  };
}, qs = 500, Ys = 250, Xs = 1e3, _r = (e, t, r) => {
  let n, i, s, o = !1, a = !1;
  const l = e.style.touchAction;
  e.style.touchAction = "manipulation";
  const c = () => {
    n !== void 0 && (clearTimeout(n), n = void 0);
  }, d = () => {
    i !== void 0 && (clearTimeout(i), i = void 0);
  }, h = (f) => {
    f.button === 0 && (o = !1, d(), r.hasHold && (c(), n = setTimeout(() => {
      o = !0, n = void 0, t.onHold(), i = setTimeout(() => {
        o = !1, i = void 0;
      }, Xs);
    }, qs)));
  }, m = () => {
    c();
  }, u = () => {
    c(), o || (o = !1);
  }, _ = (f) => {
    if (o) {
      o = !1, d(), f.stopPropagation();
      return;
    }
    r.hasDoubleTap ? a ? (a = !1, s !== void 0 && (clearTimeout(s), s = void 0), t.onDoubleTap()) : (a = !0, s = setTimeout(() => {
      a = !1, s = void 0, t.onTap();
    }, Ys)) : t.onTap();
  }, x = (f) => {
    (o || n !== void 0) && f.preventDefault();
  };
  return e.addEventListener("pointerdown", h, { passive: !0 }), e.addEventListener("pointerup", m, { passive: !0 }), e.addEventListener("pointercancel", u, { passive: !0 }), e.addEventListener("pointerleave", u, { passive: !0 }), e.addEventListener("click", _), e.addEventListener("contextmenu", x), {
    destroy: () => {
      c(), d(), s !== void 0 && clearTimeout(s), e.removeEventListener("pointerdown", h), e.removeEventListener("pointerup", m), e.removeEventListener("pointercancel", u), e.removeEventListener("pointerleave", u), e.removeEventListener("click", _), e.removeEventListener("contextmenu", x), e.style.touchAction = l;
    }
  };
}, Be = "0.2.8";
var Ks = Object.defineProperty, Zs = Object.getOwnPropertyDescriptor, mr = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Zs(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && Ks(t, r, i), i;
};
const Js = 4, Qs = 8, Zr = 2, eo = /* @__PURE__ */ new Set(["solar", "home", "grid", "grid_secondary"]), to = (e, t) => {
  const r = `${e}_sub_${t}`, n = eo.has(e);
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
      title: "Identity",
      icon: "mdi:view-list-outline",
      expanded: !0,
      schema: [
        {
          type: "grid",
          name: "",
          columns: 2,
          schema: [
            { name: `${r}_entity`, selector: { entity: { filter: { domain: "sensor" } } } },
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
              helper: Yt,
              description: Yt
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
                name: `${r}_state_mode`,
                selector: { boolean: {} },
                helper: e === "solar" ? Kt : Xt,
                description: e === "solar" ? Kt : Xt
              }
            ]
          }
        ]
      }
    ] : []
  ];
}, qe = (e, t, r, n) => ({
  type: "expandable",
  name: "",
  title: t,
  icon: r,
  expanded: !1,
  schema: Array.from({ length: n }, (i, s) => ({
    type: "expandable",
    name: "",
    title: `Block ${s + 1}`,
    icon: "mdi:view-grid-outline",
    expanded: !1,
    schema: to(e, s + 1)
  }))
}), ro = (e, t, r) => ({
  type: "expandable",
  name: "",
  title: e,
  icon: t,
  expanded: !1,
  schema: [
    {
      type: "grid",
      name: "",
      schema: r
    }
  ]
}), q = (e, t) => ({
  type: "expandable",
  name: "",
  title: e,
  icon: "mdi:view-list-outline",
  expanded: !0,
  schema: [
    {
      type: "grid",
      name: "",
      schema: t
    }
  ]
}), no = {
  select: {
    mode: "dropdown",
    options: [
      { label: "Auto (recommended)", value: "auto" },
      { label: "Statistics (fastest)", value: "statistics" },
      { label: "History (raw)", value: "history" }
    ]
  }
}, io = (e) => {
  const t = B(e, "hybrid");
  return t === "hybrid" ? "auto" : t;
}, so = (e) => e === "auto" || e === "history" || e === "statistics" || e === "hybrid" ? e : "auto", Lt = "When enabled, the solar main node shows the sum of enabled solar sub-node entities instead of the solar entity. Solar sub-nodes with State mode enabled are excluded from this sum.", It = "When enabled, the home main node is calculated as solar + grid + grid 2 - battery - battery 2 using compatible unit conversion.", ze = "When enabled, negative grid values (energy exported to the grid) are highlighted in the trend with the export color.", Pe = "When enabled, the grid icon switches to the export icon color while the grid value is negative.", kt = "When enabled, the main grid node is shown. When disabled, the grid node is hidden.", Nt = "When enabled, the second grid node is shown. When disabled, the second grid node is hidden.", Ht = "When enabled, the main solar node is shown. When disabled, the solar node is hidden.", Dt = "Flow direction: + value animates from Solar to Center. 0 or - value shows no solar flow.", Bt = "When enabled, the main home node is shown. When disabled, the home node is hidden.", Ft = "Flow direction: + value animates from Center to Home. 0 or - value shows no home flow.", Vt = "When enabled, the main battery node is shown. When disabled, the battery node is hidden.", Ut = "Flow direction: + value animates from Center to Battery (charging). - value animates Battery to Center (discharging).", Wt = "When enabled, the second battery node is shown. When disabled, the second battery node is hidden.", jt = "Flow direction: + value animates from Center to Battery 2 (charging). - value animates Battery 2 to Center (discharging).", Oe = "Color used for battery low-threshold alert styling (icon and low trend section).", Gt = "Flow direction: + value animates from Grid to Center (import). - value animates from Center to Grid (export).", qt = "Flow direction: + value animates from Grid 2 to Center (import). - value animates from Center to Grid 2 (export).", Yt = "In default mode, this sub-node renders the entity as numeric value + unit.", Xt = "When enabled, this sub-node displays the entity state text (for example AUS/WW/HZ) instead of numeric value + unit.", Kt = "When enabled, this solar sub-node displays entity state text instead of numeric value + unit and is excluded from Solar auto-calc.", Zt = "Automatically formats values with metric prefixes (for example W/kW/MW and Wh/kWh/MWh).", Jt = "Optional unit override/fallback. Used when entities have no unit and as preferred output unit for auto-calculated values.", Qt = "Default decimal precision for displayed values and fallback when base/prefixed decimals are not set.", er = "Decimal precision for base units (W, Wh) when Auto unit scaling is enabled.", tr = "Decimal precision for prefixed units (kW, MW, kWh, MWh) when Auto unit scaling is enabled.", rr = "Controls where trend data is fetched from. In most setups, keep Auto (recommended), which prefers statistics and falls back to history automatically.", oo = [
  ro("Center visuals", "mdi:palette-outline", [
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
                helper: Zt,
                description: Zt
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
                helper: tr,
                description: tr
              },
              {
                name: "decimals_base_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: er,
                description: er
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
                helper: Jt,
                description: Jt
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: Qt,
                description: Qt
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
                selector: no,
                helper: rr,
                description: rr
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
            helper: Ht,
            description: Ht
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
                selector: { entity: { filter: { domain: "sensor" } } },
                helper: Dt,
                description: Dt
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
      q("Calculation", [
        {
          name: "solar_auto_calculate",
          selector: { boolean: {} },
          helper: Lt,
          description: Lt
        }
      ]),
      q("Trend", [
        { name: "solar_trend", selector: { boolean: {} } },
        {
          name: "solar_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ])
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
            helper: kt,
            description: kt
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
                selector: { entity: { filter: { domain: "sensor" } } },
                helper: Gt,
                description: Gt
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
      q("Trend", [
        { name: "grid_trend", selector: { boolean: {} } },
        {
          name: "grid_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      q("Export", [
        {
          name: "grid_export_highlight",
          selector: { boolean: {} },
          helper: ze,
          description: ze
        },
        {
          name: "grid_export_trend_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        },
        {
          name: "grid_export_icon_highlight",
          selector: { boolean: {} },
          helper: Pe,
          description: Pe
        },
        {
          name: "grid_export_icon_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        }
      ])
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
            helper: Nt,
            description: Nt
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
                selector: { entity: { filter: { domain: "sensor" } } },
                helper: qt,
                description: qt
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
      q("Trend", [
        { name: "grid_secondary_trend", selector: { boolean: {} } },
        {
          name: "grid_secondary_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      q("Export", [
        {
          name: "grid_secondary_export_highlight",
          selector: { boolean: {} },
          helper: ze,
          description: ze
        },
        {
          name: "grid_secondary_export_trend_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        },
        {
          name: "grid_secondary_export_icon_highlight",
          selector: { boolean: {} },
          helper: Pe,
          description: Pe
        },
        {
          name: "grid_secondary_export_icon_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        }
      ])
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
            helper: Bt,
            description: Bt
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
                selector: { entity: { filter: { domain: "sensor" } } },
                helper: Ft,
                description: Ft
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
      q("Calculation", [
        {
          name: "home_auto_calculate",
          selector: { boolean: {} },
          helper: It,
          description: It
        }
      ]),
      q("Trend", [
        { name: "home_trend", selector: { boolean: {} } },
        {
          name: "home_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ])
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
            helper: Vt,
            description: Vt
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
                selector: { entity: { filter: { domain: "sensor" } } },
                helper: Ut,
                description: Ut
              },
              { name: "battery_percentage_entity", selector: { entity: { filter: { domain: "sensor" } } } }
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
      q("Trend", [
        { name: "battery_trend", selector: { boolean: {} } },
        {
          name: "battery_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
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
                helper: Oe,
                description: Oe
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
            helper: Wt,
            description: Wt
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
                selector: { entity: { filter: { domain: "sensor" } } },
                helper: jt,
                description: jt
              },
              { name: "battery_secondary_percentage_entity", selector: { entity: { filter: { domain: "sensor" } } } }
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
      q("Trend", [
        { name: "battery_secondary_trend", selector: { boolean: {} } },
        {
          name: "battery_secondary_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
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
                helper: Oe,
                description: Oe
              }
            ]
          }
        ]
      }
    ]
  },
  qe("solar", "Solar sub blocks", "mdi:solar-power-variant", Js),
  qe("grid", "Grid 1 sub blocks", "mdi:transmission-tower", Zr),
  qe("grid_secondary", "Grid 2 sub blocks", "mdi:transmission-tower", Zr),
  qe("home", "Home sub blocks", "mdi:flash", Qs),
  {
    type: "expandable",
    name: "",
    title: "Actions",
    icon: "mdi:gesture-tap",
    expanded: !1,
    schema: [
      {
        name: "entity",
        selector: { entity: {} },
        helper: "Default entity used by more-info actions. Required when tap/hold/double-tap is set to 'More info'.",
        description: "Default entity used by more-info actions. Required when tap/hold/double-tap is set to 'More info'."
      },
      { name: "tap_action", selector: { ui_action: {} } },
      { name: "hold_action", selector: { ui_action: {} } },
      { name: "double_tap_action", selector: { ui_action: {} } }
    ]
  }
], ao = {
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
  hold_action: "Hold behavior",
  double_tap_action: "Double tap behavior"
};
let tt = class extends U {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = e.name ?? "", r = t.match(
        /^(solar|home|grid|grid_secondary)_sub_(\d+)_(enabled|entity|label|icon|icon_color|state_mode)$/
      );
      if (r) {
        const [, , , n] = r;
        return {
          enabled: "Enabled",
          entity: "Entity",
          label: "Label",
          icon: "Icon",
          icon_color: "Color",
          state_mode: "State mode"
        }[n] ?? n;
      }
      return ao[t] ?? t;
    }, this.computeHelper = (e) => {
      const t = e.name ?? "";
      if (t === "solar_entity")
        return Dt;
      if (t === "grid_entity")
        return Gt;
      if (t === "grid_secondary_entity")
        return qt;
      if (t === "home_entity")
        return Ft;
      if (t === "battery_entity")
        return Ut;
      if (t === "battery_secondary_entity")
        return jt;
      if (/^(solar|home|grid|grid_secondary)_sub_\d+_icon_color$/.test(t))
        return Yt;
      if (/^(home|grid|grid_secondary)_sub_\d+_state_mode$/.test(t))
        return Xt;
      if (/^solar_sub_\d+_state_mode$/.test(t))
        return Kt;
      if (t === "solar_visible")
        return Ht;
      if (t === "home_visible")
        return Bt;
      if (t === "battery_visible")
        return Vt;
      if (t === "battery_secondary_visible")
        return Wt;
      if (t === "solar_auto_calculate")
        return Lt;
      if (t === "home_auto_calculate")
        return It;
      if (t === "grid_visible")
        return kt;
      if (t === "grid_secondary_visible")
        return Nt;
      if (t === "grid_export_highlight" || t === "grid_secondary_export_highlight")
        return ze;
      if (t === "grid_export_icon_highlight" || t === "grid_secondary_export_icon_highlight")
        return Pe;
      if (t === "battery_low_alert_color" || t === "battery_secondary_low_alert_color")
        return Oe;
      if (t === "unit")
        return Jt;
      if (t === "decimals")
        return Qt;
      if (t === "decimals_base_unit")
        return er;
      if (t === "decimals_prefixed_unit")
        return tr;
      if (t === "trend_data_source")
        return rr;
      if (t === "auto_scale_units")
        return Zt;
    }, this.valueChanged = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement) || t.tagName !== "HA-FORM")
        return;
      const r = e.detail.value;
      if (!r || typeof r != "object" || Array.isArray(r))
        return;
      const n = {
        ...r,
        trend_data_source: so(r.trend_data_source),
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
  setConfig(e) {
    this._config = {
      ...e,
      home_visible: e.home_visible ?? !0,
      solar_visible: e.solar_visible ?? !0,
      grid_visible: e.grid_visible ?? !0,
      grid_secondary_visible: e.grid_secondary_visible ?? !1,
      battery_visible: e.battery_visible ?? !0,
      battery_secondary_visible: e.battery_secondary_visible ?? !1,
      battery_dual_alignment: e.battery_dual_alignment ?? "center",
      home_auto_calculate: e.home_auto_calculate ?? !1,
      solar_auto_calculate: e.solar_auto_calculate ?? !1,
      grid_export_highlight: e.grid_export_highlight ?? !1,
      grid_export_trend_color: e.grid_export_trend_color ?? "red",
      grid_export_icon_highlight: e.grid_export_icon_highlight ?? !1,
      grid_export_icon_color: e.grid_export_icon_color ?? "red",
      grid_secondary_export_highlight: e.grid_secondary_export_highlight ?? !1,
      grid_secondary_export_trend_color: e.grid_secondary_export_trend_color ?? "red",
      grid_secondary_export_icon_highlight: e.grid_secondary_export_icon_highlight ?? !1,
      grid_secondary_export_icon_color: e.grid_secondary_export_icon_color ?? "red",
      battery_low_alert_color: e.battery_low_alert_color ?? "red",
      battery_secondary_low_alert_color: e.battery_secondary_low_alert_color ?? "red",
      shared_trend_scale: e.shared_trend_scale ?? !1,
      trend_data_source: io(e.trend_data_source),
      debug_performance: e.debug_performance ?? !1,
      decimals: e.decimals ?? 1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: e.decimals_base_unit ?? e.decimals ?? 1,
      decimals_prefixed_unit: e.decimals_prefixed_unit ?? e.decimals ?? 1,
      type: "custom:power-pilz-energy-card"
    };
  }
  render() {
    return !this.hass || !this._config ? $ : E`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Be}
      </div>
      <div style="margin: 0 0 14px; color: var(--secondary-text-color); line-height: 1.4;">
        Highly flexible energy flow card with configurable main nodes, trends, sub-nodes, auto calculations,
        export highlighting, and advanced unit handling.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${oo}
        .computeLabel=${this.computeLabel}
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
mr([
  L({ attribute: !1 })
], tt.prototype, "hass", 2);
mr([
  O()
], tt.prototype, "_config", 2);
tt = mr([
  ue("power-pilz-energy-card-editor")
], tt);
var lo = Object.defineProperty, co = Object.getOwnPropertyDescriptor, Q = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? co(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && lo(t, r, i), i;
};
const I = 0.01, $e = 1, be = 1440 * 60 * 1e3, Jr = 300 * 1e3, Qr = 60 * 1e3, ho = 350, en = 4, tn = 8, Pt = 2, uo = 260, _o = 220, rn = -1e-6, oe = "red", mo = "var(--rgb-primary-text-color, 33, 33, 33)", po = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", ");
let W = class extends U {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._showSubBlocks = !1, this._compactSubBlocks = !1, this._subNodeConnectorSegments = [], this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._isVisible = !1, this._liveRuntimeActive = !1, this._trendDrawConfig = {}, this.handleCardKeyDown = (e) => {
      e.key !== "Enter" && e.key !== " " || (e.preventDefault(), this.fireAction("tap"));
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-energy-card-editor");
  }
  static async getStubConfig(e) {
    const t = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(t), n = (...d) => d.find((h) => h in t), i = (d) => r.find((h) => h.startsWith(`${d}.`)), s = n("sensor.dev_home_power", "sensor.house_consumption_power") ?? i("sensor") ?? "sensor.dev_home_power", o = n("sensor.dev_solar_power", "sensor.solar_production_power") ?? i("sensor"), a = n("sensor.dev_grid_power", "sensor.grid_power") ?? i("sensor"), l = n("sensor.dev_battery_power", "sensor.home_battery_power") ?? i("sensor"), c = n("sensor.dev_battery_soc", "sensor.home_battery_soc") ?? i("sensor");
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
      home_entity: s,
      home_auto_calculate: !1,
      solar_auto_calculate: !1,
      solar_entity: o,
      grid_entity: a,
      battery_entity: l,
      battery_percentage_entity: c,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      auto_scale_units: !1,
      decimals: $e,
      decimals_base_unit: $e,
      decimals_prefixed_unit: $e
    };
  }
  setConfig(e) {
    const t = e.home_entity ?? e.consumption_entity ?? "sensor.dev_home_power", r = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : $e, n = re(e.decimals_base_unit, r), i = re(e.decimals_prefixed_unit, r);
    this._config = {
      ...e,
      name: e.name ?? "Energy Flow",
      home_visible: e.home_visible ?? !0,
      solar_visible: e.solar_visible ?? !0,
      grid_visible: e.grid_visible ?? !0,
      grid_secondary_visible: e.grid_secondary_visible ?? !1,
      battery_visible: e.battery_visible ?? !0,
      battery_secondary_visible: e.battery_secondary_visible ?? !1,
      battery_dual_alignment: this.normalizeBatteryDualAlignment(e.battery_dual_alignment),
      home_entity: t,
      home_auto_calculate: e.home_auto_calculate ?? !1,
      solar_auto_calculate: e.solar_auto_calculate ?? !1,
      solar_entity: e.solar_entity ?? e.production_entity,
      solar_sub_enabled: e.solar_sub_enabled ?? !1,
      solar_sub_label: e.solar_sub_label ?? "Solar Sub",
      solar_sub_icon: e.solar_sub_icon ?? "mdi:solar-power-variant",
      home_sub_enabled: e.home_sub_enabled ?? !1,
      home_sub_label: e.home_sub_label ?? "Home Load",
      home_sub_icon: e.home_sub_icon ?? "mdi:flash",
      grid_label: e.grid_label ?? "Grid",
      grid_secondary_label: e.grid_secondary_label ?? "Grid 2",
      solar_label: e.solar_label ?? "Solar",
      home_label: e.home_label ?? "Home",
      battery_label: e.battery_label ?? "Battery",
      battery_secondary_label: e.battery_secondary_label ?? "Battery 2",
      solar_icon: e.solar_icon ?? "mdi:weather-sunny",
      grid_icon: e.grid_icon ?? "mdi:transmission-tower",
      grid_secondary_icon: e.grid_secondary_icon ?? "mdi:transmission-tower",
      home_icon: e.home_icon ?? "mdi:home-lightning-bolt",
      battery_secondary_icon: e.battery_secondary_icon ?? "mdi:battery-outline",
      core_icon: e.core_icon ?? "mdi:home",
      core_icon_color: e.core_icon_color,
      solar_trend: e.solar_trend ?? !1,
      grid_trend: e.grid_trend ?? !1,
      grid_secondary_trend: e.grid_secondary_trend ?? !1,
      home_trend: e.home_trend ?? !1,
      battery_trend: e.battery_trend ?? !1,
      battery_secondary_trend: e.battery_secondary_trend ?? !1,
      grid_export_highlight: e.grid_export_highlight ?? !1,
      grid_export_trend_color: e.grid_export_trend_color ?? oe,
      grid_export_icon_highlight: e.grid_export_icon_highlight ?? !1,
      grid_export_icon_color: e.grid_export_icon_color ?? oe,
      grid_secondary_export_highlight: e.grid_secondary_export_highlight ?? !1,
      grid_secondary_export_trend_color: e.grid_secondary_export_trend_color ?? oe,
      grid_secondary_export_icon_highlight: e.grid_secondary_export_icon_highlight ?? !1,
      grid_secondary_export_icon_color: e.grid_secondary_export_icon_color ?? oe,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      trend_data_source: B(e.trend_data_source, "hybrid"),
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: n,
      decimals_prefixed_unit: i,
      battery_low_alert: e.battery_low_alert ?? !1,
      battery_low_threshold: this.normalizeBatteryThreshold(e.battery_low_threshold),
      battery_low_alert_color: e.battery_low_alert_color ?? oe,
      battery_secondary_low_alert: e.battery_secondary_low_alert ?? !1,
      battery_secondary_low_threshold: this.normalizeBatteryThreshold(e.battery_secondary_low_threshold),
      battery_secondary_low_alert_color: e.battery_secondary_low_alert_color ?? oe,
      flow_color: e.flow_color,
      decimals: r
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
      return E`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return E``;
    const e = this._config, t = e.decimals ?? $e, r = e.home_visible !== !1, n = e.solar_visible !== !1, i = e.grid_visible !== !1, s = i && e.grid_secondary_visible === !0, o = e.battery_visible !== !1, a = o && e.battery_secondary_visible === !0, l = this.normalizeBatteryDualAlignment(e.battery_dual_alignment), c = n ? this.collectSubBlocks("solar", e) : [], d = c.filter((P) => !P.stateMode), h = i ? this.collectSubBlocks("grid", e) : [], m = s ? this.collectSubBlocks("grid_secondary", e) : [], u = r ? this.collectSubBlocks("home", e) : [], _ = D(this.hass, e.home_entity), x = n ? D(this.hass, e.solar_entity) : null, f = i ? D(this.hass, e.grid_entity) : null, y = s ? D(this.hass, e.grid_secondary_entity) : null, b = o ? D(this.hass, e.battery_entity) : null, v = D(this.hass, e.battery_percentage_entity), w = a ? D(this.hass, e.battery_secondary_entity) : null, S = D(this.hass, e.battery_secondary_percentage_entity), p = e.unit ?? "kW", g = H(this.hass, e.solar_entity) ?? p, C = H(this.hass, e.grid_entity) ?? p, T = H(this.hass, e.grid_secondary_entity) ?? p, R = H(this.hass, e.battery_entity), A = H(this.hass, e.battery_percentage_entity), z = H(this.hass, e.battery_secondary_entity), F = H(this.hass, e.battery_secondary_percentage_entity), k = R ?? p, G = z ?? p, me = this.resolveBatteryPercentage(
      v,
      b,
      R
    ), pe = this.resolveBatteryPercentage(
      S,
      w,
      z
    ), ct = !!this.readConfigString(e.battery_percentage_entity) || this.isPercentageUnit(R), dt = !!this.readConfigString(e.battery_secondary_percentage_entity) || this.isPercentageUnit(z), Ce = e.solar_auto_calculate === !0 ? this.resolveAutoSolarUnit(e, d, p) : g, Ee = e.solar_auto_calculate === !0 ? this.computeAutoSolarValueFromSubBlocks(d, Ce) : x, ht = e.home_auto_calculate === !0 ? this.resolveAutoHomeUnit(e, p, Ce) : H(this.hass, e.home_entity) ?? p, Fe = e.home_auto_calculate === !0 ? this.computeAutoHomeValueFromNodeValues(
      {
        solar: Ee,
        grid: f,
        grid_secondary: y,
        battery: b,
        battery_secondary: w
      },
      {
        solar: Ce,
        grid: C,
        grid_secondary: T,
        battery: k,
        battery_secondary: G
      },
      ht
    ) : _, ai = ct ? A ?? "%" : k, li = dt ? F ?? "%" : G, ci = this.toUnidirectionalFlow(Ee), di = this.toUnidirectionalFlow(Fe), hi = this.toBidirectionalFlow(f), ui = this.toBidirectionalFlow(y), _i = this.sumComparableValues([
      { value: f, unit: C },
      { value: y, unit: T }
    ]), mi = f === null && y === null ? "none" : this.toBidirectionalFlow(_i), pi = this.toBidirectionalFlow(b), fi = this.toBidirectionalFlow(w), yi = this.sumComparableValues([
      { value: b, unit: k },
      { value: w, unit: G }
    ]), bi = b === null && w === null ? "none" : this.toBidirectionalFlow(yi), gi = this.hasConfiguredAction(e), ut = !this.isEditorPreview() && gi, vi = this.iconColorStyle(e.solar_icon_color), wi = this.iconColorStyle(e.home_icon_color), xi = this.iconShapeStyle(e.core_icon_color), _t = new Set(u.map((P) => P.index)), fe = new Set(c.map((P) => P.index)), Si = _t.has(7) && _t.has(8), Ci = [5, 6, 7, 8].some((P) => _t.has(P)), Ei = fe.has(1) && fe.has(2) && !fe.has(3) && !fe.has(4), Ti = fe.has(3) && fe.has(4), wr = s && (Ei && Si || Ti && Ci), $i = s && !wr, mt = u.some((P) => P.index >= 7), xr = this.homeSubPositions(mt), Sr = this.gridSubPositions(s), Cr = this.gridSecondarySubPositions(), Er = this.solarSubPositions(
      mt,
      $i,
      wr
    ), Tr = u.filter((P) => P.index <= (mt ? 8 : 6)), pt = i ? { col: 1, row: s ? 2 : 3, colSpan: 2, rowSpan: 2 } : null, ft = s ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 } : null, yt = o ? {
      col: a && l === "center" ? 2 : 3,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, bt = a ? {
      col: l === "left" ? 1 : l === "right" ? 5 : 4,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, N = this.computeGridBounds(
      r,
      n,
      i,
      s,
      o,
      a,
      pt,
      ft,
      yt,
      bt,
      c,
      h,
      m,
      Tr,
      Er,
      Sr,
      Cr,
      xr
    ), gt = n ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, N) : null, Ve = pt ? this.normalizePlacement(pt, N) : null, Ue = ft ? this.normalizePlacement(ft, N) : null, vt = r ? this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, N) : null, We = yt ? this.normalizePlacement(yt, N) : null, je = bt ? this.normalizePlacement(bt, N) : null, $r = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, N), Ri = this.normalizePositions(Er, N), Mi = this.normalizePositions(Sr, N), Ai = this.normalizePositions(Cr, N), zi = this.normalizePositions(xr, N), Rr = this.normalizeBatteryThreshold(e.battery_low_threshold), Mr = !!e.battery_low_alert, Ar = this.normalizeBatteryThreshold(e.battery_secondary_low_threshold), zr = !!e.battery_secondary_low_alert, Ge = this.resolveColor(oe), wt = this.resolveColor(e.battery_low_alert_color, Ge), xt = this.resolveColor(
      e.battery_secondary_low_alert_color,
      Ge
    ), St = Mr && me !== null && me <= Rr, Pi = this.iconColorStyle(
      St ? wt : e.battery_icon_color
    ), Oi = this.batteryIcon(
      me,
      this.isPercentageUnit(R) ? null : b,
      e.battery_icon
    ), Ct = zr && pe !== null && pe <= Ar, Li = this.iconColorStyle(
      Ct ? xt : e.battery_secondary_icon_color
    ), Ii = this.batteryIcon(
      pe,
      this.isPercentageUnit(z) ? null : w,
      e.battery_secondary_icon
    ), ki = f !== null && Number.isFinite(f) && f < 0, Ni = y !== null && Number.isFinite(y) && y < 0, Hi = this.iconColorStyle(
      e.grid_export_icon_highlight === !0 && ki ? e.grid_export_icon_color : e.grid_icon_color
    ), Di = this.iconColorStyle(
      e.grid_secondary_export_icon_highlight === !0 && Ni ? e.grid_secondary_export_icon_color : e.grid_secondary_icon_color
    ), Bi = { "--flow-color-rgb": this.toRgbCss(e.flow_color) ?? mo }, ye = this.resolveColor("purple"), Fi = this.resolveColor(e.solar_trend_color, ye), Vi = this.resolveColor(e.grid_trend_color, ye), Ui = this.resolveColor(e.grid_secondary_trend_color, ye), Wi = this.resolveColor(e.grid_export_trend_color, Ge), ji = this.resolveColor(
      e.grid_secondary_export_trend_color,
      Ge
    ), Gi = this.resolveColor(e.home_trend_color, ye), qi = this.resolveColor(e.battery_trend_color, ye), Yi = this.resolveColor(e.battery_secondary_trend_color, ye), Xi = e.grid_export_highlight === !0 ? rn : null, Ki = e.grid_secondary_export_highlight === !0 ? rn : null, Zi = Mr && ct ? Rr : null, Ji = ct ? me : b, Qi = zr && dt ? Ar : null, es = dt ? pe : w, ts = this.buildFlowSegments(
      vt,
      $r,
      gt,
      [
        ...Ve ? [{ placement: Ve, direction: hi }] : [],
        ...Ue ? [{ placement: Ue, direction: ui }] : []
      ],
      mi,
      [
        ...We ? [{ placement: We, direction: pi }] : [],
        ...je ? [{ placement: je, direction: fi }] : []
      ],
      bi,
      ci,
      di,
      N
    );
    return E`
      <ha-card
        class=${ut ? "interactive" : ""}
        tabindex=${ut ? 0 : -1}
        role=${ut ? "button" : "article"}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div
            class="energy-grid"
            style=${M({
      ...Bi,
      "--grid-columns": `${N.cols}`,
      "--grid-rows": `${N.rows}`,
      "--grid-aspect": `${N.cols} / ${N.rows}`
    })}
          >
            ${ts.map(
      (P) => this.renderFlowLine(P.orientation, P.direction, {
        ...P.orientation === "horizontal" ? {
          left: `${P.left}%`,
          top: `calc(${P.top}% - (var(--flow-line-size) / 2))`,
          width: `${P.width}%`
        } : {
          left: `calc(${P.left}% - (var(--flow-line-size) / 2))`,
          top: `${P.top}%`,
          height: `${P.height}%`
        }
      })
    )}
            ${this.renderSubNodeConnectors()}

            ${n && gt ? E`
                  <div
                    class="energy-value solar ${Ee === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(gt))}
                  >
                    ${this.renderTrend("solar", Ee, Ce, !!e.solar_trend, Fi, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.solar_icon ?? "mdi:weather-sunny"}
                        style=${M(vi)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(Ee, Ce, t)}</div>
                      <div class="energy-label">${e.solar_label}</div>
                    </div>
                  </div>
                ` : $}

            ${i && Ve ? E`
                  <div
                    class="energy-value grid ${f === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Ve))}
                  >
                    ${this.renderTrend(
      "grid",
      f,
      C,
      !!e.grid_trend,
      Vi,
      Xi,
      Wi
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_icon ?? "mdi:transmission-tower"}
                        style=${M(Hi)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(f, C, t)}</div>
                      <div class="energy-label">${e.grid_label}</div>
                    </div>
                  </div>
                ` : $}

            ${s && Ue ? E`
                  <div
                    class="energy-value grid-secondary ${y === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Ue))}
                  >
                    ${this.renderTrend(
      "grid_secondary",
      y,
      T,
      !!e.grid_secondary_trend,
      Ui,
      Ki,
      ji
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${M(Di)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(y, T, t)}</div>
                      <div class="energy-label">${e.grid_secondary_label}</div>
                    </div>
                  </div>
                ` : $}

            ${r && vt ? E`
                  <div
                    class="energy-value home ${Fe === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(vt))}
                  >
                    ${this.renderTrend("home", Fe, ht, !!e.home_trend, Gi, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.home_icon ?? "mdi:home-lightning-bolt"}
                        style=${M(wi)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(Fe, ht, t)}</div>
                      <div class="energy-label">${e.home_label}</div>
                    </div>
                  </div>
                ` : $}

            ${this._showSubBlocks ? this.renderSubNodes("solar", c, Ri, t) : $}
            ${this._showSubBlocks ? this.renderSubNodes("grid", h, Mi, t) : $}
            ${this._showSubBlocks ? this.renderSubNodes("grid_secondary", m, Ai, t) : $}
            ${this._showSubBlocks ? this.renderSubNodes("home", Tr, zi, t) : $}

            ${o && We ? E`
                  <div
                    class="energy-value battery ${b === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(We))}
                  >
                    ${this.renderTrend(
      "battery",
      Ji,
      ai,
      !!e.battery_trend,
      qi,
      Zi,
      wt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon class="energy-icon" .icon=${Oi} style=${M(Pi)}></ha-icon>
                        ${me !== null ? E`
                              <div
                                class="battery-percentage ${St ? "alert" : ""}"
                                style=${M(St ? { color: wt } : {})}
                              >
                                ${this.formatBatteryPercentage(me)}
                              </div>
                            ` : $}
                      </div>
                      <div class="energy-number">${this.formatValue(b, k, t)}</div>
                      <div class="energy-label">${e.battery_label}</div>
                    </div>
                  </div>
                ` : $}

            ${a && je ? E`
                  <div
                    class="energy-value battery-secondary ${w === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(je))}
                  >
                    ${this.renderTrend(
      "battery_secondary",
      es,
      li,
      !!e.battery_secondary_trend,
      Yi,
      Qi,
      xt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${Ii}
                          style=${M(Li)}
                        ></ha-icon>
                        ${pe !== null ? E`
                              <div
                                class="battery-percentage ${Ct ? "alert" : ""}"
                                style=${M(Ct ? { color: xt } : {})}
                              >
                                ${this.formatBatteryPercentage(pe)}
                              </div>
                            ` : $}
                      </div>
                      <div class="energy-number">${this.formatValue(w, G, t)}</div>
                      <div class="energy-label">${e.battery_secondary_label}</div>
                    </div>
                  </div>
                ` : $}

            <div class="home-core" style=${M(this.gridPlacementStyle($r))}>
              <div class="home-core-icon" style=${M(xi)}>
                <ha-icon .icon=${e.core_icon ?? "mdi:home"}></ha-icon>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderFlowLine(e, t, r) {
    const n = t === "none" ? `flow-line dynamic ${e}` : `flow-line dynamic ${e} active ${t}`;
    return E`<div class=${n} style=${M(r)} aria-hidden="true"></div>`;
  }
  renderSubNodeConnectors() {
    return !this._showSubBlocks || this._subNodeConnectorSegments.length === 0 ? $ : E`
      <div class="subnode-connectors" aria-hidden="true">
        ${this._subNodeConnectorSegments.map(
      (e) => E`
            <div
              class="subnode-connector-segment ${e.node}"
              style=${M({
        left: `${e.left}px`,
        top: `${e.top}px`,
        width: `${e.width}px`,
        height: `${e.height}px`
      })}
            ></div>
          `
    )}
      </div>
    `;
  }
  collectSubBlocks(e, t) {
    if (!this.hass)
      return [];
    const r = [], n = e === "solar" ? "mdi:solar-power-variant" : e === "home" ? "mdi:flash" : "mdi:transmission-tower", i = e === "solar" ? "Solar" : e === "home" ? "Home" : e === "grid" ? "Grid" : "Grid 2", s = e === "solar" ? en : e === "home" ? tn : Pt;
    for (let h = 1; h <= s; h += 1) {
      const m = t[`${e}_sub_${h}_enabled`] === !0, u = this.readConfigString(t[`${e}_sub_${h}_entity`]);
      if (!m || !u)
        continue;
      const _ = t[`${e}_sub_${h}_state_mode`] === !0;
      r.push({
        key: `${e}_${h}`,
        index: h,
        icon: this.readConfigString(t[`${e}_sub_${h}_icon`]) ?? n,
        iconStyle: this.iconColorStyle(t[`${e}_sub_${h}_icon_color`]),
        label: this.readConfigString(t[`${e}_sub_${h}_label`]) ?? `${i} ${h}`,
        value: D(this.hass, u),
        unit: H(this.hass, u) ?? t.unit ?? "kW",
        stateMode: _,
        stateText: _ ? Ze(this.hass, u) : void 0
      });
    }
    if (r.length > 0)
      return r;
    if (e !== "solar" && e !== "home")
      return [];
    const o = e === "solar" ? !!t.solar_sub_enabled : !!t.home_sub_enabled, a = e === "solar" ? t.solar_sub_entity : t.home_sub_entity;
    if (!o || !a)
      return [];
    const l = e === "solar" ? t.solar_sub_icon ?? n : t.home_sub_icon ?? n, c = e === "solar" ? t.solar_sub_icon_color : t.home_sub_icon_color, d = e === "solar" ? t.solar_sub_label ?? "Solar Sub" : t.home_sub_label ?? "Home Load";
    return [
      {
        key: `${e}_legacy`,
        index: 1,
        icon: l,
        iconStyle: this.iconColorStyle(c),
        label: d,
        value: D(this.hass, a),
        unit: H(this.hass, a) ?? t.unit ?? "kW",
        stateMode: !1
      }
    ];
  }
  solarSubPositions(e, t = !1, r = !1) {
    return t ? {
      1: { row: 1, col: 5 },
      2: { row: 1, col: 6 },
      3: { row: 1, col: 2 },
      4: { row: 1, col: 1 }
    } : e || r ? {
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
  homeSubPositions(e) {
    return e ? {
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
  gridSubPositions(e) {
    return e ? {
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
  gridPlacementStyle(e) {
    const t = e.colSpan ?? 1, r = e.rowSpan ?? 1;
    return {
      "grid-column": `${e.col} / span ${t}`,
      "grid-row": `${e.row} / span ${r}`
    };
  }
  normalizePlacement(e, t) {
    return {
      col: e.col - t.minCol + 1,
      row: e.row - t.minRow + 1,
      colSpan: e.colSpan ?? 1,
      rowSpan: e.rowSpan ?? 1
    };
  }
  normalizePositions(e, t) {
    const r = {};
    return Object.entries(e).forEach(([n, i]) => {
      r[Number(n)] = {
        row: i.row - t.minRow + 1,
        col: i.col - t.minCol + 1
      };
    }), r;
  }
  computeGridBounds(e, t, r, n, i, s, o, a, l, c, d, h, m, u, _, x, f, y) {
    const b = [{ col: 3, row: 3, colSpan: 2, rowSpan: 2 }];
    e && b.push({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }), t && b.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }), r && o && b.push(o), n && a && b.push(a), i && l && b.push(l), s && c && b.push(c), d.forEach((g) => {
      const C = _[g.index];
      C && b.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), h.forEach((g) => {
      const C = x[g.index];
      C && b.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), m.forEach((g) => {
      const C = f[g.index];
      C && b.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), u.forEach((g) => {
      const C = y[g.index];
      C && b.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    });
    const v = Math.min(...b.map((g) => g.col)), w = Math.max(...b.map((g) => g.col + (g.colSpan ?? 1) - 1)), S = Math.min(...b.map((g) => g.row)), p = Math.max(...b.map((g) => g.row + (g.rowSpan ?? 1) - 1));
    return {
      minCol: v,
      maxCol: w,
      minRow: S,
      maxRow: p,
      cols: w - v + 1,
      rows: p - S + 1
    };
  }
  placementCenter(e, t) {
    const r = e.colSpan ?? 1, n = e.rowSpan ?? 1;
    return {
      x: (e.col - 1 + r / 2) / t.cols * 100,
      y: (e.row - 1 + n / 2) / t.rows * 100
    };
  }
  buildFlowSegments(e, t, r, n, i, s, o, a, l, c) {
    const d = this.placementCenter(t, c), h = [], m = (_, x, f, y) => {
      const b = Math.min(_, x), v = Math.abs(x - _);
      v <= I || h.push({
        orientation: "horizontal",
        direction: y,
        left: b,
        top: f,
        width: v,
        height: 0
      });
    }, u = (_, x, f, y) => {
      const b = Math.min(_, x), v = Math.abs(x - _);
      v <= I || h.push({
        orientation: "vertical",
        direction: y,
        left: f,
        top: b,
        width: 0,
        height: v
      });
    };
    if (e) {
      const _ = this.placementCenter(e, c);
      m(d.x, _.x, d.y, l);
    }
    if (r) {
      const _ = this.placementCenter(r, c);
      u(_.y, d.y, d.x, a);
    }
    if (n.length === 1) {
      const [{ placement: _, direction: x }] = n, f = this.placementCenter(_, c);
      m(f.x, d.x, d.y, x);
    } else if (n.length >= 2) {
      const _ = n.map((y) => ({
        direction: y.direction,
        center: this.placementCenter(y.placement, c)
      })).sort((y, b) => y.center.y - b.center.y), x = Math.min(..._.map((y) => y.center.x)), f = d.x - (d.x - x) * 0.5;
      m(d.x, f, d.y, i), _.forEach((y) => {
        const b = y.center.y > d.y + I ? this.reverseFlowDirection(y.direction) : y.direction;
        u(d.y, y.center.y, f, b), m(y.center.x, f, y.center.y, y.direction);
      });
    }
    if (s.length === 1) {
      const [{ placement: _, direction: x }] = s, f = this.placementCenter(_, c);
      u(d.y, f.y, d.x, x);
    } else if (s.length >= 2) {
      const _ = s.map((y) => ({
        placement: y.placement,
        direction: y.direction,
        center: this.placementCenter(y.placement, c)
      })).sort((y, b) => y.center.y - b.center.y), x = Math.min(
        ..._.map((y) => (y.placement.row - 1) / c.rows * 100)
      ), f = Math.max(d.y + I, x);
      u(d.y, f, d.x, o), _.forEach((y) => {
        const b = y.center.x < d.x - I ? this.reverseFlowDirection(y.direction) : y.direction;
        m(d.x, y.center.x, f, b), u(f, y.center.y, y.center.x, y.direction);
      });
    }
    return h;
  }
  renderSubNodes(e, t, r, n) {
    return t.length === 0 ? $ : E`
      ${t.map((i) => {
      var u;
      const s = r[i.index];
      if (!s)
        return $;
      const o = {
        "grid-column": `${s.col}`,
        "grid-row": `${s.row}`
      }, a = ((u = i.stateText) == null ? void 0 : u.trim()) ?? "", l = i.stateMode, c = a.length === 0, d = l ? c ? "--" : a : this.formatValue(i.value, i.unit, n), h = l ? { value: d, unit: "" } : this.splitFormattedValueAndUnit(d, i.unit), m = l ? c : i.value === null;
      return E`
            <div
              class="energy-sub-value ${e}-sub sub-col-${s.col} ${this._compactSubBlocks ? "compact" : ""} ${m ? "missing" : ""}"
              data-key=${i.key}
              style=${M(o)}
            >
              <div class="energy-sub-content">
                <ha-icon class="energy-sub-icon" .icon=${i.icon} style=${M(i.iconStyle)}></ha-icon>
                <div class="energy-sub-number">${this._compactSubBlocks ? h.value : d}</div>
                ${l ? $ : E`<div class="energy-sub-unit">${h.unit}</div>`}
                <div class="energy-sub-label">${i.label}</div>
              </div>
            </div>
          `;
    })}
    `;
  }
  readConfigString(e) {
    if (typeof e != "string")
      return;
    const t = e.trim();
    return t.length > 0 ? t : void 0;
  }
  resolveAutoSolarUnit(e, t, r) {
    const n = e.unit;
    if (n && n.trim().length > 0)
      return n;
    const i = t.map((o) => o.unit).find((o) => typeof o == "string" && o.trim().length > 0);
    if (i)
      return i;
    const s = H(this.hass, e.solar_entity);
    return s && s.trim().length > 0 ? s : r;
  }
  computeAutoSolarValueFromSubBlocks(e, t) {
    const r = e.filter(
      (l) => l.value !== null && Number.isFinite(l.value)
    );
    if (r.length === 0)
      return null;
    const n = r.reduce((l, c) => l + c.value, 0);
    let i = null, s = 0;
    for (const l of r) {
      const c = J(l.unit);
      if (!c)
        return n <= I ? 0 : n;
      if (i === null)
        i = c.family;
      else if (i !== c.family)
        return n <= I ? 0 : n;
      s += l.value * c.factor;
    }
    let o = s;
    const a = J(t);
    return a && i !== null && a.family === i && a.factor > 0 && (o /= a.factor), Number.isFinite(o) ? o <= I ? 0 : o : null;
  }
  homeComputationDependencies(e) {
    const t = [], r = (n, i) => {
      i && t.push({ role: n, entityId: i });
    };
    return e.solar_visible !== !1 && r("solar", this.readConfigString(e.solar_entity)), e.grid_visible !== !1 && (r("grid", this.readConfigString(e.grid_entity)), e.grid_secondary_visible === !0 && r("grid_secondary", this.readConfigString(e.grid_secondary_entity))), e.battery_visible !== !1 && (r("battery", this.readConfigString(e.battery_entity)), e.battery_secondary_visible === !0 && r("battery_secondary", this.readConfigString(e.battery_secondary_entity))), t;
  }
  resolveAutoHomeUnit(e, t, r) {
    const n = e.unit;
    if (n && n.trim().length > 0)
      return n;
    if (e.solar_auto_calculate === !0 && e.solar_visible !== !1 && r && r.trim().length > 0)
      return r;
    const i = this.homeComputationDependencies(e);
    for (const s of i) {
      const o = H(this.hass, s.entityId);
      if (o && o.trim().length > 0)
        return o;
    }
    return t;
  }
  computeAutoHomeValueFromNodeValues(e, t, r) {
    if (!Object.values(e).some((d) => d != null && Number.isFinite(d)))
      return null;
    const i = {};
    let s = 0;
    t && Object.keys(e).forEach((d) => {
      const h = e[d], m = t[d];
      h != null && Number.isFinite(h) && (s += 1, m && (i[d] = m));
    });
    const o = Object.keys(i).length === s ? Gs(i) : { comparable: !1, family: null, factors: {} }, a = o.comparable ? o.factors : void 0, l = (d) => {
      const h = e[d];
      if (h == null || !Number.isFinite(h))
        return 0;
      const m = (a == null ? void 0 : a[d]) ?? 1;
      return h * m;
    };
    let c = l("solar") + l("grid") + l("grid_secondary") - l("battery") - l("battery_secondary");
    if (a && r) {
      const d = J(r);
      d && o.family !== null && d.family === o.family && d.factor > 0 && (c /= d.factor);
    }
    return Number.isFinite(c) ? c <= I ? 0 : c : null;
  }
  sumComparableValues(e) {
    const t = e.filter(
      (i) => i.value !== null && Number.isFinite(i.value)
    );
    if (t.length === 0)
      return null;
    let r = null, n = 0;
    for (const i of t) {
      const s = J(i.unit);
      if (!s)
        return t.reduce((o, a) => o + a.value, 0);
      if (r === null)
        r = s.family;
      else if (r !== s.family)
        return t.reduce((o, a) => o + a.value, 0);
      n += i.value * s.factor;
    }
    return n;
  }
  renderTrend(e, t, r, n, i, s, o) {
    return n ? (this._trendDrawConfig[e] = {
      currentValue: t,
      unit: r,
      color: i,
      threshold: s,
      thresholdColor: o
    }, E`
      <div class="node-trend" aria-hidden="true">
        <canvas class="node-trend-canvas-area" data-node=${e}></canvas>
      </div>
      <div class="node-trend-line" aria-hidden="true">
        <canvas class="node-trend-canvas-line" data-node=${e}></canvas>
      </div>
    `) : (delete this._trendDrawConfig[e], $);
  }
  trendPoints(e, t) {
    const r = Date.now(), n = r - be, i = this._trendSeries[e] ?? [];
    let s = 0;
    for (; s < i.length && i[s].ts < n; )
      s += 1;
    const o = s > 0 ? i.slice(s) : [...i];
    return t !== null && Number.isFinite(t) && o.push({ ts: r, value: t }), o;
  }
  buildThresholdTrendSegments(e, t) {
    const r = [];
    for (let n = 1; n < e.length; n += 1) {
      const i = e[n - 1], s = e[n], o = i.value <= t, a = s.value <= t;
      if (o === a || Math.abs(s.value - i.value) <= I) {
        r.push({
          start: i,
          end: s,
          low: o
        });
        continue;
      }
      const l = (t - i.value) / (s.value - i.value), c = Math.max(0, Math.min(1, l)), d = {
        x: i.x + (s.x - i.x) * c,
        y: i.y + (s.y - i.y) * c,
        value: t,
        ts: i.ts + (s.ts - i.ts) * c
      };
      r.push({
        start: i,
        end: d,
        low: o
      }), r.push({
        start: d,
        end: s,
        low: a
      });
    }
    return r;
  }
  toTrendCoordinates(e, t) {
    var y, b;
    const n = Date.now() - be, i = 0, s = 100, o = e.map((v) => v.value), a = (t == null ? void 0 : t.min) ?? Math.min(...o), l = (t == null ? void 0 : t.max) ?? Math.max(...o);
    if (!Number.isFinite(a) || !Number.isFinite(l))
      return [];
    const c = 20, d = 80, h = Math.max(l - a, I), m = e.map((v) => {
      const w = Math.max(0, Math.min(100, (v.ts - n) / be * 100)), S = i + w / 100 * (s - i), p = h <= I ? 0.5 : (v.value - a) / h, g = d - p * (d - c);
      return { x: S, y: g, value: v.value, ts: v.ts };
    }), u = ((y = m[0]) == null ? void 0 : y.x) ?? i, _ = ((b = m[m.length - 1]) == null ? void 0 : b.x) ?? s, x = Math.max(0, _ - u), f = 18;
    if (m.length >= 2 && x < f) {
      const v = s - f, w = Math.max(i, Math.min(v, _ - f));
      if (x <= I) {
        const p = f / (m.length - 1);
        return m.map((g, C) => ({
          ...g,
          x: Math.max(i, Math.min(s, w + p * C))
        }));
      }
      const S = f / x;
      return m.map((p) => ({
        ...p,
        x: Math.max(i, Math.min(s, w + (p.x - u) * S))
      }));
    }
    return m;
  }
  toCanvasPoints(e, t, r) {
    return hr(e, t, r);
  }
  computeTrendValueRange(e, t) {
    const r = [];
    if (Object.entries(e).forEach(([s, o]) => {
      const a = (t == null ? void 0 : t[s]) ?? 1;
      o.forEach((l) => r.push(l.value * a));
    }), r.length === 0)
      return null;
    const n = Math.min(...r), i = Math.max(...r);
    return !Number.isFinite(n) || !Number.isFinite(i) ? null : { min: n, max: i };
  }
  resolveSharedTrendUnitFactors(e) {
    const t = Object.keys(e);
    if (t.length === 0)
      return null;
    let r = null;
    const n = {};
    for (const i of t) {
      const s = this._trendDrawConfig[i];
      if (!s)
        return null;
      const o = J(s.unit);
      if (!o)
        return null;
      if (r === null)
        r = o.family;
      else if (r !== o.family)
        return null;
      n[i] = o.factor;
    }
    return n;
  }
  scaleTrendSeries(e, t) {
    return !Number.isFinite(t) || t === 1 ? e : e.map((r) => ({
      ts: r.ts,
      value: r.value * t
    }));
  }
  updateSubBlockVisibility() {
    const e = this.renderRoot.querySelector(".energy-grid");
    if (!e) {
      this._showSubBlocks && (this._showSubBlocks = !1), this._compactSubBlocks && (this._compactSubBlocks = !1);
      return;
    }
    const t = e.getBoundingClientRect(), r = t.width <= uo || t.height <= _o;
    r !== this._compactSubBlocks && (this._compactSubBlocks = r), this._showSubBlocks || (this._showSubBlocks = !0);
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
    const e = this.renderRoot.querySelector(".energy-grid"), t = this.renderRoot.querySelector(".energy-value.home"), r = this.renderRoot.querySelector(".energy-value.solar"), n = this.renderRoot.querySelector(".energy-value.grid"), i = this.renderRoot.querySelector(".energy-value.grid-secondary");
    if (!e) {
      this._subNodeConnectorSegments.length > 0 && (this._subNodeConnectorSegments = []);
      return;
    }
    const s = e.getBoundingClientRect(), o = t == null ? void 0 : t.getBoundingClientRect(), a = r == null ? void 0 : r.getBoundingClientRect(), l = n == null ? void 0 : n.getBoundingClientRect(), c = i == null ? void 0 : i.getBoundingClientRect(), d = o ? o.left + o.width / 2 : 0, h = a ? a.top + a.height / 2 : 0, m = l ? l.left + l.width / 2 : 0, u = c ? c.left + c.width / 2 : 0, _ = (S) => S - s.left, x = (S) => S - s.top, f = (S) => Math.round(S * 10) / 10, y = [], b = (S, p, g, C) => {
      const T = Math.min(S, p), R = Math.abs(p - S);
      R <= 0.5 || y.push({
        node: C,
        left: f(T),
        top: f(g - 1),
        width: f(R),
        height: 2
      });
    }, v = (S, p, g, C) => {
      const T = Math.min(S, p), R = Math.abs(p - S);
      R <= 0.5 || y.push({
        node: C,
        left: f(g - 1),
        top: f(T),
        width: 2,
        height: f(R)
      });
    };
    o && this.renderRoot.querySelectorAll(".energy-sub-value.home-sub").forEach((S) => {
      const p = S.getBoundingClientRect(), g = p.top + p.height / 2, C = p.left + p.width / 2 < d ? p.right : p.left, T = g, R = g < o.top ? o.top : g > o.bottom ? o.bottom : g, A = _(d), z = x(T), F = x(R), k = _(C);
      b(k, A, z, "home"), v(z, F, A, "home");
    }), a && this.renderRoot.querySelectorAll(".energy-sub-value.solar-sub").forEach((S) => {
      const p = S.getBoundingClientRect(), g = p.left + p.width / 2, C = p.top + p.height / 2 < h ? p.bottom : p.top, T = g, R = g < a.left ? a.left : g > a.right ? a.right : g, A = x(h), z = _(T), F = _(R), k = x(C);
      v(k, A, z, "solar"), b(z, F, A, "solar");
    }), l && this.renderRoot.querySelectorAll(".energy-sub-value.grid-sub").forEach((S) => {
      const p = S.getBoundingClientRect(), g = p.top + p.height / 2, C = p.left + p.width / 2 < m ? p.right : p.left, T = g, R = g < l.top ? l.top : g > l.bottom ? l.bottom : g, A = _(m), z = x(T), F = x(R), k = _(C);
      b(k, A, z, "grid"), v(z, F, A, "grid");
    }), c && this.renderRoot.querySelectorAll(".energy-sub-value.grid_secondary-sub").forEach((S) => {
      const p = S.getBoundingClientRect(), g = p.top + p.height / 2, C = p.left + p.width / 2 < u ? p.right : p.left, T = g, R = g < c.top ? c.top : g > c.bottom ? c.bottom : g, A = _(u), z = x(T), F = x(R), k = _(C);
      b(k, A, z, "grid_secondary"), v(z, F, A, "grid_secondary");
    }), y.length === this._subNodeConnectorSegments.length && y.every(
      (S, p) => {
        var g, C, T, R, A;
        return S.node === ((g = this._subNodeConnectorSegments[p]) == null ? void 0 : g.node) && S.left === ((C = this._subNodeConnectorSegments[p]) == null ? void 0 : C.left) && S.top === ((T = this._subNodeConnectorSegments[p]) == null ? void 0 : T.top) && S.width === ((R = this._subNodeConnectorSegments[p]) == null ? void 0 : R.width) && S.height === ((A = this._subNodeConnectorSegments[p]) == null ? void 0 : A.height);
      }
    ) || (this._subNodeConnectorSegments = y);
  }
  syncTrendResizeObserver() {
    if (typeof ResizeObserver > "u")
      return;
    this._trendResizeObserver || (this._trendResizeObserver = new ResizeObserver(() => {
      this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw();
    })), this._trendResizeObserver.disconnect();
    const e = this.renderRoot.querySelector(".energy-grid");
    e && this._trendResizeObserver.observe(e), this.renderRoot.querySelectorAll(".energy-value").forEach((t) => {
      var r;
      (r = this._trendResizeObserver) == null || r.observe(t);
    });
  }
  scheduleTrendCanvasDraw() {
    this._trendCanvasRaf === void 0 && (this._trendCanvasRaf = window.requestAnimationFrame(() => {
      this._trendCanvasRaf = void 0, this.drawTrendCanvases();
    }));
  }
  drawTrendCanvases() {
    var h;
    const e = this.perfNow(), t = this.collectTrendCanvases(".node-trend-canvas-area"), r = this.collectTrendCanvases(".node-trend-canvas-line"), n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    t.forEach((m, u) => {
      const _ = this.prepareTrendCanvas(m);
      _ && n.set(u, _);
    }), r.forEach((m, u) => {
      const _ = this.prepareTrendCanvas(m);
      _ && i.set(u, _);
    });
    const s = {};
    Object.keys(this._trendDrawConfig).forEach((m) => {
      const u = this._trendDrawConfig[m];
      if (!u)
        return;
      const _ = this.trendPoints(m, u.currentValue);
      _.length >= 2 && (s[m] = _);
    });
    const o = ((h = this._config) == null ? void 0 : h.shared_trend_scale) === !0, a = o ? this.resolveSharedTrendUnitFactors(s) : null, l = o ? this.computeTrendValueRange(s, a ?? void 0) : null;
    let c = 0, d = 0;
    Object.keys(this._trendDrawConfig).forEach((m) => {
      const u = this._trendDrawConfig[m];
      if (!u)
        return;
      const _ = n.get(m), x = i.get(m);
      if (!_ || !x)
        return;
      const f = s[m];
      if (!f || f.length < 2)
        return;
      const y = (a == null ? void 0 : a[m]) ?? 1, b = a ? this.scaleTrendSeries(f, y) : f, v = this.toTrendCoordinates(b, l);
      if (v.length < 2)
        return;
      const w = this.toCanvasPoints(v, _.width, _.height), S = this.toCanvasPoints(v, x.width, x.height);
      this.drawTrendArea(
        _.ctx,
        w,
        u.color,
        _.height,
        u.threshold,
        u.thresholdColor
      ), this.drawTrendLine(x.ctx, S, u.color, u.threshold, u.thresholdColor), c += 1, d += S.length;
    }), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: c,
      points: d,
      shared_scale: o,
      shared_scale_units: a ? "canonical" : "raw"
    });
  }
  collectTrendCanvases(e) {
    const t = /* @__PURE__ */ new Map();
    return this.renderRoot.querySelectorAll(e).forEach((r) => {
      const n = r.dataset.node;
      !n || n !== "solar" && n !== "grid" && n !== "grid_secondary" && n !== "home" && n !== "battery" && n !== "battery_secondary" || t.set(n, r);
    }), t;
  }
  prepareTrendCanvas(e) {
    const t = e.getContext("2d");
    if (!t)
      return null;
    const r = e.getBoundingClientRect(), n = Math.max(1, Math.round(r.width)), i = Math.max(1, Math.round(r.height)), s = Math.max(1, window.devicePixelRatio || 1), o = Math.max(1, Math.round(n * s)), a = Math.max(1, Math.round(i * s));
    return (e.width !== o || e.height !== a) && (e.width = o, e.height = a), t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height), t.setTransform(s, 0, 0, s, 0, 0), { ctx: t, width: n, height: i };
  }
  drawTrendArea(e, t, r, n, i, s) {
    if (t.length < 2)
      return;
    const o = this.resolveCanvasColor(r);
    if (i === null) {
      this.fillTrendAreaRun(e, t, o, n);
      return;
    }
    const a = this.resolveCanvasColor(s), l = this.buildThresholdTrendSegments(t, i);
    this.buildAreaRunsFromSegments(l).forEach((d) => {
      this.fillTrendAreaRun(e, d.points, d.low ? a : o, n);
    });
  }
  buildAreaRunsFromSegments(e) {
    const t = [];
    for (const r of e) {
      if (t.length === 0) {
        t.push({
          low: r.low,
          points: [r.start, r.end]
        });
        continue;
      }
      const n = t[t.length - 1], i = n.points[n.points.length - 1], s = Math.abs(i.x - r.start.x) <= 0.01 && Math.abs(i.y - r.start.y) <= 0.01;
      n.low === r.low && s ? n.points.push(r.end) : t.push({
        low: r.low,
        points: [r.start, r.end]
      });
    }
    return t;
  }
  fillTrendAreaRun(e, t, r, n) {
    if (t.length < 2)
      return;
    const i = t[0], s = t[t.length - 1], o = Math.min(...t.map((l) => l.y)), a = e.createLinearGradient(0, o, 0, n);
    a.addColorStop(0, this.withAlpha(r, 0.24)), a.addColorStop(1, this.withAlpha(r, 0)), e.beginPath(), e.moveTo(i.x, i.y), t.slice(1).forEach((l) => e.lineTo(l.x, l.y)), e.lineTo(s.x, n), e.lineTo(i.x, n), e.closePath(), e.fillStyle = a, e.fill();
  }
  drawTrendLine(e, t, r, n, i) {
    if (t.length < 2)
      return;
    const s = this.resolveCanvasColor(r), o = this.resolveCanvasColor(i);
    if (n === null) {
      this.strokeTrendPolyline(e, t, s, 1.5);
      return;
    }
    this.buildThresholdTrendSegments(t, n).forEach((l) => {
      this.strokeTrendSegment(e, l.start, l.end, l.low ? o : s, 1.5);
    });
  }
  strokeTrendPolyline(e, t, r, n) {
    t.length < 2 || (e.beginPath(), e.moveTo(t[0].x, t[0].y), t.slice(1).forEach((i) => e.lineTo(i.x, i.y)), e.strokeStyle = r, e.lineWidth = n, e.lineCap = "round", e.lineJoin = "round", e.stroke());
  }
  strokeTrendSegment(e, t, r, n, i) {
    e.beginPath(), e.moveTo(t.x, t.y), e.lineTo(r.x, r.y), e.strokeStyle = n, e.lineWidth = i, e.lineCap = "round", e.lineJoin = "round", e.stroke();
  }
  resolveCanvasColor(e) {
    const t = document.createElement("span");
    t.style.position = "absolute", t.style.opacity = "0", t.style.pointerEvents = "none", t.style.color = e, this.renderRoot.appendChild(t);
    const r = getComputedStyle(t).color;
    return t.remove(), r || "rgb(158, 158, 158)";
  }
  withAlpha(e, t) {
    const r = this.parseColorChannels(e);
    if (!r)
      return e;
    const n = Math.max(0, Math.min(1, t));
    return `rgba(${r[0]}, ${r[1]}, ${r[2]}, ${n})`;
  }
  parseColorChannels(e) {
    const t = e.trim(), r = t.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
    if (r) {
      const l = r.slice(1, 4).map((c) => Math.max(0, Math.min(255, Math.round(Number(c)))));
      if (l.every((c) => Number.isFinite(c)))
        return [l[0], l[1], l[2]];
    }
    this._canvasColorContext || (this._canvasColorContext = document.createElement("canvas").getContext("2d"));
    const n = this._canvasColorContext;
    if (!n)
      return null;
    n.fillStyle = "#000000", n.fillStyle = t;
    const i = n.fillStyle, o = (typeof i == "string" ? i.trim() : "").match(/^#([a-f\d]{6})$/i);
    if (!o)
      return null;
    const a = o[1];
    return [
      parseInt(a.slice(0, 2), 16),
      parseInt(a.slice(2, 4), 16),
      parseInt(a.slice(4, 6), 16)
    ];
  }
  connectedCallback() {
    super.connectedCallback(), this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible && this.startLiveRuntime(!0)) : (this.maybeRefreshTrendHistory(!0, !0), this.updateComplete.then(() => {
      this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw();
    }));
  }
  disconnectedCallback() {
    this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.destroyActionHandler(), super.disconnectedCallback();
  }
  destroyActionHandler() {
    this._actionHandler && (this._actionHandler.destroy(), this._actionHandler = void 0);
  }
  setupActionHandler() {
    var n, i;
    const e = this.renderRoot.querySelector("ha-card");
    if (!e || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const t = !!((n = this._config.hold_action) != null && n.action && this._config.hold_action.action !== "none"), r = !!((i = this._config.double_tap_action) != null && i.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = _r(
      e,
      {
        onTap: () => this.fireAction("tap"),
        onHold: () => this.fireAction("hold"),
        onDoubleTap: () => this.fireAction("double_tap")
      },
      { hasHold: t, hasDoubleTap: r }
    );
  }
  updated(e) {
    e.has("_config") && this.setupActionHandler();
    const t = e.get("_config"), r = e.has("_config") && this.shouldRefreshTrendOnConfigChange(t, this._config), n = e.get("hass"), i = e.has("hass") && this.didRelevantEntityStateChange(n);
    (e.has("preview") || e.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (e.has("_config") ? r && this.scheduleConfigRefresh() : e.has("hass") && this._isVisible && i && this.maybeRefreshTrendHistory(), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (e.has("_config") ? r && this.scheduleConfigRefresh(!0) : e.has("hass") && i && this.maybeRefreshTrendHistory(!1, !0), this._trendResizeObserver && this._trendResizeObserver.disconnect());
    const s = e.has("_config") || e.has("_trendSeries") || e.has("_showSubBlocks") || e.has("preview") || e.has("editMode") || i;
    s && this.updateSubBlockVisibility(), (!this.shouldRunLiveRuntime() || this._isVisible) && s && (this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
  }
  maybeRefreshTrendHistory(e = !1, t = !1) {
    if (!this.shouldRunLiveRuntime() && !t || !this._isVisible && !t || t && !this.isEditorPreview())
      return;
    e && (this._lastTrendRefresh = 0);
    const r = Date.now();
    !e && r - this._lastTrendRefresh < Jr || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(po) || this.hasEditorLikeAncestor();
  }
  shouldRunLiveRuntime() {
    return !this.isEditorPreview();
  }
  hasEditorLikeAncestor() {
    let e = this;
    for (; e; ) {
      const t = e.tagName.toLowerCase();
      if (t.startsWith("hui-") && (t.includes("preview") || t.includes("editor") || t.includes("picker") || t.includes("dialog")))
        return !0;
      if (e instanceof HTMLElement) {
        const r = e.className;
        if (typeof r == "string") {
          const n = r.toLowerCase();
          if (n.includes("preview") || n.includes("editor") || n.includes("card-picker"))
            return !0;
        }
      }
      e = e.parentElement;
    }
    return !1;
  }
  perfNow() {
    return typeof performance < "u" && typeof performance.now == "function" ? performance.now() : Date.now();
  }
  toPerfMs(e) {
    return Math.round(e * 10) / 10;
  }
  logPerformance(e, t) {
    var r;
    if (((r = this._config) == null ? void 0 : r.debug_performance) === !0) {
      if (t) {
        console.debug("[PowerPilz][Energy]", e, t);
        return;
      }
      console.debug("[PowerPilz][Energy]", e);
    }
  }
  setupVisibilityObserver() {
    if (typeof IntersectionObserver > "u") {
      this._isVisible = !0;
      return;
    }
    this._visibilityObserver || (this._visibilityObserver = new IntersectionObserver((e) => {
      const t = e.some((r) => r.isIntersecting && r.intersectionRatio > 0);
      t !== this._isVisible && (this._isVisible = t, this.shouldRunLiveRuntime() && (t ? (this.startLiveRuntime(!0), this.syncTrendResizeObserver(), this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw()) : this.stopLiveRuntime()));
    }, { threshold: [0, 0.01] }), this._visibilityObserver.observe(this));
  }
  teardownVisibilityObserver() {
    this._visibilityObserver && (this._visibilityObserver.disconnect(), this._visibilityObserver = void 0), this._isVisible = typeof IntersectionObserver > "u";
  }
  scheduleConfigRefresh(e = !1) {
    !this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview() || (this._configRefreshTimer !== void 0 && window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = window.setTimeout(() => {
      this._configRefreshTimer = void 0, this.maybeRefreshTrendHistory(!0, e);
    }, ho));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Jr), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.syncTrendResizeObserver(), this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this.clearConfigRefreshTimer(), this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._subNodeConnectorRaf !== void 0 && (window.cancelAnimationFrame(this._subNodeConnectorRaf), this._subNodeConnectorRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
  }
  async refreshTrendHistory(e = !1, t = !1) {
    var s, o;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !t)
      return;
    const r = this._config, n = B(r.trend_data_source, "hybrid"), i = this.enabledTrendNodes(r);
    if (i.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const a = this.perfNow(), l = {}, c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), _ = /* @__PURE__ */ new Set();
      let x = Number.POSITIVE_INFINITY;
      const f = Date.now() - be;
      for (const p of i) {
        if (p === "home" && r.home_auto_calculate === !0) {
          const A = this.homeComputationDependencies(r);
          if (A.length === 0) {
            l[p] = [];
            continue;
          }
          d.set(p, A), h.set(p, this.resolveAutoHomeUnit(r, r.unit ?? "kW"));
          const z = this._trendSeries[p] ?? [];
          if (e || z.length === 0) {
            m.add(p), A.forEach((G) => {
              u.add(G.entityId), _.delete(G.entityId);
            });
            continue;
          }
          const F = ((s = z[z.length - 1]) == null ? void 0 : s.ts) ?? f, k = Math.max(f, F - Qr);
          x = Math.min(x, k), A.forEach((G) => {
            u.has(G.entityId) || _.add(G.entityId);
          });
          continue;
        }
        const g = this.trendEntityId(p, r);
        if (!g)
          continue;
        c.set(p, g);
        const C = this._trendSeries[p] ?? [];
        if (e || C.length === 0 || u.has(g)) {
          u.add(g), _.delete(g);
          continue;
        }
        if (u.has(g))
          continue;
        _.add(g);
        const T = ((o = C[C.length - 1]) == null ? void 0 : o.ts) ?? f, R = Math.max(f, T - Qr);
        x = Math.min(x, R);
      }
      let y = 0;
      const b = u.size > 0 ? await (async () => {
        const p = this.perfNow(), g = await Se(
          this.hass,
          Array.from(u),
          be,
          { dataSource: n }
        );
        return y = this.perfNow() - p, g;
      })() : {};
      let v = 0;
      const w = _.size > 0 ? await (async () => {
        const p = this.perfNow(), g = await Se(
          this.hass,
          Array.from(_),
          be,
          {
            startMs: Number.isFinite(x) ? x : f,
            dataSource: n
          }
        );
        return v = this.perfNow() - p, g;
      })() : {};
      c.forEach((p, g) => {
        const C = this._trendSeries[g] ?? [];
        if (u.has(p)) {
          const T = b[p] ?? [];
          l[g] = T.length > 0 ? T : C.filter((R) => R.ts >= f);
          return;
        }
        if (_.has(p)) {
          const T = w[p] ?? [];
          l[g] = et(C, T, f);
          return;
        }
        l[g] = C.filter((T) => T.ts >= f);
      }), d.forEach((p, g) => {
        const C = this._trendSeries[g] ?? [], T = this.computeAutoHomeTrendFromFetchedDependencies(
          p,
          b,
          w,
          u,
          _,
          f,
          h.get(g) ?? r.unit ?? "kW"
        );
        if (m.has(g)) {
          l[g] = T.length > 0 ? T : C.filter((R) => R.ts >= f);
          return;
        }
        l[g] = et(C, T, f);
      });
      const S = this.sameTrendSeriesKeys(l, this._trendSeries) && Object.keys(l).every(
        (p) => this.areTrendSeriesEqual(l[p] ?? [], this._trendSeries[p] ?? [])
      );
      S || (this._trendSeries = l), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - a),
        force_full: e,
        nodes: i.length,
        full_entities: u.size,
        incremental_entities: _.size,
        data_source: n,
        full_fetch_ms: this.toPerfMs(y),
        incremental_fetch_ms: this.toPerfMs(v),
        series_changed: !S
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledTrendNodes(e) {
    const t = [];
    return e.solar_trend && t.push("solar"), e.grid_trend && t.push("grid"), e.grid_secondary_visible && e.grid_secondary_trend && t.push("grid_secondary"), e.home_trend && t.push("home"), e.battery_trend && t.push("battery"), e.battery_secondary_visible && e.battery_secondary_trend && t.push("battery_secondary"), t;
  }
  trendEntityId(e, t) {
    switch (e) {
      case "solar":
        return t.solar_entity;
      case "grid":
        return t.grid_entity;
      case "grid_secondary":
        return t.grid_secondary_entity;
      case "home":
        return t.home_auto_calculate === !0 ? void 0 : t.home_entity;
      case "battery":
        return t.battery_percentage_entity ?? t.battery_entity;
      case "battery_secondary":
        return t.battery_secondary_percentage_entity ?? t.battery_secondary_entity;
      default:
        return;
    }
  }
  relevantEntityIds(e) {
    const t = /* @__PURE__ */ new Set(), r = (i) => {
      const s = this.readConfigString(i);
      s && t.add(s);
    };
    r(e.home_entity), r(e.solar_entity), r(e.grid_entity), r(e.grid_secondary_entity), r(e.battery_entity), r(e.battery_percentage_entity), r(e.battery_secondary_entity), r(e.battery_secondary_percentage_entity), e.solar_sub_enabled && r(e.solar_sub_entity), e.home_sub_enabled && r(e.home_sub_entity);
    const n = (i, s) => {
      for (let o = 1; o <= s; o += 1)
        e[`${i}_sub_${o}_enabled`] === !0 && r(e[`${i}_sub_${o}_entity`]);
    };
    return n("solar", en), n("home", tn), n("grid", Pt), n("grid_secondary", Pt), Array.from(t);
  }
  didRelevantEntityStateChange(e) {
    if (!this._config || !this.hass || !e)
      return !0;
    const t = this.relevantEntityIds(this._config);
    return t.length === 0 ? !1 : t.some((r) => e.states[r] !== this.hass.states[r]);
  }
  trendHistorySignature(e) {
    if (!e)
      return "";
    const t = [];
    return t.push(`source:${B(e.trend_data_source, "hybrid")}`), this.enabledTrendNodes(e).forEach((r) => {
      if (r === "home" && e.home_auto_calculate === !0) {
        const n = this.homeComputationDependencies(e).map((i) => `${i.role}:${i.entityId}`).sort().join(",");
        t.push(`home:auto:${n}`);
        return;
      }
      t.push(`${r}:${this.trendEntityId(r, e) ?? ""}`);
    }), t.sort().join("|");
  }
  shouldRefreshTrendOnConfigChange(e, t) {
    return !e || !t ? !0 : this.trendHistorySignature(e) !== this.trendHistorySignature(t);
  }
  computeAutoHomeTrendFromFetchedDependencies(e, t, r, n, i, s, o) {
    const a = {}, l = {};
    return e.forEach((c) => {
      const d = n.has(c.entityId) ? t[c.entityId] ?? [] : i.has(c.entityId) ? r[c.entityId] ?? [] : [];
      a[c.role] = d.filter((m) => Number.isFinite(m.ts) && Number.isFinite(m.value) && m.ts >= s).sort((m, u) => m.ts - u.ts);
      const h = H(this.hass, c.entityId);
      h && (l[c.role] = h);
    }), this.computeAutoHomeTrendSeries(a, s, l, o);
  }
  computeAutoHomeTrendSeries(e, t, r, n) {
    const i = [];
    if (Object.values(e).forEach((o) => {
      o.forEach((a) => {
        Number.isFinite(a.ts) && a.ts >= t && i.push(a.ts);
      });
    }), i.length === 0)
      return [];
    i.sort((o, a) => o - a);
    const s = [];
    return i.forEach((o) => {
      const a = s[s.length - 1];
      (a === void 0 || Math.abs(a - o) > 0.5) && s.push(o);
    }), s.map((o) => {
      const a = this.computeAutoHomeValueFromNodeValues({
        solar: this.interpolateTrendSeriesValue(e.solar ?? [], o),
        grid: this.interpolateTrendSeriesValue(e.grid ?? [], o),
        grid_secondary: this.interpolateTrendSeriesValue(e.grid_secondary ?? [], o),
        battery: this.interpolateTrendSeriesValue(e.battery ?? [], o),
        battery_secondary: this.interpolateTrendSeriesValue(e.battery_secondary ?? [], o)
      }, r, n);
      return a === null ? null : { ts: o, value: a };
    }).filter((o) => o !== null);
  }
  interpolateTrendSeriesValue(e, t) {
    if (e.length === 0)
      return null;
    if (t <= e[0].ts)
      return e[0].value;
    const r = e[e.length - 1];
    if (t >= r.ts)
      return r.value;
    let n = 0, i = e.length - 1;
    for (; n <= i; ) {
      const d = Math.floor((n + i) / 2), h = e[d];
      if (Math.abs(h.ts - t) <= 0.5)
        return h.value;
      h.ts < t ? n = d + 1 : i = d - 1;
    }
    const s = Math.max(1, Math.min(e.length - 1, n)), o = e[s - 1], a = e[s], l = a.ts - o.ts;
    if (Math.abs(l) <= I)
      return a.value;
    const c = (t - o.ts) / l;
    return o.value + (a.value - o.value) * c;
  }
  sameTrendSeriesKeys(e, t) {
    const r = Object.keys(e).sort(), n = Object.keys(t).sort();
    return r.length === n.length && r.every((i, s) => i === n[s]);
  }
  areTrendSeriesEqual(e, t) {
    if (e.length !== t.length)
      return !1;
    for (let r = 0; r < e.length; r += 1) {
      const n = e[r], i = t[r];
      if (n.ts !== i.ts || Math.abs(n.value - i.value) > 1e-4)
        return !1;
    }
    return !0;
  }
  hasConfiguredAction(e) {
    return e.details_navigation_path ? !0 : [e.tap_action, e.hold_action, e.double_tap_action].some(
      (t) => t && t.action && t.action !== "none"
    );
  }
  fireAction(e) {
    if (this.isEditorPreview() || !this._config)
      return;
    const t = `${e}_action`;
    let r = this._config[t], n = this._config;
    if (!r && e === "tap" && this._config.details_navigation_path && (r = { action: "navigate", navigation_path: this._config.details_navigation_path }, n = { ...this._config, tap_action: r }), !(!r || !r.action || r.action === "none")) {
      if (r.action === "more-info" && !n.entity) {
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
          detail: { config: n, action: e },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  toUnidirectionalFlow(e) {
    return e === null || e <= I ? "none" : "forward";
  }
  toBidirectionalFlow(e) {
    return e === null || Math.abs(e) <= I ? "none" : e > 0 ? "forward" : "backward";
  }
  reverseFlowDirection(e) {
    return e === "forward" ? "backward" : e === "backward" ? "forward" : "none";
  }
  formatValue(e, t, r) {
    var n, i, s;
    return ur(e, t, r, {
      enabled: ((n = this._config) == null ? void 0 : n.auto_scale_units) === !0,
      baseDecimals: ((i = this._config) == null ? void 0 : i.decimals_base_unit) ?? r,
      prefixedDecimals: ((s = this._config) == null ? void 0 : s.decimals_prefixed_unit) ?? r
    });
  }
  splitFormattedValueAndUnit(e, t) {
    const r = e.trim(), n = t.trim();
    if (r.length === 0)
      return { value: "--", unit: n };
    if (n.length === 0)
      return { value: r, unit: "" };
    const i = ` ${n}`;
    if (r.endsWith(i))
      return {
        value: r.slice(0, Math.max(0, r.length - i.length)).trim(),
        unit: n
      };
    const s = r.lastIndexOf(" ");
    return s > 0 ? {
      value: r.slice(0, s).trim(),
      unit: r.slice(s + 1).trim()
    } : { value: r, unit: n };
  }
  formatBatteryPercentage(e) {
    return `${Math.round(this.normalizeBatteryThreshold(e))}%`;
  }
  batteryIcon(e, t, r) {
    if (t !== null && t > I)
      return "mdi:battery-charging";
    if (e === null)
      return r ?? "mdi:battery-outline";
    const n = this.normalizeBatteryThreshold(e);
    return n < 5 ? "mdi:battery-outline" : n >= 95 ? "mdi:battery" : `mdi:battery-${Math.max(10, Math.min(90, Math.round(n / 10) * 10))}`;
  }
  normalizeBatteryThreshold(e) {
    return typeof e != "number" || !Number.isFinite(e) ? 20 : Math.max(0, Math.min(100, e));
  }
  resolveBatteryPercentage(e, t, r) {
    return e !== null ? e : this.isPercentageUnit(r) ? t : null;
  }
  isPercentageUnit(e) {
    return e ? e.trim() === "%" : !1;
  }
  normalizeBatteryDualAlignment(e) {
    return e === "left" || e === "right" ? e : "center";
  }
  iconColorStyle(e) {
    const t = this.resolveColor(e, "");
    return t ? { color: t } : {};
  }
  iconShapeStyle(e) {
    const t = this.toRgbCss(e);
    if (t)
      return {
        "--icon-color": `rgb(${t})`,
        "--shape-color": `color-mix(in srgb, rgb(${t}) 14%, var(--ha-card-background, var(--card-background-color, white)))`
      };
    if (typeof e == "string" && e.trim().length > 0) {
      const r = e.trim(), n = r.toLowerCase();
      return n === "none" || n === "default" ? {} : {
        "--icon-color": r,
        "--shape-color": `color-mix(in srgb, ${r} 14%, var(--ha-card-background, var(--card-background-color, white)))`
      };
    }
    return {};
  }
  resolveColor(e, t = "") {
    return cr(e, t);
  }
  toRgbCss(e) {
    return lr(e);
  }
};
W.styles = st`
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
Q([
  L({ attribute: !1 })
], W.prototype, "hass", 2);
Q([
  L({ type: Boolean })
], W.prototype, "preview", 2);
Q([
  L({ type: Boolean })
], W.prototype, "editMode", 2);
Q([
  O()
], W.prototype, "_config", 2);
Q([
  O()
], W.prototype, "_trendSeries", 2);
Q([
  O()
], W.prototype, "_showSubBlocks", 2);
Q([
  O()
], W.prototype, "_compactSubBlocks", 2);
Q([
  O()
], W.prototype, "_subNodeConnectorSegments", 2);
W = Q([
  ue("power-pilz-energy-card")
], W);
const Y = (e) => {
  if (typeof e != "string")
    return;
  const t = e.trim();
  return t.length > 0 ? t : void 0;
}, Wn = (e, t) => {
  switch (e) {
    case 1:
      return Y(t.entity_1);
    case 2:
      return Y(t.entity_2);
    case 3:
      return Y(t.entity_3);
    case 4:
      return Y(t.entity_4);
    default:
      return;
  }
}, jn = (e, t) => {
  switch (e) {
    case 1:
      return Y(t.entity_1_name);
    case 2:
      return Y(t.entity_2_name);
    case 3:
      return Y(t.entity_3_name);
    case 4:
      return Y(t.entity_4_name);
    default:
      return;
  }
}, Gn = (e, t) => {
  switch (e) {
    case 1:
      return t.entity_1_enabled !== !1;
    case 2:
      return t.entity_2_enabled === !0;
    case 3:
      return t.entity_3_enabled === !0;
    case 4:
      return t.entity_4_enabled === !0;
    default:
      return !1;
  }
}, qn = (e, t) => {
  switch (e) {
    case 1:
      return t.entity_1_show_icon !== !1;
    case 2:
      return t.entity_2_show_icon !== !1;
    case 3:
      return t.entity_3_show_icon !== !1;
    case 4:
      return t.entity_4_show_icon !== !1;
    default:
      return !0;
  }
}, Yn = (e, t) => {
  switch (e) {
    case 1:
      return t.entity_1_icon ?? "mdi:chart-line";
    case 2:
      return t.entity_2_icon ?? "mdi:chart-line-variant";
    case 3:
      return t.entity_3_icon ?? "mdi:chart-bell-curve";
    case 4:
      return t.entity_4_icon ?? "mdi:chart-timeline-variant";
    default:
      return "mdi:chart-line";
  }
}, Xn = (e, t) => {
  switch (e) {
    case 1:
      return t.entity_1_icon_color;
    case 2:
      return t.entity_2_icon_color;
    case 3:
      return t.entity_3_icon_color;
    case 4:
      return t.entity_4_icon_color;
    default:
      return;
  }
}, Kn = (e, t) => {
  switch (e) {
    case 1:
      return t.entity_1_trend_color;
    case 2:
      return t.entity_2_trend_color;
    case 3:
      return t.entity_3_trend_color;
    case 4:
      return t.entity_4_trend_color;
    default:
      return;
  }
}, Zn = (e) => e === "column" ? "column" : "row", pr = (e, t = 24) => {
  const r = typeof e == "number" ? e : typeof e == "string" ? Number.parseInt(e, 10) : NaN;
  return r === 6 || r === 12 || r === 24 || r === 48 || r === 72 || r === 168 || r === 336 || r === 720 ? r : t;
}, fr = (e) => typeof e != "number" || !Number.isFinite(e) ? 1.5 : Math.max(0.5, Math.min(6, e)), Jn = (e, t, r, n) => {
  var o;
  if (t)
    return t;
  const i = e[r], s = (o = i == null ? void 0 : i.attributes) == null ? void 0 : o.friendly_name;
  return typeof s == "string" && s.trim().length > 0 ? s.trim() : `Entity ${n}`;
}, Qn = (e, t, r, n) => {
  if (n)
    return ur(e, t, r, {
      ...n,
      nullWithUnit: !0
    });
  if (e === null)
    return t ? `-- ${t}` : "--";
  const i = `${e.toFixed(r)} ${t}`.trim();
  return i.length > 0 ? i : "--";
}, fo = 4, ei = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, nn = "When enabled, hovering over the graph shows the value and timestamp for that point in the legend.", sn = "When enabled, the area below each trend line is filled with a semi-transparent gradient.", on = "When enabled, all entities share the same Y-axis scale. When disabled, each entity auto-scales independently.", an = "When enabled, the graph area is clipped so it does not extend behind the legend labels.", ln = "Thickness of the trend lines in pixels.", cn = "Controls where trend data is fetched from. Hybrid prefers statistics and falls back to history automatically.", dn = "The time window shown in the graph.", hn = "Controls whether entity legend items are displayed in a row or column layout.", un = "When enabled, all entity values are normalized as percentages of a reference total, so the graph always fills 0–100%.", _n = "The entity whose value represents 100%. Defaults to the last enabled entity in the stack.", mn = "When enabled, the 100% total is auto-calculated by summing all other entities. Useful when you don't have a total meter.", pn = "Default entity used by more-info actions. Required when tap/hold/double-tap is set to 'More info'.", fn = "Automatically formats values with metric prefixes (e.g. W/kW/MW and Wh/kWh/MWh).", yn = "Optional unit override. Used when entities have no unit_of_measurement attribute.", bn = "Default decimal precision for displayed values.", gn = "Decimal precision for base units (W, Wh) when auto unit scaling is enabled.", vn = "Decimal precision for prefixed units (kW, MW, kWh, MWh) when auto unit scaling is enabled.", yo = {
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
}, bo = (e) => ({
  type: "expandable",
  name: "",
  title: `Entity ${e}`,
  icon: "mdi:chart-line",
  expanded: e === 1,
  schema: [
    {
      type: "grid",
      name: "",
      schema: [
        { name: `entity_${e}_enabled`, selector: { boolean: {} } }
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
            { name: `entity_${e}`, selector: { entity: { filter: { domain: "sensor" } } } },
            { name: `entity_${e}_name`, selector: { text: {} } }
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
            { name: `entity_${e}_show_icon`, selector: { boolean: {} } },
            { name: `entity_${e}_icon`, selector: { icon: {} }, context: { icon_entity: `entity_${e}` } },
            {
              name: `entity_${e}_icon_color`,
              selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
            },
            {
              name: `entity_${e}_trend_color`,
              selector: {
                ui_color: {
                  include_state: !0,
                  include_none: !1,
                  default_color: ei[e] ?? "purple"
                }
              }
            }
          ]
        }
      ]
    }
  ]
}), ti = (e = !1, t = !1) => {
  const r = {
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
            helper: hn,
            description: hn
          },
          {
            name: "timeframe_hours",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { label: "6 hours", value: "6" },
                  { label: "12 hours", value: "12" },
                  { label: "24 hours", value: "24" },
                  { label: "48 hours", value: "48" },
                  { label: "3 days", value: "72" },
                  { label: "7 days", value: "168" },
                  { label: "14 days", value: "336" },
                  { label: "30 days", value: "720" }
                ]
              }
            },
            helper: dn,
            description: dn
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
            helper: cn,
            description: cn
          }
        ]
      }
    ]
  }, i = {
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
            helper: nn,
            description: nn
          },
          {
            name: "fill_area_enabled",
            selector: { boolean: {} },
            helper: sn,
            description: sn
          },
          {
            name: "shared_trend_scale",
            selector: { boolean: {} },
            helper: on,
            description: on
          },
          {
            name: "clip_graph_to_labels",
            selector: { boolean: {} },
            helper: an,
            description: an
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
            helper: ln,
            description: ln
          }
        ]
      }
    ]
  }, s = [];
  if (e) {
    const l = [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "normalize_stack_to_percent",
            selector: { boolean: {} },
            helper: un,
            description: un
          }
        ]
      }
    ];
    t && l.push(
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
            helper: _n,
            description: _n
          },
          {
            name: "percent_reference_auto",
            selector: { boolean: {} },
            helper: mn,
            description: mn
          }
        ]
      }
    ), s.push({
      type: "expandable",
      name: "",
      title: "Stacked percent",
      icon: "mdi:percent-outline",
      expanded: !1,
      schema: l
    });
  }
  const o = {
    type: "expandable",
    name: "",
    title: "Actions",
    icon: "mdi:gesture-tap",
    expanded: !1,
    schema: [
      {
        name: "entity",
        selector: { entity: {} },
        helper: pn,
        description: pn
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
                helper: yn,
                description: yn
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: bn,
                description: bn
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
                helper: fn,
                description: fn
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
                helper: gn,
                description: gn
              },
              {
                name: "decimals_prefixed_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: vn,
                description: vn
              }
            ]
          }
        ]
      }
    ]
  };
  return [
    r,
    i,
    ...s,
    ...Array.from({ length: fo }, (l, c) => bo(c + 1)),
    a,
    o
  ];
}, Z = (e) => {
  if (typeof e == "string")
    return e.length > 0 ? e : void 0;
}, ri = (e) => e === "column" ? "column" : "row", ni = (e) => pr(e), ii = (e) => fr(e), Ye = (e, t, r) => {
  const n = e ?? t;
  return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : ei[r] ?? "purple";
}, si = (e) => ({
  trend_data_source: B(e.trend_data_source, "hybrid"),
  entity_1: Z(e.entity_1) ?? Z(e.entity),
  entity_1_name: Z(e.entity_1_name),
  entity_1_enabled: e.entity_1_enabled ?? !0,
  entity_1_show_icon: e.entity_1_show_icon ?? !0,
  entity_1_icon: e.entity_1_icon ?? e.icon,
  entity_1_icon_color: e.entity_1_icon_color ?? e.icon_color,
  entity_1_trend_color: Ye(e.entity_1_trend_color, e.trend_color, 1),
  entity_2: Z(e.entity_2),
  entity_2_name: Z(e.entity_2_name),
  entity_2_enabled: e.entity_2_enabled ?? !1,
  entity_2_show_icon: e.entity_2_show_icon ?? !0,
  entity_2_icon: e.entity_2_icon,
  entity_2_trend_color: Ye(e.entity_2_trend_color, void 0, 2),
  entity_3: Z(e.entity_3),
  entity_3_name: Z(e.entity_3_name),
  entity_3_enabled: e.entity_3_enabled ?? !1,
  entity_3_show_icon: e.entity_3_show_icon ?? !0,
  entity_3_icon: e.entity_3_icon,
  entity_3_trend_color: Ye(e.entity_3_trend_color, void 0, 3),
  entity_4: Z(e.entity_4),
  entity_4_name: Z(e.entity_4_name),
  entity_4_enabled: e.entity_4_enabled ?? !1,
  entity_4_show_icon: e.entity_4_show_icon ?? !0,
  entity_4_icon: e.entity_4_icon,
  entity_4_trend_color: Ye(e.entity_4_trend_color, void 0, 4)
}), oi = (e, t = {}) => {
  const r = e.name ?? "", n = r.match(/^entity_(\d+)_(enabled|name|show_icon|icon|icon_color|trend_color)$/);
  if (n) {
    const [, , s] = n;
    return {
      enabled: "Enabled",
      name: "Name",
      show_icon: "Show icon",
      icon: "Icon",
      icon_color: "Icon color",
      trend_color: "Graph color"
    }[s] ?? s;
  }
  return r.match(/^entity_(\d+)$/) ? "Sensor" : t[r] ?? yo[r] ?? r;
};
var go = Object.defineProperty, vo = Object.getOwnPropertyDescriptor, yr = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? vo(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && go(t, r, i), i;
};
const wo = ti(!1);
let rt = class extends U {
  constructor() {
    super(...arguments), this.computeLabel = (e) => oi(e), this.valueChanged = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement) || t.tagName !== "HA-FORM")
        return;
      const r = e.detail.value;
      if (!r || typeof r != "object" || Array.isArray(r))
        return;
      const n = {
        ...r,
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
  setConfig(e) {
    const t = {
      ...e,
      type: "custom:power-pilz-graph-card",
      legend_layout: ri(e.legend_layout),
      timeframe_hours: ni(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      decimals: e.decimals ?? 1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: e.decimals_base_unit ?? e.decimals ?? 1,
      decimals_prefixed_unit: e.decimals_prefixed_unit ?? e.decimals ?? 1,
      line_thickness: ii(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...si(e)
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? $ : E`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Be}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${wo}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
yr([
  L({ attribute: !1 })
], rt.prototype, "hass", 2);
yr([
  O()
], rt.prototype, "_config", 2);
rt = yr([
  ue("power-pilz-graph-card-editor")
], rt);
var xo = Object.defineProperty, So = Object.getOwnPropertyDescriptor, ne = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? So(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && xo(t, r, i), i;
};
const Re = 1, wn = 24, xn = 300 * 1e3, Co = 60 * 1e3, Eo = 350, Xe = 0.01, Me = 4, To = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", $o = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), Sn = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let X = class extends U {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._graphTopInset = 0, this._drawConfigs = [], this._linePointsBySlot = {}, this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._isVisible = !1, this._liveRuntimeActive = !1, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this.handlePointerMove = (e) => {
      if (this.isEditorPreview()) {
        this.clearHoverState();
        return;
      }
      const t = this.renderRoot.querySelector(".card-trend");
      if (!t || !this._config || this._config.hover_enabled === !1) {
        this.clearHoverState();
        return;
      }
      const r = t.getBoundingClientRect();
      if (r.width <= 1 || r.height <= 1) {
        this.clearHoverState();
        return;
      }
      const n = e.clientX - r.left, i = e.clientY - r.top;
      if (n < 0 || n > r.width || i < 0 || i > r.height) {
        this.clearHoverState();
        return;
      }
      const s = this.findNearestHoverPoint(n, i);
      if (!s) {
        this.clearHoverState();
        return;
      }
      const o = this._hoverState;
      o && o.slot === s.slot && Math.abs(o.x - s.x) <= 0.2 && Math.abs(o.y - s.y) <= 0.2 && Math.abs(o.value - s.value) <= 1e-4 && o.color === s.color || (this._hoverState = s);
    }, this.handlePointerLeave = () => {
      this.clearHoverState();
    }, this.handleCardKeyDown = (e) => {
      e.key !== "Enter" && e.key !== " " || (e.preventDefault(), this.fireAction("tap"));
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-graph-card-editor");
  }
  static async getStubConfig(e) {
    const t = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(t), n = (...c) => c.find((d) => d in t), i = (c) => r.find((d) => d.startsWith(`${c}.`)), s = n("sensor.dev_home_power", "sensor.home_power") ?? i("sensor") ?? "sensor.dev_home_power", o = n("sensor.dev_solar_power", "sensor.solar_power"), a = n("sensor.dev_grid_power", "sensor.grid_power"), l = n("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-card",
      legend_layout: "row",
      timeframe_hours: wn,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      auto_scale_units: !1,
      entity_1: s,
      entity_1_enabled: !0,
      entity_1_show_icon: !0,
      entity_1_icon: "mdi:chart-line",
      entity_1_trend_color: "purple",
      entity_2: o,
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
      decimals: Re,
      decimals_base_unit: Re,
      decimals_prefixed_unit: Re
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Re, r = re(e.decimals_base_unit, t), n = re(e.decimals_prefixed_unit, t), i = this.readConfigString(e.entity), s = this.readConfigString(e.icon), o = this.readConfigString(e.entity_1) ?? i ?? "sensor.dev_home_power";
    this._config = {
      ...e,
      type: "custom:power-pilz-graph-card",
      legend_layout: this.normalizeLegendLayout(e.legend_layout),
      timeframe_hours: this.normalizeTimeframeHours(e.timeframe_hours),
      line_thickness: this.normalizeLineThickness(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      trend_data_source: B(e.trend_data_source, "hybrid"),
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: r,
      decimals_prefixed_unit: n,
      entity_1: o,
      entity_1_name: this.readConfigString(e.entity_1_name),
      entity_1_enabled: e.entity_1_enabled ?? !0,
      entity_1_show_icon: e.entity_1_show_icon ?? !0,
      entity_1_icon: e.entity_1_icon ?? s ?? "mdi:chart-line",
      entity_1_icon_color: e.entity_1_icon_color ?? e.icon_color,
      entity_1_trend_color: this.normalizeTrendColor(e.entity_1_trend_color, e.trend_color, 1),
      entity_2: this.readConfigString(e.entity_2),
      entity_2_name: this.readConfigString(e.entity_2_name),
      entity_2_enabled: e.entity_2_enabled ?? !1,
      entity_2_show_icon: e.entity_2_show_icon ?? !0,
      entity_2_icon: e.entity_2_icon ?? "mdi:chart-line-variant",
      entity_2_trend_color: this.normalizeTrendColor(e.entity_2_trend_color, void 0, 2),
      entity_3: this.readConfigString(e.entity_3),
      entity_3_name: this.readConfigString(e.entity_3_name),
      entity_3_enabled: e.entity_3_enabled ?? !1,
      entity_3_show_icon: e.entity_3_show_icon ?? !0,
      entity_3_icon: e.entity_3_icon ?? "mdi:chart-bell-curve",
      entity_3_trend_color: this.normalizeTrendColor(e.entity_3_trend_color, void 0, 3),
      entity_4: this.readConfigString(e.entity_4),
      entity_4_name: this.readConfigString(e.entity_4_name),
      entity_4_enabled: e.entity_4_enabled ?? !1,
      entity_4_show_icon: e.entity_4_show_icon ?? !0,
      entity_4_icon: e.entity_4_icon ?? "mdi:chart-timeline-variant",
      entity_4_trend_color: this.normalizeTrendColor(e.entity_4_trend_color, void 0, 4),
      decimals: t
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
      return E`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return E``;
    const e = this._config, t = e.decimals ?? Re, r = this.normalizeLineThickness(e.line_thickness), n = this.collectSeriesEntries(e, t), i = this.normalizeLegendLayout(e.legend_layout), s = e.hover_enabled !== !1, o = this.hasConfiguredAction(e), a = !this.isEditorPreview() && o, l = this._hoverState, c = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, d = c > 0 ? { top: `${c}px` } : {}, h = l ? {
      left: `${l.x}px`,
      top: `${l.y + c}px`,
      "--hover-dot-color": l.color
    } : {};
    return this._drawConfigs = n.map((m) => ({
      slot: m.slot,
      currentValue: m.currentValue,
      unit: m.unit,
      color: m.trendColor,
      lineWidth: r
    })), E`
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
          <div class="card-trend" style=${M(d)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${M(d)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${s && l ? E`<div class="hover-dot" aria-hidden="true" style=${M(h)}></div>` : $}

          <div class="content">
            <div class="series-list layout-${i}">
              ${n.length === 0 ? E`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : n.map(
      (m) => this.renderSeriesItem(
        m,
        l && l.slot === m.slot ? l : null
      )
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderSeriesItem(e, t) {
    const r = t === null ? null : this.convertSharedScaleHoverValue(e.slot, t.value), n = t === null ? null : this.formatHoverTimestamp(t.ts), i = r === null ? e.secondary : `${this.formatValue(r, e.unit, e.decimals)} - ${n ?? ""}`;
    return E`
      <div class="state-item" data-slot=${String(e.slot)}>
        ${e.showIcon ? E`
              <div class="icon-wrap">
                <div class="icon-shape" style=${M(e.iconStyle)}>
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
              </div>
            ` : $}
        <div class="info">
          <div class="primary">${e.name}</div>
          <div class="secondary">${i}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(e, t) {
    const r = [];
    for (let n = 1; n <= Me; n += 1) {
      const i = n, s = this.slotEnabled(i, e), o = this.slotEntityId(i, e);
      if (!s || !o)
        continue;
      const a = this.entityName(this.slotCustomName(i, e), o, n), l = D(this.hass, o), c = e.unit ?? H(this.hass, o) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(i, e), m = this.iconStyle(this.slotIconColor(i, e)), u = this.resolveColor(Sn[i], To), _ = this.resolveColor(this.slotTrendColor(i, e), u);
      r.push({
        slot: i,
        entityId: o,
        name: a,
        secondary: d,
        unit: c,
        decimals: t,
        currentValue: l,
        icon: h,
        showIcon: this.slotShowIcon(i, e),
        iconStyle: m,
        trendColor: _
      });
    }
    return r;
  }
  slotEntityId(e, t) {
    return Wn(e, t);
  }
  slotCustomName(e, t) {
    return jn(e, t);
  }
  slotEnabled(e, t) {
    return Gn(e, t);
  }
  slotShowIcon(e, t) {
    return qn(e, t);
  }
  slotIcon(e, t) {
    return Yn(e, t);
  }
  slotIconColor(e, t) {
    return Xn(e, t);
  }
  slotTrendColor(e, t) {
    return Kn(e, t);
  }
  entityName(e, t, r) {
    return Jn(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    var n, i, s;
    return Qn(e, t, r, {
      enabled: ((n = this._config) == null ? void 0 : n.auto_scale_units) === !0,
      baseDecimals: ((i = this._config) == null ? void 0 : i.decimals_base_unit) ?? r,
      prefixedDecimals: ((s = this._config) == null ? void 0 : s.decimals_prefixed_unit) ?? r
    });
  }
  formatHoverTimestamp(e) {
    const t = new Date(e), r = "de-AT", n = new Intl.DateTimeFormat(r, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    }).format(t);
    if (this.trendWindowMs(this._config) <= 1440 * 60 * 1e3)
      return n;
    const i = new Intl.DateTimeFormat(r, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(t);
    return `${n} ${i}`;
  }
  convertSharedScaleHoverValue(e, t) {
    if (!this._sharedScaleCanonical)
      return t;
    const r = this._sharedScaleFactors[e];
    return typeof r != "number" || !Number.isFinite(r) || r <= 0 ? t : t / r;
  }
  readConfigString(e) {
    return Y(e);
  }
  normalizeLegendLayout(e) {
    return Zn(e);
  }
  normalizeTimeframeHours(e) {
    return pr(e, wn);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return fr(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : Sn[r];
  }
  iconStyle(e) {
    return dr(e);
  }
  resolveColor(e, t = "") {
    return cr(e, t);
  }
  trendPoints(e, t) {
    const r = Date.now(), n = r - this.trendWindowMs(this._config), i = this._trendSeries[e] ?? [];
    let s = 0;
    for (; s < i.length && i[s].ts < n; )
      s += 1;
    const o = s > 0 ? i.slice(s) : [...i];
    return t !== null && Number.isFinite(t) && o.push({ ts: r, value: t }), o;
  }
  toTrendCoordinates(e, t, r) {
    var b, v;
    const i = Date.now() - t, s = 0, o = 100, a = e.map((w) => w.value), l = (r == null ? void 0 : r.min) ?? Math.min(...a), c = (r == null ? void 0 : r.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, m = Math.max(c - l, Xe), u = e.map((w) => {
      const S = Math.max(0, Math.min(100, (w.ts - i) / t * 100)), p = s + S / 100 * (o - s), g = m <= Xe ? 0.5 : (w.value - l) / m, C = h - g * (h - d);
      return { x: p, y: C, value: w.value, ts: w.ts };
    }), _ = ((b = u[0]) == null ? void 0 : b.x) ?? s, x = ((v = u[u.length - 1]) == null ? void 0 : v.x) ?? o, f = Math.max(0, x - _), y = 18;
    if (u.length >= 2 && f < y) {
      const w = o - y, S = Math.max(s, Math.min(w, x - y));
      if (f <= Xe) {
        const g = y / (u.length - 1);
        return u.map((C, T) => ({
          ...C,
          x: Math.max(s, Math.min(o, S + g * T))
        }));
      }
      const p = y / f;
      return u.map((g) => ({
        ...g,
        x: Math.max(s, Math.min(o, S + (g.x - _) * p))
      }));
    }
    return u;
  }
  toCanvasPoints(e, t, r) {
    return hr(e, t, r).map((n) => ({
      x: n.x,
      y: n.y,
      value: n.value,
      ts: n.ts
    }));
  }
  computeTrendValueRange(e, t) {
    const r = [];
    if (Object.entries(e).forEach(([s, o]) => {
      const a = Number(s), l = (t == null ? void 0 : t[a]) ?? 1;
      o.forEach((c) => r.push(c.value * l));
    }), r.length === 0)
      return null;
    const n = Math.min(...r), i = Math.max(...r);
    return !Number.isFinite(n) || !Number.isFinite(i) ? null : { min: n, max: i };
  }
  resolveSharedScaleFactors(e) {
    let t = null;
    const r = {};
    Object.keys(e).map((s) => Number(s)).filter((s) => Number.isFinite(s) && s >= 1 && s <= Me).forEach((s) => {
      const o = s, a = this._drawConfigs.find((c) => c.slot === o);
      if (!a)
        return;
      const l = J(a.unit);
      if (!l) {
        t = null, r[o] = NaN;
        return;
      }
      if (t === null)
        t = l.family;
      else if (t !== l.family) {
        t = null, r[o] = NaN;
        return;
      }
      r[o] = l.factor;
    });
    const n = Object.keys(e);
    if (n.length === 0)
      return null;
    const i = Object.values(r).some((s) => !Number.isFinite(s ?? NaN));
    return t === null || i || Object.keys(r).length !== n.length ? null : r;
  }
  scaleTrendSeries(e, t) {
    return !Number.isFinite(t) || t === 1 ? e : e.map((r) => ({
      ts: r.ts,
      value: r.value * t
    }));
  }
  syncTrendResizeObserver() {
    if (typeof ResizeObserver > "u")
      return;
    this._trendResizeObserver || (this._trendResizeObserver = new ResizeObserver(() => {
      this.updateGraphTopInset(), this.scheduleTrendCanvasDraw();
    })), this._trendResizeObserver.disconnect();
    const e = this.renderRoot.querySelector(".container");
    e && this._trendResizeObserver.observe(e);
    const t = this.renderRoot.querySelector(".series-list");
    t && this._trendResizeObserver.observe(t);
  }
  scheduleTrendCanvasDraw() {
    this._trendCanvasRaf === void 0 && (this._trendCanvasRaf = window.requestAnimationFrame(() => {
      this._trendCanvasRaf = void 0, this.drawTrendCanvases();
    }));
  }
  drawTrendCanvases() {
    var x, f;
    const e = this.perfNow();
    if (this._drawConfigs.length === 0) {
      this._linePointsBySlot = {}, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "no-draw-configs" });
      return;
    }
    const t = this.renderRoot.querySelector(".card-trend-canvas-area"), r = this.renderRoot.querySelector(".card-trend-canvas-line");
    if (!t || !r) {
      this._linePointsBySlot = {}, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "missing-canvas" });
      return;
    }
    const n = this.prepareTrendCanvas(t), i = this.prepareTrendCanvas(r);
    if (!n || !i) {
      this._linePointsBySlot = {}, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const s = ((x = this._config) == null ? void 0 : x.fill_area_enabled) !== !1, o = this.trendWindowMs(this._config), a = {};
    this._drawConfigs.forEach((y) => {
      const b = this.trendPoints(y.slot, y.currentValue);
      b.length >= 2 && (a[y.slot] = b);
    });
    const l = ((f = this._config) == null ? void 0 : f.shared_trend_scale) === !0, c = l ? this.resolveSharedScaleFactors(a) : null;
    this._sharedScaleCanonical = c !== null, this._sharedScaleFactors = c ?? {};
    const d = l ? this.computeTrendValueRange(a, c ?? void 0) : null, h = {};
    let m = 0, u = 0;
    [...this._drawConfigs].sort((y, b) => b.slot - y.slot).forEach((y) => {
      const b = a[y.slot];
      if (!b || b.length < 2)
        return;
      const v = (c == null ? void 0 : c[y.slot]) ?? 1, w = c ? this.scaleTrendSeries(b, v) : b, S = this.toTrendCoordinates(w, o, d);
      if (S.length < 2)
        return;
      const p = this.toCanvasPoints(S, n.width, n.height), g = this.toCanvasPoints(S, i.width, i.height);
      s && this.drawTrendArea(n.ctx, p, y.color, n.height), this.drawTrendLine(i.ctx, g, y.color, y.lineWidth), h[y.slot] = g, m += 1, u += g.length;
    }), this._linePointsBySlot = h, this._hoverState && !h[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: m,
      points: u,
      fill_area: s,
      shared_scale: l,
      shared_scale_units: this._sharedScaleCanonical ? "canonical" : "raw"
    });
  }
  prepareTrendCanvas(e) {
    const t = e.getContext("2d");
    if (!t)
      return null;
    const r = e.getBoundingClientRect(), n = Math.max(1, Math.round(r.width)), i = Math.max(1, Math.round(r.height)), s = Math.max(1, window.devicePixelRatio || 1), o = Math.max(1, Math.round(n * s)), a = Math.max(1, Math.round(i * s));
    return (e.width !== o || e.height !== a) && (e.width = o, e.height = a), t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height), t.setTransform(s, 0, 0, s, 0, 0), { ctx: t, width: n, height: i };
  }
  drawTrendArea(e, t, r, n) {
    if (t.length < 2)
      return;
    const i = this.resolveCanvasColor(r), s = t[0], o = t[t.length - 1], a = Math.min(...t.map((c) => c.y)), l = e.createLinearGradient(0, a, 0, n);
    l.addColorStop(0, this.withAlpha(i, 0.24)), l.addColorStop(1, this.withAlpha(i, 0)), e.beginPath(), e.moveTo(s.x, s.y), t.slice(1).forEach((c) => e.lineTo(c.x, c.y)), e.lineTo(o.x, n), e.lineTo(s.x, n), e.closePath(), e.fillStyle = l, e.fill();
  }
  drawTrendLine(e, t, r, n) {
    if (t.length < 2)
      return;
    const i = this.resolveCanvasColor(r);
    this.strokeTrendPolyline(e, t, i, n);
  }
  hasConfiguredAction(e) {
    return [e.tap_action, e.hold_action, e.double_tap_action].some(
      (t) => t && t.action && t.action !== "none"
    );
  }
  fireAction(e) {
    if (this.isEditorPreview() || !this._config)
      return;
    const t = `${e}_action`, r = this._config[t];
    if (!(!r || !r.action || r.action === "none")) {
      if (r.action === "more-info" && !this._config.entity) {
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
          detail: { config: this._config, action: e },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  clearHoverState() {
    this._hoverState && (this._hoverState = void 0);
  }
  findNearestHoverPoint(e, t) {
    let r = null, n = Number.POSITIVE_INFINITY;
    for (const i of this._drawConfigs) {
      const s = this._linePointsBySlot[i.slot];
      if (!s || s.length < 2)
        continue;
      const o = this.interpolateCanvasPoint(s, e);
      if (!o)
        continue;
      const a = Math.abs(o.y - t);
      a < n && (n = a, r = {
        slot: i.slot,
        x: o.x,
        y: o.y,
        value: o.value,
        ts: o.ts,
        color: i.color
      });
    }
    return r;
  }
  interpolateCanvasPoint(e, t) {
    if (e.length === 0)
      return null;
    const r = e[0], n = e[e.length - 1];
    if (t <= r.x)
      return { x: t, y: r.y, value: r.value, ts: r.ts };
    if (t >= n.x)
      return { x: t, y: n.y, value: n.value, ts: n.ts };
    for (let i = 1; i < e.length; i += 1) {
      const s = e[i - 1], o = e[i];
      if (t > o.x)
        continue;
      const a = o.x - s.x;
      if (Math.abs(a) <= Xe)
        return { x: t, y: o.y, value: o.value, ts: o.ts };
      const l = (t - s.x) / a;
      return {
        x: t,
        y: s.y + (o.y - s.y) * l,
        value: s.value + (o.value - s.value) * l,
        ts: s.ts + (o.ts - s.ts) * l
      };
    }
    return { x: t, y: n.y, value: n.value, ts: n.ts };
  }
  strokeTrendPolyline(e, t, r, n) {
    t.length < 2 || (e.beginPath(), e.moveTo(t[0].x, t[0].y), t.slice(1).forEach((i) => e.lineTo(i.x, i.y)), e.strokeStyle = r, e.lineWidth = n, e.lineCap = "round", e.lineJoin = "round", e.stroke());
  }
  resolveCanvasColor(e) {
    const t = document.createElement("span");
    t.style.position = "absolute", t.style.opacity = "0", t.style.pointerEvents = "none", t.style.color = e, this.renderRoot.appendChild(t);
    const r = getComputedStyle(t).color;
    return t.remove(), r || "rgb(158, 158, 158)";
  }
  withAlpha(e, t) {
    const r = this.parseColorChannels(e);
    if (!r)
      return e;
    const n = Math.max(0, Math.min(1, t));
    return `rgba(${r[0]}, ${r[1]}, ${r[2]}, ${n})`;
  }
  parseColorChannels(e) {
    const t = e.trim(), r = t.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
    if (r) {
      const l = r.slice(1, 4).map((c) => Math.max(0, Math.min(255, Math.round(Number(c)))));
      if (l.every((c) => Number.isFinite(c)))
        return [l[0], l[1], l[2]];
    }
    this._canvasColorContext || (this._canvasColorContext = document.createElement("canvas").getContext("2d"));
    const n = this._canvasColorContext;
    if (!n)
      return null;
    n.fillStyle = "#000000", n.fillStyle = t;
    const i = n.fillStyle, o = (typeof i == "string" ? i.trim() : "").match(/^#([a-f\d]{6})$/i);
    if (!o)
      return null;
    const a = o[1];
    return [
      parseInt(a.slice(0, 2), 16),
      parseInt(a.slice(2, 4), 16),
      parseInt(a.slice(4, 6), 16)
    ];
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
    var n, i;
    const e = this.renderRoot.querySelector("ha-card");
    if (!e || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const t = !!((n = this._config.hold_action) != null && n.action && this._config.hold_action.action !== "none"), r = !!((i = this._config.double_tap_action) != null && i.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = _r(
      e,
      {
        onTap: () => this.fireAction("tap"),
        onHold: () => this.fireAction("hold"),
        onDoubleTap: () => this.fireAction("double_tap")
      },
      { hasHold: t, hasDoubleTap: r }
    );
  }
  updated(e) {
    var o;
    e.has("_config") && this.setupActionHandler();
    const t = e.get("_config"), r = e.has("_config") && this.shouldRefreshTrendOnConfigChange(t, this._config), n = e.get("hass"), i = e.has("hass") && this.didTrackedEntityStateChange(n);
    (e.has("preview") || e.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (e.has("_config") ? (r && this.scheduleConfigRefresh(), this.clearHoverState()) : e.has("hass") && this._isVisible && i && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (e.has("_config") ? (r && this.scheduleConfigRefresh(!0), this.clearHoverState()) : e.has("hass") && i && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((o = this._config) == null ? void 0 : o.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset();
    const s = e.has("_config") || e.has("_trendSeries") || e.has("_graphTopInset") || e.has("preview") || e.has("editMode") || i;
    (!this.shouldRunLiveRuntime() || this._isVisible) && s && this.scheduleTrendCanvasDraw();
  }
  updateGraphTopInset() {
    const e = this._config;
    if (!e || e.clip_graph_to_labels !== !0) {
      this._graphTopInset !== 0 && (this._graphTopInset = 0);
      return;
    }
    const t = this.renderRoot.querySelector(".container"), r = this.renderRoot.querySelector(".series-list");
    if (!t || !r) {
      this._graphTopInset !== 0 && (this._graphTopInset = 0);
      return;
    }
    const n = t.getBoundingClientRect(), i = r.getBoundingClientRect(), s = Math.max(0, Math.ceil(i.bottom - n.top));
    Math.abs(s - this._graphTopInset) > 0.5 && (this._graphTopInset = s);
  }
  maybeRefreshTrendHistory(e = !1, t = !1) {
    if (!this.shouldRunLiveRuntime() && !t || !this._isVisible && !t || t && !this.isEditorPreview())
      return;
    e && (this._lastTrendRefresh = 0);
    const r = Date.now();
    !e && r - this._lastTrendRefresh < xn || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest($o) || this.hasEditorLikeAncestor();
  }
  shouldRunLiveRuntime() {
    return !this.isEditorPreview();
  }
  hasEditorLikeAncestor() {
    let e = this;
    for (; e; ) {
      const t = e.tagName.toLowerCase();
      if (t.startsWith("hui-") && (t.includes("preview") || t.includes("editor") || t.includes("picker") || t.includes("dialog")))
        return !0;
      if (e instanceof HTMLElement) {
        const r = e.className;
        if (typeof r == "string") {
          const n = r.toLowerCase();
          if (n.includes("preview") || n.includes("editor") || n.includes("card-picker"))
            return !0;
        }
      }
      e = e.parentElement;
    }
    return !1;
  }
  perfNow() {
    return typeof performance < "u" && typeof performance.now == "function" ? performance.now() : Date.now();
  }
  toPerfMs(e) {
    return Math.round(e * 10) / 10;
  }
  logPerformance(e, t) {
    var r;
    if (((r = this._config) == null ? void 0 : r.debug_performance) === !0) {
      if (t) {
        console.debug("[PowerPilz][Graph]", e, t);
        return;
      }
      console.debug("[PowerPilz][Graph]", e);
    }
  }
  setupVisibilityObserver() {
    if (typeof IntersectionObserver > "u") {
      this._isVisible = !0;
      return;
    }
    this._visibilityObserver || (this._visibilityObserver = new IntersectionObserver((e) => {
      const t = e.some((r) => r.isIntersecting && r.intersectionRatio > 0);
      t !== this._isVisible && (this._isVisible = t, this.shouldRunLiveRuntime() && (t ? (this.startLiveRuntime(!0), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw()) : (this.clearHoverState(), this.stopLiveRuntime())));
    }, { threshold: [0, 0.01] }), this._visibilityObserver.observe(this));
  }
  teardownVisibilityObserver() {
    this._visibilityObserver && (this._visibilityObserver.disconnect(), this._visibilityObserver = void 0), this._isVisible = typeof IntersectionObserver > "u";
  }
  scheduleConfigRefresh(e = !1) {
    !this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview() || (this._configRefreshTimer !== void 0 && window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = window.setTimeout(() => {
      this._configRefreshTimer = void 0, this.maybeRefreshTrendHistory(!0, e);
    }, Eo));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, xn), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.updateGraphTopInset(), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this.clearConfigRefreshTimer(), this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
  }
  async refreshTrendHistory(e = !1, t = !1) {
    var a;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !t)
      return;
    const r = this._config, n = {}, i = this.trendWindowMs(r), s = B(r.trend_data_source, "hybrid"), o = this.enabledSlots(r);
    if (o.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const l = this.perfNow(), c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
      let m = Number.POSITIVE_INFINITY;
      const u = Date.now() - i;
      for (const v of o) {
        const w = this.slotEntityId(v, r);
        if (!w)
          continue;
        c.set(v, w);
        const S = this._trendSeries[v] ?? [];
        if (e || S.length === 0 || d.has(w)) {
          d.add(w), h.delete(w);
          continue;
        }
        if (d.has(w))
          continue;
        h.add(w);
        const p = ((a = S[S.length - 1]) == null ? void 0 : a.ts) ?? u, g = Math.max(u, p - Co);
        m = Math.min(m, g);
      }
      let _ = 0;
      const x = d.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await Se(
          this.hass,
          Array.from(d),
          i,
          { dataSource: s }
        );
        return _ = this.perfNow() - v, w;
      })() : {};
      let f = 0;
      const y = h.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await Se(
          this.hass,
          Array.from(h),
          i,
          {
            startMs: Number.isFinite(m) ? m : u,
            dataSource: s
          }
        );
        return f = this.perfNow() - v, w;
      })() : {};
      c.forEach((v, w) => {
        const S = this._trendSeries[w] ?? [];
        if (d.has(v)) {
          const p = x[v] ?? [];
          n[w] = p.length > 0 ? p : S.filter((g) => g.ts >= u);
          return;
        }
        if (h.has(v)) {
          const p = y[v] ?? [];
          n[w] = et(S, p, u);
          return;
        }
        n[w] = S.filter((p) => p.ts >= u);
      });
      const b = this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((v) => Number(v)).filter((v) => Number.isFinite(v) && v >= 1 && v <= Me).every((v) => {
        const w = v;
        return this.areTrendSeriesEqual(n[w] ?? [], this._trendSeries[w] ?? []);
      });
      b || (this._trendSeries = n), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - l),
        window_ms: i,
        force_full: e,
        slots: o.length,
        full_entities: d.size,
        incremental_entities: h.size,
        data_source: s,
        full_fetch_ms: this.toPerfMs(_),
        incremental_fetch_ms: this.toPerfMs(f),
        series_changed: !b
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let r = 1; r <= Me; r += 1) {
      const n = r;
      this.slotEnabled(n, e) && this.slotEntityId(n, e) && t.push(n);
    }
    return t;
  }
  trackedEntityIds(e) {
    const t = /* @__PURE__ */ new Set();
    return this.enabledSlots(e).forEach((r) => {
      const n = this.slotEntityId(r, e);
      n && t.add(n);
    }), Array.from(t);
  }
  didTrackedEntityStateChange(e) {
    if (!this._config || !this.hass || !e)
      return !0;
    const t = this.trackedEntityIds(this._config);
    return t.length === 0 ? !1 : t.some((r) => e.states[r] !== this.hass.states[r]);
  }
  shouldRefreshTrendOnConfigChange(e, t) {
    if (!e || !t || this.trendWindowMs(e) !== this.trendWindowMs(t) || B(e.trend_data_source, "hybrid") !== B(t.trend_data_source, "hybrid"))
      return !0;
    for (let r = 1; r <= Me; r += 1) {
      const n = r, i = this.slotEnabled(n, e), s = this.slotEnabled(n, t), o = i ? this.slotEntityId(n, e) : void 0, a = s ? this.slotEntityId(n, t) : void 0;
      if (i !== s || o !== a)
        return !0;
    }
    return !1;
  }
  sameTrendSeriesKeys(e, t) {
    const r = Object.keys(e).sort(), n = Object.keys(t).sort();
    return r.length === n.length && r.every((i, s) => i === n[s]);
  }
  areTrendSeriesEqual(e, t) {
    if (e.length !== t.length)
      return !1;
    for (let r = 0; r < e.length; r += 1) {
      const n = e[r], i = t[r];
      if (n.ts !== i.ts || Math.abs(n.value - i.value) > 1e-4)
        return !1;
    }
    return !0;
  }
};
X.styles = st`
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
ne([
  L({ attribute: !1 })
], X.prototype, "hass", 2);
ne([
  L({ type: Boolean })
], X.prototype, "preview", 2);
ne([
  L({ type: Boolean })
], X.prototype, "editMode", 2);
ne([
  O()
], X.prototype, "_config", 2);
ne([
  O()
], X.prototype, "_trendSeries", 2);
ne([
  O()
], X.prototype, "_graphTopInset", 2);
ne([
  O()
], X.prototype, "_hoverState", 2);
X = ne([
  ue("power-pilz-graph-card")
], X);
var Ro = Object.defineProperty, Mo = Object.getOwnPropertyDescriptor, br = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Mo(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && Ro(t, r, i), i;
};
let nt = class extends U {
  constructor() {
    super(...arguments), this.computeLabel = (e) => oi(e), this.valueChanged = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement) || t.tagName !== "HA-FORM")
        return;
      const r = e.detail.value;
      if (!r || typeof r != "object" || Array.isArray(r))
        return;
      const n = {
        ...r,
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
  setConfig(e) {
    const t = {
      ...e,
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: ri(e.legend_layout),
      timeframe_hours: ni(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      normalize_stack_to_percent: e.normalize_stack_to_percent ?? !1,
      percent_reference_slot: e.percent_reference_slot,
      percent_reference_auto: e.percent_reference_auto ?? !1,
      decimals: e.decimals ?? 1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: e.decimals_base_unit ?? e.decimals ?? 1,
      decimals_prefixed_unit: e.decimals_prefixed_unit ?? e.decimals ?? 1,
      line_thickness: ii(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...si(e)
    };
    this._config = t;
  }
  render() {
    if (!this.hass || !this._config)
      return $;
    const e = this._config.normalize_stack_to_percent ?? !1, t = ti(!0, e);
    return E`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Be}
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
br([
  L({ attribute: !1 })
], nt.prototype, "hass", 2);
br([
  O()
], nt.prototype, "_config", 2);
nt = br([
  ue("power-pilz-graph-stack-card-editor")
], nt);
var Ao = Object.defineProperty, zo = Object.getOwnPropertyDescriptor, ie = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? zo(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && Ao(t, r, i), i;
};
const Ae = 1, Cn = 24, En = 300 * 1e3, Po = 60 * 1e3, Oo = 350, ae = 0.01, ge = 4, Lo = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", Io = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), Tn = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let K = class extends U {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._graphTopInset = 0, this._drawConfigs = [], this._linePointsBySlot = {}, this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._isVisible = !1, this._liveRuntimeActive = !1, this._stackCanonicalMode = !1, this._stackCanonicalFactors = {}, this._stackNormalizeToPercent = !1, this.handlePointerMove = (e) => {
      if (this.isEditorPreview()) {
        this.clearHoverState();
        return;
      }
      const t = this.renderRoot.querySelector(".card-trend");
      if (!t || !this._config || this._config.hover_enabled === !1) {
        this.clearHoverState();
        return;
      }
      const r = t.getBoundingClientRect();
      if (r.width <= 1 || r.height <= 1) {
        this.clearHoverState();
        return;
      }
      const n = e.clientX - r.left, i = e.clientY - r.top;
      if (n < 0 || n > r.width || i < 0 || i > r.height) {
        this.clearHoverState();
        return;
      }
      const s = this.findNearestHoverPoint(n, i);
      if (!s) {
        this.clearHoverState();
        return;
      }
      const o = this._hoverState;
      o && o.slot === s.slot && Math.abs(o.x - s.x) <= 0.2 && Math.abs(o.y - s.y) <= 0.2 && Math.abs(o.value - s.value) <= 1e-4 && o.color === s.color || (this._hoverState = s);
    }, this.handlePointerLeave = () => {
      this.clearHoverState();
    }, this.handleCardKeyDown = (e) => {
      e.key !== "Enter" && e.key !== " " || (e.preventDefault(), this.fireAction("tap"));
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-graph-stack-card-editor");
  }
  static async getStubConfig(e) {
    const t = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(t), n = (...c) => c.find((d) => d in t), i = (c) => r.find((d) => d.startsWith(`${c}.`)), s = n("sensor.dev_home_power", "sensor.home_power") ?? i("sensor") ?? "sensor.dev_home_power", o = n("sensor.dev_solar_power", "sensor.solar_power"), a = n("sensor.dev_grid_power", "sensor.grid_power"), l = n("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: "row",
      timeframe_hours: Cn,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      normalize_stack_to_percent: !1,
      auto_scale_units: !1,
      entity_1: s,
      entity_1_enabled: !0,
      entity_1_show_icon: !0,
      entity_1_icon: "mdi:chart-line",
      entity_1_trend_color: "purple",
      entity_2: o,
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
      decimals: Ae,
      decimals_base_unit: Ae,
      decimals_prefixed_unit: Ae
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Ae, r = re(e.decimals_base_unit, t), n = re(e.decimals_prefixed_unit, t), i = this.readConfigString(e.entity), s = this.readConfigString(e.icon), o = this.readConfigString(e.entity_1) ?? i ?? "sensor.dev_home_power";
    this._config = {
      ...e,
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: this.normalizeLegendLayout(e.legend_layout),
      timeframe_hours: this.normalizeTimeframeHours(e.timeframe_hours),
      line_thickness: this.normalizeLineThickness(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      trend_data_source: B(e.trend_data_source, "hybrid"),
      normalize_stack_to_percent: e.normalize_stack_to_percent ?? !1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: r,
      decimals_prefixed_unit: n,
      entity_1: o,
      entity_1_name: this.readConfigString(e.entity_1_name),
      entity_1_enabled: e.entity_1_enabled ?? !0,
      entity_1_show_icon: e.entity_1_show_icon ?? !0,
      entity_1_icon: e.entity_1_icon ?? s ?? "mdi:chart-line",
      entity_1_icon_color: e.entity_1_icon_color ?? e.icon_color,
      entity_1_trend_color: this.normalizeTrendColor(e.entity_1_trend_color, e.trend_color, 1),
      entity_2: this.readConfigString(e.entity_2),
      entity_2_name: this.readConfigString(e.entity_2_name),
      entity_2_enabled: e.entity_2_enabled ?? !1,
      entity_2_show_icon: e.entity_2_show_icon ?? !0,
      entity_2_icon: e.entity_2_icon ?? "mdi:chart-line-variant",
      entity_2_trend_color: this.normalizeTrendColor(e.entity_2_trend_color, void 0, 2),
      entity_3: this.readConfigString(e.entity_3),
      entity_3_name: this.readConfigString(e.entity_3_name),
      entity_3_enabled: e.entity_3_enabled ?? !1,
      entity_3_show_icon: e.entity_3_show_icon ?? !0,
      entity_3_icon: e.entity_3_icon ?? "mdi:chart-bell-curve",
      entity_3_trend_color: this.normalizeTrendColor(e.entity_3_trend_color, void 0, 3),
      entity_4: this.readConfigString(e.entity_4),
      entity_4_name: this.readConfigString(e.entity_4_name),
      entity_4_enabled: e.entity_4_enabled ?? !1,
      entity_4_show_icon: e.entity_4_show_icon ?? !0,
      entity_4_icon: e.entity_4_icon ?? "mdi:chart-timeline-variant",
      entity_4_trend_color: this.normalizeTrendColor(e.entity_4_trend_color, void 0, 4),
      decimals: t
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
      return E`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return E``;
    const e = this._config, t = e.decimals ?? Ae, r = this.normalizeLineThickness(e.line_thickness), n = e.normalize_stack_to_percent === !0, i = this.collectSeriesEntries(e, t), s = this.withStackedCurrentValues(i, n, e), o = this.normalizeLegendLayout(e.legend_layout), a = e.hover_enabled !== !1, l = this.hasConfiguredAction(e), c = !this.isEditorPreview() && l, d = this._hoverState, h = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, m = h > 0 ? { top: `${h}px` } : {}, u = d ? {
      left: `${d.x}px`,
      top: `${d.y + h}px`,
      "--hover-dot-color": d.color
    } : {};
    return this._drawConfigs = i.map((_) => ({
      slot: _.slot,
      currentValue: _.currentValue,
      unit: _.unit,
      color: _.trendColor,
      lineWidth: r
    })), E`
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
          <div class="card-trend" style=${M(m)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${M(m)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${a && d ? E`<div class="hover-dot" aria-hidden="true" style=${M(u)}></div>` : $}

          <div class="content">
            <div class="series-list layout-${o}">
              ${i.length === 0 ? E`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph Stack card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : s.map(
      (_) => this.renderSeriesItem(
        _,
        d && d.slot === _.slot ? d : null
      )
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderSeriesItem(e, t) {
    const r = t === null ? null : this.convertStackedHoverValue(e.slot, t.value), n = t === null ? null : this.formatHoverTimestamp(t.ts), i = r === null ? e.secondary : `${this.formatValue(r, e.unit, e.decimals)} - ${n ?? ""}`;
    return E`
      <div class="state-item" data-slot=${String(e.slot)}>
        ${e.showIcon ? E`
              <div class="icon-wrap">
                <div class="icon-shape" style=${M(e.iconStyle)}>
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
              </div>
            ` : $}
        <div class="info">
          <div class="primary">${e.name}</div>
          <div class="secondary">${i}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(e, t) {
    const r = [];
    for (let n = 1; n <= ge; n += 1) {
      const i = n, s = this.slotEnabled(i, e), o = this.slotEntityId(i, e);
      if (!s || !o)
        continue;
      const a = this.entityName(this.slotCustomName(i, e), o, n), l = D(this.hass, o), c = e.unit ?? H(this.hass, o) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(i, e), m = this.iconStyle(this.slotIconColor(i, e)), u = this.resolveColor(Tn[i], Lo), _ = this.resolveColor(this.slotTrendColor(i, e), u);
      r.push({
        slot: i,
        entityId: o,
        name: a,
        secondary: d,
        unit: c,
        decimals: t,
        currentValue: l,
        icon: h,
        showIcon: this.slotShowIcon(i, e),
        iconStyle: m,
        trendColor: _
      });
    }
    return r;
  }
  resolvePercentReference(e, t) {
    const r = t.percent_reference_slot, n = typeof r == "number" ? r : typeof r == "string" && r.length > 0 ? Number(r) : NaN, i = Number.isFinite(n) && n >= 1 && n <= ge ? n : void 0;
    return { refSlot: i !== void 0 && e.some((o) => o.slot === i) ? i : void 0, auto: t.percent_reference_auto === !0 };
  }
  withStackedCurrentValues(e, t, r) {
    var u;
    const n = this.resolveStackUnitFactors(e), { refSlot: i, auto: s } = t ? this.resolvePercentReference(e, r) : { refSlot: void 0, auto: !1 }, o = (_) => _.currentValue === null || !Number.isFinite(_.currentValue) ? 0 : n ? _.currentValue * (n[_.slot] ?? 1) : _.currentValue;
    let a, l;
    if (t && i !== void 0 && !s) {
      const _ = e.find((x) => x.slot === i);
      a = _ ? o(_) : 0, l = i;
    } else t && s ? (a = e.reduce((_, x) => x.slot !== i ? _ + o(x) : _, 0), l = i) : (a = e.reduce((_, x) => _ + o(x), 0), l = (u = e[e.length - 1]) == null ? void 0 : u.slot);
    const c = Number.isFinite(a) && Math.abs(a) > ae;
    let d = 0, h = 0, m = !1;
    return e.map((_) => {
      const x = i !== void 0 && _.slot === i && !s;
      _.currentValue !== null && Number.isFinite(_.currentValue) && (x || (d += _.currentValue, n && (h += _.currentValue * (n[_.slot] ?? 1))), m = !0);
      let f;
      if (!m)
        f = null;
      else if (t)
        if (!c)
          f = 0;
        else if (x)
          f = 100;
        else if (i !== void 0 || s) {
          const b = o(_);
          f = Math.max(0, Math.min(100, b / a * 100));
        } else {
          const b = n ? h : d;
          f = _.slot === l ? 100 : Math.max(0, Math.min(100, b / a * 100));
        }
      else
        f = n ? h / (n[_.slot] ?? 1) : d;
      const y = t ? "%" : _.unit;
      return {
        ..._,
        unit: y,
        secondary: this.formatValue(f, y, _.decimals)
      };
    });
  }
  slotEntityId(e, t) {
    return Wn(e, t);
  }
  slotCustomName(e, t) {
    return jn(e, t);
  }
  slotEnabled(e, t) {
    return Gn(e, t);
  }
  slotShowIcon(e, t) {
    return qn(e, t);
  }
  slotIcon(e, t) {
    return Yn(e, t);
  }
  slotIconColor(e, t) {
    return Xn(e, t);
  }
  slotTrendColor(e, t) {
    return Kn(e, t);
  }
  entityName(e, t, r) {
    return Jn(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    var n, i, s;
    return Qn(e, t, r, {
      enabled: ((n = this._config) == null ? void 0 : n.auto_scale_units) === !0,
      baseDecimals: ((i = this._config) == null ? void 0 : i.decimals_base_unit) ?? r,
      prefixedDecimals: ((s = this._config) == null ? void 0 : s.decimals_prefixed_unit) ?? r
    });
  }
  formatHoverTimestamp(e) {
    const t = new Date(e), r = "de-AT", n = new Intl.DateTimeFormat(r, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    }).format(t);
    if (this.trendWindowMs(this._config) <= 1440 * 60 * 1e3)
      return n;
    const i = new Intl.DateTimeFormat(r, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(t);
    return `${n} ${i}`;
  }
  resolveStackUnitFactors(e) {
    if (e.length === 0)
      return null;
    let t = null;
    const r = {};
    for (const n of e) {
      const i = J(n.unit);
      if (!i)
        return null;
      if (t === null)
        t = i.family;
      else if (t !== i.family)
        return null;
      r[n.slot] = i.factor;
    }
    return Object.keys(r).length === e.length ? r : null;
  }
  convertStackedHoverValue(e, t) {
    if (this._stackNormalizeToPercent)
      return Math.max(0, Math.min(100, t));
    if (!this._stackCanonicalMode)
      return t;
    const r = this._stackCanonicalFactors[e];
    return typeof r != "number" || !Number.isFinite(r) || r <= 0 ? t : t / r;
  }
  readConfigString(e) {
    return Y(e);
  }
  normalizeLegendLayout(e) {
    return Zn(e);
  }
  normalizeTimeframeHours(e) {
    return pr(e, Cn);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return fr(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : Tn[r];
  }
  iconStyle(e) {
    return dr(e);
  }
  resolveColor(e, t = "") {
    return cr(e, t);
  }
  trendPoints(e, t) {
    const r = Date.now(), n = r - this.trendWindowMs(this._config), i = this._trendSeries[e] ?? [];
    let s = 0;
    for (; s < i.length && i[s].ts < n; )
      s += 1;
    const o = s > 0 ? i.slice(s) : [...i];
    return t !== null && Number.isFinite(t) && o.push({ ts: r, value: t }), o;
  }
  toTrendCoordinates(e, t, r) {
    var b, v;
    const i = Date.now() - t, s = 0, o = 100, a = e.map((w) => w.value), l = (r == null ? void 0 : r.min) ?? Math.min(...a), c = (r == null ? void 0 : r.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, m = Math.max(c - l, ae), u = e.map((w) => {
      const S = Math.max(0, Math.min(100, (w.ts - i) / t * 100)), p = s + S / 100 * (o - s), g = m <= ae ? 0.5 : (w.value - l) / m, C = h - g * (h - d);
      return { x: p, y: C, value: w.value, ts: w.ts };
    }), _ = ((b = u[0]) == null ? void 0 : b.x) ?? s, x = ((v = u[u.length - 1]) == null ? void 0 : v.x) ?? o, f = Math.max(0, x - _), y = 18;
    if (u.length >= 2 && f < y) {
      const w = o - y, S = Math.max(s, Math.min(w, x - y));
      if (f <= ae) {
        const g = y / (u.length - 1);
        return u.map((C, T) => ({
          ...C,
          x: Math.max(s, Math.min(o, S + g * T))
        }));
      }
      const p = y / f;
      return u.map((g) => ({
        ...g,
        x: Math.max(s, Math.min(o, S + (g.x - _) * p))
      }));
    }
    return u;
  }
  toCanvasPoints(e, t, r) {
    return hr(e, t, r).map((n) => ({
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
    const e = this.renderRoot.querySelector(".container");
    e && this._trendResizeObserver.observe(e);
    const t = this.renderRoot.querySelector(".series-list");
    t && this._trendResizeObserver.observe(t);
  }
  scheduleTrendCanvasDraw() {
    this._trendCanvasRaf === void 0 && (this._trendCanvasRaf = window.requestAnimationFrame(() => {
      this._trendCanvasRaf = void 0, this.drawTrendCanvases();
    }));
  }
  drawTrendCanvases() {
    var b, v, w;
    const e = this.perfNow();
    if (this._drawConfigs.length === 0) {
      this._linePointsBySlot = {}, this._stackCanonicalMode = !1, this._stackCanonicalFactors = {}, this._stackNormalizeToPercent = !1, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "no-draw-configs" });
      return;
    }
    const t = this.renderRoot.querySelector(".card-trend-canvas-area"), r = this.renderRoot.querySelector(".card-trend-canvas-line");
    if (!t || !r) {
      this._linePointsBySlot = {}, this._stackCanonicalMode = !1, this._stackCanonicalFactors = {}, this._stackNormalizeToPercent = !1, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "missing-canvas" });
      return;
    }
    const n = this.prepareTrendCanvas(t), i = this.prepareTrendCanvas(r);
    if (!n || !i) {
      this._linePointsBySlot = {}, this._stackCanonicalMode = !1, this._stackCanonicalFactors = {}, this._stackNormalizeToPercent = !1, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const s = ((b = this._config) == null ? void 0 : b.fill_area_enabled) !== !1, o = ((v = this._config) == null ? void 0 : v.normalize_stack_to_percent) === !0, a = ((w = this._config) == null ? void 0 : w.shared_trend_scale) === !0, l = this.resolveStackUnitFactors(this._drawConfigs);
    this._stackCanonicalMode = l !== null, this._stackCanonicalFactors = l ?? {}, this._stackNormalizeToPercent = o;
    const c = this.trendWindowMs(this._config), d = {}, h = o ? this.resolvePercentReference(
      this._drawConfigs,
      this._config
    ) : { refSlot: void 0, auto: !1 }, m = this.buildStackedTrendSeries(c, l ?? void 0, h.refSlot, h.auto), u = o ? this.normalizeStackedSeriesToPercent(m, h.refSlot, h.auto) : m, _ = o ? { min: 0, max: 100 } : a ? this.computeStackedValueRange(u) : null;
    let x = 0, f = 0;
    [...this._drawConfigs].sort((S, p) => p.slot - S.slot).forEach((S) => {
      const p = u[S.slot] ?? [];
      if (p.length < 2)
        return;
      const g = this.toTrendCoordinates(p, c, _);
      if (g.length < 2)
        return;
      const C = this.toCanvasPoints(g, n.width, n.height), T = this.toCanvasPoints(g, i.width, i.height);
      s && this.drawTrendArea(n.ctx, C, S.color, n.height), this.drawTrendLine(i.ctx, T, S.color, S.lineWidth), d[S.slot] = T, x += 1, f += T.length;
    }), this._linePointsBySlot = d, this._hoverState && !d[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: x,
      points: f,
      fill_area: s,
      shared_scale: a,
      normalize_percent: o,
      stack_units: this._stackCanonicalMode ? "canonical" : "raw"
    });
  }
  buildStackedTrendSeries(e, t, r, n) {
    const i = {}, s = [...this._drawConfigs].sort((l, c) => l.slot - c.slot), o = r !== void 0 && !n;
    let a = null;
    return s.forEach((l) => {
      const c = this.trendPoints(l.slot, l.currentValue);
      if (c.length === 0)
        return;
      const d = this.normalizeTrendSeries(c, e);
      if (d.length === 0)
        return;
      const h = (t == null ? void 0 : t[l.slot]) ?? 1, m = h === 1 ? d : d.map((_) => ({
        ts: _.ts,
        value: _.value * h
      }));
      if (o && l.slot === r) {
        i[l.slot] = m;
        return;
      }
      const u = a ? this.sumTrendSeries(a, m) : m;
      i[l.slot] = u, a = u;
    }), i;
  }
  normalizeTrendSeries(e, t) {
    const r = Date.now() - t, n = [...e].filter((s) => Number.isFinite(s.ts) && Number.isFinite(s.value) && s.ts >= r).sort((s, o) => s.ts - o.ts);
    if (n.length === 0)
      return [];
    const i = [];
    return n.forEach((s) => {
      const o = i[i.length - 1];
      o && Math.abs(o.ts - s.ts) <= 0.5 ? i[i.length - 1] = s : i.push(s);
    }), i;
  }
  sumTrendSeries(e, t) {
    return e.length === 0 ? [...t] : t.length === 0 ? [...e] : this.mergeTimestamps(e, t).map((n) => ({
      ts: n,
      value: this.interpolateTrendValue(e, n) + this.interpolateTrendValue(t, n)
    }));
  }
  mergeTimestamps(e, t) {
    const r = [];
    let n = 0, i = 0;
    const s = (o) => {
      const a = r[r.length - 1];
      (a === void 0 || Math.abs(a - o) > 0.5) && r.push(o);
    };
    for (; n < e.length || i < t.length; ) {
      const o = n < e.length ? e[n].ts : Number.POSITIVE_INFINITY, a = i < t.length ? t[i].ts : Number.POSITIVE_INFINITY;
      o <= a ? (s(o), n += 1, Math.abs(o - a) <= 0.5 && (i += 1)) : (s(a), i += 1);
    }
    return r;
  }
  interpolateTrendValue(e, t) {
    if (e.length === 0)
      return 0;
    if (t <= e[0].ts)
      return e[0].value;
    const r = e[e.length - 1];
    if (t >= r.ts)
      return r.value;
    let n = 0, i = e.length - 1;
    for (; n <= i; ) {
      const d = Math.floor((n + i) / 2), h = e[d];
      if (Math.abs(h.ts - t) <= 0.5)
        return h.value;
      h.ts < t ? n = d + 1 : i = d - 1;
    }
    const s = Math.max(1, Math.min(e.length - 1, n)), o = e[s - 1], a = e[s], l = a.ts - o.ts;
    if (Math.abs(l) <= ae)
      return a.value;
    const c = (t - o.ts) / l;
    return o.value + (a.value - o.value) * c;
  }
  computeStackedValueRange(e) {
    const t = [];
    if (Object.values(e).forEach((i) => {
      i.forEach((s) => t.push(s.value));
    }), t.length === 0)
      return null;
    const r = Math.min(...t), n = Math.max(...t);
    return !Number.isFinite(r) || !Number.isFinite(n) ? null : { min: r, max: n };
  }
  normalizeStackedSeriesToPercent(e, t, r) {
    const n = {}, i = Object.keys(e).map((a) => Number(a)).filter((a) => Number.isFinite(a) && a >= 1 && a <= ge).sort((a, l) => a - l);
    if (i.length === 0)
      return n;
    let s, o;
    if (t !== void 0 && !r)
      s = e[t] ?? [], o = t;
    else if (r) {
      const a = t !== void 0 ? i.filter((l) => l !== t) : i;
      o = a[a.length - 1] ?? i[i.length - 1], s = e[o] ?? [];
    } else
      o = i[i.length - 1], s = e[o] ?? [];
    return s.length < 1 || i.forEach((a) => {
      const l = e[a] ?? [];
      l.length !== 0 && (n[a] = l.map((c) => {
        const d = this.interpolateTrendValue(s, c.ts);
        if (!Number.isFinite(d) || Math.abs(d) <= ae)
          return { ts: c.ts, value: 0 };
        if (a === o)
          return { ts: c.ts, value: 100 };
        if (t !== void 0 && a === t && !r)
          return { ts: c.ts, value: 100 };
        const h = c.value / d * 100;
        return {
          ts: c.ts,
          value: Math.max(0, h)
        };
      }));
    }), n;
  }
  prepareTrendCanvas(e) {
    const t = e.getContext("2d");
    if (!t)
      return null;
    const r = e.getBoundingClientRect(), n = Math.max(1, Math.round(r.width)), i = Math.max(1, Math.round(r.height)), s = Math.max(1, window.devicePixelRatio || 1), o = Math.max(1, Math.round(n * s)), a = Math.max(1, Math.round(i * s));
    return (e.width !== o || e.height !== a) && (e.width = o, e.height = a), t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height), t.setTransform(s, 0, 0, s, 0, 0), { ctx: t, width: n, height: i };
  }
  drawTrendArea(e, t, r, n) {
    if (t.length < 2)
      return;
    const i = this.resolveCanvasColor(r), s = t[0], o = t[t.length - 1], a = Math.min(...t.map((c) => c.y)), l = e.createLinearGradient(0, a, 0, n);
    l.addColorStop(0, this.withAlpha(i, 0.24)), l.addColorStop(1, this.withAlpha(i, 0)), e.beginPath(), e.moveTo(s.x, s.y), t.slice(1).forEach((c) => e.lineTo(c.x, c.y)), e.lineTo(o.x, n), e.lineTo(s.x, n), e.closePath(), e.fillStyle = l, e.fill();
  }
  drawTrendLine(e, t, r, n) {
    if (t.length < 2)
      return;
    const i = this.resolveCanvasColor(r);
    this.strokeTrendPolyline(e, t, i, n);
  }
  hasConfiguredAction(e) {
    return [e.tap_action, e.hold_action, e.double_tap_action].some(
      (t) => t && t.action && t.action !== "none"
    );
  }
  fireAction(e) {
    if (this.isEditorPreview() || !this._config)
      return;
    const t = `${e}_action`, r = this._config[t];
    if (!(!r || !r.action || r.action === "none")) {
      if (r.action === "more-info" && !this._config.entity) {
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
          detail: { config: this._config, action: e },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  clearHoverState() {
    this._hoverState && (this._hoverState = void 0);
  }
  findNearestHoverPoint(e, t) {
    let r = null, n = Number.POSITIVE_INFINITY;
    for (const i of this._drawConfigs) {
      const s = this._linePointsBySlot[i.slot];
      if (!s || s.length < 2)
        continue;
      const o = this.interpolateCanvasPoint(s, e);
      if (!o)
        continue;
      const a = Math.abs(o.y - t);
      a < n && (n = a, r = {
        slot: i.slot,
        x: o.x,
        y: o.y,
        value: o.value,
        ts: o.ts,
        color: i.color
      });
    }
    return r;
  }
  interpolateCanvasPoint(e, t) {
    if (e.length === 0)
      return null;
    const r = e[0], n = e[e.length - 1];
    if (t <= r.x)
      return { x: t, y: r.y, value: r.value, ts: r.ts };
    if (t >= n.x)
      return { x: t, y: n.y, value: n.value, ts: n.ts };
    for (let i = 1; i < e.length; i += 1) {
      const s = e[i - 1], o = e[i];
      if (t > o.x)
        continue;
      const a = o.x - s.x;
      if (Math.abs(a) <= ae)
        return { x: t, y: o.y, value: o.value, ts: o.ts };
      const l = (t - s.x) / a;
      return {
        x: t,
        y: s.y + (o.y - s.y) * l,
        value: s.value + (o.value - s.value) * l,
        ts: s.ts + (o.ts - s.ts) * l
      };
    }
    return { x: t, y: n.y, value: n.value, ts: n.ts };
  }
  strokeTrendPolyline(e, t, r, n) {
    t.length < 2 || (e.beginPath(), e.moveTo(t[0].x, t[0].y), t.slice(1).forEach((i) => e.lineTo(i.x, i.y)), e.strokeStyle = r, e.lineWidth = n, e.lineCap = "round", e.lineJoin = "round", e.stroke());
  }
  resolveCanvasColor(e) {
    const t = document.createElement("span");
    t.style.position = "absolute", t.style.opacity = "0", t.style.pointerEvents = "none", t.style.color = e, this.renderRoot.appendChild(t);
    const r = getComputedStyle(t).color;
    return t.remove(), r || "rgb(158, 158, 158)";
  }
  withAlpha(e, t) {
    const r = this.parseColorChannels(e);
    if (!r)
      return e;
    const n = Math.max(0, Math.min(1, t));
    return `rgba(${r[0]}, ${r[1]}, ${r[2]}, ${n})`;
  }
  parseColorChannels(e) {
    const t = e.trim(), r = t.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
    if (r) {
      const l = r.slice(1, 4).map((c) => Math.max(0, Math.min(255, Math.round(Number(c)))));
      if (l.every((c) => Number.isFinite(c)))
        return [l[0], l[1], l[2]];
    }
    this._canvasColorContext || (this._canvasColorContext = document.createElement("canvas").getContext("2d"));
    const n = this._canvasColorContext;
    if (!n)
      return null;
    n.fillStyle = "#000000", n.fillStyle = t;
    const i = n.fillStyle, o = (typeof i == "string" ? i.trim() : "").match(/^#([a-f\d]{6})$/i);
    if (!o)
      return null;
    const a = o[1];
    return [
      parseInt(a.slice(0, 2), 16),
      parseInt(a.slice(2, 4), 16),
      parseInt(a.slice(4, 6), 16)
    ];
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
    var n, i;
    const e = this.renderRoot.querySelector("ha-card");
    if (!e || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const t = !!((n = this._config.hold_action) != null && n.action && this._config.hold_action.action !== "none"), r = !!((i = this._config.double_tap_action) != null && i.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = _r(
      e,
      {
        onTap: () => this.fireAction("tap"),
        onHold: () => this.fireAction("hold"),
        onDoubleTap: () => this.fireAction("double_tap")
      },
      { hasHold: t, hasDoubleTap: r }
    );
  }
  updated(e) {
    var o;
    e.has("_config") && this.setupActionHandler();
    const t = e.get("_config"), r = e.has("_config") && this.shouldRefreshTrendOnConfigChange(t, this._config), n = e.get("hass"), i = e.has("hass") && this.didTrackedEntityStateChange(n);
    (e.has("preview") || e.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (e.has("_config") ? (r && this.scheduleConfigRefresh(), this.clearHoverState()) : e.has("hass") && this._isVisible && i && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (e.has("_config") ? (r && this.scheduleConfigRefresh(!0), this.clearHoverState()) : e.has("hass") && i && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((o = this._config) == null ? void 0 : o.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset();
    const s = e.has("_config") || e.has("_trendSeries") || e.has("_graphTopInset") || e.has("preview") || e.has("editMode") || i;
    (!this.shouldRunLiveRuntime() || this._isVisible) && s && this.scheduleTrendCanvasDraw();
  }
  updateGraphTopInset() {
    const e = this._config;
    if (!e || e.clip_graph_to_labels !== !0) {
      this._graphTopInset !== 0 && (this._graphTopInset = 0);
      return;
    }
    const t = this.renderRoot.querySelector(".container"), r = this.renderRoot.querySelector(".series-list");
    if (!t || !r) {
      this._graphTopInset !== 0 && (this._graphTopInset = 0);
      return;
    }
    const n = t.getBoundingClientRect(), i = r.getBoundingClientRect(), s = Math.max(0, Math.ceil(i.bottom - n.top));
    Math.abs(s - this._graphTopInset) > 0.5 && (this._graphTopInset = s);
  }
  maybeRefreshTrendHistory(e = !1, t = !1) {
    if (!this.shouldRunLiveRuntime() && !t || !this._isVisible && !t || t && !this.isEditorPreview())
      return;
    e && (this._lastTrendRefresh = 0);
    const r = Date.now();
    !e && r - this._lastTrendRefresh < En || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(Io) || this.hasEditorLikeAncestor();
  }
  shouldRunLiveRuntime() {
    return !this.isEditorPreview();
  }
  hasEditorLikeAncestor() {
    let e = this;
    for (; e; ) {
      const t = e.tagName.toLowerCase();
      if (t.startsWith("hui-") && (t.includes("preview") || t.includes("editor") || t.includes("picker") || t.includes("dialog")))
        return !0;
      if (e instanceof HTMLElement) {
        const r = e.className;
        if (typeof r == "string") {
          const n = r.toLowerCase();
          if (n.includes("preview") || n.includes("editor") || n.includes("card-picker"))
            return !0;
        }
      }
      e = e.parentElement;
    }
    return !1;
  }
  perfNow() {
    return typeof performance < "u" && typeof performance.now == "function" ? performance.now() : Date.now();
  }
  toPerfMs(e) {
    return Math.round(e * 10) / 10;
  }
  logPerformance(e, t) {
    var r;
    if (((r = this._config) == null ? void 0 : r.debug_performance) === !0) {
      if (t) {
        console.debug("[PowerPilz][GraphStack]", e, t);
        return;
      }
      console.debug("[PowerPilz][GraphStack]", e);
    }
  }
  setupVisibilityObserver() {
    if (typeof IntersectionObserver > "u") {
      this._isVisible = !0;
      return;
    }
    this._visibilityObserver || (this._visibilityObserver = new IntersectionObserver((e) => {
      const t = e.some((r) => r.isIntersecting && r.intersectionRatio > 0);
      t !== this._isVisible && (this._isVisible = t, this.shouldRunLiveRuntime() && (t ? (this.startLiveRuntime(!0), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw()) : (this.clearHoverState(), this.stopLiveRuntime())));
    }, { threshold: [0, 0.01] }), this._visibilityObserver.observe(this));
  }
  teardownVisibilityObserver() {
    this._visibilityObserver && (this._visibilityObserver.disconnect(), this._visibilityObserver = void 0), this._isVisible = typeof IntersectionObserver > "u";
  }
  scheduleConfigRefresh(e = !1) {
    !this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview() || (this._configRefreshTimer !== void 0 && window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = window.setTimeout(() => {
      this._configRefreshTimer = void 0, this.maybeRefreshTrendHistory(!0, e);
    }, Oo));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, En), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.updateGraphTopInset(), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this.clearConfigRefreshTimer(), this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
  }
  async refreshTrendHistory(e = !1, t = !1) {
    var a;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !t)
      return;
    const r = this._config, n = {}, i = this.trendWindowMs(r), s = B(r.trend_data_source, "hybrid"), o = this.enabledSlots(r);
    if (o.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const l = this.perfNow(), c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
      let m = Number.POSITIVE_INFINITY;
      const u = Date.now() - i;
      for (const v of o) {
        const w = this.slotEntityId(v, r);
        if (!w)
          continue;
        c.set(v, w);
        const S = this._trendSeries[v] ?? [];
        if (e || S.length === 0 || d.has(w)) {
          d.add(w), h.delete(w);
          continue;
        }
        if (d.has(w))
          continue;
        h.add(w);
        const p = ((a = S[S.length - 1]) == null ? void 0 : a.ts) ?? u, g = Math.max(u, p - Po);
        m = Math.min(m, g);
      }
      let _ = 0;
      const x = d.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await Se(
          this.hass,
          Array.from(d),
          i,
          { dataSource: s }
        );
        return _ = this.perfNow() - v, w;
      })() : {};
      let f = 0;
      const y = h.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await Se(
          this.hass,
          Array.from(h),
          i,
          {
            startMs: Number.isFinite(m) ? m : u,
            dataSource: s
          }
        );
        return f = this.perfNow() - v, w;
      })() : {};
      c.forEach((v, w) => {
        const S = this._trendSeries[w] ?? [];
        if (d.has(v)) {
          const p = x[v] ?? [];
          n[w] = p.length > 0 ? p : S.filter((g) => g.ts >= u);
          return;
        }
        if (h.has(v)) {
          const p = y[v] ?? [];
          n[w] = et(S, p, u);
          return;
        }
        n[w] = S.filter((p) => p.ts >= u);
      });
      const b = this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((v) => Number(v)).filter((v) => Number.isFinite(v) && v >= 1 && v <= ge).every((v) => {
        const w = v;
        return this.areTrendSeriesEqual(n[w] ?? [], this._trendSeries[w] ?? []);
      });
      b || (this._trendSeries = n), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - l),
        window_ms: i,
        force_full: e,
        slots: o.length,
        full_entities: d.size,
        incremental_entities: h.size,
        data_source: s,
        full_fetch_ms: this.toPerfMs(_),
        incremental_fetch_ms: this.toPerfMs(f),
        series_changed: !b
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let r = 1; r <= ge; r += 1) {
      const n = r;
      this.slotEnabled(n, e) && this.slotEntityId(n, e) && t.push(n);
    }
    return t;
  }
  trackedEntityIds(e) {
    const t = /* @__PURE__ */ new Set();
    return this.enabledSlots(e).forEach((r) => {
      const n = this.slotEntityId(r, e);
      n && t.add(n);
    }), Array.from(t);
  }
  didTrackedEntityStateChange(e) {
    if (!this._config || !this.hass || !e)
      return !0;
    const t = this.trackedEntityIds(this._config);
    return t.length === 0 ? !1 : t.some((r) => e.states[r] !== this.hass.states[r]);
  }
  shouldRefreshTrendOnConfigChange(e, t) {
    if (!e || !t || this.trendWindowMs(e) !== this.trendWindowMs(t) || B(e.trend_data_source, "hybrid") !== B(t.trend_data_source, "hybrid"))
      return !0;
    for (let r = 1; r <= ge; r += 1) {
      const n = r, i = this.slotEnabled(n, e), s = this.slotEnabled(n, t), o = i ? this.slotEntityId(n, e) : void 0, a = s ? this.slotEntityId(n, t) : void 0;
      if (i !== s || o !== a)
        return !0;
    }
    return !1;
  }
  sameTrendSeriesKeys(e, t) {
    const r = Object.keys(e).sort(), n = Object.keys(t).sort();
    return r.length === n.length && r.every((i, s) => i === n[s]);
  }
  areTrendSeriesEqual(e, t) {
    if (e.length !== t.length)
      return !1;
    for (let r = 0; r < e.length; r += 1) {
      const n = e[r], i = t[r];
      if (n.ts !== i.ts || Math.abs(n.value - i.value) > 1e-4)
        return !1;
    }
    return !0;
  }
};
K.styles = st`
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
ie([
  L({ attribute: !1 })
], K.prototype, "hass", 2);
ie([
  L({ type: Boolean })
], K.prototype, "preview", 2);
ie([
  L({ type: Boolean })
], K.prototype, "editMode", 2);
ie([
  O()
], K.prototype, "_config", 2);
ie([
  O()
], K.prototype, "_trendSeries", 2);
ie([
  O()
], K.prototype, "_graphTopInset", 2);
ie([
  O()
], K.prototype, "_hoverState", 2);
K = ie([
  ue("power-pilz-graph-stack-card")
], K);
var ko = Object.defineProperty, No = Object.getOwnPropertyDescriptor, gr = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? No(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && ko(t, r, i), i;
};
const Ho = [
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
], Do = {
  name: "Name",
  icon: "Icon",
  icon_color: "Icon color",
  power_entity: "Power entity",
  status_entity: "Status entity",
  mode_entity: "Mode entity",
  command_entity: "Command entity",
  show_mode_selector: "Show mode selector",
  show_live_value: "Show live status and power",
  show_command_button: "Show play/pause button",
  decimals: "Decimals",
  auto_scale_units: "Auto unit scaling (W<->kW, Wh<->kWh)",
  decimals_base_unit: "Decimals (base unit)",
  decimals_prefixed_unit: "Decimals (prefixed units)"
};
let it = class extends U {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = e.name ?? "";
      return Do[t] ?? t;
    }, this.valueChanged = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement) || t.tagName !== "HA-FORM")
        return;
      const r = e.detail.value;
      if (!r || typeof r != "object" || Array.isArray(r))
        return;
      const n = {
        ...r,
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
  setConfig(e) {
    this._config = {
      ...e,
      show_mode_selector: e.show_mode_selector ?? !0,
      show_live_value: e.show_live_value ?? !0,
      show_command_button: e.show_command_button ?? !0,
      decimals: e.decimals ?? 1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: e.decimals_base_unit ?? e.decimals ?? 1,
      decimals_prefixed_unit: e.decimals_prefixed_unit ?? e.decimals ?? 1,
      type: "custom:power-pilz-wallbox-card"
    };
  }
  render() {
    return !this.hass || !this._config ? $ : E`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Be}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ho}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
gr([
  L({ attribute: !1 })
], it.prototype, "hass", 2);
gr([
  O()
], it.prototype, "_config", 2);
it = gr([
  ue("power-pilz-wallbox-card-editor")
], it);
var Bo = Object.defineProperty, _e = (e, t, r, n) => {
  for (var i = void 0, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = o(t, r, i) || i);
  return i && Bo(t, r, i), i;
};
const Fo = 0.01, $n = "power-pilz-wallbox-mode-menu-portal-style", vr = class vr extends U {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._actionBusy = !1, this._modeMenuOpen = !1, this._modeMenuOptionCount = 0, this.toggleModeMenu = (t) => {
      var o;
      if (t.stopPropagation(), this.isEditorPreview() || !((o = this._config) != null && o.mode_entity) || this._actionBusy)
        return;
      const r = we(this.hass, this._config.mode_entity), n = (r == null ? void 0 : r.state) ?? "", i = this.getModeOptions(r);
      if (i.length === 0)
        return;
      if (this._modeMenuOpen) {
        this.closeModeMenuPortal();
        return;
      }
      const s = t.currentTarget;
      s && this.openModeMenuPortal(s, i, n || i[0] || "Mode");
    }, this.selectModeOption = async (t) => {
      var i;
      if (!((i = this._config) != null && i.mode_entity))
        return;
      const r = we(this.hass, this._config.mode_entity);
      if (!r || r.state === t)
        return;
      const n = this.entityDomain(this._config.mode_entity);
      await Promise.resolve(
        this.hass.callService(n, "select_option", {
          entity_id: this._config.mode_entity,
          option: t
        })
      );
    }, this.handleActionClick = async (t) => {
      if (this.isEditorPreview() || !this._config || this._actionBusy)
        return;
      t.stopPropagation(), this.closeModeMenuPortal();
      const r = D(this.hass, this._config.power_entity), n = Ze(this.hass, this._config.status_entity), i = this.isCharging(n, r, this._config.command_entity), s = this.resolveActionCommand(i);
      if (s) {
        this._actionBusy = !0;
        try {
          await Promise.resolve(this.hass.callService(s.domain, s.service, s.data));
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
  static async getStubConfig(t) {
    const r = (t == null ? void 0 : t.states) ?? {}, n = Object.keys(r), i = (...c) => c.find((d) => d in r), s = (c) => n.find((d) => d.startsWith(`${c}.`)), o = i("sensor.dev_wallbox_power", "sensor.wallbox_power") ?? s("sensor") ?? "sensor.dev_wallbox_power", a = i("input_select.dev_wallbox_mode", "select.wallbox_charging_mode") ?? s("input_select") ?? s("select"), l = i("input_boolean.dev_wallbox_enabled", "switch.wallbox_charging_enabled") ?? s("input_boolean") ?? s("switch");
    return {
      type: "custom:power-pilz-wallbox-card",
      name: "Wallbox",
      power_entity: o,
      status_entity: i("sensor.dev_wallbox_status", "sensor.wallbox_status"),
      mode_entity: a,
      command_entity: l,
      decimals: 1,
      auto_scale_units: !1,
      decimals_base_unit: 1,
      decimals_prefixed_unit: 1
    };
  }
  setConfig(t) {
    const r = t.power_entity ?? "sensor.dev_wallbox_power", n = typeof t.decimals == "number" && Number.isFinite(t.decimals) ? Math.min(3, Math.max(0, Math.round(t.decimals))) : 1;
    this._config = {
      ...t,
      icon: t.icon ?? "mdi:power-plug",
      name: t.name ?? "Wallbox",
      show_mode_selector: t.show_mode_selector ?? !0,
      show_live_value: t.show_live_value ?? !0,
      show_command_button: t.show_command_button ?? !0,
      decimals: n,
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: re(t.decimals_base_unit, n),
      decimals_prefixed_unit: re(t.decimals_prefixed_unit, n),
      power_entity: r
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
    if (!this._config)
      return E`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return E``;
    const t = this._config, r = D(this.hass, t.power_entity), n = H(this.hass, t.power_entity) ?? "kW", i = Ze(this.hass, t.status_entity), s = we(this.hass, t.mode_entity), o = (s == null ? void 0 : s.state) ?? "", a = this.getModeOptions(s), l = this.isCharging(i, r, t.command_entity), c = this.resolveActionCommand(l), d = l ? "Stop" : "Start", h = l ? "mdi:pause" : "mdi:play", m = this.statusLabel(i, l), u = this.formatPower(r, n, t.decimals ?? 1), _ = this.showModeSelector(t, a), x = this.showLiveValue(t), f = this.showCommandButton(t), y = this.isEditorPreview() || this._actionBusy || !t.mode_entity || a.length === 0, b = o || a[0] || "Mode", v = this._modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down", w = this.iconStyle(t.icon_color), p = Number(x) + Number(f) === 1, g = _ && x && f, C = p && x, T = p && f || g, R = C || T, A = x && !C, z = f && !T, F = _ || A || z, k = _ ? A || z ? z ? "actions" : "actions no-command" : "actions mode-only" : "actions no-mode";
    return (!_ || y) && this._modeMenuOpen && this.closeModeMenuPortal(), E`
      <ha-card>
        <div class="container">
          <div class="state-item ${R ? "compact-state" : ""}">
            <div class="icon-wrap">
              <div class="icon-shape" style=${M(w)}>
                <ha-icon .icon=${t.icon ?? "mdi:ev-station"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${t.name}</div>
              <div class="secondary">EV charger</div>
            </div>

            ${R ? E`
                  <div class="compact-trailing ${T ? "button-only" : ""}">
                    ${C ? E`
                          <div class="compact-live-value">
                            <span>${m}</span>
                            <span class="dot">•</span>
                            <span>${u}</span>
                          </div>
                        ` : E``}

                    ${T ? E`
                          <button
                            type="button"
                            class="action-button"
                            ?disabled=${this.isEditorPreview() || this._actionBusy || !c}
                            @click=${this.handleActionClick}
                            title=${d}
                            aria-label=${d}
                          >
                            <ha-icon .icon=${h}></ha-icon>
                          </button>
                        ` : E``}
                  </div>
                ` : E``}
          </div>

          ${F ? E`
                <div class=${k}>
                  ${_ ? E`
                        <div class="mode-select-wrap">
                          <button
                            type="button"
                            class="mode-select"
                            ?disabled=${y}
                            @click=${this.toggleModeMenu}
                            aria-haspopup="listbox"
                            aria-expanded=${this._modeMenuOpen ? "true" : "false"}
                            title="Charging mode"
                          >
                            <span class="mode-select-label">${b}</span>
                            <ha-icon class="mode-select-chevron" .icon=${v}></ha-icon>
                          </button>
                        </div>
                      ` : E``}

                  ${A ? E`
                        <div class="live-value">
                          <span>${m}</span>
                          <span class="dot">•</span>
                          <span>${u}</span>
                        </div>
                      ` : E``}

                  ${z ? E`
                        <button
                          type="button"
                          class="action-button"
                          ?disabled=${this.isEditorPreview() || this._actionBusy || !c}
                          @click=${this.handleActionClick}
                          title=${d}
                          aria-label=${d}
                        >
                          <ha-icon .icon=${h}></ha-icon>
                        </button>
                      ` : E``}
                </div>
              ` : E``}
        </div>
      </ha-card>
    `;
  }
  getModeOptions(t) {
    const r = t == null ? void 0 : t.attributes.options;
    if (Array.isArray(r)) {
      const n = r.filter(
        (i) => typeof i == "string" && i.trim().length > 0
      );
      if (n.length > 0)
        return Array.from(new Set(n));
    }
    return [];
  }
  showModeSelector(t, r) {
    return t.show_mode_selector === !1 ? !1 : !!t.mode_entity && Array.isArray(r) && r.length > 0;
  }
  showCommandButton(t) {
    return t.show_command_button !== !1;
  }
  showLiveValue(t) {
    return t.show_live_value !== !1;
  }
  statusLabel(t, r) {
    return t ? t.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (n) => n.toUpperCase()) : r ? "Charging" : "Idle";
  }
  formatPower(t, r, n) {
    var s, o, a;
    const i = t === null ? null : Math.abs(t);
    return ur(i, r, n, {
      enabled: ((s = this._config) == null ? void 0 : s.auto_scale_units) === !0,
      baseDecimals: ((o = this._config) == null ? void 0 : o.decimals_base_unit) ?? n,
      prefixedDecimals: ((a = this._config) == null ? void 0 : a.decimals_prefixed_unit) ?? n,
      nullWithUnit: !0
    });
  }
  isCharging(t, r, n) {
    var i;
    if (t) {
      const s = t.toLowerCase();
      if (["charging", "active", "running", "on", "start", "started"].includes(s))
        return !0;
      if (["idle", "paused", "stopped", "off", "standby", "complete"].includes(s))
        return !1;
    }
    if (n) {
      const s = (i = Ze(this.hass, n)) == null ? void 0 : i.toLowerCase();
      if (s === "on")
        return !0;
      if (s === "off")
        return !1;
    }
    return r !== null && r > Fo;
  }
  parseServiceAction(t) {
    if (!t)
      return null;
    const [r, n] = t.split(".");
    return !r || !n ? null : { domain: r, service: n };
  }
  entityDomain(t) {
    return t.split(".")[0];
  }
  objectValue(t) {
    return t && typeof t == "object" && !Array.isArray(t) ? t : {};
  }
  resolveActionCommand(t) {
    if (!this._config)
      return null;
    const r = this._config, n = this.parseServiceAction(t ? r.stop_service : r.start_service);
    if (n) {
      const i = this.objectValue(t ? r.stop_service_data : r.start_service_data);
      return r.command_entity && i.entity_id === void 0 && (i.entity_id = r.command_entity), { ...n, data: i };
    }
    return r.command_entity ? {
      domain: this.entityDomain(r.command_entity),
      service: t ? "turn_off" : "turn_on",
      data: { entity_id: r.command_entity }
    } : null;
  }
  iconStyle(t) {
    return dr(t);
  }
  disconnectedCallback() {
    this.closeModeMenuPortal(), super.disconnectedCallback();
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  ensureModeMenuPortalStyles() {
    if (document.getElementById($n))
      return;
    const t = document.createElement("style");
    t.id = $n, t.textContent = `
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
    `, document.head.append(t);
  }
  currentModeButton() {
    var t;
    return (t = this.renderRoot) == null ? void 0 : t.querySelector(".mode-select");
  }
  positionModeMenuPortal(t) {
    const r = this._modeMenuPortal;
    if (!r)
      return;
    const n = t ?? this.currentModeButton();
    if (!n)
      return;
    const i = n.getBoundingClientRect(), s = 8, o = 6, a = Math.max(96, Math.min(280, window.innerHeight - s * 2)), l = Math.min(
      a,
      this._modeMenuOptionCount * 34 + Math.max(0, this._modeMenuOptionCount - 1) * 4 + 14
    ), c = r.offsetHeight > 0 ? Math.min(a, r.offsetHeight) : l, d = Math.max(120, Math.round(i.width)), h = window.innerHeight - i.bottom - s, m = h < c + o && i.top - s > h;
    let u = i.left;
    u = Math.max(s, Math.min(u, window.innerWidth - d - s));
    let _ = m ? i.top - o - c : i.bottom + o;
    _ = Math.max(s, Math.min(_, window.innerHeight - c - s)), r.style.maxHeight = `${a}px`, r.style.width = `${d}px`, r.style.left = `${Math.round(u)}px`, r.style.top = `${Math.round(_)}px`;
  }
  openModeMenuPortal(t, r, n) {
    this.closeModeMenuPortal(), this.ensureModeMenuPortalStyles();
    const i = document.createElement("div");
    i.className = "power-pilz-mode-menu-backdrop", i.addEventListener("click", () => {
      this.closeModeMenuPortal();
    });
    const s = document.createElement("div");
    s.className = "power-pilz-mode-menu-portal", s.setAttribute("role", "listbox"), r.forEach((o) => {
      const a = document.createElement("button");
      a.type = "button", a.className = `power-pilz-mode-menu-option ${o === n ? "selected" : ""}`, a.dataset.option = o, a.setAttribute("role", "option"), a.setAttribute("aria-selected", o === n ? "true" : "false"), a.textContent = o, a.addEventListener("click", (l) => {
        var d;
        l.stopPropagation();
        const c = ((d = l.currentTarget) == null ? void 0 : d.dataset.option) ?? "";
        c && (this.closeModeMenuPortal(), this.selectModeOption(c));
      }), s.append(a);
    }), document.body.append(i), document.body.append(s), this._modeMenuBackdrop = i, this._modeMenuPortal = s, this._modeMenuOptionCount = r.length, this._modeMenuOpen = !0, this.positionModeMenuPortal(t);
  }
  closeModeMenuPortal() {
    this._modeMenuPortal && (this._modeMenuPortal.remove(), this._modeMenuPortal = void 0), this._modeMenuBackdrop && (this._modeMenuBackdrop.remove(), this._modeMenuBackdrop = void 0), this._modeMenuOptionCount = 0, this._modeMenuOpen && (this._modeMenuOpen = !1);
  }
};
vr.styles = st`
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
let j = vr;
_e([
  L({ attribute: !1 })
], j.prototype, "hass");
_e([
  L({ type: Boolean })
], j.prototype, "preview");
_e([
  L({ type: Boolean })
], j.prototype, "editMode");
_e([
  L({ reflect: !0, type: String })
], j.prototype, "layout");
_e([
  O()
], j.prototype, "_config");
_e([
  O()
], j.prototype, "_actionBusy");
_e([
  O()
], j.prototype, "_modeMenuOpen");
class Vo extends j {
}
customElements.get("power-pilz-wallbox-card") || customElements.define("power-pilz-wallbox-card", j);
customElements.get("power-pilz-wallbox-card-v2") || customElements.define("power-pilz-wallbox-card-v2", Vo);
window.customCards = window.customCards || [];
const Uo = [
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
  }
];
for (const e of Uo)
  window.customCards.some((t) => t.type === e.type) || window.customCards.push(e);
console.info(
  `%cPOWER PILZ%c v${Be}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
//# sourceMappingURL=power-pilz.js.map
