/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yt = globalThis, kn = Yt.ShadowRoot && (Yt.ShadyCSS === void 0 || Yt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Tn = Symbol(), mr = /* @__PURE__ */ new WeakMap();
let Vo = class {
  constructor(e, i, n) {
    if (this._$cssResult$ = !0, n !== Tn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (kn && e === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (e = mr.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && mr.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const za = (t) => new Vo(typeof t == "string" ? t : t + "", void 0, Tn), Q = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((n, r, o) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[o + 1], t[0]);
  return new Vo(i, t, Tn);
}, Ma = (t, e) => {
  if (kn) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const n = document.createElement("style"), r = Yt.litNonce;
    r !== void 0 && n.setAttribute("nonce", r), n.textContent = i.cssText, t.appendChild(n);
  }
}, fr = kn ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const n of e.cssRules) i += n.cssText;
  return za(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Aa, defineProperty: Pa, getOwnPropertyDescriptor: Oa, getOwnPropertyNames: Ia, getOwnPropertySymbols: Ra, getPrototypeOf: Da } = Object, Pe = globalThis, yr = Pe.trustedTypes, Na = yr ? yr.emptyScript : "", zi = Pe.reactiveElementPolyfillSupport, wt = (t, e) => t, Jt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Na : null;
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
} }, zn = (t, e) => !Aa(t, e), gr = { attribute: !0, type: String, converter: Jt, reflect: !1, useDefault: !1, hasChanged: zn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Pe.litPropertyMetadata ?? (Pe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ot = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = gr) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const n = Symbol(), r = this.getPropertyDescriptor(e, n, i);
      r !== void 0 && Pa(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, i, n) {
    const { get: r, set: o } = Oa(this.prototype, e) ?? { get() {
      return this[i];
    }, set(s) {
      this[i] = s;
    } };
    return { get: r, set(s) {
      const a = r == null ? void 0 : r.call(this);
      o == null || o.call(this, s), this.requestUpdate(e, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? gr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(wt("elementProperties"))) return;
    const e = Da(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(wt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(wt("properties"))) {
      const i = this.properties, n = [...Ia(i), ...Ra(i)];
      for (const r of n) this.createProperty(r, i[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [n, r] of i) this.elementProperties.set(n, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const r = this._$Eu(i, n);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const r of n) i.unshift(fr(r));
    } else e !== void 0 && i.push(fr(e));
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
    return Ma(e, this.constructor.elementStyles), e;
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
    var o;
    const n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
    if (r !== void 0 && n.reflect === !0) {
      const s = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : Jt).toAttribute(i, n.type);
      this._$Em = e, s == null ? this.removeAttribute(r) : this.setAttribute(r, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var o, s;
    const n = this.constructor, r = n._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const a = n.getPropertyOptions(r), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : Jt;
      this._$Em = r;
      const c = l.fromAttribute(i, a.type);
      this[r] = c ?? ((s = this._$Ej) == null ? void 0 : s.get(r)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, i, n, r = !1, o) {
    var s;
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (o = this[e]), n ?? (n = a.getPropertyOptions(e)), !((n.hasChanged ?? zn)(o, i) || n.useDefault && n.reflect && o === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(a._$Eu(e, n)))) return;
      this.C(e, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: n, reflect: r, wrapped: o }, s) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? i ?? this[e]), o !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (i = void 0), this._$AL.set(e, i)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, s] of r) {
        const { wrapped: a } = s, l = this[o];
        a !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, s, l);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (n = this._$EO) == null || n.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(i)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$EO) == null || i.forEach((n) => {
      var r;
      return (r = n.hostUpdated) == null ? void 0 : r.call(n);
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
ot.elementStyles = [], ot.shadowRootOptions = { mode: "open" }, ot[wt("elementProperties")] = /* @__PURE__ */ new Map(), ot[wt("finalized")] = /* @__PURE__ */ new Map(), zi == null || zi({ ReactiveElement: ot }), (Pe.reactiveElementVersions ?? (Pe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = globalThis, br = (t) => t, Qt = xt.trustedTypes, vr = Qt ? Qt.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Uo = "$lit$", Me = `lit$${Math.random().toFixed(9).slice(2)}$`, Wo = "?" + Me, La = `<${Wo}>`, Ke = document, Et = () => Ke.createComment(""), Ct = (t) => t === null || typeof t != "object" && typeof t != "function", Mn = Array.isArray, Ha = (t) => Mn(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Mi = `[ 	
\f\r]`, pt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, wr = /-->/g, xr = />/g, Le = RegExp(`>|${Mi}(?:([^\\s"'>=/]+)(${Mi}*=${Mi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Sr = /'/g, Er = /"/g, jo = /^(?:script|style|textarea|title)$/i, Ko = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), v = Ko(1), Ae = Ko(2), Ge = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), Cr = /* @__PURE__ */ new WeakMap(), We = Ke.createTreeWalker(Ke, 129);
function Go(t, e) {
  if (!Mn(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return vr !== void 0 ? vr.createHTML(e) : e;
}
const Ba = (t, e) => {
  const i = t.length - 1, n = [];
  let r, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = pt;
  for (let a = 0; a < i; a++) {
    const l = t[a];
    let c, h, d = -1, u = 0;
    for (; u < l.length && (s.lastIndex = u, h = s.exec(l), h !== null); ) u = s.lastIndex, s === pt ? h[1] === "!--" ? s = wr : h[1] !== void 0 ? s = xr : h[2] !== void 0 ? (jo.test(h[2]) && (r = RegExp("</" + h[2], "g")), s = Le) : h[3] !== void 0 && (s = Le) : s === Le ? h[0] === ">" ? (s = r ?? pt, d = -1) : h[1] === void 0 ? d = -2 : (d = s.lastIndex - h[2].length, c = h[1], s = h[3] === void 0 ? Le : h[3] === '"' ? Er : Sr) : s === Er || s === Sr ? s = Le : s === wr || s === xr ? s = pt : (s = Le, r = void 0);
    const _ = s === Le && t[a + 1].startsWith("/>") ? " " : "";
    o += s === pt ? l + La : d >= 0 ? (n.push(c), l.slice(0, d) + Uo + l.slice(d) + Me + _) : l + Me + (d === -2 ? a : _);
  }
  return [Go(t, o + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class $t {
  constructor({ strings: e, _$litType$: i }, n) {
    let r;
    this.parts = [];
    let o = 0, s = 0;
    const a = e.length - 1, l = this.parts, [c, h] = Ba(e, i);
    if (this.el = $t.createElement(c, n), We.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = We.nextNode()) !== null && l.length < a; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(Uo)) {
          const u = h[s++], _ = r.getAttribute(d).split(Me), p = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: o, name: p[2], strings: _, ctor: p[1] === "." ? Va : p[1] === "?" ? Ua : p[1] === "@" ? Wa : di }), r.removeAttribute(d);
        } else d.startsWith(Me) && (l.push({ type: 6, index: o }), r.removeAttribute(d));
        if (jo.test(r.tagName)) {
          const d = r.textContent.split(Me), u = d.length - 1;
          if (u > 0) {
            r.textContent = Qt ? Qt.emptyScript : "";
            for (let _ = 0; _ < u; _++) r.append(d[_], Et()), We.nextNode(), l.push({ type: 2, index: ++o });
            r.append(d[u], Et());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Wo) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(Me, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += Me.length - 1;
      }
      o++;
    }
  }
  static createElement(e, i) {
    const n = Ke.createElement("template");
    return n.innerHTML = e, n;
  }
}
function st(t, e, i = t, n) {
  var s, a;
  if (e === Ge) return e;
  let r = n !== void 0 ? (s = i._$Co) == null ? void 0 : s[n] : i._$Cl;
  const o = Ct(e) ? void 0 : e._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((a = r == null ? void 0 : r._$AO) == null || a.call(r, !1), o === void 0 ? r = void 0 : (r = new o(t), r._$AT(t, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = r : i._$Cl = r), r !== void 0 && (e = st(t, r._$AS(t, e.values), r, n)), e;
}
class Fa {
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
    const { el: { content: i }, parts: n } = this._$AD, r = ((e == null ? void 0 : e.creationScope) ?? Ke).importNode(i, !0);
    We.currentNode = r;
    let o = We.nextNode(), s = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new Tt(o, o.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, e) : l.type === 6 && (c = new ja(o, this, e)), this._$AV.push(c), l = n[++a];
      }
      s !== (l == null ? void 0 : l.index) && (o = We.nextNode(), s++);
    }
    return We.currentNode = Ke, r;
  }
  p(e) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, i), i += n.strings.length - 2) : n._$AI(e[i])), i++;
  }
}
class Tt {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, n, r) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = n, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
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
    e = st(this, e, i), Ct(e) ? e === $ || e == null || e === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : e !== this._$AH && e !== Ge && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ha(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== $ && Ct(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Ke.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: i, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = $t.createElement(Go(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(i);
    else {
      const s = new Fa(r, this), a = s.u(this.options);
      s.p(i), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Cr.get(e.strings);
    return i === void 0 && Cr.set(e.strings, i = new $t(e)), i;
  }
  k(e) {
    Mn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, r = 0;
    for (const o of e) r === i.length ? i.push(n = new Tt(this.O(Et()), this.O(Et()), this, this.options)) : n = i[r], n._$AI(o), r++;
    r < i.length && (this._$AR(n && n._$AB.nextSibling, r), i.length = r);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); e !== this._$AB; ) {
      const r = br(e).nextSibling;
      br(e).remove(), e = r;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class di {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, n, r, o) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = $;
  }
  _$AI(e, i = this, n, r) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) e = st(this, e, i, 0), s = !Ct(e) || e !== this._$AH && e !== Ge, s && (this._$AH = e);
    else {
      const a = e;
      let l, c;
      for (e = o[0], l = 0; l < o.length - 1; l++) c = st(this, a[n + l], i, l), c === Ge && (c = this._$AH[l]), s || (s = !Ct(c) || c !== this._$AH[l]), c === $ ? e = $ : e !== $ && (e += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    s && !r && this.j(e);
  }
  j(e) {
    e === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Va extends di {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === $ ? void 0 : e;
  }
}
class Ua extends di {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== $);
  }
}
class Wa extends di {
  constructor(e, i, n, r, o) {
    super(e, i, n, r, o), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = st(this, e, i, 0) ?? $) === Ge) return;
    const n = this._$AH, r = e === $ && n !== $ || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, o = e !== $ && (n === $ || r);
    r && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ja {
  constructor(e, i, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    st(this, e);
  }
}
const Ai = xt.litHtmlPolyfillSupport;
Ai == null || Ai($t, Tt), (xt.litHtmlVersions ?? (xt.litHtmlVersions = [])).push("3.3.2");
const Ka = (t, e, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? e;
  let r = n._$litPart$;
  if (r === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = r = new Tt(e.insertBefore(Et(), o), o, void 0, i ?? {});
  }
  return r._$AI(t), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const je = globalThis;
let D = class extends ot {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ka(i, this.renderRoot, this.renderOptions);
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
    return Ge;
  }
};
var Fo;
D._$litElement$ = !0, D.finalized = !0, (Fo = je.litElementHydrateSupport) == null || Fo.call(je, { LitElement: D });
const Pi = je.litElementPolyfillSupport;
Pi == null || Pi({ LitElement: D });
(je.litElementVersions ?? (je.litElementVersions = [])).push("4.2.2");
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
const Ga = { attribute: !0, type: String, converter: Jt, reflect: !1, hasChanged: zn }, Ya = (t = Ga, e, i) => {
  const { kind: n, metadata: r } = i;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), n === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(i.name, t), n === "accessor") {
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
function O(t) {
  return (e, i) => typeof i == "object" ? Ya(t, e, i) : ((n, r, o) => {
    const s = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, n), s ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function T(t) {
  return O({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qa = { ATTRIBUTE: 1 }, Xa = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Za = class {
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
const Yo = "important", Ja = " !" + Yo, A = Xa(class extends Za {
  constructor(t) {
    var e;
    if (super(t), t.type !== qa.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
      const r = e[n];
      if (r != null) {
        this.ft.add(n);
        const o = typeof r == "string" && r.endsWith(Ja);
        n.includes("-") || o ? i.setProperty(n, o ? r.slice(0, -11) : r, o ? Yo : "") : i[n] = r;
      }
    }
    return Ge;
  }
}), L = (t, e) => {
  if (e)
    return t.states[e];
}, V = (t, e) => {
  const i = L(t, e);
  if (!i)
    return null;
  const n = Number(i.state);
  return Number.isFinite(n) ? n : null;
}, W = (t, e) => {
  const i = L(t, e);
  if (!i)
    return;
  const n = i.attributes.unit_of_measurement;
  return typeof n == "string" ? n : void 0;
}, qt = (t, e) => {
  const i = L(t, e);
  return i == null ? void 0 : i.state;
}, J = (t, e = "hybrid") => t === "history" || t === "statistics" || t === "hybrid" ? t : t === "auto" || e === "auto" ? "hybrid" : e, qo = 3e4, Qa = 10 * 6e4, el = 1440, tl = 1e4, il = 2e3, Xo = 40, hi = /* @__PURE__ */ new Map(), Oi = /* @__PURE__ */ new Map(), Ii = /* @__PURE__ */ new Map(), $r = /* @__PURE__ */ new WeakMap(), kr = /* @__PURE__ */ new WeakMap(), Tr = /* @__PURE__ */ new WeakMap(), zr = /* @__PURE__ */ new WeakMap(), An = (t, e = el) => {
  if (t.length <= e)
    return t;
  if (e <= 2)
    return [t[0], t[t.length - 1]];
  const i = t.slice(1, -1), n = Math.max(1, Math.floor((e - 2) / 2)), r = i.length / n, o = [t[0]];
  for (let l = 0; l < n; l += 1) {
    const c = Math.floor(l * r), h = Math.max(c + 1, Math.floor((l + 1) * r)), d = i.slice(c, h);
    if (d.length === 0)
      continue;
    let u = d[0], _ = d[0];
    for (const p of d)
      p.value < u.value && (u = p), p.value > _.value && (_ = p);
    if (u.ts <= _.ts ? (o.push(u), _ !== u && o.push(_)) : (o.push(_), u !== _ && o.push(u)), o.length >= e - 1)
      break;
  }
  if (o.push(t[t.length - 1]), o.length <= e)
    return o;
  const s = [o[0]], a = (o.length - 2) / (e - 2);
  for (let l = 0; l < e - 2; l += 1) {
    const c = 1 + Math.floor(l * a);
    s.push(o[c]);
  }
  return s.push(o[o.length - 1]), s;
}, Zo = (t, e) => {
  const i = e ? tl : il;
  return !Number.isFinite(t) || t <= 0 || i <= 1 ? Math.max(0, Math.floor(t)) : Math.max(0, Math.floor(t / i) * i);
}, nl = (t) => {
  const e = (n) => {
    if (typeof n == "string") {
      const r = Date.parse(n);
      return Number.isFinite(r) ? r : null;
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
    const r = e(n);
    if (r !== null)
      return r;
  }
  return null;
}, ei = (t, e, i) => {
  const n = [...t, ...e].filter((o) => Number.isFinite(o.ts) && Number.isFinite(o.value) && o.ts >= i).sort((o, s) => o.ts - s.ts);
  if (n.length <= 1)
    return n;
  const r = [];
  return n.forEach((o) => {
    const s = r[r.length - 1];
    if (s && Math.abs(s.ts - o.ts) <= 0.5) {
      r[r.length - 1] = o;
      return;
    }
    r.push(o);
  }), An(r);
}, rl = (t, e, i = Date.now()) => {
  if (!Array.isArray(t))
    return { entityId: null, points: [] };
  const n = [];
  let r = null;
  for (const a of t) {
    if (!a || typeof a != "object")
      continue;
    const l = a;
    r === null && typeof l.entity_id == "string" && l.entity_id.length > 0 && (r = l.entity_id);
    const c = Number(l.state), h = nl(l);
    !Number.isFinite(c) || h === null || n.push({ ts: h, value: c });
  }
  const o = i - e, s = n.filter((a) => a.ts >= o).sort((a, l) => a.ts - l.ts);
  return {
    entityId: r,
    points: An(s)
  };
}, ui = (t, e, i) => `${t}|${e}|${i}`, ie = (t) => t.map((e) => ({ ts: e.ts, value: e.value })), Ri = (t) => {
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
}, ol = (t) => Ri(t.start) ?? Ri(t.end) ?? Ri(t.last_reset), sl = (t) => {
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
}, al = (t, e, i = Date.now()) => {
  if (!Array.isArray(t))
    return [];
  const n = [];
  t.forEach((s) => {
    if (!s || typeof s != "object")
      return;
    const a = s, l = ol(a), c = sl(a);
    l === null || c === null || n.push({ ts: l, value: c });
  });
  const r = i - e, o = n.filter((s) => s.ts >= r).sort((s, a) => s.ts - a.ts);
  return An(o);
}, Jo = (t) => {
  const e = zr.get(t);
  if (e)
    return e;
  const i = /* @__PURE__ */ new Map();
  return zr.set(t, i), i;
}, Qo = (t, e, i) => {
  const n = Jo(t), r = n.get(e);
  return r ? r.expiresAt <= i ? (n.delete(e), null) : r.supported : null;
}, Mr = (t, e, i, n) => {
  Jo(t).set(e, {
    supported: i,
    expiresAt: n + Qa
  });
}, ll = (t) => {
  const e = $r.get(t);
  if (e)
    return e;
  const i = /* @__PURE__ */ new Map();
  return $r.set(t, i), i;
}, es = async (t, e, i, n, r, o) => {
  const s = new Date(n).toISOString(), a = e.join(","), l = `history/period/${s}?filter_entity_id=${encodeURIComponent(a)}&minimal_response&no_attributes`;
  let c;
  try {
    c = await t("GET", l);
  } catch {
    const u = {};
    return e.forEach((_) => {
      u[_] = [];
    }), u;
  }
  const h = Array.isArray(c) ? c : [], d = {};
  return h.forEach((u, _) => {
    const p = rl(u, i, r), y = e[_], f = p.entityId ?? y;
    f && (d[f] = p.points);
  }), e.forEach((u) => {
    u in d || (d[u] = []), o && hi.set(ui("history", u, i), {
      expiresAt: r + qo,
      points: ie(d[u])
    });
  }), d;
}, cl = (t, e, i, n, r) => {
  const o = ll(t);
  let s = o.get(e);
  return s || (s = {
    entityIds: /* @__PURE__ */ new Set(),
    waiters: []
  }, o.set(e, s)), i.forEach((a) => s == null ? void 0 : s.entityIds.add(a)), new Promise((a, l) => {
    s == null || s.waiters.push({ entityIds: [...i], resolve: a, reject: l }), (s == null ? void 0 : s.flushTimer) === void 0 && (s.flushTimer = setTimeout(async () => {
      const c = o.get(e);
      if (!c)
        return;
      o.delete(e);
      const h = Array.from(c.entityIds);
      try {
        const d = await es(
          t,
          h,
          n,
          r,
          Date.now(),
          !0
        );
        c.waiters.forEach((u) => {
          const _ = {};
          u.entityIds.forEach((p) => {
            _[p] = ie(d[p] ?? []);
          }), u.resolve(_);
        });
      } catch (d) {
        c.waiters.forEach((u) => u.reject(d));
      }
    }, Xo));
  });
}, dl = (t) => {
  const e = kr.get(t);
  if (e)
    return e;
  const i = /* @__PURE__ */ new Map();
  return kr.set(t, i), i;
}, hl = async (t, e, i, n) => {
  const r = [...n], o = new Date(e).toISOString(), s = new Date(i).toISOString(), a = Tr.get(t), l = a ? [a] : ["recorder/statistics_during_period", "history/statistics_during_period"];
  let c;
  for (const h of l)
    try {
      const d = await t({
        type: h,
        start_time: o,
        end_time: s,
        statistic_ids: r,
        period: "5minute",
        types: ["state", "mean", "sum"]
      });
      return Tr.set(t, h), d;
    } catch (d) {
      c = d;
    }
  throw c;
}, ul = async (t, e) => {
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
    return i.forEach((r) => {
      if (!r || typeof r != "object")
        return;
      const o = r.statistic_id;
      typeof o == "string" && o.length > 0 && n.add(o);
    }), n;
  } catch {
    return null;
  }
}, ts = async (t, e, i, n, r, o) => {
  let s;
  try {
    s = await hl(t, n, r, e);
  } catch {
    const _ = new Set(e), p = {};
    return e.forEach((y) => {
      p[y] = [];
    }), {
      pointsByEntity: p,
      unsupportedEntityIds: _
    };
  }
  const a = s && typeof s == "object" && !Array.isArray(s) ? s : {}, l = {}, c = /* @__PURE__ */ new Set(), h = [];
  e.forEach((_) => {
    if (!Object.prototype.hasOwnProperty.call(a, _)) {
      l[_] = [], h.push(_);
      return;
    }
    const p = al(a[_], i, r);
    l[_] = p, Mr(t, _, !0, r), o && hi.set(ui("statistics", _, i), {
      expiresAt: r + qo,
      points: ie(p)
    });
  });
  const d = [];
  h.forEach((_) => {
    const p = Qo(t, _, r);
    if (p !== !0) {
      if (p === !1) {
        c.add(_);
        return;
      }
      d.push(_);
    }
  });
  const u = await ul(t, d);
  return u !== null ? d.forEach((_) => {
    const p = u.has(_);
    Mr(t, _, p, r), p || c.add(_);
  }) : d.forEach((_) => {
    c.add(_);
  }), {
    pointsByEntity: l,
    unsupportedEntityIds: c
  };
}, pl = (t, e, i, n, r) => {
  const o = dl(t);
  let s = o.get(e);
  return s || (s = {
    entityIds: /* @__PURE__ */ new Set(),
    waiters: []
  }, o.set(e, s)), i.forEach((a) => s == null ? void 0 : s.entityIds.add(a)), new Promise((a, l) => {
    s == null || s.waiters.push({ entityIds: [...i], resolve: a, reject: l }), (s == null ? void 0 : s.flushTimer) === void 0 && (s.flushTimer = setTimeout(async () => {
      const c = o.get(e);
      if (!c)
        return;
      o.delete(e);
      const h = Array.from(c.entityIds);
      try {
        const d = await ts(
          t,
          h,
          n,
          r,
          Date.now(),
          !0
        );
        c.waiters.forEach((u) => {
          const _ = {
            pointsByEntity: {},
            unsupportedEntityIds: /* @__PURE__ */ new Set()
          };
          u.entityIds.forEach((p) => {
            _.pointsByEntity[p] = ie(d.pointsByEntity[p] ?? []), d.unsupportedEntityIds.has(p) && _.unsupportedEntityIds.add(p);
          }), u.resolve(_);
        });
      } catch (d) {
        c.waiters.forEach((u) => u.reject(d));
      }
    }, Xo));
  });
}, is = async (t, e, i, n) => {
  const r = t.callApi, o = Array.from(new Set(e.filter((f) => f.length > 0)));
  if (!r || o.length === 0)
    return {};
  const s = Date.now(), a = typeof n == "number" && Number.isFinite(n) ? Math.max(s - i, Math.floor(n)) : s - i, l = a <= s - i + 1e3, c = Zo(a, l), h = {}, d = [];
  if (o.forEach((f) => {
    if (l) {
      const g = ui("history", f, i), x = hi.get(g);
      if (x && x.expiresAt > s) {
        h[f] = ie(x.points);
        return;
      }
    }
    d.push(f);
  }), d.length === 0)
    return h;
  if (l) {
    const f = `${c}|${i}`, g = await cl(
      r,
      f,
      d,
      i,
      c
    );
    return d.forEach((x) => {
      h[x] = ie(g[x] ?? []);
    }), h;
  }
  const u = [...d].sort(), _ = `${c}|${i}|${u.join(",")}`, p = Oi.get(_);
  if (p) {
    const f = await p;
    return d.forEach((g) => {
      h[g] = ie(f[g] ?? []);
    }), h;
  }
  const y = (async () => es(
    r,
    d,
    i,
    c,
    s,
    l
  ))();
  Oi.set(_, y);
  try {
    const f = await y;
    return d.forEach((g) => {
      h[g] = ie(f[g] ?? []);
    }), h;
  } finally {
    Oi.delete(_);
  }
}, ns = async (t, e, i, n) => {
  const r = t.callWS, o = Array.from(new Set(e.filter((x) => x.length > 0)));
  if (!r || o.length === 0)
    return {
      pointsByEntity: {},
      unsupportedEntityIds: new Set(o)
    };
  const s = Date.now(), a = typeof n == "number" && Number.isFinite(n) ? Math.max(s - i, Math.floor(n)) : s - i, l = a <= s - i + 1e3, c = Zo(a, l), h = {}, d = [], u = /* @__PURE__ */ new Set();
  if (o.forEach((x) => {
    if (Qo(r, x, s) === !1) {
      h[x] = [], u.add(x);
      return;
    }
    if (l) {
      const C = ui("statistics", x, i), w = hi.get(C);
      if (w && w.expiresAt > s) {
        h[x] = ie(w.points);
        return;
      }
    }
    d.push(x);
  }), d.length === 0)
    return {
      pointsByEntity: h,
      unsupportedEntityIds: u
    };
  const _ = (x) => (d.forEach((E) => {
    h[E] = ie(x.pointsByEntity[E] ?? []), x.unsupportedEntityIds.has(E) && u.add(E);
  }), {
    pointsByEntity: h,
    unsupportedEntityIds: u
  });
  if (l) {
    const x = `${c}|${i}`, E = await pl(
      r,
      x,
      d,
      i,
      c
    );
    return _(E);
  }
  const p = [...d].sort(), y = `${c}|${i}|${p.join(",")}`, f = Ii.get(y);
  if (f) {
    const x = await f;
    return _(x);
  }
  const g = (async () => ts(
    r,
    d,
    i,
    c,
    s,
    l
  ))();
  Ii.set(y, g);
  try {
    const x = await g;
    return _(x);
  } finally {
    Ii.delete(y);
  }
}, _l = async (t, e, i, n) => {
  const r = await ns(
    t,
    e,
    i,
    n
  ), o = {};
  e.forEach((l) => {
    l.length !== 0 && (o[l] = ie(r.pointsByEntity[l] ?? []));
  });
  const s = Array.from(r.unsupportedEntityIds).filter((l) => l.length > 0);
  if (s.length === 0)
    return o;
  const a = await is(
    t,
    s,
    i,
    n
  );
  return s.forEach((l) => {
    o[l] = ie(a[l] ?? []);
  }), o;
}, Ie = async (t, e, i, n) => {
  const r = J(n == null ? void 0 : n.dataSource, "hybrid");
  return r === "history" ? is(t, e, i, n == null ? void 0 : n.startMs) : r === "statistics" ? (await ns(
    t,
    e,
    i,
    n == null ? void 0 : n.startMs
  )).pointsByEntity : _l(t, e, i, n == null ? void 0 : n.startMs);
}, Ar = {
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
}, ue = (t) => {
  if (Array.isArray(t) && t.length >= 3) {
    const r = t.slice(0, 3).map((o) => Number(o));
    if (r.every((o) => Number.isFinite(o))) {
      const [o, s, a] = r.map((l) => Math.max(0, Math.min(255, Math.round(l))));
      return `${o}, ${s}, ${a}`;
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
  if (e in Ar)
    return `var(--rgb-${e}, ${Ar[e]})`;
  const i = /^#([a-fA-F0-9]{3})$/, n = /^#([a-fA-F0-9]{6})$/;
  if (i.test(e)) {
    const [, r] = e.match(i) ?? [];
    if (!r)
      return null;
    const o = parseInt(r[0] + r[0], 16), s = parseInt(r[1] + r[1], 16), a = parseInt(r[2] + r[2], 16);
    return `${o}, ${s}, ${a}`;
  }
  if (n.test(e)) {
    const [, r] = e.match(n) ?? [];
    if (!r)
      return null;
    const o = parseInt(r.slice(0, 2), 16), s = parseInt(r.slice(2, 4), 16), a = parseInt(r.slice(4, 6), 16);
    return `${o}, ${s}, ${a}`;
  }
  return null;
}, pe = (t, e = "") => {
  const i = ue(t);
  if (i)
    return `rgb(${i})`;
  if (typeof t == "string" && t.trim().length > 0) {
    const n = t.trim(), r = n.toLowerCase();
    if (r !== "none" && r !== "default")
      return n;
  }
  return e;
}, xe = (t) => {
  const e = ue(t);
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
}, Pn = (t, e, i) => {
  const n = t.map((r) => ({
    x: r.x / 100 * e,
    y: r.y / 100 * i,
    value: r.value,
    ts: r.ts
  }));
  return ml(n, e);
}, ml = (t, e) => {
  if (t.length <= 3)
    return t;
  const i = Math.max(24, Math.min(t.length, Math.round(e)));
  if (t.length <= i)
    return Pr(t);
  const n = [];
  n.push(t[0]);
  const r = (t.length - 1) / (i - 1);
  for (let o = 1; o < i - 1; o += 1) {
    const s = Math.floor(o * r), a = Math.max(s + 1, Math.floor((o + 1) * r)), l = t.slice(s, Math.min(t.length, a));
    if (l.length === 0)
      continue;
    const c = l.reduce(
      (d, u) => (d.x += u.x, d.y += u.y, d.value += u.value, d.ts += u.ts, d),
      { x: 0, y: 0, value: 0, ts: 0 }
    ), h = l.length;
    n.push({
      x: c.x / h,
      y: c.y / h,
      value: c.value / h,
      ts: c.ts / h
    });
  }
  return n.push(t[t.length - 1]), Pr(n);
}, Pr = (t) => {
  if (t.length <= 3)
    return t;
  const e = [t[0]];
  for (let i = 1; i < t.length - 1; i += 1) {
    const n = t[i - 1], r = t[i], o = t[i + 1];
    e.push({
      x: r.x,
      y: (n.y + r.y * 2 + o.y) / 4,
      value: (n.value + r.value * 2 + o.value) / 4,
      ts: r.ts
    });
  }
  return e.push(t[t.length - 1]), e;
}, Or = {
  "": 0,
  k: 1,
  m: -1,
  M: 2,
  G: 3,
  T: 4
}, Gi = ["", "k", "M", "G", "T"], me = (t, e) => {
  const i = typeof t == "number" && Number.isFinite(t) ? Math.round(t) : e;
  return Math.max(0, Math.min(4, i));
}, Z = (t) => {
  if (!t)
    return null;
  const e = t.trim();
  if (e.length === 0)
    return null;
  if (e.endsWith("Wh")) {
    const i = e.slice(0, -2), r = Or[i === "K" ? "k" : i];
    return r === void 0 ? null : {
      family: "energy",
      prefixPower: r,
      factor: Math.pow(1e3, r),
      canonicalUnit: "Wh"
    };
  }
  if (e.endsWith("W")) {
    const i = e.slice(0, -1), r = Or[i === "K" ? "k" : i];
    return r === void 0 ? null : {
      family: "power",
      prefixPower: r,
      factor: Math.pow(1e3, r),
      canonicalUnit: "W"
    };
  }
  return null;
}, fl = (t, e) => {
  const i = Math.max(0, Math.min(Gi.length - 1, e)), n = Gi[i] ?? "";
  return t === "energy" ? `${n}Wh` : `${n}W`;
}, yl = (t) => {
  if (!Number.isFinite(t) || t <= 0)
    return 0;
  let e = 0, i = t;
  for (; i >= 1e3 && e < Gi.length - 1; )
    i /= 1e3, e += 1;
  return e;
}, kt = (t, e, i, n) => {
  const r = n.nullWithUnit === !0;
  if (t === null)
    return r && e ? `-- ${e}` : "--";
  const o = Z(e);
  if (!n.enabled || !o)
    return `${t.toFixed(i)} ${e}`.trim();
  const s = t < 0 ? "-" : "", a = Math.abs(t) * o.factor, l = yl(a), c = fl(o.family, l), h = a / Math.pow(1e3, l), d = l === 0 ? n.baseDecimals : n.prefixedDecimals;
  return `${s}${h.toFixed(d)} ${c}`.trim();
}, gl = (t) => {
  const e = Object.keys(t), i = {};
  if (e.length === 0)
    return {
      comparable: !1,
      family: null,
      canonicalUnit: null,
      factors: i
    };
  let n = null, r = null;
  for (const o of e) {
    const s = Z(t[o]);
    if (!s)
      return {
        comparable: !1,
        family: null,
        canonicalUnit: null,
        factors: i
      };
    if (n === null)
      n = s.family, r = s.canonicalUnit;
    else if (n !== s.family)
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
    family: n,
    canonicalUnit: r,
    factors: i
  };
}, bl = 500, vl = 250, wl = 1e3, at = (t, e, i) => {
  let n, r, o, s = !1, a = !1;
  const l = t.style.touchAction;
  t.style.touchAction = "manipulation";
  const c = () => {
    n !== void 0 && (clearTimeout(n), n = void 0);
  }, h = () => {
    r !== void 0 && (clearTimeout(r), r = void 0);
  }, d = (f) => {
    f.button === 0 && (i.stopPropagation && f.stopPropagation(), s = !1, h(), i.hasHold && (c(), n = setTimeout(() => {
      s = !0, n = void 0, e.onHold(), r = setTimeout(() => {
        s = !1, r = void 0;
      }, wl);
    }, bl)));
  }, u = () => {
    c();
  }, _ = () => {
    c(), s || (s = !1);
  }, p = (f) => {
    if (i.stopPropagation && f.stopPropagation(), s) {
      s = !1, h(), f.stopPropagation();
      return;
    }
    i.hasDoubleTap ? a ? (a = !1, o !== void 0 && (clearTimeout(o), o = void 0), e.onDoubleTap()) : (a = !0, o = setTimeout(() => {
      a = !1, o = void 0, e.onTap();
    }, vl)) : e.onTap();
  }, y = (f) => {
    (s || n !== void 0) && f.preventDefault();
  };
  return t.addEventListener("pointerdown", d, { passive: !0 }), t.addEventListener("pointerup", u, { passive: !0 }), t.addEventListener("pointercancel", _, { passive: !0 }), t.addEventListener("pointerleave", _, { passive: !0 }), t.addEventListener("click", p), t.addEventListener("contextmenu", y), {
    destroy: () => {
      c(), h(), o !== void 0 && clearTimeout(o), t.removeEventListener("pointerdown", d), t.removeEventListener("pointerup", u), t.removeEventListener("pointercancel", _), t.removeEventListener("pointerleave", _), t.removeEventListener("click", p), t.removeEventListener("contextmenu", y), t.style.touchAction = l;
    }
  };
}, lt = (t) => {
  const e = t.getContext("2d");
  if (!e)
    return null;
  const i = t.offsetWidth || t.getBoundingClientRect().width, n = t.offsetHeight || t.getBoundingClientRect().height, r = Math.max(1, Math.round(i)), o = Math.max(1, Math.round(n)), s = Math.max(1, window.devicePixelRatio || 1), a = Math.max(1, Math.round(r * s)), l = Math.max(1, Math.round(o * s));
  return (t.width !== a || t.height !== l) && (t.width = a, t.height = l), e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, t.width, t.height), e.setTransform(s, 0, 0, s, 0, 0), { ctx: e, width: r, height: o };
}, we = (t, e) => {
  const i = document.createElement("span");
  i.style.position = "absolute", i.style.opacity = "0", i.style.pointerEvents = "none", i.style.color = e, t.appendChild(i);
  const n = getComputedStyle(i).color;
  return i.remove(), n || "rgb(158, 158, 158)";
}, xl = (t, e) => {
  const i = t.trim(), n = i.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (n) {
    const c = n.slice(1, 4).map((h) => Math.max(0, Math.min(255, Math.round(Number(h)))));
    if (c.every((h) => Number.isFinite(h)))
      return [c[0], c[1], c[2]];
  }
  let r = e == null ? void 0 : e.ctx;
  if (r === void 0 && (r = document.createElement("canvas").getContext("2d"), e && (e.ctx = r)), !r) return null;
  r.fillStyle = "#000000", r.fillStyle = i;
  const o = r.fillStyle, a = (typeof o == "string" ? o.trim() : "").match(/^#([a-f\d]{6})$/i);
  if (!a) return null;
  const l = a[1];
  return [
    parseInt(l.slice(0, 2), 16),
    parseInt(l.slice(2, 4), 16),
    parseInt(l.slice(4, 6), 16)
  ];
}, ct = (t, e, i) => {
  const n = xl(t, i);
  if (!n) return t;
  const r = Math.max(0, Math.min(1, e));
  return `rgba(${n[0]}, ${n[1]}, ${n[2]}, ${r})`;
}, ti = (t, e, i, n) => {
  if (!(e.length < 2)) {
    t.beginPath(), t.moveTo(e[0].x, e[0].y);
    for (let r = 1; r < e.length; r += 1)
      t.lineTo(e[r].x, e[r].y);
    t.strokeStyle = i, t.lineWidth = n, t.lineCap = "round", t.lineJoin = "round", t.stroke();
  }
}, Yi = (t, e, i, n, r = 0.24, o = 0, s) => {
  if (e.length < 2) return;
  const a = e[0], l = e[e.length - 1];
  let c = e[0].y;
  for (let d = 1; d < e.length; d += 1)
    e[d].y < c && (c = e[d].y);
  const h = t.createLinearGradient(0, c, 0, n);
  h.addColorStop(0, ct(i, r, s)), h.addColorStop(1, ct(i, o, s)), t.beginPath(), t.moveTo(a.x, a.y);
  for (let d = 1; d < e.length; d += 1)
    t.lineTo(e[d].x, e[d].y);
  t.lineTo(l.x, n), t.lineTo(a.x, n), t.closePath(), t.fillStyle = h, t.fill();
}, Sl = (t, e, i, n) => {
  if (!(e.length < 2 || i.length < 2)) {
    t.beginPath(), t.moveTo(e[0].x, e[0].y);
    for (let r = 1; r < e.length; r += 1)
      t.lineTo(e[r].x, e[r].y);
    for (let r = i.length - 1; r >= 0; r -= 1)
      t.lineTo(i[r].x, i[r].y);
    t.closePath(), t.fillStyle = n, t.fill();
  }
}, Ir = (t) => {
  if (!Number.isFinite(t) || t <= 0) return 1;
  const e = Math.floor(Math.log10(t)), i = Math.pow(10, e), n = t / i;
  let r;
  return n <= 1 ? r = 1 : n <= 2 ? r = 2 : n <= 5 ? r = 5 : r = 10, r * i;
}, El = (t, e) => {
  const i = [];
  for (let n = 1; n < t.length; n += 1) {
    const r = t[n - 1], o = t[n], s = r.value <= e, a = o.value <= e;
    if (s === a || Math.abs(o.value - r.value) <= 1e-9) {
      i.push({ start: r, end: o, low: s });
      continue;
    }
    const l = Math.max(0, Math.min(1, (e - r.value) / (o.value - r.value))), c = {
      x: r.x + (o.x - r.x) * l,
      y: r.y + (o.y - r.y) * l,
      value: e
    };
    i.push({ start: r, end: c, low: s }), i.push({ start: c, end: o, low: a });
  }
  return i;
}, Cl = (t) => {
  const e = [];
  for (const i of t) {
    if (e.length === 0) {
      e.push({ low: i.low, points: [i.start, i.end] });
      continue;
    }
    const n = e[e.length - 1], r = n.points[n.points.length - 1], o = Math.abs(r.x - i.start.x) <= 0.01 && Math.abs(r.y - i.start.y) <= 0.01;
    n.low === i.low && o ? n.points.push(i.end) : e.push({ low: i.low, points: [i.start, i.end] });
  }
  return e;
}, $l = (t, e, i, n, r) => {
  t.lineWidth = r, t.lineCap = "round", t.lineJoin = "round";
  for (const o of e)
    t.beginPath(), t.moveTo(o.start.x, o.start.y), t.lineTo(o.end.x, o.end.y), t.strokeStyle = o.low ? n : i, t.stroke();
}, kl = (t, e, i = 5) => {
  if (!Number.isFinite(t) || !Number.isFinite(e) || i < 2)
    return [t, e].filter((l) => Number.isFinite(l));
  if (Math.abs(e - t) < 1e-9)
    return [t];
  const n = Ir(e - t), r = Ir(n / (i - 1)), o = Math.floor(t / r) * r, s = Math.ceil(e / r) * r, a = [];
  for (let l = o; l <= s + r / 2; l += r)
    a.push(Number(l.toFixed(10)));
  return a;
}, Dt = "purple", Rr = "black", Tl = {
  battery: "battery_percentage",
  battery_secondary: "battery_secondary_percentage"
}, Ve = (t) => {
  if (typeof t != "string") return;
  const e = t.trim();
  return e.length > 0 ? e : void 0;
}, Dr = (t, e) => {
  var n, r;
  const i = (r = (n = t.states[e]) == null ? void 0 : n.attributes) == null ? void 0 : r.friendly_name;
  return typeof i == "string" && i.length > 0 ? i : void 0;
}, qi = (t, e) => {
  var n, r;
  const i = (r = (n = t.states[e]) == null ? void 0 : n.attributes) == null ? void 0 : r.unit_of_measurement;
  return typeof i == "string" ? i : void 0;
}, Di = (t, e, i) => {
  if (i)
    return pe(Rr, Rr);
  if (Array.isArray(t))
    return pe(t, Dt);
  if (typeof t == "string") {
    const n = t.trim();
    if (n.length > 0 && n !== "state")
      return pe(n, Dt);
  }
  return pe(Dt, Dt);
}, Ni = [
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
], Li = (t, e) => e.defaultVisible ? t[e.visibleKey] !== !1 : t[e.visibleKey] === !0, zl = [
  { prefix: "solar", category: "solar", count: 4 },
  { prefix: "grid", category: "grid", count: 2 },
  { prefix: "grid_secondary", category: "grid_secondary", count: 2 },
  { prefix: "home", category: "home", count: 8 }
], rs = (t, e) => {
  const i = e, n = [], r = (d) => {
    if (!Li(i, d)) return;
    const u = Ve(i[d.entityKey]);
    if (!u) return;
    const _ = Ve(i[d.labelKey]) ?? Dr(t, u) ?? u, p = Di(i[d.trendColorKey], d.category, !1), y = qi(t, u) ?? "", f = {
      id: u,
      nodeKey: d.nodeKey,
      entityId: u,
      label: _,
      color: p,
      unit: y,
      isPercentage: y === "%",
      isSubBlock: !1,
      category: d.category
    };
    return n.push(f), f;
  }, o = /* @__PURE__ */ new Map();
  for (const d of Ni) {
    const u = r(d);
    u && o.set(d.nodeKey, u);
  }
  const s = (d, u, _, p, y, f) => {
    const g = Ve(i[d]);
    g && n.push({
      id: g,
      nodeKey: p,
      entityId: g,
      label: `${Ve(i[u]) ?? f} %`,
      color: Di(i[_], y, !1),
      unit: "%",
      isPercentage: !0,
      isSubBlock: !1,
      category: y
    });
  };
  Li(i, Ni[4]) && s(
    "battery_percentage_entity",
    "battery_label",
    "battery_trend_color",
    "battery_percentage",
    "battery",
    "Battery"
  ), Li(i, Ni[5]) && s(
    "battery_secondary_percentage_entity",
    "battery_secondary_label",
    "battery_secondary_trend_color",
    "battery_secondary_percentage",
    "battery_secondary",
    "Battery 2"
  );
  const a = [];
  for (const d of zl)
    for (let u = 1; u <= d.count; u += 1) {
      const _ = `${d.prefix}_sub_${u}`;
      if (i[`${_}_enabled`] !== !0) continue;
      const p = Ve(i[`${_}_entity`]);
      if (!p) continue;
      const y = Ve(i[`${_}_label`]) ?? Dr(t, p) ?? p, f = Di(void 0, d.category, !0), g = qi(t, p) ?? "", x = {
        id: p,
        nodeKey: _,
        entityId: p,
        label: y,
        color: f,
        unit: g,
        isPercentage: g === "%",
        isSubBlock: !0,
        category: d.category
      };
      n.push(x), d.prefix === "solar" && i[`${_}_state_mode`] !== !0 && a.push(x);
    }
  const l = o.get("home");
  if (l && i.home_auto_calculate === !0) {
    const d = Ml(i, t, l.unit, o.get("solar"));
    d && (l.computed = d);
  }
  const c = o.get("solar");
  c && i.solar_auto_calculate === !0 && a.length > 0 && (c.computed = Al(c.unit, a));
  const h = /* @__PURE__ */ new Set();
  return n.filter((d) => h.has(d.entityId) ? !1 : (h.add(d.entityId), !0));
}, Ml = (t, e, i, n) => {
  var l;
  const r = [], o = {}, s = {}, a = (c, h) => {
    const d = Ve(t[c]);
    d && (r.push(d), o[d] = qi(e, d) ?? "", s[d] = h);
  };
  if (t.solar_visible !== !1 && a("solar_entity", 1), t.grid_visible !== !1 && a("grid_entity", 1), t.grid_secondary_visible === !0 && a("grid_secondary_entity", 1), t.battery_visible !== !1 && a("battery_entity", -1), t.battery_secondary_visible === !0 && a("battery_secondary_entity", -1), r.length !== 0) {
    if (t.solar_auto_calculate === !0 && ((l = n == null ? void 0 : n.computed) == null ? void 0 : l.mode) === "auto_solar") {
      const c = n.entityId, h = r.indexOf(c);
      if (h >= 0) {
        r.splice(h, 1), delete o[c], delete s[c];
        for (const d of n.computed.dependencies)
          r.includes(d) || (r.push(d), o[d] = n.computed.unitsByEntityId[d] ?? "", s[d] = 1);
      }
    }
    return {
      mode: "auto_home",
      dependencies: r,
      unitsByEntityId: o,
      signsByEntityId: s,
      outputUnit: i
    };
  }
}, Al = (t, e) => {
  const i = [], n = {}, r = {};
  for (const o of e)
    i.push(o.entityId), n[o.entityId] = o.unit, r[o.entityId] = 1;
  return {
    mode: "auto_solar",
    dependencies: i,
    unitsByEntityId: n,
    signsByEntityId: r,
    outputUnit: t
  };
}, Pl = (t, e, i) => {
  if (i) {
    const r = t.find((o) => o.id === i);
    if (r) return r;
  }
  const n = Tl[e];
  if (n) {
    const r = t.find((o) => o.nodeKey === n);
    if (r) return r;
  }
  return t.find((r) => r.nodeKey === e);
}, os = (t) => {
  const e = /* @__PURE__ */ new Set();
  for (const i of t)
    if (e.add(i.entityId), i.computed)
      for (const n of i.computed.dependencies) e.add(n);
  return Array.from(e);
}, Ol = (t, e) => {
  if (t.length === 0) return 0;
  if (e <= t[0].ts) return t[0].value;
  if (e >= t[t.length - 1].ts) return t[t.length - 1].value;
  let i = 0, n = t.length - 1;
  for (; n - i > 1; ) {
    const l = i + n >> 1;
    t[l].ts <= e ? i = l : n = l;
  }
  const r = t[i], o = t[n], s = o.ts - r.ts;
  if (s <= 0) return r.value;
  const a = (e - r.ts) / s;
  return r.value + (o.value - r.value) * a;
}, Il = (t, e) => {
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
  const r = Array.from(n).sort((h, d) => h - d), o = /* @__PURE__ */ new Map();
  let s = null;
  for (const h of i) {
    const d = Z(h.unit);
    d && (o.set(h.id, d.factor), s ?? (s = d.family));
  }
  const a = Z(t.outputUnit), l = a && a.family === s ? a.factor : 1, c = [];
  for (const h of r) {
    let d = 0;
    for (const _ of i) {
      const p = Ol(_.points, h), y = o.get(_.id) ?? 1;
      d += _.sign * p * y;
    }
    const u = l > 0 ? d / l : d;
    Number.isFinite(u) && c.push({ ts: h, value: u });
  }
  return c;
}, ss = (t, e) => t.computed ? Il(t.computed, e) : e.get(t.entityId) ?? [], Rl = 64, Dl = 56, Nl = 12, Ll = 24, On = "11px system-ui, -apple-system, sans-serif", Hl = "var(--secondary-text-color, #757575)", as = "rgba(127, 127, 127, 0.18)", Bl = (t, e) => {
  var z;
  const i = lt(t);
  if (!i) return null;
  const { ctx: n, width: r, height: o } = i, s = e.host ?? document.body, a = we(s, Hl), l = Rl, c = r - Dl, h = Nl, d = o - Ll, u = Math.max(1, c - l), _ = Math.max(1, d - h), p = (M) => Fl(M, {
    innerLeft: l,
    innerRight: c,
    innerTop: h,
    innerBottom: d,
    innerWidth: u,
    innerHeight: _,
    startMs: e.startMs,
    endMs: e.endMs
  });
  if (e.series.length === 0)
    return Zi(n, l, h, u, _, a), p([]);
  const y = Math.max(1, e.endMs - e.startMs), f = { ctx: void 0 };
  if (e.mode === "stacked-percent") {
    const M = jl(
      n,
      e,
      s,
      { innerLeft: l, innerTop: h, innerBottom: d, innerWidth: u, innerHeight: _ },
      y,
      a,
      f
    );
    return Hr(n, e, l, d, u, a), p(M);
  }
  const g = [], x = [];
  for (const M of e.series)
    e.mode === "overlay" && M.isPercentage ? x.push(M) : g.push(M);
  const E = ls(g), C = Nr(E.map((M) => M.points)), w = x.length > 0 ? Nr(x.map((M) => M.points)) : null;
  Xi(
    n,
    C,
    l,
    h,
    _,
    "left",
    ((z = E[0]) == null ? void 0 : z.canonicalUnit) ?? e.primaryAxisLabel ?? "",
    e.tickCount ?? 5,
    e.decimals,
    a
  ), w && Xi(
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
  const b = e.lineWidth ?? 1.6, S = E.length, k = [];
  for (let M = E.length - 1; M >= 0; M -= 1) {
    const I = E[M], R = Lr(
      I.points,
      e.startMs,
      y,
      C,
      l,
      u,
      h,
      _
    ), H = we(s, I.color);
    R.length >= 2 && ((e.mode === "single" || S === 1) && Yi(n, R, H, d, 0.24, 0, f), ti(n, R, H, b)), k.push({
      id: I.id,
      label: I.label,
      resolvedColor: H,
      rawUnit: I.unit,
      canonicalUnit: I.canonicalUnit,
      axis: "primary",
      isPercentage: I.isPercentage,
      points: I.points,
      rawPoints: I.rawPoints
    });
  }
  for (const M of x) {
    const I = Lr(
      M.points,
      e.startMs,
      y,
      w ?? { min: 0, max: 100 },
      l,
      u,
      h,
      _
    ), R = we(s, M.color);
    I.length >= 2 && (n.save(), n.setLineDash([4, 3]), ti(n, I, R, b), n.restore()), k.push({
      id: M.id,
      label: M.label,
      resolvedColor: R,
      rawUnit: M.unit,
      canonicalUnit: M.unit,
      axis: "secondary",
      isPercentage: !0,
      points: M.points,
      rawPoints: M.points
    });
  }
  return Hr(n, e, l, d, u, a), p(k);
}, Fl = (t, e) => {
  const i = Math.max(1, e.endMs - e.startMs), n = (s) => {
    const l = (Math.max(e.innerLeft, Math.min(e.innerRight, s)) - e.innerLeft) / Math.max(1, e.innerWidth);
    return e.startMs + l * i;
  }, r = (s) => {
    const a = Math.max(0, Math.min(1, (s - e.startMs) / i));
    return e.innerLeft + a * e.innerWidth;
  }, o = (s) => t.map((a) => ({
    seriesId: a.id,
    label: a.label,
    resolvedColor: a.resolvedColor,
    value: ds(a.rawPoints, s),
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
    timestampToPixel: r,
    valuesAt: o
  };
}, Nr = (t) => {
  let e = 1 / 0, i = -1 / 0;
  for (const r of t)
    for (const o of r)
      Number.isFinite(o.value) && (o.value < e && (e = o.value), o.value > i && (i = o.value));
  if (!Number.isFinite(e) || !Number.isFinite(i))
    return { min: 0, max: 1 };
  if (e === i) {
    const r = Math.abs(e) * 0.1 || 1;
    return { min: e - r, max: i + r };
  }
  e >= 0 && (e = 0);
  const n = i - e;
  return { min: e - n * 0.05, max: i + n * 0.05 };
}, Lr = (t, e, i, n, r, o, s, a) => {
  const l = Math.max(1e-9, n.max - n.min);
  return t.filter((c) => Number.isFinite(c.ts) && Number.isFinite(c.value)).map((c) => {
    const h = Math.max(0, Math.min(1, (c.ts - e) / i)), d = Math.max(0, Math.min(1, (c.value - n.min) / l));
    return {
      x: r + h * o,
      y: s + (1 - d) * a
    };
  });
}, ls = (t) => {
  const e = t.map((r) => ({ s: r, parsed: Z(r.unit) }));
  let i = null, n = !0;
  for (const r of e) {
    if (!r.parsed) {
      n = !1;
      break;
    }
    if (i === null)
      i = r.parsed.family;
    else if (i !== r.parsed.family) {
      n = !1;
      break;
    }
  }
  return n ? e.map(({ s: r, parsed: o }) => {
    if (!o)
      return { ...r, canonicalUnit: r.unit, rawPoints: r.points };
    const s = o.factor, a = r.points.map((l) => ({
      ts: l.ts,
      value: l.value * s
    }));
    return { ...r, points: a, canonicalUnit: o.canonicalUnit, rawPoints: r.points };
  }) : t.map((r) => ({ ...r, canonicalUnit: r.unit, rawPoints: r.points }));
}, Xi = (t, e, i, n, r, o, s, a, l, c) => {
  const h = Math.max(1e-9, e.max - e.min), d = h * 0.07, u = kl(e.min, e.max, a).filter(
    (p) => p > e.min + d && p < e.max - d
  ), _ = [e.min, ...u, e.max];
  t.save(), t.font = On, t.fillStyle = c, t.textBaseline = "middle", t.textAlign = o === "left" ? "right" : "left";
  for (const p of _) {
    const y = (p - e.min) / h, f = n + (1 - y) * r, g = o === "left" ? i - 6 : i + 6;
    t.fillText(Wl(p, s, l), g, f), o === "left" && (t.strokeStyle = as, t.lineWidth = 1, t.beginPath(), t.moveTo(i, f + 0.5), t.lineTo(i + (t.canvas.width - 1e-3), f + 0.5), t.stroke());
  }
  t.restore();
}, Hr = (t, e, i, n, r, o) => {
  const s = Math.max(1, e.endMs - e.startMs), a = s * 0.07, l = cs(s), c = Ul(e.startMs, e.endMs).filter(
    (d) => d.ms > e.startMs + a && d.ms < e.endMs - a
  ), h = [
    { ms: e.startMs, label: l(new Date(e.startMs)), align: "left" },
    ...c.map((d) => ({ ms: d.ms, label: d.label, align: "center" })),
    { ms: e.endMs, label: l(new Date(e.endMs)), align: "right" }
  ];
  t.save(), t.font = On, t.fillStyle = o, t.textBaseline = "top";
  for (const d of h) {
    const u = (d.ms - e.startMs) / s;
    if (u < 0 || u > 1) continue;
    const _ = i + u * r;
    t.strokeStyle = as, t.lineWidth = 1, t.beginPath(), t.moveTo(_ + 0.5, n - 4), t.lineTo(_ + 0.5, n), t.stroke(), t.textAlign = d.align, t.fillText(d.label, _, n + 4);
  }
  t.restore();
}, St = 3600 * 1e3, he = 24 * St, cs = (t) => t <= 6 * St ? (e) => `${et(e.getHours())}:${et(e.getMinutes())}` : t <= 2 * he ? (e) => `${et(e.getHours())}:00` : t <= 200 * he ? (e) => `${et(e.getDate())}.${et(e.getMonth() + 1)}` : (e) => `${et(e.getMonth() + 1)}/${String(e.getFullYear()).slice(2)}`, Vl = (t) => t <= 6 * St ? St : t <= 2 * he ? 6 * St : t <= 14 * he ? he : t <= 90 * he ? 7 * he : t <= 200 * he ? 14 * he : 30 * he, Ul = (t, e) => {
  const i = e - t, n = Vl(i), r = cs(i), o = Math.ceil(t / n) * n, s = [];
  for (let a = o; a <= e && (s.push({ ms: a, label: r(new Date(a)) }), !(s.length > 16)); a += n)
    ;
  return s;
}, et = (t) => String(t).padStart(2, "0"), Wl = (t, e, i) => {
  const n = Math.abs(t), r = i !== void 0 ? i : n >= 100 ? 0 : n >= 10 ? 1 : 2, o = t.toFixed(r);
  return e ? `${o} ${e}` : o;
}, jl = (t, e, i, n, r, o, s) => {
  const a = e.series.filter((y) => !y.isPercentage);
  if (a.length === 0)
    return Zi(t, n.innerLeft, n.innerTop, n.innerWidth, n.innerHeight, o), [];
  const l = ls(a), c = Kl(l, e.startMs, e.endMs, 256);
  if (c.length < 2)
    return Zi(t, n.innerLeft, n.innerTop, n.innerWidth, n.innerHeight, o), [];
  const h = l.map(
    (y) => c.map((f) => Math.max(0, ds(y.points, f)))
  ), d = c.map((y, f) => {
    let g = 0;
    for (const x of h) g += x[f];
    return g;
  });
  Xi(
    t,
    { min: 0, max: 100 },
    n.innerLeft,
    n.innerTop,
    n.innerHeight,
    "left",
    "%",
    e.tickCount ?? 5,
    0,
    o
  );
  let u = c.map((y) => ({
    x: Br(y, e.startMs, r, n.innerLeft, n.innerWidth),
    y: n.innerBottom
  }));
  const _ = [], p = c.map(() => 0);
  for (let y = 0; y < l.length; y += 1) {
    const f = l[y], g = h[y], x = [], E = [];
    for (let w = 0; w < c.length; w += 1) {
      const b = c[w];
      p[w] += g[w];
      const S = d[w], k = S > 0 ? p[w] / S * 100 : 0, z = S > 0 ? g[w] / S * 100 : 0, M = Math.max(0, Math.min(1, k / 100));
      x.push({
        x: Br(b, e.startMs, r, n.innerLeft, n.innerWidth),
        y: n.innerTop + (1 - M) * n.innerHeight
      }), E.push({ ts: b, value: z });
    }
    const C = we(i, f.color);
    Sl(t, x, u, ct(C, 0.45, s)), ti(t, x, C, e.lineWidth ?? 1.4), u = x, _.push({
      id: f.id,
      label: f.label,
      resolvedColor: C,
      rawUnit: "%",
      canonicalUnit: "%",
      axis: "primary",
      isPercentage: !0,
      points: E,
      rawPoints: E
    });
  }
  return _;
}, Kl = (t, e, i, n) => {
  if (i <= e) return [];
  const r = Math.max(2, Math.min(n, 512)), o = (i - e) / (r - 1), s = [];
  for (let l = 0; l < r; l += 1)
    s.push(e + l * o);
  return t.some((l) => l.points.some((c) => c.ts >= e && c.ts <= i)) ? s : [];
}, ds = (t, e) => {
  if (t.length === 0) return 0;
  if (e <= t[0].ts) return t[0].value;
  if (e >= t[t.length - 1].ts) return t[t.length - 1].value;
  let i = 0, n = t.length - 1;
  for (; n - i > 1; ) {
    const l = i + n >> 1;
    t[l].ts <= e ? i = l : n = l;
  }
  const r = t[i], o = t[n], s = o.ts - r.ts;
  if (s <= 0) return r.value;
  const a = (e - r.ts) / s;
  return r.value + (o.value - r.value) * a;
}, Br = (t, e, i, n, r) => {
  const o = Math.max(0, Math.min(1, (t - e) / i));
  return n + o * r;
}, Zi = (t, e, i, n, r, o) => {
  t.save(), t.font = On, t.fillStyle = o, t.textAlign = "center", t.textBaseline = "middle", t.fillText("No data", e + n / 2, i + r / 2), t.restore();
};
var Gl = Object.defineProperty, hs = (t, e, i, n) => {
  for (var r = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = s(e, i, r) || r);
  return r && Gl(e, i, r), r;
};
const Yl = 180, Wn = class Wn extends D {
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
    this._closing || (this._closing = !0, setTimeout(() => this.remove(), Yl));
  }
  renderFooter() {
    return $;
  }
  /** Render an inner sub-modal that lives above the main dialog. */
  renderInner() {
    return $;
  }
  renderHeaderExtras() {
    return $;
  }
  render() {
    return v`
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
    return e === $ ? $ : v`<footer class="ppd-footer">${e}</footer>`;
  }
};
Wn.styles = Q`
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
let fe = Wn;
hs([
  O({ type: String })
], fe.prototype, "dialogTitle");
hs([
  T()
], fe.prototype, "_closing");
const He = (t, e = 2) => String(t).padStart(e, "0"), ql = (t) => {
  const e = new Date(t), i = -e.getTimezoneOffset(), n = i >= 0 ? "+" : "-", r = Math.abs(i);
  return `${e.getFullYear()}-${He(e.getMonth() + 1)}-${He(e.getDate())}T${He(e.getHours())}:${He(e.getMinutes())}:${He(e.getSeconds())}${n}${He(Math.floor(r / 60))}:${He(r % 60)}`;
}, Xl = (t) => /[",\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t, Zl = (t) => {
  var a;
  const e = t.filter((l) => l.points.length > 0), i = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set();
  for (const l of e) {
    const c = /* @__PURE__ */ new Map();
    for (const h of l.points)
      c.set(h.ts, h.value), n.add(h.ts);
    i.set(l.entityId, c);
  }
  const r = [...n].sort((l, c) => l - c), o = [], s = [
    "timestamp",
    ...e.map(
      (l) => Xl(l.unit ? `${l.label} (${l.unit})` : l.label)
    )
  ];
  o.push(s.join(","));
  for (const l of r) {
    const c = [ql(l)];
    for (const h of e) {
      const d = (a = i.get(h.entityId)) == null ? void 0 : a.get(l);
      c.push(d !== void 0 && Number.isFinite(d) ? String(d) : "");
    }
    o.push(c.join(","));
  }
  return o.join(`
`) + `
`;
}, Jl = (t, e) => {
  const i = new Blob(["\uFEFF" + e], {
    type: "text/csv;charset=utf-8"
  }), n = URL.createObjectURL(i), r = document.createElement("a");
  r.href = n, r.download = t, r.style.display = "none", document.body.appendChild(r), r.click(), document.body.removeChild(r), setTimeout(() => URL.revokeObjectURL(n), 0);
}, Fr = (t) => t.normalize("NFKD").replace(/[\u0300-\u036F]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "export";
function P(t) {
  var n;
  const e = ((n = t == null ? void 0 : t.locale) == null ? void 0 : n.language) ?? (t == null ? void 0 : t.language) ?? "en";
  return String(e).split("-")[0].toLowerCase() === "de" ? "de" : "en";
}
const Ji = {
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
  "schedule.editor.tap_action": "Tap action",
  "schedule.editor.hold_action": "Hold action",
  "schedule.editor.double_tap_action": "Double-tap action",
  "schedule.editor.long_press_opens_editor": "Long-press opens schedule editor",
  "schedule.editor.long_press_opens_editor_help": "When enabled (default), holding the card opens the PowerPilz schedule edit dialog with the native drag-and-drop weekly plan. Disable to turn off the long-press gesture entirely, or override it by setting a 'Hold action' below.",
  "schedule.edit_dialog.default_title": "Edit weekly schedule",
  "schedule.edit_dialog.error_no_ws": "Home Assistant websocket connection not available.",
  "schedule.edit_dialog.error_not_found": "Could not find a schedule helper for {entity}. Has it been deleted?",
  "schedule.edit_dialog.form_not_loaded": "The native schedule editor hasn't been loaded in this browser session yet. Open any schedule helper once under Settings → Helpers, then long-press the card again.",
  "schedule.edit_dialog.open_native_info": "Open in Home Assistant",
  "schedule.edit_dialog.hint": "Tap an empty area on a day to add a 1-hour block. Tap a block to remove it. 30-minute snap.",
  "schedule.edit_dialog.hint_v2": "Click and drag on a day to paint a block (15-minute snap). Click an existing block to edit its exact time, data, or delete it. In events mode: tap empty area to add a pin, click a pin to edit time or delete.",
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
  "energy.download_csv": "Download data as CSV",
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
  "heating_curve.edit_dialog.hint": "Tap an empty area to add a point. Drag a point to move it (15-minute snap on time). Double-click a point to delete it (each day must keep at least one).",
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
  "heating_curve.editor.show_value_labels": "Show value labels",
  "heating_curve.editor.long_press_opens_editor": "Long-press opens curve editor",
  "heating_curve.editor.tap_action": "Tap action",
  "heating_curve.editor.hold_action": "Hold action",
  "heating_curve.editor.double_tap_action": "Double-tap action"
}, Ql = {
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
  "schedule.editor.section_actions": "Aktionen bei Tippen",
  "schedule.editor.tap_action": "Tipp-Aktion",
  "schedule.editor.hold_action": "Lange-Tipp-Aktion",
  "schedule.editor.double_tap_action": "Doppeltipp-Aktion",
  "schedule.editor.long_press_opens_editor": "Lange drücken öffnet Zeitplan-Editor",
  "schedule.editor.long_press_opens_editor_help": "Wenn aktiviert (Standard), öffnet ein langes Drücken auf die Karte den PowerPilz-Zeitplan-Editor mit der nativen Drag-and-Drop-Wochenplan-UI. Deaktivieren, um die Geste komplett auszuschalten, oder via 'Lange-Tipp-Aktion' unten überschreiben.",
  "schedule.edit_dialog.default_title": "Wochenplan bearbeiten",
  "schedule.edit_dialog.error_no_ws": "Home Assistant Websocket-Verbindung nicht verfügbar.",
  "schedule.edit_dialog.error_not_found": "Kein Zeitplan-Helfer für {entity} gefunden. Wurde er gelöscht?",
  "schedule.edit_dialog.form_not_loaded": "Der native Zeitplan-Editor wurde in dieser Browser-Session noch nicht geladen. Öffne einmal einen Zeitplan-Helfer unter Einstellungen → Helfer, dann drücke erneut lange auf die Karte.",
  "schedule.edit_dialog.open_native_info": "In Home Assistant öffnen",
  "schedule.edit_dialog.hint": "Tippe auf eine leere Stelle eines Tages, um einen 1-Stunden-Block hinzuzufügen. Tippe einen Block an, um ihn zu löschen. 30-Minuten-Raster.",
  "schedule.edit_dialog.hint_v2": "Klicken und ziehen auf einem Tag erstellt einen Block (15-Minuten-Raster). Klick auf einen Block öffnet das Detail-Fenster für exakte Zeit, Daten oder Löschen. Im Event-Modus: in leere Fläche tippen fügt einen Pin hinzu, Klick auf Pin öffnet Zeit-Bearbeitung oder Löschen.",
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
  "energy.download_csv": "Daten als CSV herunterladen",
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
  "heating_curve.edit_dialog.hint": "Auf eine leere Stelle tippen, um einen Punkt hinzuzufügen. Punkt ziehen, um ihn zu verschieben (15-Minuten-Raster auf der Zeit). Doppelklick zum Löschen (mindestens ein Punkt pro Tag bleibt erhalten).",
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
  "heating_curve.editor.show_value_labels": "Wert-Labels anzeigen",
  "heating_curve.editor.long_press_opens_editor": "Langer Druck öffnet Editor",
  "heating_curve.editor.tap_action": "Tap-Aktion",
  "heating_curve.editor.hold_action": "Halten-Aktion",
  "heating_curve.editor.double_tap_action": "Doppeltap-Aktion"
}, ec = { en: Ji, de: Ql };
function m(t, e, i) {
  let o = (ec[t === "de" ? "de" : "en"] ?? Ji)[e] ?? Ji[e] ?? e;
  if (i)
    for (const [s, a] of Object.entries(i))
      o = o.replace(new RegExp(`\\{${s}\\}`, "g"), String(a));
  return o;
}
function Oe(t, e) {
  return m(t, `weekday.short.${(e % 7 + 7) % 7}`);
}
var tc = Object.defineProperty, Y = (t, e, i, n) => {
  for (var r = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = s(e, i, r) || r);
  return r && tc(e, i, r), r;
};
const Qi = "power-pilz-energy-node-dialog", Nt = [
  { id: "48h", label: "48 h", hours: 48 },
  { id: "7d", label: "7 d", hours: 168 },
  { id: "30d", label: "30 d", hours: 720 },
  { id: "90d", label: "90 d", hours: 2160 },
  { id: "6m", label: "6 M", hours: 720 * 6 },
  { id: "1y", label: "1 J", hours: 24 * 365 }
], ic = "7d", nc = (t) => {
  const e = document.createElement(Qi);
  e.hass = t.hass, e.energyConfig = t.config, e.focusedNodeKey = t.focusedNodeKey, document.body.appendChild(e);
}, jn = class jn extends fe {
  constructor() {
    super(...arguments), this.focusedNodeKey = "", this._allSeries = [], this._selectedIds = /* @__PURE__ */ new Set(), this._mode = "single", this._presetId = ic, this._useCustomRange = !1, this._customStartIso = "", this._customEndIso = "", this._historyByEntity = /* @__PURE__ */ new Map(), this._loading = !1, this._openPopover = null, this._focusedEntityIdOverride = null, this._fetchAbort = 0, this._chartContext = null, this._canvasLogicalSize = { width: 0, height: 0 }, this._onDocumentMouseDown = (e) => {
      if (this._openPopover === null) return;
      e.composedPath().some((r) => r instanceof HTMLElement ? r.dataset.ppPopover === this._openPopover || r.dataset.ppPopoverTrigger === this._openPopover : !1) || (this._openPopover = null);
    }, this._onCustomStartChange = (e) => {
      this._customStartIso = e.target.value, this._useCustomRange && this._fetchHistory();
    }, this._onCustomEndChange = (e) => {
      this._customEndIso = e.target.value, this._useCustomRange && this._fetchHistory();
    }, this._onChartPointerMove = (e) => {
      if (!this._chartContext) return;
      const i = this.renderRoot.querySelector(".pp-chart-canvas");
      if (!i) return;
      const n = i.getBoundingClientRect(), r = e.clientX - n.left, o = e.clientY - n.top, s = this._chartContext;
      if (r < s.innerLeft || r > s.innerRight || o < s.innerTop || o > s.innerBottom) {
        this._hover && (this._hover = void 0);
        return;
      }
      const a = s.pixelToTimestamp(r);
      this._hover = { canvasX: r, ts: a };
    }, this._onChartPointerLeave = () => {
      this._hover && (this._hover = void 0);
    }, this._handleDownloadCsv = () => {
      if (this._loading || this._historyByEntity.size === 0) return;
      const e = this._allSeries.filter((a) => this._selectedIds.has(a.id));
      if (e.length === 0) return;
      const i = this._activeWindow(), n = Zl(
        e.map((a) => ({
          label: a.label,
          entityId: a.entityId,
          unit: a.unit,
          points: this._historyByEntity.get(a.entityId) ?? []
        }))
      ), r = Fr(this.dialogTitle || "energy"), o = new Date(i.endMs).toISOString().slice(0, 10), s = `powerpilz-${r}-${Fr(this._windowLabel())}-${o}.csv`;
      Jl(s, n);
    };
  }
  // ------------------------------------------------------------
  // Lifecycle
  // ------------------------------------------------------------
  connectedCallback() {
    if (super.connectedCallback(), this._allSeries = rs(this.hass, this.energyConfig), !this._customStartIso || !this._customEndIso) {
      const e = /* @__PURE__ */ new Date(), i = new Date(e.getTime() - 168 * 3600 * 1e3);
      this._customEndIso = Vr(e), this._customStartIso = Vr(i);
    }
    this._selectedIds = new Set(this._defaultSelection().map((e) => e.id)), this.dialogTitle = this._titleForFocusedNode(), document.addEventListener("mousedown", this._onDocumentMouseDown, !0), this._fetchHistory();
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
    return Pl(this._allSeries, this.focusedNodeKey, this._focusedEntityIdOverride);
  }
  _titleForFocusedNode() {
    const e = this._resolveFocusedSeries();
    if (e) return e.label;
    const n = this.energyConfig[`${this.focusedNodeKey}_label`];
    return typeof n == "string" && n.trim().length > 0 ? n.trim() : this.focusedNodeKey;
  }
  _defaultSelection() {
    const e = this._resolveFocusedSeries();
    return e ? [e] : this._allSeries.slice(0, 1);
  }
  // ------------------------------------------------------------
  // Range handling
  // ------------------------------------------------------------
  _activeWindow() {
    if (this._useCustomRange) {
      const r = Lt(this._customStartIso), o = Lt(this._customEndIso);
      if (r !== null && o !== null && o > r)
        return { startMs: r, endMs: o };
    }
    const e = Nt.find((r) => r.id === this._presetId) ?? Nt[1], i = Date.now();
    return { startMs: i - e.hours * 3600 * 1e3, endMs: i };
  }
  /** True when the user has the custom range toggle on but their start
   *  / end inputs are not a valid window (start ≥ end or unparseable). */
  _customRangeInvalid() {
    if (!this._useCustomRange) return !1;
    const e = Lt(this._customStartIso), i = Lt(this._customEndIso);
    return e === null || i === null || i <= e;
  }
  // ------------------------------------------------------------
  // History fetching
  // ------------------------------------------------------------
  async _fetchHistory() {
    const e = ++this._fetchAbort;
    this._loading = !0, this._loadError = void 0;
    const i = this._activeWindow(), n = i.endMs - i.startMs, r = n > 48 * 3600 * 1e3 ? "statistics" : "hybrid", o = this._activeEntityIds();
    if (o.length === 0) {
      this._loading = !1, this._historyByEntity = /* @__PURE__ */ new Map();
      return;
    }
    try {
      const s = await Ie(
        this.hass,
        o,
        n,
        { startMs: i.startMs, dataSource: r }
      );
      if (e !== this._fetchAbort) return;
      const a = /* @__PURE__ */ new Map();
      for (const l of o)
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
    return i && !e.includes(i) && e.push(i), os(e);
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
    this._chartContext = Bl(e, {
      mode: this._mode,
      series: n,
      startMs: i.startMs,
      endMs: i.endMs,
      host: this.renderRoot
    });
    const r = e.getBoundingClientRect();
    if (this._canvasLogicalSize = {
      width: Math.max(1, r.width),
      height: Math.max(1, r.height)
    }, this._hover && this._chartContext) {
      const o = this._chartContext.timestampToPixel(this._hover.ts);
      this._hover = { canvasX: o, ts: this._hover.ts };
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
      points: ss(e, this._historyByEntity)
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
    return v`
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
        ${this._loading ? v`<div class="pp-chart-overlay">Lade…</div>` : $}
        ${this._loadError ? v`<div class="pp-chart-overlay error">${this._loadError}</div>` : $}
      </div>
    `;
  }
  _renderHoverOverlay() {
    if (!this._hover || !this._chartContext) return $;
    const e = this._chartContext, { width: i, height: n } = this._canvasLogicalSize;
    if (i <= 0 || n <= 0) return $;
    const r = this._hover.canvasX / i * 100, o = e.valuesAt(this._hover.ts).filter(
      (a) => Number.isFinite(a.value)
    ), s = r < 60;
    return v`
      <div
        class="pp-hover-line"
        style=${A({ left: `${r}%` })}
        aria-hidden="true"
      ></div>
      <div
        class="pp-tooltip ${s ? "right" : "left"}"
        style=${A({
      left: s ? `${r}%` : "auto",
      right: s ? "auto" : `${100 - r}%`
    })}
      >
        <div class="pp-tooltip-time">${rc(this._hover.ts)}</div>
        ${o.length === 0 ? v`<div class="pp-tooltip-row muted">—</div>` : o.map((a) => v`
              <div class="pp-tooltip-row">
                <span class="pp-tooltip-swatch" style=${A({ background: a.resolvedColor })}></span>
                <span class="pp-tooltip-label">${a.label}</span>
                <span class="pp-tooltip-value">${oc(a.value, a.rawUnit)}</span>
              </div>
            `)}
      </div>
    `;
  }
  _windowLabel() {
    var e;
    return this._useCustomRange ? "Custom" : ((e = Nt.find((i) => i.id === this._presetId)) == null ? void 0 : e.label) ?? this._presetId;
  }
  _renderDownloadButton() {
    const e = this._loading || this._historyByEntity.size === 0 || this._selectedIds.size === 0, i = m(P(this.hass), "energy.download_csv");
    return v`
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
    return v`
      <div class="pp-segmented">
        ${[
      { id: "single", label: "Einzeln" },
      { id: "overlay", label: "Überlagert" },
      { id: "stacked-percent", label: "Gestapelt %" }
    ].map((i) => v`
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
    return v`
      <div class="pp-range-bar">
        ${Nt.map((n) => v`
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
          ${e ? this._renderDatePopover() : $}
        </div>
      </div>
    `;
  }
  _renderDatePopover() {
    const e = this._customRangeInvalid();
    return v`
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
        ${e ? v`<div class="pp-popover-err">Start muss vor Ende liegen.</div>` : $}
      </div>
    `;
  }
  _renderEntityTrigger() {
    const e = this._openPopover === "entities", i = this._mode === "single", n = this._resolveFocusedSeries(), r = this._allSeries.length, o = this._selectedIds.size, s = i ? v`
          ${n ? v`<span class="pp-dropdown-swatch" style=${A({ background: n.color })}></span>` : $}
          <span class="pp-dropdown-label">${(n == null ? void 0 : n.label) ?? "—"}</span>
        ` : v`
          <ha-icon icon="mdi:format-list-checkbox"></ha-icon>
          <span class="pp-dropdown-label">${o}/${r}</span>
        `;
    return v`
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
        ${e ? this._renderEntityPopover() : $}
      </div>
    `;
  }
  _renderEntityPopover() {
    var o;
    const e = this._groupSeriesByCategory(), i = this._mode === "single", n = this._mode === "stacked-percent", r = (o = this._resolveFocusedSeries()) == null ? void 0 : o.id;
    return v`
      <div class="pp-popover pp-entity-popover" data-pp-popover="entities">
        <div class="pp-popover-title">
          <span>${i ? "Entität" : "Entitäten"}</span>
          ${i ? $ : v`
                <div class="pp-entity-quick">
                  <button class="pp-link" @click=${() => this._onSelectFocused()}>Nur fokussiert</button>
                  <button class="pp-link" @click=${() => this._onSelectAll()}>Alle</button>
                </div>
              `}
        </div>
        ${n ? v`<div class="pp-popover-hint">Prozent-Entitäten sind in der Stacked-Ansicht ausgeschlossen.</div>` : $}
        <div class="pp-entity-scroll">
          ${e.map((s) => v`
            <div class="pp-entity-group">
              <div class="pp-entity-group-title">${s.title}</div>
              ${s.items.map((a) => this._renderEntityRow(a, {
      isSingle: i,
      stackedExcludes: n,
      focusedId: r
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
      const o = e.id === i.focusedId;
      return v`
        <button
          type="button"
          class="pp-entity-row pp-entity-row-radio ${o ? "active" : ""}"
          title=${e.entityId}
          @click=${() => this._onPickFocusedSeries(e.id)}
        >
          <span class="pp-radio-dot ${o ? "checked" : ""}"></span>
          <span class="pp-entity-swatch" style=${A({ background: e.color })}></span>
          <span class="pp-entity-label">${e.label}</span>
          <span class="pp-entity-unit">${e.unit}</span>
        </button>
      `;
    }
    const r = this._selectedIds.has(e.id) && !n;
    return v`
      <label
        class="pp-entity-row ${n ? "disabled" : ""}"
        title=${e.entityId}
      >
        <input
          type="checkbox"
          .checked=${r}
          ?disabled=${n}
          @change=${() => this._onToggleSeries(e.id)}
        />
        <span class="pp-entity-swatch" style=${A({ background: e.color })}></span>
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
    for (const r of this._allSeries) {
      const o = n.get(r.category) ?? [];
      o.push(r), n.set(r.category, o);
    }
    return i.filter((r) => n.has(r)).map((r) => ({ title: e[r], items: n.get(r) ?? [] }));
  }
};
jn.styles = [
  fe.styles,
  Q`
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
let B = jn;
Y([
  O({ attribute: !1 })
], B.prototype, "hass");
Y([
  O({ attribute: !1 })
], B.prototype, "energyConfig");
Y([
  O({ type: String })
], B.prototype, "focusedNodeKey");
Y([
  T()
], B.prototype, "_allSeries");
Y([
  T()
], B.prototype, "_selectedIds");
Y([
  T()
], B.prototype, "_mode");
Y([
  T()
], B.prototype, "_presetId");
Y([
  T()
], B.prototype, "_useCustomRange");
Y([
  T()
], B.prototype, "_customStartIso");
Y([
  T()
], B.prototype, "_customEndIso");
Y([
  T()
], B.prototype, "_historyByEntity");
Y([
  T()
], B.prototype, "_loading");
Y([
  T()
], B.prototype, "_loadError");
Y([
  T()
], B.prototype, "_hover");
Y([
  T()
], B.prototype, "_openPopover");
Y([
  T()
], B.prototype, "_focusedEntityIdOverride");
customElements.get(Qi) || customElements.define(Qi, B);
const Vr = (t) => {
  const e = (a) => String(a).padStart(2, "0"), i = t.getFullYear(), n = e(t.getMonth() + 1), r = e(t.getDate()), o = e(t.getHours()), s = e(t.getMinutes());
  return `${i}-${n}-${r}T${o}:${s}`;
}, Lt = (t) => {
  if (!t) return null;
  const e = new Date(t).getTime();
  return Number.isFinite(e) ? e : null;
}, Ht = (t) => String(t).padStart(2, "0"), rc = (t) => {
  const e = new Date(t), i = `${Ht(e.getDate())}.${Ht(e.getMonth() + 1)}.${e.getFullYear()}`, n = `${Ht(e.getHours())}:${Ht(e.getMinutes())}`;
  return `${i} ${n}`;
}, oc = (t, e) => {
  if (!Number.isFinite(t)) return "—";
  const i = Math.abs(t), n = i >= 100 ? 0 : i >= 10 ? 1 : 2, r = t.toFixed(n);
  return e ? `${r} ${e}` : r;
};
var sc = Object.defineProperty, Re = (t, e, i, n) => {
  for (var r = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = s(e, i, r) || r);
  return r && sc(e, i, r), r;
};
const Hi = (t) => {
  if (typeof t != "string") return;
  const e = t.trim();
  return e.length > 0 ? e : void 0;
}, en = "power-pilz-energy-node-zoom-overlay", ac = 240, Bi = 1440 * 60 * 1e3, Ur = 1.8, lc = (t) => {
  const e = document.createElement(en);
  e.hass = t.hass, e.energyConfig = t.config, e.focusedNodeKey = t.focusedNodeKey, e.originRect = t.originRect, e.cardRect = t.cardRect, document.body.appendChild(e);
}, Kn = class Kn extends D {
  constructor() {
    super(...arguments), this.focusedNodeKey = "", this._phase = "opening", this._historyByEntity = /* @__PURE__ */ new Map(), this._series = [], this._fetchAbort = 0, this._colorCache = {}, this._lastCanvasPoints = [], this._lastCanvasSize = { width: 0, height: 0 }, this._onKeyDown = (e) => {
      e.key === "Escape" && this._close();
    }, this._onBackdropClick = (e) => {
      e.target === e.currentTarget && this._close();
    }, this._onPointerMove = (e) => {
      const i = this.renderRoot.querySelector(".pp-zoom-area");
      if (!i || this._lastCanvasPoints.length < 2) return;
      const n = i.getBoundingClientRect(), r = e.clientX - n.left, o = e.clientY - n.top;
      if (r < 0 || r > n.width || o < 0 || o > n.height) {
        this._hover && (this._hover = void 0);
        return;
      }
      const s = r / n.width * this._lastCanvasSize.width, a = this._nearestPoint(s);
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
    super.connectedCallback(), this._series = rs(this.hass, this.energyConfig);
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
    this._phase !== "closing" && (this._phase = "closing", setTimeout(() => this.remove(), ac));
  }
  // ------------------------------------------------------------
  // Data
  // ------------------------------------------------------------
  async _fetchHistory() {
    const e = ++this._fetchAbort;
    if (!this._focused) return;
    const i = os([this._focused]);
    if (i.length === 0) return;
    const n = "hybrid", r = Date.now() - Bi;
    try {
      const o = await Ie(
        this.hass,
        i,
        Bi,
        { startMs: r, dataSource: n }
      );
      if (e !== this._fetchAbort) return;
      const s = /* @__PURE__ */ new Map();
      for (const a of i) s.set(a, o[a] ?? []);
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
    const n = lt(e), r = lt(i);
    if (!n || !r) return;
    const o = ss(this._focused, this._historyByEntity);
    if (o.length < 2) {
      this._lastCanvasPoints = [], this._lastCanvasSize = { width: n.width, height: n.height };
      return;
    }
    const s = Date.now(), a = s - Bi, l = o.filter((w) => w.ts >= a && w.ts <= s), c = l.length >= 2 ? l : o;
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
    const u = (d - h) * 0.06, _ = h - u, y = d + u - _, f = s - a, g = c.filter((w) => Number.isFinite(w.ts) && Number.isFinite(w.value)).map((w) => {
      const b = Math.max(0, Math.min(1, (w.ts - a) / f)), S = Math.max(0, Math.min(1, (w.value - _) / y));
      return {
        x: b * n.width,
        y: (1 - S) * n.height,
        ts: w.ts,
        value: w.value
      };
    });
    if (g.length < 2) {
      this._lastCanvasPoints = [];
      return;
    }
    const x = this.renderRoot, E = we(x, this._focused.color), C = this._thresholdConfig();
    if (C.threshold === null)
      Yi(n.ctx, g, E, n.height, 0.24, 0, this._colorCache), ti(r.ctx, g, E, Ur);
    else {
      const w = g.map((z) => ({
        x: z.x,
        y: z.y,
        value: z.value
      })), b = we(x, C.color), S = El(w, C.threshold), k = Cl(S);
      for (const z of k)
        Yi(
          n.ctx,
          z.points,
          z.low ? b : E,
          n.height,
          0.24,
          0,
          this._colorCache
        );
      $l(r.ctx, S, E, b, Ur);
    }
    this._lastCanvasPoints = g, this._lastCanvasSize = { width: n.width, height: n.height };
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
    var r;
    const e = this.energyConfig, i = this.focusedNodeKey, n = -1e-6;
    if (i === "grid" && e.grid_export_highlight === !0)
      return {
        threshold: n,
        color: pe(
          e.grid_export_trend_color ?? "red",
          "red"
        )
      };
    if (i === "grid_secondary" && e.grid_secondary_export_highlight === !0)
      return {
        threshold: n,
        color: pe(
          e.grid_secondary_export_trend_color ?? "red",
          "red"
        )
      };
    if ((i === "battery" || i === "battery_secondary") && ((r = this._focused) != null && r.isPercentage) && e[`${i}_low_alert`] === !0) {
      const o = e[`${i}_low_threshold`];
      return {
        threshold: typeof o == "number" && Number.isFinite(o) ? Math.max(0, Math.min(100, o)) : 20,
        color: pe(
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
    let n = 0, r = i.length - 1;
    for (; r - n > 1; ) {
      const a = n + r >> 1;
      i[a].x <= e ? n = a : r = a;
    }
    const o = i[n], s = i[r];
    return o ? s ? Math.abs(o.x - e) <= Math.abs(s.x - e) ? o : s : o : s;
  }
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  render() {
    if (!this._focused)
      return v`<div class="pp-zoom-catcher" @click=${this._onBackdropClick}></div>`;
    const e = this._effectiveContainerRect(), i = 6, n = 2, r = this.originRect.left + this.originRect.width / 2, o = this.originRect.top + this.originRect.height / 2, s = Math.max(this.originRect.width, e.width - i * 2), a = Math.max(this.originRect.height, e.height - i * 2), l = Math.min(s, this.originRect.width * n), c = Math.min(a, this.originRect.height * n);
    let h = r - l / 2, d = o - c / 2;
    h = Math.max(e.left + i, Math.min(e.left + e.width - l - i, h)), d = Math.max(e.top + i, Math.min(e.top + e.height - c - i, d));
    const u = this._phase !== "open", _ = this._phase === "closing", p = u || _, y = this.originRect.width / l, f = this.originRect.height / c, g = this.originRect.left - h, x = this.originRect.top - d, E = {
      left: `${h}px`,
      top: `${d}px`,
      width: `${l}px`,
      height: `${c}px`,
      transform: p ? `translate(${g}px, ${x}px) scale(${y}, ${f})` : "translate(0, 0) scale(1, 1)",
      transformOrigin: "0 0"
    }, C = this._buildView();
    return v`
      <div
        class="pp-zoom-catcher"
        @click=${this._onBackdropClick}
      >
        <div
          class="pp-zoom-shell ${this._focused.category} ${this._phase === "open" ? "is-open" : ""} ${_ ? "is-closing" : ""}"
          style=${A(E)}
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
              .icon=${C.iconName}
              style=${A(C.iconStyle)}
            ></ha-icon>
            <div class="pp-zoom-value">${this._displayValueText(C.formattedValue)}</div>
            <div class="pp-zoom-label">${C.label}</div>
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
    if (!this._hover || !this._focused) return $;
    const e = this.renderRoot.querySelector(".pp-zoom-area");
    if (!e) return $;
    const { width: i, height: n } = this._lastCanvasSize;
    if (i <= 0 || n <= 0) return $;
    const r = e.offsetWidth || e.getBoundingClientRect().width, o = e.offsetHeight || e.getBoundingClientRect().height, s = this._hover.logicalX / i * r, a = this._hover.logicalY / n * o;
    return v`
      <div
        class="pp-zoom-hover-dot"
        aria-hidden="true"
        style=${A({
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
    return `${kt(
      this._hover.value,
      this._focused.unit,
      n,
      this._unitFormatOptions(i)
    )} · ${cc(this._hover.ts)}`;
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
    const e = this._focused, i = this.energyConfig, n = this._unitFormatOptions(i), r = this._configDecimals(i);
    return this.focusedNodeKey === "battery" || this.focusedNodeKey === "battery_secondary" ? this._buildBatteryView(this.focusedNodeKey, i, e.label) : this._buildPowerView(e, i, n, r);
  }
  _configDecimals(e) {
    const i = e.decimals;
    return typeof i == "number" && Number.isFinite(i) ? Math.min(3, Math.max(0, Math.round(i))) : 1;
  }
  _unitFormatOptions(e) {
    const i = this._configDecimals(e);
    return {
      enabled: e.auto_scale_units === !0,
      baseDecimals: me(e.decimals_base_unit, i),
      prefixedDecimals: me(e.decimals_prefixed_unit, i),
      nullWithUnit: !0
    };
  }
  /** Power/energy nodes — also handles auto-calculated home/solar by
   *  replaying the descriptor's compute spec on current entity states. */
  _buildPowerView(e, i, n, r) {
    const o = this._liveValueOf(e), s = kt(o, e.unit, r, n), a = i[`${e.nodeKey}_icon`] ?? this._fallbackIcon(e.nodeKey);
    let l = i[`${e.nodeKey}_icon_color`];
    const c = o !== null && Number.isFinite(o) && o < 0;
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
    const r = e === "battery" ? "battery_percentage_entity" : "battery_secondary_percentage_entity", o = e === "battery" ? "battery_entity" : "battery_secondary_entity", s = `${e}_icon`, a = `${e}_icon_color`, l = `${e}_low_alert`, c = `${e}_low_threshold`, h = `${e}_low_alert_color`, d = Hi(i[r]), u = Hi(i[o]), _ = u ? W(this.hass, u) : void 0, p = typeof _ == "string" && _.trim() === "%", y = d ? V(this.hass, d) : null, f = u ? V(this.hass, u) : null, g = y !== null ? y : p ? f : null, x = g !== null ? `${Math.round(Math.max(0, Math.min(100, g)))}%` : "—", E = this._batteryIcon(
      g,
      p ? null : f,
      i[s]
    ), C = i[l] === !0, w = this._normalizeBatteryThreshold(i[c]), S = C && g !== null && g <= w ? i[h] ?? "red" : i[a], k = Hi(i[`${e}_label`]) ?? n;
    return {
      iconName: E,
      iconStyle: xe(S),
      formattedValue: x,
      label: k
    };
  }
  /** Mirrors energy-card.batteryIcon. Different MDI variants by SOC
   *  bucket; charging gets its own icon regardless of level. */
  _batteryIcon(e, i, n) {
    if (i !== null && i > 0.01)
      return "mdi:battery-charging";
    if (e === null)
      return n ?? "mdi:battery-outline";
    const o = Math.max(0, Math.min(100, e));
    return o < 5 ? "mdi:battery-outline" : o >= 95 ? "mdi:battery" : `mdi:battery-${Math.max(10, Math.min(90, Math.round(o / 10) * 10))}`;
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
        const a = V(this.hass, s);
        if (a === null) return null;
        const l = e.computed.unitsByEntityId[s] ?? "", c = e.computed.signsByEntityId[s] ?? 1, h = Z(l), d = (h == null ? void 0 : h.factor) ?? 1;
        i += c * a * d, n ?? (n = (h == null ? void 0 : h.family) ?? null);
      }
      const r = Z(e.computed.outputUnit), o = r && r.family === n ? r.factor : 1;
      return o > 0 ? i / o : i;
    }
    return V(this.hass, e.entityId);
  }
  _fallbackIcon(e) {
    return e.startsWith("solar") ? "mdi:weather-sunny" : e.startsWith("grid_secondary") || e.startsWith("grid") ? "mdi:transmission-tower" : e.startsWith("home") ? "mdi:home-lightning-bolt" : e.startsWith("battery_secondary") ? "mdi:battery-outline" : e.startsWith("battery") ? "mdi:battery" : "mdi:flash";
  }
};
Kn.styles = Q`
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
let oe = Kn;
Re([
  O({ attribute: !1 })
], oe.prototype, "hass");
Re([
  O({ attribute: !1 })
], oe.prototype, "energyConfig");
Re([
  O({ type: String })
], oe.prototype, "focusedNodeKey");
Re([
  O({ attribute: !1 })
], oe.prototype, "originRect");
Re([
  O({ attribute: !1 })
], oe.prototype, "cardRect");
Re([
  T()
], oe.prototype, "_phase");
Re([
  T()
], oe.prototype, "_historyByEntity");
Re([
  T()
], oe.prototype, "_hover");
customElements.get(en) || customElements.define(en, oe);
const Bt = (t) => String(t).padStart(2, "0"), cc = (t) => {
  const e = new Date(t);
  return `${Bt(e.getDate())}.${Bt(e.getMonth() + 1)}. ${Bt(e.getHours())}:${Bt(e.getMinutes())}`;
}, Ce = "0.5.2";
var dc = Object.defineProperty, hc = Object.getOwnPropertyDescriptor, In = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? hc(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (n ? s(e, i, r) : s(r)) || r);
  return n && r && dc(e, i, r), r;
};
const uc = 4, pc = 8, Wr = 2, _c = /* @__PURE__ */ new Set(["solar", "home", "grid", "grid_secondary"]), mc = (t, e) => {
  const i = `${t}_sub_${e}`, n = _c.has(t);
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
              helper: fn,
              description: fn
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
                helper: t === "solar" ? gn : yn,
                description: t === "solar" ? gn : yn
              }
            ]
          }
        ]
      }
    ] : [],
    Ue(i)
  ];
}, Ft = (t, e, i, n) => ({
  type: "expandable",
  name: "",
  title: e,
  icon: i,
  expanded: !1,
  schema: Array.from({ length: n }, (r, o) => ({
    type: "expandable",
    name: "",
    title: `Block ${o + 1}`,
    icon: "mdi:view-grid-outline",
    expanded: !1,
    schema: mc(t, o + 1)
  }))
}), fc = (t, e, i) => ({
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
}), de = (t, e) => ({
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
}), yc = {
  select: {
    mode: "dropdown",
    options: [
      { label: "Auto (recommended)", value: "auto" },
      { label: "Statistics (fastest)", value: "statistics" },
      { label: "History (raw)", value: "history" }
    ]
  }
}, gc = (t) => {
  const e = J(t, "hybrid");
  return e === "hybrid" ? "auto" : e;
}, bc = (t) => t === "auto" || t === "history" || t === "statistics" || t === "hybrid" ? t : "auto", tn = "When enabled, the solar main node shows the sum of enabled solar sub-node entities instead of the solar entity. Solar sub-nodes with State mode enabled are excluded from this sum.", nn = "When enabled, the home main node is calculated as solar + grid + grid 2 - battery - battery 2 using compatible unit conversion.", gt = "When enabled, negative grid values (energy exported to the grid) are highlighted in the trend with the export color.", bt = "When enabled, the grid icon switches to the export icon color while the grid value is negative.", rn = "When enabled, the main grid node is shown. When disabled, the grid node is hidden.", on = "When enabled, the second grid node is shown. When disabled, the second grid node is hidden.", sn = "When enabled, the main solar node is shown. When disabled, the solar node is hidden.", an = "Flow direction: + value animates from Solar to Center. 0 or - value shows no solar flow.", ln = "When enabled, the main home node is shown. When disabled, the home node is hidden.", cn = "Flow direction: + value animates from Center to Home. 0 or - value shows no home flow.", dn = "When enabled, the main battery node is shown. When disabled, the battery node is hidden.", hn = "Flow direction: + value animates from Center to Battery (charging). - value animates Battery to Center (discharging).", un = "When enabled, the second battery node is shown. When disabled, the second battery node is hidden.", pn = "Flow direction: + value animates from Center to Battery 2 (charging). - value animates Battery 2 to Center (discharging).", vt = "Color used for battery low-threshold alert styling (icon and low trend section).", Vt = "Reverse the animated arrow direction (charge ↔ discharge). Use this when your inverter reports the opposite sign for charge/discharge than what PowerPilz expects.", Ut = "Flip the sign of the displayed kW/W value and the power trend graph. Independent from the flow toggle. Does not affect the SOC %.", _n = "Flow direction: + value animates from Grid to Center (import). - value animates from Center to Grid (export).", mn = "Flow direction: + value animates from Grid 2 to Center (import). - value animates from Center to Grid 2 (export).", fn = "In default mode, this sub-node renders the entity as numeric value + unit.", yn = "When enabled, this sub-node displays the entity state text (for example AUS/WW/HZ) instead of numeric value + unit.", gn = "When enabled, this solar sub-node displays entity state text instead of numeric value + unit and is excluded from Solar auto-calc.", bn = "Automatically formats values with metric prefixes (for example W/kW/MW and Wh/kWh/MWh).", vn = "Optional unit override/fallback. Used when entities have no unit and as preferred output unit for auto-calculated values.", wn = "Default decimal precision for displayed values and fallback when base/prefixed decimals are not set.", xn = "Decimal precision for base units (W, Wh) when Auto unit scaling is enabled.", Sn = "Decimal precision for prefixed units (kW, MW, kWh, MWh) when Auto unit scaling is enabled.", En = "Controls where trend data is fetched from. In most setups, keep Auto (recommended), which prefers statistics and falls back to history automatically.", jr = "When on, each node has its own tap/hold/double-tap, configured inside that node's own Interactions section. Tap defaults to the zoom view, long-press to the node detail dialog. The card-level Tap/Hold/Double-tap fields below are then no longer applied to node clicks.", Kr = "Choose what happens when you tap, long-press or double-tap this node. Long-press defaults to opening the PowerPilz node detail dialog with a history graph.", Ue = (t, e = "Interactions") => ({
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
          helper: Kr,
          description: Kr
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
}), vc = [
  fc("Center visuals", "mdi:palette-outline", [
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
                helper: bn,
                description: bn
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
                helper: Sn,
                description: Sn
              },
              {
                name: "decimals_base_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: xn,
                description: xn
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
                helper: vn,
                description: vn
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: wn,
                description: wn
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
                selector: yc,
                helper: En,
                description: En
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
            helper: sn,
            description: sn
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
                helper: an,
                description: an
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
      de("Calculation", [
        {
          name: "solar_auto_calculate",
          selector: { boolean: {} },
          helper: tn,
          description: tn
        }
      ]),
      de("Trend", [
        { name: "solar_trend", selector: { boolean: {} } },
        {
          name: "solar_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      Ue("solar")
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
            helper: rn,
            description: rn
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
                helper: _n,
                description: _n
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
      de("Trend", [
        { name: "grid_trend", selector: { boolean: {} } },
        {
          name: "grid_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      de("Export", [
        {
          name: "grid_export_highlight",
          selector: { boolean: {} },
          helper: gt,
          description: gt
        },
        {
          name: "grid_export_trend_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        },
        {
          name: "grid_export_icon_highlight",
          selector: { boolean: {} },
          helper: bt,
          description: bt
        },
        {
          name: "grid_export_icon_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        }
      ]),
      Ue("grid")
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
            helper: on,
            description: on
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
                helper: mn,
                description: mn
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
      de("Trend", [
        { name: "grid_secondary_trend", selector: { boolean: {} } },
        {
          name: "grid_secondary_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      de("Export", [
        {
          name: "grid_secondary_export_highlight",
          selector: { boolean: {} },
          helper: gt,
          description: gt
        },
        {
          name: "grid_secondary_export_trend_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        },
        {
          name: "grid_secondary_export_icon_highlight",
          selector: { boolean: {} },
          helper: bt,
          description: bt
        },
        {
          name: "grid_secondary_export_icon_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        }
      ]),
      Ue("grid_secondary")
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
            helper: ln,
            description: ln
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
                helper: cn,
                description: cn
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
      de("Calculation", [
        {
          name: "home_auto_calculate",
          selector: { boolean: {} },
          helper: nn,
          description: nn
        }
      ]),
      de("Trend", [
        { name: "home_trend", selector: { boolean: {} } },
        {
          name: "home_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      Ue("home")
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
            helper: dn,
            description: dn
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
                helper: hn,
                description: hn
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
      de("Trend", [
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
                helper: Vt,
                description: Vt
              },
              {
                name: "battery_invert_value_sign",
                selector: { boolean: {} },
                helper: Ut,
                description: Ut
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
                helper: vt,
                description: vt
              }
            ]
          }
        ]
      },
      Ue("battery")
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
            helper: un,
            description: un
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
                helper: pn,
                description: pn
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
      de("Trend", [
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
                helper: Vt,
                description: Vt
              },
              {
                name: "battery_secondary_invert_value_sign",
                selector: { boolean: {} },
                helper: Ut,
                description: Ut
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
                helper: vt,
                description: vt
              }
            ]
          }
        ]
      },
      Ue("battery_secondary")
    ]
  },
  Ft("solar", "Solar sub blocks", "mdi:solar-power-variant", uc),
  Ft("grid", "Grid 1 sub blocks", "mdi:transmission-tower", Wr),
  Ft("grid_secondary", "Grid 2 sub blocks", "mdi:transmission-tower", Wr),
  Ft("home", "Home sub blocks", "mdi:flash", pc),
  {
    type: "expandable",
    name: "",
    title: "Actions",
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
            helper: jr,
            description: jr
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
], wc = {
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
  hold_action: "Hold behavior",
  double_tap_action: "Double tap behavior",
  node_actions_enabled: "Enable per-node interactions",
  solar_tap_action: "Tap behavior",
  solar_hold_action: "Hold behavior",
  solar_double_tap_action: "Double tap behavior",
  grid_tap_action: "Tap behavior",
  grid_hold_action: "Hold behavior",
  grid_double_tap_action: "Double tap behavior",
  grid_secondary_tap_action: "Tap behavior",
  grid_secondary_hold_action: "Hold behavior",
  grid_secondary_double_tap_action: "Double tap behavior",
  home_tap_action: "Tap behavior",
  home_hold_action: "Hold behavior",
  home_double_tap_action: "Double tap behavior",
  battery_tap_action: "Tap behavior",
  battery_hold_action: "Hold behavior",
  battery_double_tap_action: "Double tap behavior",
  battery_secondary_tap_action: "Tap behavior",
  battery_secondary_hold_action: "Hold behavior",
  battery_secondary_double_tap_action: "Double tap behavior"
};
let ii = class extends D {
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
      return wc[e] ?? e;
    }, this.computeHelper = (t) => {
      const e = t.name ?? "";
      if (e === "solar_entity")
        return an;
      if (e === "grid_entity")
        return _n;
      if (e === "grid_secondary_entity")
        return mn;
      if (e === "home_entity")
        return cn;
      if (e === "battery_entity")
        return hn;
      if (e === "battery_secondary_entity")
        return pn;
      if (/^(solar|home|grid|grid_secondary)_sub_\d+_icon_color$/.test(e))
        return fn;
      if (/^(home|grid|grid_secondary)_sub_\d+_state_mode$/.test(e))
        return yn;
      if (/^solar_sub_\d+_state_mode$/.test(e))
        return gn;
      if (e === "solar_visible")
        return sn;
      if (e === "home_visible")
        return ln;
      if (e === "battery_visible")
        return dn;
      if (e === "battery_secondary_visible")
        return un;
      if (e === "solar_auto_calculate")
        return tn;
      if (e === "home_auto_calculate")
        return nn;
      if (e === "grid_visible")
        return rn;
      if (e === "grid_secondary_visible")
        return on;
      if (e === "grid_export_highlight" || e === "grid_secondary_export_highlight")
        return gt;
      if (e === "grid_export_icon_highlight" || e === "grid_secondary_export_icon_highlight")
        return bt;
      if (e === "battery_low_alert_color" || e === "battery_secondary_low_alert_color")
        return vt;
      if (e === "unit")
        return vn;
      if (e === "decimals")
        return wn;
      if (e === "decimals_base_unit")
        return xn;
      if (e === "decimals_prefixed_unit")
        return Sn;
      if (e === "trend_data_source")
        return En;
      if (e === "auto_scale_units")
        return bn;
    }, this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM")
        return;
      const i = t.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i))
        return;
      const n = {
        ...i,
        trend_data_source: bc(i.trend_data_source),
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
      trend_data_source: gc(t.trend_data_source),
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
    return !this.hass || !this._config ? $ : v`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Ce}
      </div>
      <div style="margin: 0 0 14px; color: var(--secondary-text-color); line-height: 1.4;">
        Highly flexible energy flow card with configurable main nodes, trends, sub-nodes, auto calculations,
        export highlighting, and advanced unit handling.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${vc}
        .computeLabel=${this.computeLabel}
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
In([
  O({ attribute: !1 })
], ii.prototype, "hass", 2);
In([
  T()
], ii.prototype, "_config", 2);
ii = In([
  ce("power-pilz-energy-card-editor")
], ii);
var xc = Object.defineProperty, Sc = Object.getOwnPropertyDescriptor, $e = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Sc(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (n ? s(e, i, r) : s(r)) || r);
  return n && r && xc(e, i, r), r;
};
const U = 0.01, _t = 1, tt = 1440 * 60 * 1e3, Gr = 300 * 1e3, Yr = 60 * 1e3, Ec = 350, qr = 4, Xr = 8, Fi = 2, Cc = 260, $c = 220, Zr = -1e-6, Be = "red", kc = "var(--rgb-primary-text-color, 33, 33, 33)", Tc = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), Jr = "powerpilz-energy-node-detail", Qr = "powerpilz-energy-node-zoom";
let se = class extends D {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._showSubBlocks = !1, this._compactSubBlocks = !1, this._subNodeConnectorSegments = [], this._nodeActionHandlers = /* @__PURE__ */ new Map(), this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._isVisible = !1, this._liveRuntimeActive = !1, this._trendDrawConfig = {}, this._canvasColorContextCache = {}, this.handleCardKeyDown = (t) => {
      t.key !== "Enter" && t.key !== " " || (t.preventDefault(), this.fireAction("tap"));
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-energy-card-editor");
  }
  static async getStubConfig(t) {
    const e = (t == null ? void 0 : t.states) ?? {}, i = Object.keys(e), n = (...h) => h.find((d) => d in e), r = (h) => i.find((d) => d.startsWith(`${h}.`)), o = n("sensor.dev_home_power", "sensor.house_consumption_power") ?? r("sensor") ?? "sensor.dev_home_power", s = n("sensor.dev_solar_power", "sensor.solar_production_power") ?? r("sensor"), a = n("sensor.dev_grid_power", "sensor.grid_power") ?? r("sensor"), l = n("sensor.dev_battery_power", "sensor.home_battery_power") ?? r("sensor"), c = n("sensor.dev_battery_soc", "sensor.home_battery_soc") ?? r("sensor");
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
      decimals: _t,
      decimals_base_unit: _t,
      decimals_prefixed_unit: _t
    };
  }
  setConfig(t) {
    const e = t.home_entity ?? t.consumption_entity ?? "sensor.dev_home_power", i = typeof t.decimals == "number" && Number.isFinite(t.decimals) ? Math.min(3, Math.max(0, Math.round(t.decimals))) : _t, n = me(t.decimals_base_unit, i), r = me(t.decimals_prefixed_unit, i);
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
      grid_export_trend_color: t.grid_export_trend_color ?? Be,
      grid_export_icon_highlight: t.grid_export_icon_highlight ?? !1,
      grid_export_icon_color: t.grid_export_icon_color ?? Be,
      grid_secondary_export_highlight: t.grid_secondary_export_highlight ?? !1,
      grid_secondary_export_trend_color: t.grid_secondary_export_trend_color ?? Be,
      grid_secondary_export_icon_highlight: t.grid_secondary_export_icon_highlight ?? !1,
      grid_secondary_export_icon_color: t.grid_secondary_export_icon_color ?? Be,
      shared_trend_scale: t.shared_trend_scale ?? !1,
      debug_performance: t.debug_performance ?? !1,
      trend_data_source: J(t.trend_data_source, "hybrid"),
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: n,
      decimals_prefixed_unit: r,
      battery_low_alert: t.battery_low_alert ?? !1,
      battery_low_threshold: this.normalizeBatteryThreshold(t.battery_low_threshold),
      battery_low_alert_color: t.battery_low_alert_color ?? Be,
      battery_secondary_low_alert: t.battery_secondary_low_alert ?? !1,
      battery_secondary_low_threshold: this.normalizeBatteryThreshold(t.battery_secondary_low_threshold),
      battery_secondary_low_alert_color: t.battery_secondary_low_alert_color ?? Be,
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
      return v`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return v``;
    const t = this._config, e = t.decimals ?? _t, i = t.home_visible !== !1, n = t.solar_visible !== !1, r = t.grid_visible !== !1, o = r && t.grid_secondary_visible === !0, s = t.battery_visible !== !1, a = s && t.battery_secondary_visible === !0, l = this.normalizeBatteryDualAlignment(t.battery_dual_alignment), c = n ? this.collectSubBlocks("solar", t) : [], h = c.filter((N) => !N.stateMode), d = r ? this.collectSubBlocks("grid", t) : [], u = o ? this.collectSubBlocks("grid_secondary", t) : [], _ = i ? this.collectSubBlocks("home", t) : [], p = V(this.hass, t.home_entity), y = n ? V(this.hass, t.solar_entity) : null, f = r ? V(this.hass, t.grid_entity) : null, g = o ? V(this.hass, t.grid_secondary_entity) : null, x = s ? V(this.hass, t.battery_entity) : null, E = V(this.hass, t.battery_percentage_entity), C = a ? V(this.hass, t.battery_secondary_entity) : null, w = V(this.hass, t.battery_secondary_percentage_entity), b = t.unit ?? "kW", S = W(this.hass, t.solar_entity) ?? b, k = W(this.hass, t.grid_entity) ?? b, z = W(this.hass, t.grid_secondary_entity) ?? b, M = W(this.hass, t.battery_entity), I = W(this.hass, t.battery_percentage_entity), R = W(this.hass, t.battery_secondary_entity), H = W(this.hass, t.battery_secondary_percentage_entity), K = M ?? b, te = R ?? b, Xe = this.resolveBatteryPercentage(
      E,
      x,
      M
    ), Ze = this.resolveBatteryPercentage(
      w,
      C,
      R
    ), pi = !!this.readConfigString(t.battery_percentage_entity) || this.isPercentageUnit(M), _i = !!this.readConfigString(t.battery_secondary_percentage_entity) || this.isPercentageUnit(R), ht = t.solar_auto_calculate === !0 ? this.resolveAutoSolarUnit(t, h, b) : S, ut = t.solar_auto_calculate === !0 ? this.computeAutoSolarValueFromSubBlocks(h, ht) : y, mi = t.home_auto_calculate === !0 ? this.resolveAutoHomeUnit(t, b, ht) : W(this.hass, t.home_entity) ?? b, Mt = t.home_auto_calculate === !0 ? this.computeAutoHomeValueFromNodeValues(
      {
        solar: ut,
        grid: f,
        grid_secondary: g,
        battery: x,
        battery_secondary: C
      },
      {
        solar: ht,
        grid: k,
        grid_secondary: z,
        battery: K,
        battery_secondary: te
      },
      mi
    ) : p, Ms = pi ? I ?? "%" : K, As = _i ? H ?? "%" : te, Ps = this.toUnidirectionalFlow(ut), Os = this.toUnidirectionalFlow(Mt), Is = this.toBidirectionalFlow(f), Rs = this.toBidirectionalFlow(g), Ds = this.sumComparableValues([
      { value: f, unit: k },
      { value: g, unit: z }
    ]), Ns = f === null && g === null ? "none" : this.toBidirectionalFlow(Ds), Ls = t.battery_invert_flow === !0, Hs = t.battery_secondary_invert_flow === !0, er = Ls && x !== null ? -x : x, tr = Hs && C !== null ? -C : C, Bs = this.toBidirectionalFlow(er), Fs = this.toBidirectionalFlow(tr), Vs = this.sumComparableValues([
      { value: er, unit: K },
      { value: tr, unit: te }
    ]), Us = x === null && C === null ? "none" : this.toBidirectionalFlow(Vs), Ws = t.battery_invert_value_sign === !0, js = t.battery_secondary_invert_value_sign === !0, ir = Ws && x !== null ? -x : x, nr = js && C !== null ? -C : C, Ks = this.hasConfiguredAction(t), fi = !this.isEditorPreview() && Ks, Gs = this.iconColorStyle(t.solar_icon_color), Ys = this.iconColorStyle(t.home_icon_color), qs = this.iconShapeStyle(t.core_icon_color), yi = new Set(_.map((N) => N.index)), Je = new Set(c.map((N) => N.index)), Xs = yi.has(7) && yi.has(8), Zs = [5, 6, 7, 8].some((N) => yi.has(N)), Js = Je.has(1) && Je.has(2) && !Je.has(3) && !Je.has(4), Qs = Je.has(3) && Je.has(4), rr = o && (Js && Xs || Qs && Zs), ea = o && !rr, gi = _.some((N) => N.index >= 7), or = this.homeSubPositions(gi), sr = this.gridSubPositions(o), ar = this.gridSecondarySubPositions(), lr = this.solarSubPositions(
      gi,
      ea,
      rr
    ), cr = _.filter((N) => N.index <= (gi ? 8 : 6)), bi = r ? { col: 1, row: o ? 2 : 3, colSpan: 2, rowSpan: 2 } : null, vi = o ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 } : null, wi = s ? {
      col: a && l === "center" ? 2 : 3,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, xi = a ? {
      col: l === "left" ? 1 : l === "right" ? 5 : 4,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, G = this.computeGridBounds(
      i,
      n,
      r,
      o,
      s,
      a,
      bi,
      vi,
      wi,
      xi,
      c,
      d,
      u,
      cr,
      lr,
      sr,
      ar,
      or
    ), Si = n ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, G) : null, At = bi ? this.normalizePlacement(bi, G) : null, Pt = vi ? this.normalizePlacement(vi, G) : null, Ei = i ? this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, G) : null, Ot = wi ? this.normalizePlacement(wi, G) : null, It = xi ? this.normalizePlacement(xi, G) : null, dr = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, G), ta = this.normalizePositions(lr, G), ia = this.normalizePositions(sr, G), na = this.normalizePositions(ar, G), ra = this.normalizePositions(or, G), hr = this.normalizeBatteryThreshold(t.battery_low_threshold), ur = !!t.battery_low_alert, pr = this.normalizeBatteryThreshold(t.battery_secondary_low_threshold), _r = !!t.battery_secondary_low_alert, Rt = this.resolveColor(Be), Ci = this.resolveColor(t.battery_low_alert_color, Rt), $i = this.resolveColor(
      t.battery_secondary_low_alert_color,
      Rt
    ), ki = ur && Xe !== null && Xe <= hr, oa = this.iconColorStyle(
      ki ? Ci : t.battery_icon_color
    ), sa = this.batteryIcon(
      Xe,
      this.isPercentageUnit(M) ? null : x,
      t.battery_icon
    ), Ti = _r && Ze !== null && Ze <= pr, aa = this.iconColorStyle(
      Ti ? $i : t.battery_secondary_icon_color
    ), la = this.batteryIcon(
      Ze,
      this.isPercentageUnit(R) ? null : C,
      t.battery_secondary_icon
    ), ca = f !== null && Number.isFinite(f) && f < 0, da = g !== null && Number.isFinite(g) && g < 0, ha = this.iconColorStyle(
      t.grid_export_icon_highlight === !0 && ca ? t.grid_export_icon_color : t.grid_icon_color
    ), ua = this.iconColorStyle(
      t.grid_secondary_export_icon_highlight === !0 && da ? t.grid_secondary_export_icon_color : t.grid_secondary_icon_color
    ), pa = { "--flow-color-rgb": this.toRgbCss(t.flow_color) ?? kc }, Qe = this.resolveColor("purple"), _a = this.resolveColor(t.solar_trend_color, Qe), ma = this.resolveColor(t.grid_trend_color, Qe), fa = this.resolveColor(t.grid_secondary_trend_color, Qe), ya = this.resolveColor(t.grid_export_trend_color, Rt), ga = this.resolveColor(
      t.grid_secondary_export_trend_color,
      Rt
    ), ba = this.resolveColor(t.home_trend_color, Qe), va = this.resolveColor(t.battery_trend_color, Qe), wa = this.resolveColor(t.battery_secondary_trend_color, Qe), xa = t.grid_export_highlight === !0 ? Zr : null, Sa = t.grid_secondary_export_highlight === !0 ? Zr : null, Ea = ur && pi ? hr : null, Ca = pi ? Xe : ir, $a = _r && _i ? pr : null, ka = _i ? Ze : nr, Ta = this.buildFlowSegments(
      Ei,
      dr,
      Si,
      [
        ...At ? [{ placement: At, direction: Is }] : [],
        ...Pt ? [{ placement: Pt, direction: Rs }] : []
      ],
      Ns,
      [
        ...Ot ? [{ placement: Ot, direction: Bs }] : [],
        ...It ? [{ placement: It, direction: Fs }] : []
      ],
      Us,
      Ps,
      Os,
      G
    );
    return v`
      <ha-card
        class=${fi ? "interactive" : ""}
        tabindex=${fi ? 0 : -1}
        role=${fi ? "button" : "article"}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div
            class="energy-grid"
            style=${A({
      ...pa,
      "--grid-columns": `${G.cols}`,
      "--grid-rows": `${G.rows}`,
      "--grid-aspect": `${G.cols} / ${G.rows}`
    })}
          >
            ${Ta.map(
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

            ${n && Si ? v`
                  <div
                    class="energy-value solar ${ut === null ? "missing" : ""}"
                    data-pp-node-key="solar"
                    style=${A(this.gridPlacementStyle(Si))}
                  >
                    ${this.renderTrend("solar", ut, ht, !!t.solar_trend, _a, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.solar_icon ?? "mdi:weather-sunny"}
                        style=${A(Gs)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(ut, ht, e)}</div>
                      <div class="energy-label">${t.solar_label}</div>
                    </div>
                  </div>
                ` : $}

            ${r && At ? v`
                  <div
                    class="energy-value grid ${f === null ? "missing" : ""}"
                    data-pp-node-key="grid"
                    style=${A(this.gridPlacementStyle(At))}
                  >
                    ${this.renderTrend(
      "grid",
      f,
      k,
      !!t.grid_trend,
      ma,
      xa,
      ya
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.grid_icon ?? "mdi:transmission-tower"}
                        style=${A(ha)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(f, k, e)}</div>
                      <div class="energy-label">${t.grid_label}</div>
                    </div>
                  </div>
                ` : $}

            ${o && Pt ? v`
                  <div
                    class="energy-value grid-secondary ${g === null ? "missing" : ""}"
                    data-pp-node-key="grid_secondary"
                    style=${A(this.gridPlacementStyle(Pt))}
                  >
                    ${this.renderTrend(
      "grid_secondary",
      g,
      z,
      !!t.grid_secondary_trend,
      fa,
      Sa,
      ga
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${A(ua)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(g, z, e)}</div>
                      <div class="energy-label">${t.grid_secondary_label}</div>
                    </div>
                  </div>
                ` : $}

            ${i && Ei ? v`
                  <div
                    class="energy-value home ${Mt === null ? "missing" : ""}"
                    data-pp-node-key="home"
                    style=${A(this.gridPlacementStyle(Ei))}
                  >
                    ${this.renderTrend("home", Mt, mi, !!t.home_trend, ba, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.home_icon ?? "mdi:home-lightning-bolt"}
                        style=${A(Ys)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(Mt, mi, e)}</div>
                      <div class="energy-label">${t.home_label}</div>
                    </div>
                  </div>
                ` : $}

            ${this._showSubBlocks ? this.renderSubNodes("solar", c, ta, e) : $}
            ${this._showSubBlocks ? this.renderSubNodes("grid", d, ia, e) : $}
            ${this._showSubBlocks ? this.renderSubNodes("grid_secondary", u, na, e) : $}
            ${this._showSubBlocks ? this.renderSubNodes("home", cr, ra, e) : $}

            ${s && Ot ? v`
                  <div
                    class="energy-value battery ${x === null ? "missing" : ""}"
                    data-pp-node-key="battery"
                    style=${A(this.gridPlacementStyle(Ot))}
                  >
                    ${this.renderTrend(
      "battery",
      Ca,
      Ms,
      !!t.battery_trend,
      va,
      Ea,
      Ci
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon class="energy-icon" .icon=${sa} style=${A(oa)}></ha-icon>
                        ${Xe !== null ? v`
                              <div
                                class="battery-percentage ${ki ? "alert" : ""}"
                                style=${A(ki ? { color: Ci } : {})}
                              >
                                ${this.formatBatteryPercentage(Xe)}
                              </div>
                            ` : $}
                      </div>
                      <div class="energy-number">${this.formatValue(ir, K, e)}</div>
                      <div class="energy-label">${t.battery_label}</div>
                    </div>
                  </div>
                ` : $}

            ${a && It ? v`
                  <div
                    class="energy-value battery-secondary ${C === null ? "missing" : ""}"
                    data-pp-node-key="battery_secondary"
                    style=${A(this.gridPlacementStyle(It))}
                  >
                    ${this.renderTrend(
      "battery_secondary",
      ka,
      As,
      !!t.battery_secondary_trend,
      wa,
      $a,
      $i
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${la}
                          style=${A(aa)}
                        ></ha-icon>
                        ${Ze !== null ? v`
                              <div
                                class="battery-percentage ${Ti ? "alert" : ""}"
                                style=${A(Ti ? { color: $i } : {})}
                              >
                                ${this.formatBatteryPercentage(Ze)}
                              </div>
                            ` : $}
                      </div>
                      <div class="energy-number">${this.formatValue(nr, te, e)}</div>
                      <div class="energy-label">${t.battery_secondary_label}</div>
                    </div>
                  </div>
                ` : $}

            <div class="home-core" style=${A(this.gridPlacementStyle(dr))}>
              <div class="home-core-icon" style=${A(qs)}>
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
    return v`<div class=${n} style=${A(i)} aria-hidden="true"></div>`;
  }
  renderSubNodeConnectors() {
    return !this._showSubBlocks || this._subNodeConnectorSegments.length === 0 ? $ : v`
      <div class="subnode-connectors" aria-hidden="true">
        ${this._subNodeConnectorSegments.map(
      (t) => v`
            <div
              class="subnode-connector-segment ${t.node}"
              style=${A({
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
    const i = [], n = t === "solar" ? "mdi:solar-power-variant" : t === "home" ? "mdi:flash" : "mdi:transmission-tower", r = t === "solar" ? "Solar" : t === "home" ? "Home" : t === "grid" ? "Grid" : "Grid 2", o = t === "solar" ? qr : t === "home" ? Xr : Fi;
    for (let d = 1; d <= o; d += 1) {
      const u = e[`${t}_sub_${d}_enabled`] === !0, _ = this.readConfigString(e[`${t}_sub_${d}_entity`]);
      if (!u || !_)
        continue;
      const p = e[`${t}_sub_${d}_state_mode`] === !0;
      i.push({
        key: `${t}_${d}`,
        index: d,
        icon: this.readConfigString(e[`${t}_sub_${d}_icon`]) ?? n,
        iconStyle: this.iconColorStyle(e[`${t}_sub_${d}_icon_color`]),
        label: this.readConfigString(e[`${t}_sub_${d}_label`]) ?? `${r} ${d}`,
        value: V(this.hass, _),
        unit: W(this.hass, _) ?? e.unit ?? "kW",
        stateMode: p,
        stateText: p ? qt(this.hass, _) : void 0
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
        value: V(this.hass, a),
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
    return Object.entries(t).forEach(([n, r]) => {
      i[Number(n)] = {
        row: r.row - e.minRow + 1,
        col: r.col - e.minCol + 1
      };
    }), i;
  }
  computeGridBounds(t, e, i, n, r, o, s, a, l, c, h, d, u, _, p, y, f, g) {
    const x = [{ col: 3, row: 3, colSpan: 2, rowSpan: 2 }];
    t && x.push({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }), e && x.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }), i && s && x.push(s), n && a && x.push(a), r && l && x.push(l), o && c && x.push(c), h.forEach((S) => {
      const k = p[S.index];
      k && x.push({ col: k.col, row: k.row, colSpan: 1, rowSpan: 1 });
    }), d.forEach((S) => {
      const k = y[S.index];
      k && x.push({ col: k.col, row: k.row, colSpan: 1, rowSpan: 1 });
    }), u.forEach((S) => {
      const k = f[S.index];
      k && x.push({ col: k.col, row: k.row, colSpan: 1, rowSpan: 1 });
    }), _.forEach((S) => {
      const k = g[S.index];
      k && x.push({ col: k.col, row: k.row, colSpan: 1, rowSpan: 1 });
    });
    const E = Math.min(...x.map((S) => S.col)), C = Math.max(...x.map((S) => S.col + (S.colSpan ?? 1) - 1)), w = Math.min(...x.map((S) => S.row)), b = Math.max(...x.map((S) => S.row + (S.rowSpan ?? 1) - 1));
    return {
      minCol: E,
      maxCol: C,
      minRow: w,
      maxRow: b,
      cols: C - E + 1,
      rows: b - w + 1
    };
  }
  placementCenter(t, e) {
    const i = t.colSpan ?? 1, n = t.rowSpan ?? 1;
    return {
      x: (t.col - 1 + i / 2) / e.cols * 100,
      y: (t.row - 1 + n / 2) / e.rows * 100
    };
  }
  buildFlowSegments(t, e, i, n, r, o, s, a, l, c) {
    const h = this.placementCenter(e, c), d = [], u = (p, y, f, g) => {
      const x = Math.min(p, y), E = Math.abs(y - p);
      E <= U || d.push({
        orientation: "horizontal",
        direction: g,
        left: x,
        top: f,
        width: E,
        height: 0
      });
    }, _ = (p, y, f, g) => {
      const x = Math.min(p, y), E = Math.abs(y - p);
      E <= U || d.push({
        orientation: "vertical",
        direction: g,
        left: f,
        top: x,
        width: 0,
        height: E
      });
    };
    if (t) {
      const p = this.placementCenter(t, c);
      u(h.x, p.x, h.y, l);
    }
    if (i) {
      const p = this.placementCenter(i, c);
      _(p.y, h.y, h.x, a);
    }
    if (n.length === 1) {
      const [{ placement: p, direction: y }] = n, f = this.placementCenter(p, c);
      u(f.x, h.x, h.y, y);
    } else if (n.length >= 2) {
      const p = n.map((g) => ({
        direction: g.direction,
        center: this.placementCenter(g.placement, c)
      })).sort((g, x) => g.center.y - x.center.y), y = Math.min(...p.map((g) => g.center.x)), f = h.x - (h.x - y) * 0.5;
      u(h.x, f, h.y, r), p.forEach((g) => {
        const x = g.center.y > h.y + U ? this.reverseFlowDirection(g.direction) : g.direction;
        _(h.y, g.center.y, f, x), u(g.center.x, f, g.center.y, g.direction);
      });
    }
    if (o.length === 1) {
      const [{ placement: p, direction: y }] = o, f = this.placementCenter(p, c);
      _(h.y, f.y, h.x, y);
    } else if (o.length >= 2) {
      const p = o.map((g) => ({
        placement: g.placement,
        direction: g.direction,
        center: this.placementCenter(g.placement, c)
      })).sort((g, x) => g.center.y - x.center.y), y = Math.min(
        ...p.map((g) => (g.placement.row - 1) / c.rows * 100)
      ), f = Math.max(h.y + U, y);
      _(h.y, f, h.x, s), p.forEach((g) => {
        const x = g.center.x < h.x - U ? this.reverseFlowDirection(g.direction) : g.direction;
        u(h.x, g.center.x, f, x), _(f, g.center.y, g.center.x, g.direction);
      });
    }
    return d;
  }
  renderSubNodes(t, e, i, n) {
    return e.length === 0 ? $ : v`
      ${e.map((r) => {
      var _;
      const o = i[r.index];
      if (!o)
        return $;
      const s = {
        "grid-column": `${o.col}`,
        "grid-row": `${o.row}`
      }, a = ((_ = r.stateText) == null ? void 0 : _.trim()) ?? "", l = r.stateMode, c = a.length === 0, h = l ? c ? "--" : a : this.formatValue(r.value, r.unit, n), d = l ? { value: h, unit: "" } : this.splitFormattedValueAndUnit(h, r.unit), u = l ? c : r.value === null;
      return v`
            <div
              class="energy-sub-value ${t}-sub sub-col-${o.col} ${this._compactSubBlocks ? "compact" : ""} ${u ? "missing" : ""}"
              data-key=${r.key}
              data-pp-node-key="${t}_sub_${r.index}"
              style=${A(s)}
            >
              <div class="energy-sub-content">
                <ha-icon class="energy-sub-icon" .icon=${r.icon} style=${A(r.iconStyle)}></ha-icon>
                <div class="energy-sub-number">${this._compactSubBlocks ? d.value : h}</div>
                ${l ? $ : v`<div class="energy-sub-unit">${d.unit}</div>`}
                <div class="energy-sub-label">${r.label}</div>
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
    const r = e.map((s) => s.unit).find((s) => typeof s == "string" && s.trim().length > 0);
    if (r)
      return r;
    const o = W(this.hass, t.solar_entity);
    return o && o.trim().length > 0 ? o : i;
  }
  computeAutoSolarValueFromSubBlocks(t, e) {
    const i = t.filter(
      (l) => l.value !== null && Number.isFinite(l.value)
    );
    if (i.length === 0)
      return null;
    const n = i.reduce((l, c) => l + c.value, 0);
    let r = null, o = 0;
    for (const l of i) {
      const c = Z(l.unit);
      if (!c)
        return n <= U ? 0 : n;
      if (r === null)
        r = c.family;
      else if (r !== c.family)
        return n <= U ? 0 : n;
      o += l.value * c.factor;
    }
    let s = o;
    const a = Z(e);
    return a && r !== null && a.family === r && a.factor > 0 && (s /= a.factor), Number.isFinite(s) ? s <= U ? 0 : s : null;
  }
  homeComputationDependencies(t) {
    const e = [], i = (n, r) => {
      r && e.push({ role: n, entityId: r });
    };
    return t.solar_visible !== !1 && i("solar", this.readConfigString(t.solar_entity)), t.grid_visible !== !1 && (i("grid", this.readConfigString(t.grid_entity)), t.grid_secondary_visible === !0 && i("grid_secondary", this.readConfigString(t.grid_secondary_entity))), t.battery_visible !== !1 && (i("battery", this.readConfigString(t.battery_entity)), t.battery_secondary_visible === !0 && i("battery_secondary", this.readConfigString(t.battery_secondary_entity))), e;
  }
  resolveAutoHomeUnit(t, e, i) {
    const n = t.unit;
    if (n && n.trim().length > 0)
      return n;
    if (t.solar_auto_calculate === !0 && t.solar_visible !== !1 && i && i.trim().length > 0)
      return i;
    const r = this.homeComputationDependencies(t);
    for (const o of r) {
      const s = W(this.hass, o.entityId);
      if (s && s.trim().length > 0)
        return s;
    }
    return e;
  }
  computeAutoHomeValueFromNodeValues(t, e, i) {
    if (!Object.values(t).some((h) => h != null && Number.isFinite(h)))
      return null;
    const r = {};
    let o = 0;
    e && Object.keys(t).forEach((h) => {
      const d = t[h], u = e[h];
      d != null && Number.isFinite(d) && (o += 1, u && (r[h] = u));
    });
    const s = Object.keys(r).length === o ? gl(r) : { comparable: !1, family: null, factors: {} }, a = s.comparable ? s.factors : void 0, l = (h) => {
      const d = t[h];
      if (d == null || !Number.isFinite(d))
        return 0;
      const u = (a == null ? void 0 : a[h]) ?? 1;
      return d * u;
    };
    let c = l("solar") + l("grid") + l("grid_secondary") - l("battery") - l("battery_secondary");
    if (a && i) {
      const h = Z(i);
      h && s.family !== null && h.family === s.family && h.factor > 0 && (c /= h.factor);
    }
    return Number.isFinite(c) ? c <= U ? 0 : c : null;
  }
  sumComparableValues(t) {
    const e = t.filter(
      (r) => r.value !== null && Number.isFinite(r.value)
    );
    if (e.length === 0)
      return null;
    let i = null, n = 0;
    for (const r of e) {
      const o = Z(r.unit);
      if (!o)
        return e.reduce((s, a) => s + a.value, 0);
      if (i === null)
        i = o.family;
      else if (i !== o.family)
        return e.reduce((s, a) => s + a.value, 0);
      n += r.value * o.factor;
    }
    return n;
  }
  renderTrend(t, e, i, n, r, o, s) {
    return n ? (this._trendDrawConfig[t] = {
      currentValue: e,
      unit: i,
      color: r,
      threshold: o,
      thresholdColor: s
    }, v`
      <div class="node-trend" aria-hidden="true">
        <canvas class="node-trend-canvas-area" data-node=${t}></canvas>
      </div>
      <div class="node-trend-line" aria-hidden="true">
        <canvas class="node-trend-canvas-line" data-node=${t}></canvas>
      </div>
    `) : (delete this._trendDrawConfig[t], $);
  }
  trendPoints(t, e) {
    const i = Date.now(), n = i - tt, r = this._trendSeries[t] ?? [];
    let o = 0;
    for (; o < r.length && r[o].ts < n; )
      o += 1;
    const s = o > 0 ? r.slice(o) : [...r];
    return e !== null && Number.isFinite(e) && s.push({ ts: i, value: e }), s;
  }
  buildThresholdTrendSegments(t, e) {
    const i = [];
    for (let n = 1; n < t.length; n += 1) {
      const r = t[n - 1], o = t[n], s = r.value <= e, a = o.value <= e;
      if (s === a || Math.abs(o.value - r.value) <= U) {
        i.push({
          start: r,
          end: o,
          low: s
        });
        continue;
      }
      const l = (e - r.value) / (o.value - r.value), c = Math.max(0, Math.min(1, l)), h = {
        x: r.x + (o.x - r.x) * c,
        y: r.y + (o.y - r.y) * c,
        value: e,
        ts: r.ts + (o.ts - r.ts) * c
      };
      i.push({
        start: r,
        end: h,
        low: s
      }), i.push({
        start: h,
        end: o,
        low: a
      });
    }
    return i;
  }
  toTrendCoordinates(t, e) {
    var g, x;
    const n = Date.now() - tt, r = 0, o = 100, s = t.map((E) => E.value), a = (e == null ? void 0 : e.min) ?? Math.min(...s), l = (e == null ? void 0 : e.max) ?? Math.max(...s);
    if (!Number.isFinite(a) || !Number.isFinite(l))
      return [];
    const c = 20, h = 80, d = Math.max(l - a, U), u = t.map((E) => {
      const C = Math.max(0, Math.min(100, (E.ts - n) / tt * 100)), w = r + C / 100 * (o - r), b = d <= U ? 0.5 : (E.value - a) / d, S = h - b * (h - c);
      return { x: w, y: S, value: E.value, ts: E.ts };
    }), _ = ((g = u[0]) == null ? void 0 : g.x) ?? r, p = ((x = u[u.length - 1]) == null ? void 0 : x.x) ?? o, y = Math.max(0, p - _), f = 18;
    if (u.length >= 2 && y < f) {
      const E = o - f, C = Math.max(r, Math.min(E, p - f));
      if (y <= U) {
        const b = f / (u.length - 1);
        return u.map((S, k) => ({
          ...S,
          x: Math.max(r, Math.min(o, C + b * k))
        }));
      }
      const w = f / y;
      return u.map((b) => ({
        ...b,
        x: Math.max(r, Math.min(o, C + (b.x - _) * w))
      }));
    }
    return u;
  }
  toCanvasPoints(t, e, i) {
    return Pn(t, e, i);
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
    if (Object.entries(t).forEach(([o, s]) => {
      if (!this.isSharedScaleParticipant(o))
        return;
      const a = (e == null ? void 0 : e[o]) ?? 1;
      s.forEach((l) => i.push(l.value * a));
    }), i.length === 0)
      return null;
    const n = Math.min(...i), r = Math.max(...i);
    return !Number.isFinite(n) || !Number.isFinite(r) ? null : { min: n, max: r };
  }
  resolveSharedTrendUnitFactors(t) {
    const e = Object.keys(t).filter(
      (r) => this.isSharedScaleParticipant(r)
    );
    if (e.length === 0)
      return null;
    let i = null;
    const n = {};
    for (const r of e) {
      const o = this._trendDrawConfig[r];
      if (!o)
        return null;
      const s = Z(o.unit);
      if (!s)
        return null;
      if (i === null)
        i = s.family;
      else if (i !== s.family)
        return null;
      n[r] = s.factor;
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
    const e = t.getBoundingClientRect(), i = e.width <= Cc || e.height <= $c;
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
    const t = this.renderRoot.querySelector(".energy-grid"), e = this.renderRoot.querySelector(".energy-value.home"), i = this.renderRoot.querySelector(".energy-value.solar"), n = this.renderRoot.querySelector(".energy-value.grid"), r = this.renderRoot.querySelector(".energy-value.grid-secondary");
    if (!t) {
      this._subNodeConnectorSegments.length > 0 && (this._subNodeConnectorSegments = []);
      return;
    }
    const o = t.getBoundingClientRect(), s = e == null ? void 0 : e.getBoundingClientRect(), a = i == null ? void 0 : i.getBoundingClientRect(), l = n == null ? void 0 : n.getBoundingClientRect(), c = r == null ? void 0 : r.getBoundingClientRect(), h = s ? s.left + s.width / 2 : 0, d = a ? a.top + a.height / 2 : 0, u = l ? l.left + l.width / 2 : 0, _ = c ? c.left + c.width / 2 : 0, p = (w) => w - o.left, y = (w) => w - o.top, f = (w) => Math.round(w * 10) / 10, g = [], x = (w, b, S, k) => {
      const z = Math.min(w, b), M = Math.abs(b - w);
      M <= 0.5 || g.push({
        node: k,
        left: f(z),
        top: f(S - 1),
        width: f(M),
        height: 2
      });
    }, E = (w, b, S, k) => {
      const z = Math.min(w, b), M = Math.abs(b - w);
      M <= 0.5 || g.push({
        node: k,
        left: f(S - 1),
        top: f(z),
        width: 2,
        height: f(M)
      });
    };
    s && this.renderRoot.querySelectorAll(".energy-sub-value.home-sub").forEach((w) => {
      const b = w.getBoundingClientRect(), S = b.top + b.height / 2, k = b.left + b.width / 2 < h ? b.right : b.left, z = S, M = S < s.top ? s.top : S > s.bottom ? s.bottom : S, I = p(h), R = y(z), H = y(M), K = p(k);
      x(K, I, R, "home"), E(R, H, I, "home");
    }), a && this.renderRoot.querySelectorAll(".energy-sub-value.solar-sub").forEach((w) => {
      const b = w.getBoundingClientRect(), S = b.left + b.width / 2, k = b.top + b.height / 2 < d ? b.bottom : b.top, z = S, M = S < a.left ? a.left : S > a.right ? a.right : S, I = y(d), R = p(z), H = p(M), K = y(k);
      E(K, I, R, "solar"), x(R, H, I, "solar");
    }), l && this.renderRoot.querySelectorAll(".energy-sub-value.grid-sub").forEach((w) => {
      const b = w.getBoundingClientRect(), S = b.top + b.height / 2, k = b.left + b.width / 2 < u ? b.right : b.left, z = S, M = S < l.top ? l.top : S > l.bottom ? l.bottom : S, I = p(u), R = y(z), H = y(M), K = p(k);
      x(K, I, R, "grid"), E(R, H, I, "grid");
    }), c && this.renderRoot.querySelectorAll(".energy-sub-value.grid_secondary-sub").forEach((w) => {
      const b = w.getBoundingClientRect(), S = b.top + b.height / 2, k = b.left + b.width / 2 < _ ? b.right : b.left, z = S, M = S < c.top ? c.top : S > c.bottom ? c.bottom : S, I = p(_), R = y(z), H = y(M), K = p(k);
      x(K, I, R, "grid_secondary"), E(R, H, I, "grid_secondary");
    }), g.length === this._subNodeConnectorSegments.length && g.every(
      (w, b) => {
        var S, k, z, M, I;
        return w.node === ((S = this._subNodeConnectorSegments[b]) == null ? void 0 : S.node) && w.left === ((k = this._subNodeConnectorSegments[b]) == null ? void 0 : k.left) && w.top === ((z = this._subNodeConnectorSegments[b]) == null ? void 0 : z.top) && w.width === ((M = this._subNodeConnectorSegments[b]) == null ? void 0 : M.width) && w.height === ((I = this._subNodeConnectorSegments[b]) == null ? void 0 : I.height);
      }
    ) || (this._subNodeConnectorSegments = g);
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
    const t = this.perfNow(), e = this.collectTrendCanvases(".node-trend-canvas-area"), i = this.collectTrendCanvases(".node-trend-canvas-line"), n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    e.forEach((u, _) => {
      const p = this.prepareTrendCanvas(u);
      p && n.set(_, p);
    }), i.forEach((u, _) => {
      const p = this.prepareTrendCanvas(u);
      p && r.set(_, p);
    });
    const o = {};
    Object.keys(this._trendDrawConfig).forEach((u) => {
      const _ = this._trendDrawConfig[u];
      if (!_)
        return;
      const p = this.trendPoints(u, _.currentValue);
      p.length >= 2 && (o[u] = p);
    });
    const s = ((d = this._config) == null ? void 0 : d.shared_trend_scale) === !0, a = s ? this.resolveSharedTrendUnitFactors(o) : null, l = s ? this.computeTrendValueRange(o, a ?? void 0) : null;
    let c = 0, h = 0;
    Object.keys(this._trendDrawConfig).forEach((u) => {
      const _ = this._trendDrawConfig[u];
      if (!_)
        return;
      const p = n.get(u), y = r.get(u);
      if (!p || !y)
        return;
      const f = o[u];
      if (!f || f.length < 2)
        return;
      const g = s && a !== null && this.isSharedScaleParticipant(u), x = g ? (a == null ? void 0 : a[u]) ?? 1 : 1, E = g ? this.scaleTrendSeries(f, x) : f, C = g ? l : null, w = this.toTrendCoordinates(E, C);
      if (w.length < 2)
        return;
      const b = this.toCanvasPoints(w, p.width, p.height), S = this.toCanvasPoints(w, y.width, y.height);
      this.drawTrendArea(
        p.ctx,
        b,
        _.color,
        p.height,
        _.threshold,
        _.thresholdColor
      ), this.drawTrendLine(y.ctx, S, _.color, _.threshold, _.thresholdColor), c += 1, h += S.length;
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
    return lt(t);
  }
  drawTrendArea(t, e, i, n, r, o) {
    if (e.length < 2)
      return;
    const s = this.resolveCanvasColor(i);
    if (r === null) {
      this.fillTrendAreaRun(t, e, s, n);
      return;
    }
    const a = this.resolveCanvasColor(o), l = this.buildThresholdTrendSegments(e, r);
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
      const n = e[e.length - 1], r = n.points[n.points.length - 1], o = Math.abs(r.x - i.start.x) <= 0.01 && Math.abs(r.y - i.start.y) <= 0.01;
      n.low === i.low && o ? n.points.push(i.end) : e.push({
        low: i.low,
        points: [i.start, i.end]
      });
    }
    return e;
  }
  fillTrendAreaRun(t, e, i, n) {
    if (e.length < 2)
      return;
    const r = e[0], o = e[e.length - 1], s = Math.min(...e.map((l) => l.y)), a = t.createLinearGradient(0, s, 0, n);
    a.addColorStop(0, this.withAlpha(i, 0.24)), a.addColorStop(1, this.withAlpha(i, 0)), t.beginPath(), t.moveTo(r.x, r.y), e.slice(1).forEach((l) => t.lineTo(l.x, l.y)), t.lineTo(o.x, n), t.lineTo(r.x, n), t.closePath(), t.fillStyle = a, t.fill();
  }
  drawTrendLine(t, e, i, n, r) {
    if (e.length < 2)
      return;
    const o = this.resolveCanvasColor(i), s = this.resolveCanvasColor(r);
    if (n === null) {
      this.strokeTrendPolyline(t, e, o, 1.5);
      return;
    }
    this.buildThresholdTrendSegments(e, n).forEach((l) => {
      this.strokeTrendSegment(t, l.start, l.end, l.low ? s : o, 1.5);
    });
  }
  strokeTrendPolyline(t, e, i, n) {
    e.length < 2 || (t.beginPath(), t.moveTo(e[0].x, e[0].y), e.slice(1).forEach((r) => t.lineTo(r.x, r.y)), t.strokeStyle = i, t.lineWidth = n, t.lineCap = "round", t.lineJoin = "round", t.stroke());
  }
  strokeTrendSegment(t, e, i, n, r) {
    t.beginPath(), t.moveTo(e.x, e.y), t.lineTo(i.x, i.y), t.strokeStyle = n, t.lineWidth = r, t.lineCap = "round", t.lineJoin = "round", t.stroke();
  }
  resolveCanvasColor(t) {
    return we(this.renderRoot, t);
  }
  withAlpha(t, e) {
    return ct(t, e, this._canvasColorContextCache);
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
    var n, r;
    const t = this.renderRoot.querySelector("ha-card");
    if (!t || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const e = !!((n = this._config.hold_action) != null && n.action && this._config.hold_action.action !== "none"), i = !!((r = this._config.double_tap_action) != null && r.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = at(
      t,
      {
        onTap: () => this.fireAction("tap"),
        onHold: () => this.fireAction("hold"),
        onDoubleTap: () => this.fireAction("double_tap")
      },
      { hasHold: e, hasDoubleTap: i }
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
      const n = this.hasNodeAction(i, "hold"), r = ((l = this.nodeActionConfig(i, "hold")) == null ? void 0 : l.action) === "none", o = n || !r, s = this.hasNodeAction(i, "double_tap"), a = at(
        e,
        {
          onTap: () => this.fireNodeAction(i, "tap", e),
          onHold: () => this.fireNodeAction(i, "hold", e),
          onDoubleTap: () => this.fireNodeAction(i, "double_tap", e)
        },
        { hasHold: o, hasDoubleTap: s, stopPropagation: !0 }
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
    if (e === "tap" && (!n || !n.action) && (n = { action: Qr }), e === "hold" && (!n || !n.action) && (n = { action: Jr }), !n || !n.action || n.action === "none")
      return;
    if (n.action === Jr) {
      this.openNodeDetailDialog(t);
      return;
    }
    if (n.action === Qr) {
      this.openNodeZoomOverlay(t, i);
      return;
    }
    const r = {
      ...this._config,
      tap_action: e === "tap" ? n : this._config.tap_action,
      hold_action: e === "hold" ? n : this._config.hold_action,
      double_tap_action: e === "double_tap" ? n : this._config.double_tap_action,
      // Use the node's primary entity for more-info if no explicit entity in actionConfig.
      entity: n.entity ?? this.nodeEntityId(t) ?? this._config.entity
    };
    this.dispatchEvent(
      new CustomEvent("hass-action", {
        detail: { config: r, action: e },
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
    const n = this.renderRoot.querySelector("ha-card"), r = n == null ? void 0 : n.getBoundingClientRect();
    lc({
      hass: this.hass,
      config: this._config,
      focusedNodeKey: t,
      originRect: i.getBoundingClientRect(),
      cardRect: r
    });
  }
  /** Stub — wired up to the energy-node-dialog module in a separate
   *  phase. Kept here so per-node hold callbacks resolve cleanly. */
  openNodeDetailDialog(t) {
    !this._config || !this.hass || nc({
      hass: this.hass,
      config: this._config,
      focusedNodeKey: t
    });
  }
  updated(t) {
    t.has("_config") && this.setupActionHandler(), this.updateComplete.then(() => this.setupNodeActionHandlers());
    const e = t.get("_config"), i = t.has("_config") && this.shouldRefreshTrendOnConfigChange(e, this._config), n = t.get("hass"), r = t.has("hass") && this.didRelevantEntityStateChange(n);
    (t.has("preview") || t.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (t.has("_config") ? i && this.scheduleConfigRefresh() : t.has("hass") && this._isVisible && r && this.maybeRefreshTrendHistory(), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (t.has("_config") ? i && this.scheduleConfigRefresh(!0) : t.has("hass") && r && this.maybeRefreshTrendHistory(!1, !0), this._trendResizeObserver && this._trendResizeObserver.disconnect());
    const o = t.has("_config") || t.has("_trendSeries") || t.has("_showSubBlocks") || t.has("preview") || t.has("editMode") || r;
    o && this.updateSubBlockVisibility(), (!this.shouldRunLiveRuntime() || this._isVisible) && o && (this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
  }
  maybeRefreshTrendHistory(t = !1, e = !1) {
    if (!this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview())
      return;
    t && (this._lastTrendRefresh = 0);
    const i = Date.now();
    !t && i - this._lastTrendRefresh < Gr || (this._lastTrendRefresh = i, this.refreshTrendHistory(t, e));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(Tc) || this.hasEditorLikeAncestor();
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
    }, Ec));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(t = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(t), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Gr), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.syncTrendResizeObserver(), this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this.clearConfigRefreshTimer(), this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._subNodeConnectorRaf !== void 0 && (window.cancelAnimationFrame(this._subNodeConnectorRaf), this._subNodeConnectorRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
  }
  async refreshTrendHistory(t = !1, e = !1) {
    var o, s;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !e)
      return;
    const i = this._config, n = J(i.trend_data_source, "hybrid"), r = this.enabledTrendNodes(i);
    if (r.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const a = this.perfNow(), l = {}, c = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Set(), _ = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set();
      let y = Number.POSITIVE_INFINITY;
      const f = Date.now() - tt;
      for (const b of r) {
        if (b === "home" && i.home_auto_calculate === !0) {
          const I = this.homeComputationDependencies(i);
          if (I.length === 0) {
            l[b] = [];
            continue;
          }
          h.set(b, I), d.set(b, this.resolveAutoHomeUnit(i, i.unit ?? "kW"));
          const R = this._trendSeries[b] ?? [];
          if (t || R.length === 0) {
            u.add(b), I.forEach((te) => {
              _.add(te.entityId), p.delete(te.entityId);
            });
            continue;
          }
          const H = ((o = R[R.length - 1]) == null ? void 0 : o.ts) ?? f, K = Math.max(f, H - Yr);
          y = Math.min(y, K), I.forEach((te) => {
            _.has(te.entityId) || p.add(te.entityId);
          });
          continue;
        }
        const S = this.trendEntityId(b, i);
        if (!S)
          continue;
        c.set(b, S);
        const k = this._trendSeries[b] ?? [];
        if (t || k.length === 0 || _.has(S)) {
          _.add(S), p.delete(S);
          continue;
        }
        if (_.has(S))
          continue;
        p.add(S);
        const z = ((s = k[k.length - 1]) == null ? void 0 : s.ts) ?? f, M = Math.max(f, z - Yr);
        y = Math.min(y, M);
      }
      let g = 0;
      const x = _.size > 0 ? await (async () => {
        const b = this.perfNow(), S = await Ie(
          this.hass,
          Array.from(_),
          tt,
          { dataSource: n }
        );
        return g = this.perfNow() - b, S;
      })() : {};
      let E = 0;
      const C = p.size > 0 ? await (async () => {
        const b = this.perfNow(), S = await Ie(
          this.hass,
          Array.from(p),
          tt,
          {
            startMs: Number.isFinite(y) ? y : f,
            dataSource: n
          }
        );
        return E = this.perfNow() - b, S;
      })() : {};
      c.forEach((b, S) => {
        const k = this._trendSeries[S] ?? [];
        if (_.has(b)) {
          const z = x[b] ?? [];
          l[S] = z.length > 0 ? z : k.filter((M) => M.ts >= f);
          return;
        }
        if (p.has(b)) {
          const z = C[b] ?? [];
          l[S] = ei(k, z, f);
          return;
        }
        l[S] = k.filter((z) => z.ts >= f);
      }), h.forEach((b, S) => {
        const k = this._trendSeries[S] ?? [], z = this.computeAutoHomeTrendFromFetchedDependencies(
          b,
          x,
          C,
          _,
          p,
          f,
          d.get(S) ?? i.unit ?? "kW"
        );
        if (u.has(S)) {
          l[S] = z.length > 0 ? z : k.filter((M) => M.ts >= f);
          return;
        }
        l[S] = ei(k, z, f);
      });
      const w = this.sameTrendSeriesKeys(l, this._trendSeries) && Object.keys(l).every(
        (b) => this.areTrendSeriesEqual(l[b] ?? [], this._trendSeries[b] ?? [])
      );
      w || (this._trendSeries = l), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - a),
        force_full: t,
        nodes: r.length,
        full_entities: _.size,
        incremental_entities: p.size,
        data_source: n,
        full_fetch_ms: this.toPerfMs(g),
        incremental_fetch_ms: this.toPerfMs(E),
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
    const e = /* @__PURE__ */ new Set(), i = (r) => {
      const o = this.readConfigString(r);
      o && e.add(o);
    };
    i(t.home_entity), i(t.solar_entity), i(t.grid_entity), i(t.grid_secondary_entity), i(t.battery_entity), i(t.battery_percentage_entity), i(t.battery_secondary_entity), i(t.battery_secondary_percentage_entity), t.solar_sub_enabled && i(t.solar_sub_entity), t.home_sub_enabled && i(t.home_sub_entity);
    const n = (r, o) => {
      for (let s = 1; s <= o; s += 1)
        t[`${r}_sub_${s}_enabled`] === !0 && i(t[`${r}_sub_${s}_entity`]);
    };
    return n("solar", qr), n("home", Xr), n("grid", Fi), n("grid_secondary", Fi), Array.from(e);
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
    return e.push(`source:${J(t.trend_data_source, "hybrid")}`), this.enabledTrendNodes(t).forEach((i) => {
      if (i === "home" && t.home_auto_calculate === !0) {
        const n = this.homeComputationDependencies(t).map((r) => `${r.role}:${r.entityId}`).sort().join(",");
        e.push(`home:auto:${n}`);
        return;
      }
      e.push(`${i}:${this.trendEntityId(i, t) ?? ""}`);
    }), e.sort().join("|");
  }
  shouldRefreshTrendOnConfigChange(t, e) {
    return !t || !e ? !0 : this.trendHistorySignature(t) !== this.trendHistorySignature(e);
  }
  computeAutoHomeTrendFromFetchedDependencies(t, e, i, n, r, o, s) {
    const a = {}, l = {};
    return t.forEach((c) => {
      const h = n.has(c.entityId) ? e[c.entityId] ?? [] : r.has(c.entityId) ? i[c.entityId] ?? [] : [];
      a[c.role] = h.filter((u) => Number.isFinite(u.ts) && Number.isFinite(u.value) && u.ts >= o).sort((u, _) => u.ts - _.ts);
      const d = W(this.hass, c.entityId);
      d && (l[c.role] = d);
    }), this.computeAutoHomeTrendSeries(a, o, l, s);
  }
  computeAutoHomeTrendSeries(t, e, i, n) {
    const r = [];
    if (Object.values(t).forEach((s) => {
      s.forEach((a) => {
        Number.isFinite(a.ts) && a.ts >= e && r.push(a.ts);
      });
    }), r.length === 0)
      return [];
    r.sort((s, a) => s - a);
    const o = [];
    return r.forEach((s) => {
      const a = o[o.length - 1];
      (a === void 0 || Math.abs(a - s) > 0.5) && o.push(s);
    }), o.map((s) => {
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
    let n = 0, r = t.length - 1;
    for (; n <= r; ) {
      const h = Math.floor((n + r) / 2), d = t[h];
      if (Math.abs(d.ts - e) <= 0.5)
        return d.value;
      d.ts < e ? n = h + 1 : r = h - 1;
    }
    const o = Math.max(1, Math.min(t.length - 1, n)), s = t[o - 1], a = t[o], l = a.ts - s.ts;
    if (Math.abs(l) <= U)
      return a.value;
    const c = (e - s.ts) / l;
    return s.value + (a.value - s.value) * c;
  }
  sameTrendSeriesKeys(t, e) {
    const i = Object.keys(t).sort(), n = Object.keys(e).sort();
    return i.length === n.length && i.every((r, o) => r === n[o]);
  }
  areTrendSeriesEqual(t, e) {
    if (t.length !== e.length)
      return !1;
    for (let i = 0; i < t.length; i += 1) {
      const n = t[i], r = e[i];
      if (n.ts !== r.ts || Math.abs(n.value - r.value) > 1e-4)
        return !1;
    }
    return !0;
  }
  hasConfiguredAction(t) {
    return t.details_navigation_path ? !0 : [t.tap_action, t.hold_action, t.double_tap_action].some(
      (e) => e && e.action && e.action !== "none"
    );
  }
  fireAction(t) {
    if (this.isEditorPreview() || !this._config)
      return;
    const e = `${t}_action`;
    let i = this._config[e], n = this._config;
    if (!i && t === "tap" && this._config.details_navigation_path && (i = { action: "navigate", navigation_path: this._config.details_navigation_path }, n = { ...this._config, tap_action: i }), !(!i || !i.action || i.action === "none")) {
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
    var n, r, o;
    return kt(t, e, i, {
      enabled: ((n = this._config) == null ? void 0 : n.auto_scale_units) === !0,
      baseDecimals: ((r = this._config) == null ? void 0 : r.decimals_base_unit) ?? i,
      prefixedDecimals: ((o = this._config) == null ? void 0 : o.decimals_prefixed_unit) ?? i
    });
  }
  splitFormattedValueAndUnit(t, e) {
    const i = t.trim(), n = e.trim();
    if (i.length === 0)
      return { value: "--", unit: n };
    if (n.length === 0)
      return { value: i, unit: "" };
    const r = ` ${n}`;
    if (i.endsWith(r))
      return {
        value: i.slice(0, Math.max(0, i.length - r.length)).trim(),
        unit: n
      };
    const o = i.lastIndexOf(" ");
    return o > 0 ? {
      value: i.slice(0, o).trim(),
      unit: i.slice(o + 1).trim()
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
    return pe(t, e);
  }
  toRgbCss(t) {
    return ue(t);
  }
};
se.styles = Q`
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
$e([
  O({ attribute: !1 })
], se.prototype, "hass", 2);
$e([
  O({ type: Boolean })
], se.prototype, "preview", 2);
$e([
  O({ type: Boolean })
], se.prototype, "editMode", 2);
$e([
  T()
], se.prototype, "_config", 2);
$e([
  T()
], se.prototype, "_trendSeries", 2);
$e([
  T()
], se.prototype, "_showSubBlocks", 2);
$e([
  T()
], se.prototype, "_compactSubBlocks", 2);
$e([
  T()
], se.prototype, "_subNodeConnectorSegments", 2);
se = $e([
  ce("power-pilz-energy-card")
], se);
const _e = (t) => {
  if (typeof t != "string")
    return;
  const e = t.trim();
  return e.length > 0 ? e : void 0;
}, us = (t, e) => {
  switch (t) {
    case 1:
      return _e(e.entity_1);
    case 2:
      return _e(e.entity_2);
    case 3:
      return _e(e.entity_3);
    case 4:
      return _e(e.entity_4);
    default:
      return;
  }
}, ps = (t, e) => {
  switch (t) {
    case 1:
      return _e(e.entity_1_name);
    case 2:
      return _e(e.entity_2_name);
    case 3:
      return _e(e.entity_3_name);
    case 4:
      return _e(e.entity_4_name);
    default:
      return;
  }
}, _s = (t, e) => {
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
}, ms = (t, e) => {
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
}, fs = (t, e) => {
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
}, ys = (t, e) => {
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
}, gs = (t, e) => {
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
}, bs = (t) => t === "column" ? "column" : "row", Rn = (t, e = 24) => {
  const i = typeof t == "number" ? t : typeof t == "string" ? Number.parseInt(t, 10) : NaN;
  return i === 6 || i === 12 || i === 24 || i === 48 || i === 72 || i === 168 || i === 336 || i === 720 ? i : e;
}, Dn = (t) => typeof t != "number" || !Number.isFinite(t) ? 1.5 : Math.max(0.5, Math.min(6, t)), vs = (t, e, i, n) => {
  var s;
  if (e)
    return e;
  const r = t[i], o = (s = r == null ? void 0 : r.attributes) == null ? void 0 : s.friendly_name;
  return typeof o == "string" && o.trim().length > 0 ? o.trim() : `Entity ${n}`;
}, ws = (t, e, i, n) => {
  if (n)
    return kt(t, e, i, {
      ...n,
      nullWithUnit: !0
    });
  if (t === null)
    return e ? `-- ${e}` : "--";
  const r = `${t.toFixed(i)} ${e}`.trim();
  return r.length > 0 ? r : "--";
}, zc = 4, xs = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, eo = "When enabled, hovering over the graph shows the value and timestamp for that point in the legend.", to = "When enabled, the area below each trend line is filled with a semi-transparent gradient.", io = "When enabled, all entities share the same Y-axis scale. When disabled, each entity auto-scales independently.", no = "When enabled, the graph area is clipped so it does not extend behind the legend labels.", ro = "Thickness of the trend lines in pixels.", oo = "Controls where trend data is fetched from. Hybrid prefers statistics and falls back to history automatically.", so = "The time window shown in the graph.", ao = "Controls whether entity legend items are displayed in a row or column layout.", lo = "When enabled, all entity values are normalized as percentages of a reference total, so the graph always fills 0–100%.", co = "The entity whose value represents 100%. Defaults to the last enabled entity in the stack.", ho = "When enabled, the 100% total is auto-calculated by summing all other entities. Useful when you don't have a total meter.", uo = "Default entity used by more-info actions. Required when tap/hold/double-tap is set to 'More info'.", po = "Automatically formats values with metric prefixes (e.g. W/kW/MW and Wh/kWh/MWh).", _o = "Optional unit override. Used when entities have no unit_of_measurement attribute.", mo = "Default decimal precision for displayed values.", fo = "Decimal precision for base units (W, Wh) when auto unit scaling is enabled.", yo = "Decimal precision for prefixed units (kW, MW, kWh, MWh) when auto unit scaling is enabled.", Mc = {
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
}, Ac = (t) => ({
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
                  default_color: xs[t] ?? "purple"
                }
              }
            }
          ]
        }
      ]
    }
  ]
}), Ss = (t = !1, e = !1) => {
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
            helper: ao,
            description: ao
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
            helper: so,
            description: so
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
            helper: oo,
            description: oo
          }
        ]
      }
    ]
  }, r = {
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
            helper: eo,
            description: eo
          },
          {
            name: "fill_area_enabled",
            selector: { boolean: {} },
            helper: to,
            description: to
          },
          {
            name: "shared_trend_scale",
            selector: { boolean: {} },
            helper: io,
            description: io
          },
          {
            name: "clip_graph_to_labels",
            selector: { boolean: {} },
            helper: no,
            description: no
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
            helper: ro,
            description: ro
          }
        ]
      }
    ]
  }, o = [];
  if (t) {
    const l = [
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "normalize_stack_to_percent",
            selector: { boolean: {} },
            helper: lo,
            description: lo
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
            helper: co,
            description: co
          },
          {
            name: "percent_reference_auto",
            selector: { boolean: {} },
            helper: ho,
            description: ho
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
        helper: uo,
        description: uo
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
                helper: _o,
                description: _o
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: mo,
                description: mo
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
                helper: po,
                description: po
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
                helper: fo,
                description: fo
              },
              {
                name: "decimals_prefixed_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: yo,
                description: yo
              }
            ]
          }
        ]
      }
    ]
  };
  return [
    i,
    r,
    ...o,
    ...Array.from({ length: zc }, (l, c) => Ac(c + 1)),
    a,
    s
  ];
}, be = (t) => {
  if (typeof t == "string")
    return t.length > 0 ? t : void 0;
}, Es = (t) => t === "column" ? "column" : "row", Cs = (t) => Rn(t), $s = (t) => Dn(t), Wt = (t, e, i) => {
  const n = t ?? e;
  return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : xs[i] ?? "purple";
}, ks = (t) => ({
  trend_data_source: J(t.trend_data_source, "hybrid"),
  entity_1: be(t.entity_1) ?? be(t.entity),
  entity_1_name: be(t.entity_1_name),
  entity_1_enabled: t.entity_1_enabled ?? !0,
  entity_1_show_icon: t.entity_1_show_icon ?? !0,
  entity_1_icon: t.entity_1_icon ?? t.icon,
  entity_1_icon_color: t.entity_1_icon_color ?? t.icon_color,
  entity_1_trend_color: Wt(t.entity_1_trend_color, t.trend_color, 1),
  entity_2: be(t.entity_2),
  entity_2_name: be(t.entity_2_name),
  entity_2_enabled: t.entity_2_enabled ?? !1,
  entity_2_show_icon: t.entity_2_show_icon ?? !0,
  entity_2_icon: t.entity_2_icon,
  entity_2_trend_color: Wt(t.entity_2_trend_color, void 0, 2),
  entity_3: be(t.entity_3),
  entity_3_name: be(t.entity_3_name),
  entity_3_enabled: t.entity_3_enabled ?? !1,
  entity_3_show_icon: t.entity_3_show_icon ?? !0,
  entity_3_icon: t.entity_3_icon,
  entity_3_trend_color: Wt(t.entity_3_trend_color, void 0, 3),
  entity_4: be(t.entity_4),
  entity_4_name: be(t.entity_4_name),
  entity_4_enabled: t.entity_4_enabled ?? !1,
  entity_4_show_icon: t.entity_4_show_icon ?? !0,
  entity_4_icon: t.entity_4_icon,
  entity_4_trend_color: Wt(t.entity_4_trend_color, void 0, 4)
}), Pc = {
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
}, Ts = (t, e = {}, i = "en") => {
  const n = t.name ?? "", r = n.match(/^entity_(\d+)_(enabled|name|show_icon|icon|icon_color|trend_color)$/);
  if (r) {
    const [, , a] = r;
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
  const s = Pc[n];
  return s ? m(i, s) : Mc[n] ?? n;
};
var Oc = Object.defineProperty, Ic = Object.getOwnPropertyDescriptor, Nn = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Ic(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (n ? s(e, i, r) : s(r)) || r);
  return n && r && Oc(e, i, r), r;
};
const Rc = Ss(!1);
let ni = class extends D {
  constructor() {
    super(...arguments), this.computeLabel = (t) => Ts(t, {}, P(this.hass)), this.valueChanged = (t) => {
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
      legend_layout: Es(t.legend_layout),
      timeframe_hours: Cs(t.timeframe_hours),
      hover_enabled: t.hover_enabled ?? !0,
      fill_area_enabled: t.fill_area_enabled ?? !0,
      shared_trend_scale: t.shared_trend_scale ?? !1,
      debug_performance: t.debug_performance ?? !1,
      decimals: t.decimals ?? 1,
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: t.decimals_base_unit ?? t.decimals ?? 1,
      decimals_prefixed_unit: t.decimals_prefixed_unit ?? t.decimals ?? 1,
      line_thickness: $s(t.line_thickness),
      clip_graph_to_labels: t.clip_graph_to_labels ?? !1,
      ...ks(t)
    };
    this._config = e;
  }
  render() {
    return !this.hass || !this._config ? $ : v`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Ce}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Rc}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Nn([
  O({ attribute: !1 })
], ni.prototype, "hass", 2);
Nn([
  T()
], ni.prototype, "_config", 2);
ni = Nn([
  ce("power-pilz-graph-card-editor")
], ni);
var Dc = Object.defineProperty, Nc = Object.getOwnPropertyDescriptor, De = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Nc(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (n ? s(e, i, r) : s(r)) || r);
  return n && r && Dc(e, i, r), r;
};
const mt = 1, go = 24, bo = 300 * 1e3, Lc = 60 * 1e3, Hc = 350, jt = 0.01, ft = 4, Bc = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", Fc = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), vo = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let ye = class extends D {
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
      const n = t.clientX - i.left, r = t.clientY - i.top;
      if (n < 0 || n > i.width || r < 0 || r > i.height) {
        this.clearHoverState();
        return;
      }
      const o = this.findNearestHoverPoint(n, r);
      if (!o) {
        this.clearHoverState();
        return;
      }
      const s = this._hoverState;
      s && s.slot === o.slot && Math.abs(s.x - o.x) <= 0.2 && Math.abs(s.y - o.y) <= 0.2 && Math.abs(s.value - o.value) <= 1e-4 && s.color === o.color || (this._hoverState = o);
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
    const e = (t == null ? void 0 : t.states) ?? {}, i = Object.keys(e), n = (...c) => c.find((h) => h in e), r = (c) => i.find((h) => h.startsWith(`${c}.`)), o = n("sensor.dev_home_power", "sensor.home_power") ?? r("sensor") ?? "sensor.dev_home_power", s = n("sensor.dev_solar_power", "sensor.solar_power"), a = n("sensor.dev_grid_power", "sensor.grid_power"), l = n("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-card",
      legend_layout: "row",
      timeframe_hours: go,
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
      decimals: mt,
      decimals_base_unit: mt,
      decimals_prefixed_unit: mt
    };
  }
  setConfig(t) {
    const e = typeof t.decimals == "number" && Number.isFinite(t.decimals) ? Math.min(3, Math.max(0, Math.round(t.decimals))) : mt, i = me(t.decimals_base_unit, e), n = me(t.decimals_prefixed_unit, e), r = this.readConfigString(t.entity), o = this.readConfigString(t.icon), s = this.readConfigString(t.entity_1) ?? r ?? "sensor.dev_home_power";
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
      trend_data_source: J(t.trend_data_source, "hybrid"),
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: i,
      decimals_prefixed_unit: n,
      entity_1: s,
      entity_1_name: this.readConfigString(t.entity_1_name),
      entity_1_enabled: t.entity_1_enabled ?? !0,
      entity_1_show_icon: t.entity_1_show_icon ?? !0,
      entity_1_icon: t.entity_1_icon ?? o ?? "mdi:chart-line",
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
      return v`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return v``;
    const t = this._config, e = t.decimals ?? mt, i = this.normalizeLineThickness(t.line_thickness), n = this.collectSeriesEntries(t, e), r = this.normalizeLegendLayout(t.legend_layout), o = t.hover_enabled !== !1, s = this.hasConfiguredAction(t), a = !this.isEditorPreview() && s, l = this._hoverState, c = t.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, h = c > 0 ? { top: `${c}px` } : {}, d = l ? {
      left: `${l.x}px`,
      top: `${l.y + c}px`,
      "--hover-dot-color": l.color
    } : {};
    return this._drawConfigs = n.map((u) => ({
      slot: u.slot,
      currentValue: u.currentValue,
      unit: u.unit,
      color: u.trendColor,
      lineWidth: i
    })), v`
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
          <div class="card-trend" style=${A(h)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${A(h)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${o && l ? v`<div class="hover-dot" aria-hidden="true" style=${A(d)}></div>` : $}

          <div class="content">
            <div class="series-list layout-${r}">
              ${n.length === 0 ? v`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : n.map(
      (u) => this.renderSeriesItem(
        u,
        l && l.slot === u.slot ? l : null
      )
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderSeriesItem(t, e) {
    const i = e === null ? null : this.convertSharedScaleHoverValue(t.slot, e.value), n = e === null ? null : this.formatHoverTimestamp(e.ts), r = i === null ? t.secondary : `${this.formatValue(i, t.unit, t.decimals)} - ${n ?? ""}`;
    return v`
      <div class="state-item" data-slot=${String(t.slot)}>
        ${t.showIcon ? v`
              <div class="icon-wrap">
                <div class="icon-shape" style=${A(t.iconStyle)}>
                  <ha-icon .icon=${t.icon}></ha-icon>
                </div>
              </div>
            ` : $}
        <div class="info">
          <div class="primary">${t.name}</div>
          <div class="secondary">${r}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(t, e) {
    const i = [];
    for (let n = 1; n <= ft; n += 1) {
      const r = n, o = this.slotEnabled(r, t), s = this.slotEntityId(r, t);
      if (!o || !s)
        continue;
      const a = this.entityName(this.slotCustomName(r, t), s, n), l = V(this.hass, s), c = t.unit ?? W(this.hass, s) ?? "", h = this.formatValue(l, c, e), d = this.slotIcon(r, t), u = this.iconStyle(this.slotIconColor(r, t)), _ = this.resolveColor(vo[r], Bc), p = this.resolveColor(this.slotTrendColor(r, t), _);
      i.push({
        slot: r,
        entityId: s,
        name: a,
        secondary: h,
        unit: c,
        decimals: e,
        currentValue: l,
        icon: d,
        showIcon: this.slotShowIcon(r, t),
        iconStyle: u,
        trendColor: p
      });
    }
    return i;
  }
  slotEntityId(t, e) {
    return us(t, e);
  }
  slotCustomName(t, e) {
    return ps(t, e);
  }
  slotEnabled(t, e) {
    return _s(t, e);
  }
  slotShowIcon(t, e) {
    return ms(t, e);
  }
  slotIcon(t, e) {
    return fs(t, e);
  }
  slotIconColor(t, e) {
    return ys(t, e);
  }
  slotTrendColor(t, e) {
    return gs(t, e);
  }
  entityName(t, e, i) {
    return vs(this.hass.states, t, e, i);
  }
  formatValue(t, e, i) {
    var n, r, o;
    return ws(t, e, i, {
      enabled: ((n = this._config) == null ? void 0 : n.auto_scale_units) === !0,
      baseDecimals: ((r = this._config) == null ? void 0 : r.decimals_base_unit) ?? i,
      prefixedDecimals: ((o = this._config) == null ? void 0 : o.decimals_prefixed_unit) ?? i
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
    const r = new Intl.DateTimeFormat(i, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(e);
    return `${n} ${r}`;
  }
  convertSharedScaleHoverValue(t, e) {
    if (!this._sharedScaleCanonical)
      return e;
    const i = this._sharedScaleFactors[t];
    return typeof i != "number" || !Number.isFinite(i) || i <= 0 ? e : e / i;
  }
  readConfigString(t) {
    return _e(t);
  }
  normalizeLegendLayout(t) {
    return bs(t);
  }
  normalizeTimeframeHours(t) {
    return Rn(t, go);
  }
  trendWindowMs(t) {
    return this.normalizeTimeframeHours(t == null ? void 0 : t.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(t) {
    return Dn(t);
  }
  normalizeTrendColor(t, e, i) {
    const n = t ?? e;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : vo[i];
  }
  iconStyle(t) {
    return xe(t);
  }
  resolveColor(t, e = "") {
    return pe(t, e);
  }
  trendPoints(t, e) {
    const i = Date.now(), n = i - this.trendWindowMs(this._config), r = this._trendSeries[t] ?? [];
    let o = 0;
    for (; o < r.length && r[o].ts < n; )
      o += 1;
    const s = o > 0 ? r.slice(o) : [...r];
    return e !== null && Number.isFinite(e) && s.push({ ts: i, value: e }), s;
  }
  toTrendCoordinates(t, e, i) {
    var x, E;
    const r = Date.now() - e, o = 0, s = 100, a = t.map((C) => C.value), l = (i == null ? void 0 : i.min) ?? Math.min(...a), c = (i == null ? void 0 : i.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const h = 20, d = 80, u = Math.max(c - l, jt), _ = t.map((C) => {
      const w = Math.max(0, Math.min(100, (C.ts - r) / e * 100)), b = o + w / 100 * (s - o), S = u <= jt ? 0.5 : (C.value - l) / u, k = d - S * (d - h);
      return { x: b, y: k, value: C.value, ts: C.ts };
    }), p = ((x = _[0]) == null ? void 0 : x.x) ?? o, y = ((E = _[_.length - 1]) == null ? void 0 : E.x) ?? s, f = Math.max(0, y - p), g = 18;
    if (_.length >= 2 && f < g) {
      const C = s - g, w = Math.max(o, Math.min(C, y - g));
      if (f <= jt) {
        const S = g / (_.length - 1);
        return _.map((k, z) => ({
          ...k,
          x: Math.max(o, Math.min(s, w + S * z))
        }));
      }
      const b = g / f;
      return _.map((S) => ({
        ...S,
        x: Math.max(o, Math.min(s, w + (S.x - p) * b))
      }));
    }
    return _;
  }
  toCanvasPoints(t, e, i) {
    return Pn(t, e, i).map((n) => ({
      x: n.x,
      y: n.y,
      value: n.value,
      ts: n.ts
    }));
  }
  computeTrendValueRange(t, e) {
    const i = [];
    if (Object.entries(t).forEach(([o, s]) => {
      const a = Number(o), l = (e == null ? void 0 : e[a]) ?? 1;
      s.forEach((c) => i.push(c.value * l));
    }), i.length === 0)
      return null;
    const n = Math.min(...i), r = Math.max(...i);
    return !Number.isFinite(n) || !Number.isFinite(r) ? null : { min: n, max: r };
  }
  resolveSharedScaleFactors(t) {
    let e = null;
    const i = {};
    Object.keys(t).map((o) => Number(o)).filter((o) => Number.isFinite(o) && o >= 1 && o <= ft).forEach((o) => {
      const s = o, a = this._drawConfigs.find((c) => c.slot === s);
      if (!a)
        return;
      const l = Z(a.unit);
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
    const r = Object.values(i).some((o) => !Number.isFinite(o ?? NaN));
    return e === null || r || Object.keys(i).length !== n.length ? null : i;
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
    var y, f;
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
    const n = this.prepareTrendCanvas(e), r = this.prepareTrendCanvas(i);
    if (!n || !r) {
      this._linePointsBySlot = {}, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const o = ((y = this._config) == null ? void 0 : y.fill_area_enabled) !== !1, s = this.trendWindowMs(this._config), a = {};
    this._drawConfigs.forEach((g) => {
      const x = this.trendPoints(g.slot, g.currentValue);
      x.length >= 2 && (a[g.slot] = x);
    });
    const l = ((f = this._config) == null ? void 0 : f.shared_trend_scale) === !0, c = l ? this.resolveSharedScaleFactors(a) : null;
    this._sharedScaleCanonical = c !== null, this._sharedScaleFactors = c ?? {};
    const h = l ? this.computeTrendValueRange(a, c ?? void 0) : null, d = {};
    let u = 0, _ = 0;
    [...this._drawConfigs].sort((g, x) => x.slot - g.slot).forEach((g) => {
      const x = a[g.slot];
      if (!x || x.length < 2)
        return;
      const E = (c == null ? void 0 : c[g.slot]) ?? 1, C = c ? this.scaleTrendSeries(x, E) : x, w = this.toTrendCoordinates(C, s, h);
      if (w.length < 2)
        return;
      const b = this.toCanvasPoints(w, n.width, n.height), S = this.toCanvasPoints(w, r.width, r.height);
      o && this.drawTrendArea(n.ctx, b, g.color, n.height), this.drawTrendLine(r.ctx, S, g.color, g.lineWidth), d[g.slot] = S, u += 1, _ += S.length;
    }), this._linePointsBySlot = d, this._hoverState && !d[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - t),
      series: u,
      points: _,
      fill_area: o,
      shared_scale: l,
      shared_scale_units: this._sharedScaleCanonical ? "canonical" : "raw"
    });
  }
  prepareTrendCanvas(t) {
    return lt(t);
  }
  drawTrendArea(t, e, i, n) {
    if (e.length < 2)
      return;
    const r = this.resolveCanvasColor(i), o = e[0], s = e[e.length - 1], a = Math.min(...e.map((c) => c.y)), l = t.createLinearGradient(0, a, 0, n);
    l.addColorStop(0, this.withAlpha(r, 0.24)), l.addColorStop(1, this.withAlpha(r, 0)), t.beginPath(), t.moveTo(o.x, o.y), e.slice(1).forEach((c) => t.lineTo(c.x, c.y)), t.lineTo(s.x, n), t.lineTo(o.x, n), t.closePath(), t.fillStyle = l, t.fill();
  }
  drawTrendLine(t, e, i, n) {
    if (e.length < 2)
      return;
    const r = this.resolveCanvasColor(i);
    this.strokeTrendPolyline(t, e, r, n);
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
    for (const r of this._drawConfigs) {
      const o = this._linePointsBySlot[r.slot];
      if (!o || o.length < 2)
        continue;
      const s = this.interpolateCanvasPoint(o, t);
      if (!s)
        continue;
      const a = Math.abs(s.y - e);
      a < n && (n = a, i = {
        slot: r.slot,
        x: s.x,
        y: s.y,
        value: s.value,
        ts: s.ts,
        color: r.color
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
    for (let r = 1; r < t.length; r += 1) {
      const o = t[r - 1], s = t[r];
      if (e > s.x)
        continue;
      const a = s.x - o.x;
      if (Math.abs(a) <= jt)
        return { x: e, y: s.y, value: s.value, ts: s.ts };
      const l = (e - o.x) / a;
      return {
        x: e,
        y: o.y + (s.y - o.y) * l,
        value: o.value + (s.value - o.value) * l,
        ts: o.ts + (s.ts - o.ts) * l
      };
    }
    return { x: e, y: n.y, value: n.value, ts: n.ts };
  }
  strokeTrendPolyline(t, e, i, n) {
    e.length < 2 || (t.beginPath(), t.moveTo(e[0].x, e[0].y), e.slice(1).forEach((r) => t.lineTo(r.x, r.y)), t.strokeStyle = i, t.lineWidth = n, t.lineCap = "round", t.lineJoin = "round", t.stroke());
  }
  resolveCanvasColor(t) {
    return we(this.renderRoot, t);
  }
  withAlpha(t, e) {
    return ct(t, e, this._canvasColorContextCache);
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
    var n, r;
    const t = this.renderRoot.querySelector("ha-card");
    if (!t || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const e = !!((n = this._config.hold_action) != null && n.action && this._config.hold_action.action !== "none"), i = !!((r = this._config.double_tap_action) != null && r.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = at(
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
    const e = t.get("_config"), i = t.has("_config") && this.shouldRefreshTrendOnConfigChange(e, this._config), n = t.get("hass"), r = t.has("hass") && this.didTrackedEntityStateChange(n);
    (t.has("preview") || t.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (t.has("_config") ? (i && this.scheduleConfigRefresh(), this.clearHoverState()) : t.has("hass") && this._isVisible && r && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (t.has("_config") ? (i && this.scheduleConfigRefresh(!0), this.clearHoverState()) : t.has("hass") && r && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((s = this._config) == null ? void 0 : s.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset();
    const o = t.has("_config") || t.has("_trendSeries") || t.has("_graphTopInset") || t.has("preview") || t.has("editMode") || r;
    (!this.shouldRunLiveRuntime() || this._isVisible) && o && this.scheduleTrendCanvasDraw();
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
    const n = e.getBoundingClientRect(), r = i.getBoundingClientRect(), o = Math.max(0, Math.ceil(r.bottom - n.top));
    Math.abs(o - this._graphTopInset) > 0.5 && (this._graphTopInset = o);
  }
  maybeRefreshTrendHistory(t = !1, e = !1) {
    if (!this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview())
      return;
    t && (this._lastTrendRefresh = 0);
    const i = Date.now();
    !t && i - this._lastTrendRefresh < bo || (this._lastTrendRefresh = i, this.refreshTrendHistory(t, e));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(Fc) || this.hasEditorLikeAncestor();
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
    }, Hc));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(t = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(t), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, bo), this.updateComplete.then(() => {
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
    const i = this._config, n = {}, r = this.trendWindowMs(i), o = J(i.trend_data_source, "hybrid"), s = this.enabledSlots(i);
    if (s.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const l = this.perfNow(), c = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
      let u = Number.POSITIVE_INFINITY;
      const _ = Date.now() - r;
      for (const E of s) {
        const C = this.slotEntityId(E, i);
        if (!C)
          continue;
        c.set(E, C);
        const w = this._trendSeries[E] ?? [];
        if (t || w.length === 0 || h.has(C)) {
          h.add(C), d.delete(C);
          continue;
        }
        if (h.has(C))
          continue;
        d.add(C);
        const b = ((a = w[w.length - 1]) == null ? void 0 : a.ts) ?? _, S = Math.max(_, b - Lc);
        u = Math.min(u, S);
      }
      let p = 0;
      const y = h.size > 0 ? await (async () => {
        const E = this.perfNow(), C = await Ie(
          this.hass,
          Array.from(h),
          r,
          { dataSource: o }
        );
        return p = this.perfNow() - E, C;
      })() : {};
      let f = 0;
      const g = d.size > 0 ? await (async () => {
        const E = this.perfNow(), C = await Ie(
          this.hass,
          Array.from(d),
          r,
          {
            startMs: Number.isFinite(u) ? u : _,
            dataSource: o
          }
        );
        return f = this.perfNow() - E, C;
      })() : {};
      c.forEach((E, C) => {
        const w = this._trendSeries[C] ?? [];
        if (h.has(E)) {
          const b = y[E] ?? [];
          n[C] = b.length > 0 ? b : w.filter((S) => S.ts >= _);
          return;
        }
        if (d.has(E)) {
          const b = g[E] ?? [];
          n[C] = ei(w, b, _);
          return;
        }
        n[C] = w.filter((b) => b.ts >= _);
      });
      const x = this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((E) => Number(E)).filter((E) => Number.isFinite(E) && E >= 1 && E <= ft).every((E) => {
        const C = E;
        return this.areTrendSeriesEqual(n[C] ?? [], this._trendSeries[C] ?? []);
      });
      x || (this._trendSeries = n), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - l),
        window_ms: r,
        force_full: t,
        slots: s.length,
        full_entities: h.size,
        incremental_entities: d.size,
        data_source: o,
        full_fetch_ms: this.toPerfMs(p),
        incremental_fetch_ms: this.toPerfMs(f),
        series_changed: !x
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(t) {
    const e = [];
    for (let i = 1; i <= ft; i += 1) {
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
    if (!t || !e || this.trendWindowMs(t) !== this.trendWindowMs(e) || J(t.trend_data_source, "hybrid") !== J(e.trend_data_source, "hybrid"))
      return !0;
    for (let i = 1; i <= ft; i += 1) {
      const n = i, r = this.slotEnabled(n, t), o = this.slotEnabled(n, e), s = r ? this.slotEntityId(n, t) : void 0, a = o ? this.slotEntityId(n, e) : void 0;
      if (r !== o || s !== a)
        return !0;
    }
    return !1;
  }
  sameTrendSeriesKeys(t, e) {
    const i = Object.keys(t).sort(), n = Object.keys(e).sort();
    return i.length === n.length && i.every((r, o) => r === n[o]);
  }
  areTrendSeriesEqual(t, e) {
    if (t.length !== e.length)
      return !1;
    for (let i = 0; i < t.length; i += 1) {
      const n = t[i], r = e[i];
      if (n.ts !== r.ts || Math.abs(n.value - r.value) > 1e-4)
        return !1;
    }
    return !0;
  }
};
ye.styles = Q`
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
De([
  O({ attribute: !1 })
], ye.prototype, "hass", 2);
De([
  O({ type: Boolean })
], ye.prototype, "preview", 2);
De([
  O({ type: Boolean })
], ye.prototype, "editMode", 2);
De([
  T()
], ye.prototype, "_config", 2);
De([
  T()
], ye.prototype, "_trendSeries", 2);
De([
  T()
], ye.prototype, "_graphTopInset", 2);
De([
  T()
], ye.prototype, "_hoverState", 2);
ye = De([
  ce("power-pilz-graph-card")
], ye);
var Vc = Object.defineProperty, Uc = Object.getOwnPropertyDescriptor, Ln = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Uc(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (n ? s(e, i, r) : s(r)) || r);
  return n && r && Vc(e, i, r), r;
};
let ri = class extends D {
  constructor() {
    super(...arguments), this.computeLabel = (t) => Ts(t, {}, P(this.hass)), this.valueChanged = (t) => {
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
      legend_layout: Es(t.legend_layout),
      timeframe_hours: Cs(t.timeframe_hours),
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
      line_thickness: $s(t.line_thickness),
      clip_graph_to_labels: t.clip_graph_to_labels ?? !1,
      ...ks(t)
    };
    this._config = e;
  }
  render() {
    if (!this.hass || !this._config)
      return $;
    const t = this._config.normalize_stack_to_percent ?? !1, e = Ss(!0, t);
    return v`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Ce}
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
Ln([
  O({ attribute: !1 })
], ri.prototype, "hass", 2);
Ln([
  T()
], ri.prototype, "_config", 2);
ri = Ln([
  ce("power-pilz-graph-stack-card-editor")
], ri);
var Wc = Object.defineProperty, jc = Object.getOwnPropertyDescriptor, Ne = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? jc(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (n ? s(e, i, r) : s(r)) || r);
  return n && r && Wc(e, i, r), r;
};
const yt = 1, wo = 24, xo = 300 * 1e3, Kc = 60 * 1e3, Gc = 350, Fe = 0.01, it = 4, Yc = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", qc = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), So = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let ge = class extends D {
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
      const n = t.clientX - i.left, r = t.clientY - i.top;
      if (n < 0 || n > i.width || r < 0 || r > i.height) {
        this.clearHoverState();
        return;
      }
      const o = this.findNearestHoverPoint(n, r);
      if (!o) {
        this.clearHoverState();
        return;
      }
      const s = this._hoverState;
      s && s.slot === o.slot && Math.abs(s.x - o.x) <= 0.2 && Math.abs(s.y - o.y) <= 0.2 && Math.abs(s.value - o.value) <= 1e-4 && s.color === o.color || (this._hoverState = o);
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
    const e = (t == null ? void 0 : t.states) ?? {}, i = Object.keys(e), n = (...c) => c.find((h) => h in e), r = (c) => i.find((h) => h.startsWith(`${c}.`)), o = n("sensor.dev_home_power", "sensor.home_power") ?? r("sensor") ?? "sensor.dev_home_power", s = n("sensor.dev_solar_power", "sensor.solar_power"), a = n("sensor.dev_grid_power", "sensor.grid_power"), l = n("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: "row",
      timeframe_hours: wo,
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
      decimals: yt,
      decimals_base_unit: yt,
      decimals_prefixed_unit: yt
    };
  }
  setConfig(t) {
    const e = typeof t.decimals == "number" && Number.isFinite(t.decimals) ? Math.min(3, Math.max(0, Math.round(t.decimals))) : yt, i = me(t.decimals_base_unit, e), n = me(t.decimals_prefixed_unit, e), r = this.readConfigString(t.entity), o = this.readConfigString(t.icon), s = this.readConfigString(t.entity_1) ?? r ?? "sensor.dev_home_power";
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
      trend_data_source: J(t.trend_data_source, "hybrid"),
      normalize_stack_to_percent: t.normalize_stack_to_percent ?? !1,
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: i,
      decimals_prefixed_unit: n,
      entity_1: s,
      entity_1_name: this.readConfigString(t.entity_1_name),
      entity_1_enabled: t.entity_1_enabled ?? !0,
      entity_1_show_icon: t.entity_1_show_icon ?? !0,
      entity_1_icon: t.entity_1_icon ?? o ?? "mdi:chart-line",
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
      return v`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return v``;
    const t = this._config, e = t.decimals ?? yt, i = this.normalizeLineThickness(t.line_thickness), n = t.normalize_stack_to_percent === !0, r = this.collectSeriesEntries(t, e), o = this.withStackedCurrentValues(r, n, t), s = this.normalizeLegendLayout(t.legend_layout), a = t.hover_enabled !== !1, l = this.hasConfiguredAction(t), c = !this.isEditorPreview() && l, h = this._hoverState, d = t.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, u = d > 0 ? { top: `${d}px` } : {}, _ = h ? {
      left: `${h.x}px`,
      top: `${h.y + d}px`,
      "--hover-dot-color": h.color
    } : {};
    return this._drawConfigs = r.map((p) => ({
      slot: p.slot,
      currentValue: p.currentValue,
      unit: p.unit,
      color: p.trendColor,
      lineWidth: i
    })), v`
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
          <div class="card-trend" style=${A(u)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${A(u)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${a && h ? v`<div class="hover-dot" aria-hidden="true" style=${A(_)}></div>` : $}

          <div class="content">
            <div class="series-list layout-${s}">
              ${r.length === 0 ? v`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph Stack card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : o.map(
      (p) => this.renderSeriesItem(
        p,
        h && h.slot === p.slot ? h : null
      )
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderSeriesItem(t, e) {
    const i = e === null ? null : this.convertStackedHoverValue(t.slot, e.value), n = e === null ? null : this.formatHoverTimestamp(e.ts), r = i === null ? t.secondary : `${this.formatValue(i, t.unit, t.decimals)} - ${n ?? ""}`;
    return v`
      <div class="state-item" data-slot=${String(t.slot)}>
        ${t.showIcon ? v`
              <div class="icon-wrap">
                <div class="icon-shape" style=${A(t.iconStyle)}>
                  <ha-icon .icon=${t.icon}></ha-icon>
                </div>
              </div>
            ` : $}
        <div class="info">
          <div class="primary">${t.name}</div>
          <div class="secondary">${r}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(t, e) {
    const i = [];
    for (let n = 1; n <= it; n += 1) {
      const r = n, o = this.slotEnabled(r, t), s = this.slotEntityId(r, t);
      if (!o || !s)
        continue;
      const a = this.entityName(this.slotCustomName(r, t), s, n), l = V(this.hass, s), c = t.unit ?? W(this.hass, s) ?? "", h = this.formatValue(l, c, e), d = this.slotIcon(r, t), u = this.iconStyle(this.slotIconColor(r, t)), _ = this.resolveColor(So[r], Yc), p = this.resolveColor(this.slotTrendColor(r, t), _);
      i.push({
        slot: r,
        entityId: s,
        name: a,
        secondary: h,
        unit: c,
        decimals: e,
        currentValue: l,
        icon: d,
        showIcon: this.slotShowIcon(r, t),
        iconStyle: u,
        trendColor: p
      });
    }
    return i;
  }
  resolvePercentReference(t, e) {
    const i = e.percent_reference_slot, n = typeof i == "number" ? i : typeof i == "string" && i.length > 0 ? Number(i) : NaN, r = Number.isFinite(n) && n >= 1 && n <= it ? n : void 0;
    return { refSlot: r !== void 0 && t.some((s) => s.slot === r) ? r : void 0, auto: e.percent_reference_auto === !0 };
  }
  withStackedCurrentValues(t, e, i) {
    var _;
    const n = this.resolveStackUnitFactors(t), { refSlot: r, auto: o } = e ? this.resolvePercentReference(t, i) : { refSlot: void 0, auto: !1 }, s = (p) => p.currentValue === null || !Number.isFinite(p.currentValue) ? 0 : n ? p.currentValue * (n[p.slot] ?? 1) : p.currentValue;
    let a, l;
    if (e && r !== void 0 && !o) {
      const p = t.find((y) => y.slot === r);
      a = p ? s(p) : 0, l = r;
    } else e && o ? (a = t.reduce((p, y) => y.slot !== r ? p + s(y) : p, 0), l = r) : (a = t.reduce((p, y) => p + s(y), 0), l = (_ = t[t.length - 1]) == null ? void 0 : _.slot);
    const c = Number.isFinite(a) && Math.abs(a) > Fe;
    let h = 0, d = 0, u = !1;
    return t.map((p) => {
      const y = r !== void 0 && p.slot === r && !o;
      p.currentValue !== null && Number.isFinite(p.currentValue) && (y || (h += p.currentValue, n && (d += p.currentValue * (n[p.slot] ?? 1))), u = !0);
      let f;
      if (!u)
        f = null;
      else if (e)
        if (!c)
          f = 0;
        else if (y)
          f = 100;
        else if (r !== void 0 || o) {
          const x = s(p);
          f = Math.max(0, Math.min(100, x / a * 100));
        } else {
          const x = n ? d : h;
          f = p.slot === l ? 100 : Math.max(0, Math.min(100, x / a * 100));
        }
      else
        f = n ? d / (n[p.slot] ?? 1) : h;
      const g = e ? "%" : p.unit;
      return {
        ...p,
        unit: g,
        secondary: this.formatValue(f, g, p.decimals)
      };
    });
  }
  slotEntityId(t, e) {
    return us(t, e);
  }
  slotCustomName(t, e) {
    return ps(t, e);
  }
  slotEnabled(t, e) {
    return _s(t, e);
  }
  slotShowIcon(t, e) {
    return ms(t, e);
  }
  slotIcon(t, e) {
    return fs(t, e);
  }
  slotIconColor(t, e) {
    return ys(t, e);
  }
  slotTrendColor(t, e) {
    return gs(t, e);
  }
  entityName(t, e, i) {
    return vs(this.hass.states, t, e, i);
  }
  formatValue(t, e, i) {
    var n, r, o;
    return ws(t, e, i, {
      enabled: ((n = this._config) == null ? void 0 : n.auto_scale_units) === !0,
      baseDecimals: ((r = this._config) == null ? void 0 : r.decimals_base_unit) ?? i,
      prefixedDecimals: ((o = this._config) == null ? void 0 : o.decimals_prefixed_unit) ?? i
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
    const r = new Intl.DateTimeFormat(i, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(e);
    return `${n} ${r}`;
  }
  resolveStackUnitFactors(t) {
    if (t.length === 0)
      return null;
    let e = null;
    const i = {};
    for (const n of t) {
      const r = Z(n.unit);
      if (!r)
        return null;
      if (e === null)
        e = r.family;
      else if (e !== r.family)
        return null;
      i[n.slot] = r.factor;
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
    return _e(t);
  }
  normalizeLegendLayout(t) {
    return bs(t);
  }
  normalizeTimeframeHours(t) {
    return Rn(t, wo);
  }
  trendWindowMs(t) {
    return this.normalizeTimeframeHours(t == null ? void 0 : t.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(t) {
    return Dn(t);
  }
  normalizeTrendColor(t, e, i) {
    const n = t ?? e;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : So[i];
  }
  iconStyle(t) {
    return xe(t);
  }
  resolveColor(t, e = "") {
    return pe(t, e);
  }
  trendPoints(t, e) {
    const i = Date.now(), n = i - this.trendWindowMs(this._config), r = this._trendSeries[t] ?? [];
    let o = 0;
    for (; o < r.length && r[o].ts < n; )
      o += 1;
    const s = o > 0 ? r.slice(o) : [...r];
    return e !== null && Number.isFinite(e) && s.push({ ts: i, value: e }), s;
  }
  toTrendCoordinates(t, e, i) {
    var x, E;
    const r = Date.now() - e, o = 0, s = 100, a = t.map((C) => C.value), l = (i == null ? void 0 : i.min) ?? Math.min(...a), c = (i == null ? void 0 : i.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const h = 20, d = 80, u = Math.max(c - l, Fe), _ = t.map((C) => {
      const w = Math.max(0, Math.min(100, (C.ts - r) / e * 100)), b = o + w / 100 * (s - o), S = u <= Fe ? 0.5 : (C.value - l) / u, k = d - S * (d - h);
      return { x: b, y: k, value: C.value, ts: C.ts };
    }), p = ((x = _[0]) == null ? void 0 : x.x) ?? o, y = ((E = _[_.length - 1]) == null ? void 0 : E.x) ?? s, f = Math.max(0, y - p), g = 18;
    if (_.length >= 2 && f < g) {
      const C = s - g, w = Math.max(o, Math.min(C, y - g));
      if (f <= Fe) {
        const S = g / (_.length - 1);
        return _.map((k, z) => ({
          ...k,
          x: Math.max(o, Math.min(s, w + S * z))
        }));
      }
      const b = g / f;
      return _.map((S) => ({
        ...S,
        x: Math.max(o, Math.min(s, w + (S.x - p) * b))
      }));
    }
    return _;
  }
  toCanvasPoints(t, e, i) {
    return Pn(t, e, i).map((n) => ({
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
    var x, E, C;
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
    const n = this.prepareTrendCanvas(e), r = this.prepareTrendCanvas(i);
    if (!n || !r) {
      this._linePointsBySlot = {}, this._stackCanonicalMode = !1, this._stackCanonicalFactors = {}, this._stackNormalizeToPercent = !1, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const o = ((x = this._config) == null ? void 0 : x.fill_area_enabled) !== !1, s = ((E = this._config) == null ? void 0 : E.normalize_stack_to_percent) === !0, a = ((C = this._config) == null ? void 0 : C.shared_trend_scale) === !0, l = this.resolveStackUnitFactors(this._drawConfigs);
    this._stackCanonicalMode = l !== null, this._stackCanonicalFactors = l ?? {}, this._stackNormalizeToPercent = s;
    const c = this.trendWindowMs(this._config), h = {}, d = s ? this.resolvePercentReference(
      this._drawConfigs,
      this._config
    ) : { refSlot: void 0, auto: !1 }, u = this.buildStackedTrendSeries(c, l ?? void 0, d.refSlot, d.auto), _ = s ? this.normalizeStackedSeriesToPercent(u, d.refSlot, d.auto) : u, p = s ? { min: 0, max: 100 } : a ? this.computeStackedValueRange(_) : null;
    let y = 0, f = 0;
    [...this._drawConfigs].sort((w, b) => b.slot - w.slot).forEach((w) => {
      const b = _[w.slot] ?? [];
      if (b.length < 2)
        return;
      const S = this.toTrendCoordinates(b, c, p);
      if (S.length < 2)
        return;
      const k = this.toCanvasPoints(S, n.width, n.height), z = this.toCanvasPoints(S, r.width, r.height);
      o && this.drawTrendArea(n.ctx, k, w.color, n.height), this.drawTrendLine(r.ctx, z, w.color, w.lineWidth), h[w.slot] = z, y += 1, f += z.length;
    }), this._linePointsBySlot = h, this._hoverState && !h[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - t),
      series: y,
      points: f,
      fill_area: o,
      shared_scale: a,
      normalize_percent: s,
      stack_units: this._stackCanonicalMode ? "canonical" : "raw"
    });
  }
  buildStackedTrendSeries(t, e, i, n) {
    const r = {}, o = [...this._drawConfigs].sort((l, c) => l.slot - c.slot), s = i !== void 0 && !n;
    let a = null;
    return o.forEach((l) => {
      const c = this.trendPoints(l.slot, l.currentValue);
      if (c.length === 0)
        return;
      const h = this.normalizeTrendSeries(c, t);
      if (h.length === 0)
        return;
      const d = (e == null ? void 0 : e[l.slot]) ?? 1, u = d === 1 ? h : h.map((p) => ({
        ts: p.ts,
        value: p.value * d
      }));
      if (s && l.slot === i) {
        r[l.slot] = u;
        return;
      }
      const _ = a ? this.sumTrendSeries(a, u) : u;
      r[l.slot] = _, a = _;
    }), r;
  }
  normalizeTrendSeries(t, e) {
    const i = Date.now() - e, n = [...t].filter((o) => Number.isFinite(o.ts) && Number.isFinite(o.value) && o.ts >= i).sort((o, s) => o.ts - s.ts);
    if (n.length === 0)
      return [];
    const r = [];
    return n.forEach((o) => {
      const s = r[r.length - 1];
      s && Math.abs(s.ts - o.ts) <= 0.5 ? r[r.length - 1] = o : r.push(o);
    }), r;
  }
  sumTrendSeries(t, e) {
    return t.length === 0 ? [...e] : e.length === 0 ? [...t] : this.mergeTimestamps(t, e).map((n) => ({
      ts: n,
      value: this.interpolateTrendValue(t, n) + this.interpolateTrendValue(e, n)
    }));
  }
  mergeTimestamps(t, e) {
    const i = [];
    let n = 0, r = 0;
    const o = (s) => {
      const a = i[i.length - 1];
      (a === void 0 || Math.abs(a - s) > 0.5) && i.push(s);
    };
    for (; n < t.length || r < e.length; ) {
      const s = n < t.length ? t[n].ts : Number.POSITIVE_INFINITY, a = r < e.length ? e[r].ts : Number.POSITIVE_INFINITY;
      s <= a ? (o(s), n += 1, Math.abs(s - a) <= 0.5 && (r += 1)) : (o(a), r += 1);
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
    let n = 0, r = t.length - 1;
    for (; n <= r; ) {
      const h = Math.floor((n + r) / 2), d = t[h];
      if (Math.abs(d.ts - e) <= 0.5)
        return d.value;
      d.ts < e ? n = h + 1 : r = h - 1;
    }
    const o = Math.max(1, Math.min(t.length - 1, n)), s = t[o - 1], a = t[o], l = a.ts - s.ts;
    if (Math.abs(l) <= Fe)
      return a.value;
    const c = (e - s.ts) / l;
    return s.value + (a.value - s.value) * c;
  }
  computeStackedValueRange(t) {
    const e = [];
    if (Object.values(t).forEach((r) => {
      r.forEach((o) => e.push(o.value));
    }), e.length === 0)
      return null;
    const i = Math.min(...e), n = Math.max(...e);
    return !Number.isFinite(i) || !Number.isFinite(n) ? null : { min: i, max: n };
  }
  normalizeStackedSeriesToPercent(t, e, i) {
    const n = {}, r = Object.keys(t).map((a) => Number(a)).filter((a) => Number.isFinite(a) && a >= 1 && a <= it).sort((a, l) => a - l);
    if (r.length === 0)
      return n;
    let o, s;
    if (e !== void 0 && !i)
      o = t[e] ?? [], s = e;
    else if (i) {
      const a = e !== void 0 ? r.filter((l) => l !== e) : r;
      s = a[a.length - 1] ?? r[r.length - 1], o = t[s] ?? [];
    } else
      s = r[r.length - 1], o = t[s] ?? [];
    return o.length < 1 || r.forEach((a) => {
      const l = t[a] ?? [];
      l.length !== 0 && (n[a] = l.map((c) => {
        const h = this.interpolateTrendValue(o, c.ts);
        if (!Number.isFinite(h) || Math.abs(h) <= Fe)
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
    return lt(t);
  }
  drawTrendArea(t, e, i, n) {
    if (e.length < 2)
      return;
    const r = this.resolveCanvasColor(i), o = e[0], s = e[e.length - 1], a = Math.min(...e.map((c) => c.y)), l = t.createLinearGradient(0, a, 0, n);
    l.addColorStop(0, this.withAlpha(r, 0.24)), l.addColorStop(1, this.withAlpha(r, 0)), t.beginPath(), t.moveTo(o.x, o.y), e.slice(1).forEach((c) => t.lineTo(c.x, c.y)), t.lineTo(s.x, n), t.lineTo(o.x, n), t.closePath(), t.fillStyle = l, t.fill();
  }
  drawTrendLine(t, e, i, n) {
    if (e.length < 2)
      return;
    const r = this.resolveCanvasColor(i);
    this.strokeTrendPolyline(t, e, r, n);
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
    for (const r of this._drawConfigs) {
      const o = this._linePointsBySlot[r.slot];
      if (!o || o.length < 2)
        continue;
      const s = this.interpolateCanvasPoint(o, t);
      if (!s)
        continue;
      const a = Math.abs(s.y - e);
      a < n && (n = a, i = {
        slot: r.slot,
        x: s.x,
        y: s.y,
        value: s.value,
        ts: s.ts,
        color: r.color
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
    for (let r = 1; r < t.length; r += 1) {
      const o = t[r - 1], s = t[r];
      if (e > s.x)
        continue;
      const a = s.x - o.x;
      if (Math.abs(a) <= Fe)
        return { x: e, y: s.y, value: s.value, ts: s.ts };
      const l = (e - o.x) / a;
      return {
        x: e,
        y: o.y + (s.y - o.y) * l,
        value: o.value + (s.value - o.value) * l,
        ts: o.ts + (s.ts - o.ts) * l
      };
    }
    return { x: e, y: n.y, value: n.value, ts: n.ts };
  }
  strokeTrendPolyline(t, e, i, n) {
    e.length < 2 || (t.beginPath(), t.moveTo(e[0].x, e[0].y), e.slice(1).forEach((r) => t.lineTo(r.x, r.y)), t.strokeStyle = i, t.lineWidth = n, t.lineCap = "round", t.lineJoin = "round", t.stroke());
  }
  resolveCanvasColor(t) {
    return we(this.renderRoot, t);
  }
  withAlpha(t, e) {
    return ct(t, e, this._canvasColorContextCache);
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
    var n, r;
    const t = this.renderRoot.querySelector("ha-card");
    if (!t || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const e = !!((n = this._config.hold_action) != null && n.action && this._config.hold_action.action !== "none"), i = !!((r = this._config.double_tap_action) != null && r.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = at(
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
    const e = t.get("_config"), i = t.has("_config") && this.shouldRefreshTrendOnConfigChange(e, this._config), n = t.get("hass"), r = t.has("hass") && this.didTrackedEntityStateChange(n);
    (t.has("preview") || t.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (t.has("_config") ? (i && this.scheduleConfigRefresh(), this.clearHoverState()) : t.has("hass") && this._isVisible && r && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (t.has("_config") ? (i && this.scheduleConfigRefresh(!0), this.clearHoverState()) : t.has("hass") && r && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((s = this._config) == null ? void 0 : s.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset();
    const o = t.has("_config") || t.has("_trendSeries") || t.has("_graphTopInset") || t.has("preview") || t.has("editMode") || r;
    (!this.shouldRunLiveRuntime() || this._isVisible) && o && this.scheduleTrendCanvasDraw();
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
    const n = e.getBoundingClientRect(), r = i.getBoundingClientRect(), o = Math.max(0, Math.ceil(r.bottom - n.top));
    Math.abs(o - this._graphTopInset) > 0.5 && (this._graphTopInset = o);
  }
  maybeRefreshTrendHistory(t = !1, e = !1) {
    if (!this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview())
      return;
    t && (this._lastTrendRefresh = 0);
    const i = Date.now();
    !t && i - this._lastTrendRefresh < xo || (this._lastTrendRefresh = i, this.refreshTrendHistory(t, e));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(qc) || this.hasEditorLikeAncestor();
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
    }, Gc));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(t = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(t), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, xo), this.updateComplete.then(() => {
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
    const i = this._config, n = {}, r = this.trendWindowMs(i), o = J(i.trend_data_source, "hybrid"), s = this.enabledSlots(i);
    if (s.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const l = this.perfNow(), c = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
      let u = Number.POSITIVE_INFINITY;
      const _ = Date.now() - r;
      for (const E of s) {
        const C = this.slotEntityId(E, i);
        if (!C)
          continue;
        c.set(E, C);
        const w = this._trendSeries[E] ?? [];
        if (t || w.length === 0 || h.has(C)) {
          h.add(C), d.delete(C);
          continue;
        }
        if (h.has(C))
          continue;
        d.add(C);
        const b = ((a = w[w.length - 1]) == null ? void 0 : a.ts) ?? _, S = Math.max(_, b - Kc);
        u = Math.min(u, S);
      }
      let p = 0;
      const y = h.size > 0 ? await (async () => {
        const E = this.perfNow(), C = await Ie(
          this.hass,
          Array.from(h),
          r,
          { dataSource: o }
        );
        return p = this.perfNow() - E, C;
      })() : {};
      let f = 0;
      const g = d.size > 0 ? await (async () => {
        const E = this.perfNow(), C = await Ie(
          this.hass,
          Array.from(d),
          r,
          {
            startMs: Number.isFinite(u) ? u : _,
            dataSource: o
          }
        );
        return f = this.perfNow() - E, C;
      })() : {};
      c.forEach((E, C) => {
        const w = this._trendSeries[C] ?? [];
        if (h.has(E)) {
          const b = y[E] ?? [];
          n[C] = b.length > 0 ? b : w.filter((S) => S.ts >= _);
          return;
        }
        if (d.has(E)) {
          const b = g[E] ?? [];
          n[C] = ei(w, b, _);
          return;
        }
        n[C] = w.filter((b) => b.ts >= _);
      });
      const x = this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((E) => Number(E)).filter((E) => Number.isFinite(E) && E >= 1 && E <= it).every((E) => {
        const C = E;
        return this.areTrendSeriesEqual(n[C] ?? [], this._trendSeries[C] ?? []);
      });
      x || (this._trendSeries = n), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - l),
        window_ms: r,
        force_full: t,
        slots: s.length,
        full_entities: h.size,
        incremental_entities: d.size,
        data_source: o,
        full_fetch_ms: this.toPerfMs(p),
        incremental_fetch_ms: this.toPerfMs(f),
        series_changed: !x
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(t) {
    const e = [];
    for (let i = 1; i <= it; i += 1) {
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
    if (!t || !e || this.trendWindowMs(t) !== this.trendWindowMs(e) || J(t.trend_data_source, "hybrid") !== J(e.trend_data_source, "hybrid"))
      return !0;
    for (let i = 1; i <= it; i += 1) {
      const n = i, r = this.slotEnabled(n, t), o = this.slotEnabled(n, e), s = r ? this.slotEntityId(n, t) : void 0, a = o ? this.slotEntityId(n, e) : void 0;
      if (r !== o || s !== a)
        return !0;
    }
    return !1;
  }
  sameTrendSeriesKeys(t, e) {
    const i = Object.keys(t).sort(), n = Object.keys(e).sort();
    return i.length === n.length && i.every((r, o) => r === n[o]);
  }
  areTrendSeriesEqual(t, e) {
    if (t.length !== e.length)
      return !1;
    for (let i = 0; i < t.length; i += 1) {
      const n = t[i], r = e[i];
      if (n.ts !== r.ts || Math.abs(n.value - r.value) > 1e-4)
        return !1;
    }
    return !0;
  }
};
ge.styles = Q`
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
Ne([
  O({ attribute: !1 })
], ge.prototype, "hass", 2);
Ne([
  O({ type: Boolean })
], ge.prototype, "preview", 2);
Ne([
  O({ type: Boolean })
], ge.prototype, "editMode", 2);
Ne([
  T()
], ge.prototype, "_config", 2);
Ne([
  T()
], ge.prototype, "_trendSeries", 2);
Ne([
  T()
], ge.prototype, "_graphTopInset", 2);
Ne([
  T()
], ge.prototype, "_hoverState", 2);
ge = Ne([
  ce("power-pilz-graph-stack-card")
], ge);
var Xc = Object.defineProperty, Zc = Object.getOwnPropertyDescriptor, Hn = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Zc(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (n ? s(e, i, r) : s(r)) || r);
  return n && r && Xc(e, i, r), r;
};
const Jc = [
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
let oi = class extends D {
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
    const t = P(this.hass);
    return {
      name: m(t, "wallbox.editor.name"),
      icon: m(t, "wallbox.editor.icon"),
      icon_color: m(t, "wallbox.editor.icon_color"),
      power_entity: m(t, "wallbox.editor.power_entity"),
      status_entity: m(t, "wallbox.editor.status_entity"),
      mode_entity: m(t, "wallbox.editor.mode_entity"),
      command_entity: m(t, "wallbox.editor.command_entity"),
      show_mode_selector: m(t, "wallbox.editor.show_mode"),
      show_live_value: m(t, "wallbox.editor.show_live"),
      show_command_button: m(t, "wallbox.editor.show_button"),
      decimals: m(t, "wallbox.editor.decimals"),
      auto_scale_units: m(t, "wallbox.editor.auto_scale"),
      decimals_base_unit: m(t, "wallbox.editor.decimals_base"),
      decimals_prefixed_unit: m(t, "wallbox.editor.decimals_prefixed")
    };
  }
  render() {
    return !this.hass || !this._config ? $ : v`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Ce}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Jc}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Hn([
  O({ attribute: !1 })
], oi.prototype, "hass", 2);
Hn([
  T()
], oi.prototype, "_config", 2);
oi = Hn([
  ce("power-pilz-wallbox-card-editor")
], oi);
var Qc = Object.defineProperty, Ye = (t, e, i, n) => {
  for (var r = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = s(e, i, r) || r);
  return r && Qc(e, i, r), r;
};
const ed = 0.01, Eo = "power-pilz-wallbox-mode-menu-portal-style", Gn = class Gn extends D {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._actionBusy = !1, this._modeMenuOpen = !1, this._modeMenuOptionCount = 0, this.toggleModeMenu = (e) => {
      var s;
      if (e.stopPropagation(), this.isEditorPreview() || !((s = this._config) != null && s.mode_entity) || this._actionBusy)
        return;
      const i = L(this.hass, this._config.mode_entity), n = (i == null ? void 0 : i.state) ?? "", r = this.getModeOptions(i);
      if (r.length === 0)
        return;
      if (this._modeMenuOpen) {
        this.closeModeMenuPortal();
        return;
      }
      const o = e.currentTarget;
      o && this.openModeMenuPortal(o, r, n || r[0] || "Mode");
    }, this.selectModeOption = async (e) => {
      var r;
      if (!((r = this._config) != null && r.mode_entity))
        return;
      const i = L(this.hass, this._config.mode_entity);
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
      const i = V(this.hass, this._config.power_entity), n = qt(this.hass, this._config.status_entity), r = this.isCharging(n, i, this._config.command_entity), o = this.resolveActionCommand(r);
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
  static async getStubConfig(e) {
    const i = (e == null ? void 0 : e.states) ?? {}, n = Object.keys(i), r = (...c) => c.find((h) => h in i), o = (c) => n.find((h) => h.startsWith(`${c}.`)), s = r("sensor.dev_wallbox_power", "sensor.wallbox_power") ?? o("sensor") ?? "sensor.dev_wallbox_power", a = r("input_select.dev_wallbox_mode", "select.wallbox_charging_mode") ?? o("input_select") ?? o("select"), l = r("input_boolean.dev_wallbox_enabled", "switch.wallbox_charging_enabled") ?? o("input_boolean") ?? o("switch");
    return {
      type: "custom:power-pilz-wallbox-card",
      name: "Wallbox",
      power_entity: s,
      status_entity: r("sensor.dev_wallbox_status", "sensor.wallbox_status"),
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
      name: e.name ?? m(P(this.hass), "wallbox.default_name"),
      show_mode_selector: e.show_mode_selector ?? !0,
      show_live_value: e.show_live_value ?? !0,
      show_command_button: e.show_command_button ?? !0,
      decimals: n,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: me(e.decimals_base_unit, n),
      decimals_prefixed_unit: me(e.decimals_prefixed_unit, n),
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
    const e = P(this.hass);
    if (!this._config)
      return v`<ha-card>${m(e, "common.invalid_config")}</ha-card>`;
    if (!this.hass)
      return v``;
    const i = this._config, n = V(this.hass, i.power_entity), r = W(this.hass, i.power_entity) ?? "kW", o = qt(this.hass, i.status_entity), s = L(this.hass, i.mode_entity), a = (s == null ? void 0 : s.state) ?? "", l = this.getModeOptions(s), c = this.isCharging(o, n, i.command_entity), h = this.resolveActionCommand(c), d = c ? m(e, "wallbox.stop") : m(e, "wallbox.start"), u = c ? "mdi:pause" : "mdi:play", _ = this.statusLabel(o, c), p = this.formatPower(n, r, i.decimals ?? 1), y = this.showModeSelector(i, l), f = this.showLiveValue(i), g = this.showCommandButton(i), x = this.isEditorPreview() || this._actionBusy || !i.mode_entity || l.length === 0, E = a || l[0] || m(e, "wallbox.mode_fallback"), C = this._modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down", w = this.iconStyle(i.icon_color), S = Number(f) + Number(g) === 1, k = y && f && g, z = S && f, M = S && g || k, I = z || M, R = f && !z, H = g && !M, K = y || R || H, te = y ? R || H ? H ? "actions" : "actions no-command" : "actions mode-only" : "actions no-mode";
    return (!y || x) && this._modeMenuOpen && this.closeModeMenuPortal(), v`
      <ha-card>
        <div class="container">
          <div class="state-item ${I ? "compact-state" : ""}">
            <div class="icon-wrap">
              <div class="icon-shape" style=${A(w)}>
                <ha-icon .icon=${i.icon ?? "mdi:ev-station"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${i.name}</div>
              <div class="secondary">${m(e, "wallbox.ev_charger")}</div>
            </div>

            ${I ? v`
                  <div class="compact-trailing ${M ? "button-only" : ""}">
                    ${z ? v`
                          <div class="compact-live-value">
                            <span>${_}</span>
                            <span class="dot">•</span>
                            <span>${p}</span>
                          </div>
                        ` : v``}

                    ${M ? v`
                          <button
                            type="button"
                            class="action-button"
                            ?disabled=${this.isEditorPreview() || this._actionBusy || !h}
                            @click=${this.handleActionClick}
                            title=${d}
                            aria-label=${d}
                          >
                            <ha-icon .icon=${u}></ha-icon>
                          </button>
                        ` : v``}
                  </div>
                ` : v``}
          </div>

          ${K ? v`
                <div class=${te}>
                  ${y ? v`
                        <div class="mode-select-wrap">
                          <button
                            type="button"
                            class="mode-select"
                            ?disabled=${x}
                            @click=${this.toggleModeMenu}
                            aria-haspopup="listbox"
                            aria-expanded=${this._modeMenuOpen ? "true" : "false"}
                            title="Charging mode"
                          >
                            <span class="mode-select-label">${E}</span>
                            <ha-icon class="mode-select-chevron" .icon=${C}></ha-icon>
                          </button>
                        </div>
                      ` : v``}

                  ${R ? v`
                        <div class="live-value">
                          <span>${_}</span>
                          <span class="dot">•</span>
                          <span>${p}</span>
                        </div>
                      ` : v``}

                  ${H ? v`
                        <button
                          type="button"
                          class="action-button"
                          ?disabled=${this.isEditorPreview() || this._actionBusy || !h}
                          @click=${this.handleActionClick}
                          title=${d}
                          aria-label=${d}
                        >
                          <ha-icon .icon=${u}></ha-icon>
                        </button>
                      ` : v``}
                </div>
              ` : v``}
        </div>
      </ha-card>
    `;
  }
  getModeOptions(e) {
    const i = e == null ? void 0 : e.attributes.options;
    if (Array.isArray(i)) {
      const n = i.filter(
        (r) => typeof r == "string" && r.trim().length > 0
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
    const n = P(this.hass);
    if (!e)
      return i ? m(n, "wallbox.status_charging") : m(n, "wallbox.status_idle");
    const o = `wallbox.status_${e.toLowerCase().replace(/[_\s-]+/g, "_")}`, s = m(n, o);
    return s !== o ? s : e.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().split(" ").map((a) => a && a.charAt(0).toLocaleUpperCase() + a.slice(1)).join(" ");
  }
  formatPower(e, i, n) {
    var o, s, a;
    const r = e === null ? null : Math.abs(e);
    return kt(r, i, n, {
      enabled: ((o = this._config) == null ? void 0 : o.auto_scale_units) === !0,
      baseDecimals: ((s = this._config) == null ? void 0 : s.decimals_base_unit) ?? n,
      prefixedDecimals: ((a = this._config) == null ? void 0 : a.decimals_prefixed_unit) ?? n,
      nullWithUnit: !0
    });
  }
  isCharging(e, i, n) {
    var r;
    if (e) {
      const o = e.toLowerCase();
      if (["charging", "active", "running", "on", "start", "started"].includes(o))
        return !0;
      if (["idle", "paused", "stopped", "off", "standby", "complete"].includes(o))
        return !1;
    }
    if (n) {
      const o = (r = qt(this.hass, n)) == null ? void 0 : r.toLowerCase();
      if (o === "on")
        return !0;
      if (o === "off")
        return !1;
    }
    return i !== null && i > ed;
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
      const r = this.objectValue(e ? i.stop_service_data : i.start_service_data);
      return i.command_entity && r.entity_id === void 0 && (r.entity_id = i.command_entity), { ...n, data: r };
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
    if (document.getElementById(Eo))
      return;
    const e = document.createElement("style");
    e.id = Eo, e.textContent = `
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
    const r = n.getBoundingClientRect(), o = 8, s = 6, a = Math.max(96, Math.min(280, window.innerHeight - o * 2)), l = Math.min(
      a,
      this._modeMenuOptionCount * 34 + Math.max(0, this._modeMenuOptionCount - 1) * 4 + 14
    ), c = i.offsetHeight > 0 ? Math.min(a, i.offsetHeight) : l, h = Math.max(120, Math.round(r.width)), d = window.innerHeight - r.bottom - o, u = d < c + s && r.top - o > d;
    let _ = r.left;
    _ = Math.max(o, Math.min(_, window.innerWidth - h - o));
    let p = u ? r.top - s - c : r.bottom + s;
    p = Math.max(o, Math.min(p, window.innerHeight - c - o)), i.style.maxHeight = `${a}px`, i.style.width = `${h}px`, i.style.left = `${Math.round(_)}px`, i.style.top = `${Math.round(p)}px`;
  }
  openModeMenuPortal(e, i, n) {
    this.closeModeMenuPortal(), this.ensureModeMenuPortalStyles();
    const r = document.createElement("div");
    r.className = "power-pilz-mode-menu-backdrop", r.addEventListener("click", () => {
      this.closeModeMenuPortal();
    });
    const o = document.createElement("div");
    o.className = "power-pilz-mode-menu-portal", o.setAttribute("role", "listbox"), i.forEach((s) => {
      const a = document.createElement("button");
      a.type = "button", a.className = `power-pilz-mode-menu-option ${s === n ? "selected" : ""}`, a.dataset.option = s, a.setAttribute("role", "option"), a.setAttribute("aria-selected", s === n ? "true" : "false"), a.textContent = s, a.addEventListener("click", (l) => {
        var h;
        l.stopPropagation();
        const c = ((h = l.currentTarget) == null ? void 0 : h.dataset.option) ?? "";
        c && (this.closeModeMenuPortal(), this.selectModeOption(c));
      }), o.append(a);
    }), document.body.append(r), document.body.append(o), this._modeMenuBackdrop = r, this._modeMenuPortal = o, this._modeMenuOptionCount = i.length, this._modeMenuOpen = !0, this.positionModeMenuPortal(e);
  }
  closeModeMenuPortal() {
    this._modeMenuPortal && (this._modeMenuPortal.remove(), this._modeMenuPortal = void 0), this._modeMenuBackdrop && (this._modeMenuBackdrop.remove(), this._modeMenuBackdrop = void 0), this._modeMenuOptionCount = 0, this._modeMenuOpen && (this._modeMenuOpen = !1);
  }
};
Gn.styles = Q`
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
let ae = Gn;
Ye([
  O({ attribute: !1 })
], ae.prototype, "hass");
Ye([
  O({ type: Boolean })
], ae.prototype, "preview");
Ye([
  O({ type: Boolean })
], ae.prototype, "editMode");
Ye([
  O({ reflect: !0, type: String })
], ae.prototype, "layout");
Ye([
  T()
], ae.prototype, "_config");
Ye([
  T()
], ae.prototype, "_actionBusy");
Ye([
  T()
], ae.prototype, "_modeMenuOpen");
class td extends ae {
}
customElements.get("power-pilz-wallbox-card") || customElements.define("power-pilz-wallbox-card", ae);
customElements.get("power-pilz-wallbox-card-v2") || customElements.define("power-pilz-wallbox-card-v2", td);
var id = Object.defineProperty, nd = Object.getOwnPropertyDescriptor, Bn = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? nd(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (n ? s(e, i, r) : s(r)) || r);
  return n && r && id(e, i, r), r;
};
let si = class extends D {
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
    const i = P(this.hass);
    return {
      type: "expandable",
      name: "",
      title: t === 1 ? m(i, "switch.editor.state_1_title") : m(i, "switch.editor.state_n_title", { n: t }),
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
    const t = P(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: m(t, "switch.editor.section_identity"),
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
        title: m(t, "switch.editor.section_layout"),
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
                      { label: m(t, "switch.editor.layout_horizontal"), value: "horizontal" },
                      { label: m(t, "switch.editor.layout_vertical"), value: "vertical" }
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
                      { label: m(t, "switch.editor.slider_small"), value: "small" },
                      { label: m(t, "switch.editor.slider_medium"), value: "medium" },
                      { label: m(t, "switch.editor.slider_large"), value: "large" }
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
        title: m(t, "switch.editor.section_slider"),
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
        title: m(t, "switch.editor.section_state_custom"),
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
    const t = P(this.hass), e = {
      name: m(t, "switch.editor.name"),
      subtitle: m(t, "switch.editor.subtitle"),
      icon: m(t, "switch.editor.icon"),
      icon_color: m(t, "switch.editor.icon_color"),
      dim_inactive_icon: m(t, "switch.editor.dim_inactive_icon"),
      entity: m(t, "switch.editor.entity"),
      card_layout: m(t, "switch.editor.card_layout"),
      slider_size: m(t, "switch.editor.slider_size"),
      slider_color: m(t, "switch.editor.slider_color"),
      use_custom_icons: m(t, "switch.editor.use_custom_icons")
    };
    for (let i = 1; i <= 5; i++)
      e[`state_${i}_color`] = m(t, "switch.editor.state_color"), e[`state_${i}_icon`] = m(t, "switch.editor.state_icon");
    return e;
  }
  render() {
    return !this.hass || !this._config ? $ : v`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Ce}
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
Bn([
  O({ attribute: !1 })
], si.prototype, "hass", 2);
Bn([
  T()
], si.prototype, "_config", 2);
si = Bn([
  ce("power-pilz-switch-card-editor")
], si);
var rd = Object.defineProperty, zt = (t, e, i, n) => {
  for (var r = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = s(e, i, r) || r);
  return r && rd(e, i, r), r;
};
const od = 5, Co = 4, sd = {
  small: "36%",
  medium: "48%",
  large: "62%"
}, Yn = class Yn extends D {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this.handleSegmentTap = (e) => {
      e.stopPropagation();
      const i = e.currentTarget;
      if (!(i instanceof HTMLElement)) return;
      const n = i.dataset.option;
      n && this.selectOption(n);
    }, this.handleCardTap = () => {
      var o;
      if (!((o = this._config) != null && o.entity) || this.isEditorPreview()) return;
      const e = L(this.hass, this._config.entity);
      if (!e) return;
      const i = this.getOptions(e);
      if (i.length === 0) return;
      const r = (this.activeIndex(i, e.state) + 1) % i.length;
      this.selectOption(i[r]);
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-switch-card-editor");
  }
  static async getStubConfig(e) {
    const i = (e == null ? void 0 : e.states) ?? {}, n = Object.keys(i), r = (s) => n.find((a) => a.startsWith(`${s}.`));
    return {
      type: "custom:power-pilz-switch-card",
      entity: r("input_select") ?? r("select") ?? "input_select.mode",
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
      name: e.name ?? m(P(this.hass), "switch.default_name")
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
    var r;
    const i = (r = e == null ? void 0 : e.attributes) == null ? void 0 : r.options;
    if (!Array.isArray(i)) return [];
    const n = i.filter(
      (o) => typeof o == "string" && o.trim().length > 0
    );
    return Array.from(new Set(n)).slice(0, od);
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
    const n = `state_${e + 1}_color`, r = i[n], o = ue(r);
    if (o) return `rgba(${o}, 0.25)`;
    const s = ue(i.slider_color);
    return s ? `rgba(${s}, 0.25)` : null;
  }
  /** Resolve segment text color for the active state index. */
  segmentActiveColor(e) {
    const i = this._config;
    if (!i) return null;
    const n = `state_${e + 1}_color`, r = i[n], o = ue(r);
    if (o) return `rgb(${o})`;
    const s = ue(i.slider_color);
    return s ? `rgb(${s})` : null;
  }
  /** Get custom icon for a state index, or null. */
  stateIcon(e) {
    const i = this._config;
    if (!(i != null && i.use_custom_icons)) return null;
    const n = `state_${e + 1}_icon`, r = i[n];
    return typeof r == "string" && r.length > 0 ? r : null;
  }
  segmentContent(e) {
    const i = this.stateIcon(e);
    if (i)
      return v`<ha-icon class="seg-icon" .icon=${i}></ha-icon>`;
    if (e === 0)
      return v`<span class="seg-symbol"><span class="seg-dot"></span></span>`;
    const n = Array.from({ length: e }, () => v`<span class="seg-bar"></span>`);
    return v`<span class="seg-symbol seg-bars">${n}</span>`;
  }
  // --- Slider template (shared between layouts) ---
  renderSlider(e, i, n, r) {
    return v`
      <div class="slider-track">
        <div class="slider-pill" style=${A(n)}></div>
        ${e.map(
      (o, s) => v`
            <button
              type="button"
              class="slider-segment ${s === i ? "active" : ""}"
              style=${s === i && r ? A({ color: r }) : $}
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
    var C;
    if (!this._config)
      return v`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return v``;
    const e = this._config, i = L(this.hass, e.entity), n = (i == null ? void 0 : i.state) ?? "", r = this.getOptions(i), o = this.activeIndex(r, n), s = o === 0 && e.dim_inactive_icon !== !1, a = this.iconStyle(s ? "disabled" : e.icon_color), l = r.length, c = l > 0 ? o / l * 100 : 0, h = l > 0 ? 100 / l : 100, d = (C = i == null ? void 0 : i.attributes) == null ? void 0 : C.friendly_name, u = e.subtitle || n || m(P(this.hass), "common.unknown"), _ = this.resolvedCardLayout(), p = this.resolvedSliderSize(), y = sd[p], f = l > 1, g = this.pillColor(o), x = {
      width: `calc(${h}% - ${Co * 2}px)`,
      left: `calc(${c}% + ${Co}px)`
    };
    g && (x["background-color"] = g);
    const E = this.segmentActiveColor(o);
    return _ === "vertical" ? v`
        <ha-card @click=${this.handleCardTap}>
          <div class="container vertical">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${A(a)}>
                  <ha-icon .icon=${e.icon ?? "mdi:toggle-switch-outline"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${e.name || d || m(P(this.hass), "switch.default_name")}</div>
                <div class="secondary">${u}</div>
              </div>
            </div>
            ${f ? v`
                  <div class="slider-row">
                    ${this.renderSlider(r, o, x, E)}
                  </div>
                ` : v``}
          </div>
        </ha-card>
      ` : v`
      <ha-card @click=${this.handleCardTap}>
        <div class="container horizontal">
          <div class="state-item">
            <div class="icon-wrap">
              <div class="icon-shape" style=${A(a)}>
                <ha-icon .icon=${e.icon ?? "mdi:toggle-switch-outline"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${e.name || d || m(P(this.hass), "switch.default_name")}</div>
              <div class="secondary">${u}</div>
            </div>
            ${f ? v`
                  <div class="slider-wrap" style=${A({ width: y })}>
                    ${this.renderSlider(r, o, x, E)}
                  </div>
                ` : v``}
          </div>
        </div>
      </ha-card>
    `;
  }
};
Yn.styles = Q`
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
let Se = Yn;
zt([
  O({ attribute: !1 })
], Se.prototype, "hass");
zt([
  O({ type: Boolean })
], Se.prototype, "preview");
zt([
  O({ type: Boolean })
], Se.prototype, "editMode");
zt([
  O({ reflect: !0, type: String })
], Se.prototype, "layout");
zt([
  T()
], Se.prototype, "_config");
class ad extends Se {
}
customElements.get("power-pilz-switch-card") || customElements.define("power-pilz-switch-card", Se);
customElements.get("power-pilz-switch-card-v2") || customElements.define("power-pilz-switch-card-v2", ad);
var ld = Object.defineProperty, ne = (t, e, i, n) => {
  for (var r = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = s(e, i, r) || r);
  return r && ld(e, i, r), r;
};
const Cn = "power-pilz-schedule-edit-dialog", Vi = [
  { key: "monday", dayIndex: 1 },
  { key: "tuesday", dayIndex: 2 },
  { key: "wednesday", dayIndex: 3 },
  { key: "thursday", dayIndex: 4 },
  { key: "friday", dayIndex: 5 },
  { key: "saturday", dayIndex: 6 },
  { key: "sunday", dayIndex: 0 }
], $o = 15, cd = 15, ve = 1440;
function ko() {
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
function To() {
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
const qn = class qn extends fe {
  constructor() {
    super(...arguments), this.scheduleEntityId = "", this._blocks = ko(), this._events = To(), this._kind = "blocks", this._loading = !0, this._saving = !1, this._dirty = !1, this._handleSave = async () => {
      if (!(this._saving || !this.hass)) {
        this._saving = !0, this.lockClose = !0;
        try {
          this._kind === "events" ? await this.hass.callService(
            "powerpilz_companion",
            "set_schedule_events",
            {
              entity_id: this.scheduleEntityId,
              events: this._events
            }
          ) : await this.hass.callService(
            "powerpilz_companion",
            "set_schedule_blocks",
            {
              entity_id: this.scheduleEntityId,
              blocks: this._blocks
            }
          ), this._dirty = !1, this.close();
        } catch (e) {
          this._saving = !1, this.lockClose = !1, this._loadError = String((e == null ? void 0 : e.message) || e);
        }
      }
    }, this._handleTrackPointerDown = (e) => {
      if (e.button !== 0 || this._loading || this._loadError || this._kind === "events" || e.target.closest(".pp-block")) return;
      const i = e.currentTarget, n = i.dataset.day;
      if (!n) return;
      e.preventDefault();
      try {
        i.setPointerCapture(e.pointerId);
      } catch {
      }
      const r = this._pxToMin(i, e.clientX);
      this._drag = {
        day: n,
        trackEl: i,
        pointerId: e.pointerId,
        startMin: r,
        endMin: r
      };
    }, this._handleTrackPointerMove = (e) => {
      if (!this._drag || e.pointerId !== this._drag.pointerId) return;
      const i = this._pxToMin(this._drag.trackEl, e.clientX);
      i !== this._drag.endMin && (this._drag = { ...this._drag, endMin: i });
    }, this._handleTrackPointerUp = (e) => {
      if (!this._drag || e.pointerId !== this._drag.pointerId) return;
      const i = this._drag;
      this._drag = void 0;
      try {
        i.trackEl.releasePointerCapture(i.pointerId);
      } catch {
      }
      const n = Math.min(i.startMin, i.endMin), r = Math.max(i.startMin, i.endMin);
      if (r - n < cd) return;
      const o = this._blocksForDay(i.day);
      o.some(
        (a) => zo(F(a.from), F(a.to), n, r)
      ) || (o.push({ from: nt(n), to: nt(r) }), this._setBlocksForDay(i.day, o));
    }, this._handleTrackPointerCancel = (e) => {
      if (this._drag && e.pointerId === this._drag.pointerId) {
        try {
          this._drag.trackEl.releasePointerCapture(this._drag.pointerId);
        } catch {
        }
        this._drag = void 0;
      }
    }, this._handleEventsTrackClick = (e) => {
      if (this._loading || this._loadError || e.target.closest(".pp-pin")) return;
      const i = e.currentTarget, n = i.dataset.day;
      if (!n) return;
      const r = this._pxToMin(i, e.clientX), o = this._eventsForDay(n);
      o.some((s) => F(s.time) === r) || (o.push({ time: nt(r) }), this._setEventsForDay(n, o));
    }, this._handlePinClick = (e) => {
      e.stopPropagation();
      const i = e.currentTarget, n = i.dataset.day, r = parseInt(i.dataset.index ?? "-1", 10);
      if (!n || r < 0) return;
      const s = this._eventsForDay(n)[r];
      s && (this._editingEvent = {
        day: n,
        index: r,
        time: Xt(s.time),
        dataText: s.data ? JSON.stringify(s.data, null, 2) : ""
      });
    }, this._handleBlockClick = (e) => {
      e.stopPropagation();
      const i = e.currentTarget, n = i.dataset.day, r = parseInt(i.dataset.index ?? "-1", 10);
      if (!n || r < 0) return;
      const s = this._blocksForDay(n)[r];
      s && (this._editing = {
        day: n,
        index: r,
        from: Xt(s.from),
        to: Xt(s.to),
        dataText: s.data ? JSON.stringify(s.data, null, 2) : ""
      });
    }, this._handleEditFromChange = (e) => {
      this._updateEditingField("from", Wi(e.target.value));
    }, this._handleEditToChange = (e) => {
      this._updateEditingField("to", Wi(e.target.value));
    }, this._handleEditDataChange = (e) => {
      this._updateEditingField("dataText", e.target.value);
    }, this._handleEditEventTimeChange = (e) => {
      this._updateEditingEventField("time", Wi(e.target.value));
    }, this._handleEditEventDataChange = (e) => {
      this._updateEditingEventField("dataText", e.target.value);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._loadSchedule();
  }
  _handleEscape(e) {
    this._saving || (this._editingEvent ? this._cancelEventEdit() : this._editing ? this._cancelBlockEdit() : this.close());
  }
  // ------------------------------------------------------------
  // Load + save
  // ------------------------------------------------------------
  async _loadSchedule() {
    var i, n, r, o, s;
    const e = P(this.hass);
    try {
      const a = (n = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : n[this.scheduleEntityId];
      if (!a) {
        this._loadError = m(e, "schedule.edit_dialog.error_not_found", {
          entity: this.scheduleEntityId
        });
        return;
      }
      this._kind = ((r = a.attributes) == null ? void 0 : r.schedule_kind) === "events" ? "events" : "blocks";
      const l = (o = a.attributes) == null ? void 0 : o.week_blocks, c = ko();
      if (l && typeof l == "object" && !Array.isArray(l))
        for (const u of Object.keys(c)) {
          const _ = l[u];
          Array.isArray(_) && (c[u] = _.filter((p) => p && typeof p == "object").map((p) => {
            const y = p, f = {
              from: String(y.from ?? "00:00:00"),
              to: String(y.to ?? "00:00:00")
            };
            return y.data && typeof y.data == "object" && !Array.isArray(y.data) && (f.data = y.data), f;
          }));
        }
      this._blocks = c;
      const h = (s = a.attributes) == null ? void 0 : s.week_events, d = To();
      if (h && typeof h == "object" && !Array.isArray(h))
        for (const u of Object.keys(d)) {
          const _ = h[u];
          Array.isArray(_) && (d[u] = _.filter((p) => p && typeof p == "object").map((p) => {
            const y = p, f = {
              time: String(y.time ?? "00:00:00")
            };
            return y.data && typeof y.data == "object" && !Array.isArray(y.data) && (f.data = y.data), f;
          }));
        }
      this._events = d;
    } catch (a) {
      this._loadError = String((a == null ? void 0 : a.message) || a);
    } finally {
      this._loading = !1;
    }
  }
  // ------------------------------------------------------------
  // Block list helpers
  // ------------------------------------------------------------
  _blocksForDay(e) {
    const i = this._blocks[e];
    return Array.isArray(i) ? [...i] : [];
  }
  _setBlocksForDay(e, i) {
    const n = hd(i);
    this._blocks = { ...this._blocks, [e]: n }, this._dirty = !0;
  }
  _eventsForDay(e) {
    const i = this._events[e];
    return Array.isArray(i) ? [...i] : [];
  }
  _setEventsForDay(e, i) {
    const n = dd(i);
    this._events = { ...this._events, [e]: n }, this._dirty = !0;
  }
  // ------------------------------------------------------------
  // Drag-to-create interaction
  // ------------------------------------------------------------
  _pxToMin(e, i) {
    const n = e.getBoundingClientRect(), r = (i - n.left) / n.width, o = Math.max(0, Math.min(ve, Math.round(r * ve)));
    return Math.round(o / $o) * $o;
  }
  _updateEditingField(e, i) {
    this._editing && (this._editing = { ...this._editing, [e]: i, error: void 0, dataError: void 0 });
  }
  _saveBlockEdit() {
    if (!this._editing) return;
    const e = P(this.hass), { day: i, index: n, from: r, to: o, dataText: s } = this._editing, a = F(r), l = F(o);
    if (isNaN(a) || isNaN(l)) {
      this._editing = { ...this._editing, error: m(e, "schedule.edit_dialog.err_time") };
      return;
    }
    if (l <= a) {
      this._editing = { ...this._editing, error: m(e, "schedule.edit_dialog.err_order") };
      return;
    }
    let c;
    const h = s.trim();
    if (h)
      try {
        const p = JSON.parse(h);
        if (typeof p != "object" || p === null || Array.isArray(p))
          throw new Error("not an object");
        c = p;
      } catch {
        this._editing = {
          ...this._editing,
          dataError: m(e, "schedule.edit_dialog.err_data")
        };
        return;
      }
    const d = this._blocksForDay(i);
    if (d.some(
      (p, y) => y !== n && zo(F(p.from), F(p.to), a, l)
    )) {
      this._editing = { ...this._editing, error: m(e, "schedule.edit_dialog.err_overlap") };
      return;
    }
    const _ = {
      from: nt(a, r),
      to: nt(l, o)
    };
    c && (_.data = c), d[n] = _, this._setBlocksForDay(i, d), this._editing = void 0;
  }
  _deleteEditingBlock() {
    if (!this._editing) return;
    const { day: e, index: i } = this._editing, n = this._blocksForDay(e).filter((r, o) => o !== i);
    this._setBlocksForDay(e, n), this._editing = void 0;
  }
  _cancelBlockEdit() {
    this._editing = void 0;
  }
  // -------- Event-edit modal (events mode) --------
  _updateEditingEventField(e, i) {
    this._editingEvent && (this._editingEvent = {
      ...this._editingEvent,
      [e]: i,
      error: void 0,
      dataError: void 0
    });
  }
  _saveEventEdit() {
    if (!this._editingEvent) return;
    const e = P(this.hass), { day: i, index: n, time: r, dataText: o } = this._editingEvent, s = F(r);
    if (isNaN(s)) {
      this._editingEvent = { ...this._editingEvent, error: m(e, "schedule.edit_dialog.err_time") };
      return;
    }
    let a;
    const l = o.trim();
    if (l)
      try {
        const u = JSON.parse(l);
        if (typeof u != "object" || u === null || Array.isArray(u))
          throw new Error("not an object");
        a = u;
      } catch {
        this._editingEvent = {
          ...this._editingEvent,
          dataError: m(e, "schedule.edit_dialog.err_data")
        };
        return;
      }
    const c = this._eventsForDay(i);
    if (c.some((u, _) => _ !== n && F(u.time) === s)) {
      this._editingEvent = { ...this._editingEvent, error: m(e, "schedule.edit_dialog.err_overlap") };
      return;
    }
    const d = { time: nt(s, r) };
    a && (d.data = a), c[n] = d, this._setEventsForDay(i, c), this._editingEvent = void 0;
  }
  _deleteEditingEvent() {
    if (!this._editingEvent) return;
    const { day: e, index: i } = this._editingEvent, n = this._eventsForDay(e).filter((r, o) => o !== i);
    this._setEventsForDay(e, n), this._editingEvent = void 0;
  }
  _cancelEventEdit() {
    this._editingEvent = void 0;
  }
  // ------------------------------------------------------------
  // Title resolution
  // ------------------------------------------------------------
  _resolveTitle() {
    var i, n, r, o;
    if (this.dialogTitle) return this.dialogTitle;
    const e = P(this.hass);
    return ((o = (r = (n = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : n[this.scheduleEntityId]) == null ? void 0 : r.attributes) == null ? void 0 : o.friendly_name) ?? m(e, "schedule.edit_dialog.default_title");
  }
  willUpdate() {
    const e = this._resolveTitle();
    this.dialogTitle !== e && !this.dialogTitle && (this.dialogTitle = e);
  }
  // ------------------------------------------------------------
  // Render hooks (consumed by PowerPilzDialogBase)
  // ------------------------------------------------------------
  renderBody() {
    const e = P(this.hass);
    return this._loading ? v`<div class="msg">${m(e, "common.loading") || "Loading…"}</div>` : this._loadError ? v`<div class="msg error">${this._loadError}</div>` : v`
      <div class="editor">
        <div class="hour-header">
          <div class="day-col"></div>
          <div class="hour-labels">
            ${[0, 6, 12, 18, 24].map(
      (i) => v`<span style=${A({ left: `${i / 24 * 100}%` })}>${String(i).padStart(2, "0")}</span>`
    )}
          </div>
        </div>
        ${Vi.map((i) => this._renderDayRow(i.key, i.dayIndex, e))}
        <div class="hint">${m(e, "schedule.edit_dialog.hint_v2")}</div>
      </div>
    `;
  }
  renderFooter() {
    const e = P(this.hass);
    return v`
      <button class="ppd-btn flat" @click=${() => this.close()} ?disabled=${this._saving}>
        ${m(e, "common.cancel")}
      </button>
      <button
        class="ppd-btn primary"
        @click=${this._handleSave}
        ?disabled=${this._saving || !this._dirty || !!this._loadError}
      >
        ${this._saving ? m(e, "common.saving") || "Saving…" : m(e, "common.save") || "Save"}
      </button>
    `;
  }
  renderInner() {
    var r;
    if (this._editingEvent) return this._renderEventInner();
    if (!this._editing) return $;
    const e = P(this.hass), i = this._editing, n = Oe(
      e,
      ((r = Vi.find((o) => o.key === i.day)) == null ? void 0 : r.dayIndex) ?? 0
    );
    return v`
      <div class="inner-backdrop" @click=${this._cancelBlockEdit}>
        <div class="inner-dialog" @click=${(o) => o.stopPropagation()}>
          <header>
            <h3>
              ${m(e, "schedule.edit_dialog.block_title", { day: n })}
            </h3>
            <button class="close-x" @click=${this._cancelBlockEdit} aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="inner-body">
            <label class="field">
              <span>${m(e, "schedule.edit_dialog.from")}</span>
              <input
                type="time"
                step="1"
                .value=${i.from.slice(0, 8)}
                @change=${this._handleEditFromChange}
              />
            </label>
            <label class="field">
              <span>${m(e, "schedule.edit_dialog.to")}</span>
              <input
                type="time"
                step="1"
                .value=${i.to.slice(0, 8)}
                @change=${this._handleEditToChange}
              />
            </label>
            <label class="field">
              <span>
                ${m(e, "schedule.edit_dialog.data")}
                <small>${m(e, "schedule.edit_dialog.data_help")}</small>
              </span>
              <textarea
                rows="4"
                spellcheck="false"
                placeholder='{"mode": "heat"}'
                .value=${i.dataText}
                @input=${this._handleEditDataChange}
              ></textarea>
              ${i.dataError ? v`<span class="err">${i.dataError}</span>` : $}
            </label>
            ${i.error ? v`<div class="err">${i.error}</div>` : $}
          </div>
          <footer>
            <button class="ppd-btn danger" @click=${this._deleteEditingBlock}>
              ${m(e, "schedule.edit_dialog.delete")}
            </button>
            <div class="spacer"></div>
            <button class="ppd-btn flat" @click=${this._cancelBlockEdit}>
              ${m(e, "common.cancel")}
            </button>
            <button class="ppd-btn primary" @click=${() => this._saveBlockEdit()}>
              ${m(e, "common.save")}
            </button>
          </footer>
        </div>
      </div>
    `;
  }
  _renderEventInner() {
    var r;
    const e = P(this.hass), i = this._editingEvent, n = Oe(
      e,
      ((r = Vi.find((o) => o.key === i.day)) == null ? void 0 : r.dayIndex) ?? 0
    );
    return v`
      <div class="inner-backdrop" @click=${this._cancelEventEdit}>
        <div class="inner-dialog" @click=${(o) => o.stopPropagation()}>
          <header>
            <h3>
              ${m(e, "schedule.edit_dialog.event_title", { day: n })}
            </h3>
            <button class="close-x" @click=${this._cancelEventEdit} aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="inner-body">
            <label class="field">
              <span>${m(e, "schedule.edit_dialog.event_time")}</span>
              <input
                type="time"
                step="1"
                .value=${i.time.slice(0, 8)}
                @change=${this._handleEditEventTimeChange}
              />
            </label>
            <label class="field">
              <span>
                ${m(e, "schedule.edit_dialog.data")}
                <small>${m(e, "schedule.edit_dialog.data_help")}</small>
              </span>
              <textarea
                rows="4"
                spellcheck="false"
                .value=${i.dataText}
                @input=${this._handleEditEventDataChange}
              ></textarea>
              ${i.dataError ? v`<span class="err">${i.dataError}</span>` : $}
            </label>
            ${i.error ? v`<div class="err">${i.error}</div>` : $}
          </div>
          <footer>
            <button class="ppd-btn danger" @click=${() => this._deleteEditingEvent()}>
              ${m(e, "schedule.edit_dialog.delete")}
            </button>
            <div class="spacer"></div>
            <button class="ppd-btn flat" @click=${this._cancelEventEdit}>
              ${m(e, "common.cancel")}
            </button>
            <button class="ppd-btn primary" @click=${() => this._saveEventEdit()}>
              ${m(e, "common.save")}
            </button>
          </footer>
        </div>
      </div>
    `;
  }
  _renderDayRow(e, i, n) {
    var a;
    const r = this._kind === "events";
    let o = $;
    if (!r && ((a = this._drag) == null ? void 0 : a.day) === e) {
      const l = Math.min(this._drag.startMin, this._drag.endMin), c = Math.max(this._drag.startMin, this._drag.endMin);
      if (c > l) {
        const h = l / ve * 100, d = (c - l) / ve * 100;
        o = v`
          <div
            class="pp-block ghost"
            style=${A({ left: `${h}%`, width: `${d}%` })}
          >
            <span class="pp-block-label">
              ${Ui(l)}–${Ui(c)}
            </span>
          </div>
        `;
      }
    }
    const s = r ? this._eventsForDay(e).map((l, c) => {
      const h = F(l.time), d = h / ve * 100;
      return v`
            <div
              class="pp-pin"
              data-day=${e}
              data-index=${c}
              style=${A({ left: `${d}%` })}
              title="${Ui(h)}"
              @click=${this._handlePinClick}
            ></div>
          `;
    }) : this._blocksForDay(e).map((l, c) => {
      const h = F(l.from), d = F(l.to), u = h / ve * 100, _ = (d - h) / ve * 100;
      return v`
            <div
              class="pp-block"
              data-day=${e}
              data-index=${c}
              style=${A({ left: `${u}%`, width: `${_}%` })}
              @click=${this._handleBlockClick}
              title="${l.from.slice(0, 5)}–${l.to.slice(0, 5)}"
            >
              <span class="pp-block-label">${l.from.slice(0, 5)}–${l.to.slice(0, 5)}</span>
            </div>
          `;
    });
    return v`
      <div class="day-row">
        <div class="day-col">${Oe(n, i)}</div>
        <div
          class="day-track ${r ? "events" : "blocks"}"
          data-day=${e}
          @pointerdown=${this._handleTrackPointerDown}
          @pointermove=${this._handleTrackPointerMove}
          @pointerup=${this._handleTrackPointerUp}
          @pointercancel=${this._handleTrackPointerCancel}
          @click=${r ? this._handleEventsTrackClick : void 0}
        >
          ${s}
          ${o}
        </div>
      </div>
    `;
  }
};
qn.styles = [
  fe.styles,
  Q`
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
        overflow: hidden;
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

      /* ----- Event-mode pin marker ----- */
      .day-track.events {
        cursor: copy;
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
        cursor: pointer;
        transition: transform 0.12s ease;
      }
      .pp-pin:hover {
        transform: translate(-50%, -50%) scale(1.15);
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
let q = qn;
ne([
  O({ attribute: !1 })
], q.prototype, "hass");
ne([
  O({ type: String })
], q.prototype, "scheduleEntityId");
ne([
  T()
], q.prototype, "_blocks");
ne([
  T()
], q.prototype, "_events");
ne([
  T()
], q.prototype, "_kind");
ne([
  T()
], q.prototype, "_loading");
ne([
  T()
], q.prototype, "_loadError");
ne([
  T()
], q.prototype, "_saving");
ne([
  T()
], q.prototype, "_dirty");
ne([
  T()
], q.prototype, "_drag");
ne([
  T()
], q.prototype, "_editing");
ne([
  T()
], q.prototype, "_editingEvent");
function F(t) {
  if (!t || typeof t != "string") return 0;
  const e = t.split(":"), i = parseInt(e[0] ?? "0", 10), n = parseInt(e[1] ?? "0", 10), r = parseInt(e[2] ?? "0", 10);
  return isNaN(i) || isNaN(n) ? 0 : i * 60 + n + (isNaN(r) ? 0 : r / 60);
}
function nt(t, e) {
  const i = Math.max(0, Math.min(ve, t)), n = Math.floor(i / 60), r = Math.floor(i % 60);
  let o = 0;
  if (e) {
    const s = e.split(":"), a = parseInt(s[2] ?? "0", 10);
    isNaN(a) || (o = a);
  }
  return n === 24 && r === 0 && o === 0 ? "24:00:00" : `${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}:${String(o).padStart(2, "0")}`;
}
function Ui(t) {
  const e = Math.max(0, Math.min(ve, t)), i = Math.floor(e / 60), n = e % 60;
  return `${String(i).padStart(2, "0")}:${String(n).padStart(2, "0")}`;
}
function Xt(t) {
  if (!t) return "00:00:00";
  const e = t.split(":"), i = (e[0] ?? "00").padStart(2, "0"), n = (e[1] ?? "00").padStart(2, "0"), r = (e[2] ?? "00").padStart(2, "0");
  return `${i}:${n}:${r}`;
}
function Wi(t) {
  return Xt(t);
}
function zo(t, e, i, n) {
  return t < n && i < e;
}
function dd(t) {
  return t.filter((e) => typeof (e == null ? void 0 : e.time) == "string").slice().sort((e, i) => F(e.time) - F(i.time));
}
function hd(t) {
  const e = t.map((n) => ({
    from: n.from,
    to: n.to,
    data: n.data,
    s: F(n.from),
    e: F(n.to)
  })).filter((n) => n.e > n.s).sort((n, r) => n.s - r.s), i = [];
  for (const n of e) {
    const r = i[i.length - 1], o = !!n.data || !!(r != null && r.data);
    r && !o && F(r.to) >= n.s ? F(r.to) < n.e && (r.to = n.to) : i.push({
      from: n.from,
      to: n.to,
      ...n.data ? { data: n.data } : {}
    });
  }
  return i;
}
customElements.get(Cn) || customElements.define(Cn, q);
function ud(t) {
  if (!t.scheduleEntityId) return;
  const e = document.createElement(Cn);
  e.hass = t.hass, e.scheduleEntityId = t.scheduleEntityId, t.title && (e.dialogTitle = t.title), document.body.appendChild(e);
}
var pd = Object.defineProperty, _d = Object.getOwnPropertyDescriptor, Fn = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? _d(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (n ? s(e, i, r) : s(r)) || r);
  return n && r && pd(e, i, r), r;
};
let ai = class extends D {
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
      long_press_opens_editor: t.long_press_opens_editor ?? !0,
      type: "custom:power-pilz-schedule-card"
    };
  }
  buildSchema() {
    const t = P(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: m(t, "schedule.editor.section_entities"),
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
            helper: m(t, "schedule.editor.companion_help"),
            description: m(t, "schedule.editor.companion_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: m(t, "schedule.editor.section_identity"),
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
        title: m(t, "schedule.editor.section_layout"),
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
                      { label: m(t, "schedule.editor.layout_horizontal"), value: "horizontal" },
                      { label: m(t, "schedule.editor.layout_vertical"), value: "vertical" }
                    ]
                  }
                },
                helper: m(t, "schedule.editor.card_layout_help"),
                description: m(t, "schedule.editor.card_layout_help")
              },
              {
                name: "time_window",
                selector: {
                  select: {
                    mode: "dropdown",
                    options: [
                      { label: m(t, "schedule.editor.tw_24"), value: "24" },
                      { label: m(t, "schedule.editor.tw_12"), value: "12" },
                      { label: m(t, "schedule.editor.tw_6"), value: "6" }
                    ]
                  }
                },
                helper: m(t, "schedule.editor.time_window_help"),
                description: m(t, "schedule.editor.time_window_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: m(t, "schedule.editor.section_appearance"),
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
                helper: m(t, "schedule.editor.active_color_help"),
                description: m(t, "schedule.editor.active_color_help")
              }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: m(t, "schedule.editor.section_display"),
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
        title: m(t, "schedule.editor.section_actions"),
        icon: "mdi:gesture-tap",
        expanded: !1,
        schema: [
          {
            name: "long_press_opens_editor",
            selector: { boolean: {} }
          },
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
    const t = P(this.hass);
    return {
      entity: m(t, "schedule.editor.companion_entity"),
      name: m(t, "schedule.editor.name"),
      subtitle: m(t, "schedule.editor.subtitle"),
      icon: m(t, "schedule.editor.icon"),
      icon_color: m(t, "schedule.editor.icon_color"),
      card_layout: m(t, "schedule.editor.card_layout"),
      time_window: m(t, "schedule.editor.time_window"),
      active_color: m(t, "schedule.editor.active_color"),
      show_day_selector: m(t, "schedule.editor.show_day_selector"),
      show_mode_control: m(t, "schedule.editor.show_mode_control"),
      show_now_indicator: m(t, "schedule.editor.show_now_indicator"),
      show_time_labels: m(t, "schedule.editor.show_time_labels"),
      long_press_opens_editor: m(t, "schedule.editor.long_press_opens_editor"),
      tap_action: m(t, "schedule.editor.tap_action"),
      hold_action: m(t, "schedule.editor.hold_action"),
      double_tap_action: m(t, "schedule.editor.double_tap_action")
    };
  }
  helperMap() {
    const t = P(this.hass);
    return {
      entity: m(t, "schedule.editor.companion_help"),
      card_layout: m(t, "schedule.editor.card_layout_help"),
      time_window: m(t, "schedule.editor.time_window_help"),
      active_color: m(t, "schedule.editor.active_color_help"),
      show_day_selector: m(t, "schedule.editor.show_day_help"),
      show_mode_control: m(t, "schedule.editor.show_mode_help"),
      long_press_opens_editor: m(t, "schedule.editor.long_press_opens_editor_help"),
      show_now_indicator: m(t, "schedule.editor.show_now_help"),
      show_time_labels: m(t, "schedule.editor.show_labels_help")
    };
  }
  render() {
    return !this.hass || !this._config ? $ : v`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Ce}
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
Fn([
  O({ attribute: !1 })
], ai.prototype, "hass", 2);
Fn([
  T()
], ai.prototype, "_config", 2);
ai = Fn([
  ce("power-pilz-schedule-card-editor")
], ai);
var md = Object.defineProperty, qe = (t, e, i, n) => {
  for (var r = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = s(e, i, r) || r);
  return r && md(e, i, r), r;
};
const Mo = "powerpilz-schedule-edit", Ao = [
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
], Xn = class Xn extends D {
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
      const n = L(this.hass, i);
      if (!n) return;
      const r = ((c = n.attributes) == null ? void 0 : c.options) ?? [];
      if (r.length === 0) return;
      const s = (r.indexOf(n.state) + 1) % r.length, a = r[s], l = i.split(".")[0];
      await this.hass.callService(l, "select_option", {
        entity_id: i,
        option: a
      });
    }, this.handleTriggerNow = async (e) => {
      var o, s, a;
      e.stopPropagation();
      const i = this._scheduleEntityId;
      if (this.isEditorPreview() || !i) return;
      const n = (a = (s = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : s[i]) == null ? void 0 : a.attributes;
      if ((n == null ? void 0 : n.pulse_running) === !0) return;
      const r = n == null ? void 0 : n.pulse_blocked_until;
      if (typeof r == "string") {
        const l = Date.parse(r);
        if (Number.isFinite(l) && l > Date.now()) return;
      }
      await this.hass.callService("powerpilz_companion", "trigger_event_now", {
        entity_id: i
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
      entity: Object.keys(i).find((o) => {
        var a;
        if (!o.startsWith("select.")) return !1;
        const s = (a = i[o]) == null ? void 0 : a.attributes;
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
      name: e.name ?? m(P(this.hass), "schedule.default_name"),
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
    var n, r, o, s;
    const e = this._scheduleEntityId;
    if (!e) return;
    const i = (s = (o = (r = (n = this.hass) == null ? void 0 : n.states) == null ? void 0 : r[e]) == null ? void 0 : o.attributes) == null ? void 0 : s.target_entity;
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
    var s, a, l, c, h, d, u;
    const e = this.renderRoot.querySelector("ha-card");
    if (!e) return;
    (s = this._actionCleanup) == null || s.destroy();
    const i = !!((l = (a = this._config) == null ? void 0 : a.hold_action) != null && l.action) && this._config.hold_action.action !== "none", n = ((c = this._config) == null ? void 0 : c.long_press_opens_editor) !== !1 && !((d = (h = this._config) == null ? void 0 : h.hold_action) != null && d.action), r = i || n, o = !!((u = this._config) != null && u.double_tap_action) && this._config.double_tap_action.action !== void 0 && this._config.double_tap_action.action !== "none";
    this._actionCleanup = at(
      e,
      {
        onTap: () => this._fireAction("tap"),
        onHold: () => this._fireAction("hold"),
        onDoubleTap: () => this._fireAction("double_tap")
      },
      { hasHold: r, hasDoubleTap: o }
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
    if (e === "hold" && (!n || !n.action) && this._config.long_press_opens_editor !== !1 && (n = { action: Mo }), !(!n || !n.action || n.action === "none")) {
      if (n.action === Mo) {
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
    !e || !this.hass || ud({ hass: this.hass, scheduleEntityId: e });
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
    var r, o, s;
    const e = this._scheduleEntityId;
    if (!e) return {};
    const i = (s = (o = (r = this.hass) == null ? void 0 : r.states) == null ? void 0 : o[e]) == null ? void 0 : s.attributes, n = i == null ? void 0 : i.week_blocks;
    return n && typeof n == "object" && !Array.isArray(n) ? n : {};
  }
  dayKey(e) {
    return Ao[e] ?? "monday";
  }
  blocksForDay(e) {
    const n = this._weekBlocks()[this.dayKey(e)];
    return Array.isArray(n) ? n : [];
  }
  _weekEvents() {
    var r, o, s;
    const e = this._scheduleEntityId;
    if (!e) return {};
    const i = (s = (o = (r = this.hass) == null ? void 0 : r.states) == null ? void 0 : o[e]) == null ? void 0 : s.attributes, n = i == null ? void 0 : i.week_events;
    return n && typeof n == "object" && !Array.isArray(n) ? n : {};
  }
  eventsForDay(e) {
    const n = this._weekEvents()[this.dayKey(e)];
    return Array.isArray(n) ? n : [];
  }
  scheduleKind() {
    var n, r, o;
    const e = this._scheduleEntityId, i = e ? (o = (r = (n = this.hass) == null ? void 0 : n.states) == null ? void 0 : r[e]) == null ? void 0 : o.attributes : void 0;
    return (i == null ? void 0 : i.schedule_kind) === "events" ? "events" : "blocks";
  }
  timeToMinutes(e) {
    const i = (e || "").split(":"), n = parseInt(i[0] ?? "0", 10), r = parseInt(i[1] ?? "0", 10);
    return (isNaN(n) ? 0 : n) * 60 + (isNaN(r) ? 0 : r);
  }
  nowMinutes() {
    const e = /* @__PURE__ */ new Date();
    return e.getHours() * 60 + e.getMinutes();
  }
  resolvedTimeWindow() {
    var s;
    const e = ((s = this._config) == null ? void 0 : s.time_window) ?? "24";
    if (e === "24") return { start: 0, end: 1440 };
    const i = e === "12" ? 360 : 180, n = this.nowMinutes(), r = Math.max(0, n - i), o = Math.min(1440, n + i);
    return { start: r, end: o };
  }
  resolvedActiveColor() {
    var i;
    const e = ue((i = this._config) == null ? void 0 : i.active_color);
    return e ? `rgb(${e})` : "var(--primary-color, rgb(3, 169, 244))";
  }
  resolvedActiveColorAlpha(e) {
    var n;
    const i = ue((n = this._config) == null ? void 0 : n.active_color);
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
    if (this.scheduleKind() === "events") return !1;
    const r = (/* @__PURE__ */ new Date()).getDay(), o = this.blocksForDay(r), s = this.nowMinutes();
    return o.some((h) => {
      const d = this.timeToMinutes(h.from), u = this.timeToMinutes(h.to);
      return s >= d && s < u;
    });
  }
  /** Returns the *logical* mode ("on"/"off"/"auto") by reverse-mapping
   *  the helper's current display state via the `mode_names` attribute. */
  modeValue() {
    var o;
    const e = this._modeEntityId;
    if (!e) return "auto";
    const i = L(this.hass, e), n = (i == null ? void 0 : i.state) ?? "auto", r = (o = i == null ? void 0 : i.attributes) == null ? void 0 : o.mode_names;
    if (r && typeof r == "object") {
      for (const [s, a] of Object.entries(r))
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
      const r = L(this.hass, i), o = (n = r == null ? void 0 : r.attributes) == null ? void 0 : n.mode_names;
      if (o && typeof o == "object") {
        const s = o[e.toLowerCase()];
        if (typeof s == "string" && s) return s;
      }
    }
    return e;
  }
  // --- Render ---
  renderTimeline() {
    const e = this._config, { start: i, end: n } = this.resolvedTimeWindow(), r = n - i, o = this.scheduleKind(), s = this.resolvedActiveColor(), a = this.resolvedActiveColorAlpha(0.3);
    this._tick;
    const l = this.nowMinutes(), c = this._selectedDay === (/* @__PURE__ */ new Date()).getDay(), h = e.show_now_indicator !== !1 && c && l >= i && l <= n, d = e.show_time_labels !== !1, u = [];
    if (d) {
      const p = Math.ceil(i / 60), y = Math.floor(n / 60), f = r > 720 ? 6 : r > 360 ? 3 : 2;
      for (let g = p; g <= y; g += f) {
        const x = g * 60;
        x >= i && x <= n && u.push({ hour: g >= 24 ? 0 : g, pct: (x - i) / r * 100 });
      }
    }
    const _ = o === "events" ? this.eventsForDay(this._selectedDay).flatMap((p) => {
      const y = this.timeToMinutes(p.time);
      if (y < i || y > n) return [];
      const f = (y - i) / r * 100;
      return [v`
            <div
              class="timeline-pin"
              style=${A({
        left: `${f}%`,
        "background-color": s
      })}
            ></div>
          `];
    }) : this.blocksForDay(this._selectedDay).flatMap((p) => {
      const y = this.timeToMinutes(p.from), f = this.timeToMinutes(p.to), g = Math.max(y, i), x = Math.min(f, n);
      if (x <= g) return [];
      const E = (g - i) / r * 100, C = (x - g) / r * 100;
      return [v`
            <div
              class="timeline-block"
              style=${A({
        left: `${E}%`,
        width: `${C}%`,
        "background-color": a
      })}
            ></div>
          `];
    });
    return v`
      <div class="timeline-container ${o === "events" ? "events" : "blocks"}">
        ${d ? v`
              <div class="time-labels">
                ${u.map(
      (p) => v`<span class="time-label" style=${A({ left: `${p.pct}%` })}>${String(p.hour).padStart(2, "0")}</span>`
    )}
              </div>
            ` : $}
        <div class="timeline-track">
          ${_}
          ${h ? v`
                <div
                  class="now-indicator"
                  style=${A({
      left: `${(l - i) / r * 100}%`,
      "background-color": s
    })}
                ></div>
              ` : $}
        </div>
      </div>
    `;
  }
  renderDaySelector() {
    const e = (/* @__PURE__ */ new Date()).getDay();
    return v`
      <div class="day-selector">
        ${Ao.map((i, n) => v`
          <button
            type="button"
            class="day-btn ${n === this._selectedDay ? "active" : ""} ${n === e ? "today" : ""}"
            data-day=${n}
            @click=${this.handleDaySelect}
          >
            ${Oe(P(this.hass), n)}
          </button>
        `)}
      </div>
    `;
  }
  renderModeButton() {
    const e = this.modeValue(), i = e.toLowerCase(), n = i === "on" ? "mdi:power" : i === "off" ? "mdi:power-off" : "mdi:clock-outline", r = this.modeLabel(e);
    return v`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${e}">
        <ha-icon .icon=${n}></ha-icon>
        <span class="mode-label">${r}</span>
      </button>
    `;
  }
  renderTriggerNowButton() {
    var h, d, u;
    const e = this._scheduleEntityId, i = e ? (u = (d = (h = this.hass) == null ? void 0 : h.states) == null ? void 0 : d[e]) == null ? void 0 : u.attributes : void 0, n = (i == null ? void 0 : i.pulse_running) === !0, r = i == null ? void 0 : i.pulse_blocked_until, o = typeof r == "string" ? Date.parse(r) : NaN, s = Number.isFinite(o) && o > Date.now(), a = n || s, l = P(this.hass);
    let c = m(l, "schedule.trigger_now");
    if (n)
      c = m(l, "schedule.trigger_now_blocked_running");
    else if (s) {
      const _ = new Date(o), p = String(_.getHours()).padStart(2, "0"), y = String(_.getMinutes()).padStart(2, "0"), f = String(_.getSeconds()).padStart(2, "0");
      c = m(l, "schedule.trigger_now_blocked_cooldown", {
        time: `${p}:${y}:${f}`
      });
    }
    return v`
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
    var u, _;
    if (!this._config) return v`<ha-card>${m(P(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return v``;
    if (!this._scheduleEntityId) {
      const p = P(this.hass);
      return v`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:clock-outline"></ha-icon>
            <div class="placeholder-text">${m(p, "schedule.placeholder_companion")}</div>
          </div>
        </ha-card>
      `;
    }
    const e = this._config, i = (_ = (u = L(this.hass, this._scheduleEntityId)) == null ? void 0 : u.attributes) == null ? void 0 : _.friendly_name, n = this.modeValue(), r = e.subtitle || this.modeLabel(n), o = e.show_day_selector !== !1, s = e.show_mode_control !== !1 && !!this._modeEntityId, a = e.card_layout === "vertical", c = this.isDeviceOn() ? this.iconStyle(e.icon_color) : this.iconStyle("disabled"), h = this.scheduleKind() === "events", d = v`
      <div class="state-item">
        <div class="icon-wrap">
          <div class="icon-shape" style=${A(c)}>
            <ha-icon .icon=${e.icon ?? "mdi:clock-outline"}></ha-icon>
          </div>
        </div>
        <div class="info">
          <div class="primary">${e.name || i || m(P(this.hass), "schedule.default_name")}</div>
          <div class="secondary">${r}</div>
        </div>
        ${h ? this.renderTriggerNowButton() : $}
        ${s ? this.renderModeButton() : $}
      </div>
    `;
    return v`
      <ha-card>
        <div class="container ${a ? "vertical" : "horizontal"}">
          <div class="row row-header">${d}</div>
          ${o ? v`<div class="row row-days">${this.renderDaySelector()}</div>` : $}
          <div class="row row-timeline">${this.renderTimeline()}</div>
        </div>
      </ha-card>
    `;
  }
};
Xn.styles = Q`
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

    .timeline-block {
      position: absolute;
      top: 6px;
      bottom: 6px;
      border-radius: 6px;
      pointer-events: none;
    }

    /* Events-mode pin marker — small circle vertically centered in the
     * track, matches the block-rectangle vertical alignment. */
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

    .trigger-now-btn[disabled] {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .trigger-now-btn + .mode-btn {
      margin-left: 0;
    }

    .trigger-now-btn ha-icon {
      --mdc-icon-size: 18px;
      display: flex;
      line-height: 0;
    }
  `;
let le = Xn;
qe([
  O({ attribute: !1 })
], le.prototype, "hass");
qe([
  O({ type: Boolean })
], le.prototype, "preview");
qe([
  O({ type: Boolean })
], le.prototype, "editMode");
qe([
  O({ reflect: !0, type: String })
], le.prototype, "layout");
qe([
  T()
], le.prototype, "_config");
qe([
  T()
], le.prototype, "_selectedDay");
qe([
  T()
], le.prototype, "_tick");
class fd extends le {
}
customElements.get("power-pilz-schedule-card") || customElements.define("power-pilz-schedule-card", le);
customElements.get("power-pilz-schedule-card-v2") || customElements.define("power-pilz-schedule-card-v2", fd);
var yd = Object.defineProperty, gd = Object.getOwnPropertyDescriptor, Vn = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? gd(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (n ? s(e, i, r) : s(r)) || r);
  return n && r && yd(e, i, r), r;
};
let li = class extends D {
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
    const t = P(this.hass), e = ((n = this._config) == null ? void 0 : n.use_companion) !== !1;
    return [
      {
        type: "expandable",
        name: "",
        title: m(t, "timer.editor.section_entities"),
        icon: "mdi:connection",
        expanded: !0,
        schema: [
          {
            name: "use_companion",
            selector: { boolean: {} },
            helper: m(t, "timer.editor.use_companion_help"),
            description: m(t, "timer.editor.use_companion_help")
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
              helper: m(t, "timer.editor.companion_help"),
              description: m(t, "timer.editor.companion_help")
            }
          ] : [
            {
              name: "switch_entity",
              selector: { entity: { filter: { domain: ["switch", "light", "input_boolean", "climate", "fan"] } } },
              helper: m(t, "timer.editor.switch_help"),
              description: m(t, "timer.editor.switch_help")
            },
            {
              name: "on_datetime_entity",
              selector: { entity: { filter: { domain: "input_datetime" } } },
              helper: m(t, "timer.editor.on_help"),
              description: m(t, "timer.editor.on_help")
            },
            {
              name: "off_datetime_entity",
              selector: { entity: { filter: { domain: "input_datetime" } } },
              helper: m(t, "timer.editor.off_help"),
              description: m(t, "timer.editor.off_help")
            },
            {
              name: "active_entity",
              selector: { entity: { filter: { domain: "input_boolean" } } },
              helper: m(t, "timer.editor.active_help"),
              description: m(t, "timer.editor.active_help")
            }
          ]
        ]
      },
      {
        type: "expandable",
        name: "",
        title: m(t, "timer.editor.section_identity"),
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
        title: m(t, "timer.editor.section_appearance"),
        icon: "mdi:palette-outline",
        expanded: !1,
        schema: [
          {
            name: "active_color",
            selector: { ui_color: { include_state: !1, include_none: !0, default_color: "primary" } },
            helper: m(t, "timer.editor.active_color_help"),
            description: m(t, "timer.editor.active_color_help")
          }
        ]
      }
    ];
  }
  labelMap() {
    const t = P(this.hass);
    return {
      use_companion: m(t, "timer.editor.use_companion"),
      companion_entity: m(t, "timer.editor.companion_entity"),
      switch_entity: m(t, "timer.editor.switch_entity"),
      on_datetime_entity: m(t, "timer.editor.on_datetime_entity"),
      off_datetime_entity: m(t, "timer.editor.off_datetime_entity"),
      active_entity: m(t, "timer.editor.active_entity"),
      name: m(t, "timer.editor.name"),
      subtitle: m(t, "timer.editor.subtitle"),
      icon: m(t, "timer.editor.icon"),
      icon_color: m(t, "timer.editor.icon_color"),
      active_color: m(t, "timer.editor.active_color")
    };
  }
  helperMap() {
    const t = P(this.hass);
    return {
      use_companion: m(t, "timer.editor.use_companion_help"),
      companion_entity: m(t, "timer.editor.companion_help"),
      switch_entity: m(t, "timer.editor.switch_help"),
      on_datetime_entity: m(t, "timer.editor.on_help"),
      off_datetime_entity: m(t, "timer.editor.off_help"),
      active_entity: m(t, "timer.editor.active_help"),
      active_color: m(t, "timer.editor.active_color_help")
    };
  }
  render() {
    return !this.hass || !this._config ? $ : v`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Ce}
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
Vn([
  O({ attribute: !1 })
], li.prototype, "hass", 2);
Vn([
  T()
], li.prototype, "_config", 2);
li = Vn([
  ce("power-pilz-timer-card-editor")
], li);
var bd = Object.defineProperty, ee = (t, e, i, n) => {
  for (var r = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = s(e, i, r) || r);
  return r && bd(e, i, r), r;
};
const Po = "power-pilz-timer-picker-portal-style", Kt = "powerpilz_companion";
function Oo(t) {
  const e = new Date(t.includes("T") ? t : t.replace(" ", "T"));
  return isNaN(e.getTime()) ? null : e;
}
const Zn = class Zn extends D {
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
    const i = (e == null ? void 0 : e.states) ?? {}, n = Object.keys(i), r = n.find((s) => {
      var l;
      if (!s.startsWith("switch.")) return !1;
      const a = (l = i[s]) == null ? void 0 : l.attributes;
      return typeof (a == null ? void 0 : a.target_entity) == "string" && ("on_datetime" in (a ?? {}) || "off_datetime" in (a ?? {}));
    });
    if (r)
      return {
        type: "custom:power-pilz-timer-card",
        use_companion: !0,
        companion_entity: r,
        name: "Timer"
      };
    const o = (s) => n.find((a) => a.startsWith(`${s}.`));
    return {
      type: "custom:power-pilz-timer-card",
      use_companion: !1,
      switch_entity: o("switch") ?? o("input_boolean") ?? "switch.device",
      on_datetime_entity: o("input_datetime") ?? "input_datetime.sched_on",
      active_entity: o("input_boolean") ?? "input_boolean.sched_active",
      name: "Timer"
    };
  }
  setConfig(e) {
    const i = e.use_companion !== void 0 ? e.use_companion !== !1 : !e.switch_entity;
    this._config = {
      ...e,
      use_companion: i,
      icon: e.icon ?? "mdi:timer-outline",
      name: e.name ?? m(P(this.hass), "timer.default_name")
    };
  }
  // ---------- Mode-aware entity / datetime resolvers ----------
  get _activeEntityId() {
    if (this._config)
      return this._config.use_companion === !1 ? this._config.active_entity : this._config.companion_entity;
  }
  get _switchEntityId() {
    var n, r, o;
    if (!this._config) return;
    if (this._config.use_companion === !1) return this._config.switch_entity;
    const e = (r = (n = this.hass) == null ? void 0 : n.states) == null ? void 0 : r[this._config.companion_entity ?? ""], i = (o = e == null ? void 0 : e.attributes) == null ? void 0 : o.target_entity;
    return typeof i == "string" ? i : void 0;
  }
  _companionAttr(e) {
    var n, r, o, s, a;
    const i = (n = this._config) == null ? void 0 : n.companion_entity;
    if (i)
      return (a = (s = (o = (r = this.hass) == null ? void 0 : r.states) == null ? void 0 : o[i]) == null ? void 0 : s.attributes) == null ? void 0 : a[e];
  }
  _getOnDatetime() {
    var e, i;
    if (((e = this._config) == null ? void 0 : e.use_companion) !== !1) {
      const n = this._companionAttr("on_datetime");
      return typeof n == "string" ? Oo(n) : null;
    }
    return this.parseDatetime((i = this._config) == null ? void 0 : i.on_datetime_entity);
  }
  _getOffDatetime() {
    var e, i;
    if (((e = this._config) == null ? void 0 : e.use_companion) !== !1) {
      const n = this._companionAttr("off_datetime");
      return typeof n == "string" ? Oo(n) : null;
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
    var i, n, r;
    return this._direction() === "on_only" ? !1 : ((i = this._config) == null ? void 0 : i.use_companion) !== !1 ? !!((n = this._config) != null && n.companion_entity) : !!((r = this._config) != null && r.off_datetime_entity);
  }
  _companionStateIcon() {
    var r;
    if (((r = this._config) == null ? void 0 : r.use_companion) === !1) return;
    const e = this._companionAttr("state_icons");
    if (!e || typeof e != "object") return;
    const i = this.isActive() ? "active" : "inactive", n = e[i];
    return typeof n == "string" && n ? n : void 0;
  }
  _companionStateName() {
    var r;
    if (((r = this._config) == null ? void 0 : r.use_companion) === !1) return;
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
    var r, o, s, a;
    if (((r = this._config) == null ? void 0 : r.use_companion) === !1) return !1;
    const e = this._switchEntityId;
    if (!e) return !1;
    const i = (s = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : s[e], n = (a = i == null ? void 0 : i.attributes) == null ? void 0 : a.options;
    return Array.isArray(n) && n.length > 0 && (e.startsWith("select.") || e.startsWith("input_select."));
  }
  /** Resolve a stored option value (logical key or display name) into
   *  the user-facing display name using the target's option list.
   *  Falls back to the value itself if not found. */
  _resolveOptionLabel(e) {
    var n;
    return e ? ((n = this._targetOptions().find((r) => r.value === e)) == null ? void 0 : n.label) ?? e : "";
  }
  /** Returns the selectable option pairs as [value, label] where value
   *  is what gets sent to set_timer (logical key for Smart Schedule,
   *  display name for generic selects) and label is the UI text. */
  _targetOptions() {
    var o, s, a, l;
    const e = this._switchEntityId;
    if (!e) return [];
    const i = (s = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : s[e];
    if (!i) return [];
    const n = (a = i.attributes) == null ? void 0 : a.options;
    if (!Array.isArray(n)) return [];
    const r = (l = i.attributes) == null ? void 0 : l.mode_names;
    if (r && typeof r == "object" && !Array.isArray(r)) {
      const c = /* @__PURE__ */ new Map();
      for (const [h, d] of Object.entries(r))
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
    var r, o;
    if (((r = this._config) == null ? void 0 : r.use_companion) !== !1) {
      const s = (o = this._config) == null ? void 0 : o.companion_entity;
      if (!s) return;
      const a = {
        entity_id: s,
        on: e
      };
      i !== void 0 && (a.on_option = i), await this.hass.callService(Kt, "set_timer", a);
      return;
    }
    const n = this._config.on_datetime_entity;
    n && await this.hass.callService(n.split(".")[0], "set_datetime", {
      entity_id: n,
      datetime: e
    });
  }
  async _writeOffDatetime(e, i) {
    var r, o;
    if (((r = this._config) == null ? void 0 : r.use_companion) !== !1) {
      const s = (o = this._config) == null ? void 0 : o.companion_entity;
      if (!s) return;
      const a = {
        entity_id: s,
        off: e
      };
      i !== void 0 && (a.off_option = i), await this.hass.callService(Kt, "set_timer", a);
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
    e && await this.hass.callService(Kt, "set_timer", {
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
    e && await this.hass.callService(Kt, "set_timer", {
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
    if (document.getElementById(Po)) return;
    const e = document.createElement("style");
    e.id = Po, e.textContent = `
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
    const e = P(this.hass);
    if (this._portal.replaceChildren(), this._confirmingCancel) {
      const w = document.createElement("div");
      w.className = "pp-label", w.textContent = m(e, "timer.cancel_title"), this._portal.append(w);
      const b = document.createElement("div");
      b.className = "pp-hint", b.textContent = m(e, "timer.cancel_hint"), this._portal.append(b);
      const S = document.createElement("div");
      S.className = "pp-actions";
      const k = document.createElement("button");
      k.type = "button", k.className = "pp-act cancel", k.textContent = m(e, "timer.keep_timer"), k.addEventListener("click", () => this.handleDismissConfirm()), S.append(k);
      const z = document.createElement("button");
      z.type = "button", z.className = "pp-act danger", z.textContent = m(e, "timer.cancel_timer"), z.addEventListener("click", () => {
        this.handleConfirmCancel();
      }), S.append(z), this._portal.append(S);
      return;
    }
    const i = this._targetHasOptions() ? this._resolveOptionLabel(this._pickOnOption) || this._onOptionLabel() : this._onOptionLabel(), n = this._targetHasOptions() ? this._resolveOptionLabel(this._pickOffOption) || this._offOptionLabel() : this._offOptionLabel(), r = i ? m(e, "timer.set_to_at", { option: i }) : m(e, "timer.turn_on_at"), o = n ? m(e, "timer.set_to_at", { option: n }) : m(e, "timer.turn_off_at_optional"), s = this._pickingOn ? r : o, a = this._pickingOn && this._hasOffSupport() && this._hasOnSupport(), l = this._pickingOff && this._hasOnSupport() && this._hasOffSupport() && !this._skippedOn, c = this._pickingOn ? n ? m(e, "timer.only_option", { option: n }) : m(e, "timer.only_off") : i ? m(e, "timer.only_option", { option: i }) : m(e, "timer.only_on"), h = this._pickingOn ? this.handleSkipOn : this.handleSkipOff, d = a || l, u = this._pickingOn ? this.handleSetOn : this.handleSetOff, _ = this.next7Days(), p = Array.from({ length: 24 }, (w, b) => b), y = document.createElement("div");
    y.className = "pp-label", y.textContent = s, this._portal.append(y);
    const f = document.createElement("div");
    f.className = "pp-days", _.forEach((w) => {
      const b = document.createElement("button");
      b.type = "button", b.className = `pp-day-btn ${w.day === this._pickDay ? "active" : ""}`, b.textContent = w.label, b.addEventListener("click", () => {
        this._pickDay = w.day, this.renderPortalContent();
      }), f.append(b);
    }), this._portal.append(f);
    const g = document.createElement("div");
    if (g.className = "pp-hours", p.forEach((w) => {
      const b = document.createElement("button");
      b.type = "button", b.className = `pp-hour-btn ${w === this._pickHour ? "active" : ""}`, b.textContent = String(w).padStart(2, "0"), b.addEventListener("click", () => {
        this._pickHour = w, this.renderPortalContent();
      }), g.append(b);
    }), this._portal.append(g), this._targetHasOptions()) {
      const w = document.createElement("div");
      w.className = "pp-option-row";
      const b = document.createElement("span");
      b.className = "pp-option-label", b.textContent = m(e, "timer.mode_label"), w.append(b);
      const S = document.createElement("select");
      S.className = "pp-option-select";
      const k = this._pickingOn ? this._pickOnOption : this._pickOffOption;
      for (const z of this._targetOptions()) {
        const M = document.createElement("option");
        M.value = z.value, M.textContent = z.label, z.value === k && (M.selected = !0), S.append(M);
      }
      S.addEventListener("change", () => {
        this._pickingOn ? this._pickOnOption = S.value : this._pickOffOption = S.value, this.renderPortalContent();
      }), w.append(S), this._portal.append(w);
    }
    const x = document.createElement("div");
    x.className = "pp-actions";
    const E = document.createElement("button");
    if (E.type = "button", E.className = "pp-act cancel", E.textContent = m(e, "common.cancel"), E.addEventListener("click", () => this.handleCancelPick()), x.append(E), d) {
      const w = document.createElement("button");
      w.type = "button", w.className = "pp-act skip", w.textContent = c, w.addEventListener("click", () => {
        h();
      }), x.append(w);
    }
    const C = document.createElement("button");
    C.type = "button", C.className = "pp-act confirm", C.textContent = m(e, "common.set"), C.addEventListener("click", () => {
      u();
    }), x.append(C), this._portal.append(x);
  }
  positionPortal() {
    var _;
    const e = this._portal;
    if (!e) return;
    const i = (_ = this.renderRoot) == null ? void 0 : _.querySelector("ha-card");
    if (!i) return;
    const n = i.getBoundingClientRect(), r = 8, o = 8;
    e.style.visibility = "hidden", e.style.left = "0", e.style.top = "0", e.style.width = `${Math.max(280, n.width)}px`;
    const s = e.offsetHeight, a = e.offsetWidth, l = window.innerHeight - n.bottom - r, c = n.top - r, h = l < s + o && c > l;
    let d = n.left;
    d = Math.max(r, Math.min(d, window.innerWidth - a - r));
    let u = h ? n.top - o - s : n.bottom + o;
    u = Math.max(r, Math.min(u, window.innerHeight - s - r)), e.style.left = `${Math.round(d)}px`, e.style.top = `${Math.round(u)}px`, e.style.visibility = "visible";
  }
  // --- Helpers ---
  isEditorPreview() {
    return this.preview || this.editMode;
  }
  isActive() {
    var e;
    return ((e = L(this.hass, this._activeEntityId)) == null ? void 0 : e.state) === "on";
  }
  switchIsOn() {
    var e;
    return ((e = L(this.hass, this._switchEntityId)) == null ? void 0 : e.state) === "on";
  }
  parseDatetime(e) {
    if (!e) return null;
    const i = L(this.hass, e);
    if (!i) return null;
    const n = i.attributes, r = n == null ? void 0 : n.year, o = n == null ? void 0 : n.month, s = n == null ? void 0 : n.day, a = n == null ? void 0 : n.hour, l = n == null ? void 0 : n.minute;
    if (typeof r == "number" && typeof o == "number" && typeof s == "number") {
      const h = new Date(r, o - 1, s, a ?? 0, l ?? 0, 0, 0);
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
    const i = P(this.hass), n = Oe(i, e.getDay()), r = String(e.getHours()).padStart(2, "0"), o = String(e.getMinutes()).padStart(2, "0");
    return `${n} ${r}:${o}`;
  }
  timeUntil(e) {
    const i = P(this.hass), n = e.getTime() - Date.now();
    if (n <= 0) return m(i, "timer.time_now");
    const r = Math.floor(n / 36e5), o = Math.floor(n % 36e5 / 6e4);
    if (r > 24) {
      const s = Math.floor(r / 24);
      return m(i, "timer.time_in_dh", { d: s, h: r % 24 });
    }
    return r > 0 ? m(i, "timer.time_in_hm", { h: r, m: o }) : m(i, "timer.time_in_m", { m: o });
  }
  next7Days() {
    const e = P(this.hass), i = [], n = /* @__PURE__ */ new Date();
    for (let r = 0; r < 7; r++) {
      const o = new Date(n);
      o.setDate(o.getDate() + r), o.setHours(0, 0, 0, 0);
      const s = r === 0 ? m(e, "common.today") : r === 1 ? m(e, "common.tomorrow") : Oe(e, o.getDay());
      i.push({ day: r, label: s, date: o });
    }
    return i;
  }
  buildDatetime(e, i) {
    const n = /* @__PURE__ */ new Date();
    n.setDate(n.getDate() + e), n.setHours(i, 0, 0, 0);
    const r = n.getFullYear(), o = String(n.getMonth() + 1).padStart(2, "0"), s = String(n.getDate()).padStart(2, "0");
    return `${r}-${o}-${s} ${String(i).padStart(2, "0")}:00:00`;
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
    const n = P(this.hass), r = this._companionStateName();
    if (!e)
      return r ?? (i ? m(n, "common.on") : m(n, "common.off"));
    const o = this._getOnDatetime(), s = this._getOffDatetime(), a = [];
    o && a.push(m(n, "timer.subtitle_on", { time: this.formatDatetime(o) })), s && a.push(m(n, "timer.subtitle_off", { time: this.formatDatetime(s) }));
    const l = a.join(" → ");
    return r && l ? `${r} · ${l}` : r || l || m(n, "timer.timer_active");
  }
  render() {
    var c, h, d, u;
    const e = P(this.hass);
    if (!this._config) return v`<ha-card>${m(e, "common.invalid_config")}</ha-card>`;
    if (!this.hass) return v``;
    if (!this._activeEntityId) {
      const _ = this._config.use_companion !== !1 ? m(e, "timer.placeholder_companion") : m(e, "timer.placeholder_manual");
      return v`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:timer-outline"></ha-icon>
            <div class="placeholder-text">${_}</div>
          </div>
        </ha-card>
      `;
    }
    const i = this._config, n = this.isActive(), r = this.switchIsOn(), o = xe(r ? i.icon_color : "disabled"), s = ((h = (c = L(this.hass, this._switchEntityId)) == null ? void 0 : c.attributes) == null ? void 0 : h.friendly_name) ?? ((u = (d = L(this.hass, this._activeEntityId)) == null ? void 0 : d.attributes) == null ? void 0 : u.friendly_name), a = i.subtitle || this.buildSubtitle(n, r), l = m(e, "timer.default_name");
    return v`
      <ha-card>
        <div class="container">
          <div class="state-item">
            <div class="icon-wrap">
              <div class="icon-shape" style=${A(o)}>
                <ha-icon .icon=${this._resolvedIcon()}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${i.name || s || l}</div>
              <div class="secondary">${a}</div>
            </div>
            ${n ? v`
                  <button type="button" class="action-btn active" @click=${this.handleBadgeClick} title=${m(e, "timer.cancel_timer")}>
                    <ha-icon icon="mdi:timer-sand"></ha-icon>
                    <span>${m(e, "common.active")}</span>
                  </button>
                ` : v`
                  <button type="button" class="action-btn set" @click=${this.handleOpenPicker} title=${m(e, "common.set")}>
                    <ha-icon icon="mdi:timer-plus-outline"></ha-icon>
                    <span>${m(e, "common.set")}</span>
                  </button>
                `}
          </div>
        </div>
      </ha-card>
    `;
  }
};
Zn.styles = Q`
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
let j = Zn;
ee([
  O({ attribute: !1 })
], j.prototype, "hass");
ee([
  O({ type: Boolean })
], j.prototype, "preview");
ee([
  O({ type: Boolean })
], j.prototype, "editMode");
ee([
  O({ reflect: !0, type: String })
], j.prototype, "layout");
ee([
  T()
], j.prototype, "_config");
ee([
  T()
], j.prototype, "_pickingOn");
ee([
  T()
], j.prototype, "_pickingOff");
ee([
  T()
], j.prototype, "_skippedOn");
ee([
  T()
], j.prototype, "_pickOnOption");
ee([
  T()
], j.prototype, "_pickOffOption");
ee([
  T()
], j.prototype, "_confirmingCancel");
ee([
  T()
], j.prototype, "_pickDay");
ee([
  T()
], j.prototype, "_pickHour");
class vd extends j {
}
customElements.get("power-pilz-timer-card") || customElements.define("power-pilz-timer-card", j);
customElements.get("power-pilz-timer-card-v2") || customElements.define("power-pilz-timer-card-v2", vd);
function zs(t, e) {
  if (t.length === 0) return "";
  if (t.length === 1) {
    const o = e(t[0]);
    return `M ${o.x} ${o.y}`;
  }
  const i = wd(t), n = [], r = e(t[0]);
  n.push(`M ${r.x} ${r.y}`);
  for (let o = 0; o < t.length - 1; o++) {
    const s = t[o], a = t[o + 1], l = a.x - s.x;
    if (l <= 0) {
      const u = e(a);
      n.push(`L ${u.x} ${u.y}`);
      continue;
    }
    const c = e({ x: s.x + l / 3, y: s.y + i[o] * l / 3 }), h = e({ x: a.x - l / 3, y: a.y - i[o + 1] * l / 3 }), d = e(a);
    n.push(`C ${c.x} ${c.y}, ${h.x} ${h.y}, ${d.x} ${d.y}`);
  }
  return n.join(" ");
}
function wd(t) {
  const e = t.length;
  if (e < 2) return e === 1 ? [0] : [];
  const i = [], n = [];
  for (let o = 0; o < e - 1; o++) {
    const s = t[o + 1].x - t[o].x;
    i.push(s), n.push(s === 0 ? 0 : (t[o + 1].y - t[o].y) / s);
  }
  const r = new Array(e).fill(0);
  if (e === 2)
    return r[0] = n[0], r[1] = n[0], r;
  for (let o = 1; o < e - 1; o++)
    if (n[o - 1] === 0 || n[o] === 0 || n[o - 1] > 0 != n[o] > 0)
      r[o] = 0;
    else {
      const s = 2 * i[o] + i[o - 1], a = i[o] + 2 * i[o - 1];
      r[o] = (s + a) / (s / n[o - 1] + a / n[o]);
    }
  return r[0] = Io(i[0], i[1], n[0], n[1]), r[e - 1] = Io(i[e - 2], i[e - 3], n[e - 2], n[e - 3]), r;
}
function Io(t, e, i, n) {
  if (t + e === 0) return 0;
  let r = ((2 * t + e) * i - t * n) / (t + e);
  return r > 0 != i > 0 ? 0 : i > 0 != n > 0 && Math.abs(r) > Math.abs(3 * i) ? 3 * i : r;
}
var xd = Object.defineProperty, re = (t, e, i, n) => {
  for (var r = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = s(e, i, r) || r);
  return r && xd(e, i, r), r;
};
const $n = "power-pilz-heating-curve-edit-dialog", Ro = [
  { key: "monday", dayIndex: 1 },
  { key: "tuesday", dayIndex: 2 },
  { key: "wednesday", dayIndex: 3 },
  { key: "thursday", dayIndex: 4 },
  { key: "friday", dayIndex: 5 },
  { key: "saturday", dayIndex: 6 },
  { key: "sunday", dayIndex: 0 }
], rt = 15, Zt = 1440, ji = 1e3, Gt = 220, ke = 30, Te = 14, Do = 22;
function No() {
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
const Jn = class Jn extends fe {
  constructor() {
    super(...arguments), this.curveEntityId = "", this._points = No(), this._loading = !0, this._saving = !1, this._dirty = !1, this._sameForAll = !1, this._valueMin = 5, this._valueMax = 30, this._unit = "°C", this._handleSvgPointerDown = (e) => {
      if (this._loading || this._loadError || e.button !== 0) return;
      const i = e.currentTarget, n = i.dataset.day;
      if (!n) return;
      const o = e.target.closest("[data-point-index]");
      if (o) {
        const l = parseInt(
          o.dataset.pointIndex ?? "-1",
          10
        );
        if (l >= 0) {
          e.preventDefault();
          try {
            i.setPointerCapture(e.pointerId);
          } catch {
          }
          this._drag = { day: n, pointIndex: l, pointerId: e.pointerId, svgEl: i };
        }
        return;
      }
      e.preventDefault();
      const { minutes: s, value: a } = this._svgToData(i, e.clientX, e.clientY);
      this._addPointAt(n, s, a);
    }, this._handleSvgPointerMove = (e) => {
      if (!this._drag || e.pointerId !== this._drag.pointerId) return;
      const { minutes: i, value: n } = this._svgToData(
        this._drag.svgEl,
        e.clientX,
        e.clientY
      );
      this._movePoint(this._drag.day, this._drag.pointIndex, i, n);
    }, this._handleSvgPointerUp = (e) => {
      if (!(!this._drag || e.pointerId !== this._drag.pointerId)) {
        try {
          this._drag.svgEl.releasePointerCapture(this._drag.pointerId);
        } catch {
        }
        this._drag = void 0;
      }
    }, this._handlePointDblClick = (e) => {
      var o, s;
      e.stopPropagation();
      const i = e.currentTarget, n = (s = (o = i.parentElement) == null ? void 0 : o.parentElement) == null ? void 0 : s.dataset.day, r = parseInt(i.dataset.pointIndex ?? "-1", 10);
      !n || r < 0 || this._deletePoint(n, r);
    }, this._toggleSameForAll = () => {
      if (!this._sameForAll) {
        const e = this._points.monday;
        this._points = {
          monday: e,
          tuesday: e,
          wednesday: e,
          thursday: e,
          friday: e,
          saturday: e,
          sunday: e
        }, this._dirty = !0;
      }
      this._sameForAll = !this._sameForAll;
    }, this._copyDay = (e) => {
      e.stopPropagation();
      const n = e.currentTarget.dataset.day;
      n && (this._clipboard = {
        source: n,
        points: this._points[n].map((r) => ({ ...r }))
      });
    }, this._pasteDay = (e) => {
      e.stopPropagation();
      const n = e.currentTarget.dataset.day;
      !n || !this._clipboard || this._setPointsForDay(n, this._clipboard.points.map((r) => ({ ...r })));
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._loadCurve();
  }
  _handleEscape(e) {
    this._saving || this.close();
  }
  // ------------------------------------------------------------
  // Load + save
  // ------------------------------------------------------------
  async _loadCurve() {
    var i, n;
    const e = P(this.hass);
    try {
      const r = (n = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : n[this.curveEntityId];
      if (!r) {
        this._loadError = m(e, "heating_curve.edit_dialog.error_not_found", {
          entity: this.curveEntityId
        });
        return;
      }
      const o = r.attributes ?? {}, s = o.week_points, a = No();
      if (s && typeof s == "object" && !Array.isArray(s))
        for (const u of Object.keys(a)) {
          const _ = s[u];
          Array.isArray(_) && (a[u] = _.filter((p) => !!p && typeof p == "object").map((p) => ({
            time: String(p.time ?? "00:00:00"),
            value: typeof p.value == "number" ? p.value : Number(p.value)
          })).filter((p) => Number.isFinite(p.value)).sort((p, y) => ze(p.time) - ze(y.time)));
        }
      this._points = a, this._sameForAll = o.same_for_all_days === !0;
      const l = Number(o.value_min), c = Number(o.value_max);
      Number.isFinite(l) && (this._valueMin = l), Number.isFinite(c) && c > this._valueMin && (this._valueMax = c), typeof o.unit == "string" && (this._unit = o.unit);
      const h = (this._valueMin + this._valueMax) / 2;
      let d = !1;
      for (const u of Object.keys(this._points))
        this._points[u].length === 0 && (this._points[u] = [{ time: "12:00:00", value: Ki(h) }], d = !0);
      d && (this._dirty = !0);
    } catch (r) {
      this._loadError = String((r == null ? void 0 : r.message) || r);
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
          const i = this._points.monday;
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
  _setPointsForDay(e, i) {
    const n = [...i].sort((r, o) => ze(r.time) - ze(o.time));
    this._points = { ...this._points, [e]: n }, this._dirty = !0;
  }
  _addPointAt(e, i, n) {
    const r = Math.round(i / rt) * rt, o = Lo(r), s = Ki(this._clamp(n)), a = [...this._points[e]];
    a.some((l) => l.time === o) || (a.push({ time: o, value: s }), this._setPointsForDay(e, a));
  }
  _movePoint(e, i, n, r) {
    const o = [...this._points[e]];
    if (i < 0 || i >= o.length) return;
    const s = Math.round(n / rt) * rt, a = i > 0 ? ze(o[i - 1].time) + rt : 0, l = i < o.length - 1 ? ze(o[i + 1].time) - rt : Zt, c = Math.max(a, Math.min(l, s));
    o[i] = {
      time: Lo(c),
      value: Ki(this._clamp(r))
    }, this._setPointsForDay(e, o);
  }
  _deletePoint(e, i) {
    const n = this._points[e];
    n.length <= 1 || this._setPointsForDay(e, n.filter((r, o) => o !== i));
  }
  _clamp(e) {
    return Math.max(this._valueMin, Math.min(this._valueMax, e));
  }
  // ------------------------------------------------------------
  // Coordinate mapping
  // ------------------------------------------------------------
  _svgToData(e, i, n) {
    const r = e.createSVGPoint();
    r.x = i, r.y = n;
    const o = e.getScreenCTM(), s = o ? r.matrixTransform(o.inverse()) : { x: 0, y: 0 }, a = ji - 2 * ke, l = Gt - Te - Do, c = Math.max(0, Math.min(a, s.x - ke)), h = Math.max(0, Math.min(l, s.y - Te)), d = c / a * Zt, u = this._valueMax - h / l * (this._valueMax - this._valueMin);
    return { minutes: d, value: u };
  }
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  willUpdate() {
    const e = this._resolveTitle();
    this.dialogTitle !== e && !this.dialogTitle && (this.dialogTitle = e);
  }
  _resolveTitle() {
    var i, n, r, o;
    if (this.dialogTitle) return this.dialogTitle;
    const e = P(this.hass);
    return ((o = (r = (n = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : n[this.curveEntityId]) == null ? void 0 : r.attributes) == null ? void 0 : o.friendly_name) ?? m(e, "heating_curve.edit_dialog.default_title");
  }
  renderBody() {
    const e = P(this.hass);
    if (this._loading) return v`<div class="msg">${m(e, "common.loading") || "Loading…"}</div>`;
    if (this._loadError) return v`<div class="msg error">${this._loadError}</div>`;
    const i = this._sameForAll ? [Ro[0]] : Ro;
    return v`
      <div class="hc-toolbar">
        <label class="hc-toggle">
          <input
            type="checkbox"
            .checked=${this._sameForAll}
            @change=${this._toggleSameForAll}
          />
          <span>${m(e, "heating_curve.edit_dialog.same_for_all")}</span>
        </label>
        <span class="hc-range">
          ${m(e, "heating_curve.edit_dialog.range_label")}: ${this._valueMin}${this._unit} – ${this._valueMax}${this._unit}
        </span>
      </div>
      <div class="hc-editor">
        ${i.map((n) => this._renderDayRow(n.key, n.dayIndex, e))}
      </div>
      <div class="hint">${m(e, "heating_curve.edit_dialog.hint")}</div>
    `;
  }
  renderFooter() {
    const e = P(this.hass);
    return v`
      <button class="ppd-btn flat" @click=${() => this.close()} ?disabled=${this._saving}>
        ${m(e, "common.cancel")}
      </button>
      <button
        class="ppd-btn primary"
        @click=${this._handleSave}
        ?disabled=${this._saving || !this._dirty || !!this._loadError}
      >
        ${this._saving ? m(e, "common.saving") || "Saving…" : m(e, "common.save") || "Save"}
      </button>
    `;
  }
  _renderDayRow(e, i, n) {
    var p;
    const r = this._points[e], o = this._sameForAll ? m(n, "heating_curve.edit_dialog.all_days") : Oe(n, i), s = ji - 2 * ke, a = Gt - Te - Do, l = Math.max(1e-4, this._valueMax - this._valueMin), c = (y) => ({
      x: ke + y.x / Zt * s,
      y: Te + (1 - (y.y - this._valueMin) / l) * a
    }), h = r.map((y) => ({ x: ze(y.time), y: y.value })).sort((y, f) => y.x - f.x), d = zs(h, c), u = !!this._clipboard, _ = ((p = this._clipboard) == null ? void 0 : p.source) === e;
    return v`
      <div class="hc-row">
        <div class="hc-row-head">
          <span class="hc-day">${o}</span>
          <div class="hc-row-actions">
            <button
              class="ppd-btn flat tiny"
              data-day=${e}
              @click=${this._copyDay}
              title=${m(n, "heating_curve.edit_dialog.copy")}
            >
              <ha-icon icon="mdi:content-copy"></ha-icon>
            </button>
            <button
              class="ppd-btn flat tiny"
              data-day=${e}
              @click=${this._pasteDay}
              ?disabled=${!u || _}
              title=${m(n, "heating_curve.edit_dialog.paste")}
            >
              <ha-icon icon="mdi:content-paste"></ha-icon>
            </button>
          </div>
        </div>
        <svg
          class="hc-svg"
          viewBox="0 0 ${ji} ${Gt}"
          preserveAspectRatio="none"
          data-day=${e}
          @pointerdown=${this._handleSvgPointerDown}
          @pointermove=${this._handleSvgPointerMove}
          @pointerup=${this._handleSvgPointerUp}
          @pointercancel=${this._handleSvgPointerUp}
        >
          ${this._renderGrid(s, a)}
          ${d ? Ae`<path d=${d}
                fill="none"
                stroke="var(--primary-color, #03a9f4)"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                vector-effect="non-scaling-stroke"
              />` : $}
          ${r.map((y, f) => {
      const g = c({ x: ze(y.time), y: y.value });
      return Ae`
              <g class="hc-point-grp">
                <circle
                  data-point-index=${f}
                  class="hc-hit"
                  cx=${g.x} cy=${g.y} r="14"
                  fill="transparent"
                  @dblclick=${this._handlePointDblClick}
                ></circle>
                <circle
                  cx=${g.x} cy=${g.y} r="6"
                  fill="var(--primary-color, #03a9f4)"
                  stroke="var(--card-background-color, white)"
                  stroke-width="2"
                  pointer-events="none"
                ></circle>
                <text
                  x=${g.x} y=${g.y - 12}
                  text-anchor="middle"
                  class="hc-label"
                  pointer-events="none"
                >${y.value.toFixed(1)}${this._unit}</text>
                <text
                  x=${g.x} y=${Gt - 4}
                  text-anchor="middle"
                  class="hc-time-label"
                  pointer-events="none"
                >${y.time.slice(0, 5)}</text>
              </g>`;
    })}
        </svg>
      </div>
    `;
  }
  _renderGrid(e, i) {
    const n = [0, 6, 12, 18, 24], r = 4;
    return Ae`
      ${n.map((o) => {
      const s = ke + o / 24 * e;
      return Ae`
          <line x1=${s} x2=${s}
            y1=${Te} y2=${Te + i}
            stroke="rgba(127,127,127,0.18)" stroke-width="1"
            vector-effect="non-scaling-stroke"
          />
          <text x=${s} y=${Te - 4}
            text-anchor="middle" class="hc-axis-label"
          >${String(o).padStart(2, "0")}</text>`;
    })}
      ${Array.from({ length: r + 1 }, (o, s) => {
      const a = s / r, l = Te + a * i, c = this._valueMax - a * (this._valueMax - this._valueMin);
      return Ae`
          <line x1=${ke} x2=${ke + e}
            y1=${l} y2=${l}
            stroke="rgba(127,127,127,0.12)" stroke-width="1"
            stroke-dasharray=${s === 0 || s === r ? "0" : "2 4"}
            vector-effect="non-scaling-stroke"
          />
          <text x=${ke - 4} y=${l + 3}
            text-anchor="end" class="hc-axis-label"
          >${c.toFixed(0)}</text>`;
    })}
    `;
  }
};
Jn.styles = [
  fe.styles,
  Q`
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
      .hint {
        margin-top: 12px;
        font-size: 11px;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }
    `
];
let X = Jn;
re([
  O({ attribute: !1 })
], X.prototype, "hass");
re([
  O({ type: String })
], X.prototype, "curveEntityId");
re([
  T()
], X.prototype, "_points");
re([
  T()
], X.prototype, "_loading");
re([
  T()
], X.prototype, "_loadError");
re([
  T()
], X.prototype, "_saving");
re([
  T()
], X.prototype, "_dirty");
re([
  T()
], X.prototype, "_sameForAll");
re([
  T()
], X.prototype, "_valueMin");
re([
  T()
], X.prototype, "_valueMax");
re([
  T()
], X.prototype, "_unit");
re([
  T()
], X.prototype, "_clipboard");
function ze(t) {
  if (!t || typeof t != "string") return 0;
  const e = t.split(":"), i = parseInt(e[0] ?? "0", 10), n = parseInt(e[1] ?? "0", 10);
  return isNaN(i) || isNaN(n) ? 0 : i * 60 + n;
}
function Lo(t) {
  const e = Math.max(0, Math.min(Zt, Math.round(t))), i = Math.floor(e / 60), n = e % 60;
  return i === 24 && n === 0 ? "24:00:00" : `${String(i).padStart(2, "0")}:${String(n).padStart(2, "0")}:00`;
}
function Ki(t) {
  return Math.round(t * 10) / 10;
}
customElements.get($n) || customElements.define($n, X);
function Sd(t) {
  if (!t.curveEntityId) return;
  const e = document.createElement($n);
  e.hass = t.hass, e.curveEntityId = t.curveEntityId, t.title && (e.dialogTitle = t.title), document.body.appendChild(e);
}
var Ed = Object.defineProperty, Cd = Object.getOwnPropertyDescriptor, Un = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? Cd(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = (n ? s(e, i, r) : s(r)) || r);
  return n && r && Ed(e, i, r), r;
};
let ci = class extends D {
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
      show_value_labels: t.show_value_labels ?? !0,
      long_press_opens_editor: t.long_press_opens_editor ?? !0,
      type: "custom:power-pilz-heating-curve-card"
    };
  }
  buildSchema() {
    const t = P(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: m(t, "heating_curve.editor.section_entities"),
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
            helper: m(t, "heating_curve.editor.entity_help")
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: m(t, "heating_curve.editor.section_identity"),
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
        title: m(t, "heating_curve.editor.section_appearance"),
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
        title: m(t, "heating_curve.editor.section_display"),
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
              { name: "show_value_labels", selector: { boolean: {} } }
            ]
          }
        ]
      },
      {
        type: "expandable",
        name: "",
        title: m(t, "heating_curve.editor.section_actions"),
        icon: "mdi:gesture-tap",
        expanded: !1,
        schema: [
          { name: "long_press_opens_editor", selector: { boolean: {} } },
          { name: "tap_action", selector: { ui_action: {} } },
          { name: "hold_action", selector: { ui_action: {} } },
          { name: "double_tap_action", selector: { ui_action: {} } }
        ]
      }
    ];
  }
  labelMap() {
    const t = P(this.hass);
    return {
      entity: m(t, "heating_curve.editor.entity"),
      name: m(t, "heating_curve.editor.name"),
      subtitle: m(t, "heating_curve.editor.subtitle"),
      icon: m(t, "heating_curve.editor.icon"),
      icon_color: m(t, "heating_curve.editor.icon_color"),
      active_color: m(t, "heating_curve.editor.active_color"),
      show_day_selector: m(t, "heating_curve.editor.show_day_selector"),
      show_mode_control: m(t, "heating_curve.editor.show_mode_control"),
      show_now_indicator: m(t, "heating_curve.editor.show_now_indicator"),
      show_value_labels: m(t, "heating_curve.editor.show_value_labels"),
      long_press_opens_editor: m(t, "heating_curve.editor.long_press_opens_editor"),
      tap_action: m(t, "heating_curve.editor.tap_action"),
      hold_action: m(t, "heating_curve.editor.hold_action"),
      double_tap_action: m(t, "heating_curve.editor.double_tap_action")
    };
  }
  render() {
    return !this.hass || !this._config ? $ : v`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Ce}
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
Un([
  O({ attribute: !1 })
], ci.prototype, "hass", 2);
Un([
  T()
], ci.prototype, "_config", 2);
ci = Un([
  ce("power-pilz-heating-curve-card-editor")
], ci);
var $d = Object.defineProperty, dt = (t, e, i, n) => {
  for (var r = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (r = s(e, i, r) || r);
  return r && $d(e, i, r), r;
};
const Ho = "powerpilz-heating-curve-edit", Bo = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
], Qn = class Qn extends D {
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
      const n = L(this.hass, i);
      if (!n) return;
      const r = ((l = n.attributes) == null ? void 0 : l.options) ?? [];
      if (r.length === 0) return;
      const s = (r.indexOf(n.state) + 1) % r.length, a = i.split(".")[0];
      await this.hass.callService(a, "select_option", {
        entity_id: i,
        option: r[s]
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
      entity: Object.keys(i).find((r) => {
        var s;
        if (!r.startsWith("select.")) return !1;
        const o = (s = i[r]) == null ? void 0 : s.attributes;
        return !!(o != null && o.mode_names) && (o == null ? void 0 : o.week_points) !== void 0;
      }) ?? ""
    };
  }
  setConfig(e) {
    this._config = {
      ...e,
      icon: e.icon ?? "mdi:chart-bell-curve-cumulative",
      name: e.name ?? m(P(this.hass), "heating_curve.default_name"),
      show_day_selector: e.show_day_selector ?? !0,
      show_mode_control: e.show_mode_control ?? !0,
      show_now_indicator: e.show_now_indicator ?? !0,
      show_value_labels: e.show_value_labels ?? !0
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
    var s, a, l, c, h, d, u;
    const e = this.renderRoot.querySelector("ha-card");
    if (!e) return;
    (s = this._actionCleanup) == null || s.destroy();
    const i = !!((l = (a = this._config) == null ? void 0 : a.hold_action) != null && l.action) && this._config.hold_action.action !== "none", n = ((c = this._config) == null ? void 0 : c.long_press_opens_editor) !== !1 && !((d = (h = this._config) == null ? void 0 : h.hold_action) != null && d.action), r = i || n, o = !!((u = this._config) != null && u.double_tap_action) && this._config.double_tap_action.action !== void 0 && this._config.double_tap_action.action !== "none";
    this._actionCleanup = at(
      e,
      {
        onTap: () => this._fireAction("tap"),
        onHold: () => this._fireAction("hold"),
        onDoubleTap: () => this._fireAction("double_tap")
      },
      { hasHold: r, hasDoubleTap: o }
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
    if (e === "hold" && (!n || !n.action) && this._config.long_press_opens_editor !== !1 && (n = { action: Ho }), !(!n || !n.action || n.action === "none")) {
      if (n.action === Ho) {
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
    !e || !this.hass || Sd({ hass: this.hass, curveEntityId: e });
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
    var i, n, r;
    const e = this._entityId;
    if (e)
      return (r = (n = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : n[e]) == null ? void 0 : r.attributes;
  }
  _weekPoints() {
    const e = this._entityAttrs(), i = e == null ? void 0 : e.week_points;
    return i && typeof i == "object" && !Array.isArray(i) ? i : {};
  }
  _sameForAll() {
    var e;
    return ((e = this._entityAttrs()) == null ? void 0 : e.same_for_all_days) === !0;
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
    return this._sameForAll() ? "monday" : Bo[e] ?? "monday";
  }
  _pointsForDay(e) {
    const n = this._weekPoints()[this._dayKey(e)];
    return Array.isArray(n) ? n.map((r) => ({
      x: this._timeToMin(String(r.time ?? "00:00:00")),
      y: typeof r.value == "number" ? r.value : Number(r.value)
    })).filter((r) => Number.isFinite(r.x) && Number.isFinite(r.y)).sort((r, o) => r.x - o.x) : [];
  }
  _timeToMin(e) {
    const i = e.split(":"), n = parseInt(i[0] ?? "0", 10), r = parseInt(i[1] ?? "0", 10);
    return (isNaN(n) ? 0 : n) * 60 + (isNaN(r) ? 0 : r);
  }
  _nowMin() {
    const e = /* @__PURE__ */ new Date();
    return e.getHours() * 60 + e.getMinutes();
  }
  _resolvedActiveColor() {
    var i;
    const e = ue((i = this._config) == null ? void 0 : i.active_color);
    return e ? `rgb(${e})` : "var(--primary-color, rgb(3, 169, 244))";
  }
  _modeValue() {
    var o;
    const e = this._entityId;
    if (!e) return "auto";
    const i = L(this.hass, e), n = (i == null ? void 0 : i.state) ?? "auto", r = (o = i == null ? void 0 : i.attributes) == null ? void 0 : o.mode_names;
    if (r && typeof r == "object") {
      for (const [s, a] of Object.entries(r))
        if (typeof a == "string" && a === n) return s;
    }
    return n;
  }
  _modeLabel(e) {
    var n;
    const i = this._entityId;
    if (i) {
      const r = L(this.hass, i), o = (n = r == null ? void 0 : r.attributes) == null ? void 0 : n.mode_names;
      if (o && typeof o == "object") {
        const s = o[e.toLowerCase()];
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
    const i = this._pointsForDay(this._sameForAll() ? 1 : this._selectedDay), { min: n, max: r } = this._valueRange(), o = this._resolvedActiveColor(), s = this._sameForAll() || this._selectedDay === (/* @__PURE__ */ new Date()).getDay(), a = e.show_now_indicator !== !1 && s, l = this._nowMin(), c = [];
    if (i.length > 0) {
      i[0].x > 0 && c.push({ x: 0, y: i[0].y }), c.push(...i);
      const f = i[i.length - 1];
      f.x < 1440 && c.push({ x: 1440, y: f.y });
    }
    const h = 1e3, d = 80, u = Math.max(1e-4, r - n), p = zs(c, (f) => ({
      x: f.x / 1440 * h,
      y: (1 - (f.y - n) / u) * d
    })), y = c.length >= 2 ? `${p} L ${h} ${d} L 0 ${d} Z` : "";
    return v`
      <div class="curve-container">
        <svg
          viewBox="0 0 ${h} ${d}"
          preserveAspectRatio="none"
          class="curve-svg"
        >
          ${c.length >= 2 && y ? Ae`
            <path d=${y} fill=${o} fill-opacity="0.18" />
          ` : $}
          ${p ? Ae`
            <path d=${p}
              fill="none"
              stroke=${o}
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
            />
          ` : $}
          ${a ? Ae`
            <line
              x1=${l / 1440 * h}
              x2=${l / 1440 * h}
              y1="0" y2=${d}
              stroke=${o}
              stroke-width="1.5"
              stroke-dasharray="3 3"
              vector-effect="non-scaling-stroke"
            />
          ` : $}
        </svg>
      </div>
    `;
  }
  renderDaySelector() {
    if (this._sameForAll()) return $;
    const e = (/* @__PURE__ */ new Date()).getDay();
    return v`
      <div class="day-selector">
        ${Bo.map((i, n) => v`
          <button
            type="button"
            class="day-btn ${n === this._selectedDay ? "active" : ""} ${n === e ? "today" : ""}"
            data-day=${n}
            @click=${this.handleDaySelect}
          >
            ${Oe(P(this.hass), n)}
          </button>
        `)}
      </div>
    `;
  }
  renderModeButton() {
    const e = this._modeValue(), i = e.toLowerCase(), n = i === "on" ? "mdi:fire" : i === "off" ? "mdi:power-off" : "mdi:chart-bell-curve-cumulative";
    return v`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${e}">
        <ha-icon .icon=${n}></ha-icon>
        <span class="mode-label">${this._modeLabel(e)}</span>
      </button>
    `;
  }
  render() {
    var d, u;
    if (!this._config) return v`<ha-card>${m(P(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return v``;
    if (!this._entityId) {
      const _ = P(this.hass);
      return v`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:chart-bell-curve-cumulative"></ha-icon>
            <div class="placeholder-text">${m(_, "heating_curve.placeholder")}</div>
          </div>
        </ha-card>
      `;
    }
    const e = this._config, i = (u = (d = L(this.hass, this._entityId)) == null ? void 0 : d.attributes) == null ? void 0 : u.friendly_name, n = this._modeValue(), r = this._currentValue(), o = this._unit(), s = e.subtitle || (r !== null ? `${r.toFixed(1)} ${o} · ${this._modeLabel(n)}` : this._modeLabel(n)), a = e.show_day_selector !== !1, l = e.show_mode_control !== !1, h = this._isDeviceOn() ? this.iconStyle(e.icon_color) : this.iconStyle("disabled");
    return v`
      <ha-card>
        <div class="container">
          <div class="row row-header">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${A(h)}>
                  <ha-icon .icon=${e.icon ?? "mdi:chart-bell-curve-cumulative"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${e.name || i || m(P(this.hass), "heating_curve.default_name")}</div>
                <div class="secondary">${s}</div>
              </div>
              ${l ? this.renderModeButton() : $}
            </div>
          </div>
          ${a ? v`<div class="row row-days">${this.renderDaySelector()}</div>` : $}
          <div class="row row-curve">${this.renderCurvePreview()}</div>
        </div>
      </ha-card>
    `;
  }
};
Qn.styles = Q`
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

    .curve-container { position: relative; }
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
let Ee = Qn;
dt([
  O({ attribute: !1 })
], Ee.prototype, "hass");
dt([
  O({ type: Boolean })
], Ee.prototype, "preview");
dt([
  O({ type: Boolean })
], Ee.prototype, "editMode");
dt([
  T()
], Ee.prototype, "_config");
dt([
  T()
], Ee.prototype, "_selectedDay");
dt([
  T()
], Ee.prototype, "_tick");
customElements.get("power-pilz-heating-curve-card") || customElements.define("power-pilz-heating-curve-card", Ee);
window.customCards = window.customCards || [];
const kd = [
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
  },
  {
    type: "power-pilz-heating-curve-card",
    name: "PowerPilz Heating Curve Card",
    description: "Visual heating curve card with weekly setpoint shape, smooth interpolation and override modes.",
    preview: !0
  }
];
for (const t of kd)
  window.customCards.some((e) => e.type === t.type) || window.customCards.push(t);
console.info(
  `%cPOWER PILZ%c v${Ce}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
//# sourceMappingURL=power-pilz.js.map
