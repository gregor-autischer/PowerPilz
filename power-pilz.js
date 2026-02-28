/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ie = globalThis, yt = Ie.ShadowRoot && (Ie.ShadyCSS === void 0 || Ie.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pt = Symbol(), qt = /* @__PURE__ */ new WeakMap();
let $r = class {
  constructor(t, r, n) {
    if (this._$cssResult$ = !0, n !== pt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (yt && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = qt.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && qt.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ln = (e) => new $r(typeof e == "string" ? e : e + "", void 0, pt), Fe = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, i, s) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[s + 1], e[0]);
  return new $r(r, e, pt);
}, Bn = (e, t) => {
  if (yt) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), i = Ie.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = r.cssText, e.appendChild(n);
  }
}, Kt = yt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return Ln(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Hn, defineProperty: Dn, getOwnPropertyDescriptor: Vn, getOwnPropertyNames: Fn, getOwnPropertySymbols: Un, getPrototypeOf: jn } = Object, Z = globalThis, Xt = Z.trustedTypes, Gn = Xt ? Xt.emptyScript : "", nt = Z.reactiveElementPolyfillSupport, ge = (e, t) => e, Ne = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Gn : null;
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
} }, ft = (e, t) => !Hn(e, t), Yt = { attribute: !0, type: String, converter: Ne, reflect: !1, useDefault: !1, hasChanged: ft };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Z.litPropertyMetadata ?? (Z.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let _e = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Yt) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, r);
      i !== void 0 && Dn(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: i, set: s } = Vn(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Yt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ge("elementProperties"))) return;
    const t = jn(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ge("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ge("properties"))) {
      const r = this.properties, n = [...Fn(r), ...Un(r)];
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
      for (const i of n) r.unshift(Kt(i));
    } else t !== void 0 && r.push(Kt(t));
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
    return Bn(t, this.constructor.elementStyles), t;
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
      const o = (((s = n.converter) == null ? void 0 : s.toAttribute) !== void 0 ? n.converter : Ne).toAttribute(r, n.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var s, o;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = n.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((s = a.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? a.converter : Ne;
      this._$Em = i;
      const c = l.fromAttribute(r, a.type);
      this[i] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, r, n, i = !1, s) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (s = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? ft)(s, r) || n.useDefault && n.reflect && s === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
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
_e.elementStyles = [], _e.shadowRootOptions = { mode: "open" }, _e[ge("elementProperties")] = /* @__PURE__ */ new Map(), _e[ge("finalized")] = /* @__PURE__ */ new Map(), nt == null || nt({ ReactiveElement: _e }), (Z.reactiveElementVersions ?? (Z.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ve = globalThis, Jt = (e) => e, ke = ve.trustedTypes, Zt = ke ? ke.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Tr = "$lit$", J = `lit$${Math.random().toFixed(9).slice(2)}$`, Er = "?" + J, Wn = `<${Er}>`, oe = document, we = () => oe.createComment(""), Se = (e) => e === null || typeof e != "object" && typeof e != "function", bt = Array.isArray, qn = (e) => bt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", it = `[ 	
\f\r]`, fe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Qt = /-->/g, er = />/g, re = RegExp(`>|${it}(?:([^\\s"'>=/]+)(${it}*=${it}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), tr = /'/g, rr = /"/g, Mr = /^(?:script|style|textarea|title)$/i, Kn = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), $ = Kn(1), ae = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), nr = /* @__PURE__ */ new WeakMap(), ie = oe.createTreeWalker(oe, 129);
function Rr(e, t) {
  if (!bt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Zt !== void 0 ? Zt.createHTML(t) : t;
}
const Xn = (e, t) => {
  const r = e.length - 1, n = [];
  let i, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = fe;
  for (let a = 0; a < r; a++) {
    const l = e[a];
    let c, d, h = -1, _ = 0;
    for (; _ < l.length && (o.lastIndex = _, d = o.exec(l), d !== null); ) _ = o.lastIndex, o === fe ? d[1] === "!--" ? o = Qt : d[1] !== void 0 ? o = er : d[2] !== void 0 ? (Mr.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = re) : d[3] !== void 0 && (o = re) : o === re ? d[0] === ">" ? (o = i ?? fe, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? re : d[3] === '"' ? rr : tr) : o === rr || o === tr ? o = re : o === Qt || o === er ? o = fe : (o = re, i = void 0);
    const u = o === re && e[a + 1].startsWith("/>") ? " " : "";
    s += o === fe ? l + Wn : h >= 0 ? (n.push(c), l.slice(0, h) + Tr + l.slice(h) + J + u) : l + J + (h === -2 ? a : u);
  }
  return [Rr(e, s + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class xe {
  constructor({ strings: t, _$litType$: r }, n) {
    let i;
    this.parts = [];
    let s = 0, o = 0;
    const a = t.length - 1, l = this.parts, [c, d] = Xn(t, r);
    if (this.el = xe.createElement(c, n), ie.currentNode = this.el.content, r === 2 || r === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = ie.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(Tr)) {
          const _ = d[o++], u = i.getAttribute(h).split(J), m = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: s, name: m[2], strings: u, ctor: m[1] === "." ? Jn : m[1] === "?" ? Zn : m[1] === "@" ? Qn : Ue }), i.removeAttribute(h);
        } else h.startsWith(J) && (l.push({ type: 6, index: s }), i.removeAttribute(h));
        if (Mr.test(i.tagName)) {
          const h = i.textContent.split(J), _ = h.length - 1;
          if (_ > 0) {
            i.textContent = ke ? ke.emptyScript : "";
            for (let u = 0; u < _; u++) i.append(h[u], we()), ie.nextNode(), l.push({ type: 2, index: ++s });
            i.append(h[_], we());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Er) l.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(J, h + 1)) !== -1; ) l.push({ type: 7, index: s }), h += J.length - 1;
      }
      s++;
    }
  }
  static createElement(t, r) {
    const n = oe.createElement("template");
    return n.innerHTML = t, n;
  }
}
function ye(e, t, r = e, n) {
  var o, a;
  if (t === ae) return t;
  let i = n !== void 0 ? (o = r._$Co) == null ? void 0 : o[n] : r._$Cl;
  const s = Se(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== s && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), s === void 0 ? i = void 0 : (i = new s(e), i._$AT(e, r, n)), n !== void 0 ? (r._$Co ?? (r._$Co = []))[n] = i : r._$Cl = i), i !== void 0 && (t = ye(e, i._$AS(e, t.values), i, n)), t;
}
class Yn {
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
    const { el: { content: r }, parts: n } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? oe).importNode(r, !0);
    ie.currentNode = i;
    let s = ie.nextNode(), o = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new Ce(s, s.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (c = new ei(s, this, t)), this._$AV.push(c), l = n[++a];
      }
      o !== (l == null ? void 0 : l.index) && (s = ie.nextNode(), o++);
    }
    return ie.currentNode = oe, i;
  }
  p(t) {
    let r = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, r), r += n.strings.length - 2) : n._$AI(t[r])), r++;
  }
}
class Ce {
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
    t = ye(this, t, r), Se(t) ? t === T || t == null || t === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== ae && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : qn(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== T && Se(this._$AH) ? this._$AA.nextSibling.data = t : this.T(oe.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: r, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = xe.createElement(Rr(n.h, n.h[0]), this.options)), n);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === i) this._$AH.p(r);
    else {
      const o = new Yn(i, this), a = o.u(this.options);
      o.p(r), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let r = nr.get(t.strings);
    return r === void 0 && nr.set(t.strings, r = new xe(t)), r;
  }
  k(t) {
    bt(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let n, i = 0;
    for (const s of t) i === r.length ? r.push(n = new Ce(this.O(we()), this.O(we()), this, this.options)) : n = r[i], n._$AI(s), i++;
    i < r.length && (this._$AR(n && n._$AB.nextSibling, i), r.length = i);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, r); t !== this._$AB; ) {
      const i = Jt(t).nextSibling;
      Jt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 && (this._$Cv = t, (r = this._$AP) == null || r.call(this, t));
  }
}
class Ue {
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
    if (s === void 0) t = ye(this, t, r, 0), o = !Se(t) || t !== this._$AH && t !== ae, o && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = s[0], l = 0; l < s.length - 1; l++) c = ye(this, a[n + l], r, l), c === ae && (c = this._$AH[l]), o || (o = !Se(c) || c !== this._$AH[l]), c === T ? t = T : t !== T && (t += (c ?? "") + s[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Jn extends Ue {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }
}
class Zn extends Ue {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== T);
  }
}
class Qn extends Ue {
  constructor(t, r, n, i, s) {
    super(t, r, n, i, s), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = ye(this, t, r, 0) ?? T) === ae) return;
    const n = this._$AH, i = t === T && n !== T || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== T && (n === T || i);
    i && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ei {
  constructor(t, r, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ye(this, t);
  }
}
const st = ve.litHtmlPolyfillSupport;
st == null || st(xe, Ce), (ve.litHtmlVersions ?? (ve.litHtmlVersions = [])).push("3.3.2");
const ti = (e, t, r) => {
  const n = (r == null ? void 0 : r.renderBefore) ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const s = (r == null ? void 0 : r.renderBefore) ?? null;
    n._$litPart$ = i = new Ce(t.insertBefore(we(), s), s, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se = globalThis;
let U = class extends _e {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ti(r, this.renderRoot, this.renderOptions);
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
    return ae;
  }
};
var Cr;
U._$litElement$ = !0, U.finalized = !0, (Cr = se.litElementHydrateSupport) == null || Cr.call(se, { LitElement: U });
const ot = se.litElementPolyfillSupport;
ot == null || ot({ LitElement: U });
(se.litElementVersions ?? (se.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const le = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ri = { attribute: !0, type: String, converter: Ne, reflect: !1, hasChanged: ft }, ni = (e = ri, t, r) => {
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
function I(e) {
  return (t, r) => typeof r == "object" ? ni(e, t, r) : ((n, i, s) => {
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
  return I({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ii = { ATTRIBUTE: 1 }, si = (e) => (...t) => ({ _$litDirective$: e, values: t });
let oi = class {
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
const zr = "important", ai = " !" + zr, M = si(class extends oi {
  constructor(e) {
    var t;
    if (super(e), e.type !== ii.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const s = typeof i == "string" && i.endsWith(ai);
        n.includes("-") || s ? r.setProperty(n, s ? i.slice(0, -11) : i, s ? zr : "") : r[n] = i;
      }
    }
    return ae;
  }
}), me = (e, t) => {
  if (t)
    return e.states[t];
}, L = (e, t) => {
  const r = me(e, t);
  if (!r)
    return null;
  const n = Number(r.state);
  return Number.isFinite(n) ? n : null;
}, V = (e, t) => {
  const r = me(e, t);
  if (!r)
    return;
  const n = r.attributes.unit_of_measurement;
  return typeof n == "string" ? n : void 0;
}, at = (e, t) => {
  const r = me(e, t);
  return r == null ? void 0 : r.state;
}, B = (e, t = "hybrid") => e === "history" || e === "statistics" || e === "hybrid" ? e : e === "auto" || t === "auto" ? "hybrid" : t, Ar = 3e4, li = 10 * 6e4, ci = 1440, di = 1e4, hi = 2e3, Or = 40, je = /* @__PURE__ */ new Map(), lt = /* @__PURE__ */ new Map(), ct = /* @__PURE__ */ new Map(), ir = /* @__PURE__ */ new WeakMap(), sr = /* @__PURE__ */ new WeakMap(), or = /* @__PURE__ */ new WeakMap(), ar = /* @__PURE__ */ new WeakMap(), gt = (e, t = ci) => {
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
}, Pr = (e, t) => {
  const r = t ? di : hi;
  return !Number.isFinite(e) || e <= 0 || r <= 1 ? Math.max(0, Math.floor(e)) : Math.max(0, Math.floor(e / r) * r);
}, ui = (e) => {
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
}, Le = (e, t, r) => {
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
  }), gt(i);
}, _i = (e, t, r = Date.now()) => {
  if (!Array.isArray(e))
    return { entityId: null, points: [] };
  const n = [];
  let i = null;
  for (const a of e) {
    if (!a || typeof a != "object")
      continue;
    const l = a;
    i === null && typeof l.entity_id == "string" && l.entity_id.length > 0 && (i = l.entity_id);
    const c = Number(l.state), d = ui(l);
    !Number.isFinite(c) || d === null || n.push({ ts: d, value: c });
  }
  const s = r - t, o = n.filter((a) => a.ts >= s).sort((a, l) => a.ts - l.ts);
  return {
    entityId: i,
    points: gt(o)
  };
}, Ge = (e, t, r) => `${e}|${t}|${r}`, F = (e) => e.map((t) => ({ ts: t.ts, value: t.value })), dt = (e) => {
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
}, mi = (e) => dt(e.start) ?? dt(e.end) ?? dt(e.last_reset), yi = (e) => {
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
}, pi = (e, t, r = Date.now()) => {
  if (!Array.isArray(e))
    return [];
  const n = [];
  e.forEach((o) => {
    if (!o || typeof o != "object")
      return;
    const a = o, l = mi(a), c = yi(a);
    l === null || c === null || n.push({ ts: l, value: c });
  });
  const i = r - t, s = n.filter((o) => o.ts >= i).sort((o, a) => o.ts - a.ts);
  return gt(s);
}, Ir = (e) => {
  const t = ar.get(e);
  if (t)
    return t;
  const r = /* @__PURE__ */ new Map();
  return ar.set(e, r), r;
}, Nr = (e, t, r) => {
  const n = Ir(e), i = n.get(t);
  return i ? i.expiresAt <= r ? (n.delete(t), null) : i.supported : null;
}, lr = (e, t, r, n) => {
  Ir(e).set(t, {
    supported: r,
    expiresAt: n + li
  });
}, fi = (e) => {
  const t = ir.get(e);
  if (t)
    return t;
  const r = /* @__PURE__ */ new Map();
  return ir.set(e, r), r;
}, kr = async (e, t, r, n, i, s) => {
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
    const m = _i(_, r, i), S = t[u], p = m.entityId ?? S;
    p && (h[p] = m.points);
  }), t.forEach((_) => {
    _ in h || (h[_] = []), s && je.set(Ge("history", _, r), {
      expiresAt: i + Ar,
      points: F(h[_])
    });
  }), h;
}, bi = (e, t, r, n, i) => {
  const s = fi(e);
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
        const h = await kr(
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
            u[m] = F(h[m] ?? []);
          }), _.resolve(u);
        });
      } catch (h) {
        c.waiters.forEach((_) => _.reject(h));
      }
    }, Or));
  });
}, gi = (e) => {
  const t = sr.get(e);
  if (t)
    return t;
  const r = /* @__PURE__ */ new Map();
  return sr.set(e, r), r;
}, vi = async (e, t, r, n) => {
  const i = [...n], s = new Date(t).toISOString(), o = new Date(r).toISOString(), a = or.get(e), l = a ? [a] : ["recorder/statistics_during_period", "history/statistics_during_period"];
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
      return or.set(e, d), h;
    } catch (h) {
      c = h;
    }
  throw c;
}, wi = async (e, t) => {
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
}, Lr = async (e, t, r, n, i, s) => {
  let o;
  try {
    o = await vi(e, n, i, t);
  } catch {
    const u = new Set(t), m = {};
    return t.forEach((S) => {
      m[S] = [];
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
    const m = pi(a[u], r, i);
    l[u] = m, lr(e, u, !0, i), s && je.set(Ge("statistics", u, r), {
      expiresAt: i + Ar,
      points: F(m)
    });
  });
  const h = [];
  d.forEach((u) => {
    const m = Nr(e, u, i);
    if (m !== !0) {
      if (m === !1) {
        c.add(u);
        return;
      }
      h.push(u);
    }
  });
  const _ = await wi(e, h);
  return _ !== null ? h.forEach((u) => {
    const m = _.has(u);
    lr(e, u, m, i), m || c.add(u);
  }) : h.forEach((u) => {
    c.add(u);
  }), {
    pointsByEntity: l,
    unsupportedEntityIds: c
  };
}, Si = (e, t, r, n, i) => {
  const s = gi(e);
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
        const h = await Lr(
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
            u.pointsByEntity[m] = F(h.pointsByEntity[m] ?? []), h.unsupportedEntityIds.has(m) && u.unsupportedEntityIds.add(m);
          }), _.resolve(u);
        });
      } catch (h) {
        c.waiters.forEach((_) => _.reject(h));
      }
    }, Or));
  });
}, Br = async (e, t, r, n) => {
  const i = e.callApi, s = Array.from(new Set(t.filter((p) => p.length > 0)));
  if (!i || s.length === 0)
    return {};
  const o = Date.now(), a = typeof n == "number" && Number.isFinite(n) ? Math.max(o - r, Math.floor(n)) : o - r, l = a <= o - r + 1e3, c = Pr(a, l), d = {}, h = [];
  if (s.forEach((p) => {
    if (l) {
      const f = Ge("history", p, r), g = je.get(f);
      if (g && g.expiresAt > o) {
        d[p] = F(g.points);
        return;
      }
    }
    h.push(p);
  }), h.length === 0)
    return d;
  if (l) {
    const p = `${c}|${r}`, f = await bi(
      i,
      p,
      h,
      r,
      c
    );
    return h.forEach((g) => {
      d[g] = F(f[g] ?? []);
    }), d;
  }
  const _ = [...h].sort(), u = `${c}|${r}|${_.join(",")}`, m = lt.get(u);
  if (m) {
    const p = await m;
    return h.forEach((f) => {
      d[f] = F(p[f] ?? []);
    }), d;
  }
  const S = (async () => kr(
    i,
    h,
    r,
    c,
    o,
    l
  ))();
  lt.set(u, S);
  try {
    const p = await S;
    return h.forEach((f) => {
      d[f] = F(p[f] ?? []);
    }), d;
  } finally {
    lt.delete(u);
  }
}, Hr = async (e, t, r, n) => {
  const i = e.callWS, s = Array.from(new Set(t.filter((g) => g.length > 0)));
  if (!i || s.length === 0)
    return {
      pointsByEntity: {},
      unsupportedEntityIds: new Set(s)
    };
  const o = Date.now(), a = typeof n == "number" && Number.isFinite(n) ? Math.max(o - r, Math.floor(n)) : o - r, l = a <= o - r + 1e3, c = Pr(a, l), d = {}, h = [], _ = /* @__PURE__ */ new Set();
  if (s.forEach((g) => {
    if (Nr(i, g, o) === !1) {
      d[g] = [], _.add(g);
      return;
    }
    if (l) {
      const x = Ge("statistics", g, r), v = je.get(x);
      if (v && v.expiresAt > o) {
        d[g] = F(v.points);
        return;
      }
    }
    h.push(g);
  }), h.length === 0)
    return {
      pointsByEntity: d,
      unsupportedEntityIds: _
    };
  const u = (g) => (h.forEach((b) => {
    d[b] = F(g.pointsByEntity[b] ?? []), g.unsupportedEntityIds.has(b) && _.add(b);
  }), {
    pointsByEntity: d,
    unsupportedEntityIds: _
  });
  if (l) {
    const g = `${c}|${r}`, b = await Si(
      i,
      g,
      h,
      r,
      c
    );
    return u(b);
  }
  const m = [...h].sort(), S = `${c}|${r}|${m.join(",")}`, p = ct.get(S);
  if (p) {
    const g = await p;
    return u(g);
  }
  const f = (async () => Lr(
    i,
    h,
    r,
    c,
    o,
    l
  ))();
  ct.set(S, f);
  try {
    const g = await f;
    return u(g);
  } finally {
    ct.delete(S);
  }
}, xi = async (e, t, r, n) => {
  const i = await Hr(
    e,
    t,
    r,
    n
  ), s = {};
  t.forEach((l) => {
    l.length !== 0 && (s[l] = F(i.pointsByEntity[l] ?? []));
  });
  const o = Array.from(i.unsupportedEntityIds).filter((l) => l.length > 0);
  if (o.length === 0)
    return s;
  const a = await Br(
    e,
    o,
    r,
    n
  );
  return o.forEach((l) => {
    s[l] = F(a[l] ?? []);
  }), s;
}, pe = async (e, t, r, n) => {
  const i = B(n == null ? void 0 : n.dataSource, "hybrid");
  return i === "history" ? Br(e, t, r, n == null ? void 0 : n.startMs) : i === "statistics" ? (await Hr(
    e,
    t,
    r,
    n == null ? void 0 : n.startMs
  )).pointsByEntity : xi(e, t, r, n == null ? void 0 : n.startMs);
}, cr = {
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
}, vt = (e) => {
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
  if (t in cr)
    return `var(--rgb-${t}, ${cr[t]})`;
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
}, wt = (e, t = "") => {
  const r = vt(e);
  if (r)
    return `rgb(${r})`;
  if (typeof e == "string" && e.trim().length > 0) {
    const n = e.trim(), i = n.toLowerCase();
    if (i !== "none" && i !== "default")
      return n;
  }
  return t;
}, St = (e) => {
  const t = vt(e);
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
}, xt = (e, t, r) => {
  const n = e.map((i) => ({
    x: i.x / 100 * t,
    y: i.y / 100 * r,
    value: i.value
  }));
  return Ci(n, t);
}, Ci = (e, t) => {
  if (e.length <= 3)
    return e;
  const r = Math.max(24, Math.min(e.length, Math.round(t)));
  if (e.length <= r)
    return dr(e);
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
  return n.push(e[e.length - 1]), dr(n);
}, dr = (e) => {
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
}, $e = "0.1.19";
var $i = Object.defineProperty, Ti = Object.getOwnPropertyDescriptor, Ct = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Ti(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && $i(t, r, i), i;
};
const Ei = 4, Mi = 8, hr = 2, Ri = (e, t) => {
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
}, ze = (e, t, r, n) => ({
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
    schema: Ri(e, s + 1)
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
}), zi = {
  select: {
    mode: "dropdown",
    options: [
      { label: "Hybrid (auto fallback)", value: "hybrid" },
      { label: "Statistics (fastest)", value: "statistics" },
      { label: "History (raw)", value: "history" }
    ]
  }
}, Ai = [
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
    { name: "trend_data_source", selector: zi },
    { name: "debug_performance", selector: { boolean: {} } }
  ]),
  ze("solar", "Solar sub blocks", "mdi:solar-power-variant", Ei),
  ze("grid", "Grid 1 sub blocks", "mdi:transmission-tower", hr),
  ze("grid_secondary", "Grid 2 sub blocks", "mdi:transmission-tower", hr),
  ze("home", "Home sub blocks", "mdi:flash", Mi),
  {
    type: "grid",
    name: "",
    schema: [
      { name: "unit", selector: { text: {} } },
      { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } }
    ]
  }
], Oi = {
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
  trend_data_source: "Trend source (auto)",
  debug_performance: "Debug logs",
  battery_low_alert: "Low battery alert",
  battery_low_threshold: "Low battery %",
  battery_secondary_low_alert: "Battery 2 low alert",
  battery_secondary_low_threshold: "Battery 2 low %",
  core_icon: "Core icon",
  core_icon_color: "Core icon color",
  flow_color: "Flow line color",
  unit: "Unit",
  decimals: "Decimals"
};
let Be = class extends U {
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
      return Oi[t] ?? t;
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
      type: "custom:power-pilz-energy-card"
    };
  }
  render() {
    return !this.hass || !this._config ? T : $`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${$e}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ai}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Ct([
  I({ attribute: !1 })
], Be.prototype, "hass", 2);
Ct([
  P()
], Be.prototype, "_config", 2);
Be = Ct([
  le("power-pilz-energy-card-editor")
], Be);
var Pi = Object.defineProperty, Ii = Object.getOwnPropertyDescriptor, Q = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Ii(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && Pi(t, r, i), i;
};
const D = 0.01, ht = 1, ue = 1440 * 60 * 1e3, ur = 300 * 1e3, _r = 60 * 1e3, Ni = 350, mr = 4, yr = 8, ut = 2, ki = 12, pr = 7, Li = 6, Bi = 400, Hi = 300, Di = "var(--rgb-primary-text-color, 33, 33, 33)";
let W = class extends U {
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
      decimals: ht
    };
  }
  setConfig(e) {
    const t = e.home_entity ?? e.consumption_entity ?? "sensor.dev_home_power", r = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : ht;
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
    const e = this._config, t = e.decimals ?? ht, r = e.home_visible !== !1, n = e.solar_visible !== !1, i = e.grid_visible !== !1, s = i && e.grid_secondary_visible === !0, o = e.battery_visible !== !1, a = o && e.battery_secondary_visible === !0, l = this.normalizeBatteryDualAlignment(e.battery_dual_alignment), c = L(this.hass, e.home_entity), d = n ? L(this.hass, e.solar_entity) : null, h = i ? L(this.hass, e.grid_entity) : null, _ = s ? L(this.hass, e.grid_secondary_entity) : null, u = o ? L(this.hass, e.battery_entity) : null, m = L(this.hass, e.battery_percentage_entity), S = a ? L(this.hass, e.battery_secondary_entity) : null, p = L(this.hass, e.battery_secondary_percentage_entity), f = e.home_auto_calculate === !0 ? this.computeAutoHomeValueFromNodeValues({
      solar: d,
      grid: h,
      grid_secondary: _,
      battery: u,
      battery_secondary: S
    }) : c, g = e.unit ?? "kW", b = V(this.hass, e.solar_entity) ?? g, x = e.home_auto_calculate === !0 ? this.resolveAutoHomeUnit(e, g) : V(this.hass, e.home_entity) ?? g, v = V(this.hass, e.grid_entity) ?? g, y = V(this.hass, e.grid_secondary_entity) ?? g, w = V(this.hass, e.battery_entity) ?? g, C = V(this.hass, e.battery_secondary_entity) ?? g, E = this.toUnidirectionalFlow(d), R = this.toUnidirectionalFlow(f), z = this.toBidirectionalFlow(h), A = this.toBidirectionalFlow(_), H = h === null && _ === null ? "none" : this.toBidirectionalFlow((h ?? 0) + (_ ?? 0)), N = this.toBidirectionalFlow(u), nn = this.toBidirectionalFlow(S), sn = u === null && S === null ? "none" : this.toBidirectionalFlow((u ?? 0) + (S ?? 0)), on = this.resolveTapAction(e), We = !this.isEditorPreview() && on.action !== "none", an = this.iconColorStyle(e.solar_icon_color), ln = this.iconColorStyle(e.grid_icon_color), cn = this.iconColorStyle(e.grid_secondary_icon_color), dn = this.iconColorStyle(e.home_icon_color), hn = this.iconShapeStyle(e.core_icon_color), qe = n ? this.collectSubBlocks("solar", e) : [], At = i ? this.collectSubBlocks("grid", e) : [], Ot = s ? this.collectSubBlocks("grid_secondary", e) : [], Ke = r ? this.collectSubBlocks("home", e) : [], Xe = new Set(Ke.map((O) => O.index)), de = new Set(qe.map((O) => O.index)), un = Xe.has(7) && Xe.has(8), _n = [5, 6, 7, 8].some((O) => Xe.has(O)), mn = de.has(1) && de.has(2) && !de.has(3) && !de.has(4), yn = de.has(3) && de.has(4), Pt = s && (mn && un || yn && _n), pn = s && !Pt, Ye = Ke.some((O) => O.index >= 7), It = this.homeSubPositions(Ye), Nt = this.gridSubPositions(s), kt = this.gridSecondarySubPositions(), Lt = this.solarSubPositions(
      Ye,
      pn,
      Pt
    ), Bt = Ke.filter((O) => O.index <= (Ye ? 8 : 6)), Je = i ? { col: 1, row: s ? 2 : 3, colSpan: 2, rowSpan: 2 } : null, Ze = s ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 } : null, Qe = o ? {
      col: a && l === "center" ? 2 : 3,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, et = a ? {
      col: l === "left" ? 1 : l === "right" ? 5 : 4,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, k = this.computeGridBounds(
      r,
      n,
      i,
      s,
      o,
      a,
      Je,
      Ze,
      Qe,
      et,
      qe,
      At,
      Ot,
      Bt,
      Lt,
      Nt,
      kt,
      It
    ), tt = n ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, k) : null, Te = Je ? this.normalizePlacement(Je, k) : null, Ee = Ze ? this.normalizePlacement(Ze, k) : null, rt = r ? this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, k) : null, Me = Qe ? this.normalizePlacement(Qe, k) : null, Re = et ? this.normalizePlacement(et, k) : null, Ht = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, k), fn = this.normalizePositions(Lt, k), bn = this.normalizePositions(Nt, k), gn = this.normalizePositions(kt, k), vn = this.normalizePositions(It, k), Dt = this.normalizeBatteryThreshold(e.battery_low_threshold), Vt = !!e.battery_low_alert, Ft = this.normalizeBatteryThreshold(e.battery_secondary_low_threshold), Ut = !!e.battery_secondary_low_alert, jt = Vt && m !== null && m <= Dt, wn = this.iconColorStyle(jt ? "red" : e.battery_icon_color), Sn = this.batteryIcon(m, u, e.battery_icon), Gt = Ut && p !== null && p <= Ft, xn = this.iconColorStyle(
      Gt ? "red" : e.battery_secondary_icon_color
    ), Cn = this.batteryIcon(
      p,
      S,
      e.battery_secondary_icon
    ), $n = { "--flow-color-rgb": this.toRgbCss(e.flow_color) ?? Di }, he = this.resolveColor("purple"), Tn = this.resolveColor(e.solar_trend_color, he), En = this.resolveColor(e.grid_trend_color, he), Mn = this.resolveColor(e.grid_secondary_trend_color, he), Rn = this.resolveColor(e.home_trend_color, he), zn = this.resolveColor(e.battery_trend_color, he), An = this.resolveColor(e.battery_secondary_trend_color, he), Wt = this.resolveColor("red"), On = Vt && (e.battery_percentage_entity || m !== null) ? Dt : null, Pn = m ?? u, In = Ut && (e.battery_secondary_percentage_entity || p !== null) ? Ft : null, Nn = p ?? S, kn = this.buildFlowSegments(
      rt,
      Ht,
      tt,
      [
        ...Te ? [{ placement: Te, direction: z }] : [],
        ...Ee ? [{ placement: Ee, direction: A }] : []
      ],
      H,
      [
        ...Me ? [{ placement: Me, direction: N }] : [],
        ...Re ? [{ placement: Re, direction: nn }] : []
      ],
      sn,
      E,
      R,
      k
    );
    return $`
      <ha-card
        class=${We ? "interactive" : ""}
        tabindex=${We ? 0 : -1}
        role=${We ? "button" : "article"}
        @click=${this.handleCardClick}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div
            class="energy-grid"
            style=${M({
      ...$n,
      "--grid-columns": `${k.cols}`,
      "--grid-rows": `${k.rows}`,
      "--grid-aspect": `${k.cols} / ${k.rows}`
    })}
          >
            ${kn.map(
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

            ${n && tt ? $`
                  <div
                    class="energy-value solar ${d === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(tt))}
                  >
                    ${this.renderTrend("solar", d, !!e.solar_trend, Tn, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.solar_icon ?? "mdi:weather-sunny"}
                        style=${M(an)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(d, b, t)}</div>
                      <div class="energy-label">${e.solar_label}</div>
                    </div>
                  </div>
                ` : T}

            ${i && Te ? $`
                  <div
                    class="energy-value grid ${h === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Te))}
                  >
                    ${this.renderTrend("grid", h, !!e.grid_trend, En, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_icon ?? "mdi:transmission-tower"}
                        style=${M(ln)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(h, v, t)}</div>
                      <div class="energy-label">${e.grid_label}</div>
                    </div>
                  </div>
                ` : T}

            ${s && Ee ? $`
                  <div
                    class="energy-value grid-secondary ${_ === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Ee))}
                  >
                    ${this.renderTrend(
      "grid_secondary",
      _,
      !!e.grid_secondary_trend,
      Mn,
      null,
      ""
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${M(cn)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(_, y, t)}</div>
                      <div class="energy-label">${e.grid_secondary_label}</div>
                    </div>
                  </div>
                ` : T}

            ${r && rt ? $`
                  <div
                    class="energy-value home ${f === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(rt))}
                  >
                    ${this.renderTrend("home", f, !!e.home_trend, Rn, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.home_icon ?? "mdi:home-lightning-bolt"}
                        style=${M(dn)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(f, x, t)}</div>
                      <div class="energy-label">${e.home_label}</div>
                    </div>
                  </div>
                ` : T}

            ${this._showSubBlocks ? this.renderSubNodes("solar", qe, fn, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("grid", At, bn, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("grid_secondary", Ot, gn, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("home", Bt, vn, t) : T}

            ${o && Me ? $`
                  <div
                    class="energy-value battery ${u === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Me))}
                  >
                    ${this.renderTrend(
      "battery",
      Pn,
      !!e.battery_trend,
      zn,
      On,
      Wt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon class="energy-icon" .icon=${Sn} style=${M(wn)}></ha-icon>
                        ${m !== null ? $`
                              <div class="battery-percentage ${jt ? "alert" : ""}">
                                ${this.formatBatteryPercentage(m)}
                              </div>
                            ` : T}
                      </div>
                      <div class="energy-number">${this.formatValue(u, w, t)}</div>
                      <div class="energy-label">${e.battery_label}</div>
                    </div>
                  </div>
                ` : T}

            ${a && Re ? $`
                  <div
                    class="energy-value battery-secondary ${S === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Re))}
                  >
                    ${this.renderTrend(
      "battery_secondary",
      Nn,
      !!e.battery_secondary_trend,
      An,
      In,
      Wt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${Cn}
                          style=${M(xn)}
                        ></ha-icon>
                        ${p !== null ? $`
                              <div class="battery-percentage ${Gt ? "alert" : ""}">
                                ${this.formatBatteryPercentage(p)}
                              </div>
                            ` : T}
                      </div>
                      <div class="energy-number">${this.formatValue(S, C, t)}</div>
                      <div class="energy-label">${e.battery_secondary_label}</div>
                    </div>
                  </div>
                ` : T}

            <div class="home-core" style=${M(this.gridPlacementStyle(Ht))}>
              <div class="home-core-icon" style=${M(hn)}>
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
    const r = [], n = e === "solar" ? "mdi:solar-power-variant" : e === "home" ? "mdi:flash" : "mdi:transmission-tower", i = e === "solar" ? "Solar" : e === "home" ? "Home" : e === "grid" ? "Grid" : "Grid 2", s = e === "solar" ? mr : e === "home" ? yr : ut;
    for (let h = 1; h <= s; h += 1) {
      const _ = t[`${e}_sub_${h}_enabled`] === !0, u = this.readConfigString(t[`${e}_sub_${h}_entity`]);
      !_ || !u || r.push({
        key: `${e}_${h}`,
        index: h,
        icon: this.readConfigString(t[`${e}_sub_${h}_icon`]) ?? n,
        iconStyle: this.iconColorStyle(t[`${e}_sub_${h}_icon_color`]),
        label: this.readConfigString(t[`${e}_sub_${h}_label`]) ?? `${i} ${h}`,
        value: L(this.hass, u),
        unit: V(this.hass, u) ?? t.unit ?? "kW"
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
        unit: V(this.hass, a) ?? t.unit ?? "kW"
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
  computeGridBounds(e, t, r, n, i, s, o, a, l, c, d, h, _, u, m, S, p, f) {
    const g = [{ col: 3, row: 3, colSpan: 2, rowSpan: 2 }];
    e && g.push({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }), t && g.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }), r && o && g.push(o), n && a && g.push(a), i && l && g.push(l), s && c && g.push(c), d.forEach((w) => {
      const C = m[w.index];
      C && g.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), h.forEach((w) => {
      const C = S[w.index];
      C && g.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), _.forEach((w) => {
      const C = p[w.index];
      C && g.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), u.forEach((w) => {
      const C = f[w.index];
      C && g.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    });
    const b = Math.min(...g.map((w) => w.col)), x = Math.max(...g.map((w) => w.col + (w.colSpan ?? 1) - 1)), v = Math.min(...g.map((w) => w.row)), y = Math.max(...g.map((w) => w.row + (w.rowSpan ?? 1) - 1));
    return {
      minCol: b,
      maxCol: x,
      minRow: v,
      maxRow: y,
      cols: x - b + 1,
      rows: y - v + 1
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
    const d = this.placementCenter(t, c), h = [], _ = (m, S, p, f) => {
      const g = Math.min(m, S), b = Math.abs(S - m);
      b <= D || h.push({
        orientation: "horizontal",
        direction: f,
        left: g,
        top: p,
        width: b,
        height: 0
      });
    }, u = (m, S, p, f) => {
      const g = Math.min(m, S), b = Math.abs(S - m);
      b <= D || h.push({
        orientation: "vertical",
        direction: f,
        left: p,
        top: g,
        width: 0,
        height: b
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
      const [{ placement: m, direction: S }] = n, p = this.placementCenter(m, c);
      _(p.x, d.x, d.y, S);
    } else if (n.length >= 2) {
      const m = n.map((f) => ({
        direction: f.direction,
        center: this.placementCenter(f.placement, c)
      })).sort((f, g) => f.center.y - g.center.y), S = Math.min(...m.map((f) => f.center.x)), p = d.x - (d.x - S) * 0.5;
      _(d.x, p, d.y, i), m.forEach((f) => {
        const g = f.center.y > d.y + D ? this.reverseFlowDirection(f.direction) : f.direction;
        u(d.y, f.center.y, p, g), _(f.center.x, p, f.center.y, f.direction);
      });
    }
    if (s.length === 1) {
      const [{ placement: m, direction: S }] = s, p = this.placementCenter(m, c);
      u(d.y, p.y, d.x, S);
    } else if (s.length >= 2) {
      const m = s.map((f) => ({
        placement: f.placement,
        direction: f.direction,
        center: this.placementCenter(f.placement, c)
      })).sort((f, g) => f.center.y - g.center.y), S = Math.min(
        ...m.map((f) => (f.placement.row - 1) / c.rows * 100)
      ), p = Math.max(d.y + D, S);
      u(d.y, p, d.x, o), m.forEach((f) => {
        _(d.x, f.center.x, p, f.direction), u(p, f.center.y, f.center.x, f.direction);
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
      };
      return $`
            <div
              class="energy-sub-value ${e}-sub sub-col-${s.col} ${i.value === null ? "missing" : ""}"
              data-key=${i.key}
              style=${M(o)}
            >
              <div class="energy-sub-content">
                <ha-icon class="energy-sub-icon" .icon=${i.icon} style=${M(i.iconStyle)}></ha-icon>
                <div class="energy-sub-number">${this.formatValue(i.value, i.unit, n)}</div>
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
      const s = V(this.hass, i.entityId);
      if (s && s.trim().length > 0)
        return s;
    }
    return t;
  }
  computeAutoHomeValueFromNodeValues(e) {
    if (!Object.values(e).some((n) => n != null && Number.isFinite(n)))
      return null;
    const r = (e.solar ?? 0) + (e.grid ?? 0) + (e.grid_secondary ?? 0) - (e.battery ?? 0) - (e.battery_secondary ?? 0);
    return Number.isFinite(r) ? r <= D ? 0 : r : null;
  }
  renderTrend(e, t, r, n, i, s) {
    return r ? (this._trendDrawConfig[e] = {
      currentValue: t,
      color: n,
      threshold: i,
      thresholdColor: s
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
    const r = Date.now(), n = r - ue, i = this._trendSeries[e] ?? [];
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
      if (o === a || Math.abs(s.value - i.value) <= D) {
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
    var f, g;
    const n = Date.now() - ue, i = 0, s = 100, o = e.map((b) => b.value), a = (t == null ? void 0 : t.min) ?? Math.min(...o), l = (t == null ? void 0 : t.max) ?? Math.max(...o);
    if (!Number.isFinite(a) || !Number.isFinite(l))
      return [];
    const c = 20, d = 80, h = Math.max(l - a, D), _ = e.map((b) => {
      const x = Math.max(0, Math.min(100, (b.ts - n) / ue * 100)), v = i + x / 100 * (s - i), y = h <= D ? 0.5 : (b.value - a) / h, w = d - y * (d - c);
      return { x: v, y: w, value: b.value };
    }), u = ((f = _[0]) == null ? void 0 : f.x) ?? i, m = ((g = _[_.length - 1]) == null ? void 0 : g.x) ?? s, S = Math.max(0, m - u), p = 18;
    if (_.length >= 2 && S < p) {
      const b = s - p, x = Math.max(i, Math.min(b, m - p));
      if (S <= D) {
        const y = p / (_.length - 1);
        return _.map((w, C) => ({
          ...w,
          x: Math.max(i, Math.min(s, x + y * C))
        }));
      }
      const v = p / S;
      return _.map((y) => ({
        ...y,
        x: Math.max(i, Math.min(s, x + (y.x - u) * v))
      }));
    }
    return _;
  }
  toCanvasPoints(e, t, r) {
    return xt(e, t, r);
  }
  computeTrendValueRange(e) {
    const t = [];
    if (Object.values(e).forEach((i) => {
      i.forEach((s) => t.push(s.value));
    }), t.length === 0)
      return null;
    const r = Math.min(...t), n = Math.max(...t);
    return !Number.isFinite(r) || !Number.isFinite(n) ? null : { min: r, max: n };
  }
  updateSubBlockVisibility() {
    const e = this.renderRoot.querySelector(".energy-grid");
    if (!e) {
      this._showSubBlocks && (this._showSubBlocks = !1);
      return;
    }
    const t = this.findLayoutSpan("column"), r = this.findLayoutSpan("row"), n = this.subBlocksMinRows(), i = t !== null && r !== null && t >= ki && r >= n, s = e.getBoundingClientRect(), o = s.width >= Bi && s.height >= Hi, a = t !== null && r !== null ? i : o;
    a !== this._showSubBlocks && (this._showSubBlocks = a);
  }
  subBlocksMinRows() {
    if (!this._config)
      return pr;
    const e = this._config.solar_visible !== !1, t = this._config.battery_visible !== !1, r = this._config.battery_secondary_visible === !0;
    return !e || !(t || r) ? Li : pr;
  }
  findLayoutSpan(e) {
    let t = this;
    for (; t; ) {
      const r = this.parseGridSpanCandidates(
        e === "row" ? [t.style.gridRowStart, t.style.gridRowEnd, t.style.gridRow] : [t.style.gridColumnStart, t.style.gridColumnEnd, t.style.gridColumn]
      );
      if (r !== null)
        return r;
      const n = getComputedStyle(t), i = this.parseGridSpanCandidates(
        e === "row" ? [n.gridRowStart, n.gridRowEnd, n.gridRow] : [n.gridColumnStart, n.gridColumnEnd, n.gridColumn]
      );
      if (i !== null)
        return i;
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
    const e = this.renderRoot.querySelector(".energy-grid"), t = this.renderRoot.querySelector(".energy-value.home"), r = this.renderRoot.querySelector(".energy-value.solar"), n = this.renderRoot.querySelector(".energy-value.grid"), i = this.renderRoot.querySelector(".energy-value.grid-secondary");
    if (!e) {
      this._subNodeConnectorSegments.length > 0 && (this._subNodeConnectorSegments = []);
      return;
    }
    const s = e.getBoundingClientRect(), o = t == null ? void 0 : t.getBoundingClientRect(), a = r == null ? void 0 : r.getBoundingClientRect(), l = n == null ? void 0 : n.getBoundingClientRect(), c = i == null ? void 0 : i.getBoundingClientRect(), d = o ? o.left + o.width / 2 : 0, h = a ? a.top + a.height / 2 : 0, _ = l ? l.left + l.width / 2 : 0, u = c ? c.left + c.width / 2 : 0, m = (v) => v - s.left, S = (v) => v - s.top, p = (v) => Math.round(v * 10) / 10, f = [], g = (v, y, w, C) => {
      const E = Math.min(v, y), R = Math.abs(y - v);
      R <= 0.5 || f.push({
        node: C,
        left: p(E),
        top: p(w - 1),
        width: p(R),
        height: 2
      });
    }, b = (v, y, w, C) => {
      const E = Math.min(v, y), R = Math.abs(y - v);
      R <= 0.5 || f.push({
        node: C,
        left: p(w - 1),
        top: p(E),
        width: 2,
        height: p(R)
      });
    };
    o && this.renderRoot.querySelectorAll(".energy-sub-value.home-sub").forEach((v) => {
      const y = v.getBoundingClientRect(), w = y.top + y.height / 2, C = y.left + y.width / 2 < d ? y.right : y.left, E = w, R = w < o.top ? o.top : w > o.bottom ? o.bottom : w, z = m(d), A = S(E), H = S(R), N = m(C);
      g(N, z, A, "home"), b(A, H, z, "home");
    }), a && this.renderRoot.querySelectorAll(".energy-sub-value.solar-sub").forEach((v) => {
      const y = v.getBoundingClientRect(), w = y.left + y.width / 2, C = y.top + y.height / 2 < h ? y.bottom : y.top, E = w, R = w < a.left ? a.left : w > a.right ? a.right : w, z = S(h), A = m(E), H = m(R), N = S(C);
      b(N, z, A, "solar"), g(A, H, z, "solar");
    }), l && this.renderRoot.querySelectorAll(".energy-sub-value.grid-sub").forEach((v) => {
      const y = v.getBoundingClientRect(), w = y.top + y.height / 2, C = y.left + y.width / 2 < _ ? y.right : y.left, E = w, R = w < l.top ? l.top : w > l.bottom ? l.bottom : w, z = m(_), A = S(E), H = S(R), N = m(C);
      g(N, z, A, "grid"), b(A, H, z, "grid");
    }), c && this.renderRoot.querySelectorAll(".energy-sub-value.grid_secondary-sub").forEach((v) => {
      const y = v.getBoundingClientRect(), w = y.top + y.height / 2, C = y.left + y.width / 2 < u ? y.right : y.left, E = w, R = w < c.top ? c.top : w > c.bottom ? c.bottom : w, z = m(u), A = S(E), H = S(R), N = m(C);
      g(N, z, A, "grid_secondary"), b(A, H, z, "grid_secondary");
    }), f.length === this._subNodeConnectorSegments.length && f.every(
      (v, y) => {
        var w, C, E, R, z;
        return v.node === ((w = this._subNodeConnectorSegments[y]) == null ? void 0 : w.node) && v.left === ((C = this._subNodeConnectorSegments[y]) == null ? void 0 : C.left) && v.top === ((E = this._subNodeConnectorSegments[y]) == null ? void 0 : E.top) && v.width === ((R = this._subNodeConnectorSegments[y]) == null ? void 0 : R.width) && v.height === ((z = this._subNodeConnectorSegments[y]) == null ? void 0 : z.height);
      }
    ) || (this._subNodeConnectorSegments = f);
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
    var c, d;
    const e = this.perfNow(), t = this.collectTrendCanvases(".node-trend-canvas-area"), r = this.collectTrendCanvases(".node-trend-canvas-line"), n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    t.forEach((h, _) => {
      const u = this.prepareTrendCanvas(h);
      u && n.set(_, u);
    }), r.forEach((h, _) => {
      const u = this.prepareTrendCanvas(h);
      u && i.set(_, u);
    });
    const s = {};
    Object.keys(this._trendDrawConfig).forEach((h) => {
      const _ = this._trendDrawConfig[h];
      if (!_)
        return;
      const u = this.trendPoints(h, _.currentValue);
      u.length >= 2 && (s[h] = u);
    });
    const o = ((c = this._config) == null ? void 0 : c.shared_trend_scale) === !0 ? this.computeTrendValueRange(s) : null;
    let a = 0, l = 0;
    Object.keys(this._trendDrawConfig).forEach((h) => {
      const _ = this._trendDrawConfig[h];
      if (!_)
        return;
      const u = n.get(h), m = i.get(h);
      if (!u || !m)
        return;
      const S = s[h];
      if (!S || S.length < 2)
        return;
      const p = this.toTrendCoordinates(S, o);
      if (p.length < 2)
        return;
      const f = this.toCanvasPoints(p, u.width, u.height), g = this.toCanvasPoints(p, m.width, m.height);
      this.drawTrendArea(
        u.ctx,
        f,
        _.color,
        u.height,
        _.threshold,
        _.thresholdColor
      ), this.drawTrendLine(m.ctx, g, _.color, _.threshold, _.thresholdColor), a += 1, l += g.length;
    }), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: a,
      points: l,
      shared_scale: ((d = this._config) == null ? void 0 : d.shared_trend_scale) === !0
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
    !e && r - this._lastTrendRefresh < ur || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
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
    }, Ni));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, ur), this.updateComplete.then(() => {
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
      const a = this.perfNow(), l = {}, c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Set(), _ = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set();
      let m = Number.POSITIVE_INFINITY;
      const S = Date.now() - ue;
      for (const v of i) {
        if (v === "home" && r.home_auto_calculate === !0) {
          const R = this.homeComputationDependencies(r);
          if (R.length === 0) {
            l[v] = [];
            continue;
          }
          d.set(v, R);
          const z = this._trendSeries[v] ?? [];
          if (e || z.length === 0) {
            h.add(v), R.forEach((N) => {
              _.add(N.entityId), u.delete(N.entityId);
            });
            continue;
          }
          const A = ((s = z[z.length - 1]) == null ? void 0 : s.ts) ?? S, H = Math.max(S, A - _r);
          m = Math.min(m, H), R.forEach((N) => {
            _.has(N.entityId) || u.add(N.entityId);
          });
          continue;
        }
        const y = this.trendEntityId(v, r);
        if (!y)
          continue;
        c.set(v, y);
        const w = this._trendSeries[v] ?? [];
        if (e || w.length === 0 || _.has(y)) {
          _.add(y), u.delete(y);
          continue;
        }
        if (_.has(y))
          continue;
        u.add(y);
        const C = ((o = w[w.length - 1]) == null ? void 0 : o.ts) ?? S, E = Math.max(S, C - _r);
        m = Math.min(m, E);
      }
      let p = 0;
      const f = _.size > 0 ? await (async () => {
        const v = this.perfNow(), y = await pe(
          this.hass,
          Array.from(_),
          ue,
          { dataSource: n }
        );
        return p = this.perfNow() - v, y;
      })() : {};
      let g = 0;
      const b = u.size > 0 ? await (async () => {
        const v = this.perfNow(), y = await pe(
          this.hass,
          Array.from(u),
          ue,
          {
            startMs: Number.isFinite(m) ? m : S,
            dataSource: n
          }
        );
        return g = this.perfNow() - v, y;
      })() : {};
      c.forEach((v, y) => {
        const w = this._trendSeries[y] ?? [];
        if (_.has(v)) {
          const C = f[v] ?? [];
          l[y] = C.length > 0 ? C : w.filter((E) => E.ts >= S);
          return;
        }
        if (u.has(v)) {
          const C = b[v] ?? [];
          l[y] = Le(w, C, S);
          return;
        }
        l[y] = w.filter((C) => C.ts >= S);
      }), d.forEach((v, y) => {
        const w = this._trendSeries[y] ?? [], C = this.computeAutoHomeTrendFromFetchedDependencies(
          v,
          f,
          b,
          _,
          u,
          S
        );
        if (h.has(y)) {
          l[y] = C.length > 0 ? C : w.filter((E) => E.ts >= S);
          return;
        }
        l[y] = Le(w, C, S);
      });
      const x = this.sameTrendSeriesKeys(l, this._trendSeries) && Object.keys(l).every(
        (v) => this.areTrendSeriesEqual(l[v] ?? [], this._trendSeries[v] ?? [])
      );
      x || (this._trendSeries = l), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - a),
        force_full: e,
        nodes: i.length,
        full_entities: _.size,
        incremental_entities: u.size,
        data_source: n,
        full_fetch_ms: this.toPerfMs(p),
        incremental_fetch_ms: this.toPerfMs(g),
        series_changed: !x
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
    return n("solar", mr), n("home", yr), n("grid", ut), n("grid_secondary", ut), Array.from(t);
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
  computeAutoHomeTrendFromFetchedDependencies(e, t, r, n, i, s) {
    const o = {};
    return e.forEach((a) => {
      const l = n.has(a.entityId) ? t[a.entityId] ?? [] : i.has(a.entityId) ? r[a.entityId] ?? [] : [];
      o[a.role] = l.filter((c) => Number.isFinite(c.ts) && Number.isFinite(c.value) && c.ts >= s).sort((c, d) => c.ts - d.ts);
    }), this.computeAutoHomeTrendSeries(o, s);
  }
  computeAutoHomeTrendSeries(e, t) {
    const r = [];
    if (Object.values(e).forEach((i) => {
      i.forEach((s) => {
        Number.isFinite(s.ts) && s.ts >= t && r.push(s.ts);
      });
    }), r.length === 0)
      return [];
    r.sort((i, s) => i - s);
    const n = [];
    return r.forEach((i) => {
      const s = n[n.length - 1];
      (s === void 0 || Math.abs(s - i) > 0.5) && n.push(i);
    }), n.map((i) => {
      const s = this.computeAutoHomeValueFromNodeValues({
        solar: this.interpolateTrendSeriesValue(e.solar ?? [], i),
        grid: this.interpolateTrendSeriesValue(e.grid ?? [], i),
        grid_secondary: this.interpolateTrendSeriesValue(e.grid_secondary ?? [], i),
        battery: this.interpolateTrendSeriesValue(e.battery ?? [], i),
        battery_secondary: this.interpolateTrendSeriesValue(e.battery_secondary ?? [], i)
      });
      return s === null ? null : { ts: i, value: s };
    }).filter((i) => i !== null);
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
    if (Math.abs(l) <= D)
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
    return e === null || e <= D ? "none" : "forward";
  }
  toBidirectionalFlow(e) {
    return e === null || Math.abs(e) <= D ? "none" : e > 0 ? "forward" : "backward";
  }
  reverseFlowDirection(e) {
    return e === "forward" ? "backward" : e === "backward" ? "forward" : "none";
  }
  formatValue(e, t, r) {
    return e === null ? "--" : `${e < 0 ? "-" : ""}${Math.abs(e).toFixed(r)} ${t}`;
  }
  formatBatteryPercentage(e) {
    return `${Math.round(this.normalizeBatteryThreshold(e))}%`;
  }
  batteryIcon(e, t, r) {
    if (t !== null && t > D)
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
    return wt(e, t);
  }
  toRgbCss(e) {
    return vt(e);
  }
};
W.styles = Fe`
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
Q([
  I({ attribute: !1 })
], W.prototype, "hass", 2);
Q([
  I({ type: Boolean })
], W.prototype, "preview", 2);
Q([
  I({ type: Boolean })
], W.prototype, "editMode", 2);
Q([
  P()
], W.prototype, "_config", 2);
Q([
  P()
], W.prototype, "_trendSeries", 2);
Q([
  P()
], W.prototype, "_showSubBlocks", 2);
Q([
  P()
], W.prototype, "_subNodeConnectorSegments", 2);
W = Q([
  le("power-pilz-energy-card")
], W);
const G = (e) => {
  if (typeof e != "string")
    return;
  const t = e.trim();
  return t.length > 0 ? t : void 0;
}, Dr = (e, t) => {
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
}, Vr = (e, t) => {
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
}, Fr = (e, t) => {
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
}, Ur = (e, t) => {
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
}, jr = (e, t) => {
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
}, Gr = (e, t) => {
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
}, Wr = (e, t) => {
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
}, qr = (e) => e === "column" ? "column" : "row", $t = (e, t = 24) => {
  const r = typeof e == "number" ? e : typeof e == "string" ? Number.parseInt(e, 10) : NaN;
  return r === 6 || r === 12 || r === 24 ? r : t;
}, Tt = (e) => typeof e != "number" || !Number.isFinite(e) ? 1.5 : Math.max(0.5, Math.min(6, e)), Kr = (e, t, r, n) => {
  var o;
  if (t)
    return t;
  const i = e[r], s = (o = i == null ? void 0 : i.attributes) == null ? void 0 : o.friendly_name;
  return typeof s == "string" && s.trim().length > 0 ? s.trim() : `Entity ${n}`;
}, Xr = (e, t, r) => {
  if (e === null)
    return t ? `-- ${t}` : "--";
  const n = `${e.toFixed(r)} ${t}`.trim();
  return n.length > 0 ? n : "--";
}, Vi = 4, Yr = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, Fi = {
  legend_layout: "Layout",
  timeframe_hours: "Range",
  hover_enabled: "Hover",
  fill_area_enabled: "Area fill",
  shared_trend_scale: "Shared scale",
  trend_data_source: "Trend source (auto)",
  debug_performance: "Debug logs",
  clip_graph_to_labels: "Clip below labels",
  line_thickness: "Line width",
  unit: "Unit",
  decimals: "Decimals"
}, Ui = (e) => ({
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
              default_color: Yr[e] ?? "purple"
            }
          }
        }
      ]
    }
  ]
}), Jr = (e = !1) => {
  const t = [
    { name: "hover_enabled", selector: { boolean: {} } },
    { name: "fill_area_enabled", selector: { boolean: {} } },
    { name: "shared_trend_scale", selector: { boolean: {} } },
    { name: "debug_performance", selector: { boolean: {} } }
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
    ...Array.from({ length: Vi }, (r, n) => Ui(n + 1)),
    {
      type: "grid",
      name: "",
      schema: [
        { name: "unit", selector: { text: {} } },
        { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } }
      ]
    }
  ];
}, X = (e) => {
  if (typeof e == "string")
    return e.length > 0 ? e : void 0;
}, Zr = (e) => e === "column" ? "column" : "row", Qr = (e) => $t(e), en = (e) => Tt(e), Ae = (e, t, r) => {
  const n = e ?? t;
  return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : Yr[r] ?? "purple";
}, tn = (e) => ({
  trend_data_source: B(e.trend_data_source, "hybrid"),
  entity_1: X(e.entity_1) ?? X(e.entity),
  entity_1_name: X(e.entity_1_name),
  entity_1_enabled: e.entity_1_enabled ?? !0,
  entity_1_show_icon: e.entity_1_show_icon ?? !0,
  entity_1_icon: e.entity_1_icon ?? e.icon,
  entity_1_icon_color: e.entity_1_icon_color ?? e.icon_color,
  entity_1_trend_color: Ae(e.entity_1_trend_color, e.trend_color, 1),
  entity_2: X(e.entity_2),
  entity_2_name: X(e.entity_2_name),
  entity_2_enabled: e.entity_2_enabled ?? !1,
  entity_2_show_icon: e.entity_2_show_icon ?? !0,
  entity_2_icon: e.entity_2_icon,
  entity_2_trend_color: Ae(e.entity_2_trend_color, void 0, 2),
  entity_3: X(e.entity_3),
  entity_3_name: X(e.entity_3_name),
  entity_3_enabled: e.entity_3_enabled ?? !1,
  entity_3_show_icon: e.entity_3_show_icon ?? !0,
  entity_3_icon: e.entity_3_icon,
  entity_3_trend_color: Ae(e.entity_3_trend_color, void 0, 3),
  entity_4: X(e.entity_4),
  entity_4_name: X(e.entity_4_name),
  entity_4_enabled: e.entity_4_enabled ?? !1,
  entity_4_show_icon: e.entity_4_show_icon ?? !0,
  entity_4_icon: e.entity_4_icon,
  entity_4_trend_color: Ae(e.entity_4_trend_color, void 0, 4)
}), rn = (e, t = {}) => {
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
  return r.match(/^entity_(\d+)$/) ? "Sensor" : t[r] ?? Fi[r] ?? r;
};
var ji = Object.defineProperty, Gi = Object.getOwnPropertyDescriptor, Et = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Gi(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && ji(t, r, i), i;
};
const Wi = Jr(!1);
let He = class extends U {
  constructor() {
    super(...arguments), this.computeLabel = (e) => rn(e), this.valueChanged = (e) => {
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
      legend_layout: Zr(e.legend_layout),
      timeframe_hours: Qr(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      line_thickness: en(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...tn(e)
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? T : $`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${$e}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Wi}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Et([
  I({ attribute: !1 })
], He.prototype, "hass", 2);
Et([
  P()
], He.prototype, "_config", 2);
He = Et([
  le("power-pilz-graph-card-editor")
], He);
var qi = Object.defineProperty, Ki = Object.getOwnPropertyDescriptor, ee = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Ki(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && qi(t, r, i), i;
};
const _t = 1, fr = 24, br = 300 * 1e3, Xi = 60 * 1e3, Yi = 350, Oe = 0.01, Pe = 4, Ji = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", gr = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let q = class extends U {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._graphTopInset = 0, this._drawConfigs = [], this._linePointsBySlot = {}, this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._isVisible = !1, this._liveRuntimeActive = !1, this.handlePointerMove = (e) => {
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
      timeframe_hours: fr,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
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
      decimals: _t
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : _t, r = this.readConfigString(e.entity), n = this.readConfigString(e.icon), i = this.readConfigString(e.entity_1) ?? r ?? "sensor.dev_home_power";
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
      entity_1: i,
      entity_1_name: this.readConfigString(e.entity_1_name),
      entity_1_enabled: e.entity_1_enabled ?? !0,
      entity_1_show_icon: e.entity_1_show_icon ?? !0,
      entity_1_icon: e.entity_1_icon ?? n ?? "mdi:chart-line",
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
    const e = this._config, t = e.decimals ?? _t, r = this.normalizeLineThickness(e.line_thickness), n = this.collectSeriesEntries(e, t), i = this.normalizeLegendLayout(e.legend_layout), s = e.hover_enabled !== !1, o = this._hoverState, a = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, l = a > 0 ? { top: `${a}px` } : {}, c = o ? {
      left: `${o.x}px`,
      top: `${o.y + a}px`,
      "--hover-dot-color": o.color
    } : {};
    return this._drawConfigs = n.map((d) => ({
      slot: d.slot,
      currentValue: d.currentValue,
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
    const r = t === null ? e.secondary : this.formatValue(t, e.unit, e.decimals);
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
          <div class="secondary">${r}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(e, t) {
    const r = [];
    for (let n = 1; n <= Pe; n += 1) {
      const i = n, s = this.slotEnabled(i, e), o = this.slotEntityId(i, e);
      if (!s || !o)
        continue;
      const a = this.entityName(this.slotCustomName(i, e), o, n), l = L(this.hass, o), c = e.unit ?? V(this.hass, o) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(i, e), _ = this.iconStyle(this.slotIconColor(i, e)), u = this.resolveColor(gr[i], Ji), m = this.resolveColor(this.slotTrendColor(i, e), u);
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
    return Dr(e, t);
  }
  slotCustomName(e, t) {
    return Vr(e, t);
  }
  slotEnabled(e, t) {
    return Fr(e, t);
  }
  slotShowIcon(e, t) {
    return Ur(e, t);
  }
  slotIcon(e, t) {
    return jr(e, t);
  }
  slotIconColor(e, t) {
    return Gr(e, t);
  }
  slotTrendColor(e, t) {
    return Wr(e, t);
  }
  entityName(e, t, r) {
    return Kr(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    return Xr(e, t, r);
  }
  readConfigString(e) {
    return G(e);
  }
  normalizeLegendLayout(e) {
    return qr(e);
  }
  normalizeTimeframeHours(e) {
    return $t(e, fr);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return Tt(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : gr[r];
  }
  iconStyle(e) {
    return St(e);
  }
  resolveColor(e, t = "") {
    return wt(e, t);
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
    var g, b;
    const i = Date.now() - t, s = 0, o = 100, a = e.map((x) => x.value), l = (r == null ? void 0 : r.min) ?? Math.min(...a), c = (r == null ? void 0 : r.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, _ = Math.max(c - l, Oe), u = e.map((x) => {
      const v = Math.max(0, Math.min(100, (x.ts - i) / t * 100)), y = s + v / 100 * (o - s), w = _ <= Oe ? 0.5 : (x.value - l) / _, C = h - w * (h - d);
      return { x: y, y: C, value: x.value };
    }), m = ((g = u[0]) == null ? void 0 : g.x) ?? s, S = ((b = u[u.length - 1]) == null ? void 0 : b.x) ?? o, p = Math.max(0, S - m), f = 18;
    if (u.length >= 2 && p < f) {
      const x = o - f, v = Math.max(s, Math.min(x, S - f));
      if (p <= Oe) {
        const w = f / (u.length - 1);
        return u.map((C, E) => ({
          ...C,
          x: Math.max(s, Math.min(o, v + w * E))
        }));
      }
      const y = f / p;
      return u.map((w) => ({
        ...w,
        x: Math.max(s, Math.min(o, v + (w.x - m) * y))
      }));
    }
    return u;
  }
  toCanvasPoints(e, t, r) {
    return xt(e, t, r);
  }
  computeTrendValueRange(e) {
    const t = [];
    if (Object.values(e).forEach((i) => {
      i.forEach((s) => t.push(s.value));
    }), t.length === 0)
      return null;
    const r = Math.min(...t), n = Math.max(...t);
    return !Number.isFinite(r) || !Number.isFinite(n) ? null : { min: r, max: n };
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
    var u, m, S;
    const e = this.perfNow();
    if (this._drawConfigs.length === 0) {
      this._linePointsBySlot = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "no-draw-configs" });
      return;
    }
    const t = this.renderRoot.querySelector(".card-trend-canvas-area"), r = this.renderRoot.querySelector(".card-trend-canvas-line");
    if (!t || !r) {
      this._linePointsBySlot = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "missing-canvas" });
      return;
    }
    const n = this.prepareTrendCanvas(t), i = this.prepareTrendCanvas(r);
    if (!n || !i) {
      this._linePointsBySlot = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const s = ((u = this._config) == null ? void 0 : u.fill_area_enabled) !== !1, o = this.trendWindowMs(this._config), a = {};
    this._drawConfigs.forEach((p) => {
      const f = this.trendPoints(p.slot, p.currentValue);
      f.length >= 2 && (a[p.slot] = f);
    });
    const l = ((m = this._config) == null ? void 0 : m.shared_trend_scale) === !0 ? this.computeTrendValueRange(a) : null, c = {};
    let d = 0, h = 0;
    [...this._drawConfigs].sort((p, f) => f.slot - p.slot).forEach((p) => {
      const f = a[p.slot];
      if (!f || f.length < 2)
        return;
      const g = this.toTrendCoordinates(f, o, l);
      if (g.length < 2)
        return;
      const b = this.toCanvasPoints(g, n.width, n.height), x = this.toCanvasPoints(g, i.width, i.height);
      s && this.drawTrendArea(n.ctx, b, p.color, n.height), this.drawTrendLine(i.ctx, x, p.color, p.lineWidth), c[p.slot] = x, d += 1, h += x.length;
    }), this._linePointsBySlot = c, this._hoverState && !c[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: d,
      points: h,
      fill_area: s,
      shared_scale: ((S = this._config) == null ? void 0 : S.shared_trend_scale) === !0
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
      if (Math.abs(a) <= Oe)
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
    }, Yi));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, br), this.updateComplete.then(() => {
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
      for (const b of o) {
        const x = this.slotEntityId(b, r);
        if (!x)
          continue;
        c.set(b, x);
        const v = this._trendSeries[b] ?? [];
        if (e || v.length === 0 || d.has(x)) {
          d.add(x), h.delete(x);
          continue;
        }
        if (d.has(x))
          continue;
        h.add(x);
        const y = ((a = v[v.length - 1]) == null ? void 0 : a.ts) ?? u, w = Math.max(u, y - Xi);
        _ = Math.min(_, w);
      }
      let m = 0;
      const S = d.size > 0 ? await (async () => {
        const b = this.perfNow(), x = await pe(
          this.hass,
          Array.from(d),
          i,
          { dataSource: s }
        );
        return m = this.perfNow() - b, x;
      })() : {};
      let p = 0;
      const f = h.size > 0 ? await (async () => {
        const b = this.perfNow(), x = await pe(
          this.hass,
          Array.from(h),
          i,
          {
            startMs: Number.isFinite(_) ? _ : u,
            dataSource: s
          }
        );
        return p = this.perfNow() - b, x;
      })() : {};
      c.forEach((b, x) => {
        const v = this._trendSeries[x] ?? [];
        if (d.has(b)) {
          const y = S[b] ?? [];
          n[x] = y.length > 0 ? y : v.filter((w) => w.ts >= u);
          return;
        }
        if (h.has(b)) {
          const y = f[b] ?? [];
          n[x] = Le(v, y, u);
          return;
        }
        n[x] = v.filter((y) => y.ts >= u);
      });
      const g = this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((b) => Number(b)).filter((b) => Number.isFinite(b) && b >= 1 && b <= Pe).every((b) => {
        const x = b;
        return this.areTrendSeriesEqual(n[x] ?? [], this._trendSeries[x] ?? []);
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
        incremental_fetch_ms: this.toPerfMs(p),
        series_changed: !g
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let r = 1; r <= Pe; r += 1) {
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
    for (let r = 1; r <= Pe; r += 1) {
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
q.styles = Fe`
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
ee([
  I({ attribute: !1 })
], q.prototype, "hass", 2);
ee([
  I({ type: Boolean })
], q.prototype, "preview", 2);
ee([
  I({ type: Boolean })
], q.prototype, "editMode", 2);
ee([
  P()
], q.prototype, "_config", 2);
ee([
  P()
], q.prototype, "_trendSeries", 2);
ee([
  P()
], q.prototype, "_graphTopInset", 2);
ee([
  P()
], q.prototype, "_hoverState", 2);
q = ee([
  le("power-pilz-graph-card")
], q);
var Zi = Object.defineProperty, Qi = Object.getOwnPropertyDescriptor, Mt = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Qi(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && Zi(t, r, i), i;
};
const es = Jr(!0);
let De = class extends U {
  constructor() {
    super(...arguments), this.computeLabel = (e) => rn(e, {
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
      legend_layout: Zr(e.legend_layout),
      timeframe_hours: Qr(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      normalize_stack_to_percent: e.normalize_stack_to_percent ?? !1,
      line_thickness: en(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...tn(e)
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? T : $`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${$e}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${es}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Mt([
  I({ attribute: !1 })
], De.prototype, "hass", 2);
Mt([
  P()
], De.prototype, "_config", 2);
De = Mt([
  le("power-pilz-graph-stack-card-editor")
], De);
var ts = Object.defineProperty, rs = Object.getOwnPropertyDescriptor, te = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? rs(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && ts(t, r, i), i;
};
const mt = 1, vr = 24, wr = 300 * 1e3, ns = 60 * 1e3, is = 350, ne = 0.01, be = 4, ss = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", Sr = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let K = class extends U {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._graphTopInset = 0, this._drawConfigs = [], this._linePointsBySlot = {}, this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._isVisible = !1, this._liveRuntimeActive = !1, this.handlePointerMove = (e) => {
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
      timeframe_hours: vr,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      normalize_stack_to_percent: !1,
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
      decimals: mt
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : mt, r = this.readConfigString(e.entity), n = this.readConfigString(e.icon), i = this.readConfigString(e.entity_1) ?? r ?? "sensor.dev_home_power";
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
      entity_1: i,
      entity_1_name: this.readConfigString(e.entity_1_name),
      entity_1_enabled: e.entity_1_enabled ?? !0,
      entity_1_show_icon: e.entity_1_show_icon ?? !0,
      entity_1_icon: e.entity_1_icon ?? n ?? "mdi:chart-line",
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
    const e = this._config, t = e.decimals ?? mt, r = this.normalizeLineThickness(e.line_thickness), n = e.normalize_stack_to_percent === !0, i = this.collectSeriesEntries(e, t), s = this.withStackedCurrentValues(i, n), o = this.normalizeLegendLayout(e.legend_layout), a = e.hover_enabled !== !1, l = this._hoverState, c = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, d = c > 0 ? { top: `${c}px` } : {}, h = l ? {
      left: `${l.x}px`,
      top: `${l.y + c}px`,
      "--hover-dot-color": l.color
    } : {};
    return this._drawConfigs = i.map((_) => ({
      slot: _.slot,
      currentValue: _.currentValue,
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
    const r = t === null ? e.secondary : this.formatValue(t, e.unit, e.decimals);
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
          <div class="secondary">${r}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(e, t) {
    const r = [];
    for (let n = 1; n <= be; n += 1) {
      const i = n, s = this.slotEnabled(i, e), o = this.slotEntityId(i, e);
      if (!s || !o)
        continue;
      const a = this.entityName(this.slotCustomName(i, e), o, n), l = L(this.hass, o), c = e.unit ?? V(this.hass, o) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(i, e), _ = this.iconStyle(this.slotIconColor(i, e)), u = this.resolveColor(Sr[i], ss), m = this.resolveColor(this.slotTrendColor(i, e), u);
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
    const r = e.reduce((o, a) => o + (a.currentValue ?? 0), 0), n = Number.isFinite(r) && Math.abs(r) > ne;
    let i = 0, s = !1;
    return e.map((o) => {
      o.currentValue !== null && Number.isFinite(o.currentValue) && (i += o.currentValue, s = !0);
      const a = s ? t ? n ? i / r * 100 : 0 : i : null, l = t ? "%" : o.unit;
      return {
        ...o,
        unit: l,
        secondary: this.formatValue(a, l, o.decimals)
      };
    });
  }
  slotEntityId(e, t) {
    return Dr(e, t);
  }
  slotCustomName(e, t) {
    return Vr(e, t);
  }
  slotEnabled(e, t) {
    return Fr(e, t);
  }
  slotShowIcon(e, t) {
    return Ur(e, t);
  }
  slotIcon(e, t) {
    return jr(e, t);
  }
  slotIconColor(e, t) {
    return Gr(e, t);
  }
  slotTrendColor(e, t) {
    return Wr(e, t);
  }
  entityName(e, t, r) {
    return Kr(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    return Xr(e, t, r);
  }
  readConfigString(e) {
    return G(e);
  }
  normalizeLegendLayout(e) {
    return qr(e);
  }
  normalizeTimeframeHours(e) {
    return $t(e, vr);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return Tt(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : Sr[r];
  }
  iconStyle(e) {
    return St(e);
  }
  resolveColor(e, t = "") {
    return wt(e, t);
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
    var g, b;
    const i = Date.now() - t, s = 0, o = 100, a = e.map((x) => x.value), l = (r == null ? void 0 : r.min) ?? Math.min(...a), c = (r == null ? void 0 : r.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, _ = Math.max(c - l, ne), u = e.map((x) => {
      const v = Math.max(0, Math.min(100, (x.ts - i) / t * 100)), y = s + v / 100 * (o - s), w = _ <= ne ? 0.5 : (x.value - l) / _, C = h - w * (h - d);
      return { x: y, y: C, value: x.value };
    }), m = ((g = u[0]) == null ? void 0 : g.x) ?? s, S = ((b = u[u.length - 1]) == null ? void 0 : b.x) ?? o, p = Math.max(0, S - m), f = 18;
    if (u.length >= 2 && p < f) {
      const x = o - f, v = Math.max(s, Math.min(x, S - f));
      if (p <= ne) {
        const w = f / (u.length - 1);
        return u.map((C, E) => ({
          ...C,
          x: Math.max(s, Math.min(o, v + w * E))
        }));
      }
      const y = f / p;
      return u.map((w) => ({
        ...w,
        x: Math.max(s, Math.min(o, v + (w.x - m) * y))
      }));
    }
    return u;
  }
  toCanvasPoints(e, t, r) {
    return xt(e, t, r);
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
    var p, f, g;
    const e = this.perfNow();
    if (this._drawConfigs.length === 0) {
      this._linePointsBySlot = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "no-draw-configs" });
      return;
    }
    const t = this.renderRoot.querySelector(".card-trend-canvas-area"), r = this.renderRoot.querySelector(".card-trend-canvas-line");
    if (!t || !r) {
      this._linePointsBySlot = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "missing-canvas" });
      return;
    }
    const n = this.prepareTrendCanvas(t), i = this.prepareTrendCanvas(r);
    if (!n || !i) {
      this._linePointsBySlot = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const s = ((p = this._config) == null ? void 0 : p.fill_area_enabled) !== !1, o = ((f = this._config) == null ? void 0 : f.normalize_stack_to_percent) === !0, a = ((g = this._config) == null ? void 0 : g.shared_trend_scale) === !0, l = this.trendWindowMs(this._config), c = {}, d = this.buildStackedTrendSeries(l), h = o ? this.normalizeStackedSeriesToPercent(d) : d, _ = o ? a ? { min: 0, max: 100 } : null : a ? this.computeStackedValueRange(h) : null;
    let u = 0, m = 0;
    [...this._drawConfigs].sort((b, x) => x.slot - b.slot).forEach((b) => {
      const x = h[b.slot] ?? [];
      if (x.length < 2)
        return;
      const v = this.toTrendCoordinates(x, l, _);
      if (v.length < 2)
        return;
      const y = this.toCanvasPoints(v, n.width, n.height), w = this.toCanvasPoints(v, i.width, i.height);
      s && this.drawTrendArea(n.ctx, y, b.color, n.height), this.drawTrendLine(i.ctx, w, b.color, b.lineWidth), c[b.slot] = w, u += 1, m += w.length;
    }), this._linePointsBySlot = c, this._hoverState && !c[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: u,
      points: m,
      fill_area: s,
      shared_scale: a,
      normalize_percent: o
    });
  }
  buildStackedTrendSeries(e) {
    const t = {}, r = [...this._drawConfigs].sort((i, s) => i.slot - s.slot);
    let n = null;
    return r.forEach((i) => {
      const s = this.trendPoints(i.slot, i.currentValue);
      if (s.length === 0)
        return;
      const o = this.normalizeTrendSeries(s, e);
      if (o.length === 0)
        return;
      const a = n ? this.sumTrendSeries(n, o) : o;
      t[i.slot] = a, n = a;
    }), t;
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
    if (Math.abs(l) <= ne)
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
    const t = {}, r = Object.keys(e).map((s) => Number(s)).filter((s) => Number.isFinite(s) && s >= 1 && s <= be).sort((s, o) => s - o);
    if (r.length === 0)
      return t;
    const n = r[r.length - 1], i = e[n] ?? [];
    return i.length < 1 || r.forEach((s) => {
      const o = e[s] ?? [];
      o.length !== 0 && (t[s] = o.map((a) => {
        const l = this.interpolateTrendValue(i, a.ts);
        if (!Number.isFinite(l) || Math.abs(l) <= ne)
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
      if (Math.abs(a) <= ne)
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
    !e && r - this._lastTrendRefresh < wr || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
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
    }, is));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, wr), this.updateComplete.then(() => {
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
      for (const b of o) {
        const x = this.slotEntityId(b, r);
        if (!x)
          continue;
        c.set(b, x);
        const v = this._trendSeries[b] ?? [];
        if (e || v.length === 0 || d.has(x)) {
          d.add(x), h.delete(x);
          continue;
        }
        if (d.has(x))
          continue;
        h.add(x);
        const y = ((a = v[v.length - 1]) == null ? void 0 : a.ts) ?? u, w = Math.max(u, y - ns);
        _ = Math.min(_, w);
      }
      let m = 0;
      const S = d.size > 0 ? await (async () => {
        const b = this.perfNow(), x = await pe(
          this.hass,
          Array.from(d),
          i,
          { dataSource: s }
        );
        return m = this.perfNow() - b, x;
      })() : {};
      let p = 0;
      const f = h.size > 0 ? await (async () => {
        const b = this.perfNow(), x = await pe(
          this.hass,
          Array.from(h),
          i,
          {
            startMs: Number.isFinite(_) ? _ : u,
            dataSource: s
          }
        );
        return p = this.perfNow() - b, x;
      })() : {};
      c.forEach((b, x) => {
        const v = this._trendSeries[x] ?? [];
        if (d.has(b)) {
          const y = S[b] ?? [];
          n[x] = y.length > 0 ? y : v.filter((w) => w.ts >= u);
          return;
        }
        if (h.has(b)) {
          const y = f[b] ?? [];
          n[x] = Le(v, y, u);
          return;
        }
        n[x] = v.filter((y) => y.ts >= u);
      });
      const g = this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((b) => Number(b)).filter((b) => Number.isFinite(b) && b >= 1 && b <= be).every((b) => {
        const x = b;
        return this.areTrendSeriesEqual(n[x] ?? [], this._trendSeries[x] ?? []);
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
        incremental_fetch_ms: this.toPerfMs(p),
        series_changed: !g
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let r = 1; r <= be; r += 1) {
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
    for (let r = 1; r <= be; r += 1) {
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
K.styles = Fe`
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
  I({ attribute: !1 })
], K.prototype, "hass", 2);
te([
  I({ type: Boolean })
], K.prototype, "preview", 2);
te([
  I({ type: Boolean })
], K.prototype, "editMode", 2);
te([
  P()
], K.prototype, "_config", 2);
te([
  P()
], K.prototype, "_trendSeries", 2);
te([
  P()
], K.prototype, "_graphTopInset", 2);
te([
  P()
], K.prototype, "_hoverState", 2);
K = te([
  le("power-pilz-graph-stack-card")
], K);
var os = Object.defineProperty, as = Object.getOwnPropertyDescriptor, Rt = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? as(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && os(t, r, i), i;
};
const ls = [
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
  { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } }
], cs = {
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
  decimals: "Decimals"
};
let Ve = class extends U {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = e.name ?? "";
      return cs[t] ?? t;
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
      type: "custom:power-pilz-wallbox-card"
    };
  }
  render() {
    return !this.hass || !this._config ? T : $`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${$e}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ls}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Rt([
  I({ attribute: !1 })
], Ve.prototype, "hass", 2);
Rt([
  P()
], Ve.prototype, "_config", 2);
Ve = Rt([
  le("power-pilz-wallbox-card-editor")
], Ve);
var ds = Object.defineProperty, ce = (e, t, r, n) => {
  for (var i = void 0, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = o(t, r, i) || i);
  return i && ds(t, r, i), i;
};
const hs = 0.01, xr = "power-pilz-wallbox-mode-menu-portal-style", zt = class zt extends U {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._actionBusy = !1, this._modeMenuOpen = !1, this._modeMenuOptionCount = 0, this.toggleModeMenu = (t) => {
      var o;
      if (t.stopPropagation(), this.isEditorPreview() || !((o = this._config) != null && o.mode_entity) || this._actionBusy)
        return;
      const r = me(this.hass, this._config.mode_entity), n = (r == null ? void 0 : r.state) ?? "", i = this.getModeOptions(r);
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
      const r = me(this.hass, this._config.mode_entity);
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
      const r = L(this.hass, this._config.power_entity), n = at(this.hass, this._config.status_entity), i = this.isCharging(n, r, this._config.command_entity), s = this.resolveActionCommand(i);
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
      decimals: 1
    };
  }
  setConfig(t) {
    const r = t.power_entity ?? "sensor.dev_wallbox_power";
    this._config = {
      ...t,
      icon: t.icon ?? "mdi:power-plug",
      name: t.name ?? "Wallbox",
      show_mode_selector: t.show_mode_selector ?? !0,
      show_live_value: t.show_live_value ?? !0,
      show_command_button: t.show_command_button ?? !0,
      decimals: t.decimals ?? 1,
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
    const t = this._config, r = L(this.hass, t.power_entity), n = V(this.hass, t.power_entity) ?? "kW", i = at(this.hass, t.status_entity), s = me(this.hass, t.mode_entity), o = (s == null ? void 0 : s.state) ?? "", a = this.getModeOptions(s), l = this.isCharging(i, r, t.command_entity), c = this.resolveActionCommand(l), d = l ? "Stop" : "Start", h = l ? "mdi:pause" : "mdi:play", _ = this.statusLabel(i, l), u = this.formatPower(r, n, t.decimals ?? 1), m = this.showModeSelector(t, a), S = this.showLiveValue(t), p = this.showCommandButton(t), f = this.isEditorPreview() || this._actionBusy || !t.mode_entity || a.length === 0, g = o || a[0] || "Mode", b = this._modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down", x = this.iconStyle(t.icon_color), y = Number(S) + Number(p) === 1, w = m && S && p, C = y && S, E = y && p || w, R = C || E, z = S && !C, A = p && !E, H = m || z || A, N = m ? z || A ? A ? "actions" : "actions no-command" : "actions mode-only" : "actions no-mode";
    return (!m || f) && this._modeMenuOpen && this.closeModeMenuPortal(), $`
      <ha-card>
        <div class="container">
          <div class="state-item ${R ? "compact-state" : ""}">
            <div class="icon-wrap">
              <div class="icon-shape" style=${M(x)}>
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
                <div class=${N}>
                  ${m ? $`
                        <div class="mode-select-wrap">
                          <button
                            type="button"
                            class="mode-select"
                            ?disabled=${f}
                            @click=${this.toggleModeMenu}
                            aria-haspopup="listbox"
                            aria-expanded=${this._modeMenuOpen ? "true" : "false"}
                            title="Charging mode"
                          >
                            <span class="mode-select-label">${g}</span>
                            <ha-icon class="mode-select-chevron" .icon=${b}></ha-icon>
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
    return t === null ? `-- ${r}` : `${Math.abs(t).toFixed(n)} ${r}`;
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
      const s = (i = at(this.hass, n)) == null ? void 0 : i.toLowerCase();
      if (s === "on")
        return !0;
      if (s === "off")
        return !1;
    }
    return r !== null && r > hs;
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
    return St(t);
  }
  disconnectedCallback() {
    this.closeModeMenuPortal(), super.disconnectedCallback();
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  ensureModeMenuPortalStyles() {
    if (document.getElementById(xr))
      return;
    const t = document.createElement("style");
    t.id = xr, t.textContent = `
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
zt.styles = Fe`
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
let j = zt;
ce([
  I({ attribute: !1 })
], j.prototype, "hass");
ce([
  I({ type: Boolean })
], j.prototype, "preview");
ce([
  I({ type: Boolean })
], j.prototype, "editMode");
ce([
  I({ reflect: !0, type: String })
], j.prototype, "layout");
ce([
  P()
], j.prototype, "_config");
ce([
  P()
], j.prototype, "_actionBusy");
ce([
  P()
], j.prototype, "_modeMenuOpen");
class us extends j {
}
customElements.get("power-pilz-wallbox-card") || customElements.define("power-pilz-wallbox-card", j);
customElements.get("power-pilz-wallbox-card-v2") || customElements.define("power-pilz-wallbox-card-v2", us);
window.customCards = window.customCards || [];
const _s = [
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
for (const e of _s)
  window.customCards.some((t) => t.type === e.type) || window.customCards.push(e);
console.info(
  `%cPOWER PILZ%c v${$e}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
//# sourceMappingURL=power-pilz.js.map
