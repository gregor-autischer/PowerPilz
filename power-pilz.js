/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ke = globalThis, nr = Ke.ShadowRoot && (Ke.ShadyCSS === void 0 || Ke.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ir = Symbol(), Ar = /* @__PURE__ */ new WeakMap();
let hn = class {
  constructor(t, r, n) {
    if (this._$cssResult$ = !0, n !== ir) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (nr && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = Ar.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Ar.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Bi = (e) => new hn(typeof e == "string" ? e : e + "", void 0, ir), st = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, i, s) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[s + 1], e[0]);
  return new hn(r, e, ir);
}, Hi = (e, t) => {
  if (nr) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), i = Ke.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = r.cssText, e.appendChild(n);
  }
}, Pr = nr ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return Bi(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Di, defineProperty: Fi, getOwnPropertyDescriptor: Vi, getOwnPropertyNames: Ui, getOwnPropertySymbols: Wi, getPrototypeOf: ji } = Object, te = globalThis, Or = te.trustedTypes, Gi = Or ? Or.emptyScript : "", Et = te.reactiveElementPolyfillSupport, Ie = (e, t) => e, Je = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Gi : null;
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
} }, sr = (e, t) => !Di(e, t), Ir = { attribute: !0, type: String, converter: Je, reflect: !1, useDefault: !1, hasChanged: sr };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), te.litPropertyMetadata ?? (te.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ge = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Ir) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, r);
      i !== void 0 && Fi(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: i, set: s } = Vi(this.prototype, t) ?? { get() {
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
    if (this.hasOwnProperty(Ie("elementProperties"))) return;
    const t = ji(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ie("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ie("properties"))) {
      const r = this.properties, n = [...Ui(r), ...Wi(r)];
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
      for (const i of n) r.unshift(Pr(i));
    } else t !== void 0 && r.push(Pr(t));
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
    return Hi(t, this.constructor.elementStyles), t;
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
ge.elementStyles = [], ge.shadowRootOptions = { mode: "open" }, ge[Ie("elementProperties")] = /* @__PURE__ */ new Map(), ge[Ie("finalized")] = /* @__PURE__ */ new Map(), Et == null || Et({ ReactiveElement: ge }), (te.reactiveElementVersions ?? (te.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ke = globalThis, kr = (e) => e, Qe = ke.trustedTypes, Lr = Qe ? Qe.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, un = "$lit$", ee = `lit$${Math.random().toFixed(9).slice(2)}$`, _n = "?" + ee, qi = `<${_n}>`, de = document, Le = () => de.createComment(""), Ne = (e) => e === null || typeof e != "object" && typeof e != "function", or = Array.isArray, Yi = (e) => or(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Tt = `[ 	
\f\r]`, Ee = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Nr = /-->/g, Br = />/g, se = RegExp(`>|${Tt}(?:([^\\s"'>=/]+)(${Tt}*=${Tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Hr = /'/g, Dr = /"/g, mn = /^(?:script|style|textarea|title)$/i, Xi = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), E = Xi(1), he = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), Fr = /* @__PURE__ */ new WeakMap(), le = de.createTreeWalker(de, 129);
function pn(e, t) {
  if (!or(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Lr !== void 0 ? Lr.createHTML(t) : t;
}
const Ki = (e, t) => {
  const r = e.length - 1, n = [];
  let i, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Ee;
  for (let a = 0; a < r; a++) {
    const l = e[a];
    let c, d, h = -1, _ = 0;
    for (; _ < l.length && (o.lastIndex = _, d = o.exec(l), d !== null); ) _ = o.lastIndex, o === Ee ? d[1] === "!--" ? o = Nr : d[1] !== void 0 ? o = Br : d[2] !== void 0 ? (mn.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = se) : d[3] !== void 0 && (o = se) : o === se ? d[0] === ">" ? (o = i ?? Ee, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? se : d[3] === '"' ? Dr : Hr) : o === Dr || o === Hr ? o = se : o === Nr || o === Br ? o = Ee : (o = se, i = void 0);
    const u = o === se && e[a + 1].startsWith("/>") ? " " : "";
    s += o === Ee ? l + qi : h >= 0 ? (n.push(c), l.slice(0, h) + un + l.slice(h) + ee + u) : l + ee + (h === -2 ? a : u);
  }
  return [pn(e, s + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Be {
  constructor({ strings: t, _$litType$: r }, n) {
    let i;
    this.parts = [];
    let s = 0, o = 0;
    const a = t.length - 1, l = this.parts, [c, d] = Ki(t, r);
    if (this.el = Be.createElement(c, n), le.currentNode = this.el.content, r === 2 || r === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = le.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(un)) {
          const _ = d[o++], u = i.getAttribute(h).split(ee), m = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: s, name: m[2], strings: u, ctor: m[1] === "." ? Ji : m[1] === "?" ? Qi : m[1] === "@" ? es : ot }), i.removeAttribute(h);
        } else h.startsWith(ee) && (l.push({ type: 6, index: s }), i.removeAttribute(h));
        if (mn.test(i.tagName)) {
          const h = i.textContent.split(ee), _ = h.length - 1;
          if (_ > 0) {
            i.textContent = Qe ? Qe.emptyScript : "";
            for (let u = 0; u < _; u++) i.append(h[u], Le()), le.nextNode(), l.push({ type: 2, index: ++s });
            i.append(h[_], Le());
          }
        }
      } else if (i.nodeType === 8) if (i.data === _n) l.push({ type: 2, index: s });
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
function we(e, t, r = e, n) {
  var o, a;
  if (t === he) return t;
  let i = n !== void 0 ? (o = r._$Co) == null ? void 0 : o[n] : r._$Cl;
  const s = Ne(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== s && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), s === void 0 ? i = void 0 : (i = new s(e), i._$AT(e, r, n)), n !== void 0 ? (r._$Co ?? (r._$Co = []))[n] = i : r._$Cl = i), i !== void 0 && (t = we(e, i._$AS(e, t.values), i, n)), t;
}
class Zi {
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
        l.type === 2 ? c = new He(s, s.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (c = new ts(s, this, t)), this._$AV.push(c), l = n[++a];
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
class He {
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
    t = we(this, t, r), Ne(t) ? t === T || t == null || t === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== he && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Yi(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== T && Ne(this._$AH) ? this._$AA.nextSibling.data = t : this.T(de.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: r, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Be.createElement(pn(n.h, n.h[0]), this.options)), n);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === i) this._$AH.p(r);
    else {
      const o = new Zi(i, this), a = o.u(this.options);
      o.p(r), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let r = Fr.get(t.strings);
    return r === void 0 && Fr.set(t.strings, r = new Be(t)), r;
  }
  k(t) {
    or(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let n, i = 0;
    for (const s of t) i === r.length ? r.push(n = new He(this.O(Le()), this.O(Le()), this, this.options)) : n = r[i], n._$AI(s), i++;
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
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t, this.name = r, this._$AM = i, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = T;
  }
  _$AI(t, r = this, n, i) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) t = we(this, t, r, 0), o = !Ne(t) || t !== this._$AH && t !== he, o && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = s[0], l = 0; l < s.length - 1; l++) c = we(this, a[n + l], r, l), c === he && (c = this._$AH[l]), o || (o = !Ne(c) || c !== this._$AH[l]), c === T ? t = T : t !== T && (t += (c ?? "") + s[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ji extends ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }
}
class Qi extends ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== T);
  }
}
class es extends ot {
  constructor(t, r, n, i, s) {
    super(t, r, n, i, s), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = we(this, t, r, 0) ?? T) === he) return;
    const n = this._$AH, i = t === T && n !== T || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== T && (n === T || i);
    i && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ts {
  constructor(t, r, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    we(this, t);
  }
}
const $t = ke.litHtmlPolyfillSupport;
$t == null || $t(Be, He), (ke.litHtmlVersions ?? (ke.litHtmlVersions = [])).push("3.3.2");
const rs = (e, t, r) => {
  const n = (r == null ? void 0 : r.renderBefore) ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const s = (r == null ? void 0 : r.renderBefore) ?? null;
    n._$litPart$ = i = new He(t.insertBefore(Le(), s), s, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce = globalThis;
let U = class extends ge {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = rs(r, this.renderRoot, this.renderOptions);
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
var dn;
U._$litElement$ = !0, U.finalized = !0, (dn = ce.litElementHydrateSupport) == null || dn.call(ce, { LitElement: U });
const Mt = ce.litElementPolyfillSupport;
Mt == null || Mt({ LitElement: U });
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
const ns = { attribute: !0, type: String, converter: Je, reflect: !1, hasChanged: sr }, is = (e = ns, t, r) => {
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
  return (t, r) => typeof r == "object" ? is(e, t, r) : ((n, i, s) => {
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
  return I({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ss = { ATTRIBUTE: 1 }, os = (e) => (...t) => ({ _$litDirective$: e, values: t });
let as = class {
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
const yn = "important", ls = " !" + yn, R = os(class extends as {
  constructor(e) {
    var t;
    if (super(e), e.type !== ss.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const s = typeof i == "string" && i.endsWith(ls);
        n.includes("-") || s ? r.setProperty(n, s ? i.slice(0, -11) : i, s ? yn : "") : r[n] = i;
      }
    }
    return he;
  }
}), ve = (e, t) => {
  if (t)
    return e.states[t];
}, H = (e, t) => {
  const r = ve(e, t);
  if (!r)
    return null;
  const n = Number(r.state);
  return Number.isFinite(n) ? n : null;
}, B = (e, t) => {
  const r = ve(e, t);
  if (!r)
    return;
  const n = r.attributes.unit_of_measurement;
  return typeof n == "string" ? n : void 0;
}, Ze = (e, t) => {
  const r = ve(e, t);
  return r == null ? void 0 : r.state;
}, D = (e, t = "hybrid") => e === "history" || e === "statistics" || e === "hybrid" ? e : e === "auto" || t === "auto" ? "hybrid" : t, fn = 3e4, cs = 10 * 6e4, ds = 1440, hs = 1e4, us = 2e3, bn = 40, at = /* @__PURE__ */ new Map(), Rt = /* @__PURE__ */ new Map(), zt = /* @__PURE__ */ new Map(), Vr = /* @__PURE__ */ new WeakMap(), Ur = /* @__PURE__ */ new WeakMap(), Wr = /* @__PURE__ */ new WeakMap(), jr = /* @__PURE__ */ new WeakMap(), ar = (e, t = ds) => {
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
}, gn = (e, t) => {
  const r = t ? hs : us;
  return !Number.isFinite(e) || e <= 0 || r <= 1 ? Math.max(0, Math.floor(e)) : Math.max(0, Math.floor(e / r) * r);
}, _s = (e) => {
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
}, ms = (e, t, r = Date.now()) => {
  if (!Array.isArray(e))
    return { entityId: null, points: [] };
  const n = [];
  let i = null;
  for (const a of e) {
    if (!a || typeof a != "object")
      continue;
    const l = a;
    i === null && typeof l.entity_id == "string" && l.entity_id.length > 0 && (i = l.entity_id);
    const c = Number(l.state), d = _s(l);
    !Number.isFinite(c) || d === null || n.push({ ts: d, value: c });
  }
  const s = r - t, o = n.filter((a) => a.ts >= s).sort((a, l) => a.ts - l.ts);
  return {
    entityId: i,
    points: ar(o)
  };
}, lt = (e, t, r) => `${e}|${t}|${r}`, V = (e) => e.map((t) => ({ ts: t.ts, value: t.value })), At = (e) => {
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
}, ps = (e) => At(e.start) ?? At(e.end) ?? At(e.last_reset), ys = (e) => {
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
}, fs = (e, t, r = Date.now()) => {
  if (!Array.isArray(e))
    return [];
  const n = [];
  e.forEach((o) => {
    if (!o || typeof o != "object")
      return;
    const a = o, l = ps(a), c = ys(a);
    l === null || c === null || n.push({ ts: l, value: c });
  });
  const i = r - t, s = n.filter((o) => o.ts >= i).sort((o, a) => o.ts - a.ts);
  return ar(s);
}, vn = (e) => {
  const t = jr.get(e);
  if (t)
    return t;
  const r = /* @__PURE__ */ new Map();
  return jr.set(e, r), r;
}, wn = (e, t, r) => {
  const n = vn(e), i = n.get(t);
  return i ? i.expiresAt <= r ? (n.delete(t), null) : i.supported : null;
}, Gr = (e, t, r, n) => {
  vn(e).set(t, {
    supported: r,
    expiresAt: n + cs
  });
}, bs = (e) => {
  const t = Vr.get(e);
  if (t)
    return t;
  const r = /* @__PURE__ */ new Map();
  return Vr.set(e, r), r;
}, xn = async (e, t, r, n, i, s) => {
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
    const m = ms(_, r, i), S = t[u], g = m.entityId ?? S;
    g && (h[g] = m.points);
  }), t.forEach((_) => {
    _ in h || (h[_] = []), s && at.set(lt("history", _, r), {
      expiresAt: i + fn,
      points: V(h[_])
    });
  }), h;
}, gs = (e, t, r, n, i) => {
  const s = bs(e);
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
        const h = await xn(
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
    }, bn));
  });
}, vs = (e) => {
  const t = Ur.get(e);
  if (t)
    return t;
  const r = /* @__PURE__ */ new Map();
  return Ur.set(e, r), r;
}, ws = async (e, t, r, n) => {
  const i = [...n], s = new Date(t).toISOString(), o = new Date(r).toISOString(), a = Wr.get(e), l = a ? [a] : ["recorder/statistics_during_period", "history/statistics_during_period"];
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
      return Wr.set(e, d), h;
    } catch (h) {
      c = h;
    }
  throw c;
}, xs = async (e, t) => {
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
}, Sn = async (e, t, r, n, i, s) => {
  let o;
  try {
    o = await ws(e, n, i, t);
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
    const m = fs(a[u], r, i);
    l[u] = m, Gr(e, u, !0, i), s && at.set(lt("statistics", u, r), {
      expiresAt: i + fn,
      points: V(m)
    });
  });
  const h = [];
  d.forEach((u) => {
    const m = wn(e, u, i);
    if (m !== !0) {
      if (m === !1) {
        c.add(u);
        return;
      }
      h.push(u);
    }
  });
  const _ = await xs(e, h);
  return _ !== null ? h.forEach((u) => {
    const m = _.has(u);
    Gr(e, u, m, i), m || c.add(u);
  }) : h.forEach((u) => {
    c.add(u);
  }), {
    pointsByEntity: l,
    unsupportedEntityIds: c
  };
}, Ss = (e, t, r, n, i) => {
  const s = vs(e);
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
        const h = await Sn(
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
    }, bn));
  });
}, Cn = async (e, t, r, n) => {
  const i = e.callApi, s = Array.from(new Set(t.filter((g) => g.length > 0)));
  if (!i || s.length === 0)
    return {};
  const o = Date.now(), a = typeof n == "number" && Number.isFinite(n) ? Math.max(o - r, Math.floor(n)) : o - r, l = a <= o - r + 1e3, c = gn(a, l), d = {}, h = [];
  if (s.forEach((g) => {
    if (l) {
      const y = lt("history", g, r), b = at.get(y);
      if (b && b.expiresAt > o) {
        d[g] = V(b.points);
        return;
      }
    }
    h.push(g);
  }), h.length === 0)
    return d;
  if (l) {
    const g = `${c}|${r}`, y = await gs(
      i,
      g,
      h,
      r,
      c
    );
    return h.forEach((b) => {
      d[b] = V(y[b] ?? []);
    }), d;
  }
  const _ = [...h].sort(), u = `${c}|${r}|${_.join(",")}`, m = Rt.get(u);
  if (m) {
    const g = await m;
    return h.forEach((y) => {
      d[y] = V(g[y] ?? []);
    }), d;
  }
  const S = (async () => xn(
    i,
    h,
    r,
    c,
    o,
    l
  ))();
  Rt.set(u, S);
  try {
    const g = await S;
    return h.forEach((y) => {
      d[y] = V(g[y] ?? []);
    }), d;
  } finally {
    Rt.delete(u);
  }
}, En = async (e, t, r, n) => {
  const i = e.callWS, s = Array.from(new Set(t.filter((b) => b.length > 0)));
  if (!i || s.length === 0)
    return {
      pointsByEntity: {},
      unsupportedEntityIds: new Set(s)
    };
  const o = Date.now(), a = typeof n == "number" && Number.isFinite(n) ? Math.max(o - r, Math.floor(n)) : o - r, l = a <= o - r + 1e3, c = gn(a, l), d = {}, h = [], _ = /* @__PURE__ */ new Set();
  if (s.forEach((b) => {
    if (wn(i, b, o) === !1) {
      d[b] = [], _.add(b);
      return;
    }
    if (l) {
      const w = lt("statistics", b, r), x = at.get(w);
      if (x && x.expiresAt > o) {
        d[b] = V(x.points);
        return;
      }
    }
    h.push(b);
  }), h.length === 0)
    return {
      pointsByEntity: d,
      unsupportedEntityIds: _
    };
  const u = (b) => (h.forEach((v) => {
    d[v] = V(b.pointsByEntity[v] ?? []), b.unsupportedEntityIds.has(v) && _.add(v);
  }), {
    pointsByEntity: d,
    unsupportedEntityIds: _
  });
  if (l) {
    const b = `${c}|${r}`, v = await Ss(
      i,
      b,
      h,
      r,
      c
    );
    return u(v);
  }
  const m = [...h].sort(), S = `${c}|${r}|${m.join(",")}`, g = zt.get(S);
  if (g) {
    const b = await g;
    return u(b);
  }
  const y = (async () => Sn(
    i,
    h,
    r,
    c,
    o,
    l
  ))();
  zt.set(S, y);
  try {
    const b = await y;
    return u(b);
  } finally {
    zt.delete(S);
  }
}, Cs = async (e, t, r, n) => {
  const i = await En(
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
  const a = await Cn(
    e,
    o,
    r,
    n
  );
  return o.forEach((l) => {
    s[l] = V(a[l] ?? []);
  }), s;
}, xe = async (e, t, r, n) => {
  const i = D(n == null ? void 0 : n.dataSource, "hybrid");
  return i === "history" ? Cn(e, t, r, n == null ? void 0 : n.startMs) : i === "statistics" ? (await En(
    e,
    t,
    r,
    n == null ? void 0 : n.startMs
  )).pointsByEntity : Cs(e, t, r, n == null ? void 0 : n.startMs);
}, qr = {
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
  if (t in qr)
    return `var(--rgb-${t}, ${qr[t]})`;
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
    value: i.value
  }));
  return Es(n, t);
}, Es = (e, t) => {
  if (e.length <= 3)
    return e;
  const r = Math.max(24, Math.min(e.length, Math.round(t)));
  if (e.length <= r)
    return Yr(e);
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
  return n.push(e[e.length - 1]), Yr(n);
}, Yr = (e) => {
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
}, Xr = {
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
    const r = t.slice(0, -2), i = Xr[r === "K" ? "k" : r];
    return i === void 0 ? null : {
      family: "energy",
      prefixPower: i,
      factor: Math.pow(1e3, i),
      canonicalUnit: "Wh"
    };
  }
  if (t.endsWith("W")) {
    const r = t.slice(0, -1), i = Xr[r === "K" ? "k" : r];
    return i === void 0 ? null : {
      family: "power",
      prefixPower: i,
      factor: Math.pow(1e3, i),
      canonicalUnit: "W"
    };
  }
  return null;
}, Ts = (e, t) => {
  const r = Math.max(0, Math.min(Ot.length - 1, t)), n = Ot[r] ?? "";
  return e === "energy" ? `${n}Wh` : `${n}W`;
}, $s = (e) => {
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
  const o = e < 0 ? "-" : "", a = Math.abs(e) * s.factor, l = $s(a), c = Ts(s.family, l), d = a / Math.pow(1e3, l), h = l === 0 ? n.baseDecimals : n.prefixedDecimals;
  return `${o}${d.toFixed(h)} ${c}`.trim();
}, Ms = (e) => {
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
}, De = "0.2.0";
var Rs = Object.defineProperty, zs = Object.getOwnPropertyDescriptor, _r = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? zs(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && Rs(t, r, i), i;
};
const As = 4, Ps = 8, Kr = 2, Os = /* @__PURE__ */ new Set(["solar", "home", "grid", "grid_secondary"]), Is = (e, t) => {
  const r = `${e}_sub_${t}`, n = Os.has(e);
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
    schema: Is(e, s + 1)
  }))
}), ks = (e, t, r) => ({
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
}), Ls = {
  select: {
    mode: "dropdown",
    options: [
      { label: "Auto (recommended)", value: "auto" },
      { label: "Statistics (fastest)", value: "statistics" },
      { label: "History (raw)", value: "history" }
    ]
  }
}, Ns = (e) => {
  const t = D(e, "hybrid");
  return t === "hybrid" ? "auto" : t;
}, Bs = (e) => e === "auto" || e === "history" || e === "statistics" || e === "hybrid" ? e : "auto", It = "When enabled, the solar main node shows the sum of enabled solar sub-node entities instead of the solar entity. Solar sub-nodes with State mode enabled are excluded from this sum.", kt = "When enabled, the home main node is calculated as solar + grid + grid 2 - battery - battery 2 using compatible unit conversion.", Ae = "When enabled, negative grid values (energy exported to the grid) are highlighted in the trend with the export color.", Pe = "When enabled, the grid icon switches to the export icon color while the grid value is negative.", Lt = "When enabled, the main grid node is shown. When disabled, the grid node is hidden.", Nt = "When enabled, the second grid node is shown. When disabled, the second grid node is hidden.", Bt = "When enabled, the main solar node is shown. When disabled, the solar node is hidden.", Ht = "Flow direction: + value animates from Solar to Center. 0 or - value shows no solar flow.", Dt = "When enabled, the main home node is shown. When disabled, the home node is hidden.", Ft = "Flow direction: + value animates from Center to Home. 0 or - value shows no home flow.", Vt = "When enabled, the main battery node is shown. When disabled, the battery node is hidden.", Ut = "Flow direction: + value animates from Center to Battery (charging). - value animates Battery to Center (discharging).", Wt = "When enabled, the second battery node is shown. When disabled, the second battery node is hidden.", jt = "Flow direction: + value animates from Center to Battery 2 (charging). - value animates Battery 2 to Center (discharging).", Oe = "Color used for battery low-threshold alert styling (icon and low trend section).", Gt = "Flow direction: + value animates from Grid to Center (import). - value animates from Center to Grid (export).", qt = "Flow direction: + value animates from Grid 2 to Center (import). - value animates from Center to Grid 2 (export).", Yt = "In default mode, this sub-node renders the entity as numeric value + unit.", Xt = "When enabled, this sub-node displays the entity state text (for example AUS/WW/HZ) instead of numeric value + unit.", Kt = "When enabled, this solar sub-node displays entity state text instead of numeric value + unit and is excluded from Solar auto-calc.", Zt = "Automatically formats values with metric prefixes (for example W/kW/MW and Wh/kWh/MWh).", Jt = "Optional unit override/fallback. Used when entities have no unit and as preferred output unit for auto-calculated values.", Qt = "Default decimal precision for displayed values and fallback when base/prefixed decimals are not set.", er = "Decimal precision for base units (W, Wh) when Auto unit scaling is enabled.", tr = "Decimal precision for prefixed units (kW, MW, kWh, MWh) when Auto unit scaling is enabled.", rr = "Controls where trend data is fetched from. In most setups, keep Auto (recommended), which prefers statistics and falls back to history automatically.", Hs = [
  ks("Center visuals", "mdi:palette-outline", [
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
                selector: Ls,
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
                name: "solar_entity",
                selector: { entity: { filter: { domain: "sensor" } } },
                helper: Ht,
                description: Ht
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
          helper: It,
          description: It
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
            helper: Lt,
            description: Lt
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
          helper: Ae,
          description: Ae
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
          helper: Ae,
          description: Ae
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
            helper: Dt,
            description: Dt
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
          helper: kt,
          description: kt
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
  qe("solar", "Solar sub blocks", "mdi:solar-power-variant", As),
  qe("grid", "Grid 1 sub blocks", "mdi:transmission-tower", Kr),
  qe("grid_secondary", "Grid 2 sub blocks", "mdi:transmission-tower", Kr),
  qe("home", "Home sub blocks", "mdi:flash", Ps)
], Ds = {
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
  decimals_prefixed_unit: "Decimals (prefixed units)"
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
      return Ds[t] ?? t;
    }, this.computeHelper = (e) => {
      const t = e.name ?? "";
      if (t === "solar_entity")
        return Ht;
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
        return Bt;
      if (t === "home_visible")
        return Dt;
      if (t === "battery_visible")
        return Vt;
      if (t === "battery_secondary_visible")
        return Wt;
      if (t === "solar_auto_calculate")
        return It;
      if (t === "home_auto_calculate")
        return kt;
      if (t === "grid_visible")
        return Lt;
      if (t === "grid_secondary_visible")
        return Nt;
      if (t === "grid_export_highlight" || t === "grid_secondary_export_highlight")
        return Ae;
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
        trend_data_source: Bs(r.trend_data_source),
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
      trend_data_source: Ns(e.trend_data_source),
      debug_performance: e.debug_performance ?? !1,
      decimals: e.decimals ?? 1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: e.decimals_base_unit ?? e.decimals ?? 1,
      decimals_prefixed_unit: e.decimals_prefixed_unit ?? e.decimals ?? 1,
      type: "custom:power-pilz-energy-card"
    };
  }
  render() {
    return !this.hass || !this._config ? T : E`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${De}
      </div>
      <div style="margin: 0 0 14px; color: var(--secondary-text-color); line-height: 1.4;">
        Highly flexible energy flow card with configurable main nodes, trends, sub-nodes, auto calculations,
        export highlighting, and advanced unit handling.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Hs}
        .computeLabel=${this.computeLabel}
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
_r([
  I({ attribute: !1 })
], tt.prototype, "hass", 2);
_r([
  O()
], tt.prototype, "_config", 2);
tt = _r([
  ue("power-pilz-energy-card-editor")
], tt);
var Fs = Object.defineProperty, Vs = Object.getOwnPropertyDescriptor, Q = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Vs(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && Fs(t, r, i), i;
};
const k = 0.01, Te = 1, be = 1440 * 60 * 1e3, Zr = 300 * 1e3, Jr = 60 * 1e3, Us = 350, Qr = 4, en = 8, Pt = 2, Ws = 260, js = 220, tn = -1e-6, oe = "red", Gs = "var(--rgb-primary-text-color, 33, 33, 33)", qs = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", ");
let W = class extends U {
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
      solar_auto_calculate: !1,
      solar_entity: o,
      grid_entity: a,
      battery_entity: l,
      battery_percentage_entity: c,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      auto_scale_units: !1,
      decimals: Te,
      decimals_base_unit: Te,
      decimals_prefixed_unit: Te
    };
  }
  setConfig(e) {
    const t = e.home_entity ?? e.consumption_entity ?? "sensor.dev_home_power", r = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Te, n = re(e.decimals_base_unit, r), i = re(e.decimals_prefixed_unit, r);
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
      trend_data_source: D(e.trend_data_source, "hybrid"),
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
    const e = this._config, t = e.decimals ?? Te, r = e.home_visible !== !1, n = e.solar_visible !== !1, i = e.grid_visible !== !1, s = i && e.grid_secondary_visible === !0, o = e.battery_visible !== !1, a = o && e.battery_secondary_visible === !0, l = this.normalizeBatteryDualAlignment(e.battery_dual_alignment), c = n ? this.collectSubBlocks("solar", e) : [], d = c.filter((P) => !P.stateMode), h = i ? this.collectSubBlocks("grid", e) : [], _ = s ? this.collectSubBlocks("grid_secondary", e) : [], u = r ? this.collectSubBlocks("home", e) : [], m = H(this.hass, e.home_entity), S = n ? H(this.hass, e.solar_entity) : null, g = i ? H(this.hass, e.grid_entity) : null, y = s ? H(this.hass, e.grid_secondary_entity) : null, b = o ? H(this.hass, e.battery_entity) : null, v = H(this.hass, e.battery_percentage_entity), w = a ? H(this.hass, e.battery_secondary_entity) : null, x = H(this.hass, e.battery_secondary_percentage_entity), p = e.unit ?? "kW", f = B(this.hass, e.solar_entity) ?? p, C = B(this.hass, e.grid_entity) ?? p, $ = B(this.hass, e.grid_secondary_entity) ?? p, M = B(this.hass, e.battery_entity), z = B(this.hass, e.battery_percentage_entity), A = B(this.hass, e.battery_secondary_entity), F = B(this.hass, e.battery_secondary_percentage_entity), L = M ?? p, G = A ?? p, me = this.resolveBatteryPercentage(
      v,
      b,
      M
    ), pe = this.resolveBatteryPercentage(
      x,
      w,
      A
    ), ct = !!this.readConfigString(e.battery_percentage_entity) || this.isPercentageUnit(M), dt = !!this.readConfigString(e.battery_secondary_percentage_entity) || this.isPercentageUnit(A), Se = e.solar_auto_calculate === !0 ? this.resolveAutoSolarUnit(e, d, p) : f, Ce = e.solar_auto_calculate === !0 ? this.computeAutoSolarValueFromSubBlocks(d, Se) : S, ht = e.home_auto_calculate === !0 ? this.resolveAutoHomeUnit(e, p, Se) : B(this.hass, e.home_entity) ?? p, Fe = e.home_auto_calculate === !0 ? this.computeAutoHomeValueFromNodeValues(
      {
        solar: Ce,
        grid: g,
        grid_secondary: y,
        battery: b,
        battery_secondary: w
      },
      {
        solar: Se,
        grid: C,
        grid_secondary: $,
        battery: L,
        battery_secondary: G
      },
      ht
    ) : m, Un = ct ? z ?? "%" : L, Wn = dt ? F ?? "%" : G, jn = this.toUnidirectionalFlow(Ce), Gn = this.toUnidirectionalFlow(Fe), qn = this.toBidirectionalFlow(g), Yn = this.toBidirectionalFlow(y), Xn = this.sumComparableValues([
      { value: g, unit: C },
      { value: y, unit: $ }
    ]), Kn = g === null && y === null ? "none" : this.toBidirectionalFlow(Xn), Zn = this.toBidirectionalFlow(b), Jn = this.toBidirectionalFlow(w), Qn = this.sumComparableValues([
      { value: b, unit: L },
      { value: w, unit: G }
    ]), ei = b === null && w === null ? "none" : this.toBidirectionalFlow(Qn), ti = this.resolveTapAction(e), ut = !this.isEditorPreview() && ti.action !== "none", ri = this.iconColorStyle(e.solar_icon_color), ni = this.iconColorStyle(e.home_icon_color), ii = this.iconShapeStyle(e.core_icon_color), _t = new Set(u.map((P) => P.index)), ye = new Set(c.map((P) => P.index)), si = _t.has(7) && _t.has(8), oi = [5, 6, 7, 8].some((P) => _t.has(P)), ai = ye.has(1) && ye.has(2) && !ye.has(3) && !ye.has(4), li = ye.has(3) && ye.has(4), vr = s && (ai && si || li && oi), ci = s && !vr, mt = u.some((P) => P.index >= 7), wr = this.homeSubPositions(mt), xr = this.gridSubPositions(s), Sr = this.gridSecondarySubPositions(), Cr = this.solarSubPositions(
      mt,
      ci,
      vr
    ), Er = u.filter((P) => P.index <= (mt ? 8 : 6)), pt = i ? { col: 1, row: s ? 2 : 3, colSpan: 2, rowSpan: 2 } : null, yt = s ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 } : null, ft = o ? {
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
      yt,
      ft,
      bt,
      c,
      h,
      _,
      Er,
      Cr,
      xr,
      Sr,
      wr
    ), gt = n ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, N) : null, Ve = pt ? this.normalizePlacement(pt, N) : null, Ue = yt ? this.normalizePlacement(yt, N) : null, vt = r ? this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, N) : null, We = ft ? this.normalizePlacement(ft, N) : null, je = bt ? this.normalizePlacement(bt, N) : null, Tr = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, N), di = this.normalizePositions(Cr, N), hi = this.normalizePositions(xr, N), ui = this.normalizePositions(Sr, N), _i = this.normalizePositions(wr, N), $r = this.normalizeBatteryThreshold(e.battery_low_threshold), Mr = !!e.battery_low_alert, Rr = this.normalizeBatteryThreshold(e.battery_secondary_low_threshold), zr = !!e.battery_secondary_low_alert, Ge = this.resolveColor(oe), wt = this.resolveColor(e.battery_low_alert_color, Ge), xt = this.resolveColor(
      e.battery_secondary_low_alert_color,
      Ge
    ), St = Mr && me !== null && me <= $r, mi = this.iconColorStyle(
      St ? wt : e.battery_icon_color
    ), pi = this.batteryIcon(
      me,
      this.isPercentageUnit(M) ? null : b,
      e.battery_icon
    ), Ct = zr && pe !== null && pe <= Rr, yi = this.iconColorStyle(
      Ct ? xt : e.battery_secondary_icon_color
    ), fi = this.batteryIcon(
      pe,
      this.isPercentageUnit(A) ? null : w,
      e.battery_secondary_icon
    ), bi = g !== null && Number.isFinite(g) && g < 0, gi = y !== null && Number.isFinite(y) && y < 0, vi = this.iconColorStyle(
      e.grid_export_icon_highlight === !0 && bi ? e.grid_export_icon_color : e.grid_icon_color
    ), wi = this.iconColorStyle(
      e.grid_secondary_export_icon_highlight === !0 && gi ? e.grid_secondary_export_icon_color : e.grid_secondary_icon_color
    ), xi = { "--flow-color-rgb": this.toRgbCss(e.flow_color) ?? Gs }, fe = this.resolveColor("purple"), Si = this.resolveColor(e.solar_trend_color, fe), Ci = this.resolveColor(e.grid_trend_color, fe), Ei = this.resolveColor(e.grid_secondary_trend_color, fe), Ti = this.resolveColor(e.grid_export_trend_color, Ge), $i = this.resolveColor(
      e.grid_secondary_export_trend_color,
      Ge
    ), Mi = this.resolveColor(e.home_trend_color, fe), Ri = this.resolveColor(e.battery_trend_color, fe), zi = this.resolveColor(e.battery_secondary_trend_color, fe), Ai = e.grid_export_highlight === !0 ? tn : null, Pi = e.grid_secondary_export_highlight === !0 ? tn : null, Oi = Mr && ct ? $r : null, Ii = ct ? me : b, ki = zr && dt ? Rr : null, Li = dt ? pe : w, Ni = this.buildFlowSegments(
      vt,
      Tr,
      gt,
      [
        ...Ve ? [{ placement: Ve, direction: qn }] : [],
        ...Ue ? [{ placement: Ue, direction: Yn }] : []
      ],
      Kn,
      [
        ...We ? [{ placement: We, direction: Zn }] : [],
        ...je ? [{ placement: je, direction: Jn }] : []
      ],
      ei,
      jn,
      Gn,
      N
    );
    return E`
      <ha-card
        class=${ut ? "interactive" : ""}
        tabindex=${ut ? 0 : -1}
        role=${ut ? "button" : "article"}
        @click=${this.handleCardClick}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div
            class="energy-grid"
            style=${R({
      ...xi,
      "--grid-columns": `${N.cols}`,
      "--grid-rows": `${N.rows}`,
      "--grid-aspect": `${N.cols} / ${N.rows}`
    })}
          >
            ${Ni.map(
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
                    class="energy-value solar ${Ce === null ? "missing" : ""}"
                    style=${R(this.gridPlacementStyle(gt))}
                  >
                    ${this.renderTrend("solar", Ce, Se, !!e.solar_trend, Si, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.solar_icon ?? "mdi:weather-sunny"}
                        style=${R(ri)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(Ce, Se, t)}</div>
                      <div class="energy-label">${e.solar_label}</div>
                    </div>
                  </div>
                ` : T}

            ${i && Ve ? E`
                  <div
                    class="energy-value grid ${g === null ? "missing" : ""}"
                    style=${R(this.gridPlacementStyle(Ve))}
                  >
                    ${this.renderTrend(
      "grid",
      g,
      C,
      !!e.grid_trend,
      Ci,
      Ai,
      Ti
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_icon ?? "mdi:transmission-tower"}
                        style=${R(vi)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(g, C, t)}</div>
                      <div class="energy-label">${e.grid_label}</div>
                    </div>
                  </div>
                ` : T}

            ${s && Ue ? E`
                  <div
                    class="energy-value grid-secondary ${y === null ? "missing" : ""}"
                    style=${R(this.gridPlacementStyle(Ue))}
                  >
                    ${this.renderTrend(
      "grid_secondary",
      y,
      $,
      !!e.grid_secondary_trend,
      Ei,
      Pi,
      $i
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${R(wi)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(y, $, t)}</div>
                      <div class="energy-label">${e.grid_secondary_label}</div>
                    </div>
                  </div>
                ` : T}

            ${r && vt ? E`
                  <div
                    class="energy-value home ${Fe === null ? "missing" : ""}"
                    style=${R(this.gridPlacementStyle(vt))}
                  >
                    ${this.renderTrend("home", Fe, ht, !!e.home_trend, Mi, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.home_icon ?? "mdi:home-lightning-bolt"}
                        style=${R(ni)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(Fe, ht, t)}</div>
                      <div class="energy-label">${e.home_label}</div>
                    </div>
                  </div>
                ` : T}

            ${this._showSubBlocks ? this.renderSubNodes("solar", c, di, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("grid", h, hi, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("grid_secondary", _, ui, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("home", Er, _i, t) : T}

            ${o && We ? E`
                  <div
                    class="energy-value battery ${b === null ? "missing" : ""}"
                    style=${R(this.gridPlacementStyle(We))}
                  >
                    ${this.renderTrend(
      "battery",
      Ii,
      Un,
      !!e.battery_trend,
      Ri,
      Oi,
      wt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon class="energy-icon" .icon=${pi} style=${R(mi)}></ha-icon>
                        ${me !== null ? E`
                              <div
                                class="battery-percentage ${St ? "alert" : ""}"
                                style=${R(St ? { color: wt } : {})}
                              >
                                ${this.formatBatteryPercentage(me)}
                              </div>
                            ` : T}
                      </div>
                      <div class="energy-number">${this.formatValue(b, L, t)}</div>
                      <div class="energy-label">${e.battery_label}</div>
                    </div>
                  </div>
                ` : T}

            ${a && je ? E`
                  <div
                    class="energy-value battery-secondary ${w === null ? "missing" : ""}"
                    style=${R(this.gridPlacementStyle(je))}
                  >
                    ${this.renderTrend(
      "battery_secondary",
      Li,
      Wn,
      !!e.battery_secondary_trend,
      zi,
      ki,
      xt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${fi}
                          style=${R(yi)}
                        ></ha-icon>
                        ${pe !== null ? E`
                              <div
                                class="battery-percentage ${Ct ? "alert" : ""}"
                                style=${R(Ct ? { color: xt } : {})}
                              >
                                ${this.formatBatteryPercentage(pe)}
                              </div>
                            ` : T}
                      </div>
                      <div class="energy-number">${this.formatValue(w, G, t)}</div>
                      <div class="energy-label">${e.battery_secondary_label}</div>
                    </div>
                  </div>
                ` : T}

            <div class="home-core" style=${R(this.gridPlacementStyle(Tr))}>
              <div class="home-core-icon" style=${R(ii)}>
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
    return E`<div class=${n} style=${R(r)} aria-hidden="true"></div>`;
  }
  renderSubNodeConnectors() {
    return !this._showSubBlocks || this._subNodeConnectorSegments.length === 0 ? T : E`
      <div class="subnode-connectors" aria-hidden="true">
        ${this._subNodeConnectorSegments.map(
      (e) => E`
            <div
              class="subnode-connector-segment ${e.node}"
              style=${R({
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
    const r = [], n = e === "solar" ? "mdi:solar-power-variant" : e === "home" ? "mdi:flash" : "mdi:transmission-tower", i = e === "solar" ? "Solar" : e === "home" ? "Home" : e === "grid" ? "Grid" : "Grid 2", s = e === "solar" ? Qr : e === "home" ? en : Pt;
    for (let h = 1; h <= s; h += 1) {
      const _ = t[`${e}_sub_${h}_enabled`] === !0, u = this.readConfigString(t[`${e}_sub_${h}_entity`]);
      if (!_ || !u)
        continue;
      const m = t[`${e}_sub_${h}_state_mode`] === !0;
      r.push({
        key: `${e}_${h}`,
        index: h,
        icon: this.readConfigString(t[`${e}_sub_${h}_icon`]) ?? n,
        iconStyle: this.iconColorStyle(t[`${e}_sub_${h}_icon_color`]),
        label: this.readConfigString(t[`${e}_sub_${h}_label`]) ?? `${i} ${h}`,
        value: H(this.hass, u),
        unit: B(this.hass, u) ?? t.unit ?? "kW",
        stateMode: m,
        stateText: m ? Ze(this.hass, u) : void 0
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
        value: H(this.hass, a),
        unit: B(this.hass, a) ?? t.unit ?? "kW",
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
  computeGridBounds(e, t, r, n, i, s, o, a, l, c, d, h, _, u, m, S, g, y) {
    const b = [{ col: 3, row: 3, colSpan: 2, rowSpan: 2 }];
    e && b.push({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }), t && b.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }), r && o && b.push(o), n && a && b.push(a), i && l && b.push(l), s && c && b.push(c), d.forEach((f) => {
      const C = m[f.index];
      C && b.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), h.forEach((f) => {
      const C = S[f.index];
      C && b.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), _.forEach((f) => {
      const C = g[f.index];
      C && b.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), u.forEach((f) => {
      const C = y[f.index];
      C && b.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    });
    const v = Math.min(...b.map((f) => f.col)), w = Math.max(...b.map((f) => f.col + (f.colSpan ?? 1) - 1)), x = Math.min(...b.map((f) => f.row)), p = Math.max(...b.map((f) => f.row + (f.rowSpan ?? 1) - 1));
    return {
      minCol: v,
      maxCol: w,
      minRow: x,
      maxRow: p,
      cols: w - v + 1,
      rows: p - x + 1
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
    const d = this.placementCenter(t, c), h = [], _ = (m, S, g, y) => {
      const b = Math.min(m, S), v = Math.abs(S - m);
      v <= k || h.push({
        orientation: "horizontal",
        direction: y,
        left: b,
        top: g,
        width: v,
        height: 0
      });
    }, u = (m, S, g, y) => {
      const b = Math.min(m, S), v = Math.abs(S - m);
      v <= k || h.push({
        orientation: "vertical",
        direction: y,
        left: g,
        top: b,
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
      const [{ placement: m, direction: S }] = n, g = this.placementCenter(m, c);
      _(g.x, d.x, d.y, S);
    } else if (n.length >= 2) {
      const m = n.map((y) => ({
        direction: y.direction,
        center: this.placementCenter(y.placement, c)
      })).sort((y, b) => y.center.y - b.center.y), S = Math.min(...m.map((y) => y.center.x)), g = d.x - (d.x - S) * 0.5;
      _(d.x, g, d.y, i), m.forEach((y) => {
        const b = y.center.y > d.y + k ? this.reverseFlowDirection(y.direction) : y.direction;
        u(d.y, y.center.y, g, b), _(y.center.x, g, y.center.y, y.direction);
      });
    }
    if (s.length === 1) {
      const [{ placement: m, direction: S }] = s, g = this.placementCenter(m, c);
      u(d.y, g.y, d.x, S);
    } else if (s.length >= 2) {
      const m = s.map((y) => ({
        placement: y.placement,
        direction: y.direction,
        center: this.placementCenter(y.placement, c)
      })).sort((y, b) => y.center.y - b.center.y), S = Math.min(
        ...m.map((y) => (y.placement.row - 1) / c.rows * 100)
      ), g = Math.max(d.y + k, S);
      u(d.y, g, d.x, o), m.forEach((y) => {
        const b = y.center.x < d.x - k ? this.reverseFlowDirection(y.direction) : y.direction;
        _(d.x, y.center.x, g, b), u(g, y.center.y, y.center.x, y.direction);
      });
    }
    return h;
  }
  renderSubNodes(e, t, r, n) {
    return t.length === 0 ? T : E`
      ${t.map((i) => {
      var u;
      const s = r[i.index];
      if (!s)
        return T;
      const o = {
        "grid-column": `${s.col}`,
        "grid-row": `${s.row}`
      }, a = ((u = i.stateText) == null ? void 0 : u.trim()) ?? "", l = i.stateMode, c = a.length === 0, d = l ? c ? "--" : a : this.formatValue(i.value, i.unit, n), h = l ? { value: d, unit: "" } : this.splitFormattedValueAndUnit(d, i.unit), _ = l ? c : i.value === null;
      return E`
            <div
              class="energy-sub-value ${e}-sub sub-col-${s.col} ${this._compactSubBlocks ? "compact" : ""} ${_ ? "missing" : ""}"
              data-key=${i.key}
              style=${R(o)}
            >
              <div class="energy-sub-content">
                <ha-icon class="energy-sub-icon" .icon=${i.icon} style=${R(i.iconStyle)}></ha-icon>
                <div class="energy-sub-number">${this._compactSubBlocks ? h.value : d}</div>
                ${l ? T : E`<div class="energy-sub-unit">${h.unit}</div>`}
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
    const s = B(this.hass, e.solar_entity);
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
        return n <= k ? 0 : n;
      if (i === null)
        i = c.family;
      else if (i !== c.family)
        return n <= k ? 0 : n;
      s += l.value * c.factor;
    }
    let o = s;
    const a = J(t);
    return a && i !== null && a.family === i && a.factor > 0 && (o /= a.factor), Number.isFinite(o) ? o <= k ? 0 : o : null;
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
      const o = B(this.hass, s.entityId);
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
      const h = e[d], _ = t[d];
      h != null && Number.isFinite(h) && (s += 1, _ && (i[d] = _));
    });
    const o = Object.keys(i).length === s ? Ms(i) : { comparable: !1, family: null, factors: {} }, a = o.comparable ? o.factors : void 0, l = (d) => {
      const h = e[d];
      if (h == null || !Number.isFinite(h))
        return 0;
      const _ = (a == null ? void 0 : a[d]) ?? 1;
      return h * _;
    };
    let c = l("solar") + l("grid") + l("grid_secondary") - l("battery") - l("battery_secondary");
    if (a && r) {
      const d = J(r);
      d && o.family !== null && d.family === o.family && d.factor > 0 && (c /= d.factor);
    }
    return Number.isFinite(c) ? c <= k ? 0 : c : null;
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
    `) : (delete this._trendDrawConfig[e], T);
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
      if (o === a || Math.abs(s.value - i.value) <= k) {
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
    var y, b;
    const n = Date.now() - be, i = 0, s = 100, o = e.map((v) => v.value), a = (t == null ? void 0 : t.min) ?? Math.min(...o), l = (t == null ? void 0 : t.max) ?? Math.max(...o);
    if (!Number.isFinite(a) || !Number.isFinite(l))
      return [];
    const c = 20, d = 80, h = Math.max(l - a, k), _ = e.map((v) => {
      const w = Math.max(0, Math.min(100, (v.ts - n) / be * 100)), x = i + w / 100 * (s - i), p = h <= k ? 0.5 : (v.value - a) / h, f = d - p * (d - c);
      return { x, y: f, value: v.value };
    }), u = ((y = _[0]) == null ? void 0 : y.x) ?? i, m = ((b = _[_.length - 1]) == null ? void 0 : b.x) ?? s, S = Math.max(0, m - u), g = 18;
    if (_.length >= 2 && S < g) {
      const v = s - g, w = Math.max(i, Math.min(v, m - g));
      if (S <= k) {
        const p = g / (_.length - 1);
        return _.map((f, C) => ({
          ...f,
          x: Math.max(i, Math.min(s, w + p * C))
        }));
      }
      const x = g / S;
      return _.map((p) => ({
        ...p,
        x: Math.max(i, Math.min(s, w + (p.x - u) * x))
      }));
    }
    return _;
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
    const t = e.getBoundingClientRect(), r = t.width <= Ws || t.height <= js;
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
    const s = e.getBoundingClientRect(), o = t == null ? void 0 : t.getBoundingClientRect(), a = r == null ? void 0 : r.getBoundingClientRect(), l = n == null ? void 0 : n.getBoundingClientRect(), c = i == null ? void 0 : i.getBoundingClientRect(), d = o ? o.left + o.width / 2 : 0, h = a ? a.top + a.height / 2 : 0, _ = l ? l.left + l.width / 2 : 0, u = c ? c.left + c.width / 2 : 0, m = (x) => x - s.left, S = (x) => x - s.top, g = (x) => Math.round(x * 10) / 10, y = [], b = (x, p, f, C) => {
      const $ = Math.min(x, p), M = Math.abs(p - x);
      M <= 0.5 || y.push({
        node: C,
        left: g($),
        top: g(f - 1),
        width: g(M),
        height: 2
      });
    }, v = (x, p, f, C) => {
      const $ = Math.min(x, p), M = Math.abs(p - x);
      M <= 0.5 || y.push({
        node: C,
        left: g(f - 1),
        top: g($),
        width: 2,
        height: g(M)
      });
    };
    o && this.renderRoot.querySelectorAll(".energy-sub-value.home-sub").forEach((x) => {
      const p = x.getBoundingClientRect(), f = p.top + p.height / 2, C = p.left + p.width / 2 < d ? p.right : p.left, $ = f, M = f < o.top ? o.top : f > o.bottom ? o.bottom : f, z = m(d), A = S($), F = S(M), L = m(C);
      b(L, z, A, "home"), v(A, F, z, "home");
    }), a && this.renderRoot.querySelectorAll(".energy-sub-value.solar-sub").forEach((x) => {
      const p = x.getBoundingClientRect(), f = p.left + p.width / 2, C = p.top + p.height / 2 < h ? p.bottom : p.top, $ = f, M = f < a.left ? a.left : f > a.right ? a.right : f, z = S(h), A = m($), F = m(M), L = S(C);
      v(L, z, A, "solar"), b(A, F, z, "solar");
    }), l && this.renderRoot.querySelectorAll(".energy-sub-value.grid-sub").forEach((x) => {
      const p = x.getBoundingClientRect(), f = p.top + p.height / 2, C = p.left + p.width / 2 < _ ? p.right : p.left, $ = f, M = f < l.top ? l.top : f > l.bottom ? l.bottom : f, z = m(_), A = S($), F = S(M), L = m(C);
      b(L, z, A, "grid"), v(A, F, z, "grid");
    }), c && this.renderRoot.querySelectorAll(".energy-sub-value.grid_secondary-sub").forEach((x) => {
      const p = x.getBoundingClientRect(), f = p.top + p.height / 2, C = p.left + p.width / 2 < u ? p.right : p.left, $ = f, M = f < c.top ? c.top : f > c.bottom ? c.bottom : f, z = m(u), A = S($), F = S(M), L = m(C);
      b(L, z, A, "grid_secondary"), v(A, F, z, "grid_secondary");
    }), y.length === this._subNodeConnectorSegments.length && y.every(
      (x, p) => {
        var f, C, $, M, z;
        return x.node === ((f = this._subNodeConnectorSegments[p]) == null ? void 0 : f.node) && x.left === ((C = this._subNodeConnectorSegments[p]) == null ? void 0 : C.left) && x.top === (($ = this._subNodeConnectorSegments[p]) == null ? void 0 : $.top) && x.width === ((M = this._subNodeConnectorSegments[p]) == null ? void 0 : M.width) && x.height === ((z = this._subNodeConnectorSegments[p]) == null ? void 0 : z.height);
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
      const m = n.get(_), S = i.get(_);
      if (!m || !S)
        return;
      const g = s[_];
      if (!g || g.length < 2)
        return;
      const y = (a == null ? void 0 : a[_]) ?? 1, b = a ? this.scaleTrendSeries(g, y) : g, v = this.toTrendCoordinates(b, l);
      if (v.length < 2)
        return;
      const w = this.toCanvasPoints(v, m.width, m.height), x = this.toCanvasPoints(v, S.width, S.height);
      this.drawTrendArea(
        m.ctx,
        w,
        u.color,
        m.height,
        u.threshold,
        u.thresholdColor
      ), this.drawTrendLine(S.ctx, x, u.color, u.threshold, u.thresholdColor), c += 1, d += x.length;
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
    !e && r - this._lastTrendRefresh < Zr || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(qs) || this.hasEditorLikeAncestor();
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
    }, Us));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Zr), this.updateComplete.then(() => {
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
    const r = this._config, n = D(r.trend_data_source, "hybrid"), i = this.enabledTrendNodes(r);
    if (i.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const a = this.perfNow(), l = {}, c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set();
      let S = Number.POSITIVE_INFINITY;
      const g = Date.now() - be;
      for (const p of i) {
        if (p === "home" && r.home_auto_calculate === !0) {
          const z = this.homeComputationDependencies(r);
          if (z.length === 0) {
            l[p] = [];
            continue;
          }
          d.set(p, z), h.set(p, this.resolveAutoHomeUnit(r, r.unit ?? "kW"));
          const A = this._trendSeries[p] ?? [];
          if (e || A.length === 0) {
            _.add(p), z.forEach((G) => {
              u.add(G.entityId), m.delete(G.entityId);
            });
            continue;
          }
          const F = ((s = A[A.length - 1]) == null ? void 0 : s.ts) ?? g, L = Math.max(g, F - Jr);
          S = Math.min(S, L), z.forEach((G) => {
            u.has(G.entityId) || m.add(G.entityId);
          });
          continue;
        }
        const f = this.trendEntityId(p, r);
        if (!f)
          continue;
        c.set(p, f);
        const C = this._trendSeries[p] ?? [];
        if (e || C.length === 0 || u.has(f)) {
          u.add(f), m.delete(f);
          continue;
        }
        if (u.has(f))
          continue;
        m.add(f);
        const $ = ((o = C[C.length - 1]) == null ? void 0 : o.ts) ?? g, M = Math.max(g, $ - Jr);
        S = Math.min(S, M);
      }
      let y = 0;
      const b = u.size > 0 ? await (async () => {
        const p = this.perfNow(), f = await xe(
          this.hass,
          Array.from(u),
          be,
          { dataSource: n }
        );
        return y = this.perfNow() - p, f;
      })() : {};
      let v = 0;
      const w = m.size > 0 ? await (async () => {
        const p = this.perfNow(), f = await xe(
          this.hass,
          Array.from(m),
          be,
          {
            startMs: Number.isFinite(S) ? S : g,
            dataSource: n
          }
        );
        return v = this.perfNow() - p, f;
      })() : {};
      c.forEach((p, f) => {
        const C = this._trendSeries[f] ?? [];
        if (u.has(p)) {
          const $ = b[p] ?? [];
          l[f] = $.length > 0 ? $ : C.filter((M) => M.ts >= g);
          return;
        }
        if (m.has(p)) {
          const $ = w[p] ?? [];
          l[f] = et(C, $, g);
          return;
        }
        l[f] = C.filter(($) => $.ts >= g);
      }), d.forEach((p, f) => {
        const C = this._trendSeries[f] ?? [], $ = this.computeAutoHomeTrendFromFetchedDependencies(
          p,
          b,
          w,
          u,
          m,
          g,
          h.get(f) ?? r.unit ?? "kW"
        );
        if (_.has(f)) {
          l[f] = $.length > 0 ? $ : C.filter((M) => M.ts >= g);
          return;
        }
        l[f] = et(C, $, g);
      });
      const x = this.sameTrendSeriesKeys(l, this._trendSeries) && Object.keys(l).every(
        (p) => this.areTrendSeriesEqual(l[p] ?? [], this._trendSeries[p] ?? [])
      );
      x || (this._trendSeries = l), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - a),
        force_full: e,
        nodes: i.length,
        full_entities: u.size,
        incremental_entities: m.size,
        data_source: n,
        full_fetch_ms: this.toPerfMs(y),
        incremental_fetch_ms: this.toPerfMs(v),
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
    return n("solar", Qr), n("home", en), n("grid", Pt), n("grid_secondary", Pt), Array.from(t);
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
    return t.push(`source:${D(e.trend_data_source, "hybrid")}`), this.enabledTrendNodes(e).forEach((r) => {
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
      const h = B(this.hass, c.entityId);
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
    if (Math.abs(l) <= k)
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
    return e === null || e <= k ? "none" : "forward";
  }
  toBidirectionalFlow(e) {
    return e === null || Math.abs(e) <= k ? "none" : e > 0 ? "forward" : "backward";
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
    if (t !== null && t > k)
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
  I({ attribute: !1 })
], W.prototype, "hass", 2);
Q([
  I({ type: Boolean })
], W.prototype, "preview", 2);
Q([
  I({ type: Boolean })
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
}, Tn = (e, t) => {
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
}, $n = (e, t) => {
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
}, Mn = (e, t) => {
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
}, Rn = (e, t) => {
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
}, zn = (e, t) => {
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
}, An = (e, t) => {
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
}, Pn = (e, t) => {
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
}, On = (e) => e === "column" ? "column" : "row", mr = (e, t = 24) => {
  const r = typeof e == "number" ? e : typeof e == "string" ? Number.parseInt(e, 10) : NaN;
  return r === 6 || r === 12 || r === 24 ? r : t;
}, pr = (e) => typeof e != "number" || !Number.isFinite(e) ? 1.5 : Math.max(0.5, Math.min(6, e)), In = (e, t, r, n) => {
  var o;
  if (t)
    return t;
  const i = e[r], s = (o = i == null ? void 0 : i.attributes) == null ? void 0 : o.friendly_name;
  return typeof s == "string" && s.trim().length > 0 ? s.trim() : `Entity ${n}`;
}, kn = (e, t, r, n) => {
  if (n)
    return ur(e, t, r, {
      ...n,
      nullWithUnit: !0
    });
  if (e === null)
    return t ? `-- ${t}` : "--";
  const i = `${e.toFixed(r)} ${t}`.trim();
  return i.length > 0 ? i : "--";
}, Ys = 4, Ln = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, Xs = {
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
}, Ks = (e) => ({
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
              default_color: Ln[e] ?? "purple"
            }
          }
        }
      ]
    }
  ]
}), Nn = (e = !1) => {
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
    ...Array.from({ length: Ys }, (r, n) => Ks(n + 1)),
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
}, Z = (e) => {
  if (typeof e == "string")
    return e.length > 0 ? e : void 0;
}, Bn = (e) => e === "column" ? "column" : "row", Hn = (e) => mr(e), Dn = (e) => pr(e), Ye = (e, t, r) => {
  const n = e ?? t;
  return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : Ln[r] ?? "purple";
}, Fn = (e) => ({
  trend_data_source: D(e.trend_data_source, "hybrid"),
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
}), Vn = (e, t = {}) => {
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
  return r.match(/^entity_(\d+)$/) ? "Sensor" : t[r] ?? Xs[r] ?? r;
};
var Zs = Object.defineProperty, Js = Object.getOwnPropertyDescriptor, yr = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Js(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && Zs(t, r, i), i;
};
const Qs = Nn(!1);
let rt = class extends U {
  constructor() {
    super(...arguments), this.computeLabel = (e) => Vn(e), this.valueChanged = (e) => {
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
      legend_layout: Bn(e.legend_layout),
      timeframe_hours: Hn(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      decimals: e.decimals ?? 1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: e.decimals_base_unit ?? e.decimals ?? 1,
      decimals_prefixed_unit: e.decimals_prefixed_unit ?? e.decimals ?? 1,
      line_thickness: Dn(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...Fn(e)
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? T : E`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${De}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Qs}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
yr([
  I({ attribute: !1 })
], rt.prototype, "hass", 2);
yr([
  O()
], rt.prototype, "_config", 2);
rt = yr([
  ue("power-pilz-graph-card-editor")
], rt);
var eo = Object.defineProperty, to = Object.getOwnPropertyDescriptor, ne = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? to(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && eo(t, r, i), i;
};
const $e = 1, rn = 24, nn = 300 * 1e3, ro = 60 * 1e3, no = 350, Xe = 0.01, Me = 4, io = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", so = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), sn = {
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
      timeframe_hours: rn,
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
      decimals: $e,
      decimals_base_unit: $e,
      decimals_prefixed_unit: $e
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : $e, r = re(e.decimals_base_unit, t), n = re(e.decimals_prefixed_unit, t), i = this.readConfigString(e.entity), s = this.readConfigString(e.icon), o = this.readConfigString(e.entity_1) ?? i ?? "sensor.dev_home_power";
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
      trend_data_source: D(e.trend_data_source, "hybrid"),
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
    const e = this._config, t = e.decimals ?? $e, r = this.normalizeLineThickness(e.line_thickness), n = this.collectSeriesEntries(e, t), i = this.normalizeLegendLayout(e.legend_layout), s = e.hover_enabled !== !1, o = this._hoverState, a = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, l = a > 0 ? { top: `${a}px` } : {}, c = o ? {
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
    })), E`
      <ha-card>
        <div
          class="container"
          @pointermove=${this.handlePointerMove}
          @pointerleave=${this.handlePointerLeave}
          @pointercancel=${this.handlePointerLeave}
        >
          <div class="card-trend" style=${R(l)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${R(l)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${s && o ? E`<div class="hover-dot" aria-hidden="true" style=${R(c)}></div>` : T}

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
    return E`
      <div class="state-item" data-slot=${String(e.slot)}>
        ${e.showIcon ? E`
              <div class="icon-wrap">
                <div class="icon-shape" style=${R(e.iconStyle)}>
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
    for (let n = 1; n <= Me; n += 1) {
      const i = n, s = this.slotEnabled(i, e), o = this.slotEntityId(i, e);
      if (!s || !o)
        continue;
      const a = this.entityName(this.slotCustomName(i, e), o, n), l = H(this.hass, o), c = e.unit ?? B(this.hass, o) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(i, e), _ = this.iconStyle(this.slotIconColor(i, e)), u = this.resolveColor(sn[i], io), m = this.resolveColor(this.slotTrendColor(i, e), u);
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
    return Tn(e, t);
  }
  slotCustomName(e, t) {
    return $n(e, t);
  }
  slotEnabled(e, t) {
    return Mn(e, t);
  }
  slotShowIcon(e, t) {
    return Rn(e, t);
  }
  slotIcon(e, t) {
    return zn(e, t);
  }
  slotIconColor(e, t) {
    return An(e, t);
  }
  slotTrendColor(e, t) {
    return Pn(e, t);
  }
  entityName(e, t, r) {
    return In(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    var n, i, s;
    return kn(e, t, r, {
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
    return Y(e);
  }
  normalizeLegendLayout(e) {
    return On(e);
  }
  normalizeTimeframeHours(e) {
    return mr(e, rn);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return pr(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : sn[r];
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
    const d = 20, h = 80, _ = Math.max(c - l, Xe), u = e.map((w) => {
      const x = Math.max(0, Math.min(100, (w.ts - i) / t * 100)), p = s + x / 100 * (o - s), f = _ <= Xe ? 0.5 : (w.value - l) / _, C = h - f * (h - d);
      return { x: p, y: C, value: w.value };
    }), m = ((b = u[0]) == null ? void 0 : b.x) ?? s, S = ((v = u[u.length - 1]) == null ? void 0 : v.x) ?? o, g = Math.max(0, S - m), y = 18;
    if (u.length >= 2 && g < y) {
      const w = o - y, x = Math.max(s, Math.min(w, S - y));
      if (g <= Xe) {
        const f = y / (u.length - 1);
        return u.map((C, $) => ({
          ...C,
          x: Math.max(s, Math.min(o, x + f * $))
        }));
      }
      const p = y / g;
      return u.map((f) => ({
        ...f,
        x: Math.max(s, Math.min(o, x + (f.x - m) * p))
      }));
    }
    return u;
  }
  toCanvasPoints(e, t, r) {
    return hr(e, t, r);
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
    var S, g;
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
    const s = ((S = this._config) == null ? void 0 : S.fill_area_enabled) !== !1, o = this.trendWindowMs(this._config), a = {};
    this._drawConfigs.forEach((y) => {
      const b = this.trendPoints(y.slot, y.currentValue);
      b.length >= 2 && (a[y.slot] = b);
    });
    const l = ((g = this._config) == null ? void 0 : g.shared_trend_scale) === !0, c = l ? this.resolveSharedScaleFactors(a) : null;
    this._sharedScaleCanonical = c !== null, this._sharedScaleFactors = c ?? {};
    const d = l ? this.computeTrendValueRange(a, c ?? void 0) : null, h = {};
    let _ = 0, u = 0;
    [...this._drawConfigs].sort((y, b) => b.slot - y.slot).forEach((y) => {
      const b = a[y.slot];
      if (!b || b.length < 2)
        return;
      const v = (c == null ? void 0 : c[y.slot]) ?? 1, w = c ? this.scaleTrendSeries(b, v) : b, x = this.toTrendCoordinates(w, o, d);
      if (x.length < 2)
        return;
      const p = this.toCanvasPoints(x, n.width, n.height), f = this.toCanvasPoints(x, i.width, i.height);
      s && this.drawTrendArea(n.ctx, p, y.color, n.height), this.drawTrendLine(i.ctx, f, y.color, y.lineWidth), h[y.slot] = f, _ += 1, u += f.length;
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
      if (Math.abs(a) <= Xe)
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
    !e && r - this._lastTrendRefresh < nn || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(so) || this.hasEditorLikeAncestor();
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
    }, no));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, nn), this.updateComplete.then(() => {
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
    const r = this._config, n = {}, i = this.trendWindowMs(r), s = D(r.trend_data_source, "hybrid"), o = this.enabledSlots(r);
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
        const x = this._trendSeries[v] ?? [];
        if (e || x.length === 0 || d.has(w)) {
          d.add(w), h.delete(w);
          continue;
        }
        if (d.has(w))
          continue;
        h.add(w);
        const p = ((a = x[x.length - 1]) == null ? void 0 : a.ts) ?? u, f = Math.max(u, p - ro);
        _ = Math.min(_, f);
      }
      let m = 0;
      const S = d.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await xe(
          this.hass,
          Array.from(d),
          i,
          { dataSource: s }
        );
        return m = this.perfNow() - v, w;
      })() : {};
      let g = 0;
      const y = h.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await xe(
          this.hass,
          Array.from(h),
          i,
          {
            startMs: Number.isFinite(_) ? _ : u,
            dataSource: s
          }
        );
        return g = this.perfNow() - v, w;
      })() : {};
      c.forEach((v, w) => {
        const x = this._trendSeries[w] ?? [];
        if (d.has(v)) {
          const p = S[v] ?? [];
          n[w] = p.length > 0 ? p : x.filter((f) => f.ts >= u);
          return;
        }
        if (h.has(v)) {
          const p = y[v] ?? [];
          n[w] = et(x, p, u);
          return;
        }
        n[w] = x.filter((p) => p.ts >= u);
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
        full_fetch_ms: this.toPerfMs(m),
        incremental_fetch_ms: this.toPerfMs(g),
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
    if (!e || !t || this.trendWindowMs(e) !== this.trendWindowMs(t) || D(e.trend_data_source, "hybrid") !== D(t.trend_data_source, "hybrid"))
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
  `;
ne([
  I({ attribute: !1 })
], X.prototype, "hass", 2);
ne([
  I({ type: Boolean })
], X.prototype, "preview", 2);
ne([
  I({ type: Boolean })
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
var oo = Object.defineProperty, ao = Object.getOwnPropertyDescriptor, fr = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? ao(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && oo(t, r, i), i;
};
const lo = Nn(!0);
let nt = class extends U {
  constructor() {
    super(...arguments), this.computeLabel = (e) => Vn(e, {
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
      legend_layout: Bn(e.legend_layout),
      timeframe_hours: Hn(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      normalize_stack_to_percent: e.normalize_stack_to_percent ?? !1,
      decimals: e.decimals ?? 1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: e.decimals_base_unit ?? e.decimals ?? 1,
      decimals_prefixed_unit: e.decimals_prefixed_unit ?? e.decimals ?? 1,
      line_thickness: Dn(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...Fn(e)
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? T : E`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${De}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${lo}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
fr([
  I({ attribute: !1 })
], nt.prototype, "hass", 2);
fr([
  O()
], nt.prototype, "_config", 2);
nt = fr([
  ue("power-pilz-graph-stack-card-editor")
], nt);
var co = Object.defineProperty, ho = Object.getOwnPropertyDescriptor, ie = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? ho(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && co(t, r, i), i;
};
const Re = 1, on = 24, an = 300 * 1e3, uo = 60 * 1e3, _o = 350, ae = 0.01, ze = 4, mo = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", po = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), ln = {
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
      timeframe_hours: on,
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
      decimals: Re,
      decimals_base_unit: Re,
      decimals_prefixed_unit: Re
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Re, r = re(e.decimals_base_unit, t), n = re(e.decimals_prefixed_unit, t), i = this.readConfigString(e.entity), s = this.readConfigString(e.icon), o = this.readConfigString(e.entity_1) ?? i ?? "sensor.dev_home_power";
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
      trend_data_source: D(e.trend_data_source, "hybrid"),
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
    const e = this._config, t = e.decimals ?? Re, r = this.normalizeLineThickness(e.line_thickness), n = e.normalize_stack_to_percent === !0, i = this.collectSeriesEntries(e, t), s = this.withStackedCurrentValues(i, n), o = this.normalizeLegendLayout(e.legend_layout), a = e.hover_enabled !== !1, l = this._hoverState, c = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, d = c > 0 ? { top: `${c}px` } : {}, h = l ? {
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
    })), E`
      <ha-card>
        <div
          class="container"
          @pointermove=${this.handlePointerMove}
          @pointerleave=${this.handlePointerLeave}
          @pointercancel=${this.handlePointerLeave}
        >
          <div class="card-trend" style=${R(d)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${R(d)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${a && l ? E`<div class="hover-dot" aria-hidden="true" style=${R(h)}></div>` : T}

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
    return E`
      <div class="state-item" data-slot=${String(e.slot)}>
        ${e.showIcon ? E`
              <div class="icon-wrap">
                <div class="icon-shape" style=${R(e.iconStyle)}>
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
    for (let n = 1; n <= ze; n += 1) {
      const i = n, s = this.slotEnabled(i, e), o = this.slotEntityId(i, e);
      if (!s || !o)
        continue;
      const a = this.entityName(this.slotCustomName(i, e), o, n), l = H(this.hass, o), c = e.unit ?? B(this.hass, o) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(i, e), _ = this.iconStyle(this.slotIconColor(i, e)), u = this.resolveColor(ln[i], mo), m = this.resolveColor(this.slotTrendColor(i, e), u);
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
    var h;
    const r = this.resolveStackUnitFactors(e), n = e.reduce((_, u) => u.currentValue !== null && Number.isFinite(u.currentValue) ? _ + u.currentValue : _, 0), i = r ? e.reduce((_, u) => u.currentValue !== null && Number.isFinite(u.currentValue) ? _ + u.currentValue * (r[u.slot] ?? 1) : _, 0) : n, s = r ? i : n, o = Number.isFinite(s) && Math.abs(s) > ae, a = (h = e[e.length - 1]) == null ? void 0 : h.slot;
    let l = 0, c = 0, d = !1;
    return e.map((_) => {
      _.currentValue !== null && Number.isFinite(_.currentValue) && (l += _.currentValue, r && (c += _.currentValue * (r[_.slot] ?? 1)), d = !0);
      const u = d ? t ? o ? _.slot === a ? 100 : Math.max(0, Math.min(100, (r ? c : l) / s * 100)) : 0 : r ? c / (r[_.slot] ?? 1) : l : null, m = t ? "%" : _.unit;
      return {
        ..._,
        unit: m,
        secondary: this.formatValue(u, m, _.decimals)
      };
    });
  }
  slotEntityId(e, t) {
    return Tn(e, t);
  }
  slotCustomName(e, t) {
    return $n(e, t);
  }
  slotEnabled(e, t) {
    return Mn(e, t);
  }
  slotShowIcon(e, t) {
    return Rn(e, t);
  }
  slotIcon(e, t) {
    return zn(e, t);
  }
  slotIconColor(e, t) {
    return An(e, t);
  }
  slotTrendColor(e, t) {
    return Pn(e, t);
  }
  entityName(e, t, r) {
    return In(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    var n, i, s;
    return kn(e, t, r, {
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
    if (!this._stackCanonicalMode || this._stackNormalizeToPercent)
      return t;
    const r = this._stackCanonicalFactors[e];
    return typeof r != "number" || !Number.isFinite(r) || r <= 0 ? t : t / r;
  }
  readConfigString(e) {
    return Y(e);
  }
  normalizeLegendLayout(e) {
    return On(e);
  }
  normalizeTimeframeHours(e) {
    return mr(e, on);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return pr(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : ln[r];
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
    const d = 20, h = 80, _ = Math.max(c - l, ae), u = e.map((w) => {
      const x = Math.max(0, Math.min(100, (w.ts - i) / t * 100)), p = s + x / 100 * (o - s), f = _ <= ae ? 0.5 : (w.value - l) / _, C = h - f * (h - d);
      return { x: p, y: C, value: w.value };
    }), m = ((b = u[0]) == null ? void 0 : b.x) ?? s, S = ((v = u[u.length - 1]) == null ? void 0 : v.x) ?? o, g = Math.max(0, S - m), y = 18;
    if (u.length >= 2 && g < y) {
      const w = o - y, x = Math.max(s, Math.min(w, S - y));
      if (g <= ae) {
        const f = y / (u.length - 1);
        return u.map((C, $) => ({
          ...C,
          x: Math.max(s, Math.min(o, x + f * $))
        }));
      }
      const p = y / g;
      return u.map((f) => ({
        ...f,
        x: Math.max(s, Math.min(o, x + (f.x - m) * p))
      }));
    }
    return u;
  }
  toCanvasPoints(e, t, r) {
    return hr(e, t, r);
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
    var y, b, v;
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
    const s = ((y = this._config) == null ? void 0 : y.fill_area_enabled) !== !1, o = ((b = this._config) == null ? void 0 : b.normalize_stack_to_percent) === !0, a = ((v = this._config) == null ? void 0 : v.shared_trend_scale) === !0, l = this.resolveStackUnitFactors(this._drawConfigs);
    this._stackCanonicalMode = l !== null, this._stackCanonicalFactors = l ?? {}, this._stackNormalizeToPercent = o;
    const c = this.trendWindowMs(this._config), d = {}, h = this.buildStackedTrendSeries(c, l ?? void 0), _ = o ? this.normalizeStackedSeriesToPercent(h) : h, u = o ? { min: 0, max: 100 } : a ? this.computeStackedValueRange(_) : null;
    let m = 0, S = 0;
    [...this._drawConfigs].sort((w, x) => x.slot - w.slot).forEach((w) => {
      const x = _[w.slot] ?? [];
      if (x.length < 2)
        return;
      const p = this.toTrendCoordinates(x, c, u);
      if (p.length < 2)
        return;
      const f = this.toCanvasPoints(p, n.width, n.height), C = this.toCanvasPoints(p, i.width, i.height);
      s && this.drawTrendArea(n.ctx, f, w.color, n.height), this.drawTrendLine(i.ctx, C, w.color, w.lineWidth), d[w.slot] = C, m += 1, S += C.length;
    }), this._linePointsBySlot = d, this._hoverState && !d[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: m,
      points: S,
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
  normalizeStackedSeriesToPercent(e) {
    const t = {}, r = Object.keys(e).map((s) => Number(s)).filter((s) => Number.isFinite(s) && s >= 1 && s <= ze).sort((s, o) => s - o);
    if (r.length === 0)
      return t;
    const n = r[r.length - 1], i = e[n] ?? [];
    return i.length < 1 || r.forEach((s) => {
      const o = e[s] ?? [];
      o.length !== 0 && (t[s] = o.map((a) => {
        const l = this.interpolateTrendValue(i, a.ts);
        if (!Number.isFinite(l) || Math.abs(l) <= ae)
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
      if (Math.abs(a) <= ae)
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
    !e && r - this._lastTrendRefresh < an || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
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
    }, _o));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, an), this.updateComplete.then(() => {
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
    const r = this._config, n = {}, i = this.trendWindowMs(r), s = D(r.trend_data_source, "hybrid"), o = this.enabledSlots(r);
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
        const x = this._trendSeries[v] ?? [];
        if (e || x.length === 0 || d.has(w)) {
          d.add(w), h.delete(w);
          continue;
        }
        if (d.has(w))
          continue;
        h.add(w);
        const p = ((a = x[x.length - 1]) == null ? void 0 : a.ts) ?? u, f = Math.max(u, p - uo);
        _ = Math.min(_, f);
      }
      let m = 0;
      const S = d.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await xe(
          this.hass,
          Array.from(d),
          i,
          { dataSource: s }
        );
        return m = this.perfNow() - v, w;
      })() : {};
      let g = 0;
      const y = h.size > 0 ? await (async () => {
        const v = this.perfNow(), w = await xe(
          this.hass,
          Array.from(h),
          i,
          {
            startMs: Number.isFinite(_) ? _ : u,
            dataSource: s
          }
        );
        return g = this.perfNow() - v, w;
      })() : {};
      c.forEach((v, w) => {
        const x = this._trendSeries[w] ?? [];
        if (d.has(v)) {
          const p = S[v] ?? [];
          n[w] = p.length > 0 ? p : x.filter((f) => f.ts >= u);
          return;
        }
        if (h.has(v)) {
          const p = y[v] ?? [];
          n[w] = et(x, p, u);
          return;
        }
        n[w] = x.filter((p) => p.ts >= u);
      });
      const b = this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((v) => Number(v)).filter((v) => Number.isFinite(v) && v >= 1 && v <= ze).every((v) => {
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
        full_fetch_ms: this.toPerfMs(m),
        incremental_fetch_ms: this.toPerfMs(g),
        series_changed: !b
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let r = 1; r <= ze; r += 1) {
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
    if (!e || !t || this.trendWindowMs(e) !== this.trendWindowMs(t) || D(e.trend_data_source, "hybrid") !== D(t.trend_data_source, "hybrid"))
      return !0;
    for (let r = 1; r <= ze; r += 1) {
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
  `;
ie([
  I({ attribute: !1 })
], K.prototype, "hass", 2);
ie([
  I({ type: Boolean })
], K.prototype, "preview", 2);
ie([
  I({ type: Boolean })
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
var yo = Object.defineProperty, fo = Object.getOwnPropertyDescriptor, br = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? fo(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && yo(t, r, i), i;
};
const bo = [
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
], go = {
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
      return go[t] ?? t;
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
    return !this.hass || !this._config ? T : E`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${De}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${bo}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
br([
  I({ attribute: !1 })
], it.prototype, "hass", 2);
br([
  O()
], it.prototype, "_config", 2);
it = br([
  ue("power-pilz-wallbox-card-editor")
], it);
var vo = Object.defineProperty, _e = (e, t, r, n) => {
  for (var i = void 0, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = o(t, r, i) || i);
  return i && vo(t, r, i), i;
};
const wo = 0.01, cn = "power-pilz-wallbox-mode-menu-portal-style", gr = class gr extends U {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._actionBusy = !1, this._modeMenuOpen = !1, this._modeMenuOptionCount = 0, this.toggleModeMenu = (t) => {
      var o;
      if (t.stopPropagation(), this.isEditorPreview() || !((o = this._config) != null && o.mode_entity) || this._actionBusy)
        return;
      const r = ve(this.hass, this._config.mode_entity), n = (r == null ? void 0 : r.state) ?? "", i = this.getModeOptions(r);
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
      const r = ve(this.hass, this._config.mode_entity);
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
      const r = H(this.hass, this._config.power_entity), n = Ze(this.hass, this._config.status_entity), i = this.isCharging(n, r, this._config.command_entity), s = this.resolveActionCommand(i);
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
    const t = this._config, r = H(this.hass, t.power_entity), n = B(this.hass, t.power_entity) ?? "kW", i = Ze(this.hass, t.status_entity), s = ve(this.hass, t.mode_entity), o = (s == null ? void 0 : s.state) ?? "", a = this.getModeOptions(s), l = this.isCharging(i, r, t.command_entity), c = this.resolveActionCommand(l), d = l ? "Stop" : "Start", h = l ? "mdi:pause" : "mdi:play", _ = this.statusLabel(i, l), u = this.formatPower(r, n, t.decimals ?? 1), m = this.showModeSelector(t, a), S = this.showLiveValue(t), g = this.showCommandButton(t), y = this.isEditorPreview() || this._actionBusy || !t.mode_entity || a.length === 0, b = o || a[0] || "Mode", v = this._modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down", w = this.iconStyle(t.icon_color), p = Number(S) + Number(g) === 1, f = m && S && g, C = p && S, $ = p && g || f, M = C || $, z = S && !C, A = g && !$, F = m || z || A, L = m ? z || A ? A ? "actions" : "actions no-command" : "actions mode-only" : "actions no-mode";
    return (!m || y) && this._modeMenuOpen && this.closeModeMenuPortal(), E`
      <ha-card>
        <div class="container">
          <div class="state-item ${M ? "compact-state" : ""}">
            <div class="icon-wrap">
              <div class="icon-shape" style=${R(w)}>
                <ha-icon .icon=${t.icon ?? "mdi:ev-station"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${t.name}</div>
              <div class="secondary">EV charger</div>
            </div>

            ${M ? E`
                  <div class="compact-trailing ${$ ? "button-only" : ""}">
                    ${C ? E`
                          <div class="compact-live-value">
                            <span>${_}</span>
                            <span class="dot">•</span>
                            <span>${u}</span>
                          </div>
                        ` : E``}

                    ${$ ? E`
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
                <div class=${L}>
                  ${m ? E`
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

                  ${z ? E`
                        <div class="live-value">
                          <span>${_}</span>
                          <span class="dot">•</span>
                          <span>${u}</span>
                        </div>
                      ` : E``}

                  ${A ? E`
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
    return r !== null && r > wo;
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
    if (document.getElementById(cn))
      return;
    const t = document.createElement("style");
    t.id = cn, t.textContent = `
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
gr.styles = st`
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
let j = gr;
_e([
  I({ attribute: !1 })
], j.prototype, "hass");
_e([
  I({ type: Boolean })
], j.prototype, "preview");
_e([
  I({ type: Boolean })
], j.prototype, "editMode");
_e([
  I({ reflect: !0, type: String })
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
class xo extends j {
}
customElements.get("power-pilz-wallbox-card") || customElements.define("power-pilz-wallbox-card", j);
customElements.get("power-pilz-wallbox-card-v2") || customElements.define("power-pilz-wallbox-card-v2", xo);
window.customCards = window.customCards || [];
const So = [
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
for (const e of So)
  window.customCards.some((t) => t.type === e.type) || window.customCards.push(e);
console.info(
  `%cPOWER PILZ%c v${De}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
//# sourceMappingURL=power-pilz.js.map
