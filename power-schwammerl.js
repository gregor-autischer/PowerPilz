/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = globalThis, Ze = $e.ShadowRoot && ($e.ShadyCSS === void 0 || $e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Qe = Symbol(), $t = /* @__PURE__ */ new WeakMap();
let qt = class {
  constructor(t, r, n) {
    if (this._$cssResult$ = !0, n !== Qe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Ze && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = $t.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && $t.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ar = (e) => new qt(typeof e == "string" ? e : e + "", void 0, Qe), Re = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, o, i) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[i + 1], e[0]);
  return new qt(r, e, Qe);
}, Er = (e, t) => {
  if (Ze) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), o = $e.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = r.cssText, e.appendChild(n);
  }
}, Ct = Ze ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return Ar(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Rr, defineProperty: Pr, getOwnPropertyDescriptor: kr, getOwnPropertyNames: Ir, getOwnPropertySymbols: Or, getPrototypeOf: Lr } = Object, G = globalThis, Tt = G.trustedTypes, Nr = Tt ? Tt.emptyScript : "", je = G.reactiveElementPolyfillSupport, he = (e, t) => e, Ce = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Nr : null;
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
} }, et = (e, t) => !Rr(e, t), Mt = { attribute: !0, type: String, converter: Ce, reflect: !1, useDefault: !1, hasChanged: et };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), G.litPropertyMetadata ?? (G.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ne = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Mt) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, r);
      o !== void 0 && Pr(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: o, set: i } = kr(this.prototype, t) ?? { get() {
      return this[r];
    }, set(s) {
      this[r] = s;
    } };
    return { get: o, set(s) {
      const a = o == null ? void 0 : o.call(this);
      i == null || i.call(this, s), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Mt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(he("elementProperties"))) return;
    const t = Lr(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(he("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(he("properties"))) {
      const r = this.properties, n = [...Ir(r), ...Or(r)];
      for (const o of n) this.createProperty(o, r[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const r = litPropertyMetadata.get(t);
      if (r !== void 0) for (const [n, o] of r) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, n] of this.elementProperties) {
      const o = this._$Eu(r, n);
      o !== void 0 && this._$Eh.set(o, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const o of n) r.unshift(Ct(o));
    } else t !== void 0 && r.push(Ct(t));
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
    return Er(t, this.constructor.elementStyles), t;
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
    const n = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const s = (((i = n.converter) == null ? void 0 : i.toAttribute) !== void 0 ? n.converter : Ce).toAttribute(r, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var i, s;
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const a = n.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((i = a.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? a.converter : Ce;
      this._$Em = o;
      const c = l.fromAttribute(r, a.type);
      this[o] = c ?? ((s = this._$Ej) == null ? void 0 : s.get(o)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, r, n, o = !1, i) {
    var s;
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (i = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? et)(i, r) || n.useDefault && n.reflect && i === ((s = this._$Ej) == null ? void 0 : s.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, r, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: n, reflect: o, wrapped: i }, s) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, s ?? r ?? this[t]), i !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (r = void 0), this._$AL.set(t, r)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [i, s] of this._$Ep) this[i] = s;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [i, s] of o) {
        const { wrapped: a } = s, l = this[i];
        a !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, s, l);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), (n = this._$EO) == null || n.forEach((o) => {
        var i;
        return (i = o.hostUpdate) == null ? void 0 : i.call(o);
      }), this.update(r)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var r;
    (r = this._$EO) == null || r.forEach((n) => {
      var o;
      return (o = n.hostUpdated) == null ? void 0 : o.call(n);
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
ne.elementStyles = [], ne.shadowRootOptions = { mode: "open" }, ne[he("elementProperties")] = /* @__PURE__ */ new Map(), ne[he("finalized")] = /* @__PURE__ */ new Map(), je == null || je({ ReactiveElement: ne }), (G.reactiveElementVersions ?? (G.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue = globalThis, zt = (e) => e, Te = ue.trustedTypes, At = Te ? Te.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Xt = "$lit$", j = `lit$${Math.random().toFixed(9).slice(2)}$`, Yt = "?" + j, Br = `<${Yt}>`, Z = document, _e = () => Z.createComment(""), me = (e) => e === null || typeof e != "object" && typeof e != "function", tt = Array.isArray, Hr = (e) => tt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Ge = `[ 	
\f\r]`, ce = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Et = /-->/g, Rt = />/g, X = RegExp(`>|${Ge}(?:([^\\s"'>=/]+)(${Ge}*=${Ge}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Pt = /'/g, kt = /"/g, Kt = /^(?:script|style|textarea|title)$/i, Dr = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), x = Dr(1), Q = Symbol.for("lit-noChange"), S = Symbol.for("lit-nothing"), It = /* @__PURE__ */ new WeakMap(), K = Z.createTreeWalker(Z, 129);
function Jt(e, t) {
  if (!tt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return At !== void 0 ? At.createHTML(t) : t;
}
const Fr = (e, t) => {
  const r = e.length - 1, n = [];
  let o, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = ce;
  for (let a = 0; a < r; a++) {
    const l = e[a];
    let c, d, h = -1, _ = 0;
    for (; _ < l.length && (s.lastIndex = _, d = s.exec(l), d !== null); ) _ = s.lastIndex, s === ce ? d[1] === "!--" ? s = Et : d[1] !== void 0 ? s = Rt : d[2] !== void 0 ? (Kt.test(d[2]) && (o = RegExp("</" + d[2], "g")), s = X) : d[3] !== void 0 && (s = X) : s === X ? d[0] === ">" ? (s = o ?? ce, h = -1) : d[1] === void 0 ? h = -2 : (h = s.lastIndex - d[2].length, c = d[1], s = d[3] === void 0 ? X : d[3] === '"' ? kt : Pt) : s === kt || s === Pt ? s = X : s === Et || s === Rt ? s = ce : (s = X, o = void 0);
    const y = s === X && e[a + 1].startsWith("/>") ? " " : "";
    i += s === ce ? l + Br : h >= 0 ? (n.push(c), l.slice(0, h) + Xt + l.slice(h) + j + y) : l + j + (h === -2 ? a : y);
  }
  return [Jt(e, i + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ye {
  constructor({ strings: t, _$litType$: r }, n) {
    let o;
    this.parts = [];
    let i = 0, s = 0;
    const a = t.length - 1, l = this.parts, [c, d] = Fr(t, r);
    if (this.el = ye.createElement(c, n), K.currentNode = this.el.content, r === 2 || r === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = K.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(Xt)) {
          const _ = d[s++], y = o.getAttribute(h).split(j), v = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: i, name: v[2], strings: y, ctor: v[1] === "." ? jr : v[1] === "?" ? Gr : v[1] === "@" ? Vr : Pe }), o.removeAttribute(h);
        } else h.startsWith(j) && (l.push({ type: 6, index: i }), o.removeAttribute(h));
        if (Kt.test(o.tagName)) {
          const h = o.textContent.split(j), _ = h.length - 1;
          if (_ > 0) {
            o.textContent = Te ? Te.emptyScript : "";
            for (let y = 0; y < _; y++) o.append(h[y], _e()), K.nextNode(), l.push({ type: 2, index: ++i });
            o.append(h[_], _e());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Yt) l.push({ type: 2, index: i });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(j, h + 1)) !== -1; ) l.push({ type: 7, index: i }), h += j.length - 1;
      }
      i++;
    }
  }
  static createElement(t, r) {
    const n = Z.createElement("template");
    return n.innerHTML = t, n;
  }
}
function ie(e, t, r = e, n) {
  var s, a;
  if (t === Q) return t;
  let o = n !== void 0 ? (s = r._$Co) == null ? void 0 : s[n] : r._$Cl;
  const i = me(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== i && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), i === void 0 ? o = void 0 : (o = new i(e), o._$AT(e, r, n)), n !== void 0 ? (r._$Co ?? (r._$Co = []))[n] = o : r._$Cl = o), o !== void 0 && (t = ie(e, o._$AS(e, t.values), o, n)), t;
}
class Ur {
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
    const { el: { content: r }, parts: n } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? Z).importNode(r, !0);
    K.currentNode = o;
    let i = K.nextNode(), s = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new pe(i, i.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(i, l.name, l.strings, this, t) : l.type === 6 && (c = new Wr(i, this, t)), this._$AV.push(c), l = n[++a];
      }
      s !== (l == null ? void 0 : l.index) && (i = K.nextNode(), s++);
    }
    return K.currentNode = Z, o;
  }
  p(t) {
    let r = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, r), r += n.strings.length - 2) : n._$AI(t[r])), r++;
  }
}
class pe {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, r, n, o) {
    this.type = 2, this._$AH = S, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = n, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = ie(this, t, r), me(t) ? t === S || t == null || t === "" ? (this._$AH !== S && this._$AR(), this._$AH = S) : t !== this._$AH && t !== Q && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Hr(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== S && me(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Z.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var i;
    const { values: r, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ye.createElement(Jt(n.h, n.h[0]), this.options)), n);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === o) this._$AH.p(r);
    else {
      const s = new Ur(o, this), a = s.u(this.options);
      s.p(r), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let r = It.get(t.strings);
    return r === void 0 && It.set(t.strings, r = new ye(t)), r;
  }
  k(t) {
    tt(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let n, o = 0;
    for (const i of t) o === r.length ? r.push(n = new pe(this.O(_e()), this.O(_e()), this, this.options)) : n = r[o], n._$AI(i), o++;
    o < r.length && (this._$AR(n && n._$AB.nextSibling, o), r.length = o);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, r); t !== this._$AB; ) {
      const o = zt(t).nextSibling;
      zt(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 && (this._$Cv = t, (r = this._$AP) == null || r.call(this, t));
  }
}
class Pe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, n, o, i) {
    this.type = 1, this._$AH = S, this._$AN = void 0, this.element = t, this.name = r, this._$AM = o, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = S;
  }
  _$AI(t, r = this, n, o) {
    const i = this.strings;
    let s = !1;
    if (i === void 0) t = ie(this, t, r, 0), s = !me(t) || t !== this._$AH && t !== Q, s && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = i[0], l = 0; l < i.length - 1; l++) c = ie(this, a[n + l], r, l), c === Q && (c = this._$AH[l]), s || (s = !me(c) || c !== this._$AH[l]), c === S ? t = S : t !== S && (t += (c ?? "") + i[l + 1]), this._$AH[l] = c;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === S ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class jr extends Pe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === S ? void 0 : t;
  }
}
class Gr extends Pe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== S);
  }
}
class Vr extends Pe {
  constructor(t, r, n, o, i) {
    super(t, r, n, o, i), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = ie(this, t, r, 0) ?? S) === Q) return;
    const n = this._$AH, o = t === S && n !== S || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, i = t !== S && (n === S || o);
    o && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Wr {
  constructor(t, r, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ie(this, t);
  }
}
const Ve = ue.litHtmlPolyfillSupport;
Ve == null || Ve(ye, pe), (ue.litHtmlVersions ?? (ue.litHtmlVersions = [])).push("3.3.2");
const qr = (e, t, r) => {
  const n = (r == null ? void 0 : r.renderBefore) ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const i = (r == null ? void 0 : r.renderBefore) ?? null;
    n._$litPart$ = o = new pe(t.insertBefore(_e(), i), i, void 0, r ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const J = globalThis;
let L = class extends ne {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = qr(r, this.renderRoot, this.renderOptions);
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
    return Q;
  }
};
var Wt;
L._$litElement$ = !0, L.finalized = !0, (Wt = J.litElementHydrateSupport) == null || Wt.call(J, { LitElement: L });
const We = J.litElementPolyfillSupport;
We == null || We({ LitElement: L });
(J.litElementVersions ?? (J.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ee = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xr = { attribute: !0, type: String, converter: Ce, reflect: !1, hasChanged: et }, Yr = (e = Xr, t, r) => {
  const { kind: n, metadata: o } = r;
  let i = globalThis.litPropertyMetadata.get(o);
  if (i === void 0 && globalThis.litPropertyMetadata.set(o, i = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), i.set(r.name, e), n === "accessor") {
    const { name: s } = r;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(s, l, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, e, a), a;
    } };
  }
  if (n === "setter") {
    const { name: s } = r;
    return function(a) {
      const l = this[s];
      t.call(this, a), this.requestUpdate(s, l, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function H(e) {
  return (t, r) => typeof r == "object" ? Yr(e, t, r) : ((n, o, i) => {
    const s = o.hasOwnProperty(i);
    return o.constructor.createProperty(i, n), s ? Object.getOwnPropertyDescriptor(o, i) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function A(e) {
  return H({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Kr = { ATTRIBUTE: 1 }, Jr = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Zr = class {
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
const Zt = "important", Qr = " !" + Zt, T = Jr(class extends Zr {
  constructor(e) {
    var t;
    if (super(e), e.type !== Kr.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
      const o = t[n];
      if (o != null) {
        this.ft.add(n);
        const i = typeof o == "string" && o.endsWith(Qr);
        n.includes("-") || i ? r.setProperty(n, i ? o.slice(0, -11) : o, i ? Zt : "") : r[n] = o;
      }
    }
    return Q;
  }
}), oe = (e, t) => {
  if (t)
    return e.states[t];
}, I = (e, t) => {
  const r = oe(e, t);
  if (!r)
    return null;
  const n = Number(r.state);
  return Number.isFinite(n) ? n : null;
}, B = (e, t) => {
  const r = oe(e, t);
  if (!r)
    return;
  const n = r.attributes.unit_of_measurement;
  return typeof n == "string" ? n : void 0;
}, qe = (e, t) => {
  const r = oe(e, t);
  return r == null ? void 0 : r.state;
};
var en = Object.defineProperty, tn = Object.getOwnPropertyDescriptor, rt = (e, t, r, n) => {
  for (var o = n > 1 ? void 0 : n ? tn(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (n ? s(t, r, o) : s(o)) || o);
  return n && o && en(t, r, o), o;
};
const rn = 4, nn = 8, Ot = 2, on = (e, t) => {
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
}, xe = (e, t, r, n) => ({
  type: "expandable",
  name: "",
  title: t,
  icon: r,
  expanded: !1,
  schema: Array.from({ length: n }, (o, i) => ({
    type: "expandable",
    name: "",
    title: `Block ${i + 1}`,
    icon: "mdi:view-grid-outline",
    expanded: !1,
    schema: on(e, i + 1)
  }))
}), sn = [
  { name: "name", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "solar_visible", selector: { boolean: {} } },
      { name: "grid_visible", selector: { boolean: {} } },
      { name: "grid_secondary_visible", selector: { boolean: {} } },
      { name: "battery_visible", selector: { boolean: {} } },
      { name: "battery_secondary_visible", selector: { boolean: {} } }
    ]
  },
  {
    name: "battery_dual_alignment",
    selector: {
      select: {
        mode: "dropdown",
        options: ["center", "left", "right"]
      }
    }
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "home_entity", selector: { entity: { filter: { domain: "sensor" } } } },
      { name: "solar_entity", selector: { entity: { filter: { domain: "sensor" } } } }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "grid_entity", selector: { entity: { filter: { domain: "sensor" } } } },
      { name: "grid_secondary_entity", selector: { entity: { filter: { domain: "sensor" } } } },
      { name: "battery_entity", selector: { entity: { filter: { domain: "sensor" } } } },
      { name: "battery_secondary_entity", selector: { entity: { filter: { domain: "sensor" } } } }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "battery_percentage_entity", selector: { entity: { filter: { domain: "sensor" } } } },
      { name: "battery_secondary_percentage_entity", selector: { entity: { filter: { domain: "sensor" } } } }
    ]
  },
  {
    type: "expandable",
    name: "",
    title: "Node styling",
    icon: "mdi:shape-outline",
    expanded: !1,
    schema: [
      {
        type: "grid",
        name: "",
        schema: [
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
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
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
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
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
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
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
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
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
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
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
        ]
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "core_icon", selector: { icon: {} }, context: { icon_entity: "home_entity" } },
          {
            name: "core_icon_color",
            selector: { ui_color: { include_state: !0, include_none: !0, default_color: "none" } }
          },
          {
            name: "flow_color",
            selector: { ui_color: { include_state: !0, include_none: !0, default_color: "none" } }
          }
        ]
      }
    ]
  },
  xe("solar", "Solar sub blocks", "mdi:solar-power-variant", rn),
  xe("grid", "Grid 1 sub blocks", "mdi:transmission-tower", Ot),
  xe("grid_secondary", "Grid 2 sub blocks", "mdi:transmission-tower", Ot),
  xe("home", "Home sub blocks", "mdi:flash", nn),
  {
    type: "grid",
    name: "",
    schema: [
      { name: "unit", selector: { text: {} } },
      { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } }
    ]
  }
], an = {
  name: "Name",
  solar_visible: "Show solar node",
  grid_visible: "Show grid node",
  grid_secondary_visible: "Show second grid node",
  battery_visible: "Show battery node",
  battery_secondary_visible: "Show second battery node",
  battery_dual_alignment: "Dual battery alignment",
  home_entity: "Home entity",
  solar_entity: "Solar entity",
  grid_entity: "Grid entity",
  grid_secondary_entity: "Second grid entity",
  battery_entity: "Battery entity",
  battery_percentage_entity: "Battery percentage entity",
  battery_secondary_entity: "Second battery entity",
  battery_secondary_percentage_entity: "Second battery percentage entity",
  solar_sub_enabled: "Enable solar sub block",
  solar_sub_entity: "Solar sub entity",
  solar_sub_label: "Solar sub label",
  solar_sub_icon: "Solar sub icon",
  solar_sub_icon_color: "Solar sub color",
  home_sub_enabled: "Enable home sub block",
  home_sub_entity: "Home sub entity",
  home_sub_label: "Home sub label",
  home_sub_icon: "Home sub icon",
  home_sub_icon_color: "Home sub color",
  solar_label: "Solar label",
  home_label: "Home label",
  grid_label: "Grid label",
  grid_secondary_label: "Second grid label",
  battery_label: "Battery label",
  battery_secondary_label: "Second battery label",
  solar_icon: "Solar icon",
  solar_icon_color: "Solar color",
  solar_trend: "Solar trend",
  solar_trend_color: "Solar trend color",
  grid_icon: "Grid icon",
  grid_icon_color: "Grid color",
  grid_secondary_icon: "Second grid icon",
  grid_secondary_icon_color: "Second grid color",
  grid_secondary_trend: "Second grid trend",
  grid_secondary_trend_color: "Second grid trend color",
  grid_trend: "Grid trend",
  grid_trend_color: "Grid trend color",
  home_icon: "Home icon",
  home_icon_color: "Home color",
  home_trend: "Home trend",
  home_trend_color: "Home trend color",
  battery_icon: "Battery icon",
  battery_icon_color: "Battery color",
  battery_trend: "Battery trend",
  battery_trend_color: "Battery trend color",
  battery_secondary_icon: "Second battery icon",
  battery_secondary_icon_color: "Second battery color",
  battery_secondary_trend: "Second battery trend",
  battery_secondary_trend_color: "Second battery trend color",
  battery_low_alert: "Low battery alert",
  battery_low_threshold: "Low battery threshold",
  battery_secondary_low_alert: "Second low battery alert",
  battery_secondary_low_threshold: "Second low battery threshold",
  core_icon: "Core icon",
  core_icon_color: "Core color",
  flow_color: "Flow color",
  unit: "Unit",
  decimals: "Decimals"
};
let Me = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = e.name ?? "", r = t.match(/^(solar|home|grid|grid_secondary)_sub_(\d+)_(enabled|entity|label|icon|icon_color)$/);
      if (r) {
        const [, n, o, i] = r;
        return `${n === "solar" ? "Solar" : n === "home" ? "Home" : n === "grid" ? "Grid 1" : "Grid 2"} block ${o} ${{
          enabled: "Enabled",
          entity: "Entity",
          label: "Label",
          icon: "Icon",
          icon_color: "Color"
        }[i] ?? i}`;
      }
      return an[t] ?? t;
    }, this.valueChanged = (e) => {
      const t = {
        ...e.detail.value,
        type: "custom:power-schwammerl-energy-card"
      };
      this._config = t, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: t },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(e) {
    this._config = {
      ...e,
      solar_visible: e.solar_visible ?? !0,
      grid_visible: e.grid_visible ?? !0,
      grid_secondary_visible: e.grid_secondary_visible ?? !1,
      battery_visible: e.battery_visible ?? !0,
      battery_secondary_visible: e.battery_secondary_visible ?? !1,
      battery_dual_alignment: e.battery_dual_alignment ?? "center",
      type: "custom:power-schwammerl-energy-card"
    };
  }
  render() {
    return !this.hass || !this._config ? S : x`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${sn}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
rt([
  H({ attribute: !1 })
], Me.prototype, "hass", 2);
rt([
  A()
], Me.prototype, "_config", 2);
Me = rt([
  ee("power-schwammerl-energy-card-editor")
], Me);
var ln = Object.defineProperty, cn = Object.getOwnPropertyDescriptor, se = (e, t, r, n) => {
  for (var o = n > 1 ? void 0 : n ? cn(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (n ? s(t, r, o) : s(o)) || o);
  return n && o && ln(t, r, o), o;
};
const N = 0.01, Xe = 1, de = 1440 * 60 * 1e3, Lt = 300 * 1e3, dn = 4, hn = 8, un = 2, _n = 12, mn = 7, yn = 400, pn = 300, bn = "var(--rgb-primary-text-color, 33, 33, 33)", Nt = {
  red: "244, 67, 54",
  pink: "233, 30, 99",
  purple: "156, 39, 176",
  "deep-purple": "103, 58, 183",
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
};
let V = class extends L {
  constructor() {
    super(...arguments), this._trendSeries = {}, this._showSubBlocks = !1, this._subNodeConnectorSegments = [], this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._trendDrawConfig = {}, this.handleCardClick = () => {
      this.executeTapAction();
    }, this.handleCardKeyDown = (e) => {
      e.key !== "Enter" && e.key !== " " || (e.preventDefault(), this.executeTapAction());
    };
  }
  static async getConfigElement() {
    return document.createElement("power-schwammerl-energy-card-editor");
  }
  static async getStubConfig(e) {
    const t = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(t), n = (...d) => d.find((h) => h in t), o = (d) => r.find((h) => h.startsWith(`${d}.`)), i = n("sensor.dev_home_power", "sensor.house_consumption_power") ?? o("sensor") ?? "sensor.dev_home_power", s = n("sensor.dev_solar_power", "sensor.solar_production_power") ?? o("sensor"), a = n("sensor.dev_grid_power", "sensor.grid_power") ?? o("sensor"), l = n("sensor.dev_battery_power", "sensor.home_battery_power") ?? o("sensor"), c = n("sensor.dev_battery_soc", "sensor.home_battery_soc") ?? o("sensor");
    return {
      type: "custom:power-schwammerl-energy-card",
      name: "Energy Flow",
      solar_visible: !0,
      grid_visible: !0,
      grid_secondary_visible: !1,
      battery_visible: !0,
      battery_secondary_visible: !1,
      battery_dual_alignment: "center",
      home_entity: i,
      solar_entity: s,
      grid_entity: a,
      battery_entity: l,
      battery_percentage_entity: c,
      decimals: Xe
    };
  }
  setConfig(e) {
    const t = e.home_entity ?? e.consumption_entity ?? "sensor.dev_home_power", r = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Xe;
    this._config = {
      ...e,
      name: e.name ?? "Energy Flow",
      solar_visible: e.solar_visible ?? !0,
      grid_visible: e.grid_visible ?? !0,
      grid_secondary_visible: e.grid_secondary_visible ?? !1,
      battery_visible: e.battery_visible ?? !0,
      battery_secondary_visible: e.battery_secondary_visible ?? !1,
      battery_dual_alignment: this.normalizeBatteryDualAlignment(e.battery_dual_alignment),
      home_entity: t,
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
      min_columns: 6,
      max_columns: 12,
      min_rows: 3,
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
      return x`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return x``;
    const e = this._config, t = e.decimals ?? Xe, r = e.solar_visible !== !1, n = e.grid_visible !== !1, o = n && e.grid_secondary_visible === !0, i = e.battery_visible !== !1, s = i && e.battery_secondary_visible === !0, a = this.normalizeBatteryDualAlignment(e.battery_dual_alignment), l = I(this.hass, e.home_entity), c = r ? I(this.hass, e.solar_entity) : null, d = n ? I(this.hass, e.grid_entity) : null, h = o ? I(this.hass, e.grid_secondary_entity) : null, _ = i ? I(this.hass, e.battery_entity) : null, y = I(this.hass, e.battery_percentage_entity), v = s ? I(this.hass, e.battery_secondary_entity) : null, p = I(this.hass, e.battery_secondary_percentage_entity), w = e.unit ?? B(this.hass, e.home_entity) ?? "kW", g = e.unit ?? B(this.hass, e.solar_entity) ?? w, m = e.unit ?? B(this.hass, e.home_entity) ?? w, $ = e.unit ?? B(this.hass, e.grid_entity) ?? w, C = e.unit ?? B(this.hass, e.grid_secondary_entity) ?? $, f = e.unit ?? B(this.hass, e.battery_entity) ?? w, u = e.unit ?? B(this.hass, e.battery_secondary_entity) ?? f, b = this.toUnidirectionalFlow(c), M = this.toUnidirectionalFlow(l), E = this.toBidirectionalFlow(d), R = this.toBidirectionalFlow(h), P = d === null && h === null ? "none" : this.toBidirectionalFlow((d ?? 0) + (h ?? 0)), O = this.toBidirectionalFlow(_), D = this.toBidirectionalFlow(v), F = _ === null && v === null ? "none" : this.toBidirectionalFlow((_ ?? 0) + (v ?? 0)), ke = this.resolveTapAction(e).action !== "none", Qt = this.iconColorStyle(e.solar_icon_color), er = this.iconColorStyle(e.grid_icon_color), tr = this.iconColorStyle(e.grid_secondary_icon_color), rr = this.iconColorStyle(e.home_icon_color), nr = this.iconShapeStyle(e.core_icon_color), Ie = r ? this.collectSubBlocks("solar", e) : [], at = n ? this.collectSubBlocks("grid", e) : [], lt = o ? this.collectSubBlocks("grid_secondary", e) : [], Oe = this.collectSubBlocks("home", e), Le = new Set(Oe.map((z) => z.index)), te = new Set(Ie.map((z) => z.index)), or = Le.has(7) && Le.has(8), ir = [5, 6, 7, 8].some((z) => Le.has(z)), sr = te.has(1) && te.has(2) && !te.has(3) && !te.has(4), ar = te.has(3) && te.has(4), ct = o && (sr && or || ar && ir), lr = o && !ct, Ne = Oe.some((z) => z.index >= 7), dt = this.homeSubPositions(Ne), ht = this.gridSubPositions(o), ut = this.gridSecondarySubPositions(), _t = this.solarSubPositions(
      Ne,
      lr,
      ct
    ), mt = Oe.filter((z) => z.index <= (Ne ? 8 : 6)), Be = n ? { col: 1, row: o ? 2 : 3, colSpan: 2, rowSpan: 2 } : null, He = o ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 } : null, De = i ? {
      col: s && a === "center" ? 2 : 3,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, Fe = s ? {
      col: a === "left" ? 1 : a === "right" ? 5 : 4,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, k = this.computeGridBounds(
      r,
      n,
      o,
      i,
      s,
      Be,
      He,
      De,
      Fe,
      Ie,
      at,
      lt,
      mt,
      _t,
      ht,
      ut,
      dt
    ), Ue = r ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, k) : null, ge = Be ? this.normalizePlacement(Be, k) : null, fe = He ? this.normalizePlacement(He, k) : null, yt = this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, k), ve = De ? this.normalizePlacement(De, k) : null, we = Fe ? this.normalizePlacement(Fe, k) : null, pt = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, k), cr = this.normalizePositions(_t, k), dr = this.normalizePositions(ht, k), hr = this.normalizePositions(ut, k), ur = this.normalizePositions(dt, k), bt = this.normalizeBatteryThreshold(e.battery_low_threshold), gt = !!e.battery_low_alert, ft = this.normalizeBatteryThreshold(e.battery_secondary_low_threshold), vt = !!e.battery_secondary_low_alert, wt = gt && y !== null && y <= bt, _r = this.iconColorStyle(wt ? "red" : e.battery_icon_color), mr = this.batteryIcon(y, _, e.battery_icon), xt = vt && p !== null && p <= ft, yr = this.iconColorStyle(
      xt ? "red" : e.battery_secondary_icon_color
    ), pr = this.batteryIcon(
      p,
      v,
      e.battery_secondary_icon
    ), br = { "--flow-color-rgb": this.toRgbCss(e.flow_color) ?? bn }, re = this.resolveColor("purple"), gr = this.resolveColor(e.solar_trend_color, re), fr = this.resolveColor(e.grid_trend_color, re), vr = this.resolveColor(e.grid_secondary_trend_color, re), wr = this.resolveColor(e.home_trend_color, re), xr = this.resolveColor(e.battery_trend_color, re), Sr = this.resolveColor(e.battery_secondary_trend_color, re), St = this.resolveColor("red"), $r = gt && (e.battery_percentage_entity || y !== null) ? bt : null, Cr = y ?? _, Tr = vt && (e.battery_secondary_percentage_entity || p !== null) ? ft : null, Mr = p ?? v, zr = this.buildFlowSegments(
      yt,
      pt,
      Ue,
      [
        ...ge ? [{ placement: ge, direction: E }] : [],
        ...fe ? [{ placement: fe, direction: R }] : []
      ],
      P,
      [
        ...ve ? [{ placement: ve, direction: O }] : [],
        ...we ? [{ placement: we, direction: D }] : []
      ],
      F,
      b,
      M,
      k
    );
    return x`
      <ha-card
        class=${ke ? "interactive" : ""}
        tabindex=${ke ? 0 : -1}
        role=${ke ? "button" : "article"}
        @click=${this.handleCardClick}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div
            class="energy-grid"
            style=${T({
      ...br,
      "--grid-columns": `${k.cols}`,
      "--grid-rows": `${k.rows}`,
      "--grid-aspect": `${k.cols} / ${k.rows}`
    })}
          >
            ${zr.map(
      (z) => this.renderFlowLine(z.orientation, z.direction, {
        ...z.orientation === "horizontal" ? {
          left: `${z.left}%`,
          top: `calc(${z.top}% - (var(--flow-line-size) / 2))`,
          width: `${z.width}%`
        } : {
          left: `calc(${z.left}% - (var(--flow-line-size) / 2))`,
          top: `${z.top}%`,
          height: `${z.height}%`
        }
      })
    )}
            ${this.renderSubNodeConnectors()}

            ${r && Ue ? x`
                  <div
                    class="energy-value solar ${c === null ? "missing" : ""}"
                    style=${T(this.gridPlacementStyle(Ue))}
                  >
                    ${this.renderTrend("solar", c, !!e.solar_trend, gr, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.solar_icon ?? "mdi:weather-sunny"}
                        style=${T(Qt)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(c, g, t)}</div>
                      <div class="energy-label">${e.solar_label}</div>
                    </div>
                  </div>
                ` : S}

            ${n && ge ? x`
                  <div
                    class="energy-value grid ${d === null ? "missing" : ""}"
                    style=${T(this.gridPlacementStyle(ge))}
                  >
                    ${this.renderTrend("grid", d, !!e.grid_trend, fr, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_icon ?? "mdi:transmission-tower"}
                        style=${T(er)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(d, $, t)}</div>
                      <div class="energy-label">${e.grid_label}</div>
                    </div>
                  </div>
                ` : S}

            ${o && fe ? x`
                  <div
                    class="energy-value grid-secondary ${h === null ? "missing" : ""}"
                    style=${T(this.gridPlacementStyle(fe))}
                  >
                    ${this.renderTrend(
      "grid_secondary",
      h,
      !!e.grid_secondary_trend,
      vr,
      null,
      ""
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${T(tr)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(h, C, t)}</div>
                      <div class="energy-label">${e.grid_secondary_label}</div>
                    </div>
                  </div>
                ` : S}

            <div
              class="energy-value home ${l === null ? "missing" : ""}"
              style=${T(this.gridPlacementStyle(yt))}
            >
              ${this.renderTrend("home", l, !!e.home_trend, wr, null, "")}
              <div class="energy-content">
                <ha-icon
                  class="energy-icon"
                  .icon=${e.home_icon ?? "mdi:home-lightning-bolt"}
                  style=${T(rr)}
                ></ha-icon>
                <div class="energy-number">${this.formatValue(l, m, t)}</div>
                <div class="energy-label">${e.home_label}</div>
              </div>
            </div>

            ${this._showSubBlocks ? this.renderSubNodes("solar", Ie, cr, t) : S}
            ${this._showSubBlocks ? this.renderSubNodes("grid", at, dr, t) : S}
            ${this._showSubBlocks ? this.renderSubNodes("grid_secondary", lt, hr, t) : S}
            ${this._showSubBlocks ? this.renderSubNodes("home", mt, ur, t) : S}

            ${i && ve ? x`
                  <div
                    class="energy-value battery ${_ === null ? "missing" : ""}"
                    style=${T(this.gridPlacementStyle(ve))}
                  >
                    ${this.renderTrend(
      "battery",
      Cr,
      !!e.battery_trend,
      xr,
      $r,
      St
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon class="energy-icon" .icon=${mr} style=${T(_r)}></ha-icon>
                        ${y !== null ? x`
                              <div class="battery-percentage ${wt ? "alert" : ""}">
                                ${this.formatBatteryPercentage(y)}
                              </div>
                            ` : S}
                      </div>
                      <div class="energy-number">${this.formatValue(_, f, t)}</div>
                      <div class="energy-label">${e.battery_label}</div>
                    </div>
                  </div>
                ` : S}

            ${s && we ? x`
                  <div
                    class="energy-value battery-secondary ${v === null ? "missing" : ""}"
                    style=${T(this.gridPlacementStyle(we))}
                  >
                    ${this.renderTrend(
      "battery_secondary",
      Mr,
      !!e.battery_secondary_trend,
      Sr,
      Tr,
      St
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${pr}
                          style=${T(yr)}
                        ></ha-icon>
                        ${p !== null ? x`
                              <div class="battery-percentage ${xt ? "alert" : ""}">
                                ${this.formatBatteryPercentage(p)}
                              </div>
                            ` : S}
                      </div>
                      <div class="energy-number">${this.formatValue(v, u, t)}</div>
                      <div class="energy-label">${e.battery_secondary_label}</div>
                    </div>
                  </div>
                ` : S}

            <div class="home-core" style=${T(this.gridPlacementStyle(pt))}>
              <div class="home-core-icon" style=${T(nr)}>
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
    return x`<div class=${n} style=${T(r)} aria-hidden="true"></div>`;
  }
  renderSubNodeConnectors() {
    return !this._showSubBlocks || this._subNodeConnectorSegments.length === 0 ? S : x`
      <div class="subnode-connectors" aria-hidden="true">
        ${this._subNodeConnectorSegments.map(
      (e) => x`
            <div
              class="subnode-connector-segment ${e.node}"
              style=${T({
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
    const r = [], n = e === "solar" ? "mdi:solar-power-variant" : e === "home" ? "mdi:flash" : "mdi:transmission-tower", o = e === "solar" ? "Solar" : e === "home" ? "Home" : e === "grid" ? "Grid" : "Grid 2", i = e === "solar" ? dn : e === "home" ? hn : un;
    for (let h = 1; h <= i; h += 1) {
      const _ = t[`${e}_sub_${h}_enabled`] === !0, y = this.readConfigString(t[`${e}_sub_${h}_entity`]);
      !_ || !y || r.push({
        key: `${e}_${h}`,
        index: h,
        icon: this.readConfigString(t[`${e}_sub_${h}_icon`]) ?? n,
        iconStyle: this.iconColorStyle(t[`${e}_sub_${h}_icon_color`]),
        label: this.readConfigString(t[`${e}_sub_${h}_label`]) ?? `${o} ${h}`,
        value: I(this.hass, y)
      });
    }
    if (r.length > 0)
      return r;
    if (e !== "solar" && e !== "home")
      return [];
    const s = e === "solar" ? !!t.solar_sub_enabled : !!t.home_sub_enabled, a = e === "solar" ? t.solar_sub_entity : t.home_sub_entity;
    if (!s || !a)
      return [];
    const l = e === "solar" ? t.solar_sub_icon ?? n : t.home_sub_icon ?? n, c = e === "solar" ? t.solar_sub_icon_color : t.home_sub_icon_color, d = e === "solar" ? t.solar_sub_label ?? "Solar Sub" : t.home_sub_label ?? "Home Load";
    return [
      {
        key: `${e}_legacy`,
        index: 1,
        icon: l,
        iconStyle: this.iconColorStyle(c),
        label: d,
        value: I(this.hass, a)
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
    return Object.entries(e).forEach(([n, o]) => {
      r[Number(n)] = {
        row: o.row - t.minRow + 1,
        col: o.col - t.minCol + 1
      };
    }), r;
  }
  computeGridBounds(e, t, r, n, o, i, s, a, l, c, d, h, _, y, v, p, w) {
    const g = [
      { col: 5, row: 3, colSpan: 2, rowSpan: 2 },
      // home
      { col: 3, row: 3, colSpan: 2, rowSpan: 2 }
      // core
    ];
    e && g.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }), t && i && g.push(i), r && s && g.push(s), n && a && g.push(a), o && l && g.push(l), c.forEach((u) => {
      const b = y[u.index];
      b && g.push({ col: b.col, row: b.row, colSpan: 1, rowSpan: 1 });
    }), d.forEach((u) => {
      const b = v[u.index];
      b && g.push({ col: b.col, row: b.row, colSpan: 1, rowSpan: 1 });
    }), h.forEach((u) => {
      const b = p[u.index];
      b && g.push({ col: b.col, row: b.row, colSpan: 1, rowSpan: 1 });
    }), _.forEach((u) => {
      const b = w[u.index];
      b && g.push({ col: b.col, row: b.row, colSpan: 1, rowSpan: 1 });
    });
    const m = Math.min(...g.map((u) => u.col)), $ = Math.max(...g.map((u) => u.col + (u.colSpan ?? 1) - 1)), C = Math.min(...g.map((u) => u.row)), f = Math.max(...g.map((u) => u.row + (u.rowSpan ?? 1) - 1));
    return {
      minCol: m,
      maxCol: $,
      minRow: C,
      maxRow: f,
      cols: $ - m + 1,
      rows: f - C + 1
    };
  }
  placementCenter(e, t) {
    const r = e.colSpan ?? 1, n = e.rowSpan ?? 1;
    return {
      x: (e.col - 1 + r / 2) / t.cols * 100,
      y: (e.row - 1 + n / 2) / t.rows * 100
    };
  }
  buildFlowSegments(e, t, r, n, o, i, s, a, l, c) {
    const d = this.placementCenter(t, c), h = this.placementCenter(e, c), _ = [], y = (p, w, g, m) => {
      const $ = Math.min(p, w), C = Math.abs(w - p);
      C <= N || _.push({
        orientation: "horizontal",
        direction: m,
        left: $,
        top: g,
        width: C,
        height: 0
      });
    }, v = (p, w, g, m) => {
      const $ = Math.min(p, w), C = Math.abs(w - p);
      C <= N || _.push({
        orientation: "vertical",
        direction: m,
        left: g,
        top: $,
        width: 0,
        height: C
      });
    };
    if (y(d.x, h.x, d.y, l), r) {
      const p = this.placementCenter(r, c);
      v(p.y, d.y, d.x, a);
    }
    if (n.length === 1) {
      const [{ placement: p, direction: w }] = n, g = this.placementCenter(p, c);
      y(g.x, d.x, d.y, w);
    } else if (n.length >= 2) {
      const p = n.map((m) => ({
        direction: m.direction,
        center: this.placementCenter(m.placement, c)
      })).sort((m, $) => m.center.y - $.center.y), w = Math.min(...p.map((m) => m.center.x)), g = d.x - (d.x - w) * 0.5;
      y(d.x, g, d.y, o), p.forEach((m) => {
        const $ = m.center.y > d.y + N ? this.reverseFlowDirection(m.direction) : m.direction;
        v(d.y, m.center.y, g, $), y(m.center.x, g, m.center.y, m.direction);
      });
    }
    if (i.length === 1) {
      const [{ placement: p, direction: w }] = i, g = this.placementCenter(p, c);
      v(d.y, g.y, d.x, w);
    } else if (i.length >= 2) {
      const p = i.map((m) => ({
        placement: m.placement,
        direction: m.direction,
        center: this.placementCenter(m.placement, c)
      })).sort((m, $) => m.center.y - $.center.y), w = Math.min(
        ...p.map((m) => (m.placement.row - 1) / c.rows * 100)
      ), g = Math.max(d.y + N, w);
      v(d.y, g, d.x, s), p.forEach((m) => {
        y(d.x, m.center.x, g, m.direction), v(g, m.center.y, m.center.x, m.direction);
      });
    }
    return _;
  }
  renderSubNodes(e, t, r, n) {
    return t.length === 0 ? S : x`
      ${t.map((o) => {
      const i = r[o.index];
      if (!i)
        return S;
      const s = {
        "grid-column": `${i.col}`,
        "grid-row": `${i.row}`
      };
      return x`
            <div
              class="energy-sub-value ${e}-sub sub-col-${i.col} ${o.value === null ? "missing" : ""}"
              data-key=${o.key}
              style=${T(s)}
            >
              <div class="energy-sub-content">
                <ha-icon class="energy-sub-icon" .icon=${o.icon} style=${T(o.iconStyle)}></ha-icon>
                <div class="energy-sub-number">${this.formatValue(o.value, "kWh", n)}</div>
                <div class="energy-sub-label">${o.label}</div>
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
  renderTrend(e, t, r, n, o, i) {
    return r ? (this._trendDrawConfig[e] = {
      currentValue: t,
      color: n,
      threshold: o,
      thresholdColor: i
    }, x`
      <div class="node-trend" aria-hidden="true">
        <canvas class="node-trend-canvas-area" data-node=${e}></canvas>
      </div>
      <div class="node-trend-line" aria-hidden="true">
        <canvas class="node-trend-canvas-line" data-node=${e}></canvas>
      </div>
    `) : (delete this._trendDrawConfig[e], S);
  }
  trendPoints(e, t) {
    const r = Date.now(), n = r - de, i = [...(this._trendSeries[e] ?? []).filter((s) => s.ts >= n).sort((s, a) => s.ts - a.ts)];
    return t !== null && Number.isFinite(t) && i.push({ ts: r, value: t }), i;
  }
  buildThresholdTrendSegments(e, t) {
    const r = [];
    for (let n = 1; n < e.length; n += 1) {
      const o = e[n - 1], i = e[n], s = o.value <= t, a = i.value <= t;
      if (s === a || Math.abs(i.value - o.value) <= N) {
        r.push({
          start: o,
          end: i,
          low: s
        });
        continue;
      }
      const l = (t - o.value) / (i.value - o.value), c = Math.max(0, Math.min(1, l)), d = {
        x: o.x + (i.x - o.x) * c,
        y: o.y + (i.y - o.y) * c,
        value: t
      };
      r.push({
        start: o,
        end: d,
        low: s
      }), r.push({
        start: d,
        end: i,
        low: a
      });
    }
    return r;
  }
  toTrendCoordinates(e) {
    var w, g;
    const r = Date.now() - de, n = 0, o = 100, i = e.map((m) => m.value), s = Math.min(...i), a = Math.max(...i);
    if (!Number.isFinite(s) || !Number.isFinite(a))
      return [];
    const l = 20, c = 80, d = Math.max(a - s, N), h = e.map((m) => {
      const $ = Math.max(0, Math.min(100, (m.ts - r) / de * 100)), C = n + $ / 100 * (o - n), f = d <= N ? 0.5 : (m.value - s) / d, u = c - f * (c - l);
      return { x: C, y: u, value: m.value };
    }), _ = ((w = h[0]) == null ? void 0 : w.x) ?? n, y = ((g = h[h.length - 1]) == null ? void 0 : g.x) ?? o, v = Math.max(0, y - _), p = 18;
    if (h.length >= 2 && v < p) {
      const m = o - p, $ = Math.max(n, Math.min(m, y - p));
      if (v <= N) {
        const f = p / (h.length - 1);
        return h.map((u, b) => ({
          ...u,
          x: Math.max(n, Math.min(o, $ + f * b))
        }));
      }
      const C = p / v;
      return h.map((f) => ({
        ...f,
        x: Math.max(n, Math.min(o, $ + (f.x - _) * C))
      }));
    }
    return h;
  }
  toCanvasPoints(e, t, r) {
    const n = e.map((o) => ({
      x: o.x / 100 * t,
      y: o.y / 100 * r,
      value: o.value
    }));
    return this.downsampleCanvasPoints(n, t);
  }
  downsampleCanvasPoints(e, t) {
    if (e.length <= 3)
      return e;
    const r = Math.max(24, Math.min(e.length, Math.round(t)));
    if (e.length <= r)
      return this.smoothCanvasPoints(e);
    const n = [];
    n.push(e[0]);
    const o = (e.length - 1) / (r - 1);
    for (let i = 1; i < r - 1; i += 1) {
      const s = Math.floor(i * o), a = Math.max(s + 1, Math.floor((i + 1) * o)), l = e.slice(s, Math.min(e.length, a));
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
    return n.push(e[e.length - 1]), this.smoothCanvasPoints(n);
  }
  smoothCanvasPoints(e) {
    if (e.length <= 3)
      return e;
    const t = [e[0]];
    for (let r = 1; r < e.length - 1; r += 1) {
      const n = e[r - 1], o = e[r], i = e[r + 1];
      t.push({
        x: o.x,
        y: (n.y + o.y * 2 + i.y) / 4,
        value: (n.value + o.value * 2 + i.value) / 4
      });
    }
    return t.push(e[e.length - 1]), t;
  }
  updateSubBlockVisibility() {
    const e = this.renderRoot.querySelector(".energy-grid");
    if (!e) {
      this._showSubBlocks && (this._showSubBlocks = !1);
      return;
    }
    const t = this.findLayoutSpan("column"), r = this.findLayoutSpan("row"), n = t !== null && r !== null && t >= _n && r >= mn, o = e.getBoundingClientRect(), i = o.width >= yn && o.height >= pn, s = t !== null && r !== null ? n : i;
    s !== this._showSubBlocks && (this._showSubBlocks = s);
  }
  findLayoutSpan(e) {
    let t = this;
    for (; t; ) {
      const r = this.parseGridSpanCandidates(
        e === "row" ? [t.style.gridRowStart, t.style.gridRowEnd, t.style.gridRow] : [t.style.gridColumnStart, t.style.gridColumnEnd, t.style.gridColumn]
      );
      if (r !== null)
        return r;
      const n = getComputedStyle(t), o = this.parseGridSpanCandidates(
        e === "row" ? [n.gridRowStart, n.gridRowEnd, n.gridRow] : [n.gridColumnStart, n.gridColumnEnd, n.gridColumn]
      );
      if (o !== null)
        return o;
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
    const e = this.renderRoot.querySelector(".energy-grid"), t = this.renderRoot.querySelector(".energy-value.home"), r = this.renderRoot.querySelector(".energy-value.solar"), n = this.renderRoot.querySelector(".energy-value.grid"), o = this.renderRoot.querySelector(".energy-value.grid-secondary");
    if (!e) {
      this._subNodeConnectorSegments.length > 0 && (this._subNodeConnectorSegments = []);
      return;
    }
    const i = e.getBoundingClientRect(), s = t == null ? void 0 : t.getBoundingClientRect(), a = r == null ? void 0 : r.getBoundingClientRect(), l = n == null ? void 0 : n.getBoundingClientRect(), c = o == null ? void 0 : o.getBoundingClientRect(), d = s ? s.left + s.width / 2 : 0, h = a ? a.top + a.height / 2 : 0, _ = l ? l.left + l.width / 2 : 0, y = c ? c.left + c.width / 2 : 0, v = (f) => f - i.left, p = (f) => f - i.top, w = (f) => Math.round(f * 10) / 10, g = [], m = (f, u, b, M) => {
      const E = Math.min(f, u), R = Math.abs(u - f);
      R <= 0.5 || g.push({
        node: M,
        left: w(E),
        top: w(b - 1),
        width: w(R),
        height: 2
      });
    }, $ = (f, u, b, M) => {
      const E = Math.min(f, u), R = Math.abs(u - f);
      R <= 0.5 || g.push({
        node: M,
        left: w(b - 1),
        top: w(E),
        width: 2,
        height: w(R)
      });
    };
    s && this.renderRoot.querySelectorAll(".energy-sub-value.home-sub").forEach((f) => {
      const u = f.getBoundingClientRect(), b = u.top + u.height / 2, M = u.left + u.width / 2 < d ? u.right : u.left, E = b, R = b < s.top ? s.top : b > s.bottom ? s.bottom : b, P = v(d), O = p(E), D = p(R), F = v(M);
      m(F, P, O, "home"), $(O, D, P, "home");
    }), a && this.renderRoot.querySelectorAll(".energy-sub-value.solar-sub").forEach((f) => {
      const u = f.getBoundingClientRect(), b = u.left + u.width / 2, M = u.top + u.height / 2 < h ? u.bottom : u.top, E = b, R = b < a.left ? a.left : b > a.right ? a.right : b, P = p(h), O = v(E), D = v(R), F = p(M);
      $(F, P, O, "solar"), m(O, D, P, "solar");
    }), l && this.renderRoot.querySelectorAll(".energy-sub-value.grid-sub").forEach((f) => {
      const u = f.getBoundingClientRect(), b = u.top + u.height / 2, M = u.left + u.width / 2 < _ ? u.right : u.left, E = b, R = b < l.top ? l.top : b > l.bottom ? l.bottom : b, P = v(_), O = p(E), D = p(R), F = v(M);
      m(F, P, O, "grid"), $(O, D, P, "grid");
    }), c && this.renderRoot.querySelectorAll(".energy-sub-value.grid_secondary-sub").forEach((f) => {
      const u = f.getBoundingClientRect(), b = u.top + u.height / 2, M = u.left + u.width / 2 < y ? u.right : u.left, E = b, R = b < c.top ? c.top : b > c.bottom ? c.bottom : b, P = v(y), O = p(E), D = p(R), F = v(M);
      m(F, P, O, "grid_secondary"), $(O, D, P, "grid_secondary");
    }), g.length === this._subNodeConnectorSegments.length && g.every(
      (f, u) => {
        var b, M, E, R, P;
        return f.node === ((b = this._subNodeConnectorSegments[u]) == null ? void 0 : b.node) && f.left === ((M = this._subNodeConnectorSegments[u]) == null ? void 0 : M.left) && f.top === ((E = this._subNodeConnectorSegments[u]) == null ? void 0 : E.top) && f.width === ((R = this._subNodeConnectorSegments[u]) == null ? void 0 : R.width) && f.height === ((P = this._subNodeConnectorSegments[u]) == null ? void 0 : P.height);
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
    const e = this.collectTrendCanvases(".node-trend-canvas-area"), t = this.collectTrendCanvases(".node-trend-canvas-line"), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
    e.forEach((o, i) => {
      const s = this.prepareTrendCanvas(o);
      s && r.set(i, s);
    }), t.forEach((o, i) => {
      const s = this.prepareTrendCanvas(o);
      s && n.set(i, s);
    }), Object.keys(this._trendDrawConfig).forEach((o) => {
      const i = this._trendDrawConfig[o];
      if (!i)
        return;
      const s = r.get(o), a = n.get(o);
      if (!s || !a)
        return;
      const l = this.trendPoints(o, i.currentValue);
      if (l.length < 2)
        return;
      const c = this.toTrendCoordinates(l);
      if (c.length < 2)
        return;
      const d = this.toCanvasPoints(c, s.width, s.height), h = this.toCanvasPoints(c, a.width, a.height);
      this.drawTrendArea(
        s.ctx,
        d,
        i.color,
        s.height,
        i.threshold,
        i.thresholdColor
      ), this.drawTrendLine(a.ctx, h, i.color, i.threshold, i.thresholdColor);
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
    const r = e.getBoundingClientRect(), n = Math.max(1, Math.round(r.width)), o = Math.max(1, Math.round(r.height)), i = Math.max(1, window.devicePixelRatio || 1), s = Math.max(1, Math.round(n * i)), a = Math.max(1, Math.round(o * i));
    return (e.width !== s || e.height !== a) && (e.width = s, e.height = a), t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height), t.setTransform(i, 0, 0, i, 0, 0), { ctx: t, width: n, height: o };
  }
  drawTrendArea(e, t, r, n, o, i) {
    if (t.length < 2)
      return;
    const s = this.resolveCanvasColor(r);
    if (o === null) {
      this.fillTrendAreaRun(e, t, s, n);
      return;
    }
    const a = this.resolveCanvasColor(i), l = this.buildThresholdTrendSegments(t, o);
    this.buildAreaRunsFromSegments(l).forEach((d) => {
      this.fillTrendAreaRun(e, d.points, d.low ? a : s, n);
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
      const n = t[t.length - 1], o = n.points[n.points.length - 1], i = Math.abs(o.x - r.start.x) <= 0.01 && Math.abs(o.y - r.start.y) <= 0.01;
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
    const o = t[0], i = t[t.length - 1], s = Math.min(...t.map((l) => l.y)), a = e.createLinearGradient(0, s, 0, n);
    a.addColorStop(0, this.withAlpha(r, 0.24)), a.addColorStop(1, this.withAlpha(r, 0)), e.beginPath(), e.moveTo(o.x, o.y), t.slice(1).forEach((l) => e.lineTo(l.x, l.y)), e.lineTo(i.x, n), e.lineTo(o.x, n), e.closePath(), e.fillStyle = a, e.fill();
  }
  drawTrendLine(e, t, r, n, o) {
    if (t.length < 2)
      return;
    const i = this.resolveCanvasColor(r), s = this.resolveCanvasColor(o);
    if (n === null) {
      this.strokeTrendPolyline(e, t, i, 1.5);
      return;
    }
    this.buildThresholdTrendSegments(t, n).forEach((l) => {
      this.strokeTrendSegment(e, l.start, l.end, l.low ? s : i, 1.5);
    });
  }
  strokeTrendPolyline(e, t, r, n) {
    t.length < 2 || (e.beginPath(), e.moveTo(t[0].x, t[0].y), t.slice(1).forEach((o) => e.lineTo(o.x, o.y)), e.strokeStyle = r, e.lineWidth = n, e.lineCap = "round", e.lineJoin = "round", e.stroke());
  }
  strokeTrendSegment(e, t, r, n, o) {
    e.beginPath(), e.moveTo(t.x, t.y), e.lineTo(r.x, r.y), e.strokeStyle = n, e.lineWidth = o, e.lineCap = "round", e.lineJoin = "round", e.stroke();
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
    const o = n.fillStyle, s = (typeof o == "string" ? o.trim() : "").match(/^#([a-f\d]{6})$/i);
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
    super.connectedCallback(), this.maybeRefreshTrendHistory(!0), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Lt), this.updateComplete.then(() => {
      this.syncTrendResizeObserver(), this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw();
    });
  }
  disconnectedCallback() {
    this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._subNodeConnectorRaf !== void 0 && (window.cancelAnimationFrame(this._subNodeConnectorRaf), this._subNodeConnectorRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0), super.disconnectedCallback();
  }
  updated(e) {
    e.has("_config") ? this.maybeRefreshTrendHistory(!0) : e.has("hass") && this.maybeRefreshTrendHistory(), this.syncTrendResizeObserver(), this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw();
  }
  maybeRefreshTrendHistory(e = !1) {
    e && (this._lastTrendRefresh = 0);
    const t = Date.now();
    !e && t - this._lastTrendRefresh < Lt || (this._lastTrendRefresh = t, this.refreshTrendHistory());
  }
  async refreshTrendHistory() {
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function")
      return;
    const e = this._config, t = this.enabledTrendNodes(e);
    if (t.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const r = {};
      for (const n of t) {
        const o = this.trendEntityId(n, e);
        o && (r[n] = await this.fetchTrendHistory(o));
      }
      this._trendSeries = r;
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
        return t.home_entity;
      case "battery":
        return t.battery_percentage_entity ?? t.battery_entity;
      case "battery_secondary":
        return t.battery_secondary_percentage_entity ?? t.battery_secondary_entity;
      default:
        return;
    }
  }
  async fetchTrendHistory(e) {
    if (!this.hass.callApi)
      return [];
    const r = `history/period/${new Date(Date.now() - de).toISOString()}?filter_entity_id=${encodeURIComponent(e)}&minimal_response&no_attributes`;
    try {
      const n = await this.hass.callApi("GET", r);
      return this.parseTrendHistory(n);
    } catch {
      return [];
    }
  }
  parseTrendHistory(e) {
    if (!Array.isArray(e) || e.length === 0)
      return [];
    const t = Array.isArray(e[0]) ? e[0] : e;
    if (!Array.isArray(t))
      return [];
    const r = [];
    for (const o of t) {
      if (!o || typeof o != "object")
        continue;
      const i = o, s = Number(i.state), a = typeof i.last_changed == "string" ? i.last_changed : typeof i.last_updated == "string" ? i.last_updated : "", l = Date.parse(a);
      !Number.isFinite(s) || !Number.isFinite(l) || r.push({ ts: l, value: s });
    }
    const n = Date.now() - de;
    return r.filter((o) => o.ts >= n).sort((o, i) => o.ts - i.ts);
  }
  executeTapAction() {
    if (!this._config)
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
    return e === null || e <= N ? "none" : "forward";
  }
  toBidirectionalFlow(e) {
    return e === null || Math.abs(e) <= N ? "none" : e > 0 ? "forward" : "backward";
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
    if (t !== null && t > N)
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
    const r = this.toRgbCss(e);
    if (r)
      return `rgb(${r})`;
    if (typeof e == "string" && e.trim().length > 0) {
      const n = e.trim(), o = n.toLowerCase();
      if (o !== "none" && o !== "default")
        return n;
    }
    return t;
  }
  toRgbCss(e) {
    if (Array.isArray(e) && e.length >= 3) {
      const o = e.slice(0, 3).map((i) => Number(i));
      if (o.every((i) => Number.isFinite(i))) {
        const [i, s, a] = o.map((l) => Math.max(0, Math.min(255, Math.round(l))));
        return `${i}, ${s}, ${a}`;
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
    if (t in Nt)
      return `var(--rgb-${t}, ${Nt[t]})`;
    const r = /^#([a-fA-F0-9]{3})$/, n = /^#([a-fA-F0-9]{6})$/;
    if (r.test(t)) {
      const [, o] = t.match(r) ?? [];
      if (!o)
        return null;
      const i = parseInt(o[0] + o[0], 16), s = parseInt(o[1] + o[1], 16), a = parseInt(o[2] + o[2], 16);
      return `${i}, ${s}, ${a}`;
    }
    if (n.test(t)) {
      const [, o] = t.match(n) ?? [];
      if (!o)
        return null;
      const i = parseInt(o.slice(0, 2), 16), s = parseInt(o.slice(2, 4), 16), a = parseInt(o.slice(4, 6), 16);
      return `${i}, ${s}, ${a}`;
    }
    return null;
  }
};
V.styles = Re`
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
se([
  H({ attribute: !1 })
], V.prototype, "hass", 2);
se([
  A()
], V.prototype, "_config", 2);
se([
  A()
], V.prototype, "_trendSeries", 2);
se([
  A()
], V.prototype, "_showSubBlocks", 2);
se([
  A()
], V.prototype, "_subNodeConnectorSegments", 2);
V = se([
  ee("power-schwammerl-energy-card")
], V);
var gn = Object.defineProperty, fn = Object.getOwnPropertyDescriptor, nt = (e, t, r, n) => {
  for (var o = n > 1 ? void 0 : n ? fn(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (n ? s(t, r, o) : s(o)) || o);
  return n && o && gn(t, r, o), o;
};
const vn = 4, wn = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, xn = (e) => ({
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
              default_color: wn[e] ?? "purple"
            }
          }
        }
      ]
    }
  ]
}), Sn = [
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
      }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "hover_enabled", selector: { boolean: {} } },
      { name: "fill_area_enabled", selector: { boolean: {} } },
      { name: "clip_graph_to_labels", selector: { boolean: {} } },
      {
        name: "line_thickness",
        selector: { number: { mode: "box", min: 0.5, max: 6, step: 0.1 } }
      }
    ]
  },
  ...Array.from({ length: vn }, (e, t) => xn(t + 1)),
  {
    type: "grid",
    name: "",
    schema: [
      { name: "unit", selector: { text: {} } },
      { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } }
    ]
  }
], $n = {
  legend_layout: "Label layout",
  timeframe_hours: "Time range",
  hover_enabled: "Enable hover",
  fill_area_enabled: "Enable area fill",
  clip_graph_to_labels: "Clip graph below labels",
  line_thickness: "Line thickness",
  unit: "Unit override",
  decimals: "Decimals"
};
let ze = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = e.name ?? "", r = t.match(/^entity_(\d+)_(enabled|show_icon|icon|icon_color|trend_color)$/);
      if (r) {
        const [, o, i] = r;
        return `Entity ${o} ${{
          enabled: "Enabled",
          show_icon: "Show icon",
          icon: "Icon",
          icon_color: "Icon color",
          trend_color: "Graph color"
        }[i] ?? i}`;
      }
      const n = t.match(/^entity_(\d+)$/);
      return n ? `Entity ${n[1]}` : $n[t] ?? t;
    }, this.valueChanged = (e) => {
      const t = {
        ...e.detail.value,
        type: "custom:power-schwammerl-graph-card"
      };
      this._config = t, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: t },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(e) {
    const t = {
      ...e,
      type: "custom:power-schwammerl-graph-card",
      legend_layout: e.legend_layout === "column" ? "column" : "row",
      timeframe_hours: this.normalizeTimeframeHours(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      line_thickness: typeof e.line_thickness == "number" && Number.isFinite(e.line_thickness) ? Math.max(0.5, Math.min(6, e.line_thickness)) : 1.5,
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      entity_1: this.readString(e.entity_1) ?? this.readString(e.entity),
      entity_1_enabled: e.entity_1_enabled ?? !0,
      entity_1_show_icon: e.entity_1_show_icon ?? !0,
      entity_1_icon: e.entity_1_icon ?? e.icon,
      entity_1_icon_color: e.entity_1_icon_color ?? e.icon_color,
      entity_1_trend_color: e.entity_1_trend_color ?? e.trend_color,
      entity_2: this.readString(e.entity_2),
      entity_2_enabled: e.entity_2_enabled ?? !1,
      entity_2_show_icon: e.entity_2_show_icon ?? !0,
      entity_2_icon: e.entity_2_icon,
      entity_3: this.readString(e.entity_3),
      entity_3_enabled: e.entity_3_enabled ?? !1,
      entity_3_show_icon: e.entity_3_show_icon ?? !0,
      entity_3_icon: e.entity_3_icon,
      entity_4: this.readString(e.entity_4),
      entity_4_enabled: e.entity_4_enabled ?? !1,
      entity_4_show_icon: e.entity_4_show_icon ?? !0,
      entity_4_icon: e.entity_4_icon
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? S : x`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Sn}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
  readString(e) {
    if (typeof e != "string")
      return;
    const t = e.trim();
    return t.length > 0 ? t : void 0;
  }
  normalizeTimeframeHours(e) {
    const t = typeof e == "number" ? e : typeof e == "string" ? Number.parseInt(e, 10) : NaN;
    return t === 6 || t === 12 || t === 24 ? t : 24;
  }
};
nt([
  H({ attribute: !1 })
], ze.prototype, "hass", 2);
nt([
  A()
], ze.prototype, "_config", 2);
ze = nt([
  ee("power-schwammerl-graph-card-editor")
], ze);
var Cn = Object.defineProperty, Tn = Object.getOwnPropertyDescriptor, ae = (e, t, r, n) => {
  for (var o = n > 1 ? void 0 : n ? Tn(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (n ? s(t, r, o) : s(o)) || o);
  return n && o && Cn(t, r, o), o;
};
const Ye = 1, Bt = 24, Ht = 300 * 1e3, Se = 0.01, Dt = 4, Mn = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", Ft = {
  red: "244, 67, 54",
  pink: "233, 30, 99",
  purple: "156, 39, 176",
  "deep-purple": "103, 58, 183",
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
};
let W = class extends L {
  constructor() {
    super(...arguments), this._trendSeries = {}, this._graphTopInset = 0, this._drawConfigs = [], this._linePointsBySlot = {}, this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this.handlePointerMove = (e) => {
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
      const n = e.clientX - r.left, o = e.clientY - r.top;
      if (n < 0 || n > r.width || o < 0 || o > r.height) {
        this.clearHoverState();
        return;
      }
      const i = this.findNearestHoverPoint(n, o);
      if (!i) {
        this.clearHoverState();
        return;
      }
      const s = this._hoverState;
      s && s.slot === i.slot && Math.abs(s.x - i.x) <= 0.2 && Math.abs(s.y - i.y) <= 0.2 && Math.abs(s.value - i.value) <= 1e-4 && s.color === i.color || (this._hoverState = i);
    }, this.handlePointerLeave = () => {
      this.clearHoverState();
    };
  }
  static async getConfigElement() {
    return document.createElement("power-schwammerl-graph-card-editor");
  }
  static async getStubConfig(e) {
    const t = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(t), n = (...c) => c.find((d) => d in t), o = (c) => r.find((d) => d.startsWith(`${c}.`)), i = n("sensor.dev_home_power", "sensor.home_power") ?? o("sensor") ?? "sensor.dev_home_power", s = n("sensor.dev_solar_power", "sensor.solar_power"), a = n("sensor.dev_grid_power", "sensor.grid_power"), l = n("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-schwammerl-graph-card",
      legend_layout: "row",
      timeframe_hours: Bt,
      hover_enabled: !0,
      fill_area_enabled: !0,
      entity_1: i,
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
      decimals: Ye
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Ye, r = this.readConfigString(e.entity), n = this.readConfigString(e.icon), o = this.readConfigString(e.entity_1) ?? r ?? "sensor.dev_home_power";
    this._config = {
      ...e,
      type: "custom:power-schwammerl-graph-card",
      legend_layout: this.normalizeLegendLayout(e.legend_layout),
      timeframe_hours: this.normalizeTimeframeHours(e.timeframe_hours),
      line_thickness: this.normalizeLineThickness(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      entity_1: o,
      entity_1_enabled: e.entity_1_enabled ?? !0,
      entity_1_show_icon: e.entity_1_show_icon ?? !0,
      entity_1_icon: e.entity_1_icon ?? n ?? "mdi:chart-line",
      entity_1_icon_color: e.entity_1_icon_color ?? e.icon_color,
      entity_1_trend_color: e.entity_1_trend_color ?? e.trend_color,
      entity_2: this.readConfigString(e.entity_2),
      entity_2_enabled: e.entity_2_enabled ?? !1,
      entity_2_show_icon: e.entity_2_show_icon ?? !0,
      entity_2_icon: e.entity_2_icon ?? "mdi:chart-line-variant",
      entity_3: this.readConfigString(e.entity_3),
      entity_3_enabled: e.entity_3_enabled ?? !1,
      entity_3_show_icon: e.entity_3_show_icon ?? !0,
      entity_3_icon: e.entity_3_icon ?? "mdi:chart-bell-curve",
      entity_4: this.readConfigString(e.entity_4),
      entity_4_enabled: e.entity_4_enabled ?? !1,
      entity_4_show_icon: e.entity_4_show_icon ?? !0,
      entity_4_icon: e.entity_4_icon ?? "mdi:chart-timeline-variant",
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
      return x`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return x``;
    const e = this._config, t = e.decimals ?? Ye, r = this.normalizeLineThickness(e.line_thickness), n = this.collectSeriesEntries(e, t), o = this.normalizeLegendLayout(e.legend_layout), i = e.hover_enabled !== !1, s = this._hoverState, a = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, l = a > 0 ? { top: `${a}px` } : {}, c = s ? {
      left: `${s.x}px`,
      top: `${s.y + a}px`,
      "--hover-dot-color": s.color
    } : {};
    return this._drawConfigs = n.map((d) => ({
      slot: d.slot,
      currentValue: d.currentValue,
      color: d.trendColor,
      lineWidth: r
    })), x`
      <ha-card>
        <div
          class="container"
          @pointermove=${this.handlePointerMove}
          @pointerleave=${this.handlePointerLeave}
          @pointercancel=${this.handlePointerLeave}
        >
          <div class="card-trend" style=${T(l)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${T(l)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${i && s ? x`<div class="hover-dot" aria-hidden="true" style=${T(c)}></div>` : S}

          <div class="content">
            <div class="series-list layout-${o}">
              ${n.length === 0 ? x`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : n.map(
      (d) => this.renderSeriesItem(
        d,
        s && s.slot === d.slot ? s.value : null
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
    return x`
      <div class="state-item" data-slot=${String(e.slot)}>
        ${e.showIcon ? x`
              <div class="icon-wrap">
                <div class="icon-shape" style=${T(e.iconStyle)}>
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
              </div>
            ` : S}
        <div class="info">
          <div class="primary">${e.name}</div>
          <div class="secondary">${r}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(e, t) {
    const r = [];
    for (let n = 1; n <= Dt; n += 1) {
      const o = n, i = this.slotEnabled(o, e), s = this.slotEntityId(o, e);
      if (!i || !s)
        continue;
      const a = this.entityName(s, n), l = I(this.hass, s), c = e.unit ?? B(this.hass, s) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(o, e), _ = this.iconStyle(this.slotIconColor(o, e)), y = this.resolveColor(this.slotTrendColor(o, e), Mn);
      r.push({
        slot: o,
        entityId: s,
        name: a,
        secondary: d,
        unit: c,
        decimals: t,
        currentValue: l,
        icon: h,
        showIcon: this.slotShowIcon(o, e),
        iconStyle: _,
        trendColor: y
      });
    }
    return r;
  }
  slotEntityId(e, t) {
    switch (e) {
      case 1:
        return this.readConfigString(t.entity_1);
      case 2:
        return this.readConfigString(t.entity_2);
      case 3:
        return this.readConfigString(t.entity_3);
      case 4:
        return this.readConfigString(t.entity_4);
      default:
        return;
    }
  }
  slotEnabled(e, t) {
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
  }
  slotShowIcon(e, t) {
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
  }
  slotIcon(e, t) {
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
  }
  slotIconColor(e, t) {
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
  }
  slotTrendColor(e, t) {
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
  }
  entityName(e, t) {
    var o;
    const r = this.hass.states[e], n = (o = r == null ? void 0 : r.attributes) == null ? void 0 : o.friendly_name;
    return typeof n == "string" && n.trim().length > 0 ? n.trim() : `Entity ${t}`;
  }
  formatValue(e, t, r) {
    if (e === null)
      return t ? `-- ${t}` : "--";
    const n = `${e.toFixed(r)} ${t}`.trim();
    return n.length > 0 ? n : "--";
  }
  readConfigString(e) {
    if (typeof e != "string")
      return;
    const t = e.trim();
    return t.length > 0 ? t : void 0;
  }
  normalizeLegendLayout(e) {
    return e === "column" ? "column" : "row";
  }
  normalizeTimeframeHours(e) {
    const t = typeof e == "number" ? e : typeof e == "string" ? Number.parseInt(e, 10) : NaN;
    return t === 6 || t === 12 || t === 24 ? t : Bt;
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return typeof e != "number" || !Number.isFinite(e) ? 1.5 : Math.max(0.5, Math.min(6, e));
  }
  iconStyle(e) {
    const t = this.toRgbCss(e);
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
  }
  resolveColor(e, t = "") {
    const r = this.toRgbCss(e);
    if (r)
      return `rgb(${r})`;
    if (typeof e == "string" && e.trim().length > 0) {
      const n = e.trim(), o = n.toLowerCase();
      if (o !== "none" && o !== "default")
        return n;
    }
    return t;
  }
  toRgbCss(e) {
    if (Array.isArray(e) && e.length >= 3) {
      const o = e.slice(0, 3).map((i) => Number(i));
      if (o.every((i) => Number.isFinite(i))) {
        const [i, s, a] = o.map((l) => Math.max(0, Math.min(255, Math.round(l))));
        return `${i}, ${s}, ${a}`;
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
    if (t in Ft)
      return `var(--rgb-${t}, ${Ft[t]})`;
    const r = /^#([a-fA-F0-9]{3})$/, n = /^#([a-fA-F0-9]{6})$/;
    if (r.test(t)) {
      const [, o] = t.match(r) ?? [];
      if (!o)
        return null;
      const i = parseInt(o[0] + o[0], 16), s = parseInt(o[1] + o[1], 16), a = parseInt(o[2] + o[2], 16);
      return `${i}, ${s}, ${a}`;
    }
    if (n.test(t)) {
      const [, o] = t.match(n) ?? [];
      if (!o)
        return null;
      const i = parseInt(o.slice(0, 2), 16), s = parseInt(o.slice(2, 4), 16), a = parseInt(o.slice(4, 6), 16);
      return `${i}, ${s}, ${a}`;
    }
    return null;
  }
  trendPoints(e, t) {
    const r = Date.now(), n = r - this.trendWindowMs(this._config), i = [...(this._trendSeries[e] ?? []).filter((s) => s.ts >= n).sort((s, a) => s.ts - a.ts)];
    return t !== null && Number.isFinite(t) && i.push({ ts: r, value: t }), i;
  }
  toTrendCoordinates(e, t) {
    var g, m;
    const n = Date.now() - t, o = 0, i = 100, s = e.map(($) => $.value), a = Math.min(...s), l = Math.max(...s);
    if (!Number.isFinite(a) || !Number.isFinite(l))
      return [];
    const c = 20, d = 80, h = Math.max(l - a, Se), _ = e.map(($) => {
      const C = Math.max(0, Math.min(100, ($.ts - n) / t * 100)), f = o + C / 100 * (i - o), u = h <= Se ? 0.5 : ($.value - a) / h, b = d - u * (d - c);
      return { x: f, y: b, value: $.value };
    }), y = ((g = _[0]) == null ? void 0 : g.x) ?? o, v = ((m = _[_.length - 1]) == null ? void 0 : m.x) ?? i, p = Math.max(0, v - y), w = 18;
    if (_.length >= 2 && p < w) {
      const $ = i - w, C = Math.max(o, Math.min($, v - w));
      if (p <= Se) {
        const u = w / (_.length - 1);
        return _.map((b, M) => ({
          ...b,
          x: Math.max(o, Math.min(i, C + u * M))
        }));
      }
      const f = w / p;
      return _.map((u) => ({
        ...u,
        x: Math.max(o, Math.min(i, C + (u.x - y) * f))
      }));
    }
    return _;
  }
  toCanvasPoints(e, t, r) {
    const n = e.map((o) => ({
      x: o.x / 100 * t,
      y: o.y / 100 * r,
      value: o.value
    }));
    return this.downsampleCanvasPoints(n, t);
  }
  downsampleCanvasPoints(e, t) {
    if (e.length <= 3)
      return e;
    const r = Math.max(24, Math.min(e.length, Math.round(t)));
    if (e.length <= r)
      return this.smoothCanvasPoints(e);
    const n = [];
    n.push(e[0]);
    const o = (e.length - 1) / (r - 1);
    for (let i = 1; i < r - 1; i += 1) {
      const s = Math.floor(i * o), a = Math.max(s + 1, Math.floor((i + 1) * o)), l = e.slice(s, Math.min(e.length, a));
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
    return n.push(e[e.length - 1]), this.smoothCanvasPoints(n);
  }
  smoothCanvasPoints(e) {
    if (e.length <= 3)
      return e;
    const t = [e[0]];
    for (let r = 1; r < e.length - 1; r += 1) {
      const n = e[r - 1], o = e[r], i = e[r + 1];
      t.push({
        x: o.x,
        y: (n.y + o.y * 2 + i.y) / 4,
        value: (n.value + o.value * 2 + i.value) / 4
      });
    }
    return t.push(e[e.length - 1]), t;
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
    var l;
    if (this._drawConfigs.length === 0) {
      this._linePointsBySlot = {}, this._hoverState && (this._hoverState = void 0);
      return;
    }
    const e = this.renderRoot.querySelector(".card-trend-canvas-area"), t = this.renderRoot.querySelector(".card-trend-canvas-line");
    if (!e || !t) {
      this._linePointsBySlot = {}, this._hoverState && (this._hoverState = void 0);
      return;
    }
    const r = this.prepareTrendCanvas(e), n = this.prepareTrendCanvas(t);
    if (!r || !n) {
      this._linePointsBySlot = {}, this._hoverState && (this._hoverState = void 0);
      return;
    }
    const o = ((l = this._config) == null ? void 0 : l.fill_area_enabled) !== !1, i = this.trendWindowMs(this._config), s = {};
    [...this._drawConfigs].sort((c, d) => d.slot - c.slot).forEach((c) => {
      const d = this.trendPoints(c.slot, c.currentValue);
      if (d.length < 2)
        return;
      const h = this.toTrendCoordinates(d, i);
      if (h.length < 2)
        return;
      const _ = this.toCanvasPoints(h, r.width, r.height), y = this.toCanvasPoints(h, n.width, n.height);
      o && this.drawTrendArea(r.ctx, _, c.color, r.height), this.drawTrendLine(n.ctx, y, c.color, c.lineWidth), s[c.slot] = y;
    }), this._linePointsBySlot = s, this._hoverState && !s[this._hoverState.slot] && (this._hoverState = void 0);
  }
  prepareTrendCanvas(e) {
    const t = e.getContext("2d");
    if (!t)
      return null;
    const r = e.getBoundingClientRect(), n = Math.max(1, Math.round(r.width)), o = Math.max(1, Math.round(r.height)), i = Math.max(1, window.devicePixelRatio || 1), s = Math.max(1, Math.round(n * i)), a = Math.max(1, Math.round(o * i));
    return (e.width !== s || e.height !== a) && (e.width = s, e.height = a), t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height), t.setTransform(i, 0, 0, i, 0, 0), { ctx: t, width: n, height: o };
  }
  drawTrendArea(e, t, r, n) {
    if (t.length < 2)
      return;
    const o = this.resolveCanvasColor(r), i = t[0], s = t[t.length - 1], a = Math.min(...t.map((c) => c.y)), l = e.createLinearGradient(0, a, 0, n);
    l.addColorStop(0, this.withAlpha(o, 0.24)), l.addColorStop(1, this.withAlpha(o, 0)), e.beginPath(), e.moveTo(i.x, i.y), t.slice(1).forEach((c) => e.lineTo(c.x, c.y)), e.lineTo(s.x, n), e.lineTo(i.x, n), e.closePath(), e.fillStyle = l, e.fill();
  }
  drawTrendLine(e, t, r, n) {
    if (t.length < 2)
      return;
    const o = this.resolveCanvasColor(r);
    this.strokeTrendPolyline(e, t, o, n);
  }
  clearHoverState() {
    this._hoverState && (this._hoverState = void 0);
  }
  findNearestHoverPoint(e, t) {
    let r = null, n = Number.POSITIVE_INFINITY;
    for (const o of this._drawConfigs) {
      const i = this._linePointsBySlot[o.slot];
      if (!i || i.length < 2)
        continue;
      const s = this.interpolateCanvasPoint(i, e);
      if (!s)
        continue;
      const a = Math.abs(s.y - t);
      a < n && (n = a, r = {
        slot: o.slot,
        x: s.x,
        y: s.y,
        value: s.value,
        color: o.color
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
    for (let o = 1; o < e.length; o += 1) {
      const i = e[o - 1], s = e[o];
      if (t > s.x)
        continue;
      const a = s.x - i.x;
      if (Math.abs(a) <= Se)
        return { x: t, y: s.y, value: s.value };
      const l = (t - i.x) / a;
      return {
        x: t,
        y: i.y + (s.y - i.y) * l,
        value: i.value + (s.value - i.value) * l
      };
    }
    return { x: t, y: n.y, value: n.value };
  }
  strokeTrendPolyline(e, t, r, n) {
    t.length < 2 || (e.beginPath(), e.moveTo(t[0].x, t[0].y), t.slice(1).forEach((o) => e.lineTo(o.x, o.y)), e.strokeStyle = r, e.lineWidth = n, e.lineCap = "round", e.lineJoin = "round", e.stroke());
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
    const o = n.fillStyle, s = (typeof o == "string" ? o.trim() : "").match(/^#([a-f\d]{6})$/i);
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
    super.connectedCallback(), this.maybeRefreshTrendHistory(!0), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Ht), this.updateComplete.then(() => {
      this.updateGraphTopInset(), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw();
    });
  }
  disconnectedCallback() {
    this.clearHoverState(), this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0), super.disconnectedCallback();
  }
  updated(e) {
    var t;
    e.has("_config") ? (this.maybeRefreshTrendHistory(!0), this.clearHoverState()) : e.has("hass") && (this.maybeRefreshTrendHistory(), this.clearHoverState()), ((t = this._config) == null ? void 0 : t.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset(), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw();
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
    const n = t.getBoundingClientRect(), o = r.getBoundingClientRect(), i = Math.max(0, Math.ceil(o.bottom - n.top));
    Math.abs(i - this._graphTopInset) > 0.5 && (this._graphTopInset = i);
  }
  maybeRefreshTrendHistory(e = !1) {
    e && (this._lastTrendRefresh = 0);
    const t = Date.now();
    !e && t - this._lastTrendRefresh < Ht || (this._lastTrendRefresh = t, this.refreshTrendHistory());
  }
  async refreshTrendHistory() {
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function")
      return;
    const e = this._config, t = {}, r = this.trendWindowMs(e), n = this.enabledSlots(e);
    if (n.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      for (const o of n) {
        const i = this.slotEntityId(o, e);
        i && (t[o] = await this.fetchTrendHistory(i, r));
      }
      this._trendSeries = t;
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let r = 1; r <= Dt; r += 1) {
      const n = r;
      this.slotEnabled(n, e) && this.slotEntityId(n, e) && t.push(n);
    }
    return t;
  }
  async fetchTrendHistory(e, t) {
    if (!this.hass.callApi)
      return [];
    const n = `history/period/${new Date(Date.now() - t).toISOString()}?filter_entity_id=${encodeURIComponent(e)}&minimal_response&no_attributes`;
    try {
      const o = await this.hass.callApi("GET", n);
      return this.parseTrendHistory(o, t);
    } catch {
      return [];
    }
  }
  parseTrendHistory(e, t) {
    if (!Array.isArray(e) || e.length === 0)
      return [];
    const r = Array.isArray(e[0]) ? e[0] : e;
    if (!Array.isArray(r))
      return [];
    const n = [];
    for (const i of r) {
      if (!i || typeof i != "object")
        continue;
      const s = i, a = Number(s.state), l = typeof s.last_changed == "string" ? s.last_changed : typeof s.last_updated == "string" ? s.last_updated : "", c = Date.parse(l);
      !Number.isFinite(a) || !Number.isFinite(c) || n.push({ ts: c, value: a });
    }
    const o = Date.now() - t;
    return n.filter((i) => i.ts >= o).sort((i, s) => i.ts - s.ts);
  }
};
W.styles = Re`
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
ae([
  H({ attribute: !1 })
], W.prototype, "hass", 2);
ae([
  A()
], W.prototype, "_config", 2);
ae([
  A()
], W.prototype, "_trendSeries", 2);
ae([
  A()
], W.prototype, "_graphTopInset", 2);
ae([
  A()
], W.prototype, "_hoverState", 2);
W = ae([
  ee("power-schwammerl-graph-card")
], W);
var zn = Object.defineProperty, An = Object.getOwnPropertyDescriptor, ot = (e, t, r, n) => {
  for (var o = n > 1 ? void 0 : n ? An(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (n ? s(t, r, o) : s(o)) || o);
  return n && o && zn(t, r, o), o;
};
const En = 4, Rn = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, Pn = (e) => ({
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
              default_color: Rn[e] ?? "purple"
            }
          }
        }
      ]
    }
  ]
}), kn = [
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
      }
    ]
  },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "hover_enabled", selector: { boolean: {} } },
      { name: "fill_area_enabled", selector: { boolean: {} } },
      { name: "normalize_stack_to_percent", selector: { boolean: {} } },
      { name: "clip_graph_to_labels", selector: { boolean: {} } },
      {
        name: "line_thickness",
        selector: { number: { mode: "box", min: 0.5, max: 6, step: 0.1 } }
      }
    ]
  },
  ...Array.from({ length: En }, (e, t) => Pn(t + 1)),
  {
    type: "grid",
    name: "",
    schema: [
      { name: "unit", selector: { text: {} } },
      { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } }
    ]
  }
], In = {
  legend_layout: "Label layout",
  timeframe_hours: "Time range",
  hover_enabled: "Enable hover",
  fill_area_enabled: "Enable area fill",
  normalize_stack_to_percent: "Normalize stack to 100%",
  clip_graph_to_labels: "Clip graph below labels",
  line_thickness: "Line thickness",
  unit: "Unit override",
  decimals: "Decimals"
};
let Ae = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = e.name ?? "", r = t.match(/^entity_(\d+)_(enabled|show_icon|icon|icon_color|trend_color)$/);
      if (r) {
        const [, o, i] = r;
        return `Entity ${o} ${{
          enabled: "Enabled",
          show_icon: "Show icon",
          icon: "Icon",
          icon_color: "Icon color",
          trend_color: "Graph color"
        }[i] ?? i}`;
      }
      const n = t.match(/^entity_(\d+)$/);
      return n ? `Entity ${n[1]}` : In[t] ?? t;
    }, this.valueChanged = (e) => {
      const t = {
        ...e.detail.value,
        type: "custom:power-schwammerl-graph-stack-card"
      };
      this._config = t, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: t },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(e) {
    const t = {
      ...e,
      type: "custom:power-schwammerl-graph-stack-card",
      legend_layout: e.legend_layout === "column" ? "column" : "row",
      timeframe_hours: this.normalizeTimeframeHours(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      normalize_stack_to_percent: e.normalize_stack_to_percent ?? !1,
      line_thickness: typeof e.line_thickness == "number" && Number.isFinite(e.line_thickness) ? Math.max(0.5, Math.min(6, e.line_thickness)) : 1.5,
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      entity_1: this.readString(e.entity_1) ?? this.readString(e.entity),
      entity_1_enabled: e.entity_1_enabled ?? !0,
      entity_1_show_icon: e.entity_1_show_icon ?? !0,
      entity_1_icon: e.entity_1_icon ?? e.icon,
      entity_1_icon_color: e.entity_1_icon_color ?? e.icon_color,
      entity_1_trend_color: e.entity_1_trend_color ?? e.trend_color,
      entity_2: this.readString(e.entity_2),
      entity_2_enabled: e.entity_2_enabled ?? !1,
      entity_2_show_icon: e.entity_2_show_icon ?? !0,
      entity_2_icon: e.entity_2_icon,
      entity_3: this.readString(e.entity_3),
      entity_3_enabled: e.entity_3_enabled ?? !1,
      entity_3_show_icon: e.entity_3_show_icon ?? !0,
      entity_3_icon: e.entity_3_icon,
      entity_4: this.readString(e.entity_4),
      entity_4_enabled: e.entity_4_enabled ?? !1,
      entity_4_show_icon: e.entity_4_show_icon ?? !0,
      entity_4_icon: e.entity_4_icon
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? S : x`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${kn}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
  readString(e) {
    if (typeof e != "string")
      return;
    const t = e.trim();
    return t.length > 0 ? t : void 0;
  }
  normalizeTimeframeHours(e) {
    const t = typeof e == "number" ? e : typeof e == "string" ? Number.parseInt(e, 10) : NaN;
    return t === 6 || t === 12 || t === 24 ? t : 24;
  }
};
ot([
  H({ attribute: !1 })
], Ae.prototype, "hass", 2);
ot([
  A()
], Ae.prototype, "_config", 2);
Ae = ot([
  ee("power-schwammerl-graph-stack-card-editor")
], Ae);
var On = Object.defineProperty, Ln = Object.getOwnPropertyDescriptor, le = (e, t, r, n) => {
  for (var o = n > 1 ? void 0 : n ? Ln(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (n ? s(t, r, o) : s(o)) || o);
  return n && o && On(t, r, o), o;
};
const Ke = 1, Ut = 24, jt = 300 * 1e3, Y = 0.01, Je = 4, Nn = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", Gt = {
  red: "244, 67, 54",
  pink: "233, 30, 99",
  purple: "156, 39, 176",
  "deep-purple": "103, 58, 183",
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
};
let q = class extends L {
  constructor() {
    super(...arguments), this._trendSeries = {}, this._graphTopInset = 0, this._drawConfigs = [], this._linePointsBySlot = {}, this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this.handlePointerMove = (e) => {
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
      const n = e.clientX - r.left, o = e.clientY - r.top;
      if (n < 0 || n > r.width || o < 0 || o > r.height) {
        this.clearHoverState();
        return;
      }
      const i = this.findNearestHoverPoint(n, o);
      if (!i) {
        this.clearHoverState();
        return;
      }
      const s = this._hoverState;
      s && s.slot === i.slot && Math.abs(s.x - i.x) <= 0.2 && Math.abs(s.y - i.y) <= 0.2 && Math.abs(s.value - i.value) <= 1e-4 && s.color === i.color || (this._hoverState = i);
    }, this.handlePointerLeave = () => {
      this.clearHoverState();
    };
  }
  static async getConfigElement() {
    return document.createElement("power-schwammerl-graph-stack-card-editor");
  }
  static async getStubConfig(e) {
    const t = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(t), n = (...c) => c.find((d) => d in t), o = (c) => r.find((d) => d.startsWith(`${c}.`)), i = n("sensor.dev_home_power", "sensor.home_power") ?? o("sensor") ?? "sensor.dev_home_power", s = n("sensor.dev_solar_power", "sensor.solar_power"), a = n("sensor.dev_grid_power", "sensor.grid_power"), l = n("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-schwammerl-graph-stack-card",
      legend_layout: "row",
      timeframe_hours: Ut,
      hover_enabled: !0,
      fill_area_enabled: !0,
      normalize_stack_to_percent: !1,
      entity_1: i,
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
      decimals: Ke
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Ke, r = this.readConfigString(e.entity), n = this.readConfigString(e.icon), o = this.readConfigString(e.entity_1) ?? r ?? "sensor.dev_home_power";
    this._config = {
      ...e,
      type: "custom:power-schwammerl-graph-stack-card",
      legend_layout: this.normalizeLegendLayout(e.legend_layout),
      timeframe_hours: this.normalizeTimeframeHours(e.timeframe_hours),
      line_thickness: this.normalizeLineThickness(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      normalize_stack_to_percent: e.normalize_stack_to_percent ?? !1,
      entity_1: o,
      entity_1_enabled: e.entity_1_enabled ?? !0,
      entity_1_show_icon: e.entity_1_show_icon ?? !0,
      entity_1_icon: e.entity_1_icon ?? n ?? "mdi:chart-line",
      entity_1_icon_color: e.entity_1_icon_color ?? e.icon_color,
      entity_1_trend_color: e.entity_1_trend_color ?? e.trend_color,
      entity_2: this.readConfigString(e.entity_2),
      entity_2_enabled: e.entity_2_enabled ?? !1,
      entity_2_show_icon: e.entity_2_show_icon ?? !0,
      entity_2_icon: e.entity_2_icon ?? "mdi:chart-line-variant",
      entity_3: this.readConfigString(e.entity_3),
      entity_3_enabled: e.entity_3_enabled ?? !1,
      entity_3_show_icon: e.entity_3_show_icon ?? !0,
      entity_3_icon: e.entity_3_icon ?? "mdi:chart-bell-curve",
      entity_4: this.readConfigString(e.entity_4),
      entity_4_enabled: e.entity_4_enabled ?? !1,
      entity_4_show_icon: e.entity_4_show_icon ?? !0,
      entity_4_icon: e.entity_4_icon ?? "mdi:chart-timeline-variant",
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
      return x`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return x``;
    const e = this._config, t = e.decimals ?? Ke, r = this.normalizeLineThickness(e.line_thickness), n = e.normalize_stack_to_percent === !0, o = this.collectSeriesEntries(e, t), i = this.withStackedCurrentValues(o, n), s = this.normalizeLegendLayout(e.legend_layout), a = e.hover_enabled !== !1, l = this._hoverState, c = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, d = c > 0 ? { top: `${c}px` } : {}, h = l ? {
      left: `${l.x}px`,
      top: `${l.y + c}px`,
      "--hover-dot-color": l.color
    } : {};
    return this._drawConfigs = o.map((_) => ({
      slot: _.slot,
      currentValue: _.currentValue,
      color: _.trendColor,
      lineWidth: r
    })), x`
      <ha-card>
        <div
          class="container"
          @pointermove=${this.handlePointerMove}
          @pointerleave=${this.handlePointerLeave}
          @pointercancel=${this.handlePointerLeave}
        >
          <div class="card-trend" style=${T(d)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${T(d)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${a && l ? x`<div class="hover-dot" aria-hidden="true" style=${T(h)}></div>` : S}

          <div class="content">
            <div class="series-list layout-${s}">
              ${o.length === 0 ? x`
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
    const r = t === null ? e.secondary : this.formatValue(t, e.unit, e.decimals);
    return x`
      <div class="state-item" data-slot=${String(e.slot)}>
        ${e.showIcon ? x`
              <div class="icon-wrap">
                <div class="icon-shape" style=${T(e.iconStyle)}>
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
              </div>
            ` : S}
        <div class="info">
          <div class="primary">${e.name}</div>
          <div class="secondary">${r}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(e, t) {
    const r = [];
    for (let n = 1; n <= Je; n += 1) {
      const o = n, i = this.slotEnabled(o, e), s = this.slotEntityId(o, e);
      if (!i || !s)
        continue;
      const a = this.entityName(s, n), l = I(this.hass, s), c = e.unit ?? B(this.hass, s) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(o, e), _ = this.iconStyle(this.slotIconColor(o, e)), y = this.resolveColor(this.slotTrendColor(o, e), Nn);
      r.push({
        slot: o,
        entityId: s,
        name: a,
        secondary: d,
        unit: c,
        decimals: t,
        currentValue: l,
        icon: h,
        showIcon: this.slotShowIcon(o, e),
        iconStyle: _,
        trendColor: y
      });
    }
    return r;
  }
  withStackedCurrentValues(e, t) {
    const r = e.reduce((s, a) => s + (a.currentValue ?? 0), 0), n = Number.isFinite(r) && Math.abs(r) > Y;
    let o = 0, i = !1;
    return e.map((s) => {
      s.currentValue !== null && Number.isFinite(s.currentValue) && (o += s.currentValue, i = !0);
      const a = i ? t ? n ? o / r * 100 : 0 : o : null, l = t ? "%" : s.unit;
      return {
        ...s,
        unit: l,
        secondary: this.formatValue(a, l, s.decimals)
      };
    });
  }
  slotEntityId(e, t) {
    switch (e) {
      case 1:
        return this.readConfigString(t.entity_1);
      case 2:
        return this.readConfigString(t.entity_2);
      case 3:
        return this.readConfigString(t.entity_3);
      case 4:
        return this.readConfigString(t.entity_4);
      default:
        return;
    }
  }
  slotEnabled(e, t) {
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
  }
  slotShowIcon(e, t) {
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
  }
  slotIcon(e, t) {
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
  }
  slotIconColor(e, t) {
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
  }
  slotTrendColor(e, t) {
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
  }
  entityName(e, t) {
    var o;
    const r = this.hass.states[e], n = (o = r == null ? void 0 : r.attributes) == null ? void 0 : o.friendly_name;
    return typeof n == "string" && n.trim().length > 0 ? n.trim() : `Entity ${t}`;
  }
  formatValue(e, t, r) {
    if (e === null)
      return t ? `-- ${t}` : "--";
    const n = `${e.toFixed(r)} ${t}`.trim();
    return n.length > 0 ? n : "--";
  }
  readConfigString(e) {
    if (typeof e != "string")
      return;
    const t = e.trim();
    return t.length > 0 ? t : void 0;
  }
  normalizeLegendLayout(e) {
    return e === "column" ? "column" : "row";
  }
  normalizeTimeframeHours(e) {
    const t = typeof e == "number" ? e : typeof e == "string" ? Number.parseInt(e, 10) : NaN;
    return t === 6 || t === 12 || t === 24 ? t : Ut;
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return typeof e != "number" || !Number.isFinite(e) ? 1.5 : Math.max(0.5, Math.min(6, e));
  }
  iconStyle(e) {
    const t = this.toRgbCss(e);
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
  }
  resolveColor(e, t = "") {
    const r = this.toRgbCss(e);
    if (r)
      return `rgb(${r})`;
    if (typeof e == "string" && e.trim().length > 0) {
      const n = e.trim(), o = n.toLowerCase();
      if (o !== "none" && o !== "default")
        return n;
    }
    return t;
  }
  toRgbCss(e) {
    if (Array.isArray(e) && e.length >= 3) {
      const o = e.slice(0, 3).map((i) => Number(i));
      if (o.every((i) => Number.isFinite(i))) {
        const [i, s, a] = o.map((l) => Math.max(0, Math.min(255, Math.round(l))));
        return `${i}, ${s}, ${a}`;
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
    if (t in Gt)
      return `var(--rgb-${t}, ${Gt[t]})`;
    const r = /^#([a-fA-F0-9]{3})$/, n = /^#([a-fA-F0-9]{6})$/;
    if (r.test(t)) {
      const [, o] = t.match(r) ?? [];
      if (!o)
        return null;
      const i = parseInt(o[0] + o[0], 16), s = parseInt(o[1] + o[1], 16), a = parseInt(o[2] + o[2], 16);
      return `${i}, ${s}, ${a}`;
    }
    if (n.test(t)) {
      const [, o] = t.match(n) ?? [];
      if (!o)
        return null;
      const i = parseInt(o.slice(0, 2), 16), s = parseInt(o.slice(2, 4), 16), a = parseInt(o.slice(4, 6), 16);
      return `${i}, ${s}, ${a}`;
    }
    return null;
  }
  trendPoints(e, t) {
    const r = Date.now(), n = r - this.trendWindowMs(this._config), i = [...(this._trendSeries[e] ?? []).filter((s) => s.ts >= n).sort((s, a) => s.ts - a.ts)];
    return t !== null && Number.isFinite(t) && i.push({ ts: r, value: t }), i;
  }
  toTrendCoordinates(e, t, r) {
    var m, $;
    const o = Date.now() - t, i = 0, s = 100, a = e.map((C) => C.value), l = (r == null ? void 0 : r.min) ?? Math.min(...a), c = (r == null ? void 0 : r.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, _ = Math.max(c - l, Y), y = e.map((C) => {
      const f = Math.max(0, Math.min(100, (C.ts - o) / t * 100)), u = i + f / 100 * (s - i), b = _ <= Y ? 0.5 : (C.value - l) / _, M = h - b * (h - d);
      return { x: u, y: M, value: C.value };
    }), v = ((m = y[0]) == null ? void 0 : m.x) ?? i, p = (($ = y[y.length - 1]) == null ? void 0 : $.x) ?? s, w = Math.max(0, p - v), g = 18;
    if (y.length >= 2 && w < g) {
      const C = s - g, f = Math.max(i, Math.min(C, p - g));
      if (w <= Y) {
        const b = g / (y.length - 1);
        return y.map((M, E) => ({
          ...M,
          x: Math.max(i, Math.min(s, f + b * E))
        }));
      }
      const u = g / w;
      return y.map((b) => ({
        ...b,
        x: Math.max(i, Math.min(s, f + (b.x - v) * u))
      }));
    }
    return y;
  }
  toCanvasPoints(e, t, r) {
    const n = e.map((o) => ({
      x: o.x / 100 * t,
      y: o.y / 100 * r,
      value: o.value
    }));
    return this.downsampleCanvasPoints(n, t);
  }
  downsampleCanvasPoints(e, t) {
    if (e.length <= 3)
      return e;
    const r = Math.max(24, Math.min(e.length, Math.round(t)));
    if (e.length <= r)
      return this.smoothCanvasPoints(e);
    const n = [];
    n.push(e[0]);
    const o = (e.length - 1) / (r - 1);
    for (let i = 1; i < r - 1; i += 1) {
      const s = Math.floor(i * o), a = Math.max(s + 1, Math.floor((i + 1) * o)), l = e.slice(s, Math.min(e.length, a));
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
    return n.push(e[e.length - 1]), this.smoothCanvasPoints(n);
  }
  smoothCanvasPoints(e) {
    if (e.length <= 3)
      return e;
    const t = [e[0]];
    for (let r = 1; r < e.length - 1; r += 1) {
      const n = e[r - 1], o = e[r], i = e[r + 1];
      t.push({
        x: o.x,
        y: (n.y + o.y * 2 + i.y) / 4,
        value: (n.value + o.value * 2 + i.value) / 4
      });
    }
    return t.push(e[e.length - 1]), t;
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
    var _, y;
    if (this._drawConfigs.length === 0) {
      this._linePointsBySlot = {}, this._hoverState && (this._hoverState = void 0);
      return;
    }
    const e = this.renderRoot.querySelector(".card-trend-canvas-area"), t = this.renderRoot.querySelector(".card-trend-canvas-line");
    if (!e || !t) {
      this._linePointsBySlot = {}, this._hoverState && (this._hoverState = void 0);
      return;
    }
    const r = this.prepareTrendCanvas(e), n = this.prepareTrendCanvas(t);
    if (!r || !n) {
      this._linePointsBySlot = {}, this._hoverState && (this._hoverState = void 0);
      return;
    }
    const o = ((_ = this._config) == null ? void 0 : _.fill_area_enabled) !== !1, i = ((y = this._config) == null ? void 0 : y.normalize_stack_to_percent) === !0, s = this.trendWindowMs(this._config), a = {}, l = this.buildStackedTrendSeries(s), c = i ? this.normalizeStackedSeriesToPercent(l) : l, d = i ? { min: 0, max: 100 } : this.computeStackedValueRange(c);
    [...this._drawConfigs].sort((v, p) => p.slot - v.slot).forEach((v) => {
      const p = c[v.slot] ?? [];
      if (p.length < 2)
        return;
      const w = this.toTrendCoordinates(p, s, d);
      if (w.length < 2)
        return;
      const g = this.toCanvasPoints(w, r.width, r.height), m = this.toCanvasPoints(w, n.width, n.height);
      o && this.drawTrendArea(r.ctx, g, v.color, r.height), this.drawTrendLine(n.ctx, m, v.color, v.lineWidth), a[v.slot] = m;
    }), this._linePointsBySlot = a, this._hoverState && !a[this._hoverState.slot] && (this._hoverState = void 0);
  }
  buildStackedTrendSeries(e) {
    const t = {}, r = [...this._drawConfigs].sort((o, i) => o.slot - i.slot);
    let n = null;
    return r.forEach((o) => {
      const i = this.trendPoints(o.slot, o.currentValue);
      if (i.length === 0)
        return;
      const s = this.normalizeTrendSeries(i, e);
      if (s.length === 0)
        return;
      const a = n ? this.sumTrendSeries(n, s) : s;
      t[o.slot] = a, n = a;
    }), t;
  }
  normalizeTrendSeries(e, t) {
    const r = Date.now() - t, n = [...e].filter((i) => Number.isFinite(i.ts) && Number.isFinite(i.value) && i.ts >= r).sort((i, s) => i.ts - s.ts);
    if (n.length === 0)
      return [];
    const o = [];
    return n.forEach((i) => {
      const s = o[o.length - 1];
      s && Math.abs(s.ts - i.ts) <= 0.5 ? o[o.length - 1] = i : o.push(i);
    }), o;
  }
  sumTrendSeries(e, t) {
    return e.length === 0 ? [...t] : t.length === 0 ? [...e] : this.mergeTimestamps(e, t).map((n) => ({
      ts: n,
      value: this.interpolateTrendValue(e, n) + this.interpolateTrendValue(t, n)
    }));
  }
  mergeTimestamps(e, t) {
    const r = [];
    let n = 0, o = 0;
    const i = (s) => {
      const a = r[r.length - 1];
      (a === void 0 || Math.abs(a - s) > 0.5) && r.push(s);
    };
    for (; n < e.length || o < t.length; ) {
      const s = n < e.length ? e[n].ts : Number.POSITIVE_INFINITY, a = o < t.length ? t[o].ts : Number.POSITIVE_INFINITY;
      s <= a ? (i(s), n += 1, Math.abs(s - a) <= 0.5 && (o += 1)) : (i(a), o += 1);
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
    let n = 0, o = e.length - 1;
    for (; n <= o; ) {
      const d = Math.floor((n + o) / 2), h = e[d];
      if (Math.abs(h.ts - t) <= 0.5)
        return h.value;
      h.ts < t ? n = d + 1 : o = d - 1;
    }
    const i = Math.max(1, Math.min(e.length - 1, n)), s = e[i - 1], a = e[i], l = a.ts - s.ts;
    if (Math.abs(l) <= Y)
      return a.value;
    const c = (t - s.ts) / l;
    return s.value + (a.value - s.value) * c;
  }
  computeStackedValueRange(e) {
    const t = [];
    if (Object.values(e).forEach((o) => {
      o.forEach((i) => t.push(i.value));
    }), t.length === 0)
      return null;
    const r = Math.min(...t), n = Math.max(...t);
    return !Number.isFinite(r) || !Number.isFinite(n) ? null : { min: r, max: n };
  }
  normalizeStackedSeriesToPercent(e) {
    const t = {}, r = Object.keys(e).map((i) => Number(i)).filter((i) => Number.isFinite(i) && i >= 1 && i <= Je).sort((i, s) => i - s);
    if (r.length === 0)
      return t;
    const n = r[r.length - 1], o = e[n] ?? [];
    return o.length < 1 || r.forEach((i) => {
      const s = e[i] ?? [];
      s.length !== 0 && (t[i] = s.map((a) => {
        const l = this.interpolateTrendValue(o, a.ts);
        if (!Number.isFinite(l) || Math.abs(l) <= Y)
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
    const r = e.getBoundingClientRect(), n = Math.max(1, Math.round(r.width)), o = Math.max(1, Math.round(r.height)), i = Math.max(1, window.devicePixelRatio || 1), s = Math.max(1, Math.round(n * i)), a = Math.max(1, Math.round(o * i));
    return (e.width !== s || e.height !== a) && (e.width = s, e.height = a), t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height), t.setTransform(i, 0, 0, i, 0, 0), { ctx: t, width: n, height: o };
  }
  drawTrendArea(e, t, r, n) {
    if (t.length < 2)
      return;
    const o = this.resolveCanvasColor(r), i = t[0], s = t[t.length - 1], a = Math.min(...t.map((c) => c.y)), l = e.createLinearGradient(0, a, 0, n);
    l.addColorStop(0, this.withAlpha(o, 0.24)), l.addColorStop(1, this.withAlpha(o, 0)), e.beginPath(), e.moveTo(i.x, i.y), t.slice(1).forEach((c) => e.lineTo(c.x, c.y)), e.lineTo(s.x, n), e.lineTo(i.x, n), e.closePath(), e.fillStyle = l, e.fill();
  }
  drawTrendLine(e, t, r, n) {
    if (t.length < 2)
      return;
    const o = this.resolveCanvasColor(r);
    this.strokeTrendPolyline(e, t, o, n);
  }
  clearHoverState() {
    this._hoverState && (this._hoverState = void 0);
  }
  findNearestHoverPoint(e, t) {
    let r = null, n = Number.POSITIVE_INFINITY;
    for (const o of this._drawConfigs) {
      const i = this._linePointsBySlot[o.slot];
      if (!i || i.length < 2)
        continue;
      const s = this.interpolateCanvasPoint(i, e);
      if (!s)
        continue;
      const a = Math.abs(s.y - t);
      a < n && (n = a, r = {
        slot: o.slot,
        x: s.x,
        y: s.y,
        value: s.value,
        color: o.color
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
    for (let o = 1; o < e.length; o += 1) {
      const i = e[o - 1], s = e[o];
      if (t > s.x)
        continue;
      const a = s.x - i.x;
      if (Math.abs(a) <= Y)
        return { x: t, y: s.y, value: s.value };
      const l = (t - i.x) / a;
      return {
        x: t,
        y: i.y + (s.y - i.y) * l,
        value: i.value + (s.value - i.value) * l
      };
    }
    return { x: t, y: n.y, value: n.value };
  }
  strokeTrendPolyline(e, t, r, n) {
    t.length < 2 || (e.beginPath(), e.moveTo(t[0].x, t[0].y), t.slice(1).forEach((o) => e.lineTo(o.x, o.y)), e.strokeStyle = r, e.lineWidth = n, e.lineCap = "round", e.lineJoin = "round", e.stroke());
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
    const o = n.fillStyle, s = (typeof o == "string" ? o.trim() : "").match(/^#([a-f\d]{6})$/i);
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
    super.connectedCallback(), this.maybeRefreshTrendHistory(!0), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, jt), this.updateComplete.then(() => {
      this.updateGraphTopInset(), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw();
    });
  }
  disconnectedCallback() {
    this.clearHoverState(), this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0), super.disconnectedCallback();
  }
  updated(e) {
    var t;
    e.has("_config") ? (this.maybeRefreshTrendHistory(!0), this.clearHoverState()) : e.has("hass") && (this.maybeRefreshTrendHistory(), this.clearHoverState()), ((t = this._config) == null ? void 0 : t.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset(), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw();
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
    const n = t.getBoundingClientRect(), o = r.getBoundingClientRect(), i = Math.max(0, Math.ceil(o.bottom - n.top));
    Math.abs(i - this._graphTopInset) > 0.5 && (this._graphTopInset = i);
  }
  maybeRefreshTrendHistory(e = !1) {
    e && (this._lastTrendRefresh = 0);
    const t = Date.now();
    !e && t - this._lastTrendRefresh < jt || (this._lastTrendRefresh = t, this.refreshTrendHistory());
  }
  async refreshTrendHistory() {
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function")
      return;
    const e = this._config, t = {}, r = this.trendWindowMs(e), n = this.enabledSlots(e);
    if (n.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      for (const o of n) {
        const i = this.slotEntityId(o, e);
        i && (t[o] = await this.fetchTrendHistory(i, r));
      }
      this._trendSeries = t;
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let r = 1; r <= Je; r += 1) {
      const n = r;
      this.slotEnabled(n, e) && this.slotEntityId(n, e) && t.push(n);
    }
    return t;
  }
  async fetchTrendHistory(e, t) {
    if (!this.hass.callApi)
      return [];
    const n = `history/period/${new Date(Date.now() - t).toISOString()}?filter_entity_id=${encodeURIComponent(e)}&minimal_response&no_attributes`;
    try {
      const o = await this.hass.callApi("GET", n);
      return this.parseTrendHistory(o, t);
    } catch {
      return [];
    }
  }
  parseTrendHistory(e, t) {
    if (!Array.isArray(e) || e.length === 0)
      return [];
    const r = Array.isArray(e[0]) ? e[0] : e;
    if (!Array.isArray(r))
      return [];
    const n = [];
    for (const i of r) {
      if (!i || typeof i != "object")
        continue;
      const s = i, a = Number(s.state), l = typeof s.last_changed == "string" ? s.last_changed : typeof s.last_updated == "string" ? s.last_updated : "", c = Date.parse(l);
      !Number.isFinite(a) || !Number.isFinite(c) || n.push({ ts: c, value: a });
    }
    const o = Date.now() - t;
    return n.filter((i) => i.ts >= o).sort((i, s) => i.ts - s.ts);
  }
};
q.styles = Re`
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
le([
  H({ attribute: !1 })
], q.prototype, "hass", 2);
le([
  A()
], q.prototype, "_config", 2);
le([
  A()
], q.prototype, "_trendSeries", 2);
le([
  A()
], q.prototype, "_graphTopInset", 2);
le([
  A()
], q.prototype, "_hoverState", 2);
q = le([
  ee("power-schwammerl-graph-stack-card")
], q);
var Bn = Object.defineProperty, Hn = Object.getOwnPropertyDescriptor, it = (e, t, r, n) => {
  for (var o = n > 1 ? void 0 : n ? Hn(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (n ? s(t, r, o) : s(o)) || o);
  return n && o && Bn(t, r, o), o;
};
const Dn = [
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
  { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } }
], Fn = {
  name: "Name",
  icon: "Icon",
  icon_color: "Icon color",
  power_entity: "Power entity",
  status_entity: "Status entity",
  mode_entity: "Mode entity",
  command_entity: "Command entity",
  decimals: "Decimals"
};
let Ee = class extends L {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = e.name ?? "";
      return Fn[t] ?? t;
    }, this.valueChanged = (e) => {
      const t = {
        ...e.detail.value,
        type: "custom:power-schwammerl-wallbox-card"
      };
      this._config = t, this.dispatchEvent(
        new CustomEvent("config-changed", {
          detail: { config: t },
          bubbles: !0,
          composed: !0
        })
      );
    };
  }
  setConfig(e) {
    this._config = {
      ...e,
      type: "custom:power-schwammerl-wallbox-card"
    };
  }
  render() {
    return !this.hass || !this._config ? S : x`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Dn}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
it([
  H({ attribute: !1 })
], Ee.prototype, "hass", 2);
it([
  A()
], Ee.prototype, "_config", 2);
Ee = it([
  ee("power-schwammerl-wallbox-card-editor")
], Ee);
var Un = Object.defineProperty, be = (e, t, r, n) => {
  for (var o = void 0, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = s(t, r, o) || o);
  return o && Un(t, r, o), o;
};
const jn = 0.01, Vt = {
  red: "244, 67, 54",
  pink: "233, 30, 99",
  purple: "156, 39, 176",
  "deep-purple": "103, 58, 183",
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
}, st = class st extends L {
  constructor() {
    super(...arguments), this._actionBusy = !1, this._modeMenuOpen = !1, this.handleGlobalPointerDown = (t) => {
      if (!this._modeMenuOpen)
        return;
      t.composedPath().includes(this) || (this._modeMenuOpen = !1);
    }, this.handleGlobalKeyDown = (t) => {
      t.key === "Escape" && this._modeMenuOpen && (this._modeMenuOpen = !1);
    }, this.toggleModeMenu = (t) => {
      var i;
      if (t.stopPropagation(), !((i = this._config) != null && i.mode_entity) || this._actionBusy)
        return;
      const r = oe(this.hass, this._config.mode_entity), n = (r == null ? void 0 : r.state) ?? "";
      this.getModeOptions(r, this._config.mode_options, n).length !== 0 && (this._modeMenuOpen = !this._modeMenuOpen);
    }, this.handleModeOptionClick = async (t) => {
      var n;
      t.stopPropagation();
      const r = ((n = t.currentTarget) == null ? void 0 : n.dataset.option) ?? "";
      r && (this._modeMenuOpen = !1, await this.selectModeOption(r));
    }, this.selectModeOption = async (t) => {
      var o;
      if (!((o = this._config) != null && o.mode_entity))
        return;
      const r = oe(this.hass, this._config.mode_entity);
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
      if (!this._config || this._actionBusy)
        return;
      t.stopPropagation(), this._modeMenuOpen = !1;
      const r = I(this.hass, this._config.power_entity), n = qe(this.hass, this._config.status_entity), o = this.isCharging(n, r, this._config.command_entity), i = this.resolveActionCommand(o);
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
    return document.createElement("power-schwammerl-wallbox-card-editor");
  }
  static async getStubConfig(t) {
    const r = (t == null ? void 0 : t.states) ?? {}, n = Object.keys(r), o = (...c) => c.find((d) => d in r), i = (c) => n.find((d) => d.startsWith(`${c}.`)), s = o("sensor.dev_wallbox_power", "sensor.wallbox_power") ?? i("sensor") ?? "sensor.dev_wallbox_power", a = o("input_select.dev_wallbox_mode", "select.wallbox_charging_mode") ?? i("input_select") ?? i("select"), l = o("input_boolean.dev_wallbox_enabled", "switch.wallbox_charging_enabled") ?? i("input_boolean") ?? i("switch");
    return {
      type: "custom:power-schwammerl-wallbox-card",
      name: "Wallbox",
      power_entity: s,
      status_entity: o("sensor.dev_wallbox_status", "sensor.wallbox_status"),
      mode_entity: a,
      mode_options: ["Eco", "Fast", "Solar"],
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
      return x`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return x``;
    const t = this._config, r = I(this.hass, t.power_entity), n = B(this.hass, t.power_entity) ?? "kW", o = qe(this.hass, t.status_entity), i = oe(this.hass, t.mode_entity), s = (i == null ? void 0 : i.state) ?? "", a = this.getModeOptions(i, t.mode_options, s), l = this.isCharging(o, r, t.command_entity), c = this.resolveActionCommand(l), d = l ? "Stop" : "Start", h = l ? "mdi:pause" : "mdi:play", _ = this.statusLabel(o, l), y = this.formatPower(r, n, t.decimals ?? 1), v = this.showModeSelector(t, a), p = this._actionBusy || !t.mode_entity || a.length === 0, w = s || a[0] || "Mode", g = this._modeMenuOpen && !p && a.length > 0, m = g ? "mdi:chevron-up" : "mdi:chevron-down", $ = this.iconStyle(t.icon_color), C = v ? "actions" : "actions no-mode";
    return x`
      <ha-card>
        <div class="container">
          <div class="state-item">
            <div class="icon-wrap">
              <div class="icon-shape" style=${T($)}>
                <ha-icon .icon=${t.icon ?? "mdi:ev-station"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${t.name}</div>
              <div class="secondary">EV charger</div>
            </div>
          </div>

          <div class=${C}>
            ${v ? x`
                  <div class="mode-select-wrap">
                    <button
                      type="button"
                      class="mode-select"
                      ?disabled=${p}
                      @click=${this.toggleModeMenu}
                      aria-haspopup="listbox"
                      aria-expanded=${g ? "true" : "false"}
                      title="Charging mode"
                    >
                      <span class="mode-select-label">${w}</span>
                      <ha-icon class="mode-select-chevron" .icon=${m}></ha-icon>
                    </button>
                    ${g ? x`
                          <div class="mode-menu" role="listbox">
                            ${a.map(
      (f) => x`
                                <button
                                  type="button"
                                  class="mode-option ${f === w ? "selected" : ""}"
                                  data-option=${f}
                                  role="option"
                                  aria-selected=${f === w ? "true" : "false"}
                                  @click=${this.handleModeOptionClick}
                                >
                                  ${f}
                                </button>
                              `
    )}
                          </div>
                        ` : x``}
                  </div>
                ` : x``}

            <div class="live-value">
              <span>${_}</span>
              <span class="dot">•</span>
              <span>${y}</span>
            </div>

            <button
              type="button"
              class="action-button"
              ?disabled=${this._actionBusy || !c}
              @click=${this.handleActionClick}
              title=${d}
              aria-label=${d}
            >
              <ha-icon .icon=${h}></ha-icon>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }
  getModeOptions(t, r, n) {
    const o = Array.isArray(r) ? r.filter((s) => typeof s == "string" && s.trim().length > 0) : [];
    if (o.length > 0)
      return Array.from(new Set(o));
    const i = t == null ? void 0 : t.attributes.options;
    if (Array.isArray(i)) {
      const s = i.filter(
        (a) => typeof a == "string" && a.trim().length > 0
      );
      if (s.length > 0)
        return Array.from(new Set(s));
    }
    return typeof n == "string" && n.trim().length > 0 ? [n] : [];
  }
  showModeSelector(t, r) {
    var n;
    return Array.isArray(r) ? !!t.mode_entity || r.length > 0 : !!t.mode_entity || (((n = t.mode_options) == null ? void 0 : n.length) ?? 0) > 0;
  }
  statusLabel(t, r) {
    return t ? t.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (n) => n.toUpperCase()) : r ? "Charging" : "Idle";
  }
  formatPower(t, r, n) {
    return t === null ? `-- ${r}` : `${Math.abs(t).toFixed(n)} ${r}`;
  }
  isCharging(t, r, n) {
    var o;
    if (t) {
      const i = t.toLowerCase();
      if (["charging", "active", "running", "on", "start", "started"].includes(i))
        return !0;
      if (["idle", "paused", "stopped", "off", "standby", "complete"].includes(i))
        return !1;
    }
    if (n) {
      const i = (o = qe(this.hass, n)) == null ? void 0 : o.toLowerCase();
      if (i === "on")
        return !0;
      if (i === "off")
        return !1;
    }
    return r !== null && r > jn;
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
      const o = this.objectValue(t ? r.stop_service_data : r.start_service_data);
      return r.command_entity && o.entity_id === void 0 && (o.entity_id = r.command_entity), { ...n, data: o };
    }
    return r.command_entity ? {
      domain: this.entityDomain(r.command_entity),
      service: t ? "turn_off" : "turn_on",
      data: { entity_id: r.command_entity }
    } : null;
  }
  iconStyle(t) {
    const r = this.toRgbCss(t);
    if (r)
      return {
        "--icon-color": `rgb(${r})`,
        "--shape-color": `rgba(${r}, 0.2)`
      };
    if (typeof t == "string" && t.trim().length > 0 && t !== "none") {
      const n = t.trim();
      return {
        "--icon-color": n,
        "--shape-color": `color-mix(in srgb, ${n} 20%, transparent)`
      };
    }
    return {};
  }
  toRgbCss(t) {
    if (Array.isArray(t) && t.length >= 3) {
      const s = t.slice(0, 3).map((a) => Number(a));
      if (s.every((a) => Number.isFinite(a))) {
        const [a, l, c] = s.map((d) => Math.max(0, Math.min(255, Math.round(d))));
        return `${a}, ${l}, ${c}`;
      }
      return null;
    }
    if (typeof t != "string")
      return null;
    const r = t.trim().toLowerCase();
    if (r === "none")
      return null;
    if (r.startsWith("var(--rgb-"))
      return r;
    if (r === "state")
      return "var(--rgb-state-entity, var(--rgb-primary-color, 3, 169, 244))";
    if (r === "primary")
      return "var(--rgb-primary-color, 3, 169, 244)";
    if (r === "accent")
      return "var(--rgb-accent-color, 255, 152, 0)";
    if (r in Vt)
      return `var(--rgb-${r}, ${Vt[r]})`;
    const n = r, o = /^#([a-fA-F0-9]{3})$/, i = /^#([a-fA-F0-9]{6})$/;
    if (o.test(n)) {
      const [, s] = n.match(o) ?? [];
      if (!s)
        return null;
      const a = parseInt(s[0] + s[0], 16), l = parseInt(s[1] + s[1], 16), c = parseInt(s[2] + s[2], 16);
      return `${a}, ${l}, ${c}`;
    }
    if (i.test(n)) {
      const [, s] = n.match(i) ?? [];
      if (!s)
        return null;
      const a = parseInt(s.slice(0, 2), 16), l = parseInt(s.slice(2, 4), 16), c = parseInt(s.slice(4, 6), 16);
      return `${a}, ${l}, ${c}`;
    }
    return null;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("pointerdown", this.handleGlobalPointerDown, !0), window.addEventListener("keydown", this.handleGlobalKeyDown, !0);
  }
  disconnectedCallback() {
    window.removeEventListener("pointerdown", this.handleGlobalPointerDown, !0), window.removeEventListener("keydown", this.handleGlobalKeyDown, !0), super.disconnectedCallback();
  }
};
st.styles = Re`
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
      overflow: hidden;
    }

    .container {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      justify-content: space-between;
      height: 100%;
      min-height: 0;
    }

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

    .actions {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto auto;
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

    .mode-menu {
      position: absolute;
      top: calc(100% + 6px);
      left: 0;
      right: 0;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 6px;
      border-radius: var(--control-border-radius);
      box-sizing: border-box;
      background: var(--ha-card-background, var(--card-background-color, white));
      border: var(--ha-card-border-width, 1px) solid
        var(--ha-card-border-color, var(--divider-color, rgba(0, 0, 0, 0.12)));
      box-shadow: var(--ha-card-box-shadow, 0 6px 16px rgba(0, 0, 0, 0.18));
    }

    .mode-option {
      cursor: pointer;
      border: none;
      border-radius: calc(var(--control-border-radius) - 2px);
      margin: 0;
      padding: 0 10px;
      height: 34px;
      width: 100%;
      text-align: left;
      box-sizing: border-box;
      background: transparent;
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, inherit);
      font-size: var(--card-primary-font-size);
      font-weight: var(--card-primary-font-weight);
      line-height: var(--card-primary-line-height);
      letter-spacing: var(--card-primary-letter-spacing);
    }

    .mode-option:hover {
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
    }

    .mode-option.selected {
      background-color: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.12);
    }

    .live-value {
      grid-column: 2;
      display: flex;
      align-items: center;
      justify-content: center;
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

    @container (max-width: 420px) {
      .actions {
        grid-template-columns: minmax(0, 1fr) auto;
      }

      .mode-select-wrap {
        grid-column: 1 / -1;
        grid-row: 1;
      }

      .live-value {
        grid-column: 1;
        grid-row: 2;
        justify-content: flex-start;
      }

      .action-button {
        grid-column: 2;
        grid-row: 2;
      }

      .actions.no-mode .live-value {
        grid-row: 1;
      }

      .actions.no-mode .action-button {
        grid-row: 1;
      }
    }
  `;
let U = st;
be([
  H({ attribute: !1 })
], U.prototype, "hass");
be([
  H({ reflect: !0, type: String })
], U.prototype, "layout");
be([
  A()
], U.prototype, "_config");
be([
  A()
], U.prototype, "_actionBusy");
be([
  A()
], U.prototype, "_modeMenuOpen");
class Gn extends U {
}
customElements.get("power-schwammerl-wallbox-card") || customElements.define("power-schwammerl-wallbox-card", U);
customElements.get("power-schwammerl-wallbox-card-v2") || customElements.define("power-schwammerl-wallbox-card-v2", Gn);
const Vn = "0.1.0";
window.customCards = window.customCards || [];
const Wn = [
  {
    type: "power-schwammerl-energy-card",
    name: "PowerSchwammerl Energy Card",
    description: "Mushroom-inspired card for live home energy metrics.",
    preview: !0
  },
  {
    type: "power-schwammerl-wallbox-card",
    name: "PowerSchwammerl Wallbox Card",
    description: "Mushroom-inspired card focused on EV wallbox telemetry.",
    preview: !0
  },
  {
    type: "power-schwammerl-graph-card",
    name: "PowerSchwammerl Graph Card",
    description: "Mushroom-style trend card with full-card historical graph.",
    preview: !0
  },
  {
    type: "power-schwammerl-graph-stack-card",
    name: "PowerSchwammerl Graph Stack Card",
    description: "Mushroom-style cumulative stacked trend card for up to four entities.",
    preview: !0
  }
];
for (const e of Wn)
  window.customCards.some((t) => t.type === e.type) || window.customCards.push(e);
console.info(
  `%cPOWER SCHWAMMERL%c v${Vn}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
//# sourceMappingURL=power-schwammerl.js.map
