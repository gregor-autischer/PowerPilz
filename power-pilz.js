/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at = globalThis, gi = at.ShadowRoot && (at.ShadyCSS === void 0 || at.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, bi = Symbol(), Xi = /* @__PURE__ */ new WeakMap();
let Jr = class {
  constructor(t, i, r) {
    if (this._$cssResult$ = !0, r !== bi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (gi && t === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (t = Xi.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && Xi.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const $o = (e) => new Jr(typeof e == "string" ? e : e + "", void 0, bi), xe = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((r, n, o) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new Jr(i, e, bi);
}, zo = (e, t) => {
  if (gi) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const r = document.createElement("style"), n = at.litNonce;
    n !== void 0 && r.setAttribute("nonce", n), r.textContent = i.cssText, e.appendChild(r);
  }
}, Ji = gi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const r of t.cssRules) i += r.cssText;
  return $o(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Mo, defineProperty: Ao, getOwnPropertyDescriptor: ko, getOwnPropertyNames: Po, getOwnPropertySymbols: Ro, getPrototypeOf: Oo } = Object, de = globalThis, Qi = de.trustedTypes, Lo = Qi ? Qi.emptyScript : "", Ht = de.reactiveElementPolyfillSupport, je = (e, t) => e, ct = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Lo : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, vi = (e, t) => !Mo(e, t), er = { attribute: !0, type: String, converter: ct, reflect: !1, useDefault: !1, hasChanged: vi };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), de.litPropertyMetadata ?? (de.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ke = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = er) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const r = Symbol(), n = this.getPropertyDescriptor(t, r, i);
      n !== void 0 && Ao(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, r) {
    const { get: n, set: o } = ko(this.prototype, t) ?? { get() {
      return this[i];
    }, set(s) {
      this[i] = s;
    } };
    return { get: n, set(s) {
      const a = n == null ? void 0 : n.call(this);
      o == null || o.call(this, s), this.requestUpdate(t, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? er;
  }
  static _$Ei() {
    if (this.hasOwnProperty(je("elementProperties"))) return;
    const t = Oo(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(je("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(je("properties"))) {
      const i = this.properties, r = [...Po(i), ...Ro(i)];
      for (const n of r) this.createProperty(n, i[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [r, n] of i) this.elementProperties.set(r, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const n = this._$Eu(i, r);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const n of r) i.unshift(Ji(n));
    } else t !== void 0 && i.push(Ji(t));
    return i;
  }
  static _$Eu(t, i) {
    const r = i.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((i) => this.enableUpdating = i), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((i) => i(this));
  }
  addController(t) {
    var i;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) == null || i.call(t));
  }
  removeController(t) {
    var i;
    (i = this._$EO) == null || i.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const r of i.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return zo(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((i) => {
      var r;
      return (r = i.hostConnected) == null ? void 0 : r.call(i);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var r;
      return (r = i.hostDisconnected) == null ? void 0 : r.call(i);
    });
  }
  attributeChangedCallback(t, i, r) {
    this._$AK(t, r);
  }
  _$ET(t, i) {
    var o;
    const r = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, r);
    if (n !== void 0 && r.reflect === !0) {
      const s = (((o = r.converter) == null ? void 0 : o.toAttribute) !== void 0 ? r.converter : ct).toAttribute(i, r.type);
      this._$Em = t, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, s;
    const r = this.constructor, n = r._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const a = r.getPropertyOptions(n), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : ct;
      this._$Em = n;
      const c = l.fromAttribute(i, a.type);
      this[n] = c ?? ((s = this._$Ej) == null ? void 0 : s.get(n)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, r, n = !1, o) {
    var s;
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (o = this[t]), r ?? (r = a.getPropertyOptions(t)), !((r.hasChanged ?? vi)(o, i) || r.useDefault && r.reflect && o === ((s = this._$Ej) == null ? void 0 : s.get(t)) && !this.hasAttribute(a._$Eu(t, r)))) return;
      this.C(t, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: r, reflect: n, wrapped: o }, s) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, s ?? i ?? this[t]), o !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (i = void 0), this._$AL.set(t, i)), n === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, s] of n) {
        const { wrapped: a } = s, l = this[o];
        a !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, s, l);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (r = this._$EO) == null || r.forEach((n) => {
        var o;
        return (o = n.hostUpdate) == null ? void 0 : o.call(n);
      }), this.update(i)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var i;
    (i = this._$EO) == null || i.forEach((r) => {
      var n;
      return (n = r.hostUpdated) == null ? void 0 : n.call(r);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
ke.elementStyles = [], ke.shadowRootOptions = { mode: "open" }, ke[je("elementProperties")] = /* @__PURE__ */ new Map(), ke[je("finalized")] = /* @__PURE__ */ new Map(), Ht == null || Ht({ ReactiveElement: ke }), (de.reactiveElementVersions ?? (de.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ge = globalThis, tr = (e) => e, dt = Ge.trustedTypes, ir = dt ? dt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Qr = "$lit$", ce = `lit$${Math.random().toFixed(9).slice(2)}$`, en = "?" + ce, Io = `<${en}>`, ve = document, Ke = () => ve.createComment(""), qe = (e) => e === null || typeof e != "object" && typeof e != "function", wi = Array.isArray, Do = (e) => wi(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Nt = `[ 	
\f\r]`, De = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rr = /-->/g, nr = />/g, pe = RegExp(`>|${Nt}(?:([^\\s"'>=/]+)(${Nt}*=${Nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), or = /'/g, sr = /"/g, tn = /^(?:script|style|textarea|title)$/i, Ho = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), E = Ho(1), we = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), ar = /* @__PURE__ */ new WeakMap(), ge = ve.createTreeWalker(ve, 129);
function rn(e, t) {
  if (!wi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ir !== void 0 ? ir.createHTML(t) : t;
}
const No = (e, t) => {
  const i = e.length - 1, r = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = De;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, d, h = -1, _ = 0;
    for (; _ < l.length && (s.lastIndex = _, d = s.exec(l), d !== null); ) _ = s.lastIndex, s === De ? d[1] === "!--" ? s = rr : d[1] !== void 0 ? s = nr : d[2] !== void 0 ? (tn.test(d[2]) && (n = RegExp("</" + d[2], "g")), s = pe) : d[3] !== void 0 && (s = pe) : s === pe ? d[0] === ">" ? (s = n ?? De, h = -1) : d[1] === void 0 ? h = -2 : (h = s.lastIndex - d[2].length, c = d[1], s = d[3] === void 0 ? pe : d[3] === '"' ? sr : or) : s === sr || s === or ? s = pe : s === rr || s === nr ? s = De : (s = pe, n = void 0);
    const u = s === pe && e[a + 1].startsWith("/>") ? " " : "";
    o += s === De ? l + Io : h >= 0 ? (r.push(c), l.slice(0, h) + Qr + l.slice(h) + ce + u) : l + ce + (h === -2 ? a : u);
  }
  return [rn(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class Ye {
  constructor({ strings: t, _$litType$: i }, r) {
    let n;
    this.parts = [];
    let o = 0, s = 0;
    const a = t.length - 1, l = this.parts, [c, d] = No(t, i);
    if (this.el = Ye.createElement(c, r), ge.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = ge.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(Qr)) {
          const _ = d[s++], u = n.getAttribute(h).split(ce), m = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: o, name: m[2], strings: u, ctor: m[1] === "." ? Fo : m[1] === "?" ? Vo : m[1] === "@" ? Uo : bt }), n.removeAttribute(h);
        } else h.startsWith(ce) && (l.push({ type: 6, index: o }), n.removeAttribute(h));
        if (tn.test(n.tagName)) {
          const h = n.textContent.split(ce), _ = h.length - 1;
          if (_ > 0) {
            n.textContent = dt ? dt.emptyScript : "";
            for (let u = 0; u < _; u++) n.append(h[u], Ke()), ge.nextNode(), l.push({ type: 2, index: ++o });
            n.append(h[_], Ke());
          }
        }
      } else if (n.nodeType === 8) if (n.data === en) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(ce, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += ce.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const r = ve.createElement("template");
    return r.innerHTML = t, r;
  }
}
function Pe(e, t, i = e, r) {
  var s, a;
  if (t === we) return t;
  let n = r !== void 0 ? (s = i._$Co) == null ? void 0 : s[r] : i._$Cl;
  const o = qe(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((a = n == null ? void 0 : n._$AO) == null || a.call(n, !1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, r)), r !== void 0 ? (i._$Co ?? (i._$Co = []))[r] = n : i._$Cl = n), n !== void 0 && (t = Pe(e, n._$AS(e, t.values), n, r)), t;
}
class Bo {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: r } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? ve).importNode(i, !0);
    ge.currentNode = n;
    let o = ge.nextNode(), s = 0, a = 0, l = r[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new Ze(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new Wo(o, this, t)), this._$AV.push(c), l = r[++a];
      }
      s !== (l == null ? void 0 : l.index) && (o = ge.nextNode(), s++);
    }
    return ge.currentNode = ve, n;
  }
  p(t) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, i), i += r.strings.length - 2) : r._$AI(t[i])), i++;
  }
}
class Ze {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, r, n) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = r, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = Pe(this, t, i), qe(t) ? t === $ || t == null || t === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : t !== this._$AH && t !== we && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Do(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== $ && qe(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ve.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: r } = t, n = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = Ye.createElement(rn(r.h, r.h[0]), this.options)), r);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n) this._$AH.p(i);
    else {
      const s = new Bo(n, this), a = s.u(this.options);
      s.p(i), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = ar.get(t.strings);
    return i === void 0 && ar.set(t.strings, i = new Ye(t)), i;
  }
  k(t) {
    wi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, n = 0;
    for (const o of t) n === i.length ? i.push(r = new Ze(this.O(Ke()), this.O(Ke()), this, this.options)) : r = i[n], r._$AI(o), n++;
    n < i.length && (this._$AR(r && r._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, i); t !== this._$AB; ) {
      const n = tr(t).nextSibling;
      tr(t).remove(), t = n;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class bt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, r, n, o) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = $;
  }
  _$AI(t, i = this, r, n) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) t = Pe(this, t, i, 0), s = !qe(t) || t !== this._$AH && t !== we, s && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = Pe(this, a[r + l], i, l), c === we && (c = this._$AH[l]), s || (s = !qe(c) || c !== this._$AH[l]), c === $ ? t = $ : t !== $ && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    s && !n && this.j(t);
  }
  j(t) {
    t === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Fo extends bt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === $ ? void 0 : t;
  }
}
class Vo extends bt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== $);
  }
}
class Uo extends bt {
  constructor(t, i, r, n, o) {
    super(t, i, r, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Pe(this, t, i, 0) ?? $) === we) return;
    const r = this._$AH, n = t === $ && r !== $ || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== $ && (r === $ || n);
    n && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Wo {
  constructor(t, i, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Pe(this, t);
  }
}
const Bt = Ge.litHtmlPolyfillSupport;
Bt == null || Bt(Ye, Ze), (Ge.litHtmlVersions ?? (Ge.litHtmlVersions = [])).push("3.3.2");
const jo = (e, t, i) => {
  const r = (i == null ? void 0 : i.renderBefore) ?? t;
  let n = r._$litPart$;
  if (n === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    r._$litPart$ = n = new Ze(t.insertBefore(Ke(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const be = globalThis;
let H = class extends ke {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const t = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = t.firstChild), t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = jo(i, this.renderRoot, this.renderOptions);
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
    return we;
  }
};
var Xr;
H._$litElement$ = !0, H.finalized = !0, (Xr = be.litElementHydrateSupport) == null || Xr.call(be, { LitElement: H });
const Ft = be.litElementPolyfillSupport;
Ft == null || Ft({ LitElement: H });
(be.litElementVersions ?? (be.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ie = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Go = { attribute: !0, type: String, converter: ct, reflect: !1, hasChanged: vi }, Ko = (e = Go, t, i) => {
  const { kind: r, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), r === "accessor") {
    const { name: s } = i;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(s, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, e, a), a;
    } };
  }
  if (r === "setter") {
    const { name: s } = i;
    return function(a) {
      const l = this[s];
      t.call(this, a), this.requestUpdate(s, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function A(e) {
  return (t, i) => typeof i == "object" ? Ko(e, t, i) : ((r, n, o) => {
    const s = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, r), s ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function k(e) {
  return A({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qo = { ATTRIBUTE: 1 }, Yo = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Zo = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, r) {
    this._$Ct = t, this._$AM = i, this._$Ci = r;
  }
  _$AS(t, i) {
    return this.update(t, i);
  }
  update(t, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nn = "important", Xo = " !" + nn, M = Yo(class extends Zo {
  constructor(e) {
    var t;
    if (super(e), e.type !== qo.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(e) {
    return Object.keys(e).reduce((t, i) => {
      const r = e[i];
      return r == null ? t : t + `${i = i.includes("-") ? i : i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
    }, "");
  }
  update(e, [t]) {
    const { style: i } = e.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const r of this.ft) t[r] == null && (this.ft.delete(r), r.includes("-") ? i.removeProperty(r) : i[r] = null);
    for (const r in t) {
      const n = t[r];
      if (n != null) {
        this.ft.add(r);
        const o = typeof n == "string" && n.endsWith(Xo);
        r.includes("-") || o ? i.setProperty(r, o ? n.slice(0, -11) : n, o ? nn : "") : i[r] = n;
      }
    }
    return we;
  }
}), D = (e, t) => {
  if (t)
    return e.states[t];
}, W = (e, t) => {
  const i = D(e, t);
  if (!i)
    return null;
  const r = Number(i.state);
  return Number.isFinite(r) ? r : null;
}, U = (e, t) => {
  const i = D(e, t);
  if (!i)
    return;
  const r = i.attributes.unit_of_measurement;
  return typeof r == "string" ? r : void 0;
}, lt = (e, t) => {
  const i = D(e, t);
  return i == null ? void 0 : i.state;
}, j = (e, t = "hybrid") => e === "history" || e === "statistics" || e === "hybrid" ? e : e === "auto" || t === "auto" ? "hybrid" : t, on = 3e4, Jo = 10 * 6e4, Qo = 1440, es = 1e4, ts = 2e3, sn = 40, vt = /* @__PURE__ */ new Map(), Vt = /* @__PURE__ */ new Map(), Ut = /* @__PURE__ */ new Map(), lr = /* @__PURE__ */ new WeakMap(), cr = /* @__PURE__ */ new WeakMap(), dr = /* @__PURE__ */ new WeakMap(), hr = /* @__PURE__ */ new WeakMap(), xi = (e, t = Qo) => {
  if (e.length <= t)
    return e;
  if (t <= 2)
    return [e[0], e[e.length - 1]];
  const i = e.slice(1, -1), r = Math.max(1, Math.floor((t - 2) / 2)), n = i.length / r, o = [e[0]];
  for (let l = 0; l < r; l += 1) {
    const c = Math.floor(l * n), d = Math.max(c + 1, Math.floor((l + 1) * n)), h = i.slice(c, d);
    if (h.length === 0)
      continue;
    let _ = h[0], u = h[0];
    for (const m of h)
      m.value < _.value && (_ = m), m.value > u.value && (u = m);
    if (_.ts <= u.ts ? (o.push(_), u !== _ && o.push(u)) : (o.push(u), _ !== u && o.push(_)), o.length >= t - 1)
      break;
  }
  if (o.push(e[e.length - 1]), o.length <= t)
    return o;
  const s = [o[0]], a = (o.length - 2) / (t - 2);
  for (let l = 0; l < t - 2; l += 1) {
    const c = 1 + Math.floor(l * a);
    s.push(o[c]);
  }
  return s.push(o[o.length - 1]), s;
}, an = (e, t) => {
  const i = t ? es : ts;
  return !Number.isFinite(e) || e <= 0 || i <= 1 ? Math.max(0, Math.floor(e)) : Math.max(0, Math.floor(e / i) * i);
}, is = (e) => {
  const t = (r) => {
    if (typeof r == "string") {
      const n = Date.parse(r);
      return Number.isFinite(n) ? n : null;
    }
    if (typeof r == "number" && Number.isFinite(r)) {
      if (r > 1e12)
        return Math.floor(r);
      if (r > 0)
        return Math.floor(r * 1e3);
    }
    return null;
  }, i = [
    e.last_changed,
    e.last_updated,
    e.last_changed_ts,
    e.last_updated_ts,
    // Some minimal/compact responses use short keys.
    e.lc,
    e.lu
  ];
  for (const r of i) {
    const n = t(r);
    if (n !== null)
      return n;
  }
  return null;
}, ht = (e, t, i) => {
  const r = [...e, ...t].filter((o) => Number.isFinite(o.ts) && Number.isFinite(o.value) && o.ts >= i).sort((o, s) => o.ts - s.ts);
  if (r.length <= 1)
    return r;
  const n = [];
  return r.forEach((o) => {
    const s = n[n.length - 1];
    if (s && Math.abs(s.ts - o.ts) <= 0.5) {
      n[n.length - 1] = o;
      return;
    }
    n.push(o);
  }), xi(n);
}, rs = (e, t, i = Date.now()) => {
  if (!Array.isArray(e))
    return { entityId: null, points: [] };
  const r = [];
  let n = null;
  for (const a of e) {
    if (!a || typeof a != "object")
      continue;
    const l = a;
    n === null && typeof l.entity_id == "string" && l.entity_id.length > 0 && (n = l.entity_id);
    const c = Number(l.state), d = is(l);
    !Number.isFinite(c) || d === null || r.push({ ts: d, value: c });
  }
  const o = i - t, s = r.filter((a) => a.ts >= o).sort((a, l) => a.ts - l.ts);
  return {
    entityId: n,
    points: xi(s)
  };
}, wt = (e, t, i) => `${e}|${t}|${i}`, q = (e) => e.map((t) => ({ ts: t.ts, value: t.value })), Wt = (e) => {
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
}, ns = (e) => Wt(e.start) ?? Wt(e.end) ?? Wt(e.last_reset), os = (e) => {
  const t = [
    e.state,
    e.mean,
    e.sum,
    e.max,
    e.min,
    e.change
  ];
  for (const i of t) {
    const r = Number(i);
    if (Number.isFinite(r))
      return r;
  }
  return null;
}, ss = (e, t, i = Date.now()) => {
  if (!Array.isArray(e))
    return [];
  const r = [];
  e.forEach((s) => {
    if (!s || typeof s != "object")
      return;
    const a = s, l = ns(a), c = os(a);
    l === null || c === null || r.push({ ts: l, value: c });
  });
  const n = i - t, o = r.filter((s) => s.ts >= n).sort((s, a) => s.ts - a.ts);
  return xi(o);
}, ln = (e) => {
  const t = hr.get(e);
  if (t)
    return t;
  const i = /* @__PURE__ */ new Map();
  return hr.set(e, i), i;
}, cn = (e, t, i) => {
  const r = ln(e), n = r.get(t);
  return n ? n.expiresAt <= i ? (r.delete(t), null) : n.supported : null;
}, ur = (e, t, i, r) => {
  ln(e).set(t, {
    supported: i,
    expiresAt: r + Jo
  });
}, as = (e) => {
  const t = lr.get(e);
  if (t)
    return t;
  const i = /* @__PURE__ */ new Map();
  return lr.set(e, i), i;
}, dn = async (e, t, i, r, n, o) => {
  const s = new Date(r).toISOString(), a = t.join(","), l = `history/period/${s}?filter_entity_id=${encodeURIComponent(a)}&minimal_response&no_attributes`;
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
    const m = rs(_, i, n), w = t[u], f = m.entityId ?? w;
    f && (h[f] = m.points);
  }), t.forEach((_) => {
    _ in h || (h[_] = []), o && vt.set(wt("history", _, i), {
      expiresAt: n + on,
      points: q(h[_])
    });
  }), h;
}, ls = (e, t, i, r, n) => {
  const o = as(e);
  let s = o.get(t);
  return s || (s = {
    entityIds: /* @__PURE__ */ new Set(),
    waiters: []
  }, o.set(t, s)), i.forEach((a) => s == null ? void 0 : s.entityIds.add(a)), new Promise((a, l) => {
    s == null || s.waiters.push({ entityIds: [...i], resolve: a, reject: l }), (s == null ? void 0 : s.flushTimer) === void 0 && (s.flushTimer = setTimeout(async () => {
      const c = o.get(t);
      if (!c)
        return;
      o.delete(t);
      const d = Array.from(c.entityIds);
      try {
        const h = await dn(
          e,
          d,
          r,
          n,
          Date.now(),
          !0
        );
        c.waiters.forEach((_) => {
          const u = {};
          _.entityIds.forEach((m) => {
            u[m] = q(h[m] ?? []);
          }), _.resolve(u);
        });
      } catch (h) {
        c.waiters.forEach((_) => _.reject(h));
      }
    }, sn));
  });
}, cs = (e) => {
  const t = cr.get(e);
  if (t)
    return t;
  const i = /* @__PURE__ */ new Map();
  return cr.set(e, i), i;
}, ds = async (e, t, i, r) => {
  const n = [...r], o = new Date(t).toISOString(), s = new Date(i).toISOString(), a = dr.get(e), l = a ? [a] : ["recorder/statistics_during_period", "history/statistics_during_period"];
  let c;
  for (const d of l)
    try {
      const h = await e({
        type: d,
        start_time: o,
        end_time: s,
        statistic_ids: n,
        period: "5minute",
        types: ["state", "mean", "sum"]
      });
      return dr.set(e, d), h;
    } catch (h) {
      c = h;
    }
  throw c;
}, hs = async (e, t) => {
  if (t.length === 0)
    return /* @__PURE__ */ new Set();
  try {
    const i = await e({
      type: "recorder/get_statistics_metadata",
      statistic_ids: t
    });
    if (!Array.isArray(i))
      return null;
    const r = /* @__PURE__ */ new Set();
    return i.forEach((n) => {
      if (!n || typeof n != "object")
        return;
      const o = n.statistic_id;
      typeof o == "string" && o.length > 0 && r.add(o);
    }), r;
  } catch {
    return null;
  }
}, hn = async (e, t, i, r, n, o) => {
  let s;
  try {
    s = await ds(e, r, n, t);
  } catch {
    const u = new Set(t), m = {};
    return t.forEach((w) => {
      m[w] = [];
    }), {
      pointsByEntity: m,
      unsupportedEntityIds: u
    };
  }
  const a = s && typeof s == "object" && !Array.isArray(s) ? s : {}, l = {}, c = /* @__PURE__ */ new Set(), d = [];
  t.forEach((u) => {
    if (!Object.prototype.hasOwnProperty.call(a, u)) {
      l[u] = [], d.push(u);
      return;
    }
    const m = ss(a[u], i, n);
    l[u] = m, ur(e, u, !0, n), o && vt.set(wt("statistics", u, i), {
      expiresAt: n + on,
      points: q(m)
    });
  });
  const h = [];
  d.forEach((u) => {
    const m = cn(e, u, n);
    if (m !== !0) {
      if (m === !1) {
        c.add(u);
        return;
      }
      h.push(u);
    }
  });
  const _ = await hs(e, h);
  return _ !== null ? h.forEach((u) => {
    const m = _.has(u);
    ur(e, u, m, n), m || c.add(u);
  }) : h.forEach((u) => {
    c.add(u);
  }), {
    pointsByEntity: l,
    unsupportedEntityIds: c
  };
}, us = (e, t, i, r, n) => {
  const o = cs(e);
  let s = o.get(t);
  return s || (s = {
    entityIds: /* @__PURE__ */ new Set(),
    waiters: []
  }, o.set(t, s)), i.forEach((a) => s == null ? void 0 : s.entityIds.add(a)), new Promise((a, l) => {
    s == null || s.waiters.push({ entityIds: [...i], resolve: a, reject: l }), (s == null ? void 0 : s.flushTimer) === void 0 && (s.flushTimer = setTimeout(async () => {
      const c = o.get(t);
      if (!c)
        return;
      o.delete(t);
      const d = Array.from(c.entityIds);
      try {
        const h = await hn(
          e,
          d,
          r,
          n,
          Date.now(),
          !0
        );
        c.waiters.forEach((_) => {
          const u = {
            pointsByEntity: {},
            unsupportedEntityIds: /* @__PURE__ */ new Set()
          };
          _.entityIds.forEach((m) => {
            u.pointsByEntity[m] = q(h.pointsByEntity[m] ?? []), h.unsupportedEntityIds.has(m) && u.unsupportedEntityIds.add(m);
          }), _.resolve(u);
        });
      } catch (h) {
        c.waiters.forEach((_) => _.reject(h));
      }
    }, sn));
  });
}, un = async (e, t, i, r) => {
  const n = e.callApi, o = Array.from(new Set(t.filter((f) => f.length > 0)));
  if (!n || o.length === 0)
    return {};
  const s = Date.now(), a = typeof r == "number" && Number.isFinite(r) ? Math.max(s - i, Math.floor(r)) : s - i, l = a <= s - i + 1e3, c = an(a, l), d = {}, h = [];
  if (o.forEach((f) => {
    if (l) {
      const y = wt("history", f, i), b = vt.get(y);
      if (b && b.expiresAt > s) {
        d[f] = q(b.points);
        return;
      }
    }
    h.push(f);
  }), h.length === 0)
    return d;
  if (l) {
    const f = `${c}|${i}`, y = await ls(
      n,
      f,
      h,
      i,
      c
    );
    return h.forEach((b) => {
      d[b] = q(y[b] ?? []);
    }), d;
  }
  const _ = [...h].sort(), u = `${c}|${i}|${_.join(",")}`, m = Vt.get(u);
  if (m) {
    const f = await m;
    return h.forEach((y) => {
      d[y] = q(f[y] ?? []);
    }), d;
  }
  const w = (async () => dn(
    n,
    h,
    i,
    c,
    s,
    l
  ))();
  Vt.set(u, w);
  try {
    const f = await w;
    return h.forEach((y) => {
      d[y] = q(f[y] ?? []);
    }), d;
  } finally {
    Vt.delete(u);
  }
}, mn = async (e, t, i, r) => {
  const n = e.callWS, o = Array.from(new Set(t.filter((b) => b.length > 0)));
  if (!n || o.length === 0)
    return {
      pointsByEntity: {},
      unsupportedEntityIds: new Set(o)
    };
  const s = Date.now(), a = typeof r == "number" && Number.isFinite(r) ? Math.max(s - i, Math.floor(r)) : s - i, l = a <= s - i + 1e3, c = an(a, l), d = {}, h = [], _ = /* @__PURE__ */ new Set();
  if (o.forEach((b) => {
    if (cn(n, b, s) === !1) {
      d[b] = [], _.add(b);
      return;
    }
    if (l) {
      const S = wt("statistics", b, i), C = vt.get(S);
      if (C && C.expiresAt > s) {
        d[b] = q(C.points);
        return;
      }
    }
    h.push(b);
  }), h.length === 0)
    return {
      pointsByEntity: d,
      unsupportedEntityIds: _
    };
  const u = (b) => (h.forEach((x) => {
    d[x] = q(b.pointsByEntity[x] ?? []), b.unsupportedEntityIds.has(x) && _.add(x);
  }), {
    pointsByEntity: d,
    unsupportedEntityIds: _
  });
  if (l) {
    const b = `${c}|${i}`, x = await us(
      n,
      b,
      h,
      i,
      c
    );
    return u(x);
  }
  const m = [...h].sort(), w = `${c}|${i}|${m.join(",")}`, f = Ut.get(w);
  if (f) {
    const b = await f;
    return u(b);
  }
  const y = (async () => hn(
    n,
    h,
    i,
    c,
    s,
    l
  ))();
  Ut.set(w, y);
  try {
    const b = await y;
    return u(b);
  } finally {
    Ut.delete(w);
  }
}, ms = async (e, t, i, r) => {
  const n = await mn(
    e,
    t,
    i,
    r
  ), o = {};
  t.forEach((l) => {
    l.length !== 0 && (o[l] = q(n.pointsByEntity[l] ?? []));
  });
  const s = Array.from(n.unsupportedEntityIds).filter((l) => l.length > 0);
  if (s.length === 0)
    return o;
  const a = await un(
    e,
    s,
    i,
    r
  );
  return s.forEach((l) => {
    o[l] = q(a[l] ?? []);
  }), o;
}, Re = async (e, t, i, r) => {
  const n = j(r == null ? void 0 : r.dataSource, "hybrid");
  return n === "history" ? un(e, t, i, r == null ? void 0 : r.startMs) : n === "statistics" ? (await mn(
    e,
    t,
    i,
    r == null ? void 0 : r.startMs
  )).pointsByEntity : ms(e, t, i, r == null ? void 0 : r.startMs);
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
}, se = (e) => {
  if (Array.isArray(e) && e.length >= 3) {
    const n = e.slice(0, 3).map((o) => Number(o));
    if (n.every((o) => Number.isFinite(o))) {
      const [o, s, a] = n.map((l) => Math.max(0, Math.min(255, Math.round(l))));
      return `${o}, ${s}, ${a}`;
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
  const i = /^#([a-fA-F0-9]{3})$/, r = /^#([a-fA-F0-9]{6})$/;
  if (i.test(t)) {
    const [, n] = t.match(i) ?? [];
    if (!n)
      return null;
    const o = parseInt(n[0] + n[0], 16), s = parseInt(n[1] + n[1], 16), a = parseInt(n[2] + n[2], 16);
    return `${o}, ${s}, ${a}`;
  }
  if (r.test(t)) {
    const [, n] = t.match(r) ?? [];
    if (!n)
      return null;
    const o = parseInt(n.slice(0, 2), 16), s = parseInt(n.slice(2, 4), 16), a = parseInt(n.slice(4, 6), 16);
    return `${o}, ${s}, ${a}`;
  }
  return null;
}, Si = (e, t = "") => {
  const i = se(e);
  if (i)
    return `rgb(${i})`;
  if (typeof e == "string" && e.trim().length > 0) {
    const r = e.trim(), n = r.toLowerCase();
    if (n !== "none" && n !== "default")
      return r;
  }
  return t;
}, Oe = (e) => {
  const t = se(e);
  if (t)
    return {
      "--icon-color": `rgb(${t})`,
      "--shape-color": `rgba(${t}, 0.2)`
    };
  if (typeof e == "string" && e.trim().length > 0 && e !== "none") {
    const i = e.trim();
    return {
      "--icon-color": i,
      "--shape-color": `color-mix(in srgb, ${i} 20%, transparent)`
    };
  }
  return {};
}, Ei = (e, t, i) => {
  const r = e.map((n) => ({
    x: n.x / 100 * t,
    y: n.y / 100 * i,
    value: n.value,
    ts: n.ts
  }));
  return _s(r, t);
}, _s = (e, t) => {
  if (e.length <= 3)
    return e;
  const i = Math.max(24, Math.min(e.length, Math.round(t)));
  if (e.length <= i)
    return _r(e);
  const r = [];
  r.push(e[0]);
  const n = (e.length - 1) / (i - 1);
  for (let o = 1; o < i - 1; o += 1) {
    const s = Math.floor(o * n), a = Math.max(s + 1, Math.floor((o + 1) * n)), l = e.slice(s, Math.min(e.length, a));
    if (l.length === 0)
      continue;
    const c = l.reduce(
      (h, _) => (h.x += _.x, h.y += _.y, h.value += _.value, h.ts += _.ts, h),
      { x: 0, y: 0, value: 0, ts: 0 }
    ), d = l.length;
    r.push({
      x: c.x / d,
      y: c.y / d,
      value: c.value / d,
      ts: c.ts / d
    });
  }
  return r.push(e[e.length - 1]), _r(r);
}, _r = (e) => {
  if (e.length <= 3)
    return e;
  const t = [e[0]];
  for (let i = 1; i < e.length - 1; i += 1) {
    const r = e[i - 1], n = e[i], o = e[i + 1];
    t.push({
      x: n.x,
      y: (r.y + n.y * 2 + o.y) / 4,
      value: (r.value + n.value * 2 + o.value) / 4,
      ts: n.ts
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
}, Gt = ["", "k", "M", "G", "T"], he = (e, t) => {
  const i = typeof e == "number" && Number.isFinite(e) ? Math.round(e) : t;
  return Math.max(0, Math.min(4, i));
}, oe = (e) => {
  if (!e)
    return null;
  const t = e.trim();
  if (t.length === 0)
    return null;
  if (t.endsWith("Wh")) {
    const i = t.slice(0, -2), n = pr[i === "K" ? "k" : i];
    return n === void 0 ? null : {
      family: "energy",
      prefixPower: n,
      factor: Math.pow(1e3, n),
      canonicalUnit: "Wh"
    };
  }
  if (t.endsWith("W")) {
    const i = t.slice(0, -1), n = pr[i === "K" ? "k" : i];
    return n === void 0 ? null : {
      family: "power",
      prefixPower: n,
      factor: Math.pow(1e3, n),
      canonicalUnit: "W"
    };
  }
  return null;
}, ps = (e, t) => {
  const i = Math.max(0, Math.min(Gt.length - 1, t)), r = Gt[i] ?? "";
  return e === "energy" ? `${r}Wh` : `${r}W`;
}, fs = (e) => {
  if (!Number.isFinite(e) || e <= 0)
    return 0;
  let t = 0, i = e;
  for (; i >= 1e3 && t < Gt.length - 1; )
    i /= 1e3, t += 1;
  return t;
}, Ci = (e, t, i, r) => {
  const n = r.nullWithUnit === !0;
  if (e === null)
    return n && t ? `-- ${t}` : "--";
  const o = oe(t);
  if (!r.enabled || !o)
    return `${e.toFixed(i)} ${t}`.trim();
  const s = e < 0 ? "-" : "", a = Math.abs(e) * o.factor, l = fs(a), c = ps(o.family, l), d = a / Math.pow(1e3, l), h = l === 0 ? r.baseDecimals : r.prefixedDecimals;
  return `${s}${d.toFixed(h)} ${c}`.trim();
}, ys = (e) => {
  const t = Object.keys(e), i = {};
  if (t.length === 0)
    return {
      comparable: !1,
      family: null,
      canonicalUnit: null,
      factors: i
    };
  let r = null, n = null;
  for (const o of t) {
    const s = oe(e[o]);
    if (!s)
      return {
        comparable: !1,
        family: null,
        canonicalUnit: null,
        factors: i
      };
    if (r === null)
      r = s.family, n = s.canonicalUnit;
    else if (r !== s.family)
      return {
        comparable: !1,
        family: null,
        canonicalUnit: null,
        factors: i
      };
    i[o] = s.factor;
  }
  return {
    comparable: !0,
    family: r,
    canonicalUnit: n,
    factors: i
  };
}, gs = 500, bs = 250, vs = 1e3, Ti = (e, t, i) => {
  let r, n, o, s = !1, a = !1;
  const l = e.style.touchAction;
  e.style.touchAction = "manipulation";
  const c = () => {
    r !== void 0 && (clearTimeout(r), r = void 0);
  }, d = () => {
    n !== void 0 && (clearTimeout(n), n = void 0);
  }, h = (f) => {
    f.button === 0 && (s = !1, d(), i.hasHold && (c(), r = setTimeout(() => {
      s = !0, r = void 0, t.onHold(), n = setTimeout(() => {
        s = !1, n = void 0;
      }, vs);
    }, gs)));
  }, _ = () => {
    c();
  }, u = () => {
    c(), s || (s = !1);
  }, m = (f) => {
    if (s) {
      s = !1, d(), f.stopPropagation();
      return;
    }
    i.hasDoubleTap ? a ? (a = !1, o !== void 0 && (clearTimeout(o), o = void 0), t.onDoubleTap()) : (a = !0, o = setTimeout(() => {
      a = !1, o = void 0, t.onTap();
    }, bs)) : t.onTap();
  }, w = (f) => {
    (s || r !== void 0) && f.preventDefault();
  };
  return e.addEventListener("pointerdown", h, { passive: !0 }), e.addEventListener("pointerup", _, { passive: !0 }), e.addEventListener("pointercancel", u, { passive: !0 }), e.addEventListener("pointerleave", u, { passive: !0 }), e.addEventListener("click", m), e.addEventListener("contextmenu", w), {
    destroy: () => {
      c(), d(), o !== void 0 && clearTimeout(o), e.removeEventListener("pointerdown", h), e.removeEventListener("pointerup", _), e.removeEventListener("pointercancel", u), e.removeEventListener("pointerleave", u), e.removeEventListener("click", m), e.removeEventListener("contextmenu", w), e.style.touchAction = l;
    }
  };
}, ue = "0.3.0";
var ws = Object.defineProperty, xs = Object.getOwnPropertyDescriptor, $i = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? xs(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && ws(t, i, n), n;
};
const Ss = 4, Es = 8, fr = 2, Cs = /* @__PURE__ */ new Set(["solar", "home", "grid", "grid_secondary"]), Ts = (e, t) => {
  const i = `${e}_sub_${t}`, r = Cs.has(e);
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
              helper: ai,
              description: ai
            }
          ]
        }
      ]
    },
    ...r ? [
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
                helper: e === "solar" ? ci : li,
                description: e === "solar" ? ci : li
              }
            ]
          }
        ]
      }
    ] : []
  ];
}, nt = (e, t, i, r) => ({
  type: "expandable",
  name: "",
  title: t,
  icon: i,
  expanded: !1,
  schema: Array.from({ length: r }, (n, o) => ({
    type: "expandable",
    name: "",
    title: `Block ${o + 1}`,
    icon: "mdi:view-grid-outline",
    expanded: !1,
    schema: Ts(e, o + 1)
  }))
}), $s = (e, t, i) => ({
  type: "expandable",
  name: "",
  title: e,
  icon: t,
  expanded: !1,
  schema: [
    {
      type: "grid",
      name: "",
      schema: i
    }
  ]
}), J = (e, t) => ({
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
}), zs = {
  select: {
    mode: "dropdown",
    options: [
      { label: "Auto (recommended)", value: "auto" },
      { label: "Statistics (fastest)", value: "statistics" },
      { label: "History (raw)", value: "history" }
    ]
  }
}, Ms = (e) => {
  const t = j(e, "hybrid");
  return t === "hybrid" ? "auto" : t;
}, As = (e) => e === "auto" || e === "history" || e === "statistics" || e === "hybrid" ? e : "auto", Kt = "When enabled, the solar main node shows the sum of enabled solar sub-node entities instead of the solar entity. Solar sub-nodes with State mode enabled are excluded from this sum.", qt = "When enabled, the home main node is calculated as solar + grid + grid 2 - battery - battery 2 using compatible unit conversion.", Ve = "When enabled, negative grid values (energy exported to the grid) are highlighted in the trend with the export color.", Ue = "When enabled, the grid icon switches to the export icon color while the grid value is negative.", Yt = "When enabled, the main grid node is shown. When disabled, the grid node is hidden.", Zt = "When enabled, the second grid node is shown. When disabled, the second grid node is hidden.", Xt = "When enabled, the main solar node is shown. When disabled, the solar node is hidden.", Jt = "Flow direction: + value animates from Solar to Center. 0 or - value shows no solar flow.", Qt = "When enabled, the main home node is shown. When disabled, the home node is hidden.", ei = "Flow direction: + value animates from Center to Home. 0 or - value shows no home flow.", ti = "When enabled, the main battery node is shown. When disabled, the battery node is hidden.", ii = "Flow direction: + value animates from Center to Battery (charging). - value animates Battery to Center (discharging).", ri = "When enabled, the second battery node is shown. When disabled, the second battery node is hidden.", ni = "Flow direction: + value animates from Center to Battery 2 (charging). - value animates Battery 2 to Center (discharging).", We = "Color used for battery low-threshold alert styling (icon and low trend section).", oi = "Flow direction: + value animates from Grid to Center (import). - value animates from Center to Grid (export).", si = "Flow direction: + value animates from Grid 2 to Center (import). - value animates from Center to Grid 2 (export).", ai = "In default mode, this sub-node renders the entity as numeric value + unit.", li = "When enabled, this sub-node displays the entity state text (for example AUS/WW/HZ) instead of numeric value + unit.", ci = "When enabled, this solar sub-node displays entity state text instead of numeric value + unit and is excluded from Solar auto-calc.", di = "Automatically formats values with metric prefixes (for example W/kW/MW and Wh/kWh/MWh).", hi = "Optional unit override/fallback. Used when entities have no unit and as preferred output unit for auto-calculated values.", ui = "Default decimal precision for displayed values and fallback when base/prefixed decimals are not set.", mi = "Decimal precision for base units (W, Wh) when Auto unit scaling is enabled.", _i = "Decimal precision for prefixed units (kW, MW, kWh, MWh) when Auto unit scaling is enabled.", pi = "Controls where trend data is fetched from. In most setups, keep Auto (recommended), which prefers statistics and falls back to history automatically.", ks = [
  $s("Center visuals", "mdi:palette-outline", [
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
                helper: di,
                description: di
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
                helper: _i,
                description: _i
              },
              {
                name: "decimals_base_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: mi,
                description: mi
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
                helper: hi,
                description: hi
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: ui,
                description: ui
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
                selector: zs,
                helper: pi,
                description: pi
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
            helper: Xt,
            description: Xt
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
                helper: Jt,
                description: Jt
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
      J("Calculation", [
        {
          name: "solar_auto_calculate",
          selector: { boolean: {} },
          helper: Kt,
          description: Kt
        }
      ]),
      J("Trend", [
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
            helper: Yt,
            description: Yt
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
                helper: oi,
                description: oi
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
      J("Trend", [
        { name: "grid_trend", selector: { boolean: {} } },
        {
          name: "grid_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      J("Export", [
        {
          name: "grid_export_highlight",
          selector: { boolean: {} },
          helper: Ve,
          description: Ve
        },
        {
          name: "grid_export_trend_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        },
        {
          name: "grid_export_icon_highlight",
          selector: { boolean: {} },
          helper: Ue,
          description: Ue
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
            helper: Zt,
            description: Zt
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
                helper: si,
                description: si
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
      J("Trend", [
        { name: "grid_secondary_trend", selector: { boolean: {} } },
        {
          name: "grid_secondary_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      J("Export", [
        {
          name: "grid_secondary_export_highlight",
          selector: { boolean: {} },
          helper: Ve,
          description: Ve
        },
        {
          name: "grid_secondary_export_trend_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        },
        {
          name: "grid_secondary_export_icon_highlight",
          selector: { boolean: {} },
          helper: Ue,
          description: Ue
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
            helper: Qt,
            description: Qt
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
                helper: ei,
                description: ei
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
      J("Calculation", [
        {
          name: "home_auto_calculate",
          selector: { boolean: {} },
          helper: qt,
          description: qt
        }
      ]),
      J("Trend", [
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
            helper: ti,
            description: ti
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
                helper: ii,
                description: ii
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
      J("Trend", [
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
                helper: We,
                description: We
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
            helper: ri,
            description: ri
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
                helper: ni,
                description: ni
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
      J("Trend", [
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
                helper: We,
                description: We
              }
            ]
          }
        ]
      }
    ]
  },
  nt("solar", "Solar sub blocks", "mdi:solar-power-variant", Ss),
  nt("grid", "Grid 1 sub blocks", "mdi:transmission-tower", fr),
  nt("grid_secondary", "Grid 2 sub blocks", "mdi:transmission-tower", fr),
  nt("home", "Home sub blocks", "mdi:flash", Es),
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
], Ps = {
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
let ut = class extends H {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = e.name ?? "", i = t.match(
        /^(solar|home|grid|grid_secondary)_sub_(\d+)_(enabled|entity|label|icon|icon_color|state_mode)$/
      );
      if (i) {
        const [, , , r] = i;
        return {
          enabled: "Enabled",
          entity: "Entity",
          label: "Label",
          icon: "Icon",
          icon_color: "Color",
          state_mode: "State mode"
        }[r] ?? r;
      }
      return Ps[t] ?? t;
    }, this.computeHelper = (e) => {
      const t = e.name ?? "";
      if (t === "solar_entity")
        return Jt;
      if (t === "grid_entity")
        return oi;
      if (t === "grid_secondary_entity")
        return si;
      if (t === "home_entity")
        return ei;
      if (t === "battery_entity")
        return ii;
      if (t === "battery_secondary_entity")
        return ni;
      if (/^(solar|home|grid|grid_secondary)_sub_\d+_icon_color$/.test(t))
        return ai;
      if (/^(home|grid|grid_secondary)_sub_\d+_state_mode$/.test(t))
        return li;
      if (/^solar_sub_\d+_state_mode$/.test(t))
        return ci;
      if (t === "solar_visible")
        return Xt;
      if (t === "home_visible")
        return Qt;
      if (t === "battery_visible")
        return ti;
      if (t === "battery_secondary_visible")
        return ri;
      if (t === "solar_auto_calculate")
        return Kt;
      if (t === "home_auto_calculate")
        return qt;
      if (t === "grid_visible")
        return Yt;
      if (t === "grid_secondary_visible")
        return Zt;
      if (t === "grid_export_highlight" || t === "grid_secondary_export_highlight")
        return Ve;
      if (t === "grid_export_icon_highlight" || t === "grid_secondary_export_icon_highlight")
        return Ue;
      if (t === "battery_low_alert_color" || t === "battery_secondary_low_alert_color")
        return We;
      if (t === "unit")
        return hi;
      if (t === "decimals")
        return ui;
      if (t === "decimals_base_unit")
        return mi;
      if (t === "decimals_prefixed_unit")
        return _i;
      if (t === "trend_data_source")
        return pi;
      if (t === "auto_scale_units")
        return di;
    }, this.valueChanged = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement) || t.tagName !== "HA-FORM")
        return;
      const i = e.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i))
        return;
      const r = {
        ...i,
        trend_data_source: As(i.trend_data_source),
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
      trend_data_source: Ms(e.trend_data_source),
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
        PowerPilz v${ue}
      </div>
      <div style="margin: 0 0 14px; color: var(--secondary-text-color); line-height: 1.4;">
        Highly flexible energy flow card with configurable main nodes, trends, sub-nodes, auto calculations,
        export highlighting, and advanced unit handling.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ks}
        .computeLabel=${this.computeLabel}
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
$i([
  A({ attribute: !1 })
], ut.prototype, "hass", 2);
$i([
  k()
], ut.prototype, "_config", 2);
ut = $i([
  ie("power-pilz-energy-card-editor")
], ut);
var Rs = Object.defineProperty, Os = Object.getOwnPropertyDescriptor, le = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Os(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Rs(t, i, n), n;
};
const N = 0.01, He = 1, Me = 1440 * 60 * 1e3, yr = 300 * 1e3, gr = 60 * 1e3, Ls = 350, br = 4, vr = 8, jt = 2, Is = 260, Ds = 220, wr = -1e-6, fe = "red", Hs = "var(--rgb-primary-text-color, 33, 33, 33)", Ns = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", ");
let Y = class extends H {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._showSubBlocks = !1, this._compactSubBlocks = !1, this._subNodeConnectorSegments = [], this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._isVisible = !1, this._liveRuntimeActive = !1, this._trendDrawConfig = {}, this.handleCardKeyDown = (e) => {
      e.key !== "Enter" && e.key !== " " || (e.preventDefault(), this.fireAction("tap"));
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-energy-card-editor");
  }
  static async getStubConfig(e) {
    const t = (e == null ? void 0 : e.states) ?? {}, i = Object.keys(t), r = (...d) => d.find((h) => h in t), n = (d) => i.find((h) => h.startsWith(`${d}.`)), o = r("sensor.dev_home_power", "sensor.house_consumption_power") ?? n("sensor") ?? "sensor.dev_home_power", s = r("sensor.dev_solar_power", "sensor.solar_production_power") ?? n("sensor"), a = r("sensor.dev_grid_power", "sensor.grid_power") ?? n("sensor"), l = r("sensor.dev_battery_power", "sensor.home_battery_power") ?? n("sensor"), c = r("sensor.dev_battery_soc", "sensor.home_battery_soc") ?? n("sensor");
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
      home_entity: o,
      home_auto_calculate: !1,
      solar_auto_calculate: !1,
      solar_entity: s,
      grid_entity: a,
      battery_entity: l,
      battery_percentage_entity: c,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      auto_scale_units: !1,
      decimals: He,
      decimals_base_unit: He,
      decimals_prefixed_unit: He
    };
  }
  setConfig(e) {
    const t = e.home_entity ?? e.consumption_entity ?? "sensor.dev_home_power", i = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : He, r = he(e.decimals_base_unit, i), n = he(e.decimals_prefixed_unit, i);
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
      grid_export_trend_color: e.grid_export_trend_color ?? fe,
      grid_export_icon_highlight: e.grid_export_icon_highlight ?? !1,
      grid_export_icon_color: e.grid_export_icon_color ?? fe,
      grid_secondary_export_highlight: e.grid_secondary_export_highlight ?? !1,
      grid_secondary_export_trend_color: e.grid_secondary_export_trend_color ?? fe,
      grid_secondary_export_icon_highlight: e.grid_secondary_export_icon_highlight ?? !1,
      grid_secondary_export_icon_color: e.grid_secondary_export_icon_color ?? fe,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      trend_data_source: j(e.trend_data_source, "hybrid"),
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: r,
      decimals_prefixed_unit: n,
      battery_low_alert: e.battery_low_alert ?? !1,
      battery_low_threshold: this.normalizeBatteryThreshold(e.battery_low_threshold),
      battery_low_alert_color: e.battery_low_alert_color ?? fe,
      battery_secondary_low_alert: e.battery_secondary_low_alert ?? !1,
      battery_secondary_low_threshold: this.normalizeBatteryThreshold(e.battery_secondary_low_threshold),
      battery_secondary_low_alert_color: e.battery_secondary_low_alert_color ?? fe,
      flow_color: e.flow_color,
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
      return E`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return E``;
    const e = this._config, t = e.decimals ?? He, i = e.home_visible !== !1, r = e.solar_visible !== !1, n = e.grid_visible !== !1, o = n && e.grid_secondary_visible === !0, s = e.battery_visible !== !1, a = s && e.battery_secondary_visible === !0, l = this.normalizeBatteryDualAlignment(e.battery_dual_alignment), c = r ? this.collectSubBlocks("solar", e) : [], d = c.filter((I) => !I.stateMode), h = n ? this.collectSubBlocks("grid", e) : [], _ = o ? this.collectSubBlocks("grid_secondary", e) : [], u = i ? this.collectSubBlocks("home", e) : [], m = W(this.hass, e.home_entity), w = r ? W(this.hass, e.solar_entity) : null, f = n ? W(this.hass, e.grid_entity) : null, y = o ? W(this.hass, e.grid_secondary_entity) : null, b = s ? W(this.hass, e.battery_entity) : null, x = W(this.hass, e.battery_percentage_entity), S = a ? W(this.hass, e.battery_secondary_entity) : null, C = W(this.hass, e.battery_secondary_percentage_entity), g = e.unit ?? "kW", v = U(this.hass, e.solar_entity) ?? g, T = U(this.hass, e.grid_entity) ?? g, z = U(this.hass, e.grid_secondary_entity) ?? g, P = U(this.hass, e.battery_entity), O = U(this.hass, e.battery_percentage_entity), L = U(this.hass, e.battery_secondary_entity), B = U(this.hass, e.battery_secondary_percentage_entity), F = P ?? g, K = L ?? g, Ce = this.resolveBatteryPercentage(
      x,
      b,
      P
    ), Te = this.resolveBatteryPercentage(
      C,
      S,
      L
    ), xt = !!this.readConfigString(e.battery_percentage_entity) || this.isPercentageUnit(P), St = !!this.readConfigString(e.battery_secondary_percentage_entity) || this.isPercentageUnit(L), Le = e.solar_auto_calculate === !0 ? this.resolveAutoSolarUnit(e, d, g) : v, Ie = e.solar_auto_calculate === !0 ? this.computeAutoSolarValueFromSubBlocks(d, Le) : w, Et = e.home_auto_calculate === !0 ? this.resolveAutoHomeUnit(e, g, Le) : U(this.hass, e.home_entity) ?? g, Je = e.home_auto_calculate === !0 ? this.computeAutoHomeValueFromNodeValues(
      {
        solar: Ie,
        grid: f,
        grid_secondary: y,
        battery: b,
        battery_secondary: S
      },
      {
        solar: Le,
        grid: T,
        grid_secondary: z,
        battery: F,
        battery_secondary: K
      },
      Et
    ) : m, kn = xt ? O ?? "%" : F, Pn = St ? B ?? "%" : K, Rn = this.toUnidirectionalFlow(Ie), On = this.toUnidirectionalFlow(Je), Ln = this.toBidirectionalFlow(f), In = this.toBidirectionalFlow(y), Dn = this.sumComparableValues([
      { value: f, unit: T },
      { value: y, unit: z }
    ]), Hn = f === null && y === null ? "none" : this.toBidirectionalFlow(Dn), Nn = this.toBidirectionalFlow(b), Bn = this.toBidirectionalFlow(S), Fn = this.sumComparableValues([
      { value: b, unit: F },
      { value: S, unit: K }
    ]), Vn = b === null && S === null ? "none" : this.toBidirectionalFlow(Fn), Un = this.hasConfiguredAction(e), Ct = !this.isEditorPreview() && Un, Wn = this.iconColorStyle(e.solar_icon_color), jn = this.iconColorStyle(e.home_icon_color), Gn = this.iconShapeStyle(e.core_icon_color), Tt = new Set(u.map((I) => I.index)), $e = new Set(c.map((I) => I.index)), Kn = Tt.has(7) && Tt.has(8), qn = [5, 6, 7, 8].some((I) => Tt.has(I)), Yn = $e.has(1) && $e.has(2) && !$e.has(3) && !$e.has(4), Zn = $e.has(3) && $e.has(4), Bi = o && (Yn && Kn || Zn && qn), Xn = o && !Bi, $t = u.some((I) => I.index >= 7), Fi = this.homeSubPositions($t), Vi = this.gridSubPositions(o), Ui = this.gridSecondarySubPositions(), Wi = this.solarSubPositions(
      $t,
      Xn,
      Bi
    ), ji = u.filter((I) => I.index <= ($t ? 8 : 6)), zt = n ? { col: 1, row: o ? 2 : 3, colSpan: 2, rowSpan: 2 } : null, Mt = o ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 } : null, At = s ? {
      col: a && l === "center" ? 2 : 3,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, kt = a ? {
      col: l === "left" ? 1 : l === "right" ? 5 : 4,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, V = this.computeGridBounds(
      i,
      r,
      n,
      o,
      s,
      a,
      zt,
      Mt,
      At,
      kt,
      c,
      h,
      _,
      ji,
      Wi,
      Vi,
      Ui,
      Fi
    ), Pt = r ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, V) : null, Qe = zt ? this.normalizePlacement(zt, V) : null, et = Mt ? this.normalizePlacement(Mt, V) : null, Rt = i ? this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, V) : null, tt = At ? this.normalizePlacement(At, V) : null, it = kt ? this.normalizePlacement(kt, V) : null, Gi = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, V), Jn = this.normalizePositions(Wi, V), Qn = this.normalizePositions(Vi, V), eo = this.normalizePositions(Ui, V), to = this.normalizePositions(Fi, V), Ki = this.normalizeBatteryThreshold(e.battery_low_threshold), qi = !!e.battery_low_alert, Yi = this.normalizeBatteryThreshold(e.battery_secondary_low_threshold), Zi = !!e.battery_secondary_low_alert, rt = this.resolveColor(fe), Ot = this.resolveColor(e.battery_low_alert_color, rt), Lt = this.resolveColor(
      e.battery_secondary_low_alert_color,
      rt
    ), It = qi && Ce !== null && Ce <= Ki, io = this.iconColorStyle(
      It ? Ot : e.battery_icon_color
    ), ro = this.batteryIcon(
      Ce,
      this.isPercentageUnit(P) ? null : b,
      e.battery_icon
    ), Dt = Zi && Te !== null && Te <= Yi, no = this.iconColorStyle(
      Dt ? Lt : e.battery_secondary_icon_color
    ), oo = this.batteryIcon(
      Te,
      this.isPercentageUnit(L) ? null : S,
      e.battery_secondary_icon
    ), so = f !== null && Number.isFinite(f) && f < 0, ao = y !== null && Number.isFinite(y) && y < 0, lo = this.iconColorStyle(
      e.grid_export_icon_highlight === !0 && so ? e.grid_export_icon_color : e.grid_icon_color
    ), co = this.iconColorStyle(
      e.grid_secondary_export_icon_highlight === !0 && ao ? e.grid_secondary_export_icon_color : e.grid_secondary_icon_color
    ), ho = { "--flow-color-rgb": this.toRgbCss(e.flow_color) ?? Hs }, ze = this.resolveColor("purple"), uo = this.resolveColor(e.solar_trend_color, ze), mo = this.resolveColor(e.grid_trend_color, ze), _o = this.resolveColor(e.grid_secondary_trend_color, ze), po = this.resolveColor(e.grid_export_trend_color, rt), fo = this.resolveColor(
      e.grid_secondary_export_trend_color,
      rt
    ), yo = this.resolveColor(e.home_trend_color, ze), go = this.resolveColor(e.battery_trend_color, ze), bo = this.resolveColor(e.battery_secondary_trend_color, ze), vo = e.grid_export_highlight === !0 ? wr : null, wo = e.grid_secondary_export_highlight === !0 ? wr : null, xo = qi && xt ? Ki : null, So = xt ? Ce : b, Eo = Zi && St ? Yi : null, Co = St ? Te : S, To = this.buildFlowSegments(
      Rt,
      Gi,
      Pt,
      [
        ...Qe ? [{ placement: Qe, direction: Ln }] : [],
        ...et ? [{ placement: et, direction: In }] : []
      ],
      Hn,
      [
        ...tt ? [{ placement: tt, direction: Nn }] : [],
        ...it ? [{ placement: it, direction: Bn }] : []
      ],
      Vn,
      Rn,
      On,
      V
    );
    return E`
      <ha-card
        class=${Ct ? "interactive" : ""}
        tabindex=${Ct ? 0 : -1}
        role=${Ct ? "button" : "article"}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div
            class="energy-grid"
            style=${M({
      ...ho,
      "--grid-columns": `${V.cols}`,
      "--grid-rows": `${V.rows}`,
      "--grid-aspect": `${V.cols} / ${V.rows}`
    })}
          >
            ${To.map(
      (I) => this.renderFlowLine(I.orientation, I.direction, {
        ...I.orientation === "horizontal" ? {
          left: `${I.left}%`,
          top: `calc(${I.top}% - (var(--flow-line-size) / 2))`,
          width: `${I.width}%`
        } : {
          left: `calc(${I.left}% - (var(--flow-line-size) / 2))`,
          top: `${I.top}%`,
          height: `${I.height}%`
        }
      })
    )}
            ${this.renderSubNodeConnectors()}

            ${r && Pt ? E`
                  <div
                    class="energy-value solar ${Ie === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Pt))}
                  >
                    ${this.renderTrend("solar", Ie, Le, !!e.solar_trend, uo, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.solar_icon ?? "mdi:weather-sunny"}
                        style=${M(Wn)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(Ie, Le, t)}</div>
                      <div class="energy-label">${e.solar_label}</div>
                    </div>
                  </div>
                ` : $}

            ${n && Qe ? E`
                  <div
                    class="energy-value grid ${f === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Qe))}
                  >
                    ${this.renderTrend(
      "grid",
      f,
      T,
      !!e.grid_trend,
      mo,
      vo,
      po
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_icon ?? "mdi:transmission-tower"}
                        style=${M(lo)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(f, T, t)}</div>
                      <div class="energy-label">${e.grid_label}</div>
                    </div>
                  </div>
                ` : $}

            ${o && et ? E`
                  <div
                    class="energy-value grid-secondary ${y === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(et))}
                  >
                    ${this.renderTrend(
      "grid_secondary",
      y,
      z,
      !!e.grid_secondary_trend,
      _o,
      wo,
      fo
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${M(co)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(y, z, t)}</div>
                      <div class="energy-label">${e.grid_secondary_label}</div>
                    </div>
                  </div>
                ` : $}

            ${i && Rt ? E`
                  <div
                    class="energy-value home ${Je === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Rt))}
                  >
                    ${this.renderTrend("home", Je, Et, !!e.home_trend, yo, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.home_icon ?? "mdi:home-lightning-bolt"}
                        style=${M(jn)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(Je, Et, t)}</div>
                      <div class="energy-label">${e.home_label}</div>
                    </div>
                  </div>
                ` : $}

            ${this._showSubBlocks ? this.renderSubNodes("solar", c, Jn, t) : $}
            ${this._showSubBlocks ? this.renderSubNodes("grid", h, Qn, t) : $}
            ${this._showSubBlocks ? this.renderSubNodes("grid_secondary", _, eo, t) : $}
            ${this._showSubBlocks ? this.renderSubNodes("home", ji, to, t) : $}

            ${s && tt ? E`
                  <div
                    class="energy-value battery ${b === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(tt))}
                  >
                    ${this.renderTrend(
      "battery",
      So,
      kn,
      !!e.battery_trend,
      go,
      xo,
      Ot
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon class="energy-icon" .icon=${ro} style=${M(io)}></ha-icon>
                        ${Ce !== null ? E`
                              <div
                                class="battery-percentage ${It ? "alert" : ""}"
                                style=${M(It ? { color: Ot } : {})}
                              >
                                ${this.formatBatteryPercentage(Ce)}
                              </div>
                            ` : $}
                      </div>
                      <div class="energy-number">${this.formatValue(b, F, t)}</div>
                      <div class="energy-label">${e.battery_label}</div>
                    </div>
                  </div>
                ` : $}

            ${a && it ? E`
                  <div
                    class="energy-value battery-secondary ${S === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(it))}
                  >
                    ${this.renderTrend(
      "battery_secondary",
      Co,
      Pn,
      !!e.battery_secondary_trend,
      bo,
      Eo,
      Lt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${oo}
                          style=${M(no)}
                        ></ha-icon>
                        ${Te !== null ? E`
                              <div
                                class="battery-percentage ${Dt ? "alert" : ""}"
                                style=${M(Dt ? { color: Lt } : {})}
                              >
                                ${this.formatBatteryPercentage(Te)}
                              </div>
                            ` : $}
                      </div>
                      <div class="energy-number">${this.formatValue(S, K, t)}</div>
                      <div class="energy-label">${e.battery_secondary_label}</div>
                    </div>
                  </div>
                ` : $}

            <div class="home-core" style=${M(this.gridPlacementStyle(Gi))}>
              <div class="home-core-icon" style=${M(Gn)}>
                <ha-icon .icon=${e.core_icon ?? "mdi:home"}></ha-icon>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderFlowLine(e, t, i) {
    const r = t === "none" ? `flow-line dynamic ${e}` : `flow-line dynamic ${e} active ${t}`;
    return E`<div class=${r} style=${M(i)} aria-hidden="true"></div>`;
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
    const i = [], r = e === "solar" ? "mdi:solar-power-variant" : e === "home" ? "mdi:flash" : "mdi:transmission-tower", n = e === "solar" ? "Solar" : e === "home" ? "Home" : e === "grid" ? "Grid" : "Grid 2", o = e === "solar" ? br : e === "home" ? vr : jt;
    for (let h = 1; h <= o; h += 1) {
      const _ = t[`${e}_sub_${h}_enabled`] === !0, u = this.readConfigString(t[`${e}_sub_${h}_entity`]);
      if (!_ || !u)
        continue;
      const m = t[`${e}_sub_${h}_state_mode`] === !0;
      i.push({
        key: `${e}_${h}`,
        index: h,
        icon: this.readConfigString(t[`${e}_sub_${h}_icon`]) ?? r,
        iconStyle: this.iconColorStyle(t[`${e}_sub_${h}_icon_color`]),
        label: this.readConfigString(t[`${e}_sub_${h}_label`]) ?? `${n} ${h}`,
        value: W(this.hass, u),
        unit: U(this.hass, u) ?? t.unit ?? "kW",
        stateMode: m,
        stateText: m ? lt(this.hass, u) : void 0
      });
    }
    if (i.length > 0)
      return i;
    if (e !== "solar" && e !== "home")
      return [];
    const s = e === "solar" ? !!t.solar_sub_enabled : !!t.home_sub_enabled, a = e === "solar" ? t.solar_sub_entity : t.home_sub_entity;
    if (!s || !a)
      return [];
    const l = e === "solar" ? t.solar_sub_icon ?? r : t.home_sub_icon ?? r, c = e === "solar" ? t.solar_sub_icon_color : t.home_sub_icon_color, d = e === "solar" ? t.solar_sub_label ?? "Solar Sub" : t.home_sub_label ?? "Home Load";
    return [
      {
        key: `${e}_legacy`,
        index: 1,
        icon: l,
        iconStyle: this.iconColorStyle(c),
        label: d,
        value: W(this.hass, a),
        unit: U(this.hass, a) ?? t.unit ?? "kW",
        stateMode: !1
      }
    ];
  }
  solarSubPositions(e, t = !1, i = !1) {
    return t ? {
      1: { row: 1, col: 5 },
      2: { row: 1, col: 6 },
      3: { row: 1, col: 2 },
      4: { row: 1, col: 1 }
    } : e || i ? {
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
    const t = e.colSpan ?? 1, i = e.rowSpan ?? 1;
    return {
      "grid-column": `${e.col} / span ${t}`,
      "grid-row": `${e.row} / span ${i}`
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
    const i = {};
    return Object.entries(e).forEach(([r, n]) => {
      i[Number(r)] = {
        row: n.row - t.minRow + 1,
        col: n.col - t.minCol + 1
      };
    }), i;
  }
  computeGridBounds(e, t, i, r, n, o, s, a, l, c, d, h, _, u, m, w, f, y) {
    const b = [{ col: 3, row: 3, colSpan: 2, rowSpan: 2 }];
    e && b.push({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }), t && b.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }), i && s && b.push(s), r && a && b.push(a), n && l && b.push(l), o && c && b.push(c), d.forEach((v) => {
      const T = m[v.index];
      T && b.push({ col: T.col, row: T.row, colSpan: 1, rowSpan: 1 });
    }), h.forEach((v) => {
      const T = w[v.index];
      T && b.push({ col: T.col, row: T.row, colSpan: 1, rowSpan: 1 });
    }), _.forEach((v) => {
      const T = f[v.index];
      T && b.push({ col: T.col, row: T.row, colSpan: 1, rowSpan: 1 });
    }), u.forEach((v) => {
      const T = y[v.index];
      T && b.push({ col: T.col, row: T.row, colSpan: 1, rowSpan: 1 });
    });
    const x = Math.min(...b.map((v) => v.col)), S = Math.max(...b.map((v) => v.col + (v.colSpan ?? 1) - 1)), C = Math.min(...b.map((v) => v.row)), g = Math.max(...b.map((v) => v.row + (v.rowSpan ?? 1) - 1));
    return {
      minCol: x,
      maxCol: S,
      minRow: C,
      maxRow: g,
      cols: S - x + 1,
      rows: g - C + 1
    };
  }
  placementCenter(e, t) {
    const i = e.colSpan ?? 1, r = e.rowSpan ?? 1;
    return {
      x: (e.col - 1 + i / 2) / t.cols * 100,
      y: (e.row - 1 + r / 2) / t.rows * 100
    };
  }
  buildFlowSegments(e, t, i, r, n, o, s, a, l, c) {
    const d = this.placementCenter(t, c), h = [], _ = (m, w, f, y) => {
      const b = Math.min(m, w), x = Math.abs(w - m);
      x <= N || h.push({
        orientation: "horizontal",
        direction: y,
        left: b,
        top: f,
        width: x,
        height: 0
      });
    }, u = (m, w, f, y) => {
      const b = Math.min(m, w), x = Math.abs(w - m);
      x <= N || h.push({
        orientation: "vertical",
        direction: y,
        left: f,
        top: b,
        width: 0,
        height: x
      });
    };
    if (e) {
      const m = this.placementCenter(e, c);
      _(d.x, m.x, d.y, l);
    }
    if (i) {
      const m = this.placementCenter(i, c);
      u(m.y, d.y, d.x, a);
    }
    if (r.length === 1) {
      const [{ placement: m, direction: w }] = r, f = this.placementCenter(m, c);
      _(f.x, d.x, d.y, w);
    } else if (r.length >= 2) {
      const m = r.map((y) => ({
        direction: y.direction,
        center: this.placementCenter(y.placement, c)
      })).sort((y, b) => y.center.y - b.center.y), w = Math.min(...m.map((y) => y.center.x)), f = d.x - (d.x - w) * 0.5;
      _(d.x, f, d.y, n), m.forEach((y) => {
        const b = y.center.y > d.y + N ? this.reverseFlowDirection(y.direction) : y.direction;
        u(d.y, y.center.y, f, b), _(y.center.x, f, y.center.y, y.direction);
      });
    }
    if (o.length === 1) {
      const [{ placement: m, direction: w }] = o, f = this.placementCenter(m, c);
      u(d.y, f.y, d.x, w);
    } else if (o.length >= 2) {
      const m = o.map((y) => ({
        placement: y.placement,
        direction: y.direction,
        center: this.placementCenter(y.placement, c)
      })).sort((y, b) => y.center.y - b.center.y), w = Math.min(
        ...m.map((y) => (y.placement.row - 1) / c.rows * 100)
      ), f = Math.max(d.y + N, w);
      u(d.y, f, d.x, s), m.forEach((y) => {
        const b = y.center.x < d.x - N ? this.reverseFlowDirection(y.direction) : y.direction;
        _(d.x, y.center.x, f, b), u(f, y.center.y, y.center.x, y.direction);
      });
    }
    return h;
  }
  renderSubNodes(e, t, i, r) {
    return t.length === 0 ? $ : E`
      ${t.map((n) => {
      var u;
      const o = i[n.index];
      if (!o)
        return $;
      const s = {
        "grid-column": `${o.col}`,
        "grid-row": `${o.row}`
      }, a = ((u = n.stateText) == null ? void 0 : u.trim()) ?? "", l = n.stateMode, c = a.length === 0, d = l ? c ? "--" : a : this.formatValue(n.value, n.unit, r), h = l ? { value: d, unit: "" } : this.splitFormattedValueAndUnit(d, n.unit), _ = l ? c : n.value === null;
      return E`
            <div
              class="energy-sub-value ${e}-sub sub-col-${o.col} ${this._compactSubBlocks ? "compact" : ""} ${_ ? "missing" : ""}"
              data-key=${n.key}
              style=${M(s)}
            >
              <div class="energy-sub-content">
                <ha-icon class="energy-sub-icon" .icon=${n.icon} style=${M(n.iconStyle)}></ha-icon>
                <div class="energy-sub-number">${this._compactSubBlocks ? h.value : d}</div>
                ${l ? $ : E`<div class="energy-sub-unit">${h.unit}</div>`}
                <div class="energy-sub-label">${n.label}</div>
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
  resolveAutoSolarUnit(e, t, i) {
    const r = e.unit;
    if (r && r.trim().length > 0)
      return r;
    const n = t.map((s) => s.unit).find((s) => typeof s == "string" && s.trim().length > 0);
    if (n)
      return n;
    const o = U(this.hass, e.solar_entity);
    return o && o.trim().length > 0 ? o : i;
  }
  computeAutoSolarValueFromSubBlocks(e, t) {
    const i = e.filter(
      (l) => l.value !== null && Number.isFinite(l.value)
    );
    if (i.length === 0)
      return null;
    const r = i.reduce((l, c) => l + c.value, 0);
    let n = null, o = 0;
    for (const l of i) {
      const c = oe(l.unit);
      if (!c)
        return r <= N ? 0 : r;
      if (n === null)
        n = c.family;
      else if (n !== c.family)
        return r <= N ? 0 : r;
      o += l.value * c.factor;
    }
    let s = o;
    const a = oe(t);
    return a && n !== null && a.family === n && a.factor > 0 && (s /= a.factor), Number.isFinite(s) ? s <= N ? 0 : s : null;
  }
  homeComputationDependencies(e) {
    const t = [], i = (r, n) => {
      n && t.push({ role: r, entityId: n });
    };
    return e.solar_visible !== !1 && i("solar", this.readConfigString(e.solar_entity)), e.grid_visible !== !1 && (i("grid", this.readConfigString(e.grid_entity)), e.grid_secondary_visible === !0 && i("grid_secondary", this.readConfigString(e.grid_secondary_entity))), e.battery_visible !== !1 && (i("battery", this.readConfigString(e.battery_entity)), e.battery_secondary_visible === !0 && i("battery_secondary", this.readConfigString(e.battery_secondary_entity))), t;
  }
  resolveAutoHomeUnit(e, t, i) {
    const r = e.unit;
    if (r && r.trim().length > 0)
      return r;
    if (e.solar_auto_calculate === !0 && e.solar_visible !== !1 && i && i.trim().length > 0)
      return i;
    const n = this.homeComputationDependencies(e);
    for (const o of n) {
      const s = U(this.hass, o.entityId);
      if (s && s.trim().length > 0)
        return s;
    }
    return t;
  }
  computeAutoHomeValueFromNodeValues(e, t, i) {
    if (!Object.values(e).some((d) => d != null && Number.isFinite(d)))
      return null;
    const n = {};
    let o = 0;
    t && Object.keys(e).forEach((d) => {
      const h = e[d], _ = t[d];
      h != null && Number.isFinite(h) && (o += 1, _ && (n[d] = _));
    });
    const s = Object.keys(n).length === o ? ys(n) : { comparable: !1, family: null, factors: {} }, a = s.comparable ? s.factors : void 0, l = (d) => {
      const h = e[d];
      if (h == null || !Number.isFinite(h))
        return 0;
      const _ = (a == null ? void 0 : a[d]) ?? 1;
      return h * _;
    };
    let c = l("solar") + l("grid") + l("grid_secondary") - l("battery") - l("battery_secondary");
    if (a && i) {
      const d = oe(i);
      d && s.family !== null && d.family === s.family && d.factor > 0 && (c /= d.factor);
    }
    return Number.isFinite(c) ? c <= N ? 0 : c : null;
  }
  sumComparableValues(e) {
    const t = e.filter(
      (n) => n.value !== null && Number.isFinite(n.value)
    );
    if (t.length === 0)
      return null;
    let i = null, r = 0;
    for (const n of t) {
      const o = oe(n.unit);
      if (!o)
        return t.reduce((s, a) => s + a.value, 0);
      if (i === null)
        i = o.family;
      else if (i !== o.family)
        return t.reduce((s, a) => s + a.value, 0);
      r += n.value * o.factor;
    }
    return r;
  }
  renderTrend(e, t, i, r, n, o, s) {
    return r ? (this._trendDrawConfig[e] = {
      currentValue: t,
      unit: i,
      color: n,
      threshold: o,
      thresholdColor: s
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
    const i = Date.now(), r = i - Me, n = this._trendSeries[e] ?? [];
    let o = 0;
    for (; o < n.length && n[o].ts < r; )
      o += 1;
    const s = o > 0 ? n.slice(o) : [...n];
    return t !== null && Number.isFinite(t) && s.push({ ts: i, value: t }), s;
  }
  buildThresholdTrendSegments(e, t) {
    const i = [];
    for (let r = 1; r < e.length; r += 1) {
      const n = e[r - 1], o = e[r], s = n.value <= t, a = o.value <= t;
      if (s === a || Math.abs(o.value - n.value) <= N) {
        i.push({
          start: n,
          end: o,
          low: s
        });
        continue;
      }
      const l = (t - n.value) / (o.value - n.value), c = Math.max(0, Math.min(1, l)), d = {
        x: n.x + (o.x - n.x) * c,
        y: n.y + (o.y - n.y) * c,
        value: t,
        ts: n.ts + (o.ts - n.ts) * c
      };
      i.push({
        start: n,
        end: d,
        low: s
      }), i.push({
        start: d,
        end: o,
        low: a
      });
    }
    return i;
  }
  toTrendCoordinates(e, t) {
    var y, b;
    const r = Date.now() - Me, n = 0, o = 100, s = e.map((x) => x.value), a = (t == null ? void 0 : t.min) ?? Math.min(...s), l = (t == null ? void 0 : t.max) ?? Math.max(...s);
    if (!Number.isFinite(a) || !Number.isFinite(l))
      return [];
    const c = 20, d = 80, h = Math.max(l - a, N), _ = e.map((x) => {
      const S = Math.max(0, Math.min(100, (x.ts - r) / Me * 100)), C = n + S / 100 * (o - n), g = h <= N ? 0.5 : (x.value - a) / h, v = d - g * (d - c);
      return { x: C, y: v, value: x.value, ts: x.ts };
    }), u = ((y = _[0]) == null ? void 0 : y.x) ?? n, m = ((b = _[_.length - 1]) == null ? void 0 : b.x) ?? o, w = Math.max(0, m - u), f = 18;
    if (_.length >= 2 && w < f) {
      const x = o - f, S = Math.max(n, Math.min(x, m - f));
      if (w <= N) {
        const g = f / (_.length - 1);
        return _.map((v, T) => ({
          ...v,
          x: Math.max(n, Math.min(o, S + g * T))
        }));
      }
      const C = f / w;
      return _.map((g) => ({
        ...g,
        x: Math.max(n, Math.min(o, S + (g.x - u) * C))
      }));
    }
    return _;
  }
  toCanvasPoints(e, t, i) {
    return Ei(e, t, i);
  }
  computeTrendValueRange(e, t) {
    const i = [];
    if (Object.entries(e).forEach(([o, s]) => {
      const a = (t == null ? void 0 : t[o]) ?? 1;
      s.forEach((l) => i.push(l.value * a));
    }), i.length === 0)
      return null;
    const r = Math.min(...i), n = Math.max(...i);
    return !Number.isFinite(r) || !Number.isFinite(n) ? null : { min: r, max: n };
  }
  resolveSharedTrendUnitFactors(e) {
    const t = Object.keys(e);
    if (t.length === 0)
      return null;
    let i = null;
    const r = {};
    for (const n of t) {
      const o = this._trendDrawConfig[n];
      if (!o)
        return null;
      const s = oe(o.unit);
      if (!s)
        return null;
      if (i === null)
        i = s.family;
      else if (i !== s.family)
        return null;
      r[n] = s.factor;
    }
    return r;
  }
  scaleTrendSeries(e, t) {
    return !Number.isFinite(t) || t === 1 ? e : e.map((i) => ({
      ts: i.ts,
      value: i.value * t
    }));
  }
  updateSubBlockVisibility() {
    const e = this.renderRoot.querySelector(".energy-grid");
    if (!e) {
      this._showSubBlocks && (this._showSubBlocks = !1), this._compactSubBlocks && (this._compactSubBlocks = !1);
      return;
    }
    const t = e.getBoundingClientRect(), i = t.width <= Is || t.height <= Ds;
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
    const e = this.renderRoot.querySelector(".energy-grid"), t = this.renderRoot.querySelector(".energy-value.home"), i = this.renderRoot.querySelector(".energy-value.solar"), r = this.renderRoot.querySelector(".energy-value.grid"), n = this.renderRoot.querySelector(".energy-value.grid-secondary");
    if (!e) {
      this._subNodeConnectorSegments.length > 0 && (this._subNodeConnectorSegments = []);
      return;
    }
    const o = e.getBoundingClientRect(), s = t == null ? void 0 : t.getBoundingClientRect(), a = i == null ? void 0 : i.getBoundingClientRect(), l = r == null ? void 0 : r.getBoundingClientRect(), c = n == null ? void 0 : n.getBoundingClientRect(), d = s ? s.left + s.width / 2 : 0, h = a ? a.top + a.height / 2 : 0, _ = l ? l.left + l.width / 2 : 0, u = c ? c.left + c.width / 2 : 0, m = (C) => C - o.left, w = (C) => C - o.top, f = (C) => Math.round(C * 10) / 10, y = [], b = (C, g, v, T) => {
      const z = Math.min(C, g), P = Math.abs(g - C);
      P <= 0.5 || y.push({
        node: T,
        left: f(z),
        top: f(v - 1),
        width: f(P),
        height: 2
      });
    }, x = (C, g, v, T) => {
      const z = Math.min(C, g), P = Math.abs(g - C);
      P <= 0.5 || y.push({
        node: T,
        left: f(v - 1),
        top: f(z),
        width: 2,
        height: f(P)
      });
    };
    s && this.renderRoot.querySelectorAll(".energy-sub-value.home-sub").forEach((C) => {
      const g = C.getBoundingClientRect(), v = g.top + g.height / 2, T = g.left + g.width / 2 < d ? g.right : g.left, z = v, P = v < s.top ? s.top : v > s.bottom ? s.bottom : v, O = m(d), L = w(z), B = w(P), F = m(T);
      b(F, O, L, "home"), x(L, B, O, "home");
    }), a && this.renderRoot.querySelectorAll(".energy-sub-value.solar-sub").forEach((C) => {
      const g = C.getBoundingClientRect(), v = g.left + g.width / 2, T = g.top + g.height / 2 < h ? g.bottom : g.top, z = v, P = v < a.left ? a.left : v > a.right ? a.right : v, O = w(h), L = m(z), B = m(P), F = w(T);
      x(F, O, L, "solar"), b(L, B, O, "solar");
    }), l && this.renderRoot.querySelectorAll(".energy-sub-value.grid-sub").forEach((C) => {
      const g = C.getBoundingClientRect(), v = g.top + g.height / 2, T = g.left + g.width / 2 < _ ? g.right : g.left, z = v, P = v < l.top ? l.top : v > l.bottom ? l.bottom : v, O = m(_), L = w(z), B = w(P), F = m(T);
      b(F, O, L, "grid"), x(L, B, O, "grid");
    }), c && this.renderRoot.querySelectorAll(".energy-sub-value.grid_secondary-sub").forEach((C) => {
      const g = C.getBoundingClientRect(), v = g.top + g.height / 2, T = g.left + g.width / 2 < u ? g.right : g.left, z = v, P = v < c.top ? c.top : v > c.bottom ? c.bottom : v, O = m(u), L = w(z), B = w(P), F = m(T);
      b(F, O, L, "grid_secondary"), x(L, B, O, "grid_secondary");
    }), y.length === this._subNodeConnectorSegments.length && y.every(
      (C, g) => {
        var v, T, z, P, O;
        return C.node === ((v = this._subNodeConnectorSegments[g]) == null ? void 0 : v.node) && C.left === ((T = this._subNodeConnectorSegments[g]) == null ? void 0 : T.left) && C.top === ((z = this._subNodeConnectorSegments[g]) == null ? void 0 : z.top) && C.width === ((P = this._subNodeConnectorSegments[g]) == null ? void 0 : P.width) && C.height === ((O = this._subNodeConnectorSegments[g]) == null ? void 0 : O.height);
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
      var i;
      (i = this._trendResizeObserver) == null || i.observe(t);
    });
  }
  scheduleTrendCanvasDraw() {
    this._trendCanvasRaf === void 0 && (this._trendCanvasRaf = window.requestAnimationFrame(() => {
      this._trendCanvasRaf = void 0, this.drawTrendCanvases();
    }));
  }
  drawTrendCanvases() {
    var h;
    const e = this.perfNow(), t = this.collectTrendCanvases(".node-trend-canvas-area"), i = this.collectTrendCanvases(".node-trend-canvas-line"), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
    t.forEach((_, u) => {
      const m = this.prepareTrendCanvas(_);
      m && r.set(u, m);
    }), i.forEach((_, u) => {
      const m = this.prepareTrendCanvas(_);
      m && n.set(u, m);
    });
    const o = {};
    Object.keys(this._trendDrawConfig).forEach((_) => {
      const u = this._trendDrawConfig[_];
      if (!u)
        return;
      const m = this.trendPoints(_, u.currentValue);
      m.length >= 2 && (o[_] = m);
    });
    const s = ((h = this._config) == null ? void 0 : h.shared_trend_scale) === !0, a = s ? this.resolveSharedTrendUnitFactors(o) : null, l = s ? this.computeTrendValueRange(o, a ?? void 0) : null;
    let c = 0, d = 0;
    Object.keys(this._trendDrawConfig).forEach((_) => {
      const u = this._trendDrawConfig[_];
      if (!u)
        return;
      const m = r.get(_), w = n.get(_);
      if (!m || !w)
        return;
      const f = o[_];
      if (!f || f.length < 2)
        return;
      const y = (a == null ? void 0 : a[_]) ?? 1, b = a ? this.scaleTrendSeries(f, y) : f, x = this.toTrendCoordinates(b, l);
      if (x.length < 2)
        return;
      const S = this.toCanvasPoints(x, m.width, m.height), C = this.toCanvasPoints(x, w.width, w.height);
      this.drawTrendArea(
        m.ctx,
        S,
        u.color,
        m.height,
        u.threshold,
        u.thresholdColor
      ), this.drawTrendLine(w.ctx, C, u.color, u.threshold, u.thresholdColor), c += 1, d += C.length;
    }), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: c,
      points: d,
      shared_scale: s,
      shared_scale_units: a ? "canonical" : "raw"
    });
  }
  collectTrendCanvases(e) {
    const t = /* @__PURE__ */ new Map();
    return this.renderRoot.querySelectorAll(e).forEach((i) => {
      const r = i.dataset.node;
      !r || r !== "solar" && r !== "grid" && r !== "grid_secondary" && r !== "home" && r !== "battery" && r !== "battery_secondary" || t.set(r, i);
    }), t;
  }
  prepareTrendCanvas(e) {
    const t = e.getContext("2d");
    if (!t)
      return null;
    const i = e.getBoundingClientRect(), r = Math.max(1, Math.round(i.width)), n = Math.max(1, Math.round(i.height)), o = Math.max(1, window.devicePixelRatio || 1), s = Math.max(1, Math.round(r * o)), a = Math.max(1, Math.round(n * o));
    return (e.width !== s || e.height !== a) && (e.width = s, e.height = a), t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height), t.setTransform(o, 0, 0, o, 0, 0), { ctx: t, width: r, height: n };
  }
  drawTrendArea(e, t, i, r, n, o) {
    if (t.length < 2)
      return;
    const s = this.resolveCanvasColor(i);
    if (n === null) {
      this.fillTrendAreaRun(e, t, s, r);
      return;
    }
    const a = this.resolveCanvasColor(o), l = this.buildThresholdTrendSegments(t, n);
    this.buildAreaRunsFromSegments(l).forEach((d) => {
      this.fillTrendAreaRun(e, d.points, d.low ? a : s, r);
    });
  }
  buildAreaRunsFromSegments(e) {
    const t = [];
    for (const i of e) {
      if (t.length === 0) {
        t.push({
          low: i.low,
          points: [i.start, i.end]
        });
        continue;
      }
      const r = t[t.length - 1], n = r.points[r.points.length - 1], o = Math.abs(n.x - i.start.x) <= 0.01 && Math.abs(n.y - i.start.y) <= 0.01;
      r.low === i.low && o ? r.points.push(i.end) : t.push({
        low: i.low,
        points: [i.start, i.end]
      });
    }
    return t;
  }
  fillTrendAreaRun(e, t, i, r) {
    if (t.length < 2)
      return;
    const n = t[0], o = t[t.length - 1], s = Math.min(...t.map((l) => l.y)), a = e.createLinearGradient(0, s, 0, r);
    a.addColorStop(0, this.withAlpha(i, 0.24)), a.addColorStop(1, this.withAlpha(i, 0)), e.beginPath(), e.moveTo(n.x, n.y), t.slice(1).forEach((l) => e.lineTo(l.x, l.y)), e.lineTo(o.x, r), e.lineTo(n.x, r), e.closePath(), e.fillStyle = a, e.fill();
  }
  drawTrendLine(e, t, i, r, n) {
    if (t.length < 2)
      return;
    const o = this.resolveCanvasColor(i), s = this.resolveCanvasColor(n);
    if (r === null) {
      this.strokeTrendPolyline(e, t, o, 1.5);
      return;
    }
    this.buildThresholdTrendSegments(t, r).forEach((l) => {
      this.strokeTrendSegment(e, l.start, l.end, l.low ? s : o, 1.5);
    });
  }
  strokeTrendPolyline(e, t, i, r) {
    t.length < 2 || (e.beginPath(), e.moveTo(t[0].x, t[0].y), t.slice(1).forEach((n) => e.lineTo(n.x, n.y)), e.strokeStyle = i, e.lineWidth = r, e.lineCap = "round", e.lineJoin = "round", e.stroke());
  }
  strokeTrendSegment(e, t, i, r, n) {
    e.beginPath(), e.moveTo(t.x, t.y), e.lineTo(i.x, i.y), e.strokeStyle = r, e.lineWidth = n, e.lineCap = "round", e.lineJoin = "round", e.stroke();
  }
  resolveCanvasColor(e) {
    const t = document.createElement("span");
    t.style.position = "absolute", t.style.opacity = "0", t.style.pointerEvents = "none", t.style.color = e, this.renderRoot.appendChild(t);
    const i = getComputedStyle(t).color;
    return t.remove(), i || "rgb(158, 158, 158)";
  }
  withAlpha(e, t) {
    const i = this.parseColorChannels(e);
    if (!i)
      return e;
    const r = Math.max(0, Math.min(1, t));
    return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${r})`;
  }
  parseColorChannels(e) {
    const t = e.trim(), i = t.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
    if (i) {
      const l = i.slice(1, 4).map((c) => Math.max(0, Math.min(255, Math.round(Number(c)))));
      if (l.every((c) => Number.isFinite(c)))
        return [l[0], l[1], l[2]];
    }
    this._canvasColorContext || (this._canvasColorContext = document.createElement("canvas").getContext("2d"));
    const r = this._canvasColorContext;
    if (!r)
      return null;
    r.fillStyle = "#000000", r.fillStyle = t;
    const n = r.fillStyle, s = (typeof n == "string" ? n.trim() : "").match(/^#([a-f\d]{6})$/i);
    if (!s)
      return null;
    const a = s[1];
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
    var r, n;
    const e = this.renderRoot.querySelector("ha-card");
    if (!e || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const t = !!((r = this._config.hold_action) != null && r.action && this._config.hold_action.action !== "none"), i = !!((n = this._config.double_tap_action) != null && n.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = Ti(
      e,
      {
        onTap: () => this.fireAction("tap"),
        onHold: () => this.fireAction("hold"),
        onDoubleTap: () => this.fireAction("double_tap")
      },
      { hasHold: t, hasDoubleTap: i }
    );
  }
  updated(e) {
    e.has("_config") && this.setupActionHandler();
    const t = e.get("_config"), i = e.has("_config") && this.shouldRefreshTrendOnConfigChange(t, this._config), r = e.get("hass"), n = e.has("hass") && this.didRelevantEntityStateChange(r);
    (e.has("preview") || e.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (e.has("_config") ? i && this.scheduleConfigRefresh() : e.has("hass") && this._isVisible && n && this.maybeRefreshTrendHistory(), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (e.has("_config") ? i && this.scheduleConfigRefresh(!0) : e.has("hass") && n && this.maybeRefreshTrendHistory(!1, !0), this._trendResizeObserver && this._trendResizeObserver.disconnect());
    const o = e.has("_config") || e.has("_trendSeries") || e.has("_showSubBlocks") || e.has("preview") || e.has("editMode") || n;
    o && this.updateSubBlockVisibility(), (!this.shouldRunLiveRuntime() || this._isVisible) && o && (this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
  }
  maybeRefreshTrendHistory(e = !1, t = !1) {
    if (!this.shouldRunLiveRuntime() && !t || !this._isVisible && !t || t && !this.isEditorPreview())
      return;
    e && (this._lastTrendRefresh = 0);
    const i = Date.now();
    !e && i - this._lastTrendRefresh < yr || (this._lastTrendRefresh = i, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(Ns) || this.hasEditorLikeAncestor();
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
        const i = e.className;
        if (typeof i == "string") {
          const r = i.toLowerCase();
          if (r.includes("preview") || r.includes("editor") || r.includes("card-picker"))
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
    var i;
    if (((i = this._config) == null ? void 0 : i.debug_performance) === !0) {
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
      const t = e.some((i) => i.isIntersecting && i.intersectionRatio > 0);
      t !== this._isVisible && (this._isVisible = t, this.shouldRunLiveRuntime() && (t ? (this.startLiveRuntime(!0), this.syncTrendResizeObserver(), this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw()) : this.stopLiveRuntime()));
    }, { threshold: [0, 0.01] }), this._visibilityObserver.observe(this));
  }
  teardownVisibilityObserver() {
    this._visibilityObserver && (this._visibilityObserver.disconnect(), this._visibilityObserver = void 0), this._isVisible = typeof IntersectionObserver > "u";
  }
  scheduleConfigRefresh(e = !1) {
    !this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview() || (this._configRefreshTimer !== void 0 && window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = window.setTimeout(() => {
      this._configRefreshTimer = void 0, this.maybeRefreshTrendHistory(!0, e);
    }, Ls));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, yr), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.syncTrendResizeObserver(), this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this.clearConfigRefreshTimer(), this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._subNodeConnectorRaf !== void 0 && (window.cancelAnimationFrame(this._subNodeConnectorRaf), this._subNodeConnectorRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
  }
  async refreshTrendHistory(e = !1, t = !1) {
    var o, s;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !t)
      return;
    const i = this._config, r = j(i.trend_data_source, "hybrid"), n = this.enabledTrendNodes(i);
    if (n.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const a = this.perfNow(), l = {}, c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set();
      let w = Number.POSITIVE_INFINITY;
      const f = Date.now() - Me;
      for (const g of n) {
        if (g === "home" && i.home_auto_calculate === !0) {
          const O = this.homeComputationDependencies(i);
          if (O.length === 0) {
            l[g] = [];
            continue;
          }
          d.set(g, O), h.set(g, this.resolveAutoHomeUnit(i, i.unit ?? "kW"));
          const L = this._trendSeries[g] ?? [];
          if (e || L.length === 0) {
            _.add(g), O.forEach((K) => {
              u.add(K.entityId), m.delete(K.entityId);
            });
            continue;
          }
          const B = ((o = L[L.length - 1]) == null ? void 0 : o.ts) ?? f, F = Math.max(f, B - gr);
          w = Math.min(w, F), O.forEach((K) => {
            u.has(K.entityId) || m.add(K.entityId);
          });
          continue;
        }
        const v = this.trendEntityId(g, i);
        if (!v)
          continue;
        c.set(g, v);
        const T = this._trendSeries[g] ?? [];
        if (e || T.length === 0 || u.has(v)) {
          u.add(v), m.delete(v);
          continue;
        }
        if (u.has(v))
          continue;
        m.add(v);
        const z = ((s = T[T.length - 1]) == null ? void 0 : s.ts) ?? f, P = Math.max(f, z - gr);
        w = Math.min(w, P);
      }
      let y = 0;
      const b = u.size > 0 ? await (async () => {
        const g = this.perfNow(), v = await Re(
          this.hass,
          Array.from(u),
          Me,
          { dataSource: r }
        );
        return y = this.perfNow() - g, v;
      })() : {};
      let x = 0;
      const S = m.size > 0 ? await (async () => {
        const g = this.perfNow(), v = await Re(
          this.hass,
          Array.from(m),
          Me,
          {
            startMs: Number.isFinite(w) ? w : f,
            dataSource: r
          }
        );
        return x = this.perfNow() - g, v;
      })() : {};
      c.forEach((g, v) => {
        const T = this._trendSeries[v] ?? [];
        if (u.has(g)) {
          const z = b[g] ?? [];
          l[v] = z.length > 0 ? z : T.filter((P) => P.ts >= f);
          return;
        }
        if (m.has(g)) {
          const z = S[g] ?? [];
          l[v] = ht(T, z, f);
          return;
        }
        l[v] = T.filter((z) => z.ts >= f);
      }), d.forEach((g, v) => {
        const T = this._trendSeries[v] ?? [], z = this.computeAutoHomeTrendFromFetchedDependencies(
          g,
          b,
          S,
          u,
          m,
          f,
          h.get(v) ?? i.unit ?? "kW"
        );
        if (_.has(v)) {
          l[v] = z.length > 0 ? z : T.filter((P) => P.ts >= f);
          return;
        }
        l[v] = ht(T, z, f);
      });
      const C = this.sameTrendSeriesKeys(l, this._trendSeries) && Object.keys(l).every(
        (g) => this.areTrendSeriesEqual(l[g] ?? [], this._trendSeries[g] ?? [])
      );
      C || (this._trendSeries = l), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - a),
        force_full: e,
        nodes: n.length,
        full_entities: u.size,
        incremental_entities: m.size,
        data_source: r,
        full_fetch_ms: this.toPerfMs(y),
        incremental_fetch_ms: this.toPerfMs(x),
        series_changed: !C
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
    const t = /* @__PURE__ */ new Set(), i = (n) => {
      const o = this.readConfigString(n);
      o && t.add(o);
    };
    i(e.home_entity), i(e.solar_entity), i(e.grid_entity), i(e.grid_secondary_entity), i(e.battery_entity), i(e.battery_percentage_entity), i(e.battery_secondary_entity), i(e.battery_secondary_percentage_entity), e.solar_sub_enabled && i(e.solar_sub_entity), e.home_sub_enabled && i(e.home_sub_entity);
    const r = (n, o) => {
      for (let s = 1; s <= o; s += 1)
        e[`${n}_sub_${s}_enabled`] === !0 && i(e[`${n}_sub_${s}_entity`]);
    };
    return r("solar", br), r("home", vr), r("grid", jt), r("grid_secondary", jt), Array.from(t);
  }
  didRelevantEntityStateChange(e) {
    if (!this._config || !this.hass || !e)
      return !0;
    const t = this.relevantEntityIds(this._config);
    return t.length === 0 ? !1 : t.some((i) => e.states[i] !== this.hass.states[i]);
  }
  trendHistorySignature(e) {
    if (!e)
      return "";
    const t = [];
    return t.push(`source:${j(e.trend_data_source, "hybrid")}`), this.enabledTrendNodes(e).forEach((i) => {
      if (i === "home" && e.home_auto_calculate === !0) {
        const r = this.homeComputationDependencies(e).map((n) => `${n.role}:${n.entityId}`).sort().join(",");
        t.push(`home:auto:${r}`);
        return;
      }
      t.push(`${i}:${this.trendEntityId(i, e) ?? ""}`);
    }), t.sort().join("|");
  }
  shouldRefreshTrendOnConfigChange(e, t) {
    return !e || !t ? !0 : this.trendHistorySignature(e) !== this.trendHistorySignature(t);
  }
  computeAutoHomeTrendFromFetchedDependencies(e, t, i, r, n, o, s) {
    const a = {}, l = {};
    return e.forEach((c) => {
      const d = r.has(c.entityId) ? t[c.entityId] ?? [] : n.has(c.entityId) ? i[c.entityId] ?? [] : [];
      a[c.role] = d.filter((_) => Number.isFinite(_.ts) && Number.isFinite(_.value) && _.ts >= o).sort((_, u) => _.ts - u.ts);
      const h = U(this.hass, c.entityId);
      h && (l[c.role] = h);
    }), this.computeAutoHomeTrendSeries(a, o, l, s);
  }
  computeAutoHomeTrendSeries(e, t, i, r) {
    const n = [];
    if (Object.values(e).forEach((s) => {
      s.forEach((a) => {
        Number.isFinite(a.ts) && a.ts >= t && n.push(a.ts);
      });
    }), n.length === 0)
      return [];
    n.sort((s, a) => s - a);
    const o = [];
    return n.forEach((s) => {
      const a = o[o.length - 1];
      (a === void 0 || Math.abs(a - s) > 0.5) && o.push(s);
    }), o.map((s) => {
      const a = this.computeAutoHomeValueFromNodeValues({
        solar: this.interpolateTrendSeriesValue(e.solar ?? [], s),
        grid: this.interpolateTrendSeriesValue(e.grid ?? [], s),
        grid_secondary: this.interpolateTrendSeriesValue(e.grid_secondary ?? [], s),
        battery: this.interpolateTrendSeriesValue(e.battery ?? [], s),
        battery_secondary: this.interpolateTrendSeriesValue(e.battery_secondary ?? [], s)
      }, i, r);
      return a === null ? null : { ts: s, value: a };
    }).filter((s) => s !== null);
  }
  interpolateTrendSeriesValue(e, t) {
    if (e.length === 0)
      return null;
    if (t <= e[0].ts)
      return e[0].value;
    const i = e[e.length - 1];
    if (t >= i.ts)
      return i.value;
    let r = 0, n = e.length - 1;
    for (; r <= n; ) {
      const d = Math.floor((r + n) / 2), h = e[d];
      if (Math.abs(h.ts - t) <= 0.5)
        return h.value;
      h.ts < t ? r = d + 1 : n = d - 1;
    }
    const o = Math.max(1, Math.min(e.length - 1, r)), s = e[o - 1], a = e[o], l = a.ts - s.ts;
    if (Math.abs(l) <= N)
      return a.value;
    const c = (t - s.ts) / l;
    return s.value + (a.value - s.value) * c;
  }
  sameTrendSeriesKeys(e, t) {
    const i = Object.keys(e).sort(), r = Object.keys(t).sort();
    return i.length === r.length && i.every((n, o) => n === r[o]);
  }
  areTrendSeriesEqual(e, t) {
    if (e.length !== t.length)
      return !1;
    for (let i = 0; i < e.length; i += 1) {
      const r = e[i], n = t[i];
      if (r.ts !== n.ts || Math.abs(r.value - n.value) > 1e-4)
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
    let i = this._config[t], r = this._config;
    if (!i && e === "tap" && this._config.details_navigation_path && (i = { action: "navigate", navigation_path: this._config.details_navigation_path }, r = { ...this._config, tap_action: i }), !(!i || !i.action || i.action === "none")) {
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
          detail: { config: r, action: e },
          bubbles: !0,
          composed: !0
        })
      );
    }
  }
  toUnidirectionalFlow(e) {
    return e === null || e <= N ? "none" : "forward";
  }
  toBidirectionalFlow(e) {
    return e === null || Math.abs(e) <= N ? "none" : e > 0 ? "forward" : "backward";
  }
  reverseFlowDirection(e) {
    return e === "forward" ? "backward" : e === "backward" ? "forward" : "none";
  }
  formatValue(e, t, i) {
    var r, n, o;
    return Ci(e, t, i, {
      enabled: ((r = this._config) == null ? void 0 : r.auto_scale_units) === !0,
      baseDecimals: ((n = this._config) == null ? void 0 : n.decimals_base_unit) ?? i,
      prefixedDecimals: ((o = this._config) == null ? void 0 : o.decimals_prefixed_unit) ?? i
    });
  }
  splitFormattedValueAndUnit(e, t) {
    const i = e.trim(), r = t.trim();
    if (i.length === 0)
      return { value: "--", unit: r };
    if (r.length === 0)
      return { value: i, unit: "" };
    const n = ` ${r}`;
    if (i.endsWith(n))
      return {
        value: i.slice(0, Math.max(0, i.length - n.length)).trim(),
        unit: r
      };
    const o = i.lastIndexOf(" ");
    return o > 0 ? {
      value: i.slice(0, o).trim(),
      unit: i.slice(o + 1).trim()
    } : { value: i, unit: r };
  }
  formatBatteryPercentage(e) {
    return `${Math.round(this.normalizeBatteryThreshold(e))}%`;
  }
  batteryIcon(e, t, i) {
    if (t !== null && t > N)
      return "mdi:battery-charging";
    if (e === null)
      return i ?? "mdi:battery-outline";
    const r = this.normalizeBatteryThreshold(e);
    return r < 5 ? "mdi:battery-outline" : r >= 95 ? "mdi:battery" : `mdi:battery-${Math.max(10, Math.min(90, Math.round(r / 10) * 10))}`;
  }
  normalizeBatteryThreshold(e) {
    return typeof e != "number" || !Number.isFinite(e) ? 20 : Math.max(0, Math.min(100, e));
  }
  resolveBatteryPercentage(e, t, i) {
    return e !== null ? e : this.isPercentageUnit(i) ? t : null;
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
      const i = e.trim(), r = i.toLowerCase();
      return r === "none" || r === "default" ? {} : {
        "--icon-color": i,
        "--shape-color": `color-mix(in srgb, ${i} 14%, var(--ha-card-background, var(--card-background-color, white)))`
      };
    }
    return {};
  }
  resolveColor(e, t = "") {
    return Si(e, t);
  }
  toRgbCss(e) {
    return se(e);
  }
};
Y.styles = xe`
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
le([
  A({ attribute: !1 })
], Y.prototype, "hass", 2);
le([
  A({ type: Boolean })
], Y.prototype, "preview", 2);
le([
  A({ type: Boolean })
], Y.prototype, "editMode", 2);
le([
  k()
], Y.prototype, "_config", 2);
le([
  k()
], Y.prototype, "_trendSeries", 2);
le([
  k()
], Y.prototype, "_showSubBlocks", 2);
le([
  k()
], Y.prototype, "_compactSubBlocks", 2);
le([
  k()
], Y.prototype, "_subNodeConnectorSegments", 2);
Y = le([
  ie("power-pilz-energy-card")
], Y);
const Q = (e) => {
  if (typeof e != "string")
    return;
  const t = e.trim();
  return t.length > 0 ? t : void 0;
}, _n = (e, t) => {
  switch (e) {
    case 1:
      return Q(t.entity_1);
    case 2:
      return Q(t.entity_2);
    case 3:
      return Q(t.entity_3);
    case 4:
      return Q(t.entity_4);
    default:
      return;
  }
}, pn = (e, t) => {
  switch (e) {
    case 1:
      return Q(t.entity_1_name);
    case 2:
      return Q(t.entity_2_name);
    case 3:
      return Q(t.entity_3_name);
    case 4:
      return Q(t.entity_4_name);
    default:
      return;
  }
}, fn = (e, t) => {
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
}, yn = (e, t) => {
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
}, gn = (e, t) => {
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
}, bn = (e, t) => {
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
}, vn = (e, t) => {
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
}, wn = (e) => e === "column" ? "column" : "row", zi = (e, t = 24) => {
  const i = typeof e == "number" ? e : typeof e == "string" ? Number.parseInt(e, 10) : NaN;
  return i === 6 || i === 12 || i === 24 || i === 48 || i === 72 || i === 168 || i === 336 || i === 720 ? i : t;
}, Mi = (e) => typeof e != "number" || !Number.isFinite(e) ? 1.5 : Math.max(0.5, Math.min(6, e)), xn = (e, t, i, r) => {
  var s;
  if (t)
    return t;
  const n = e[i], o = (s = n == null ? void 0 : n.attributes) == null ? void 0 : s.friendly_name;
  return typeof o == "string" && o.trim().length > 0 ? o.trim() : `Entity ${r}`;
}, Sn = (e, t, i, r) => {
  if (r)
    return Ci(e, t, i, {
      ...r,
      nullWithUnit: !0
    });
  if (e === null)
    return t ? `-- ${t}` : "--";
  const n = `${e.toFixed(i)} ${t}`.trim();
  return n.length > 0 ? n : "--";
};
function R(e) {
  var r;
  const t = ((r = e == null ? void 0 : e.locale) == null ? void 0 : r.language) ?? (e == null ? void 0 : e.language) ?? "en";
  return String(t).split("-")[0].toLowerCase() === "de" ? "de" : "en";
}
const fi = {
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
  "schedule.placeholder_companion": "Pick a PowerPilz Smart Schedule entity in the card settings to configure this card.",
  "schedule.placeholder_manual": "Pick a schedule entity in the card settings to configure this card.",
  "schedule.editor.use_companion": "Use PowerPilz Companion integration",
  "schedule.editor.use_companion_help": "When enabled (default), configure only one entity — a PowerPilz Smart Schedule helper from the PowerPilz Companion integration — and the card reads the linked schedule and target device from its attributes. When disabled, configure the three entities manually (schedule / device / mode).",
  "schedule.editor.companion_entity": "PowerPilz Smart Schedule entity",
  "schedule.editor.companion_help": "A PowerPilz Smart Schedule helper (select.* entity created by the PowerPilz Companion integration). The card automatically reads its `linked_schedule` and `target_entity` attributes — no other entities needed.",
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
  "graph.editor.double_tap_action": "Double tap behavior"
}, Bs = {
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
  "schedule.placeholder_companion": "Wähle in den Karten-Einstellungen eine PowerPilz Smart-Zeitschaltuhr-Entität aus, um diese Karte zu konfigurieren.",
  "schedule.placeholder_manual": "Wähle in den Karten-Einstellungen eine Zeitplan-Entität aus, um diese Karte zu konfigurieren.",
  "schedule.editor.use_companion": "PowerPilz Companion Integration nutzen",
  "schedule.editor.use_companion_help": "Wenn aktiviert (Standard), musst du nur eine einzige Entität angeben — einen PowerPilz Smart-Zeitschaltuhr-Helfer aus der PowerPilz Companion Integration — die Karte liest den verknüpften Zeitplan und das Zielgerät automatisch aus deren Attributen. Wenn deaktiviert, gibst du die drei Entitäten (Zeitplan / Gerät / Modus) manuell an.",
  "schedule.editor.companion_entity": "PowerPilz Smart-Zeitschaltuhr-Entität",
  "schedule.editor.companion_help": "Ein PowerPilz Smart-Zeitschaltuhr-Helfer (select.* Entität, angelegt von der PowerPilz Companion Integration). Die Karte liest automatisch deren `linked_schedule`- und `target_entity`-Attribute — keine weiteren Entitäten nötig.",
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
  "graph.editor.double_tap_action": "Verhalten bei Doppeltap"
}, Fs = { en: fi, de: Bs };
function p(e, t, i) {
  let o = (Fs[e === "de" ? "de" : "en"] ?? fi)[t] ?? fi[t] ?? t;
  if (i)
    for (const [s, a] of Object.entries(i))
      o = o.replace(new RegExp(`\\{${s}\\}`, "g"), String(a));
  return o;
}
function yi(e, t) {
  return p(e, `weekday.short.${(t % 7 + 7) % 7}`);
}
const Vs = 4, En = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, xr = "When enabled, hovering over the graph shows the value and timestamp for that point in the legend.", Sr = "When enabled, the area below each trend line is filled with a semi-transparent gradient.", Er = "When enabled, all entities share the same Y-axis scale. When disabled, each entity auto-scales independently.", Cr = "When enabled, the graph area is clipped so it does not extend behind the legend labels.", Tr = "Thickness of the trend lines in pixels.", $r = "Controls where trend data is fetched from. Hybrid prefers statistics and falls back to history automatically.", zr = "The time window shown in the graph.", Mr = "Controls whether entity legend items are displayed in a row or column layout.", Ar = "When enabled, all entity values are normalized as percentages of a reference total, so the graph always fills 0–100%.", kr = "The entity whose value represents 100%. Defaults to the last enabled entity in the stack.", Pr = "When enabled, the 100% total is auto-calculated by summing all other entities. Useful when you don't have a total meter.", Rr = "Default entity used by more-info actions. Required when tap/hold/double-tap is set to 'More info'.", Or = "Automatically formats values with metric prefixes (e.g. W/kW/MW and Wh/kWh/MWh).", Lr = "Optional unit override. Used when entities have no unit_of_measurement attribute.", Ir = "Default decimal precision for displayed values.", Dr = "Decimal precision for base units (W, Wh) when auto unit scaling is enabled.", Hr = "Decimal precision for prefixed units (kW, MW, kWh, MWh) when auto unit scaling is enabled.", Us = {
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
}, Ws = (e) => ({
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
                  default_color: En[e] ?? "purple"
                }
              }
            }
          ]
        }
      ]
    }
  ]
}), Cn = (e = !1, t = !1) => {
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
            helper: Mr,
            description: Mr
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
            helper: zr,
            description: zr
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
            helper: $r,
            description: $r
          }
        ]
      }
    ]
  }, n = {
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
            helper: xr,
            description: xr
          },
          {
            name: "fill_area_enabled",
            selector: { boolean: {} },
            helper: Sr,
            description: Sr
          },
          {
            name: "shared_trend_scale",
            selector: { boolean: {} },
            helper: Er,
            description: Er
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
  }, o = [];
  if (e) {
    const l = [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "normalize_stack_to_percent",
            selector: { boolean: {} },
            helper: Ar,
            description: Ar
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
            helper: kr,
            description: kr
          },
          {
            name: "percent_reference_auto",
            selector: { boolean: {} },
            helper: Pr,
            description: Pr
          }
        ]
      }
    ), o.push({
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
        helper: Rr,
        description: Rr
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
                helper: Lr,
                description: Lr
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: Ir,
                description: Ir
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
                helper: Or,
                description: Or
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
                helper: Dr,
                description: Dr
              },
              {
                name: "decimals_prefixed_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: Hr,
                description: Hr
              }
            ]
          }
        ]
      }
    ]
  };
  return [
    i,
    n,
    ...o,
    ...Array.from({ length: Vs }, (l, c) => Ws(c + 1)),
    a,
    s
  ];
}, ne = (e) => {
  if (typeof e == "string")
    return e.length > 0 ? e : void 0;
}, Tn = (e) => e === "column" ? "column" : "row", $n = (e) => zi(e), zn = (e) => Mi(e), ot = (e, t, i) => {
  const r = e ?? t;
  return Array.isArray(r) || typeof r == "string" && r.trim().length > 0 ? r : En[i] ?? "purple";
}, Mn = (e) => ({
  trend_data_source: j(e.trend_data_source, "hybrid"),
  entity_1: ne(e.entity_1) ?? ne(e.entity),
  entity_1_name: ne(e.entity_1_name),
  entity_1_enabled: e.entity_1_enabled ?? !0,
  entity_1_show_icon: e.entity_1_show_icon ?? !0,
  entity_1_icon: e.entity_1_icon ?? e.icon,
  entity_1_icon_color: e.entity_1_icon_color ?? e.icon_color,
  entity_1_trend_color: ot(e.entity_1_trend_color, e.trend_color, 1),
  entity_2: ne(e.entity_2),
  entity_2_name: ne(e.entity_2_name),
  entity_2_enabled: e.entity_2_enabled ?? !1,
  entity_2_show_icon: e.entity_2_show_icon ?? !0,
  entity_2_icon: e.entity_2_icon,
  entity_2_trend_color: ot(e.entity_2_trend_color, void 0, 2),
  entity_3: ne(e.entity_3),
  entity_3_name: ne(e.entity_3_name),
  entity_3_enabled: e.entity_3_enabled ?? !1,
  entity_3_show_icon: e.entity_3_show_icon ?? !0,
  entity_3_icon: e.entity_3_icon,
  entity_3_trend_color: ot(e.entity_3_trend_color, void 0, 3),
  entity_4: ne(e.entity_4),
  entity_4_name: ne(e.entity_4_name),
  entity_4_enabled: e.entity_4_enabled ?? !1,
  entity_4_show_icon: e.entity_4_show_icon ?? !0,
  entity_4_icon: e.entity_4_icon,
  entity_4_trend_color: ot(e.entity_4_trend_color, void 0, 4)
}), js = {
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
}, An = (e, t = {}, i = "en") => {
  const r = e.name ?? "", n = r.match(/^entity_(\d+)_(enabled|name|show_icon|icon|icon_color|trend_color)$/);
  if (n) {
    const [, , a] = n;
    return {
      enabled: i === "de" ? "Aktiviert" : "Enabled",
      name: "Name",
      show_icon: i === "de" ? "Symbol anzeigen" : "Show icon",
      icon: i === "de" ? "Symbol" : "Icon",
      icon_color: i === "de" ? "Symbolfarbe" : "Icon color",
      trend_color: i === "de" ? "Graph-Farbe" : "Graph color"
    }[a] ?? a;
  }
  if (r.match(/^entity_(\d+)$/))
    return "Sensor";
  if (t[r]) return t[r];
  const s = js[r];
  return s ? p(i, s) : Us[r] ?? r;
};
var Gs = Object.defineProperty, Ks = Object.getOwnPropertyDescriptor, Ai = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Ks(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Gs(t, i, n), n;
};
const qs = Cn(!1);
let mt = class extends H {
  constructor() {
    super(...arguments), this.computeLabel = (e) => An(e, {}, R(this.hass)), this.valueChanged = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement) || t.tagName !== "HA-FORM")
        return;
      const i = e.detail.value;
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
  setConfig(e) {
    const t = {
      ...e,
      type: "custom:power-pilz-graph-card",
      legend_layout: Tn(e.legend_layout),
      timeframe_hours: $n(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      decimals: e.decimals ?? 1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: e.decimals_base_unit ?? e.decimals ?? 1,
      decimals_prefixed_unit: e.decimals_prefixed_unit ?? e.decimals ?? 1,
      line_thickness: zn(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...Mn(e)
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? $ : E`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ue}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${qs}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Ai([
  A({ attribute: !1 })
], mt.prototype, "hass", 2);
Ai([
  k()
], mt.prototype, "_config", 2);
mt = Ai([
  ie("power-pilz-graph-card-editor")
], mt);
var Ys = Object.defineProperty, Zs = Object.getOwnPropertyDescriptor, me = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Zs(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Ys(t, i, n), n;
};
const Ne = 1, Nr = 24, Br = 300 * 1e3, Xs = 60 * 1e3, Js = 350, st = 0.01, Be = 4, Qs = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", ea = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), Fr = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let ee = class extends H {
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
      const i = t.getBoundingClientRect();
      if (i.width <= 1 || i.height <= 1) {
        this.clearHoverState();
        return;
      }
      const r = e.clientX - i.left, n = e.clientY - i.top;
      if (r < 0 || r > i.width || n < 0 || n > i.height) {
        this.clearHoverState();
        return;
      }
      const o = this.findNearestHoverPoint(r, n);
      if (!o) {
        this.clearHoverState();
        return;
      }
      const s = this._hoverState;
      s && s.slot === o.slot && Math.abs(s.x - o.x) <= 0.2 && Math.abs(s.y - o.y) <= 0.2 && Math.abs(s.value - o.value) <= 1e-4 && s.color === o.color || (this._hoverState = o);
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
    const t = (e == null ? void 0 : e.states) ?? {}, i = Object.keys(t), r = (...c) => c.find((d) => d in t), n = (c) => i.find((d) => d.startsWith(`${c}.`)), o = r("sensor.dev_home_power", "sensor.home_power") ?? n("sensor") ?? "sensor.dev_home_power", s = r("sensor.dev_solar_power", "sensor.solar_power"), a = r("sensor.dev_grid_power", "sensor.grid_power"), l = r("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-card",
      legend_layout: "row",
      timeframe_hours: Nr,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      auto_scale_units: !1,
      entity_1: o,
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
      decimals: Ne,
      decimals_base_unit: Ne,
      decimals_prefixed_unit: Ne
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Ne, i = he(e.decimals_base_unit, t), r = he(e.decimals_prefixed_unit, t), n = this.readConfigString(e.entity), o = this.readConfigString(e.icon), s = this.readConfigString(e.entity_1) ?? n ?? "sensor.dev_home_power";
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
      trend_data_source: j(e.trend_data_source, "hybrid"),
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: i,
      decimals_prefixed_unit: r,
      entity_1: s,
      entity_1_name: this.readConfigString(e.entity_1_name),
      entity_1_enabled: e.entity_1_enabled ?? !0,
      entity_1_show_icon: e.entity_1_show_icon ?? !0,
      entity_1_icon: e.entity_1_icon ?? o ?? "mdi:chart-line",
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
    const e = this._config, t = e.decimals ?? Ne, i = this.normalizeLineThickness(e.line_thickness), r = this.collectSeriesEntries(e, t), n = this.normalizeLegendLayout(e.legend_layout), o = e.hover_enabled !== !1, s = this.hasConfiguredAction(e), a = !this.isEditorPreview() && s, l = this._hoverState, c = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, d = c > 0 ? { top: `${c}px` } : {}, h = l ? {
      left: `${l.x}px`,
      top: `${l.y + c}px`,
      "--hover-dot-color": l.color
    } : {};
    return this._drawConfigs = r.map((_) => ({
      slot: _.slot,
      currentValue: _.currentValue,
      unit: _.unit,
      color: _.trendColor,
      lineWidth: i
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
          ${o && l ? E`<div class="hover-dot" aria-hidden="true" style=${M(h)}></div>` : $}

          <div class="content">
            <div class="series-list layout-${n}">
              ${r.length === 0 ? E`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : r.map(
      (_) => this.renderSeriesItem(
        _,
        l && l.slot === _.slot ? l : null
      )
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderSeriesItem(e, t) {
    const i = t === null ? null : this.convertSharedScaleHoverValue(e.slot, t.value), r = t === null ? null : this.formatHoverTimestamp(t.ts), n = i === null ? e.secondary : `${this.formatValue(i, e.unit, e.decimals)} - ${r ?? ""}`;
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
          <div class="secondary">${n}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(e, t) {
    const i = [];
    for (let r = 1; r <= Be; r += 1) {
      const n = r, o = this.slotEnabled(n, e), s = this.slotEntityId(n, e);
      if (!o || !s)
        continue;
      const a = this.entityName(this.slotCustomName(n, e), s, r), l = W(this.hass, s), c = e.unit ?? U(this.hass, s) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(n, e), _ = this.iconStyle(this.slotIconColor(n, e)), u = this.resolveColor(Fr[n], Qs), m = this.resolveColor(this.slotTrendColor(n, e), u);
      i.push({
        slot: n,
        entityId: s,
        name: a,
        secondary: d,
        unit: c,
        decimals: t,
        currentValue: l,
        icon: h,
        showIcon: this.slotShowIcon(n, e),
        iconStyle: _,
        trendColor: m
      });
    }
    return i;
  }
  slotEntityId(e, t) {
    return _n(e, t);
  }
  slotCustomName(e, t) {
    return pn(e, t);
  }
  slotEnabled(e, t) {
    return fn(e, t);
  }
  slotShowIcon(e, t) {
    return yn(e, t);
  }
  slotIcon(e, t) {
    return gn(e, t);
  }
  slotIconColor(e, t) {
    return bn(e, t);
  }
  slotTrendColor(e, t) {
    return vn(e, t);
  }
  entityName(e, t, i) {
    return xn(this.hass.states, e, t, i);
  }
  formatValue(e, t, i) {
    var r, n, o;
    return Sn(e, t, i, {
      enabled: ((r = this._config) == null ? void 0 : r.auto_scale_units) === !0,
      baseDecimals: ((n = this._config) == null ? void 0 : n.decimals_base_unit) ?? i,
      prefixedDecimals: ((o = this._config) == null ? void 0 : o.decimals_prefixed_unit) ?? i
    });
  }
  formatHoverTimestamp(e) {
    const t = new Date(e), i = "de-AT", r = new Intl.DateTimeFormat(i, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    }).format(t);
    if (this.trendWindowMs(this._config) <= 1440 * 60 * 1e3)
      return r;
    const n = new Intl.DateTimeFormat(i, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(t);
    return `${r} ${n}`;
  }
  convertSharedScaleHoverValue(e, t) {
    if (!this._sharedScaleCanonical)
      return t;
    const i = this._sharedScaleFactors[e];
    return typeof i != "number" || !Number.isFinite(i) || i <= 0 ? t : t / i;
  }
  readConfigString(e) {
    return Q(e);
  }
  normalizeLegendLayout(e) {
    return wn(e);
  }
  normalizeTimeframeHours(e) {
    return zi(e, Nr);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return Mi(e);
  }
  normalizeTrendColor(e, t, i) {
    const r = e ?? t;
    return Array.isArray(r) || typeof r == "string" && r.trim().length > 0 ? r : Fr[i];
  }
  iconStyle(e) {
    return Oe(e);
  }
  resolveColor(e, t = "") {
    return Si(e, t);
  }
  trendPoints(e, t) {
    const i = Date.now(), r = i - this.trendWindowMs(this._config), n = this._trendSeries[e] ?? [];
    let o = 0;
    for (; o < n.length && n[o].ts < r; )
      o += 1;
    const s = o > 0 ? n.slice(o) : [...n];
    return t !== null && Number.isFinite(t) && s.push({ ts: i, value: t }), s;
  }
  toTrendCoordinates(e, t, i) {
    var b, x;
    const n = Date.now() - t, o = 0, s = 100, a = e.map((S) => S.value), l = (i == null ? void 0 : i.min) ?? Math.min(...a), c = (i == null ? void 0 : i.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, _ = Math.max(c - l, st), u = e.map((S) => {
      const C = Math.max(0, Math.min(100, (S.ts - n) / t * 100)), g = o + C / 100 * (s - o), v = _ <= st ? 0.5 : (S.value - l) / _, T = h - v * (h - d);
      return { x: g, y: T, value: S.value, ts: S.ts };
    }), m = ((b = u[0]) == null ? void 0 : b.x) ?? o, w = ((x = u[u.length - 1]) == null ? void 0 : x.x) ?? s, f = Math.max(0, w - m), y = 18;
    if (u.length >= 2 && f < y) {
      const S = s - y, C = Math.max(o, Math.min(S, w - y));
      if (f <= st) {
        const v = y / (u.length - 1);
        return u.map((T, z) => ({
          ...T,
          x: Math.max(o, Math.min(s, C + v * z))
        }));
      }
      const g = y / f;
      return u.map((v) => ({
        ...v,
        x: Math.max(o, Math.min(s, C + (v.x - m) * g))
      }));
    }
    return u;
  }
  toCanvasPoints(e, t, i) {
    return Ei(e, t, i).map((r) => ({
      x: r.x,
      y: r.y,
      value: r.value,
      ts: r.ts
    }));
  }
  computeTrendValueRange(e, t) {
    const i = [];
    if (Object.entries(e).forEach(([o, s]) => {
      const a = Number(o), l = (t == null ? void 0 : t[a]) ?? 1;
      s.forEach((c) => i.push(c.value * l));
    }), i.length === 0)
      return null;
    const r = Math.min(...i), n = Math.max(...i);
    return !Number.isFinite(r) || !Number.isFinite(n) ? null : { min: r, max: n };
  }
  resolveSharedScaleFactors(e) {
    let t = null;
    const i = {};
    Object.keys(e).map((o) => Number(o)).filter((o) => Number.isFinite(o) && o >= 1 && o <= Be).forEach((o) => {
      const s = o, a = this._drawConfigs.find((c) => c.slot === s);
      if (!a)
        return;
      const l = oe(a.unit);
      if (!l) {
        t = null, i[s] = NaN;
        return;
      }
      if (t === null)
        t = l.family;
      else if (t !== l.family) {
        t = null, i[s] = NaN;
        return;
      }
      i[s] = l.factor;
    });
    const r = Object.keys(e);
    if (r.length === 0)
      return null;
    const n = Object.values(i).some((o) => !Number.isFinite(o ?? NaN));
    return t === null || n || Object.keys(i).length !== r.length ? null : i;
  }
  scaleTrendSeries(e, t) {
    return !Number.isFinite(t) || t === 1 ? e : e.map((i) => ({
      ts: i.ts,
      value: i.value * t
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
    var w, f;
    const e = this.perfNow();
    if (this._drawConfigs.length === 0) {
      this._linePointsBySlot = {}, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "no-draw-configs" });
      return;
    }
    const t = this.renderRoot.querySelector(".card-trend-canvas-area"), i = this.renderRoot.querySelector(".card-trend-canvas-line");
    if (!t || !i) {
      this._linePointsBySlot = {}, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "missing-canvas" });
      return;
    }
    const r = this.prepareTrendCanvas(t), n = this.prepareTrendCanvas(i);
    if (!r || !n) {
      this._linePointsBySlot = {}, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const o = ((w = this._config) == null ? void 0 : w.fill_area_enabled) !== !1, s = this.trendWindowMs(this._config), a = {};
    this._drawConfigs.forEach((y) => {
      const b = this.trendPoints(y.slot, y.currentValue);
      b.length >= 2 && (a[y.slot] = b);
    });
    const l = ((f = this._config) == null ? void 0 : f.shared_trend_scale) === !0, c = l ? this.resolveSharedScaleFactors(a) : null;
    this._sharedScaleCanonical = c !== null, this._sharedScaleFactors = c ?? {};
    const d = l ? this.computeTrendValueRange(a, c ?? void 0) : null, h = {};
    let _ = 0, u = 0;
    [...this._drawConfigs].sort((y, b) => b.slot - y.slot).forEach((y) => {
      const b = a[y.slot];
      if (!b || b.length < 2)
        return;
      const x = (c == null ? void 0 : c[y.slot]) ?? 1, S = c ? this.scaleTrendSeries(b, x) : b, C = this.toTrendCoordinates(S, s, d);
      if (C.length < 2)
        return;
      const g = this.toCanvasPoints(C, r.width, r.height), v = this.toCanvasPoints(C, n.width, n.height);
      o && this.drawTrendArea(r.ctx, g, y.color, r.height), this.drawTrendLine(n.ctx, v, y.color, y.lineWidth), h[y.slot] = v, _ += 1, u += v.length;
    }), this._linePointsBySlot = h, this._hoverState && !h[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: _,
      points: u,
      fill_area: o,
      shared_scale: l,
      shared_scale_units: this._sharedScaleCanonical ? "canonical" : "raw"
    });
  }
  prepareTrendCanvas(e) {
    const t = e.getContext("2d");
    if (!t)
      return null;
    const i = e.getBoundingClientRect(), r = Math.max(1, Math.round(i.width)), n = Math.max(1, Math.round(i.height)), o = Math.max(1, window.devicePixelRatio || 1), s = Math.max(1, Math.round(r * o)), a = Math.max(1, Math.round(n * o));
    return (e.width !== s || e.height !== a) && (e.width = s, e.height = a), t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height), t.setTransform(o, 0, 0, o, 0, 0), { ctx: t, width: r, height: n };
  }
  drawTrendArea(e, t, i, r) {
    if (t.length < 2)
      return;
    const n = this.resolveCanvasColor(i), o = t[0], s = t[t.length - 1], a = Math.min(...t.map((c) => c.y)), l = e.createLinearGradient(0, a, 0, r);
    l.addColorStop(0, this.withAlpha(n, 0.24)), l.addColorStop(1, this.withAlpha(n, 0)), e.beginPath(), e.moveTo(o.x, o.y), t.slice(1).forEach((c) => e.lineTo(c.x, c.y)), e.lineTo(s.x, r), e.lineTo(o.x, r), e.closePath(), e.fillStyle = l, e.fill();
  }
  drawTrendLine(e, t, i, r) {
    if (t.length < 2)
      return;
    const n = this.resolveCanvasColor(i);
    this.strokeTrendPolyline(e, t, n, r);
  }
  hasConfiguredAction(e) {
    return [e.tap_action, e.hold_action, e.double_tap_action].some(
      (t) => t && t.action && t.action !== "none"
    );
  }
  fireAction(e) {
    if (this.isEditorPreview() || !this._config)
      return;
    const t = `${e}_action`, i = this._config[t];
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
    let i = null, r = Number.POSITIVE_INFINITY;
    for (const n of this._drawConfigs) {
      const o = this._linePointsBySlot[n.slot];
      if (!o || o.length < 2)
        continue;
      const s = this.interpolateCanvasPoint(o, e);
      if (!s)
        continue;
      const a = Math.abs(s.y - t);
      a < r && (r = a, i = {
        slot: n.slot,
        x: s.x,
        y: s.y,
        value: s.value,
        ts: s.ts,
        color: n.color
      });
    }
    return i;
  }
  interpolateCanvasPoint(e, t) {
    if (e.length === 0)
      return null;
    const i = e[0], r = e[e.length - 1];
    if (t <= i.x)
      return { x: t, y: i.y, value: i.value, ts: i.ts };
    if (t >= r.x)
      return { x: t, y: r.y, value: r.value, ts: r.ts };
    for (let n = 1; n < e.length; n += 1) {
      const o = e[n - 1], s = e[n];
      if (t > s.x)
        continue;
      const a = s.x - o.x;
      if (Math.abs(a) <= st)
        return { x: t, y: s.y, value: s.value, ts: s.ts };
      const l = (t - o.x) / a;
      return {
        x: t,
        y: o.y + (s.y - o.y) * l,
        value: o.value + (s.value - o.value) * l,
        ts: o.ts + (s.ts - o.ts) * l
      };
    }
    return { x: t, y: r.y, value: r.value, ts: r.ts };
  }
  strokeTrendPolyline(e, t, i, r) {
    t.length < 2 || (e.beginPath(), e.moveTo(t[0].x, t[0].y), t.slice(1).forEach((n) => e.lineTo(n.x, n.y)), e.strokeStyle = i, e.lineWidth = r, e.lineCap = "round", e.lineJoin = "round", e.stroke());
  }
  resolveCanvasColor(e) {
    const t = document.createElement("span");
    t.style.position = "absolute", t.style.opacity = "0", t.style.pointerEvents = "none", t.style.color = e, this.renderRoot.appendChild(t);
    const i = getComputedStyle(t).color;
    return t.remove(), i || "rgb(158, 158, 158)";
  }
  withAlpha(e, t) {
    const i = this.parseColorChannels(e);
    if (!i)
      return e;
    const r = Math.max(0, Math.min(1, t));
    return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${r})`;
  }
  parseColorChannels(e) {
    const t = e.trim(), i = t.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
    if (i) {
      const l = i.slice(1, 4).map((c) => Math.max(0, Math.min(255, Math.round(Number(c)))));
      if (l.every((c) => Number.isFinite(c)))
        return [l[0], l[1], l[2]];
    }
    this._canvasColorContext || (this._canvasColorContext = document.createElement("canvas").getContext("2d"));
    const r = this._canvasColorContext;
    if (!r)
      return null;
    r.fillStyle = "#000000", r.fillStyle = t;
    const n = r.fillStyle, s = (typeof n == "string" ? n.trim() : "").match(/^#([a-f\d]{6})$/i);
    if (!s)
      return null;
    const a = s[1];
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
    var r, n;
    const e = this.renderRoot.querySelector("ha-card");
    if (!e || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const t = !!((r = this._config.hold_action) != null && r.action && this._config.hold_action.action !== "none"), i = !!((n = this._config.double_tap_action) != null && n.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = Ti(
      e,
      {
        onTap: () => this.fireAction("tap"),
        onHold: () => this.fireAction("hold"),
        onDoubleTap: () => this.fireAction("double_tap")
      },
      { hasHold: t, hasDoubleTap: i }
    );
  }
  updated(e) {
    var s;
    e.has("_config") && this.setupActionHandler();
    const t = e.get("_config"), i = e.has("_config") && this.shouldRefreshTrendOnConfigChange(t, this._config), r = e.get("hass"), n = e.has("hass") && this.didTrackedEntityStateChange(r);
    (e.has("preview") || e.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (e.has("_config") ? (i && this.scheduleConfigRefresh(), this.clearHoverState()) : e.has("hass") && this._isVisible && n && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (e.has("_config") ? (i && this.scheduleConfigRefresh(!0), this.clearHoverState()) : e.has("hass") && n && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((s = this._config) == null ? void 0 : s.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset();
    const o = e.has("_config") || e.has("_trendSeries") || e.has("_graphTopInset") || e.has("preview") || e.has("editMode") || n;
    (!this.shouldRunLiveRuntime() || this._isVisible) && o && this.scheduleTrendCanvasDraw();
  }
  updateGraphTopInset() {
    const e = this._config;
    if (!e || e.clip_graph_to_labels !== !0) {
      this._graphTopInset !== 0 && (this._graphTopInset = 0);
      return;
    }
    const t = this.renderRoot.querySelector(".container"), i = this.renderRoot.querySelector(".series-list");
    if (!t || !i) {
      this._graphTopInset !== 0 && (this._graphTopInset = 0);
      return;
    }
    const r = t.getBoundingClientRect(), n = i.getBoundingClientRect(), o = Math.max(0, Math.ceil(n.bottom - r.top));
    Math.abs(o - this._graphTopInset) > 0.5 && (this._graphTopInset = o);
  }
  maybeRefreshTrendHistory(e = !1, t = !1) {
    if (!this.shouldRunLiveRuntime() && !t || !this._isVisible && !t || t && !this.isEditorPreview())
      return;
    e && (this._lastTrendRefresh = 0);
    const i = Date.now();
    !e && i - this._lastTrendRefresh < Br || (this._lastTrendRefresh = i, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(ea) || this.hasEditorLikeAncestor();
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
        const i = e.className;
        if (typeof i == "string") {
          const r = i.toLowerCase();
          if (r.includes("preview") || r.includes("editor") || r.includes("card-picker"))
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
    var i;
    if (((i = this._config) == null ? void 0 : i.debug_performance) === !0) {
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
      const t = e.some((i) => i.isIntersecting && i.intersectionRatio > 0);
      t !== this._isVisible && (this._isVisible = t, this.shouldRunLiveRuntime() && (t ? (this.startLiveRuntime(!0), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw()) : (this.clearHoverState(), this.stopLiveRuntime())));
    }, { threshold: [0, 0.01] }), this._visibilityObserver.observe(this));
  }
  teardownVisibilityObserver() {
    this._visibilityObserver && (this._visibilityObserver.disconnect(), this._visibilityObserver = void 0), this._isVisible = typeof IntersectionObserver > "u";
  }
  scheduleConfigRefresh(e = !1) {
    !this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview() || (this._configRefreshTimer !== void 0 && window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = window.setTimeout(() => {
      this._configRefreshTimer = void 0, this.maybeRefreshTrendHistory(!0, e);
    }, Js));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Br), this.updateComplete.then(() => {
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
    const i = this._config, r = {}, n = this.trendWindowMs(i), o = j(i.trend_data_source, "hybrid"), s = this.enabledSlots(i);
    if (s.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const l = this.perfNow(), c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
      let _ = Number.POSITIVE_INFINITY;
      const u = Date.now() - n;
      for (const x of s) {
        const S = this.slotEntityId(x, i);
        if (!S)
          continue;
        c.set(x, S);
        const C = this._trendSeries[x] ?? [];
        if (e || C.length === 0 || d.has(S)) {
          d.add(S), h.delete(S);
          continue;
        }
        if (d.has(S))
          continue;
        h.add(S);
        const g = ((a = C[C.length - 1]) == null ? void 0 : a.ts) ?? u, v = Math.max(u, g - Xs);
        _ = Math.min(_, v);
      }
      let m = 0;
      const w = d.size > 0 ? await (async () => {
        const x = this.perfNow(), S = await Re(
          this.hass,
          Array.from(d),
          n,
          { dataSource: o }
        );
        return m = this.perfNow() - x, S;
      })() : {};
      let f = 0;
      const y = h.size > 0 ? await (async () => {
        const x = this.perfNow(), S = await Re(
          this.hass,
          Array.from(h),
          n,
          {
            startMs: Number.isFinite(_) ? _ : u,
            dataSource: o
          }
        );
        return f = this.perfNow() - x, S;
      })() : {};
      c.forEach((x, S) => {
        const C = this._trendSeries[S] ?? [];
        if (d.has(x)) {
          const g = w[x] ?? [];
          r[S] = g.length > 0 ? g : C.filter((v) => v.ts >= u);
          return;
        }
        if (h.has(x)) {
          const g = y[x] ?? [];
          r[S] = ht(C, g, u);
          return;
        }
        r[S] = C.filter((g) => g.ts >= u);
      });
      const b = this.sameTrendSeriesKeys(r, this._trendSeries) && Object.keys(r).map((x) => Number(x)).filter((x) => Number.isFinite(x) && x >= 1 && x <= Be).every((x) => {
        const S = x;
        return this.areTrendSeriesEqual(r[S] ?? [], this._trendSeries[S] ?? []);
      });
      b || (this._trendSeries = r), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - l),
        window_ms: n,
        force_full: e,
        slots: s.length,
        full_entities: d.size,
        incremental_entities: h.size,
        data_source: o,
        full_fetch_ms: this.toPerfMs(m),
        incremental_fetch_ms: this.toPerfMs(f),
        series_changed: !b
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let i = 1; i <= Be; i += 1) {
      const r = i;
      this.slotEnabled(r, e) && this.slotEntityId(r, e) && t.push(r);
    }
    return t;
  }
  trackedEntityIds(e) {
    const t = /* @__PURE__ */ new Set();
    return this.enabledSlots(e).forEach((i) => {
      const r = this.slotEntityId(i, e);
      r && t.add(r);
    }), Array.from(t);
  }
  didTrackedEntityStateChange(e) {
    if (!this._config || !this.hass || !e)
      return !0;
    const t = this.trackedEntityIds(this._config);
    return t.length === 0 ? !1 : t.some((i) => e.states[i] !== this.hass.states[i]);
  }
  shouldRefreshTrendOnConfigChange(e, t) {
    if (!e || !t || this.trendWindowMs(e) !== this.trendWindowMs(t) || j(e.trend_data_source, "hybrid") !== j(t.trend_data_source, "hybrid"))
      return !0;
    for (let i = 1; i <= Be; i += 1) {
      const r = i, n = this.slotEnabled(r, e), o = this.slotEnabled(r, t), s = n ? this.slotEntityId(r, e) : void 0, a = o ? this.slotEntityId(r, t) : void 0;
      if (n !== o || s !== a)
        return !0;
    }
    return !1;
  }
  sameTrendSeriesKeys(e, t) {
    const i = Object.keys(e).sort(), r = Object.keys(t).sort();
    return i.length === r.length && i.every((n, o) => n === r[o]);
  }
  areTrendSeriesEqual(e, t) {
    if (e.length !== t.length)
      return !1;
    for (let i = 0; i < e.length; i += 1) {
      const r = e[i], n = t[i];
      if (r.ts !== n.ts || Math.abs(r.value - n.value) > 1e-4)
        return !1;
    }
    return !0;
  }
};
ee.styles = xe`
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
me([
  A({ attribute: !1 })
], ee.prototype, "hass", 2);
me([
  A({ type: Boolean })
], ee.prototype, "preview", 2);
me([
  A({ type: Boolean })
], ee.prototype, "editMode", 2);
me([
  k()
], ee.prototype, "_config", 2);
me([
  k()
], ee.prototype, "_trendSeries", 2);
me([
  k()
], ee.prototype, "_graphTopInset", 2);
me([
  k()
], ee.prototype, "_hoverState", 2);
ee = me([
  ie("power-pilz-graph-card")
], ee);
var ta = Object.defineProperty, ia = Object.getOwnPropertyDescriptor, ki = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? ia(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && ta(t, i, n), n;
};
let _t = class extends H {
  constructor() {
    super(...arguments), this.computeLabel = (e) => An(e, {}, R(this.hass)), this.valueChanged = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement) || t.tagName !== "HA-FORM")
        return;
      const i = e.detail.value;
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
  setConfig(e) {
    const t = {
      ...e,
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: Tn(e.legend_layout),
      timeframe_hours: $n(e.timeframe_hours),
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
      line_thickness: zn(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...Mn(e)
    };
    this._config = t;
  }
  render() {
    if (!this.hass || !this._config)
      return $;
    const e = this._config.normalize_stack_to_percent ?? !1, t = Cn(!0, e);
    return E`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ue}
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
ki([
  A({ attribute: !1 })
], _t.prototype, "hass", 2);
ki([
  k()
], _t.prototype, "_config", 2);
_t = ki([
  ie("power-pilz-graph-stack-card-editor")
], _t);
var ra = Object.defineProperty, na = Object.getOwnPropertyDescriptor, _e = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? na(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && ra(t, i, n), n;
};
const Fe = 1, Vr = 24, Ur = 300 * 1e3, oa = 60 * 1e3, sa = 350, ye = 0.01, Ae = 4, aa = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", la = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), Wr = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let te = class extends H {
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
      const i = t.getBoundingClientRect();
      if (i.width <= 1 || i.height <= 1) {
        this.clearHoverState();
        return;
      }
      const r = e.clientX - i.left, n = e.clientY - i.top;
      if (r < 0 || r > i.width || n < 0 || n > i.height) {
        this.clearHoverState();
        return;
      }
      const o = this.findNearestHoverPoint(r, n);
      if (!o) {
        this.clearHoverState();
        return;
      }
      const s = this._hoverState;
      s && s.slot === o.slot && Math.abs(s.x - o.x) <= 0.2 && Math.abs(s.y - o.y) <= 0.2 && Math.abs(s.value - o.value) <= 1e-4 && s.color === o.color || (this._hoverState = o);
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
    const t = (e == null ? void 0 : e.states) ?? {}, i = Object.keys(t), r = (...c) => c.find((d) => d in t), n = (c) => i.find((d) => d.startsWith(`${c}.`)), o = r("sensor.dev_home_power", "sensor.home_power") ?? n("sensor") ?? "sensor.dev_home_power", s = r("sensor.dev_solar_power", "sensor.solar_power"), a = r("sensor.dev_grid_power", "sensor.grid_power"), l = r("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: "row",
      timeframe_hours: Vr,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
      trend_data_source: "hybrid",
      normalize_stack_to_percent: !1,
      auto_scale_units: !1,
      entity_1: o,
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
      decimals: Fe,
      decimals_base_unit: Fe,
      decimals_prefixed_unit: Fe
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Fe, i = he(e.decimals_base_unit, t), r = he(e.decimals_prefixed_unit, t), n = this.readConfigString(e.entity), o = this.readConfigString(e.icon), s = this.readConfigString(e.entity_1) ?? n ?? "sensor.dev_home_power";
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
      trend_data_source: j(e.trend_data_source, "hybrid"),
      normalize_stack_to_percent: e.normalize_stack_to_percent ?? !1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: i,
      decimals_prefixed_unit: r,
      entity_1: s,
      entity_1_name: this.readConfigString(e.entity_1_name),
      entity_1_enabled: e.entity_1_enabled ?? !0,
      entity_1_show_icon: e.entity_1_show_icon ?? !0,
      entity_1_icon: e.entity_1_icon ?? o ?? "mdi:chart-line",
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
    const e = this._config, t = e.decimals ?? Fe, i = this.normalizeLineThickness(e.line_thickness), r = e.normalize_stack_to_percent === !0, n = this.collectSeriesEntries(e, t), o = this.withStackedCurrentValues(n, r, e), s = this.normalizeLegendLayout(e.legend_layout), a = e.hover_enabled !== !1, l = this.hasConfiguredAction(e), c = !this.isEditorPreview() && l, d = this._hoverState, h = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, _ = h > 0 ? { top: `${h}px` } : {}, u = d ? {
      left: `${d.x}px`,
      top: `${d.y + h}px`,
      "--hover-dot-color": d.color
    } : {};
    return this._drawConfigs = n.map((m) => ({
      slot: m.slot,
      currentValue: m.currentValue,
      unit: m.unit,
      color: m.trendColor,
      lineWidth: i
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
          <div class="card-trend" style=${M(_)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${M(_)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${a && d ? E`<div class="hover-dot" aria-hidden="true" style=${M(u)}></div>` : $}

          <div class="content">
            <div class="series-list layout-${s}">
              ${n.length === 0 ? E`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph Stack card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : o.map(
      (m) => this.renderSeriesItem(
        m,
        d && d.slot === m.slot ? d : null
      )
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderSeriesItem(e, t) {
    const i = t === null ? null : this.convertStackedHoverValue(e.slot, t.value), r = t === null ? null : this.formatHoverTimestamp(t.ts), n = i === null ? e.secondary : `${this.formatValue(i, e.unit, e.decimals)} - ${r ?? ""}`;
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
          <div class="secondary">${n}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(e, t) {
    const i = [];
    for (let r = 1; r <= Ae; r += 1) {
      const n = r, o = this.slotEnabled(n, e), s = this.slotEntityId(n, e);
      if (!o || !s)
        continue;
      const a = this.entityName(this.slotCustomName(n, e), s, r), l = W(this.hass, s), c = e.unit ?? U(this.hass, s) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(n, e), _ = this.iconStyle(this.slotIconColor(n, e)), u = this.resolveColor(Wr[n], aa), m = this.resolveColor(this.slotTrendColor(n, e), u);
      i.push({
        slot: n,
        entityId: s,
        name: a,
        secondary: d,
        unit: c,
        decimals: t,
        currentValue: l,
        icon: h,
        showIcon: this.slotShowIcon(n, e),
        iconStyle: _,
        trendColor: m
      });
    }
    return i;
  }
  resolvePercentReference(e, t) {
    const i = t.percent_reference_slot, r = typeof i == "number" ? i : typeof i == "string" && i.length > 0 ? Number(i) : NaN, n = Number.isFinite(r) && r >= 1 && r <= Ae ? r : void 0;
    return { refSlot: n !== void 0 && e.some((s) => s.slot === n) ? n : void 0, auto: t.percent_reference_auto === !0 };
  }
  withStackedCurrentValues(e, t, i) {
    var u;
    const r = this.resolveStackUnitFactors(e), { refSlot: n, auto: o } = t ? this.resolvePercentReference(e, i) : { refSlot: void 0, auto: !1 }, s = (m) => m.currentValue === null || !Number.isFinite(m.currentValue) ? 0 : r ? m.currentValue * (r[m.slot] ?? 1) : m.currentValue;
    let a, l;
    if (t && n !== void 0 && !o) {
      const m = e.find((w) => w.slot === n);
      a = m ? s(m) : 0, l = n;
    } else t && o ? (a = e.reduce((m, w) => w.slot !== n ? m + s(w) : m, 0), l = n) : (a = e.reduce((m, w) => m + s(w), 0), l = (u = e[e.length - 1]) == null ? void 0 : u.slot);
    const c = Number.isFinite(a) && Math.abs(a) > ye;
    let d = 0, h = 0, _ = !1;
    return e.map((m) => {
      const w = n !== void 0 && m.slot === n && !o;
      m.currentValue !== null && Number.isFinite(m.currentValue) && (w || (d += m.currentValue, r && (h += m.currentValue * (r[m.slot] ?? 1))), _ = !0);
      let f;
      if (!_)
        f = null;
      else if (t)
        if (!c)
          f = 0;
        else if (w)
          f = 100;
        else if (n !== void 0 || o) {
          const b = s(m);
          f = Math.max(0, Math.min(100, b / a * 100));
        } else {
          const b = r ? h : d;
          f = m.slot === l ? 100 : Math.max(0, Math.min(100, b / a * 100));
        }
      else
        f = r ? h / (r[m.slot] ?? 1) : d;
      const y = t ? "%" : m.unit;
      return {
        ...m,
        unit: y,
        secondary: this.formatValue(f, y, m.decimals)
      };
    });
  }
  slotEntityId(e, t) {
    return _n(e, t);
  }
  slotCustomName(e, t) {
    return pn(e, t);
  }
  slotEnabled(e, t) {
    return fn(e, t);
  }
  slotShowIcon(e, t) {
    return yn(e, t);
  }
  slotIcon(e, t) {
    return gn(e, t);
  }
  slotIconColor(e, t) {
    return bn(e, t);
  }
  slotTrendColor(e, t) {
    return vn(e, t);
  }
  entityName(e, t, i) {
    return xn(this.hass.states, e, t, i);
  }
  formatValue(e, t, i) {
    var r, n, o;
    return Sn(e, t, i, {
      enabled: ((r = this._config) == null ? void 0 : r.auto_scale_units) === !0,
      baseDecimals: ((n = this._config) == null ? void 0 : n.decimals_base_unit) ?? i,
      prefixedDecimals: ((o = this._config) == null ? void 0 : o.decimals_prefixed_unit) ?? i
    });
  }
  formatHoverTimestamp(e) {
    const t = new Date(e), i = "de-AT", r = new Intl.DateTimeFormat(i, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    }).format(t);
    if (this.trendWindowMs(this._config) <= 1440 * 60 * 1e3)
      return r;
    const n = new Intl.DateTimeFormat(i, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(t);
    return `${r} ${n}`;
  }
  resolveStackUnitFactors(e) {
    if (e.length === 0)
      return null;
    let t = null;
    const i = {};
    for (const r of e) {
      const n = oe(r.unit);
      if (!n)
        return null;
      if (t === null)
        t = n.family;
      else if (t !== n.family)
        return null;
      i[r.slot] = n.factor;
    }
    return Object.keys(i).length === e.length ? i : null;
  }
  convertStackedHoverValue(e, t) {
    if (this._stackNormalizeToPercent)
      return Math.max(0, Math.min(100, t));
    if (!this._stackCanonicalMode)
      return t;
    const i = this._stackCanonicalFactors[e];
    return typeof i != "number" || !Number.isFinite(i) || i <= 0 ? t : t / i;
  }
  readConfigString(e) {
    return Q(e);
  }
  normalizeLegendLayout(e) {
    return wn(e);
  }
  normalizeTimeframeHours(e) {
    return zi(e, Vr);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return Mi(e);
  }
  normalizeTrendColor(e, t, i) {
    const r = e ?? t;
    return Array.isArray(r) || typeof r == "string" && r.trim().length > 0 ? r : Wr[i];
  }
  iconStyle(e) {
    return Oe(e);
  }
  resolveColor(e, t = "") {
    return Si(e, t);
  }
  trendPoints(e, t) {
    const i = Date.now(), r = i - this.trendWindowMs(this._config), n = this._trendSeries[e] ?? [];
    let o = 0;
    for (; o < n.length && n[o].ts < r; )
      o += 1;
    const s = o > 0 ? n.slice(o) : [...n];
    return t !== null && Number.isFinite(t) && s.push({ ts: i, value: t }), s;
  }
  toTrendCoordinates(e, t, i) {
    var b, x;
    const n = Date.now() - t, o = 0, s = 100, a = e.map((S) => S.value), l = (i == null ? void 0 : i.min) ?? Math.min(...a), c = (i == null ? void 0 : i.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, _ = Math.max(c - l, ye), u = e.map((S) => {
      const C = Math.max(0, Math.min(100, (S.ts - n) / t * 100)), g = o + C / 100 * (s - o), v = _ <= ye ? 0.5 : (S.value - l) / _, T = h - v * (h - d);
      return { x: g, y: T, value: S.value, ts: S.ts };
    }), m = ((b = u[0]) == null ? void 0 : b.x) ?? o, w = ((x = u[u.length - 1]) == null ? void 0 : x.x) ?? s, f = Math.max(0, w - m), y = 18;
    if (u.length >= 2 && f < y) {
      const S = s - y, C = Math.max(o, Math.min(S, w - y));
      if (f <= ye) {
        const v = y / (u.length - 1);
        return u.map((T, z) => ({
          ...T,
          x: Math.max(o, Math.min(s, C + v * z))
        }));
      }
      const g = y / f;
      return u.map((v) => ({
        ...v,
        x: Math.max(o, Math.min(s, C + (v.x - m) * g))
      }));
    }
    return u;
  }
  toCanvasPoints(e, t, i) {
    return Ei(e, t, i).map((r) => ({
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
    var b, x, S;
    const e = this.perfNow();
    if (this._drawConfigs.length === 0) {
      this._linePointsBySlot = {}, this._stackCanonicalMode = !1, this._stackCanonicalFactors = {}, this._stackNormalizeToPercent = !1, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "no-draw-configs" });
      return;
    }
    const t = this.renderRoot.querySelector(".card-trend-canvas-area"), i = this.renderRoot.querySelector(".card-trend-canvas-line");
    if (!t || !i) {
      this._linePointsBySlot = {}, this._stackCanonicalMode = !1, this._stackCanonicalFactors = {}, this._stackNormalizeToPercent = !1, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "missing-canvas" });
      return;
    }
    const r = this.prepareTrendCanvas(t), n = this.prepareTrendCanvas(i);
    if (!r || !n) {
      this._linePointsBySlot = {}, this._stackCanonicalMode = !1, this._stackCanonicalFactors = {}, this._stackNormalizeToPercent = !1, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const o = ((b = this._config) == null ? void 0 : b.fill_area_enabled) !== !1, s = ((x = this._config) == null ? void 0 : x.normalize_stack_to_percent) === !0, a = ((S = this._config) == null ? void 0 : S.shared_trend_scale) === !0, l = this.resolveStackUnitFactors(this._drawConfigs);
    this._stackCanonicalMode = l !== null, this._stackCanonicalFactors = l ?? {}, this._stackNormalizeToPercent = s;
    const c = this.trendWindowMs(this._config), d = {}, h = s ? this.resolvePercentReference(
      this._drawConfigs,
      this._config
    ) : { refSlot: void 0, auto: !1 }, _ = this.buildStackedTrendSeries(c, l ?? void 0, h.refSlot, h.auto), u = s ? this.normalizeStackedSeriesToPercent(_, h.refSlot, h.auto) : _, m = s ? { min: 0, max: 100 } : a ? this.computeStackedValueRange(u) : null;
    let w = 0, f = 0;
    [...this._drawConfigs].sort((C, g) => g.slot - C.slot).forEach((C) => {
      const g = u[C.slot] ?? [];
      if (g.length < 2)
        return;
      const v = this.toTrendCoordinates(g, c, m);
      if (v.length < 2)
        return;
      const T = this.toCanvasPoints(v, r.width, r.height), z = this.toCanvasPoints(v, n.width, n.height);
      o && this.drawTrendArea(r.ctx, T, C.color, r.height), this.drawTrendLine(n.ctx, z, C.color, C.lineWidth), d[C.slot] = z, w += 1, f += z.length;
    }), this._linePointsBySlot = d, this._hoverState && !d[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: w,
      points: f,
      fill_area: o,
      shared_scale: a,
      normalize_percent: s,
      stack_units: this._stackCanonicalMode ? "canonical" : "raw"
    });
  }
  buildStackedTrendSeries(e, t, i, r) {
    const n = {}, o = [...this._drawConfigs].sort((l, c) => l.slot - c.slot), s = i !== void 0 && !r;
    let a = null;
    return o.forEach((l) => {
      const c = this.trendPoints(l.slot, l.currentValue);
      if (c.length === 0)
        return;
      const d = this.normalizeTrendSeries(c, e);
      if (d.length === 0)
        return;
      const h = (t == null ? void 0 : t[l.slot]) ?? 1, _ = h === 1 ? d : d.map((m) => ({
        ts: m.ts,
        value: m.value * h
      }));
      if (s && l.slot === i) {
        n[l.slot] = _;
        return;
      }
      const u = a ? this.sumTrendSeries(a, _) : _;
      n[l.slot] = u, a = u;
    }), n;
  }
  normalizeTrendSeries(e, t) {
    const i = Date.now() - t, r = [...e].filter((o) => Number.isFinite(o.ts) && Number.isFinite(o.value) && o.ts >= i).sort((o, s) => o.ts - s.ts);
    if (r.length === 0)
      return [];
    const n = [];
    return r.forEach((o) => {
      const s = n[n.length - 1];
      s && Math.abs(s.ts - o.ts) <= 0.5 ? n[n.length - 1] = o : n.push(o);
    }), n;
  }
  sumTrendSeries(e, t) {
    return e.length === 0 ? [...t] : t.length === 0 ? [...e] : this.mergeTimestamps(e, t).map((r) => ({
      ts: r,
      value: this.interpolateTrendValue(e, r) + this.interpolateTrendValue(t, r)
    }));
  }
  mergeTimestamps(e, t) {
    const i = [];
    let r = 0, n = 0;
    const o = (s) => {
      const a = i[i.length - 1];
      (a === void 0 || Math.abs(a - s) > 0.5) && i.push(s);
    };
    for (; r < e.length || n < t.length; ) {
      const s = r < e.length ? e[r].ts : Number.POSITIVE_INFINITY, a = n < t.length ? t[n].ts : Number.POSITIVE_INFINITY;
      s <= a ? (o(s), r += 1, Math.abs(s - a) <= 0.5 && (n += 1)) : (o(a), n += 1);
    }
    return i;
  }
  interpolateTrendValue(e, t) {
    if (e.length === 0)
      return 0;
    if (t <= e[0].ts)
      return e[0].value;
    const i = e[e.length - 1];
    if (t >= i.ts)
      return i.value;
    let r = 0, n = e.length - 1;
    for (; r <= n; ) {
      const d = Math.floor((r + n) / 2), h = e[d];
      if (Math.abs(h.ts - t) <= 0.5)
        return h.value;
      h.ts < t ? r = d + 1 : n = d - 1;
    }
    const o = Math.max(1, Math.min(e.length - 1, r)), s = e[o - 1], a = e[o], l = a.ts - s.ts;
    if (Math.abs(l) <= ye)
      return a.value;
    const c = (t - s.ts) / l;
    return s.value + (a.value - s.value) * c;
  }
  computeStackedValueRange(e) {
    const t = [];
    if (Object.values(e).forEach((n) => {
      n.forEach((o) => t.push(o.value));
    }), t.length === 0)
      return null;
    const i = Math.min(...t), r = Math.max(...t);
    return !Number.isFinite(i) || !Number.isFinite(r) ? null : { min: i, max: r };
  }
  normalizeStackedSeriesToPercent(e, t, i) {
    const r = {}, n = Object.keys(e).map((a) => Number(a)).filter((a) => Number.isFinite(a) && a >= 1 && a <= Ae).sort((a, l) => a - l);
    if (n.length === 0)
      return r;
    let o, s;
    if (t !== void 0 && !i)
      o = e[t] ?? [], s = t;
    else if (i) {
      const a = t !== void 0 ? n.filter((l) => l !== t) : n;
      s = a[a.length - 1] ?? n[n.length - 1], o = e[s] ?? [];
    } else
      s = n[n.length - 1], o = e[s] ?? [];
    return o.length < 1 || n.forEach((a) => {
      const l = e[a] ?? [];
      l.length !== 0 && (r[a] = l.map((c) => {
        const d = this.interpolateTrendValue(o, c.ts);
        if (!Number.isFinite(d) || Math.abs(d) <= ye)
          return { ts: c.ts, value: 0 };
        if (a === s)
          return { ts: c.ts, value: 100 };
        if (t !== void 0 && a === t && !i)
          return { ts: c.ts, value: 100 };
        const h = c.value / d * 100;
        return {
          ts: c.ts,
          value: Math.max(0, h)
        };
      }));
    }), r;
  }
  prepareTrendCanvas(e) {
    const t = e.getContext("2d");
    if (!t)
      return null;
    const i = e.getBoundingClientRect(), r = Math.max(1, Math.round(i.width)), n = Math.max(1, Math.round(i.height)), o = Math.max(1, window.devicePixelRatio || 1), s = Math.max(1, Math.round(r * o)), a = Math.max(1, Math.round(n * o));
    return (e.width !== s || e.height !== a) && (e.width = s, e.height = a), t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height), t.setTransform(o, 0, 0, o, 0, 0), { ctx: t, width: r, height: n };
  }
  drawTrendArea(e, t, i, r) {
    if (t.length < 2)
      return;
    const n = this.resolveCanvasColor(i), o = t[0], s = t[t.length - 1], a = Math.min(...t.map((c) => c.y)), l = e.createLinearGradient(0, a, 0, r);
    l.addColorStop(0, this.withAlpha(n, 0.24)), l.addColorStop(1, this.withAlpha(n, 0)), e.beginPath(), e.moveTo(o.x, o.y), t.slice(1).forEach((c) => e.lineTo(c.x, c.y)), e.lineTo(s.x, r), e.lineTo(o.x, r), e.closePath(), e.fillStyle = l, e.fill();
  }
  drawTrendLine(e, t, i, r) {
    if (t.length < 2)
      return;
    const n = this.resolveCanvasColor(i);
    this.strokeTrendPolyline(e, t, n, r);
  }
  hasConfiguredAction(e) {
    return [e.tap_action, e.hold_action, e.double_tap_action].some(
      (t) => t && t.action && t.action !== "none"
    );
  }
  fireAction(e) {
    if (this.isEditorPreview() || !this._config)
      return;
    const t = `${e}_action`, i = this._config[t];
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
    let i = null, r = Number.POSITIVE_INFINITY;
    for (const n of this._drawConfigs) {
      const o = this._linePointsBySlot[n.slot];
      if (!o || o.length < 2)
        continue;
      const s = this.interpolateCanvasPoint(o, e);
      if (!s)
        continue;
      const a = Math.abs(s.y - t);
      a < r && (r = a, i = {
        slot: n.slot,
        x: s.x,
        y: s.y,
        value: s.value,
        ts: s.ts,
        color: n.color
      });
    }
    return i;
  }
  interpolateCanvasPoint(e, t) {
    if (e.length === 0)
      return null;
    const i = e[0], r = e[e.length - 1];
    if (t <= i.x)
      return { x: t, y: i.y, value: i.value, ts: i.ts };
    if (t >= r.x)
      return { x: t, y: r.y, value: r.value, ts: r.ts };
    for (let n = 1; n < e.length; n += 1) {
      const o = e[n - 1], s = e[n];
      if (t > s.x)
        continue;
      const a = s.x - o.x;
      if (Math.abs(a) <= ye)
        return { x: t, y: s.y, value: s.value, ts: s.ts };
      const l = (t - o.x) / a;
      return {
        x: t,
        y: o.y + (s.y - o.y) * l,
        value: o.value + (s.value - o.value) * l,
        ts: o.ts + (s.ts - o.ts) * l
      };
    }
    return { x: t, y: r.y, value: r.value, ts: r.ts };
  }
  strokeTrendPolyline(e, t, i, r) {
    t.length < 2 || (e.beginPath(), e.moveTo(t[0].x, t[0].y), t.slice(1).forEach((n) => e.lineTo(n.x, n.y)), e.strokeStyle = i, e.lineWidth = r, e.lineCap = "round", e.lineJoin = "round", e.stroke());
  }
  resolveCanvasColor(e) {
    const t = document.createElement("span");
    t.style.position = "absolute", t.style.opacity = "0", t.style.pointerEvents = "none", t.style.color = e, this.renderRoot.appendChild(t);
    const i = getComputedStyle(t).color;
    return t.remove(), i || "rgb(158, 158, 158)";
  }
  withAlpha(e, t) {
    const i = this.parseColorChannels(e);
    if (!i)
      return e;
    const r = Math.max(0, Math.min(1, t));
    return `rgba(${i[0]}, ${i[1]}, ${i[2]}, ${r})`;
  }
  parseColorChannels(e) {
    const t = e.trim(), i = t.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
    if (i) {
      const l = i.slice(1, 4).map((c) => Math.max(0, Math.min(255, Math.round(Number(c)))));
      if (l.every((c) => Number.isFinite(c)))
        return [l[0], l[1], l[2]];
    }
    this._canvasColorContext || (this._canvasColorContext = document.createElement("canvas").getContext("2d"));
    const r = this._canvasColorContext;
    if (!r)
      return null;
    r.fillStyle = "#000000", r.fillStyle = t;
    const n = r.fillStyle, s = (typeof n == "string" ? n.trim() : "").match(/^#([a-f\d]{6})$/i);
    if (!s)
      return null;
    const a = s[1];
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
    var r, n;
    const e = this.renderRoot.querySelector("ha-card");
    if (!e || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const t = !!((r = this._config.hold_action) != null && r.action && this._config.hold_action.action !== "none"), i = !!((n = this._config.double_tap_action) != null && n.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = Ti(
      e,
      {
        onTap: () => this.fireAction("tap"),
        onHold: () => this.fireAction("hold"),
        onDoubleTap: () => this.fireAction("double_tap")
      },
      { hasHold: t, hasDoubleTap: i }
    );
  }
  updated(e) {
    var s;
    e.has("_config") && this.setupActionHandler();
    const t = e.get("_config"), i = e.has("_config") && this.shouldRefreshTrendOnConfigChange(t, this._config), r = e.get("hass"), n = e.has("hass") && this.didTrackedEntityStateChange(r);
    (e.has("preview") || e.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (e.has("_config") ? (i && this.scheduleConfigRefresh(), this.clearHoverState()) : e.has("hass") && this._isVisible && n && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (e.has("_config") ? (i && this.scheduleConfigRefresh(!0), this.clearHoverState()) : e.has("hass") && n && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((s = this._config) == null ? void 0 : s.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset();
    const o = e.has("_config") || e.has("_trendSeries") || e.has("_graphTopInset") || e.has("preview") || e.has("editMode") || n;
    (!this.shouldRunLiveRuntime() || this._isVisible) && o && this.scheduleTrendCanvasDraw();
  }
  updateGraphTopInset() {
    const e = this._config;
    if (!e || e.clip_graph_to_labels !== !0) {
      this._graphTopInset !== 0 && (this._graphTopInset = 0);
      return;
    }
    const t = this.renderRoot.querySelector(".container"), i = this.renderRoot.querySelector(".series-list");
    if (!t || !i) {
      this._graphTopInset !== 0 && (this._graphTopInset = 0);
      return;
    }
    const r = t.getBoundingClientRect(), n = i.getBoundingClientRect(), o = Math.max(0, Math.ceil(n.bottom - r.top));
    Math.abs(o - this._graphTopInset) > 0.5 && (this._graphTopInset = o);
  }
  maybeRefreshTrendHistory(e = !1, t = !1) {
    if (!this.shouldRunLiveRuntime() && !t || !this._isVisible && !t || t && !this.isEditorPreview())
      return;
    e && (this._lastTrendRefresh = 0);
    const i = Date.now();
    !e && i - this._lastTrendRefresh < Ur || (this._lastTrendRefresh = i, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(la) || this.hasEditorLikeAncestor();
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
        const i = e.className;
        if (typeof i == "string") {
          const r = i.toLowerCase();
          if (r.includes("preview") || r.includes("editor") || r.includes("card-picker"))
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
    var i;
    if (((i = this._config) == null ? void 0 : i.debug_performance) === !0) {
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
      const t = e.some((i) => i.isIntersecting && i.intersectionRatio > 0);
      t !== this._isVisible && (this._isVisible = t, this.shouldRunLiveRuntime() && (t ? (this.startLiveRuntime(!0), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw()) : (this.clearHoverState(), this.stopLiveRuntime())));
    }, { threshold: [0, 0.01] }), this._visibilityObserver.observe(this));
  }
  teardownVisibilityObserver() {
    this._visibilityObserver && (this._visibilityObserver.disconnect(), this._visibilityObserver = void 0), this._isVisible = typeof IntersectionObserver > "u";
  }
  scheduleConfigRefresh(e = !1) {
    !this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview() || (this._configRefreshTimer !== void 0 && window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = window.setTimeout(() => {
      this._configRefreshTimer = void 0, this.maybeRefreshTrendHistory(!0, e);
    }, sa));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Ur), this.updateComplete.then(() => {
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
    const i = this._config, r = {}, n = this.trendWindowMs(i), o = j(i.trend_data_source, "hybrid"), s = this.enabledSlots(i);
    if (s.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const l = this.perfNow(), c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
      let _ = Number.POSITIVE_INFINITY;
      const u = Date.now() - n;
      for (const x of s) {
        const S = this.slotEntityId(x, i);
        if (!S)
          continue;
        c.set(x, S);
        const C = this._trendSeries[x] ?? [];
        if (e || C.length === 0 || d.has(S)) {
          d.add(S), h.delete(S);
          continue;
        }
        if (d.has(S))
          continue;
        h.add(S);
        const g = ((a = C[C.length - 1]) == null ? void 0 : a.ts) ?? u, v = Math.max(u, g - oa);
        _ = Math.min(_, v);
      }
      let m = 0;
      const w = d.size > 0 ? await (async () => {
        const x = this.perfNow(), S = await Re(
          this.hass,
          Array.from(d),
          n,
          { dataSource: o }
        );
        return m = this.perfNow() - x, S;
      })() : {};
      let f = 0;
      const y = h.size > 0 ? await (async () => {
        const x = this.perfNow(), S = await Re(
          this.hass,
          Array.from(h),
          n,
          {
            startMs: Number.isFinite(_) ? _ : u,
            dataSource: o
          }
        );
        return f = this.perfNow() - x, S;
      })() : {};
      c.forEach((x, S) => {
        const C = this._trendSeries[S] ?? [];
        if (d.has(x)) {
          const g = w[x] ?? [];
          r[S] = g.length > 0 ? g : C.filter((v) => v.ts >= u);
          return;
        }
        if (h.has(x)) {
          const g = y[x] ?? [];
          r[S] = ht(C, g, u);
          return;
        }
        r[S] = C.filter((g) => g.ts >= u);
      });
      const b = this.sameTrendSeriesKeys(r, this._trendSeries) && Object.keys(r).map((x) => Number(x)).filter((x) => Number.isFinite(x) && x >= 1 && x <= Ae).every((x) => {
        const S = x;
        return this.areTrendSeriesEqual(r[S] ?? [], this._trendSeries[S] ?? []);
      });
      b || (this._trendSeries = r), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - l),
        window_ms: n,
        force_full: e,
        slots: s.length,
        full_entities: d.size,
        incremental_entities: h.size,
        data_source: o,
        full_fetch_ms: this.toPerfMs(m),
        incremental_fetch_ms: this.toPerfMs(f),
        series_changed: !b
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let i = 1; i <= Ae; i += 1) {
      const r = i;
      this.slotEnabled(r, e) && this.slotEntityId(r, e) && t.push(r);
    }
    return t;
  }
  trackedEntityIds(e) {
    const t = /* @__PURE__ */ new Set();
    return this.enabledSlots(e).forEach((i) => {
      const r = this.slotEntityId(i, e);
      r && t.add(r);
    }), Array.from(t);
  }
  didTrackedEntityStateChange(e) {
    if (!this._config || !this.hass || !e)
      return !0;
    const t = this.trackedEntityIds(this._config);
    return t.length === 0 ? !1 : t.some((i) => e.states[i] !== this.hass.states[i]);
  }
  shouldRefreshTrendOnConfigChange(e, t) {
    if (!e || !t || this.trendWindowMs(e) !== this.trendWindowMs(t) || j(e.trend_data_source, "hybrid") !== j(t.trend_data_source, "hybrid"))
      return !0;
    for (let i = 1; i <= Ae; i += 1) {
      const r = i, n = this.slotEnabled(r, e), o = this.slotEnabled(r, t), s = n ? this.slotEntityId(r, e) : void 0, a = o ? this.slotEntityId(r, t) : void 0;
      if (n !== o || s !== a)
        return !0;
    }
    return !1;
  }
  sameTrendSeriesKeys(e, t) {
    const i = Object.keys(e).sort(), r = Object.keys(t).sort();
    return i.length === r.length && i.every((n, o) => n === r[o]);
  }
  areTrendSeriesEqual(e, t) {
    if (e.length !== t.length)
      return !1;
    for (let i = 0; i < e.length; i += 1) {
      const r = e[i], n = t[i];
      if (r.ts !== n.ts || Math.abs(r.value - n.value) > 1e-4)
        return !1;
    }
    return !0;
  }
};
te.styles = xe`
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
_e([
  A({ attribute: !1 })
], te.prototype, "hass", 2);
_e([
  A({ type: Boolean })
], te.prototype, "preview", 2);
_e([
  A({ type: Boolean })
], te.prototype, "editMode", 2);
_e([
  k()
], te.prototype, "_config", 2);
_e([
  k()
], te.prototype, "_trendSeries", 2);
_e([
  k()
], te.prototype, "_graphTopInset", 2);
_e([
  k()
], te.prototype, "_hoverState", 2);
te = _e([
  ie("power-pilz-graph-stack-card")
], te);
var ca = Object.defineProperty, da = Object.getOwnPropertyDescriptor, Pi = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? da(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && ca(t, i, n), n;
};
const ha = [
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
let pt = class extends H {
  constructor() {
    super(...arguments), this.computeLabel = (e) => this.labels()[e.name ?? ""] ?? e.name ?? "", this.valueChanged = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement) || t.tagName !== "HA-FORM")
        return;
      const i = e.detail.value;
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
  labels() {
    const e = R(this.hass);
    return {
      name: p(e, "wallbox.editor.name"),
      icon: p(e, "wallbox.editor.icon"),
      icon_color: p(e, "wallbox.editor.icon_color"),
      power_entity: p(e, "wallbox.editor.power_entity"),
      status_entity: p(e, "wallbox.editor.status_entity"),
      mode_entity: p(e, "wallbox.editor.mode_entity"),
      command_entity: p(e, "wallbox.editor.command_entity"),
      show_mode_selector: p(e, "wallbox.editor.show_mode"),
      show_live_value: p(e, "wallbox.editor.show_live"),
      show_command_button: p(e, "wallbox.editor.show_button"),
      decimals: p(e, "wallbox.editor.decimals"),
      auto_scale_units: p(e, "wallbox.editor.auto_scale"),
      decimals_base_unit: p(e, "wallbox.editor.decimals_base"),
      decimals_prefixed_unit: p(e, "wallbox.editor.decimals_prefixed")
    };
  }
  render() {
    return !this.hass || !this._config ? $ : E`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ue}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ha}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Pi([
  A({ attribute: !1 })
], pt.prototype, "hass", 2);
Pi([
  k()
], pt.prototype, "_config", 2);
pt = Pi([
  ie("power-pilz-wallbox-card-editor")
], pt);
var ua = Object.defineProperty, Se = (e, t, i, r) => {
  for (var n = void 0, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = s(t, i, n) || n);
  return n && ua(t, i, n), n;
};
const ma = 0.01, jr = "power-pilz-wallbox-mode-menu-portal-style", Ii = class Ii extends H {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._actionBusy = !1, this._modeMenuOpen = !1, this._modeMenuOptionCount = 0, this.toggleModeMenu = (t) => {
      var s;
      if (t.stopPropagation(), this.isEditorPreview() || !((s = this._config) != null && s.mode_entity) || this._actionBusy)
        return;
      const i = D(this.hass, this._config.mode_entity), r = (i == null ? void 0 : i.state) ?? "", n = this.getModeOptions(i);
      if (n.length === 0)
        return;
      if (this._modeMenuOpen) {
        this.closeModeMenuPortal();
        return;
      }
      const o = t.currentTarget;
      o && this.openModeMenuPortal(o, n, r || n[0] || "Mode");
    }, this.selectModeOption = async (t) => {
      var n;
      if (!((n = this._config) != null && n.mode_entity))
        return;
      const i = D(this.hass, this._config.mode_entity);
      if (!i || i.state === t)
        return;
      const r = this.entityDomain(this._config.mode_entity);
      await Promise.resolve(
        this.hass.callService(r, "select_option", {
          entity_id: this._config.mode_entity,
          option: t
        })
      );
    }, this.handleActionClick = async (t) => {
      if (this.isEditorPreview() || !this._config || this._actionBusy)
        return;
      t.stopPropagation(), this.closeModeMenuPortal();
      const i = W(this.hass, this._config.power_entity), r = lt(this.hass, this._config.status_entity), n = this.isCharging(r, i, this._config.command_entity), o = this.resolveActionCommand(n);
      if (o) {
        this._actionBusy = !0;
        try {
          await Promise.resolve(this.hass.callService(o.domain, o.service, o.data));
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
    const i = (t == null ? void 0 : t.states) ?? {}, r = Object.keys(i), n = (...c) => c.find((d) => d in i), o = (c) => r.find((d) => d.startsWith(`${c}.`)), s = n("sensor.dev_wallbox_power", "sensor.wallbox_power") ?? o("sensor") ?? "sensor.dev_wallbox_power", a = n("input_select.dev_wallbox_mode", "select.wallbox_charging_mode") ?? o("input_select") ?? o("select"), l = n("input_boolean.dev_wallbox_enabled", "switch.wallbox_charging_enabled") ?? o("input_boolean") ?? o("switch");
    return {
      type: "custom:power-pilz-wallbox-card",
      name: "Wallbox",
      power_entity: s,
      status_entity: n("sensor.dev_wallbox_status", "sensor.wallbox_status"),
      mode_entity: a,
      command_entity: l,
      decimals: 1,
      auto_scale_units: !1,
      decimals_base_unit: 1,
      decimals_prefixed_unit: 1
    };
  }
  setConfig(t) {
    const i = t.power_entity ?? "sensor.dev_wallbox_power", r = typeof t.decimals == "number" && Number.isFinite(t.decimals) ? Math.min(3, Math.max(0, Math.round(t.decimals))) : 1;
    this._config = {
      ...t,
      icon: t.icon ?? "mdi:power-plug",
      name: t.name ?? p(R(this.hass), "wallbox.default_name"),
      show_mode_selector: t.show_mode_selector ?? !0,
      show_live_value: t.show_live_value ?? !0,
      show_command_button: t.show_command_button ?? !0,
      decimals: r,
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: he(t.decimals_base_unit, r),
      decimals_prefixed_unit: he(t.decimals_prefixed_unit, r),
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
    const t = R(this.hass);
    if (!this._config)
      return E`<ha-card>${p(t, "common.invalid_config")}</ha-card>`;
    if (!this.hass)
      return E``;
    const i = this._config, r = W(this.hass, i.power_entity), n = U(this.hass, i.power_entity) ?? "kW", o = lt(this.hass, i.status_entity), s = D(this.hass, i.mode_entity), a = (s == null ? void 0 : s.state) ?? "", l = this.getModeOptions(s), c = this.isCharging(o, r, i.command_entity), d = this.resolveActionCommand(c), h = c ? p(t, "wallbox.stop") : p(t, "wallbox.start"), _ = c ? "mdi:pause" : "mdi:play", u = this.statusLabel(o, c), m = this.formatPower(r, n, i.decimals ?? 1), w = this.showModeSelector(i, l), f = this.showLiveValue(i), y = this.showCommandButton(i), b = this.isEditorPreview() || this._actionBusy || !i.mode_entity || l.length === 0, x = a || l[0] || p(t, "wallbox.mode_fallback"), S = this._modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down", C = this.iconStyle(i.icon_color), v = Number(f) + Number(y) === 1, T = w && f && y, z = v && f, P = v && y || T, O = z || P, L = f && !z, B = y && !P, F = w || L || B, K = w ? L || B ? B ? "actions" : "actions no-command" : "actions mode-only" : "actions no-mode";
    return (!w || b) && this._modeMenuOpen && this.closeModeMenuPortal(), E`
      <ha-card>
        <div class="container">
          <div class="state-item ${O ? "compact-state" : ""}">
            <div class="icon-wrap">
              <div class="icon-shape" style=${M(C)}>
                <ha-icon .icon=${i.icon ?? "mdi:ev-station"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${i.name}</div>
              <div class="secondary">${p(t, "wallbox.ev_charger")}</div>
            </div>

            ${O ? E`
                  <div class="compact-trailing ${P ? "button-only" : ""}">
                    ${z ? E`
                          <div class="compact-live-value">
                            <span>${u}</span>
                            <span class="dot">•</span>
                            <span>${m}</span>
                          </div>
                        ` : E``}

                    ${P ? E`
                          <button
                            type="button"
                            class="action-button"
                            ?disabled=${this.isEditorPreview() || this._actionBusy || !d}
                            @click=${this.handleActionClick}
                            title=${h}
                            aria-label=${h}
                          >
                            <ha-icon .icon=${_}></ha-icon>
                          </button>
                        ` : E``}
                  </div>
                ` : E``}
          </div>

          ${F ? E`
                <div class=${K}>
                  ${w ? E`
                        <div class="mode-select-wrap">
                          <button
                            type="button"
                            class="mode-select"
                            ?disabled=${b}
                            @click=${this.toggleModeMenu}
                            aria-haspopup="listbox"
                            aria-expanded=${this._modeMenuOpen ? "true" : "false"}
                            title="Charging mode"
                          >
                            <span class="mode-select-label">${x}</span>
                            <ha-icon class="mode-select-chevron" .icon=${S}></ha-icon>
                          </button>
                        </div>
                      ` : E``}

                  ${L ? E`
                        <div class="live-value">
                          <span>${u}</span>
                          <span class="dot">•</span>
                          <span>${m}</span>
                        </div>
                      ` : E``}

                  ${B ? E`
                        <button
                          type="button"
                          class="action-button"
                          ?disabled=${this.isEditorPreview() || this._actionBusy || !d}
                          @click=${this.handleActionClick}
                          title=${h}
                          aria-label=${h}
                        >
                          <ha-icon .icon=${_}></ha-icon>
                        </button>
                      ` : E``}
                </div>
              ` : E``}
        </div>
      </ha-card>
    `;
  }
  getModeOptions(t) {
    const i = t == null ? void 0 : t.attributes.options;
    if (Array.isArray(i)) {
      const r = i.filter(
        (n) => typeof n == "string" && n.trim().length > 0
      );
      if (r.length > 0)
        return Array.from(new Set(r));
    }
    return [];
  }
  showModeSelector(t, i) {
    return t.show_mode_selector === !1 ? !1 : !!t.mode_entity && Array.isArray(i) && i.length > 0;
  }
  showCommandButton(t) {
    return t.show_command_button !== !1;
  }
  showLiveValue(t) {
    return t.show_live_value !== !1;
  }
  statusLabel(t, i) {
    const r = R(this.hass);
    if (!t)
      return i ? p(r, "wallbox.status_charging") : p(r, "wallbox.status_idle");
    const o = `wallbox.status_${t.toLowerCase().replace(/[_\s-]+/g, "_")}`, s = p(r, o);
    return s !== o ? s : t.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (a) => a.toUpperCase());
  }
  formatPower(t, i, r) {
    var o, s, a;
    const n = t === null ? null : Math.abs(t);
    return Ci(n, i, r, {
      enabled: ((o = this._config) == null ? void 0 : o.auto_scale_units) === !0,
      baseDecimals: ((s = this._config) == null ? void 0 : s.decimals_base_unit) ?? r,
      prefixedDecimals: ((a = this._config) == null ? void 0 : a.decimals_prefixed_unit) ?? r,
      nullWithUnit: !0
    });
  }
  isCharging(t, i, r) {
    var n;
    if (t) {
      const o = t.toLowerCase();
      if (["charging", "active", "running", "on", "start", "started"].includes(o))
        return !0;
      if (["idle", "paused", "stopped", "off", "standby", "complete"].includes(o))
        return !1;
    }
    if (r) {
      const o = (n = lt(this.hass, r)) == null ? void 0 : n.toLowerCase();
      if (o === "on")
        return !0;
      if (o === "off")
        return !1;
    }
    return i !== null && i > ma;
  }
  parseServiceAction(t) {
    if (!t)
      return null;
    const [i, r] = t.split(".");
    return !i || !r ? null : { domain: i, service: r };
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
    const i = this._config, r = this.parseServiceAction(t ? i.stop_service : i.start_service);
    if (r) {
      const n = this.objectValue(t ? i.stop_service_data : i.start_service_data);
      return i.command_entity && n.entity_id === void 0 && (n.entity_id = i.command_entity), { ...r, data: n };
    }
    return i.command_entity ? {
      domain: this.entityDomain(i.command_entity),
      service: t ? "turn_off" : "turn_on",
      data: { entity_id: i.command_entity }
    } : null;
  }
  iconStyle(t) {
    return Oe(t);
  }
  disconnectedCallback() {
    this.closeModeMenuPortal(), super.disconnectedCallback();
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  ensureModeMenuPortalStyles() {
    if (document.getElementById(jr))
      return;
    const t = document.createElement("style");
    t.id = jr, t.textContent = `
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
    const i = this._modeMenuPortal;
    if (!i)
      return;
    const r = t ?? this.currentModeButton();
    if (!r)
      return;
    const n = r.getBoundingClientRect(), o = 8, s = 6, a = Math.max(96, Math.min(280, window.innerHeight - o * 2)), l = Math.min(
      a,
      this._modeMenuOptionCount * 34 + Math.max(0, this._modeMenuOptionCount - 1) * 4 + 14
    ), c = i.offsetHeight > 0 ? Math.min(a, i.offsetHeight) : l, d = Math.max(120, Math.round(n.width)), h = window.innerHeight - n.bottom - o, _ = h < c + s && n.top - o > h;
    let u = n.left;
    u = Math.max(o, Math.min(u, window.innerWidth - d - o));
    let m = _ ? n.top - s - c : n.bottom + s;
    m = Math.max(o, Math.min(m, window.innerHeight - c - o)), i.style.maxHeight = `${a}px`, i.style.width = `${d}px`, i.style.left = `${Math.round(u)}px`, i.style.top = `${Math.round(m)}px`;
  }
  openModeMenuPortal(t, i, r) {
    this.closeModeMenuPortal(), this.ensureModeMenuPortalStyles();
    const n = document.createElement("div");
    n.className = "power-pilz-mode-menu-backdrop", n.addEventListener("click", () => {
      this.closeModeMenuPortal();
    });
    const o = document.createElement("div");
    o.className = "power-pilz-mode-menu-portal", o.setAttribute("role", "listbox"), i.forEach((s) => {
      const a = document.createElement("button");
      a.type = "button", a.className = `power-pilz-mode-menu-option ${s === r ? "selected" : ""}`, a.dataset.option = s, a.setAttribute("role", "option"), a.setAttribute("aria-selected", s === r ? "true" : "false"), a.textContent = s, a.addEventListener("click", (l) => {
        var d;
        l.stopPropagation();
        const c = ((d = l.currentTarget) == null ? void 0 : d.dataset.option) ?? "";
        c && (this.closeModeMenuPortal(), this.selectModeOption(c));
      }), o.append(a);
    }), document.body.append(n), document.body.append(o), this._modeMenuBackdrop = n, this._modeMenuPortal = o, this._modeMenuOptionCount = i.length, this._modeMenuOpen = !0, this.positionModeMenuPortal(t);
  }
  closeModeMenuPortal() {
    this._modeMenuPortal && (this._modeMenuPortal.remove(), this._modeMenuPortal = void 0), this._modeMenuBackdrop && (this._modeMenuBackdrop.remove(), this._modeMenuBackdrop = void 0), this._modeMenuOptionCount = 0, this._modeMenuOpen && (this._modeMenuOpen = !1);
  }
};
Ii.styles = xe`
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
let Z = Ii;
Se([
  A({ attribute: !1 })
], Z.prototype, "hass");
Se([
  A({ type: Boolean })
], Z.prototype, "preview");
Se([
  A({ type: Boolean })
], Z.prototype, "editMode");
Se([
  A({ reflect: !0, type: String })
], Z.prototype, "layout");
Se([
  k()
], Z.prototype, "_config");
Se([
  k()
], Z.prototype, "_actionBusy");
Se([
  k()
], Z.prototype, "_modeMenuOpen");
class _a extends Z {
}
customElements.get("power-pilz-wallbox-card") || customElements.define("power-pilz-wallbox-card", Z);
customElements.get("power-pilz-wallbox-card-v2") || customElements.define("power-pilz-wallbox-card-v2", _a);
var pa = Object.defineProperty, fa = Object.getOwnPropertyDescriptor, Ri = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? fa(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && pa(t, i, n), n;
};
let ft = class extends H {
  constructor() {
    super(...arguments), this.computeLabel = (e) => this.labelMap()[e.name ?? ""] ?? e.name ?? "", this.valueChanged = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement) || t.tagName !== "HA-FORM") return;
      const i = e.detail.value;
      !i || typeof i != "object" || Array.isArray(i) || this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: { ...i, type: "custom:power-pilz-switch-card" } },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(e) {
    this._config = {
      ...e,
      use_custom_icons: e.use_custom_icons ?? !1,
      dim_inactive_icon: e.dim_inactive_icon ?? !0,
      type: "custom:power-pilz-switch-card"
    };
  }
  stateSection(e, t) {
    const i = R(this.hass);
    return {
      type: "expandable",
      name: "",
      title: e === 1 ? p(i, "switch.editor.state_1_title") : p(i, "switch.editor.state_n_title", { n: e }),
      icon: t,
      expanded: e <= 3,
      schema: [
        {
          type: "grid",
          name: "",
          columns: 2,
          schema: [
            {
              name: `state_${e}_color`,
              selector: { ui_color: { include_state: !1, include_none: !0 } }
            },
            { name: `state_${e}_icon`, selector: { icon: {} } }
          ]
        }
      ]
    };
  }
  buildSchema() {
    const e = R(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: p(e, "switch.editor.section_identity"),
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
        title: p(e, "switch.editor.section_layout"),
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
                      { label: p(e, "switch.editor.layout_horizontal"), value: "horizontal" },
                      { label: p(e, "switch.editor.layout_vertical"), value: "vertical" }
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
                      { label: p(e, "switch.editor.slider_small"), value: "small" },
                      { label: p(e, "switch.editor.slider_medium"), value: "medium" },
                      { label: p(e, "switch.editor.slider_large"), value: "large" }
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
        title: p(e, "switch.editor.section_slider"),
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
        title: p(e, "switch.editor.section_state_custom"),
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
    const e = R(this.hass), t = {
      name: p(e, "switch.editor.name"),
      subtitle: p(e, "switch.editor.subtitle"),
      icon: p(e, "switch.editor.icon"),
      icon_color: p(e, "switch.editor.icon_color"),
      dim_inactive_icon: p(e, "switch.editor.dim_inactive_icon"),
      entity: p(e, "switch.editor.entity"),
      card_layout: p(e, "switch.editor.card_layout"),
      slider_size: p(e, "switch.editor.slider_size"),
      slider_color: p(e, "switch.editor.slider_color"),
      use_custom_icons: p(e, "switch.editor.use_custom_icons")
    };
    for (let i = 1; i <= 5; i++)
      t[`state_${i}_color`] = p(e, "switch.editor.state_color"), t[`state_${i}_icon`] = p(e, "switch.editor.state_icon");
    return t;
  }
  render() {
    return !this.hass || !this._config ? $ : E`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ue}
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
Ri([
  A({ attribute: !1 })
], ft.prototype, "hass", 2);
Ri([
  k()
], ft.prototype, "_config", 2);
ft = Ri([
  ie("power-pilz-switch-card-editor")
], ft);
var ya = Object.defineProperty, Xe = (e, t, i, r) => {
  for (var n = void 0, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = s(t, i, n) || n);
  return n && ya(t, i, n), n;
};
const ga = 5, Gr = 4, ba = {
  small: "36%",
  medium: "48%",
  large: "62%"
}, Di = class Di extends H {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this.handleSegmentTap = (t) => {
      t.stopPropagation();
      const i = t.currentTarget;
      if (!(i instanceof HTMLElement)) return;
      const r = i.dataset.option;
      r && this.selectOption(r);
    }, this.handleCardTap = () => {
      var o;
      if (!((o = this._config) != null && o.entity) || this.isEditorPreview()) return;
      const t = D(this.hass, this._config.entity);
      if (!t) return;
      const i = this.getOptions(t);
      if (i.length === 0) return;
      const n = (this.activeIndex(i, t.state) + 1) % i.length;
      this.selectOption(i[n]);
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-switch-card-editor");
  }
  static async getStubConfig(t) {
    const i = (t == null ? void 0 : t.states) ?? {}, r = Object.keys(i), n = (s) => r.find((a) => a.startsWith(`${s}.`));
    return {
      type: "custom:power-pilz-switch-card",
      entity: n("input_select") ?? n("select") ?? "input_select.mode",
      name: "Mode"
    };
  }
  setConfig(t) {
    var r;
    if (!t.entity)
      throw new Error("Entity is required");
    const i = (r = this._config) == null ? void 0 : r.card_layout;
    this._config = {
      ...t,
      icon: t.icon ?? "mdi:toggle-switch-outline",
      name: t.name ?? p(R(this.hass), "switch.default_name")
    }, i !== void 0 && i !== t.card_layout && this.requestGridRebuild();
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
  entityDomain(t) {
    const i = t.indexOf(".");
    return i > 0 ? t.substring(0, i) : "input_select";
  }
  getOptions(t) {
    var n;
    const i = (n = t == null ? void 0 : t.attributes) == null ? void 0 : n.options;
    if (!Array.isArray(i)) return [];
    const r = i.filter(
      (o) => typeof o == "string" && o.trim().length > 0
    );
    return Array.from(new Set(r)).slice(0, ga);
  }
  activeIndex(t, i) {
    const r = t.indexOf(i);
    return r >= 0 ? r : 0;
  }
  iconStyle(t) {
    return Oe(t);
  }
  resolvedCardLayout() {
    var i;
    return ((i = this._config) == null ? void 0 : i.card_layout) === "vertical" ? "vertical" : "horizontal";
  }
  resolvedSliderSize() {
    var i;
    const t = (i = this._config) == null ? void 0 : i.slider_size;
    return t === "small" || t === "medium" || t === "large" ? t : "medium";
  }
  /** Resolve the pill background color for the active state index. */
  pillColor(t) {
    const i = this._config;
    if (!i) return null;
    const r = `state_${t + 1}_color`, n = i[r], o = se(n);
    if (o) return `rgba(${o}, 0.25)`;
    const s = se(i.slider_color);
    return s ? `rgba(${s}, 0.25)` : null;
  }
  /** Resolve segment text color for the active state index. */
  segmentActiveColor(t) {
    const i = this._config;
    if (!i) return null;
    const r = `state_${t + 1}_color`, n = i[r], o = se(n);
    if (o) return `rgb(${o})`;
    const s = se(i.slider_color);
    return s ? `rgb(${s})` : null;
  }
  /** Get custom icon for a state index, or null. */
  stateIcon(t) {
    const i = this._config;
    if (!(i != null && i.use_custom_icons)) return null;
    const r = `state_${t + 1}_icon`, n = i[r];
    return typeof n == "string" && n.length > 0 ? n : null;
  }
  segmentContent(t) {
    const i = this.stateIcon(t);
    if (i)
      return E`<ha-icon class="seg-icon" .icon=${i}></ha-icon>`;
    if (t === 0)
      return E`<span class="seg-symbol"><span class="seg-dot"></span></span>`;
    const r = Array.from({ length: t }, () => E`<span class="seg-bar"></span>`);
    return E`<span class="seg-symbol seg-bars">${r}</span>`;
  }
  // --- Slider template (shared between layouts) ---
  renderSlider(t, i, r, n) {
    return E`
      <div class="slider-track">
        <div class="slider-pill" style=${M(r)}></div>
        ${t.map(
      (o, s) => E`
            <button
              type="button"
              class="slider-segment ${s === i ? "active" : ""}"
              style=${s === i && n ? M({ color: n }) : $}
              data-option=${o}
              ?disabled=${this.isEditorPreview()}
              @click=${this.handleSegmentTap}
              title=${o}
              aria-label=${o}
            >
              ${this.segmentContent(s)}
            </button>
          `
    )}
      </div>
    `;
  }
  // --- Service calls ---
  async selectOption(t) {
    var r;
    if (!((r = this._config) != null && r.entity) || this.isEditorPreview()) return;
    const i = this.entityDomain(this._config.entity);
    await Promise.resolve(
      this.hass.callService(i, "select_option", {
        entity_id: this._config.entity,
        option: t
      })
    );
  }
  // --- Render ---
  render() {
    var S;
    if (!this._config)
      return E`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return E``;
    const t = this._config, i = D(this.hass, t.entity), r = (i == null ? void 0 : i.state) ?? "", n = this.getOptions(i), o = this.activeIndex(n, r), s = o === 0 && t.dim_inactive_icon !== !1, a = this.iconStyle(s ? "disabled" : t.icon_color), l = n.length, c = l > 0 ? o / l * 100 : 0, d = l > 0 ? 100 / l : 100, h = (S = i == null ? void 0 : i.attributes) == null ? void 0 : S.friendly_name, _ = t.subtitle || r || p(R(this.hass), "common.unknown"), u = this.resolvedCardLayout(), m = this.resolvedSliderSize(), w = ba[m], f = l > 1, y = this.pillColor(o), b = {
      width: `calc(${d}% - ${Gr * 2}px)`,
      left: `calc(${c}% + ${Gr}px)`
    };
    y && (b["background-color"] = y);
    const x = this.segmentActiveColor(o);
    return u === "vertical" ? E`
        <ha-card @click=${this.handleCardTap}>
          <div class="container vertical">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${M(a)}>
                  <ha-icon .icon=${t.icon ?? "mdi:toggle-switch-outline"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${t.name || h || p(R(this.hass), "switch.default_name")}</div>
                <div class="secondary">${_}</div>
              </div>
            </div>
            ${f ? E`
                  <div class="slider-row">
                    ${this.renderSlider(n, o, b, x)}
                  </div>
                ` : E``}
          </div>
        </ha-card>
      ` : E`
      <ha-card @click=${this.handleCardTap}>
        <div class="container horizontal">
          <div class="state-item">
            <div class="icon-wrap">
              <div class="icon-shape" style=${M(a)}>
                <ha-icon .icon=${t.icon ?? "mdi:toggle-switch-outline"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${t.name || h || p(R(this.hass), "switch.default_name")}</div>
              <div class="secondary">${_}</div>
            </div>
            ${f ? E`
                  <div class="slider-wrap" style=${M({ width: w })}>
                    ${this.renderSlider(n, o, b, x)}
                  </div>
                ` : E``}
          </div>
        </div>
      </ha-card>
    `;
  }
};
Di.styles = xe`
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
let ae = Di;
Xe([
  A({ attribute: !1 })
], ae.prototype, "hass");
Xe([
  A({ type: Boolean })
], ae.prototype, "preview");
Xe([
  A({ type: Boolean })
], ae.prototype, "editMode");
Xe([
  A({ reflect: !0, type: String })
], ae.prototype, "layout");
Xe([
  k()
], ae.prototype, "_config");
class va extends ae {
}
customElements.get("power-pilz-switch-card") || customElements.define("power-pilz-switch-card", ae);
customElements.get("power-pilz-switch-card-v2") || customElements.define("power-pilz-switch-card-v2", va);
var wa = Object.defineProperty, xa = Object.getOwnPropertyDescriptor, Oi = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? xa(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && wa(t, i, n), n;
};
let yt = class extends H {
  constructor() {
    super(...arguments), this.computeLabel = (e) => this.labelMap()[e.name ?? ""] ?? e.name ?? "", this.computeHelper = (e) => this.helperMap()[e.name ?? ""], this.valueChanged = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement) || t.tagName !== "HA-FORM") return;
      const i = e.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i)) return;
      const r = { ...i };
      r.use_companion !== !1 ? (delete r.schedule_entity, delete r.switch_entity, delete r.mode_entity) : delete r.companion_entity, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: { ...r, type: "custom:power-pilz-schedule-card" } },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(e) {
    const t = e.use_companion !== void 0 ? e.use_companion !== !1 : !e.schedule_entity;
    this._config = {
      ...e,
      use_companion: t,
      show_day_selector: e.show_day_selector ?? !0,
      show_mode_control: e.show_mode_control ?? !0,
      show_now_indicator: e.show_now_indicator ?? !0,
      show_time_labels: e.show_time_labels ?? !0,
      type: "custom:power-pilz-schedule-card"
    };
  }
  buildSchema() {
    var r;
    const e = R(this.hass), t = ((r = this._config) == null ? void 0 : r.use_companion) !== !1;
    return [
      {
        type: "expandable",
        name: "",
        title: p(e, "schedule.editor.section_entities"),
        icon: "mdi:connection",
        expanded: !0,
        schema: [
          {
            name: "use_companion",
            selector: { boolean: {} },
            helper: p(e, "schedule.editor.use_companion_help"),
            description: p(e, "schedule.editor.use_companion_help")
          },
          ...t ? [
            {
              name: "companion_entity",
              selector: {
                entity: {
                  filter: {
                    domain: "select",
                    integration: "powerpilz_companion"
                  }
                }
              },
              helper: p(e, "schedule.editor.companion_help"),
              description: p(e, "schedule.editor.companion_help")
            }
          ] : [
            {
              name: "schedule_entity",
              selector: { entity: { filter: { domain: "schedule" } } },
              helper: p(e, "schedule.editor.schedule_help"),
              description: p(e, "schedule.editor.schedule_help")
            },
            {
              name: "switch_entity",
              selector: { entity: { filter: { domain: ["switch", "light", "input_boolean"] } } },
              helper: p(e, "schedule.editor.switch_help"),
              description: p(e, "schedule.editor.switch_help")
            },
            {
              name: "mode_entity",
              selector: { entity: { filter: { domain: ["input_select", "select"] } } },
              helper: p(e, "schedule.editor.mode_help"),
              description: p(e, "schedule.editor.mode_help")
            }
          ]
        ]
      },
      {
        type: "expandable",
        name: "",
        title: p(e, "schedule.editor.section_identity"),
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
                context: { icon_entity: t ? "companion_entity" : "schedule_entity" }
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
        title: p(e, "schedule.editor.section_layout"),
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
                      { label: p(e, "schedule.editor.layout_horizontal"), value: "horizontal" },
                      { label: p(e, "schedule.editor.layout_vertical"), value: "vertical" }
                    ]
                  }
                },
                helper: p(e, "schedule.editor.card_layout_help"),
                description: p(e, "schedule.editor.card_layout_help")
              },
              {
                name: "time_window",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: [
                      { label: p(e, "schedule.editor.tw_24"), value: "24" },
                      { label: p(e, "schedule.editor.tw_12"), value: "12" },
                      { label: p(e, "schedule.editor.tw_6"), value: "6" }
                    ]
                  }
                },
                helper: p(e, "schedule.editor.time_window_help"),
                description: p(e, "schedule.editor.time_window_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: p(e, "schedule.editor.section_appearance"),
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
                helper: p(e, "schedule.editor.active_color_help"),
                description: p(e, "schedule.editor.active_color_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: p(e, "schedule.editor.section_display"),
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
      }
    ];
  }
  labelMap() {
    const e = R(this.hass);
    return {
      use_companion: p(e, "schedule.editor.use_companion"),
      companion_entity: p(e, "schedule.editor.companion_entity"),
      schedule_entity: p(e, "schedule.editor.schedule_entity"),
      switch_entity: p(e, "schedule.editor.switch_entity"),
      mode_entity: p(e, "schedule.editor.mode_entity"),
      name: p(e, "schedule.editor.name"),
      subtitle: p(e, "schedule.editor.subtitle"),
      icon: p(e, "schedule.editor.icon"),
      icon_color: p(e, "schedule.editor.icon_color"),
      card_layout: p(e, "schedule.editor.card_layout"),
      time_window: p(e, "schedule.editor.time_window"),
      active_color: p(e, "schedule.editor.active_color"),
      show_day_selector: p(e, "schedule.editor.show_day_selector"),
      show_mode_control: p(e, "schedule.editor.show_mode_control"),
      show_now_indicator: p(e, "schedule.editor.show_now_indicator"),
      show_time_labels: p(e, "schedule.editor.show_time_labels")
    };
  }
  helperMap() {
    const e = R(this.hass);
    return {
      use_companion: p(e, "schedule.editor.use_companion_help"),
      companion_entity: p(e, "schedule.editor.companion_help"),
      schedule_entity: p(e, "schedule.editor.schedule_help"),
      switch_entity: p(e, "schedule.editor.switch_help"),
      mode_entity: p(e, "schedule.editor.mode_help"),
      card_layout: p(e, "schedule.editor.card_layout_help"),
      time_window: p(e, "schedule.editor.time_window_help"),
      active_color: p(e, "schedule.editor.active_color_help"),
      show_day_selector: p(e, "schedule.editor.show_day_help"),
      show_mode_control: p(e, "schedule.editor.show_mode_help"),
      show_now_indicator: p(e, "schedule.editor.show_now_help"),
      show_time_labels: p(e, "schedule.editor.show_labels_help")
    };
  }
  render() {
    return !this.hass || !this._config ? $ : E`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ue}
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
Oi([
  A({ attribute: !1 })
], yt.prototype, "hass", 2);
Oi([
  k()
], yt.prototype, "_config", 2);
yt = Oi([
  ie("power-pilz-schedule-card-editor")
], yt);
var Sa = Object.defineProperty, Ee = (e, t, i, r) => {
  for (var n = void 0, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = s(t, i, n) || n);
  return n && Sa(t, i, n), n;
};
const Kr = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], Hi = class Hi extends H {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._selectedDay = (/* @__PURE__ */ new Date()).getDay(), this.handleCardTap = (t) => {
      const i = t.target;
      i.closest(".mode-btn") || i.closest(".timeline-track") || i.closest(".day-btn") || this.isEditorPreview() || !this._modeEntityId || this.handleModeChange(t);
    }, this.handleDaySelect = (t) => {
      const i = t.currentTarget;
      if (!(i instanceof HTMLElement)) return;
      const r = parseInt(i.dataset.day ?? "0", 10);
      this._selectedDay = r;
    }, this.handleModeChange = async (t) => {
      var c, d;
      t.stopPropagation();
      const i = this._modeEntityId;
      if (this.isEditorPreview() || !i) return;
      const r = D(this.hass, i);
      if (!r) return;
      const n = ((c = r.attributes) == null ? void 0 : c.options) ?? [];
      if (n.length === 0) return;
      const s = (n.indexOf(r.state) + 1) % n.length, a = n[s], l = i.split(".")[0];
      if (await this.hass.callService(l, "select_option", {
        entity_id: i,
        option: a
      }), ((d = this._config) == null ? void 0 : d.use_companion) === !1) {
        const h = this._switchEntityId;
        if (h) {
          const _ = h.split(".")[0], u = a.toLowerCase();
          u === "on" ? await this.hass.callService(_, "turn_on", {
            entity_id: h
          }) : u === "off" && await this.hass.callService(_, "turn_off", {
            entity_id: h
          });
        }
      }
    }, this.handleTimelineTap = async (t) => {
      if (t.stopPropagation(), this.isEditorPreview() || !this._scheduleData || !this._scheduleEntityId) return;
      const r = t.currentTarget.getBoundingClientRect(), o = (t.clientX - r.left) / r.width, { start: s, end: a } = this.resolvedTimeWindow(), l = a - s, c = Math.round(s + o * l), d = Math.round(c / 30) * 30, h = this.dayKey(this._selectedDay), _ = [...this.blocksForDay(this._selectedDay)], u = _.findIndex((f) => {
        const y = this.timeToMinutes(f.from), b = this.timeToMinutes(f.to);
        return d >= y && d < b;
      }), m = this._scheduleEntityId;
      if (!m) return;
      const w = m.split(".")[1];
      if (u >= 0)
        _.splice(u, 1);
      else {
        const f = Math.max(0, d - 30), y = Math.min(1440, d + 30), b = `${String(Math.floor(f / 60)).padStart(2, "0")}:${String(f % 60).padStart(2, "0")}:00`, x = y >= 1440 ? "24:00:00" : `${String(Math.floor(y / 60)).padStart(2, "0")}:${String(y % 60).padStart(2, "0")}:00`;
        _.some((C) => {
          const g = this.timeToMinutes(C.from), v = this.timeToMinutes(C.to);
          return f < v && y > g;
        }) || (_.push({ from: b, to: x }), _.sort((C, g) => this.timeToMinutes(C.from) - this.timeToMinutes(g.from)));
      }
      try {
        if (!this.hass.callWS) return;
        await this.hass.callWS({
          type: "schedule/update",
          schedule_id: w,
          [h]: _
        }), await this.fetchSchedule();
      } catch {
      }
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-schedule-card-editor");
  }
  static async getStubConfig(t) {
    const i = (t == null ? void 0 : t.states) ?? {}, r = Object.keys(i), n = r.find((s) => {
      var l;
      if (!s.startsWith("select.")) return !1;
      const a = (l = i[s]) == null ? void 0 : l.attributes;
      return typeof (a == null ? void 0 : a.linked_schedule) == "string" && typeof (a == null ? void 0 : a.target_entity) == "string";
    });
    if (n)
      return {
        type: "custom:power-pilz-schedule-card",
        use_companion: !0,
        companion_entity: n
      };
    const o = (s) => r.find((a) => a.startsWith(`${s}.`));
    return {
      type: "custom:power-pilz-schedule-card",
      use_companion: !1,
      schedule_entity: o("schedule") ?? "schedule.my_schedule",
      switch_entity: o("switch") ?? o("input_boolean"),
      mode_entity: o("input_select")
    };
  }
  setConfig(t) {
    const i = t.use_companion !== void 0 ? t.use_companion !== !1 : !t.schedule_entity;
    this._config = {
      ...t,
      use_companion: i,
      icon: t.icon ?? "mdi:clock-outline",
      name: t.name ?? p(R(this.hass), "schedule.default_name"),
      time_window: t.time_window ?? "24",
      show_day_selector: t.show_day_selector ?? !0,
      show_mode_control: t.show_mode_control ?? !0,
      show_now_indicator: t.show_now_indicator ?? !0,
      show_time_labels: t.show_time_labels ?? !0
    };
  }
  // -------- Entity resolvers --------
  // In companion mode the card takes its three entity IDs from the
  // attributes of the configured Smart Schedule `select.*` entity. In
  // manual mode they come directly from config. Always go through these
  // getters to stay mode-agnostic.
  get _scheduleEntityId() {
    var r, n, o;
    if (!this._config) return;
    if (this._config.use_companion === !1)
      return this._config.schedule_entity;
    const t = (n = (r = this.hass) == null ? void 0 : r.states) == null ? void 0 : n[this._config.companion_entity ?? ""], i = (o = t == null ? void 0 : t.attributes) == null ? void 0 : o.linked_schedule;
    return typeof i == "string" ? i : void 0;
  }
  get _switchEntityId() {
    var r, n, o;
    if (!this._config) return;
    if (this._config.use_companion === !1)
      return this._config.switch_entity;
    const t = (n = (r = this.hass) == null ? void 0 : r.states) == null ? void 0 : n[this._config.companion_entity ?? ""], i = (o = t == null ? void 0 : t.attributes) == null ? void 0 : o.target_entity;
    return typeof i == "string" ? i : void 0;
  }
  get _modeEntityId() {
    if (this._config)
      return this._config.use_companion === !1 ? this._config.mode_entity : this._config.companion_entity;
  }
  getCardSize() {
    var t;
    return ((t = this._config) == null ? void 0 : t.show_day_selector) !== !1 ? 3 : 2;
  }
  getGridOptions() {
    var i;
    const t = ((i = this._config) == null ? void 0 : i.show_day_selector) !== !1;
    return {
      columns: 6,
      rows: t ? 3 : 2,
      min_columns: 3,
      min_rows: t ? 2 : 1,
      max_rows: t ? 4 : 3
    };
  }
  getLayoutOptions() {
    return { grid_columns: 2, grid_rows: this.getCardSize() };
  }
  connectedCallback() {
    super.connectedCallback(), this.fetchSchedule();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._fetchTimer && (clearInterval(this._fetchTimer), this._fetchTimer = void 0);
  }
  updated(t) {
    var o, s, a;
    if (!t.has("hass")) return;
    const i = this._scheduleEntityId;
    if (!i) return;
    if (i !== this._lastFetchEntity) {
      this._lastFetchEntity = i, this._lastEntityUpdated = void 0, this.fetchSchedule();
      return;
    }
    const r = (s = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : s[i], n = ((a = r == null ? void 0 : r.attributes) == null ? void 0 : a.last_updated) ?? (r == null ? void 0 : r.state);
    n && n !== this._lastEntityUpdated && (this._lastEntityUpdated = n, this.fetchSchedule());
  }
  // --- Schedule data fetching ---
  async fetchSchedule() {
    var i;
    const t = this._scheduleEntityId;
    if (!(!((i = this.hass) != null && i.callWS) || !t)) {
      try {
        const r = await this.hass.callWS({ type: "schedule/list" }), n = t.split(".")[1];
        this._scheduleData = r.find((o) => o.id === n) ?? r.find((o) => {
          var l, c, d;
          const s = (c = (l = this.hass) == null ? void 0 : l.states) == null ? void 0 : c[t], a = (d = s == null ? void 0 : s.attributes) == null ? void 0 : d.friendly_name;
          return typeof a == "string" && o.name === a;
        });
      } catch {
        this._scheduleData = void 0;
      }
      this._fetchTimer || (this._fetchTimer = window.setInterval(() => this.fetchSchedule(), 6e4));
    }
  }
  // --- Helpers ---
  isEditorPreview() {
    return this.preview || this.editMode;
  }
  iconStyle(t) {
    return Oe(t);
  }
  dayKey(t) {
    return Kr[t] ?? "monday";
  }
  blocksForDay(t) {
    if (!this._scheduleData) return [];
    const i = this.dayKey(t), r = this._scheduleData[i];
    return Array.isArray(r) ? r : [];
  }
  timeToMinutes(t) {
    const i = t.split(":"), r = parseInt(i[0] ?? "0", 10), n = parseInt(i[1] ?? "0", 10);
    return r * 60 + n;
  }
  nowMinutes() {
    const t = /* @__PURE__ */ new Date();
    return t.getHours() * 60 + t.getMinutes();
  }
  resolvedTimeWindow() {
    var s;
    const t = ((s = this._config) == null ? void 0 : s.time_window) ?? "24";
    if (t === "24") return { start: 0, end: 1440 };
    const i = t === "12" ? 360 : 180, r = this.nowMinutes(), n = Math.max(0, r - i), o = Math.min(1440, r + i);
    return { start: n, end: o };
  }
  resolvedActiveColor() {
    var i;
    const t = se((i = this._config) == null ? void 0 : i.active_color);
    return t ? `rgb(${t})` : "var(--primary-color, rgb(3, 169, 244))";
  }
  resolvedActiveColorAlpha(t) {
    var r;
    const i = se((r = this._config) == null ? void 0 : r.active_color);
    return i ? `rgba(${i}, ${t})` : `rgba(var(--rgb-primary-color, 3, 169, 244), ${t})`;
  }
  isDeviceOn() {
    const t = this.modeValue().toLowerCase();
    if (t === "on") return !0;
    if (t === "off") return !1;
    const i = (/* @__PURE__ */ new Date()).getDay(), r = this.blocksForDay(i), n = this.nowMinutes();
    if (r.some((l) => {
      const c = this.timeToMinutes(l.from), d = this.timeToMinutes(l.to);
      return n >= c && n < d;
    })) return !0;
    const s = D(this.hass, this._scheduleEntityId);
    if ((s == null ? void 0 : s.state) === "on") return !0;
    const a = this._switchEntityId;
    if (a) {
      const l = D(this.hass, a);
      return (l == null ? void 0 : l.state) === "on";
    }
    return !1;
  }
  modeValue() {
    const t = this._modeEntityId;
    if (!t) return "Auto";
    const i = D(this.hass, t);
    return (i == null ? void 0 : i.state) ?? "Auto";
  }
  modeLabel(t) {
    const i = R(this.hass), r = t.toLowerCase();
    return r === "auto" ? p(i, "schedule.timer_label") : r === "on" ? p(i, "common.on") : r === "off" ? p(i, "common.off") : t;
  }
  // --- Render ---
  renderTimeline() {
    const t = this._config, { start: i, end: r } = this.resolvedTimeWindow(), n = r - i, o = this.blocksForDay(this._selectedDay), s = this.resolvedActiveColor(), a = this.resolvedActiveColorAlpha(0.3), l = this.nowMinutes(), c = this._selectedDay === (/* @__PURE__ */ new Date()).getDay(), d = t.show_now_indicator !== !1 && c && l >= i && l <= r, h = t.show_time_labels !== !1, _ = [];
    if (h) {
      const u = Math.ceil(i / 60), m = Math.floor(r / 60), w = n > 720 ? 6 : n > 360 ? 3 : 2;
      for (let f = u; f <= m; f += w) {
        const y = f * 60;
        y >= i && y <= r && _.push({ hour: f >= 24 ? 0 : f, pct: (y - i) / n * 100 });
      }
    }
    return E`
      <div class="timeline-container">
        ${h ? E`
              <div class="time-labels">
                ${_.map(
      (u) => E`<span class="time-label" style=${M({ left: `${u.pct}%` })}>${String(u.hour).padStart(2, "0")}</span>`
    )}
              </div>
            ` : $}
        <div class="timeline-track" @click=${this.handleTimelineTap}>
          ${o.map((u) => {
      const m = this.timeToMinutes(u.from), w = this.timeToMinutes(u.to), f = Math.max(m, i), y = Math.min(w, r);
      if (y <= f) return $;
      const b = (f - i) / n * 100, x = (y - f) / n * 100;
      return E`
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
          ${d ? E`
                <div
                  class="now-indicator"
                  style=${M({
      left: `${(l - i) / n * 100}%`,
      "background-color": s
    })}
                ></div>
              ` : $}
        </div>
      </div>
    `;
  }
  renderDaySelector() {
    const t = (/* @__PURE__ */ new Date()).getDay();
    return E`
      <div class="day-selector">
        ${Kr.map((i, r) => E`
          <button
            type="button"
            class="day-btn ${r === this._selectedDay ? "active" : ""} ${r === t ? "today" : ""}"
            data-day=${r}
            @click=${this.handleDaySelect}
          >
            ${yi(R(this.hass), r)}
          </button>
        `)}
      </div>
    `;
  }
  renderModeButton() {
    const t = this.modeValue(), i = t === "On" ? "mdi:power" : t === "Off" ? "mdi:power-off" : "mdi:clock-outline", r = this.modeLabel(t);
    return E`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${t}">
        <ha-icon .icon=${i}></ha-icon>
        <span class="mode-label">${r}</span>
      </button>
    `;
  }
  render() {
    var h, _, u, m;
    if (!this._config) return E`<ha-card>${p(R(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return E``;
    if (!this._scheduleEntityId && !this._modeEntityId) {
      const w = R(this.hass), f = this._config.use_companion !== !1 ? p(w, "schedule.placeholder_companion") : p(w, "schedule.placeholder_manual");
      return E`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:clock-outline"></ha-icon>
            <div class="placeholder-text">${f}</div>
          </div>
        </ha-card>
      `;
    }
    const t = this._config, i = ((_ = (h = D(this.hass, this._scheduleEntityId)) == null ? void 0 : h.attributes) == null ? void 0 : _.friendly_name) ?? ((m = (u = D(this.hass, this._modeEntityId)) == null ? void 0 : u.attributes) == null ? void 0 : m.friendly_name), r = this.modeValue(), n = t.subtitle || this.modeLabel(r), o = t.show_day_selector !== !1, s = t.show_mode_control !== !1 && !!this._modeEntityId, a = t.card_layout === "vertical", c = this.isDeviceOn() ? this.iconStyle(t.icon_color) : this.iconStyle("disabled"), d = E`
      <div class="state-item">
        <div class="icon-wrap">
          <div class="icon-shape" style=${M(c)}>
            <ha-icon .icon=${t.icon ?? "mdi:clock-outline"}></ha-icon>
          </div>
        </div>
        <div class="info">
          <div class="primary">${t.name || i || p(R(this.hass), "schedule.default_name")}</div>
          <div class="secondary">${n}</div>
        </div>
        ${s ? this.renderModeButton() : $}
      </div>
    `;
    return E`
      <ha-card @click=${this.handleCardTap}>
        <div class="container ${a ? "vertical" : "horizontal"}">
          <div class="row row-header">${d}</div>
          ${o ? E`<div class="row row-days">${this.renderDaySelector()}</div>` : $}
          <div class="row row-timeline">${this.renderTimeline()}</div>
        </div>
      </ha-card>
    `;
  }
};
Hi.styles = xe`
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
    }

    /* Three sibling rows share the card height equally, so each row
       looks like a single-row Mushroom card placed next to a same-
       height card. The row count is 2 when the day selector is hidden
       (header + timeline), otherwise 3.

       Applies to BOTH horizontal and vertical card_layout settings —
       the user-visible difference between those is now limited to
       minor details (they used to control spread-vs-center stacking,
       which the equal-rows layout replaces). */
    .container {
      justify-content: stretch;
    }

    .container > .row {
      flex: 1 1 0;
      min-height: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /* Day-selector and timeline rows get only the horizontal padding
       the legacy body wrapper used to provide. NO vertical padding —
       that would shift the row's content off-center from the header's
       icon position. Each row must be symmetrically centerable. */
    .container > .row-days,
    .container > .row-timeline {
      padding-left: var(--control-spacing);
      padding-right: var(--control-spacing);
    }

    /* --- Header --- */

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

    /* --- Day selector --- */

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

    /* --- Timeline ---
       The track is the visual reference point: it sits vertically
       centered inside the timeline row and always at the same position,
       whether hour labels are shown or not. Labels float above the
       track via absolute positioning so toggling them doesn't shift
       the track vertically. */

    .timeline-container {
      position: relative;
    }

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
      /* Match the icon circle height so the timeline lines up with a
         single-row card's icon when placed side-by-side. */
      height: var(--icon-size);
      border-radius: var(--control-border-radius);
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.05);
      overflow: hidden;
      cursor: pointer;
    }

    .timeline-block {
      position: absolute;
      top: 6px;
      bottom: 6px;
      border-radius: 6px;
      pointer-events: none;
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

    /* --- Mode button (header, matches wallbox play button size) --- */

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
let X = Hi;
Ee([
  A({ attribute: !1 })
], X.prototype, "hass");
Ee([
  A({ type: Boolean })
], X.prototype, "preview");
Ee([
  A({ type: Boolean })
], X.prototype, "editMode");
Ee([
  A({ reflect: !0, type: String })
], X.prototype, "layout");
Ee([
  k()
], X.prototype, "_config");
Ee([
  k()
], X.prototype, "_scheduleData");
Ee([
  k()
], X.prototype, "_selectedDay");
class Ea extends X {
}
customElements.get("power-pilz-schedule-card") || customElements.define("power-pilz-schedule-card", X);
customElements.get("power-pilz-schedule-card-v2") || customElements.define("power-pilz-schedule-card-v2", Ea);
var Ca = Object.defineProperty, Ta = Object.getOwnPropertyDescriptor, Li = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Ta(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Ca(t, i, n), n;
};
let gt = class extends H {
  constructor() {
    super(...arguments), this.computeLabel = (e) => this.labelMap()[e.name ?? ""] ?? e.name ?? "", this.computeHelper = (e) => this.helperMap()[e.name ?? ""], this.valueChanged = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement) || t.tagName !== "HA-FORM") return;
      const i = e.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i)) return;
      const r = { ...i };
      r.use_companion !== !1 ? (delete r.switch_entity, delete r.on_datetime_entity, delete r.off_datetime_entity, delete r.active_entity) : delete r.companion_entity, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: { ...r, type: "custom:power-pilz-timer-card" } },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(e) {
    const t = e.use_companion !== void 0 ? e.use_companion !== !1 : !e.switch_entity;
    this._config = {
      ...e,
      use_companion: t,
      type: "custom:power-pilz-timer-card"
    };
  }
  buildSchema() {
    var r;
    const e = R(this.hass), t = ((r = this._config) == null ? void 0 : r.use_companion) !== !1;
    return [
      {
        type: "expandable",
        name: "",
        title: p(e, "timer.editor.section_entities"),
        icon: "mdi:connection",
        expanded: !0,
        schema: [
          {
            name: "use_companion",
            selector: { boolean: {} },
            helper: p(e, "timer.editor.use_companion_help"),
            description: p(e, "timer.editor.use_companion_help")
          },
          ...t ? [
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
              helper: p(e, "timer.editor.companion_help"),
              description: p(e, "timer.editor.companion_help")
            }
          ] : [
            {
              name: "switch_entity",
              selector: { entity: { filter: { domain: ["switch", "light", "input_boolean", "climate", "fan"] } } },
              helper: p(e, "timer.editor.switch_help"),
              description: p(e, "timer.editor.switch_help")
            },
            {
              name: "on_datetime_entity",
              selector: { entity: { filter: { domain: "input_datetime" } } },
              helper: p(e, "timer.editor.on_help"),
              description: p(e, "timer.editor.on_help")
            },
            {
              name: "off_datetime_entity",
              selector: { entity: { filter: { domain: "input_datetime" } } },
              helper: p(e, "timer.editor.off_help"),
              description: p(e, "timer.editor.off_help")
            },
            {
              name: "active_entity",
              selector: { entity: { filter: { domain: "input_boolean" } } },
              helper: p(e, "timer.editor.active_help"),
              description: p(e, "timer.editor.active_help")
            }
          ]
        ]
      },
      {
        type: "expandable",
        name: "",
        title: p(e, "timer.editor.section_identity"),
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
                context: { icon_entity: t ? "companion_entity" : "switch_entity" }
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
        title: p(e, "timer.editor.section_appearance"),
        icon: "mdi:palette-outline",
        expanded: !1,
        schema: [
          {
            name: "active_color",
            selector: { ui_color: { include_state: !1, include_none: !0, default_color: "primary" } },
            helper: p(e, "timer.editor.active_color_help"),
            description: p(e, "timer.editor.active_color_help")
          }
        ]
      }
    ];
  }
  labelMap() {
    const e = R(this.hass);
    return {
      use_companion: p(e, "timer.editor.use_companion"),
      companion_entity: p(e, "timer.editor.companion_entity"),
      switch_entity: p(e, "timer.editor.switch_entity"),
      on_datetime_entity: p(e, "timer.editor.on_datetime_entity"),
      off_datetime_entity: p(e, "timer.editor.off_datetime_entity"),
      active_entity: p(e, "timer.editor.active_entity"),
      name: p(e, "timer.editor.name"),
      subtitle: p(e, "timer.editor.subtitle"),
      icon: p(e, "timer.editor.icon"),
      icon_color: p(e, "timer.editor.icon_color"),
      active_color: p(e, "timer.editor.active_color")
    };
  }
  helperMap() {
    const e = R(this.hass);
    return {
      use_companion: p(e, "timer.editor.use_companion_help"),
      companion_entity: p(e, "timer.editor.companion_help"),
      switch_entity: p(e, "timer.editor.switch_help"),
      on_datetime_entity: p(e, "timer.editor.on_help"),
      off_datetime_entity: p(e, "timer.editor.off_help"),
      active_entity: p(e, "timer.editor.active_help"),
      active_color: p(e, "timer.editor.active_color_help")
    };
  }
  render() {
    return !this.hass || !this._config ? $ : E`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ue}
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
Li([
  A({ attribute: !1 })
], gt.prototype, "hass", 2);
Li([
  k()
], gt.prototype, "_config", 2);
gt = Li([
  ie("power-pilz-timer-card-editor")
], gt);
var $a = Object.defineProperty, re = (e, t, i, r) => {
  for (var n = void 0, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = s(t, i, n) || n);
  return n && $a(t, i, n), n;
};
const qr = "power-pilz-timer-picker-portal-style", Yr = "powerpilz_companion";
function Zr(e) {
  const t = new Date(e.includes("T") ? e : e.replace(" ", "T"));
  return isNaN(t.getTime()) ? null : t;
}
const Ni = class Ni extends H {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._pickingOn = !1, this._pickingOff = !1, this._confirmingCancel = !1, this._pickDay = 0, this._pickHour = 12, this.handleOpenPicker = (t) => {
      t.stopPropagation(), !this.isEditorPreview() && (this._pickingOn || this._pickingOff || (this._pickDay = 0, this._pickHour = (/* @__PURE__ */ new Date()).getHours() + 1, this._pickHour > 23 && (this._pickHour = 0, this._pickDay = 1), this._hasOnSupport() ? this._pickingOn = !0 : this._pickingOff = !0));
    }, this.handleBadgeClick = (t) => {
      t.stopPropagation(), !this.isEditorPreview() && (this._confirmingCancel = !0);
    }, this.handleConfirmCancel = async () => {
      this._confirmingCancel = !1, await this.cancelTimer();
    }, this.handleDismissConfirm = () => {
      this._confirmingCancel = !1;
    }, this.handleSetOn = async () => {
      if (!this._config) return;
      const t = this.buildDatetime(this._pickDay, this._pickHour);
      await this._writeOnDatetime(t), this._pickingOn = !1, this._hasOffSupport() ? (this._pickHour = Math.min(this._pickHour + 1, 23), this._pickingOff = !0) : await this.activateTimer();
    }, this.handleSetOff = async () => {
      if (!this._hasOffSupport()) return;
      const t = this.buildDatetime(this._pickDay, this._pickHour);
      await this._writeOffDatetime(t), this._pickingOff = !1, await this.activateTimer();
    }, this.handleSkipOff = async () => {
      this._pickingOff = !1, await this.activateTimer();
    }, this.handleCancelPick = () => {
      this._pickingOn = !1, this._pickingOff = !1, this._confirmingCancel = !1;
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-timer-card-editor");
  }
  static async getStubConfig(t) {
    const i = (t == null ? void 0 : t.states) ?? {}, r = Object.keys(i), n = r.find((s) => {
      var l;
      if (!s.startsWith("switch.")) return !1;
      const a = (l = i[s]) == null ? void 0 : l.attributes;
      return typeof (a == null ? void 0 : a.target_entity) == "string" && ("on_datetime" in (a ?? {}) || "off_datetime" in (a ?? {}));
    });
    if (n)
      return {
        type: "custom:power-pilz-timer-card",
        use_companion: !0,
        companion_entity: n,
        name: "Timer"
      };
    const o = (s) => r.find((a) => a.startsWith(`${s}.`));
    return {
      type: "custom:power-pilz-timer-card",
      use_companion: !1,
      switch_entity: o("switch") ?? o("input_boolean") ?? "switch.device",
      on_datetime_entity: o("input_datetime") ?? "input_datetime.sched_on",
      active_entity: o("input_boolean") ?? "input_boolean.sched_active",
      name: "Timer"
    };
  }
  setConfig(t) {
    const i = t.use_companion !== void 0 ? t.use_companion !== !1 : !t.switch_entity;
    this._config = {
      ...t,
      use_companion: i,
      icon: t.icon ?? "mdi:timer-outline",
      name: t.name ?? p(R(this.hass), "timer.default_name")
    };
  }
  // ---------- Mode-aware entity / datetime resolvers ----------
  get _activeEntityId() {
    if (this._config)
      return this._config.use_companion === !1 ? this._config.active_entity : this._config.companion_entity;
  }
  get _switchEntityId() {
    var r, n, o;
    if (!this._config) return;
    if (this._config.use_companion === !1) return this._config.switch_entity;
    const t = (n = (r = this.hass) == null ? void 0 : r.states) == null ? void 0 : n[this._config.companion_entity ?? ""], i = (o = t == null ? void 0 : t.attributes) == null ? void 0 : o.target_entity;
    return typeof i == "string" ? i : void 0;
  }
  _companionAttr(t) {
    var r, n, o, s, a;
    const i = (r = this._config) == null ? void 0 : r.companion_entity;
    if (i)
      return (a = (s = (o = (n = this.hass) == null ? void 0 : n.states) == null ? void 0 : o[i]) == null ? void 0 : s.attributes) == null ? void 0 : a[t];
  }
  _getOnDatetime() {
    var t, i;
    if (((t = this._config) == null ? void 0 : t.use_companion) !== !1) {
      const r = this._companionAttr("on_datetime");
      return typeof r == "string" ? Zr(r) : null;
    }
    return this.parseDatetime((i = this._config) == null ? void 0 : i.on_datetime_entity);
  }
  _getOffDatetime() {
    var t, i;
    if (((t = this._config) == null ? void 0 : t.use_companion) !== !1) {
      const r = this._companionAttr("off_datetime");
      return typeof r == "string" ? Zr(r) : null;
    }
    return this.parseDatetime((i = this._config) == null ? void 0 : i.off_datetime_entity);
  }
  _direction() {
    var t, i;
    if (((t = this._config) == null ? void 0 : t.use_companion) !== !1) {
      const r = this._companionAttr("direction");
      return r === "on_only" || r === "off_only" ? r : "both";
    }
    return (i = this._config) != null && i.off_datetime_entity ? "both" : "on_only";
  }
  _hasOnSupport() {
    return this._direction() !== "off_only";
  }
  _hasOffSupport() {
    var i, r, n;
    return this._direction() === "on_only" ? !1 : ((i = this._config) == null ? void 0 : i.use_companion) !== !1 ? !!((r = this._config) != null && r.companion_entity) : !!((n = this._config) != null && n.off_datetime_entity);
  }
  _companionStateIcon() {
    var n;
    if (((n = this._config) == null ? void 0 : n.use_companion) === !1) return;
    const t = this._companionAttr("state_icons");
    if (!t || typeof t != "object") return;
    const i = this.isActive() ? "active" : "inactive", r = t[i];
    return typeof r == "string" && r ? r : void 0;
  }
  _companionStateName() {
    var n;
    if (((n = this._config) == null ? void 0 : n.use_companion) === !1) return;
    const t = this._companionAttr("state_names");
    if (!t || typeof t != "object") return;
    const i = this.isActive() ? "active" : "inactive", r = t[i];
    return typeof r == "string" && r ? r : void 0;
  }
  _resolvedIcon() {
    var t;
    return this._companionStateIcon() ?? ((t = this._config) == null ? void 0 : t.icon) ?? "mdi:timer-outline";
  }
  async _writeOnDatetime(t) {
    var r, n;
    if (((r = this._config) == null ? void 0 : r.use_companion) !== !1) {
      const o = (n = this._config) == null ? void 0 : n.companion_entity;
      if (!o) return;
      await this.hass.callService(Yr, "set_timer", {
        entity_id: o,
        on: t
      });
      return;
    }
    const i = this._config.on_datetime_entity;
    i && await this.hass.callService(i.split(".")[0], "set_datetime", {
      entity_id: i,
      datetime: t
    });
  }
  async _writeOffDatetime(t) {
    var r, n;
    if (((r = this._config) == null ? void 0 : r.use_companion) !== !1) {
      const o = (n = this._config) == null ? void 0 : n.companion_entity;
      if (!o) return;
      await this.hass.callService(Yr, "set_timer", {
        entity_id: o,
        off: t
      });
      return;
    }
    const i = this._config.off_datetime_entity;
    i && await this.hass.callService(i.split(".")[0], "set_datetime", {
      entity_id: i,
      datetime: t
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
    if (document.getElementById(qr)) return;
    const t = document.createElement("style");
    t.id = qr, t.textContent = `
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
    `, document.head.append(t);
  }
  openPortal() {
    if (this._portal) {
      this.renderPortalContent(), this.positionPortal();
      return;
    }
    this.ensurePortalStyles();
    const t = document.createElement("div");
    t.className = "pp-timer-portal-backdrop", t.addEventListener("click", () => this.handleCancelPick());
    const i = document.createElement("div");
    i.className = "pp-timer-portal", i.addEventListener("click", (r) => r.stopPropagation()), document.body.append(t), document.body.append(i), this._portalBackdrop = t, this._portal = i, this._portalScrollListener = () => this.positionPortal(), window.addEventListener("scroll", this._portalScrollListener, !0), window.addEventListener("resize", this._portalScrollListener), this.renderPortalContent(), this.positionPortal();
  }
  closePortal() {
    this._portal && (this._portal.remove(), this._portal = void 0), this._portalBackdrop && (this._portalBackdrop.remove(), this._portalBackdrop = void 0), this._portalScrollListener && (window.removeEventListener("scroll", this._portalScrollListener, !0), window.removeEventListener("resize", this._portalScrollListener), this._portalScrollListener = void 0);
  }
  renderPortalContent() {
    if (!this._portal) return;
    const t = R(this.hass);
    if (this._portal.replaceChildren(), this._confirmingCancel) {
      const u = document.createElement("div");
      u.className = "pp-label", u.textContent = p(t, "timer.cancel_title"), this._portal.append(u);
      const m = document.createElement("div");
      m.className = "pp-hint", m.textContent = p(t, "timer.cancel_hint"), this._portal.append(m);
      const w = document.createElement("div");
      w.className = "pp-actions";
      const f = document.createElement("button");
      f.type = "button", f.className = "pp-act cancel", f.textContent = p(t, "timer.keep_timer"), f.addEventListener("click", () => this.handleDismissConfirm()), w.append(f);
      const y = document.createElement("button");
      y.type = "button", y.className = "pp-act danger", y.textContent = p(t, "timer.cancel_timer"), y.addEventListener("click", () => {
        this.handleConfirmCancel();
      }), w.append(y), this._portal.append(w);
      return;
    }
    const i = this._pickingOn ? p(t, "timer.turn_on_at") : p(t, "timer.turn_off_at_optional"), r = this._pickingOff, n = this._pickingOn ? this.handleSetOn : this.handleSetOff, o = this.next7Days(), s = Array.from({ length: 24 }, (u, m) => m), a = document.createElement("div");
    a.className = "pp-label", a.textContent = i, this._portal.append(a);
    const l = document.createElement("div");
    l.className = "pp-days", o.forEach((u) => {
      const m = document.createElement("button");
      m.type = "button", m.className = `pp-day-btn ${u.day === this._pickDay ? "active" : ""}`, m.textContent = u.label, m.addEventListener("click", () => {
        this._pickDay = u.day, this.renderPortalContent();
      }), l.append(m);
    }), this._portal.append(l);
    const c = document.createElement("div");
    c.className = "pp-hours", s.forEach((u) => {
      const m = document.createElement("button");
      m.type = "button", m.className = `pp-hour-btn ${u === this._pickHour ? "active" : ""}`, m.textContent = String(u).padStart(2, "0"), m.addEventListener("click", () => {
        this._pickHour = u, this.renderPortalContent();
      }), c.append(m);
    }), this._portal.append(c);
    const d = document.createElement("div");
    d.className = "pp-actions";
    const h = document.createElement("button");
    if (h.type = "button", h.className = "pp-act cancel", h.textContent = p(t, "common.cancel"), h.addEventListener("click", () => this.handleCancelPick()), d.append(h), r) {
      const u = document.createElement("button");
      u.type = "button", u.className = "pp-act skip", u.textContent = p(t, "timer.only_on"), u.addEventListener("click", () => {
        this.handleSkipOff();
      }), d.append(u);
    }
    const _ = document.createElement("button");
    _.type = "button", _.className = "pp-act confirm", _.textContent = p(t, "common.set"), _.addEventListener("click", () => {
      n();
    }), d.append(_), this._portal.append(d);
  }
  positionPortal() {
    var u;
    const t = this._portal;
    if (!t) return;
    const i = (u = this.renderRoot) == null ? void 0 : u.querySelector("ha-card");
    if (!i) return;
    const r = i.getBoundingClientRect(), n = 8, o = 8;
    t.style.visibility = "hidden", t.style.left = "0", t.style.top = "0", t.style.width = `${Math.max(280, r.width)}px`;
    const s = t.offsetHeight, a = t.offsetWidth, l = window.innerHeight - r.bottom - n, c = r.top - n, d = l < s + o && c > l;
    let h = r.left;
    h = Math.max(n, Math.min(h, window.innerWidth - a - n));
    let _ = d ? r.top - o - s : r.bottom + o;
    _ = Math.max(n, Math.min(_, window.innerHeight - s - n)), t.style.left = `${Math.round(h)}px`, t.style.top = `${Math.round(_)}px`, t.style.visibility = "visible";
  }
  // --- Helpers ---
  isEditorPreview() {
    return this.preview || this.editMode;
  }
  isActive() {
    var t;
    return ((t = D(this.hass, this._activeEntityId)) == null ? void 0 : t.state) === "on";
  }
  switchIsOn() {
    var t;
    return ((t = D(this.hass, this._switchEntityId)) == null ? void 0 : t.state) === "on";
  }
  parseDatetime(t) {
    if (!t) return null;
    const i = D(this.hass, t);
    if (!i) return null;
    const r = i.attributes, n = r == null ? void 0 : r.year, o = r == null ? void 0 : r.month, s = r == null ? void 0 : r.day, a = r == null ? void 0 : r.hour, l = r == null ? void 0 : r.minute;
    if (typeof n == "number" && typeof o == "number" && typeof s == "number") {
      const d = new Date(n, o - 1, s, a ?? 0, l ?? 0, 0, 0);
      if (!isNaN(d.getTime())) return d;
    }
    const c = i.state;
    if (typeof c == "string" && c.length > 10 && c !== "unknown" && c !== "unavailable") {
      const d = new Date(c.replace(" ", "T"));
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  }
  formatDatetime(t) {
    const i = R(this.hass), r = yi(i, t.getDay()), n = String(t.getHours()).padStart(2, "0"), o = String(t.getMinutes()).padStart(2, "0");
    return `${r} ${n}:${o}`;
  }
  timeUntil(t) {
    const i = R(this.hass), r = t.getTime() - Date.now();
    if (r <= 0) return p(i, "timer.time_now");
    const n = Math.floor(r / 36e5), o = Math.floor(r % 36e5 / 6e4);
    if (n > 24) {
      const s = Math.floor(n / 24);
      return p(i, "timer.time_in_dh", { d: s, h: n % 24 });
    }
    return n > 0 ? p(i, "timer.time_in_hm", { h: n, m: o }) : p(i, "timer.time_in_m", { m: o });
  }
  next7Days() {
    const t = R(this.hass), i = [], r = /* @__PURE__ */ new Date();
    for (let n = 0; n < 7; n++) {
      const o = new Date(r);
      o.setDate(o.getDate() + n), o.setHours(0, 0, 0, 0);
      const s = n === 0 ? p(t, "common.today") : n === 1 ? p(t, "common.tomorrow") : yi(t, o.getDay());
      i.push({ day: n, label: s, date: o });
    }
    return i;
  }
  buildDatetime(t, i) {
    const r = /* @__PURE__ */ new Date();
    r.setDate(r.getDate() + t), r.setHours(i, 0, 0, 0);
    const n = r.getFullYear(), o = String(r.getMonth() + 1).padStart(2, "0"), s = String(r.getDate()).padStart(2, "0");
    return `${n}-${o}-${s} ${String(i).padStart(2, "0")}:00:00`;
  }
  async activateTimer() {
    const t = this._activeEntityId;
    t && await this.hass.callService(t.split(".")[0], "turn_on", {
      entity_id: t
    });
  }
  async cancelTimer() {
    const t = this._activeEntityId;
    t && await this.hass.callService(t.split(".")[0], "turn_off", {
      entity_id: t
    });
  }
  // --- Render ---
  buildSubtitle(t, i) {
    const r = R(this.hass), n = this._companionStateName();
    if (!t)
      return n ?? (i ? p(r, "common.on") : p(r, "common.off"));
    const o = this._getOnDatetime(), s = this._getOffDatetime(), a = [];
    o && a.push(p(r, "timer.subtitle_on", { time: this.formatDatetime(o) })), s && a.push(p(r, "timer.subtitle_off", { time: this.formatDatetime(s) }));
    const l = a.join(" → ");
    return n && l ? `${n} · ${l}` : n || l || p(r, "timer.timer_active");
  }
  render() {
    var c, d, h, _;
    const t = R(this.hass);
    if (!this._config) return E`<ha-card>${p(t, "common.invalid_config")}</ha-card>`;
    if (!this.hass) return E``;
    if (!this._activeEntityId) {
      const u = this._config.use_companion !== !1 ? p(t, "timer.placeholder_companion") : p(t, "timer.placeholder_manual");
      return E`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:timer-outline"></ha-icon>
            <div class="placeholder-text">${u}</div>
          </div>
        </ha-card>
      `;
    }
    const i = this._config, r = this.isActive(), n = this.switchIsOn(), o = Oe(n ? i.icon_color : "disabled"), s = ((d = (c = D(this.hass, this._switchEntityId)) == null ? void 0 : c.attributes) == null ? void 0 : d.friendly_name) ?? ((_ = (h = D(this.hass, this._activeEntityId)) == null ? void 0 : h.attributes) == null ? void 0 : _.friendly_name), a = i.subtitle || this.buildSubtitle(r, n), l = p(t, "timer.default_name");
    return E`
      <ha-card>
        <div class="container">
          <div class="state-item">
            <div class="icon-wrap">
              <div class="icon-shape" style=${M(o)}>
                <ha-icon .icon=${this._resolvedIcon()}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${i.name || s || l}</div>
              <div class="secondary">${a}</div>
            </div>
            ${r ? E`
                  <button type="button" class="action-btn active" @click=${this.handleBadgeClick} title=${p(t, "timer.cancel_timer")}>
                    <ha-icon icon="mdi:timer-sand"></ha-icon>
                    <span>${p(t, "common.active")}</span>
                  </button>
                ` : E`
                  <button type="button" class="action-btn set" @click=${this.handleOpenPicker} title=${p(t, "common.set")}>
                    <ha-icon icon="mdi:timer-plus-outline"></ha-icon>
                    <span>${p(t, "common.set")}</span>
                  </button>
                `}
          </div>
        </div>
      </ha-card>
    `;
  }
};
Ni.styles = xe`
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
let G = Ni;
re([
  A({ attribute: !1 })
], G.prototype, "hass");
re([
  A({ type: Boolean })
], G.prototype, "preview");
re([
  A({ type: Boolean })
], G.prototype, "editMode");
re([
  A({ reflect: !0, type: String })
], G.prototype, "layout");
re([
  k()
], G.prototype, "_config");
re([
  k()
], G.prototype, "_pickingOn");
re([
  k()
], G.prototype, "_pickingOff");
re([
  k()
], G.prototype, "_confirmingCancel");
re([
  k()
], G.prototype, "_pickDay");
re([
  k()
], G.prototype, "_pickHour");
class za extends G {
}
customElements.get("power-pilz-timer-card") || customElements.define("power-pilz-timer-card", G);
customElements.get("power-pilz-timer-card-v2") || customElements.define("power-pilz-timer-card-v2", za);
window.customCards = window.customCards || [];
const Ma = [
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
    type: "power-pilz-timer-card",
    name: "PowerPilz Timer Card",
    description: "Schedule a one-time future on/off action for any device within the next 7 days.",
    preview: !0
  }
];
for (const e of Ma)
  window.customCards.some((t) => t.type === e.type) || window.customCards.push(e);
console.info(
  `%cPOWER PILZ%c v${ue}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
//# sourceMappingURL=power-pilz.js.map
