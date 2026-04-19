/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = globalThis, ki = pt.ShadowRoot && (pt.ShadyCSS === void 0 || pt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ti = Symbol(), sr = /* @__PURE__ */ new WeakMap();
let pn = class {
  constructor(t, i, r) {
    if (this._$cssResult$ = !0, r !== Ti) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (ki && t === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (t = sr.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && sr.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Vo = (e) => new pn(typeof e == "string" ? e : e + "", void 0, Ti), fe = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((r, n, o) => r + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new pn(i, e, Ti);
}, Uo = (e, t) => {
  if (ki) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const r = document.createElement("style"), n = pt.litNonce;
    n !== void 0 && r.setAttribute("nonce", n), r.textContent = i.cssText, e.appendChild(r);
  }
}, ar = ki ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const r of t.cssRules) i += r.cssText;
  return Vo(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Wo, defineProperty: jo, getOwnPropertyDescriptor: Go, getOwnPropertyNames: Ko, getOwnPropertySymbols: Yo, getPrototypeOf: Zo } = Object, pe = globalThis, lr = pe.trustedTypes, qo = lr ? lr.emptyScript : "", Gt = pe.reactiveElementPolyfillSupport, Ze = (e, t) => e, ft = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? qo : null;
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
} }, zi = (e, t) => !Wo(e, t), cr = { attribute: !0, type: String, converter: ft, reflect: !1, useDefault: !1, hasChanged: zi };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), pe.litPropertyMetadata ?? (pe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Ie = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = cr) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const r = Symbol(), n = this.getPropertyDescriptor(t, r, i);
      n !== void 0 && jo(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, r) {
    const { get: n, set: o } = Go(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? cr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ze("elementProperties"))) return;
    const t = Zo(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ze("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ze("properties"))) {
      const i = this.properties, r = [...Ko(i), ...Yo(i)];
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
      for (const n of r) i.unshift(ar(n));
    } else t !== void 0 && i.push(ar(t));
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
    return Uo(t, this.constructor.elementStyles), t;
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
      const s = (((o = r.converter) == null ? void 0 : o.toAttribute) !== void 0 ? r.converter : ft).toAttribute(i, r.type);
      this._$Em = t, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, s;
    const r = this.constructor, n = r._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const a = r.getPropertyOptions(n), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : ft;
      this._$Em = n;
      const c = l.fromAttribute(i, a.type);
      this[n] = c ?? ((s = this._$Ej) == null ? void 0 : s.get(n)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, r, n = !1, o) {
    var s;
    if (t !== void 0) {
      const a = this.constructor;
      if (n === !1 && (o = this[t]), r ?? (r = a.getPropertyOptions(t)), !((r.hasChanged ?? zi)(o, i) || r.useDefault && r.reflect && o === ((s = this._$Ej) == null ? void 0 : s.get(t)) && !this.hasAttribute(a._$Eu(t, r)))) return;
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
Ie.elementStyles = [], Ie.shadowRootOptions = { mode: "open" }, Ie[Ze("elementProperties")] = /* @__PURE__ */ new Map(), Ie[Ze("finalized")] = /* @__PURE__ */ new Map(), Gt == null || Gt({ ReactiveElement: Ie }), (pe.reactiveElementVersions ?? (pe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe = globalThis, dr = (e) => e, yt = qe.trustedTypes, hr = yt ? yt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, mn = "$lit$", _e = `lit$${Math.random().toFixed(9).slice(2)}$`, fn = "?" + _e, Xo = `<${fn}>`, Ce = document, Xe = () => Ce.createComment(""), Je = (e) => e === null || typeof e != "object" && typeof e != "function", Mi = Array.isArray, Jo = (e) => Mi(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Kt = `[ 	
\f\r]`, Fe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ur = /-->/g, _r = />/g, ve = RegExp(`>|${Kt}(?:([^\\s"'>=/]+)(${Kt}*=${Kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), pr = /'/g, mr = /"/g, yn = /^(?:script|style|textarea|title)$/i, Qo = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), C = Qo(1), $e = Symbol.for("lit-noChange"), k = Symbol.for("lit-nothing"), fr = /* @__PURE__ */ new WeakMap(), Se = Ce.createTreeWalker(Ce, 129);
function gn(e, t) {
  if (!Mi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return hr !== void 0 ? hr.createHTML(t) : t;
}
const es = (e, t) => {
  const i = e.length - 1, r = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = Fe;
  for (let a = 0; a < i; a++) {
    const l = e[a];
    let c, d, h = -1, _ = 0;
    for (; _ < l.length && (s.lastIndex = _, d = s.exec(l), d !== null); ) _ = s.lastIndex, s === Fe ? d[1] === "!--" ? s = ur : d[1] !== void 0 ? s = _r : d[2] !== void 0 ? (yn.test(d[2]) && (n = RegExp("</" + d[2], "g")), s = ve) : d[3] !== void 0 && (s = ve) : s === ve ? d[0] === ">" ? (s = n ?? Fe, h = -1) : d[1] === void 0 ? h = -2 : (h = s.lastIndex - d[2].length, c = d[1], s = d[3] === void 0 ? ve : d[3] === '"' ? mr : pr) : s === mr || s === pr ? s = ve : s === ur || s === _r ? s = Fe : (s = ve, n = void 0);
    const u = s === ve && e[a + 1].startsWith("/>") ? " " : "";
    o += s === Fe ? l + Xo : h >= 0 ? (r.push(c), l.slice(0, h) + mn + l.slice(h) + _e + u) : l + _e + (h === -2 ? a : u);
  }
  return [gn(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class Qe {
  constructor({ strings: t, _$litType$: i }, r) {
    let n;
    this.parts = [];
    let o = 0, s = 0;
    const a = t.length - 1, l = this.parts, [c, d] = es(t, i);
    if (this.el = Qe.createElement(c, r), Se.currentNode = this.el.content, i === 2 || i === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (n = Se.nextNode()) !== null && l.length < a; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const h of n.getAttributeNames()) if (h.endsWith(mn)) {
          const _ = d[s++], u = n.getAttribute(h).split(_e), m = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: o, name: m[2], strings: u, ctor: m[1] === "." ? is : m[1] === "?" ? rs : m[1] === "@" ? ns : $t }), n.removeAttribute(h);
        } else h.startsWith(_e) && (l.push({ type: 6, index: o }), n.removeAttribute(h));
        if (yn.test(n.tagName)) {
          const h = n.textContent.split(_e), _ = h.length - 1;
          if (_ > 0) {
            n.textContent = yt ? yt.emptyScript : "";
            for (let u = 0; u < _; u++) n.append(h[u], Xe()), Se.nextNode(), l.push({ type: 2, index: ++o });
            n.append(h[_], Xe());
          }
        }
      } else if (n.nodeType === 8) if (n.data === fn) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = n.data.indexOf(_e, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += _e.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const r = Ce.createElement("template");
    return r.innerHTML = t, r;
  }
}
function Le(e, t, i = e, r) {
  var s, a;
  if (t === $e) return t;
  let n = r !== void 0 ? (s = i._$Co) == null ? void 0 : s[r] : i._$Cl;
  const o = Je(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((a = n == null ? void 0 : n._$AO) == null || a.call(n, !1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, r)), r !== void 0 ? (i._$Co ?? (i._$Co = []))[r] = n : i._$Cl = n), n !== void 0 && (t = Le(e, n._$AS(e, t.values), n, r)), t;
}
class ts {
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
    const { el: { content: i }, parts: r } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? Ce).importNode(i, !0);
    Se.currentNode = n;
    let o = Se.nextNode(), s = 0, a = 0, l = r[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new tt(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new os(o, this, t)), this._$AV.push(c), l = r[++a];
      }
      s !== (l == null ? void 0 : l.index) && (o = Se.nextNode(), s++);
    }
    return Se.currentNode = Ce, n;
  }
  p(t) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, i), i += r.strings.length - 2) : r._$AI(t[i])), i++;
  }
}
class tt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, r, n) {
    this.type = 2, this._$AH = k, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = r, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    t = Le(this, t, i), Je(t) ? t === k || t == null || t === "" ? (this._$AH !== k && this._$AR(), this._$AH = k) : t !== this._$AH && t !== $e && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Jo(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== k && Je(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ce.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: r } = t, n = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = Qe.createElement(gn(r.h, r.h[0]), this.options)), r);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n) this._$AH.p(i);
    else {
      const s = new ts(n, this), a = s.u(this.options);
      s.p(i), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = fr.get(t.strings);
    return i === void 0 && fr.set(t.strings, i = new Qe(t)), i;
  }
  k(t) {
    Mi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, n = 0;
    for (const o of t) n === i.length ? i.push(r = new tt(this.O(Xe()), this.O(Xe()), this, this.options)) : r = i[n], r._$AI(o), n++;
    n < i.length && (this._$AR(r && r._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, i); t !== this._$AB; ) {
      const n = dr(t).nextSibling;
      dr(t).remove(), t = n;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class $t {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, r, n, o) {
    this.type = 1, this._$AH = k, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = k;
  }
  _$AI(t, i = this, r, n) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) t = Le(this, t, i, 0), s = !Je(t) || t !== this._$AH && t !== $e, s && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = Le(this, a[r + l], i, l), c === $e && (c = this._$AH[l]), s || (s = !Je(c) || c !== this._$AH[l]), c === k ? t = k : t !== k && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    s && !n && this.j(t);
  }
  j(t) {
    t === k ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class is extends $t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === k ? void 0 : t;
  }
}
class rs extends $t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== k);
  }
}
class ns extends $t {
  constructor(t, i, r, n, o) {
    super(t, i, r, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Le(this, t, i, 0) ?? k) === $e) return;
    const r = this._$AH, n = t === k && r !== k || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, o = t !== k && (r === k || n);
    n && this.element.removeEventListener(this.name, this, r), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class os {
  constructor(t, i, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Le(this, t);
  }
}
const Yt = qe.litHtmlPolyfillSupport;
Yt == null || Yt(Qe, tt), (qe.litHtmlVersions ?? (qe.litHtmlVersions = [])).push("3.3.2");
const ss = (e, t, i) => {
  const r = (i == null ? void 0 : i.renderBefore) ?? t;
  let n = r._$litPart$;
  if (n === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    r._$litPart$ = n = new tt(t.insertBefore(Xe(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ee = globalThis;
let D = class extends Ie {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ss(i, this.renderRoot, this.renderOptions);
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
    return $e;
  }
};
var _n;
D._$litElement$ = !0, D.finalized = !0, (_n = Ee.litElementHydrateSupport) == null || _n.call(Ee, { LitElement: D });
const Zt = Ee.litElementPolyfillSupport;
Zt == null || Zt({ LitElement: D });
(Ee.litElementVersions ?? (Ee.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const as = { attribute: !0, type: String, converter: ft, reflect: !1, hasChanged: zi }, ls = (e = as, t, i) => {
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
function O(e) {
  return (t, i) => typeof i == "object" ? ls(e, t, i) : ((r, n, o) => {
    const s = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, r), s ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function z(e) {
  return O({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const cs = { ATTRIBUTE: 1 }, ds = (e) => (...t) => ({ _$litDirective$: e, values: t });
let hs = class {
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
const bn = "important", us = " !" + bn, M = ds(class extends hs {
  constructor(e) {
    var t;
    if (super(e), e.type !== cs.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const o = typeof n == "string" && n.endsWith(us);
        r.includes("-") || o ? i.setProperty(r, o ? n.slice(0, -11) : n, o ? bn : "") : i[r] = n;
      }
    }
    return $e;
  }
}), N = (e, t) => {
  if (t)
    return e.states[t];
}, j = (e, t) => {
  const i = N(e, t);
  if (!i)
    return null;
  const r = Number(i.state);
  return Number.isFinite(r) ? r : null;
}, W = (e, t) => {
  const i = N(e, t);
  if (!i)
    return;
  const r = i.attributes.unit_of_measurement;
  return typeof r == "string" ? r : void 0;
}, mt = (e, t) => {
  const i = N(e, t);
  return i == null ? void 0 : i.state;
}, G = (e, t = "hybrid") => e === "history" || e === "statistics" || e === "hybrid" ? e : e === "auto" || t === "auto" ? "hybrid" : t, vn = 3e4, _s = 10 * 6e4, ps = 1440, ms = 1e4, fs = 2e3, wn = 40, kt = /* @__PURE__ */ new Map(), qt = /* @__PURE__ */ new Map(), Xt = /* @__PURE__ */ new Map(), yr = /* @__PURE__ */ new WeakMap(), gr = /* @__PURE__ */ new WeakMap(), br = /* @__PURE__ */ new WeakMap(), vr = /* @__PURE__ */ new WeakMap(), Ai = (e, t = ps) => {
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
}, xn = (e, t) => {
  const i = t ? ms : fs;
  return !Number.isFinite(e) || e <= 0 || i <= 1 ? Math.max(0, Math.floor(e)) : Math.max(0, Math.floor(e / i) * i);
}, ys = (e) => {
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
}, gt = (e, t, i) => {
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
  }), Ai(n);
}, gs = (e, t, i = Date.now()) => {
  if (!Array.isArray(e))
    return { entityId: null, points: [] };
  const r = [];
  let n = null;
  for (const a of e) {
    if (!a || typeof a != "object")
      continue;
    const l = a;
    n === null && typeof l.entity_id == "string" && l.entity_id.length > 0 && (n = l.entity_id);
    const c = Number(l.state), d = ys(l);
    !Number.isFinite(c) || d === null || r.push({ ts: d, value: c });
  }
  const o = i - t, s = r.filter((a) => a.ts >= o).sort((a, l) => a.ts - l.ts);
  return {
    entityId: n,
    points: Ai(s)
  };
}, Tt = (e, t, i) => `${e}|${t}|${i}`, X = (e) => e.map((t) => ({ ts: t.ts, value: t.value })), Jt = (e) => {
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
}, bs = (e) => Jt(e.start) ?? Jt(e.end) ?? Jt(e.last_reset), vs = (e) => {
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
}, ws = (e, t, i = Date.now()) => {
  if (!Array.isArray(e))
    return [];
  const r = [];
  e.forEach((s) => {
    if (!s || typeof s != "object")
      return;
    const a = s, l = bs(a), c = vs(a);
    l === null || c === null || r.push({ ts: l, value: c });
  });
  const n = i - t, o = r.filter((s) => s.ts >= n).sort((s, a) => s.ts - a.ts);
  return Ai(o);
}, Sn = (e) => {
  const t = vr.get(e);
  if (t)
    return t;
  const i = /* @__PURE__ */ new Map();
  return vr.set(e, i), i;
}, En = (e, t, i) => {
  const r = Sn(e), n = r.get(t);
  return n ? n.expiresAt <= i ? (r.delete(t), null) : n.supported : null;
}, wr = (e, t, i, r) => {
  Sn(e).set(t, {
    supported: i,
    expiresAt: r + _s
  });
}, xs = (e) => {
  const t = yr.get(e);
  if (t)
    return t;
  const i = /* @__PURE__ */ new Map();
  return yr.set(e, i), i;
}, Cn = async (e, t, i, r, n, o) => {
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
    const m = gs(_, i, n), x = t[u], y = m.entityId ?? x;
    y && (h[y] = m.points);
  }), t.forEach((_) => {
    _ in h || (h[_] = []), o && kt.set(Tt("history", _, i), {
      expiresAt: n + vn,
      points: X(h[_])
    });
  }), h;
}, Ss = (e, t, i, r, n) => {
  const o = xs(e);
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
        const h = await Cn(
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
            u[m] = X(h[m] ?? []);
          }), _.resolve(u);
        });
      } catch (h) {
        c.waiters.forEach((_) => _.reject(h));
      }
    }, wn));
  });
}, Es = (e) => {
  const t = gr.get(e);
  if (t)
    return t;
  const i = /* @__PURE__ */ new Map();
  return gr.set(e, i), i;
}, Cs = async (e, t, i, r) => {
  const n = [...r], o = new Date(t).toISOString(), s = new Date(i).toISOString(), a = br.get(e), l = a ? [a] : ["recorder/statistics_during_period", "history/statistics_during_period"];
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
      return br.set(e, d), h;
    } catch (h) {
      c = h;
    }
  throw c;
}, $s = async (e, t) => {
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
}, $n = async (e, t, i, r, n, o) => {
  let s;
  try {
    s = await Cs(e, r, n, t);
  } catch {
    const u = new Set(t), m = {};
    return t.forEach((x) => {
      m[x] = [];
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
    const m = ws(a[u], i, n);
    l[u] = m, wr(e, u, !0, n), o && kt.set(Tt("statistics", u, i), {
      expiresAt: n + vn,
      points: X(m)
    });
  });
  const h = [];
  d.forEach((u) => {
    const m = En(e, u, n);
    if (m !== !0) {
      if (m === !1) {
        c.add(u);
        return;
      }
      h.push(u);
    }
  });
  const _ = await $s(e, h);
  return _ !== null ? h.forEach((u) => {
    const m = _.has(u);
    wr(e, u, m, n), m || c.add(u);
  }) : h.forEach((u) => {
    c.add(u);
  }), {
    pointsByEntity: l,
    unsupportedEntityIds: c
  };
}, ks = (e, t, i, r, n) => {
  const o = Es(e);
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
        const h = await $n(
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
            u.pointsByEntity[m] = X(h.pointsByEntity[m] ?? []), h.unsupportedEntityIds.has(m) && u.unsupportedEntityIds.add(m);
          }), _.resolve(u);
        });
      } catch (h) {
        c.waiters.forEach((_) => _.reject(h));
      }
    }, wn));
  });
}, kn = async (e, t, i, r) => {
  const n = e.callApi, o = Array.from(new Set(t.filter((y) => y.length > 0)));
  if (!n || o.length === 0)
    return {};
  const s = Date.now(), a = typeof r == "number" && Number.isFinite(r) ? Math.max(s - i, Math.floor(r)) : s - i, l = a <= s - i + 1e3, c = xn(a, l), d = {}, h = [];
  if (o.forEach((y) => {
    if (l) {
      const g = Tt("history", y, i), b = kt.get(g);
      if (b && b.expiresAt > s) {
        d[y] = X(b.points);
        return;
      }
    }
    h.push(y);
  }), h.length === 0)
    return d;
  if (l) {
    const y = `${c}|${i}`, g = await Ss(
      n,
      y,
      h,
      i,
      c
    );
    return h.forEach((b) => {
      d[b] = X(g[b] ?? []);
    }), d;
  }
  const _ = [...h].sort(), u = `${c}|${i}|${_.join(",")}`, m = qt.get(u);
  if (m) {
    const y = await m;
    return h.forEach((g) => {
      d[g] = X(y[g] ?? []);
    }), d;
  }
  const x = (async () => Cn(
    n,
    h,
    i,
    c,
    s,
    l
  ))();
  qt.set(u, x);
  try {
    const y = await x;
    return h.forEach((g) => {
      d[g] = X(y[g] ?? []);
    }), d;
  } finally {
    qt.delete(u);
  }
}, Tn = async (e, t, i, r) => {
  const n = e.callWS, o = Array.from(new Set(t.filter((b) => b.length > 0)));
  if (!n || o.length === 0)
    return {
      pointsByEntity: {},
      unsupportedEntityIds: new Set(o)
    };
  const s = Date.now(), a = typeof r == "number" && Number.isFinite(r) ? Math.max(s - i, Math.floor(r)) : s - i, l = a <= s - i + 1e3, c = xn(a, l), d = {}, h = [], _ = /* @__PURE__ */ new Set();
  if (o.forEach((b) => {
    if (En(n, b, s) === !1) {
      d[b] = [], _.add(b);
      return;
    }
    if (l) {
      const E = Tt("statistics", b, i), w = kt.get(E);
      if (w && w.expiresAt > s) {
        d[b] = X(w.points);
        return;
      }
    }
    h.push(b);
  }), h.length === 0)
    return {
      pointsByEntity: d,
      unsupportedEntityIds: _
    };
  const u = (b) => (h.forEach((S) => {
    d[S] = X(b.pointsByEntity[S] ?? []), b.unsupportedEntityIds.has(S) && _.add(S);
  }), {
    pointsByEntity: d,
    unsupportedEntityIds: _
  });
  if (l) {
    const b = `${c}|${i}`, S = await ks(
      n,
      b,
      h,
      i,
      c
    );
    return u(S);
  }
  const m = [...h].sort(), x = `${c}|${i}|${m.join(",")}`, y = Xt.get(x);
  if (y) {
    const b = await y;
    return u(b);
  }
  const g = (async () => $n(
    n,
    h,
    i,
    c,
    s,
    l
  ))();
  Xt.set(x, g);
  try {
    const b = await g;
    return u(b);
  } finally {
    Xt.delete(x);
  }
}, Ts = async (e, t, i, r) => {
  const n = await Tn(
    e,
    t,
    i,
    r
  ), o = {};
  t.forEach((l) => {
    l.length !== 0 && (o[l] = X(n.pointsByEntity[l] ?? []));
  });
  const s = Array.from(n.unsupportedEntityIds).filter((l) => l.length > 0);
  if (s.length === 0)
    return o;
  const a = await kn(
    e,
    s,
    i,
    r
  );
  return s.forEach((l) => {
    o[l] = X(a[l] ?? []);
  }), o;
}, De = async (e, t, i, r) => {
  const n = G(r == null ? void 0 : r.dataSource, "hybrid");
  return n === "history" ? kn(e, t, i, r == null ? void 0 : r.startMs) : n === "statistics" ? (await Tn(
    e,
    t,
    i,
    r == null ? void 0 : r.startMs
  )).pointsByEntity : Ts(e, t, i, r == null ? void 0 : r.startMs);
}, xr = {
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
}, ce = (e) => {
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
  if (t in xr)
    return `var(--rgb-${t}, ${xr[t]})`;
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
}, Oi = (e, t = "") => {
  const i = ce(e);
  if (i)
    return `rgb(${i})`;
  if (typeof e == "string" && e.trim().length > 0) {
    const r = e.trim(), n = r.toLowerCase();
    if (n !== "none" && n !== "default")
      return r;
  }
  return t;
}, He = (e) => {
  const t = ce(e);
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
}, Pi = (e, t, i) => {
  const r = e.map((n) => ({
    x: n.x / 100 * t,
    y: n.y / 100 * i,
    value: n.value,
    ts: n.ts
  }));
  return zs(r, t);
}, zs = (e, t) => {
  if (e.length <= 3)
    return e;
  const i = Math.max(24, Math.min(e.length, Math.round(t)));
  if (e.length <= i)
    return Sr(e);
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
  return r.push(e[e.length - 1]), Sr(r);
}, Sr = (e) => {
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
}, Er = {
  "": 0,
  k: 1,
  m: -1,
  M: 2,
  G: 3,
  T: 4
}, ei = ["", "k", "M", "G", "T"], me = (e, t) => {
  const i = typeof e == "number" && Number.isFinite(e) ? Math.round(e) : t;
  return Math.max(0, Math.min(4, i));
}, le = (e) => {
  if (!e)
    return null;
  const t = e.trim();
  if (t.length === 0)
    return null;
  if (t.endsWith("Wh")) {
    const i = t.slice(0, -2), n = Er[i === "K" ? "k" : i];
    return n === void 0 ? null : {
      family: "energy",
      prefixPower: n,
      factor: Math.pow(1e3, n),
      canonicalUnit: "Wh"
    };
  }
  if (t.endsWith("W")) {
    const i = t.slice(0, -1), n = Er[i === "K" ? "k" : i];
    return n === void 0 ? null : {
      family: "power",
      prefixPower: n,
      factor: Math.pow(1e3, n),
      canonicalUnit: "W"
    };
  }
  return null;
}, Ms = (e, t) => {
  const i = Math.max(0, Math.min(ei.length - 1, t)), r = ei[i] ?? "";
  return e === "energy" ? `${r}Wh` : `${r}W`;
}, As = (e) => {
  if (!Number.isFinite(e) || e <= 0)
    return 0;
  let t = 0, i = e;
  for (; i >= 1e3 && t < ei.length - 1; )
    i /= 1e3, t += 1;
  return t;
}, Ri = (e, t, i, r) => {
  const n = r.nullWithUnit === !0;
  if (e === null)
    return n && t ? `-- ${t}` : "--";
  const o = le(t);
  if (!r.enabled || !o)
    return `${e.toFixed(i)} ${t}`.trim();
  const s = e < 0 ? "-" : "", a = Math.abs(e) * o.factor, l = As(a), c = Ms(o.family, l), d = a / Math.pow(1e3, l), h = l === 0 ? r.baseDecimals : r.prefixedDecimals;
  return `${s}${d.toFixed(h)} ${c}`.trim();
}, Os = (e) => {
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
    const s = le(e[o]);
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
}, Ps = 500, Rs = 250, Is = 1e3, zt = (e, t, i) => {
  let r, n, o, s = !1, a = !1;
  const l = e.style.touchAction;
  e.style.touchAction = "manipulation";
  const c = () => {
    r !== void 0 && (clearTimeout(r), r = void 0);
  }, d = () => {
    n !== void 0 && (clearTimeout(n), n = void 0);
  }, h = (y) => {
    y.button === 0 && (s = !1, d(), i.hasHold && (c(), r = setTimeout(() => {
      s = !0, r = void 0, t.onHold(), n = setTimeout(() => {
        s = !1, n = void 0;
      }, Is);
    }, Ps)));
  }, _ = () => {
    c();
  }, u = () => {
    c(), s || (s = !1);
  }, m = (y) => {
    if (s) {
      s = !1, d(), y.stopPropagation();
      return;
    }
    i.hasDoubleTap ? a ? (a = !1, o !== void 0 && (clearTimeout(o), o = void 0), t.onDoubleTap()) : (a = !0, o = setTimeout(() => {
      a = !1, o = void 0, t.onTap();
    }, Rs)) : t.onTap();
  }, x = (y) => {
    (s || r !== void 0) && y.preventDefault();
  };
  return e.addEventListener("pointerdown", h, { passive: !0 }), e.addEventListener("pointerup", _, { passive: !0 }), e.addEventListener("pointercancel", u, { passive: !0 }), e.addEventListener("pointerleave", u, { passive: !0 }), e.addEventListener("click", m), e.addEventListener("contextmenu", x), {
    destroy: () => {
      c(), d(), o !== void 0 && clearTimeout(o), e.removeEventListener("pointerdown", h), e.removeEventListener("pointerup", _), e.removeEventListener("pointercancel", u), e.removeEventListener("pointerleave", u), e.removeEventListener("click", m), e.removeEventListener("contextmenu", x), e.style.touchAction = l;
    }
  };
}, ye = "0.4.0";
var Ls = Object.defineProperty, Ds = Object.getOwnPropertyDescriptor, Ii = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Ds(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Ls(t, i, n), n;
};
const Hs = 4, Ns = 8, Cr = 2, Bs = /* @__PURE__ */ new Set(["solar", "home", "grid", "grid_secondary"]), Fs = (e, t) => {
  const i = `${e}_sub_${t}`, r = Bs.has(e);
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
              helper: mi,
              description: mi
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
                helper: e === "solar" ? yi : fi,
                description: e === "solar" ? yi : fi
              }
            ]
          }
        ]
      }
    ] : []
  ];
}, ct = (e, t, i, r) => ({
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
    schema: Fs(e, o + 1)
  }))
}), Vs = (e, t, i) => ({
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
}), ie = (e, t) => ({
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
}), Us = {
  select: {
    mode: "dropdown",
    options: [
      { label: "Auto (recommended)", value: "auto" },
      { label: "Statistics (fastest)", value: "statistics" },
      { label: "History (raw)", value: "history" }
    ]
  }
}, Ws = (e) => {
  const t = G(e, "hybrid");
  return t === "hybrid" ? "auto" : t;
}, js = (e) => e === "auto" || e === "history" || e === "statistics" || e === "hybrid" ? e : "auto", ti = "When enabled, the solar main node shows the sum of enabled solar sub-node entities instead of the solar entity. Solar sub-nodes with State mode enabled are excluded from this sum.", ii = "When enabled, the home main node is calculated as solar + grid + grid 2 - battery - battery 2 using compatible unit conversion.", Ge = "When enabled, negative grid values (energy exported to the grid) are highlighted in the trend with the export color.", Ke = "When enabled, the grid icon switches to the export icon color while the grid value is negative.", ri = "When enabled, the main grid node is shown. When disabled, the grid node is hidden.", ni = "When enabled, the second grid node is shown. When disabled, the second grid node is hidden.", oi = "When enabled, the main solar node is shown. When disabled, the solar node is hidden.", si = "Flow direction: + value animates from Solar to Center. 0 or - value shows no solar flow.", ai = "When enabled, the main home node is shown. When disabled, the home node is hidden.", li = "Flow direction: + value animates from Center to Home. 0 or - value shows no home flow.", ci = "When enabled, the main battery node is shown. When disabled, the battery node is hidden.", di = "Flow direction: + value animates from Center to Battery (charging). - value animates Battery to Center (discharging).", hi = "When enabled, the second battery node is shown. When disabled, the second battery node is hidden.", ui = "Flow direction: + value animates from Center to Battery 2 (charging). - value animates Battery 2 to Center (discharging).", Ye = "Color used for battery low-threshold alert styling (icon and low trend section).", _i = "Flow direction: + value animates from Grid to Center (import). - value animates from Center to Grid (export).", pi = "Flow direction: + value animates from Grid 2 to Center (import). - value animates from Center to Grid 2 (export).", mi = "In default mode, this sub-node renders the entity as numeric value + unit.", fi = "When enabled, this sub-node displays the entity state text (for example AUS/WW/HZ) instead of numeric value + unit.", yi = "When enabled, this solar sub-node displays entity state text instead of numeric value + unit and is excluded from Solar auto-calc.", gi = "Automatically formats values with metric prefixes (for example W/kW/MW and Wh/kWh/MWh).", bi = "Optional unit override/fallback. Used when entities have no unit and as preferred output unit for auto-calculated values.", vi = "Default decimal precision for displayed values and fallback when base/prefixed decimals are not set.", wi = "Decimal precision for base units (W, Wh) when Auto unit scaling is enabled.", xi = "Decimal precision for prefixed units (kW, MW, kWh, MWh) when Auto unit scaling is enabled.", Si = "Controls where trend data is fetched from. In most setups, keep Auto (recommended), which prefers statistics and falls back to history automatically.", Gs = [
  Vs("Center visuals", "mdi:palette-outline", [
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
                helper: gi,
                description: gi
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
                helper: xi,
                description: xi
              },
              {
                name: "decimals_base_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: wi,
                description: wi
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
                helper: bi,
                description: bi
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: vi,
                description: vi
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
                selector: Us,
                helper: Si,
                description: Si
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
            helper: oi,
            description: oi
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
                helper: si,
                description: si
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
      ie("Calculation", [
        {
          name: "solar_auto_calculate",
          selector: { boolean: {} },
          helper: ti,
          description: ti
        }
      ]),
      ie("Trend", [
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
                name: "grid_entity",
                selector: { entity: { filter: { domain: ["sensor", "input_number", "number"] } } },
                helper: _i,
                description: _i
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
      ie("Trend", [
        { name: "grid_trend", selector: { boolean: {} } },
        {
          name: "grid_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      ie("Export", [
        {
          name: "grid_export_highlight",
          selector: { boolean: {} },
          helper: Ge,
          description: Ge
        },
        {
          name: "grid_export_trend_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        },
        {
          name: "grid_export_icon_highlight",
          selector: { boolean: {} },
          helper: Ke,
          description: Ke
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
            helper: ni,
            description: ni
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
                helper: pi,
                description: pi
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
      ie("Trend", [
        { name: "grid_secondary_trend", selector: { boolean: {} } },
        {
          name: "grid_secondary_trend_color",
          selector: { ui_color: { include_state: !0, include_none: !1, default_color: "purple" } }
        }
      ]),
      ie("Export", [
        {
          name: "grid_secondary_export_highlight",
          selector: { boolean: {} },
          helper: Ge,
          description: Ge
        },
        {
          name: "grid_secondary_export_trend_color",
          selector: { ui_color: { include_state: !1, include_none: !1, default_color: "red" } }
        },
        {
          name: "grid_secondary_export_icon_highlight",
          selector: { boolean: {} },
          helper: Ke,
          description: Ke
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
            helper: ai,
            description: ai
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
                helper: li,
                description: li
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
      ie("Calculation", [
        {
          name: "home_auto_calculate",
          selector: { boolean: {} },
          helper: ii,
          description: ii
        }
      ]),
      ie("Trend", [
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
            helper: ci,
            description: ci
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
                helper: di,
                description: di
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
      ie("Trend", [
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
                helper: Ye,
                description: Ye
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
            helper: hi,
            description: hi
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
                helper: ui,
                description: ui
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
      ie("Trend", [
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
                helper: Ye,
                description: Ye
              }
            ]
          }
        ]
      }
    ]
  },
  ct("solar", "Solar sub blocks", "mdi:solar-power-variant", Hs),
  ct("grid", "Grid 1 sub blocks", "mdi:transmission-tower", Cr),
  ct("grid_secondary", "Grid 2 sub blocks", "mdi:transmission-tower", Cr),
  ct("home", "Home sub blocks", "mdi:flash", Ns),
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
], Ks = {
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
let bt = class extends D {
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
      return Ks[t] ?? t;
    }, this.computeHelper = (e) => {
      const t = e.name ?? "";
      if (t === "solar_entity")
        return si;
      if (t === "grid_entity")
        return _i;
      if (t === "grid_secondary_entity")
        return pi;
      if (t === "home_entity")
        return li;
      if (t === "battery_entity")
        return di;
      if (t === "battery_secondary_entity")
        return ui;
      if (/^(solar|home|grid|grid_secondary)_sub_\d+_icon_color$/.test(t))
        return mi;
      if (/^(home|grid|grid_secondary)_sub_\d+_state_mode$/.test(t))
        return fi;
      if (/^solar_sub_\d+_state_mode$/.test(t))
        return yi;
      if (t === "solar_visible")
        return oi;
      if (t === "home_visible")
        return ai;
      if (t === "battery_visible")
        return ci;
      if (t === "battery_secondary_visible")
        return hi;
      if (t === "solar_auto_calculate")
        return ti;
      if (t === "home_auto_calculate")
        return ii;
      if (t === "grid_visible")
        return ri;
      if (t === "grid_secondary_visible")
        return ni;
      if (t === "grid_export_highlight" || t === "grid_secondary_export_highlight")
        return Ge;
      if (t === "grid_export_icon_highlight" || t === "grid_secondary_export_icon_highlight")
        return Ke;
      if (t === "battery_low_alert_color" || t === "battery_secondary_low_alert_color")
        return Ye;
      if (t === "unit")
        return bi;
      if (t === "decimals")
        return vi;
      if (t === "decimals_base_unit")
        return wi;
      if (t === "decimals_prefixed_unit")
        return xi;
      if (t === "trend_data_source")
        return Si;
      if (t === "auto_scale_units")
        return gi;
    }, this.valueChanged = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement) || t.tagName !== "HA-FORM")
        return;
      const i = e.detail.value;
      if (!i || typeof i != "object" || Array.isArray(i))
        return;
      const r = {
        ...i,
        trend_data_source: js(i.trend_data_source),
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
      trend_data_source: Ws(e.trend_data_source),
      debug_performance: e.debug_performance ?? !1,
      decimals: e.decimals ?? 1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: e.decimals_base_unit ?? e.decimals ?? 1,
      decimals_prefixed_unit: e.decimals_prefixed_unit ?? e.decimals ?? 1,
      type: "custom:power-pilz-energy-card"
    };
  }
  render() {
    return !this.hass || !this._config ? k : C`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ye}
      </div>
      <div style="margin: 0 0 14px; color: var(--secondary-text-color); line-height: 1.4;">
        Highly flexible energy flow card with configurable main nodes, trends, sub-nodes, auto calculations,
        export highlighting, and advanced unit handling.
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Gs}
        .computeLabel=${this.computeLabel}
        .computeHelper=${this.computeHelper}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Ii([
  O({ attribute: !1 })
], bt.prototype, "hass", 2);
Ii([
  z()
], bt.prototype, "_config", 2);
bt = Ii([
  se("power-pilz-energy-card-editor")
], bt);
var Ys = Object.defineProperty, Zs = Object.getOwnPropertyDescriptor, he = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Zs(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Ys(t, i, n), n;
};
const H = 0.01, Ve = 1, Pe = 1440 * 60 * 1e3, $r = 300 * 1e3, kr = 60 * 1e3, qs = 350, Tr = 4, zr = 8, Qt = 2, Xs = 260, Js = 220, Mr = -1e-6, we = "red", Qs = "var(--rgb-primary-text-color, 33, 33, 33)", ea = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", ");
let J = class extends D {
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
      decimals: Ve,
      decimals_base_unit: Ve,
      decimals_prefixed_unit: Ve
    };
  }
  setConfig(e) {
    const t = e.home_entity ?? e.consumption_entity ?? "sensor.dev_home_power", i = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Ve, r = me(e.decimals_base_unit, i), n = me(e.decimals_prefixed_unit, i);
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
      grid_export_trend_color: e.grid_export_trend_color ?? we,
      grid_export_icon_highlight: e.grid_export_icon_highlight ?? !1,
      grid_export_icon_color: e.grid_export_icon_color ?? we,
      grid_secondary_export_highlight: e.grid_secondary_export_highlight ?? !1,
      grid_secondary_export_trend_color: e.grid_secondary_export_trend_color ?? we,
      grid_secondary_export_icon_highlight: e.grid_secondary_export_icon_highlight ?? !1,
      grid_secondary_export_icon_color: e.grid_secondary_export_icon_color ?? we,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      trend_data_source: G(e.trend_data_source, "hybrid"),
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: r,
      decimals_prefixed_unit: n,
      battery_low_alert: e.battery_low_alert ?? !1,
      battery_low_threshold: this.normalizeBatteryThreshold(e.battery_low_threshold),
      battery_low_alert_color: e.battery_low_alert_color ?? we,
      battery_secondary_low_alert: e.battery_secondary_low_alert ?? !1,
      battery_secondary_low_threshold: this.normalizeBatteryThreshold(e.battery_secondary_low_threshold),
      battery_secondary_low_alert_color: e.battery_secondary_low_alert_color ?? we,
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
      return C`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return C``;
    const e = this._config, t = e.decimals ?? Ve, i = e.home_visible !== !1, r = e.solar_visible !== !1, n = e.grid_visible !== !1, o = n && e.grid_secondary_visible === !0, s = e.battery_visible !== !1, a = s && e.battery_secondary_visible === !0, l = this.normalizeBatteryDualAlignment(e.battery_dual_alignment), c = r ? this.collectSubBlocks("solar", e) : [], d = c.filter((L) => !L.stateMode), h = n ? this.collectSubBlocks("grid", e) : [], _ = o ? this.collectSubBlocks("grid_secondary", e) : [], u = i ? this.collectSubBlocks("home", e) : [], m = j(this.hass, e.home_entity), x = r ? j(this.hass, e.solar_entity) : null, y = n ? j(this.hass, e.grid_entity) : null, g = o ? j(this.hass, e.grid_secondary_entity) : null, b = s ? j(this.hass, e.battery_entity) : null, S = j(this.hass, e.battery_percentage_entity), E = a ? j(this.hass, e.battery_secondary_entity) : null, w = j(this.hass, e.battery_secondary_percentage_entity), f = e.unit ?? "kW", v = W(this.hass, e.solar_entity) ?? f, $ = W(this.hass, e.grid_entity) ?? f, T = W(this.hass, e.grid_secondary_entity) ?? f, A = W(this.hass, e.battery_entity), R = W(this.hass, e.battery_percentage_entity), I = W(this.hass, e.battery_secondary_entity), F = W(this.hass, e.battery_secondary_percentage_entity), V = A ?? f, Z = I ?? f, ze = this.resolveBatteryPercentage(
      S,
      b,
      A
    ), Me = this.resolveBatteryPercentage(
      w,
      E,
      I
    ), Mt = !!this.readConfigString(e.battery_percentage_entity) || this.isPercentageUnit(A), At = !!this.readConfigString(e.battery_secondary_percentage_entity) || this.isPercentageUnit(I), Ne = e.solar_auto_calculate === !0 ? this.resolveAutoSolarUnit(e, d, f) : v, Be = e.solar_auto_calculate === !0 ? this.computeAutoSolarValueFromSubBlocks(d, Ne) : x, Ot = e.home_auto_calculate === !0 ? this.resolveAutoHomeUnit(e, f, Ne) : W(this.hass, e.home_entity) ?? f, rt = e.home_auto_calculate === !0 ? this.computeAutoHomeValueFromNodeValues(
      {
        solar: Be,
        grid: y,
        grid_secondary: g,
        battery: b,
        battery_secondary: E
      },
      {
        solar: Ne,
        grid: $,
        grid_secondary: T,
        battery: V,
        battery_secondary: Z
      },
      Ot
    ) : m, Gn = Mt ? R ?? "%" : V, Kn = At ? F ?? "%" : Z, Yn = this.toUnidirectionalFlow(Be), Zn = this.toUnidirectionalFlow(rt), qn = this.toBidirectionalFlow(y), Xn = this.toBidirectionalFlow(g), Jn = this.sumComparableValues([
      { value: y, unit: $ },
      { value: g, unit: T }
    ]), Qn = y === null && g === null ? "none" : this.toBidirectionalFlow(Jn), eo = this.toBidirectionalFlow(b), to = this.toBidirectionalFlow(E), io = this.sumComparableValues([
      { value: b, unit: V },
      { value: E, unit: Z }
    ]), ro = b === null && E === null ? "none" : this.toBidirectionalFlow(io), no = this.hasConfiguredAction(e), Pt = !this.isEditorPreview() && no, oo = this.iconColorStyle(e.solar_icon_color), so = this.iconColorStyle(e.home_icon_color), ao = this.iconShapeStyle(e.core_icon_color), Rt = new Set(u.map((L) => L.index)), Ae = new Set(c.map((L) => L.index)), lo = Rt.has(7) && Rt.has(8), co = [5, 6, 7, 8].some((L) => Rt.has(L)), ho = Ae.has(1) && Ae.has(2) && !Ae.has(3) && !Ae.has(4), uo = Ae.has(3) && Ae.has(4), Zi = o && (ho && lo || uo && co), _o = o && !Zi, It = u.some((L) => L.index >= 7), qi = this.homeSubPositions(It), Xi = this.gridSubPositions(o), Ji = this.gridSecondarySubPositions(), Qi = this.solarSubPositions(
      It,
      _o,
      Zi
    ), er = u.filter((L) => L.index <= (It ? 8 : 6)), Lt = n ? { col: 1, row: o ? 2 : 3, colSpan: 2, rowSpan: 2 } : null, Dt = o ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 } : null, Ht = s ? {
      col: a && l === "center" ? 2 : 3,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, Nt = a ? {
      col: l === "left" ? 1 : l === "right" ? 5 : 4,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, U = this.computeGridBounds(
      i,
      r,
      n,
      o,
      s,
      a,
      Lt,
      Dt,
      Ht,
      Nt,
      c,
      h,
      _,
      er,
      Qi,
      Xi,
      Ji,
      qi
    ), Bt = r ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, U) : null, nt = Lt ? this.normalizePlacement(Lt, U) : null, ot = Dt ? this.normalizePlacement(Dt, U) : null, Ft = i ? this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, U) : null, st = Ht ? this.normalizePlacement(Ht, U) : null, at = Nt ? this.normalizePlacement(Nt, U) : null, tr = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, U), po = this.normalizePositions(Qi, U), mo = this.normalizePositions(Xi, U), fo = this.normalizePositions(Ji, U), yo = this.normalizePositions(qi, U), ir = this.normalizeBatteryThreshold(e.battery_low_threshold), rr = !!e.battery_low_alert, nr = this.normalizeBatteryThreshold(e.battery_secondary_low_threshold), or = !!e.battery_secondary_low_alert, lt = this.resolveColor(we), Vt = this.resolveColor(e.battery_low_alert_color, lt), Ut = this.resolveColor(
      e.battery_secondary_low_alert_color,
      lt
    ), Wt = rr && ze !== null && ze <= ir, go = this.iconColorStyle(
      Wt ? Vt : e.battery_icon_color
    ), bo = this.batteryIcon(
      ze,
      this.isPercentageUnit(A) ? null : b,
      e.battery_icon
    ), jt = or && Me !== null && Me <= nr, vo = this.iconColorStyle(
      jt ? Ut : e.battery_secondary_icon_color
    ), wo = this.batteryIcon(
      Me,
      this.isPercentageUnit(I) ? null : E,
      e.battery_secondary_icon
    ), xo = y !== null && Number.isFinite(y) && y < 0, So = g !== null && Number.isFinite(g) && g < 0, Eo = this.iconColorStyle(
      e.grid_export_icon_highlight === !0 && xo ? e.grid_export_icon_color : e.grid_icon_color
    ), Co = this.iconColorStyle(
      e.grid_secondary_export_icon_highlight === !0 && So ? e.grid_secondary_export_icon_color : e.grid_secondary_icon_color
    ), $o = { "--flow-color-rgb": this.toRgbCss(e.flow_color) ?? Qs }, Oe = this.resolveColor("purple"), ko = this.resolveColor(e.solar_trend_color, Oe), To = this.resolveColor(e.grid_trend_color, Oe), zo = this.resolveColor(e.grid_secondary_trend_color, Oe), Mo = this.resolveColor(e.grid_export_trend_color, lt), Ao = this.resolveColor(
      e.grid_secondary_export_trend_color,
      lt
    ), Oo = this.resolveColor(e.home_trend_color, Oe), Po = this.resolveColor(e.battery_trend_color, Oe), Ro = this.resolveColor(e.battery_secondary_trend_color, Oe), Io = e.grid_export_highlight === !0 ? Mr : null, Lo = e.grid_secondary_export_highlight === !0 ? Mr : null, Do = rr && Mt ? ir : null, Ho = Mt ? ze : b, No = or && At ? nr : null, Bo = At ? Me : E, Fo = this.buildFlowSegments(
      Ft,
      tr,
      Bt,
      [
        ...nt ? [{ placement: nt, direction: qn }] : [],
        ...ot ? [{ placement: ot, direction: Xn }] : []
      ],
      Qn,
      [
        ...st ? [{ placement: st, direction: eo }] : [],
        ...at ? [{ placement: at, direction: to }] : []
      ],
      ro,
      Yn,
      Zn,
      U
    );
    return C`
      <ha-card
        class=${Pt ? "interactive" : ""}
        tabindex=${Pt ? 0 : -1}
        role=${Pt ? "button" : "article"}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div
            class="energy-grid"
            style=${M({
      ...$o,
      "--grid-columns": `${U.cols}`,
      "--grid-rows": `${U.rows}`,
      "--grid-aspect": `${U.cols} / ${U.rows}`
    })}
          >
            ${Fo.map(
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

            ${r && Bt ? C`
                  <div
                    class="energy-value solar ${Be === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Bt))}
                  >
                    ${this.renderTrend("solar", Be, Ne, !!e.solar_trend, ko, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.solar_icon ?? "mdi:weather-sunny"}
                        style=${M(oo)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(Be, Ne, t)}</div>
                      <div class="energy-label">${e.solar_label}</div>
                    </div>
                  </div>
                ` : k}

            ${n && nt ? C`
                  <div
                    class="energy-value grid ${y === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(nt))}
                  >
                    ${this.renderTrend(
      "grid",
      y,
      $,
      !!e.grid_trend,
      To,
      Io,
      Mo
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_icon ?? "mdi:transmission-tower"}
                        style=${M(Eo)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(y, $, t)}</div>
                      <div class="energy-label">${e.grid_label}</div>
                    </div>
                  </div>
                ` : k}

            ${o && ot ? C`
                  <div
                    class="energy-value grid-secondary ${g === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(ot))}
                  >
                    ${this.renderTrend(
      "grid_secondary",
      g,
      T,
      !!e.grid_secondary_trend,
      zo,
      Lo,
      Ao
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${M(Co)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(g, T, t)}</div>
                      <div class="energy-label">${e.grid_secondary_label}</div>
                    </div>
                  </div>
                ` : k}

            ${i && Ft ? C`
                  <div
                    class="energy-value home ${rt === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Ft))}
                  >
                    ${this.renderTrend("home", rt, Ot, !!e.home_trend, Oo, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.home_icon ?? "mdi:home-lightning-bolt"}
                        style=${M(so)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(rt, Ot, t)}</div>
                      <div class="energy-label">${e.home_label}</div>
                    </div>
                  </div>
                ` : k}

            ${this._showSubBlocks ? this.renderSubNodes("solar", c, po, t) : k}
            ${this._showSubBlocks ? this.renderSubNodes("grid", h, mo, t) : k}
            ${this._showSubBlocks ? this.renderSubNodes("grid_secondary", _, fo, t) : k}
            ${this._showSubBlocks ? this.renderSubNodes("home", er, yo, t) : k}

            ${s && st ? C`
                  <div
                    class="energy-value battery ${b === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(st))}
                  >
                    ${this.renderTrend(
      "battery",
      Ho,
      Gn,
      !!e.battery_trend,
      Po,
      Do,
      Vt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon class="energy-icon" .icon=${bo} style=${M(go)}></ha-icon>
                        ${ze !== null ? C`
                              <div
                                class="battery-percentage ${Wt ? "alert" : ""}"
                                style=${M(Wt ? { color: Vt } : {})}
                              >
                                ${this.formatBatteryPercentage(ze)}
                              </div>
                            ` : k}
                      </div>
                      <div class="energy-number">${this.formatValue(b, V, t)}</div>
                      <div class="energy-label">${e.battery_label}</div>
                    </div>
                  </div>
                ` : k}

            ${a && at ? C`
                  <div
                    class="energy-value battery-secondary ${E === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(at))}
                  >
                    ${this.renderTrend(
      "battery_secondary",
      Bo,
      Kn,
      !!e.battery_secondary_trend,
      Ro,
      No,
      Ut
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${wo}
                          style=${M(vo)}
                        ></ha-icon>
                        ${Me !== null ? C`
                              <div
                                class="battery-percentage ${jt ? "alert" : ""}"
                                style=${M(jt ? { color: Ut } : {})}
                              >
                                ${this.formatBatteryPercentage(Me)}
                              </div>
                            ` : k}
                      </div>
                      <div class="energy-number">${this.formatValue(E, Z, t)}</div>
                      <div class="energy-label">${e.battery_secondary_label}</div>
                    </div>
                  </div>
                ` : k}

            <div class="home-core" style=${M(this.gridPlacementStyle(tr))}>
              <div class="home-core-icon" style=${M(ao)}>
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
    return C`<div class=${r} style=${M(i)} aria-hidden="true"></div>`;
  }
  renderSubNodeConnectors() {
    return !this._showSubBlocks || this._subNodeConnectorSegments.length === 0 ? k : C`
      <div class="subnode-connectors" aria-hidden="true">
        ${this._subNodeConnectorSegments.map(
      (e) => C`
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
    const i = [], r = e === "solar" ? "mdi:solar-power-variant" : e === "home" ? "mdi:flash" : "mdi:transmission-tower", n = e === "solar" ? "Solar" : e === "home" ? "Home" : e === "grid" ? "Grid" : "Grid 2", o = e === "solar" ? Tr : e === "home" ? zr : Qt;
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
        value: j(this.hass, u),
        unit: W(this.hass, u) ?? t.unit ?? "kW",
        stateMode: m,
        stateText: m ? mt(this.hass, u) : void 0
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
        value: j(this.hass, a),
        unit: W(this.hass, a) ?? t.unit ?? "kW",
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
  computeGridBounds(e, t, i, r, n, o, s, a, l, c, d, h, _, u, m, x, y, g) {
    const b = [{ col: 3, row: 3, colSpan: 2, rowSpan: 2 }];
    e && b.push({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }), t && b.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }), i && s && b.push(s), r && a && b.push(a), n && l && b.push(l), o && c && b.push(c), d.forEach((v) => {
      const $ = m[v.index];
      $ && b.push({ col: $.col, row: $.row, colSpan: 1, rowSpan: 1 });
    }), h.forEach((v) => {
      const $ = x[v.index];
      $ && b.push({ col: $.col, row: $.row, colSpan: 1, rowSpan: 1 });
    }), _.forEach((v) => {
      const $ = y[v.index];
      $ && b.push({ col: $.col, row: $.row, colSpan: 1, rowSpan: 1 });
    }), u.forEach((v) => {
      const $ = g[v.index];
      $ && b.push({ col: $.col, row: $.row, colSpan: 1, rowSpan: 1 });
    });
    const S = Math.min(...b.map((v) => v.col)), E = Math.max(...b.map((v) => v.col + (v.colSpan ?? 1) - 1)), w = Math.min(...b.map((v) => v.row)), f = Math.max(...b.map((v) => v.row + (v.rowSpan ?? 1) - 1));
    return {
      minCol: S,
      maxCol: E,
      minRow: w,
      maxRow: f,
      cols: E - S + 1,
      rows: f - w + 1
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
    const d = this.placementCenter(t, c), h = [], _ = (m, x, y, g) => {
      const b = Math.min(m, x), S = Math.abs(x - m);
      S <= H || h.push({
        orientation: "horizontal",
        direction: g,
        left: b,
        top: y,
        width: S,
        height: 0
      });
    }, u = (m, x, y, g) => {
      const b = Math.min(m, x), S = Math.abs(x - m);
      S <= H || h.push({
        orientation: "vertical",
        direction: g,
        left: y,
        top: b,
        width: 0,
        height: S
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
      const [{ placement: m, direction: x }] = r, y = this.placementCenter(m, c);
      _(y.x, d.x, d.y, x);
    } else if (r.length >= 2) {
      const m = r.map((g) => ({
        direction: g.direction,
        center: this.placementCenter(g.placement, c)
      })).sort((g, b) => g.center.y - b.center.y), x = Math.min(...m.map((g) => g.center.x)), y = d.x - (d.x - x) * 0.5;
      _(d.x, y, d.y, n), m.forEach((g) => {
        const b = g.center.y > d.y + H ? this.reverseFlowDirection(g.direction) : g.direction;
        u(d.y, g.center.y, y, b), _(g.center.x, y, g.center.y, g.direction);
      });
    }
    if (o.length === 1) {
      const [{ placement: m, direction: x }] = o, y = this.placementCenter(m, c);
      u(d.y, y.y, d.x, x);
    } else if (o.length >= 2) {
      const m = o.map((g) => ({
        placement: g.placement,
        direction: g.direction,
        center: this.placementCenter(g.placement, c)
      })).sort((g, b) => g.center.y - b.center.y), x = Math.min(
        ...m.map((g) => (g.placement.row - 1) / c.rows * 100)
      ), y = Math.max(d.y + H, x);
      u(d.y, y, d.x, s), m.forEach((g) => {
        const b = g.center.x < d.x - H ? this.reverseFlowDirection(g.direction) : g.direction;
        _(d.x, g.center.x, y, b), u(y, g.center.y, g.center.x, g.direction);
      });
    }
    return h;
  }
  renderSubNodes(e, t, i, r) {
    return t.length === 0 ? k : C`
      ${t.map((n) => {
      var u;
      const o = i[n.index];
      if (!o)
        return k;
      const s = {
        "grid-column": `${o.col}`,
        "grid-row": `${o.row}`
      }, a = ((u = n.stateText) == null ? void 0 : u.trim()) ?? "", l = n.stateMode, c = a.length === 0, d = l ? c ? "--" : a : this.formatValue(n.value, n.unit, r), h = l ? { value: d, unit: "" } : this.splitFormattedValueAndUnit(d, n.unit), _ = l ? c : n.value === null;
      return C`
            <div
              class="energy-sub-value ${e}-sub sub-col-${o.col} ${this._compactSubBlocks ? "compact" : ""} ${_ ? "missing" : ""}"
              data-key=${n.key}
              style=${M(s)}
            >
              <div class="energy-sub-content">
                <ha-icon class="energy-sub-icon" .icon=${n.icon} style=${M(n.iconStyle)}></ha-icon>
                <div class="energy-sub-number">${this._compactSubBlocks ? h.value : d}</div>
                ${l ? k : C`<div class="energy-sub-unit">${h.unit}</div>`}
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
    const o = W(this.hass, e.solar_entity);
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
      const c = le(l.unit);
      if (!c)
        return r <= H ? 0 : r;
      if (n === null)
        n = c.family;
      else if (n !== c.family)
        return r <= H ? 0 : r;
      o += l.value * c.factor;
    }
    let s = o;
    const a = le(t);
    return a && n !== null && a.family === n && a.factor > 0 && (s /= a.factor), Number.isFinite(s) ? s <= H ? 0 : s : null;
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
      const s = W(this.hass, o.entityId);
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
    const s = Object.keys(n).length === o ? Os(n) : { comparable: !1, family: null, factors: {} }, a = s.comparable ? s.factors : void 0, l = (d) => {
      const h = e[d];
      if (h == null || !Number.isFinite(h))
        return 0;
      const _ = (a == null ? void 0 : a[d]) ?? 1;
      return h * _;
    };
    let c = l("solar") + l("grid") + l("grid_secondary") - l("battery") - l("battery_secondary");
    if (a && i) {
      const d = le(i);
      d && s.family !== null && d.family === s.family && d.factor > 0 && (c /= d.factor);
    }
    return Number.isFinite(c) ? c <= H ? 0 : c : null;
  }
  sumComparableValues(e) {
    const t = e.filter(
      (n) => n.value !== null && Number.isFinite(n.value)
    );
    if (t.length === 0)
      return null;
    let i = null, r = 0;
    for (const n of t) {
      const o = le(n.unit);
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
    }, C`
      <div class="node-trend" aria-hidden="true">
        <canvas class="node-trend-canvas-area" data-node=${e}></canvas>
      </div>
      <div class="node-trend-line" aria-hidden="true">
        <canvas class="node-trend-canvas-line" data-node=${e}></canvas>
      </div>
    `) : (delete this._trendDrawConfig[e], k);
  }
  trendPoints(e, t) {
    const i = Date.now(), r = i - Pe, n = this._trendSeries[e] ?? [];
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
      if (s === a || Math.abs(o.value - n.value) <= H) {
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
    var g, b;
    const r = Date.now() - Pe, n = 0, o = 100, s = e.map((S) => S.value), a = (t == null ? void 0 : t.min) ?? Math.min(...s), l = (t == null ? void 0 : t.max) ?? Math.max(...s);
    if (!Number.isFinite(a) || !Number.isFinite(l))
      return [];
    const c = 20, d = 80, h = Math.max(l - a, H), _ = e.map((S) => {
      const E = Math.max(0, Math.min(100, (S.ts - r) / Pe * 100)), w = n + E / 100 * (o - n), f = h <= H ? 0.5 : (S.value - a) / h, v = d - f * (d - c);
      return { x: w, y: v, value: S.value, ts: S.ts };
    }), u = ((g = _[0]) == null ? void 0 : g.x) ?? n, m = ((b = _[_.length - 1]) == null ? void 0 : b.x) ?? o, x = Math.max(0, m - u), y = 18;
    if (_.length >= 2 && x < y) {
      const S = o - y, E = Math.max(n, Math.min(S, m - y));
      if (x <= H) {
        const f = y / (_.length - 1);
        return _.map((v, $) => ({
          ...v,
          x: Math.max(n, Math.min(o, E + f * $))
        }));
      }
      const w = y / x;
      return _.map((f) => ({
        ...f,
        x: Math.max(n, Math.min(o, E + (f.x - u) * w))
      }));
    }
    return _;
  }
  toCanvasPoints(e, t, i) {
    return Pi(e, t, i);
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
      const s = le(o.unit);
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
    const t = e.getBoundingClientRect(), i = t.width <= Xs || t.height <= Js;
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
    const o = e.getBoundingClientRect(), s = t == null ? void 0 : t.getBoundingClientRect(), a = i == null ? void 0 : i.getBoundingClientRect(), l = r == null ? void 0 : r.getBoundingClientRect(), c = n == null ? void 0 : n.getBoundingClientRect(), d = s ? s.left + s.width / 2 : 0, h = a ? a.top + a.height / 2 : 0, _ = l ? l.left + l.width / 2 : 0, u = c ? c.left + c.width / 2 : 0, m = (w) => w - o.left, x = (w) => w - o.top, y = (w) => Math.round(w * 10) / 10, g = [], b = (w, f, v, $) => {
      const T = Math.min(w, f), A = Math.abs(f - w);
      A <= 0.5 || g.push({
        node: $,
        left: y(T),
        top: y(v - 1),
        width: y(A),
        height: 2
      });
    }, S = (w, f, v, $) => {
      const T = Math.min(w, f), A = Math.abs(f - w);
      A <= 0.5 || g.push({
        node: $,
        left: y(v - 1),
        top: y(T),
        width: 2,
        height: y(A)
      });
    };
    s && this.renderRoot.querySelectorAll(".energy-sub-value.home-sub").forEach((w) => {
      const f = w.getBoundingClientRect(), v = f.top + f.height / 2, $ = f.left + f.width / 2 < d ? f.right : f.left, T = v, A = v < s.top ? s.top : v > s.bottom ? s.bottom : v, R = m(d), I = x(T), F = x(A), V = m($);
      b(V, R, I, "home"), S(I, F, R, "home");
    }), a && this.renderRoot.querySelectorAll(".energy-sub-value.solar-sub").forEach((w) => {
      const f = w.getBoundingClientRect(), v = f.left + f.width / 2, $ = f.top + f.height / 2 < h ? f.bottom : f.top, T = v, A = v < a.left ? a.left : v > a.right ? a.right : v, R = x(h), I = m(T), F = m(A), V = x($);
      S(V, R, I, "solar"), b(I, F, R, "solar");
    }), l && this.renderRoot.querySelectorAll(".energy-sub-value.grid-sub").forEach((w) => {
      const f = w.getBoundingClientRect(), v = f.top + f.height / 2, $ = f.left + f.width / 2 < _ ? f.right : f.left, T = v, A = v < l.top ? l.top : v > l.bottom ? l.bottom : v, R = m(_), I = x(T), F = x(A), V = m($);
      b(V, R, I, "grid"), S(I, F, R, "grid");
    }), c && this.renderRoot.querySelectorAll(".energy-sub-value.grid_secondary-sub").forEach((w) => {
      const f = w.getBoundingClientRect(), v = f.top + f.height / 2, $ = f.left + f.width / 2 < u ? f.right : f.left, T = v, A = v < c.top ? c.top : v > c.bottom ? c.bottom : v, R = m(u), I = x(T), F = x(A), V = m($);
      b(V, R, I, "grid_secondary"), S(I, F, R, "grid_secondary");
    }), g.length === this._subNodeConnectorSegments.length && g.every(
      (w, f) => {
        var v, $, T, A, R;
        return w.node === ((v = this._subNodeConnectorSegments[f]) == null ? void 0 : v.node) && w.left === (($ = this._subNodeConnectorSegments[f]) == null ? void 0 : $.left) && w.top === ((T = this._subNodeConnectorSegments[f]) == null ? void 0 : T.top) && w.width === ((A = this._subNodeConnectorSegments[f]) == null ? void 0 : A.width) && w.height === ((R = this._subNodeConnectorSegments[f]) == null ? void 0 : R.height);
      }
    ) || (this._subNodeConnectorSegments = g);
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
      const m = r.get(_), x = n.get(_);
      if (!m || !x)
        return;
      const y = o[_];
      if (!y || y.length < 2)
        return;
      const g = (a == null ? void 0 : a[_]) ?? 1, b = a ? this.scaleTrendSeries(y, g) : y, S = this.toTrendCoordinates(b, l);
      if (S.length < 2)
        return;
      const E = this.toCanvasPoints(S, m.width, m.height), w = this.toCanvasPoints(S, x.width, x.height);
      this.drawTrendArea(
        m.ctx,
        E,
        u.color,
        m.height,
        u.threshold,
        u.thresholdColor
      ), this.drawTrendLine(x.ctx, w, u.color, u.threshold, u.thresholdColor), c += 1, d += w.length;
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
    this._actionHandler = zt(
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
    !e && i - this._lastTrendRefresh < $r || (this._lastTrendRefresh = i, this.refreshTrendHistory(e, t));
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
    }, qs));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, $r), this.updateComplete.then(() => {
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
    const i = this._config, r = G(i.trend_data_source, "hybrid"), n = this.enabledTrendNodes(i);
    if (n.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const a = this.perfNow(), l = {}, c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Set();
      let x = Number.POSITIVE_INFINITY;
      const y = Date.now() - Pe;
      for (const f of n) {
        if (f === "home" && i.home_auto_calculate === !0) {
          const R = this.homeComputationDependencies(i);
          if (R.length === 0) {
            l[f] = [];
            continue;
          }
          d.set(f, R), h.set(f, this.resolveAutoHomeUnit(i, i.unit ?? "kW"));
          const I = this._trendSeries[f] ?? [];
          if (e || I.length === 0) {
            _.add(f), R.forEach((Z) => {
              u.add(Z.entityId), m.delete(Z.entityId);
            });
            continue;
          }
          const F = ((o = I[I.length - 1]) == null ? void 0 : o.ts) ?? y, V = Math.max(y, F - kr);
          x = Math.min(x, V), R.forEach((Z) => {
            u.has(Z.entityId) || m.add(Z.entityId);
          });
          continue;
        }
        const v = this.trendEntityId(f, i);
        if (!v)
          continue;
        c.set(f, v);
        const $ = this._trendSeries[f] ?? [];
        if (e || $.length === 0 || u.has(v)) {
          u.add(v), m.delete(v);
          continue;
        }
        if (u.has(v))
          continue;
        m.add(v);
        const T = ((s = $[$.length - 1]) == null ? void 0 : s.ts) ?? y, A = Math.max(y, T - kr);
        x = Math.min(x, A);
      }
      let g = 0;
      const b = u.size > 0 ? await (async () => {
        const f = this.perfNow(), v = await De(
          this.hass,
          Array.from(u),
          Pe,
          { dataSource: r }
        );
        return g = this.perfNow() - f, v;
      })() : {};
      let S = 0;
      const E = m.size > 0 ? await (async () => {
        const f = this.perfNow(), v = await De(
          this.hass,
          Array.from(m),
          Pe,
          {
            startMs: Number.isFinite(x) ? x : y,
            dataSource: r
          }
        );
        return S = this.perfNow() - f, v;
      })() : {};
      c.forEach((f, v) => {
        const $ = this._trendSeries[v] ?? [];
        if (u.has(f)) {
          const T = b[f] ?? [];
          l[v] = T.length > 0 ? T : $.filter((A) => A.ts >= y);
          return;
        }
        if (m.has(f)) {
          const T = E[f] ?? [];
          l[v] = gt($, T, y);
          return;
        }
        l[v] = $.filter((T) => T.ts >= y);
      }), d.forEach((f, v) => {
        const $ = this._trendSeries[v] ?? [], T = this.computeAutoHomeTrendFromFetchedDependencies(
          f,
          b,
          E,
          u,
          m,
          y,
          h.get(v) ?? i.unit ?? "kW"
        );
        if (_.has(v)) {
          l[v] = T.length > 0 ? T : $.filter((A) => A.ts >= y);
          return;
        }
        l[v] = gt($, T, y);
      });
      const w = this.sameTrendSeriesKeys(l, this._trendSeries) && Object.keys(l).every(
        (f) => this.areTrendSeriesEqual(l[f] ?? [], this._trendSeries[f] ?? [])
      );
      w || (this._trendSeries = l), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - a),
        force_full: e,
        nodes: n.length,
        full_entities: u.size,
        incremental_entities: m.size,
        data_source: r,
        full_fetch_ms: this.toPerfMs(g),
        incremental_fetch_ms: this.toPerfMs(S),
        series_changed: !w
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
    return r("solar", Tr), r("home", zr), r("grid", Qt), r("grid_secondary", Qt), Array.from(t);
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
    return t.push(`source:${G(e.trend_data_source, "hybrid")}`), this.enabledTrendNodes(e).forEach((i) => {
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
      const h = W(this.hass, c.entityId);
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
    if (Math.abs(l) <= H)
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
    return e === null || e <= H ? "none" : "forward";
  }
  toBidirectionalFlow(e) {
    return e === null || Math.abs(e) <= H ? "none" : e > 0 ? "forward" : "backward";
  }
  reverseFlowDirection(e) {
    return e === "forward" ? "backward" : e === "backward" ? "forward" : "none";
  }
  formatValue(e, t, i) {
    var r, n, o;
    return Ri(e, t, i, {
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
    if (t !== null && t > H)
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
    return Oi(e, t);
  }
  toRgbCss(e) {
    return ce(e);
  }
};
J.styles = fe`
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
he([
  O({ attribute: !1 })
], J.prototype, "hass", 2);
he([
  O({ type: Boolean })
], J.prototype, "preview", 2);
he([
  O({ type: Boolean })
], J.prototype, "editMode", 2);
he([
  z()
], J.prototype, "_config", 2);
he([
  z()
], J.prototype, "_trendSeries", 2);
he([
  z()
], J.prototype, "_showSubBlocks", 2);
he([
  z()
], J.prototype, "_compactSubBlocks", 2);
he([
  z()
], J.prototype, "_subNodeConnectorSegments", 2);
J = he([
  se("power-pilz-energy-card")
], J);
const re = (e) => {
  if (typeof e != "string")
    return;
  const t = e.trim();
  return t.length > 0 ? t : void 0;
}, zn = (e, t) => {
  switch (e) {
    case 1:
      return re(t.entity_1);
    case 2:
      return re(t.entity_2);
    case 3:
      return re(t.entity_3);
    case 4:
      return re(t.entity_4);
    default:
      return;
  }
}, Mn = (e, t) => {
  switch (e) {
    case 1:
      return re(t.entity_1_name);
    case 2:
      return re(t.entity_2_name);
    case 3:
      return re(t.entity_3_name);
    case 4:
      return re(t.entity_4_name);
    default:
      return;
  }
}, An = (e, t) => {
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
}, On = (e, t) => {
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
}, Pn = (e, t) => {
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
}, Rn = (e, t) => {
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
}, In = (e, t) => {
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
}, Ln = (e) => e === "column" ? "column" : "row", Li = (e, t = 24) => {
  const i = typeof e == "number" ? e : typeof e == "string" ? Number.parseInt(e, 10) : NaN;
  return i === 6 || i === 12 || i === 24 || i === 48 || i === 72 || i === 168 || i === 336 || i === 720 ? i : t;
}, Di = (e) => typeof e != "number" || !Number.isFinite(e) ? 1.5 : Math.max(0.5, Math.min(6, e)), Dn = (e, t, i, r) => {
  var s;
  if (t)
    return t;
  const n = e[i], o = (s = n == null ? void 0 : n.attributes) == null ? void 0 : s.friendly_name;
  return typeof o == "string" && o.trim().length > 0 ? o.trim() : `Entity ${r}`;
}, Hn = (e, t, i, r) => {
  if (r)
    return Ri(e, t, i, {
      ...r,
      nullWithUnit: !0
    });
  if (e === null)
    return t ? `-- ${t}` : "--";
  const n = `${e.toFixed(i)} ${t}`.trim();
  return n.length > 0 ? n : "--";
};
function P(e) {
  var r;
  const t = ((r = e == null ? void 0 : e.locale) == null ? void 0 : r.language) ?? (e == null ? void 0 : e.language) ?? "en";
  return String(t).split("-")[0].toLowerCase() === "de" ? "de" : "en";
}
const Ei = {
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
}, ta = {
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
}, ia = { en: Ei, de: ta };
function p(e, t, i) {
  let o = (ia[e === "de" ? "de" : "en"] ?? Ei)[t] ?? Ei[t] ?? t;
  if (i)
    for (const [s, a] of Object.entries(i))
      o = o.replace(new RegExp(`\\{${s}\\}`, "g"), String(a));
  return o;
}
function et(e, t) {
  return p(e, `weekday.short.${(t % 7 + 7) % 7}`);
}
const ra = 4, Nn = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, Ar = "When enabled, hovering over the graph shows the value and timestamp for that point in the legend.", Or = "When enabled, the area below each trend line is filled with a semi-transparent gradient.", Pr = "When enabled, all entities share the same Y-axis scale. When disabled, each entity auto-scales independently.", Rr = "When enabled, the graph area is clipped so it does not extend behind the legend labels.", Ir = "Thickness of the trend lines in pixels.", Lr = "Controls where trend data is fetched from. Hybrid prefers statistics and falls back to history automatically.", Dr = "The time window shown in the graph.", Hr = "Controls whether entity legend items are displayed in a row or column layout.", Nr = "When enabled, all entity values are normalized as percentages of a reference total, so the graph always fills 0–100%.", Br = "The entity whose value represents 100%. Defaults to the last enabled entity in the stack.", Fr = "When enabled, the 100% total is auto-calculated by summing all other entities. Useful when you don't have a total meter.", Vr = "Default entity used by more-info actions. Required when tap/hold/double-tap is set to 'More info'.", Ur = "Automatically formats values with metric prefixes (e.g. W/kW/MW and Wh/kWh/MWh).", Wr = "Optional unit override. Used when entities have no unit_of_measurement attribute.", jr = "Default decimal precision for displayed values.", Gr = "Decimal precision for base units (W, Wh) when auto unit scaling is enabled.", Kr = "Decimal precision for prefixed units (kW, MW, kWh, MWh) when auto unit scaling is enabled.", na = {
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
}, oa = (e) => ({
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
                  default_color: Nn[e] ?? "purple"
                }
              }
            }
          ]
        }
      ]
    }
  ]
}), Bn = (e = !1, t = !1) => {
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
            helper: Hr,
            description: Hr
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
            helper: Dr,
            description: Dr
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
            helper: Lr,
            description: Lr
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
            helper: Ar,
            description: Ar
          },
          {
            name: "fill_area_enabled",
            selector: { boolean: {} },
            helper: Or,
            description: Or
          },
          {
            name: "shared_trend_scale",
            selector: { boolean: {} },
            helper: Pr,
            description: Pr
          },
          {
            name: "clip_graph_to_labels",
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
            name: "line_thickness",
            selector: { number: { mode: "box", min: 0.5, max: 6, step: 0.1 } },
            helper: Ir,
            description: Ir
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
            helper: Nr,
            description: Nr
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
            helper: Br,
            description: Br
          },
          {
            name: "percent_reference_auto",
            selector: { boolean: {} },
            helper: Fr,
            description: Fr
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
        helper: Vr,
        description: Vr
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
                helper: Wr,
                description: Wr
              },
              {
                name: "decimals",
                selector: { number: { mode: "box", min: 0, max: 3, step: 1 } },
                helper: jr,
                description: jr
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
                helper: Ur,
                description: Ur
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
                helper: Gr,
                description: Gr
              },
              {
                name: "decimals_prefixed_unit",
                selector: { number: { mode: "box", min: 0, max: 4, step: 1 } },
                helper: Kr,
                description: Kr
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
    ...Array.from({ length: ra }, (l, c) => oa(c + 1)),
    a,
    s
  ];
}, ae = (e) => {
  if (typeof e == "string")
    return e.length > 0 ? e : void 0;
}, Fn = (e) => e === "column" ? "column" : "row", Vn = (e) => Li(e), Un = (e) => Di(e), dt = (e, t, i) => {
  const r = e ?? t;
  return Array.isArray(r) || typeof r == "string" && r.trim().length > 0 ? r : Nn[i] ?? "purple";
}, Wn = (e) => ({
  trend_data_source: G(e.trend_data_source, "hybrid"),
  entity_1: ae(e.entity_1) ?? ae(e.entity),
  entity_1_name: ae(e.entity_1_name),
  entity_1_enabled: e.entity_1_enabled ?? !0,
  entity_1_show_icon: e.entity_1_show_icon ?? !0,
  entity_1_icon: e.entity_1_icon ?? e.icon,
  entity_1_icon_color: e.entity_1_icon_color ?? e.icon_color,
  entity_1_trend_color: dt(e.entity_1_trend_color, e.trend_color, 1),
  entity_2: ae(e.entity_2),
  entity_2_name: ae(e.entity_2_name),
  entity_2_enabled: e.entity_2_enabled ?? !1,
  entity_2_show_icon: e.entity_2_show_icon ?? !0,
  entity_2_icon: e.entity_2_icon,
  entity_2_trend_color: dt(e.entity_2_trend_color, void 0, 2),
  entity_3: ae(e.entity_3),
  entity_3_name: ae(e.entity_3_name),
  entity_3_enabled: e.entity_3_enabled ?? !1,
  entity_3_show_icon: e.entity_3_show_icon ?? !0,
  entity_3_icon: e.entity_3_icon,
  entity_3_trend_color: dt(e.entity_3_trend_color, void 0, 3),
  entity_4: ae(e.entity_4),
  entity_4_name: ae(e.entity_4_name),
  entity_4_enabled: e.entity_4_enabled ?? !1,
  entity_4_show_icon: e.entity_4_show_icon ?? !0,
  entity_4_icon: e.entity_4_icon,
  entity_4_trend_color: dt(e.entity_4_trend_color, void 0, 4)
}), sa = {
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
}, jn = (e, t = {}, i = "en") => {
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
  const s = sa[r];
  return s ? p(i, s) : na[r] ?? r;
};
var aa = Object.defineProperty, la = Object.getOwnPropertyDescriptor, Hi = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? la(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && aa(t, i, n), n;
};
const ca = Bn(!1);
let vt = class extends D {
  constructor() {
    super(...arguments), this.computeLabel = (e) => jn(e, {}, P(this.hass)), this.valueChanged = (e) => {
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
      legend_layout: Fn(e.legend_layout),
      timeframe_hours: Vn(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      decimals: e.decimals ?? 1,
      auto_scale_units: e.auto_scale_units ?? !1,
      decimals_base_unit: e.decimals_base_unit ?? e.decimals ?? 1,
      decimals_prefixed_unit: e.decimals_prefixed_unit ?? e.decimals ?? 1,
      line_thickness: Un(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...Wn(e)
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? k : C`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ye}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ca}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Hi([
  O({ attribute: !1 })
], vt.prototype, "hass", 2);
Hi([
  z()
], vt.prototype, "_config", 2);
vt = Hi([
  se("power-pilz-graph-card-editor")
], vt);
var da = Object.defineProperty, ha = Object.getOwnPropertyDescriptor, ge = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? ha(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && da(t, i, n), n;
};
const Ue = 1, Yr = 24, Zr = 300 * 1e3, ua = 60 * 1e3, _a = 350, ht = 0.01, We = 4, pa = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", ma = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), qr = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let ne = class extends D {
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
      timeframe_hours: Yr,
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
      decimals: Ue,
      decimals_base_unit: Ue,
      decimals_prefixed_unit: Ue
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Ue, i = me(e.decimals_base_unit, t), r = me(e.decimals_prefixed_unit, t), n = this.readConfigString(e.entity), o = this.readConfigString(e.icon), s = this.readConfigString(e.entity_1) ?? n ?? "sensor.dev_home_power";
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
      trend_data_source: G(e.trend_data_source, "hybrid"),
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
      return C`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return C``;
    const e = this._config, t = e.decimals ?? Ue, i = this.normalizeLineThickness(e.line_thickness), r = this.collectSeriesEntries(e, t), n = this.normalizeLegendLayout(e.legend_layout), o = e.hover_enabled !== !1, s = this.hasConfiguredAction(e), a = !this.isEditorPreview() && s, l = this._hoverState, c = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, d = c > 0 ? { top: `${c}px` } : {}, h = l ? {
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
    })), C`
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
          ${o && l ? C`<div class="hover-dot" aria-hidden="true" style=${M(h)}></div>` : k}

          <div class="content">
            <div class="series-list layout-${n}">
              ${r.length === 0 ? C`
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
    return C`
      <div class="state-item" data-slot=${String(e.slot)}>
        ${e.showIcon ? C`
              <div class="icon-wrap">
                <div class="icon-shape" style=${M(e.iconStyle)}>
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
              </div>
            ` : k}
        <div class="info">
          <div class="primary">${e.name}</div>
          <div class="secondary">${n}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(e, t) {
    const i = [];
    for (let r = 1; r <= We; r += 1) {
      const n = r, o = this.slotEnabled(n, e), s = this.slotEntityId(n, e);
      if (!o || !s)
        continue;
      const a = this.entityName(this.slotCustomName(n, e), s, r), l = j(this.hass, s), c = e.unit ?? W(this.hass, s) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(n, e), _ = this.iconStyle(this.slotIconColor(n, e)), u = this.resolveColor(qr[n], pa), m = this.resolveColor(this.slotTrendColor(n, e), u);
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
    return zn(e, t);
  }
  slotCustomName(e, t) {
    return Mn(e, t);
  }
  slotEnabled(e, t) {
    return An(e, t);
  }
  slotShowIcon(e, t) {
    return On(e, t);
  }
  slotIcon(e, t) {
    return Pn(e, t);
  }
  slotIconColor(e, t) {
    return Rn(e, t);
  }
  slotTrendColor(e, t) {
    return In(e, t);
  }
  entityName(e, t, i) {
    return Dn(this.hass.states, e, t, i);
  }
  formatValue(e, t, i) {
    var r, n, o;
    return Hn(e, t, i, {
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
    return re(e);
  }
  normalizeLegendLayout(e) {
    return Ln(e);
  }
  normalizeTimeframeHours(e) {
    return Li(e, Yr);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return Di(e);
  }
  normalizeTrendColor(e, t, i) {
    const r = e ?? t;
    return Array.isArray(r) || typeof r == "string" && r.trim().length > 0 ? r : qr[i];
  }
  iconStyle(e) {
    return He(e);
  }
  resolveColor(e, t = "") {
    return Oi(e, t);
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
    var b, S;
    const n = Date.now() - t, o = 0, s = 100, a = e.map((E) => E.value), l = (i == null ? void 0 : i.min) ?? Math.min(...a), c = (i == null ? void 0 : i.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, _ = Math.max(c - l, ht), u = e.map((E) => {
      const w = Math.max(0, Math.min(100, (E.ts - n) / t * 100)), f = o + w / 100 * (s - o), v = _ <= ht ? 0.5 : (E.value - l) / _, $ = h - v * (h - d);
      return { x: f, y: $, value: E.value, ts: E.ts };
    }), m = ((b = u[0]) == null ? void 0 : b.x) ?? o, x = ((S = u[u.length - 1]) == null ? void 0 : S.x) ?? s, y = Math.max(0, x - m), g = 18;
    if (u.length >= 2 && y < g) {
      const E = s - g, w = Math.max(o, Math.min(E, x - g));
      if (y <= ht) {
        const v = g / (u.length - 1);
        return u.map(($, T) => ({
          ...$,
          x: Math.max(o, Math.min(s, w + v * T))
        }));
      }
      const f = g / y;
      return u.map((v) => ({
        ...v,
        x: Math.max(o, Math.min(s, w + (v.x - m) * f))
      }));
    }
    return u;
  }
  toCanvasPoints(e, t, i) {
    return Pi(e, t, i).map((r) => ({
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
    Object.keys(e).map((o) => Number(o)).filter((o) => Number.isFinite(o) && o >= 1 && o <= We).forEach((o) => {
      const s = o, a = this._drawConfigs.find((c) => c.slot === s);
      if (!a)
        return;
      const l = le(a.unit);
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
    var x, y;
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
    const o = ((x = this._config) == null ? void 0 : x.fill_area_enabled) !== !1, s = this.trendWindowMs(this._config), a = {};
    this._drawConfigs.forEach((g) => {
      const b = this.trendPoints(g.slot, g.currentValue);
      b.length >= 2 && (a[g.slot] = b);
    });
    const l = ((y = this._config) == null ? void 0 : y.shared_trend_scale) === !0, c = l ? this.resolveSharedScaleFactors(a) : null;
    this._sharedScaleCanonical = c !== null, this._sharedScaleFactors = c ?? {};
    const d = l ? this.computeTrendValueRange(a, c ?? void 0) : null, h = {};
    let _ = 0, u = 0;
    [...this._drawConfigs].sort((g, b) => b.slot - g.slot).forEach((g) => {
      const b = a[g.slot];
      if (!b || b.length < 2)
        return;
      const S = (c == null ? void 0 : c[g.slot]) ?? 1, E = c ? this.scaleTrendSeries(b, S) : b, w = this.toTrendCoordinates(E, s, d);
      if (w.length < 2)
        return;
      const f = this.toCanvasPoints(w, r.width, r.height), v = this.toCanvasPoints(w, n.width, n.height);
      o && this.drawTrendArea(r.ctx, f, g.color, r.height), this.drawTrendLine(n.ctx, v, g.color, g.lineWidth), h[g.slot] = v, _ += 1, u += v.length;
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
      if (Math.abs(a) <= ht)
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
    this._actionHandler = zt(
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
    !e && i - this._lastTrendRefresh < Zr || (this._lastTrendRefresh = i, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(ma) || this.hasEditorLikeAncestor();
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
    }, _a));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Zr), this.updateComplete.then(() => {
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
    const i = this._config, r = {}, n = this.trendWindowMs(i), o = G(i.trend_data_source, "hybrid"), s = this.enabledSlots(i);
    if (s.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const l = this.perfNow(), c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
      let _ = Number.POSITIVE_INFINITY;
      const u = Date.now() - n;
      for (const S of s) {
        const E = this.slotEntityId(S, i);
        if (!E)
          continue;
        c.set(S, E);
        const w = this._trendSeries[S] ?? [];
        if (e || w.length === 0 || d.has(E)) {
          d.add(E), h.delete(E);
          continue;
        }
        if (d.has(E))
          continue;
        h.add(E);
        const f = ((a = w[w.length - 1]) == null ? void 0 : a.ts) ?? u, v = Math.max(u, f - ua);
        _ = Math.min(_, v);
      }
      let m = 0;
      const x = d.size > 0 ? await (async () => {
        const S = this.perfNow(), E = await De(
          this.hass,
          Array.from(d),
          n,
          { dataSource: o }
        );
        return m = this.perfNow() - S, E;
      })() : {};
      let y = 0;
      const g = h.size > 0 ? await (async () => {
        const S = this.perfNow(), E = await De(
          this.hass,
          Array.from(h),
          n,
          {
            startMs: Number.isFinite(_) ? _ : u,
            dataSource: o
          }
        );
        return y = this.perfNow() - S, E;
      })() : {};
      c.forEach((S, E) => {
        const w = this._trendSeries[E] ?? [];
        if (d.has(S)) {
          const f = x[S] ?? [];
          r[E] = f.length > 0 ? f : w.filter((v) => v.ts >= u);
          return;
        }
        if (h.has(S)) {
          const f = g[S] ?? [];
          r[E] = gt(w, f, u);
          return;
        }
        r[E] = w.filter((f) => f.ts >= u);
      });
      const b = this.sameTrendSeriesKeys(r, this._trendSeries) && Object.keys(r).map((S) => Number(S)).filter((S) => Number.isFinite(S) && S >= 1 && S <= We).every((S) => {
        const E = S;
        return this.areTrendSeriesEqual(r[E] ?? [], this._trendSeries[E] ?? []);
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
        incremental_fetch_ms: this.toPerfMs(y),
        series_changed: !b
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let i = 1; i <= We; i += 1) {
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
    if (!e || !t || this.trendWindowMs(e) !== this.trendWindowMs(t) || G(e.trend_data_source, "hybrid") !== G(t.trend_data_source, "hybrid"))
      return !0;
    for (let i = 1; i <= We; i += 1) {
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
ne.styles = fe`
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
ge([
  O({ attribute: !1 })
], ne.prototype, "hass", 2);
ge([
  O({ type: Boolean })
], ne.prototype, "preview", 2);
ge([
  O({ type: Boolean })
], ne.prototype, "editMode", 2);
ge([
  z()
], ne.prototype, "_config", 2);
ge([
  z()
], ne.prototype, "_trendSeries", 2);
ge([
  z()
], ne.prototype, "_graphTopInset", 2);
ge([
  z()
], ne.prototype, "_hoverState", 2);
ne = ge([
  se("power-pilz-graph-card")
], ne);
var fa = Object.defineProperty, ya = Object.getOwnPropertyDescriptor, Ni = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? ya(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && fa(t, i, n), n;
};
let wt = class extends D {
  constructor() {
    super(...arguments), this.computeLabel = (e) => jn(e, {}, P(this.hass)), this.valueChanged = (e) => {
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
      legend_layout: Fn(e.legend_layout),
      timeframe_hours: Vn(e.timeframe_hours),
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
      line_thickness: Un(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...Wn(e)
    };
    this._config = t;
  }
  render() {
    if (!this.hass || !this._config)
      return k;
    const e = this._config.normalize_stack_to_percent ?? !1, t = Bn(!0, e);
    return C`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ye}
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
Ni([
  O({ attribute: !1 })
], wt.prototype, "hass", 2);
Ni([
  z()
], wt.prototype, "_config", 2);
wt = Ni([
  se("power-pilz-graph-stack-card-editor")
], wt);
var ga = Object.defineProperty, ba = Object.getOwnPropertyDescriptor, be = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? ba(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && ga(t, i, n), n;
};
const je = 1, Xr = 24, Jr = 300 * 1e3, va = 60 * 1e3, wa = 350, xe = 0.01, Re = 4, xa = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", Sa = [
  "hui-card-preview",
  "hui-dialog-edit-card",
  "hui-dialog-create-card",
  "hui-card-picker",
  "hui-card-element-editor",
  "hui-editor-card-preview"
].join(", "), Qr = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let oe = class extends D {
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
      timeframe_hours: Xr,
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
      decimals: je,
      decimals_base_unit: je,
      decimals_prefixed_unit: je
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : je, i = me(e.decimals_base_unit, t), r = me(e.decimals_prefixed_unit, t), n = this.readConfigString(e.entity), o = this.readConfigString(e.icon), s = this.readConfigString(e.entity_1) ?? n ?? "sensor.dev_home_power";
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
      trend_data_source: G(e.trend_data_source, "hybrid"),
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
      return C`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return C``;
    const e = this._config, t = e.decimals ?? je, i = this.normalizeLineThickness(e.line_thickness), r = e.normalize_stack_to_percent === !0, n = this.collectSeriesEntries(e, t), o = this.withStackedCurrentValues(n, r, e), s = this.normalizeLegendLayout(e.legend_layout), a = e.hover_enabled !== !1, l = this.hasConfiguredAction(e), c = !this.isEditorPreview() && l, d = this._hoverState, h = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, _ = h > 0 ? { top: `${h}px` } : {}, u = d ? {
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
    })), C`
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
          ${a && d ? C`<div class="hover-dot" aria-hidden="true" style=${M(u)}></div>` : k}

          <div class="content">
            <div class="series-list layout-${s}">
              ${n.length === 0 ? C`
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
    return C`
      <div class="state-item" data-slot=${String(e.slot)}>
        ${e.showIcon ? C`
              <div class="icon-wrap">
                <div class="icon-shape" style=${M(e.iconStyle)}>
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
              </div>
            ` : k}
        <div class="info">
          <div class="primary">${e.name}</div>
          <div class="secondary">${n}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(e, t) {
    const i = [];
    for (let r = 1; r <= Re; r += 1) {
      const n = r, o = this.slotEnabled(n, e), s = this.slotEntityId(n, e);
      if (!o || !s)
        continue;
      const a = this.entityName(this.slotCustomName(n, e), s, r), l = j(this.hass, s), c = e.unit ?? W(this.hass, s) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(n, e), _ = this.iconStyle(this.slotIconColor(n, e)), u = this.resolveColor(Qr[n], xa), m = this.resolveColor(this.slotTrendColor(n, e), u);
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
    const i = t.percent_reference_slot, r = typeof i == "number" ? i : typeof i == "string" && i.length > 0 ? Number(i) : NaN, n = Number.isFinite(r) && r >= 1 && r <= Re ? r : void 0;
    return { refSlot: n !== void 0 && e.some((s) => s.slot === n) ? n : void 0, auto: t.percent_reference_auto === !0 };
  }
  withStackedCurrentValues(e, t, i) {
    var u;
    const r = this.resolveStackUnitFactors(e), { refSlot: n, auto: o } = t ? this.resolvePercentReference(e, i) : { refSlot: void 0, auto: !1 }, s = (m) => m.currentValue === null || !Number.isFinite(m.currentValue) ? 0 : r ? m.currentValue * (r[m.slot] ?? 1) : m.currentValue;
    let a, l;
    if (t && n !== void 0 && !o) {
      const m = e.find((x) => x.slot === n);
      a = m ? s(m) : 0, l = n;
    } else t && o ? (a = e.reduce((m, x) => x.slot !== n ? m + s(x) : m, 0), l = n) : (a = e.reduce((m, x) => m + s(x), 0), l = (u = e[e.length - 1]) == null ? void 0 : u.slot);
    const c = Number.isFinite(a) && Math.abs(a) > xe;
    let d = 0, h = 0, _ = !1;
    return e.map((m) => {
      const x = n !== void 0 && m.slot === n && !o;
      m.currentValue !== null && Number.isFinite(m.currentValue) && (x || (d += m.currentValue, r && (h += m.currentValue * (r[m.slot] ?? 1))), _ = !0);
      let y;
      if (!_)
        y = null;
      else if (t)
        if (!c)
          y = 0;
        else if (x)
          y = 100;
        else if (n !== void 0 || o) {
          const b = s(m);
          y = Math.max(0, Math.min(100, b / a * 100));
        } else {
          const b = r ? h : d;
          y = m.slot === l ? 100 : Math.max(0, Math.min(100, b / a * 100));
        }
      else
        y = r ? h / (r[m.slot] ?? 1) : d;
      const g = t ? "%" : m.unit;
      return {
        ...m,
        unit: g,
        secondary: this.formatValue(y, g, m.decimals)
      };
    });
  }
  slotEntityId(e, t) {
    return zn(e, t);
  }
  slotCustomName(e, t) {
    return Mn(e, t);
  }
  slotEnabled(e, t) {
    return An(e, t);
  }
  slotShowIcon(e, t) {
    return On(e, t);
  }
  slotIcon(e, t) {
    return Pn(e, t);
  }
  slotIconColor(e, t) {
    return Rn(e, t);
  }
  slotTrendColor(e, t) {
    return In(e, t);
  }
  entityName(e, t, i) {
    return Dn(this.hass.states, e, t, i);
  }
  formatValue(e, t, i) {
    var r, n, o;
    return Hn(e, t, i, {
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
      const n = le(r.unit);
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
    return re(e);
  }
  normalizeLegendLayout(e) {
    return Ln(e);
  }
  normalizeTimeframeHours(e) {
    return Li(e, Xr);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return Di(e);
  }
  normalizeTrendColor(e, t, i) {
    const r = e ?? t;
    return Array.isArray(r) || typeof r == "string" && r.trim().length > 0 ? r : Qr[i];
  }
  iconStyle(e) {
    return He(e);
  }
  resolveColor(e, t = "") {
    return Oi(e, t);
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
    var b, S;
    const n = Date.now() - t, o = 0, s = 100, a = e.map((E) => E.value), l = (i == null ? void 0 : i.min) ?? Math.min(...a), c = (i == null ? void 0 : i.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, _ = Math.max(c - l, xe), u = e.map((E) => {
      const w = Math.max(0, Math.min(100, (E.ts - n) / t * 100)), f = o + w / 100 * (s - o), v = _ <= xe ? 0.5 : (E.value - l) / _, $ = h - v * (h - d);
      return { x: f, y: $, value: E.value, ts: E.ts };
    }), m = ((b = u[0]) == null ? void 0 : b.x) ?? o, x = ((S = u[u.length - 1]) == null ? void 0 : S.x) ?? s, y = Math.max(0, x - m), g = 18;
    if (u.length >= 2 && y < g) {
      const E = s - g, w = Math.max(o, Math.min(E, x - g));
      if (y <= xe) {
        const v = g / (u.length - 1);
        return u.map(($, T) => ({
          ...$,
          x: Math.max(o, Math.min(s, w + v * T))
        }));
      }
      const f = g / y;
      return u.map((v) => ({
        ...v,
        x: Math.max(o, Math.min(s, w + (v.x - m) * f))
      }));
    }
    return u;
  }
  toCanvasPoints(e, t, i) {
    return Pi(e, t, i).map((r) => ({
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
    var b, S, E;
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
    const o = ((b = this._config) == null ? void 0 : b.fill_area_enabled) !== !1, s = ((S = this._config) == null ? void 0 : S.normalize_stack_to_percent) === !0, a = ((E = this._config) == null ? void 0 : E.shared_trend_scale) === !0, l = this.resolveStackUnitFactors(this._drawConfigs);
    this._stackCanonicalMode = l !== null, this._stackCanonicalFactors = l ?? {}, this._stackNormalizeToPercent = s;
    const c = this.trendWindowMs(this._config), d = {}, h = s ? this.resolvePercentReference(
      this._drawConfigs,
      this._config
    ) : { refSlot: void 0, auto: !1 }, _ = this.buildStackedTrendSeries(c, l ?? void 0, h.refSlot, h.auto), u = s ? this.normalizeStackedSeriesToPercent(_, h.refSlot, h.auto) : _, m = s ? { min: 0, max: 100 } : a ? this.computeStackedValueRange(u) : null;
    let x = 0, y = 0;
    [...this._drawConfigs].sort((w, f) => f.slot - w.slot).forEach((w) => {
      const f = u[w.slot] ?? [];
      if (f.length < 2)
        return;
      const v = this.toTrendCoordinates(f, c, m);
      if (v.length < 2)
        return;
      const $ = this.toCanvasPoints(v, r.width, r.height), T = this.toCanvasPoints(v, n.width, n.height);
      o && this.drawTrendArea(r.ctx, $, w.color, r.height), this.drawTrendLine(n.ctx, T, w.color, w.lineWidth), d[w.slot] = T, x += 1, y += T.length;
    }), this._linePointsBySlot = d, this._hoverState && !d[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: x,
      points: y,
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
    if (Math.abs(l) <= xe)
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
    const r = {}, n = Object.keys(e).map((a) => Number(a)).filter((a) => Number.isFinite(a) && a >= 1 && a <= Re).sort((a, l) => a - l);
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
        if (!Number.isFinite(d) || Math.abs(d) <= xe)
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
      if (Math.abs(a) <= xe)
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
    this._actionHandler = zt(
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
    !e && i - this._lastTrendRefresh < Jr || (this._lastTrendRefresh = i, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest(Sa) || this.hasEditorLikeAncestor();
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
    }, wa));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Jr), this.updateComplete.then(() => {
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
    const i = this._config, r = {}, n = this.trendWindowMs(i), o = G(i.trend_data_source, "hybrid"), s = this.enabledSlots(i);
    if (s.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const l = this.perfNow(), c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
      let _ = Number.POSITIVE_INFINITY;
      const u = Date.now() - n;
      for (const S of s) {
        const E = this.slotEntityId(S, i);
        if (!E)
          continue;
        c.set(S, E);
        const w = this._trendSeries[S] ?? [];
        if (e || w.length === 0 || d.has(E)) {
          d.add(E), h.delete(E);
          continue;
        }
        if (d.has(E))
          continue;
        h.add(E);
        const f = ((a = w[w.length - 1]) == null ? void 0 : a.ts) ?? u, v = Math.max(u, f - va);
        _ = Math.min(_, v);
      }
      let m = 0;
      const x = d.size > 0 ? await (async () => {
        const S = this.perfNow(), E = await De(
          this.hass,
          Array.from(d),
          n,
          { dataSource: o }
        );
        return m = this.perfNow() - S, E;
      })() : {};
      let y = 0;
      const g = h.size > 0 ? await (async () => {
        const S = this.perfNow(), E = await De(
          this.hass,
          Array.from(h),
          n,
          {
            startMs: Number.isFinite(_) ? _ : u,
            dataSource: o
          }
        );
        return y = this.perfNow() - S, E;
      })() : {};
      c.forEach((S, E) => {
        const w = this._trendSeries[E] ?? [];
        if (d.has(S)) {
          const f = x[S] ?? [];
          r[E] = f.length > 0 ? f : w.filter((v) => v.ts >= u);
          return;
        }
        if (h.has(S)) {
          const f = g[S] ?? [];
          r[E] = gt(w, f, u);
          return;
        }
        r[E] = w.filter((f) => f.ts >= u);
      });
      const b = this.sameTrendSeriesKeys(r, this._trendSeries) && Object.keys(r).map((S) => Number(S)).filter((S) => Number.isFinite(S) && S >= 1 && S <= Re).every((S) => {
        const E = S;
        return this.areTrendSeriesEqual(r[E] ?? [], this._trendSeries[E] ?? []);
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
        incremental_fetch_ms: this.toPerfMs(y),
        series_changed: !b
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let i = 1; i <= Re; i += 1) {
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
    if (!e || !t || this.trendWindowMs(e) !== this.trendWindowMs(t) || G(e.trend_data_source, "hybrid") !== G(t.trend_data_source, "hybrid"))
      return !0;
    for (let i = 1; i <= Re; i += 1) {
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
oe.styles = fe`
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
be([
  O({ attribute: !1 })
], oe.prototype, "hass", 2);
be([
  O({ type: Boolean })
], oe.prototype, "preview", 2);
be([
  O({ type: Boolean })
], oe.prototype, "editMode", 2);
be([
  z()
], oe.prototype, "_config", 2);
be([
  z()
], oe.prototype, "_trendSeries", 2);
be([
  z()
], oe.prototype, "_graphTopInset", 2);
be([
  z()
], oe.prototype, "_hoverState", 2);
oe = be([
  se("power-pilz-graph-stack-card")
], oe);
var Ea = Object.defineProperty, Ca = Object.getOwnPropertyDescriptor, Bi = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Ca(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Ea(t, i, n), n;
};
const $a = [
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
let xt = class extends D {
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
    const e = P(this.hass);
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
    return !this.hass || !this._config ? k : C`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ye}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${$a}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
Bi([
  O({ attribute: !1 })
], xt.prototype, "hass", 2);
Bi([
  z()
], xt.prototype, "_config", 2);
xt = Bi([
  se("power-pilz-wallbox-card-editor")
], xt);
var ka = Object.defineProperty, ke = (e, t, i, r) => {
  for (var n = void 0, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = s(t, i, n) || n);
  return n && ka(t, i, n), n;
};
const Ta = 0.01, en = "power-pilz-wallbox-mode-menu-portal-style", Wi = class Wi extends D {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._actionBusy = !1, this._modeMenuOpen = !1, this._modeMenuOptionCount = 0, this.toggleModeMenu = (t) => {
      var s;
      if (t.stopPropagation(), this.isEditorPreview() || !((s = this._config) != null && s.mode_entity) || this._actionBusy)
        return;
      const i = N(this.hass, this._config.mode_entity), r = (i == null ? void 0 : i.state) ?? "", n = this.getModeOptions(i);
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
      const i = N(this.hass, this._config.mode_entity);
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
      const i = j(this.hass, this._config.power_entity), r = mt(this.hass, this._config.status_entity), n = this.isCharging(r, i, this._config.command_entity), o = this.resolveActionCommand(n);
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
      name: t.name ?? p(P(this.hass), "wallbox.default_name"),
      show_mode_selector: t.show_mode_selector ?? !0,
      show_live_value: t.show_live_value ?? !0,
      show_command_button: t.show_command_button ?? !0,
      decimals: r,
      auto_scale_units: t.auto_scale_units ?? !1,
      decimals_base_unit: me(t.decimals_base_unit, r),
      decimals_prefixed_unit: me(t.decimals_prefixed_unit, r),
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
    const t = P(this.hass);
    if (!this._config)
      return C`<ha-card>${p(t, "common.invalid_config")}</ha-card>`;
    if (!this.hass)
      return C``;
    const i = this._config, r = j(this.hass, i.power_entity), n = W(this.hass, i.power_entity) ?? "kW", o = mt(this.hass, i.status_entity), s = N(this.hass, i.mode_entity), a = (s == null ? void 0 : s.state) ?? "", l = this.getModeOptions(s), c = this.isCharging(o, r, i.command_entity), d = this.resolveActionCommand(c), h = c ? p(t, "wallbox.stop") : p(t, "wallbox.start"), _ = c ? "mdi:pause" : "mdi:play", u = this.statusLabel(o, c), m = this.formatPower(r, n, i.decimals ?? 1), x = this.showModeSelector(i, l), y = this.showLiveValue(i), g = this.showCommandButton(i), b = this.isEditorPreview() || this._actionBusy || !i.mode_entity || l.length === 0, S = a || l[0] || p(t, "wallbox.mode_fallback"), E = this._modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down", w = this.iconStyle(i.icon_color), v = Number(y) + Number(g) === 1, $ = x && y && g, T = v && y, A = v && g || $, R = T || A, I = y && !T, F = g && !A, V = x || I || F, Z = x ? I || F ? F ? "actions" : "actions no-command" : "actions mode-only" : "actions no-mode";
    return (!x || b) && this._modeMenuOpen && this.closeModeMenuPortal(), C`
      <ha-card>
        <div class="container">
          <div class="state-item ${R ? "compact-state" : ""}">
            <div class="icon-wrap">
              <div class="icon-shape" style=${M(w)}>
                <ha-icon .icon=${i.icon ?? "mdi:ev-station"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${i.name}</div>
              <div class="secondary">${p(t, "wallbox.ev_charger")}</div>
            </div>

            ${R ? C`
                  <div class="compact-trailing ${A ? "button-only" : ""}">
                    ${T ? C`
                          <div class="compact-live-value">
                            <span>${u}</span>
                            <span class="dot">•</span>
                            <span>${m}</span>
                          </div>
                        ` : C``}

                    ${A ? C`
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
                        ` : C``}
                  </div>
                ` : C``}
          </div>

          ${V ? C`
                <div class=${Z}>
                  ${x ? C`
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
                            <span class="mode-select-label">${S}</span>
                            <ha-icon class="mode-select-chevron" .icon=${E}></ha-icon>
                          </button>
                        </div>
                      ` : C``}

                  ${I ? C`
                        <div class="live-value">
                          <span>${u}</span>
                          <span class="dot">•</span>
                          <span>${m}</span>
                        </div>
                      ` : C``}

                  ${F ? C`
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
                      ` : C``}
                </div>
              ` : C``}
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
    const r = P(this.hass);
    if (!t)
      return i ? p(r, "wallbox.status_charging") : p(r, "wallbox.status_idle");
    const o = `wallbox.status_${t.toLowerCase().replace(/[_\s-]+/g, "_")}`, s = p(r, o);
    return s !== o ? s : t.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (a) => a.toUpperCase());
  }
  formatPower(t, i, r) {
    var o, s, a;
    const n = t === null ? null : Math.abs(t);
    return Ri(n, i, r, {
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
      const o = (n = mt(this.hass, r)) == null ? void 0 : n.toLowerCase();
      if (o === "on")
        return !0;
      if (o === "off")
        return !1;
    }
    return i !== null && i > Ta;
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
    return He(t);
  }
  disconnectedCallback() {
    this.closeModeMenuPortal(), super.disconnectedCallback();
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  ensureModeMenuPortalStyles() {
    if (document.getElementById(en))
      return;
    const t = document.createElement("style");
    t.id = en, t.textContent = `
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
Wi.styles = fe`
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
let Q = Wi;
ke([
  O({ attribute: !1 })
], Q.prototype, "hass");
ke([
  O({ type: Boolean })
], Q.prototype, "preview");
ke([
  O({ type: Boolean })
], Q.prototype, "editMode");
ke([
  O({ reflect: !0, type: String })
], Q.prototype, "layout");
ke([
  z()
], Q.prototype, "_config");
ke([
  z()
], Q.prototype, "_actionBusy");
ke([
  z()
], Q.prototype, "_modeMenuOpen");
class za extends Q {
}
customElements.get("power-pilz-wallbox-card") || customElements.define("power-pilz-wallbox-card", Q);
customElements.get("power-pilz-wallbox-card-v2") || customElements.define("power-pilz-wallbox-card-v2", za);
var Ma = Object.defineProperty, Aa = Object.getOwnPropertyDescriptor, Fi = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Aa(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Ma(t, i, n), n;
};
let St = class extends D {
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
    const i = P(this.hass);
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
    const e = P(this.hass);
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
    const e = P(this.hass), t = {
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
    return !this.hass || !this._config ? k : C`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ye}
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
Fi([
  O({ attribute: !1 })
], St.prototype, "hass", 2);
Fi([
  z()
], St.prototype, "_config", 2);
St = Fi([
  se("power-pilz-switch-card-editor")
], St);
var Oa = Object.defineProperty, it = (e, t, i, r) => {
  for (var n = void 0, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = s(t, i, n) || n);
  return n && Oa(t, i, n), n;
};
const Pa = 5, tn = 4, Ra = {
  small: "36%",
  medium: "48%",
  large: "62%"
}, ji = class ji extends D {
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
      const t = N(this.hass, this._config.entity);
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
      name: t.name ?? p(P(this.hass), "switch.default_name")
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
    return Array.from(new Set(r)).slice(0, Pa);
  }
  activeIndex(t, i) {
    const r = t.indexOf(i);
    return r >= 0 ? r : 0;
  }
  iconStyle(t) {
    return He(t);
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
    const r = `state_${t + 1}_color`, n = i[r], o = ce(n);
    if (o) return `rgba(${o}, 0.25)`;
    const s = ce(i.slider_color);
    return s ? `rgba(${s}, 0.25)` : null;
  }
  /** Resolve segment text color for the active state index. */
  segmentActiveColor(t) {
    const i = this._config;
    if (!i) return null;
    const r = `state_${t + 1}_color`, n = i[r], o = ce(n);
    if (o) return `rgb(${o})`;
    const s = ce(i.slider_color);
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
      return C`<ha-icon class="seg-icon" .icon=${i}></ha-icon>`;
    if (t === 0)
      return C`<span class="seg-symbol"><span class="seg-dot"></span></span>`;
    const r = Array.from({ length: t }, () => C`<span class="seg-bar"></span>`);
    return C`<span class="seg-symbol seg-bars">${r}</span>`;
  }
  // --- Slider template (shared between layouts) ---
  renderSlider(t, i, r, n) {
    return C`
      <div class="slider-track">
        <div class="slider-pill" style=${M(r)}></div>
        ${t.map(
      (o, s) => C`
            <button
              type="button"
              class="slider-segment ${s === i ? "active" : ""}"
              style=${s === i && n ? M({ color: n }) : k}
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
    var E;
    if (!this._config)
      return C`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return C``;
    const t = this._config, i = N(this.hass, t.entity), r = (i == null ? void 0 : i.state) ?? "", n = this.getOptions(i), o = this.activeIndex(n, r), s = o === 0 && t.dim_inactive_icon !== !1, a = this.iconStyle(s ? "disabled" : t.icon_color), l = n.length, c = l > 0 ? o / l * 100 : 0, d = l > 0 ? 100 / l : 100, h = (E = i == null ? void 0 : i.attributes) == null ? void 0 : E.friendly_name, _ = t.subtitle || r || p(P(this.hass), "common.unknown"), u = this.resolvedCardLayout(), m = this.resolvedSliderSize(), x = Ra[m], y = l > 1, g = this.pillColor(o), b = {
      width: `calc(${d}% - ${tn * 2}px)`,
      left: `calc(${c}% + ${tn}px)`
    };
    g && (b["background-color"] = g);
    const S = this.segmentActiveColor(o);
    return u === "vertical" ? C`
        <ha-card @click=${this.handleCardTap}>
          <div class="container vertical">
            <div class="state-item">
              <div class="icon-wrap">
                <div class="icon-shape" style=${M(a)}>
                  <ha-icon .icon=${t.icon ?? "mdi:toggle-switch-outline"}></ha-icon>
                </div>
              </div>
              <div class="info">
                <div class="primary">${t.name || h || p(P(this.hass), "switch.default_name")}</div>
                <div class="secondary">${_}</div>
              </div>
            </div>
            ${y ? C`
                  <div class="slider-row">
                    ${this.renderSlider(n, o, b, S)}
                  </div>
                ` : C``}
          </div>
        </ha-card>
      ` : C`
      <ha-card @click=${this.handleCardTap}>
        <div class="container horizontal">
          <div class="state-item">
            <div class="icon-wrap">
              <div class="icon-shape" style=${M(a)}>
                <ha-icon .icon=${t.icon ?? "mdi:toggle-switch-outline"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${t.name || h || p(P(this.hass), "switch.default_name")}</div>
              <div class="secondary">${_}</div>
            </div>
            ${y ? C`
                  <div class="slider-wrap" style=${M({ width: x })}>
                    ${this.renderSlider(n, o, b, S)}
                  </div>
                ` : C``}
          </div>
        </div>
      </ha-card>
    `;
  }
};
ji.styles = fe`
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
let de = ji;
it([
  O({ attribute: !1 })
], de.prototype, "hass");
it([
  O({ type: Boolean })
], de.prototype, "preview");
it([
  O({ type: Boolean })
], de.prototype, "editMode");
it([
  O({ reflect: !0, type: String })
], de.prototype, "layout");
it([
  z()
], de.prototype, "_config");
class Ia extends de {
}
customElements.get("power-pilz-switch-card") || customElements.define("power-pilz-switch-card", de);
customElements.get("power-pilz-switch-card-v2") || customElements.define("power-pilz-switch-card-v2", Ia);
var La = Object.defineProperty, te = (e, t, i, r) => {
  for (var n = void 0, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = s(t, i, n) || n);
  return n && La(t, i, n), n;
};
const Ci = "power-pilz-schedule-edit-dialog", rn = [
  { key: "monday", dayIndex: 1 },
  { key: "tuesday", dayIndex: 2 },
  { key: "wednesday", dayIndex: 3 },
  { key: "thursday", dayIndex: 4 },
  { key: "friday", dayIndex: 5 },
  { key: "saturday", dayIndex: 6 },
  { key: "sunday", dayIndex: 0 }
], nn = 15, Da = 15, ue = 1440;
function on() {
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
const Gi = class Gi extends D {
  constructor() {
    super(...arguments), this.scheduleEntityId = "", this.dialogTitle = "", this._blocks = on(), this._loading = !0, this._saving = !1, this._closing = !1, this._dirty = !1, this._onKeyDown = (t) => {
      t.key !== "Escape" || this._saving || (this._editing ? this._cancelBlockEdit() : this._close());
    }, this._handleBackdropClick = (t) => {
      t.target === t.currentTarget && !this._saving && this._close();
    }, this._handleTrackPointerDown = (t) => {
      if (t.button !== 0 || this._loading || this._loadError || t.target.closest(".pp-block")) return;
      const i = t.currentTarget, r = i.dataset.day;
      if (!r) return;
      t.preventDefault();
      try {
        i.setPointerCapture(t.pointerId);
      } catch {
      }
      const n = this._pxToMin(i, t.clientX);
      this._drag = {
        day: r,
        trackEl: i,
        pointerId: t.pointerId,
        startMin: n,
        endMin: n
      };
    }, this._handleTrackPointerMove = (t) => {
      if (!this._drag || t.pointerId !== this._drag.pointerId) return;
      const i = this._pxToMin(this._drag.trackEl, t.clientX);
      i !== this._drag.endMin && (this._drag = { ...this._drag, endMin: i });
    }, this._handleTrackPointerUp = (t) => {
      if (!this._drag || t.pointerId !== this._drag.pointerId) return;
      const i = this._drag;
      this._drag = void 0;
      try {
        i.trackEl.releasePointerCapture(i.pointerId);
      } catch {
      }
      const r = Math.min(i.startMin, i.endMin), n = Math.max(i.startMin, i.endMin);
      if (n - r < Da) return;
      const o = this._blocksForDay(i.day);
      o.some(
        (a) => ln(q(a.from), q(a.to), r, n)
      ) || (o.push({ from: ut(r), to: ut(n) }), this._setBlocksForDay(i.day, o));
    }, this._handleTrackPointerCancel = (t) => {
      if (this._drag && t.pointerId === this._drag.pointerId) {
        try {
          this._drag.trackEl.releasePointerCapture(this._drag.pointerId);
        } catch {
        }
        this._drag = void 0;
      }
    }, this._handleBlockClick = (t) => {
      t.stopPropagation();
      const i = t.currentTarget, r = i.dataset.day, n = parseInt(i.dataset.index ?? "-1", 10);
      if (!r || n < 0) return;
      const s = this._blocksForDay(r)[n];
      s && (this._editing = {
        day: r,
        index: n,
        from: $i(s.from),
        to: $i(s.to),
        dataText: s.data ? JSON.stringify(s.data, null, 2) : ""
      });
    }, this._handleEditFromChange = (t) => {
      this._updateEditingField("from", an(t.target.value));
    }, this._handleEditToChange = (t) => {
      this._updateEditingField("to", an(t.target.value));
    }, this._handleEditDataChange = (t) => {
      this._updateEditingField("dataText", t.target.value);
    };
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("keydown", this._onKeyDown), this._loadSchedule();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("keydown", this._onKeyDown);
  }
  // ------------------------------------------------------------
  // Load + save
  // ------------------------------------------------------------
  async _loadSchedule() {
    var i, r, n;
    const t = P(this.hass);
    try {
      const o = (r = (i = this.hass) == null ? void 0 : i.states) == null ? void 0 : r[this.scheduleEntityId];
      if (!o) {
        this._loadError = p(t, "schedule.edit_dialog.error_not_found", {
          entity: this.scheduleEntityId
        });
        return;
      }
      const s = (n = o.attributes) == null ? void 0 : n.week_blocks, a = on();
      if (s && typeof s == "object" && !Array.isArray(s))
        for (const l of Object.keys(a)) {
          const c = s[l];
          Array.isArray(c) && (a[l] = c.filter((d) => d && typeof d == "object").map((d) => {
            const h = d, _ = {
              from: String(h.from ?? "00:00:00"),
              to: String(h.to ?? "00:00:00")
            };
            return h.data && typeof h.data == "object" && !Array.isArray(h.data) && (_.data = h.data), _;
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
      this._saving = !0;
      try {
        await this.hass.callService(
          "powerpilz_companion",
          "set_schedule_blocks",
          {
            entity_id: this.scheduleEntityId,
            blocks: this._blocks
          }
        ), this._dirty = !1, this._close();
      } catch (t) {
        this._saving = !1, this._loadError = String((t == null ? void 0 : t.message) || t);
      }
    }
  }
  _close() {
    this._closing || (this._closing = !0, setTimeout(() => this.remove(), 180));
  }
  // ------------------------------------------------------------
  // Block list helpers
  // ------------------------------------------------------------
  _blocksForDay(t) {
    const i = this._blocks[t];
    return Array.isArray(i) ? [...i] : [];
  }
  _setBlocksForDay(t, i) {
    const r = Ha(i);
    this._blocks = { ...this._blocks, [t]: r }, this._dirty = !0;
  }
  // ------------------------------------------------------------
  // Drag-to-create interaction
  // ------------------------------------------------------------
  _pxToMin(t, i) {
    const r = t.getBoundingClientRect(), n = (i - r.left) / r.width, o = Math.max(0, Math.min(ue, Math.round(n * ue)));
    return Math.round(o / nn) * nn;
  }
  _updateEditingField(t, i) {
    this._editing && (this._editing = { ...this._editing, [t]: i, error: void 0, dataError: void 0 });
  }
  _saveBlockEdit() {
    if (!this._editing) return;
    const t = P(this.hass), { day: i, index: r, from: n, to: o, dataText: s } = this._editing, a = q(n), l = q(o);
    if (isNaN(a) || isNaN(l)) {
      this._editing = { ...this._editing, error: p(t, "schedule.edit_dialog.err_time") };
      return;
    }
    if (l <= a) {
      this._editing = { ...this._editing, error: p(t, "schedule.edit_dialog.err_order") };
      return;
    }
    let c;
    const d = s.trim();
    if (d)
      try {
        const m = JSON.parse(d);
        if (typeof m != "object" || m === null || Array.isArray(m))
          throw new Error("not an object");
        c = m;
      } catch {
        this._editing = {
          ...this._editing,
          dataError: p(t, "schedule.edit_dialog.err_data")
        };
        return;
      }
    const h = this._blocksForDay(i);
    if (h.some(
      (m, x) => x !== r && ln(q(m.from), q(m.to), a, l)
    )) {
      this._editing = { ...this._editing, error: p(t, "schedule.edit_dialog.err_overlap") };
      return;
    }
    const u = {
      from: ut(a, n),
      to: ut(l, o)
    };
    c && (u.data = c), h[r] = u, this._setBlocksForDay(i, h), this._editing = void 0;
  }
  _deleteEditingBlock() {
    if (!this._editing) return;
    const { day: t, index: i } = this._editing, r = this._blocksForDay(t).filter((n, o) => o !== i);
    this._setBlocksForDay(t, r), this._editing = void 0;
  }
  _cancelBlockEdit() {
    this._editing = void 0;
  }
  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  render() {
    var r, n, o, s;
    const t = P(this.hass), i = this.dialogTitle || ((s = (o = (n = (r = this.hass) == null ? void 0 : r.states) == null ? void 0 : n[this.scheduleEntityId]) == null ? void 0 : o.attributes) == null ? void 0 : s.friendly_name) || p(t, "schedule.edit_dialog.default_title");
    return C`
      <div
        class="backdrop ${this._closing ? "closing" : ""}"
        @click=${this._handleBackdropClick}
      >
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          aria-label=${i}
          @click=${(a) => a.stopPropagation()}
        >
          <header>
            <h2>${i}</h2>
            <button class="close-x" @click=${this._close} aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="body">${this._renderBody(t)}</div>
          <footer>
            <button class="flat" @click=${this._close} ?disabled=${this._saving}>
              ${p(t, "common.cancel")}
            </button>
            <button
              class="primary"
              @click=${this._handleSave}
              ?disabled=${this._saving || !this._dirty || !!this._loadError}
            >
              ${this._saving ? p(t, "common.saving") || "Saving…" : p(t, "common.save") || "Save"}
            </button>
          </footer>
          ${this._editing ? this._renderBlockEditor(t) : k}
        </div>
      </div>
    `;
  }
  _renderBody(t) {
    return this._loading ? C`<div class="msg">${p(t, "common.loading") || "Loading…"}</div>` : this._loadError ? C`<div class="msg error">${this._loadError}</div>` : C`
      <div class="editor">
        <div class="hour-header">
          <div class="day-col"></div>
          <div class="hour-labels">
            ${[0, 6, 12, 18, 24].map(
      (i) => C`<span style=${M({ left: `${i / 24 * 100}%` })}>${String(i).padStart(2, "0")}</span>`
    )}
          </div>
        </div>
        ${rn.map((i) => this._renderDayRow(i.key, i.dayIndex, t))}
        <div class="hint">${p(t, "schedule.edit_dialog.hint_v2")}</div>
      </div>
    `;
  }
  _renderDayRow(t, i, r) {
    var s;
    const n = this._blocksForDay(t);
    let o = k;
    if (((s = this._drag) == null ? void 0 : s.day) === t) {
      const a = Math.min(this._drag.startMin, this._drag.endMin), l = Math.max(this._drag.startMin, this._drag.endMin);
      if (l > a) {
        const c = a / ue * 100, d = (l - a) / ue * 100;
        o = C`
          <div
            class="pp-block ghost"
            style=${M({ left: `${c}%`, width: `${d}%` })}
          >
            <span class="pp-block-label">
              ${sn(a)}–${sn(l)}
            </span>
          </div>
        `;
      }
    }
    return C`
      <div class="day-row">
        <div class="day-col">${et(r, i)}</div>
        <div
          class="day-track"
          data-day=${t}
          @pointerdown=${this._handleTrackPointerDown}
          @pointermove=${this._handleTrackPointerMove}
          @pointerup=${this._handleTrackPointerUp}
          @pointercancel=${this._handleTrackPointerCancel}
        >
          ${n.map((a, l) => {
      const c = q(a.from), d = q(a.to), h = c / ue * 100, _ = (d - c) / ue * 100;
      return C`
              <div
                class="pp-block"
                data-day=${t}
                data-index=${l}
                style=${M({ left: `${h}%`, width: `${_}%` })}
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
  _renderBlockEditor(t) {
    var n;
    if (!this._editing) return C``;
    const i = this._editing, r = et(
      t,
      ((n = rn.find((o) => o.key === i.day)) == null ? void 0 : n.dayIndex) ?? 0
    );
    return C`
      <div class="inner-backdrop" @click=${this._cancelBlockEdit}>
        <div class="inner-dialog" @click=${(o) => o.stopPropagation()}>
          <header>
            <h3>
              ${p(t, "schedule.edit_dialog.block_title", { day: r })}
            </h3>
            <button class="close-x" @click=${this._cancelBlockEdit} aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          <div class="inner-body">
            <label class="field">
              <span>${p(t, "schedule.edit_dialog.from")}</span>
              <input
                type="time"
                step="1"
                .value=${i.from.slice(0, 8)}
                @change=${this._handleEditFromChange}
              />
            </label>
            <label class="field">
              <span>${p(t, "schedule.edit_dialog.to")}</span>
              <input
                type="time"
                step="1"
                .value=${i.to.slice(0, 8)}
                @change=${this._handleEditToChange}
              />
            </label>
            <label class="field">
              <span>
                ${p(t, "schedule.edit_dialog.data")}
                <small>${p(t, "schedule.edit_dialog.data_help")}</small>
              </span>
              <textarea
                rows="4"
                spellcheck="false"
                placeholder='{"mode": "heat"}'
                .value=${i.dataText}
                @input=${this._handleEditDataChange}
              ></textarea>
              ${i.dataError ? C`<span class="err">${i.dataError}</span>` : k}
            </label>
            ${i.error ? C`<div class="err">${i.error}</div>` : k}
          </div>
          <footer>
            <button class="danger" @click=${this._deleteEditingBlock}>
              ${p(t, "schedule.edit_dialog.delete")}
            </button>
            <div class="spacer"></div>
            <button class="flat" @click=${this._cancelBlockEdit}>
              ${p(t, "common.cancel")}
            </button>
            <button class="primary" @click=${() => this._saveBlockEdit()}>
              ${p(t, "common.save")}
            </button>
          </footer>
        </div>
      </div>
    `;
  }
};
Gi.styles = fe`
    :host {
      position: fixed; inset: 0; z-index: 10000;
      font-family: var(--paper-font-body1_-_font-family, inherit);
    }
    .backdrop {
      position: fixed; inset: 0;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(2px);
      display: flex; align-items: center; justify-content: center;
      padding: 24px 16px;
      animation: fade-in 0.18s ease;
    }
    .backdrop.closing { animation: fade-out 0.15s ease forwards; }
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }

    .dialog {
      position: relative;
      background: var(--card-background-color, var(--primary-background-color, #fff));
      color: var(--primary-text-color, #212121);
      border-radius: 16px;
      box-shadow: 0 12px 48px rgba(0,0,0,0.3);
      width: min(100%, 900px);
      max-height: calc(100vh - 48px);
      display: flex; flex-direction: column;
      overflow: hidden;
      animation: pop-in 0.22s cubic-bezier(0.2, 0.9, 0.3, 1.1);
    }
    @keyframes pop-in {
      from { opacity: 0; transform: translateY(10px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    header {
      padding: 14px 20px;
      display: flex; align-items: center; gap: 12px;
      border-bottom: 1px solid var(--divider-color, rgba(0,0,0,0.08));
    }
    header h2, header h3 {
      margin: 0; flex: 1;
      font-size: 18px; font-weight: 600;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .close-x {
      border: none; background: transparent; cursor: pointer;
      width: 36px; height: 36px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: var(--secondary-text-color);
    }
    .close-x:hover { background: color-mix(in srgb, currentColor 10%, transparent); }

    .body {
      padding: 16px 20px; overflow-y: auto; flex: 1;
      min-height: 260px;
    }
    .msg {
      padding: 32px 8px; text-align: center;
      color: var(--secondary-text-color, #757575); font-size: 14px;
    }
    .msg.error { color: var(--error-color, #c62828); }

    footer {
      padding: 12px 16px;
      display: flex; justify-content: flex-end; gap: 8px;
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.08));
      background: var(--secondary-background-color, transparent);
    }
    footer .spacer { flex: 1; }
    button {
      font: inherit; font-size: 14px; font-weight: 500;
      padding: 8px 20px; border-radius: 8px; border: none; cursor: pointer;
      transition: background 0.15s ease;
    }
    button:disabled { opacity: 0.55; cursor: default; }
    button.flat { background: transparent; color: var(--primary-text-color, #212121); }
    button.flat:hover:not(:disabled) {
      background: color-mix(in srgb, currentColor 10%, transparent);
    }
    button.primary {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    button.primary:hover:not(:disabled) {
      background: color-mix(in srgb, var(--primary-color, #03a9f4) 90%, #000);
    }
    button.danger {
      background: var(--error-color, #c62828);
      color: #fff;
    }
    button.danger:hover:not(:disabled) {
      background: color-mix(in srgb, var(--error-color, #c62828) 85%, #000);
    }

    /* ----- Weekly editor ----- */
    .editor { display: flex; flex-direction: column; gap: 6px; }
    .hour-header {
      display: flex; align-items: center; gap: 8px;
      margin-left: 2px;
      font-size: 10px;
      color: var(--secondary-text-color, #757575);
    }
    .day-col {
      flex: none; width: 44px;
      font-size: 12px; font-weight: 600;
      color: var(--primary-text-color);
      text-align: left;
    }
    .hour-labels {
      position: relative; flex: 1; height: 14px;
    }
    .hour-labels span { position: absolute; transform: translateX(-50%); }
    .hour-labels span:first-child { transform: translateX(0); }
    .hour-labels span:last-child { transform: translateX(-100%); }
    .day-row {
      display: flex; align-items: center; gap: 8px;
    }
    .day-track {
      position: relative; flex: 1;
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
      display: flex; align-items: center; justify-content: center;
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
      font-size: 10px; font-weight: 500;
      color: var(--primary-text-color);
      white-space: nowrap; padding: 0 6px;
      pointer-events: none;
    }
    .hint {
      margin-top: 10px; font-size: 11px;
      color: var(--secondary-text-color, #757575);
      line-height: 1.4;
    }

    /* ----- Inner (block edit) modal ----- */
    .inner-backdrop {
      position: absolute; inset: 0;
      background: rgba(0, 0, 0, 0.45);
      display: flex; align-items: center; justify-content: center;
      padding: 24px;
      animation: fade-in 0.14s ease;
      z-index: 10;
    }
    .inner-dialog {
      background: var(--card-background-color, var(--primary-background-color, #fff));
      border-radius: 14px;
      width: min(100%, 420px);
      max-height: calc(100vh - 120px);
      display: flex; flex-direction: column; overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      animation: pop-in 0.18s cubic-bezier(0.2, 0.9, 0.3, 1.1);
    }
    .inner-body {
      padding: 14px 20px; overflow-y: auto; flex: 1;
      display: flex; flex-direction: column; gap: 14px;
    }
    .field {
      display: flex; flex-direction: column; gap: 4px;
      font-size: 13px; color: var(--primary-text-color);
    }
    .field > span { font-weight: 500; }
    .field small {
      font-weight: 400; color: var(--secondary-text-color);
      margin-left: 6px;
    }
    .field input[type="time"],
    .field textarea {
      font: inherit; font-size: 14px;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
      background: var(--secondary-background-color, #fafafa);
      color: var(--primary-text-color);
    }
    .field textarea {
      resize: vertical; min-height: 80px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 12px;
    }
    .err {
      color: var(--error-color, #c62828);
      font-size: 12px;
    }

    @media (max-width: 700px) {
      .backdrop { padding: 0; }
      .dialog {
        border-radius: 0; width: 100%; height: 100%; max-height: 100%;
      }
      .day-col { width: 36px; font-size: 11px; }
      .day-track { height: 34px; }
    }
  `;
let K = Gi;
te([
  O({ attribute: !1 })
], K.prototype, "hass");
te([
  O({ type: String })
], K.prototype, "scheduleEntityId");
te([
  O({ type: String })
], K.prototype, "dialogTitle");
te([
  z()
], K.prototype, "_blocks");
te([
  z()
], K.prototype, "_loading");
te([
  z()
], K.prototype, "_loadError");
te([
  z()
], K.prototype, "_saving");
te([
  z()
], K.prototype, "_closing");
te([
  z()
], K.prototype, "_dirty");
te([
  z()
], K.prototype, "_drag");
te([
  z()
], K.prototype, "_editing");
function q(e) {
  if (!e || typeof e != "string") return 0;
  const t = e.split(":"), i = parseInt(t[0] ?? "0", 10), r = parseInt(t[1] ?? "0", 10), n = parseInt(t[2] ?? "0", 10);
  return isNaN(i) || isNaN(r) ? 0 : i * 60 + r + (isNaN(n) ? 0 : n / 60);
}
function ut(e, t) {
  const i = Math.max(0, Math.min(ue, e)), r = Math.floor(i / 60), n = Math.floor(i % 60);
  let o = 0;
  if (t) {
    const s = t.split(":"), a = parseInt(s[2] ?? "0", 10);
    isNaN(a) || (o = a);
  }
  return r === 24 && n === 0 && o === 0 ? "24:00:00" : `${String(r).padStart(2, "0")}:${String(n).padStart(2, "0")}:${String(o).padStart(2, "0")}`;
}
function sn(e) {
  const t = Math.max(0, Math.min(ue, e)), i = Math.floor(t / 60), r = t % 60;
  return `${String(i).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function $i(e) {
  if (!e) return "00:00:00";
  const t = e.split(":"), i = (t[0] ?? "00").padStart(2, "0"), r = (t[1] ?? "00").padStart(2, "0"), n = (t[2] ?? "00").padStart(2, "0");
  return `${i}:${r}:${n}`;
}
function an(e) {
  return $i(e);
}
function ln(e, t, i, r) {
  return e < r && i < t;
}
function Ha(e) {
  const t = e.map((r) => ({
    from: r.from,
    to: r.to,
    data: r.data,
    s: q(r.from),
    e: q(r.to)
  })).filter((r) => r.e > r.s).sort((r, n) => r.s - n.s), i = [];
  for (const r of t) {
    const n = i[i.length - 1], o = !!r.data || !!(n != null && n.data);
    n && !o && q(n.to) >= r.s ? q(n.to) < r.e && (n.to = r.to) : i.push({
      from: r.from,
      to: r.to,
      ...r.data ? { data: r.data } : {}
    });
  }
  return i;
}
customElements.get(Ci) || customElements.define(Ci, K);
function Na(e) {
  if (!e.scheduleEntityId) return;
  const t = document.createElement(Ci);
  t.hass = e.hass, t.scheduleEntityId = e.scheduleEntityId, e.title && (t.dialogTitle = e.title), document.body.appendChild(t);
}
var Ba = Object.defineProperty, Fa = Object.getOwnPropertyDescriptor, Vi = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Fa(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Ba(t, i, n), n;
};
let Et = class extends D {
  constructor() {
    super(...arguments), this.computeLabel = (e) => this.labelMap()[e.name ?? ""] ?? e.name ?? "", this.computeHelper = (e) => this.helperMap()[e.name ?? ""], this.valueChanged = (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement) || t.tagName !== "HA-FORM") return;
      const i = e.detail.value;
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
  setConfig(e) {
    const t = e, i = e.entity || t.companion_entity;
    this._config = {
      ...e,
      entity: i,
      show_day_selector: e.show_day_selector ?? !0,
      show_mode_control: e.show_mode_control ?? !0,
      show_now_indicator: e.show_now_indicator ?? !0,
      show_time_labels: e.show_time_labels ?? !0,
      long_press_opens_editor: e.long_press_opens_editor ?? !0,
      type: "custom:power-pilz-schedule-card"
    };
  }
  buildSchema() {
    const e = P(this.hass);
    return [
      {
        type: "expandable",
        name: "",
        title: p(e, "schedule.editor.section_entities"),
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
            helper: p(e, "schedule.editor.companion_help"),
            description: p(e, "schedule.editor.companion_help")
          }
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
      },
      {
        type: "expandable",
        name: "",
        title: p(e, "schedule.editor.section_actions"),
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
    const e = P(this.hass);
    return {
      entity: p(e, "schedule.editor.companion_entity"),
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
      show_time_labels: p(e, "schedule.editor.show_time_labels"),
      long_press_opens_editor: p(e, "schedule.editor.long_press_opens_editor"),
      tap_action: p(e, "schedule.editor.tap_action"),
      hold_action: p(e, "schedule.editor.hold_action"),
      double_tap_action: p(e, "schedule.editor.double_tap_action")
    };
  }
  helperMap() {
    const e = P(this.hass);
    return {
      entity: p(e, "schedule.editor.companion_help"),
      card_layout: p(e, "schedule.editor.card_layout_help"),
      time_window: p(e, "schedule.editor.time_window_help"),
      active_color: p(e, "schedule.editor.active_color_help"),
      show_day_selector: p(e, "schedule.editor.show_day_help"),
      show_mode_control: p(e, "schedule.editor.show_mode_help"),
      long_press_opens_editor: p(e, "schedule.editor.long_press_opens_editor_help"),
      show_now_indicator: p(e, "schedule.editor.show_now_help"),
      show_time_labels: p(e, "schedule.editor.show_labels_help")
    };
  }
  render() {
    return !this.hass || !this._config ? k : C`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ye}
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
Vi([
  O({ attribute: !1 })
], Et.prototype, "hass", 2);
Vi([
  z()
], Et.prototype, "_config", 2);
Et = Vi([
  se("power-pilz-schedule-card-editor")
], Et);
var Va = Object.defineProperty, Te = (e, t, i, r) => {
  for (var n = void 0, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = s(t, i, n) || n);
  return n && Va(t, i, n), n;
};
const cn = "powerpilz-schedule-edit", dn = [
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
], Ki = class Ki extends D {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._selectedDay = (/* @__PURE__ */ new Date()).getDay(), this._tick = 0, this.handleDaySelect = (t) => {
      t.stopPropagation();
      const i = t.currentTarget;
      if (!(i instanceof HTMLElement)) return;
      const r = parseInt(i.dataset.day ?? "0", 10);
      this._selectedDay = r;
    }, this.handleModeChange = async (t) => {
      var c;
      t.stopPropagation();
      const i = this._modeEntityId;
      if (this.isEditorPreview() || !i) return;
      const r = N(this.hass, i);
      if (!r) return;
      const n = ((c = r.attributes) == null ? void 0 : c.options) ?? [];
      if (n.length === 0) return;
      const s = (n.indexOf(r.state) + 1) % n.length, a = n[s], l = i.split(".")[0];
      await this.hass.callService(l, "select_option", {
        entity_id: i,
        option: a
      });
    }, this.handleTimelineTap = async (t) => {
      if (t.stopPropagation(), this.isEditorPreview() || !this._scheduleEntityId) return;
      const r = t.currentTarget.getBoundingClientRect(), o = (t.clientX - r.left) / r.width, { start: s, end: a } = this.resolvedTimeWindow(), l = a - s, c = Math.round(s + o * l), d = Math.round(c / 30) * 30, h = this.dayKey(this._selectedDay), _ = [...this.blocksForDay(this._selectedDay)], u = _.findIndex((x) => {
        const y = this.timeToMinutes(x.from), g = this.timeToMinutes(x.to);
        return d >= y && d < g;
      });
      if (u >= 0)
        _.splice(u, 1);
      else {
        const x = Math.max(0, d - 30), y = Math.min(1440, d + 30), g = `${String(Math.floor(x / 60)).padStart(2, "0")}:${String(x % 60).padStart(2, "0")}:00`, b = y >= 1440 ? "24:00:00" : `${String(Math.floor(y / 60)).padStart(2, "0")}:${String(y % 60).padStart(2, "0")}:00`;
        _.some((E) => {
          const w = this.timeToMinutes(E.from), f = this.timeToMinutes(E.to);
          return x < f && y > w;
        }) || (_.push({ from: g, to: b }), _.sort((E, w) => this.timeToMinutes(E.from) - this.timeToMinutes(w.from)));
      }
      const m = { ...this._weekBlocks() };
      m[h] = _;
      try {
        await this.hass.callService("powerpilz_companion", "set_schedule_blocks", {
          entity_id: this._scheduleEntityId,
          blocks: m
        });
      } catch {
      }
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-schedule-card-editor");
  }
  static async getStubConfig(t) {
    const i = (t == null ? void 0 : t.states) ?? {};
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
  setConfig(t) {
    const i = t, r = t.entity || i.companion_entity || "";
    this._config = {
      ...t,
      entity: r,
      icon: t.icon ?? "mdi:clock-outline",
      name: t.name ?? p(P(this.hass), "schedule.default_name"),
      time_window: t.time_window ?? "24",
      show_day_selector: t.show_day_selector ?? !0,
      show_mode_control: t.show_mode_control ?? !0,
      show_now_indicator: t.show_now_indicator ?? !0,
      show_time_labels: t.show_time_labels ?? !0
    };
  }
  // -------- Entity resolvers --------
  //
  // In v0.4+ the card only takes the Smart Schedule select entity; the
  // target device, mode list and weekly blocks all come from its
  // attributes. Legacy helpers that used to split this into three
  // entities are gone.
  get _scheduleEntityId() {
    var t;
    return ((t = this._config) == null ? void 0 : t.entity) || void 0;
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
    const t = this._scheduleEntityId;
    if (!t) return;
    const i = (s = (o = (n = (r = this.hass) == null ? void 0 : r.states) == null ? void 0 : n[t]) == null ? void 0 : o.attributes) == null ? void 0 : s.target_entity;
    return typeof i == "string" ? i : void 0;
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
  firstUpdated() {
    this._bindActions();
  }
  updated(t) {
    (!this._actionCleanup || t.has("_config")) && this._bindActions();
  }
  _bindActions() {
    var s, a, l, c, d, h, _;
    const t = this.renderRoot.querySelector("ha-card");
    if (!t) return;
    (s = this._actionCleanup) == null || s.destroy();
    const i = !!((l = (a = this._config) == null ? void 0 : a.hold_action) != null && l.action) && this._config.hold_action.action !== "none", r = ((c = this._config) == null ? void 0 : c.long_press_opens_editor) !== !1 && !((h = (d = this._config) == null ? void 0 : d.hold_action) != null && h.action), n = i || r, o = !!((_ = this._config) != null && _.double_tap_action) && this._config.double_tap_action.action !== void 0 && this._config.double_tap_action.action !== "none";
    this._actionCleanup = zt(
      t,
      {
        onTap: () => this._fireAction("tap"),
        onHold: () => this._fireAction("hold"),
        onDoubleTap: () => this._fireAction("double_tap")
      },
      { hasHold: n, hasDoubleTap: o }
    );
  }
  _fireAction(t) {
    if (this.isEditorPreview() || !this._config) return;
    const i = `${t}_action`;
    let r = this._config[i];
    if (t === "tap" && (!r || !r.action)) {
      this._modeEntityId && (r = { action: "fire-dom-event" }, this.handleModeChange(new Event("tap")));
      return;
    }
    if (t === "hold" && (!r || !r.action) && this._config.long_press_opens_editor !== !1 && (r = { action: cn }), !(!r || !r.action || r.action === "none")) {
      if (r.action === cn) {
        this._openScheduleEdit();
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
  _openScheduleEdit() {
    const t = this._scheduleEntityId;
    !t || !this.hass || Na({ hass: this.hass, scheduleEntityId: t });
  }
  connectedCallback() {
    super.connectedCallback(), this._tickTimer || (this._tickTimer = window.setInterval(() => {
      this._tick++;
    }, 6e4));
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), this._tickTimer && (clearInterval(this._tickTimer), this._tickTimer = void 0), (t = this._actionCleanup) == null || t.destroy(), this._actionCleanup = void 0;
  }
  // --- Helpers ---
  isEditorPreview() {
    return this.preview || this.editMode;
  }
  iconStyle(t) {
    return He(t);
  }
  _weekBlocks() {
    var n, o, s;
    const t = this._scheduleEntityId;
    if (!t) return {};
    const i = (s = (o = (n = this.hass) == null ? void 0 : n.states) == null ? void 0 : o[t]) == null ? void 0 : s.attributes, r = i == null ? void 0 : i.week_blocks;
    return r && typeof r == "object" && !Array.isArray(r) ? r : {};
  }
  dayKey(t) {
    return dn[t] ?? "monday";
  }
  blocksForDay(t) {
    const r = this._weekBlocks()[this.dayKey(t)];
    return Array.isArray(r) ? r : [];
  }
  timeToMinutes(t) {
    const i = (t || "").split(":"), r = parseInt(i[0] ?? "0", 10), n = parseInt(i[1] ?? "0", 10);
    return (isNaN(r) ? 0 : r) * 60 + (isNaN(n) ? 0 : n);
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
    const t = ce((i = this._config) == null ? void 0 : i.active_color);
    return t ? `rgb(${t})` : "var(--primary-color, rgb(3, 169, 244))";
  }
  resolvedActiveColorAlpha(t) {
    var r;
    const i = ce((r = this._config) == null ? void 0 : r.active_color);
    return i ? `rgba(${i}, ${t})` : `rgba(var(--rgb-primary-color, 3, 169, 244), ${t})`;
  }
  isDeviceOn() {
    var a, l, c;
    const t = this.modeValue().toLowerCase();
    if (t === "on") return !0;
    if (t === "off") return !1;
    const i = this._scheduleEntityId, r = i ? (c = (l = (a = this.hass) == null ? void 0 : a.states) == null ? void 0 : l[i]) == null ? void 0 : c.attributes : void 0;
    if (typeof (r == null ? void 0 : r.schedule_active) == "boolean")
      return r.schedule_active;
    const n = (/* @__PURE__ */ new Date()).getDay(), o = this.blocksForDay(n), s = this.nowMinutes();
    return o.some((d) => {
      const h = this.timeToMinutes(d.from), _ = this.timeToMinutes(d.to);
      return s >= h && s < _;
    });
  }
  /** Returns the *logical* mode ("on"/"off"/"auto") by reverse-mapping
   *  the helper's current display state via the `mode_names` attribute. */
  modeValue() {
    var o;
    const t = this._modeEntityId;
    if (!t) return "auto";
    const i = N(this.hass, t), r = (i == null ? void 0 : i.state) ?? "auto", n = (o = i == null ? void 0 : i.attributes) == null ? void 0 : o.mode_names;
    if (n && typeof n == "object") {
      for (const [s, a] of Object.entries(n))
        if (typeof a == "string" && a === r) return s;
    }
    return r;
  }
  /** Maps a logical mode back to the user-facing display name from the
   *  helper's `mode_names` attribute. */
  modeLabel(t) {
    var r;
    const i = this._modeEntityId;
    if (i) {
      const n = N(this.hass, i), o = (r = n == null ? void 0 : n.attributes) == null ? void 0 : r.mode_names;
      if (o && typeof o == "object") {
        const s = o[t.toLowerCase()];
        if (typeof s == "string" && s) return s;
      }
    }
    return t;
  }
  // --- Render ---
  renderTimeline() {
    const t = this._config, { start: i, end: r } = this.resolvedTimeWindow(), n = r - i, o = this.blocksForDay(this._selectedDay), s = this.resolvedActiveColor(), a = this.resolvedActiveColorAlpha(0.3);
    this._tick;
    const l = this.nowMinutes(), c = this._selectedDay === (/* @__PURE__ */ new Date()).getDay(), d = t.show_now_indicator !== !1 && c && l >= i && l <= r, h = t.show_time_labels !== !1, _ = [];
    if (h) {
      const u = Math.ceil(i / 60), m = Math.floor(r / 60), x = n > 720 ? 6 : n > 360 ? 3 : 2;
      for (let y = u; y <= m; y += x) {
        const g = y * 60;
        g >= i && g <= r && _.push({ hour: y >= 24 ? 0 : y, pct: (g - i) / n * 100 });
      }
    }
    return C`
      <div class="timeline-container">
        ${h ? C`
              <div class="time-labels">
                ${_.map(
      (u) => C`<span class="time-label" style=${M({ left: `${u.pct}%` })}>${String(u.hour).padStart(2, "0")}</span>`
    )}
              </div>
            ` : k}
        <div class="timeline-track" @click=${this.handleTimelineTap}>
          ${o.map((u) => {
      const m = this.timeToMinutes(u.from), x = this.timeToMinutes(u.to), y = Math.max(m, i), g = Math.min(x, r);
      if (g <= y) return k;
      const b = (y - i) / n * 100, S = (g - y) / n * 100;
      return C`
              <div
                class="timeline-block"
                style=${M({
        left: `${b}%`,
        width: `${S}%`,
        "background-color": a
      })}
              ></div>
            `;
    })}
          ${d ? C`
                <div
                  class="now-indicator"
                  style=${M({
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
    const t = (/* @__PURE__ */ new Date()).getDay();
    return C`
      <div class="day-selector">
        ${dn.map((i, r) => C`
          <button
            type="button"
            class="day-btn ${r === this._selectedDay ? "active" : ""} ${r === t ? "today" : ""}"
            data-day=${r}
            @click=${this.handleDaySelect}
          >
            ${et(P(this.hass), r)}
          </button>
        `)}
      </div>
    `;
  }
  renderModeButton() {
    const t = this.modeValue(), i = t.toLowerCase(), r = i === "on" ? "mdi:power" : i === "off" ? "mdi:power-off" : "mdi:clock-outline", n = this.modeLabel(t);
    return C`
      <button type="button" class="mode-btn" @click=${this.handleModeChange} title="Mode: ${t}">
        <ha-icon .icon=${r}></ha-icon>
        <span class="mode-label">${n}</span>
      </button>
    `;
  }
  render() {
    var h, _;
    if (!this._config) return C`<ha-card>${p(P(this.hass), "common.invalid_config")}</ha-card>`;
    if (!this.hass) return C``;
    if (!this._scheduleEntityId) {
      const u = P(this.hass);
      return C`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:clock-outline"></ha-icon>
            <div class="placeholder-text">${p(u, "schedule.placeholder_companion")}</div>
          </div>
        </ha-card>
      `;
    }
    const t = this._config, i = (_ = (h = N(this.hass, this._scheduleEntityId)) == null ? void 0 : h.attributes) == null ? void 0 : _.friendly_name, r = this.modeValue(), n = t.subtitle || this.modeLabel(r), o = t.show_day_selector !== !1, s = t.show_mode_control !== !1 && !!this._modeEntityId, a = t.card_layout === "vertical", c = this.isDeviceOn() ? this.iconStyle(t.icon_color) : this.iconStyle("disabled"), d = C`
      <div class="state-item">
        <div class="icon-wrap">
          <div class="icon-shape" style=${M(c)}>
            <ha-icon .icon=${t.icon ?? "mdi:clock-outline"}></ha-icon>
          </div>
        </div>
        <div class="info">
          <div class="primary">${t.name || i || p(P(this.hass), "schedule.default_name")}</div>
          <div class="secondary">${n}</div>
        </div>
        ${s ? this.renderModeButton() : k}
      </div>
    `;
    return C`
      <ha-card>
        <div class="container ${a ? "vertical" : "horizontal"}">
          <div class="row row-header">${d}</div>
          ${o ? C`<div class="row row-days">${this.renderDaySelector()}</div>` : k}
          <div class="row row-timeline">${this.renderTimeline()}</div>
        </div>
      </ha-card>
    `;
  }
};
Ki.styles = fe`
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
let ee = Ki;
Te([
  O({ attribute: !1 })
], ee.prototype, "hass");
Te([
  O({ type: Boolean })
], ee.prototype, "preview");
Te([
  O({ type: Boolean })
], ee.prototype, "editMode");
Te([
  O({ reflect: !0, type: String })
], ee.prototype, "layout");
Te([
  z()
], ee.prototype, "_config");
Te([
  z()
], ee.prototype, "_selectedDay");
Te([
  z()
], ee.prototype, "_tick");
class Ua extends ee {
}
customElements.get("power-pilz-schedule-card") || customElements.define("power-pilz-schedule-card", ee);
customElements.get("power-pilz-schedule-card-v2") || customElements.define("power-pilz-schedule-card-v2", Ua);
var Wa = Object.defineProperty, ja = Object.getOwnPropertyDescriptor, Ui = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? ja(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = (r ? s(t, i, n) : s(n)) || n);
  return r && n && Wa(t, i, n), n;
};
let Ct = class extends D {
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
    const e = P(this.hass), t = ((r = this._config) == null ? void 0 : r.use_companion) !== !1;
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
    const e = P(this.hass);
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
    const e = P(this.hass);
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
    return !this.hass || !this._config ? k : C`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${ye}
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
Ui([
  O({ attribute: !1 })
], Ct.prototype, "hass", 2);
Ui([
  z()
], Ct.prototype, "_config", 2);
Ct = Ui([
  se("power-pilz-timer-card-editor")
], Ct);
var Ga = Object.defineProperty, Y = (e, t, i, r) => {
  for (var n = void 0, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (n = s(t, i, n) || n);
  return n && Ga(t, i, n), n;
};
const hn = "power-pilz-timer-picker-portal-style", _t = "powerpilz_companion";
function un(e) {
  const t = new Date(e.includes("T") ? e : e.replace(" ", "T"));
  return isNaN(t.getTime()) ? null : t;
}
const Yi = class Yi extends D {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._pickingOn = !1, this._pickingOff = !1, this._skippedOn = !1, this._pickOnOption = "", this._pickOffOption = "", this._confirmingCancel = !1, this._pickDay = 0, this._pickHour = 12, this.handleOpenPicker = (t) => {
      t.stopPropagation(), !this.isEditorPreview() && (this._pickingOn || this._pickingOff || (this._pickDay = 0, this._pickHour = (/* @__PURE__ */ new Date()).getHours() + 1, this._pickHour > 23 && (this._pickHour = 0, this._pickDay = 1), this._skippedOn = !1, this._pickOnOption = this._storedOnOption(), this._pickOffOption = this._storedOffOption(), this._hasOnSupport() ? this._pickingOn = !0 : this._pickingOff = !0));
    }, this.handleBadgeClick = (t) => {
      t.stopPropagation(), !this.isEditorPreview() && (this._confirmingCancel = !0);
    }, this.handleConfirmCancel = async () => {
      this._confirmingCancel = !1, await this.cancelTimer();
    }, this.handleDismissConfirm = () => {
      this._confirmingCancel = !1;
    }, this.handleSetOn = async () => {
      if (!this._config) return;
      const t = this.buildDatetime(this._pickDay, this._pickHour), i = this._targetHasOptions() ? this._pickOnOption : void 0;
      await this._writeOnDatetime(t, i), this._skippedOn = !1, this._pickingOn = !1, this._hasOffSupport() ? (this._pickHour = Math.min(this._pickHour + 1, 23), this._pickingOff = !0) : await this.activateTimer();
    }, this.handleSetOff = async () => {
      if (!this._hasOffSupport()) return;
      const t = this.buildDatetime(this._pickDay, this._pickHour), i = this._targetHasOptions() ? this._pickOffOption : void 0;
      await this._writeOffDatetime(t, i), this._skippedOn = !1, this._pickingOff = !1, await this.activateTimer();
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
      name: t.name ?? p(P(this.hass), "timer.default_name")
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
      return typeof r == "string" ? un(r) : null;
    }
    return this.parseDatetime((i = this._config) == null ? void 0 : i.on_datetime_entity);
  }
  _getOffDatetime() {
    var t, i;
    if (((t = this._config) == null ? void 0 : t.use_companion) !== !1) {
      const r = this._companionAttr("off_datetime");
      return typeof r == "string" ? un(r) : null;
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
  /** For select-target Companion timers, the label the user configured
   *  for the start-boundary option (e.g. "On" or "Boost"). Returns
   *  undefined for non-select targets or manual-mode cards. */
  _onOptionLabel() {
    var i;
    if (((i = this._config) == null ? void 0 : i.use_companion) === !1) return;
    const t = this._companionAttr("on_option_label");
    return typeof t == "string" && t ? t : void 0;
  }
  /** Label for the end-boundary option. Same caveats as above. */
  _offOptionLabel() {
    var i;
    if (((i = this._config) == null ? void 0 : i.use_companion) === !1) return;
    const t = this._companionAttr("off_option_label");
    return typeof t == "string" && t ? t : void 0;
  }
  /** Raw stored on/off option values on the companion (logical keys for
   *  Smart-Schedule targets, display names for generic selects). */
  _storedOnOption() {
    var i;
    if (((i = this._config) == null ? void 0 : i.use_companion) === !1) return "";
    const t = this._companionAttr("on_option");
    return typeof t == "string" ? t : "";
  }
  _storedOffOption() {
    var i;
    if (((i = this._config) == null ? void 0 : i.use_companion) === !1) return "";
    const t = this._companionAttr("off_option");
    return typeof t == "string" ? t : "";
  }
  /** True if the target is a select/input_select whose options the
   *  user can pick from in the picker. */
  _targetHasOptions() {
    var n, o, s, a;
    if (((n = this._config) == null ? void 0 : n.use_companion) === !1) return !1;
    const t = this._switchEntityId;
    if (!t) return !1;
    const i = (s = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : s[t], r = (a = i == null ? void 0 : i.attributes) == null ? void 0 : a.options;
    return Array.isArray(r) && r.length > 0 && (t.startsWith("select.") || t.startsWith("input_select."));
  }
  /** Resolve a stored option value (logical key or display name) into
   *  the user-facing display name using the target's option list.
   *  Falls back to the value itself if not found. */
  _resolveOptionLabel(t) {
    var r;
    return t ? ((r = this._targetOptions().find((n) => n.value === t)) == null ? void 0 : r.label) ?? t : "";
  }
  /** Returns the selectable option pairs as [value, label] where value
   *  is what gets sent to set_timer (logical key for Smart Schedule,
   *  display name for generic selects) and label is the UI text. */
  _targetOptions() {
    var o, s, a, l;
    const t = this._switchEntityId;
    if (!t) return [];
    const i = (s = (o = this.hass) == null ? void 0 : o.states) == null ? void 0 : s[t];
    if (!i) return [];
    const r = (a = i.attributes) == null ? void 0 : a.options;
    if (!Array.isArray(r)) return [];
    const n = (l = i.attributes) == null ? void 0 : l.mode_names;
    if (n && typeof n == "object" && !Array.isArray(n)) {
      const c = /* @__PURE__ */ new Map();
      for (const [d, h] of Object.entries(n))
        typeof h == "string" && c.set(h, d);
      return r.map((d) => ({
        value: c.get(d) ?? d,
        label: d
      }));
    }
    return r.map((c) => ({
      value: c,
      label: c
    }));
  }
  _resolvedIcon() {
    var t;
    return this._companionStateIcon() ?? ((t = this._config) == null ? void 0 : t.icon) ?? "mdi:timer-outline";
  }
  async _writeOnDatetime(t, i) {
    var n, o;
    if (((n = this._config) == null ? void 0 : n.use_companion) !== !1) {
      const s = (o = this._config) == null ? void 0 : o.companion_entity;
      if (!s) return;
      const a = {
        entity_id: s,
        on: t
      };
      i !== void 0 && (a.on_option = i), await this.hass.callService(_t, "set_timer", a);
      return;
    }
    const r = this._config.on_datetime_entity;
    r && await this.hass.callService(r.split(".")[0], "set_datetime", {
      entity_id: r,
      datetime: t
    });
  }
  async _writeOffDatetime(t, i) {
    var n, o;
    if (((n = this._config) == null ? void 0 : n.use_companion) !== !1) {
      const s = (o = this._config) == null ? void 0 : o.companion_entity;
      if (!s) return;
      const a = {
        entity_id: s,
        off: t
      };
      i !== void 0 && (a.off_option = i), await this.hass.callService(_t, "set_timer", a);
      return;
    }
    const r = this._config.off_datetime_entity;
    r && await this.hass.callService(r.split(".")[0], "set_datetime", {
      entity_id: r,
      datetime: t
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
    const t = (r = this._config) == null ? void 0 : r.companion_entity;
    t && await this.hass.callService(_t, "set_timer", {
      entity_id: t,
      on: ""
    });
  }
  /** Clear the off-boundary so it won't fire on the next activation.
   *  See `_clearOnDatetime` for the manual-mode caveat. */
  async _clearOffDatetime() {
    var i, r;
    if (((i = this._config) == null ? void 0 : i.use_companion) === !1) return;
    const t = (r = this._config) == null ? void 0 : r.companion_entity;
    t && await this.hass.callService(_t, "set_timer", {
      entity_id: t,
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
    if (document.getElementById(hn)) return;
    const t = document.createElement("style");
    t.id = hn, t.textContent = `
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
    const t = P(this.hass);
    if (this._portal.replaceChildren(), this._confirmingCancel) {
      const w = document.createElement("div");
      w.className = "pp-label", w.textContent = p(t, "timer.cancel_title"), this._portal.append(w);
      const f = document.createElement("div");
      f.className = "pp-hint", f.textContent = p(t, "timer.cancel_hint"), this._portal.append(f);
      const v = document.createElement("div");
      v.className = "pp-actions";
      const $ = document.createElement("button");
      $.type = "button", $.className = "pp-act cancel", $.textContent = p(t, "timer.keep_timer"), $.addEventListener("click", () => this.handleDismissConfirm()), v.append($);
      const T = document.createElement("button");
      T.type = "button", T.className = "pp-act danger", T.textContent = p(t, "timer.cancel_timer"), T.addEventListener("click", () => {
        this.handleConfirmCancel();
      }), v.append(T), this._portal.append(v);
      return;
    }
    const i = this._targetHasOptions() ? this._resolveOptionLabel(this._pickOnOption) || this._onOptionLabel() : this._onOptionLabel(), r = this._targetHasOptions() ? this._resolveOptionLabel(this._pickOffOption) || this._offOptionLabel() : this._offOptionLabel(), n = i ? p(t, "timer.set_to_at", { option: i }) : p(t, "timer.turn_on_at"), o = r ? p(t, "timer.set_to_at", { option: r }) : p(t, "timer.turn_off_at_optional"), s = this._pickingOn ? n : o, a = this._pickingOn && this._hasOffSupport() && this._hasOnSupport(), l = this._pickingOff && this._hasOnSupport() && this._hasOffSupport() && !this._skippedOn, c = this._pickingOn ? r ? p(t, "timer.only_option", { option: r }) : p(t, "timer.only_off") : i ? p(t, "timer.only_option", { option: i }) : p(t, "timer.only_on"), d = this._pickingOn ? this.handleSkipOn : this.handleSkipOff, h = a || l, _ = this._pickingOn ? this.handleSetOn : this.handleSetOff, u = this.next7Days(), m = Array.from({ length: 24 }, (w, f) => f), x = document.createElement("div");
    x.className = "pp-label", x.textContent = s, this._portal.append(x);
    const y = document.createElement("div");
    y.className = "pp-days", u.forEach((w) => {
      const f = document.createElement("button");
      f.type = "button", f.className = `pp-day-btn ${w.day === this._pickDay ? "active" : ""}`, f.textContent = w.label, f.addEventListener("click", () => {
        this._pickDay = w.day, this.renderPortalContent();
      }), y.append(f);
    }), this._portal.append(y);
    const g = document.createElement("div");
    if (g.className = "pp-hours", m.forEach((w) => {
      const f = document.createElement("button");
      f.type = "button", f.className = `pp-hour-btn ${w === this._pickHour ? "active" : ""}`, f.textContent = String(w).padStart(2, "0"), f.addEventListener("click", () => {
        this._pickHour = w, this.renderPortalContent();
      }), g.append(f);
    }), this._portal.append(g), this._targetHasOptions()) {
      const w = document.createElement("div");
      w.className = "pp-option-row";
      const f = document.createElement("span");
      f.className = "pp-option-label", f.textContent = p(t, "timer.mode_label"), w.append(f);
      const v = document.createElement("select");
      v.className = "pp-option-select";
      const $ = this._pickingOn ? this._pickOnOption : this._pickOffOption;
      for (const T of this._targetOptions()) {
        const A = document.createElement("option");
        A.value = T.value, A.textContent = T.label, T.value === $ && (A.selected = !0), v.append(A);
      }
      v.addEventListener("change", () => {
        this._pickingOn ? this._pickOnOption = v.value : this._pickOffOption = v.value, this.renderPortalContent();
      }), w.append(v), this._portal.append(w);
    }
    const b = document.createElement("div");
    b.className = "pp-actions";
    const S = document.createElement("button");
    if (S.type = "button", S.className = "pp-act cancel", S.textContent = p(t, "common.cancel"), S.addEventListener("click", () => this.handleCancelPick()), b.append(S), h) {
      const w = document.createElement("button");
      w.type = "button", w.className = "pp-act skip", w.textContent = c, w.addEventListener("click", () => {
        d();
      }), b.append(w);
    }
    const E = document.createElement("button");
    E.type = "button", E.className = "pp-act confirm", E.textContent = p(t, "common.set"), E.addEventListener("click", () => {
      _();
    }), b.append(E), this._portal.append(b);
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
    return ((t = N(this.hass, this._activeEntityId)) == null ? void 0 : t.state) === "on";
  }
  switchIsOn() {
    var t;
    return ((t = N(this.hass, this._switchEntityId)) == null ? void 0 : t.state) === "on";
  }
  parseDatetime(t) {
    if (!t) return null;
    const i = N(this.hass, t);
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
    const i = P(this.hass), r = et(i, t.getDay()), n = String(t.getHours()).padStart(2, "0"), o = String(t.getMinutes()).padStart(2, "0");
    return `${r} ${n}:${o}`;
  }
  timeUntil(t) {
    const i = P(this.hass), r = t.getTime() - Date.now();
    if (r <= 0) return p(i, "timer.time_now");
    const n = Math.floor(r / 36e5), o = Math.floor(r % 36e5 / 6e4);
    if (n > 24) {
      const s = Math.floor(n / 24);
      return p(i, "timer.time_in_dh", { d: s, h: n % 24 });
    }
    return n > 0 ? p(i, "timer.time_in_hm", { h: n, m: o }) : p(i, "timer.time_in_m", { m: o });
  }
  next7Days() {
    const t = P(this.hass), i = [], r = /* @__PURE__ */ new Date();
    for (let n = 0; n < 7; n++) {
      const o = new Date(r);
      o.setDate(o.getDate() + n), o.setHours(0, 0, 0, 0);
      const s = n === 0 ? p(t, "common.today") : n === 1 ? p(t, "common.tomorrow") : et(t, o.getDay());
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
    const r = P(this.hass), n = this._companionStateName();
    if (!t)
      return n ?? (i ? p(r, "common.on") : p(r, "common.off"));
    const o = this._getOnDatetime(), s = this._getOffDatetime(), a = [];
    o && a.push(p(r, "timer.subtitle_on", { time: this.formatDatetime(o) })), s && a.push(p(r, "timer.subtitle_off", { time: this.formatDatetime(s) }));
    const l = a.join(" → ");
    return n && l ? `${n} · ${l}` : n || l || p(r, "timer.timer_active");
  }
  render() {
    var c, d, h, _;
    const t = P(this.hass);
    if (!this._config) return C`<ha-card>${p(t, "common.invalid_config")}</ha-card>`;
    if (!this.hass) return C``;
    if (!this._activeEntityId) {
      const u = this._config.use_companion !== !1 ? p(t, "timer.placeholder_companion") : p(t, "timer.placeholder_manual");
      return C`
        <ha-card>
          <div class="placeholder">
            <ha-icon icon="mdi:timer-outline"></ha-icon>
            <div class="placeholder-text">${u}</div>
          </div>
        </ha-card>
      `;
    }
    const i = this._config, r = this.isActive(), n = this.switchIsOn(), o = He(n ? i.icon_color : "disabled"), s = ((d = (c = N(this.hass, this._switchEntityId)) == null ? void 0 : c.attributes) == null ? void 0 : d.friendly_name) ?? ((_ = (h = N(this.hass, this._activeEntityId)) == null ? void 0 : h.attributes) == null ? void 0 : _.friendly_name), a = i.subtitle || this.buildSubtitle(r, n), l = p(t, "timer.default_name");
    return C`
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
            ${r ? C`
                  <button type="button" class="action-btn active" @click=${this.handleBadgeClick} title=${p(t, "timer.cancel_timer")}>
                    <ha-icon icon="mdi:timer-sand"></ha-icon>
                    <span>${p(t, "common.active")}</span>
                  </button>
                ` : C`
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
Yi.styles = fe`
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
let B = Yi;
Y([
  O({ attribute: !1 })
], B.prototype, "hass");
Y([
  O({ type: Boolean })
], B.prototype, "preview");
Y([
  O({ type: Boolean })
], B.prototype, "editMode");
Y([
  O({ reflect: !0, type: String })
], B.prototype, "layout");
Y([
  z()
], B.prototype, "_config");
Y([
  z()
], B.prototype, "_pickingOn");
Y([
  z()
], B.prototype, "_pickingOff");
Y([
  z()
], B.prototype, "_skippedOn");
Y([
  z()
], B.prototype, "_pickOnOption");
Y([
  z()
], B.prototype, "_pickOffOption");
Y([
  z()
], B.prototype, "_confirmingCancel");
Y([
  z()
], B.prototype, "_pickDay");
Y([
  z()
], B.prototype, "_pickHour");
class Ka extends B {
}
customElements.get("power-pilz-timer-card") || customElements.define("power-pilz-timer-card", B);
customElements.get("power-pilz-timer-card-v2") || customElements.define("power-pilz-timer-card-v2", Ka);
window.customCards = window.customCards || [];
const Ya = [
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
for (const e of Ya)
  window.customCards.some((t) => t.type === e.type) || window.customCards.push(e);
console.info(
  `%cPOWER PILZ%c v${ye}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
//# sourceMappingURL=power-pilz.js.map
