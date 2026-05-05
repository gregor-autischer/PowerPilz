/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lt = globalThis, ar = Lt.ShadowRoot && (Lt.ShadyCSS === void 0 || Lt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, lr = Symbol(), Kr = /* @__PURE__ */ new WeakMap();
let mo = class {
  constructor(e, i, r) {
    if (this._$cssResult$ = !0, r !== lr) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (ar && e === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (e = Kr.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Kr.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ea = (t) => new mo(typeof t == "string" ? t : t + "", void 0, lr), oe = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((r, n, o) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[o + 1], t[0]);
  return new mo(i, t, lr);
}, ta = (t, e) => {
  if (ar) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const r = document.createElement("style"), n = Lt.litNonce;
    n !== void 0 && r.setAttribute("nonce", n), r.textContent = i.cssText, t.appendChild(r);
  }
}, Gr = ar ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const r of e.cssRules) i += r.cssText;
  return ea(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ia, defineProperty: ra, getOwnPropertyDescriptor: na, getOwnPropertyNames: oa, getOwnPropertySymbols: sa, getPrototypeOf: aa } = Object, xe = globalThis, Yr = xe.trustedTypes, la = Yr ? Yr.emptyScript : "", _i = xe.reactiveElementPolyfillSupport, lt = (t, e) => t, Dt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? la : null;
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
} }, cr = (t, e) => !ia(t, e), qr = { attribute: !0, type: String, converter: Dt, reflect: !1, useDefault: !1, hasChanged: cr };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), xe.litPropertyMetadata ?? (xe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Ye = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = qr) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const r = Symbol(), n = this.getPropertyDescriptor(e, r, i);
      n !== void 0 && ra(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, i, r) {
    const { get: n, set: o } = na(this.prototype, e) ?? { get() {
      return this[i];
    }, set(s) {
      this[i] = s;
    } };
    return { get: n, set(s) {
      const a = n == null ? void 0 : n.call(this);
      o == null || o.call(this, s), this.requestUpdate(e, a, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? qr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(lt("elementProperties"))) return;
    const e = aa(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(lt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(lt("properties"))) {
      const i = this.properties, r = [...oa(i), ...sa(i)];
      for (const n of r) this.createProperty(n, i[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [r, n] of i) this.elementProperties.set(r, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const n = this._$Eu(i, r);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const n of r) i.unshift(Gr(n));
    } else e !== void 0 && i.push(Gr(e));
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
    return ta(e, this.constructor.elementStyles), e;
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
    var o;
    const r = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, r);
    if (n !== void 0 && r.reflect === !0) {
      const s = (((o = r.converter) == null ? void 0 : o.toAttribute) !== void 0 ? r.converter : Dt).toAttribute(i, r.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var o, s;
    const r = this.constructor, n = r._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const a = r.getPropertyOptions(n), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : Dt;
      this._$Em = n;
      const c = l.fromAttribute(i, a.type);
      this[n] = c ?? ((s = this._$Ej) == null ? void 0 : s.get(n)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, i, r, n = !1, o) {
    var s;
    if (e !== void 0) {
      const a = this.constructor;
      if (n === !1 && (o = this[e]), r ?? (r = a.getPropertyOptions(e)), !((r.hasChanged ?? cr)(o, i) || r.useDefault && r.reflect && o === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(a._$Eu(e, r)))) return;
      this.C(e, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: r, reflect: n, wrapped: o }, s) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? i ?? this[e]), o !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (i = void 0), this._$AL.set(e, i)), n === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, s] of n) {
        const { wrapped: a } = s, l = this[o];
        a !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, s, l);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (r = this._$EO) == null || r.forEach((n) => {
        var o;
        return (o = n.hostUpdate) == null ? void 0 : o.call(n);
      }), this.update(i)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$EO) == null || i.forEach((r) => {
      var n;
      return (n = r.hostUpdated) == null ? void 0 : n.call(r);
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
Ye.elementStyles = [], Ye.shadowRootOptions = { mode: "open" }, Ye[lt("elementProperties")] = /* @__PURE__ */ new Map(), Ye[lt("finalized")] = /* @__PURE__ */ new Map(), _i == null || _i({ ReactiveElement: Ye }), (xe.reactiveElementVersions ?? (xe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct = globalThis, Xr = (t) => t, Ht = ct.trustedTypes, Zr = Ht ? Ht.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, fo = "$lit$", we = `lit$${Math.random().toFixed(9).slice(2)}$`, yo = "?" + we, ca = `<${yo}>`, Ne = document, ht = () => Ne.createComment(""), ut = (t) => t === null || typeof t != "object" && typeof t != "function", dr = Array.isArray, da = (t) => dr(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", mi = `[ 	
\f\r]`, et = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Jr = /-->/g, Qr = />/g, Me = RegExp(`>|${mi}(?:([^\\s"'>=/]+)(${mi}*=${mi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), en = /'/g, tn = /"/g, go = /^(?:script|style|textarea|title)$/i, ha = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), S = ha(1), De = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), rn = /* @__PURE__ */ new WeakMap(), Ie = Ne.createTreeWalker(Ne, 129);
function bo(t, e) {
  if (!dr(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Zr !== void 0 ? Zr.createHTML(e) : e;
}
const ua = (t, e) => {
  const i = t.length - 1, r = [];
  let n, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = et;
  for (let a = 0; a < i; a++) {
    const l = t[a];
    let c, h, d = -1, u = 0;
    for (; u < l.length && (s.lastIndex = u, h = s.exec(l), h !== null); ) u = s.lastIndex, s === et ? h[1] === "!--" ? s = Jr : h[1] !== void 0 ? s = Qr : h[2] !== void 0 ? (go.test(h[2]) && (n = RegExp("</" + h[2], "g")), s = Me) : h[3] !== void 0 && (s = Me) : s === Me ? h[0] === ">" ? (s = n ?? et, d = -1) : h[1] === void 0 ? d = -2 : (d = s.lastIndex - h[2].length, c = h[1], s = h[3] === void 0 ? Me : h[3] === '"' ? tn : en) : s === tn || s === en ? s = Me : s === Jr || s === Qr ? s = et : (s = Me, n = void 0);
    const p = s === Me && t[a + 1].startsWith("/>") ? " " : "";
    o += s === et ? l + ca : d >= 0 ? (r.push(c), l.slice(0, d) + fo + l.slice(d) + we + p) : l + we + (d === -2 ? a : p);
  }
  return [bo(t, o + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class pt {
  constructor({ strings: e, _$litType$: i }, r) {
    let n;
    this.parts = [];
    let o = 0, s = 0;
    const a = e.length - 1, l = this.parts, [c, h] = ua(e, i);
    if (this.el = pt.createElement(c, r), Ie.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = Ie.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(fo)) {
          const u = h[s++], p = n.getAttribute(d).split(we), _ = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: o, name: _[2], strings: p, ctor: _[1] === "." ? _a : _[1] === "?" ? ma : _[1] === "@" ? fa : qt }), n.removeAttribute(d);
        } else d.startsWith(we) && (l.push({ type: 6, index: o }), n.removeAttribute(d));
        if (go.test(n.tagName)) {
          const d = n.textContent.split(we), u = d.length - 1;
          if (u > 0) {
            n.textContent = Ht ? Ht.emptyScript : "";
            for (let p = 0; p < u; p++) n.append(d[p], ht()), Ie.nextNode(), l.push({ type: 2, index: ++o });
            n.append(d[u], ht());
          }
        }
      } else if (n.nodeType === 8) if (n.data === yo) l.push({ type: 2, index: o });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(we, d + 1)) !== -1; ) l.push({ type: 7, index: o }), d += we.length - 1;
      }
      o++;
    }
  }
  static createElement(e, i) {
    const r = Ne.createElement("template");
    return r.innerHTML = e, r;
  }
}
function qe(t, e, i = t, r) {
  var s, a;
  if (e === De) return e;
  let n = r !== void 0 ? (s = i._$Co) == null ? void 0 : s[r] : i._$Cl;
  const o = ut(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((a = n == null ? void 0 : n._$AO) == null || a.call(n, !1), o === void 0 ? n = void 0 : (n = new o(t), n._$AT(t, i, r)), r !== void 0 ? (i._$Co ?? (i._$Co = []))[r] = n : i._$Cl = n), n !== void 0 && (e = qe(t, n._$AS(t, e.values), n, r)), e;
}
class pa {
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
    const { el: { content: i }, parts: r } = this._$AD, n = ((e == null ? void 0 : e.creationScope) ?? Ne).importNode(i, !0);
    Ie.currentNode = n;
    let o = Ie.nextNode(), s = 0, a = 0, l = r[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new yt(o, o.nextSibling, this, e) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, e) : l.type === 6 && (c = new ya(o, this, e)), this._$AV.push(c), l = r[++a];
      }
      s !== (l == null ? void 0 : l.index) && (o = Ie.nextNode(), s++);
    }
    return Ie.currentNode = Ne, n;
  }
  p(e) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, i), i += r.strings.length - 2) : r._$AI(e[i])), i++;
  }
}
class yt {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, r, n) {
    this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = r, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    e = qe(this, e, i), ut(e) ? e === k || e == null || e === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : e !== this._$AH && e !== De && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : da(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== k && ut(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Ne.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: i, _$litType$: r } = e, n = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = pt.createElement(bo(r.h, r.h[0]), this.options)), r);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n) this._$AH.p(i);
    else {
      const s = new pa(n, this), a = s.u(this.options);
      s.p(i), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = rn.get(e.strings);
    return i === void 0 && rn.set(e.strings, i = new pt(e)), i;
  }
  k(e) {
    dr(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, n = 0;
    for (const o of e) n === i.length ? i.push(r = new yt(this.O(ht()), this.O(ht()), this, this.options)) : r = i[n], r._$AI(o), n++;
    n < i.length && (this._$AR(r && r._$AB.nextSibling, n), i.length = n);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, i); e !== this._$AB; ) {
      const n = Xr(e).nextSibling;
      Xr(e).remove(), e = n;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class qt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, r, n, o) {
    this.type = 1, this._$AH = k, this._$AN = void 0, this.element = e, this.name = i, this._$AM = n, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = k;
  }
  _$AI(e, i = this, r, n) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) e = qe(this, e, i, 0), s = !ut(e) || e !== this._$AH && e !== De, s && (this._$AH = e);
    else {
      const a = e;
      let l, c;
      for (e = o[0], l = 0; l < o.length - 1; l++) c = qe(this, a[r + l], i, l), c === De && (c = this._$AH[l]), s || (s = !ut(c) || c !== this._$AH[l]), c === k ? e = k : e !== k && (e += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    s && !n && this.j(e);
  }
  j(e) {
    e === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class _a extends qt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === k ? void 0 : e;
  }
}
class ma extends qt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== k);
  }
}
class fa extends qt {
  constructor(e, i, r, n, o) {
    super(e, i, r, n, o), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = qe(this, e, i, 0) ?? k) === De) return;
    const r = this._$AH, n = e === k && r !== k || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, o = e !== k && (r === k || n);
    n && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ya {
  constructor(e, i, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    qe(this, e);
  }
}
const fi = ct.litHtmlPolyfillSupport;
fi == null || fi(pt, yt), (ct.litHtmlVersions ?? (ct.litHtmlVersions = [])).push("3.3.2");
const ga = (t, e, i) => {
  const r = (i == null ? void 0 : i.renderBefore) ?? e;
  let n = r._$litPart$;
  if (n === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    r._$litPart$ = n = new yt(e.insertBefore(ht(), o), o, void 0, i ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Le = globalThis;
let D = class extends Ye {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ga(i, this.renderRoot, this.renderOptions);
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
    return De;
  }
};
var _o;
D._$litElement$ = !0, D.finalized = !0, (_o = Le.litElementHydrateSupport) == null || _o.call(Le, { LitElement: D });
const yi = Le.litElementPolyfillSupport;
yi == null || yi({ LitElement: D });
(Le.litElementVersions ?? (Le.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pe = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ba = { attribute: !0, type: String, converter: Dt, reflect: !1, hasChanged: cr }, va = (t = ba, e, i) => {
  const { kind: r, metadata: n } = i;
  let o = globalThis.litPropertyMetadata.get(n);
  if (o === void 0 && globalThis.litPropertyMetadata.set(n, o = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), o.set(i.name, t), r === "accessor") {
    const { name: s } = i;
    return { set(a) {
      const l = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(s, l, t, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, t, a), a;
    } };
  }
  if (r === "setter") {
    const { name: s } = i;
    return function(a) {
      const l = this[s];
      e.call(this, a), this.requestUpdate(s, l, t, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function O(t) {
  return (e, i) => typeof i == "object" ? va(t, e, i) : ((r, n, o) => {
    const s = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, r), s ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function M(t) {
  return O({ ...t, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wa = { ATTRIBUTE: 1 }, xa = (t) => (...e) => ({ _$litDirective$: t, values: e });
let Sa = class {
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
const vo = "important", Ea = " !" + vo, A = xa(class extends Sa {
  constructor(t) {
    var e;
    if (super(t), t.type !== wa.ATTRIBUTE || t.name !== "style" || ((e = t.strings) == null ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
      const n = e[r];
      if (n != null) {
        this.ft.add(r);
        const o = typeof n == "string" && n.endsWith(Ea);
        r.includes("-") || o ? i.setProperty(r, o ? n.slice(0, -11) : n, o ? vo : "") : i[r] = n;
      }
    }
    return De;
  }
}), U = (t, e) => {
  if (e)
    return t.states[e];
}, B = (t, e) => {
  const i = U(t, e);
  if (!i)
    return null;
  const r = Number(i.state);
  return Number.isFinite(r) ? r : null;
}, V = (t, e) => {
  const i = U(t, e);
  if (!i)
    return;
  const r = i.attributes.unit_of_measurement;
  return typeof r == "string" ? r : void 0;
}, Nt = (t, e) => {
  const i = U(t, e);
  return i == null ? void 0 : i.state;
}, q = (t, e = "hybrid") => t === "history" || t === "statistics" || t === "hybrid" ? t : t === "auto" || e === "auto" ? "hybrid" : e, wo = 3e4, Ca = 10 * 6e4, $a = 1440, ka = 1e4, Ta = 2e3, xo = 40, Xt = /* @__PURE__ */ new Map(), gi = /* @__PURE__ */ new Map(), bi = /* @__PURE__ */ new Map(), nn = /* @__PURE__ */ new WeakMap(), on = /* @__PURE__ */ new WeakMap(), sn = /* @__PURE__ */ new WeakMap(), an = /* @__PURE__ */ new WeakMap(), hr = (t, e = $a) => {
  if (t.length <= e)
    return t;
  if (e <= 2)
    return [t[0], t[t.length - 1]];
  const i = t.slice(1, -1), r = Math.max(1, Math.floor((e - 2) / 2)), n = i.length / r, o = [t[0]];
  for (let l = 0; l < r; l += 1) {
    const c = Math.floor(l * n), h = Math.max(c + 1, Math.floor((l + 1) * n)), d = i.slice(c, h);
    if (d.length === 0)
      continue;
    let u = d[0], p = d[0];
    for (const _ of d)
      _.value < u.value && (u = _), _.value > p.value && (p = _);
    if (u.ts <= p.ts ? (o.push(u), p !== u && o.push(p)) : (o.push(p), u !== p && o.push(u)), o.length >= e - 1)
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
}, So = (t, e) => {
  const i = e ? ka : Ta;
  return !Number.isFinite(t) || t <= 0 || i <= 1 ? Math.max(0, Math.floor(t)) : Math.max(0, Math.floor(t / i) * i);
}, za = (t) => {
  const e = (r) => {
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
    t.last_changed,
    t.last_updated,
    t.last_changed_ts,
    t.last_updated_ts,
    // Some minimal/compact responses use short keys.
    t.lc,
    t.lu
  ];
  for (const r of i) {
    const n = e(r);
    if (n !== null)
      return n;
  }
  return null;
}, Bt = (t, e, i) => {
  const r = [...t, ...e].filter((o) => Number.isFinite(o.ts) && Number.isFinite(o.value) && o.ts >= i).sort((o, s) => o.ts - s.ts);
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
  }), hr(n);
}, Ma = (t, e, i = Date.now()) => {
  if (!Array.isArray(t))
    return { entityId: null, points: [] };
  const r = [];
  let n = null;
  for (const a of t) {
    if (!a || typeof a != "object")
      continue;
    const l = a;
    n === null && typeof l.entity_id == "string" && l.entity_id.length > 0 && (n = l.entity_id);
    const c = Number(l.state), h = za(l);
    !Number.isFinite(c) || h === null || r.push({ ts: h, value: c });
  }
  const o = i - e, s = r.filter((a) => a.ts >= o).sort((a, l) => a.ts - l.ts);
  return {
    entityId: n,
    points: hr(s)
  };
}, Zt = (t, e, i) => `${t}|${e}|${i}`, Q = (t) => t.map((e) => ({ ts: e.ts, value: e.value })), vi = (t) => {
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
}, Aa = (t) => vi(t.start) ?? vi(t.end) ?? vi(t.last_reset), Oa = (t) => {
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
}, Pa = (t, e, i = Date.now()) => {
  if (!Array.isArray(t))
    return [];
  const r = [];
  t.forEach((s) => {
    if (!s || typeof s != "object")
      return;
    const a = s, l = Aa(a), c = Oa(a);
    l === null || c === null || r.push({ ts: l, value: c });
  });
  const n = i - e, o = r.filter((s) => s.ts >= n).sort((s, a) => s.ts - a.ts);
  return hr(o);
}, Eo = (t) => {
  const e = an.get(t);
  if (e)
    return e;
  const i = /* @__PURE__ */ new Map();
  return an.set(t, i), i;
}, Co = (t, e, i) => {
  const r = Eo(t), n = r.get(e);
  return n ? n.expiresAt <= i ? (r.delete(e), null) : n.supported : null;
}, ln = (t, e, i, r) => {
  Eo(t).set(e, {
    supported: i,
    expiresAt: r + Ca
  });
}, Ra = (t) => {
  const e = nn.get(t);
  if (e)
    return e;
  const i = /* @__PURE__ */ new Map();
  return nn.set(t, i), i;
}, $o = async (t, e, i, r, n, o) => {
  const s = new Date(r).toISOString(), a = e.join(","), l = `history/period/${s}?filter_entity_id=${encodeURIComponent(a)}&minimal_response&no_attributes`;
  let c;
  try {
    c = await t("GET", l);
  } catch {
    const u = {};
    return e.forEach((p) => {
      u[p] = [];
    }), u;
  }
  const h = Array.isArray(c) ? c : [], d = {};
  return h.forEach((u, p) => {
    const _ = Ma(u, i, n), w = e[p], f = _.entityId ?? w;
    f && (d[f] = _.points);
  }), e.forEach((u) => {
    u in d || (d[u] = []), o && Xt.set(Zt("history", u, i), {
      expiresAt: n + wo,
      points: Q(d[u])
    });
  }), d;
}, Ia = (t, e, i, r, n) => {
  const o = Ra(t);
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
        const d = await $o(
          t,
          h,
          r,
          n,
          Date.now(),
          !0
        );
        c.waiters.forEach((u) => {
          const p = {};
          u.entityIds.forEach((_) => {
            p[_] = Q(d[_] ?? []);
          }), u.resolve(p);
        });
      } catch (d) {
        c.waiters.forEach((u) => u.reject(d));
      }
    }, xo));
  });
}, La = (t) => {
  const e = on.get(t);
  if (e)
    return e;
  const i = /* @__PURE__ */ new Map();
  return on.set(t, i), i;
}, Na = async (t, e, i, r) => {
  const n = [...r], o = new Date(e).toISOString(), s = new Date(i).toISOString(), a = sn.get(t), l = a ? [a] : ["recorder/statistics_during_period", "history/statistics_during_period"];
  let c;
  for (const h of l)
    try {
      const d = await t({
        type: h,
        start_time: o,
        end_time: s,
        statistic_ids: n,
        period: "5minute",
        types: ["state", "mean", "sum"]
      });
      return sn.set(t, h), d;
    } catch (d) {
      c = d;
    }
  throw c;
}, Da = async (t, e) => {
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
    return i.forEach((n) => {
      if (!n || typeof n != "object")
        return;
      const o = n.statistic_id;
      typeof o == "string" && o.length > 0 && r.add(o);
    }), r;
  } catch {
    return null;
  }
}, ko = async (t, e, i, r, n, o) => {
  let s;
  try {
    s = await Na(t, r, n, e);
  } catch {
    const p = new Set(e), _ = {};
    return e.forEach((w) => {
      _[w] = [];
    }), {
      pointsByEntity: _,
      unsupportedEntityIds: p
    };
  }
  const a = s && typeof s == "object" && !Array.isArray(s) ? s : {}, l = {}, c = /* @__PURE__ */ new Set(), h = [];
  e.forEach((p) => {
    if (!Object.prototype.hasOwnProperty.call(a, p)) {
      l[p] = [], h.push(p);
      return;
    }
    const _ = Pa(a[p], i, n);
    l[p] = _, ln(t, p, !0, n), o && Xt.set(Zt("statistics", p, i), {
      expiresAt: n + wo,
      points: Q(_)
    });
  });
  const d = [];
  h.forEach((p) => {
    const _ = Co(t, p, n);
    if (_ !== !0) {
      if (_ === !1) {
        c.add(p);
        return;
      }
      d.push(p);
    }
  });
  const u = await Da(t, d);
  return u !== null ? d.forEach((p) => {
    const _ = u.has(p);
    ln(t, p, _, n), _ || c.add(p);
  }) : d.forEach((p) => {
    c.add(p);
  }), {
    pointsByEntity: l,
    unsupportedEntityIds: c
  };
}, Ha = (t, e, i, r, n) => {
  const o = La(t);
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
        const d = await ko(
          t,
          h,
          r,
          n,
          Date.now(),
          !0
        );
        c.waiters.forEach((u) => {
          const p = {
            pointsByEntity: {},
            unsupportedEntityIds: /* @__PURE__ */ new Set()
          };
          u.entityIds.forEach((_) => {
            p.pointsByEntity[_] = Q(d.pointsByEntity[_] ?? []), d.unsupportedEntityIds.has(_) && p.unsupportedEntityIds.add(_);
          }), u.resolve(p);
        });
      } catch (d) {
        c.waiters.forEach((u) => u.reject(d));
      }
    }, xo));
  });
}, To = async (t, e, i, r) => {
  const n = t.callApi, o = Array.from(new Set(e.filter((f) => f.length > 0)));
  if (!n || o.length === 0)
    return {};
  const s = Date.now(), a = typeof r == "number" && Number.isFinite(r) ? Math.max(s - i, Math.floor(r)) : s - i, l = a <= s - i + 1e3, c = So(a, l), h = {}, d = [];
  if (o.forEach((f) => {
    if (l) {
      const y = Zt("history", f, i), v = Xt.get(y);
      if (v && v.expiresAt > s) {
        h[f] = Q(v.points);
        return;
      }
    }
    d.push(f);
  }), d.length === 0)
    return h;
  if (l) {
    const f = `${c}|${i}`, y = await Ia(
      n,
      f,
      d,
      i,
      c
    );
    return d.forEach((v) => {
      h[v] = Q(y[v] ?? []);
    }), h;
  }
  const u = [...d].sort(), p = `${c}|${i}|${u.join(",")}`, _ = gi.get(p);
  if (_) {
    const f = await _;
    return d.forEach((y) => {
      h[y] = Q(f[y] ?? []);
    }), h;
  }
  const w = (async () => $o(
    n,
    d,
    i,
    c,
    s,
    l
  ))();
  gi.set(p, w);
  try {
    const f = await w;
    return d.forEach((y) => {
      h[y] = Q(f[y] ?? []);
    }), h;
  } finally {
    gi.delete(p);
  }
}, zo = async (t, e, i, r) => {
  const n = t.callWS, o = Array.from(new Set(e.filter((v) => v.length > 0)));
  if (!n || o.length === 0)
    return {
      pointsByEntity: {},
      unsupportedEntityIds: new Set(o)
    };
  const s = Date.now(), a = typeof r == "number" && Number.isFinite(r) ? Math.max(s - i, Math.floor(r)) : s - i, l = a <= s - i + 1e3, c = So(a, l), h = {}, d = [], u = /* @__PURE__ */ new Set();
  if (o.forEach((v) => {
    if (Co(n, v, s) === !1) {
      h[v] = [], u.add(v);
      return;
    }
    if (l) {
      const C = Zt("statistics", v, i), b = Xt.get(C);
      if (b && b.expiresAt > s) {
        h[v] = Q(b.points);
        return;
      }
    }
    d.push(v);
  }), d.length === 0)
    return {
      pointsByEntity: h,
      unsupportedEntityIds: u
    };
  const p = (v) => (d.forEach((E) => {
    h[E] = Q(v.pointsByEntity[E] ?? []), v.unsupportedEntityIds.has(E) && u.add(E);
  }), {
    pointsByEntity: h,
    unsupportedEntityIds: u
  });
  if (l) {
    const v = `${c}|${i}`, E = await Ha(
      n,
      v,
      d,
      i,
      c
    );
    return p(E);
  }
  const _ = [...d].sort(), w = `${c}|${i}|${_.join(",")}`, f = bi.get(w);
  if (f) {
    const v = await f;
    return p(v);
  }
  const y = (async () => ko(
    n,
    d,
    i,
    c,
    s,
    l
  ))();
  bi.set(w, y);
  try {
    const v = await y;
    return p(v);
  } finally {
    bi.delete(w);
  }
}, Ba = async (t, e, i, r) => {
  const n = await zo(
    t,
    e,
    i,
    r
  ), o = {};
  e.forEach((l) => {
    l.length !== 0 && (o[l] = Q(n.pointsByEntity[l] ?? []));
  });
  const s = Array.from(n.unsupportedEntityIds).filter((l) => l.length > 0);
  if (s.length === 0)
    return o;
  const a = await To(
    t,
    s,
    i,
    r
  );
  return s.forEach((l) => {
    o[l] = Q(a[l] ?? []);
  }), o;
}, Se = async (t, e, i, r) => {
  const n = q(r == null ? void 0 : r.dataSource, "hybrid");
  return n === "history" ? To(t, e, i, r == null ? void 0 : r.startMs) : n === "statistics" ? (await zo(
    t,
    e,
    i,
    r == null ? void 0 : r.startMs
  )).pointsByEntity : Ba(t, e, i, r == null ? void 0 : r.startMs);
}, cn = {
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
}, me = (t) => {
  if (Array.isArray(t) && t.length >= 3) {
    const n = t.slice(0, 3).map((o) => Number(o));
    if (n.every((o) => Number.isFinite(o))) {
      const [o, s, a] = n.map((l) => Math.max(0, Math.min(255, Math.round(l))));
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
  if (e in cn)
    return `var(--rgb-${e}, ${cn[e]})`;
  const i = /^#([a-fA-F0-9]{3})$/, r = /^#([a-fA-F0-9]{6})$/;
  if (i.test(e)) {
    const [, n] = e.match(i) ?? [];
    if (!n)
      return null;
    const o = parseInt(n[0] + n[0], 16), s = parseInt(n[1] + n[1], 16), a = parseInt(n[2] + n[2], 16);
    return `${o}, ${s}, ${a}`;
  }
  if (r.test(e)) {
    const [, n] = e.match(r) ?? [];
    if (!n)
      return null;
    const o = parseInt(n.slice(0, 2), 16), s = parseInt(n.slice(2, 4), 16), a = parseInt(n.slice(4, 6), 16);
    return `${o}, ${s}, ${a}`;
  }
  return null;
}, le = (t, e = "") => {
  const i = me(t);
  if (i)
    return `rgb(${i})`;
  if (typeof t == "string" && t.trim().length > 0) {
    const r = t.trim(), n = r.toLowerCase();
    if (n !== "none" && n !== "default")
      return r;
  }
  return e;
}, Ee = (t) => {
  const e = me(t);
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
}, ur = (t, e, i) => {
  const r = t.map((n) => ({
    x: n.x / 100 * e,
    y: n.y / 100 * i,
    value: n.value,
    ts: n.ts
  }));
  return Fa(r, e);
}, Fa = (t, e) => {
  if (t.length <= 3)
    return t;
  const i = Math.max(24, Math.min(t.length, Math.round(e)));
  if (t.length <= i)
    return dn(t);
  const r = [];
  r.push(t[0]);
  const n = (t.length - 1) / (i - 1);
  for (let o = 1; o < i - 1; o += 1) {
    const s = Math.floor(o * n), a = Math.max(s + 1, Math.floor((o + 1) * n)), l = t.slice(s, Math.min(t.length, a));
    if (l.length === 0)
      continue;
    const c = l.reduce(
      (d, u) => (d.x += u.x, d.y += u.y, d.value += u.value, d.ts += u.ts, d),
      { x: 0, y: 0, value: 0, ts: 0 }
    ), h = l.length;
    r.push({
      x: c.x / h,
      y: c.y / h,
      value: c.value / h,
      ts: c.ts / h
    });
  }
  return r.push(t[t.length - 1]), dn(r);
}, dn = (t) => {
  if (t.length <= 3)
    return t;
  const e = [t[0]];
  for (let i = 1; i < t.length - 1; i += 1) {
    const r = t[i - 1], n = t[i], o = t[i + 1];
    e.push({
      x: n.x,
      y: (r.y + n.y * 2 + o.y) / 4,
      value: (r.value + n.value * 2 + o.value) / 4,
      ts: n.ts
    });
  }
  return e.push(t[t.length - 1]), e;
}, hn = {
  "": 0,
  k: 1,
  m: -1,
  M: 2,
  G: 3,
  T: 4
}, Ti = ["", "k", "M", "G", "T"], de = (t, e) => {
  const i = typeof t == "number" && Number.isFinite(t) ? Math.round(t) : e;
  return Math.max(0, Math.min(4, i));
}, Y = (t) => {
  if (!t)
    return null;
  const e = t.trim();
  if (e.length === 0)
    return null;
  if (e.endsWith("Wh")) {
    const i = e.slice(0, -2), n = hn[i === "K" ? "k" : i];
    return n === void 0 ? null : {
      family: "energy",
      prefixPower: n,
      factor: Math.pow(1e3, n),
      canonicalUnit: "Wh"
    };
  }
  if (e.endsWith("W")) {
    const i = e.slice(0, -1), n = hn[i === "K" ? "k" : i];
    return n === void 0 ? null : {
      family: "power",
      prefixPower: n,
      factor: Math.pow(1e3, n),
      canonicalUnit: "W"
    };
  }
  return null;
}, Va = (t, e) => {
  const i = Math.max(0, Math.min(Ti.length - 1, e)), r = Ti[i] ?? "";
  return t === "energy" ? `${r}Wh` : `${r}W`;
}, Ua = (t) => {
  if (!Number.isFinite(t) || t <= 0)
    return 0;
  let e = 0, i = t;
  for (; i >= 1e3 && e < Ti.length - 1; )
    i /= 1e3, e += 1;
  return e;
}, _t = (t, e, i, r) => {
  const n = r.nullWithUnit === !0;
  if (t === null)
    return n && e ? `-- ${e}` : "--";
  const o = Y(e);
  if (!r.enabled || !o)
    return `${t.toFixed(i)} ${e}`.trim();
  const s = t < 0 ? "-" : "", a = Math.abs(t) * o.factor, l = Ua(a), c = Va(o.family, l), h = a / Math.pow(1e3, l), d = l === 0 ? r.baseDecimals : r.prefixedDecimals;
  return `${s}${h.toFixed(d)} ${c}`.trim();
}, Wa = (t) => {
  const e = Object.keys(t), i = {};
  if (e.length === 0)
    return {
      comparable: !1,
      family: null,
      canonicalUnit: null,
      factors: i
    };
  let r = null, n = null;
  for (const o of e) {
    const s = Y(t[o]);
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
}, ja = 500, Ka = 250, Ga = 1e3, mt = (t, e, i) => {
  let r, n, o, s = !1, a = !1;
  const l = t.style.touchAction;
  t.style.touchAction = "manipulation";
  const c = () => {
    r !== void 0 && (clearTimeout(r), r = void 0);
  }, h = () => {
    n !== void 0 && (clearTimeout(n), n = void 0);
  }, d = (f) => {
    f.button === 0 && (i.stopPropagation && f.stopPropagation(), s = !1, h(), i.hasHold && (c(), r = setTimeout(() => {
      s = !0, r = void 0, e.onHold(), n = setTimeout(() => {
        s = !1, n = void 0;
      }, Ga);
    }, ja)));
  }, u = () => {
    c();
  }, p = () => {
    c(), s || (s = !1);
  }, _ = (f) => {
    if (i.stopPropagation && f.stopPropagation(), s) {
      s = !1, h(), f.stopPropagation();
      return;
    }
    i.hasDoubleTap ? a ? (a = !1, o !== void 0 && (clearTimeout(o), o = void 0), e.onDoubleTap()) : (a = !0, o = setTimeout(() => {
      a = !1, o = void 0, e.onTap();
    }, Ka)) : e.onTap();
  }, w = (f) => {
    (s || r !== void 0) && f.preventDefault();
  };
  return t.addEventListener("pointerdown", d, { passive: !0 }), t.addEventListener("pointerup", u, { passive: !0 }), t.addEventListener("pointercancel", p, { passive: !0 }), t.addEventListener("pointerleave", p, { passive: !0 }), t.addEventListener("click", _), t.addEventListener("contextmenu", w), {
    destroy: () => {
      c(), h(), o !== void 0 && clearTimeout(o), t.removeEventListener("pointerdown", d), t.removeEventListener("pointerup", u), t.removeEventListener("pointercancel", p), t.removeEventListener("pointerleave", p), t.removeEventListener("click", _), t.removeEventListener("contextmenu", w), t.style.touchAction = l;
    }
  };
}, Xe = (t) => {
  const e = t.getContext("2d");
  if (!e)
    return null;
  const i = t.offsetWidth || t.getBoundingClientRect().width, r = t.offsetHeight || t.getBoundingClientRect().height, n = Math.max(1, Math.round(i)), o = Math.max(1, Math.round(r)), s = Math.max(1, window.devicePixelRatio || 1), a = Math.max(1, Math.round(n * s)), l = Math.max(1, Math.round(o * s));
  return (t.width !== a || t.height !== l) && (t.width = a, t.height = l), e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, t.width, t.height), e.setTransform(s, 0, 0, s, 0, 0), { ctx: e, width: n, height: o };
}, fe = (t, e) => {
  const i = document.createElement("span");
  i.style.position = "absolute", i.style.opacity = "0", i.style.pointerEvents = "none", i.style.color = e, t.appendChild(i);
  const r = getComputedStyle(i).color;
  return i.remove(), r || "rgb(158, 158, 158)";
}, Ya = (t, e) => {
  const i = t.trim(), r = i.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (r) {
    const c = r.slice(1, 4).map((h) => Math.max(0, Math.min(255, Math.round(Number(h)))));
    if (c.every((h) => Number.isFinite(h)))
      return [c[0], c[1], c[2]];
  }
  let n = e == null ? void 0 : e.ctx;
  if (n === void 0 && (n = document.createElement("canvas").getContext("2d"), e && (e.ctx = n)), !n) return null;
  n.fillStyle = "#000000", n.fillStyle = i;
  const o = n.fillStyle, a = (typeof o == "string" ? o.trim() : "").match(/^#([a-f\d]{6})$/i);
  if (!a) return null;
  const l = a[1];
  return [
    parseInt(l.slice(0, 2), 16),
    parseInt(l.slice(2, 4), 16),
    parseInt(l.slice(4, 6), 16)
  ];
}, Ze = (t, e, i) => {
  const r = Ya(t, i);
  if (!r) return t;
  const n = Math.max(0, Math.min(1, e));
  return `rgba(${r[0]}, ${r[1]}, ${r[2]}, ${n})`;
}, Ft = (t, e, i, r) => {
  if (!(e.length < 2)) {
    t.beginPath(), t.moveTo(e[0].x, e[0].y);
    for (let n = 1; n < e.length; n += 1)
      t.lineTo(e[n].x, e[n].y);
    t.strokeStyle = i, t.lineWidth = r, t.lineCap = "round", t.lineJoin = "round", t.stroke();
  }
}, zi = (t, e, i, r, n = 0.24, o = 0, s) => {
  if (e.length < 2) return;
  const a = e[0], l = e[e.length - 1];
  let c = e[0].y;
  for (let d = 1; d < e.length; d += 1)
    e[d].y < c && (c = e[d].y);
  const h = t.createLinearGradient(0, c, 0, r);
  h.addColorStop(0, Ze(i, n, s)), h.addColorStop(1, Ze(i, o, s)), t.beginPath(), t.moveTo(a.x, a.y);
  for (let d = 1; d < e.length; d += 1)
    t.lineTo(e[d].x, e[d].y);
  t.lineTo(l.x, r), t.lineTo(a.x, r), t.closePath(), t.fillStyle = h, t.fill();
}, qa = (t, e, i, r) => {
  if (!(e.length < 2 || i.length < 2)) {
    t.beginPath(), t.moveTo(e[0].x, e[0].y);
    for (let n = 1; n < e.length; n += 1)
      t.lineTo(e[n].x, e[n].y);
    for (let n = i.length - 1; n >= 0; n -= 1)
      t.lineTo(i[n].x, i[n].y);
    t.closePath(), t.fillStyle = r, t.fill();
  }
}, un = (t) => {
  if (!Number.isFinite(t) || t <= 0) return 1;
  const e = Math.floor(Math.log10(t)), i = Math.pow(10, e), r = t / i;
  let n;
  return r <= 1 ? n = 1 : r <= 2 ? n = 2 : r <= 5 ? n = 5 : n = 10, n * i;
}, Xa = (t, e) => {
  const i = [];
  for (let r = 1; r < t.length; r += 1) {
    const n = t[r - 1], o = t[r], s = n.value <= e, a = o.value <= e;
    if (s === a || Math.abs(o.value - n.value) <= 1e-9) {
      i.push({ start: n, end: o, low: s });
      continue;
    }
    const l = Math.max(0, Math.min(1, (e - n.value) / (o.value - n.value))), c = {
      x: n.x + (o.x - n.x) * l,
      y: n.y + (o.y - n.y) * l,
      value: e
    };
    i.push({ start: n, end: c, low: s }), i.push({ start: c, end: o, low: a });
  }
  return i;
}, Za = (t) => {
  const e = [];
  for (const i of t) {
    if (e.length === 0) {
      e.push({ low: i.low, points: [i.start, i.end] });
      continue;
    }
    const r = e[e.length - 1], n = r.points[r.points.length - 1], o = Math.abs(n.x - i.start.x) <= 0.01 && Math.abs(n.y - i.start.y) <= 0.01;
    r.low === i.low && o ? r.points.push(i.end) : e.push({ low: i.low, points: [i.start, i.end] });
  }
  return e;
}, Ja = (t, e, i, r, n) => {
  t.lineWidth = n, t.lineCap = "round", t.lineJoin = "round";
  for (const o of e)
    t.beginPath(), t.moveTo(o.start.x, o.start.y), t.lineTo(o.end.x, o.end.y), t.strokeStyle = o.low ? r : i, t.stroke();
}, Qa = (t, e, i = 5) => {
  if (!Number.isFinite(t) || !Number.isFinite(e) || i < 2)
    return [t, e].filter((l) => Number.isFinite(l));
  if (Math.abs(e - t) < 1e-9)
    return [t];
  const r = un(e - t), n = un(r / (i - 1)), o = Math.floor(t / n) * n, s = Math.ceil(e / n) * n, a = [];
  for (let l = o; l <= s + n / 2; l += n)
    a.push(Number(l.toFixed(10)));
  return a;
}, Ct = "purple", pn = "black", el = {
  battery: "battery_percentage",
  battery_secondary: "battery_secondary_percentage"
}, Pe = (t) => {
  if (typeof t != "string") return;
  const e = t.trim();
  return e.length > 0 ? e : void 0;
}, _n = (t, e) => {
  var r, n;
  const i = (n = (r = t.states[e]) == null ? void 0 : r.attributes) == null ? void 0 : n.friendly_name;
  return typeof i == "string" && i.length > 0 ? i : void 0;
}, Mi = (t, e) => {
  var r, n;
  const i = (n = (r = t.states[e]) == null ? void 0 : r.attributes) == null ? void 0 : n.unit_of_measurement;
  return typeof i == "string" ? i : void 0;
}, wi = (t, e, i) => {
  if (i)
    return le(pn, pn);
  if (Array.isArray(t))
    return le(t, Ct);
  if (typeof t == "string") {
    const r = t.trim();
    if (r.length > 0 && r !== "state")
      return le(r, Ct);
  }
  return le(Ct, Ct);
}, xi = [
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
], Si = (t, e) => e.defaultVisible ? t[e.visibleKey] !== !1 : t[e.visibleKey] === !0, tl = [
  { prefix: "solar", category: "solar", count: 4 },
  { prefix: "grid", category: "grid", count: 2 },
  { prefix: "grid_secondary", category: "grid_secondary", count: 2 },
  { prefix: "home", category: "home", count: 8 }
], Mo = (t, e) => {
  const i = e, r = [], n = (d) => {
    if (!Si(i, d)) return;
    const u = Pe(i[d.entityKey]);
    if (!u) return;
    const p = Pe(i[d.labelKey]) ?? _n(t, u) ?? u, _ = wi(i[d.trendColorKey], d.category, !1), w = Mi(t, u) ?? "", f = {
      id: u,
      nodeKey: d.nodeKey,
      entityId: u,
      label: p,
      color: _,
      unit: w,
      isPercentage: w === "%",
      isSubBlock: !1,
      category: d.category
    };
    return r.push(f), f;
  }, o = /* @__PURE__ */ new Map();
  for (const d of xi) {
    const u = n(d);
    u && o.set(d.nodeKey, u);
  }
  const s = (d, u, p, _, w, f) => {
    const y = Pe(i[d]);
    y && r.push({
      id: y,
      nodeKey: _,
      entityId: y,
      label: `${Pe(i[u]) ?? f} %`,
      color: wi(i[p], w, !1),
      unit: "%",
      isPercentage: !0,
      isSubBlock: !1,
      category: w
    });
  };
  Si(i, xi[4]) && s(
    "battery_percentage_entity",
    "battery_label",
    "battery_trend_color",
    "battery_percentage",
    "battery",
    "Battery"
  ), Si(i, xi[5]) && s(
    "battery_secondary_percentage_entity",
    "battery_secondary_label",
    "battery_secondary_trend_color",
    "battery_secondary_percentage",
    "battery_secondary",
    "Battery 2"
  );
  const a = [];
  for (const d of tl)
    for (let u = 1; u <= d.count; u += 1) {
      const p = `${d.prefix}_sub_${u}`;
      if (i[`${p}_enabled`] !== !0) continue;
      const _ = Pe(i[`${p}_entity`]);
      if (!_) continue;
      const w = Pe(i[`${p}_label`]) ?? _n(t, _) ?? _, f = wi(void 0, d.category, !0), y = Mi(t, _) ?? "", v = {
        id: _,
        nodeKey: p,
        entityId: _,
        label: w,
        color: f,
        unit: y,
        isPercentage: y === "%",
        isSubBlock: !0,
        category: d.category
      };
      r.push(v), d.prefix === "solar" && i[`${p}_state_mode`] !== !0 && a.push(v);
    }
  const l = o.get("home");
  if (l && i.home_auto_calculate === !0) {
    const d = il(i, t, l.unit, o.get("solar"));
    d && (l.computed = d);
  }
  const c = o.get("solar");
  c && i.solar_auto_calculate === !0 && a.length > 0 && (c.computed = rl(c.unit, a));
  const h = /* @__PURE__ */ new Set();
  return r.filter((d) => h.has(d.entityId) ? !1 : (h.add(d.entityId), !0));
}, il = (t, e, i, r) => {
  var l;
  const n = [], o = {}, s = {}, a = (c, h) => {
    const d = Pe(t[c]);
    d && (n.push(d), o[d] = Mi(e, d) ?? "", s[d] = h);
  };
  if (t.solar_visible !== !1 && a("solar_entity", 1), t.grid_visible !== !1 && a("grid_entity", 1), t.grid_secondary_visible === !0 && a("grid_secondary_entity", 1), t.battery_visible !== !1 && a("battery_entity", -1), t.battery_secondary_visible === !0 && a("battery_secondary_entity", -1), n.length !== 0) {
    if (t.solar_auto_calculate === !0 && ((l = r == null ? void 0 : r.computed) == null ? void 0 : l.mode) === "auto_solar") {
      const c = r.entityId, h = n.indexOf(c);
      if (h >= 0) {
        n.splice(h, 1), delete o[c], delete s[c];
        for (const d of r.computed.dependencies)
          n.includes(d) || (n.push(d), o[d] = r.computed.unitsByEntityId[d] ?? "", s[d] = 1);
      }
    }
    return {
      mode: "auto_home",
      dependencies: n,
      unitsByEntityId: o,
      signsByEntityId: s,
      outputUnit: i
    };
  }
}, rl = (t, e) => {
  const i = [], r = {}, n = {};
  for (const o of e)
    i.push(o.entityId), r[o.entityId] = o.unit, n[o.entityId] = 1;
  return {
    mode: "auto_solar",
    dependencies: i,
    unitsByEntityId: r,
    signsByEntityId: n,
    outputUnit: t
  };
}, nl = (t, e, i) => {
  if (i) {
    const n = t.find((o) => o.id === i);
    if (n) return n;
  }
  const r = el[e];
  if (r) {
    const n = t.find((o) => o.nodeKey === r);
    if (n) return n;
  }
  return t.find((n) => n.nodeKey === e);
}, Ao = (t) => {
  const e = /* @__PURE__ */ new Set();
  for (const i of t)
    if (e.add(i.entityId), i.computed)
      for (const r of i.computed.dependencies) e.add(r);
  return Array.from(e);
}, ol = (t, e) => {
  if (t.length === 0) return 0;
  if (e <= t[0].ts) return t[0].value;
  if (e >= t[t.length - 1].ts) return t[t.length - 1].value;
  let i = 0, r = t.length - 1;
  for (; r - i > 1; ) {
    const l = i + r >> 1;
    t[l].ts <= e ? i = l : r = l;
  }
  const n = t[i], o = t[r], s = o.ts - n.ts;
  if (s <= 0) return n.value;
  const a = (e - n.ts) / s;
  return n.value + (o.value - n.value) * a;
}, sl = (t, e) => {
  const i = t.dependencies.map((h) => ({
    id: h,
    unit: t.unitsByEntityId[h] ?? "",
    sign: t.signsByEntityId[h] ?? 1,
    points: e.get(h) ?? []
  })).filter((h) => h.points.length > 0);
  if (i.length === 0) return [];
  const r = /* @__PURE__ */ new Set();
  for (const h of i)
    for (const d of h.points) r.add(d.ts);
  const n = Array.from(r).sort((h, d) => h - d), o = /* @__PURE__ */ new Map();
  let s = null;
  for (const h of i) {
    const d = Y(h.unit);
    d && (o.set(h.id, d.factor), s ?? (s = d.family));
  }
  const a = Y(t.outputUnit), l = a && a.family === s ? a.factor : 1, c = [];
  for (const h of n) {
    let d = 0;
    for (const p of i) {
      const _ = ol(p.points, h), w = o.get(p.id) ?? 1;
      d += p.sign * _ * w;
    }
    const u = l > 0 ? d / l : d;
    Number.isFinite(u) && c.push({ ts: h, value: u });
  }
  return c;
}, Oo = (t, e) => t.computed ? sl(t.computed, e) : e.get(t.entityId) ?? [], al = 64, ll = 56, cl = 12, dl = 24, pr = "11px system-ui, -apple-system, sans-serif", hl = "var(--secondary-text-color, #757575)", Po = "rgba(127, 127, 127, 0.18)", ul = (t, e) => {
  var T;
  const i = Xe(t);
  if (!i) return null;
  const { ctx: r, width: n, height: o } = i, s = e.host ?? document.body, a = fe(s, hl), l = al, c = n - ll, h = cl, d = o - dl, u = Math.max(1, c - l), p = Math.max(1, d - h), _ = (z) => pl(z, {
    innerLeft: l,
    innerRight: c,
    innerTop: h,
    innerBottom: d,
    innerWidth: u,
    innerHeight: p,
    startMs: e.startMs,
    endMs: e.endMs
  });
  if (e.series.length === 0)
    return Oi(r, l, h, u, p, a), _([]);
  const w = Math.max(1, e.endMs - e.startMs), f = { ctx: void 0 };
  if (e.mode === "stacked-percent") {
    const z = yl(
      r,
      e,
      s,
      { innerLeft: l, innerTop: h, innerBottom: d, innerWidth: u, innerHeight: p },
      w,
      a,
      f
    );
    return yn(r, e, l, d, u, a), _(z);
  }
  const y = [], v = [];
  for (const z of e.series)
    e.mode === "overlay" && z.isPercentage ? v.push(z) : y.push(z);
  const E = Ro(y), C = mn(E.map((z) => z.points)), b = v.length > 0 ? mn(v.map((z) => z.points)) : null;
  Ai(
    r,
    C,
    l,
    h,
    p,
    "left",
    ((T = E[0]) == null ? void 0 : T.canonicalUnit) ?? e.primaryAxisLabel ?? "",
    e.tickCount ?? 5,
    e.decimals,
    a
  ), b && Ai(
    r,
    b,
    c,
    h,
    p,
    "right",
    "%",
    e.tickCount ?? 5,
    0,
    a
  );
  const g = e.lineWidth ?? 1.6, x = E.length, $ = [];
  for (let z = E.length - 1; z >= 0; z -= 1) {
    const P = E[z], I = fn(
      P.points,
      e.startMs,
      w,
      C,
      l,
      u,
      h,
      p
    ), N = fe(s, P.color);
    I.length >= 2 && ((e.mode === "single" || x === 1) && zi(r, I, N, d, 0.24, 0, f), Ft(r, I, N, g)), $.push({
      id: P.id,
      label: P.label,
      resolvedColor: N,
      rawUnit: P.unit,
      canonicalUnit: P.canonicalUnit,
      axis: "primary",
      isPercentage: P.isPercentage,
      points: P.points,
      rawPoints: P.rawPoints
    });
  }
  for (const z of v) {
    const P = fn(
      z.points,
      e.startMs,
      w,
      b ?? { min: 0, max: 100 },
      l,
      u,
      h,
      p
    ), I = fe(s, z.color);
    P.length >= 2 && (r.save(), r.setLineDash([4, 3]), Ft(r, P, I, g), r.restore()), $.push({
      id: z.id,
      label: z.label,
      resolvedColor: I,
      rawUnit: z.unit,
      canonicalUnit: z.unit,
      axis: "secondary",
      isPercentage: !0,
      points: z.points,
      rawPoints: z.points
    });
  }
  return yn(r, e, l, d, u, a), _($);
}, pl = (t, e) => {
  const i = Math.max(1, e.endMs - e.startMs), r = (s) => {
    const l = (Math.max(e.innerLeft, Math.min(e.innerRight, s)) - e.innerLeft) / Math.max(1, e.innerWidth);
    return e.startMs + l * i;
  }, n = (s) => {
    const a = Math.max(0, Math.min(1, (s - e.startMs) / i));
    return e.innerLeft + a * e.innerWidth;
  }, o = (s) => t.map((a) => ({
    seriesId: a.id,
    label: a.label,
    resolvedColor: a.resolvedColor,
    value: Lo(a.rawPoints, s),
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
    timestampToPixel: n,
    valuesAt: o
  };
}, mn = (t) => {
  let e = 1 / 0, i = -1 / 0;
  for (const n of t)
    for (const o of n)
      Number.isFinite(o.value) && (o.value < e && (e = o.value), o.value > i && (i = o.value));
  if (!Number.isFinite(e) || !Number.isFinite(i))
    return { min: 0, max: 1 };
  if (e === i) {
    const n = Math.abs(e) * 0.1 || 1;
    return { min: e - n, max: i + n };
  }
  e >= 0 && (e = 0);
  const r = i - e;
  return { min: e - r * 0.05, max: i + r * 0.05 };
}, fn = (t, e, i, r, n, o, s, a) => {
  const l = Math.max(1e-9, r.max - r.min);
  return t.filter((c) => Number.isFinite(c.ts) && Number.isFinite(c.value)).map((c) => {
    const h = Math.max(0, Math.min(1, (c.ts - e) / i)), d = Math.max(0, Math.min(1, (c.value - r.min) / l));
    return {
      x: n + h * o,
      y: s + (1 - d) * a
    };
  });
}, Ro = (t) => {
  const e = t.map((n) => ({ s: n, parsed: Y(n.unit) }));
  let i = null, r = !0;
  for (const n of e) {
    if (!n.parsed) {
      r = !1;
      break;
    }
    if (i === null)
      i = n.parsed.family;
    else if (i !== n.parsed.family) {
      r = !1;
      break;
    }
  }
  return r ? e.map(({ s: n, parsed: o }) => {
    if (!o)
      return { ...n, canonicalUnit: n.unit, rawPoints: n.points };
    const s = o.factor, a = n.points.map((l) => ({
      ts: l.ts,
      value: l.value * s
    }));
    return { ...n, points: a, canonicalUnit: o.canonicalUnit, rawPoints: n.points };
  }) : t.map((n) => ({ ...n, canonicalUnit: n.unit, rawPoints: n.points }));
}, Ai = (t, e, i, r, n, o, s, a, l, c) => {
  const h = Math.max(1e-9, e.max - e.min), d = h * 0.07, u = Qa(e.min, e.max, a).filter(
    (_) => _ > e.min + d && _ < e.max - d
  ), p = [e.min, ...u, e.max];
  t.save(), t.font = pr, t.fillStyle = c, t.textBaseline = "middle", t.textAlign = o === "left" ? "right" : "left";
  for (const _ of p) {
    const w = (_ - e.min) / h, f = r + (1 - w) * n, y = o === "left" ? i - 6 : i + 6;
    t.fillText(fl(_, s, l), y, f), o === "left" && (t.strokeStyle = Po, t.lineWidth = 1, t.beginPath(), t.moveTo(i, f + 0.5), t.lineTo(i + (t.canvas.width - 1e-3), f + 0.5), t.stroke());
  }
  t.restore();
}, yn = (t, e, i, r, n, o) => {
  const s = Math.max(1, e.endMs - e.startMs), a = s * 0.07, l = Io(s), c = ml(e.startMs, e.endMs).filter(
    (d) => d.ms > e.startMs + a && d.ms < e.endMs - a
  ), h = [
    { ms: e.startMs, label: l(new Date(e.startMs)), align: "left" },
    ...c.map((d) => ({ ms: d.ms, label: d.label, align: "center" })),
    { ms: e.endMs, label: l(new Date(e.endMs)), align: "right" }
  ];
  t.save(), t.font = pr, t.fillStyle = o, t.textBaseline = "top";
  for (const d of h) {
    const u = (d.ms - e.startMs) / s;
    if (u < 0 || u > 1) continue;
    const p = i + u * n;
    t.strokeStyle = Po, t.lineWidth = 1, t.beginPath(), t.moveTo(p + 0.5, r - 4), t.lineTo(p + 0.5, r), t.stroke(), t.textAlign = d.align, t.fillText(d.label, p, r + 4);
  }
  t.restore();
}, dt = 3600 * 1e3, ae = 24 * dt, Io = (t) => t <= 6 * dt ? (e) => `${je(e.getHours())}:${je(e.getMinutes())}` : t <= 2 * ae ? (e) => `${je(e.getHours())}:00` : t <= 200 * ae ? (e) => `${je(e.getDate())}.${je(e.getMonth() + 1)}` : (e) => `${je(e.getMonth() + 1)}/${String(e.getFullYear()).slice(2)}`, _l = (t) => t <= 6 * dt ? dt : t <= 2 * ae ? 6 * dt : t <= 14 * ae ? ae : t <= 90 * ae ? 7 * ae : t <= 200 * ae ? 14 * ae : 30 * ae, ml = (t, e) => {
  const i = e - t, r = _l(i), n = Io(i), o = Math.ceil(t / r) * r, s = [];
  for (let a = o; a <= e && (s.push({ ms: a, label: n(new Date(a)) }), !(s.length > 16)); a += r)
    ;
  return s;
}, je = (t) => String(t).padStart(2, "0"), fl = (t, e, i) => {
  const r = Math.abs(t), n = i !== void 0 ? i : r >= 100 ? 0 : r >= 10 ? 1 : 2, o = t.toFixed(n);
  return e ? `${o} ${e}` : o;
}, yl = (t, e, i, r, n, o, s) => {
  const a = e.series.filter((w) => !w.isPercentage);
  if (a.length === 0)
    return Oi(t, r.innerLeft, r.innerTop, r.innerWidth, r.innerHeight, o), [];
  const l = Ro(a), c = gl(l, e.startMs, e.endMs, 256);
  if (c.length < 2)
    return Oi(t, r.innerLeft, r.innerTop, r.innerWidth, r.innerHeight, o), [];
  const h = l.map(
    (w) => c.map((f) => Math.max(0, Lo(w.points, f)))
  ), d = c.map((w, f) => {
    let y = 0;
    for (const v of h) y += v[f];
    return y;
  });
  Ai(
    t,
    { min: 0, max: 100 },
    r.innerLeft,
    r.innerTop,
    r.innerHeight,
    "left",
    "%",
    e.tickCount ?? 5,
    0,
    o
  );
  let u = c.map((w) => ({
    x: gn(w, e.startMs, n, r.innerLeft, r.innerWidth),
    y: r.innerBottom
  }));
  const p = [], _ = c.map(() => 0);
  for (let w = 0; w < l.length; w += 1) {
    const f = l[w], y = h[w], v = [], E = [];
    for (let b = 0; b < c.length; b += 1) {
      const g = c[b];
      _[b] += y[b];
      const x = d[b], $ = x > 0 ? _[b] / x * 100 : 0, T = x > 0 ? y[b] / x * 100 : 0, z = Math.max(0, Math.min(1, $ / 100));
      v.push({
        x: gn(g, e.startMs, n, r.innerLeft, r.innerWidth),
        y: r.innerTop + (1 - z) * r.innerHeight
      }), E.push({ ts: g, value: T });
    }
    const C = fe(i, f.color);
    qa(t, v, u, Ze(C, 0.45, s)), Ft(t, v, C, e.lineWidth ?? 1.4), u = v, p.push({
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
  return p;
}, gl = (t, e, i, r) => {
  if (i <= e) return [];
  const n = Math.max(2, Math.min(r, 512)), o = (i - e) / (n - 1), s = [];
  for (let l = 0; l < n; l += 1)
    s.push(e + l * o);
  return t.some((l) => l.points.some((c) => c.ts >= e && c.ts <= i)) ? s : [];
}, Lo = (t, e) => {
  if (t.length === 0) return 0;
  if (e <= t[0].ts) return t[0].value;
  if (e >= t[t.length - 1].ts) return t[t.length - 1].value;
  let i = 0, r = t.length - 1;
  for (; r - i > 1; ) {
    const l = i + r >> 1;
    t[l].ts <= e ? i = l : r = l;
  }
  const n = t[i], o = t[r], s = o.ts - n.ts;
  if (s <= 0) return n.value;
  const a = (e - n.ts) / s;
  return n.value + (o.value - n.value) * a;
}, gn = (t, e, i, r, n) => {
  const o = Math.max(0, Math.min(1, (t - e) / i));
  return r + o * n;
}, Oi = (t, e, i, r, n, o) => {
  t.save(), t.font = pr, t.fillStyle = o, t.textAlign = "center", t.textBaseline = "middle", t.fillText("No data", e + r / 2, i + n / 2), t.restore();
};
var bl = Object.defineProperty, No = (t, e, i, r) => {
  for (var n = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = s(e, i, n) || n);
  return n && bl(e, i, n), n;
};
const vl = 180, Sr = class Sr extends D {
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
    this._closing || (this._closing = !0, setTimeout(() => this.remove(), vl));
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
    return S`
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
    return e === k ? k : S`<footer class="ppd-footer">${e}</footer>`;
  }
};
Sr.styles = oe`
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
let Ce = Sr;
No([
  O({ type: String })
], Ce.prototype, "dialogTitle");
No([
  M()
], Ce.prototype, "_closing");
var wl = Object.defineProperty, G = (t, e, i, r) => {
  for (var n = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = s(e, i, n) || n);
  return n && wl(e, i, n), n;
};
const Pi = "power-pilz-energy-node-dialog", Ei = [
  { id: "48h", label: "48 h", hours: 48 },
  { id: "7d", label: "7 d", hours: 168 },
  { id: "30d", label: "30 d", hours: 720 },
  { id: "90d", label: "90 d", hours: 2160 },
  { id: "6m", label: "6 M", hours: 720 * 6 },
  { id: "1y", label: "1 J", hours: 24 * 365 }
], xl = "7d", Sl = (t) => {
  const e = document.createElement(Pi);
  e.hass = t.hass, e.energyConfig = t.config, e.focusedNodeKey = t.focusedNodeKey, document.body.appendChild(e);
}, Er = class Er extends Ce {
  constructor() {
    super(...arguments), this.focusedNodeKey = "", this._allSeries = [], this._selectedIds = /* @__PURE__ */ new Set(), this._mode = "single", this._presetId = xl, this._useCustomRange = !1, this._customStartIso = "", this._customEndIso = "", this._historyByEntity = /* @__PURE__ */ new Map(), this._loading = !1, this._openPopover = null, this._focusedEntityIdOverride = null, this._fetchAbort = 0, this._chartContext = null, this._canvasLogicalSize = { width: 0, height: 0 }, this._onDocumentMouseDown = (e) => {
      if (this._openPopover === null) return;
      e.composedPath().some((n) => n instanceof HTMLElement ? n.dataset.ppPopover === this._openPopover || n.dataset.ppPopoverTrigger === this._openPopover : !1) || (this._openPopover = null);
    }, this._onCustomStartChange = (e) => {
      this._customStartIso = e.target.value, this._useCustomRange && this._fetchHistory();
    }, this._onCustomEndChange = (e) => {
      this._customEndIso = e.target.value, this._useCustomRange && this._fetchHistory();
    }, this._onChartPointerMove = (e) => {
      if (!this._chartContext) return;
      const i = this.renderRoot.querySelector(".pp-chart-canvas");
      if (!i) return;
      const r = i.getBoundingClientRect(), n = e.clientX - r.left, o = e.clientY - r.top, s = this._chartContext;
      if (n < s.innerLeft || n > s.innerRight || o < s.innerTop || o > s.innerBottom) {
        this._hover && (this._hover = void 0);
        return;
      }
      const a = s.pixelToTimestamp(n);
      this._hover = { canvasX: n, ts: a };
    }, this._onChartPointerLeave = () => {
      this._hover && (this._hover = void 0);
    };
  }
  // ------------------------------------------------------------
  // Lifecycle
  // ------------------------------------------------------------
  connectedCallback() {
    if (super.connectedCallback(), this._allSeries = Mo(this.hass, this.energyConfig), !this._customStartIso || !this._customEndIso) {
      const e = /* @__PURE__ */ new Date(), i = new Date(e.getTime() - 168 * 3600 * 1e3);
      this._customEndIso = bn(e), this._customStartIso = bn(i);
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
    return nl(this._allSeries, this.focusedNodeKey, this._focusedEntityIdOverride);
  }
  _titleForFocusedNode() {
    const e = this._resolveFocusedSeries();
    if (e) return e.label;
    const r = this.energyConfig[`${this.focusedNodeKey}_label`];
    return typeof r == "string" && r.trim().length > 0 ? r.trim() : this.focusedNodeKey;
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
      const n = $t(this._customStartIso), o = $t(this._customEndIso);
      if (n !== null && o !== null && o > n)
        return { startMs: n, endMs: o };
    }
    const e = Ei.find((n) => n.id === this._presetId) ?? Ei[1], i = Date.now();
    return { startMs: i - e.hours * 3600 * 1e3, endMs: i };
  }
  /** True when the user has the custom range toggle on but their start
   *  / end inputs are not a valid window (start ≥ end or unparseable). */
  _customRangeInvalid() {
    if (!this._useCustomRange) return !1;
    const e = $t(this._customStartIso), i = $t(this._customEndIso);
    return e === null || i === null || i <= e;
  }
  // ------------------------------------------------------------
  // History fetching
  // ------------------------------------------------------------
  async _fetchHistory() {
    const e = ++this._fetchAbort;
    this._loading = !0, this._loadError = void 0;
    const i = this._activeWindow(), r = i.endMs - i.startMs, n = r > 48 * 3600 * 1e3 ? "statistics" : "hybrid", o = this._activeEntityIds();
    if (o.length === 0) {
      this._loading = !1, this._historyByEntity = /* @__PURE__ */ new Map();
      return;
    }
    try {
      const s = await Se(
        this.hass,
        o,
        r,
        { startMs: i.startMs, dataSource: n }
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
    const e = this._allSeries.filter((r) => this._selectedIds.has(r.id)), i = this._resolveFocusedSeries();
    return i && !e.includes(i) && e.push(i), Ao(e);
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
    this._chartContext = ul(e, {
      mode: this._mode,
      series: r,
      startMs: i.startMs,
      endMs: i.endMs,
      host: this.renderRoot
    });
    const n = e.getBoundingClientRect();
    if (this._canvasLogicalSize = {
      width: Math.max(1, n.width),
      height: Math.max(1, n.height)
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
      points: Oo(e, this._historyByEntity)
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
    return S`
      <div class="pp-toolbar">
        ${this._renderModeSwitch()}
        ${this._renderRangeBar()}
        ${this._renderEntityTrigger()}
      </div>
      <div
        class="pp-chart-wrap"
        @pointermove=${this._onChartPointerMove}
        @pointerleave=${this._onChartPointerLeave}
      >
        <canvas class="pp-chart-canvas"></canvas>
        ${this._renderHoverOverlay()}
        ${this._loading ? S`<div class="pp-chart-overlay">Lade…</div>` : k}
        ${this._loadError ? S`<div class="pp-chart-overlay error">${this._loadError}</div>` : k}
      </div>
    `;
  }
  _renderHoverOverlay() {
    if (!this._hover || !this._chartContext) return k;
    const e = this._chartContext, { width: i, height: r } = this._canvasLogicalSize;
    if (i <= 0 || r <= 0) return k;
    const n = this._hover.canvasX / i * 100, o = e.valuesAt(this._hover.ts).filter(
      (a) => Number.isFinite(a.value)
    ), s = n < 60;
    return S`
      <div
        class="pp-hover-line"
        style=${A({ left: `${n}%` })}
        aria-hidden="true"
      ></div>
      <div
        class="pp-tooltip ${s ? "right" : "left"}"
        style=${A({
      left: s ? `${n}%` : "auto",
      right: s ? "auto" : `${100 - n}%`
    })}
      >
        <div class="pp-tooltip-time">${El(this._hover.ts)}</div>
        ${o.length === 0 ? S`<div class="pp-tooltip-row muted">—</div>` : o.map((a) => S`
              <div class="pp-tooltip-row">
                <span class="pp-tooltip-swatch" style=${A({ background: a.resolvedColor })}></span>
                <span class="pp-tooltip-label">${a.label}</span>
                <span class="pp-tooltip-value">${Cl(a.value, a.rawUnit)}</span>
              </div>
            `)}
      </div>
    `;
  }
  _renderModeSwitch() {
    return S`
      <div class="pp-segmented">
        ${[
      { id: "single", label: "Einzeln" },
      { id: "overlay", label: "Überlagert" },
      { id: "stacked-percent", label: "Gestapelt %" }
    ].map((i) => S`
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
    return S`
      <div class="pp-range-bar">
        ${Ei.map((r) => S`
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
          ${e ? this._renderDatePopover() : k}
        </div>
      </div>
    `;
  }
  _renderDatePopover() {
    const e = this._customRangeInvalid();
    return S`
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
        ${e ? S`<div class="pp-popover-err">Start muss vor Ende liegen.</div>` : k}
      </div>
    `;
  }
  _renderEntityTrigger() {
    const e = this._openPopover === "entities", i = this._mode === "single", r = this._resolveFocusedSeries(), n = this._allSeries.length, o = this._selectedIds.size, s = i ? S`
          ${r ? S`<span class="pp-dropdown-swatch" style=${A({ background: r.color })}></span>` : k}
          <span class="pp-dropdown-label">${(r == null ? void 0 : r.label) ?? "—"}</span>
        ` : S`
          <ha-icon icon="mdi:format-list-checkbox"></ha-icon>
          <span class="pp-dropdown-label">${o}/${n}</span>
        `;
    return S`
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
    var o;
    const e = this._groupSeriesByCategory(), i = this._mode === "single", r = this._mode === "stacked-percent", n = (o = this._resolveFocusedSeries()) == null ? void 0 : o.id;
    return S`
      <div class="pp-popover pp-entity-popover" data-pp-popover="entities">
        <div class="pp-popover-title">
          <span>${i ? "Entität" : "Entitäten"}</span>
          ${i ? k : S`
                <div class="pp-entity-quick">
                  <button class="pp-link" @click=${() => this._onSelectFocused()}>Nur fokussiert</button>
                  <button class="pp-link" @click=${() => this._onSelectAll()}>Alle</button>
                </div>
              `}
        </div>
        ${r ? S`<div class="pp-popover-hint">Prozent-Entitäten sind in der Stacked-Ansicht ausgeschlossen.</div>` : k}
        <div class="pp-entity-scroll">
          ${e.map((s) => S`
            <div class="pp-entity-group">
              <div class="pp-entity-group-title">${s.title}</div>
              ${s.items.map((a) => this._renderEntityRow(a, {
      isSingle: i,
      stackedExcludes: r,
      focusedId: n
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
      const o = e.id === i.focusedId;
      return S`
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
    const n = this._selectedIds.has(e.id) && !r;
    return S`
      <label
        class="pp-entity-row ${r ? "disabled" : ""}"
        title=${e.entityId}
      >
        <input
          type="checkbox"
          .checked=${n}
          ?disabled=${r}
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
    ], r = /* @__PURE__ */ new Map();
    for (const n of this._allSeries) {
      const o = r.get(n.category) ?? [];
      o.push(n), r.set(n.category, o);
    }
    return i.filter((n) => r.has(n)).map((n) => ({ title: e[n], items: r.get(n) ?? [] }));
  }
};
Er.styles = [
  Ce.styles,
  oe`
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
let H = Er;
G([
  O({ attribute: !1 })
], H.prototype, "hass");
G([
  O({ attribute: !1 })
], H.prototype, "energyConfig");
G([
  O({ type: String })
], H.prototype, "focusedNodeKey");
G([
  M()
], H.prototype, "_allSeries");
G([
  M()
], H.prototype, "_selectedIds");
G([
  M()
], H.prototype, "_mode");
G([
  M()
], H.prototype, "_presetId");
G([
  M()
], H.prototype, "_useCustomRange");
G([
  M()
], H.prototype, "_customStartIso");
G([
  M()
], H.prototype, "_customEndIso");
G([
  M()
], H.prototype, "_historyByEntity");
G([
  M()
], H.prototype, "_loading");
G([
  M()
], H.prototype, "_loadError");
G([
  M()
], H.prototype, "_hover");
G([
  M()
], H.prototype, "_openPopover");
G([
  M()
], H.prototype, "_focusedEntityIdOverride");
customElements.get(Pi) || customElements.define(Pi, H);
const bn = (t) => {
  const e = (a) => String(a).padStart(2, "0"), i = t.getFullYear(), r = e(t.getMonth() + 1), n = e(t.getDate()), o = e(t.getHours()), s = e(t.getMinutes());
  return `${i}-${r}-${n}T${o}:${s}`;
}, $t = (t) => {
  if (!t) return null;
  const e = new Date(t).getTime();
  return Number.isFinite(e) ? e : null;
}, kt = (t) => String(t).padStart(2, "0"), El = (t) => {
  const e = new Date(t), i = `${kt(e.getDate())}.${kt(e.getMonth() + 1)}.${e.getFullYear()}`, r = `${kt(e.getHours())}:${kt(e.getMinutes())}`;
  return `${i} ${r}`;
}, Cl = (t, e) => {
  if (!Number.isFinite(t)) return "—";
  const i = Math.abs(t), r = i >= 100 ? 0 : i >= 10 ? 1 : 2, n = t.toFixed(r);
  return e ? `${n} ${e}` : n;
};
var $l = Object.defineProperty, $e = (t, e, i, r) => {
  for (var n = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = s(e, i, n) || n);
  return n && $l(e, i, n), n;
};
const Ci = (t) => {
  if (typeof t != "string") return;
  const e = t.trim();
  return e.length > 0 ? e : void 0;
}, Ri = "power-pilz-energy-node-zoom-overlay", vn = 280, kl = 200, $i = 1440 * 60 * 1e3, wn = 1.8, Tl = (t) => {
  const e = document.createElement(Ri);
  e.hass = t.hass, e.energyConfig = t.config, e.focusedNodeKey = t.focusedNodeKey, e.originRect = t.originRect, e.cardRect = t.cardRect, document.body.appendChild(e);
}, Cr = class Cr extends D {
  constructor() {
    super(...arguments), this.focusedNodeKey = "", this._phase = "opening", this._historyByEntity = /* @__PURE__ */ new Map(), this._series = [], this._fetchAbort = 0, this._colorCache = {}, this._lastCanvasPoints = [], this._lastCanvasSize = { width: 0, height: 0 }, this._onKeyDown = (e) => {
      e.key === "Escape" && this._close();
    }, this._onBackdropClick = (e) => {
      e.target === e.currentTarget && this._close();
    }, this._onPointerMove = (e) => {
      const i = this.renderRoot.querySelector(".pp-zoom-area");
      if (!i || this._lastCanvasPoints.length < 2) return;
      const r = i.getBoundingClientRect(), n = e.clientX - r.left, o = e.clientY - r.top;
      if (n < 0 || n > r.width || o < 0 || o > r.height) {
        this._hover && (this._hover = void 0);
        return;
      }
      const s = n / r.width * this._lastCanvasSize.width, a = this._nearestPoint(s);
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
    super.connectedCallback(), this._series = Mo(this.hass, this.energyConfig);
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
    this._phase !== "closing" && (this._phase = "closing", setTimeout(() => this.remove(), kl));
  }
  // ------------------------------------------------------------
  // Data
  // ------------------------------------------------------------
  async _fetchHistory() {
    const e = ++this._fetchAbort;
    if (!this._focused) return;
    const i = Ao([this._focused]);
    if (i.length === 0) return;
    const r = "hybrid", n = Date.now() - $i;
    try {
      const o = await Se(
        this.hass,
        i,
        $i,
        { startMs: n, dataSource: r }
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
    const r = Xe(e), n = Xe(i);
    if (!r || !n) return;
    const o = Oo(this._focused, this._historyByEntity);
    if (o.length < 2) {
      this._lastCanvasPoints = [], this._lastCanvasSize = { width: r.width, height: r.height };
      return;
    }
    const s = Date.now(), a = s - $i, l = o.filter((b) => b.ts >= a && b.ts <= s), c = l.length >= 2 ? l : o;
    let h = 1 / 0, d = -1 / 0;
    for (const b of c)
      Number.isFinite(b.value) && (b.value < h && (h = b.value), b.value > d && (d = b.value));
    if (!Number.isFinite(h) || !Number.isFinite(d)) {
      this._lastCanvasPoints = [];
      return;
    }
    if (h === d) {
      const b = Math.abs(h) * 0.1 || 1;
      h -= b, d += b;
    }
    const u = (d - h) * 0.06, p = h - u, w = d + u - p, f = s - a, y = c.filter((b) => Number.isFinite(b.ts) && Number.isFinite(b.value)).map((b) => {
      const g = Math.max(0, Math.min(1, (b.ts - a) / f)), x = Math.max(0, Math.min(1, (b.value - p) / w));
      return {
        x: g * r.width,
        y: (1 - x) * r.height,
        ts: b.ts,
        value: b.value
      };
    });
    if (y.length < 2) {
      this._lastCanvasPoints = [];
      return;
    }
    const v = this.renderRoot, E = fe(v, this._focused.color), C = this._thresholdConfig();
    if (C.threshold === null)
      zi(r.ctx, y, E, r.height, 0.24, 0, this._colorCache), Ft(n.ctx, y, E, wn);
    else {
      const b = y.map((T) => ({
        x: T.x,
        y: T.y,
        value: T.value
      })), g = fe(v, C.color), x = Xa(b, C.threshold), $ = Za(x);
      for (const T of $)
        zi(
          r.ctx,
          T.points,
          T.low ? g : E,
          r.height,
          0.24,
          0,
          this._colorCache
        );
      Ja(n.ctx, x, E, g, wn);
    }
    this._lastCanvasPoints = y, this._lastCanvasSize = { width: r.width, height: r.height };
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
    var n;
    const e = this.energyConfig, i = this.focusedNodeKey, r = -1e-6;
    if (i === "grid" && e.grid_export_highlight === !0)
      return {
        threshold: r,
        color: le(
          e.grid_export_trend_color ?? "red",
          "red"
        )
      };
    if (i === "grid_secondary" && e.grid_secondary_export_highlight === !0)
      return {
        threshold: r,
        color: le(
          e.grid_secondary_export_trend_color ?? "red",
          "red"
        )
      };
    if ((i === "battery" || i === "battery_secondary") && ((n = this._focused) != null && n.isPercentage) && e[`${i}_low_alert`] === !0) {
      const o = e[`${i}_low_threshold`];
      return {
        threshold: typeof o == "number" && Number.isFinite(o) ? Math.max(0, Math.min(100, o)) : 20,
        color: le(
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
    let r = 0, n = i.length - 1;
    for (; n - r > 1; ) {
      const a = r + n >> 1;
      i[a].x <= e ? r = a : n = a;
    }
    const o = i[r], s = i[n];
    return o ? s ? Math.abs(o.x - e) <= Math.abs(s.x - e) ? o : s : o : s;
  }
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  render() {
    if (!this._focused)
      return S`<div class="pp-zoom-catcher" @click=${this._onBackdropClick}></div>`;
    const e = this._effectiveContainerRect(), i = 6, r = 2, n = this.originRect.left + this.originRect.width / 2, o = this.originRect.top + this.originRect.height / 2, s = Math.max(this.originRect.width, e.width - i * 2), a = Math.max(this.originRect.height, e.height - i * 2), l = Math.min(s, this.originRect.width * r), c = Math.min(a, this.originRect.height * r);
    let h = n - l / 2, d = o - c / 2;
    h = Math.max(e.left + i, Math.min(e.left + e.width - l - i, h)), d = Math.max(e.top + i, Math.min(e.top + e.height - c - i, d));
    const u = this._phase !== "open", p = this._phase === "closing", _ = u || p, w = this.originRect.width / l, f = this.originRect.height / c, y = this.originRect.left - h, v = this.originRect.top - d, E = {
      left: `${h}px`,
      top: `${d}px`,
      width: `${l}px`,
      height: `${c}px`,
      transform: _ ? `translate(${y}px, ${v}px) scale(${w}, ${f})` : "translate(0, 0) scale(1, 1)",
      transformOrigin: "0 0",
      opacity: p ? "0" : "1"
    }, C = this._buildView();
    return S`
      <div
        class="pp-zoom-catcher"
        @click=${this._onBackdropClick}
      >
        <div
          class="pp-zoom-shell ${this._focused.category}"
          style=${A(E)}
          @click=${(b) => b.stopPropagation()}
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
    if (!this._hover || !this._focused) return k;
    const e = this.renderRoot.querySelector(".pp-zoom-area");
    if (!e) return k;
    const { width: i, height: r } = this._lastCanvasSize;
    if (i <= 0 || r <= 0) return k;
    const n = e.offsetWidth || e.getBoundingClientRect().width, o = e.offsetHeight || e.getBoundingClientRect().height, s = this._hover.logicalX / i * n, a = this._hover.logicalY / r * o;
    return S`
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
    const i = this.energyConfig, r = this._configDecimals(i);
    return `${_t(
      this._hover.value,
      this._focused.unit,
      r,
      this._unitFormatOptions(i)
    )} · ${zl(this._hover.ts)}`;
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
    const e = this._focused, i = this.energyConfig, r = this._unitFormatOptions(i), n = this._configDecimals(i);
    return this.focusedNodeKey === "battery" || this.focusedNodeKey === "battery_secondary" ? this._buildBatteryView(this.focusedNodeKey, i, e.label) : this._buildPowerView(e, i, r, n);
  }
  _configDecimals(e) {
    const i = e.decimals;
    return typeof i == "number" && Number.isFinite(i) ? Math.min(3, Math.max(0, Math.round(i))) : 1;
  }
  _unitFormatOptions(e) {
    const i = this._configDecimals(e);
    return {
      enabled: e.auto_scale_units === !0,
      baseDecimals: de(e.decimals_base_unit, i),
      prefixedDecimals: de(e.decimals_prefixed_unit, i),
      nullWithUnit: !0
    };
  }
  /** Power/energy nodes — also handles auto-calculated home/solar by
   *  replaying the descriptor's compute spec on current entity states. */
  _buildPowerView(e, i, r, n) {
    const o = this._liveValueOf(e), s = _t(o, e.unit, n, r), a = i[`${e.nodeKey}_icon`] ?? this._fallbackIcon(e.nodeKey);
    let l = i[`${e.nodeKey}_icon_color`];
    const c = o !== null && Number.isFinite(o) && o < 0;
    return e.nodeKey === "grid" && i.grid_export_icon_highlight === !0 && c ? l = i.grid_export_icon_color ?? "red" : e.nodeKey === "grid_secondary" && i.grid_secondary_export_icon_highlight === !0 && c && (l = i.grid_secondary_export_icon_color ?? "red"), {
      iconName: a,
      iconStyle: Ee(l),
      formattedValue: s,
      label: e.label
    };
  }
  /** Battery nodes — show the SOC value, the dynamic battery icon
   *  reflecting both charge direction and SOC level, and the low-alert
   *  color override when the configured threshold is reached. */
  _buildBatteryView(e, i, r) {
    const n = e === "battery" ? "battery_percentage_entity" : "battery_secondary_percentage_entity", o = e === "battery" ? "battery_entity" : "battery_secondary_entity", s = `${e}_icon`, a = `${e}_icon_color`, l = `${e}_low_alert`, c = `${e}_low_threshold`, h = `${e}_low_alert_color`, d = Ci(i[n]), u = Ci(i[o]), p = u ? V(this.hass, u) : void 0, _ = typeof p == "string" && p.trim() === "%", w = d ? B(this.hass, d) : null, f = u ? B(this.hass, u) : null, y = w !== null ? w : _ ? f : null, v = y !== null ? `${Math.round(Math.max(0, Math.min(100, y)))}%` : "—", E = this._batteryIcon(
      y,
      _ ? null : f,
      i[s]
    ), C = i[l] === !0, b = this._normalizeBatteryThreshold(i[c]), x = C && y !== null && y <= b ? i[h] ?? "red" : i[a], $ = Ci(i[`${e}_label`]) ?? r;
    return {
      iconName: E,
      iconStyle: Ee(x),
      formattedValue: v,
      label: $
    };
  }
  /** Mirrors energy-card.batteryIcon. Different MDI variants by SOC
   *  bucket; charging gets its own icon regardless of level. */
  _batteryIcon(e, i, r) {
    if (i !== null && i > 0.01)
      return "mdi:battery-charging";
    if (e === null)
      return r ?? "mdi:battery-outline";
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
      let i = 0, r = null;
      for (const s of e.computed.dependencies) {
        const a = B(this.hass, s);
        if (a === null) return null;
        const l = e.computed.unitsByEntityId[s] ?? "", c = e.computed.signsByEntityId[s] ?? 1, h = Y(l), d = (h == null ? void 0 : h.factor) ?? 1;
        i += c * a * d, r ?? (r = (h == null ? void 0 : h.family) ?? null);
      }
      const n = Y(e.computed.outputUnit), o = n && n.family === r ? n.factor : 1;
      return o > 0 ? i / o : i;
    }
    return B(this.hass, e.entityId);
  }
  _fallbackIcon(e) {
    return e.startsWith("solar") ? "mdi:weather-sunny" : e.startsWith("grid_secondary") || e.startsWith("grid") ? "mdi:transmission-tower" : e.startsWith("home") ? "mdi:home-lightning-bolt" : e.startsWith("battery_secondary") ? "mdi:battery-outline" : e.startsWith("battery") ? "mdi:battery" : "mdi:flash";
  }
};
Cr.styles = oe`
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
       and floats like a dropdown anchored on the clicked node. */
    .pp-zoom-shell {
      position: fixed;
      box-sizing: border-box;
      border-radius: 16px;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      border: 1px solid rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.1);
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.22);
      overflow: hidden;
      transition:
        transform ${vn}ms cubic-bezier(0.2, 0.85, 0.3, 1),
        opacity ${vn}ms ease;
      will-change: transform, opacity;
    }

    /* Trend canvases fill the entire shell behind the content — same z-order
       as in the small node. */
    .pp-zoom-trend,
    .pp-zoom-line-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }
    .pp-zoom-line-layer { opacity: 0.96; }
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
let te = Cr;
$e([
  O({ attribute: !1 })
], te.prototype, "hass");
$e([
  O({ attribute: !1 })
], te.prototype, "energyConfig");
$e([
  O({ type: String })
], te.prototype, "focusedNodeKey");
$e([
  O({ attribute: !1 })
], te.prototype, "originRect");
$e([
  O({ attribute: !1 })
], te.prototype, "cardRect");
$e([
  M()
], te.prototype, "_phase");
$e([
  M()
], te.prototype, "_historyByEntity");
$e([
  M()
], te.prototype, "_hover");
customElements.get(Ri) || customElements.define(Ri, te);
const Tt = (t) => String(t).padStart(2, "0"), zl = (t) => {
  const e = new Date(t);
  return `${Tt(e.getDate())}.${Tt(e.getMonth() + 1)}. ${Tt(e.getHours())}:${Tt(e.getMinutes())}`;
}, ke = "0.5.0";
var Ml = Object.defineProperty, Al = Object.getOwnPropertyDescriptor, _r = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Al(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (r ? s(e, i, n) : s(n)) || n);
  return r && n && Ml(e, i, n), n;
};
const Ol = 4, Pl = 8, xn = 2, Rl = /* @__PURE__ */ new Set(["solar", "home", "grid", "grid_secondary"]), Il = (t, e) => {
  const i = `${t}_sub_${e}`, r = Rl.has(t);
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
              helper: qi,
              description: qi
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
                helper: t === "solar" ? Zi : Xi,
                description: t === "solar" ? Zi : Xi
              }
            ]
          }
        ]
      }
    ] : [],
    Re(i)
  ];
}, zt = (t, e, i, r) => ({
  type: "expandable",
  name: "",
  title: e,
  icon: i,
  expanded: !1,
  schema: Array.from({ length: r }, (n, o) => ({
    type: "expandable",
    name: "",
    title: `Block ${o + 1}`,
    icon: "mdi:view-grid-outline",
    expanded: !1,
    schema: Il(t, o + 1)
  }))
}), Ll = (t, e, i) => ({
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
}), se = (t, e) => ({
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
}), Nl = {
  select: {
    mode: "dropdown",
    options: [
      { label: "Auto (recommended)", value: "auto" },
      { label: "Statistics (fastest)", value: "statistics" },
      { label: "History (raw)", value: "history" }
    ]
  }
}, Dl = (t) => {
  const e = q(t, "hybrid");
  return e === "hybrid" ? "auto" : e;
}, Hl = (t) => t === "auto" || t === "history" || t === "statistics" || t === "hybrid" ? t : "auto", Ii = "When enabled, the solar main node shows the sum of enabled solar sub-node entities instead of the solar entity. Solar sub-nodes with State mode enabled are excluded from this sum.", Li = "When enabled, the home main node is calculated as solar + grid + grid 2 - battery - battery 2 using compatible unit conversion.", ot = "When enabled, negative grid values (energy exported to the grid) are highlighted in the trend with the export color.", st = "When enabled, the grid icon switches to the export icon color while the grid value is negative.", Ni = "When enabled, the main grid node is shown. When disabled, the grid node is hidden.", Di = "When enabled, the second grid node is shown. When disabled, the second grid node is hidden.", Hi = "When enabled, the main solar node is shown. When disabled, the solar node is hidden.", Bi = "Flow direction: + value animates from Solar to Center. 0 or - value shows no solar flow.", Fi = "When enabled, the main home node is shown. When disabled, the home node is hidden.", Vi = "Flow direction: + value animates from Center to Home. 0 or - value shows no home flow.", Ui = "When enabled, the main battery node is shown. When disabled, the battery node is hidden.", Wi = "Flow direction: + value animates from Center to Battery (charging). - value animates Battery to Center (discharging).", ji = "When enabled, the second battery node is shown. When disabled, the second battery node is hidden.", Ki = "Flow direction: + value animates from Center to Battery 2 (charging). - value animates Battery 2 to Center (discharging).", at = "Color used for battery low-threshold alert styling (icon and low trend section).", Mt = "Reverse the animated arrow direction (charge ↔ discharge). Use this when your inverter reports the opposite sign for charge/discharge than what PowerPilz expects.", At = "Flip the sign of the displayed kW/W value and the power trend graph. Independent from the flow toggle. Does not affect the SOC %.", Gi = "Flow direction: + value animates from Grid to Center (import). - value animates from Center to Grid (export).", Yi = "Flow direction: + value animates from Grid 2 to Center (import). - value animates from Center to Grid 2 (export).", qi = "In default mode, this sub-node renders the entity as numeric value + unit.", Xi = "When enabled, this sub-node displays the entity state text (for example AUS/WW/HZ) instead of numeric value + unit.", Zi = "When enabled, this solar sub-node displays entity state text instead of numeric value + unit and is excluded from Solar auto-calc.", Ji = "Automatically formats values with metric prefixes (for example W/kW/MW and Wh/kWh/MWh).", Qi = "Optional unit override/fallback. Used when entities have no unit and as preferred output unit for auto-calculated values.", er = "Default decimal precision for displayed values and fallback when base/prefixed decimals are not set.", tr = "Decimal precision for base units (W, Wh) when Auto unit scaling is enabled.", ir = "Decimal precision for prefixed units (kW, MW, kWh, MWh) when Auto unit scaling is enabled.", rr = "Controls where trend data is fetched from. In most setups, keep Auto (recommended), which prefers statistics and falls back to history automatically.", Sn = "When enabled, every main node and sub-block of the energy card reacts to its own tap/hold/double-tap. Long-press defaults to opening the node detail dialog.", En = "Choose what happens when you tap, long-press or double-tap this node. Long-press defaults to opening the PowerPilz node detail dialog with a history graph.", Re = (t, e = "Interactions") => ({
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
          helper: En,
          description: En
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
}), Bl = [
  Ll("Center visuals", "mdi:palette-outline", [
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
                helper: Ji,
                description: Ji
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
                helper: ir,
                description: ir
              },
              {
                name: "decimals_base_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: tr,
                description: tr
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
                helper: Qi,
                description: Qi
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
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
                selector: Nl,
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
            helper: Hi,
            description: Hi
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
                helper: Bi,
                description: Bi
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
      se("Calculation", [
        {
          name: "solar_auto_calculate",
          selector: { boolean: {} },
          helper: Ii,
          description: Ii
        }
      ]),
      se("Trend", [
        { name: "solar_trend", selector: { boolean: {} } },
        {
          name: "solar_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      Re("solar")
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
            helper: Ni,
            description: Ni
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
                helper: Gi,
                description: Gi
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
      se("Trend", [
        { name: "grid_trend", selector: { boolean: {} } },
        {
          name: "grid_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      se("Export", [
        {
          name: "grid_export_highlight",
          selector: { boolean: {} },
          helper: ot,
          description: ot
        },
        {
          name: "grid_export_trend_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        },
        {
          name: "grid_export_icon_highlight",
          selector: { boolean: {} },
          helper: st,
          description: st
        },
        {
          name: "grid_export_icon_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        }
      ]),
      Re("grid")
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
            helper: Di,
            description: Di
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
                helper: Yi,
                description: Yi
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
      se("Trend", [
        { name: "grid_secondary_trend", selector: { boolean: {} } },
        {
          name: "grid_secondary_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      se("Export", [
        {
          name: "grid_secondary_export_highlight",
          selector: { boolean: {} },
          helper: ot,
          description: ot
        },
        {
          name: "grid_secondary_export_trend_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        },
        {
          name: "grid_secondary_export_icon_highlight",
          selector: { boolean: {} },
          helper: st,
          description: st
        },
        {
          name: "grid_secondary_export_icon_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        }
      ]),
      Re("grid_secondary")
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
            helper: Fi,
            description: Fi
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
                helper: Vi,
                description: Vi
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
      se("Calculation", [
        {
          name: "home_auto_calculate",
          selector: { boolean: {} },
          helper: Li,
          description: Li
        }
      ]),
      se("Trend", [
        { name: "home_trend", selector: { boolean: {} } },
        {
          name: "home_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      Re("home")
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
            helper: Ui,
            description: Ui
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
                helper: Wi,
                description: Wi
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
      se("Trend", [
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
                helper: Mt,
                description: Mt
              },
              {
                name: "battery_invert_value_sign",
                selector: { boolean: {} },
                helper: At,
                description: At
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
                helper: at,
                description: at
              }
            ]
          }
        ]
      },
      Re("battery")
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
            helper: ji,
            description: ji
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
                helper: Ki,
                description: Ki
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
      se("Trend", [
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
                helper: Mt,
                description: Mt
              },
              {
                name: "battery_secondary_invert_value_sign",
                selector: { boolean: {} },
                helper: At,
                description: At
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
                helper: at,
                description: at
              }
            ]
          }
        ]
      },
      Re("battery_secondary")
    ]
  },
  zt("solar", "Solar sub blocks", "mdi:solar-power-variant", Ol),
  zt("grid", "Grid 1 sub blocks", "mdi:transmission-tower", xn),
  zt("grid_secondary", "Grid 2 sub blocks", "mdi:transmission-tower", xn),
  zt("home", "Home sub blocks", "mdi:flash", Pl),
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
            helper: Sn,
            description: Sn
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
], Fl = {
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
let Vt = class extends D {
  constructor() {
    super(...arguments), this.computeLabel = (t) => {
      const e = t.name ?? "", i = e.match(
        /^(solar|home|grid|grid_secondary)_sub_(\d+)_(enabled|entity|label|icon|icon_color|state_mode|tap_action|hold_action|double_tap_action)$/
      );
      if (i) {
        const [, , , r] = i;
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
        }[r] ?? r;
      }
      return Fl[e] ?? e;
    }, this.computeHelper = (t) => {
      const e = t.name ?? "";
      if (e === "solar_entity")
        return Bi;
      if (e === "grid_entity")
        return Gi;
      if (e === "grid_secondary_entity")
        return Yi;
      if (e === "home_entity")
        return Vi;
      if (e === "battery_entity")
        return Wi;
      if (e === "battery_secondary_entity")
        return Ki;
      if (/^(solar|home|grid|grid_secondary)_sub_\d+_icon_color$/.test(e))
        return qi;
      if (/^(home|grid|grid_secondary)_sub_\d+_state_mode$/.test(e))
        return Xi;
      if (/^solar_sub_\d+_state_mode$/.test(e))
        return Zi;
      if (e === "solar_visible")
        return Hi;
      if (e === "home_visible")
        return Fi;
      if (e === "battery_visible")
        return Ui;
      if (e === "battery_secondary_visible")
        return ji;
      if (e === "solar_auto_calculate")
        return Ii;
      if (e === "home_auto_calculate")
        return Li;
      if (e === "grid_visible")
        return Ni;
      if (e === "grid_secondary_visible")
        return Di;
      if (e === "grid_export_highlight" || e === "grid_secondary_export_highlight")
        return ot;
      if (e === "grid_export_icon_highlight" || e === "grid_secondary_export_icon_highlight")
        return st;
      if (e === "battery_low_alert_color" || e === "battery_secondary_low_alert_color")
        return at;
      if (e === "unit")
        return Qi;
      if (e === "decimals")
        return er;
      if (e === "decimals_base_unit")
        return tr;
      if (e === "decimals_prefixed_unit")
        return ir;
      if (e === "trend_data_source")
        return rr;
      if (e === "auto_scale_units")
        return Ji;
    }, this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM")
        return;
      const i = t.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i))
        return;
      const r = {
        ...i,
        trend_data_source: Hl(i.trend_data_source),
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
      trend_data_source: Dl(t.trend_data_source),
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
    return !this.hass || !this._config ? k : S`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ke}
      </div>
      <div style="margin: 0 0 14px; color: var(--secondary-text-color); line-height: 1.4;">
        Highly flexible energy flow card with configurable main nodes, trends, sub-nodes, auto calculations,
        export highlighting, and advanced unit handling.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Bl}
        .computeLabel=${this.computeLabel}
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
_r([
  O({ attribute: !1 })
], Vt.prototype, "hass", 2);
_r([
  M()
], Vt.prototype, "_config", 2);
Vt = _r([
  pe("power-pilz-energy-card-editor")
], Vt);
var Vl = Object.defineProperty, Ul = Object.getOwnPropertyDescriptor, ge = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Ul(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (r ? s(e, i, n) : s(n)) || n);
  return r && n && Vl(e, i, n), n;
};
const F = 0.01, tt = 1, Ke = 1440 * 60 * 1e3, Cn = 300 * 1e3, $n = 60 * 1e3, Wl = 350, kn = 4, Tn = 8, ki = 2, jl = 260, Kl = 220, zn = -1e-6, Ae = "red", Gl = "var(--rgb-primary-text-color, 33, 33, 33)", Yl = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), Mn = "powerpilz-energy-node-detail", An = "powerpilz-energy-node-zoom";
let ie = class extends D {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._showSubBlocks = !1, this._compactSubBlocks = !1, this._subNodeConnectorSegments = [], this._nodeActionHandlers = /* @__PURE__ */ new Map(), this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._isVisible = !1, this._liveRuntimeActive = !1, this._trendDrawConfig = {}, this._canvasColorContextCache = {}, this.handleCardKeyDown = (t) => {
      t.key !== "Enter" && t.key !== " " || (t.preventDefault(), this.fireAction("tap"));
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-energy-card-editor");
  }
  static async getStubConfig(t) {
    const e = (t == null ? void 0 : t.states) ?? {}, i = Object.keys(e), r = (...h) => h.find((d) => d in e), n = (h) => i.find((d) => d.startsWith(`${h}.`)), o = r("sensor.dev_home_power", "sensor.house_consumption_power") ?? n("sensor") ?? "sensor.dev_home_power", s = r("sensor.dev_solar_power", "sensor.solar_production_power") ?? n("sensor"), a = r("sensor.dev_grid_power", "sensor.grid_power") ?? n("sensor"), l = r("sensor.dev_battery_power", "sensor.home_battery_power") ?? n("sensor"), c = r("sensor.dev_battery_soc", "sensor.home_battery_soc") ?? n("sensor");
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
      decimals: tt,
      decimals_base_unit: tt,
      decimals_prefixed_unit: tt
    };
  }
  setConfig(t) {
    const e = t.home_entity ?? t.consumption_entity ?? "sensor.dev_home_power", i = typeof t.decimals == "number" && Number.isFinite(t.decimals) ? Math.min(3, Math.max(0, Math.round(t.decimals))) : tt, r = de(t.decimals_base_unit, i), n = de(t.decimals_prefixed_unit, i);
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
      grid_export_trend_color: t.grid_export_trend_color ?? Ae,
      grid_export_icon_highlight: t.grid_export_icon_highlight ?? !1,
      grid_export_icon_color: t.grid_export_icon_color ?? Ae,
      grid_secondary_export_highlight: t.grid_secondary_export_highlight ?? !1,
      grid_secondary_export_trend_color: t.grid_secondary_export_trend_color ?? Ae,
      grid_secondary_export_icon_highlight: t.grid_secondary_export_icon_highlight ?? !1,
      grid_secondary_export_icon_color: t.grid_secondary_export_icon_color ?? Ae,
      shared_trend_scale: t.shared_trend_scale ?? !1,
      debug_performance: t.debug_performance ?? !1,
      trend_data_source: q(t.trend_data_source, "hybrid"),
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: r,
      decimals_prefixed_unit: n,
      battery_low_alert: t.battery_low_alert ?? !1,
      battery_low_threshold: this.normalizeBatteryThreshold(t.battery_low_threshold),
      battery_low_alert_color: t.battery_low_alert_color ?? Ae,
      battery_secondary_low_alert: t.battery_secondary_low_alert ?? !1,
      battery_secondary_low_threshold: this.normalizeBatteryThreshold(t.battery_secondary_low_threshold),
      battery_secondary_low_alert_color: t.battery_secondary_low_alert_color ?? Ae,
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
      return S`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return S``;
    const t = this._config, e = t.decimals ?? tt, i = t.home_visible !== !1, r = t.solar_visible !== !1, n = t.grid_visible !== !1, o = n && t.grid_secondary_visible === !0, s = t.battery_visible !== !1, a = s && t.battery_secondary_visible === !0, l = this.normalizeBatteryDualAlignment(t.battery_dual_alignment), c = r ? this.collectSubBlocks("solar", t) : [], h = c.filter((L) => !L.stateMode), d = n ? this.collectSubBlocks("grid", t) : [], u = o ? this.collectSubBlocks("grid_secondary", t) : [], p = i ? this.collectSubBlocks("home", t) : [], _ = B(this.hass, t.home_entity), w = r ? B(this.hass, t.solar_entity) : null, f = n ? B(this.hass, t.grid_entity) : null, y = o ? B(this.hass, t.grid_secondary_entity) : null, v = s ? B(this.hass, t.battery_entity) : null, E = B(this.hass, t.battery_percentage_entity), C = a ? B(this.hass, t.battery_secondary_entity) : null, b = B(this.hass, t.battery_secondary_percentage_entity), g = t.unit ?? "kW", x = V(this.hass, t.solar_entity) ?? g, $ = V(this.hass, t.grid_entity) ?? g, T = V(this.hass, t.grid_secondary_entity) ?? g, z = V(this.hass, t.battery_entity), P = V(this.hass, t.battery_percentage_entity), I = V(this.hass, t.battery_secondary_entity), N = V(this.hass, t.battery_secondary_percentage_entity), j = z ?? g, Z = I ?? g, Fe = this.resolveBatteryPercentage(
      E,
      v,
      z
    ), Ve = this.resolveBatteryPercentage(
      b,
      C,
      I
    ), Jt = !!this.readConfigString(t.battery_percentage_entity) || this.isPercentageUnit(z), Qt = !!this.readConfigString(t.battery_secondary_percentage_entity) || this.isPercentageUnit(I), Je = t.solar_auto_calculate === !0 ? this.resolveAutoSolarUnit(t, h, g) : x, Qe = t.solar_auto_calculate === !0 ? this.computeAutoSolarValueFromSubBlocks(h, Je) : w, ei = t.home_auto_calculate === !0 ? this.resolveAutoHomeUnit(t, g, Je) : V(this.hass, t.home_entity) ?? g, bt = t.home_auto_calculate === !0 ? this.computeAutoHomeValueFromNodeValues(
      {
        solar: Qe,
        grid: f,
        grid_secondary: y,
        battery: v,
        battery_secondary: C
      },
      {
        solar: Je,
        grid: $,
        grid_secondary: T,
        battery: j,
        battery_secondary: Z
      },
      ei
    ) : _, ts = Jt ? P ?? "%" : j, is = Qt ? N ?? "%" : Z, rs = this.toUnidirectionalFlow(Qe), ns = this.toUnidirectionalFlow(bt), os = this.toBidirectionalFlow(f), ss = this.toBidirectionalFlow(y), as = this.sumComparableValues([
      { value: f, unit: $ },
      { value: y, unit: T }
    ]), ls = f === null && y === null ? "none" : this.toBidirectionalFlow(as), cs = t.battery_invert_flow === !0, ds = t.battery_secondary_invert_flow === !0, Ar = cs && v !== null ? -v : v, Or = ds && C !== null ? -C : C, hs = this.toBidirectionalFlow(Ar), us = this.toBidirectionalFlow(Or), ps = this.sumComparableValues([
      { value: Ar, unit: j },
      { value: Or, unit: Z }
    ]), _s = v === null && C === null ? "none" : this.toBidirectionalFlow(ps), ms = t.battery_invert_value_sign === !0, fs = t.battery_secondary_invert_value_sign === !0, Pr = ms && v !== null ? -v : v, Rr = fs && C !== null ? -C : C, ys = this.hasConfiguredAction(t), ti = !this.isEditorPreview() && ys, gs = this.iconColorStyle(t.solar_icon_color), bs = this.iconColorStyle(t.home_icon_color), vs = this.iconShapeStyle(t.core_icon_color), ii = new Set(p.map((L) => L.index)), Ue = new Set(c.map((L) => L.index)), ws = ii.has(7) && ii.has(8), xs = [5, 6, 7, 8].some((L) => ii.has(L)), Ss = Ue.has(1) && Ue.has(2) && !Ue.has(3) && !Ue.has(4), Es = Ue.has(3) && Ue.has(4), Ir = o && (Ss && ws || Es && xs), Cs = o && !Ir, ri = p.some((L) => L.index >= 7), Lr = this.homeSubPositions(ri), Nr = this.gridSubPositions(o), Dr = this.gridSecondarySubPositions(), Hr = this.solarSubPositions(
      ri,
      Cs,
      Ir
    ), Br = p.filter((L) => L.index <= (ri ? 8 : 6)), ni = n ? { col: 1, row: o ? 2 : 3, colSpan: 2, rowSpan: 2 } : null, oi = o ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 } : null, si = s ? {
      col: a && l === "center" ? 2 : 3,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, ai = a ? {
      col: l === "left" ? 1 : l === "right" ? 5 : 4,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, K = this.computeGridBounds(
      i,
      r,
      n,
      o,
      s,
      a,
      ni,
      oi,
      si,
      ai,
      c,
      d,
      u,
      Br,
      Hr,
      Nr,
      Dr,
      Lr
    ), li = r ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, K) : null, vt = ni ? this.normalizePlacement(ni, K) : null, wt = oi ? this.normalizePlacement(oi, K) : null, ci = i ? this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, K) : null, xt = si ? this.normalizePlacement(si, K) : null, St = ai ? this.normalizePlacement(ai, K) : null, Fr = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, K), $s = this.normalizePositions(Hr, K), ks = this.normalizePositions(Nr, K), Ts = this.normalizePositions(Dr, K), zs = this.normalizePositions(Lr, K), Vr = this.normalizeBatteryThreshold(t.battery_low_threshold), Ur = !!t.battery_low_alert, Wr = this.normalizeBatteryThreshold(t.battery_secondary_low_threshold), jr = !!t.battery_secondary_low_alert, Et = this.resolveColor(Ae), di = this.resolveColor(t.battery_low_alert_color, Et), hi = this.resolveColor(
      t.battery_secondary_low_alert_color,
      Et
    ), ui = Ur && Fe !== null && Fe <= Vr, Ms = this.iconColorStyle(
      ui ? di : t.battery_icon_color
    ), As = this.batteryIcon(
      Fe,
      this.isPercentageUnit(z) ? null : v,
      t.battery_icon
    ), pi = jr && Ve !== null && Ve <= Wr, Os = this.iconColorStyle(
      pi ? hi : t.battery_secondary_icon_color
    ), Ps = this.batteryIcon(
      Ve,
      this.isPercentageUnit(I) ? null : C,
      t.battery_secondary_icon
    ), Rs = f !== null && Number.isFinite(f) && f < 0, Is = y !== null && Number.isFinite(y) && y < 0, Ls = this.iconColorStyle(
      t.grid_export_icon_highlight === !0 && Rs ? t.grid_export_icon_color : t.grid_icon_color
    ), Ns = this.iconColorStyle(
      t.grid_secondary_export_icon_highlight === !0 && Is ? t.grid_secondary_export_icon_color : t.grid_secondary_icon_color
    ), Ds = { "--flow-color-rgb": this.toRgbCss(t.flow_color) ?? Gl }, We = this.resolveColor("purple"), Hs = this.resolveColor(t.solar_trend_color, We), Bs = this.resolveColor(t.grid_trend_color, We), Fs = this.resolveColor(t.grid_secondary_trend_color, We), Vs = this.resolveColor(t.grid_export_trend_color, Et), Us = this.resolveColor(
      t.grid_secondary_export_trend_color,
      Et
    ), Ws = this.resolveColor(t.home_trend_color, We), js = this.resolveColor(t.battery_trend_color, We), Ks = this.resolveColor(t.battery_secondary_trend_color, We), Gs = t.grid_export_highlight === !0 ? zn : null, Ys = t.grid_secondary_export_highlight === !0 ? zn : null, qs = Ur && Jt ? Vr : null, Xs = Jt ? Fe : Pr, Zs = jr && Qt ? Wr : null, Js = Qt ? Ve : Rr, Qs = this.buildFlowSegments(
      ci,
      Fr,
      li,
      [
        ...vt ? [{ placement: vt, direction: os }] : [],
        ...wt ? [{ placement: wt, direction: ss }] : []
      ],
      ls,
      [
        ...xt ? [{ placement: xt, direction: hs }] : [],
        ...St ? [{ placement: St, direction: us }] : []
      ],
      _s,
      rs,
      ns,
      K
    );
    return S`
      <ha-card
        class=${ti ? "interactive" : ""}
        tabindex=${ti ? 0 : -1}
        role=${ti ? "button" : "article"}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div
            class="energy-grid"
            style=${A({
      ...Ds,
      "--grid-columns": `${K.cols}`,
      "--grid-rows": `${K.rows}`,
      "--grid-aspect": `${K.cols} / ${K.rows}`
    })}
          >
            ${Qs.map(
      (L) => this.renderFlowLine(L.orientation, L.direction, {
        ...L.orientation === "horizontal" ? {
          left: `${L.left}%`,
          top: `calc(${L.top}% - (var(--flow-line-size) / 2))`,
          width: `${L.width}%`
        } : {
          left: `calc(${L.left}% - (var(--flow-line-size) / 2))`,
          top: `${L.top}%`,
          height: `${L.height}%`
        }
      })
    )}
            ${this.renderSubNodeConnectors()}

            ${r && li ? S`
                  <div
                    class="energy-value solar ${Qe === null ? "missing" : ""}"
                    data-pp-node-key="solar"
                    style=${A(this.gridPlacementStyle(li))}
                  >
                    ${this.renderTrend("solar", Qe, Je, !!t.solar_trend, Hs, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.solar_icon ?? "mdi:weather-sunny"}
                        style=${A(gs)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(Qe, Je, e)}</div>
                      <div class="energy-label">${t.solar_label}</div>
                    </div>
                  </div>
                ` : k}

            ${n && vt ? S`
                  <div
                    class="energy-value grid ${f === null ? "missing" : ""}"
                    data-pp-node-key="grid"
                    style=${A(this.gridPlacementStyle(vt))}
                  >
                    ${this.renderTrend(
      "grid",
      f,
      $,
      !!t.grid_trend,
      Bs,
      Gs,
      Vs
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.grid_icon ?? "mdi:transmission-tower"}
                        style=${A(Ls)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(f, $, e)}</div>
                      <div class="energy-label">${t.grid_label}</div>
                    </div>
                  </div>
                ` : k}

            ${o && wt ? S`
                  <div
                    class="energy-value grid-secondary ${y === null ? "missing" : ""}"
                    data-pp-node-key="grid_secondary"
                    style=${A(this.gridPlacementStyle(wt))}
                  >
                    ${this.renderTrend(
      "grid_secondary",
      y,
      T,
      !!t.grid_secondary_trend,
      Fs,
      Ys,
      Us
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${A(Ns)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(y, T, e)}</div>
                      <div class="energy-label">${t.grid_secondary_label}</div>
                    </div>
                  </div>
                ` : k}

            ${i && ci ? S`
                  <div
                    class="energy-value home ${bt === null ? "missing" : ""}"
                    data-pp-node-key="home"
                    style=${A(this.gridPlacementStyle(ci))}
                  >
                    ${this.renderTrend("home", bt, ei, !!t.home_trend, Ws, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${t.home_icon ?? "mdi:home-lightning-bolt"}
                        style=${A(bs)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(bt, ei, e)}</div>
                      <div class="energy-label">${t.home_label}</div>
                    </div>
                  </div>
                ` : k}

            ${this._showSubBlocks ? this.renderSubNodes("solar", c, $s, e) : k}
            ${this._showSubBlocks ? this.renderSubNodes("grid", d, ks, e) : k}
            ${this._showSubBlocks ? this.renderSubNodes("grid_secondary", u, Ts, e) : k}
            ${this._showSubBlocks ? this.renderSubNodes("home", Br, zs, e) : k}

            ${s && xt ? S`
                  <div
                    class="energy-value battery ${v === null ? "missing" : ""}"
                    data-pp-node-key="battery"
                    style=${A(this.gridPlacementStyle(xt))}
                  >
                    ${this.renderTrend(
      "battery",
      Xs,
      ts,
      !!t.battery_trend,
      js,
      qs,
      di
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon class="energy-icon" .icon=${As} style=${A(Ms)}></ha-icon>
                        ${Fe !== null ? S`
                              <div
                                class="battery-percentage ${ui ? "alert" : ""}"
                                style=${A(ui ? { color: di } : {})}
                              >
                                ${this.formatBatteryPercentage(Fe)}
                              </div>
                            ` : k}
                      </div>
                      <div class="energy-number">${this.formatValue(Pr, j, e)}</div>
                      <div class="energy-label">${t.battery_label}</div>
                    </div>
                  </div>
                ` : k}

            ${a && St ? S`
                  <div
                    class="energy-value battery-secondary ${C === null ? "missing" : ""}"
                    data-pp-node-key="battery_secondary"
                    style=${A(this.gridPlacementStyle(St))}
                  >
                    ${this.renderTrend(
      "battery_secondary",
      Js,
      is,
      !!t.battery_secondary_trend,
      Ks,
      Zs,
      hi
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${Ps}
                          style=${A(Os)}
                        ></ha-icon>
                        ${Ve !== null ? S`
                              <div
                                class="battery-percentage ${pi ? "alert" : ""}"
                                style=${A(pi ? { color: hi } : {})}
                              >
                                ${this.formatBatteryPercentage(Ve)}
                              </div>
                            ` : k}
                      </div>
                      <div class="energy-number">${this.formatValue(Rr, Z, e)}</div>
                      <div class="energy-label">${t.battery_secondary_label}</div>
                    </div>
                  </div>
                ` : k}

            <div class="home-core" style=${A(this.gridPlacementStyle(Fr))}>
              <div class="home-core-icon" style=${A(vs)}>
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
    return S`<div class=${r} style=${A(i)} aria-hidden="true"></div>`;
  }
  renderSubNodeConnectors() {
    return !this._showSubBlocks || this._subNodeConnectorSegments.length === 0 ? k : S`
      <div class="subnode-connectors" aria-hidden="true">
        ${this._subNodeConnectorSegments.map(
      (t) => S`
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
    const i = [], r = t === "solar" ? "mdi:solar-power-variant" : t === "home" ? "mdi:flash" : "mdi:transmission-tower", n = t === "solar" ? "Solar" : t === "home" ? "Home" : t === "grid" ? "Grid" : "Grid 2", o = t === "solar" ? kn : t === "home" ? Tn : ki;
    for (let d = 1; d <= o; d += 1) {
      const u = e[`${t}_sub_${d}_enabled`] === !0, p = this.readConfigString(e[`${t}_sub_${d}_entity`]);
      if (!u || !p)
        continue;
      const _ = e[`${t}_sub_${d}_state_mode`] === !0;
      i.push({
        key: `${t}_${d}`,
        index: d,
        icon: this.readConfigString(e[`${t}_sub_${d}_icon`]) ?? r,
        iconStyle: this.iconColorStyle(e[`${t}_sub_${d}_icon_color`]),
        label: this.readConfigString(e[`${t}_sub_${d}_label`]) ?? `${n} ${d}`,
        value: B(this.hass, p),
        unit: V(this.hass, p) ?? e.unit ?? "kW",
        stateMode: _,
        stateText: _ ? Nt(this.hass, p) : void 0
      });
    }
    if (i.length > 0)
      return i;
    if (t !== "solar" && t !== "home")
      return [];
    const s = t === "solar" ? !!e.solar_sub_enabled : !!e.home_sub_enabled, a = t === "solar" ? e.solar_sub_entity : e.home_sub_entity;
    if (!s || !a)
      return [];
    const l = t === "solar" ? e.solar_sub_icon ?? r : e.home_sub_icon ?? r, c = t === "solar" ? e.solar_sub_icon_color : e.home_sub_icon_color, h = t === "solar" ? e.solar_sub_label ?? "Solar Sub" : e.home_sub_label ?? "Home Load";
    return [
      {
        key: `${t}_legacy`,
        index: 1,
        icon: l,
        iconStyle: this.iconColorStyle(c),
        label: h,
        value: B(this.hass, a),
        unit: V(this.hass, a) ?? e.unit ?? "kW",
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
    return Object.entries(t).forEach(([r, n]) => {
      i[Number(r)] = {
        row: n.row - e.minRow + 1,
        col: n.col - e.minCol + 1
      };
    }), i;
  }
  computeGridBounds(t, e, i, r, n, o, s, a, l, c, h, d, u, p, _, w, f, y) {
    const v = [{ col: 3, row: 3, colSpan: 2, rowSpan: 2 }];
    t && v.push({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }), e && v.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }), i && s && v.push(s), r && a && v.push(a), n && l && v.push(l), o && c && v.push(c), h.forEach((x) => {
      const $ = _[x.index];
      $ && v.push({ col: $.col, row: $.row, colSpan: 1, rowSpan: 1 });
    }), d.forEach((x) => {
      const $ = w[x.index];
      $ && v.push({ col: $.col, row: $.row, colSpan: 1, rowSpan: 1 });
    }), u.forEach((x) => {
      const $ = f[x.index];
      $ && v.push({ col: $.col, row: $.row, colSpan: 1, rowSpan: 1 });
    }), p.forEach((x) => {
      const $ = y[x.index];
      $ && v.push({ col: $.col, row: $.row, colSpan: 1, rowSpan: 1 });
    });
    const E = Math.min(...v.map((x) => x.col)), C = Math.max(...v.map((x) => x.col + (x.colSpan ?? 1) - 1)), b = Math.min(...v.map((x) => x.row)), g = Math.max(...v.map((x) => x.row + (x.rowSpan ?? 1) - 1));
    return {
      minCol: E,
      maxCol: C,
      minRow: b,
      maxRow: g,
      cols: C - E + 1,
      rows: g - b + 1
    };
  }
  placementCenter(t, e) {
    const i = t.colSpan ?? 1, r = t.rowSpan ?? 1;
    return {
      x: (t.col - 1 + i / 2) / e.cols * 100,
      y: (t.row - 1 + r / 2) / e.rows * 100
    };
  }
  buildFlowSegments(t, e, i, r, n, o, s, a, l, c) {
    const h = this.placementCenter(e, c), d = [], u = (_, w, f, y) => {
      const v = Math.min(_, w), E = Math.abs(w - _);
      E <= F || d.push({
        orientation: "horizontal",
        direction: y,
        left: v,
        top: f,
        width: E,
        height: 0
      });
    }, p = (_, w, f, y) => {
      const v = Math.min(_, w), E = Math.abs(w - _);
      E <= F || d.push({
        orientation: "vertical",
        direction: y,
        left: f,
        top: v,
        width: 0,
        height: E
      });
    };
    if (t) {
      const _ = this.placementCenter(t, c);
      u(h.x, _.x, h.y, l);
    }
    if (i) {
      const _ = this.placementCenter(i, c);
      p(_.y, h.y, h.x, a);
    }
    if (r.length === 1) {
      const [{ placement: _, direction: w }] = r, f = this.placementCenter(_, c);
      u(f.x, h.x, h.y, w);
    } else if (r.length >= 2) {
      const _ = r.map((y) => ({
        direction: y.direction,
        center: this.placementCenter(y.placement, c)
      })).sort((y, v) => y.center.y - v.center.y), w = Math.min(..._.map((y) => y.center.x)), f = h.x - (h.x - w) * 0.5;
      u(h.x, f, h.y, n), _.forEach((y) => {
        const v = y.center.y > h.y + F ? this.reverseFlowDirection(y.direction) : y.direction;
        p(h.y, y.center.y, f, v), u(y.center.x, f, y.center.y, y.direction);
      });
    }
    if (o.length === 1) {
      const [{ placement: _, direction: w }] = o, f = this.placementCenter(_, c);
      p(h.y, f.y, h.x, w);
    } else if (o.length >= 2) {
      const _ = o.map((y) => ({
        placement: y.placement,
        direction: y.direction,
        center: this.placementCenter(y.placement, c)
      })).sort((y, v) => y.center.y - v.center.y), w = Math.min(
        ..._.map((y) => (y.placement.row - 1) / c.rows * 100)
      ), f = Math.max(h.y + F, w);
      p(h.y, f, h.x, s), _.forEach((y) => {
        const v = y.center.x < h.x - F ? this.reverseFlowDirection(y.direction) : y.direction;
        u(h.x, y.center.x, f, v), p(f, y.center.y, y.center.x, y.direction);
      });
    }
    return d;
  }
  renderSubNodes(t, e, i, r) {
    return e.length === 0 ? k : S`
      ${e.map((n) => {
      var p;
      const o = i[n.index];
      if (!o)
        return k;
      const s = {
        "grid-column": `${o.col}`,
        "grid-row": `${o.row}`
      }, a = ((p = n.stateText) == null ? void 0 : p.trim()) ?? "", l = n.stateMode, c = a.length === 0, h = l ? c ? "--" : a : this.formatValue(n.value, n.unit, r), d = l ? { value: h, unit: "" } : this.splitFormattedValueAndUnit(h, n.unit), u = l ? c : n.value === null;
      return S`
            <div
              class="energy-sub-value ${t}-sub sub-col-${o.col} ${this._compactSubBlocks ? "compact" : ""} ${u ? "missing" : ""}"
              data-key=${n.key}
              data-pp-node-key="${t}_sub_${n.index}"
              style=${A(s)}
            >
              <div class="energy-sub-content">
                <ha-icon class="energy-sub-icon" .icon=${n.icon} style=${A(n.iconStyle)}></ha-icon>
                <div class="energy-sub-number">${this._compactSubBlocks ? d.value : h}</div>
                ${l ? k : S`<div class="energy-sub-unit">${d.unit}</div>`}
                <div class="energy-sub-label">${n.label}</div>
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
    const n = e.map((s) => s.unit).find((s) => typeof s == "string" && s.trim().length > 0);
    if (n)
      return n;
    const o = V(this.hass, t.solar_entity);
    return o && o.trim().length > 0 ? o : i;
  }
  computeAutoSolarValueFromSubBlocks(t, e) {
    const i = t.filter(
      (l) => l.value !== null && Number.isFinite(l.value)
    );
    if (i.length === 0)
      return null;
    const r = i.reduce((l, c) => l + c.value, 0);
    let n = null, o = 0;
    for (const l of i) {
      const c = Y(l.unit);
      if (!c)
        return r <= F ? 0 : r;
      if (n === null)
        n = c.family;
      else if (n !== c.family)
        return r <= F ? 0 : r;
      o += l.value * c.factor;
    }
    let s = o;
    const a = Y(e);
    return a && n !== null && a.family === n && a.factor > 0 && (s /= a.factor), Number.isFinite(s) ? s <= F ? 0 : s : null;
  }
  homeComputationDependencies(t) {
    const e = [], i = (r, n) => {
      n && e.push({ role: r, entityId: n });
    };
    return t.solar_visible !== !1 && i("solar", this.readConfigString(t.solar_entity)), t.grid_visible !== !1 && (i("grid", this.readConfigString(t.grid_entity)), t.grid_secondary_visible === !0 && i("grid_secondary", this.readConfigString(t.grid_secondary_entity))), t.battery_visible !== !1 && (i("battery", this.readConfigString(t.battery_entity)), t.battery_secondary_visible === !0 && i("battery_secondary", this.readConfigString(t.battery_secondary_entity))), e;
  }
  resolveAutoHomeUnit(t, e, i) {
    const r = t.unit;
    if (r && r.trim().length > 0)
      return r;
    if (t.solar_auto_calculate === !0 && t.solar_visible !== !1 && i && i.trim().length > 0)
      return i;
    const n = this.homeComputationDependencies(t);
    for (const o of n) {
      const s = V(this.hass, o.entityId);
      if (s && s.trim().length > 0)
        return s;
    }
    return e;
  }
  computeAutoHomeValueFromNodeValues(t, e, i) {
    if (!Object.values(t).some((h) => h != null && Number.isFinite(h)))
      return null;
    const n = {};
    let o = 0;
    e && Object.keys(t).forEach((h) => {
      const d = t[h], u = e[h];
      d != null && Number.isFinite(d) && (o += 1, u && (n[h] = u));
    });
    const s = Object.keys(n).length === o ? Wa(n) : { comparable: !1, family: null, factors: {} }, a = s.comparable ? s.factors : void 0, l = (h) => {
      const d = t[h];
      if (d == null || !Number.isFinite(d))
        return 0;
      const u = (a == null ? void 0 : a[h]) ?? 1;
      return d * u;
    };
    let c = l("solar") + l("grid") + l("grid_secondary") - l("battery") - l("battery_secondary");
    if (a && i) {
      const h = Y(i);
      h && s.family !== null && h.family === s.family && h.factor > 0 && (c /= h.factor);
    }
    return Number.isFinite(c) ? c <= F ? 0 : c : null;
  }
  sumComparableValues(t) {
    const e = t.filter(
      (n) => n.value !== null && Number.isFinite(n.value)
    );
    if (e.length === 0)
      return null;
    let i = null, r = 0;
    for (const n of e) {
      const o = Y(n.unit);
      if (!o)
        return e.reduce((s, a) => s + a.value, 0);
      if (i === null)
        i = o.family;
      else if (i !== o.family)
        return e.reduce((s, a) => s + a.value, 0);
      r += n.value * o.factor;
    }
    return r;
  }
  renderTrend(t, e, i, r, n, o, s) {
    return r ? (this._trendDrawConfig[t] = {
      currentValue: e,
      unit: i,
      color: n,
      threshold: o,
      thresholdColor: s
    }, S`
      <div class="node-trend" aria-hidden="true">
        <canvas class="node-trend-canvas-area" data-node=${t}></canvas>
      </div>
      <div class="node-trend-line" aria-hidden="true">
        <canvas class="node-trend-canvas-line" data-node=${t}></canvas>
      </div>
    `) : (delete this._trendDrawConfig[t], k);
  }
  trendPoints(t, e) {
    const i = Date.now(), r = i - Ke, n = this._trendSeries[t] ?? [];
    let o = 0;
    for (; o < n.length && n[o].ts < r; )
      o += 1;
    const s = o > 0 ? n.slice(o) : [...n];
    return e !== null && Number.isFinite(e) && s.push({ ts: i, value: e }), s;
  }
  buildThresholdTrendSegments(t, e) {
    const i = [];
    for (let r = 1; r < t.length; r += 1) {
      const n = t[r - 1], o = t[r], s = n.value <= e, a = o.value <= e;
      if (s === a || Math.abs(o.value - n.value) <= F) {
        i.push({
          start: n,
          end: o,
          low: s
        });
        continue;
      }
      const l = (e - n.value) / (o.value - n.value), c = Math.max(0, Math.min(1, l)), h = {
        x: n.x + (o.x - n.x) * c,
        y: n.y + (o.y - n.y) * c,
        value: e,
        ts: n.ts + (o.ts - n.ts) * c
      };
      i.push({
        start: n,
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
    var y, v;
    const r = Date.now() - Ke, n = 0, o = 100, s = t.map((E) => E.value), a = (e == null ? void 0 : e.min) ?? Math.min(...s), l = (e == null ? void 0 : e.max) ?? Math.max(...s);
    if (!Number.isFinite(a) || !Number.isFinite(l))
      return [];
    const c = 20, h = 80, d = Math.max(l - a, F), u = t.map((E) => {
      const C = Math.max(0, Math.min(100, (E.ts - r) / Ke * 100)), b = n + C / 100 * (o - n), g = d <= F ? 0.5 : (E.value - a) / d, x = h - g * (h - c);
      return { x: b, y: x, value: E.value, ts: E.ts };
    }), p = ((y = u[0]) == null ? void 0 : y.x) ?? n, _ = ((v = u[u.length - 1]) == null ? void 0 : v.x) ?? o, w = Math.max(0, _ - p), f = 18;
    if (u.length >= 2 && w < f) {
      const E = o - f, C = Math.max(n, Math.min(E, _ - f));
      if (w <= F) {
        const g = f / (u.length - 1);
        return u.map((x, $) => ({
          ...x,
          x: Math.max(n, Math.min(o, C + g * $))
        }));
      }
      const b = f / w;
      return u.map((g) => ({
        ...g,
        x: Math.max(n, Math.min(o, C + (g.x - p) * b))
      }));
    }
    return u;
  }
  toCanvasPoints(t, e, i) {
    return ur(t, e, i);
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
    const r = Math.min(...i), n = Math.max(...i);
    return !Number.isFinite(r) || !Number.isFinite(n) ? null : { min: r, max: n };
  }
  resolveSharedTrendUnitFactors(t) {
    const e = Object.keys(t).filter(
      (n) => this.isSharedScaleParticipant(n)
    );
    if (e.length === 0)
      return null;
    let i = null;
    const r = {};
    for (const n of e) {
      const o = this._trendDrawConfig[n];
      if (!o)
        return null;
      const s = Y(o.unit);
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
    const e = t.getBoundingClientRect(), i = e.width <= jl || e.height <= Kl;
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
    const t = this.renderRoot.querySelector(".energy-grid"), e = this.renderRoot.querySelector(".energy-value.home"), i = this.renderRoot.querySelector(".energy-value.solar"), r = this.renderRoot.querySelector(".energy-value.grid"), n = this.renderRoot.querySelector(".energy-value.grid-secondary");
    if (!t) {
      this._subNodeConnectorSegments.length > 0 && (this._subNodeConnectorSegments = []);
      return;
    }
    const o = t.getBoundingClientRect(), s = e == null ? void 0 : e.getBoundingClientRect(), a = i == null ? void 0 : i.getBoundingClientRect(), l = r == null ? void 0 : r.getBoundingClientRect(), c = n == null ? void 0 : n.getBoundingClientRect(), h = s ? s.left + s.width / 2 : 0, d = a ? a.top + a.height / 2 : 0, u = l ? l.left + l.width / 2 : 0, p = c ? c.left + c.width / 2 : 0, _ = (b) => b - o.left, w = (b) => b - o.top, f = (b) => Math.round(b * 10) / 10, y = [], v = (b, g, x, $) => {
      const T = Math.min(b, g), z = Math.abs(g - b);
      z <= 0.5 || y.push({
        node: $,
        left: f(T),
        top: f(x - 1),
        width: f(z),
        height: 2
      });
    }, E = (b, g, x, $) => {
      const T = Math.min(b, g), z = Math.abs(g - b);
      z <= 0.5 || y.push({
        node: $,
        left: f(x - 1),
        top: f(T),
        width: 2,
        height: f(z)
      });
    };
    s && this.renderRoot.querySelectorAll(".energy-sub-value.home-sub").forEach((b) => {
      const g = b.getBoundingClientRect(), x = g.top + g.height / 2, $ = g.left + g.width / 2 < h ? g.right : g.left, T = x, z = x < s.top ? s.top : x > s.bottom ? s.bottom : x, P = _(h), I = w(T), N = w(z), j = _($);
      v(j, P, I, "home"), E(I, N, P, "home");
    }), a && this.renderRoot.querySelectorAll(".energy-sub-value.solar-sub").forEach((b) => {
      const g = b.getBoundingClientRect(), x = g.left + g.width / 2, $ = g.top + g.height / 2 < d ? g.bottom : g.top, T = x, z = x < a.left ? a.left : x > a.right ? a.right : x, P = w(d), I = _(T), N = _(z), j = w($);
      E(j, P, I, "solar"), v(I, N, P, "solar");
    }), l && this.renderRoot.querySelectorAll(".energy-sub-value.grid-sub").forEach((b) => {
      const g = b.getBoundingClientRect(), x = g.top + g.height / 2, $ = g.left + g.width / 2 < u ? g.right : g.left, T = x, z = x < l.top ? l.top : x > l.bottom ? l.bottom : x, P = _(u), I = w(T), N = w(z), j = _($);
      v(j, P, I, "grid"), E(I, N, P, "grid");
    }), c && this.renderRoot.querySelectorAll(".energy-sub-value.grid_secondary-sub").forEach((b) => {
      const g = b.getBoundingClientRect(), x = g.top + g.height / 2, $ = g.left + g.width / 2 < p ? g.right : g.left, T = x, z = x < c.top ? c.top : x > c.bottom ? c.bottom : x, P = _(p), I = w(T), N = w(z), j = _($);
      v(j, P, I, "grid_secondary"), E(I, N, P, "grid_secondary");
    }), y.length === this._subNodeConnectorSegments.length && y.every(
      (b, g) => {
        var x, $, T, z, P;
        return b.node === ((x = this._subNodeConnectorSegments[g]) == null ? void 0 : x.node) && b.left === (($ = this._subNodeConnectorSegments[g]) == null ? void 0 : $.left) && b.top === ((T = this._subNodeConnectorSegments[g]) == null ? void 0 : T.top) && b.width === ((z = this._subNodeConnectorSegments[g]) == null ? void 0 : z.width) && b.height === ((P = this._subNodeConnectorSegments[g]) == null ? void 0 : P.height);
      }
    ) || (this._subNodeConnectorSegments = y);
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
    const t = this.perfNow(), e = this.collectTrendCanvases(".node-trend-canvas-area"), i = this.collectTrendCanvases(".node-trend-canvas-line"), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
    e.forEach((u, p) => {
      const _ = this.prepareTrendCanvas(u);
      _ && r.set(p, _);
    }), i.forEach((u, p) => {
      const _ = this.prepareTrendCanvas(u);
      _ && n.set(p, _);
    });
    const o = {};
    Object.keys(this._trendDrawConfig).forEach((u) => {
      const p = this._trendDrawConfig[u];
      if (!p)
        return;
      const _ = this.trendPoints(u, p.currentValue);
      _.length >= 2 && (o[u] = _);
    });
    const s = ((d = this._config) == null ? void 0 : d.shared_trend_scale) === !0, a = s ? this.resolveSharedTrendUnitFactors(o) : null, l = s ? this.computeTrendValueRange(o, a ?? void 0) : null;
    let c = 0, h = 0;
    Object.keys(this._trendDrawConfig).forEach((u) => {
      const p = this._trendDrawConfig[u];
      if (!p)
        return;
      const _ = r.get(u), w = n.get(u);
      if (!_ || !w)
        return;
      const f = o[u];
      if (!f || f.length < 2)
        return;
      const y = s && a !== null && this.isSharedScaleParticipant(u), v = y ? (a == null ? void 0 : a[u]) ?? 1 : 1, E = y ? this.scaleTrendSeries(f, v) : f, C = y ? l : null, b = this.toTrendCoordinates(E, C);
      if (b.length < 2)
        return;
      const g = this.toCanvasPoints(b, _.width, _.height), x = this.toCanvasPoints(b, w.width, w.height);
      this.drawTrendArea(
        _.ctx,
        g,
        p.color,
        _.height,
        p.threshold,
        p.thresholdColor
      ), this.drawTrendLine(w.ctx, x, p.color, p.threshold, p.thresholdColor), c += 1, h += x.length;
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
      const r = i.dataset.node;
      !r || r !== "solar" && r !== "grid" && r !== "grid_secondary" && r !== "home" && r !== "battery" && r !== "battery_secondary" || e.set(r, i);
    }), e;
  }
  prepareTrendCanvas(t) {
    return Xe(t);
  }
  drawTrendArea(t, e, i, r, n, o) {
    if (e.length < 2)
      return;
    const s = this.resolveCanvasColor(i);
    if (n === null) {
      this.fillTrendAreaRun(t, e, s, r);
      return;
    }
    const a = this.resolveCanvasColor(o), l = this.buildThresholdTrendSegments(e, n);
    this.buildAreaRunsFromSegments(l).forEach((h) => {
      this.fillTrendAreaRun(t, h.points, h.low ? a : s, r);
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
      const r = e[e.length - 1], n = r.points[r.points.length - 1], o = Math.abs(n.x - i.start.x) <= 0.01 && Math.abs(n.y - i.start.y) <= 0.01;
      r.low === i.low && o ? r.points.push(i.end) : e.push({
        low: i.low,
        points: [i.start, i.end]
      });
    }
    return e;
  }
  fillTrendAreaRun(t, e, i, r) {
    if (e.length < 2)
      return;
    const n = e[0], o = e[e.length - 1], s = Math.min(...e.map((l) => l.y)), a = t.createLinearGradient(0, s, 0, r);
    a.addColorStop(0, this.withAlpha(i, 0.24)), a.addColorStop(1, this.withAlpha(i, 0)), t.beginPath(), t.moveTo(n.x, n.y), e.slice(1).forEach((l) => t.lineTo(l.x, l.y)), t.lineTo(o.x, r), t.lineTo(n.x, r), t.closePath(), t.fillStyle = a, t.fill();
  }
  drawTrendLine(t, e, i, r, n) {
    if (e.length < 2)
      return;
    const o = this.resolveCanvasColor(i), s = this.resolveCanvasColor(n);
    if (r === null) {
      this.strokeTrendPolyline(t, e, o, 1.5);
      return;
    }
    this.buildThresholdTrendSegments(e, r).forEach((l) => {
      this.strokeTrendSegment(t, l.start, l.end, l.low ? s : o, 1.5);
    });
  }
  strokeTrendPolyline(t, e, i, r) {
    e.length < 2 || (t.beginPath(), t.moveTo(e[0].x, e[0].y), e.slice(1).forEach((n) => t.lineTo(n.x, n.y)), t.strokeStyle = i, t.lineWidth = r, t.lineCap = "round", t.lineJoin = "round", t.stroke());
  }
  strokeTrendSegment(t, e, i, r, n) {
    t.beginPath(), t.moveTo(e.x, e.y), t.lineTo(i.x, i.y), t.strokeStyle = r, t.lineWidth = n, t.lineCap = "round", t.lineJoin = "round", t.stroke();
  }
  resolveCanvasColor(t) {
    return fe(this.renderRoot, t);
  }
  withAlpha(t, e) {
    return Ze(t, e, this._canvasColorContextCache);
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
    var r, n;
    const t = this.renderRoot.querySelector("ha-card");
    if (!t || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const e = !!((r = this._config.hold_action) != null && r.action && this._config.hold_action.action !== "none"), i = !!((n = this._config.double_tap_action) != null && n.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = mt(
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
      const r = this.hasNodeAction(i, "hold"), n = ((l = this.nodeActionConfig(i, "hold")) == null ? void 0 : l.action) === "none", o = r || !n, s = this.hasNodeAction(i, "double_tap"), a = mt(
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
    let r = this.nodeActionConfig(t, e);
    if (e === "tap" && (!r || !r.action) && (r = { action: An }), e === "hold" && (!r || !r.action) && (r = { action: Mn }), !r || !r.action || r.action === "none")
      return;
    if (r.action === Mn) {
      this.openNodeDetailDialog(t);
      return;
    }
    if (r.action === An) {
      this.openNodeZoomOverlay(t, i);
      return;
    }
    const n = {
      ...this._config,
      tap_action: e === "tap" ? r : this._config.tap_action,
      hold_action: e === "hold" ? r : this._config.hold_action,
      double_tap_action: e === "double_tap" ? r : this._config.double_tap_action,
      // Use the node's primary entity for more-info if no explicit entity in actionConfig.
      entity: r.entity ?? this.nodeEntityId(t) ?? this._config.entity
    };
    this.dispatchEvent(
      new CustomEvent("hass-action", {
        detail: { config: n, action: e },
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
    const r = this.renderRoot.querySelector("ha-card"), n = r == null ? void 0 : r.getBoundingClientRect();
    Tl({
      hass: this.hass,
      config: this._config,
      focusedNodeKey: t,
      originRect: i.getBoundingClientRect(),
      cardRect: n
    });
  }
  /** Stub — wired up to the energy-node-dialog module in a separate
   *  phase. Kept here so per-node hold callbacks resolve cleanly. */
  openNodeDetailDialog(t) {
    !this._config || !this.hass || Sl({
      hass: this.hass,
      config: this._config,
      focusedNodeKey: t
    });
  }
  updated(t) {
    t.has("_config") && this.setupActionHandler(), this.updateComplete.then(() => this.setupNodeActionHandlers());
    const e = t.get("_config"), i = t.has("_config") && this.shouldRefreshTrendOnConfigChange(e, this._config), r = t.get("hass"), n = t.has("hass") && this.didRelevantEntityStateChange(r);
    (t.has("preview") || t.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (t.has("_config") ? i && this.scheduleConfigRefresh() : t.has("hass") && this._isVisible && n && this.maybeRefreshTrendHistory(), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (t.has("_config") ? i && this.scheduleConfigRefresh(!0) : t.has("hass") && n && this.maybeRefreshTrendHistory(!1, !0), this._trendResizeObserver && this._trendResizeObserver.disconnect());
    const o = t.has("_config") || t.has("_trendSeries") || t.has("_showSubBlocks") || t.has("preview") || t.has("editMode") || n;
    o && this.updateSubBlockVisibility(), (!this.shouldRunLiveRuntime() || this._isVisible) && o && (this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
  }
  maybeRefreshTrendHistory(t = !1, e = !1) {
    if (!this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview())
      return;
    t && (this._lastTrendRefresh = 0);
    const i = Date.now();
    !t && i - this._lastTrendRefresh < Cn || (this._lastTrendRefresh = i, this.refreshTrendHistory(t, e));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(Yl) || this.hasEditorLikeAncestor();
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
    }, Wl));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(t = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(t), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Cn), this.updateComplete.then(() => {
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
    const i = this._config, r = q(i.trend_data_source, "hybrid"), n = this.enabledTrendNodes(i);
    if (n.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const a = this.perfNow(), l = {}, c = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), _ = /* @__PURE__ */ new Set();
      let w = Number.POSITIVE_INFINITY;
      const f = Date.now() - Ke;
      for (const g of n) {
        if (g === "home" && i.home_auto_calculate === !0) {
          const P = this.homeComputationDependencies(i);
          if (P.length === 0) {
            l[g] = [];
            continue;
          }
          h.set(g, P), d.set(g, this.resolveAutoHomeUnit(i, i.unit ?? "kW"));
          const I = this._trendSeries[g] ?? [];
          if (t || I.length === 0) {
            u.add(g), P.forEach((Z) => {
              p.add(Z.entityId), _.delete(Z.entityId);
            });
            continue;
          }
          const N = ((o = I[I.length - 1]) == null ? void 0 : o.ts) ?? f, j = Math.max(f, N - $n);
          w = Math.min(w, j), P.forEach((Z) => {
            p.has(Z.entityId) || _.add(Z.entityId);
          });
          continue;
        }
        const x = this.trendEntityId(g, i);
        if (!x)
          continue;
        c.set(g, x);
        const $ = this._trendSeries[g] ?? [];
        if (t || $.length === 0 || p.has(x)) {
          p.add(x), _.delete(x);
          continue;
        }
        if (p.has(x))
          continue;
        _.add(x);
        const T = ((s = $[$.length - 1]) == null ? void 0 : s.ts) ?? f, z = Math.max(f, T - $n);
        w = Math.min(w, z);
      }
      let y = 0;
      const v = p.size > 0 ? await (async () => {
        const g = this.perfNow(), x = await Se(
          this.hass,
          Array.from(p),
          Ke,
          { dataSource: r }
        );
        return y = this.perfNow() - g, x;
      })() : {};
      let E = 0;
      const C = _.size > 0 ? await (async () => {
        const g = this.perfNow(), x = await Se(
          this.hass,
          Array.from(_),
          Ke,
          {
            startMs: Number.isFinite(w) ? w : f,
            dataSource: r
          }
        );
        return E = this.perfNow() - g, x;
      })() : {};
      c.forEach((g, x) => {
        const $ = this._trendSeries[x] ?? [];
        if (p.has(g)) {
          const T = v[g] ?? [];
          l[x] = T.length > 0 ? T : $.filter((z) => z.ts >= f);
          return;
        }
        if (_.has(g)) {
          const T = C[g] ?? [];
          l[x] = Bt($, T, f);
          return;
        }
        l[x] = $.filter((T) => T.ts >= f);
      }), h.forEach((g, x) => {
        const $ = this._trendSeries[x] ?? [], T = this.computeAutoHomeTrendFromFetchedDependencies(
          g,
          v,
          C,
          p,
          _,
          f,
          d.get(x) ?? i.unit ?? "kW"
        );
        if (u.has(x)) {
          l[x] = T.length > 0 ? T : $.filter((z) => z.ts >= f);
          return;
        }
        l[x] = Bt($, T, f);
      });
      const b = this.sameTrendSeriesKeys(l, this._trendSeries) && Object.keys(l).every(
        (g) => this.areTrendSeriesEqual(l[g] ?? [], this._trendSeries[g] ?? [])
      );
      b || (this._trendSeries = l), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - a),
        force_full: t,
        nodes: n.length,
        full_entities: p.size,
        incremental_entities: _.size,
        data_source: r,
        full_fetch_ms: this.toPerfMs(y),
        incremental_fetch_ms: this.toPerfMs(E),
        series_changed: !b
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
    const e = /* @__PURE__ */ new Set(), i = (n) => {
      const o = this.readConfigString(n);
      o && e.add(o);
    };
    i(t.home_entity), i(t.solar_entity), i(t.grid_entity), i(t.grid_secondary_entity), i(t.battery_entity), i(t.battery_percentage_entity), i(t.battery_secondary_entity), i(t.battery_secondary_percentage_entity), t.solar_sub_enabled && i(t.solar_sub_entity), t.home_sub_enabled && i(t.home_sub_entity);
    const r = (n, o) => {
      for (let s = 1; s <= o; s += 1)
        t[`${n}_sub_${s}_enabled`] === !0 && i(t[`${n}_sub_${s}_entity`]);
    };
    return r("solar", kn), r("home", Tn), r("grid", ki), r("grid_secondary", ki), Array.from(e);
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
    return e.push(`source:${q(t.trend_data_source, "hybrid")}`), this.enabledTrendNodes(t).forEach((i) => {
      if (i === "home" && t.home_auto_calculate === !0) {
        const r = this.homeComputationDependencies(t).map((n) => `${n.role}:${n.entityId}`).sort().join(",");
        e.push(`home:auto:${r}`);
        return;
      }
      e.push(`${i}:${this.trendEntityId(i, t) ?? ""}`);
    }), e.sort().join("|");
  }
  shouldRefreshTrendOnConfigChange(t, e) {
    return !t || !e ? !0 : this.trendHistorySignature(t) !== this.trendHistorySignature(e);
  }
  computeAutoHomeTrendFromFetchedDependencies(t, e, i, r, n, o, s) {
    const a = {}, l = {};
    return t.forEach((c) => {
      const h = r.has(c.entityId) ? e[c.entityId] ?? [] : n.has(c.entityId) ? i[c.entityId] ?? [] : [];
      a[c.role] = h.filter((u) => Number.isFinite(u.ts) && Number.isFinite(u.value) && u.ts >= o).sort((u, p) => u.ts - p.ts);
      const d = V(this.hass, c.entityId);
      d && (l[c.role] = d);
    }), this.computeAutoHomeTrendSeries(a, o, l, s);
  }
  computeAutoHomeTrendSeries(t, e, i, r) {
    const n = [];
    if (Object.values(t).forEach((s) => {
      s.forEach((a) => {
        Number.isFinite(a.ts) && a.ts >= e && n.push(a.ts);
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
    let r = 0, n = t.length - 1;
    for (; r <= n; ) {
      const h = Math.floor((r + n) / 2), d = t[h];
      if (Math.abs(d.ts - e) <= 0.5)
        return d.value;
      d.ts < e ? r = h + 1 : n = h - 1;
    }
    const o = Math.max(1, Math.min(t.length - 1, r)), s = t[o - 1], a = t[o], l = a.ts - s.ts;
    if (Math.abs(l) <= F)
      return a.value;
    const c = (e - s.ts) / l;
    return s.value + (a.value - s.value) * c;
  }
  sameTrendSeriesKeys(t, e) {
    const i = Object.keys(t).sort(), r = Object.keys(e).sort();
    return i.length === r.length && i.every((n, o) => n === r[o]);
  }
  areTrendSeriesEqual(t, e) {
    if (t.length !== e.length)
      return !1;
    for (let i = 0; i < t.length; i += 1) {
      const r = t[i], n = e[i];
      if (r.ts !== n.ts || Math.abs(r.value - n.value) > 1e-4)
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
    let i = this._config[e], r = this._config;
    if (!i && t === "tap" && this._config.details_navigation_path && (i = { action: "navigate", navigation_path: this._config.details_navigation_path }, r = { ...this._config, tap_action: i }), !(!i || !i.action || i.action === "none")) {
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
    return t === null || t <= F ? "none" : "forward";
  }
  toBidirectionalFlow(t) {
    return t === null || Math.abs(t) <= F ? "none" : t > 0 ? "forward" : "backward";
  }
  reverseFlowDirection(t) {
    return t === "forward" ? "backward" : t === "backward" ? "forward" : "none";
  }
  formatValue(t, e, i) {
    var r, n, o;
    return _t(t, e, i, {
      enabled: ((r = this._config) == null ? void 0 : r.auto_scale_units) === !0,
      baseDecimals: ((n = this._config) == null ? void 0 : n.decimals_base_unit) ?? i,
      prefixedDecimals: ((o = this._config) == null ? void 0 : o.decimals_prefixed_unit) ?? i
    });
  }
  splitFormattedValueAndUnit(t, e) {
    const i = t.trim(), r = e.trim();
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
  formatBatteryPercentage(t) {
    return `${Math.round(this.normalizeBatteryThreshold(t))}%`;
  }
  batteryIcon(t, e, i) {
    if (e !== null && e > F)
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
    return le(t, e);
  }
  toRgbCss(t) {
    return me(t);
  }
};
ie.styles = oe`
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
ge([
  O({ attribute: !1 })
], ie.prototype, "hass", 2);
ge([
  O({ type: Boolean })
], ie.prototype, "preview", 2);
ge([
  O({ type: Boolean })
], ie.prototype, "editMode", 2);
ge([
  M()
], ie.prototype, "_config", 2);
ge([
  M()
], ie.prototype, "_trendSeries", 2);
ge([
  M()
], ie.prototype, "_showSubBlocks", 2);
ge([
  M()
], ie.prototype, "_compactSubBlocks", 2);
ge([
  M()
], ie.prototype, "_subNodeConnectorSegments", 2);
ie = ge([
  pe("power-pilz-energy-card")
], ie);
const ce = (t) => {
  if (typeof t != "string")
    return;
  const e = t.trim();
  return e.length > 0 ? e : void 0;
}, Do = (t, e) => {
  switch (t) {
    case 1:
      return ce(e.entity_1);
    case 2:
      return ce(e.entity_2);
    case 3:
      return ce(e.entity_3);
    case 4:
      return ce(e.entity_4);
    default:
      return;
  }
}, Ho = (t, e) => {
  switch (t) {
    case 1:
      return ce(e.entity_1_name);
    case 2:
      return ce(e.entity_2_name);
    case 3:
      return ce(e.entity_3_name);
    case 4:
      return ce(e.entity_4_name);
    default:
      return;
  }
}, Bo = (t, e) => {
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
}, Fo = (t, e) => {
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
}, Vo = (t, e) => {
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
}, Uo = (t, e) => {
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
}, Wo = (t, e) => {
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
}, jo = (t) => t === "column" ? "column" : "row", mr = (t, e = 24) => {
  const i = typeof t == "number" ? t : typeof t == "string" ? Number.parseInt(t, 10) : NaN;
  return i === 6 || i === 12 || i === 24 || i === 48 || i === 72 || i === 168 || i === 336 || i === 720 ? i : e;
}, fr = (t) => typeof t != "number" || !Number.isFinite(t) ? 1.5 : Math.max(0.5, Math.min(6, t)), Ko = (t, e, i, r) => {
  var s;
  if (e)
    return e;
  const n = t[i], o = (s = n == null ? void 0 : n.attributes) == null ? void 0 : s.friendly_name;
  return typeof o == "string" && o.trim().length > 0 ? o.trim() : `Entity ${r}`;
}, Go = (t, e, i, r) => {
  if (r)
    return _t(t, e, i, {
      ...r,
      nullWithUnit: !0
    });
  if (t === null)
    return e ? `-- ${e}` : "--";
  const n = `${t.toFixed(i)} ${e}`.trim();
  return n.length > 0 ? n : "--";
};
function R(t) {
  var r;
  const e = ((r = t == null ? void 0 : t.locale) == null ? void 0 : r.language) ?? (t == null ? void 0 : t.language) ?? "en";
  return String(e).split("-")[0].toLowerCase() === "de" ? "de" : "en";
}
const nr = {
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
  "schedule.edit_dialog.hint_v2": "Click and drag on a day to paint a block (15-minute snap). Click an existing block to edit its exact time, data, or delete it.",
  "schedule.edit_dialog.block_title": "Edit block · {day}",
  "schedule.edit_dialog.from": "Start",
  "schedule.edit_dialog.to": "End",
  "schedule.edit_dialog.data": "Extra data (optional)",
  "schedule.edit_dialog.data_help": 'JSON object, e.g. {"mode": "heat", "target": 21}',
  "schedule.edit_dialog.delete": "Delete",
  "schedule.edit_dialog.err_time": "Invalid time — use HH:MM or HH:MM:SS.",
  "schedule.edit_dialog.err_order": "Start must be before end.",
  "schedule.edit_dialog.err_overlap": "This block overlaps another block on the same day.",
  "schedule.edit_dialog.err_data": 'Invalid JSON — must be an object literal like {"key": "value"}.',
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
  "graph.editor.double_tap_action": "Double tap behavior"
}, ql = {
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
  "schedule.edit_dialog.hint_v2": "Klicken und ziehen auf einem Tag erstellt einen Block (15-Minuten-Raster). Klick auf einen Block öffnet das Detail-Fenster für exakte Zeit, Daten oder Löschen.",
  "schedule.edit_dialog.block_title": "Block bearbeiten · {day}",
  "schedule.edit_dialog.from": "Start",
  "schedule.edit_dialog.to": "Ende",
  "schedule.edit_dialog.data": "Zusätzliche Daten (optional)",
  "schedule.edit_dialog.data_help": 'JSON-Objekt, z.B. {"mode": "heat", "target": 21}',
  "schedule.edit_dialog.delete": "Löschen",
  "schedule.edit_dialog.err_time": "Ungültige Zeit — Format HH:MM oder HH:MM:SS.",
  "schedule.edit_dialog.err_order": "Start muss vor Ende liegen.",
  "schedule.edit_dialog.err_overlap": "Dieser Block überschneidet einen anderen Block am gleichen Tag.",
  "schedule.edit_dialog.err_data": 'Ungültiges JSON — muss ein Objekt-Literal sein, z.B. {"key": "value"}.',
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
  "graph.editor.double_tap_action": "Verhalten bei Doppeltap"
}, Xl = { en: nr, de: ql };
function m(t, e, i) {
  let o = (Xl[t === "de" ? "de" : "en"] ?? nr)[e] ?? nr[e] ?? e;
  if (i)
    for (const [s, a] of Object.entries(i))
      o = o.replace(new RegExp(`\\{${s}\\}`, "g"), String(a));
  return o;
}
function ft(t, e) {
  return m(t, `weekday.short.${(e % 7 + 7) % 7}`);
}
const Zl = 4, Yo = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, On = "When enabled, hovering over the graph shows the value and timestamp for that point in the legend.", Pn = "When enabled, the area below each trend line is filled with a semi-transparent gradient.", Rn = "When enabled, all entities share the same Y-axis scale. When disabled, each entity auto-scales independently.", In = "When enabled, the graph area is clipped so it does not extend behind the legend labels.", Ln = "Thickness of the trend lines in pixels.", Nn = "Controls where trend data is fetched from. Hybrid prefers statistics and falls back to history automatically.", Dn = "The time window shown in the graph.", Hn = "Controls whether entity legend items are displayed in a row or column layout.", Bn = "When enabled, all entity values are normalized as percentages of a reference total, so the graph always fills 0–100%.", Fn = "The entity whose value represents 100%. Defaults to the last enabled entity in the stack.", Vn = "When enabled, the 100% total is auto-calculated by summing all other entities. Useful when you don't have a total meter.", Un = "Default entity used by more-info actions. Required when tap/hold/double-tap is set to 'More info'.", Wn = "Automatically formats values with metric prefixes (e.g. W/kW/MW and Wh/kWh/MWh).", jn = "Optional unit override. Used when entities have no unit_of_measurement attribute.", Kn = "Default decimal precision for displayed values.", Gn = "Decimal precision for base units (W, Wh) when auto unit scaling is enabled.", Yn = "Decimal precision for prefixed units (kW, MW, kWh, MWh) when auto unit scaling is enabled.", Jl = {
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
}, Ql = (t) => ({
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
                  default_color: Yo[t] ?? "purple"
                }
              }
            }
          ]
        }
      ]
    }
  ]
}), qo = (t = !1, e = !1) => {
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
            helper: Hn,
            description: Hn
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
            helper: Dn,
            description: Dn
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
            helper: Nn,
            description: Nn
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
            helper: On,
            description: On
          },
          {
            name: "fill_area_enabled",
            selector: { boolean: {} },
            helper: Pn,
            description: Pn
          },
          {
            name: "shared_trend_scale",
            selector: { boolean: {} },
            helper: Rn,
            description: Rn
          },
          {
            name: "clip_graph_to_labels",
            selector: { boolean: {} },
            helper: In,
            description: In
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
            helper: Ln,
            description: Ln
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
            helper: Bn,
            description: Bn
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
            helper: Fn,
            description: Fn
          },
          {
            name: "percent_reference_auto",
            selector: { boolean: {} },
            helper: Vn,
            description: Vn
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
        helper: Un,
        description: Un
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
                helper: jn,
                description: jn
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: Kn,
                description: Kn
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
                helper: Wn,
                description: Wn
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
                helper: Gn,
                description: Gn
              },
              {
                name: "decimals_prefixed_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: Yn,
                description: Yn
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
    ...Array.from({ length: Zl }, (l, c) => Ql(c + 1)),
    a,
    s
  ];
}, _e = (t) => {
  if (typeof t == "string")
    return t.length > 0 ? t : void 0;
}, Xo = (t) => t === "column" ? "column" : "row", Zo = (t) => mr(t), Jo = (t) => fr(t), Ot = (t, e, i) => {
  const r = t ?? e;
  return Array.isArray(r) || typeof r == "string" && r.trim().length > 0 ? r : Yo[i] ?? "purple";
}, Qo = (t) => ({
  trend_data_source: q(t.trend_data_source, "hybrid"),
  entity_1: _e(t.entity_1) ?? _e(t.entity),
  entity_1_name: _e(t.entity_1_name),
  entity_1_enabled: t.entity_1_enabled ?? !0,
  entity_1_show_icon: t.entity_1_show_icon ?? !0,
  entity_1_icon: t.entity_1_icon ?? t.icon,
  entity_1_icon_color: t.entity_1_icon_color ?? t.icon_color,
  entity_1_trend_color: Ot(t.entity_1_trend_color, t.trend_color, 1),
  entity_2: _e(t.entity_2),
  entity_2_name: _e(t.entity_2_name),
  entity_2_enabled: t.entity_2_enabled ?? !1,
  entity_2_show_icon: t.entity_2_show_icon ?? !0,
  entity_2_icon: t.entity_2_icon,
  entity_2_trend_color: Ot(t.entity_2_trend_color, void 0, 2),
  entity_3: _e(t.entity_3),
  entity_3_name: _e(t.entity_3_name),
  entity_3_enabled: t.entity_3_enabled ?? !1,
  entity_3_show_icon: t.entity_3_show_icon ?? !0,
  entity_3_icon: t.entity_3_icon,
  entity_3_trend_color: Ot(t.entity_3_trend_color, void 0, 3),
  entity_4: _e(t.entity_4),
  entity_4_name: _e(t.entity_4_name),
  entity_4_enabled: t.entity_4_enabled ?? !1,
  entity_4_show_icon: t.entity_4_show_icon ?? !0,
  entity_4_icon: t.entity_4_icon,
  entity_4_trend_color: Ot(t.entity_4_trend_color, void 0, 4)
}), ec = {
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
}, es = (t, e = {}, i = "en") => {
  const r = t.name ?? "", n = r.match(/^entity_(\d+)_(enabled|name|show_icon|icon|icon_color|trend_color)$/);
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
  if (e[r]) return e[r];
  const s = ec[r];
  return s ? m(i, s) : Jl[r] ?? r;
};
var tc = Object.defineProperty, ic = Object.getOwnPropertyDescriptor, yr = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? ic(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (r ? s(e, i, n) : s(n)) || n);
  return r && n && tc(e, i, n), n;
};
const rc = qo(!1);
let Ut = class extends D {
  constructor() {
    super(...arguments), this.computeLabel = (t) => es(t, {}, R(this.hass)), this.valueChanged = (t) => {
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
      legend_layout: Xo(t.legend_layout),
      timeframe_hours: Zo(t.timeframe_hours),
      hover_enabled: t.hover_enabled ?? !0,
      fill_area_enabled: t.fill_area_enabled ?? !0,
      shared_trend_scale: t.shared_trend_scale ?? !1,
      debug_performance: t.debug_performance ?? !1,
      decimals: t.decimals ?? 1,
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: t.decimals_base_unit ?? t.decimals ?? 1,
      decimals_prefixed_unit: t.decimals_prefixed_unit ?? t.decimals ?? 1,
      line_thickness: Jo(t.line_thickness),
      clip_graph_to_labels: t.clip_graph_to_labels ?? !1,
      ...Qo(t)
    };
    this._config = e;
  }
  render() {
    return !this.hass || !this._config ? k : S`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ke}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${rc}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
yr([
  O({ attribute: !1 })
], Ut.prototype, "hass", 2);
yr([
  M()
], Ut.prototype, "_config", 2);
Ut = yr([
  pe("power-pilz-graph-card-editor")
], Ut);
var nc = Object.defineProperty, oc = Object.getOwnPropertyDescriptor, Te = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? oc(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (r ? s(e, i, n) : s(n)) || n);
  return r && n && nc(e, i, n), n;
};
const it = 1, qn = 24, Xn = 300 * 1e3, sc = 60 * 1e3, ac = 350, Pt = 0.01, rt = 4, lc = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", cc = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), Zn = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let he = class extends D {
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
      const r = t.clientX - i.left, n = t.clientY - i.top;
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
    }, this.handleCardKeyDown = (t) => {
      t.key !== "Enter" && t.key !== " " || (t.preventDefault(), this.fireAction("tap"));
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-graph-card-editor");
  }
  static async getStubConfig(t) {
    const e = (t == null ? void 0 : t.states) ?? {}, i = Object.keys(e), r = (...c) => c.find((h) => h in e), n = (c) => i.find((h) => h.startsWith(`${c}.`)), o = r("sensor.dev_home_power", "sensor.home_power") ?? n("sensor") ?? "sensor.dev_home_power", s = r("sensor.dev_solar_power", "sensor.solar_power"), a = r("sensor.dev_grid_power", "sensor.grid_power"), l = r("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-card",
      legend_layout: "row",
      timeframe_hours: qn,
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
      decimals: it,
      decimals_base_unit: it,
      decimals_prefixed_unit: it
    };
  }
  setConfig(t) {
    const e = typeof t.decimals == "number" && Number.isFinite(t.decimals) ? Math.min(3, Math.max(0, Math.round(t.decimals))) : it, i = de(t.decimals_base_unit, e), r = de(t.decimals_prefixed_unit, e), n = this.readConfigString(t.entity), o = this.readConfigString(t.icon), s = this.readConfigString(t.entity_1) ?? n ?? "sensor.dev_home_power";
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
      trend_data_source: q(t.trend_data_source, "hybrid"),
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: i,
      decimals_prefixed_unit: r,
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
      return S`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return S``;
    const t = this._config, e = t.decimals ?? it, i = this.normalizeLineThickness(t.line_thickness), r = this.collectSeriesEntries(t, e), n = this.normalizeLegendLayout(t.legend_layout), o = t.hover_enabled !== !1, s = this.hasConfiguredAction(t), a = !this.isEditorPreview() && s, l = this._hoverState, c = t.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, h = c > 0 ? { top: `${c}px` } : {}, d = l ? {
      left: `${l.x}px`,
      top: `${l.y + c}px`,
      "--hover-dot-color": l.color
    } : {};
    return this._drawConfigs = r.map((u) => ({
      slot: u.slot,
      currentValue: u.currentValue,
      unit: u.unit,
      color: u.trendColor,
      lineWidth: i
    })), S`
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
          ${o && l ? S`<div class="hover-dot" aria-hidden="true" style=${A(d)}></div>` : k}

          <div class="content">
            <div class="series-list layout-${n}">
              ${r.length === 0 ? S`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : r.map(
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
    const i = e === null ? null : this.convertSharedScaleHoverValue(t.slot, e.value), r = e === null ? null : this.formatHoverTimestamp(e.ts), n = i === null ? t.secondary : `${this.formatValue(i, t.unit, t.decimals)} - ${r ?? ""}`;
    return S`
      <div class="state-item" data-slot=${String(t.slot)}>
        ${t.showIcon ? S`
              <div class="icon-wrap">
                <div class="icon-shape" style=${A(t.iconStyle)}>
                  <ha-icon .icon=${t.icon}></ha-icon>
                </div>
              </div>
            ` : k}
        <div class="info">
          <div class="primary">${t.name}</div>
          <div class="secondary">${n}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(t, e) {
    const i = [];
    for (let r = 1; r <= rt; r += 1) {
      const n = r, o = this.slotEnabled(n, t), s = this.slotEntityId(n, t);
      if (!o || !s)
        continue;
      const a = this.entityName(this.slotCustomName(n, t), s, r), l = B(this.hass, s), c = t.unit ?? V(this.hass, s) ?? "", h = this.formatValue(l, c, e), d = this.slotIcon(n, t), u = this.iconStyle(this.slotIconColor(n, t)), p = this.resolveColor(Zn[n], lc), _ = this.resolveColor(this.slotTrendColor(n, t), p);
      i.push({
        slot: n,
        entityId: s,
        name: a,
        secondary: h,
        unit: c,
        decimals: e,
        currentValue: l,
        icon: d,
        showIcon: this.slotShowIcon(n, t),
        iconStyle: u,
        trendColor: _
      });
    }
    return i;
  }
  slotEntityId(t, e) {
    return Do(t, e);
  }
  slotCustomName(t, e) {
    return Ho(t, e);
  }
  slotEnabled(t, e) {
    return Bo(t, e);
  }
  slotShowIcon(t, e) {
    return Fo(t, e);
  }
  slotIcon(t, e) {
    return Vo(t, e);
  }
  slotIconColor(t, e) {
    return Uo(t, e);
  }
  slotTrendColor(t, e) {
    return Wo(t, e);
  }
  entityName(t, e, i) {
    return Ko(this.hass.states, t, e, i);
  }
  formatValue(t, e, i) {
    var r, n, o;
    return Go(t, e, i, {
      enabled: ((r = this._config) == null ? void 0 : r.auto_scale_units) === !0,
      baseDecimals: ((n = this._config) == null ? void 0 : n.decimals_base_unit) ?? i,
      prefixedDecimals: ((o = this._config) == null ? void 0 : o.decimals_prefixed_unit) ?? i
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
    const n = new Intl.DateTimeFormat(i, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(e);
    return `${r} ${n}`;
  }
  convertSharedScaleHoverValue(t, e) {
    if (!this._sharedScaleCanonical)
      return e;
    const i = this._sharedScaleFactors[t];
    return typeof i != "number" || !Number.isFinite(i) || i <= 0 ? e : e / i;
  }
  readConfigString(t) {
    return ce(t);
  }
  normalizeLegendLayout(t) {
    return jo(t);
  }
  normalizeTimeframeHours(t) {
    return mr(t, qn);
  }
  trendWindowMs(t) {
    return this.normalizeTimeframeHours(t == null ? void 0 : t.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(t) {
    return fr(t);
  }
  normalizeTrendColor(t, e, i) {
    const r = t ?? e;
    return Array.isArray(r) || typeof r == "string" && r.trim().length > 0 ? r : Zn[i];
  }
  iconStyle(t) {
    return Ee(t);
  }
  resolveColor(t, e = "") {
    return le(t, e);
  }
  trendPoints(t, e) {
    const i = Date.now(), r = i - this.trendWindowMs(this._config), n = this._trendSeries[t] ?? [];
    let o = 0;
    for (; o < n.length && n[o].ts < r; )
      o += 1;
    const s = o > 0 ? n.slice(o) : [...n];
    return e !== null && Number.isFinite(e) && s.push({ ts: i, value: e }), s;
  }
  toTrendCoordinates(t, e, i) {
    var v, E;
    const n = Date.now() - e, o = 0, s = 100, a = t.map((C) => C.value), l = (i == null ? void 0 : i.min) ?? Math.min(...a), c = (i == null ? void 0 : i.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const h = 20, d = 80, u = Math.max(c - l, Pt), p = t.map((C) => {
      const b = Math.max(0, Math.min(100, (C.ts - n) / e * 100)), g = o + b / 100 * (s - o), x = u <= Pt ? 0.5 : (C.value - l) / u, $ = d - x * (d - h);
      return { x: g, y: $, value: C.value, ts: C.ts };
    }), _ = ((v = p[0]) == null ? void 0 : v.x) ?? o, w = ((E = p[p.length - 1]) == null ? void 0 : E.x) ?? s, f = Math.max(0, w - _), y = 18;
    if (p.length >= 2 && f < y) {
      const C = s - y, b = Math.max(o, Math.min(C, w - y));
      if (f <= Pt) {
        const x = y / (p.length - 1);
        return p.map(($, T) => ({
          ...$,
          x: Math.max(o, Math.min(s, b + x * T))
        }));
      }
      const g = y / f;
      return p.map((x) => ({
        ...x,
        x: Math.max(o, Math.min(s, b + (x.x - _) * g))
      }));
    }
    return p;
  }
  toCanvasPoints(t, e, i) {
    return ur(t, e, i).map((r) => ({
      x: r.x,
      y: r.y,
      value: r.value,
      ts: r.ts
    }));
  }
  computeTrendValueRange(t, e) {
    const i = [];
    if (Object.entries(t).forEach(([o, s]) => {
      const a = Number(o), l = (e == null ? void 0 : e[a]) ?? 1;
      s.forEach((c) => i.push(c.value * l));
    }), i.length === 0)
      return null;
    const r = Math.min(...i), n = Math.max(...i);
    return !Number.isFinite(r) || !Number.isFinite(n) ? null : { min: r, max: n };
  }
  resolveSharedScaleFactors(t) {
    let e = null;
    const i = {};
    Object.keys(t).map((o) => Number(o)).filter((o) => Number.isFinite(o) && o >= 1 && o <= rt).forEach((o) => {
      const s = o, a = this._drawConfigs.find((c) => c.slot === s);
      if (!a)
        return;
      const l = Y(a.unit);
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
    const r = Object.keys(t);
    if (r.length === 0)
      return null;
    const n = Object.values(i).some((o) => !Number.isFinite(o ?? NaN));
    return e === null || n || Object.keys(i).length !== r.length ? null : i;
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
    var w, f;
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
    const r = this.prepareTrendCanvas(e), n = this.prepareTrendCanvas(i);
    if (!r || !n) {
      this._linePointsBySlot = {}, this._sharedScaleCanonical = !1, this._sharedScaleFactors = {}, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const o = ((w = this._config) == null ? void 0 : w.fill_area_enabled) !== !1, s = this.trendWindowMs(this._config), a = {};
    this._drawConfigs.forEach((y) => {
      const v = this.trendPoints(y.slot, y.currentValue);
      v.length >= 2 && (a[y.slot] = v);
    });
    const l = ((f = this._config) == null ? void 0 : f.shared_trend_scale) === !0, c = l ? this.resolveSharedScaleFactors(a) : null;
    this._sharedScaleCanonical = c !== null, this._sharedScaleFactors = c ?? {};
    const h = l ? this.computeTrendValueRange(a, c ?? void 0) : null, d = {};
    let u = 0, p = 0;
    [...this._drawConfigs].sort((y, v) => v.slot - y.slot).forEach((y) => {
      const v = a[y.slot];
      if (!v || v.length < 2)
        return;
      const E = (c == null ? void 0 : c[y.slot]) ?? 1, C = c ? this.scaleTrendSeries(v, E) : v, b = this.toTrendCoordinates(C, s, h);
      if (b.length < 2)
        return;
      const g = this.toCanvasPoints(b, r.width, r.height), x = this.toCanvasPoints(b, n.width, n.height);
      o && this.drawTrendArea(r.ctx, g, y.color, r.height), this.drawTrendLine(n.ctx, x, y.color, y.lineWidth), d[y.slot] = x, u += 1, p += x.length;
    }), this._linePointsBySlot = d, this._hoverState && !d[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - t),
      series: u,
      points: p,
      fill_area: o,
      shared_scale: l,
      shared_scale_units: this._sharedScaleCanonical ? "canonical" : "raw"
    });
  }
  prepareTrendCanvas(t) {
    return Xe(t);
  }
  drawTrendArea(t, e, i, r) {
    if (e.length < 2)
      return;
    const n = this.resolveCanvasColor(i), o = e[0], s = e[e.length - 1], a = Math.min(...e.map((c) => c.y)), l = t.createLinearGradient(0, a, 0, r);
    l.addColorStop(0, this.withAlpha(n, 0.24)), l.addColorStop(1, this.withAlpha(n, 0)), t.beginPath(), t.moveTo(o.x, o.y), e.slice(1).forEach((c) => t.lineTo(c.x, c.y)), t.lineTo(s.x, r), t.lineTo(o.x, r), t.closePath(), t.fillStyle = l, t.fill();
  }
  drawTrendLine(t, e, i, r) {
    if (e.length < 2)
      return;
    const n = this.resolveCanvasColor(i);
    this.strokeTrendPolyline(t, e, n, r);
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
    for (const n of this._drawConfigs) {
      const o = this._linePointsBySlot[n.slot];
      if (!o || o.length < 2)
        continue;
      const s = this.interpolateCanvasPoint(o, t);
      if (!s)
        continue;
      const a = Math.abs(s.y - e);
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
  interpolateCanvasPoint(t, e) {
    if (t.length === 0)
      return null;
    const i = t[0], r = t[t.length - 1];
    if (e <= i.x)
      return { x: e, y: i.y, value: i.value, ts: i.ts };
    if (e >= r.x)
      return { x: e, y: r.y, value: r.value, ts: r.ts };
    for (let n = 1; n < t.length; n += 1) {
      const o = t[n - 1], s = t[n];
      if (e > s.x)
        continue;
      const a = s.x - o.x;
      if (Math.abs(a) <= Pt)
        return { x: e, y: s.y, value: s.value, ts: s.ts };
      const l = (e - o.x) / a;
      return {
        x: e,
        y: o.y + (s.y - o.y) * l,
        value: o.value + (s.value - o.value) * l,
        ts: o.ts + (s.ts - o.ts) * l
      };
    }
    return { x: e, y: r.y, value: r.value, ts: r.ts };
  }
  strokeTrendPolyline(t, e, i, r) {
    e.length < 2 || (t.beginPath(), t.moveTo(e[0].x, e[0].y), e.slice(1).forEach((n) => t.lineTo(n.x, n.y)), t.strokeStyle = i, t.lineWidth = r, t.lineCap = "round", t.lineJoin = "round", t.stroke());
  }
  resolveCanvasColor(t) {
    return fe(this.renderRoot, t);
  }
  withAlpha(t, e) {
    return Ze(t, e, this._canvasColorContextCache);
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
    const t = this.renderRoot.querySelector("ha-card");
    if (!t || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const e = !!((r = this._config.hold_action) != null && r.action && this._config.hold_action.action !== "none"), i = !!((n = this._config.double_tap_action) != null && n.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = mt(
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
    const e = t.get("_config"), i = t.has("_config") && this.shouldRefreshTrendOnConfigChange(e, this._config), r = t.get("hass"), n = t.has("hass") && this.didTrackedEntityStateChange(r);
    (t.has("preview") || t.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (t.has("_config") ? (i && this.scheduleConfigRefresh(), this.clearHoverState()) : t.has("hass") && this._isVisible && n && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (t.has("_config") ? (i && this.scheduleConfigRefresh(!0), this.clearHoverState()) : t.has("hass") && n && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((s = this._config) == null ? void 0 : s.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset();
    const o = t.has("_config") || t.has("_trendSeries") || t.has("_graphTopInset") || t.has("preview") || t.has("editMode") || n;
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
    const r = e.getBoundingClientRect(), n = i.getBoundingClientRect(), o = Math.max(0, Math.ceil(n.bottom - r.top));
    Math.abs(o - this._graphTopInset) > 0.5 && (this._graphTopInset = o);
  }
  maybeRefreshTrendHistory(t = !1, e = !1) {
    if (!this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview())
      return;
    t && (this._lastTrendRefresh = 0);
    const i = Date.now();
    !t && i - this._lastTrendRefresh < Xn || (this._lastTrendRefresh = i, this.refreshTrendHistory(t, e));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(cc) || this.hasEditorLikeAncestor();
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
    }, ac));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(t = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(t), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Xn), this.updateComplete.then(() => {
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
    const i = this._config, r = {}, n = this.trendWindowMs(i), o = q(i.trend_data_source, "hybrid"), s = this.enabledSlots(i);
    if (s.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const l = this.perfNow(), c = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
      let u = Number.POSITIVE_INFINITY;
      const p = Date.now() - n;
      for (const E of s) {
        const C = this.slotEntityId(E, i);
        if (!C)
          continue;
        c.set(E, C);
        const b = this._trendSeries[E] ?? [];
        if (t || b.length === 0 || h.has(C)) {
          h.add(C), d.delete(C);
          continue;
        }
        if (h.has(C))
          continue;
        d.add(C);
        const g = ((a = b[b.length - 1]) == null ? void 0 : a.ts) ?? p, x = Math.max(p, g - sc);
        u = Math.min(u, x);
      }
      let _ = 0;
      const w = h.size > 0 ? await (async () => {
        const E = this.perfNow(), C = await Se(
          this.hass,
          Array.from(h),
          n,
          { dataSource: o }
        );
        return _ = this.perfNow() - E, C;
      })() : {};
      let f = 0;
      const y = d.size > 0 ? await (async () => {
        const E = this.perfNow(), C = await Se(
          this.hass,
          Array.from(d),
          n,
          {
            startMs: Number.isFinite(u) ? u : p,
            dataSource: o
          }
        );
        return f = this.perfNow() - E, C;
      })() : {};
      c.forEach((E, C) => {
        const b = this._trendSeries[C] ?? [];
        if (h.has(E)) {
          const g = w[E] ?? [];
          r[C] = g.length > 0 ? g : b.filter((x) => x.ts >= p);
          return;
        }
        if (d.has(E)) {
          const g = y[E] ?? [];
          r[C] = Bt(b, g, p);
          return;
        }
        r[C] = b.filter((g) => g.ts >= p);
      });
      const v = this.sameTrendSeriesKeys(r, this._trendSeries) && Object.keys(r).map((E) => Number(E)).filter((E) => Number.isFinite(E) && E >= 1 && E <= rt).every((E) => {
        const C = E;
        return this.areTrendSeriesEqual(r[C] ?? [], this._trendSeries[C] ?? []);
      });
      v || (this._trendSeries = r), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - l),
        window_ms: n,
        force_full: t,
        slots: s.length,
        full_entities: h.size,
        incremental_entities: d.size,
        data_source: o,
        full_fetch_ms: this.toPerfMs(_),
        incremental_fetch_ms: this.toPerfMs(f),
        series_changed: !v
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(t) {
    const e = [];
    for (let i = 1; i <= rt; i += 1) {
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
    if (!t || !e || this.trendWindowMs(t) !== this.trendWindowMs(e) || q(t.trend_data_source, "hybrid") !== q(e.trend_data_source, "hybrid"))
      return !0;
    for (let i = 1; i <= rt; i += 1) {
      const r = i, n = this.slotEnabled(r, t), o = this.slotEnabled(r, e), s = n ? this.slotEntityId(r, t) : void 0, a = o ? this.slotEntityId(r, e) : void 0;
      if (n !== o || s !== a)
        return !0;
    }
    return !1;
  }
  sameTrendSeriesKeys(t, e) {
    const i = Object.keys(t).sort(), r = Object.keys(e).sort();
    return i.length === r.length && i.every((n, o) => n === r[o]);
  }
  areTrendSeriesEqual(t, e) {
    if (t.length !== e.length)
      return !1;
    for (let i = 0; i < t.length; i += 1) {
      const r = t[i], n = e[i];
      if (r.ts !== n.ts || Math.abs(r.value - n.value) > 1e-4)
        return !1;
    }
    return !0;
  }
};
he.styles = oe`
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
Te([
  O({ attribute: !1 })
], he.prototype, "hass", 2);
Te([
  O({ type: Boolean })
], he.prototype, "preview", 2);
Te([
  O({ type: Boolean })
], he.prototype, "editMode", 2);
Te([
  M()
], he.prototype, "_config", 2);
Te([
  M()
], he.prototype, "_trendSeries", 2);
Te([
  M()
], he.prototype, "_graphTopInset", 2);
Te([
  M()
], he.prototype, "_hoverState", 2);
he = Te([
  pe("power-pilz-graph-card")
], he);
var dc = Object.defineProperty, hc = Object.getOwnPropertyDescriptor, gr = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? hc(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (r ? s(e, i, n) : s(n)) || n);
  return r && n && dc(e, i, n), n;
};
let Wt = class extends D {
  constructor() {
    super(...arguments), this.computeLabel = (t) => es(t, {}, R(this.hass)), this.valueChanged = (t) => {
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
      legend_layout: Xo(t.legend_layout),
      timeframe_hours: Zo(t.timeframe_hours),
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
      line_thickness: Jo(t.line_thickness),
      clip_graph_to_labels: t.clip_graph_to_labels ?? !1,
      ...Qo(t)
    };
    this._config = e;
  }
  render() {
    if (!this.hass || !this._config)
      return k;
    const t = this._config.normalize_stack_to_percent ?? !1, e = qo(!0, t);
    return S`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ke}
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
gr([
  O({ attribute: !1 })
], Wt.prototype, "hass", 2);
gr([
  M()
], Wt.prototype, "_config", 2);
Wt = gr([
  pe("power-pilz-graph-stack-card-editor")
], Wt);
var uc = Object.defineProperty, pc = Object.getOwnPropertyDescriptor, ze = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? pc(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (r ? s(e, i, n) : s(n)) || n);
  return r && n && uc(e, i, n), n;
};
const nt = 1, Jn = 24, Qn = 300 * 1e3, _c = 60 * 1e3, mc = 350, Oe = 0.01, Ge = 4, fc = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", yc = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), eo = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let ue = class extends D {
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
      const r = t.clientX - i.left, n = t.clientY - i.top;
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
    }, this.handleCardKeyDown = (t) => {
      t.key !== "Enter" && t.key !== " " || (t.preventDefault(), this.fireAction("tap"));
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-graph-stack-card-editor");
  }
  static async getStubConfig(t) {
    const e = (t == null ? void 0 : t.states) ?? {}, i = Object.keys(e), r = (...c) => c.find((h) => h in e), n = (c) => i.find((h) => h.startsWith(`${c}.`)), o = r("sensor.dev_home_power", "sensor.home_power") ?? n("sensor") ?? "sensor.dev_home_power", s = r("sensor.dev_solar_power", "sensor.solar_power"), a = r("sensor.dev_grid_power", "sensor.grid_power"), l = r("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: "row",
      timeframe_hours: Jn,
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
      decimals: nt,
      decimals_base_unit: nt,
      decimals_prefixed_unit: nt
    };
  }
  setConfig(t) {
    const e = typeof t.decimals == "number" && Number.isFinite(t.decimals) ? Math.min(3, Math.max(0, Math.round(t.decimals))) : nt, i = de(t.decimals_base_unit, e), r = de(t.decimals_prefixed_unit, e), n = this.readConfigString(t.entity), o = this.readConfigString(t.icon), s = this.readConfigString(t.entity_1) ?? n ?? "sensor.dev_home_power";
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
      trend_data_source: q(t.trend_data_source, "hybrid"),
      normalize_stack_to_percent: t.normalize_stack_to_percent ?? !1,
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: i,
      decimals_prefixed_unit: r,
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
      return S`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return S``;
    const t = this._config, e = t.decimals ?? nt, i = this.normalizeLineThickness(t.line_thickness), r = t.normalize_stack_to_percent === !0, n = this.collectSeriesEntries(t, e), o = this.withStackedCurrentValues(n, r, t), s = this.normalizeLegendLayout(t.legend_layout), a = t.hover_enabled !== !1, l = this.hasConfiguredAction(t), c = !this.isEditorPreview() && l, h = this._hoverState, d = t.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, u = d > 0 ? { top: `${d}px` } : {}, p = h ? {
      left: `${h.x}px`,
      top: `${h.y + d}px`,
      "--hover-dot-color": h.color
    } : {};
    return this._drawConfigs = n.map((_) => ({
      slot: _.slot,
      currentValue: _.currentValue,
      unit: _.unit,
      color: _.trendColor,
      lineWidth: i
    })), S`
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
          ${a && h ? S`<div class="hover-dot" aria-hidden="true" style=${A(p)}></div>` : k}

          <div class="content">
            <div class="series-list layout-${s}">
              ${n.length === 0 ? S`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph Stack card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : o.map(
      (_) => this.renderSeriesItem(
        _,
        h && h.slot === _.slot ? h : null
      )
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
  renderSeriesItem(t, e) {
    const i = e === null ? null : this.convertStackedHoverValue(t.slot, e.value), r = e === null ? null : this.formatHoverTimestamp(e.ts), n = i === null ? t.secondary : `${this.formatValue(i, t.unit, t.decimals)} - ${r ?? ""}`;
    return S`
      <div class="state-item" data-slot=${String(t.slot)}>
        ${t.showIcon ? S`
              <div class="icon-wrap">
                <div class="icon-shape" style=${A(t.iconStyle)}>
                  <ha-icon .icon=${t.icon}></ha-icon>
                </div>
              </div>
            ` : k}
        <div class="info">
          <div class="primary">${t.name}</div>
          <div class="secondary">${n}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(t, e) {
    const i = [];
    for (let r = 1; r <= Ge; r += 1) {
      const n = r, o = this.slotEnabled(n, t), s = this.slotEntityId(n, t);
      if (!o || !s)
        continue;
      const a = this.entityName(this.slotCustomName(n, t), s, r), l = B(this.hass, s), c = t.unit ?? V(this.hass, s) ?? "", h = this.formatValue(l, c, e), d = this.slotIcon(n, t), u = this.iconStyle(this.slotIconColor(n, t)), p = this.resolveColor(eo[n], fc), _ = this.resolveColor(this.slotTrendColor(n, t), p);
      i.push({
        slot: n,
        entityId: s,
        name: a,
        secondary: h,
        unit: c,
        decimals: e,
        currentValue: l,
        icon: d,
        showIcon: this.slotShowIcon(n, t),
        iconStyle: u,
        trendColor: _
      });
    }
    return i;
  }
  resolvePercentReference(t, e) {
    const i = e.percent_reference_slot, r = typeof i == "number" ? i : typeof i == "string" && i.length > 0 ? Number(i) : NaN, n = Number.isFinite(r) && r >= 1 && r <= Ge ? r : void 0;
    return { refSlot: n !== void 0 && t.some((s) => s.slot === n) ? n : void 0, auto: e.percent_reference_auto === !0 };
  }
  withStackedCurrentValues(t, e, i) {
    var p;
    const r = this.resolveStackUnitFactors(t), { refSlot: n, auto: o } = e ? this.resolvePercentReference(t, i) : { refSlot: void 0, auto: !1 }, s = (_) => _.currentValue === null || !Number.isFinite(_.currentValue) ? 0 : r ? _.currentValue * (r[_.slot] ?? 1) : _.currentValue;
    let a, l;
    if (e && n !== void 0 && !o) {
      const _ = t.find((w) => w.slot === n);
      a = _ ? s(_) : 0, l = n;
    } else e && o ? (a = t.reduce((_, w) => w.slot !== n ? _ + s(w) : _, 0), l = n) : (a = t.reduce((_, w) => _ + s(w), 0), l = (p = t[t.length - 1]) == null ? void 0 : p.slot);
    const c = Number.isFinite(a) && Math.abs(a) > Oe;
    let h = 0, d = 0, u = !1;
    return t.map((_) => {
      const w = n !== void 0 && _.slot === n && !o;
      _.currentValue !== null && Number.isFinite(_.currentValue) && (w || (h += _.currentValue, r && (d += _.currentValue * (r[_.slot] ?? 1))), u = !0);
      let f;
      if (!u)
        f = null;
      else if (e)
        if (!c)
          f = 0;
        else if (w)
          f = 100;
        else if (n !== void 0 || o) {
          const v = s(_);
          f = Math.max(0, Math.min(100, v / a * 100));
        } else {
          const v = r ? d : h;
          f = _.slot === l ? 100 : Math.max(0, Math.min(100, v / a * 100));
        }
      else
        f = r ? d / (r[_.slot] ?? 1) : h;
      const y = e ? "%" : _.unit;
      return {
        ..._,
        unit: y,
        secondary: this.formatValue(f, y, _.decimals)
      };
    });
  }
  slotEntityId(t, e) {
    return Do(t, e);
  }
  slotCustomName(t, e) {
    return Ho(t, e);
  }
  slotEnabled(t, e) {
    return Bo(t, e);
  }
  slotShowIcon(t, e) {
    return Fo(t, e);
  }
  slotIcon(t, e) {
    return Vo(t, e);
  }
  slotIconColor(t, e) {
    return Uo(t, e);
  }
  slotTrendColor(t, e) {
    return Wo(t, e);
  }
  entityName(t, e, i) {
    return Ko(this.hass.states, t, e, i);
  }
  formatValue(t, e, i) {
    var r, n, o;
    return Go(t, e, i, {
      enabled: ((r = this._config) == null ? void 0 : r.auto_scale_units) === !0,
      baseDecimals: ((n = this._config) == null ? void 0 : n.decimals_base_unit) ?? i,
      prefixedDecimals: ((o = this._config) == null ? void 0 : o.decimals_prefixed_unit) ?? i
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
    const n = new Intl.DateTimeFormat(i, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(e);
    return `${r} ${n}`;
  }
  resolveStackUnitFactors(t) {
    if (t.length === 0)
      return null;
    let e = null;
    const i = {};
    for (const r of t) {
      const n = Y(r.unit);
      if (!n)
        return null;
      if (e === null)
        e = n.family;
      else if (e !== n.family)
        return null;
      i[r.slot] = n.factor;
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
    return ce(t);
  }
  normalizeLegendLayout(t) {
    return jo(t);
  }
  normalizeTimeframeHours(t) {
    return mr(t, Jn);
  }
  trendWindowMs(t) {
    return this.normalizeTimeframeHours(t == null ? void 0 : t.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(t) {
    return fr(t);
  }
  normalizeTrendColor(t, e, i) {
    const r = t ?? e;
    return Array.isArray(r) || typeof r == "string" && r.trim().length > 0 ? r : eo[i];
  }
  iconStyle(t) {
    return Ee(t);
  }
  resolveColor(t, e = "") {
    return le(t, e);
  }
  trendPoints(t, e) {
    const i = Date.now(), r = i - this.trendWindowMs(this._config), n = this._trendSeries[t] ?? [];
    let o = 0;
    for (; o < n.length && n[o].ts < r; )
      o += 1;
    const s = o > 0 ? n.slice(o) : [...n];
    return e !== null && Number.isFinite(e) && s.push({ ts: i, value: e }), s;
  }
  toTrendCoordinates(t, e, i) {
    var v, E;
    const n = Date.now() - e, o = 0, s = 100, a = t.map((C) => C.value), l = (i == null ? void 0 : i.min) ?? Math.min(...a), c = (i == null ? void 0 : i.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const h = 20, d = 80, u = Math.max(c - l, Oe), p = t.map((C) => {
      const b = Math.max(0, Math.min(100, (C.ts - n) / e * 100)), g = o + b / 100 * (s - o), x = u <= Oe ? 0.5 : (C.value - l) / u, $ = d - x * (d - h);
      return { x: g, y: $, value: C.value, ts: C.ts };
    }), _ = ((v = p[0]) == null ? void 0 : v.x) ?? o, w = ((E = p[p.length - 1]) == null ? void 0 : E.x) ?? s, f = Math.max(0, w - _), y = 18;
    if (p.length >= 2 && f < y) {
      const C = s - y, b = Math.max(o, Math.min(C, w - y));
      if (f <= Oe) {
        const x = y / (p.length - 1);
        return p.map(($, T) => ({
          ...$,
          x: Math.max(o, Math.min(s, b + x * T))
        }));
      }
      const g = y / f;
      return p.map((x) => ({
        ...x,
        x: Math.max(o, Math.min(s, b + (x.x - _) * g))
      }));
    }
    return p;
  }
  toCanvasPoints(t, e, i) {
    return ur(t, e, i).map((r) => ({
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
    var v, E, C;
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
    const r = this.prepareTrendCanvas(e), n = this.prepareTrendCanvas(i);
    if (!r || !n) {
      this._linePointsBySlot = {}, this._stackCanonicalMode = !1, this._stackCanonicalFactors = {}, this._stackNormalizeToPercent = !1, this._hoverState && (this._hoverState = void 0), this.logPerformance("draw-skip", { reason: "canvas-context" });
      return;
    }
    const o = ((v = this._config) == null ? void 0 : v.fill_area_enabled) !== !1, s = ((E = this._config) == null ? void 0 : E.normalize_stack_to_percent) === !0, a = ((C = this._config) == null ? void 0 : C.shared_trend_scale) === !0, l = this.resolveStackUnitFactors(this._drawConfigs);
    this._stackCanonicalMode = l !== null, this._stackCanonicalFactors = l ?? {}, this._stackNormalizeToPercent = s;
    const c = this.trendWindowMs(this._config), h = {}, d = s ? this.resolvePercentReference(
      this._drawConfigs,
      this._config
    ) : { refSlot: void 0, auto: !1 }, u = this.buildStackedTrendSeries(c, l ?? void 0, d.refSlot, d.auto), p = s ? this.normalizeStackedSeriesToPercent(u, d.refSlot, d.auto) : u, _ = s ? { min: 0, max: 100 } : a ? this.computeStackedValueRange(p) : null;
    let w = 0, f = 0;
    [...this._drawConfigs].sort((b, g) => g.slot - b.slot).forEach((b) => {
      const g = p[b.slot] ?? [];
      if (g.length < 2)
        return;
      const x = this.toTrendCoordinates(g, c, _);
      if (x.length < 2)
        return;
      const $ = this.toCanvasPoints(x, r.width, r.height), T = this.toCanvasPoints(x, n.width, n.height);
      o && this.drawTrendArea(r.ctx, $, b.color, r.height), this.drawTrendLine(n.ctx, T, b.color, b.lineWidth), h[b.slot] = T, w += 1, f += T.length;
    }), this._linePointsBySlot = h, this._hoverState && !h[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - t),
      series: w,
      points: f,
      fill_area: o,
      shared_scale: a,
      normalize_percent: s,
      stack_units: this._stackCanonicalMode ? "canonical" : "raw"
    });
  }
  buildStackedTrendSeries(t, e, i, r) {
    const n = {}, o = [...this._drawConfigs].sort((l, c) => l.slot - c.slot), s = i !== void 0 && !r;
    let a = null;
    return o.forEach((l) => {
      const c = this.trendPoints(l.slot, l.currentValue);
      if (c.length === 0)
        return;
      const h = this.normalizeTrendSeries(c, t);
      if (h.length === 0)
        return;
      const d = (e == null ? void 0 : e[l.slot]) ?? 1, u = d === 1 ? h : h.map((_) => ({
        ts: _.ts,
        value: _.value * d
      }));
      if (s && l.slot === i) {
        n[l.slot] = u;
        return;
      }
      const p = a ? this.sumTrendSeries(a, u) : u;
      n[l.slot] = p, a = p;
    }), n;
  }
  normalizeTrendSeries(t, e) {
    const i = Date.now() - e, r = [...t].filter((o) => Number.isFinite(o.ts) && Number.isFinite(o.value) && o.ts >= i).sort((o, s) => o.ts - s.ts);
    if (r.length === 0)
      return [];
    const n = [];
    return r.forEach((o) => {
      const s = n[n.length - 1];
      s && Math.abs(s.ts - o.ts) <= 0.5 ? n[n.length - 1] = o : n.push(o);
    }), n;
  }
  sumTrendSeries(t, e) {
    return t.length === 0 ? [...e] : e.length === 0 ? [...t] : this.mergeTimestamps(t, e).map((r) => ({
      ts: r,
      value: this.interpolateTrendValue(t, r) + this.interpolateTrendValue(e, r)
    }));
  }
  mergeTimestamps(t, e) {
    const i = [];
    let r = 0, n = 0;
    const o = (s) => {
      const a = i[i.length - 1];
      (a === void 0 || Math.abs(a - s) > 0.5) && i.push(s);
    };
    for (; r < t.length || n < e.length; ) {
      const s = r < t.length ? t[r].ts : Number.POSITIVE_INFINITY, a = n < e.length ? e[n].ts : Number.POSITIVE_INFINITY;
      s <= a ? (o(s), r += 1, Math.abs(s - a) <= 0.5 && (n += 1)) : (o(a), n += 1);
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
    let r = 0, n = t.length - 1;
    for (; r <= n; ) {
      const h = Math.floor((r + n) / 2), d = t[h];
      if (Math.abs(d.ts - e) <= 0.5)
        return d.value;
      d.ts < e ? r = h + 1 : n = h - 1;
    }
    const o = Math.max(1, Math.min(t.length - 1, r)), s = t[o - 1], a = t[o], l = a.ts - s.ts;
    if (Math.abs(l) <= Oe)
      return a.value;
    const c = (e - s.ts) / l;
    return s.value + (a.value - s.value) * c;
  }
  computeStackedValueRange(t) {
    const e = [];
    if (Object.values(t).forEach((n) => {
      n.forEach((o) => e.push(o.value));
    }), e.length === 0)
      return null;
    const i = Math.min(...e), r = Math.max(...e);
    return !Number.isFinite(i) || !Number.isFinite(r) ? null : { min: i, max: r };
  }
  normalizeStackedSeriesToPercent(t, e, i) {
    const r = {}, n = Object.keys(t).map((a) => Number(a)).filter((a) => Number.isFinite(a) && a >= 1 && a <= Ge).sort((a, l) => a - l);
    if (n.length === 0)
      return r;
    let o, s;
    if (e !== void 0 && !i)
      o = t[e] ?? [], s = e;
    else if (i) {
      const a = e !== void 0 ? n.filter((l) => l !== e) : n;
      s = a[a.length - 1] ?? n[n.length - 1], o = t[s] ?? [];
    } else
      s = n[n.length - 1], o = t[s] ?? [];
    return o.length < 1 || n.forEach((a) => {
      const l = t[a] ?? [];
      l.length !== 0 && (r[a] = l.map((c) => {
        const h = this.interpolateTrendValue(o, c.ts);
        if (!Number.isFinite(h) || Math.abs(h) <= Oe)
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
    }), r;
  }
  prepareTrendCanvas(t) {
    return Xe(t);
  }
  drawTrendArea(t, e, i, r) {
    if (e.length < 2)
      return;
    const n = this.resolveCanvasColor(i), o = e[0], s = e[e.length - 1], a = Math.min(...e.map((c) => c.y)), l = t.createLinearGradient(0, a, 0, r);
    l.addColorStop(0, this.withAlpha(n, 0.24)), l.addColorStop(1, this.withAlpha(n, 0)), t.beginPath(), t.moveTo(o.x, o.y), e.slice(1).forEach((c) => t.lineTo(c.x, c.y)), t.lineTo(s.x, r), t.lineTo(o.x, r), t.closePath(), t.fillStyle = l, t.fill();
  }
  drawTrendLine(t, e, i, r) {
    if (e.length < 2)
      return;
    const n = this.resolveCanvasColor(i);
    this.strokeTrendPolyline(t, e, n, r);
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
    for (const n of this._drawConfigs) {
      const o = this._linePointsBySlot[n.slot];
      if (!o || o.length < 2)
        continue;
      const s = this.interpolateCanvasPoint(o, t);
      if (!s)
        continue;
      const a = Math.abs(s.y - e);
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
  interpolateCanvasPoint(t, e) {
    if (t.length === 0)
      return null;
    const i = t[0], r = t[t.length - 1];
    if (e <= i.x)
      return { x: e, y: i.y, value: i.value, ts: i.ts };
    if (e >= r.x)
      return { x: e, y: r.y, value: r.value, ts: r.ts };
    for (let n = 1; n < t.length; n += 1) {
      const o = t[n - 1], s = t[n];
      if (e > s.x)
        continue;
      const a = s.x - o.x;
      if (Math.abs(a) <= Oe)
        return { x: e, y: s.y, value: s.value, ts: s.ts };
      const l = (e - o.x) / a;
      return {
        x: e,
        y: o.y + (s.y - o.y) * l,
        value: o.value + (s.value - o.value) * l,
        ts: o.ts + (s.ts - o.ts) * l
      };
    }
    return { x: e, y: r.y, value: r.value, ts: r.ts };
  }
  strokeTrendPolyline(t, e, i, r) {
    e.length < 2 || (t.beginPath(), t.moveTo(e[0].x, e[0].y), e.slice(1).forEach((n) => t.lineTo(n.x, n.y)), t.strokeStyle = i, t.lineWidth = r, t.lineCap = "round", t.lineJoin = "round", t.stroke());
  }
  resolveCanvasColor(t) {
    return fe(this.renderRoot, t);
  }
  withAlpha(t, e) {
    return Ze(t, e, this._canvasColorContextCache);
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
    const t = this.renderRoot.querySelector("ha-card");
    if (!t || !this._config || (this.destroyActionHandler(), !this.hasConfiguredAction(this._config) || this.isEditorPreview())) return;
    const e = !!((r = this._config.hold_action) != null && r.action && this._config.hold_action.action !== "none"), i = !!((n = this._config.double_tap_action) != null && n.action && this._config.double_tap_action.action !== "none");
    this._actionHandler = mt(
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
    const e = t.get("_config"), i = t.has("_config") && this.shouldRefreshTrendOnConfigChange(e, this._config), r = t.get("hass"), n = t.has("hass") && this.didTrackedEntityStateChange(r);
    (t.has("preview") || t.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (t.has("_config") ? (i && this.scheduleConfigRefresh(), this.clearHoverState()) : t.has("hass") && this._isVisible && n && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (t.has("_config") ? (i && this.scheduleConfigRefresh(!0), this.clearHoverState()) : t.has("hass") && n && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((s = this._config) == null ? void 0 : s.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset();
    const o = t.has("_config") || t.has("_trendSeries") || t.has("_graphTopInset") || t.has("preview") || t.has("editMode") || n;
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
    const r = e.getBoundingClientRect(), n = i.getBoundingClientRect(), o = Math.max(0, Math.ceil(n.bottom - r.top));
    Math.abs(o - this._graphTopInset) > 0.5 && (this._graphTopInset = o);
  }
  maybeRefreshTrendHistory(t = !1, e = !1) {
    if (!this.shouldRunLiveRuntime() && !e || !this._isVisible && !e || e && !this.isEditorPreview())
      return;
    t && (this._lastTrendRefresh = 0);
    const i = Date.now();
    !t && i - this._lastTrendRefresh < Qn || (this._lastTrendRefresh = i, this.refreshTrendHistory(t, e));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(yc) || this.hasEditorLikeAncestor();
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
    }, mc));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(t = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(t), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Qn), this.updateComplete.then(() => {
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
    const i = this._config, r = {}, n = this.trendWindowMs(i), o = q(i.trend_data_source, "hybrid"), s = this.enabledSlots(i);
    if (s.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const l = this.perfNow(), c = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
      let u = Number.POSITIVE_INFINITY;
      const p = Date.now() - n;
      for (const E of s) {
        const C = this.slotEntityId(E, i);
        if (!C)
          continue;
        c.set(E, C);
        const b = this._trendSeries[E] ?? [];
        if (t || b.length === 0 || h.has(C)) {
          h.add(C), d.delete(C);
          continue;
        }
        if (h.has(C))
          continue;
        d.add(C);
        const g = ((a = b[b.length - 1]) == null ? void 0 : a.ts) ?? p, x = Math.max(p, g - _c);
        u = Math.min(u, x);
      }
      let _ = 0;
      const w = h.size > 0 ? await (async () => {
        const E = this.perfNow(), C = await Se(
          this.hass,
          Array.from(h),
          n,
          { dataSource: o }
        );
        return _ = this.perfNow() - E, C;
      })() : {};
      let f = 0;
      const y = d.size > 0 ? await (async () => {
        const E = this.perfNow(), C = await Se(
          this.hass,
          Array.from(d),
          n,
          {
            startMs: Number.isFinite(u) ? u : p,
            dataSource: o
          }
        );
        return f = this.perfNow() - E, C;
      })() : {};
      c.forEach((E, C) => {
        const b = this._trendSeries[C] ?? [];
        if (h.has(E)) {
          const g = w[E] ?? [];
          r[C] = g.length > 0 ? g : b.filter((x) => x.ts >= p);
          return;
        }
        if (d.has(E)) {
          const g = y[E] ?? [];
          r[C] = Bt(b, g, p);
          return;
        }
        r[C] = b.filter((g) => g.ts >= p);
      });
      const v = this.sameTrendSeriesKeys(r, this._trendSeries) && Object.keys(r).map((E) => Number(E)).filter((E) => Number.isFinite(E) && E >= 1 && E <= Ge).every((E) => {
        const C = E;
        return this.areTrendSeriesEqual(r[C] ?? [], this._trendSeries[C] ?? []);
      });
      v || (this._trendSeries = r), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - l),
        window_ms: n,
        force_full: t,
        slots: s.length,
        full_entities: h.size,
        incremental_entities: d.size,
        data_source: o,
        full_fetch_ms: this.toPerfMs(_),
        incremental_fetch_ms: this.toPerfMs(f),
        series_changed: !v
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(t) {
    const e = [];
    for (let i = 1; i <= Ge; i += 1) {
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
    if (!t || !e || this.trendWindowMs(t) !== this.trendWindowMs(e) || q(t.trend_data_source, "hybrid") !== q(e.trend_data_source, "hybrid"))
      return !0;
    for (let i = 1; i <= Ge; i += 1) {
      const r = i, n = this.slotEnabled(r, t), o = this.slotEnabled(r, e), s = n ? this.slotEntityId(r, t) : void 0, a = o ? this.slotEntityId(r, e) : void 0;
      if (n !== o || s !== a)
        return !0;
    }
    return !1;
  }
  sameTrendSeriesKeys(t, e) {
    const i = Object.keys(t).sort(), r = Object.keys(e).sort();
    return i.length === r.length && i.every((n, o) => n === r[o]);
  }
  areTrendSeriesEqual(t, e) {
    if (t.length !== e.length)
      return !1;
    for (let i = 0; i < t.length; i += 1) {
      const r = t[i], n = e[i];
      if (r.ts !== n.ts || Math.abs(r.value - n.value) > 1e-4)
        return !1;
    }
    return !0;
  }
};
ue.styles = oe`
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
ze([
  O({ attribute: !1 })
], ue.prototype, "hass", 2);
ze([
  O({ type: Boolean })
], ue.prototype, "preview", 2);
ze([
  O({ type: Boolean })
], ue.prototype, "editMode", 2);
ze([
  M()
], ue.prototype, "_config", 2);
ze([
  M()
], ue.prototype, "_trendSeries", 2);
ze([
  M()
], ue.prototype, "_graphTopInset", 2);
ze([
  M()
], ue.prototype, "_hoverState", 2);
ue = ze([
  pe("power-pilz-graph-stack-card")
], ue);
var gc = Object.defineProperty, bc = Object.getOwnPropertyDescriptor, br = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? bc(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (r ? s(e, i, n) : s(n)) || n);
  return r && n && gc(e, i, n), n;
};
const vc = [
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
let jt = class extends D {
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
    const t = R(this.hass);
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
    return !this.hass || !this._config ? k : S`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ke}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${vc}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
br([
  O({ attribute: !1 })
], jt.prototype, "hass", 2);
br([
  M()
], jt.prototype, "_config", 2);
jt = br([
  pe("power-pilz-wallbox-card-editor")
], jt);
var wc = Object.defineProperty, He = (t, e, i, r) => {
  for (var n = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = s(e, i, n) || n);
  return n && wc(e, i, n), n;
};
const xc = 0.01, to = "power-pilz-wallbox-mode-menu-portal-style", $r = class $r extends D {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._actionBusy = !1, this._modeMenuOpen = !1, this._modeMenuOptionCount = 0, this.toggleModeMenu = (e) => {
      var s;
      if (e.stopPropagation(), this.isEditorPreview() || !((s = this._config) != null && s.mode_entity) || this._actionBusy)
        return;
      const i = U(this.hass, this._config.mode_entity), r = (i == null ? void 0 : i.state) ?? "", n = this.getModeOptions(i);
      if (n.length === 0)
        return;
      if (this._modeMenuOpen) {
        this.closeModeMenuPortal();
        return;
      }
      const o = e.currentTarget;
      o && this.openModeMenuPortal(o, n, r || n[0] || "Mode");
    }, this.selectModeOption = async (e) => {
      var n;
      if (!((n = this._config) != null && n.mode_entity))
        return;
      const i = U(this.hass, this._config.mode_entity);
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
      const i = B(this.hass, this._config.power_entity), r = Nt(this.hass, this._config.status_entity), n = this.isCharging(r, i, this._config.command_entity), o = this.resolveActionCommand(n);
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
    const i = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(i), n = (...c) => c.find((h) => h in i), o = (c) => r.find((h) => h.startsWith(`${c}.`)), s = n("sensor.dev_wallbox_power", "sensor.wallbox_power") ?? o("sensor") ?? "sensor.dev_wallbox_power", a = n("input_select.dev_wallbox_mode", "select.wallbox_charging_mode") ?? o("input_select") ?? o("select"), l = n("input_boolean.dev_wallbox_enabled", "switch.wallbox_charging_enabled") ?? o("input_boolean") ?? o("switch");
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
  setConfig(e) {
    const i = e.power_entity ?? "sensor.dev_wallbox_power", r = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : 1;
    this._config = {
      ...e,
      icon: e.icon ?? "mdi:power-plug",
      name: e.name ?? m(R(this.hass), "wallbox.default_name"),
      show_mode_selector: e.show_mode_selector ?? !0,
      show_live_value: e.show_live_value ?? !0,
      show_command_button: e.show_command_button ?? !0,
      decimals: r,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: de(e.decimals_base_unit, r),
      decimals_prefixed_unit: de(e.decimals_prefixed_unit, r),
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
    const e = R(this.hass);
    if (!this._config)
      return S`<ha-card>${m(e, "common.invalid_config")}</ha-card>`;
    if (!this.hass)
      return S``;
    const i = this._config, r = B(this.hass, i.power_entity), n = V(this.hass, i.power_entity) ?? "kW", o = Nt(this.hass, i.status_entity), s = U(this.hass, i.mode_entity), a = (s == null ? void 0 : s.state) ?? "", l = this.getModeOptions(s), c = this.isCharging(o, r, i.command_entity), h = this.resolveActionCommand(c), d = c ? m(e, "wallbox.stop") : m(e, "wallbox.start"), u = c ? "mdi:pause" : "mdi:play", p = this.statusLabel(o, c), _ = this.formatPower(r, n, i.decimals ?? 1), w = this.showModeSelector(i, l), f = this.showLiveValue(i), y = this.showCommandButton(i), v = this.isEditorPreview() || this._actionBusy || !i.mode_entity || l.length === 0, E = a || l[0] || m(e, "wallbox.mode_fallback"), C = this._modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down", b = this.iconStyle(i.icon_color), x = Number(f) + Number(y) === 1, $ = w && f && y, T = x && f, z = x && y || $, P = T || z, I = f && !T, N = y && !z, j = w || I || N, Z = w ? I || N ? N ? "actions" : "actions no-command" : "actions mode-only" : "actions no-mode";
    return (!w || v) && this._modeMenuOpen && this.closeModeMenuPortal(), S`
      <ha-card>
        <div class="container">
          <div class="state-item ${P ? "compact-state" : ""}">
            <div class="icon-wrap">
              <div class="icon-shape" style=${A(b)}>
                <ha-icon .icon=${i.icon ?? "mdi:ev-station"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${i.name}</div>
              <div class="secondary">${m(e, "wallbox.ev_charger")}</div>
            </div>

            ${P ? S`
                  <div class="compact-trailing ${z ? "button-only" : ""}">
                    ${T ? S`
                          <div class="compact-live-value">
                            <span>${p}</span>
                            <span class="dot">•</span>
                            <span>${_}</span>
                          </div>
                        ` : S``}

                    ${z ? S`
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
                        ` : S``}
                  </div>
                ` : S``}
          </div>

          ${j ? S`
                <div class=${Z}>
                  ${w ? S`
                        <div class="mode-select-wrap">
                          <button
                            type="button"
                            class="mode-select"
                            ?disabled=${v}
                            @click=${this.toggleModeMenu}
                            aria-haspopup="listbox"
                            aria-expanded=${this._modeMenuOpen ? "true" : "false"}
                            title="Charging mode"
                          >
                            <span class="mode-select-label">${E}</span>
                            <ha-icon class="mode-select-chevron" .icon=${C}></ha-icon>
                          </button>
                        </div>
                      ` : S``}

                  ${I ? S`
                        <div class="live-value">
                          <span>${p}</span>
                          <span class="dot">•</span>
                          <span>${_}</span>
                        </div>
                      ` : S``}

                  ${N ? S`
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
                      ` : S``}
                </div>
              ` : S``}
        </div>
      </ha-card>
    `;
  }
  getModeOptions(e) {
    const i = e == null ? void 0 : e.attributes.options;
    if (Array.isArray(i)) {
      const r = i.filter(
        (n) => typeof n == "string" && n.trim().length > 0
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
    const r = R(this.hass);
    if (!e)
      return i ? m(r, "wallbox.status_charging") : m(r, "wallbox.status_idle");
    const o = `wallbox.status_${e.toLowerCase().replace(/[_\s-]+/g, "_")}`, s = m(r, o);
    return s !== o ? s : e.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().split(" ").map((a) => a && a.charAt(0).toLocaleUpperCase() + a.slice(1)).join(" ");
  }
  formatPower(e, i, r) {
    var o, s, a;
    const n = e === null ? null : Math.abs(e);
    return _t(n, i, r, {
      enabled: ((o = this._config) == null ? void 0 : o.auto_scale_units) === !0,
      baseDecimals: ((s = this._config) == null ? void 0 : s.decimals_base_unit) ?? r,
      prefixedDecimals: ((a = this._config) == null ? void 0 : a.decimals_prefixed_unit) ?? r,
      nullWithUnit: !0
    });
  }
  isCharging(e, i, r) {
    var n;
    if (e) {
      const o = e.toLowerCase();
      if (["charging", "active", "running", "on", "start", "started"].includes(o))
        return !0;
      if (["idle", "paused", "stopped", "off", "standby", "complete"].includes(o))
        return !1;
    }
    if (r) {
      const o = (n = Nt(this.hass, r)) == null ? void 0 : n.toLowerCase();
      if (o === "on")
        return !0;
      if (o === "off")
        return !1;
    }
    return i !== null && i > xc;
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
      const n = this.objectValue(e ? i.stop_service_data : i.start_service_data);
      return i.command_entity && n.entity_id === void 0 && (n.entity_id = i.command_entity), { ...r, data: n };
    }
    return i.command_entity ? {
      domain: this.entityDomain(i.command_entity),
      service: e ? "turn_off" : "turn_on",
      data: { entity_id: i.command_entity }
    } : null;
  }
  iconStyle(e) {
    return Ee(e);
  }
  disconnectedCallback() {
    this.closeModeMenuPortal(), super.disconnectedCallback();
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  ensureModeMenuPortalStyles() {
    if (document.getElementById(to))
      return;
    const e = document.createElement("style");
    e.id = to, e.textContent = `
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
    const n = r.getBoundingClientRect(), o = 8, s = 6, a = Math.max(96, Math.min(280, window.innerHeight - o * 2)), l = Math.min(
      a,
      this._modeMenuOptionCount * 34 + Math.max(0, this._modeMenuOptionCount - 1) * 4 + 14
    ), c = i.offsetHeight > 0 ? Math.min(a, i.offsetHeight) : l, h = Math.max(120, Math.round(n.width)), d = window.innerHeight - n.bottom - o, u = d < c + s && n.top - o > d;
    let p = n.left;
    p = Math.max(o, Math.min(p, window.innerWidth - h - o));
    let _ = u ? n.top - s - c : n.bottom + s;
    _ = Math.max(o, Math.min(_, window.innerHeight - c - o)), i.style.maxHeight = `${a}px`, i.style.width = `${h}px`, i.style.left = `${Math.round(p)}px`, i.style.top = `${Math.round(_)}px`;
  }
  openModeMenuPortal(e, i, r) {
    this.closeModeMenuPortal(), this.ensureModeMenuPortalStyles();
    const n = document.createElement("div");
    n.className = "power-pilz-mode-menu-backdrop", n.addEventListener("click", () => {
      this.closeModeMenuPortal();
    });
    const o = document.createElement("div");
    o.className = "power-pilz-mode-menu-portal", o.setAttribute("role", "listbox"), i.forEach((s) => {
      const a = document.createElement("button");
      a.type = "button", a.className = `power-pilz-mode-menu-option ${s === r ? "selected" : ""}`, a.dataset.option = s, a.setAttribute("role", "option"), a.setAttribute("aria-selected", s === r ? "true" : "false"), a.textContent = s, a.addEventListener("click", (l) => {
        var h;
        l.stopPropagation();
        const c = ((h = l.currentTarget) == null ? void 0 : h.dataset.option) ?? "";
        c && (this.closeModeMenuPortal(), this.selectModeOption(c));
      }), o.append(a);
    }), document.body.append(n), document.body.append(o), this._modeMenuBackdrop = n, this._modeMenuPortal = o, this._modeMenuOptionCount = i.length, this._modeMenuOpen = !0, this.positionModeMenuPortal(e);
  }
  closeModeMenuPortal() {
    this._modeMenuPortal && (this._modeMenuPortal.remove(), this._modeMenuPortal = void 0), this._modeMenuBackdrop && (this._modeMenuBackdrop.remove(), this._modeMenuBackdrop = void 0), this._modeMenuOptionCount = 0, this._modeMenuOpen && (this._modeMenuOpen = !1);
  }
};
$r.styles = oe`
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
let re = $r;
He([
  O({ attribute: !1 })
], re.prototype, "hass");
He([
  O({ type: Boolean })
], re.prototype, "preview");
He([
  O({ type: Boolean })
], re.prototype, "editMode");
He([
  O({ reflect: !0, type: String })
], re.prototype, "layout");
He([
  M()
], re.prototype, "_config");
He([
  M()
], re.prototype, "_actionBusy");
He([
  M()
], re.prototype, "_modeMenuOpen");
class Sc extends re {
}
customElements.get("power-pilz-wallbox-card") || customElements.define("power-pilz-wallbox-card", re);
customElements.get("power-pilz-wallbox-card-v2") || customElements.define("power-pilz-wallbox-card-v2", Sc);
var Ec = Object.defineProperty, Cc = Object.getOwnPropertyDescriptor, vr = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Cc(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (r ? s(e, i, n) : s(n)) || n);
  return r && n && Ec(e, i, n), n;
};
let Kt = class extends D {
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
    const i = R(this.hass);
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
    const t = R(this.hass);
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
    const t = R(this.hass), e = {
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
    return !this.hass || !this._config ? k : S`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ke}
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
vr([
  O({ attribute: !1 })
], Kt.prototype, "hass", 2);
vr([
  M()
], Kt.prototype, "_config", 2);
Kt = vr([
  pe("power-pilz-switch-card-editor")
], Kt);
var $c = Object.defineProperty, gt = (t, e, i, r) => {
  for (var n = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = s(e, i, n) || n);
  return n && $c(e, i, n), n;
};
const kc = 5, io = 4, Tc = {
  small: "36%",
  medium: "48%",
  large: "62%"
}, kr = class kr extends D {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this.handleSegmentTap = (e) => {
      e.stopPropagation();
      const i = e.currentTarget;
      if (!(i instanceof HTMLElement)) return;
      const r = i.dataset.option;
      r && this.selectOption(r);
    }, this.handleCardTap = () => {
      var o;
      if (!((o = this._config) != null && o.entity) || this.isEditorPreview()) return;
      const e = U(this.hass, this._config.entity);
      if (!e) return;
      const i = this.getOptions(e);
      if (i.length === 0) return;
      const n = (this.activeIndex(i, e.state) + 1) % i.length;
      this.selectOption(i[n]);
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-switch-card-editor");
  }
  static async getStubConfig(e) {
    const i = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(i), n = (s) => r.find((a) => a.startsWith(`${s}.`));
    return {
      type: "custom:power-pilz-switch-card",
      entity: n("input_select") ?? n("select") ?? "input_select.mode",
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
      name: e.name ?? m(R(this.hass), "switch.default_name")
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
    var n;
    const i = (n = e == null ? void 0 : e.attributes) == null ? void 0 : n.options;
    if (!Array.isArray(i)) return [];
    const r = i.filter(
      (o) => typeof o == "string" && o.trim().length > 0
    );
    return Array.from(new Set(r)).slice(0, kc);
  }
  activeIndex(e, i) {
    const r = e.indexOf(i);
    return r >= 0 ? r : 0;
  }
  iconStyle(e) {
    return Ee(e);
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
    const r = `state_${e + 1}_color`, n = i[r], o = me(n);
    if (o) return `rgba(${o}, 0.25)`;
    const s = me(i.slider_color);
    return s ? `rgba(${s}, 0.25)` : null;
  }
  /** Resolve segment text color for the active state index. */
  segmentActiveColor(e) {
    const i = this._config;
    if (!i) return null;
    const r = `state_${e + 1}_color`, n = i[r], o = me(n);
    if (o) return `rgb(${o})`;
    const s = me(i.slider_color);
    return s ? `rgb(${s})` : null;
  }
  /** Get custom icon for a state index, or null. */
  stateIcon(e) {
    const i = this._config;
    if (!(i != null && i.use_custom_icons)) return null;
    const r = `state_${e + 1}_icon`, n = i[r];
    return typeof n == "string" && n.length > 0 ? n : null;
  }
  segmentContent(e) {
    const i = this.stateIcon(e);
    if (i)
      return S`<ha-icon class="seg-icon" .icon=${i}></ha-icon>`;
    if (e === 0)
      return S`<span class="seg-symbol"><span class="seg-dot"></span></span>`;
    const r = Array.from({ length: e }, () => S`<span class="seg-bar"></span>`);
    return S`<span class="seg-symbol seg-bars">${r}</span>`;
  }
  // --- Slider template (shared between layouts) ---
  renderSlider(e, i, r, n) {
    return S`
      <div class="slider-track">
        <div class="slider-pill" style=${A(r)}></div>
        ${e.map(
      (o, s) => S`
            <button
              type="button"
              class="slider-segment ${s === i ? "active" : ""}"
              style=${s === i && n ? A({ color: n }) : k}
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
    var C;
    if (!this._config)
      return S`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return S``;
    const e = this._config, i = U(this.hass, e.entity), r = (i == null ? void 0 : i.state) ?? "", n = this.getOptions(i), o = this.activeIndex(n, r), s = o === 0 && e.dim_inactive_icon !== !1, a = this.iconStyle(s ? "disabled" : e.icon_color), l = n.length, c = l > 0 ? o / l * 100 : 0, h = l > 0 ? 100 / l : 100, d = (C = i == null ? void 0 : i.attributes) == null ? void 0 : C.friendly_name, u = e.subtitle || r || m(R(this.hass), "common.unknown"), p = this.resolvedCardLayout(), _ = this.resolvedSliderSize(), w = Tc[_], f = l > 1, y = this.pillColor(o), v = {
      width: `calc(${h}% - ${io * 2}px)`,
      left: `calc(${c}% + ${io}px)`
    };
    y && (v["background-color"] = y);
    const E = this.segmentActiveColor(o);
    return p === "vertical" ? S`
        <ha-card @click=${this.handleCardTap}>
          <div class="container vertical">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${A(a)}>
                  <ha-icon .icon=${e.icon ?? "mdi:toggle-switch-outline"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${e.name || d || m(R(this.hass), "switch.default_name")}</div>
                <div class="secondary">${u}</div>
              </div>
            </div>
            ${f ? S`
                  <div class="slider-row">
                    ${this.renderSlider(n, o, v, E)}
                  </div>
                ` : S``}
          </div>
        </ha-card>
      ` : S`
      <ha-card @click=${this.handleCardTap}>
        <div class="container horizontal">
          <div class="state-item">
            <div class="icon-wrap">
              <div class="icon-shape" style=${A(a)}>
                <ha-icon .icon=${e.icon ?? "mdi:toggle-switch-outline"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${e.name || d || m(R(this.hass), "switch.default_name")}</div>
              <div class="secondary">${u}</div>
            </div>
            ${f ? S`
                  <div class="slider-wrap" style=${A({ width: w })}>
                    ${this.renderSlider(n, o, v, E)}
                  </div>
                ` : S``}
          </div>
        </div>
      </ha-card>
    `;
  }
};
kr.styles = oe`
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
let ye = kr;
gt([
  O({ attribute: !1 })
], ye.prototype, "hass");
gt([
  O({ type: Boolean })
], ye.prototype, "preview");
gt([
  O({ type: Boolean })
], ye.prototype, "editMode");
gt([
  O({ reflect: !0, type: String })
], ye.prototype, "layout");
gt([
  M()
], ye.prototype, "_config");
class zc extends ye {
}
customElements.get("power-pilz-switch-card") || customElements.define("power-pilz-switch-card", ye);
customElements.get("power-pilz-switch-card-v2") || customElements.define("power-pilz-switch-card-v2", zc);
var Mc = Object.defineProperty, be = (t, e, i, r) => {
  for (var n = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = s(e, i, n) || n);
  return n && Mc(e, i, n), n;
};
const or = "power-pilz-schedule-edit-dialog", ro = [
  { key: "monday", dayIndex: 1 },
  { key: "tuesday", dayIndex: 2 },
  { key: "wednesday", dayIndex: 3 },
  { key: "thursday", dayIndex: 4 },
  { key: "friday", dayIndex: 5 },
  { key: "saturday", dayIndex: 6 },
  { key: "sunday", dayIndex: 0 }
], no = 15, Ac = 15, ve = 1440;
function oo() {
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
const Tr = class Tr extends Ce {
  constructor() {
    super(...arguments), this.scheduleEntityId = "", this._blocks = oo(), this._loading = !0, this._saving = !1, this._dirty = !1, this._handleTrackPointerDown = (e) => {
      if (e.button !== 0 || this._loading || this._loadError || e.target.closest(".pp-block")) return;
      const i = e.currentTarget, r = i.dataset.day;
      if (!r) return;
      e.preventDefault();
      try {
        i.setPointerCapture(e.pointerId);
      } catch {
      }
      const n = this._pxToMin(i, e.clientX);
      this._drag = {
        day: r,
        trackEl: i,
        pointerId: e.pointerId,
        startMin: n,
        endMin: n
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
      const r = Math.min(i.startMin, i.endMin), n = Math.max(i.startMin, i.endMin);
      if (n - r < Ac) return;
      const o = this._blocksForDay(i.day);
      o.some(
        (a) => lo(J(a.from), J(a.to), r, n)
      ) || (o.push({ from: Rt(r), to: Rt(n) }), this._setBlocksForDay(i.day, o));
    }, this._handleTrackPointerCancel = (e) => {
      if (this._drag && e.pointerId === this._drag.pointerId) {
        try {
          this._drag.trackEl.releasePointerCapture(this._drag.pointerId);
        } catch {
        }
        this._drag = void 0;
      }
    }, this._handleBlockClick = (e) => {
      e.stopPropagation();
      const i = e.currentTarget, r = i.dataset.day, n = parseInt(i.dataset.index ?? "-1", 10);
      if (!r || n < 0) return;
      const s = this._blocksForDay(r)[n];
      s && (this._editing = {
        day: r,
        index: n,
        from: sr(s.from),
        to: sr(s.to),
        dataText: s.data ? JSON.stringify(s.data, null, 2) : ""
      });
    }, this._handleEditFromChange = (e) => {
      this._updateEditingField("from", ao(e.target.value));
    }, this._handleEditToChange = (e) => {
      this._updateEditingField("to", ao(e.target.value));
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
    var i, r, n;
    const e = R(this.hass);
    try {
      const o = (r = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : r[this.scheduleEntityId];
      if (!o) {
        this._loadError = m(e, "schedule.edit_dialog.error_not_found", {
          entity: this.scheduleEntityId
        });
        return;
      }
      const s = (n = o.attributes) == null ? void 0 : n.week_blocks, a = oo();
      if (s && typeof s == "object" && !Array.isArray(s))
        for (const l of Object.keys(a)) {
          const c = s[l];
          Array.isArray(c) && (a[l] = c.filter((h) => h && typeof h == "object").map((h) => {
            const d = h, u = {
              from: String(d.from ?? "00:00:00"),
              to: String(d.to ?? "00:00:00")
            };
            return d.data && typeof d.data == "object" && !Array.isArray(d.data) && (u.data = d.data), u;
          }));
        }
      this._blocks = a;
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
        await this.hass.callService(
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
  }
  // ------------------------------------------------------------
  // Block list helpers
  // ------------------------------------------------------------
  _blocksForDay(e) {
    const i = this._blocks[e];
    return Array.isArray(i) ? [...i] : [];
  }
  _setBlocksForDay(e, i) {
    const r = Oc(i);
    this._blocks = { ...this._blocks, [e]: r }, this._dirty = !0;
  }
  // ------------------------------------------------------------
  // Drag-to-create interaction
  // ------------------------------------------------------------
  _pxToMin(e, i) {
    const r = e.getBoundingClientRect(), n = (i - r.left) / r.width, o = Math.max(0, Math.min(ve, Math.round(n * ve)));
    return Math.round(o / no) * no;
  }
  _updateEditingField(e, i) {
    this._editing && (this._editing = { ...this._editing, [e]: i, error: void 0, dataError: void 0 });
  }
  _saveBlockEdit() {
    if (!this._editing) return;
    const e = R(this.hass), { day: i, index: r, from: n, to: o, dataText: s } = this._editing, a = J(n), l = J(o);
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
        const _ = JSON.parse(h);
        if (typeof _ != "object" || _ === null || Array.isArray(_))
          throw new Error("not an object");
        c = _;
      } catch {
        this._editing = {
          ...this._editing,
          dataError: m(e, "schedule.edit_dialog.err_data")
        };
        return;
      }
    const d = this._blocksForDay(i);
    if (d.some(
      (_, w) => w !== r && lo(J(_.from), J(_.to), a, l)
    )) {
      this._editing = { ...this._editing, error: m(e, "schedule.edit_dialog.err_overlap") };
      return;
    }
    const p = {
      from: Rt(a, n),
      to: Rt(l, o)
    };
    c && (p.data = c), d[r] = p, this._setBlocksForDay(i, d), this._editing = void 0;
  }
  _deleteEditingBlock() {
    if (!this._editing) return;
    const { day: e, index: i } = this._editing, r = this._blocksForDay(e).filter((n, o) => o !== i);
    this._setBlocksForDay(e, r), this._editing = void 0;
  }
  _cancelBlockEdit() {
    this._editing = void 0;
  }
  // ------------------------------------------------------------
  // Title resolution
  // ------------------------------------------------------------
  _resolveTitle() {
    var i, r, n, o;
    if (this.dialogTitle) return this.dialogTitle;
    const e = R(this.hass);
    return ((o = (n = (r = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : r[this.scheduleEntityId]) == null ? void 0 : n.attributes) == null ? void 0 : o.friendly_name) ?? m(e, "schedule.edit_dialog.default_title");
  }
  willUpdate() {
    const e = this._resolveTitle();
    this.dialogTitle !== e && !this.dialogTitle && (this.dialogTitle = e);
  }
  // ------------------------------------------------------------
  // Render hooks (consumed by PowerPilzDialogBase)
  // ------------------------------------------------------------
  renderBody() {
    const e = R(this.hass);
    return this._loading ? S`<div class="msg">${m(e, "common.loading") || "Loading…"}</div>` : this._loadError ? S`<div class="msg error">${this._loadError}</div>` : S`
      <div class="editor">
        <div class="hour-header">
          <div class="day-col"></div>
          <div class="hour-labels">
            ${[0, 6, 12, 18, 24].map(
      (i) => S`<span style=${A({ left: `${i / 24 * 100}%` })}>${String(i).padStart(2, "0")}</span>`
    )}
          </div>
        </div>
        ${ro.map((i) => this._renderDayRow(i.key, i.dayIndex, e))}
        <div class="hint">${m(e, "schedule.edit_dialog.hint_v2")}</div>
      </div>
    `;
  }
  renderFooter() {
    const e = R(this.hass);
    return S`
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
    var n;
    if (!this._editing) return k;
    const e = R(this.hass), i = this._editing, r = ft(
      e,
      ((n = ro.find((o) => o.key === i.day)) == null ? void 0 : n.dayIndex) ?? 0
    );
    return S`
      <div class="inner-backdrop" @click=${this._cancelBlockEdit}>
        <div class="inner-dialog" @click=${(o) => o.stopPropagation()}>
          <header>
            <h3>
              ${m(e, "schedule.edit_dialog.block_title", { day: r })}
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
              ${i.dataError ? S`<span class="err">${i.dataError}</span>` : k}
            </label>
            ${i.error ? S`<div class="err">${i.error}</div>` : k}
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
  _renderDayRow(e, i, r) {
    var s;
    const n = this._blocksForDay(e);
    let o = k;
    if (((s = this._drag) == null ? void 0 : s.day) === e) {
      const a = Math.min(this._drag.startMin, this._drag.endMin), l = Math.max(this._drag.startMin, this._drag.endMin);
      if (l > a) {
        const c = a / ve * 100, h = (l - a) / ve * 100;
        o = S`
          <div
            class="pp-block ghost"
            style=${A({ left: `${c}%`, width: `${h}%` })}
          >
            <span class="pp-block-label">
              ${so(a)}–${so(l)}
            </span>
          </div>
        `;
      }
    }
    return S`
      <div class="day-row">
        <div class="day-col">${ft(r, i)}</div>
        <div
          class="day-track"
          data-day=${e}
          @pointerdown=${this._handleTrackPointerDown}
          @pointermove=${this._handleTrackPointerMove}
          @pointerup=${this._handleTrackPointerUp}
          @pointercancel=${this._handleTrackPointerCancel}
        >
          ${n.map((a, l) => {
      const c = J(a.from), h = J(a.to), d = c / ve * 100, u = (h - c) / ve * 100;
      return S`
              <div
                class="pp-block"
                data-day=${e}
                data-index=${l}
                style=${A({ left: `${d}%`, width: `${u}%` })}
                @click=${this._handleBlockClick}
                title="${a.from.slice(0, 5)}–${a.to.slice(0, 5)}"
              >
                <span class="pp-block-label">${a.from.slice(0, 5)}–${a.to.slice(0, 5)}</span>
              </div>
            `;
    })}
          ${o}
        </div>
      </div>
    `;
  }
};
Tr.styles = [
  Ce.styles,
  oe`
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
let ee = Tr;
be([
  O({ attribute: !1 })
], ee.prototype, "hass");
be([
  O({ type: String })
], ee.prototype, "scheduleEntityId");
be([
  M()
], ee.prototype, "_blocks");
be([
  M()
], ee.prototype, "_loading");
be([
  M()
], ee.prototype, "_loadError");
be([
  M()
], ee.prototype, "_saving");
be([
  M()
], ee.prototype, "_dirty");
be([
  M()
], ee.prototype, "_drag");
be([
  M()
], ee.prototype, "_editing");
function J(t) {
  if (!t || typeof t != "string") return 0;
  const e = t.split(":"), i = parseInt(e[0] ?? "0", 10), r = parseInt(e[1] ?? "0", 10), n = parseInt(e[2] ?? "0", 10);
  return isNaN(i) || isNaN(r) ? 0 : i * 60 + r + (isNaN(n) ? 0 : n / 60);
}
function Rt(t, e) {
  const i = Math.max(0, Math.min(ve, t)), r = Math.floor(i / 60), n = Math.floor(i % 60);
  let o = 0;
  if (e) {
    const s = e.split(":"), a = parseInt(s[2] ?? "0", 10);
    isNaN(a) || (o = a);
  }
  return r === 24 && n === 0 && o === 0 ? "24:00:00" : `${String(r).padStart(2, "0")}:${String(n).padStart(2, "0")}:${String(o).padStart(2, "0")}`;
}
function so(t) {
  const e = Math.max(0, Math.min(ve, t)), i = Math.floor(e / 60), r = e % 60;
  return `${String(i).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function sr(t) {
  if (!t) return "00:00:00";
  const e = t.split(":"), i = (e[0] ?? "00").padStart(2, "0"), r = (e[1] ?? "00").padStart(2, "0"), n = (e[2] ?? "00").padStart(2, "0");
  return `${i}:${r}:${n}`;
}
function ao(t) {
  return sr(t);
}
function lo(t, e, i, r) {
  return t < r && i < e;
}
function Oc(t) {
  const e = t.map((r) => ({
    from: r.from,
    to: r.to,
    data: r.data,
    s: J(r.from),
    e: J(r.to)
  })).filter((r) => r.e > r.s).sort((r, n) => r.s - n.s), i = [];
  for (const r of e) {
    const n = i[i.length - 1], o = !!r.data || !!(n != null && n.data);
    n && !o && J(n.to) >= r.s ? J(n.to) < r.e && (n.to = r.to) : i.push({
      from: r.from,
      to: r.to,
      ...r.data ? { data: r.data } : {}
    });
  }
  return i;
}
customElements.get(or) || customElements.define(or, ee);
function Pc(t) {
  if (!t.scheduleEntityId) return;
  const e = document.createElement(or);
  e.hass = t.hass, e.scheduleEntityId = t.scheduleEntityId, t.title && (e.dialogTitle = t.title), document.body.appendChild(e);
}
var Rc = Object.defineProperty, Ic = Object.getOwnPropertyDescriptor, wr = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Ic(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (r ? s(e, i, n) : s(n)) || n);
  return r && n && Rc(e, i, n), n;
};
let Gt = class extends D {
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
      long_press_opens_editor: t.long_press_opens_editor ?? !0,
      type: "custom:power-pilz-schedule-card"
    };
  }
  buildSchema() {
    const t = R(this.hass);
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
    const t = R(this.hass);
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
    const t = R(this.hass);
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
    return !this.hass || !this._config ? k : S`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ke}
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
wr([
  O({ attribute: !1 })
], Gt.prototype, "hass", 2);
wr([
  M()
], Gt.prototype, "_config", 2);
Gt = wr([
  pe("power-pilz-schedule-card-editor")
], Gt);
var Lc = Object.defineProperty, Be = (t, e, i, r) => {
  for (var n = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = s(e, i, n) || n);
  return n && Lc(e, i, n), n;
};
const co = "powerpilz-schedule-edit", ho = [
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
], zr = class zr extends D {
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
      const r = U(this.hass, i);
      if (!r) return;
      const n = ((c = r.attributes) == null ? void 0 : c.options) ?? [];
      if (n.length === 0) return;
      const s = (n.indexOf(r.state) + 1) % n.length, a = n[s], l = i.split(".")[0];
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
      entity: Object.keys(i).find((o) => {
        var a;
        if (!o.startsWith("select.")) return !1;
        const s = (a = i[o]) == null ? void 0 : a.attributes;
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
      name: e.name ?? m(R(this.hass), "schedule.default_name"),
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
    var r, n, o, s;
    const e = this._scheduleEntityId;
    if (!e) return;
    const i = (s = (o = (n = (r = this.hass) == null ? void 0 : r.states) == null ? void 0 : n[e]) == null ? void 0 : o.attributes) == null ? void 0 : s.target_entity;
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
    const i = !!((l = (a = this._config) == null ? void 0 : a.hold_action) != null && l.action) && this._config.hold_action.action !== "none", r = ((c = this._config) == null ? void 0 : c.long_press_opens_editor) !== !1 && !((d = (h = this._config) == null ? void 0 : h.hold_action) != null && d.action), n = i || r, o = !!((u = this._config) != null && u.double_tap_action) && this._config.double_tap_action.action !== void 0 && this._config.double_tap_action.action !== "none";
    this._actionCleanup = mt(
      e,
      {
        onTap: () => this._fireAction("tap"),
        onHold: () => this._fireAction("hold"),
        onDoubleTap: () => this._fireAction("double_tap")
      },
      { hasHold: n, hasDoubleTap: o }
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
    if (e === "hold" && (!r || !r.action) && this._config.long_press_opens_editor !== !1 && (r = { action: co }), !(!r || !r.action || r.action === "none")) {
      if (r.action === co) {
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
    !e || !this.hass || Pc({ hass: this.hass, scheduleEntityId: e });
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
    return Ee(e);
  }
  _weekBlocks() {
    var n, o, s;
    const e = this._scheduleEntityId;
    if (!e) return {};
    const i = (s = (o = (n = this.hass) == null ? void 0 : n.states) == null ? void 0 : o[e]) == null ? void 0 : s.attributes, r = i == null ? void 0 : i.week_blocks;
    return r && typeof r == "object" && !Array.isArray(r) ? r : {};
  }
  dayKey(e) {
    return ho[e] ?? "monday";
  }
  blocksForDay(e) {
    const r = this._weekBlocks()[this.dayKey(e)];
    return Array.isArray(r) ? r : [];
  }
  timeToMinutes(e) {
    const i = (e || "").split(":"), r = parseInt(i[0] ?? "0", 10), n = parseInt(i[1] ?? "0", 10);
    return (isNaN(r) ? 0 : r) * 60 + (isNaN(n) ? 0 : n);
  }
  nowMinutes() {
    const e = /* @__PURE__ */ new Date();
    return e.getHours() * 60 + e.getMinutes();
  }
  resolvedTimeWindow() {
    var s;
    const e = ((s = this._config) == null ? void 0 : s.time_window) ?? "24";
    if (e === "24") return { start: 0, end: 1440 };
    const i = e === "12" ? 360 : 180, r = this.nowMinutes(), n = Math.max(0, r - i), o = Math.min(1440, r + i);
    return { start: n, end: o };
  }
  resolvedActiveColor() {
    var i;
    const e = me((i = this._config) == null ? void 0 : i.active_color);
    return e ? `rgb(${e})` : "var(--primary-color, rgb(3, 169, 244))";
  }
  resolvedActiveColorAlpha(e) {
    var r;
    const i = me((r = this._config) == null ? void 0 : r.active_color);
    return i ? `rgba(${i}, ${e})` : `rgba(var(--rgb-primary-color, 3, 169, 244), ${e})`;
  }
  isDeviceOn() {
    var a, l, c;
    const e = this.modeValue().toLowerCase();
    if (e === "on") return !0;
    if (e === "off") return !1;
    const i = this._scheduleEntityId, r = i ? (c = (l = (a = this.hass) == null ? void 0 : a.states) == null ? void 0 : l[i]) == null ? void 0 : c.attributes : void 0;
    if (typeof (r == null ? void 0 : r.schedule_active) == "boolean")
      return r.schedule_active;
    const n = (/* @__PURE__ */ new Date()).getDay(), o = this.blocksForDay(n), s = this.nowMinutes();
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
    const i = U(this.hass, e), r = (i == null ? void 0 : i.state) ?? "auto", n = (o = i == null ? void 0 : i.attributes) == null ? void 0 : o.mode_names;
    if (n && typeof n == "object") {
      for (const [s, a] of Object.entries(n))
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
      const n = U(this.hass, i), o = (r = n == null ? void 0 : n.attributes) == null ? void 0 : r.mode_names;
      if (o && typeof o == "object") {
        const s = o[e.toLowerCase()];
        if (typeof s == "string" && s) return s;
      }
    }
    return e;
  }
  // --- Render ---
  renderTimeline() {
    const e = this._config, { start: i, end: r } = this.resolvedTimeWindow(), n = r - i, o = this.blocksForDay(this._selectedDay), s = this.resolvedActiveColor(), a = this.resolvedActiveColorAlpha(0.3);
    this._tick;
    const l = this.nowMinutes(), c = this._selectedDay === (/* @__PURE__ */ new Date()).getDay(), h = e.show_now_indicator !== !1 && c && l >= i && l <= r, d = e.show_time_labels !== !1, u = [];
    if (d) {
      const p = Math.ceil(i / 60), _ = Math.floor(r / 60), w = n > 720 ? 6 : n > 360 ? 3 : 2;
      for (let f = p; f <= _; f += w) {
        const y = f * 60;
        y >= i && y <= r && u.push({ hour: f >= 24 ? 0 : f, pct: (y - i) / n * 100 });
      }
    }
    return S`
      <div class="timeline-container">
        ${d ? S`
              <div class="time-labels">
                ${u.map(
      (p) => S`<span class="time-label" style=${A({ left: `${p.pct}%` })}>${String(p.hour).padStart(2, "0")}</span>`
    )}
              </div>
            ` : k}
        <div class="timeline-track">
          ${o.map((p) => {
      const _ = this.timeToMinutes(p.from), w = this.timeToMinutes(p.to), f = Math.max(_, i), y = Math.min(w, r);
      if (y <= f) return k;
      const v = (f - i) / n * 100, E = (y - f) / n * 100;
      return S`
              <div
                class="timeline-block"
                style=${A({
        left: `${v}%`,
        width: `${E}%`,
        "background-color": a
      })}
              ></div>
            `;
    })}
          ${h ? S`
                <div
                  class="now-indicator"
                  style=${A({
      left: `${(l - i) / n * 100}%`,
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
    return S`
      <div class="day-selector">
        ${ho.map((i, r) => S`
          <button
            type="button"
            class="day-btn ${r === this._selectedDay ? "active" : ""} ${r === e ? "today" : ""}"
            data-day=${r}
            @click=${this.handleDaySelect}
          >
            ${ft(R(this.hass), r)}
          </button>
        `)}
      </div>
    `;
  }
  renderModeButton() {
    const e = this.modeValue(), i = e.toLowerCase(), r = i === "on" ? "mdi:power" : i === "off" ? "mdi:power-off" : "mdi:clock-outline", n = this.modeLabel(e);
    return S`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${e}">
        <ha-icon .icon=${r}></ha-icon>
        <span class="mode-label">${n}</span>
      </button>
    `;
  }
  render() {
    var d, u;
    if (!this._config) return S`<ha-card>${m(R(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return S``;
    if (!this._scheduleEntityId) {
      const p = R(this.hass);
      return S`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:clock-outline"></ha-icon>
            <div class="placeholder-text">${m(p, "schedule.placeholder_companion")}</div>
          </div>
        </ha-card>
      `;
    }
    const e = this._config, i = (u = (d = U(this.hass, this._scheduleEntityId)) == null ? void 0 : d.attributes) == null ? void 0 : u.friendly_name, r = this.modeValue(), n = e.subtitle || this.modeLabel(r), o = e.show_day_selector !== !1, s = e.show_mode_control !== !1 && !!this._modeEntityId, a = e.card_layout === "vertical", c = this.isDeviceOn() ? this.iconStyle(e.icon_color) : this.iconStyle("disabled"), h = S`
      <div class="state-item">
        <div class="icon-wrap">
          <div class="icon-shape" style=${A(c)}>
            <ha-icon .icon=${e.icon ?? "mdi:clock-outline"}></ha-icon>
          </div>
        </div>
        <div class="info">
          <div class="primary">${e.name || i || m(R(this.hass), "schedule.default_name")}</div>
          <div class="secondary">${n}</div>
        </div>
        ${s ? this.renderModeButton() : k}
      </div>
    `;
    return S`
      <ha-card>
        <div class="container ${a ? "vertical" : "horizontal"}">
          <div class="row row-header">${h}</div>
          ${o ? S`<div class="row row-days">${this.renderDaySelector()}</div>` : k}
          <div class="row row-timeline">${this.renderTimeline()}</div>
        </div>
      </ha-card>
    `;
  }
};
zr.styles = oe`
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
let ne = zr;
Be([
  O({ attribute: !1 })
], ne.prototype, "hass");
Be([
  O({ type: Boolean })
], ne.prototype, "preview");
Be([
  O({ type: Boolean })
], ne.prototype, "editMode");
Be([
  O({ reflect: !0, type: String })
], ne.prototype, "layout");
Be([
  M()
], ne.prototype, "_config");
Be([
  M()
], ne.prototype, "_selectedDay");
Be([
  M()
], ne.prototype, "_tick");
class Nc extends ne {
}
customElements.get("power-pilz-schedule-card") || customElements.define("power-pilz-schedule-card", ne);
customElements.get("power-pilz-schedule-card-v2") || customElements.define("power-pilz-schedule-card-v2", Nc);
var Dc = Object.defineProperty, Hc = Object.getOwnPropertyDescriptor, xr = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Hc(e, i) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = (r ? s(e, i, n) : s(n)) || n);
  return r && n && Dc(e, i, n), n;
};
let Yt = class extends D {
  constructor() {
    super(...arguments), this.computeLabel = (t) => this.labelMap()[t.name ?? ""] ?? t.name ?? "", this.computeHelper = (t) => this.helperMap()[t.name ?? ""], this.valueChanged = (t) => {
      const e = t.target;
      if (!(e instanceof HTMLElement) || e.tagName !== "HA-FORM") return;
      const i = t.detail.value;
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
  setConfig(t) {
    const e = t.use_companion !== void 0 ? t.use_companion !== !1 : !t.switch_entity;
    this._config = {
      ...t,
      use_companion: e,
      type: "custom:power-pilz-timer-card"
    };
  }
  buildSchema() {
    var r;
    const t = R(this.hass), e = ((r = this._config) == null ? void 0 : r.use_companion) !== !1;
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
    const t = R(this.hass);
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
    const t = R(this.hass);
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
    return !this.hass || !this._config ? k : S`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ke}
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
xr([
  O({ attribute: !1 })
], Yt.prototype, "hass", 2);
xr([
  M()
], Yt.prototype, "_config", 2);
Yt = xr([
  pe("power-pilz-timer-card-editor")
], Yt);
var Bc = Object.defineProperty, X = (t, e, i, r) => {
  for (var n = void 0, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (n = s(e, i, n) || n);
  return n && Bc(e, i, n), n;
};
const uo = "power-pilz-timer-picker-portal-style", It = "powerpilz_companion";
function po(t) {
  const e = new Date(t.includes("T") ? t : t.replace(" ", "T"));
  return isNaN(e.getTime()) ? null : e;
}
const Mr = class Mr extends D {
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
    const i = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(i), n = r.find((s) => {
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
  setConfig(e) {
    const i = e.use_companion !== void 0 ? e.use_companion !== !1 : !e.switch_entity;
    this._config = {
      ...e,
      use_companion: i,
      icon: e.icon ?? "mdi:timer-outline",
      name: e.name ?? m(R(this.hass), "timer.default_name")
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
    const e = (n = (r = this.hass) == null ? void 0 : r.states) == null ? void 0 : n[this._config.companion_entity ?? ""], i = (o = e == null ? void 0 : e.attributes) == null ? void 0 : o.target_entity;
    return typeof i == "string" ? i : void 0;
  }
  _companionAttr(e) {
    var r, n, o, s, a;
    const i = (r = this._config) == null ? void 0 : r.companion_entity;
    if (i)
      return (a = (s = (o = (n = this.hass) == null ? void 0 : n.states) == null ? void 0 : o[i]) == null ? void 0 : s.attributes) == null ? void 0 : a[e];
  }
  _getOnDatetime() {
    var e, i;
    if (((e = this._config) == null ? void 0 : e.use_companion) !== !1) {
      const r = this._companionAttr("on_datetime");
      return typeof r == "string" ? po(r) : null;
    }
    return this.parseDatetime((i = this._config) == null ? void 0 : i.on_datetime_entity);
  }
  _getOffDatetime() {
    var e, i;
    if (((e = this._config) == null ? void 0 : e.use_companion) !== !1) {
      const r = this._companionAttr("off_datetime");
      return typeof r == "string" ? po(r) : null;
    }
    return this.parseDatetime((i = this._config) == null ? void 0 : i.off_datetime_entity);
  }
  _direction() {
    var e, i;
    if (((e = this._config) == null ? void 0 : e.use_companion) !== !1) {
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
    const e = this._companionAttr("state_icons");
    if (!e || typeof e != "object") return;
    const i = this.isActive() ? "active" : "inactive", r = e[i];
    return typeof r == "string" && r ? r : void 0;
  }
  _companionStateName() {
    var n;
    if (((n = this._config) == null ? void 0 : n.use_companion) === !1) return;
    const e = this._companionAttr("state_names");
    if (!e || typeof e != "object") return;
    const i = this.isActive() ? "active" : "inactive", r = e[i];
    return typeof r == "string" && r ? r : void 0;
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
    var n, o, s, a;
    if (((n = this._config) == null ? void 0 : n.use_companion) === !1) return !1;
    const e = this._switchEntityId;
    if (!e) return !1;
    const i = (s = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : s[e], r = (a = i == null ? void 0 : i.attributes) == null ? void 0 : a.options;
    return Array.isArray(r) && r.length > 0 && (e.startsWith("select.") || e.startsWith("input_select."));
  }
  /** Resolve a stored option value (logical key or display name) into
   *  the user-facing display name using the target's option list.
   *  Falls back to the value itself if not found. */
  _resolveOptionLabel(e) {
    var r;
    return e ? ((r = this._targetOptions().find((n) => n.value === e)) == null ? void 0 : r.label) ?? e : "";
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
    const r = (a = i.attributes) == null ? void 0 : a.options;
    if (!Array.isArray(r)) return [];
    const n = (l = i.attributes) == null ? void 0 : l.mode_names;
    if (n && typeof n == "object" && !Array.isArray(n)) {
      const c = /* @__PURE__ */ new Map();
      for (const [h, d] of Object.entries(n))
        typeof d == "string" && c.set(d, h);
      return r.map((h) => ({
        value: c.get(h) ?? h,
        label: h
      }));
    }
    return r.map((c) => ({
      value: c,
      label: c
    }));
  }
  _resolvedIcon() {
    var e;
    return this._companionStateIcon() ?? ((e = this._config) == null ? void 0 : e.icon) ?? "mdi:timer-outline";
  }
  async _writeOnDatetime(e, i) {
    var n, o;
    if (((n = this._config) == null ? void 0 : n.use_companion) !== !1) {
      const s = (o = this._config) == null ? void 0 : o.companion_entity;
      if (!s) return;
      const a = {
        entity_id: s,
        on: e
      };
      i !== void 0 && (a.on_option = i), await this.hass.callService(It, "set_timer", a);
      return;
    }
    const r = this._config.on_datetime_entity;
    r && await this.hass.callService(r.split(".")[0], "set_datetime", {
      entity_id: r,
      datetime: e
    });
  }
  async _writeOffDatetime(e, i) {
    var n, o;
    if (((n = this._config) == null ? void 0 : n.use_companion) !== !1) {
      const s = (o = this._config) == null ? void 0 : o.companion_entity;
      if (!s) return;
      const a = {
        entity_id: s,
        off: e
      };
      i !== void 0 && (a.off_option = i), await this.hass.callService(It, "set_timer", a);
      return;
    }
    const r = this._config.off_datetime_entity;
    r && await this.hass.callService(r.split(".")[0], "set_datetime", {
      entity_id: r,
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
    var i, r;
    if (((i = this._config) == null ? void 0 : i.use_companion) === !1) return;
    const e = (r = this._config) == null ? void 0 : r.companion_entity;
    e && await this.hass.callService(It, "set_timer", {
      entity_id: e,
      on: ""
    });
  }
  /** Clear the off-boundary so it won't fire on the next activation.
   *  See `_clearOnDatetime` for the manual-mode caveat. */
  async _clearOffDatetime() {
    var i, r;
    if (((i = this._config) == null ? void 0 : i.use_companion) === !1) return;
    const e = (r = this._config) == null ? void 0 : r.companion_entity;
    e && await this.hass.callService(It, "set_timer", {
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
    if (document.getElementById(uo)) return;
    const e = document.createElement("style");
    e.id = uo, e.textContent = `
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
    const e = R(this.hass);
    if (this._portal.replaceChildren(), this._confirmingCancel) {
      const b = document.createElement("div");
      b.className = "pp-label", b.textContent = m(e, "timer.cancel_title"), this._portal.append(b);
      const g = document.createElement("div");
      g.className = "pp-hint", g.textContent = m(e, "timer.cancel_hint"), this._portal.append(g);
      const x = document.createElement("div");
      x.className = "pp-actions";
      const $ = document.createElement("button");
      $.type = "button", $.className = "pp-act cancel", $.textContent = m(e, "timer.keep_timer"), $.addEventListener("click", () => this.handleDismissConfirm()), x.append($);
      const T = document.createElement("button");
      T.type = "button", T.className = "pp-act danger", T.textContent = m(e, "timer.cancel_timer"), T.addEventListener("click", () => {
        this.handleConfirmCancel();
      }), x.append(T), this._portal.append(x);
      return;
    }
    const i = this._targetHasOptions() ? this._resolveOptionLabel(this._pickOnOption) || this._onOptionLabel() : this._onOptionLabel(), r = this._targetHasOptions() ? this._resolveOptionLabel(this._pickOffOption) || this._offOptionLabel() : this._offOptionLabel(), n = i ? m(e, "timer.set_to_at", { option: i }) : m(e, "timer.turn_on_at"), o = r ? m(e, "timer.set_to_at", { option: r }) : m(e, "timer.turn_off_at_optional"), s = this._pickingOn ? n : o, a = this._pickingOn && this._hasOffSupport() && this._hasOnSupport(), l = this._pickingOff && this._hasOnSupport() && this._hasOffSupport() && !this._skippedOn, c = this._pickingOn ? r ? m(e, "timer.only_option", { option: r }) : m(e, "timer.only_off") : i ? m(e, "timer.only_option", { option: i }) : m(e, "timer.only_on"), h = this._pickingOn ? this.handleSkipOn : this.handleSkipOff, d = a || l, u = this._pickingOn ? this.handleSetOn : this.handleSetOff, p = this.next7Days(), _ = Array.from({ length: 24 }, (b, g) => g), w = document.createElement("div");
    w.className = "pp-label", w.textContent = s, this._portal.append(w);
    const f = document.createElement("div");
    f.className = "pp-days", p.forEach((b) => {
      const g = document.createElement("button");
      g.type = "button", g.className = `pp-day-btn ${b.day === this._pickDay ? "active" : ""}`, g.textContent = b.label, g.addEventListener("click", () => {
        this._pickDay = b.day, this.renderPortalContent();
      }), f.append(g);
    }), this._portal.append(f);
    const y = document.createElement("div");
    if (y.className = "pp-hours", _.forEach((b) => {
      const g = document.createElement("button");
      g.type = "button", g.className = `pp-hour-btn ${b === this._pickHour ? "active" : ""}`, g.textContent = String(b).padStart(2, "0"), g.addEventListener("click", () => {
        this._pickHour = b, this.renderPortalContent();
      }), y.append(g);
    }), this._portal.append(y), this._targetHasOptions()) {
      const b = document.createElement("div");
      b.className = "pp-option-row";
      const g = document.createElement("span");
      g.className = "pp-option-label", g.textContent = m(e, "timer.mode_label"), b.append(g);
      const x = document.createElement("select");
      x.className = "pp-option-select";
      const $ = this._pickingOn ? this._pickOnOption : this._pickOffOption;
      for (const T of this._targetOptions()) {
        const z = document.createElement("option");
        z.value = T.value, z.textContent = T.label, T.value === $ && (z.selected = !0), x.append(z);
      }
      x.addEventListener("change", () => {
        this._pickingOn ? this._pickOnOption = x.value : this._pickOffOption = x.value, this.renderPortalContent();
      }), b.append(x), this._portal.append(b);
    }
    const v = document.createElement("div");
    v.className = "pp-actions";
    const E = document.createElement("button");
    if (E.type = "button", E.className = "pp-act cancel", E.textContent = m(e, "common.cancel"), E.addEventListener("click", () => this.handleCancelPick()), v.append(E), d) {
      const b = document.createElement("button");
      b.type = "button", b.className = "pp-act skip", b.textContent = c, b.addEventListener("click", () => {
        h();
      }), v.append(b);
    }
    const C = document.createElement("button");
    C.type = "button", C.className = "pp-act confirm", C.textContent = m(e, "common.set"), C.addEventListener("click", () => {
      u();
    }), v.append(C), this._portal.append(v);
  }
  positionPortal() {
    var p;
    const e = this._portal;
    if (!e) return;
    const i = (p = this.renderRoot) == null ? void 0 : p.querySelector("ha-card");
    if (!i) return;
    const r = i.getBoundingClientRect(), n = 8, o = 8;
    e.style.visibility = "hidden", e.style.left = "0", e.style.top = "0", e.style.width = `${Math.max(280, r.width)}px`;
    const s = e.offsetHeight, a = e.offsetWidth, l = window.innerHeight - r.bottom - n, c = r.top - n, h = l < s + o && c > l;
    let d = r.left;
    d = Math.max(n, Math.min(d, window.innerWidth - a - n));
    let u = h ? r.top - o - s : r.bottom + o;
    u = Math.max(n, Math.min(u, window.innerHeight - s - n)), e.style.left = `${Math.round(d)}px`, e.style.top = `${Math.round(u)}px`, e.style.visibility = "visible";
  }
  // --- Helpers ---
  isEditorPreview() {
    return this.preview || this.editMode;
  }
  isActive() {
    var e;
    return ((e = U(this.hass, this._activeEntityId)) == null ? void 0 : e.state) === "on";
  }
  switchIsOn() {
    var e;
    return ((e = U(this.hass, this._switchEntityId)) == null ? void 0 : e.state) === "on";
  }
  parseDatetime(e) {
    if (!e) return null;
    const i = U(this.hass, e);
    if (!i) return null;
    const r = i.attributes, n = r == null ? void 0 : r.year, o = r == null ? void 0 : r.month, s = r == null ? void 0 : r.day, a = r == null ? void 0 : r.hour, l = r == null ? void 0 : r.minute;
    if (typeof n == "number" && typeof o == "number" && typeof s == "number") {
      const h = new Date(n, o - 1, s, a ?? 0, l ?? 0, 0, 0);
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
    const i = R(this.hass), r = ft(i, e.getDay()), n = String(e.getHours()).padStart(2, "0"), o = String(e.getMinutes()).padStart(2, "0");
    return `${r} ${n}:${o}`;
  }
  timeUntil(e) {
    const i = R(this.hass), r = e.getTime() - Date.now();
    if (r <= 0) return m(i, "timer.time_now");
    const n = Math.floor(r / 36e5), o = Math.floor(r % 36e5 / 6e4);
    if (n > 24) {
      const s = Math.floor(n / 24);
      return m(i, "timer.time_in_dh", { d: s, h: n % 24 });
    }
    return n > 0 ? m(i, "timer.time_in_hm", { h: n, m: o }) : m(i, "timer.time_in_m", { m: o });
  }
  next7Days() {
    const e = R(this.hass), i = [], r = /* @__PURE__ */ new Date();
    for (let n = 0; n < 7; n++) {
      const o = new Date(r);
      o.setDate(o.getDate() + n), o.setHours(0, 0, 0, 0);
      const s = n === 0 ? m(e, "common.today") : n === 1 ? m(e, "common.tomorrow") : ft(e, o.getDay());
      i.push({ day: n, label: s, date: o });
    }
    return i;
  }
  buildDatetime(e, i) {
    const r = /* @__PURE__ */ new Date();
    r.setDate(r.getDate() + e), r.setHours(i, 0, 0, 0);
    const n = r.getFullYear(), o = String(r.getMonth() + 1).padStart(2, "0"), s = String(r.getDate()).padStart(2, "0");
    return `${n}-${o}-${s} ${String(i).padStart(2, "0")}:00:00`;
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
    const r = R(this.hass), n = this._companionStateName();
    if (!e)
      return n ?? (i ? m(r, "common.on") : m(r, "common.off"));
    const o = this._getOnDatetime(), s = this._getOffDatetime(), a = [];
    o && a.push(m(r, "timer.subtitle_on", { time: this.formatDatetime(o) })), s && a.push(m(r, "timer.subtitle_off", { time: this.formatDatetime(s) }));
    const l = a.join(" → ");
    return n && l ? `${n} · ${l}` : n || l || m(r, "timer.timer_active");
  }
  render() {
    var c, h, d, u;
    const e = R(this.hass);
    if (!this._config) return S`<ha-card>${m(e, "common.invalid_config")}</ha-card>`;
    if (!this.hass) return S``;
    if (!this._activeEntityId) {
      const p = this._config.use_companion !== !1 ? m(e, "timer.placeholder_companion") : m(e, "timer.placeholder_manual");
      return S`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:timer-outline"></ha-icon>
            <div class="placeholder-text">${p}</div>
          </div>
        </ha-card>
      `;
    }
    const i = this._config, r = this.isActive(), n = this.switchIsOn(), o = Ee(n ? i.icon_color : "disabled"), s = ((h = (c = U(this.hass, this._switchEntityId)) == null ? void 0 : c.attributes) == null ? void 0 : h.friendly_name) ?? ((u = (d = U(this.hass, this._activeEntityId)) == null ? void 0 : d.attributes) == null ? void 0 : u.friendly_name), a = i.subtitle || this.buildSubtitle(r, n), l = m(e, "timer.default_name");
    return S`
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
            ${r ? S`
                  <button type="button" class="action-btn active" @click=${this.handleBadgeClick} title=${m(e, "timer.cancel_timer")}>
                    <ha-icon icon="mdi:timer-sand"></ha-icon>
                    <span>${m(e, "common.active")}</span>
                  </button>
                ` : S`
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
Mr.styles = oe`
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
let W = Mr;
X([
  O({ attribute: !1 })
], W.prototype, "hass");
X([
  O({ type: Boolean })
], W.prototype, "preview");
X([
  O({ type: Boolean })
], W.prototype, "editMode");
X([
  O({ reflect: !0, type: String })
], W.prototype, "layout");
X([
  M()
], W.prototype, "_config");
X([
  M()
], W.prototype, "_pickingOn");
X([
  M()
], W.prototype, "_pickingOff");
X([
  M()
], W.prototype, "_skippedOn");
X([
  M()
], W.prototype, "_pickOnOption");
X([
  M()
], W.prototype, "_pickOffOption");
X([
  M()
], W.prototype, "_confirmingCancel");
X([
  M()
], W.prototype, "_pickDay");
X([
  M()
], W.prototype, "_pickHour");
class Fc extends W {
}
customElements.get("power-pilz-timer-card") || customElements.define("power-pilz-timer-card", W);
customElements.get("power-pilz-timer-card-v2") || customElements.define("power-pilz-timer-card-v2", Fc);
window.customCards = window.customCards || [];
const Vc = [
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
for (const t of Vc)
  window.customCards.some((e) => e.type === t.type) || window.customCards.push(t);
console.info(
  `%cPOWER PILZ%c v${ke}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
//# sourceMappingURL=power-pilz.js.map
