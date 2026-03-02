/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const De = globalThis, vt = De.ShadowRoot && (De.ShadyCSS === void 0 || De.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, gt = Symbol(), Zt = /* @__PURE__ */ new WeakMap();
let Ar = class {
  constructor(t, r, n) {
    if (this._$cssResult$ = !0, n !== gt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (vt && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = Zt.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Zt.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Gn = (e) => new Ar(typeof e == "string" ? e : e + "", void 0, gt), Ke = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, s, i) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[i + 1], e[0]);
  return new Ar(r, e, gt);
}, qn = (e, t) => {
  if (vt) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), s = De.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = r.cssText, e.appendChild(n);
  }
}, Qt = vt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return Gn(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Kn, defineProperty: Xn, getOwnPropertyDescriptor: Yn, getOwnPropertyNames: Jn, getOwnPropertySymbols: Zn, getPrototypeOf: Qn } = Object, Z = globalThis, er = Z.trustedTypes, es = er ? er.emptyScript : "", ct = Z.reactiveElementPolyfillSupport, Te = (e, t) => e, Fe = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? es : null;
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
} }, wt = (e, t) => !Kn(e, t), tr = { attribute: !0, type: String, converter: Fe, reflect: !1, useDefault: !1, hasChanged: wt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Z.litPropertyMetadata ?? (Z.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let fe = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = tr) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, r);
      s !== void 0 && Xn(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: s, set: i } = Yn(this.prototype, t) ?? { get() {
      return this[r];
    }, set(o) {
      this[r] = o;
    } };
    return { get: s, set(o) {
      const a = s == null ? void 0 : s.call(this);
      i == null || i.call(this, o), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? tr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Te("elementProperties"))) return;
    const t = Qn(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Te("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Te("properties"))) {
      const r = this.properties, n = [...Jn(r), ...Zn(r)];
      for (const s of n) this.createProperty(s, r[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [n, s] of r) this.elementProperties.set(n, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, n] of this.elementProperties) {
      const s = this._$Eu(r, n);
      s !== void 0 && this._$Eh.set(s, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const s of n) r.unshift(Qt(s));
    } else t !== void 0 && r.push(Qt(t));
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
    return qn(t, this.constructor.elementStyles), t;
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
    var i;
    const n = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, n);
    if (s !== void 0 && n.reflect === !0) {
      const o = (((i = n.converter) == null ? void 0 : i.toAttribute) !== void 0 ? n.converter : Fe).toAttribute(r, n.type);
      this._$Em = t, o == null ? this.removeAttribute(s) : this.setAttribute(s, o), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var i, o;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = n.getPropertyOptions(s), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((i = a.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? a.converter : Fe;
      this._$Em = s;
      const c = l.fromAttribute(r, a.type);
      this[s] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, r, n, s = !1, i) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (i = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? wt)(i, r) || n.useDefault && n.reflect && i === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, r, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: n, reflect: s, wrapped: i }, o) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? r ?? this[t]), i !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (r = void 0), this._$AL.set(t, r)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, o] of s) {
        const { wrapped: a } = o, l = this[i];
        a !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, o, l);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), (n = this._$EO) == null || n.forEach((s) => {
        var i;
        return (i = s.hostUpdate) == null ? void 0 : i.call(s);
      }), this.update(r)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var r;
    (r = this._$EO) == null || r.forEach((n) => {
      var s;
      return (s = n.hostUpdated) == null ? void 0 : s.call(n);
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
fe.elementStyles = [], fe.shadowRootOptions = { mode: "open" }, fe[Te("elementProperties")] = /* @__PURE__ */ new Map(), fe[Te("finalized")] = /* @__PURE__ */ new Map(), ct == null || ct({ ReactiveElement: fe }), (Z.reactiveElementVersions ?? (Z.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ee = globalThis, rr = (e) => e, Ve = Ee.trustedTypes, nr = Ve ? Ve.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Pr = "$lit$", J = `lit$${Math.random().toFixed(9).slice(2)}$`, Or = "?" + J, ts = `<${Or}>`, ce = document, Me = () => ce.createComment(""), Re = (e) => e === null || typeof e != "object" && typeof e != "function", St = Array.isArray, rs = (e) => St(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", dt = `[ 	
\f\r]`, ge = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, sr = /-->/g, ir = />/g, se = RegExp(`>|${dt}(?:([^\\s"'>=/]+)(${dt}*=${dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), or = /'/g, ar = /"/g, kr = /^(?:script|style|textarea|title)$/i, ns = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), $ = ns(1), de = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), lr = /* @__PURE__ */ new WeakMap(), oe = ce.createTreeWalker(ce, 129);
function Nr(e, t) {
  if (!St(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return nr !== void 0 ? nr.createHTML(t) : t;
}
const ss = (e, t) => {
  const r = e.length - 1, n = [];
  let s, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ge;
  for (let a = 0; a < r; a++) {
    const l = e[a];
    let c, d, h = -1, _ = 0;
    for (; _ < l.length && (o.lastIndex = _, d = o.exec(l), d !== null); ) _ = o.lastIndex, o === ge ? d[1] === "!--" ? o = sr : d[1] !== void 0 ? o = ir : d[2] !== void 0 ? (kr.test(d[2]) && (s = RegExp("</" + d[2], "g")), o = se) : d[3] !== void 0 && (o = se) : o === se ? d[0] === ">" ? (o = s ?? ge, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? se : d[3] === '"' ? ar : or) : o === ar || o === or ? o = se : o === sr || o === ir ? o = ge : (o = se, s = void 0);
    const u = o === se && e[a + 1].startsWith("/>") ? " " : "";
    i += o === ge ? l + ts : h >= 0 ? (n.push(c), l.slice(0, h) + Pr + l.slice(h) + J + u) : l + J + (h === -2 ? a : u);
  }
  return [Nr(e, i + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ze {
  constructor({ strings: t, _$litType$: r }, n) {
    let s;
    this.parts = [];
    let i = 0, o = 0;
    const a = t.length - 1, l = this.parts, [c, d] = ss(t, r);
    if (this.el = ze.createElement(c, n), oe.currentNode = this.el.content, r === 2 || r === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = oe.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(Pr)) {
          const _ = d[o++], u = s.getAttribute(h).split(J), m = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: i, name: m[2], strings: u, ctor: m[1] === "." ? os : m[1] === "?" ? as : m[1] === "@" ? ls : Xe }), s.removeAttribute(h);
        } else h.startsWith(J) && (l.push({ type: 6, index: i }), s.removeAttribute(h));
        if (kr.test(s.tagName)) {
          const h = s.textContent.split(J), _ = h.length - 1;
          if (_ > 0) {
            s.textContent = Ve ? Ve.emptyScript : "";
            for (let u = 0; u < _; u++) s.append(h[u], Me()), oe.nextNode(), l.push({ type: 2, index: ++i });
            s.append(h[_], Me());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Or) l.push({ type: 2, index: i });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(J, h + 1)) !== -1; ) l.push({ type: 7, index: i }), h += J.length - 1;
      }
      i++;
    }
  }
  static createElement(t, r) {
    const n = ce.createElement("template");
    return n.innerHTML = t, n;
  }
}
function be(e, t, r = e, n) {
  var o, a;
  if (t === de) return t;
  let s = n !== void 0 ? (o = r._$Co) == null ? void 0 : o[n] : r._$Cl;
  const i = Re(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== i && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), i === void 0 ? s = void 0 : (s = new i(e), s._$AT(e, r, n)), n !== void 0 ? (r._$Co ?? (r._$Co = []))[n] = s : r._$Cl = s), s !== void 0 && (t = be(e, s._$AS(e, t.values), s, n)), t;
}
class is {
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
    const { el: { content: r }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? ce).importNode(r, !0);
    oe.currentNode = s;
    let i = oe.nextNode(), o = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new Ae(i, i.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(i, l.name, l.strings, this, t) : l.type === 6 && (c = new cs(i, this, t)), this._$AV.push(c), l = n[++a];
      }
      o !== (l == null ? void 0 : l.index) && (i = oe.nextNode(), o++);
    }
    return oe.currentNode = ce, s;
  }
  p(t) {
    let r = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, r), r += n.strings.length - 2) : n._$AI(t[r])), r++;
  }
}
class Ae {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, r, n, s) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = n, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = be(this, t, r), Re(t) ? t === T || t == null || t === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== de && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : rs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== T && Re(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ce.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var i;
    const { values: r, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ze.createElement(Nr(n.h, n.h[0]), this.options)), n);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === s) this._$AH.p(r);
    else {
      const o = new is(s, this), a = o.u(this.options);
      o.p(r), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let r = lr.get(t.strings);
    return r === void 0 && lr.set(t.strings, r = new ze(t)), r;
  }
  k(t) {
    St(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let n, s = 0;
    for (const i of t) s === r.length ? r.push(n = new Ae(this.O(Me()), this.O(Me()), this, this.options)) : n = r[s], n._$AI(i), s++;
    s < r.length && (this._$AR(n && n._$AB.nextSibling, s), r.length = s);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, r); t !== this._$AB; ) {
      const s = rr(t).nextSibling;
      rr(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 && (this._$Cv = t, (r = this._$AP) == null || r.call(this, t));
  }
}
class Xe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, n, s, i) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t, this.name = r, this._$AM = s, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = T;
  }
  _$AI(t, r = this, n, s) {
    const i = this.strings;
    let o = !1;
    if (i === void 0) t = be(this, t, r, 0), o = !Re(t) || t !== this._$AH && t !== de, o && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = i[0], l = 0; l < i.length - 1; l++) c = be(this, a[n + l], r, l), c === de && (c = this._$AH[l]), o || (o = !Re(c) || c !== this._$AH[l]), c === T ? t = T : t !== T && (t += (c ?? "") + i[l + 1]), this._$AH[l] = c;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class os extends Xe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }
}
class as extends Xe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== T);
  }
}
class ls extends Xe {
  constructor(t, r, n, s, i) {
    super(t, r, n, s, i), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = be(this, t, r, 0) ?? T) === de) return;
    const n = this._$AH, s = t === T && n !== T || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, i = t !== T && (n === T || s);
    s && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class cs {
  constructor(t, r, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    be(this, t);
  }
}
const ht = Ee.litHtmlPolyfillSupport;
ht == null || ht(ze, Ae), (Ee.litHtmlVersions ?? (Ee.litHtmlVersions = [])).push("3.3.2");
const ds = (e, t, r) => {
  const n = (r == null ? void 0 : r.renderBefore) ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const i = (r == null ? void 0 : r.renderBefore) ?? null;
    n._$litPart$ = s = new Ae(t.insertBefore(Me(), i), i, void 0, r ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = globalThis;
let U = class extends fe {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ds(r, this.renderRoot, this.renderOptions);
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
    return de;
  }
};
var zr;
U._$litElement$ = !0, U.finalized = !0, (zr = ae.litElementHydrateSupport) == null || zr.call(ae, { LitElement: U });
const ut = ae.litElementPolyfillSupport;
ut == null || ut({ LitElement: U });
(ae.litElementVersions ?? (ae.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const hs = { attribute: !0, type: String, converter: Fe, reflect: !1, hasChanged: wt }, us = (e = hs, t, r) => {
  const { kind: n, metadata: s } = r;
  let i = globalThis.litPropertyMetadata.get(s);
  if (i === void 0 && globalThis.litPropertyMetadata.set(s, i = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), i.set(r.name, e), n === "accessor") {
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
function k(e) {
  return (t, r) => typeof r == "object" ? us(e, t, r) : ((n, s, i) => {
    const o = s.hasOwnProperty(i);
    return s.constructor.createProperty(i, n), o ? Object.getOwnPropertyDescriptor(s, i) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function O(e) {
  return k({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _s = { ATTRIBUTE: 1 }, ms = (e) => (...t) => ({ _$litDirective$: e, values: t });
let ys = class {
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
const Ir = "important", fs = " !" + Ir, M = ms(class extends ys {
  constructor(e) {
    var t;
    if (super(e), e.type !== _s.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
      const s = t[n];
      if (s != null) {
        this.ft.add(n);
        const i = typeof s == "string" && s.endsWith(fs);
        n.includes("-") || i ? r.setProperty(n, i ? s.slice(0, -11) : s, i ? Ir : "") : r[n] = s;
      }
    }
    return de;
  }
}), pe = (e, t) => {
  if (t)
    return e.states[t];
}, L = (e, t) => {
  const r = pe(e, t);
  if (!r)
    return null;
  const n = Number(r.state);
  return Number.isFinite(n) ? n : null;
}, I = (e, t) => {
  const r = pe(e, t);
  if (!r)
    return;
  const n = r.attributes.unit_of_measurement;
  return typeof n == "string" ? n : void 0;
}, _t = (e, t) => {
  const r = pe(e, t);
  return r == null ? void 0 : r.state;
}, B = (e, t = "hybrid") => e === "history" || e === "statistics" || e === "hybrid" ? e : e === "auto" || t === "auto" ? "hybrid" : t, Lr = 3e4, ps = 10 * 6e4, bs = 1440, vs = 1e4, gs = 2e3, Br = 40, Ye = /* @__PURE__ */ new Map(), mt = /* @__PURE__ */ new Map(), yt = /* @__PURE__ */ new Map(), cr = /* @__PURE__ */ new WeakMap(), dr = /* @__PURE__ */ new WeakMap(), hr = /* @__PURE__ */ new WeakMap(), ur = /* @__PURE__ */ new WeakMap(), xt = (e, t = bs) => {
  if (e.length <= t)
    return e;
  if (t <= 2)
    return [e[0], e[e.length - 1]];
  const r = e.slice(1, -1), n = Math.max(1, Math.floor((t - 2) / 2)), s = r.length / n, i = [e[0]];
  for (let l = 0; l < n; l += 1) {
    const c = Math.floor(l * s), d = Math.max(c + 1, Math.floor((l + 1) * s)), h = r.slice(c, d);
    if (h.length === 0)
      continue;
    let _ = h[0], u = h[0];
    for (const m of h)
      m.value < _.value && (_ = m), m.value > u.value && (u = m);
    if (_.ts <= u.ts ? (i.push(_), u !== _ && i.push(u)) : (i.push(u), _ !== u && i.push(_)), i.length >= t - 1)
      break;
  }
  if (i.push(e[e.length - 1]), i.length <= t)
    return i;
  const o = [i[0]], a = (i.length - 2) / (t - 2);
  for (let l = 0; l < t - 2; l += 1) {
    const c = 1 + Math.floor(l * a);
    o.push(i[c]);
  }
  return o.push(i[i.length - 1]), o;
}, Hr = (e, t) => {
  const r = t ? vs : gs;
  return !Number.isFinite(e) || e <= 0 || r <= 1 ? Math.max(0, Math.floor(e)) : Math.max(0, Math.floor(e / r) * r);
}, ws = (e) => {
  const t = (n) => {
    if (typeof n == "string") {
      const s = Date.parse(n);
      return Number.isFinite(s) ? s : null;
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
    const s = t(n);
    if (s !== null)
      return s;
  }
  return null;
}, Ue = (e, t, r) => {
  const n = [...e, ...t].filter((i) => Number.isFinite(i.ts) && Number.isFinite(i.value) && i.ts >= r).sort((i, o) => i.ts - o.ts);
  if (n.length <= 1)
    return n;
  const s = [];
  return n.forEach((i) => {
    const o = s[s.length - 1];
    if (o && Math.abs(o.ts - i.ts) <= 0.5) {
      s[s.length - 1] = i;
      return;
    }
    s.push(i);
  }), xt(s);
}, Ss = (e, t, r = Date.now()) => {
  if (!Array.isArray(e))
    return { entityId: null, points: [] };
  const n = [];
  let s = null;
  for (const a of e) {
    if (!a || typeof a != "object")
      continue;
    const l = a;
    s === null && typeof l.entity_id == "string" && l.entity_id.length > 0 && (s = l.entity_id);
    const c = Number(l.state), d = ws(l);
    !Number.isFinite(c) || d === null || n.push({ ts: d, value: c });
  }
  const i = r - t, o = n.filter((a) => a.ts >= i).sort((a, l) => a.ts - l.ts);
  return {
    entityId: s,
    points: xt(o)
  };
}, Je = (e, t, r) => `${e}|${t}|${r}`, V = (e) => e.map((t) => ({ ts: t.ts, value: t.value })), ft = (e) => {
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
}, xs = (e) => ft(e.start) ?? ft(e.end) ?? ft(e.last_reset), Cs = (e) => {
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
}, $s = (e, t, r = Date.now()) => {
  if (!Array.isArray(e))
    return [];
  const n = [];
  e.forEach((o) => {
    if (!o || typeof o != "object")
      return;
    const a = o, l = xs(a), c = Cs(a);
    l === null || c === null || n.push({ ts: l, value: c });
  });
  const s = r - t, i = n.filter((o) => o.ts >= s).sort((o, a) => o.ts - a.ts);
  return xt(i);
}, Dr = (e) => {
  const t = ur.get(e);
  if (t)
    return t;
  const r = /* @__PURE__ */ new Map();
  return ur.set(e, r), r;
}, Fr = (e, t, r) => {
  const n = Dr(e), s = n.get(t);
  return s ? s.expiresAt <= r ? (n.delete(t), null) : s.supported : null;
}, _r = (e, t, r, n) => {
  Dr(e).set(t, {
    supported: r,
    expiresAt: n + ps
  });
}, Ts = (e) => {
  const t = cr.get(e);
  if (t)
    return t;
  const r = /* @__PURE__ */ new Map();
  return cr.set(e, r), r;
}, Vr = async (e, t, r, n, s, i) => {
  const o = new Date(n).toISOString(), a = t.join(","), l = `history/period/${o}?filter_entity_id=${encodeURIComponent(a)}&minimal_response&no_attributes`;
  let c;
  try {
    c = await e("GET", l);
  } catch {
    const _ = {};
    return t.forEach((u) => {
      _[u] = [];
    }), _;
  }
  const d = Array.isArray(c) ? c : [], h = {};
  return d.forEach((_, u) => {
    const m = Ss(_, r, s), x = t[u], b = m.entityId ?? x;
    b && (h[b] = m.points);
  }), t.forEach((_) => {
    _ in h || (h[_] = []), i && Ye.set(Je("history", _, r), {
      expiresAt: s + Lr,
      points: V(h[_])
    });
  }), h;
}, Es = (e, t, r, n, s) => {
  const i = Ts(e);
  let o = i.get(t);
  return o || (o = {
    entityIds: /* @__PURE__ */ new Set(),
    waiters: []
  }, i.set(t, o)), r.forEach((a) => o == null ? void 0 : o.entityIds.add(a)), new Promise((a, l) => {
    o == null || o.waiters.push({ entityIds: [...r], resolve: a, reject: l }), (o == null ? void 0 : o.flushTimer) === void 0 && (o.flushTimer = setTimeout(async () => {
      const c = i.get(t);
      if (!c)
        return;
      i.delete(t);
      const d = Array.from(c.entityIds);
      try {
        const h = await Vr(
          e,
          d,
          n,
          s,
          Date.now(),
          !0
        );
        c.waiters.forEach((_) => {
          const u = {};
          _.entityIds.forEach((m) => {
            u[m] = V(h[m] ?? []);
          }), _.resolve(u);
        });
      } catch (h) {
        c.waiters.forEach((_) => _.reject(h));
      }
    }, Br));
  });
}, Ms = (e) => {
  const t = dr.get(e);
  if (t)
    return t;
  const r = /* @__PURE__ */ new Map();
  return dr.set(e, r), r;
}, Rs = async (e, t, r, n) => {
  const s = [...n], i = new Date(t).toISOString(), o = new Date(r).toISOString(), a = hr.get(e), l = a ? [a] : ["recorder/statistics_during_period", "history/statistics_during_period"];
  let c;
  for (const d of l)
    try {
      const h = await e({
        type: d,
        start_time: i,
        end_time: o,
        statistic_ids: s,
        period: "5minute",
        types: ["state", "mean", "sum"]
      });
      return hr.set(e, d), h;
    } catch (h) {
      c = h;
    }
  throw c;
}, zs = async (e, t) => {
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
    return r.forEach((s) => {
      if (!s || typeof s != "object")
        return;
      const i = s.statistic_id;
      typeof i == "string" && i.length > 0 && n.add(i);
    }), n;
  } catch {
    return null;
  }
}, Ur = async (e, t, r, n, s, i) => {
  let o;
  try {
    o = await Rs(e, n, s, t);
  } catch {
    const u = new Set(t), m = {};
    return t.forEach((x) => {
      m[x] = [];
    }), {
      pointsByEntity: m,
      unsupportedEntityIds: u
    };
  }
  const a = o && typeof o == "object" && !Array.isArray(o) ? o : {}, l = {}, c = /* @__PURE__ */ new Set(), d = [];
  t.forEach((u) => {
    if (!Object.prototype.hasOwnProperty.call(a, u)) {
      l[u] = [], d.push(u);
      return;
    }
    const m = $s(a[u], r, s);
    l[u] = m, _r(e, u, !0, s), i && Ye.set(Je("statistics", u, r), {
      expiresAt: s + Lr,
      points: V(m)
    });
  });
  const h = [];
  d.forEach((u) => {
    const m = Fr(e, u, s);
    if (m !== !0) {
      if (m === !1) {
        c.add(u);
        return;
      }
      h.push(u);
    }
  });
  const _ = await zs(e, h);
  return _ !== null ? h.forEach((u) => {
    const m = _.has(u);
    _r(e, u, m, s), m || c.add(u);
  }) : h.forEach((u) => {
    c.add(u);
  }), {
    pointsByEntity: l,
    unsupportedEntityIds: c
  };
}, As = (e, t, r, n, s) => {
  const i = Ms(e);
  let o = i.get(t);
  return o || (o = {
    entityIds: /* @__PURE__ */ new Set(),
    waiters: []
  }, i.set(t, o)), r.forEach((a) => o == null ? void 0 : o.entityIds.add(a)), new Promise((a, l) => {
    o == null || o.waiters.push({ entityIds: [...r], resolve: a, reject: l }), (o == null ? void 0 : o.flushTimer) === void 0 && (o.flushTimer = setTimeout(async () => {
      const c = i.get(t);
      if (!c)
        return;
      i.delete(t);
      const d = Array.from(c.entityIds);
      try {
        const h = await Ur(
          e,
          d,
          n,
          s,
          Date.now(),
          !0
        );
        c.waiters.forEach((_) => {
          const u = {
            pointsByEntity: {},
            unsupportedEntityIds: /* @__PURE__ */ new Set()
          };
          _.entityIds.forEach((m) => {
            u.pointsByEntity[m] = V(h.pointsByEntity[m] ?? []), h.unsupportedEntityIds.has(m) && u.unsupportedEntityIds.add(m);
          }), _.resolve(u);
        });
      } catch (h) {
        c.waiters.forEach((_) => _.reject(h));
      }
    }, Br));
  });
}, jr = async (e, t, r, n) => {
  const s = e.callApi, i = Array.from(new Set(t.filter((b) => b.length > 0)));
  if (!s || i.length === 0)
    return {};
  const o = Date.now(), a = typeof n == "number" && Number.isFinite(n) ? Math.max(o - r, Math.floor(n)) : o - r, l = a <= o - r + 1e3, c = Hr(a, l), d = {}, h = [];
  if (i.forEach((b) => {
    if (l) {
      const p = Je("history", b, r), g = Ye.get(p);
      if (g && g.expiresAt > o) {
        d[b] = V(g.points);
        return;
      }
    }
    h.push(b);
  }), h.length === 0)
    return d;
  if (l) {
    const b = `${c}|${r}`, p = await Es(
      s,
      b,
      h,
      r,
      c
    );
    return h.forEach((g) => {
      d[g] = V(p[g] ?? []);
    }), d;
  }
  const _ = [...h].sort(), u = `${c}|${r}|${_.join(",")}`, m = mt.get(u);
  if (m) {
    const b = await m;
    return h.forEach((p) => {
      d[p] = V(b[p] ?? []);
    }), d;
  }
  const x = (async () => Vr(
    s,
    h,
    r,
    c,
    o,
    l
  ))();
  mt.set(u, x);
  try {
    const b = await x;
    return h.forEach((p) => {
      d[p] = V(b[p] ?? []);
    }), d;
  } finally {
    mt.delete(u);
  }
}, Wr = async (e, t, r, n) => {
  const s = e.callWS, i = Array.from(new Set(t.filter((g) => g.length > 0)));
  if (!s || i.length === 0)
    return {
      pointsByEntity: {},
      unsupportedEntityIds: new Set(i)
    };
  const o = Date.now(), a = typeof n == "number" && Number.isFinite(n) ? Math.max(o - r, Math.floor(n)) : o - r, l = a <= o - r + 1e3, c = Hr(a, l), d = {}, h = [], _ = /* @__PURE__ */ new Set();
  if (i.forEach((g) => {
    if (Fr(s, g, o) === !1) {
      d[g] = [], _.add(g);
      return;
    }
    if (l) {
      const w = Je("statistics", g, r), S = Ye.get(w);
      if (S && S.expiresAt > o) {
        d[g] = V(S.points);
        return;
      }
    }
    h.push(g);
  }), h.length === 0)
    return {
      pointsByEntity: d,
      unsupportedEntityIds: _
    };
  const u = (g) => (h.forEach((v) => {
    d[v] = V(g.pointsByEntity[v] ?? []), g.unsupportedEntityIds.has(v) && _.add(v);
  }), {
    pointsByEntity: d,
    unsupportedEntityIds: _
  });
  if (l) {
    const g = `${c}|${r}`, v = await As(
      s,
      g,
      h,
      r,
      c
    );
    return u(v);
  }
  const m = [...h].sort(), x = `${c}|${r}|${m.join(",")}`, b = yt.get(x);
  if (b) {
    const g = await b;
    return u(g);
  }
  const p = (async () => Ur(
    s,
    h,
    r,
    c,
    o,
    l
  ))();
  yt.set(x, p);
  try {
    const g = await p;
    return u(g);
  } finally {
    yt.delete(x);
  }
}, Ps = async (e, t, r, n) => {
  const s = await Wr(
    e,
    t,
    r,
    n
  ), i = {};
  t.forEach((l) => {
    l.length !== 0 && (i[l] = V(s.pointsByEntity[l] ?? []));
  });
  const o = Array.from(s.unsupportedEntityIds).filter((l) => l.length > 0);
  if (o.length === 0)
    return i;
  const a = await jr(
    e,
    o,
    r,
    n
  );
  return o.forEach((l) => {
    i[l] = V(a[l] ?? []);
  }), i;
}, ve = async (e, t, r, n) => {
  const s = B(n == null ? void 0 : n.dataSource, "hybrid");
  return s === "history" ? jr(e, t, r, n == null ? void 0 : n.startMs) : s === "statistics" ? (await Wr(
    e,
    t,
    r,
    n == null ? void 0 : n.startMs
  )).pointsByEntity : Ps(e, t, r, n == null ? void 0 : n.startMs);
}, mr = {
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
}, Ct = (e) => {
  if (Array.isArray(e) && e.length >= 3) {
    const s = e.slice(0, 3).map((i) => Number(i));
    if (s.every((i) => Number.isFinite(i))) {
      const [i, o, a] = s.map((l) => Math.max(0, Math.min(255, Math.round(l))));
      return `${i}, ${o}, ${a}`;
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
  if (t in mr)
    return `var(--rgb-${t}, ${mr[t]})`;
  const r = /^#([a-fA-F0-9]{3})$/, n = /^#([a-fA-F0-9]{6})$/;
  if (r.test(t)) {
    const [, s] = t.match(r) ?? [];
    if (!s)
      return null;
    const i = parseInt(s[0] + s[0], 16), o = parseInt(s[1] + s[1], 16), a = parseInt(s[2] + s[2], 16);
    return `${i}, ${o}, ${a}`;
  }
  if (n.test(t)) {
    const [, s] = t.match(n) ?? [];
    if (!s)
      return null;
    const i = parseInt(s.slice(0, 2), 16), o = parseInt(s.slice(2, 4), 16), a = parseInt(s.slice(4, 6), 16);
    return `${i}, ${o}, ${a}`;
  }
  return null;
}, $t = (e, t = "") => {
  const r = Ct(e);
  if (r)
    return `rgb(${r})`;
  if (typeof e == "string" && e.trim().length > 0) {
    const n = e.trim(), s = n.toLowerCase();
    if (s !== "none" && s !== "default")
      return n;
  }
  return t;
}, Tt = (e) => {
  const t = Ct(e);
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
}, Et = (e, t, r) => {
  const n = e.map((s) => ({
    x: s.x / 100 * t,
    y: s.y / 100 * r,
    value: s.value
  }));
  return Os(n, t);
}, Os = (e, t) => {
  if (e.length <= 3)
    return e;
  const r = Math.max(24, Math.min(e.length, Math.round(t)));
  if (e.length <= r)
    return yr(e);
  const n = [];
  n.push(e[0]);
  const s = (e.length - 1) / (r - 1);
  for (let i = 1; i < r - 1; i += 1) {
    const o = Math.floor(i * s), a = Math.max(o + 1, Math.floor((i + 1) * s)), l = e.slice(o, Math.min(e.length, a));
    if (l.length === 0)
      continue;
    const c = l.reduce(
      (h, _) => (h.x += _.x, h.y += _.y, h.value += _.value, h),
      { x: 0, y: 0, value: 0 }
    ), d = l.length;
    n.push({
      x: c.x / d,
      y: c.y / d,
      value: c.value / d
    });
  }
  return n.push(e[e.length - 1]), yr(n);
}, yr = (e) => {
  if (e.length <= 3)
    return e;
  const t = [e[0]];
  for (let r = 1; r < e.length - 1; r += 1) {
    const n = e[r - 1], s = e[r], i = e[r + 1];
    t.push({
      x: s.x,
      y: (n.y + s.y * 2 + i.y) / 4,
      value: (n.value + s.value * 2 + i.value) / 4
    });
  }
  return t.push(e[e.length - 1]), t;
}, fr = {
  "": 0,
  k: 1,
  m: -1,
  M: 2,
  G: 3,
  T: 4
}, bt = ["", "k", "M", "G", "T"], Q = (e, t) => {
  const r = typeof e == "number" && Number.isFinite(e) ? Math.round(e) : t;
  return Math.max(0, Math.min(4, r));
}, le = (e) => {
  if (!e)
    return null;
  const t = e.trim();
  if (t.length === 0)
    return null;
  if (t.endsWith("Wh")) {
    const r = t.slice(0, -2), s = fr[r === "K" ? "k" : r];
    return s === void 0 ? null : {
      family: "energy",
      prefixPower: s,
      factor: Math.pow(1e3, s),
      canonicalUnit: "Wh"
    };
  }
  if (t.endsWith("W")) {
    const r = t.slice(0, -1), s = fr[r === "K" ? "k" : r];
    return s === void 0 ? null : {
      family: "power",
      prefixPower: s,
      factor: Math.pow(1e3, s),
      canonicalUnit: "W"
    };
  }
  return null;
}, ks = (e, t) => {
  const r = Math.max(0, Math.min(bt.length - 1, t)), n = bt[r] ?? "";
  return e === "energy" ? `${n}Wh` : `${n}W`;
}, Ns = (e) => {
  if (!Number.isFinite(e) || e <= 0)
    return 0;
  let t = 0, r = e;
  for (; r >= 1e3 && t < bt.length - 1; )
    r /= 1e3, t += 1;
  return t;
}, Mt = (e, t, r, n) => {
  const s = n.nullWithUnit === !0;
  if (e === null)
    return s && t ? `-- ${t}` : "--";
  const i = le(t);
  if (!n.enabled || !i)
    return `${e.toFixed(r)} ${t}`.trim();
  const o = e < 0 ? "-" : "", a = Math.abs(e) * i.factor, l = Ns(a), c = ks(i.family, l), d = a / Math.pow(1e3, l), h = l === 0 ? n.baseDecimals : n.prefixedDecimals;
  return `${o}${d.toFixed(h)} ${c}`.trim();
}, Is = (e) => {
  const t = Object.keys(e), r = {};
  if (t.length === 0)
    return {
      comparable: !1,
      family: null,
      canonicalUnit: null,
      factors: r
    };
  let n = null, s = null;
  for (const i of t) {
    const o = le(e[i]);
    if (!o)
      return {
        comparable: !1,
        family: null,
        canonicalUnit: null,
        factors: r
      };
    if (n === null)
      n = o.family, s = o.canonicalUnit;
    else if (n !== o.family)
      return {
        comparable: !1,
        family: null,
        canonicalUnit: null,
        factors: r
      };
    r[i] = o.factor;
  }
  return {
    comparable: !0,
    family: n,
    canonicalUnit: s,
    factors: r
  };
}, Pe = "0.1.20";
var Ls = Object.defineProperty, Bs = Object.getOwnPropertyDescriptor, Rt = (e, t, r, n) => {
  for (var s = n > 1 ? void 0 : n ? Bs(t, r) : t, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (s = (n ? o(t, r, s) : o(s)) || s);
  return n && s && Ls(t, r, s), s;
};
const Hs = 4, Ds = 8, pr = 2, Fs = (e, t) => {
  const r = `${e}_sub_${t}`;
  return [
    { name: `${r}_enabled`, selector: { boolean: {} } },
    {
      type: "grid",
      name: "",
      schema: [
        { name: `${r}_entity`, selector: { entity: { filter: { domain: "sensor" } } } },
        { name: `${r}_label`, selector: { text: {} } },
        {
          name: `${r}_icon`,
          selector: { icon: {} },
          context: { icon_entity: `${r}_entity` }
        },
        {
          name: `${r}_icon_color`,
          selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
        }
      ]
    }
  ];
}, Le = (e, t, r, n) => ({
  type: "expandable",
  name: "",
  title: t,
  icon: r,
  expanded: !1,
  schema: Array.from({ length: n }, (s, i) => ({
    type: "expandable",
    name: "",
    title: `Block ${i + 1}`,
    icon: "mdi:view-grid-outline",
    expanded: !1,
    schema: Fs(e, i + 1)
  }))
}), Y = (e, t, r) => ({
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
}), Vs = {
  select: {
    mode: "dropdown",
    options: [
      { label: "Hybrid (auto fallback)", value: "hybrid" },
      { label: "Statistics (fastest)", value: "statistics" },
      { label: "History (raw)", value: "history" }
    ]
  }
}, Us = [
  { name: "name", selector: { text: {} } },
  Y("Solar node", "mdi:weather-sunny", [
    { name: "solar_visible", selector: { boolean: {} } },
    { name: "solar_entity", selector: { entity: { filter: { domain: "sensor" } } } },
    { name: "solar_label", selector: { text: {} } },
    { name: "solar_icon", selector: { icon: {} }, context: { icon_entity: "solar_entity" } },
    {
      name: "solar_icon_color",
      selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
    },
    { name: "solar_trend", selector: { boolean: {} } },
    {
      name: "solar_trend_color",
      selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
    }
  ]),
  Y("Grid node", "mdi:transmission-tower", [
    { name: "grid_visible", selector: { boolean: {} } },
    { name: "grid_entity", selector: { entity: { filter: { domain: "sensor" } } } },
    { name: "grid_label", selector: { text: {} } },
    { name: "grid_icon", selector: { icon: {} }, context: { icon_entity: "grid_entity" } },
    {
      name: "grid_icon_color",
      selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
    },
    { name: "grid_trend", selector: { boolean: {} } },
    {
      name: "grid_trend_color",
      selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
    }
  ]),
  Y("Grid 2 node", "mdi:transmission-tower", [
    { name: "grid_secondary_visible", selector: { boolean: {} } },
    { name: "grid_secondary_entity", selector: { entity: { filter: { domain: "sensor" } } } },
    { name: "grid_secondary_label", selector: { text: {} } },
    { name: "grid_secondary_icon", selector: { icon: {} }, context: { icon_entity: "grid_secondary_entity" } },
    {
      name: "grid_secondary_icon_color",
      selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
    },
    { name: "grid_secondary_trend", selector: { boolean: {} } },
    {
      name: "grid_secondary_trend_color",
      selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
    }
  ]),
  Y("Home node", "mdi:home-lightning-bolt", [
    { name: "home_visible", selector: { boolean: {} } },
    { name: "home_entity", selector: { entity: { filter: { domain: "sensor" } } } },
    { name: "home_auto_calculate", selector: { boolean: {} } },
    { name: "home_label", selector: { text: {} } },
    { name: "home_icon", selector: { icon: {} }, context: { icon_entity: "home_entity" } },
    {
      name: "home_icon_color",
      selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
    },
    { name: "home_trend", selector: { boolean: {} } },
    {
      name: "home_trend_color",
      selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
    }
  ]),
  Y("Battery node", "mdi:battery", [
    { name: "battery_visible", selector: { boolean: {} } },
    { name: "battery_entity", selector: { entity: { filter: { domain: "sensor" } } } },
    { name: "battery_percentage_entity", selector: { entity: { filter: { domain: "sensor" } } } },
    { name: "battery_label", selector: { text: {} } },
    { name: "battery_icon", selector: { icon: {} }, context: { icon_entity: "battery_entity" } },
    {
      name: "battery_icon_color",
      selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
    },
    { name: "battery_trend", selector: { boolean: {} } },
    {
      name: "battery_trend_color",
      selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
    },
    { name: "battery_low_alert", selector: { boolean: {} } },
    {
      name: "battery_low_threshold",
      selector: { number: { mode: "box", min: 0, max: 100, step: 1, unit_of_measurement: "%" } }
    }
  ]),
  Y("Battery 2 node", "mdi:battery-outline", [
    { name: "battery_secondary_visible", selector: { boolean: {} } },
    { name: "battery_secondary_entity", selector: { entity: { filter: { domain: "sensor" } } } },
    { name: "battery_secondary_percentage_entity", selector: { entity: { filter: { domain: "sensor" } } } },
    {
      name: "battery_dual_alignment",
      selector: {
        select: {
          mode: "dropdown",
          options: ["center", "left", "right"]
        }
      }
    },
    { name: "battery_secondary_label", selector: { text: {} } },
    { name: "battery_secondary_icon", selector: { icon: {} }, context: { icon_entity: "battery_secondary_entity" } },
    {
      name: "battery_secondary_icon_color",
      selector: { ui_color: { include_state: !0, include_none: !0, default_color: "state" } }
    },
    { name: "battery_secondary_trend", selector: { boolean: {} } },
    {
      name: "battery_secondary_trend_color",
      selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
    },
    { name: "battery_secondary_low_alert", selector: { boolean: {} } },
    {
      name: "battery_secondary_low_threshold",
      selector: { number: { mode: "box", min: 0, max: 100, step: 1, unit_of_measurement: "%" } }
    }
  ]),
  Y("Card visuals", "mdi:palette-outline", [
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
  Y("Trend settings", "mdi:chart-line", [
    { name: "shared_trend_scale", selector: { boolean: {} } },
    { name: "trend_data_source", selector: Vs }
  ]),
  Le("solar", "Solar sub blocks", "mdi:solar-power-variant", Hs),
  Le("grid", "Grid 1 sub blocks", "mdi:transmission-tower", pr),
  Le("grid_secondary", "Grid 2 sub blocks", "mdi:transmission-tower", pr),
  Le("home", "Home sub blocks", "mdi:flash", Ds),
  {
    type: "grid",
    name: "",
    schema: [
      { name: "unit", selector: { text: {} } },
      { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } },
      { name: "auto_scale_units", selector: { boolean: {} } },
      { name: "decimals_base_unit", selector: { number: { mode: "box", min: 0, max: 4, step: 1 } } },
      { name: "decimals_prefixed_unit", selector: { number: { mode: "box", min: 0, max: 4, step: 1 } } }
    ]
  }
], js = {
  name: "Name",
  home_visible: "Show home",
  solar_visible: "Show solar",
  grid_visible: "Show grid",
  grid_secondary_visible: "Show grid 2",
  battery_visible: "Show battery",
  battery_secondary_visible: "Show battery 2",
  battery_dual_alignment: "Battery 2 alignment",
  home_auto_calculate: "Auto-calc home",
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
  trend_data_source: "Trend source (auto: stats -> history)",
  battery_low_alert: "Low battery alert",
  battery_low_threshold: "Low battery %",
  battery_secondary_low_alert: "Battery 2 low alert",
  battery_secondary_low_threshold: "Battery 2 low %",
  core_icon: "Core icon",
  core_icon_color: "Core icon color",
  flow_color: "Flow line color",
  unit: "Unit",
  decimals: "Decimals",
  auto_scale_units: "Auto unit scaling (W<->kW, Wh<->kWh)",
  decimals_base_unit: "Decimals (base unit)",
  decimals_prefixed_unit: "Decimals (prefixed units)"
};
let je = class extends U {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = e.name ?? "", r = t.match(/^(solar|home|grid|grid_secondary)_sub_(\d+)_(enabled|entity|label|icon|icon_color)$/);
      if (r) {
        const [, , , n] = r;
        return {
          enabled: "Enabled",
          entity: "Entity",
          label: "Label",
          icon: "Icon",
          icon_color: "Color"
        }[n] ?? n;
      }
      return js[t] ?? t;
    }, this.valueChanged = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement) || t.tagName !== "HA-FORM")
        return;
      const r = e.detail.value;
      if (!r || typeof r != "object" || Array.isArray(r))
        return;
      const n = {
        ...r,
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
      shared_trend_scale: e.shared_trend_scale ?? !1,
      trend_data_source: B(e.trend_data_source, "hybrid"),
      debug_performance: e.debug_performance ?? !1,
      decimals: e.decimals ?? 1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: e.decimals_base_unit ?? e.decimals ?? 1,
      decimals_prefixed_unit: e.decimals_prefixed_unit ?? e.decimals ?? 1,
      type: "custom:power-pilz-energy-card"
    };
  }
  render() {
    return !this.hass || !this._config ? T : $`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Pe}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Us}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Rt([
  k({ attribute: !1 })
], je.prototype, "hass", 2);
Rt([
  O()
], je.prototype, "_config", 2);
je = Rt([
  he("power-pilz-energy-card-editor")
], je);
var Ws = Object.defineProperty, Gs = Object.getOwnPropertyDescriptor, ee = (e, t, r, n) => {
  for (var s = n > 1 ? void 0 : n ? Gs(t, r) : t, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (s = (n ? o(t, r, s) : o(s)) || s);
  return n && s && Ws(t, r, s), s;
};
const F = 0.01, we = 1, ye = 1440 * 60 * 1e3, br = 300 * 1e3, vr = 60 * 1e3, qs = 350, gr = 4, wr = 8, pt = 2, Ks = 12, Sr = 7, Xs = 6, Ys = 400, Js = 300, Zs = "var(--rgb-primary-text-color, 33, 33, 33)";
let G = class extends U {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._showSubBlocks = !1, this._subNodeConnectorSegments = [], this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._isVisible = !1, this._liveRuntimeActive = !1, this._trendDrawConfig = {}, this.handleCardClick = () => {
      this.executeTapAction();
    }, this.handleCardKeyDown = (e) => {
      e.key !== "Enter" && e.key !== " " || (e.preventDefault(), this.executeTapAction());
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-energy-card-editor");
  }
  static async getStubConfig(e) {
    const t = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(t), n = (...d) => d.find((h) => h in t), s = (d) => r.find((h) => h.startsWith(`${d}.`)), i = n("sensor.dev_home_power", "sensor.house_consumption_power") ?? s("sensor") ?? "sensor.dev_home_power", o = n("sensor.dev_solar_power", "sensor.solar_production_power") ?? s("sensor"), a = n("sensor.dev_grid_power", "sensor.grid_power") ?? s("sensor"), l = n("sensor.dev_battery_power", "sensor.home_battery_power") ?? s("sensor"), c = n("sensor.dev_battery_soc", "sensor.home_battery_soc") ?? s("sensor");
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
      home_entity: i,
      home_auto_calculate: !1,
      solar_entity: o,
      grid_entity: a,
      battery_entity: l,
      battery_percentage_entity: c,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      auto_scale_units: !1,
      decimals: we,
      decimals_base_unit: we,
      decimals_prefixed_unit: we
    };
  }
  setConfig(e) {
    const t = e.home_entity ?? e.consumption_entity ?? "sensor.dev_home_power", r = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : we, n = Q(e.decimals_base_unit, r), s = Q(e.decimals_prefixed_unit, r);
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
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      trend_data_source: B(e.trend_data_source, "hybrid"),
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: n,
      decimals_prefixed_unit: s,
      battery_low_alert: e.battery_low_alert ?? !1,
      battery_low_threshold: this.normalizeBatteryThreshold(e.battery_low_threshold),
      battery_secondary_low_alert: e.battery_secondary_low_alert ?? !1,
      battery_secondary_low_threshold: this.normalizeBatteryThreshold(e.battery_secondary_low_threshold),
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
      return $`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return $``;
    const e = this._config, t = e.decimals ?? we, r = e.home_visible !== !1, n = e.solar_visible !== !1, s = e.grid_visible !== !1, i = s && e.grid_secondary_visible === !0, o = e.battery_visible !== !1, a = o && e.battery_secondary_visible === !0, l = this.normalizeBatteryDualAlignment(e.battery_dual_alignment), c = L(this.hass, e.home_entity), d = n ? L(this.hass, e.solar_entity) : null, h = s ? L(this.hass, e.grid_entity) : null, _ = i ? L(this.hass, e.grid_secondary_entity) : null, u = o ? L(this.hass, e.battery_entity) : null, m = L(this.hass, e.battery_percentage_entity), x = a ? L(this.hass, e.battery_secondary_entity) : null, b = L(this.hass, e.battery_secondary_percentage_entity), p = e.unit ?? "kW", g = I(this.hass, e.solar_entity) ?? p, v = I(this.hass, e.grid_entity) ?? p, w = I(this.hass, e.grid_secondary_entity) ?? p, S = I(this.hass, e.battery_entity) ?? p, y = I(this.hass, e.battery_secondary_entity) ?? p, f = e.home_auto_calculate === !0 ? this.resolveAutoHomeUnit(e, p) : I(this.hass, e.home_entity) ?? p, C = e.home_auto_calculate === !0 ? this.computeAutoHomeValueFromNodeValues(
      {
        solar: d,
        grid: h,
        grid_secondary: _,
        battery: u,
        battery_secondary: x
      },
      {
        solar: g,
        grid: v,
        grid_secondary: w,
        battery: S,
        battery_secondary: y
      },
      f
    ) : c, E = m !== null ? I(this.hass, e.battery_percentage_entity) ?? "%" : S, R = b !== null ? I(this.hass, e.battery_secondary_percentage_entity) ?? "%" : y, z = this.toUnidirectionalFlow(d), A = this.toUnidirectionalFlow(C), H = this.toBidirectionalFlow(h), D = this.toBidirectionalFlow(_), ne = this.sumComparableValues([
      { value: h, unit: v },
      { value: _, unit: w }
    ]), dn = h === null && _ === null ? "none" : this.toBidirectionalFlow(ne), hn = this.toBidirectionalFlow(u), un = this.toBidirectionalFlow(x), _n = this.sumComparableValues([
      { value: u, unit: S },
      { value: x, unit: y }
    ]), mn = u === null && x === null ? "none" : this.toBidirectionalFlow(_n), yn = this.resolveTapAction(e), Ze = !this.isEditorPreview() && yn.action !== "none", fn = this.iconColorStyle(e.solar_icon_color), pn = this.iconColorStyle(e.grid_icon_color), bn = this.iconColorStyle(e.grid_secondary_icon_color), vn = this.iconColorStyle(e.home_icon_color), gn = this.iconShapeStyle(e.core_icon_color), Qe = n ? this.collectSubBlocks("solar", e) : [], It = s ? this.collectSubBlocks("grid", e) : [], Lt = i ? this.collectSubBlocks("grid_secondary", e) : [], et = r ? this.collectSubBlocks("home", e) : [], tt = new Set(et.map((P) => P.index)), _e = new Set(Qe.map((P) => P.index)), wn = tt.has(7) && tt.has(8), Sn = [5, 6, 7, 8].some((P) => tt.has(P)), xn = _e.has(1) && _e.has(2) && !_e.has(3) && !_e.has(4), Cn = _e.has(3) && _e.has(4), Bt = i && (xn && wn || Cn && Sn), $n = i && !Bt, rt = et.some((P) => P.index >= 7), Ht = this.homeSubPositions(rt), Dt = this.gridSubPositions(i), Ft = this.gridSecondarySubPositions(), Vt = this.solarSubPositions(
      rt,
      $n,
      Bt
    ), Ut = et.filter((P) => P.index <= (rt ? 8 : 6)), nt = s ? { col: 1, row: i ? 2 : 3, colSpan: 2, rowSpan: 2 } : null, st = i ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 } : null, it = o ? {
      col: a && l === "center" ? 2 : 3,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, ot = a ? {
      col: l === "left" ? 1 : l === "right" ? 5 : 4,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, N = this.computeGridBounds(
      r,
      n,
      s,
      i,
      o,
      a,
      nt,
      st,
      it,
      ot,
      Qe,
      It,
      Lt,
      Ut,
      Vt,
      Dt,
      Ft,
      Ht
    ), at = n ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, N) : null, Oe = nt ? this.normalizePlacement(nt, N) : null, ke = st ? this.normalizePlacement(st, N) : null, lt = r ? this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, N) : null, Ne = it ? this.normalizePlacement(it, N) : null, Ie = ot ? this.normalizePlacement(ot, N) : null, jt = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, N), Tn = this.normalizePositions(Vt, N), En = this.normalizePositions(Dt, N), Mn = this.normalizePositions(Ft, N), Rn = this.normalizePositions(Ht, N), Wt = this.normalizeBatteryThreshold(e.battery_low_threshold), Gt = !!e.battery_low_alert, qt = this.normalizeBatteryThreshold(e.battery_secondary_low_threshold), Kt = !!e.battery_secondary_low_alert, Xt = Gt && m !== null && m <= Wt, zn = this.iconColorStyle(Xt ? "red" : e.battery_icon_color), An = this.batteryIcon(m, u, e.battery_icon), Yt = Kt && b !== null && b <= qt, Pn = this.iconColorStyle(
      Yt ? "red" : e.battery_secondary_icon_color
    ), On = this.batteryIcon(
      b,
      x,
      e.battery_secondary_icon
    ), kn = { "--flow-color-rgb": this.toRgbCss(e.flow_color) ?? Zs }, me = this.resolveColor("purple"), Nn = this.resolveColor(e.solar_trend_color, me), In = this.resolveColor(e.grid_trend_color, me), Ln = this.resolveColor(e.grid_secondary_trend_color, me), Bn = this.resolveColor(e.home_trend_color, me), Hn = this.resolveColor(e.battery_trend_color, me), Dn = this.resolveColor(e.battery_secondary_trend_color, me), Jt = this.resolveColor("red"), Fn = Gt && (e.battery_percentage_entity || m !== null) ? Wt : null, Vn = m ?? u, Un = Kt && (e.battery_secondary_percentage_entity || b !== null) ? qt : null, jn = b ?? x, Wn = this.buildFlowSegments(
      lt,
      jt,
      at,
      [
        ...Oe ? [{ placement: Oe, direction: H }] : [],
        ...ke ? [{ placement: ke, direction: D }] : []
      ],
      dn,
      [
        ...Ne ? [{ placement: Ne, direction: hn }] : [],
        ...Ie ? [{ placement: Ie, direction: un }] : []
      ],
      mn,
      z,
      A,
      N
    );
    return $`
      <ha-card
        class=${Ze ? "interactive" : ""}
        tabindex=${Ze ? 0 : -1}
        role=${Ze ? "button" : "article"}
        @click=${this.handleCardClick}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div
            class="energy-grid"
            style=${M({
      ...kn,
      "--grid-columns": `${N.cols}`,
      "--grid-rows": `${N.rows}`,
      "--grid-aspect": `${N.cols} / ${N.rows}`
    })}
          >
            ${Wn.map(
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

            ${n && at ? $`
                  <div
                    class="energy-value solar ${d === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(at))}
                  >
                    ${this.renderTrend("solar", d, g, !!e.solar_trend, Nn, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.solar_icon ?? "mdi:weather-sunny"}
                        style=${M(fn)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(d, g, t)}</div>
                      <div class="energy-label">${e.solar_label}</div>
                    </div>
                  </div>
                ` : T}

            ${s && Oe ? $`
                  <div
                    class="energy-value grid ${h === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Oe))}
                  >
                    ${this.renderTrend("grid", h, v, !!e.grid_trend, In, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_icon ?? "mdi:transmission-tower"}
                        style=${M(pn)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(h, v, t)}</div>
                      <div class="energy-label">${e.grid_label}</div>
                    </div>
                  </div>
                ` : T}

            ${i && ke ? $`
                  <div
                    class="energy-value grid-secondary ${_ === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(ke))}
                  >
                    ${this.renderTrend(
      "grid_secondary",
      _,
      w,
      !!e.grid_secondary_trend,
      Ln,
      null,
      ""
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${M(bn)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(_, w, t)}</div>
                      <div class="energy-label">${e.grid_secondary_label}</div>
                    </div>
                  </div>
                ` : T}

            ${r && lt ? $`
                  <div
                    class="energy-value home ${C === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(lt))}
                  >
                    ${this.renderTrend("home", C, f, !!e.home_trend, Bn, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.home_icon ?? "mdi:home-lightning-bolt"}
                        style=${M(vn)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(C, f, t)}</div>
                      <div class="energy-label">${e.home_label}</div>
                    </div>
                  </div>
                ` : T}

            ${this._showSubBlocks ? this.renderSubNodes("solar", Qe, Tn, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("grid", It, En, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("grid_secondary", Lt, Mn, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("home", Ut, Rn, t) : T}

            ${o && Ne ? $`
                  <div
                    class="energy-value battery ${u === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Ne))}
                  >
                    ${this.renderTrend(
      "battery",
      Vn,
      E,
      !!e.battery_trend,
      Hn,
      Fn,
      Jt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon class="energy-icon" .icon=${An} style=${M(zn)}></ha-icon>
                        ${m !== null ? $`
                              <div class="battery-percentage ${Xt ? "alert" : ""}">
                                ${this.formatBatteryPercentage(m)}
                              </div>
                            ` : T}
                      </div>
                      <div class="energy-number">${this.formatValue(u, S, t)}</div>
                      <div class="energy-label">${e.battery_label}</div>
                    </div>
                  </div>
                ` : T}

            ${a && Ie ? $`
                  <div
                    class="energy-value battery-secondary ${x === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Ie))}
                  >
                    ${this.renderTrend(
      "battery_secondary",
      jn,
      R,
      !!e.battery_secondary_trend,
      Dn,
      Un,
      Jt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${On}
                          style=${M(Pn)}
                        ></ha-icon>
                        ${b !== null ? $`
                              <div class="battery-percentage ${Yt ? "alert" : ""}">
                                ${this.formatBatteryPercentage(b)}
                              </div>
                            ` : T}
                      </div>
                      <div class="energy-number">${this.formatValue(x, y, t)}</div>
                      <div class="energy-label">${e.battery_secondary_label}</div>
                    </div>
                  </div>
                ` : T}

            <div class="home-core" style=${M(this.gridPlacementStyle(jt))}>
              <div class="home-core-icon" style=${M(gn)}>
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
    return $`<div class=${n} style=${M(r)} aria-hidden="true"></div>`;
  }
  renderSubNodeConnectors() {
    return !this._showSubBlocks || this._subNodeConnectorSegments.length === 0 ? T : $`
      <div class="subnode-connectors" aria-hidden="true">
        ${this._subNodeConnectorSegments.map(
      (e) => $`
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
    const r = [], n = e === "solar" ? "mdi:solar-power-variant" : e === "home" ? "mdi:flash" : "mdi:transmission-tower", s = e === "solar" ? "Solar" : e === "home" ? "Home" : e === "grid" ? "Grid" : "Grid 2", i = e === "solar" ? gr : e === "home" ? wr : pt;
    for (let h = 1; h <= i; h += 1) {
      const _ = t[`${e}_sub_${h}_enabled`] === !0, u = this.readConfigString(t[`${e}_sub_${h}_entity`]);
      !_ || !u || r.push({
        key: `${e}_${h}`,
        index: h,
        icon: this.readConfigString(t[`${e}_sub_${h}_icon`]) ?? n,
        iconStyle: this.iconColorStyle(t[`${e}_sub_${h}_icon_color`]),
        label: this.readConfigString(t[`${e}_sub_${h}_label`]) ?? `${s} ${h}`,
        value: L(this.hass, u),
        unit: I(this.hass, u) ?? t.unit ?? "kW"
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
        value: L(this.hass, a),
        unit: I(this.hass, a) ?? t.unit ?? "kW"
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
    return Object.entries(e).forEach(([n, s]) => {
      r[Number(n)] = {
        row: s.row - t.minRow + 1,
        col: s.col - t.minCol + 1
      };
    }), r;
  }
  computeGridBounds(e, t, r, n, s, i, o, a, l, c, d, h, _, u, m, x, b, p) {
    const g = [{ col: 3, row: 3, colSpan: 2, rowSpan: 2 }];
    e && g.push({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }), t && g.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }), r && o && g.push(o), n && a && g.push(a), s && l && g.push(l), i && c && g.push(c), d.forEach((f) => {
      const C = m[f.index];
      C && g.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), h.forEach((f) => {
      const C = x[f.index];
      C && g.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), _.forEach((f) => {
      const C = b[f.index];
      C && g.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), u.forEach((f) => {
      const C = p[f.index];
      C && g.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    });
    const v = Math.min(...g.map((f) => f.col)), w = Math.max(...g.map((f) => f.col + (f.colSpan ?? 1) - 1)), S = Math.min(...g.map((f) => f.row)), y = Math.max(...g.map((f) => f.row + (f.rowSpan ?? 1) - 1));
    return {
      minCol: v,
      maxCol: w,
      minRow: S,
      maxRow: y,
      cols: w - v + 1,
      rows: y - S + 1
    };
  }
  placementCenter(e, t) {
    const r = e.colSpan ?? 1, n = e.rowSpan ?? 1;
    return {
      x: (e.col - 1 + r / 2) / t.cols * 100,
      y: (e.row - 1 + n / 2) / t.rows * 100
    };
  }
  buildFlowSegments(e, t, r, n, s, i, o, a, l, c) {
    const d = this.placementCenter(t, c), h = [], _ = (m, x, b, p) => {
      const g = Math.min(m, x), v = Math.abs(x - m);
      v <= F || h.push({
        orientation: "horizontal",
        direction: p,
        left: g,
        top: b,
        width: v,
        height: 0
      });
    }, u = (m, x, b, p) => {
      const g = Math.min(m, x), v = Math.abs(x - m);
      v <= F || h.push({
        orientation: "vertical",
        direction: p,
        left: b,
        top: g,
        width: 0,
        height: v
      });
    };
    if (e) {
      const m = this.placementCenter(e, c);
      _(d.x, m.x, d.y, l);
    }
    if (r) {
      const m = this.placementCenter(r, c);
      u(m.y, d.y, d.x, a);
    }
    if (n.length === 1) {
      const [{ placement: m, direction: x }] = n, b = this.placementCenter(m, c);
      _(b.x, d.x, d.y, x);
    } else if (n.length >= 2) {
      const m = n.map((p) => ({
        direction: p.direction,
        center: this.placementCenter(p.placement, c)
      })).sort((p, g) => p.center.y - g.center.y), x = Math.min(...m.map((p) => p.center.x)), b = d.x - (d.x - x) * 0.5;
      _(d.x, b, d.y, s), m.forEach((p) => {
        const g = p.center.y > d.y + F ? this.reverseFlowDirection(p.direction) : p.direction;
        u(d.y, p.center.y, b, g), _(p.center.x, b, p.center.y, p.direction);
      });
    }
    if (i.length === 1) {
      const [{ placement: m, direction: x }] = i, b = this.placementCenter(m, c);
      u(d.y, b.y, d.x, x);
    } else if (i.length >= 2) {
      const m = i.map((p) => ({
        placement: p.placement,
        direction: p.direction,
        center: this.placementCenter(p.placement, c)
      })).sort((p, g) => p.center.y - g.center.y), x = Math.min(
        ...m.map((p) => (p.placement.row - 1) / c.rows * 100)
      ), b = Math.max(d.y + F, x);
      u(d.y, b, d.x, o), m.forEach((p) => {
        _(d.x, p.center.x, b, p.direction), u(b, p.center.y, p.center.x, p.direction);
      });
    }
    return h;
  }
  renderSubNodes(e, t, r, n) {
    return t.length === 0 ? T : $`
      ${t.map((s) => {
      const i = r[s.index];
      if (!i)
        return T;
      const o = {
        "grid-column": `${i.col}`,
        "grid-row": `${i.row}`
      };
      return $`
            <div
              class="energy-sub-value ${e}-sub sub-col-${i.col} ${s.value === null ? "missing" : ""}"
              data-key=${s.key}
              style=${M(o)}
            >
              <div class="energy-sub-content">
                <ha-icon class="energy-sub-icon" .icon=${s.icon} style=${M(s.iconStyle)}></ha-icon>
                <div class="energy-sub-number">${this.formatValue(s.value, s.unit, n)}</div>
                <div class="energy-sub-label">${s.label}</div>
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
  homeComputationDependencies(e) {
    const t = [], r = (n, s) => {
      s && t.push({ role: n, entityId: s });
    };
    return e.solar_visible !== !1 && r("solar", this.readConfigString(e.solar_entity)), e.grid_visible !== !1 && (r("grid", this.readConfigString(e.grid_entity)), e.grid_secondary_visible === !0 && r("grid_secondary", this.readConfigString(e.grid_secondary_entity))), e.battery_visible !== !1 && (r("battery", this.readConfigString(e.battery_entity)), e.battery_secondary_visible === !0 && r("battery_secondary", this.readConfigString(e.battery_secondary_entity))), t;
  }
  resolveAutoHomeUnit(e, t) {
    const r = e.unit;
    if (r && r.trim().length > 0)
      return r;
    const n = this.homeComputationDependencies(e);
    for (const s of n) {
      const i = I(this.hass, s.entityId);
      if (i && i.trim().length > 0)
        return i;
    }
    return t;
  }
  computeAutoHomeValueFromNodeValues(e, t, r) {
    if (!Object.values(e).some((d) => d != null && Number.isFinite(d)))
      return null;
    const s = {};
    let i = 0;
    t && Object.keys(e).forEach((d) => {
      const h = e[d], _ = t[d];
      h != null && Number.isFinite(h) && (i += 1, _ && (s[d] = _));
    });
    const o = Object.keys(s).length === i ? Is(s) : { comparable: !1, family: null, factors: {} }, a = o.comparable ? o.factors : void 0, l = (d) => {
      const h = e[d];
      if (h == null || !Number.isFinite(h))
        return 0;
      const _ = (a == null ? void 0 : a[d]) ?? 1;
      return h * _;
    };
    let c = l("solar") + l("grid") + l("grid_secondary") - l("battery") - l("battery_secondary");
    if (a && r) {
      const d = le(r);
      d && o.family !== null && d.family === o.family && d.factor > 0 && (c /= d.factor);
    }
    return Number.isFinite(c) ? c <= F ? 0 : c : null;
  }
  sumComparableValues(e) {
    const t = e.filter(
      (s) => s.value !== null && Number.isFinite(s.value)
    );
    if (t.length === 0)
      return null;
    let r = null, n = 0;
    for (const s of t) {
      const i = le(s.unit);
      if (!i)
        return t.reduce((o, a) => o + a.value, 0);
      if (r === null)
        r = i.family;
      else if (r !== i.family)
        return t.reduce((o, a) => o + a.value, 0);
      n += s.value * i.factor;
    }
    return n;
  }
  renderTrend(e, t, r, n, s, i, o) {
    return n ? (this._trendDrawConfig[e] = {
      currentValue: t,
      unit: r,
      color: s,
      threshold: i,
      thresholdColor: o
    }, $`
      <div class="node-trend" aria-hidden="true">
        <canvas class="node-trend-canvas-area" data-node=${e}></canvas>
      </div>
      <div class="node-trend-line" aria-hidden="true">
        <canvas class="node-trend-canvas-line" data-node=${e}></canvas>
      </div>
    `) : (delete this._trendDrawConfig[e], T);
  }
  trendPoints(e, t) {
    const r = Date.now(), n = r - ye, s = this._trendSeries[e] ?? [];
    let i = 0;
    for (; i < s.length && s[i].ts < n; )
      i += 1;
    const o = i > 0 ? s.slice(i) : [...s];
    return t !== null && Number.isFinite(t) && o.push({ ts: r, value: t }), o;
  }
  buildThresholdTrendSegments(e, t) {
    const r = [];
    for (let n = 1; n < e.length; n += 1) {
      const s = e[n - 1], i = e[n], o = s.value <= t, a = i.value <= t;
      if (o === a || Math.abs(i.value - s.value) <= F) {
        r.push({
          start: s,
          end: i,
          low: o
        });
        continue;
      }
      const l = (t - s.value) / (i.value - s.value), c = Math.max(0, Math.min(1, l)), d = {
        x: s.x + (i.x - s.x) * c,
        y: s.y + (i.y - s.y) * c,
        value: t
      };
      r.push({
        start: s,
        end: d,
        low: o
      }), r.push({
        start: d,
        end: i,
        low: a
      });
    }
    return r;
  }
  toTrendCoordinates(e, t) {
    var p, g;
    const n = Date.now() - ye, s = 0, i = 100, o = e.map((v) => v.value), a = (t == null ? void 0 : t.min) ?? Math.min(...o), l = (t == null ? void 0 : t.max) ?? Math.max(...o);
    if (!Number.isFinite(a) || !Number.isFinite(l))
      return [];
    const c = 20, d = 80, h = Math.max(l - a, F), _ = e.map((v) => {
      const w = Math.max(0, Math.min(100, (v.ts - n) / ye * 100)), S = s + w / 100 * (i - s), y = h <= F ? 0.5 : (v.value - a) / h, f = d - y * (d - c);
      return { x: S, y: f, value: v.value };
    }), u = ((p = _[0]) == null ? void 0 : p.x) ?? s, m = ((g = _[_.length - 1]) == null ? void 0 : g.x) ?? i, x = Math.max(0, m - u), b = 18;
    if (_.length >= 2 && x < b) {
      const v = i - b, w = Math.max(s, Math.min(v, m - b));
      if (x <= F) {
        const y = b / (_.length - 1);
        return _.map((f, C) => ({
          ...f,
          x: Math.max(s, Math.min(i, w + y * C))
        }));
      }
      const S = b / x;
      return _.map((y) => ({
        ...y,
        x: Math.max(s, Math.min(i, w + (y.x - u) * S))
      }));
    }
    return _;
  }
  toCanvasPoints(e, t, r) {
    return Et(e, t, r);
  }
  computeTrendValueRange(e, t) {
    const r = [];
    if (Object.entries(e).forEach(([i, o]) => {
      const a = (t == null ? void 0 : t[i]) ?? 1;
      o.forEach((l) => r.push(l.value * a));
    }), r.length === 0)
      return null;
    const n = Math.min(...r), s = Math.max(...r);
    return !Number.isFinite(n) || !Number.isFinite(s) ? null : { min: n, max: s };
  }
  resolveSharedTrendUnitFactors(e) {
    const t = Object.keys(e);
    if (t.length === 0)
      return null;
    let r = null;
    const n = {};
    for (const s of t) {
      const i = this._trendDrawConfig[s];
      if (!i)
        return null;
      const o = le(i.unit);
      if (!o)
        return null;
      if (r === null)
        r = o.family;
      else if (r !== o.family)
        return null;
      n[s] = o.factor;
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
      this._showSubBlocks && (this._showSubBlocks = !1);
      return;
    }
    const t = this.findLayoutSpan("column"), r = this.findLayoutSpan("row"), n = this.subBlocksMinRows(), s = t !== null && r !== null && t >= Ks && r >= n, i = e.getBoundingClientRect(), o = i.width >= Ys && i.height >= Js, a = t !== null && r !== null ? s : o;
    a !== this._showSubBlocks && (this._showSubBlocks = a);
  }
  subBlocksMinRows() {
    if (!this._config)
      return Sr;
    const e = this._config.solar_visible !== !1, t = this._config.battery_visible !== !1, r = this._config.battery_secondary_visible === !0;
    return !e || !(t || r) ? Xs : Sr;
  }
  findLayoutSpan(e) {
    let t = this;
    for (; t; ) {
      const r = this.parseGridSpanCandidates(
        e === "row" ? [t.style.gridRowStart, t.style.gridRowEnd, t.style.gridRow] : [t.style.gridColumnStart, t.style.gridColumnEnd, t.style.gridColumn]
      );
      if (r !== null)
        return r;
      const n = getComputedStyle(t), s = this.parseGridSpanCandidates(
        e === "row" ? [n.gridRowStart, n.gridRowEnd, n.gridRow] : [n.gridColumnStart, n.gridColumnEnd, n.gridColumn]
      );
      if (s !== null)
        return s;
      t = t.parentElement;
    }
    return null;
  }
  parseGridSpan(e) {
    if (!e)
      return null;
    const t = e.match(/span\s+(\d+)/i);
    if (!t)
      return null;
    const r = Number.parseInt(t[1], 10);
    return Number.isFinite(r) && r > 0 ? r : null;
  }
  parseGridSpanCandidates(e) {
    for (const t of e) {
      const r = this.parseGridSpan(t);
      if (r !== null)
        return r;
    }
    return null;
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
    const e = this.renderRoot.querySelector(".energy-grid"), t = this.renderRoot.querySelector(".energy-value.home"), r = this.renderRoot.querySelector(".energy-value.solar"), n = this.renderRoot.querySelector(".energy-value.grid"), s = this.renderRoot.querySelector(".energy-value.grid-secondary");
    if (!e) {
      this._subNodeConnectorSegments.length > 0 && (this._subNodeConnectorSegments = []);
      return;
    }
    const i = e.getBoundingClientRect(), o = t == null ? void 0 : t.getBoundingClientRect(), a = r == null ? void 0 : r.getBoundingClientRect(), l = n == null ? void 0 : n.getBoundingClientRect(), c = s == null ? void 0 : s.getBoundingClientRect(), d = o ? o.left + o.width / 2 : 0, h = a ? a.top + a.height / 2 : 0, _ = l ? l.left + l.width / 2 : 0, u = c ? c.left + c.width / 2 : 0, m = (S) => S - i.left, x = (S) => S - i.top, b = (S) => Math.round(S * 10) / 10, p = [], g = (S, y, f, C) => {
      const E = Math.min(S, y), R = Math.abs(y - S);
      R <= 0.5 || p.push({
        node: C,
        left: b(E),
        top: b(f - 1),
        width: b(R),
        height: 2
      });
    }, v = (S, y, f, C) => {
      const E = Math.min(S, y), R = Math.abs(y - S);
      R <= 0.5 || p.push({
        node: C,
        left: b(f - 1),
        top: b(E),
        width: 2,
        height: b(R)
      });
    };
    o && this.renderRoot.querySelectorAll(".energy-sub-value.home-sub").forEach((S) => {
      const y = S.getBoundingClientRect(), f = y.top + y.height / 2, C = y.left + y.width / 2 < d ? y.right : y.left, E = f, R = f < o.top ? o.top : f > o.bottom ? o.bottom : f, z = m(d), A = x(E), H = x(R), D = m(C);
      g(D, z, A, "home"), v(A, H, z, "home");
    }), a && this.renderRoot.querySelectorAll(".energy-sub-value.solar-sub").forEach((S) => {
      const y = S.getBoundingClientRect(), f = y.left + y.width / 2, C = y.top + y.height / 2 < h ? y.bottom : y.top, E = f, R = f < a.left ? a.left : f > a.right ? a.right : f, z = x(h), A = m(E), H = m(R), D = x(C);
      v(D, z, A, "solar"), g(A, H, z, "solar");
    }), l && this.renderRoot.querySelectorAll(".energy-sub-value.grid-sub").forEach((S) => {
      const y = S.getBoundingClientRect(), f = y.top + y.height / 2, C = y.left + y.width / 2 < _ ? y.right : y.left, E = f, R = f < l.top ? l.top : f > l.bottom ? l.bottom : f, z = m(_), A = x(E), H = x(R), D = m(C);
      g(D, z, A, "grid"), v(A, H, z, "grid");
    }), c && this.renderRoot.querySelectorAll(".energy-sub-value.grid_secondary-sub").forEach((S) => {
      const y = S.getBoundingClientRect(), f = y.top + y.height / 2, C = y.left + y.width / 2 < u ? y.right : y.left, E = f, R = f < c.top ? c.top : f > c.bottom ? c.bottom : f, z = m(u), A = x(E), H = x(R), D = m(C);
      g(D, z, A, "grid_secondary"), v(A, H, z, "grid_secondary");
    }), p.length === this._subNodeConnectorSegments.length && p.every(
      (S, y) => {
        var f, C, E, R, z;
        return S.node === ((f = this._subNodeConnectorSegments[y]) == null ? void 0 : f.node) && S.left === ((C = this._subNodeConnectorSegments[y]) == null ? void 0 : C.left) && S.top === ((E = this._subNodeConnectorSegments[y]) == null ? void 0 : E.top) && S.width === ((R = this._subNodeConnectorSegments[y]) == null ? void 0 : R.width) && S.height === ((z = this._subNodeConnectorSegments[y]) == null ? void 0 : z.height);
      }
    ) || (this._subNodeConnectorSegments = p);
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
    const e = this.perfNow(), t = this.collectTrendCanvases(".node-trend-canvas-area"), r = this.collectTrendCanvases(".node-trend-canvas-line"), n = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
    t.forEach((_, u) => {
      const m = this.prepareTrendCanvas(_);
      m && n.set(u, m);
    }), r.forEach((_, u) => {
      const m = this.prepareTrendCanvas(_);
      m && s.set(u, m);
    });
    const i = {};
    Object.keys(this._trendDrawConfig).forEach((_) => {
      const u = this._trendDrawConfig[_];
      if (!u)
        return;
      const m = this.trendPoints(_, u.currentValue);
      m.length >= 2 && (i[_] = m);
    });
    const o = ((h = this._config) == null ? void 0 : h.shared_trend_scale) === !0, a = o ? this.resolveSharedTrendUnitFactors(i) : null, l = o ? this.computeTrendValueRange(i, a ?? void 0) : null;
    let c = 0, d = 0;
    Object.keys(this._trendDrawConfig).forEach((_) => {
      const u = this._trendDrawConfig[_];
      if (!u)
        return;
      const m = n.get(_), x = s.get(_);
      if (!m || !x)
        return;
      const b = i[_];
      if (!b || b.length < 2)
        return;
      const p = (a == null ? void 0 : a[_]) ?? 1, g = a ? this.scaleTrendSeries(b, p) : b, v = this.toTrendCoordinates(g, l);
      if (v.length < 2)
        return;
      const w = this.toCanvasPoints(v, m.width, m.height), S = this.toCanvasPoints(v, x.width, x.height);
      this.drawTrendArea(
        m.ctx,
        w,
        u.color,
        m.height,
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
    const r = e.getBoundingClientRect(), n = Math.max(1, Math.round(r.width)), s = Math.max(1, Math.round(r.height)), i = Math.max(1, window.devicePixelRatio || 1), o = Math.max(1, Math.round(n * i)), a = Math.max(1, Math.round(s * i));
    return (e.width !== o || e.height !== a) && (e.width = o, e.height = a), t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height), t.setTransform(i, 0, 0, i, 0, 0), { ctx: t, width: n, height: s };
  }
  drawTrendArea(e, t, r, n, s, i) {
    if (t.length < 2)
      return;
    const o = this.resolveCanvasColor(r);
    if (s === null) {
      this.fillTrendAreaRun(e, t, o, n);
      return;
    }
    const a = this.resolveCanvasColor(i), l = this.buildThresholdTrendSegments(t, s);
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
      const n = t[t.length - 1], s = n.points[n.points.length - 1], i = Math.abs(s.x - r.start.x) <= 0.01 && Math.abs(s.y - r.start.y) <= 0.01;
      n.low === r.low && i ? n.points.push(r.end) : t.push({
        low: r.low,
        points: [r.start, r.end]
      });
    }
    return t;
  }
  fillTrendAreaRun(e, t, r, n) {
    if (t.length < 2)
      return;
    const s = t[0], i = t[t.length - 1], o = Math.min(...t.map((l) => l.y)), a = e.createLinearGradient(0, o, 0, n);
    a.addColorStop(0, this.withAlpha(r, 0.24)), a.addColorStop(1, this.withAlpha(r, 0)), e.beginPath(), e.moveTo(s.x, s.y), t.slice(1).forEach((l) => e.lineTo(l.x, l.y)), e.lineTo(i.x, n), e.lineTo(s.x, n), e.closePath(), e.fillStyle = a, e.fill();
  }
  drawTrendLine(e, t, r, n, s) {
    if (t.length < 2)
      return;
    const i = this.resolveCanvasColor(r), o = this.resolveCanvasColor(s);
    if (n === null) {
      this.strokeTrendPolyline(e, t, i, 1.5);
      return;
    }
    this.buildThresholdTrendSegments(t, n).forEach((l) => {
      this.strokeTrendSegment(e, l.start, l.end, l.low ? o : i, 1.5);
    });
  }
  strokeTrendPolyline(e, t, r, n) {
    t.length < 2 || (e.beginPath(), e.moveTo(t[0].x, t[0].y), t.slice(1).forEach((s) => e.lineTo(s.x, s.y)), e.strokeStyle = r, e.lineWidth = n, e.lineCap = "round", e.lineJoin = "round", e.stroke());
  }
  strokeTrendSegment(e, t, r, n, s) {
    e.beginPath(), e.moveTo(t.x, t.y), e.lineTo(r.x, r.y), e.strokeStyle = n, e.lineWidth = s, e.lineCap = "round", e.lineJoin = "round", e.stroke();
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
    const s = n.fillStyle, o = (typeof s == "string" ? s.trim() : "").match(/^#([a-f\d]{6})$/i);
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
    this.teardownVisibilityObserver(), this.stopLiveRuntime(), super.disconnectedCallback();
  }
  updated(e) {
    const t = e.get("_config"), r = e.has("_config") && this.shouldRefreshTrendOnConfigChange(t, this._config), n = e.get("hass"), s = e.has("hass") && this.didRelevantEntityStateChange(n);
    (e.has("preview") || e.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (e.has("_config") ? r && this.scheduleConfigRefresh() : e.has("hass") && this._isVisible && s && this.maybeRefreshTrendHistory(), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (e.has("_config") ? r && this.scheduleConfigRefresh(!0) : e.has("hass") && s && this.maybeRefreshTrendHistory(!1, !0), this._trendResizeObserver && this._trendResizeObserver.disconnect());
    const i = e.has("_config") || e.has("_trendSeries") || e.has("_showSubBlocks") || e.has("preview") || e.has("editMode") || s;
    i && this.updateSubBlockVisibility(), (!this.shouldRunLiveRuntime() || this._isVisible) && i && (this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
  }
  maybeRefreshTrendHistory(e = !1, t = !1) {
    if (!this.shouldRunLiveRuntime() && !t || !this._isVisible && !t || t && !this.isEditorPreview())
      return;
    e && (this._lastTrendRefresh = 0);
    const r = Date.now();
    !e && r - this._lastTrendRefresh < br || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  shouldRunLiveRuntime() {
    return !this.isEditorPreview();
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
    }, qs));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, br), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.syncTrendResizeObserver(), this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this.clearConfigRefreshTimer(), this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._subNodeConnectorRaf !== void 0 && (window.cancelAnimationFrame(this._subNodeConnectorRaf), this._subNodeConnectorRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
  }
  async refreshTrendHistory(e = !1, t = !1) {
    var i, o;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !t)
      return;
    const r = this._config, n = B(r.trend_data_source, "hybrid"), s = this.enabledTrendNodes(r);
    if (s.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const a = this.perfNow(), l = {}, c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set();
      let x = Number.POSITIVE_INFINITY;
      const b = Date.now() - ye;
      for (const y of s) {
        if (y === "home" && r.home_auto_calculate === !0) {
          const z = this.homeComputationDependencies(r);
          if (z.length === 0) {
            l[y] = [];
            continue;
          }
          d.set(y, z), h.set(y, this.resolveAutoHomeUnit(r, r.unit ?? "kW"));
          const A = this._trendSeries[y] ?? [];
          if (e || A.length === 0) {
            _.add(y), z.forEach((ne) => {
              u.add(ne.entityId), m.delete(ne.entityId);
            });
            continue;
          }
          const H = ((i = A[A.length - 1]) == null ? void 0 : i.ts) ?? b, D = Math.max(b, H - vr);
          x = Math.min(x, D), z.forEach((ne) => {
            u.has(ne.entityId) || m.add(ne.entityId);
          });
          continue;
        }
        const f = this.trendEntityId(y, r);
        if (!f)
          continue;
        c.set(y, f);
        const C = this._trendSeries[y] ?? [];
        if (e || C.length === 0 || u.has(f)) {
          u.add(f), m.delete(f);
          continue;
        }
        if (u.has(f))
          continue;
        m.add(f);
        const E = ((o = C[C.length - 1]) == null ? void 0 : o.ts) ?? b, R = Math.max(b, E - vr);
        x = Math.min(x, R);
      }
      let p = 0;
      const g = u.size > 0 ? await (async () => {
        const y = this.perfNow(), f = await ve(
          this.hass,
          Array.from(u),
          ye,
          { dataSource: n }
        );
        return p = this.perfNow() - y, f;
      })() : {};
      let v = 0;
      const w = m.size > 0 ? await (async () => {
        const y = this.perfNow(), f = await ve(
          this.hass,
          Array.from(m),
          ye,
          {
            startMs: Number.isFinite(x) ? x : b,
            dataSource: n
          }
        );
        return v = this.perfNow() - y, f;
      })() : {};
      c.forEach((y, f) => {
        const C = this._trendSeries[f] ?? [];
        if (u.has(y)) {
          const E = g[y] ?? [];
          l[f] = E.length > 0 ? E : C.filter((R) => R.ts >= b);
          return;
        }
        if (m.has(y)) {
          const E = w[y] ?? [];
          l[f] = Ue(C, E, b);
          return;
        }
        l[f] = C.filter((E) => E.ts >= b);
      }), d.forEach((y, f) => {
        const C = this._trendSeries[f] ?? [], E = this.computeAutoHomeTrendFromFetchedDependencies(
          y,
          g,
          w,
          u,
          m,
          b,
          h.get(f) ?? r.unit ?? "kW"
        );
        if (_.has(f)) {
          l[f] = E.length > 0 ? E : C.filter((R) => R.ts >= b);
          return;
        }
        l[f] = Ue(C, E, b);
      });
      const S = this.sameTrendSeriesKeys(l, this._trendSeries) && Object.keys(l).every(
        (y) => this.areTrendSeriesEqual(l[y] ?? [], this._trendSeries[y] ?? [])
      );
      S || (this._trendSeries = l), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - a),
        force_full: e,
        nodes: s.length,
        full_entities: u.size,
        incremental_entities: m.size,
        data_source: n,
        full_fetch_ms: this.toPerfMs(p),
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
    const t = /* @__PURE__ */ new Set(), r = (s) => {
      const i = this.readConfigString(s);
      i && t.add(i);
    };
    r(e.home_entity), r(e.solar_entity), r(e.grid_entity), r(e.grid_secondary_entity), r(e.battery_entity), r(e.battery_percentage_entity), r(e.battery_secondary_entity), r(e.battery_secondary_percentage_entity), e.solar_sub_enabled && r(e.solar_sub_entity), e.home_sub_enabled && r(e.home_sub_entity);
    const n = (s, i) => {
      for (let o = 1; o <= i; o += 1)
        e[`${s}_sub_${o}_enabled`] === !0 && r(e[`${s}_sub_${o}_entity`]);
    };
    return n("solar", gr), n("home", wr), n("grid", pt), n("grid_secondary", pt), Array.from(t);
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
        const n = this.homeComputationDependencies(e).map((s) => `${s.role}:${s.entityId}`).sort().join(",");
        t.push(`home:auto:${n}`);
        return;
      }
      t.push(`${r}:${this.trendEntityId(r, e) ?? ""}`);
    }), t.sort().join("|");
  }
  shouldRefreshTrendOnConfigChange(e, t) {
    return !e || !t ? !0 : this.trendHistorySignature(e) !== this.trendHistorySignature(t);
  }
  computeAutoHomeTrendFromFetchedDependencies(e, t, r, n, s, i, o) {
    const a = {}, l = {};
    return e.forEach((c) => {
      const d = n.has(c.entityId) ? t[c.entityId] ?? [] : s.has(c.entityId) ? r[c.entityId] ?? [] : [];
      a[c.role] = d.filter((_) => Number.isFinite(_.ts) && Number.isFinite(_.value) && _.ts >= i).sort((_, u) => _.ts - u.ts);
      const h = I(this.hass, c.entityId);
      h && (l[c.role] = h);
    }), this.computeAutoHomeTrendSeries(a, i, l, o);
  }
  computeAutoHomeTrendSeries(e, t, r, n) {
    const s = [];
    if (Object.values(e).forEach((o) => {
      o.forEach((a) => {
        Number.isFinite(a.ts) && a.ts >= t && s.push(a.ts);
      });
    }), s.length === 0)
      return [];
    s.sort((o, a) => o - a);
    const i = [];
    return s.forEach((o) => {
      const a = i[i.length - 1];
      (a === void 0 || Math.abs(a - o) > 0.5) && i.push(o);
    }), i.map((o) => {
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
    let n = 0, s = e.length - 1;
    for (; n <= s; ) {
      const d = Math.floor((n + s) / 2), h = e[d];
      if (Math.abs(h.ts - t) <= 0.5)
        return h.value;
      h.ts < t ? n = d + 1 : s = d - 1;
    }
    const i = Math.max(1, Math.min(e.length - 1, n)), o = e[i - 1], a = e[i], l = a.ts - o.ts;
    if (Math.abs(l) <= F)
      return a.value;
    const c = (t - o.ts) / l;
    return o.value + (a.value - o.value) * c;
  }
  sameTrendSeriesKeys(e, t) {
    const r = Object.keys(e).sort(), n = Object.keys(t).sort();
    return r.length === n.length && r.every((s, i) => s === n[i]);
  }
  areTrendSeriesEqual(e, t) {
    if (e.length !== t.length)
      return !1;
    for (let r = 0; r < e.length; r += 1) {
      const n = e[r], s = t[r];
      if (n.ts !== s.ts || Math.abs(n.value - s.value) > 1e-4)
        return !1;
    }
    return !0;
  }
  executeTapAction() {
    if (this.isEditorPreview() || !this._config)
      return;
    const e = this.resolveTapAction(this._config);
    if (e.action !== "none") {
      if (e.action === "navigate") {
        e.navigation_path && this.navigateToPath(e.navigation_path);
        return;
      }
      if (e.action === "more-info") {
        const t = e.entity ?? this._config.details_entity ?? this._config.home_entity ?? this._config.grid_entity ?? this._config.solar_entity ?? this._config.battery_entity;
        t && this.fireEvent("hass-more-info", { entityId: t });
      }
    }
  }
  resolveTapAction(e) {
    const t = e.tap_action;
    return t ? {
      action: t.action ?? (t.navigation_path ? "navigate" : "none"),
      navigation_path: t.navigation_path ?? "",
      entity: t.entity ?? ""
    } : e.details_navigation_path ? {
      action: "navigate",
      navigation_path: e.details_navigation_path,
      entity: ""
    } : {
      action: "none",
      navigation_path: "",
      entity: ""
    };
  }
  navigateToPath(e) {
    window.history.pushState(null, "", e), window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: !1 } }));
  }
  fireEvent(e, t) {
    this.dispatchEvent(
      new CustomEvent(e, {
        detail: t,
        bubbles: !0,
        composed: !0
      })
    );
  }
  toUnidirectionalFlow(e) {
    return e === null || e <= F ? "none" : "forward";
  }
  toBidirectionalFlow(e) {
    return e === null || Math.abs(e) <= F ? "none" : e > 0 ? "forward" : "backward";
  }
  reverseFlowDirection(e) {
    return e === "forward" ? "backward" : e === "backward" ? "forward" : "none";
  }
  formatValue(e, t, r) {
    var n, s, i;
    return Mt(e, t, r, {
      enabled: ((n = this._config) == null ? void 0 : n.auto_scale_units) === !0,
      baseDecimals: ((s = this._config) == null ? void 0 : s.decimals_base_unit) ?? r,
      prefixedDecimals: ((i = this._config) == null ? void 0 : i.decimals_prefixed_unit) ?? r
    });
  }
  formatBatteryPercentage(e) {
    return `${Math.round(this.normalizeBatteryThreshold(e))}%`;
  }
  batteryIcon(e, t, r) {
    if (t !== null && t > F)
      return "mdi:battery-charging";
    if (e === null)
      return r ?? "mdi:battery-outline";
    const n = this.normalizeBatteryThreshold(e);
    return n < 5 ? "mdi:battery-outline" : n >= 95 ? "mdi:battery" : `mdi:battery-${Math.max(10, Math.min(90, Math.round(n / 10) * 10))}`;
  }
  normalizeBatteryThreshold(e) {
    return typeof e != "number" || !Number.isFinite(e) ? 20 : Math.max(0, Math.min(100, e));
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
    return $t(e, t);
  }
  toRgbCss(e) {
    return Ct(e);
  }
};
G.styles = Ke`
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

      .energy-sub-value {
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
ee([
  k({ attribute: !1 })
], G.prototype, "hass", 2);
ee([
  k({ type: Boolean })
], G.prototype, "preview", 2);
ee([
  k({ type: Boolean })
], G.prototype, "editMode", 2);
ee([
  O()
], G.prototype, "_config", 2);
ee([
  O()
], G.prototype, "_trendSeries", 2);
ee([
  O()
], G.prototype, "_showSubBlocks", 2);
ee([
  O()
], G.prototype, "_subNodeConnectorSegments", 2);
G = ee([
  he("power-pilz-energy-card")
], G);
const W = (e) => {
  if (typeof e != "string")
    return;
  const t = e.trim();
  return t.length > 0 ? t : void 0;
}, Gr = (e, t) => {
  switch (e) {
    case 1:
      return W(t.entity_1);
    case 2:
      return W(t.entity_2);
    case 3:
      return W(t.entity_3);
    case 4:
      return W(t.entity_4);
    default:
      return;
  }
}, qr = (e, t) => {
  switch (e) {
    case 1:
      return W(t.entity_1_name);
    case 2:
      return W(t.entity_2_name);
    case 3:
      return W(t.entity_3_name);
    case 4:
      return W(t.entity_4_name);
    default:
      return;
  }
}, Kr = (e, t) => {
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
}, Xr = (e, t) => {
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
}, Yr = (e, t) => {
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
}, Jr = (e, t) => {
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
}, Zr = (e, t) => {
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
}, Qr = (e) => e === "column" ? "column" : "row", zt = (e, t = 24) => {
  const r = typeof e == "number" ? e : typeof e == "string" ? Number.parseInt(e, 10) : NaN;
  return r === 6 || r === 12 || r === 24 ? r : t;
}, At = (e) => typeof e != "number" || !Number.isFinite(e) ? 1.5 : Math.max(0.5, Math.min(6, e)), en = (e, t, r, n) => {
  var o;
  if (t)
    return t;
  const s = e[r], i = (o = s == null ? void 0 : s.attributes) == null ? void 0 : o.friendly_name;
  return typeof i == "string" && i.trim().length > 0 ? i.trim() : `Entity ${n}`;
}, tn = (e, t, r, n) => {
  if (n)
    return Mt(e, t, r, {
      ...n,
      nullWithUnit: !0
    });
  if (e === null)
    return t ? `-- ${t}` : "--";
  const s = `${e.toFixed(r)} ${t}`.trim();
  return s.length > 0 ? s : "--";
}, Qs = 4, rn = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, ei = {
  legend_layout: "Layout",
  timeframe_hours: "Range",
  hover_enabled: "Hover",
  fill_area_enabled: "Area fill",
  shared_trend_scale: "Shared scale",
  trend_data_source: "Trend source (auto: stats -> history)",
  clip_graph_to_labels: "Clip below labels",
  line_thickness: "Line width",
  unit: "Unit",
  decimals: "Decimals",
  auto_scale_units: "Auto unit scaling (W<->kW, Wh<->kWh)",
  decimals_base_unit: "Decimals (base unit)",
  decimals_prefixed_unit: "Decimals (prefixed units)"
}, ti = (e) => ({
  type: "expandable",
  name: "",
  title: `Entity ${e}`,
  icon: "mdi:chart-line",
  expanded: e === 1,
  schema: [
    { name: `entity_${e}_enabled`, selector: { boolean: {} } },
    {
      type: "grid",
      name: "",
      schema: [
        { name: `entity_${e}`, selector: { entity: { filter: { domain: "sensor" } } } },
        { name: `entity_${e}_name`, selector: { text: {} } },
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
              default_color: rn[e] ?? "purple"
            }
          }
        }
      ]
    }
  ]
}), nn = (e = !1) => {
  const t = [
    { name: "hover_enabled", selector: { boolean: {} } },
    { name: "fill_area_enabled", selector: { boolean: {} } },
    { name: "shared_trend_scale", selector: { boolean: {} } }
  ];
  return e && t.push({ name: "normalize_stack_to_percent", selector: { boolean: {} } }), t.push(
    { name: "clip_graph_to_labels", selector: { boolean: {} } },
    { name: "line_thickness", selector: { number: { mode: "box", min: 0.5, max: 6, step: 0.1 } } }
  ), [
    {
      type: "grid",
      name: "",
      schema: [
        {
          name: "legend_layout",
          selector: {
            select: {
              mode: "dropdown",
              options: ["row", "column"]
            }
          }
        },
        {
          name: "timeframe_hours",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { label: "24 hours", value: 24 },
                { label: "12 hours", value: 12 },
                { label: "6 hours", value: 6 }
              ]
            }
          }
        },
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
          }
        }
      ]
    },
    {
      type: "grid",
      name: "",
      schema: t
    },
    ...Array.from({ length: Qs }, (r, n) => ti(n + 1)),
    {
      type: "grid",
      name: "",
      schema: [
        { name: "unit", selector: { text: {} } },
        { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } },
        { name: "auto_scale_units", selector: { boolean: {} } },
        { name: "decimals_base_unit", selector: { number: { mode: "box", min: 0, max: 4, step: 1 } } },
        { name: "decimals_prefixed_unit", selector: { number: { mode: "box", min: 0, max: 4, step: 1 } } }
      ]
    }
  ];
}, X = (e) => {
  if (typeof e == "string")
    return e.length > 0 ? e : void 0;
}, sn = (e) => e === "column" ? "column" : "row", on = (e) => zt(e), an = (e) => At(e), Be = (e, t, r) => {
  const n = e ?? t;
  return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : rn[r] ?? "purple";
}, ln = (e) => ({
  trend_data_source: B(e.trend_data_source, "hybrid"),
  entity_1: X(e.entity_1) ?? X(e.entity),
  entity_1_name: X(e.entity_1_name),
  entity_1_enabled: e.entity_1_enabled ?? !0,
  entity_1_show_icon: e.entity_1_show_icon ?? !0,
  entity_1_icon: e.entity_1_icon ?? e.icon,
  entity_1_icon_color: e.entity_1_icon_color ?? e.icon_color,
  entity_1_trend_color: Be(e.entity_1_trend_color, e.trend_color, 1),
  entity_2: X(e.entity_2),
  entity_2_name: X(e.entity_2_name),
  entity_2_enabled: e.entity_2_enabled ?? !1,
  entity_2_show_icon: e.entity_2_show_icon ?? !0,
  entity_2_icon: e.entity_2_icon,
  entity_2_trend_color: Be(e.entity_2_trend_color, void 0, 2),
  entity_3: X(e.entity_3),
  entity_3_name: X(e.entity_3_name),
  entity_3_enabled: e.entity_3_enabled ?? !1,
  entity_3_show_icon: e.entity_3_show_icon ?? !0,
  entity_3_icon: e.entity_3_icon,
  entity_3_trend_color: Be(e.entity_3_trend_color, void 0, 3),
  entity_4: X(e.entity_4),
  entity_4_name: X(e.entity_4_name),
  entity_4_enabled: e.entity_4_enabled ?? !1,
  entity_4_show_icon: e.entity_4_show_icon ?? !0,
  entity_4_icon: e.entity_4_icon,
  entity_4_trend_color: Be(e.entity_4_trend_color, void 0, 4)
}), cn = (e, t = {}) => {
  const r = e.name ?? "", n = r.match(/^entity_(\d+)_(enabled|name|show_icon|icon|icon_color|trend_color)$/);
  if (n) {
    const [, , i] = n;
    return {
      enabled: "Enabled",
      name: "Name",
      show_icon: "Show icon",
      icon: "Icon",
      icon_color: "Icon color",
      trend_color: "Graph color"
    }[i] ?? i;
  }
  return r.match(/^entity_(\d+)$/) ? "Sensor" : t[r] ?? ei[r] ?? r;
};
var ri = Object.defineProperty, ni = Object.getOwnPropertyDescriptor, Pt = (e, t, r, n) => {
  for (var s = n > 1 ? void 0 : n ? ni(t, r) : t, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (s = (n ? o(t, r, s) : o(s)) || s);
  return n && s && ri(t, r, s), s;
};
const si = nn(!1);
let We = class extends U {
  constructor() {
    super(...arguments), this.computeLabel = (e) => cn(e), this.valueChanged = (e) => {
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
      legend_layout: sn(e.legend_layout),
      timeframe_hours: on(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      decimals: e.decimals ?? 1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: e.decimals_base_unit ?? e.decimals ?? 1,
      decimals_prefixed_unit: e.decimals_prefixed_unit ?? e.decimals ?? 1,
      line_thickness: an(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...ln(e)
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? T : $`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Pe}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${si}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Pt([
  k({ attribute: !1 })
], We.prototype, "hass", 2);
Pt([
  O()
], We.prototype, "_config", 2);
We = Pt([
  he("power-pilz-graph-card-editor")
], We);
var ii = Object.defineProperty, oi = Object.getOwnPropertyDescriptor, te = (e, t, r, n) => {
  for (var s = n > 1 ? void 0 : n ? oi(t, r) : t, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (s = (n ? o(t, r, s) : o(s)) || s);
  return n && s && ii(t, r, s), s;
};
const Se = 1, xr = 24, Cr = 300 * 1e3, ai = 60 * 1e3, li = 350, He = 0.01, xe = 4, ci = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", $r = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let q = class extends U {
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
      const n = e.clientX - r.left, s = e.clientY - r.top;
      if (n < 0 || n > r.width || s < 0 || s > r.height) {
        this.clearHoverState();
        return;
      }
      const i = this.findNearestHoverPoint(n, s);
      if (!i) {
        this.clearHoverState();
        return;
      }
      const o = this._hoverState;
      o && o.slot === i.slot && Math.abs(o.x - i.x) <= 0.2 && Math.abs(o.y - i.y) <= 0.2 && Math.abs(o.value - i.value) <= 1e-4 && o.color === i.color || (this._hoverState = i);
    }, this.handlePointerLeave = () => {
      this.clearHoverState();
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-graph-card-editor");
  }
  static async getStubConfig(e) {
    const t = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(t), n = (...c) => c.find((d) => d in t), s = (c) => r.find((d) => d.startsWith(`${c}.`)), i = n("sensor.dev_home_power", "sensor.home_power") ?? s("sensor") ?? "sensor.dev_home_power", o = n("sensor.dev_solar_power", "sensor.solar_power"), a = n("sensor.dev_grid_power", "sensor.grid_power"), l = n("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-card",
      legend_layout: "row",
      timeframe_hours: xr,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      auto_scale_units: !1,
      entity_1: i,
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
      decimals: Se,
      decimals_base_unit: Se,
      decimals_prefixed_unit: Se
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Se, r = Q(e.decimals_base_unit, t), n = Q(e.decimals_prefixed_unit, t), s = this.readConfigString(e.entity), i = this.readConfigString(e.icon), o = this.readConfigString(e.entity_1) ?? s ?? "sensor.dev_home_power";
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
      entity_1_icon: e.entity_1_icon ?? i ?? "mdi:chart-line",
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
      return $`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return $``;
    const e = this._config, t = e.decimals ?? Se, r = this.normalizeLineThickness(e.line_thickness), n = this.collectSeriesEntries(e, t), s = this.normalizeLegendLayout(e.legend_layout), i = e.hover_enabled !== !1, o = this._hoverState, a = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, l = a > 0 ? { top: `${a}px` } : {}, c = o ? {
      left: `${o.x}px`,
      top: `${o.y + a}px`,
      "--hover-dot-color": o.color
    } : {};
    return this._drawConfigs = n.map((d) => ({
      slot: d.slot,
      currentValue: d.currentValue,
      unit: d.unit,
      color: d.trendColor,
      lineWidth: r
    })), $`
      <ha-card>
        <div
          class="container"
          @pointermove=${this.handlePointerMove}
          @pointerleave=${this.handlePointerLeave}
          @pointercancel=${this.handlePointerLeave}
        >
          <div class="card-trend" style=${M(l)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${M(l)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${i && o ? $`<div class="hover-dot" aria-hidden="true" style=${M(c)}></div>` : T}

          <div class="content">
            <div class="series-list layout-${s}">
              ${n.length === 0 ? $`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : n.map(
      (d) => this.renderSeriesItem(
        d,
        o && o.slot === d.slot ? o.value : null
      )
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderSeriesItem(e, t) {
    const r = t === null ? null : this.convertSharedScaleHoverValue(e.slot, t), n = r === null ? e.secondary : this.formatValue(r, e.unit, e.decimals);
    return $`
      <div class="state-item" data-slot=${String(e.slot)}>
        ${e.showIcon ? $`
              <div class="icon-wrap">
                <div class="icon-shape" style=${M(e.iconStyle)}>
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
              </div>
            ` : T}
        <div class="info">
          <div class="primary">${e.name}</div>
          <div class="secondary">${n}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(e, t) {
    const r = [];
    for (let n = 1; n <= xe; n += 1) {
      const s = n, i = this.slotEnabled(s, e), o = this.slotEntityId(s, e);
      if (!i || !o)
        continue;
      const a = this.entityName(this.slotCustomName(s, e), o, n), l = L(this.hass, o), c = e.unit ?? I(this.hass, o) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(s, e), _ = this.iconStyle(this.slotIconColor(s, e)), u = this.resolveColor($r[s], ci), m = this.resolveColor(this.slotTrendColor(s, e), u);
      r.push({
        slot: s,
        entityId: o,
        name: a,
        secondary: d,
        unit: c,
        decimals: t,
        currentValue: l,
        icon: h,
        showIcon: this.slotShowIcon(s, e),
        iconStyle: _,
        trendColor: m
      });
    }
    return r;
  }
  slotEntityId(e, t) {
    return Gr(e, t);
  }
  slotCustomName(e, t) {
    return qr(e, t);
  }
  slotEnabled(e, t) {
    return Kr(e, t);
  }
  slotShowIcon(e, t) {
    return Xr(e, t);
  }
  slotIcon(e, t) {
    return Yr(e, t);
  }
  slotIconColor(e, t) {
    return Jr(e, t);
  }
  slotTrendColor(e, t) {
    return Zr(e, t);
  }
  entityName(e, t, r) {
    return en(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    var n, s, i;
    return tn(e, t, r, {
      enabled: ((n = this._config) == null ? void 0 : n.auto_scale_units) === !0,
      baseDecimals: ((s = this._config) == null ? void 0 : s.decimals_base_unit) ?? r,
      prefixedDecimals: ((i = this._config) == null ? void 0 : i.decimals_prefixed_unit) ?? r
    });
  }
  convertSharedScaleHoverValue(e, t) {
    if (!this._sharedScaleCanonical)
      return t;
    const r = this._sharedScaleFactors[e];
    return typeof r != "number" || !Number.isFinite(r) || r <= 0 ? t : t / r;
  }
  readConfigString(e) {
    return W(e);
  }
  normalizeLegendLayout(e) {
    return Qr(e);
  }
  normalizeTimeframeHours(e) {
    return zt(e, xr);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return At(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : $r[r];
  }
  iconStyle(e) {
    return Tt(e);
  }
  resolveColor(e, t = "") {
    return $t(e, t);
  }
  trendPoints(e, t) {
    const r = Date.now(), n = r - this.trendWindowMs(this._config), s = this._trendSeries[e] ?? [];
    let i = 0;
    for (; i < s.length && s[i].ts < n; )
      i += 1;
    const o = i > 0 ? s.slice(i) : [...s];
    return t !== null && Number.isFinite(t) && o.push({ ts: r, value: t }), o;
  }
  toTrendCoordinates(e, t, r) {
    var g, v;
    const s = Date.now() - t, i = 0, o = 100, a = e.map((w) => w.value), l = (r == null ? void 0 : r.min) ?? Math.min(...a), c = (r == null ? void 0 : r.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, _ = Math.max(c - l, He), u = e.map((w) => {
      const S = Math.max(0, Math.min(100, (w.ts - s) / t * 100)), y = i + S / 100 * (o - i), f = _ <= He ? 0.5 : (w.value - l) / _, C = h - f * (h - d);
      return { x: y, y: C, value: w.value };
    }), m = ((g = u[0]) == null ? void 0 : g.x) ?? i, x = ((v = u[u.length - 1]) == null ? void 0 : v.x) ?? o, b = Math.max(0, x - m), p = 18;
    if (u.length >= 2 && b < p) {
      const w = o - p, S = Math.max(i, Math.min(w, x - p));
      if (b <= He) {
        const f = p / (u.length - 1);
        return u.map((C, E) => ({
          ...C,
          x: Math.max(i, Math.min(o, S + f * E))
        }));
      }
      const y = p / b;
      return u.map((f) => ({
        ...f,
        x: Math.max(i, Math.min(o, S + (f.x - m) * y))
      }));
    }
    return u;
  }
  toCanvasPoints(e, t, r) {
    return Et(e, t, r);
  }
  computeTrendValueRange(e, t) {
    const r = [];
    if (Object.entries(e).forEach(([i, o]) => {
      const a = Number(i), l = (t == null ? void 0 : t[a]) ?? 1;
      o.forEach((c) => r.push(c.value * l));
    }), r.length === 0)
      return null;
    const n = Math.min(...r), s = Math.max(...r);
    return !Number.isFinite(n) || !Number.isFinite(s) ? null : { min: n, max: s };
  }
  resolveSharedScaleFactors(e) {
    let t = null;
    const r = {};
    Object.keys(e).map((i) => Number(i)).filter((i) => Number.isFinite(i) && i >= 1 && i <= xe).forEach((i) => {
      const o = i, a = this._drawConfigs.find((c) => c.slot === o);
      if (!a)
        return;
      const l = le(a.unit);
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
    const s = Object.values(r).some((i) => !Number.isFinite(i ?? NaN));
    return t === null || s || Object.keys(r).length !== n.length ? null : r;
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
    var x, b;
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
    const n = this.prepareTrendCanvas(t), s = this.prepareTrendCanvas(r);
    if (!n || !s) {
      this._linePointsBySlot = {}, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const i = ((x = this._config) == null ? void 0 : x.fill_area_enabled) !== !1, o = this.trendWindowMs(this._config), a = {};
    this._drawConfigs.forEach((p) => {
      const g = this.trendPoints(p.slot, p.currentValue);
      g.length >= 2 && (a[p.slot] = g);
    });
    const l = ((b = this._config) == null ? void 0 : b.shared_trend_scale) === !0, c = l ? this.resolveSharedScaleFactors(a) : null;
    this._sharedScaleCanonical = c !== null, this._sharedScaleFactors = c ?? {};
    const d = l ? this.computeTrendValueRange(a, c ?? void 0) : null, h = {};
    let _ = 0, u = 0;
    [...this._drawConfigs].sort((p, g) => g.slot - p.slot).forEach((p) => {
      const g = a[p.slot];
      if (!g || g.length < 2)
        return;
      const v = (c == null ? void 0 : c[p.slot]) ?? 1, w = c ? this.scaleTrendSeries(g, v) : g, S = this.toTrendCoordinates(w, o, d);
      if (S.length < 2)
        return;
      const y = this.toCanvasPoints(S, n.width, n.height), f = this.toCanvasPoints(S, s.width, s.height);
      i && this.drawTrendArea(n.ctx, y, p.color, n.height), this.drawTrendLine(s.ctx, f, p.color, p.lineWidth), h[p.slot] = f, _ += 1, u += f.length;
    }), this._linePointsBySlot = h, this._hoverState && !h[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: _,
      points: u,
      fill_area: i,
      shared_scale: l,
      shared_scale_units: this._sharedScaleCanonical ? "canonical" : "raw"
    });
  }
  prepareTrendCanvas(e) {
    const t = e.getContext("2d");
    if (!t)
      return null;
    const r = e.getBoundingClientRect(), n = Math.max(1, Math.round(r.width)), s = Math.max(1, Math.round(r.height)), i = Math.max(1, window.devicePixelRatio || 1), o = Math.max(1, Math.round(n * i)), a = Math.max(1, Math.round(s * i));
    return (e.width !== o || e.height !== a) && (e.width = o, e.height = a), t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height), t.setTransform(i, 0, 0, i, 0, 0), { ctx: t, width: n, height: s };
  }
  drawTrendArea(e, t, r, n) {
    if (t.length < 2)
      return;
    const s = this.resolveCanvasColor(r), i = t[0], o = t[t.length - 1], a = Math.min(...t.map((c) => c.y)), l = e.createLinearGradient(0, a, 0, n);
    l.addColorStop(0, this.withAlpha(s, 0.24)), l.addColorStop(1, this.withAlpha(s, 0)), e.beginPath(), e.moveTo(i.x, i.y), t.slice(1).forEach((c) => e.lineTo(c.x, c.y)), e.lineTo(o.x, n), e.lineTo(i.x, n), e.closePath(), e.fillStyle = l, e.fill();
  }
  drawTrendLine(e, t, r, n) {
    if (t.length < 2)
      return;
    const s = this.resolveCanvasColor(r);
    this.strokeTrendPolyline(e, t, s, n);
  }
  clearHoverState() {
    this._hoverState && (this._hoverState = void 0);
  }
  findNearestHoverPoint(e, t) {
    let r = null, n = Number.POSITIVE_INFINITY;
    for (const s of this._drawConfigs) {
      const i = this._linePointsBySlot[s.slot];
      if (!i || i.length < 2)
        continue;
      const o = this.interpolateCanvasPoint(i, e);
      if (!o)
        continue;
      const a = Math.abs(o.y - t);
      a < n && (n = a, r = {
        slot: s.slot,
        x: o.x,
        y: o.y,
        value: o.value,
        color: s.color
      });
    }
    return r;
  }
  interpolateCanvasPoint(e, t) {
    if (e.length === 0)
      return null;
    const r = e[0], n = e[e.length - 1];
    if (t <= r.x)
      return { x: t, y: r.y, value: r.value };
    if (t >= n.x)
      return { x: t, y: n.y, value: n.value };
    for (let s = 1; s < e.length; s += 1) {
      const i = e[s - 1], o = e[s];
      if (t > o.x)
        continue;
      const a = o.x - i.x;
      if (Math.abs(a) <= He)
        return { x: t, y: o.y, value: o.value };
      const l = (t - i.x) / a;
      return {
        x: t,
        y: i.y + (o.y - i.y) * l,
        value: i.value + (o.value - i.value) * l
      };
    }
    return { x: t, y: n.y, value: n.value };
  }
  strokeTrendPolyline(e, t, r, n) {
    t.length < 2 || (e.beginPath(), e.moveTo(t[0].x, t[0].y), t.slice(1).forEach((s) => e.lineTo(s.x, s.y)), e.strokeStyle = r, e.lineWidth = n, e.lineCap = "round", e.lineJoin = "round", e.stroke());
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
    const s = n.fillStyle, o = (typeof s == "string" ? s.trim() : "").match(/^#([a-f\d]{6})$/i);
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
    this.clearHoverState(), this.teardownVisibilityObserver(), this.stopLiveRuntime(), super.disconnectedCallback();
  }
  updated(e) {
    var o;
    const t = e.get("_config"), r = e.has("_config") && this.shouldRefreshTrendOnConfigChange(t, this._config), n = e.get("hass"), s = e.has("hass") && this.didTrackedEntityStateChange(n);
    (e.has("preview") || e.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (e.has("_config") ? (r && this.scheduleConfigRefresh(), this.clearHoverState()) : e.has("hass") && this._isVisible && s && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (e.has("_config") ? (r && this.scheduleConfigRefresh(!0), this.clearHoverState()) : e.has("hass") && s && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((o = this._config) == null ? void 0 : o.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset();
    const i = e.has("_config") || e.has("_trendSeries") || e.has("_graphTopInset") || e.has("preview") || e.has("editMode") || s;
    (!this.shouldRunLiveRuntime() || this._isVisible) && i && this.scheduleTrendCanvasDraw();
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
    const n = t.getBoundingClientRect(), s = r.getBoundingClientRect(), i = Math.max(0, Math.ceil(s.bottom - n.top));
    Math.abs(i - this._graphTopInset) > 0.5 && (this._graphTopInset = i);
  }
  maybeRefreshTrendHistory(e = !1, t = !1) {
    if (!this.shouldRunLiveRuntime() && !t || !this._isVisible && !t || t && !this.isEditorPreview())
      return;
    e && (this._lastTrendRefresh = 0);
    const r = Date.now();
    !e && r - this._lastTrendRefresh < Cr || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  shouldRunLiveRuntime() {
    return !this.isEditorPreview();
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
    }, li));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Cr), this.updateComplete.then(() => {
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
    const r = this._config, n = {}, s = this.trendWindowMs(r), i = B(r.trend_data_source, "hybrid"), o = this.enabledSlots(r);
    if (o.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const l = this.perfNow(), c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
      let _ = Number.POSITIVE_INFINITY;
      const u = Date.now() - s;
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
        const y = ((a = S[S.length - 1]) == null ? void 0 : a.ts) ?? u, f = Math.max(u, y - ai);
        _ = Math.min(_, f);
      }
      let m = 0;
      const x = d.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await ve(
          this.hass,
          Array.from(d),
          s,
          { dataSource: i }
        );
        return m = this.perfNow() - v, w;
      })() : {};
      let b = 0;
      const p = h.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await ve(
          this.hass,
          Array.from(h),
          s,
          {
            startMs: Number.isFinite(_) ? _ : u,
            dataSource: i
          }
        );
        return b = this.perfNow() - v, w;
      })() : {};
      c.forEach((v, w) => {
        const S = this._trendSeries[w] ?? [];
        if (d.has(v)) {
          const y = x[v] ?? [];
          n[w] = y.length > 0 ? y : S.filter((f) => f.ts >= u);
          return;
        }
        if (h.has(v)) {
          const y = p[v] ?? [];
          n[w] = Ue(S, y, u);
          return;
        }
        n[w] = S.filter((y) => y.ts >= u);
      });
      const g = this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((v) => Number(v)).filter((v) => Number.isFinite(v) && v >= 1 && v <= xe).every((v) => {
        const w = v;
        return this.areTrendSeriesEqual(n[w] ?? [], this._trendSeries[w] ?? []);
      });
      g || (this._trendSeries = n), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - l),
        window_ms: s,
        force_full: e,
        slots: o.length,
        full_entities: d.size,
        incremental_entities: h.size,
        data_source: i,
        full_fetch_ms: this.toPerfMs(m),
        incremental_fetch_ms: this.toPerfMs(b),
        series_changed: !g
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let r = 1; r <= xe; r += 1) {
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
    for (let r = 1; r <= xe; r += 1) {
      const n = r, s = this.slotEnabled(n, e), i = this.slotEnabled(n, t), o = s ? this.slotEntityId(n, e) : void 0, a = i ? this.slotEntityId(n, t) : void 0;
      if (s !== i || o !== a)
        return !0;
    }
    return !1;
  }
  sameTrendSeriesKeys(e, t) {
    const r = Object.keys(e).sort(), n = Object.keys(t).sort();
    return r.length === n.length && r.every((s, i) => s === n[i]);
  }
  areTrendSeriesEqual(e, t) {
    if (e.length !== t.length)
      return !1;
    for (let r = 0; r < e.length; r += 1) {
      const n = e[r], s = t[r];
      if (n.ts !== s.ts || Math.abs(n.value - s.value) > 1e-4)
        return !1;
    }
    return !0;
  }
};
q.styles = Ke`
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
  `;
te([
  k({ attribute: !1 })
], q.prototype, "hass", 2);
te([
  k({ type: Boolean })
], q.prototype, "preview", 2);
te([
  k({ type: Boolean })
], q.prototype, "editMode", 2);
te([
  O()
], q.prototype, "_config", 2);
te([
  O()
], q.prototype, "_trendSeries", 2);
te([
  O()
], q.prototype, "_graphTopInset", 2);
te([
  O()
], q.prototype, "_hoverState", 2);
q = te([
  he("power-pilz-graph-card")
], q);
var di = Object.defineProperty, hi = Object.getOwnPropertyDescriptor, Ot = (e, t, r, n) => {
  for (var s = n > 1 ? void 0 : n ? hi(t, r) : t, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (s = (n ? o(t, r, s) : o(s)) || s);
  return n && s && di(t, r, s), s;
};
const ui = nn(!0);
let Ge = class extends U {
  constructor() {
    super(...arguments), this.computeLabel = (e) => cn(e, {
      normalize_stack_to_percent: "Normalize to 100%"
    }), this.valueChanged = (e) => {
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
      legend_layout: sn(e.legend_layout),
      timeframe_hours: on(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      normalize_stack_to_percent: e.normalize_stack_to_percent ?? !1,
      decimals: e.decimals ?? 1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: e.decimals_base_unit ?? e.decimals ?? 1,
      decimals_prefixed_unit: e.decimals_prefixed_unit ?? e.decimals ?? 1,
      line_thickness: an(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...ln(e)
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? T : $`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Pe}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ui}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Ot([
  k({ attribute: !1 })
], Ge.prototype, "hass", 2);
Ot([
  O()
], Ge.prototype, "_config", 2);
Ge = Ot([
  he("power-pilz-graph-stack-card-editor")
], Ge);
var _i = Object.defineProperty, mi = Object.getOwnPropertyDescriptor, re = (e, t, r, n) => {
  for (var s = n > 1 ? void 0 : n ? mi(t, r) : t, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (s = (n ? o(t, r, s) : o(s)) || s);
  return n && s && _i(t, r, s), s;
};
const Ce = 1, Tr = 24, Er = 300 * 1e3, yi = 60 * 1e3, fi = 350, ie = 0.01, $e = 4, pi = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", Mr = {
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
      const n = e.clientX - r.left, s = e.clientY - r.top;
      if (n < 0 || n > r.width || s < 0 || s > r.height) {
        this.clearHoverState();
        return;
      }
      const i = this.findNearestHoverPoint(n, s);
      if (!i) {
        this.clearHoverState();
        return;
      }
      const o = this._hoverState;
      o && o.slot === i.slot && Math.abs(o.x - i.x) <= 0.2 && Math.abs(o.y - i.y) <= 0.2 && Math.abs(o.value - i.value) <= 1e-4 && o.color === i.color || (this._hoverState = i);
    }, this.handlePointerLeave = () => {
      this.clearHoverState();
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-graph-stack-card-editor");
  }
  static async getStubConfig(e) {
    const t = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(t), n = (...c) => c.find((d) => d in t), s = (c) => r.find((d) => d.startsWith(`${c}.`)), i = n("sensor.dev_home_power", "sensor.home_power") ?? s("sensor") ?? "sensor.dev_home_power", o = n("sensor.dev_solar_power", "sensor.solar_power"), a = n("sensor.dev_grid_power", "sensor.grid_power"), l = n("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: "row",
      timeframe_hours: Tr,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      normalize_stack_to_percent: !1,
      auto_scale_units: !1,
      entity_1: i,
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
      decimals: Ce,
      decimals_base_unit: Ce,
      decimals_prefixed_unit: Ce
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Ce, r = Q(e.decimals_base_unit, t), n = Q(e.decimals_prefixed_unit, t), s = this.readConfigString(e.entity), i = this.readConfigString(e.icon), o = this.readConfigString(e.entity_1) ?? s ?? "sensor.dev_home_power";
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
      entity_1_icon: e.entity_1_icon ?? i ?? "mdi:chart-line",
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
      return $`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return $``;
    const e = this._config, t = e.decimals ?? Ce, r = this.normalizeLineThickness(e.line_thickness), n = e.normalize_stack_to_percent === !0, s = this.collectSeriesEntries(e, t), i = this.withStackedCurrentValues(s, n), o = this.normalizeLegendLayout(e.legend_layout), a = e.hover_enabled !== !1, l = this._hoverState, c = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, d = c > 0 ? { top: `${c}px` } : {}, h = l ? {
      left: `${l.x}px`,
      top: `${l.y + c}px`,
      "--hover-dot-color": l.color
    } : {};
    return this._drawConfigs = s.map((_) => ({
      slot: _.slot,
      currentValue: _.currentValue,
      unit: _.unit,
      color: _.trendColor,
      lineWidth: r
    })), $`
      <ha-card>
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
          ${a && l ? $`<div class="hover-dot" aria-hidden="true" style=${M(h)}></div>` : T}

          <div class="content">
            <div class="series-list layout-${o}">
              ${s.length === 0 ? $`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph Stack card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : i.map(
      (_) => this.renderSeriesItem(
        _,
        l && l.slot === _.slot ? l.value : null
      )
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderSeriesItem(e, t) {
    const r = t === null ? null : this.convertStackedHoverValue(e.slot, t), n = r === null ? e.secondary : this.formatValue(r, e.unit, e.decimals);
    return $`
      <div class="state-item" data-slot=${String(e.slot)}>
        ${e.showIcon ? $`
              <div class="icon-wrap">
                <div class="icon-shape" style=${M(e.iconStyle)}>
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
              </div>
            ` : T}
        <div class="info">
          <div class="primary">${e.name}</div>
          <div class="secondary">${n}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(e, t) {
    const r = [];
    for (let n = 1; n <= $e; n += 1) {
      const s = n, i = this.slotEnabled(s, e), o = this.slotEntityId(s, e);
      if (!i || !o)
        continue;
      const a = this.entityName(this.slotCustomName(s, e), o, n), l = L(this.hass, o), c = e.unit ?? I(this.hass, o) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(s, e), _ = this.iconStyle(this.slotIconColor(s, e)), u = this.resolveColor(Mr[s], pi), m = this.resolveColor(this.slotTrendColor(s, e), u);
      r.push({
        slot: s,
        entityId: o,
        name: a,
        secondary: d,
        unit: c,
        decimals: t,
        currentValue: l,
        icon: h,
        showIcon: this.slotShowIcon(s, e),
        iconStyle: _,
        trendColor: m
      });
    }
    return r;
  }
  withStackedCurrentValues(e, t) {
    const r = this.resolveStackUnitFactors(e), n = e.reduce((d, h) => d + (h.currentValue ?? 0), 0), s = r ? e.reduce((d, h) => d + (h.currentValue ?? 0) * (r[h.slot] ?? 1), 0) : n, i = r ? s : n, o = Number.isFinite(i) && Math.abs(i) > ie;
    let a = 0, l = 0, c = !1;
    return e.map((d) => {
      d.currentValue !== null && Number.isFinite(d.currentValue) && (a += d.currentValue, r && (l += d.currentValue * (r[d.slot] ?? 1)), c = !0);
      const h = c ? t ? o ? (r ? l : a) / i * 100 : 0 : r ? l / (r[d.slot] ?? 1) : a : null, _ = t ? "%" : d.unit;
      return {
        ...d,
        unit: _,
        secondary: this.formatValue(h, _, d.decimals)
      };
    });
  }
  slotEntityId(e, t) {
    return Gr(e, t);
  }
  slotCustomName(e, t) {
    return qr(e, t);
  }
  slotEnabled(e, t) {
    return Kr(e, t);
  }
  slotShowIcon(e, t) {
    return Xr(e, t);
  }
  slotIcon(e, t) {
    return Yr(e, t);
  }
  slotIconColor(e, t) {
    return Jr(e, t);
  }
  slotTrendColor(e, t) {
    return Zr(e, t);
  }
  entityName(e, t, r) {
    return en(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    var n, s, i;
    return tn(e, t, r, {
      enabled: ((n = this._config) == null ? void 0 : n.auto_scale_units) === !0,
      baseDecimals: ((s = this._config) == null ? void 0 : s.decimals_base_unit) ?? r,
      prefixedDecimals: ((i = this._config) == null ? void 0 : i.decimals_prefixed_unit) ?? r
    });
  }
  resolveStackUnitFactors(e) {
    if (e.length === 0)
      return null;
    let t = null;
    const r = {};
    for (const n of e) {
      const s = le(n.unit);
      if (!s)
        return null;
      if (t === null)
        t = s.family;
      else if (t !== s.family)
        return null;
      r[n.slot] = s.factor;
    }
    return Object.keys(r).length === e.length ? r : null;
  }
  convertStackedHoverValue(e, t) {
    if (!this._stackCanonicalMode || this._stackNormalizeToPercent)
      return t;
    const r = this._stackCanonicalFactors[e];
    return typeof r != "number" || !Number.isFinite(r) || r <= 0 ? t : t / r;
  }
  readConfigString(e) {
    return W(e);
  }
  normalizeLegendLayout(e) {
    return Qr(e);
  }
  normalizeTimeframeHours(e) {
    return zt(e, Tr);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return At(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : Mr[r];
  }
  iconStyle(e) {
    return Tt(e);
  }
  resolveColor(e, t = "") {
    return $t(e, t);
  }
  trendPoints(e, t) {
    const r = Date.now(), n = r - this.trendWindowMs(this._config), s = this._trendSeries[e] ?? [];
    let i = 0;
    for (; i < s.length && s[i].ts < n; )
      i += 1;
    const o = i > 0 ? s.slice(i) : [...s];
    return t !== null && Number.isFinite(t) && o.push({ ts: r, value: t }), o;
  }
  toTrendCoordinates(e, t, r) {
    var g, v;
    const s = Date.now() - t, i = 0, o = 100, a = e.map((w) => w.value), l = (r == null ? void 0 : r.min) ?? Math.min(...a), c = (r == null ? void 0 : r.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, _ = Math.max(c - l, ie), u = e.map((w) => {
      const S = Math.max(0, Math.min(100, (w.ts - s) / t * 100)), y = i + S / 100 * (o - i), f = _ <= ie ? 0.5 : (w.value - l) / _, C = h - f * (h - d);
      return { x: y, y: C, value: w.value };
    }), m = ((g = u[0]) == null ? void 0 : g.x) ?? i, x = ((v = u[u.length - 1]) == null ? void 0 : v.x) ?? o, b = Math.max(0, x - m), p = 18;
    if (u.length >= 2 && b < p) {
      const w = o - p, S = Math.max(i, Math.min(w, x - p));
      if (b <= ie) {
        const f = p / (u.length - 1);
        return u.map((C, E) => ({
          ...C,
          x: Math.max(i, Math.min(o, S + f * E))
        }));
      }
      const y = p / b;
      return u.map((f) => ({
        ...f,
        x: Math.max(i, Math.min(o, S + (f.x - m) * y))
      }));
    }
    return u;
  }
  toCanvasPoints(e, t, r) {
    return Et(e, t, r);
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
    var p, g, v;
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
    const n = this.prepareTrendCanvas(t), s = this.prepareTrendCanvas(r);
    if (!n || !s) {
      this._linePointsBySlot = {}, this._stackCanonicalMode = !1, this._stackCanonicalFactors = {}, this._stackNormalizeToPercent = !1, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const i = ((p = this._config) == null ? void 0 : p.fill_area_enabled) !== !1, o = ((g = this._config) == null ? void 0 : g.normalize_stack_to_percent) === !0, a = ((v = this._config) == null ? void 0 : v.shared_trend_scale) === !0, l = this.resolveStackUnitFactors(this._drawConfigs);
    this._stackCanonicalMode = l !== null, this._stackCanonicalFactors = l ?? {}, this._stackNormalizeToPercent = o;
    const c = this.trendWindowMs(this._config), d = {}, h = this.buildStackedTrendSeries(c, l ?? void 0), _ = o ? this.normalizeStackedSeriesToPercent(h) : h, u = o ? a ? { min: 0, max: 100 } : null : a ? this.computeStackedValueRange(_) : null;
    let m = 0, x = 0;
    [...this._drawConfigs].sort((w, S) => S.slot - w.slot).forEach((w) => {
      const S = _[w.slot] ?? [];
      if (S.length < 2)
        return;
      const y = this.toTrendCoordinates(S, c, u);
      if (y.length < 2)
        return;
      const f = this.toCanvasPoints(y, n.width, n.height), C = this.toCanvasPoints(y, s.width, s.height);
      i && this.drawTrendArea(n.ctx, f, w.color, n.height), this.drawTrendLine(s.ctx, C, w.color, w.lineWidth), d[w.slot] = C, m += 1, x += C.length;
    }), this._linePointsBySlot = d, this._hoverState && !d[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: m,
      points: x,
      fill_area: i,
      shared_scale: a,
      normalize_percent: o,
      stack_units: this._stackCanonicalMode ? "canonical" : "raw"
    });
  }
  buildStackedTrendSeries(e, t) {
    const r = {}, n = [...this._drawConfigs].sort((i, o) => i.slot - o.slot);
    let s = null;
    return n.forEach((i) => {
      const o = this.trendPoints(i.slot, i.currentValue);
      if (o.length === 0)
        return;
      const a = this.normalizeTrendSeries(o, e);
      if (a.length === 0)
        return;
      const l = (t == null ? void 0 : t[i.slot]) ?? 1, c = l === 1 ? a : a.map((h) => ({
        ts: h.ts,
        value: h.value * l
      })), d = s ? this.sumTrendSeries(s, c) : c;
      r[i.slot] = d, s = d;
    }), r;
  }
  normalizeTrendSeries(e, t) {
    const r = Date.now() - t, n = [...e].filter((i) => Number.isFinite(i.ts) && Number.isFinite(i.value) && i.ts >= r).sort((i, o) => i.ts - o.ts);
    if (n.length === 0)
      return [];
    const s = [];
    return n.forEach((i) => {
      const o = s[s.length - 1];
      o && Math.abs(o.ts - i.ts) <= 0.5 ? s[s.length - 1] = i : s.push(i);
    }), s;
  }
  sumTrendSeries(e, t) {
    return e.length === 0 ? [...t] : t.length === 0 ? [...e] : this.mergeTimestamps(e, t).map((n) => ({
      ts: n,
      value: this.interpolateTrendValue(e, n) + this.interpolateTrendValue(t, n)
    }));
  }
  mergeTimestamps(e, t) {
    const r = [];
    let n = 0, s = 0;
    const i = (o) => {
      const a = r[r.length - 1];
      (a === void 0 || Math.abs(a - o) > 0.5) && r.push(o);
    };
    for (; n < e.length || s < t.length; ) {
      const o = n < e.length ? e[n].ts : Number.POSITIVE_INFINITY, a = s < t.length ? t[s].ts : Number.POSITIVE_INFINITY;
      o <= a ? (i(o), n += 1, Math.abs(o - a) <= 0.5 && (s += 1)) : (i(a), s += 1);
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
    let n = 0, s = e.length - 1;
    for (; n <= s; ) {
      const d = Math.floor((n + s) / 2), h = e[d];
      if (Math.abs(h.ts - t) <= 0.5)
        return h.value;
      h.ts < t ? n = d + 1 : s = d - 1;
    }
    const i = Math.max(1, Math.min(e.length - 1, n)), o = e[i - 1], a = e[i], l = a.ts - o.ts;
    if (Math.abs(l) <= ie)
      return a.value;
    const c = (t - o.ts) / l;
    return o.value + (a.value - o.value) * c;
  }
  computeStackedValueRange(e) {
    const t = [];
    if (Object.values(e).forEach((s) => {
      s.forEach((i) => t.push(i.value));
    }), t.length === 0)
      return null;
    const r = Math.min(...t), n = Math.max(...t);
    return !Number.isFinite(r) || !Number.isFinite(n) ? null : { min: r, max: n };
  }
  normalizeStackedSeriesToPercent(e) {
    const t = {}, r = Object.keys(e).map((i) => Number(i)).filter((i) => Number.isFinite(i) && i >= 1 && i <= $e).sort((i, o) => i - o);
    if (r.length === 0)
      return t;
    const n = r[r.length - 1], s = e[n] ?? [];
    return s.length < 1 || r.forEach((i) => {
      const o = e[i] ?? [];
      o.length !== 0 && (t[i] = o.map((a) => {
        const l = this.interpolateTrendValue(s, a.ts);
        if (!Number.isFinite(l) || Math.abs(l) <= ie)
          return { ts: a.ts, value: 0 };
        if (i === n)
          return { ts: a.ts, value: 100 };
        const c = a.value / l * 100;
        return {
          ts: a.ts,
          value: Math.max(0, Math.min(100, c))
        };
      }));
    }), t;
  }
  prepareTrendCanvas(e) {
    const t = e.getContext("2d");
    if (!t)
      return null;
    const r = e.getBoundingClientRect(), n = Math.max(1, Math.round(r.width)), s = Math.max(1, Math.round(r.height)), i = Math.max(1, window.devicePixelRatio || 1), o = Math.max(1, Math.round(n * i)), a = Math.max(1, Math.round(s * i));
    return (e.width !== o || e.height !== a) && (e.width = o, e.height = a), t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height), t.setTransform(i, 0, 0, i, 0, 0), { ctx: t, width: n, height: s };
  }
  drawTrendArea(e, t, r, n) {
    if (t.length < 2)
      return;
    const s = this.resolveCanvasColor(r), i = t[0], o = t[t.length - 1], a = Math.min(...t.map((c) => c.y)), l = e.createLinearGradient(0, a, 0, n);
    l.addColorStop(0, this.withAlpha(s, 0.24)), l.addColorStop(1, this.withAlpha(s, 0)), e.beginPath(), e.moveTo(i.x, i.y), t.slice(1).forEach((c) => e.lineTo(c.x, c.y)), e.lineTo(o.x, n), e.lineTo(i.x, n), e.closePath(), e.fillStyle = l, e.fill();
  }
  drawTrendLine(e, t, r, n) {
    if (t.length < 2)
      return;
    const s = this.resolveCanvasColor(r);
    this.strokeTrendPolyline(e, t, s, n);
  }
  clearHoverState() {
    this._hoverState && (this._hoverState = void 0);
  }
  findNearestHoverPoint(e, t) {
    let r = null, n = Number.POSITIVE_INFINITY;
    for (const s of this._drawConfigs) {
      const i = this._linePointsBySlot[s.slot];
      if (!i || i.length < 2)
        continue;
      const o = this.interpolateCanvasPoint(i, e);
      if (!o)
        continue;
      const a = Math.abs(o.y - t);
      a < n && (n = a, r = {
        slot: s.slot,
        x: o.x,
        y: o.y,
        value: o.value,
        color: s.color
      });
    }
    return r;
  }
  interpolateCanvasPoint(e, t) {
    if (e.length === 0)
      return null;
    const r = e[0], n = e[e.length - 1];
    if (t <= r.x)
      return { x: t, y: r.y, value: r.value };
    if (t >= n.x)
      return { x: t, y: n.y, value: n.value };
    for (let s = 1; s < e.length; s += 1) {
      const i = e[s - 1], o = e[s];
      if (t > o.x)
        continue;
      const a = o.x - i.x;
      if (Math.abs(a) <= ie)
        return { x: t, y: o.y, value: o.value };
      const l = (t - i.x) / a;
      return {
        x: t,
        y: i.y + (o.y - i.y) * l,
        value: i.value + (o.value - i.value) * l
      };
    }
    return { x: t, y: n.y, value: n.value };
  }
  strokeTrendPolyline(e, t, r, n) {
    t.length < 2 || (e.beginPath(), e.moveTo(t[0].x, t[0].y), t.slice(1).forEach((s) => e.lineTo(s.x, s.y)), e.strokeStyle = r, e.lineWidth = n, e.lineCap = "round", e.lineJoin = "round", e.stroke());
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
    const s = n.fillStyle, o = (typeof s == "string" ? s.trim() : "").match(/^#([a-f\d]{6})$/i);
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
    this.clearHoverState(), this.teardownVisibilityObserver(), this.stopLiveRuntime(), super.disconnectedCallback();
  }
  updated(e) {
    var o;
    const t = e.get("_config"), r = e.has("_config") && this.shouldRefreshTrendOnConfigChange(t, this._config), n = e.get("hass"), s = e.has("hass") && this.didTrackedEntityStateChange(n);
    (e.has("preview") || e.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (e.has("_config") ? (r && this.scheduleConfigRefresh(), this.clearHoverState()) : e.has("hass") && this._isVisible && s && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (e.has("_config") ? (r && this.scheduleConfigRefresh(!0), this.clearHoverState()) : e.has("hass") && s && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((o = this._config) == null ? void 0 : o.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset();
    const i = e.has("_config") || e.has("_trendSeries") || e.has("_graphTopInset") || e.has("preview") || e.has("editMode") || s;
    (!this.shouldRunLiveRuntime() || this._isVisible) && i && this.scheduleTrendCanvasDraw();
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
    const n = t.getBoundingClientRect(), s = r.getBoundingClientRect(), i = Math.max(0, Math.ceil(s.bottom - n.top));
    Math.abs(i - this._graphTopInset) > 0.5 && (this._graphTopInset = i);
  }
  maybeRefreshTrendHistory(e = !1, t = !1) {
    if (!this.shouldRunLiveRuntime() && !t || !this._isVisible && !t || t && !this.isEditorPreview())
      return;
    e && (this._lastTrendRefresh = 0);
    const r = Date.now();
    !e && r - this._lastTrendRefresh < Er || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  shouldRunLiveRuntime() {
    return !this.isEditorPreview();
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
    }, fi));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Er), this.updateComplete.then(() => {
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
    const r = this._config, n = {}, s = this.trendWindowMs(r), i = B(r.trend_data_source, "hybrid"), o = this.enabledSlots(r);
    if (o.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const l = this.perfNow(), c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
      let _ = Number.POSITIVE_INFINITY;
      const u = Date.now() - s;
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
        const y = ((a = S[S.length - 1]) == null ? void 0 : a.ts) ?? u, f = Math.max(u, y - yi);
        _ = Math.min(_, f);
      }
      let m = 0;
      const x = d.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await ve(
          this.hass,
          Array.from(d),
          s,
          { dataSource: i }
        );
        return m = this.perfNow() - v, w;
      })() : {};
      let b = 0;
      const p = h.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await ve(
          this.hass,
          Array.from(h),
          s,
          {
            startMs: Number.isFinite(_) ? _ : u,
            dataSource: i
          }
        );
        return b = this.perfNow() - v, w;
      })() : {};
      c.forEach((v, w) => {
        const S = this._trendSeries[w] ?? [];
        if (d.has(v)) {
          const y = x[v] ?? [];
          n[w] = y.length > 0 ? y : S.filter((f) => f.ts >= u);
          return;
        }
        if (h.has(v)) {
          const y = p[v] ?? [];
          n[w] = Ue(S, y, u);
          return;
        }
        n[w] = S.filter((y) => y.ts >= u);
      });
      const g = this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((v) => Number(v)).filter((v) => Number.isFinite(v) && v >= 1 && v <= $e).every((v) => {
        const w = v;
        return this.areTrendSeriesEqual(n[w] ?? [], this._trendSeries[w] ?? []);
      });
      g || (this._trendSeries = n), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - l),
        window_ms: s,
        force_full: e,
        slots: o.length,
        full_entities: d.size,
        incremental_entities: h.size,
        data_source: i,
        full_fetch_ms: this.toPerfMs(m),
        incremental_fetch_ms: this.toPerfMs(b),
        series_changed: !g
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let r = 1; r <= $e; r += 1) {
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
    for (let r = 1; r <= $e; r += 1) {
      const n = r, s = this.slotEnabled(n, e), i = this.slotEnabled(n, t), o = s ? this.slotEntityId(n, e) : void 0, a = i ? this.slotEntityId(n, t) : void 0;
      if (s !== i || o !== a)
        return !0;
    }
    return !1;
  }
  sameTrendSeriesKeys(e, t) {
    const r = Object.keys(e).sort(), n = Object.keys(t).sort();
    return r.length === n.length && r.every((s, i) => s === n[i]);
  }
  areTrendSeriesEqual(e, t) {
    if (e.length !== t.length)
      return !1;
    for (let r = 0; r < e.length; r += 1) {
      const n = e[r], s = t[r];
      if (n.ts !== s.ts || Math.abs(n.value - s.value) > 1e-4)
        return !1;
    }
    return !0;
  }
};
K.styles = Ke`
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
  `;
re([
  k({ attribute: !1 })
], K.prototype, "hass", 2);
re([
  k({ type: Boolean })
], K.prototype, "preview", 2);
re([
  k({ type: Boolean })
], K.prototype, "editMode", 2);
re([
  O()
], K.prototype, "_config", 2);
re([
  O()
], K.prototype, "_trendSeries", 2);
re([
  O()
], K.prototype, "_graphTopInset", 2);
re([
  O()
], K.prototype, "_hoverState", 2);
K = re([
  he("power-pilz-graph-stack-card")
], K);
var bi = Object.defineProperty, vi = Object.getOwnPropertyDescriptor, kt = (e, t, r, n) => {
  for (var s = n > 1 ? void 0 : n ? vi(t, r) : t, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (s = (n ? o(t, r, s) : o(s)) || s);
  return n && s && bi(t, r, s), s;
};
const gi = [
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
], wi = {
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
let qe = class extends U {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = e.name ?? "";
      return wi[t] ?? t;
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
    return !this.hass || !this._config ? T : $`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Pe}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${gi}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
kt([
  k({ attribute: !1 })
], qe.prototype, "hass", 2);
kt([
  O()
], qe.prototype, "_config", 2);
qe = kt([
  he("power-pilz-wallbox-card-editor")
], qe);
var Si = Object.defineProperty, ue = (e, t, r, n) => {
  for (var s = void 0, i = e.length - 1, o; i >= 0; i--)
    (o = e[i]) && (s = o(t, r, s) || s);
  return s && Si(t, r, s), s;
};
const xi = 0.01, Rr = "power-pilz-wallbox-mode-menu-portal-style", Nt = class Nt extends U {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._actionBusy = !1, this._modeMenuOpen = !1, this._modeMenuOptionCount = 0, this.toggleModeMenu = (t) => {
      var o;
      if (t.stopPropagation(), this.isEditorPreview() || !((o = this._config) != null && o.mode_entity) || this._actionBusy)
        return;
      const r = pe(this.hass, this._config.mode_entity), n = (r == null ? void 0 : r.state) ?? "", s = this.getModeOptions(r);
      if (s.length === 0)
        return;
      if (this._modeMenuOpen) {
        this.closeModeMenuPortal();
        return;
      }
      const i = t.currentTarget;
      i && this.openModeMenuPortal(i, s, n || s[0] || "Mode");
    }, this.selectModeOption = async (t) => {
      var s;
      if (!((s = this._config) != null && s.mode_entity))
        return;
      const r = pe(this.hass, this._config.mode_entity);
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
      const r = L(this.hass, this._config.power_entity), n = _t(this.hass, this._config.status_entity), s = this.isCharging(n, r, this._config.command_entity), i = this.resolveActionCommand(s);
      if (i) {
        this._actionBusy = !0;
        try {
          await Promise.resolve(this.hass.callService(i.domain, i.service, i.data));
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
    const r = (t == null ? void 0 : t.states) ?? {}, n = Object.keys(r), s = (...c) => c.find((d) => d in r), i = (c) => n.find((d) => d.startsWith(`${c}.`)), o = s("sensor.dev_wallbox_power", "sensor.wallbox_power") ?? i("sensor") ?? "sensor.dev_wallbox_power", a = s("input_select.dev_wallbox_mode", "select.wallbox_charging_mode") ?? i("input_select") ?? i("select"), l = s("input_boolean.dev_wallbox_enabled", "switch.wallbox_charging_enabled") ?? i("input_boolean") ?? i("switch");
    return {
      type: "custom:power-pilz-wallbox-card",
      name: "Wallbox",
      power_entity: o,
      status_entity: s("sensor.dev_wallbox_status", "sensor.wallbox_status"),
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
      decimals_base_unit: Q(t.decimals_base_unit, n),
      decimals_prefixed_unit: Q(t.decimals_prefixed_unit, n),
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
      return $`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return $``;
    const t = this._config, r = L(this.hass, t.power_entity), n = I(this.hass, t.power_entity) ?? "kW", s = _t(this.hass, t.status_entity), i = pe(this.hass, t.mode_entity), o = (i == null ? void 0 : i.state) ?? "", a = this.getModeOptions(i), l = this.isCharging(s, r, t.command_entity), c = this.resolveActionCommand(l), d = l ? "Stop" : "Start", h = l ? "mdi:pause" : "mdi:play", _ = this.statusLabel(s, l), u = this.formatPower(r, n, t.decimals ?? 1), m = this.showModeSelector(t, a), x = this.showLiveValue(t), b = this.showCommandButton(t), p = this.isEditorPreview() || this._actionBusy || !t.mode_entity || a.length === 0, g = o || a[0] || "Mode", v = this._modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down", w = this.iconStyle(t.icon_color), y = Number(x) + Number(b) === 1, f = m && x && b, C = y && x, E = y && b || f, R = C || E, z = x && !C, A = b && !E, H = m || z || A, D = m ? z || A ? A ? "actions" : "actions no-command" : "actions mode-only" : "actions no-mode";
    return (!m || p) && this._modeMenuOpen && this.closeModeMenuPortal(), $`
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

            ${R ? $`
                  <div class="compact-trailing ${E ? "button-only" : ""}">
                    ${C ? $`
                          <div class="compact-live-value">
                            <span>${_}</span>
                            <span class="dot">•</span>
                            <span>${u}</span>
                          </div>
                        ` : $``}

                    ${E ? $`
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
                        ` : $``}
                  </div>
                ` : $``}
          </div>

          ${H ? $`
                <div class=${D}>
                  ${m ? $`
                        <div class="mode-select-wrap">
                          <button
                            type="button"
                            class="mode-select"
                            ?disabled=${p}
                            @click=${this.toggleModeMenu}
                            aria-haspopup="listbox"
                            aria-expanded=${this._modeMenuOpen ? "true" : "false"}
                            title="Charging mode"
                          >
                            <span class="mode-select-label">${g}</span>
                            <ha-icon class="mode-select-chevron" .icon=${v}></ha-icon>
                          </button>
                        </div>
                      ` : $``}

                  ${z ? $`
                        <div class="live-value">
                          <span>${_}</span>
                          <span class="dot">•</span>
                          <span>${u}</span>
                        </div>
                      ` : $``}

                  ${A ? $`
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
                      ` : $``}
                </div>
              ` : $``}
        </div>
      </ha-card>
    `;
  }
  getModeOptions(t) {
    const r = t == null ? void 0 : t.attributes.options;
    if (Array.isArray(r)) {
      const n = r.filter(
        (s) => typeof s == "string" && s.trim().length > 0
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
    var i, o, a;
    const s = t === null ? null : Math.abs(t);
    return Mt(s, r, n, {
      enabled: ((i = this._config) == null ? void 0 : i.auto_scale_units) === !0,
      baseDecimals: ((o = this._config) == null ? void 0 : o.decimals_base_unit) ?? n,
      prefixedDecimals: ((a = this._config) == null ? void 0 : a.decimals_prefixed_unit) ?? n,
      nullWithUnit: !0
    });
  }
  isCharging(t, r, n) {
    var s;
    if (t) {
      const i = t.toLowerCase();
      if (["charging", "active", "running", "on", "start", "started"].includes(i))
        return !0;
      if (["idle", "paused", "stopped", "off", "standby", "complete"].includes(i))
        return !1;
    }
    if (n) {
      const i = (s = _t(this.hass, n)) == null ? void 0 : s.toLowerCase();
      if (i === "on")
        return !0;
      if (i === "off")
        return !1;
    }
    return r !== null && r > xi;
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
      const s = this.objectValue(t ? r.stop_service_data : r.start_service_data);
      return r.command_entity && s.entity_id === void 0 && (s.entity_id = r.command_entity), { ...n, data: s };
    }
    return r.command_entity ? {
      domain: this.entityDomain(r.command_entity),
      service: t ? "turn_off" : "turn_on",
      data: { entity_id: r.command_entity }
    } : null;
  }
  iconStyle(t) {
    return Tt(t);
  }
  disconnectedCallback() {
    this.closeModeMenuPortal(), super.disconnectedCallback();
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  ensureModeMenuPortalStyles() {
    if (document.getElementById(Rr))
      return;
    const t = document.createElement("style");
    t.id = Rr, t.textContent = `
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
    const s = n.getBoundingClientRect(), i = 8, o = 6, a = Math.max(96, Math.min(280, window.innerHeight - i * 2)), l = Math.min(
      a,
      this._modeMenuOptionCount * 34 + Math.max(0, this._modeMenuOptionCount - 1) * 4 + 14
    ), c = r.offsetHeight > 0 ? Math.min(a, r.offsetHeight) : l, d = Math.max(120, Math.round(s.width)), h = window.innerHeight - s.bottom - i, _ = h < c + o && s.top - i > h;
    let u = s.left;
    u = Math.max(i, Math.min(u, window.innerWidth - d - i));
    let m = _ ? s.top - o - c : s.bottom + o;
    m = Math.max(i, Math.min(m, window.innerHeight - c - i)), r.style.maxHeight = `${a}px`, r.style.width = `${d}px`, r.style.left = `${Math.round(u)}px`, r.style.top = `${Math.round(m)}px`;
  }
  openModeMenuPortal(t, r, n) {
    this.closeModeMenuPortal(), this.ensureModeMenuPortalStyles();
    const s = document.createElement("div");
    s.className = "power-pilz-mode-menu-backdrop", s.addEventListener("click", () => {
      this.closeModeMenuPortal();
    });
    const i = document.createElement("div");
    i.className = "power-pilz-mode-menu-portal", i.setAttribute("role", "listbox"), r.forEach((o) => {
      const a = document.createElement("button");
      a.type = "button", a.className = `power-pilz-mode-menu-option ${o === n ? "selected" : ""}`, a.dataset.option = o, a.setAttribute("role", "option"), a.setAttribute("aria-selected", o === n ? "true" : "false"), a.textContent = o, a.addEventListener("click", (l) => {
        var d;
        l.stopPropagation();
        const c = ((d = l.currentTarget) == null ? void 0 : d.dataset.option) ?? "";
        c && (this.closeModeMenuPortal(), this.selectModeOption(c));
      }), i.append(a);
    }), document.body.append(s), document.body.append(i), this._modeMenuBackdrop = s, this._modeMenuPortal = i, this._modeMenuOptionCount = r.length, this._modeMenuOpen = !0, this.positionModeMenuPortal(t);
  }
  closeModeMenuPortal() {
    this._modeMenuPortal && (this._modeMenuPortal.remove(), this._modeMenuPortal = void 0), this._modeMenuBackdrop && (this._modeMenuBackdrop.remove(), this._modeMenuBackdrop = void 0), this._modeMenuOptionCount = 0, this._modeMenuOpen && (this._modeMenuOpen = !1);
  }
};
Nt.styles = Ke`
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
let j = Nt;
ue([
  k({ attribute: !1 })
], j.prototype, "hass");
ue([
  k({ type: Boolean })
], j.prototype, "preview");
ue([
  k({ type: Boolean })
], j.prototype, "editMode");
ue([
  k({ reflect: !0, type: String })
], j.prototype, "layout");
ue([
  O()
], j.prototype, "_config");
ue([
  O()
], j.prototype, "_actionBusy");
ue([
  O()
], j.prototype, "_modeMenuOpen");
class Ci extends j {
}
customElements.get("power-pilz-wallbox-card") || customElements.define("power-pilz-wallbox-card", j);
customElements.get("power-pilz-wallbox-card-v2") || customElements.define("power-pilz-wallbox-card-v2", Ci);
window.customCards = window.customCards || [];
const $i = [
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
for (const e of $i)
  window.customCards.some((t) => t.type === e.type) || window.customCards.push(e);
console.info(
  `%cPOWER PILZ%c v${Pe}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
//# sourceMappingURL=power-pilz.js.map
