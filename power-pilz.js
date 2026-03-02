/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const De = globalThis, vt = De.ShadowRoot && (De.ShadyCSS === void 0 || De.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, gt = Symbol(), Zt = /* @__PURE__ */ new WeakMap();
let zr = class {
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
const Wn = (e) => new zr(typeof e == "string" ? e : e + "", void 0, gt), Xe = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, i, s) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[s + 1], e[0]);
  return new zr(r, e, gt);
}, Gn = (e, t) => {
  if (vt) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), i = De.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = r.cssText, e.appendChild(n);
  }
}, Qt = vt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return Wn(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: qn, defineProperty: Xn, getOwnPropertyDescriptor: Kn, getOwnPropertyNames: Yn, getOwnPropertySymbols: Jn, getPrototypeOf: Zn } = Object, Q = globalThis, er = Q.trustedTypes, Qn = er ? er.emptyScript : "", ct = Q.reactiveElementPolyfillSupport, Te = (e, t) => e, Fe = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Qn : null;
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
} }, wt = (e, t) => !qn(e, t), tr = { attribute: !0, type: String, converter: Fe, reflect: !1, useDefault: !1, hasChanged: wt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Q.litPropertyMetadata ?? (Q.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let pe = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = tr) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, r);
      i !== void 0 && Xn(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: i, set: s } = Kn(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? tr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Te("elementProperties"))) return;
    const t = Zn(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Te("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Te("properties"))) {
      const r = this.properties, n = [...Yn(r), ...Jn(r)];
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
      for (const i of n) r.unshift(Qt(i));
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
    return Gn(t, this.constructor.elementStyles), t;
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
      const o = (((s = n.converter) == null ? void 0 : s.toAttribute) !== void 0 ? n.converter : Fe).toAttribute(r, n.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var s, o;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = n.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((s = a.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? a.converter : Fe;
      this._$Em = i;
      const c = l.fromAttribute(r, a.type);
      this[i] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, r, n, i = !1, s) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (s = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? wt)(s, r) || n.useDefault && n.reflect && s === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
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
pe.elementStyles = [], pe.shadowRootOptions = { mode: "open" }, pe[Te("elementProperties")] = /* @__PURE__ */ new Map(), pe[Te("finalized")] = /* @__PURE__ */ new Map(), ct == null || ct({ ReactiveElement: pe }), (Q.reactiveElementVersions ?? (Q.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ee = globalThis, rr = (e) => e, Ve = Ee.trustedTypes, nr = Ve ? Ve.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ar = "$lit$", Z = `lit$${Math.random().toFixed(9).slice(2)}$`, Pr = "?" + Z, ei = `<${Pr}>`, ce = document, Me = () => ce.createComment(""), Re = (e) => e === null || typeof e != "object" && typeof e != "function", St = Array.isArray, ti = (e) => St(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", dt = `[ 	
\f\r]`, ge = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ir = /-->/g, sr = />/g, ie = RegExp(`>|${dt}(?:([^\\s"'>=/]+)(${dt}*=${dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), or = /'/g, ar = /"/g, Or = /^(?:script|style|textarea|title)$/i, ri = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), $ = ri(1), de = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), lr = /* @__PURE__ */ new WeakMap(), oe = ce.createTreeWalker(ce, 129);
function kr(e, t) {
  if (!St(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return nr !== void 0 ? nr.createHTML(t) : t;
}
const ni = (e, t) => {
  const r = e.length - 1, n = [];
  let i, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ge;
  for (let a = 0; a < r; a++) {
    const l = e[a];
    let c, d, h = -1, _ = 0;
    for (; _ < l.length && (o.lastIndex = _, d = o.exec(l), d !== null); ) _ = o.lastIndex, o === ge ? d[1] === "!--" ? o = ir : d[1] !== void 0 ? o = sr : d[2] !== void 0 ? (Or.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = ie) : d[3] !== void 0 && (o = ie) : o === ie ? d[0] === ">" ? (o = i ?? ge, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? ie : d[3] === '"' ? ar : or) : o === ar || o === or ? o = ie : o === ir || o === sr ? o = ge : (o = ie, i = void 0);
    const u = o === ie && e[a + 1].startsWith("/>") ? " " : "";
    s += o === ge ? l + ei : h >= 0 ? (n.push(c), l.slice(0, h) + Ar + l.slice(h) + Z + u) : l + Z + (h === -2 ? a : u);
  }
  return [kr(e, s + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ze {
  constructor({ strings: t, _$litType$: r }, n) {
    let i;
    this.parts = [];
    let s = 0, o = 0;
    const a = t.length - 1, l = this.parts, [c, d] = ni(t, r);
    if (this.el = ze.createElement(c, n), oe.currentNode = this.el.content, r === 2 || r === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = oe.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Ar)) {
          const _ = d[o++], u = i.getAttribute(h).split(Z), m = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: s, name: m[2], strings: u, ctor: m[1] === "." ? si : m[1] === "?" ? oi : m[1] === "@" ? ai : Ke }), i.removeAttribute(h);
        } else h.startsWith(Z) && (l.push({ type: 6, index: s }), i.removeAttribute(h));
        if (Or.test(i.tagName)) {
          const h = i.textContent.split(Z), _ = h.length - 1;
          if (_ > 0) {
            i.textContent = Ve ? Ve.emptyScript : "";
            for (let u = 0; u < _; u++) i.append(h[u], Me()), oe.nextNode(), l.push({ type: 2, index: ++s });
            i.append(h[_], Me());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Pr) l.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(Z, h + 1)) !== -1; ) l.push({ type: 7, index: s }), h += Z.length - 1;
      }
      s++;
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
  let i = n !== void 0 ? (o = r._$Co) == null ? void 0 : o[n] : r._$Cl;
  const s = Re(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== s && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), s === void 0 ? i = void 0 : (i = new s(e), i._$AT(e, r, n)), n !== void 0 ? (r._$Co ?? (r._$Co = []))[n] = i : r._$Cl = i), i !== void 0 && (t = be(e, i._$AS(e, t.values), i, n)), t;
}
class ii {
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
    const { el: { content: r }, parts: n } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? ce).importNode(r, !0);
    oe.currentNode = i;
    let s = oe.nextNode(), o = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new Ae(s, s.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (c = new li(s, this, t)), this._$AV.push(c), l = n[++a];
      }
      o !== (l == null ? void 0 : l.index) && (s = oe.nextNode(), o++);
    }
    return oe.currentNode = ce, i;
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
  constructor(t, r, n, i) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = n, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = be(this, t, r), Re(t) ? t === T || t == null || t === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== de && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ti(t) ? this.k(t) : this._(t);
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
    var s;
    const { values: r, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ze.createElement(kr(n.h, n.h[0]), this.options)), n);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === i) this._$AH.p(r);
    else {
      const o = new ii(i, this), a = o.u(this.options);
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
    let n, i = 0;
    for (const s of t) i === r.length ? r.push(n = new Ae(this.O(Me()), this.O(Me()), this, this.options)) : n = r[i], n._$AI(s), i++;
    i < r.length && (this._$AR(n && n._$AB.nextSibling, i), r.length = i);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, r); t !== this._$AB; ) {
      const i = rr(t).nextSibling;
      rr(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 && (this._$Cv = t, (r = this._$AP) == null || r.call(this, t));
  }
}
class Ke {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, n, i, s) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t, this.name = r, this._$AM = i, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = T;
  }
  _$AI(t, r = this, n, i) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) t = be(this, t, r, 0), o = !Re(t) || t !== this._$AH && t !== de, o && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = s[0], l = 0; l < s.length - 1; l++) c = be(this, a[n + l], r, l), c === de && (c = this._$AH[l]), o || (o = !Re(c) || c !== this._$AH[l]), c === T ? t = T : t !== T && (t += (c ?? "") + s[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class si extends Ke {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }
}
class oi extends Ke {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== T);
  }
}
class ai extends Ke {
  constructor(t, r, n, i, s) {
    super(t, r, n, i, s), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = be(this, t, r, 0) ?? T) === de) return;
    const n = this._$AH, i = t === T && n !== T || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== T && (n === T || i);
    i && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class li {
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
const ci = (e, t, r) => {
  const n = (r == null ? void 0 : r.renderBefore) ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const s = (r == null ? void 0 : r.renderBefore) ?? null;
    n._$litPart$ = i = new Ae(t.insertBefore(Me(), s), s, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = globalThis;
let U = class extends pe {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ci(r, this.renderRoot, this.renderOptions);
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
var Rr;
U._$litElement$ = !0, U.finalized = !0, (Rr = ae.litElementHydrateSupport) == null || Rr.call(ae, { LitElement: U });
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
const di = { attribute: !0, type: String, converter: Fe, reflect: !1, hasChanged: wt }, hi = (e = di, t, r) => {
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
function k(e) {
  return (t, r) => typeof r == "object" ? hi(e, t, r) : ((n, i, s) => {
    const o = i.hasOwnProperty(s);
    return i.constructor.createProperty(s, n), o ? Object.getOwnPropertyDescriptor(i, s) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(e) {
  return k({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ui = { ATTRIBUTE: 1 }, _i = (e) => (...t) => ({ _$litDirective$: e, values: t });
let mi = class {
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
const Nr = "important", fi = " !" + Nr, M = _i(class extends mi {
  constructor(e) {
    var t;
    if (super(e), e.type !== ui.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const s = typeof i == "string" && i.endsWith(fi);
        n.includes("-") || s ? r.setProperty(n, s ? i.slice(0, -11) : i, s ? Nr : "") : r[n] = i;
      }
    }
    return de;
  }
}), ye = (e, t) => {
  if (t)
    return e.states[t];
}, L = (e, t) => {
  const r = ye(e, t);
  if (!r)
    return null;
  const n = Number(r.state);
  return Number.isFinite(n) ? n : null;
}, I = (e, t) => {
  const r = ye(e, t);
  if (!r)
    return;
  const n = r.attributes.unit_of_measurement;
  return typeof n == "string" ? n : void 0;
}, _t = (e, t) => {
  const r = ye(e, t);
  return r == null ? void 0 : r.state;
}, B = (e, t = "hybrid") => e === "history" || e === "statistics" || e === "hybrid" ? e : e === "auto" || t === "auto" ? "hybrid" : t, Ir = 3e4, pi = 10 * 6e4, yi = 1440, bi = 1e4, vi = 2e3, Lr = 40, Ye = /* @__PURE__ */ new Map(), mt = /* @__PURE__ */ new Map(), ft = /* @__PURE__ */ new Map(), cr = /* @__PURE__ */ new WeakMap(), dr = /* @__PURE__ */ new WeakMap(), hr = /* @__PURE__ */ new WeakMap(), ur = /* @__PURE__ */ new WeakMap(), xt = (e, t = yi) => {
  if (e.length <= t)
    return e;
  if (t <= 2)
    return [e[0], e[e.length - 1]];
  const r = e.slice(1, -1), n = Math.max(1, Math.floor((t - 2) / 2)), i = r.length / n, s = [e[0]];
  for (let l = 0; l < n; l += 1) {
    const c = Math.floor(l * i), d = Math.max(c + 1, Math.floor((l + 1) * i)), h = r.slice(c, d);
    if (h.length === 0)
      continue;
    let _ = h[0], u = h[0];
    for (const m of h)
      m.value < _.value && (_ = m), m.value > u.value && (u = m);
    if (_.ts <= u.ts ? (s.push(_), u !== _ && s.push(u)) : (s.push(u), _ !== u && s.push(_)), s.length >= t - 1)
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
}, Br = (e, t) => {
  const r = t ? bi : vi;
  return !Number.isFinite(e) || e <= 0 || r <= 1 ? Math.max(0, Math.floor(e)) : Math.max(0, Math.floor(e / r) * r);
}, gi = (e) => {
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
}, Ue = (e, t, r) => {
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
  }), xt(i);
}, wi = (e, t, r = Date.now()) => {
  if (!Array.isArray(e))
    return { entityId: null, points: [] };
  const n = [];
  let i = null;
  for (const a of e) {
    if (!a || typeof a != "object")
      continue;
    const l = a;
    i === null && typeof l.entity_id == "string" && l.entity_id.length > 0 && (i = l.entity_id);
    const c = Number(l.state), d = gi(l);
    !Number.isFinite(c) || d === null || n.push({ ts: d, value: c });
  }
  const s = r - t, o = n.filter((a) => a.ts >= s).sort((a, l) => a.ts - l.ts);
  return {
    entityId: i,
    points: xt(o)
  };
}, Je = (e, t, r) => `${e}|${t}|${r}`, V = (e) => e.map((t) => ({ ts: t.ts, value: t.value })), pt = (e) => {
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
}, Si = (e) => pt(e.start) ?? pt(e.end) ?? pt(e.last_reset), xi = (e) => {
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
}, Ci = (e, t, r = Date.now()) => {
  if (!Array.isArray(e))
    return [];
  const n = [];
  e.forEach((o) => {
    if (!o || typeof o != "object")
      return;
    const a = o, l = Si(a), c = xi(a);
    l === null || c === null || n.push({ ts: l, value: c });
  });
  const i = r - t, s = n.filter((o) => o.ts >= i).sort((o, a) => o.ts - a.ts);
  return xt(s);
}, Hr = (e) => {
  const t = ur.get(e);
  if (t)
    return t;
  const r = /* @__PURE__ */ new Map();
  return ur.set(e, r), r;
}, Dr = (e, t, r) => {
  const n = Hr(e), i = n.get(t);
  return i ? i.expiresAt <= r ? (n.delete(t), null) : i.supported : null;
}, _r = (e, t, r, n) => {
  Hr(e).set(t, {
    supported: r,
    expiresAt: n + pi
  });
}, $i = (e) => {
  const t = cr.get(e);
  if (t)
    return t;
  const r = /* @__PURE__ */ new Map();
  return cr.set(e, r), r;
}, Fr = async (e, t, r, n, i, s) => {
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
    const m = wi(_, r, i), x = t[u], b = m.entityId ?? x;
    b && (h[b] = m.points);
  }), t.forEach((_) => {
    _ in h || (h[_] = []), s && Ye.set(Je("history", _, r), {
      expiresAt: i + Ir,
      points: V(h[_])
    });
  }), h;
}, Ti = (e, t, r, n, i) => {
  const s = $i(e);
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
        const h = await Fr(
          e,
          d,
          n,
          i,
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
    }, Lr));
  });
}, Ei = (e) => {
  const t = dr.get(e);
  if (t)
    return t;
  const r = /* @__PURE__ */ new Map();
  return dr.set(e, r), r;
}, Mi = async (e, t, r, n) => {
  const i = [...n], s = new Date(t).toISOString(), o = new Date(r).toISOString(), a = hr.get(e), l = a ? [a] : ["recorder/statistics_during_period", "history/statistics_during_period"];
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
      return hr.set(e, d), h;
    } catch (h) {
      c = h;
    }
  throw c;
}, Ri = async (e, t) => {
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
}, Vr = async (e, t, r, n, i, s) => {
  let o;
  try {
    o = await Mi(e, n, i, t);
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
    const m = Ci(a[u], r, i);
    l[u] = m, _r(e, u, !0, i), s && Ye.set(Je("statistics", u, r), {
      expiresAt: i + Ir,
      points: V(m)
    });
  });
  const h = [];
  d.forEach((u) => {
    const m = Dr(e, u, i);
    if (m !== !0) {
      if (m === !1) {
        c.add(u);
        return;
      }
      h.push(u);
    }
  });
  const _ = await Ri(e, h);
  return _ !== null ? h.forEach((u) => {
    const m = _.has(u);
    _r(e, u, m, i), m || c.add(u);
  }) : h.forEach((u) => {
    c.add(u);
  }), {
    pointsByEntity: l,
    unsupportedEntityIds: c
  };
}, zi = (e, t, r, n, i) => {
  const s = Ei(e);
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
        const h = await Vr(
          e,
          d,
          n,
          i,
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
    }, Lr));
  });
}, Ur = async (e, t, r, n) => {
  const i = e.callApi, s = Array.from(new Set(t.filter((b) => b.length > 0)));
  if (!i || s.length === 0)
    return {};
  const o = Date.now(), a = typeof n == "number" && Number.isFinite(n) ? Math.max(o - r, Math.floor(n)) : o - r, l = a <= o - r + 1e3, c = Br(a, l), d = {}, h = [];
  if (s.forEach((b) => {
    if (l) {
      const y = Je("history", b, r), g = Ye.get(y);
      if (g && g.expiresAt > o) {
        d[b] = V(g.points);
        return;
      }
    }
    h.push(b);
  }), h.length === 0)
    return d;
  if (l) {
    const b = `${c}|${r}`, y = await Ti(
      i,
      b,
      h,
      r,
      c
    );
    return h.forEach((g) => {
      d[g] = V(y[g] ?? []);
    }), d;
  }
  const _ = [...h].sort(), u = `${c}|${r}|${_.join(",")}`, m = mt.get(u);
  if (m) {
    const b = await m;
    return h.forEach((y) => {
      d[y] = V(b[y] ?? []);
    }), d;
  }
  const x = (async () => Fr(
    i,
    h,
    r,
    c,
    o,
    l
  ))();
  mt.set(u, x);
  try {
    const b = await x;
    return h.forEach((y) => {
      d[y] = V(b[y] ?? []);
    }), d;
  } finally {
    mt.delete(u);
  }
}, jr = async (e, t, r, n) => {
  const i = e.callWS, s = Array.from(new Set(t.filter((g) => g.length > 0)));
  if (!i || s.length === 0)
    return {
      pointsByEntity: {},
      unsupportedEntityIds: new Set(s)
    };
  const o = Date.now(), a = typeof n == "number" && Number.isFinite(n) ? Math.max(o - r, Math.floor(n)) : o - r, l = a <= o - r + 1e3, c = Br(a, l), d = {}, h = [], _ = /* @__PURE__ */ new Set();
  if (s.forEach((g) => {
    if (Dr(i, g, o) === !1) {
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
    const g = `${c}|${r}`, v = await zi(
      i,
      g,
      h,
      r,
      c
    );
    return u(v);
  }
  const m = [...h].sort(), x = `${c}|${r}|${m.join(",")}`, b = ft.get(x);
  if (b) {
    const g = await b;
    return u(g);
  }
  const y = (async () => Vr(
    i,
    h,
    r,
    c,
    o,
    l
  ))();
  ft.set(x, y);
  try {
    const g = await y;
    return u(g);
  } finally {
    ft.delete(x);
  }
}, Ai = async (e, t, r, n) => {
  const i = await jr(
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
  const a = await Ur(
    e,
    o,
    r,
    n
  );
  return o.forEach((l) => {
    s[l] = V(a[l] ?? []);
  }), s;
}, ve = async (e, t, r, n) => {
  const i = B(n == null ? void 0 : n.dataSource, "hybrid");
  return i === "history" ? Ur(e, t, r, n == null ? void 0 : n.startMs) : i === "statistics" ? (await jr(
    e,
    t,
    r,
    n == null ? void 0 : n.startMs
  )).pointsByEntity : Ai(e, t, r, n == null ? void 0 : n.startMs);
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
  if (t in mr)
    return `var(--rgb-${t}, ${mr[t]})`;
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
}, $t = (e, t = "") => {
  const r = Ct(e);
  if (r)
    return `rgb(${r})`;
  if (typeof e == "string" && e.trim().length > 0) {
    const n = e.trim(), i = n.toLowerCase();
    if (i !== "none" && i !== "default")
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
  const n = e.map((i) => ({
    x: i.x / 100 * t,
    y: i.y / 100 * r,
    value: i.value
  }));
  return Pi(n, t);
}, Pi = (e, t) => {
  if (e.length <= 3)
    return e;
  const r = Math.max(24, Math.min(e.length, Math.round(t)));
  if (e.length <= r)
    return fr(e);
  const n = [];
  n.push(e[0]);
  const i = (e.length - 1) / (r - 1);
  for (let s = 1; s < r - 1; s += 1) {
    const o = Math.floor(s * i), a = Math.max(o + 1, Math.floor((s + 1) * i)), l = e.slice(o, Math.min(e.length, a));
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
  return n.push(e[e.length - 1]), fr(n);
}, fr = (e) => {
  if (e.length <= 3)
    return e;
  const t = [e[0]];
  for (let r = 1; r < e.length - 1; r += 1) {
    const n = e[r - 1], i = e[r], s = e[r + 1];
    t.push({
      x: i.x,
      y: (n.y + i.y * 2 + s.y) / 4,
      value: (n.value + i.value * 2 + s.value) / 4
    });
  }
  return t.push(e[e.length - 1]), t;
}, pr = {
  "": 0,
  k: 1,
  m: -1,
  M: 2,
  G: 3,
  T: 4
}, bt = ["", "k", "M", "G", "T"], ee = (e, t) => {
  const r = typeof e == "number" && Number.isFinite(e) ? Math.round(e) : t;
  return Math.max(0, Math.min(4, r));
}, le = (e) => {
  if (!e)
    return null;
  const t = e.trim();
  if (t.length === 0)
    return null;
  if (t.endsWith("Wh")) {
    const r = t.slice(0, -2), i = pr[r === "K" ? "k" : r];
    return i === void 0 ? null : {
      family: "energy",
      prefixPower: i,
      factor: Math.pow(1e3, i),
      canonicalUnit: "Wh"
    };
  }
  if (t.endsWith("W")) {
    const r = t.slice(0, -1), i = pr[r === "K" ? "k" : r];
    return i === void 0 ? null : {
      family: "power",
      prefixPower: i,
      factor: Math.pow(1e3, i),
      canonicalUnit: "W"
    };
  }
  return null;
}, Oi = (e, t) => {
  const r = Math.max(0, Math.min(bt.length - 1, t)), n = bt[r] ?? "";
  return e === "energy" ? `${n}Wh` : `${n}W`;
}, ki = (e) => {
  if (!Number.isFinite(e) || e <= 0)
    return 0;
  let t = 0, r = e;
  for (; r >= 1e3 && t < bt.length - 1; )
    r /= 1e3, t += 1;
  return t;
}, Mt = (e, t, r, n) => {
  const i = n.nullWithUnit === !0;
  if (e === null)
    return i && t ? `-- ${t}` : "--";
  const s = le(t);
  if (!n.enabled || !s)
    return `${e.toFixed(r)} ${t}`.trim();
  const o = e < 0 ? "-" : "", a = Math.abs(e) * s.factor, l = ki(a), c = Oi(s.family, l), d = a / Math.pow(1e3, l), h = l === 0 ? n.baseDecimals : n.prefixedDecimals;
  return `${o}${d.toFixed(h)} ${c}`.trim();
}, Ni = (e) => {
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
    const o = le(e[s]);
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
}, Pe = "0.1.20";
var Ii = Object.defineProperty, Li = Object.getOwnPropertyDescriptor, Rt = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Li(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && Ii(t, r, i), i;
};
const Bi = 4, Hi = 8, yr = 2, Di = (e, t) => {
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
  schema: Array.from({ length: n }, (i, s) => ({
    type: "expandable",
    name: "",
    title: `Block ${s + 1}`,
    icon: "mdi:view-grid-outline",
    expanded: !1,
    schema: Di(e, s + 1)
  }))
}), J = (e, t, r) => ({
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
}), Fi = {
  select: {
    mode: "dropdown",
    options: [
      { label: "Hybrid (auto fallback)", value: "hybrid" },
      { label: "Statistics (fastest)", value: "statistics" },
      { label: "History (raw)", value: "history" }
    ]
  }
}, Vi = [
  { name: "name", selector: { text: {} } },
  J("Solar node", "mdi:weather-sunny", [
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
  J("Grid node", "mdi:transmission-tower", [
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
  J("Grid 2 node", "mdi:transmission-tower", [
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
  J("Home node", "mdi:home-lightning-bolt", [
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
  J("Battery node", "mdi:battery", [
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
  J("Battery 2 node", "mdi:battery-outline", [
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
  J("Card visuals", "mdi:palette-outline", [
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
  J("Trend settings", "mdi:chart-line", [
    { name: "shared_trend_scale", selector: { boolean: {} } },
    { name: "trend_data_source", selector: Fi }
  ]),
  Le("solar", "Solar sub blocks", "mdi:solar-power-variant", Bi),
  Le("grid", "Grid 1 sub blocks", "mdi:transmission-tower", yr),
  Le("grid_secondary", "Grid 2 sub blocks", "mdi:transmission-tower", yr),
  Le("home", "Home sub blocks", "mdi:flash", Hi),
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
], Ui = {
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
      return Ui[t] ?? t;
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
        .schema=${Vi}
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
  P()
], je.prototype, "_config", 2);
je = Rt([
  he("power-pilz-energy-card-editor")
], je);
var ji = Object.defineProperty, Wi = Object.getOwnPropertyDescriptor, Y = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Wi(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && ji(t, r, i), i;
};
const F = 0.01, we = 1, fe = 1440 * 60 * 1e3, br = 300 * 1e3, vr = 60 * 1e3, Gi = 350, gr = 4, wr = 8, yt = 2, qi = 260, Xi = 220, Ki = "var(--rgb-primary-text-color, 33, 33, 33)", Yi = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", ");
let j = class extends U {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._showSubBlocks = !1, this._compactSubBlocks = !1, this._subNodeConnectorSegments = [], this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._isVisible = !1, this._liveRuntimeActive = !1, this._trendDrawConfig = {}, this.handleCardClick = () => {
      this.executeTapAction();
    }, this.handleCardKeyDown = (e) => {
      e.key !== "Enter" && e.key !== " " || (e.preventDefault(), this.executeTapAction());
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
    const t = e.home_entity ?? e.consumption_entity ?? "sensor.dev_home_power", r = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : we, n = ee(e.decimals_base_unit, r), i = ee(e.decimals_prefixed_unit, r);
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
      decimals_prefixed_unit: i,
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
    const e = this._config, t = e.decimals ?? we, r = e.home_visible !== !1, n = e.solar_visible !== !1, i = e.grid_visible !== !1, s = i && e.grid_secondary_visible === !0, o = e.battery_visible !== !1, a = o && e.battery_secondary_visible === !0, l = this.normalizeBatteryDualAlignment(e.battery_dual_alignment), c = L(this.hass, e.home_entity), d = n ? L(this.hass, e.solar_entity) : null, h = i ? L(this.hass, e.grid_entity) : null, _ = s ? L(this.hass, e.grid_secondary_entity) : null, u = o ? L(this.hass, e.battery_entity) : null, m = L(this.hass, e.battery_percentage_entity), x = a ? L(this.hass, e.battery_secondary_entity) : null, b = L(this.hass, e.battery_secondary_percentage_entity), y = e.unit ?? "kW", g = I(this.hass, e.solar_entity) ?? y, v = I(this.hass, e.grid_entity) ?? y, w = I(this.hass, e.grid_secondary_entity) ?? y, S = I(this.hass, e.battery_entity) ?? y, f = I(this.hass, e.battery_secondary_entity) ?? y, p = e.home_auto_calculate === !0 ? this.resolveAutoHomeUnit(e, y) : I(this.hass, e.home_entity) ?? y, C = e.home_auto_calculate === !0 ? this.computeAutoHomeValueFromNodeValues(
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
        battery_secondary: f
      },
      p
    ) : c, E = m !== null ? I(this.hass, e.battery_percentage_entity) ?? "%" : S, R = b !== null ? I(this.hass, e.battery_secondary_percentage_entity) ?? "%" : f, z = this.toUnidirectionalFlow(d), A = this.toUnidirectionalFlow(C), H = this.toBidirectionalFlow(h), D = this.toBidirectionalFlow(_), ne = this.sumComparableValues([
      { value: h, unit: v },
      { value: _, unit: w }
    ]), cn = h === null && _ === null ? "none" : this.toBidirectionalFlow(ne), dn = this.toBidirectionalFlow(u), hn = this.toBidirectionalFlow(x), un = this.sumComparableValues([
      { value: u, unit: S },
      { value: x, unit: f }
    ]), _n = u === null && x === null ? "none" : this.toBidirectionalFlow(un), mn = this.resolveTapAction(e), Ze = !this.isEditorPreview() && mn.action !== "none", fn = this.iconColorStyle(e.solar_icon_color), pn = this.iconColorStyle(e.grid_icon_color), yn = this.iconColorStyle(e.grid_secondary_icon_color), bn = this.iconColorStyle(e.home_icon_color), vn = this.iconShapeStyle(e.core_icon_color), Qe = n ? this.collectSubBlocks("solar", e) : [], It = i ? this.collectSubBlocks("grid", e) : [], Lt = s ? this.collectSubBlocks("grid_secondary", e) : [], et = r ? this.collectSubBlocks("home", e) : [], tt = new Set(et.map((O) => O.index)), _e = new Set(Qe.map((O) => O.index)), gn = tt.has(7) && tt.has(8), wn = [5, 6, 7, 8].some((O) => tt.has(O)), Sn = _e.has(1) && _e.has(2) && !_e.has(3) && !_e.has(4), xn = _e.has(3) && _e.has(4), Bt = s && (Sn && gn || xn && wn), Cn = s && !Bt, rt = et.some((O) => O.index >= 7), Ht = this.homeSubPositions(rt), Dt = this.gridSubPositions(s), Ft = this.gridSecondarySubPositions(), Vt = this.solarSubPositions(
      rt,
      Cn,
      Bt
    ), Ut = et.filter((O) => O.index <= (rt ? 8 : 6)), nt = i ? { col: 1, row: s ? 2 : 3, colSpan: 2, rowSpan: 2 } : null, it = s ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 } : null, st = o ? {
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
      i,
      s,
      o,
      a,
      nt,
      it,
      st,
      ot,
      Qe,
      It,
      Lt,
      Ut,
      Vt,
      Dt,
      Ft,
      Ht
    ), at = n ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, N) : null, Oe = nt ? this.normalizePlacement(nt, N) : null, ke = it ? this.normalizePlacement(it, N) : null, lt = r ? this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, N) : null, Ne = st ? this.normalizePlacement(st, N) : null, Ie = ot ? this.normalizePlacement(ot, N) : null, jt = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, N), $n = this.normalizePositions(Vt, N), Tn = this.normalizePositions(Dt, N), En = this.normalizePositions(Ft, N), Mn = this.normalizePositions(Ht, N), Wt = this.normalizeBatteryThreshold(e.battery_low_threshold), Gt = !!e.battery_low_alert, qt = this.normalizeBatteryThreshold(e.battery_secondary_low_threshold), Xt = !!e.battery_secondary_low_alert, Kt = Gt && m !== null && m <= Wt, Rn = this.iconColorStyle(Kt ? "red" : e.battery_icon_color), zn = this.batteryIcon(m, u, e.battery_icon), Yt = Xt && b !== null && b <= qt, An = this.iconColorStyle(
      Yt ? "red" : e.battery_secondary_icon_color
    ), Pn = this.batteryIcon(
      b,
      x,
      e.battery_secondary_icon
    ), On = { "--flow-color-rgb": this.toRgbCss(e.flow_color) ?? Ki }, me = this.resolveColor("purple"), kn = this.resolveColor(e.solar_trend_color, me), Nn = this.resolveColor(e.grid_trend_color, me), In = this.resolveColor(e.grid_secondary_trend_color, me), Ln = this.resolveColor(e.home_trend_color, me), Bn = this.resolveColor(e.battery_trend_color, me), Hn = this.resolveColor(e.battery_secondary_trend_color, me), Jt = this.resolveColor("red"), Dn = Gt && (e.battery_percentage_entity || m !== null) ? Wt : null, Fn = m ?? u, Vn = Xt && (e.battery_secondary_percentage_entity || b !== null) ? qt : null, Un = b ?? x, jn = this.buildFlowSegments(
      lt,
      jt,
      at,
      [
        ...Oe ? [{ placement: Oe, direction: H }] : [],
        ...ke ? [{ placement: ke, direction: D }] : []
      ],
      cn,
      [
        ...Ne ? [{ placement: Ne, direction: dn }] : [],
        ...Ie ? [{ placement: Ie, direction: hn }] : []
      ],
      _n,
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
      ...On,
      "--grid-columns": `${N.cols}`,
      "--grid-rows": `${N.rows}`,
      "--grid-aspect": `${N.cols} / ${N.rows}`
    })}
          >
            ${jn.map(
      (O) => this.renderFlowLine(O.orientation, O.direction, {
        ...O.orientation === "horizontal" ? {
          left: `${O.left}%`,
          top: `calc(${O.top}% - (var(--flow-line-size) / 2))`,
          width: `${O.width}%`
        } : {
          left: `calc(${O.left}% - (var(--flow-line-size) / 2))`,
          top: `${O.top}%`,
          height: `${O.height}%`
        }
      })
    )}
            ${this.renderSubNodeConnectors()}

            ${n && at ? $`
                  <div
                    class="energy-value solar ${d === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(at))}
                  >
                    ${this.renderTrend("solar", d, g, !!e.solar_trend, kn, null, "")}
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

            ${i && Oe ? $`
                  <div
                    class="energy-value grid ${h === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Oe))}
                  >
                    ${this.renderTrend("grid", h, v, !!e.grid_trend, Nn, null, "")}
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

            ${s && ke ? $`
                  <div
                    class="energy-value grid-secondary ${_ === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(ke))}
                  >
                    ${this.renderTrend(
      "grid_secondary",
      _,
      w,
      !!e.grid_secondary_trend,
      In,
      null,
      ""
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${M(yn)}
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
                    ${this.renderTrend("home", C, p, !!e.home_trend, Ln, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.home_icon ?? "mdi:home-lightning-bolt"}
                        style=${M(bn)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(C, p, t)}</div>
                      <div class="energy-label">${e.home_label}</div>
                    </div>
                  </div>
                ` : T}

            ${this._showSubBlocks ? this.renderSubNodes("solar", Qe, $n, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("grid", It, Tn, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("grid_secondary", Lt, En, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("home", Ut, Mn, t) : T}

            ${o && Ne ? $`
                  <div
                    class="energy-value battery ${u === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Ne))}
                  >
                    ${this.renderTrend(
      "battery",
      Fn,
      E,
      !!e.battery_trend,
      Bn,
      Dn,
      Jt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon class="energy-icon" .icon=${zn} style=${M(Rn)}></ha-icon>
                        ${m !== null ? $`
                              <div class="battery-percentage ${Kt ? "alert" : ""}">
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
      Un,
      R,
      !!e.battery_secondary_trend,
      Hn,
      Vn,
      Jt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${Pn}
                          style=${M(An)}
                        ></ha-icon>
                        ${b !== null ? $`
                              <div class="battery-percentage ${Yt ? "alert" : ""}">
                                ${this.formatBatteryPercentage(b)}
                              </div>
                            ` : T}
                      </div>
                      <div class="energy-number">${this.formatValue(x, f, t)}</div>
                      <div class="energy-label">${e.battery_secondary_label}</div>
                    </div>
                  </div>
                ` : T}

            <div class="home-core" style=${M(this.gridPlacementStyle(jt))}>
              <div class="home-core-icon" style=${M(vn)}>
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
    const r = [], n = e === "solar" ? "mdi:solar-power-variant" : e === "home" ? "mdi:flash" : "mdi:transmission-tower", i = e === "solar" ? "Solar" : e === "home" ? "Home" : e === "grid" ? "Grid" : "Grid 2", s = e === "solar" ? gr : e === "home" ? wr : yt;
    for (let h = 1; h <= s; h += 1) {
      const _ = t[`${e}_sub_${h}_enabled`] === !0, u = this.readConfigString(t[`${e}_sub_${h}_entity`]);
      !_ || !u || r.push({
        key: `${e}_${h}`,
        index: h,
        icon: this.readConfigString(t[`${e}_sub_${h}_icon`]) ?? n,
        iconStyle: this.iconColorStyle(t[`${e}_sub_${h}_icon_color`]),
        label: this.readConfigString(t[`${e}_sub_${h}_label`]) ?? `${i} ${h}`,
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
    return Object.entries(e).forEach(([n, i]) => {
      r[Number(n)] = {
        row: i.row - t.minRow + 1,
        col: i.col - t.minCol + 1
      };
    }), r;
  }
  computeGridBounds(e, t, r, n, i, s, o, a, l, c, d, h, _, u, m, x, b, y) {
    const g = [{ col: 3, row: 3, colSpan: 2, rowSpan: 2 }];
    e && g.push({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }), t && g.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }), r && o && g.push(o), n && a && g.push(a), i && l && g.push(l), s && c && g.push(c), d.forEach((p) => {
      const C = m[p.index];
      C && g.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), h.forEach((p) => {
      const C = x[p.index];
      C && g.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), _.forEach((p) => {
      const C = b[p.index];
      C && g.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), u.forEach((p) => {
      const C = y[p.index];
      C && g.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    });
    const v = Math.min(...g.map((p) => p.col)), w = Math.max(...g.map((p) => p.col + (p.colSpan ?? 1) - 1)), S = Math.min(...g.map((p) => p.row)), f = Math.max(...g.map((p) => p.row + (p.rowSpan ?? 1) - 1));
    return {
      minCol: v,
      maxCol: w,
      minRow: S,
      maxRow: f,
      cols: w - v + 1,
      rows: f - S + 1
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
    const d = this.placementCenter(t, c), h = [], _ = (m, x, b, y) => {
      const g = Math.min(m, x), v = Math.abs(x - m);
      v <= F || h.push({
        orientation: "horizontal",
        direction: y,
        left: g,
        top: b,
        width: v,
        height: 0
      });
    }, u = (m, x, b, y) => {
      const g = Math.min(m, x), v = Math.abs(x - m);
      v <= F || h.push({
        orientation: "vertical",
        direction: y,
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
      const m = n.map((y) => ({
        direction: y.direction,
        center: this.placementCenter(y.placement, c)
      })).sort((y, g) => y.center.y - g.center.y), x = Math.min(...m.map((y) => y.center.x)), b = d.x - (d.x - x) * 0.5;
      _(d.x, b, d.y, i), m.forEach((y) => {
        const g = y.center.y > d.y + F ? this.reverseFlowDirection(y.direction) : y.direction;
        u(d.y, y.center.y, b, g), _(y.center.x, b, y.center.y, y.direction);
      });
    }
    if (s.length === 1) {
      const [{ placement: m, direction: x }] = s, b = this.placementCenter(m, c);
      u(d.y, b.y, d.x, x);
    } else if (s.length >= 2) {
      const m = s.map((y) => ({
        placement: y.placement,
        direction: y.direction,
        center: this.placementCenter(y.placement, c)
      })).sort((y, g) => y.center.y - g.center.y), x = Math.min(
        ...m.map((y) => (y.placement.row - 1) / c.rows * 100)
      ), b = Math.max(d.y + F, x);
      u(d.y, b, d.x, o), m.forEach((y) => {
        _(d.x, y.center.x, b, y.direction), u(b, y.center.y, y.center.x, y.direction);
      });
    }
    return h;
  }
  renderSubNodes(e, t, r, n) {
    return t.length === 0 ? T : $`
      ${t.map((i) => {
      const s = r[i.index];
      if (!s)
        return T;
      const o = {
        "grid-column": `${s.col}`,
        "grid-row": `${s.row}`
      }, a = this.formatValue(i.value, i.unit, n), l = this.splitFormattedValueAndUnit(a, i.unit);
      return $`
            <div
              class="energy-sub-value ${e}-sub sub-col-${s.col} ${this._compactSubBlocks ? "compact" : ""} ${i.value === null ? "missing" : ""}"
              data-key=${i.key}
              style=${M(o)}
            >
              <div class="energy-sub-content">
                <ha-icon class="energy-sub-icon" .icon=${i.icon} style=${M(i.iconStyle)}></ha-icon>
                <div class="energy-sub-number">${this._compactSubBlocks ? l.value : a}</div>
                <div class="energy-sub-unit">${l.unit}</div>
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
  homeComputationDependencies(e) {
    const t = [], r = (n, i) => {
      i && t.push({ role: n, entityId: i });
    };
    return e.solar_visible !== !1 && r("solar", this.readConfigString(e.solar_entity)), e.grid_visible !== !1 && (r("grid", this.readConfigString(e.grid_entity)), e.grid_secondary_visible === !0 && r("grid_secondary", this.readConfigString(e.grid_secondary_entity))), e.battery_visible !== !1 && (r("battery", this.readConfigString(e.battery_entity)), e.battery_secondary_visible === !0 && r("battery_secondary", this.readConfigString(e.battery_secondary_entity))), t;
  }
  resolveAutoHomeUnit(e, t) {
    const r = e.unit;
    if (r && r.trim().length > 0)
      return r;
    const n = this.homeComputationDependencies(e);
    for (const i of n) {
      const s = I(this.hass, i.entityId);
      if (s && s.trim().length > 0)
        return s;
    }
    return t;
  }
  computeAutoHomeValueFromNodeValues(e, t, r) {
    if (!Object.values(e).some((d) => d != null && Number.isFinite(d)))
      return null;
    const i = {};
    let s = 0;
    t && Object.keys(e).forEach((d) => {
      const h = e[d], _ = t[d];
      h != null && Number.isFinite(h) && (s += 1, _ && (i[d] = _));
    });
    const o = Object.keys(i).length === s ? Ni(i) : { comparable: !1, family: null, factors: {} }, a = o.comparable ? o.factors : void 0, l = (d) => {
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
      (i) => i.value !== null && Number.isFinite(i.value)
    );
    if (t.length === 0)
      return null;
    let r = null, n = 0;
    for (const i of t) {
      const s = le(i.unit);
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
    const r = Date.now(), n = r - fe, i = this._trendSeries[e] ?? [];
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
      if (o === a || Math.abs(s.value - i.value) <= F) {
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
        value: t
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
    var y, g;
    const n = Date.now() - fe, i = 0, s = 100, o = e.map((v) => v.value), a = (t == null ? void 0 : t.min) ?? Math.min(...o), l = (t == null ? void 0 : t.max) ?? Math.max(...o);
    if (!Number.isFinite(a) || !Number.isFinite(l))
      return [];
    const c = 20, d = 80, h = Math.max(l - a, F), _ = e.map((v) => {
      const w = Math.max(0, Math.min(100, (v.ts - n) / fe * 100)), S = i + w / 100 * (s - i), f = h <= F ? 0.5 : (v.value - a) / h, p = d - f * (d - c);
      return { x: S, y: p, value: v.value };
    }), u = ((y = _[0]) == null ? void 0 : y.x) ?? i, m = ((g = _[_.length - 1]) == null ? void 0 : g.x) ?? s, x = Math.max(0, m - u), b = 18;
    if (_.length >= 2 && x < b) {
      const v = s - b, w = Math.max(i, Math.min(v, m - b));
      if (x <= F) {
        const f = b / (_.length - 1);
        return _.map((p, C) => ({
          ...p,
          x: Math.max(i, Math.min(s, w + f * C))
        }));
      }
      const S = b / x;
      return _.map((f) => ({
        ...f,
        x: Math.max(i, Math.min(s, w + (f.x - u) * S))
      }));
    }
    return _;
  }
  toCanvasPoints(e, t, r) {
    return Et(e, t, r);
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
      const o = le(s.unit);
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
    const t = e.getBoundingClientRect(), r = t.width <= qi || t.height <= Xi;
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
    const s = e.getBoundingClientRect(), o = t == null ? void 0 : t.getBoundingClientRect(), a = r == null ? void 0 : r.getBoundingClientRect(), l = n == null ? void 0 : n.getBoundingClientRect(), c = i == null ? void 0 : i.getBoundingClientRect(), d = o ? o.left + o.width / 2 : 0, h = a ? a.top + a.height / 2 : 0, _ = l ? l.left + l.width / 2 : 0, u = c ? c.left + c.width / 2 : 0, m = (S) => S - s.left, x = (S) => S - s.top, b = (S) => Math.round(S * 10) / 10, y = [], g = (S, f, p, C) => {
      const E = Math.min(S, f), R = Math.abs(f - S);
      R <= 0.5 || y.push({
        node: C,
        left: b(E),
        top: b(p - 1),
        width: b(R),
        height: 2
      });
    }, v = (S, f, p, C) => {
      const E = Math.min(S, f), R = Math.abs(f - S);
      R <= 0.5 || y.push({
        node: C,
        left: b(p - 1),
        top: b(E),
        width: 2,
        height: b(R)
      });
    };
    o && this.renderRoot.querySelectorAll(".energy-sub-value.home-sub").forEach((S) => {
      const f = S.getBoundingClientRect(), p = f.top + f.height / 2, C = f.left + f.width / 2 < d ? f.right : f.left, E = p, R = p < o.top ? o.top : p > o.bottom ? o.bottom : p, z = m(d), A = x(E), H = x(R), D = m(C);
      g(D, z, A, "home"), v(A, H, z, "home");
    }), a && this.renderRoot.querySelectorAll(".energy-sub-value.solar-sub").forEach((S) => {
      const f = S.getBoundingClientRect(), p = f.left + f.width / 2, C = f.top + f.height / 2 < h ? f.bottom : f.top, E = p, R = p < a.left ? a.left : p > a.right ? a.right : p, z = x(h), A = m(E), H = m(R), D = x(C);
      v(D, z, A, "solar"), g(A, H, z, "solar");
    }), l && this.renderRoot.querySelectorAll(".energy-sub-value.grid-sub").forEach((S) => {
      const f = S.getBoundingClientRect(), p = f.top + f.height / 2, C = f.left + f.width / 2 < _ ? f.right : f.left, E = p, R = p < l.top ? l.top : p > l.bottom ? l.bottom : p, z = m(_), A = x(E), H = x(R), D = m(C);
      g(D, z, A, "grid"), v(A, H, z, "grid");
    }), c && this.renderRoot.querySelectorAll(".energy-sub-value.grid_secondary-sub").forEach((S) => {
      const f = S.getBoundingClientRect(), p = f.top + f.height / 2, C = f.left + f.width / 2 < u ? f.right : f.left, E = p, R = p < c.top ? c.top : p > c.bottom ? c.bottom : p, z = m(u), A = x(E), H = x(R), D = m(C);
      g(D, z, A, "grid_secondary"), v(A, H, z, "grid_secondary");
    }), y.length === this._subNodeConnectorSegments.length && y.every(
      (S, f) => {
        var p, C, E, R, z;
        return S.node === ((p = this._subNodeConnectorSegments[f]) == null ? void 0 : p.node) && S.left === ((C = this._subNodeConnectorSegments[f]) == null ? void 0 : C.left) && S.top === ((E = this._subNodeConnectorSegments[f]) == null ? void 0 : E.top) && S.width === ((R = this._subNodeConnectorSegments[f]) == null ? void 0 : R.width) && S.height === ((z = this._subNodeConnectorSegments[f]) == null ? void 0 : z.height);
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
    t.forEach((_, u) => {
      const m = this.prepareTrendCanvas(_);
      m && n.set(u, m);
    }), r.forEach((_, u) => {
      const m = this.prepareTrendCanvas(_);
      m && i.set(u, m);
    });
    const s = {};
    Object.keys(this._trendDrawConfig).forEach((_) => {
      const u = this._trendDrawConfig[_];
      if (!u)
        return;
      const m = this.trendPoints(_, u.currentValue);
      m.length >= 2 && (s[_] = m);
    });
    const o = ((h = this._config) == null ? void 0 : h.shared_trend_scale) === !0, a = o ? this.resolveSharedTrendUnitFactors(s) : null, l = o ? this.computeTrendValueRange(s, a ?? void 0) : null;
    let c = 0, d = 0;
    Object.keys(this._trendDrawConfig).forEach((_) => {
      const u = this._trendDrawConfig[_];
      if (!u)
        return;
      const m = n.get(_), x = i.get(_);
      if (!m || !x)
        return;
      const b = s[_];
      if (!b || b.length < 2)
        return;
      const y = (a == null ? void 0 : a[_]) ?? 1, g = a ? this.scaleTrendSeries(b, y) : b, v = this.toTrendCoordinates(g, l);
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
    this.teardownVisibilityObserver(), this.stopLiveRuntime(), super.disconnectedCallback();
  }
  updated(e) {
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
    !e && r - this._lastTrendRefresh < br || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(Yi) || this.hasEditorLikeAncestor();
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
    }, Gi));
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
      const a = this.perfNow(), l = {}, c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set();
      let x = Number.POSITIVE_INFINITY;
      const b = Date.now() - fe;
      for (const f of i) {
        if (f === "home" && r.home_auto_calculate === !0) {
          const z = this.homeComputationDependencies(r);
          if (z.length === 0) {
            l[f] = [];
            continue;
          }
          d.set(f, z), h.set(f, this.resolveAutoHomeUnit(r, r.unit ?? "kW"));
          const A = this._trendSeries[f] ?? [];
          if (e || A.length === 0) {
            _.add(f), z.forEach((ne) => {
              u.add(ne.entityId), m.delete(ne.entityId);
            });
            continue;
          }
          const H = ((s = A[A.length - 1]) == null ? void 0 : s.ts) ?? b, D = Math.max(b, H - vr);
          x = Math.min(x, D), z.forEach((ne) => {
            u.has(ne.entityId) || m.add(ne.entityId);
          });
          continue;
        }
        const p = this.trendEntityId(f, r);
        if (!p)
          continue;
        c.set(f, p);
        const C = this._trendSeries[f] ?? [];
        if (e || C.length === 0 || u.has(p)) {
          u.add(p), m.delete(p);
          continue;
        }
        if (u.has(p))
          continue;
        m.add(p);
        const E = ((o = C[C.length - 1]) == null ? void 0 : o.ts) ?? b, R = Math.max(b, E - vr);
        x = Math.min(x, R);
      }
      let y = 0;
      const g = u.size > 0 ? await (async () => {
        const f = this.perfNow(), p = await ve(
          this.hass,
          Array.from(u),
          fe,
          { dataSource: n }
        );
        return y = this.perfNow() - f, p;
      })() : {};
      let v = 0;
      const w = m.size > 0 ? await (async () => {
        const f = this.perfNow(), p = await ve(
          this.hass,
          Array.from(m),
          fe,
          {
            startMs: Number.isFinite(x) ? x : b,
            dataSource: n
          }
        );
        return v = this.perfNow() - f, p;
      })() : {};
      c.forEach((f, p) => {
        const C = this._trendSeries[p] ?? [];
        if (u.has(f)) {
          const E = g[f] ?? [];
          l[p] = E.length > 0 ? E : C.filter((R) => R.ts >= b);
          return;
        }
        if (m.has(f)) {
          const E = w[f] ?? [];
          l[p] = Ue(C, E, b);
          return;
        }
        l[p] = C.filter((E) => E.ts >= b);
      }), d.forEach((f, p) => {
        const C = this._trendSeries[p] ?? [], E = this.computeAutoHomeTrendFromFetchedDependencies(
          f,
          g,
          w,
          u,
          m,
          b,
          h.get(p) ?? r.unit ?? "kW"
        );
        if (_.has(p)) {
          l[p] = E.length > 0 ? E : C.filter((R) => R.ts >= b);
          return;
        }
        l[p] = Ue(C, E, b);
      });
      const S = this.sameTrendSeriesKeys(l, this._trendSeries) && Object.keys(l).every(
        (f) => this.areTrendSeriesEqual(l[f] ?? [], this._trendSeries[f] ?? [])
      );
      S || (this._trendSeries = l), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - a),
        force_full: e,
        nodes: i.length,
        full_entities: u.size,
        incremental_entities: m.size,
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
    return n("solar", gr), n("home", wr), n("grid", yt), n("grid_secondary", yt), Array.from(t);
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
      a[c.role] = d.filter((_) => Number.isFinite(_.ts) && Number.isFinite(_.value) && _.ts >= s).sort((_, u) => _.ts - u.ts);
      const h = I(this.hass, c.entityId);
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
    if (Math.abs(l) <= F)
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
    var n, i, s;
    return Mt(e, t, r, {
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
j.styles = Xe`
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
Y([
  k({ attribute: !1 })
], j.prototype, "hass", 2);
Y([
  k({ type: Boolean })
], j.prototype, "preview", 2);
Y([
  k({ type: Boolean })
], j.prototype, "editMode", 2);
Y([
  P()
], j.prototype, "_config", 2);
Y([
  P()
], j.prototype, "_trendSeries", 2);
Y([
  P()
], j.prototype, "_showSubBlocks", 2);
Y([
  P()
], j.prototype, "_compactSubBlocks", 2);
Y([
  P()
], j.prototype, "_subNodeConnectorSegments", 2);
j = Y([
  he("power-pilz-energy-card")
], j);
const G = (e) => {
  if (typeof e != "string")
    return;
  const t = e.trim();
  return t.length > 0 ? t : void 0;
}, Wr = (e, t) => {
  switch (e) {
    case 1:
      return G(t.entity_1);
    case 2:
      return G(t.entity_2);
    case 3:
      return G(t.entity_3);
    case 4:
      return G(t.entity_4);
    default:
      return;
  }
}, Gr = (e, t) => {
  switch (e) {
    case 1:
      return G(t.entity_1_name);
    case 2:
      return G(t.entity_2_name);
    case 3:
      return G(t.entity_3_name);
    case 4:
      return G(t.entity_4_name);
    default:
      return;
  }
}, qr = (e, t) => {
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
}, Kr = (e, t) => {
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
}, Yr = (e, t) => {
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
}, Jr = (e, t) => {
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
}, Zr = (e) => e === "column" ? "column" : "row", zt = (e, t = 24) => {
  const r = typeof e == "number" ? e : typeof e == "string" ? Number.parseInt(e, 10) : NaN;
  return r === 6 || r === 12 || r === 24 ? r : t;
}, At = (e) => typeof e != "number" || !Number.isFinite(e) ? 1.5 : Math.max(0.5, Math.min(6, e)), Qr = (e, t, r, n) => {
  var o;
  if (t)
    return t;
  const i = e[r], s = (o = i == null ? void 0 : i.attributes) == null ? void 0 : o.friendly_name;
  return typeof s == "string" && s.trim().length > 0 ? s.trim() : `Entity ${n}`;
}, en = (e, t, r, n) => {
  if (n)
    return Mt(e, t, r, {
      ...n,
      nullWithUnit: !0
    });
  if (e === null)
    return t ? `-- ${t}` : "--";
  const i = `${e.toFixed(r)} ${t}`.trim();
  return i.length > 0 ? i : "--";
}, Ji = 4, tn = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, Zi = {
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
}, Qi = (e) => ({
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
              default_color: tn[e] ?? "purple"
            }
          }
        }
      ]
    }
  ]
}), rn = (e = !1) => {
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
    ...Array.from({ length: Ji }, (r, n) => Qi(n + 1)),
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
}, K = (e) => {
  if (typeof e == "string")
    return e.length > 0 ? e : void 0;
}, nn = (e) => e === "column" ? "column" : "row", sn = (e) => zt(e), on = (e) => At(e), Be = (e, t, r) => {
  const n = e ?? t;
  return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : tn[r] ?? "purple";
}, an = (e) => ({
  trend_data_source: B(e.trend_data_source, "hybrid"),
  entity_1: K(e.entity_1) ?? K(e.entity),
  entity_1_name: K(e.entity_1_name),
  entity_1_enabled: e.entity_1_enabled ?? !0,
  entity_1_show_icon: e.entity_1_show_icon ?? !0,
  entity_1_icon: e.entity_1_icon ?? e.icon,
  entity_1_icon_color: e.entity_1_icon_color ?? e.icon_color,
  entity_1_trend_color: Be(e.entity_1_trend_color, e.trend_color, 1),
  entity_2: K(e.entity_2),
  entity_2_name: K(e.entity_2_name),
  entity_2_enabled: e.entity_2_enabled ?? !1,
  entity_2_show_icon: e.entity_2_show_icon ?? !0,
  entity_2_icon: e.entity_2_icon,
  entity_2_trend_color: Be(e.entity_2_trend_color, void 0, 2),
  entity_3: K(e.entity_3),
  entity_3_name: K(e.entity_3_name),
  entity_3_enabled: e.entity_3_enabled ?? !1,
  entity_3_show_icon: e.entity_3_show_icon ?? !0,
  entity_3_icon: e.entity_3_icon,
  entity_3_trend_color: Be(e.entity_3_trend_color, void 0, 3),
  entity_4: K(e.entity_4),
  entity_4_name: K(e.entity_4_name),
  entity_4_enabled: e.entity_4_enabled ?? !1,
  entity_4_show_icon: e.entity_4_show_icon ?? !0,
  entity_4_icon: e.entity_4_icon,
  entity_4_trend_color: Be(e.entity_4_trend_color, void 0, 4)
}), ln = (e, t = {}) => {
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
  return r.match(/^entity_(\d+)$/) ? "Sensor" : t[r] ?? Zi[r] ?? r;
};
var es = Object.defineProperty, ts = Object.getOwnPropertyDescriptor, Pt = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? ts(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && es(t, r, i), i;
};
const rs = rn(!1);
let We = class extends U {
  constructor() {
    super(...arguments), this.computeLabel = (e) => ln(e), this.valueChanged = (e) => {
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
      legend_layout: nn(e.legend_layout),
      timeframe_hours: sn(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      decimals: e.decimals ?? 1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: e.decimals_base_unit ?? e.decimals ?? 1,
      decimals_prefixed_unit: e.decimals_prefixed_unit ?? e.decimals ?? 1,
      line_thickness: on(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...an(e)
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
        .schema=${rs}
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
  P()
], We.prototype, "_config", 2);
We = Pt([
  he("power-pilz-graph-card-editor")
], We);
var ns = Object.defineProperty, is = Object.getOwnPropertyDescriptor, te = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? is(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && ns(t, r, i), i;
};
const Se = 1, Sr = 24, xr = 300 * 1e3, ss = 60 * 1e3, os = 350, He = 0.01, xe = 4, as = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", ls = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), Cr = {
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
      timeframe_hours: Sr,
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
      decimals: Se,
      decimals_base_unit: Se,
      decimals_prefixed_unit: Se
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Se, r = ee(e.decimals_base_unit, t), n = ee(e.decimals_prefixed_unit, t), i = this.readConfigString(e.entity), s = this.readConfigString(e.icon), o = this.readConfigString(e.entity_1) ?? i ?? "sensor.dev_home_power";
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
      return $`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return $``;
    const e = this._config, t = e.decimals ?? Se, r = this.normalizeLineThickness(e.line_thickness), n = this.collectSeriesEntries(e, t), i = this.normalizeLegendLayout(e.legend_layout), s = e.hover_enabled !== !1, o = this._hoverState, a = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, l = a > 0 ? { top: `${a}px` } : {}, c = o ? {
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
          ${s && o ? $`<div class="hover-dot" aria-hidden="true" style=${M(c)}></div>` : T}

          <div class="content">
            <div class="series-list layout-${i}">
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
      const i = n, s = this.slotEnabled(i, e), o = this.slotEntityId(i, e);
      if (!s || !o)
        continue;
      const a = this.entityName(this.slotCustomName(i, e), o, n), l = L(this.hass, o), c = e.unit ?? I(this.hass, o) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(i, e), _ = this.iconStyle(this.slotIconColor(i, e)), u = this.resolveColor(Cr[i], as), m = this.resolveColor(this.slotTrendColor(i, e), u);
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
        iconStyle: _,
        trendColor: m
      });
    }
    return r;
  }
  slotEntityId(e, t) {
    return Wr(e, t);
  }
  slotCustomName(e, t) {
    return Gr(e, t);
  }
  slotEnabled(e, t) {
    return qr(e, t);
  }
  slotShowIcon(e, t) {
    return Xr(e, t);
  }
  slotIcon(e, t) {
    return Kr(e, t);
  }
  slotIconColor(e, t) {
    return Yr(e, t);
  }
  slotTrendColor(e, t) {
    return Jr(e, t);
  }
  entityName(e, t, r) {
    return Qr(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    var n, i, s;
    return en(e, t, r, {
      enabled: ((n = this._config) == null ? void 0 : n.auto_scale_units) === !0,
      baseDecimals: ((i = this._config) == null ? void 0 : i.decimals_base_unit) ?? r,
      prefixedDecimals: ((s = this._config) == null ? void 0 : s.decimals_prefixed_unit) ?? r
    });
  }
  convertSharedScaleHoverValue(e, t) {
    if (!this._sharedScaleCanonical)
      return t;
    const r = this._sharedScaleFactors[e];
    return typeof r != "number" || !Number.isFinite(r) || r <= 0 ? t : t / r;
  }
  readConfigString(e) {
    return G(e);
  }
  normalizeLegendLayout(e) {
    return Zr(e);
  }
  normalizeTimeframeHours(e) {
    return zt(e, Sr);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return At(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : Cr[r];
  }
  iconStyle(e) {
    return Tt(e);
  }
  resolveColor(e, t = "") {
    return $t(e, t);
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
    var g, v;
    const i = Date.now() - t, s = 0, o = 100, a = e.map((w) => w.value), l = (r == null ? void 0 : r.min) ?? Math.min(...a), c = (r == null ? void 0 : r.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, _ = Math.max(c - l, He), u = e.map((w) => {
      const S = Math.max(0, Math.min(100, (w.ts - i) / t * 100)), f = s + S / 100 * (o - s), p = _ <= He ? 0.5 : (w.value - l) / _, C = h - p * (h - d);
      return { x: f, y: C, value: w.value };
    }), m = ((g = u[0]) == null ? void 0 : g.x) ?? s, x = ((v = u[u.length - 1]) == null ? void 0 : v.x) ?? o, b = Math.max(0, x - m), y = 18;
    if (u.length >= 2 && b < y) {
      const w = o - y, S = Math.max(s, Math.min(w, x - y));
      if (b <= He) {
        const p = y / (u.length - 1);
        return u.map((C, E) => ({
          ...C,
          x: Math.max(s, Math.min(o, S + p * E))
        }));
      }
      const f = y / b;
      return u.map((p) => ({
        ...p,
        x: Math.max(s, Math.min(o, S + (p.x - m) * f))
      }));
    }
    return u;
  }
  toCanvasPoints(e, t, r) {
    return Et(e, t, r);
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
    Object.keys(e).map((s) => Number(s)).filter((s) => Number.isFinite(s) && s >= 1 && s <= xe).forEach((s) => {
      const o = s, a = this._drawConfigs.find((c) => c.slot === o);
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
    const n = this.prepareTrendCanvas(t), i = this.prepareTrendCanvas(r);
    if (!n || !i) {
      this._linePointsBySlot = {}, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const s = ((x = this._config) == null ? void 0 : x.fill_area_enabled) !== !1, o = this.trendWindowMs(this._config), a = {};
    this._drawConfigs.forEach((y) => {
      const g = this.trendPoints(y.slot, y.currentValue);
      g.length >= 2 && (a[y.slot] = g);
    });
    const l = ((b = this._config) == null ? void 0 : b.shared_trend_scale) === !0, c = l ? this.resolveSharedScaleFactors(a) : null;
    this._sharedScaleCanonical = c !== null, this._sharedScaleFactors = c ?? {};
    const d = l ? this.computeTrendValueRange(a, c ?? void 0) : null, h = {};
    let _ = 0, u = 0;
    [...this._drawConfigs].sort((y, g) => g.slot - y.slot).forEach((y) => {
      const g = a[y.slot];
      if (!g || g.length < 2)
        return;
      const v = (c == null ? void 0 : c[y.slot]) ?? 1, w = c ? this.scaleTrendSeries(g, v) : g, S = this.toTrendCoordinates(w, o, d);
      if (S.length < 2)
        return;
      const f = this.toCanvasPoints(S, n.width, n.height), p = this.toCanvasPoints(S, i.width, i.height);
      s && this.drawTrendArea(n.ctx, f, y.color, n.height), this.drawTrendLine(i.ctx, p, y.color, y.lineWidth), h[y.slot] = p, _ += 1, u += p.length;
    }), this._linePointsBySlot = h, this._hoverState && !h[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: _,
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
      return { x: t, y: r.y, value: r.value };
    if (t >= n.x)
      return { x: t, y: n.y, value: n.value };
    for (let i = 1; i < e.length; i += 1) {
      const s = e[i - 1], o = e[i];
      if (t > o.x)
        continue;
      const a = o.x - s.x;
      if (Math.abs(a) <= He)
        return { x: t, y: o.y, value: o.value };
      const l = (t - s.x) / a;
      return {
        x: t,
        y: s.y + (o.y - s.y) * l,
        value: s.value + (o.value - s.value) * l
      };
    }
    return { x: t, y: n.y, value: n.value };
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
    this.clearHoverState(), this.teardownVisibilityObserver(), this.stopLiveRuntime(), super.disconnectedCallback();
  }
  updated(e) {
    var o;
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
    !e && r - this._lastTrendRefresh < xr || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(ls) || this.hasEditorLikeAncestor();
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
    }, os));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, xr), this.updateComplete.then(() => {
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
      let _ = Number.POSITIVE_INFINITY;
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
        const f = ((a = S[S.length - 1]) == null ? void 0 : a.ts) ?? u, p = Math.max(u, f - ss);
        _ = Math.min(_, p);
      }
      let m = 0;
      const x = d.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await ve(
          this.hass,
          Array.from(d),
          i,
          { dataSource: s }
        );
        return m = this.perfNow() - v, w;
      })() : {};
      let b = 0;
      const y = h.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await ve(
          this.hass,
          Array.from(h),
          i,
          {
            startMs: Number.isFinite(_) ? _ : u,
            dataSource: s
          }
        );
        return b = this.perfNow() - v, w;
      })() : {};
      c.forEach((v, w) => {
        const S = this._trendSeries[w] ?? [];
        if (d.has(v)) {
          const f = x[v] ?? [];
          n[w] = f.length > 0 ? f : S.filter((p) => p.ts >= u);
          return;
        }
        if (h.has(v)) {
          const f = y[v] ?? [];
          n[w] = Ue(S, f, u);
          return;
        }
        n[w] = S.filter((f) => f.ts >= u);
      });
      const g = this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((v) => Number(v)).filter((v) => Number.isFinite(v) && v >= 1 && v <= xe).every((v) => {
        const w = v;
        return this.areTrendSeriesEqual(n[w] ?? [], this._trendSeries[w] ?? []);
      });
      g || (this._trendSeries = n), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - l),
        window_ms: i,
        force_full: e,
        slots: o.length,
        full_entities: d.size,
        incremental_entities: h.size,
        data_source: s,
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
q.styles = Xe`
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
  P()
], q.prototype, "_config", 2);
te([
  P()
], q.prototype, "_trendSeries", 2);
te([
  P()
], q.prototype, "_graphTopInset", 2);
te([
  P()
], q.prototype, "_hoverState", 2);
q = te([
  he("power-pilz-graph-card")
], q);
var cs = Object.defineProperty, ds = Object.getOwnPropertyDescriptor, Ot = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? ds(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && cs(t, r, i), i;
};
const hs = rn(!0);
let Ge = class extends U {
  constructor() {
    super(...arguments), this.computeLabel = (e) => ln(e, {
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
      legend_layout: nn(e.legend_layout),
      timeframe_hours: sn(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      normalize_stack_to_percent: e.normalize_stack_to_percent ?? !1,
      decimals: e.decimals ?? 1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: e.decimals_base_unit ?? e.decimals ?? 1,
      decimals_prefixed_unit: e.decimals_prefixed_unit ?? e.decimals ?? 1,
      line_thickness: on(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...an(e)
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
        .schema=${hs}
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
  P()
], Ge.prototype, "_config", 2);
Ge = Ot([
  he("power-pilz-graph-stack-card-editor")
], Ge);
var us = Object.defineProperty, _s = Object.getOwnPropertyDescriptor, re = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? _s(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && us(t, r, i), i;
};
const Ce = 1, $r = 24, Tr = 300 * 1e3, ms = 60 * 1e3, fs = 350, se = 0.01, $e = 4, ps = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", ys = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), Er = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let X = class extends U {
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
      timeframe_hours: $r,
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
      decimals: Ce,
      decimals_base_unit: Ce,
      decimals_prefixed_unit: Ce
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Ce, r = ee(e.decimals_base_unit, t), n = ee(e.decimals_prefixed_unit, t), i = this.readConfigString(e.entity), s = this.readConfigString(e.icon), o = this.readConfigString(e.entity_1) ?? i ?? "sensor.dev_home_power";
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
      return $`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return $``;
    const e = this._config, t = e.decimals ?? Ce, r = this.normalizeLineThickness(e.line_thickness), n = e.normalize_stack_to_percent === !0, i = this.collectSeriesEntries(e, t), s = this.withStackedCurrentValues(i, n), o = this.normalizeLegendLayout(e.legend_layout), a = e.hover_enabled !== !1, l = this._hoverState, c = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, d = c > 0 ? { top: `${c}px` } : {}, h = l ? {
      left: `${l.x}px`,
      top: `${l.y + c}px`,
      "--hover-dot-color": l.color
    } : {};
    return this._drawConfigs = i.map((_) => ({
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
              ${i.length === 0 ? $`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph Stack card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : s.map(
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
      const i = n, s = this.slotEnabled(i, e), o = this.slotEntityId(i, e);
      if (!s || !o)
        continue;
      const a = this.entityName(this.slotCustomName(i, e), o, n), l = L(this.hass, o), c = e.unit ?? I(this.hass, o) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(i, e), _ = this.iconStyle(this.slotIconColor(i, e)), u = this.resolveColor(Er[i], ps), m = this.resolveColor(this.slotTrendColor(i, e), u);
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
        iconStyle: _,
        trendColor: m
      });
    }
    return r;
  }
  withStackedCurrentValues(e, t) {
    const r = this.resolveStackUnitFactors(e), n = e.reduce((d, h) => d + (h.currentValue ?? 0), 0), i = r ? e.reduce((d, h) => d + (h.currentValue ?? 0) * (r[h.slot] ?? 1), 0) : n, s = r ? i : n, o = Number.isFinite(s) && Math.abs(s) > se;
    let a = 0, l = 0, c = !1;
    return e.map((d) => {
      d.currentValue !== null && Number.isFinite(d.currentValue) && (a += d.currentValue, r && (l += d.currentValue * (r[d.slot] ?? 1)), c = !0);
      const h = c ? t ? o ? (r ? l : a) / s * 100 : 0 : r ? l / (r[d.slot] ?? 1) : a : null, _ = t ? "%" : d.unit;
      return {
        ...d,
        unit: _,
        secondary: this.formatValue(h, _, d.decimals)
      };
    });
  }
  slotEntityId(e, t) {
    return Wr(e, t);
  }
  slotCustomName(e, t) {
    return Gr(e, t);
  }
  slotEnabled(e, t) {
    return qr(e, t);
  }
  slotShowIcon(e, t) {
    return Xr(e, t);
  }
  slotIcon(e, t) {
    return Kr(e, t);
  }
  slotIconColor(e, t) {
    return Yr(e, t);
  }
  slotTrendColor(e, t) {
    return Jr(e, t);
  }
  entityName(e, t, r) {
    return Qr(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    var n, i, s;
    return en(e, t, r, {
      enabled: ((n = this._config) == null ? void 0 : n.auto_scale_units) === !0,
      baseDecimals: ((i = this._config) == null ? void 0 : i.decimals_base_unit) ?? r,
      prefixedDecimals: ((s = this._config) == null ? void 0 : s.decimals_prefixed_unit) ?? r
    });
  }
  resolveStackUnitFactors(e) {
    if (e.length === 0)
      return null;
    let t = null;
    const r = {};
    for (const n of e) {
      const i = le(n.unit);
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
    if (!this._stackCanonicalMode || this._stackNormalizeToPercent)
      return t;
    const r = this._stackCanonicalFactors[e];
    return typeof r != "number" || !Number.isFinite(r) || r <= 0 ? t : t / r;
  }
  readConfigString(e) {
    return G(e);
  }
  normalizeLegendLayout(e) {
    return Zr(e);
  }
  normalizeTimeframeHours(e) {
    return zt(e, $r);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return At(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : Er[r];
  }
  iconStyle(e) {
    return Tt(e);
  }
  resolveColor(e, t = "") {
    return $t(e, t);
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
    var g, v;
    const i = Date.now() - t, s = 0, o = 100, a = e.map((w) => w.value), l = (r == null ? void 0 : r.min) ?? Math.min(...a), c = (r == null ? void 0 : r.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, _ = Math.max(c - l, se), u = e.map((w) => {
      const S = Math.max(0, Math.min(100, (w.ts - i) / t * 100)), f = s + S / 100 * (o - s), p = _ <= se ? 0.5 : (w.value - l) / _, C = h - p * (h - d);
      return { x: f, y: C, value: w.value };
    }), m = ((g = u[0]) == null ? void 0 : g.x) ?? s, x = ((v = u[u.length - 1]) == null ? void 0 : v.x) ?? o, b = Math.max(0, x - m), y = 18;
    if (u.length >= 2 && b < y) {
      const w = o - y, S = Math.max(s, Math.min(w, x - y));
      if (b <= se) {
        const p = y / (u.length - 1);
        return u.map((C, E) => ({
          ...C,
          x: Math.max(s, Math.min(o, S + p * E))
        }));
      }
      const f = y / b;
      return u.map((p) => ({
        ...p,
        x: Math.max(s, Math.min(o, S + (p.x - m) * f))
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
    var y, g, v;
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
    const s = ((y = this._config) == null ? void 0 : y.fill_area_enabled) !== !1, o = ((g = this._config) == null ? void 0 : g.normalize_stack_to_percent) === !0, a = ((v = this._config) == null ? void 0 : v.shared_trend_scale) === !0, l = this.resolveStackUnitFactors(this._drawConfigs);
    this._stackCanonicalMode = l !== null, this._stackCanonicalFactors = l ?? {}, this._stackNormalizeToPercent = o;
    const c = this.trendWindowMs(this._config), d = {}, h = this.buildStackedTrendSeries(c, l ?? void 0), _ = o ? this.normalizeStackedSeriesToPercent(h) : h, u = o ? a ? { min: 0, max: 100 } : null : a ? this.computeStackedValueRange(_) : null;
    let m = 0, x = 0;
    [...this._drawConfigs].sort((w, S) => S.slot - w.slot).forEach((w) => {
      const S = _[w.slot] ?? [];
      if (S.length < 2)
        return;
      const f = this.toTrendCoordinates(S, c, u);
      if (f.length < 2)
        return;
      const p = this.toCanvasPoints(f, n.width, n.height), C = this.toCanvasPoints(f, i.width, i.height);
      s && this.drawTrendArea(n.ctx, p, w.color, n.height), this.drawTrendLine(i.ctx, C, w.color, w.lineWidth), d[w.slot] = C, m += 1, x += C.length;
    }), this._linePointsBySlot = d, this._hoverState && !d[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: m,
      points: x,
      fill_area: s,
      shared_scale: a,
      normalize_percent: o,
      stack_units: this._stackCanonicalMode ? "canonical" : "raw"
    });
  }
  buildStackedTrendSeries(e, t) {
    const r = {}, n = [...this._drawConfigs].sort((s, o) => s.slot - o.slot);
    let i = null;
    return n.forEach((s) => {
      const o = this.trendPoints(s.slot, s.currentValue);
      if (o.length === 0)
        return;
      const a = this.normalizeTrendSeries(o, e);
      if (a.length === 0)
        return;
      const l = (t == null ? void 0 : t[s.slot]) ?? 1, c = l === 1 ? a : a.map((h) => ({
        ts: h.ts,
        value: h.value * l
      })), d = i ? this.sumTrendSeries(i, c) : c;
      r[s.slot] = d, i = d;
    }), r;
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
    if (Math.abs(l) <= se)
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
  normalizeStackedSeriesToPercent(e) {
    const t = {}, r = Object.keys(e).map((s) => Number(s)).filter((s) => Number.isFinite(s) && s >= 1 && s <= $e).sort((s, o) => s - o);
    if (r.length === 0)
      return t;
    const n = r[r.length - 1], i = e[n] ?? [];
    return i.length < 1 || r.forEach((s) => {
      const o = e[s] ?? [];
      o.length !== 0 && (t[s] = o.map((a) => {
        const l = this.interpolateTrendValue(i, a.ts);
        if (!Number.isFinite(l) || Math.abs(l) <= se)
          return { ts: a.ts, value: 0 };
        if (s === n)
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
      return { x: t, y: r.y, value: r.value };
    if (t >= n.x)
      return { x: t, y: n.y, value: n.value };
    for (let i = 1; i < e.length; i += 1) {
      const s = e[i - 1], o = e[i];
      if (t > o.x)
        continue;
      const a = o.x - s.x;
      if (Math.abs(a) <= se)
        return { x: t, y: o.y, value: o.value };
      const l = (t - s.x) / a;
      return {
        x: t,
        y: s.y + (o.y - s.y) * l,
        value: s.value + (o.value - s.value) * l
      };
    }
    return { x: t, y: n.y, value: n.value };
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
    this.clearHoverState(), this.teardownVisibilityObserver(), this.stopLiveRuntime(), super.disconnectedCallback();
  }
  updated(e) {
    var o;
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
    !e && r - this._lastTrendRefresh < Tr || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(ys) || this.hasEditorLikeAncestor();
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
    }, fs));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Tr), this.updateComplete.then(() => {
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
      let _ = Number.POSITIVE_INFINITY;
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
        const f = ((a = S[S.length - 1]) == null ? void 0 : a.ts) ?? u, p = Math.max(u, f - ms);
        _ = Math.min(_, p);
      }
      let m = 0;
      const x = d.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await ve(
          this.hass,
          Array.from(d),
          i,
          { dataSource: s }
        );
        return m = this.perfNow() - v, w;
      })() : {};
      let b = 0;
      const y = h.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await ve(
          this.hass,
          Array.from(h),
          i,
          {
            startMs: Number.isFinite(_) ? _ : u,
            dataSource: s
          }
        );
        return b = this.perfNow() - v, w;
      })() : {};
      c.forEach((v, w) => {
        const S = this._trendSeries[w] ?? [];
        if (d.has(v)) {
          const f = x[v] ?? [];
          n[w] = f.length > 0 ? f : S.filter((p) => p.ts >= u);
          return;
        }
        if (h.has(v)) {
          const f = y[v] ?? [];
          n[w] = Ue(S, f, u);
          return;
        }
        n[w] = S.filter((f) => f.ts >= u);
      });
      const g = this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((v) => Number(v)).filter((v) => Number.isFinite(v) && v >= 1 && v <= $e).every((v) => {
        const w = v;
        return this.areTrendSeriesEqual(n[w] ?? [], this._trendSeries[w] ?? []);
      });
      g || (this._trendSeries = n), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - l),
        window_ms: i,
        force_full: e,
        slots: o.length,
        full_entities: d.size,
        incremental_entities: h.size,
        data_source: s,
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
X.styles = Xe`
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
], X.prototype, "hass", 2);
re([
  k({ type: Boolean })
], X.prototype, "preview", 2);
re([
  k({ type: Boolean })
], X.prototype, "editMode", 2);
re([
  P()
], X.prototype, "_config", 2);
re([
  P()
], X.prototype, "_trendSeries", 2);
re([
  P()
], X.prototype, "_graphTopInset", 2);
re([
  P()
], X.prototype, "_hoverState", 2);
X = re([
  he("power-pilz-graph-stack-card")
], X);
var bs = Object.defineProperty, vs = Object.getOwnPropertyDescriptor, kt = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? vs(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && bs(t, r, i), i;
};
const gs = [
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
], ws = {
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
      return ws[t] ?? t;
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
        .schema=${gs}
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
  P()
], qe.prototype, "_config", 2);
qe = kt([
  he("power-pilz-wallbox-card-editor")
], qe);
var Ss = Object.defineProperty, ue = (e, t, r, n) => {
  for (var i = void 0, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = o(t, r, i) || i);
  return i && Ss(t, r, i), i;
};
const xs = 0.01, Mr = "power-pilz-wallbox-mode-menu-portal-style", Nt = class Nt extends U {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._actionBusy = !1, this._modeMenuOpen = !1, this._modeMenuOptionCount = 0, this.toggleModeMenu = (t) => {
      var o;
      if (t.stopPropagation(), this.isEditorPreview() || !((o = this._config) != null && o.mode_entity) || this._actionBusy)
        return;
      const r = ye(this.hass, this._config.mode_entity), n = (r == null ? void 0 : r.state) ?? "", i = this.getModeOptions(r);
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
      const r = ye(this.hass, this._config.mode_entity);
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
      const r = L(this.hass, this._config.power_entity), n = _t(this.hass, this._config.status_entity), i = this.isCharging(n, r, this._config.command_entity), s = this.resolveActionCommand(i);
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
      decimals_base_unit: ee(t.decimals_base_unit, n),
      decimals_prefixed_unit: ee(t.decimals_prefixed_unit, n),
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
    const t = this._config, r = L(this.hass, t.power_entity), n = I(this.hass, t.power_entity) ?? "kW", i = _t(this.hass, t.status_entity), s = ye(this.hass, t.mode_entity), o = (s == null ? void 0 : s.state) ?? "", a = this.getModeOptions(s), l = this.isCharging(i, r, t.command_entity), c = this.resolveActionCommand(l), d = l ? "Stop" : "Start", h = l ? "mdi:pause" : "mdi:play", _ = this.statusLabel(i, l), u = this.formatPower(r, n, t.decimals ?? 1), m = this.showModeSelector(t, a), x = this.showLiveValue(t), b = this.showCommandButton(t), y = this.isEditorPreview() || this._actionBusy || !t.mode_entity || a.length === 0, g = o || a[0] || "Mode", v = this._modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down", w = this.iconStyle(t.icon_color), f = Number(x) + Number(b) === 1, p = m && x && b, C = f && x, E = f && b || p, R = C || E, z = x && !C, A = b && !E, H = m || z || A, D = m ? z || A ? A ? "actions" : "actions no-command" : "actions mode-only" : "actions no-mode";
    return (!m || y) && this._modeMenuOpen && this.closeModeMenuPortal(), $`
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
                            ?disabled=${y}
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
    return Mt(i, r, n, {
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
      const s = (i = _t(this.hass, n)) == null ? void 0 : i.toLowerCase();
      if (s === "on")
        return !0;
      if (s === "off")
        return !1;
    }
    return r !== null && r > xs;
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
    return Tt(t);
  }
  disconnectedCallback() {
    this.closeModeMenuPortal(), super.disconnectedCallback();
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  ensureModeMenuPortalStyles() {
    if (document.getElementById(Mr))
      return;
    const t = document.createElement("style");
    t.id = Mr, t.textContent = `
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
    ), c = r.offsetHeight > 0 ? Math.min(a, r.offsetHeight) : l, d = Math.max(120, Math.round(i.width)), h = window.innerHeight - i.bottom - s, _ = h < c + o && i.top - s > h;
    let u = i.left;
    u = Math.max(s, Math.min(u, window.innerWidth - d - s));
    let m = _ ? i.top - o - c : i.bottom + o;
    m = Math.max(s, Math.min(m, window.innerHeight - c - s)), r.style.maxHeight = `${a}px`, r.style.width = `${d}px`, r.style.left = `${Math.round(u)}px`, r.style.top = `${Math.round(m)}px`;
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
Nt.styles = Xe`
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
let W = Nt;
ue([
  k({ attribute: !1 })
], W.prototype, "hass");
ue([
  k({ type: Boolean })
], W.prototype, "preview");
ue([
  k({ type: Boolean })
], W.prototype, "editMode");
ue([
  k({ reflect: !0, type: String })
], W.prototype, "layout");
ue([
  P()
], W.prototype, "_config");
ue([
  P()
], W.prototype, "_actionBusy");
ue([
  P()
], W.prototype, "_modeMenuOpen");
class Cs extends W {
}
customElements.get("power-pilz-wallbox-card") || customElements.define("power-pilz-wallbox-card", W);
customElements.get("power-pilz-wallbox-card-v2") || customElements.define("power-pilz-wallbox-card-v2", Cs);
window.customCards = window.customCards || [];
const $s = [
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
for (const e of $s)
  window.customCards.some((t) => t.type === e.type) || window.customCards.push(e);
console.info(
  `%cPOWER PILZ%c v${Pe}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
//# sourceMappingURL=power-pilz.js.map
