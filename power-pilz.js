/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Me = globalThis, nt = Me.ShadowRoot && (Me.ShadyCSS === void 0 || Me.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ot = Symbol(), Ot = /* @__PURE__ */ new WeakMap();
let ir = class {
  constructor(t, r, n) {
    if (this._$cssResult$ = !0, n !== ot) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (nt && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = Ot.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Ot.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const an = (e) => new ir(typeof e == "string" ? e : e + "", void 0, ot), Oe = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, o, i) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[i + 1], e[0]);
  return new ir(r, e, ot);
}, ln = (e, t) => {
  if (nt) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), o = Me.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = r.cssText, e.appendChild(n);
  }
}, It = nt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return an(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: cn, defineProperty: dn, getOwnPropertyDescriptor: hn, getOwnPropertyNames: un, getOwnPropertySymbols: _n, getPrototypeOf: mn } = Object, Y = globalThis, Bt = Y.trustedTypes, pn = Bt ? Bt.emptyScript : "", Xe = Y.reactiveElementPolyfillSupport, _e = (e, t) => e, Re = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? pn : null;
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
} }, it = (e, t) => !cn(e, t), Nt = { attribute: !0, type: String, converter: Re, reflect: !1, useDefault: !1, hasChanged: it };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Y.litPropertyMetadata ?? (Y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let ce = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Nt) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, r);
      o !== void 0 && dn(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: o, set: i } = hn(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(_e("elementProperties"))) return;
    const t = mn(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(_e("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_e("properties"))) {
      const r = this.properties, n = [...un(r), ..._n(r)];
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
      for (const o of n) r.unshift(It(o));
    } else t !== void 0 && r.push(It(t));
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
    return ln(t, this.constructor.elementStyles), t;
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
      const s = (((i = n.converter) == null ? void 0 : i.toAttribute) !== void 0 ? n.converter : Re).toAttribute(r, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var i, s;
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const a = n.getPropertyOptions(o), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((i = a.converter) == null ? void 0 : i.fromAttribute) !== void 0 ? a.converter : Re;
      this._$Em = o;
      const c = l.fromAttribute(r, a.type);
      this[o] = c ?? ((s = this._$Ej) == null ? void 0 : s.get(o)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, r, n, o = !1, i) {
    var s;
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (i = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? it)(i, r) || n.useDefault && n.reflect && i === ((s = this._$Ej) == null ? void 0 : s.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
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
ce.elementStyles = [], ce.shadowRootOptions = { mode: "open" }, ce[_e("elementProperties")] = /* @__PURE__ */ new Map(), ce[_e("finalized")] = /* @__PURE__ */ new Map(), Xe == null || Xe({ ReactiveElement: ce }), (Y.reactiveElementVersions ?? (Y.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const me = globalThis, Ht = (e) => e, Ee = me.trustedTypes, Dt = Ee ? Ee.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, sr = "$lit$", X = `lit$${Math.random().toFixed(9).slice(2)}$`, ar = "?" + X, yn = `<${ar}>`, ne = document, pe = () => ne.createComment(""), ye = (e) => e === null || typeof e != "object" && typeof e != "function", st = Array.isArray, vn = (e) => st(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Ye = `[ 	
\f\r]`, ue = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ft = /-->/g, Ut = />/g, Q = RegExp(`>|${Ye}(?:([^\\s"'>=/]+)(${Ye}*=${Ye}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), jt = /'/g, Vt = /"/g, lr = /^(?:script|style|textarea|title)$/i, fn = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), g = fn(1), oe = Symbol.for("lit-noChange"), C = Symbol.for("lit-nothing"), Gt = /* @__PURE__ */ new WeakMap(), te = ne.createTreeWalker(ne, 129);
function cr(e, t) {
  if (!st(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Dt !== void 0 ? Dt.createHTML(t) : t;
}
const bn = (e, t) => {
  const r = e.length - 1, n = [];
  let o, i = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = ue;
  for (let a = 0; a < r; a++) {
    const l = e[a];
    let c, d, h = -1, _ = 0;
    for (; _ < l.length && (s.lastIndex = _, d = s.exec(l), d !== null); ) _ = s.lastIndex, s === ue ? d[1] === "!--" ? s = Ft : d[1] !== void 0 ? s = Ut : d[2] !== void 0 ? (lr.test(d[2]) && (o = RegExp("</" + d[2], "g")), s = Q) : d[3] !== void 0 && (s = Q) : s === Q ? d[0] === ">" ? (s = o ?? ue, h = -1) : d[1] === void 0 ? h = -2 : (h = s.lastIndex - d[2].length, c = d[1], s = d[3] === void 0 ? Q : d[3] === '"' ? Vt : jt) : s === Vt || s === jt ? s = Q : s === Ft || s === Ut ? s = ue : (s = Q, o = void 0);
    const p = s === Q && e[a + 1].startsWith("/>") ? " " : "";
    i += s === ue ? l + yn : h >= 0 ? (n.push(c), l.slice(0, h) + sr + l.slice(h) + X + p) : l + X + (h === -2 ? a : p);
  }
  return [cr(e, i + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ve {
  constructor({ strings: t, _$litType$: r }, n) {
    let o;
    this.parts = [];
    let i = 0, s = 0;
    const a = t.length - 1, l = this.parts, [c, d] = bn(t, r);
    if (this.el = ve.createElement(c, n), te.currentNode = this.el.content, r === 2 || r === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = te.nextNode()) !== null && l.length < a; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(sr)) {
          const _ = d[s++], p = o.getAttribute(h).split(X), u = /([.?@])?(.*)/.exec(_);
          l.push({ type: 1, index: i, name: u[2], strings: p, ctor: u[1] === "." ? wn : u[1] === "?" ? xn : u[1] === "@" ? Sn : Ie }), o.removeAttribute(h);
        } else h.startsWith(X) && (l.push({ type: 6, index: i }), o.removeAttribute(h));
        if (lr.test(o.tagName)) {
          const h = o.textContent.split(X), _ = h.length - 1;
          if (_ > 0) {
            o.textContent = Ee ? Ee.emptyScript : "";
            for (let p = 0; p < _; p++) o.append(h[p], pe()), te.nextNode(), l.push({ type: 2, index: ++i });
            o.append(h[_], pe());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ar) l.push({ type: 2, index: i });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(X, h + 1)) !== -1; ) l.push({ type: 7, index: i }), h += X.length - 1;
      }
      i++;
    }
  }
  static createElement(t, r) {
    const n = ne.createElement("template");
    return n.innerHTML = t, n;
  }
}
function he(e, t, r = e, n) {
  var s, a;
  if (t === oe) return t;
  let o = n !== void 0 ? (s = r._$Co) == null ? void 0 : s[n] : r._$Cl;
  const i = ye(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== i && ((a = o == null ? void 0 : o._$AO) == null || a.call(o, !1), i === void 0 ? o = void 0 : (o = new i(e), o._$AT(e, r, n)), n !== void 0 ? (r._$Co ?? (r._$Co = []))[n] = o : r._$Cl = o), o !== void 0 && (t = he(e, o._$AS(e, t.values), o, n)), t;
}
class gn {
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
    const { el: { content: r }, parts: n } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? ne).importNode(r, !0);
    te.currentNode = o;
    let i = te.nextNode(), s = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new fe(i, i.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(i, l.name, l.strings, this, t) : l.type === 6 && (c = new Cn(i, this, t)), this._$AV.push(c), l = n[++a];
      }
      s !== (l == null ? void 0 : l.index) && (i = te.nextNode(), s++);
    }
    return te.currentNode = ne, o;
  }
  p(t) {
    let r = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, r), r += n.strings.length - 2) : n._$AI(t[r])), r++;
  }
}
class fe {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, r, n, o) {
    this.type = 2, this._$AH = C, this._$AN = void 0, this._$AA = t, this._$AB = r, this._$AM = n, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = he(this, t, r), ye(t) ? t === C || t == null || t === "" ? (this._$AH !== C && this._$AR(), this._$AH = C) : t !== this._$AH && t !== oe && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : vn(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== C && ye(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ne.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var i;
    const { values: r, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ve.createElement(cr(n.h, n.h[0]), this.options)), n);
    if (((i = this._$AH) == null ? void 0 : i._$AD) === o) this._$AH.p(r);
    else {
      const s = new gn(o, this), a = s.u(this.options);
      s.p(r), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let r = Gt.get(t.strings);
    return r === void 0 && Gt.set(t.strings, r = new ve(t)), r;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let n, o = 0;
    for (const i of t) o === r.length ? r.push(n = new fe(this.O(pe()), this.O(pe()), this, this.options)) : n = r[o], n._$AI(i), o++;
    o < r.length && (this._$AR(n && n._$AB.nextSibling, o), r.length = o);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, r); t !== this._$AB; ) {
      const o = Ht(t).nextSibling;
      Ht(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 && (this._$Cv = t, (r = this._$AP) == null || r.call(this, t));
  }
}
class Ie {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, n, o, i) {
    this.type = 1, this._$AH = C, this._$AN = void 0, this.element = t, this.name = r, this._$AM = o, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = C;
  }
  _$AI(t, r = this, n, o) {
    const i = this.strings;
    let s = !1;
    if (i === void 0) t = he(this, t, r, 0), s = !ye(t) || t !== this._$AH && t !== oe, s && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = i[0], l = 0; l < i.length - 1; l++) c = he(this, a[n + l], r, l), c === oe && (c = this._$AH[l]), s || (s = !ye(c) || c !== this._$AH[l]), c === C ? t = C : t !== C && (t += (c ?? "") + i[l + 1]), this._$AH[l] = c;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === C ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class wn extends Ie {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === C ? void 0 : t;
  }
}
class xn extends Ie {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== C);
  }
}
class Sn extends Ie {
  constructor(t, r, n, o, i) {
    super(t, r, n, o, i), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = he(this, t, r, 0) ?? C) === oe) return;
    const n = this._$AH, o = t === C && n !== C || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, i = t !== C && (n === C || o);
    o && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Cn {
  constructor(t, r, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    he(this, t);
  }
}
const Ke = me.litHtmlPolyfillSupport;
Ke == null || Ke(ve, fe), (me.litHtmlVersions ?? (me.litHtmlVersions = [])).push("3.3.2");
const $n = (e, t, r) => {
  const n = (r == null ? void 0 : r.renderBefore) ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const i = (r == null ? void 0 : r.renderBefore) ?? null;
    n._$litPart$ = o = new fe(t.insertBefore(pe(), i), i, void 0, r ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = globalThis;
let B = class extends ce {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = $n(r, this.renderRoot, this.renderOptions);
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
    return oe;
  }
};
var or;
B._$litElement$ = !0, B.finalized = !0, (or = re.litElementHydrateSupport) == null || or.call(re, { LitElement: B });
const Je = re.litElementPolyfillSupport;
Je == null || Je({ LitElement: B });
(re.litElementVersions ?? (re.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ie = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const zn = { attribute: !0, type: String, converter: Re, reflect: !1, hasChanged: it }, Tn = (e = zn, t, r) => {
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
function L(e) {
  return (t, r) => typeof r == "object" ? Tn(e, t, r) : ((n, o, i) => {
    const s = o.hasOwnProperty(i);
    return o.constructor.createProperty(i, n), s ? Object.getOwnPropertyDescriptor(o, i) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function P(e) {
  return L({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mn = { ATTRIBUTE: 1 }, Rn = (e) => (...t) => ({ _$litDirective$: e, values: t });
let En = class {
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
const dr = "important", An = " !" + dr, z = Rn(class extends En {
  constructor(e) {
    var t;
    if (super(e), e.type !== Mn.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const i = typeof o == "string" && o.endsWith(An);
        n.includes("-") || i ? r.setProperty(n, i ? o.slice(0, -11) : o, i ? dr : "") : r[n] = o;
      }
    }
    return oe;
  }
}), de = (e, t) => {
  if (t)
    return e.states[t];
}, I = (e, t) => {
  const r = de(e, t);
  if (!r)
    return null;
  const n = Number(r.state);
  return Number.isFinite(n) ? n : null;
}, F = (e, t) => {
  const r = de(e, t);
  if (!r)
    return;
  const n = r.attributes.unit_of_measurement;
  return typeof n == "string" ? n : void 0;
}, Ze = (e, t) => {
  const r = de(e, t);
  return r == null ? void 0 : r.state;
}, Pn = (e, t, r = Date.now()) => {
  if (!Array.isArray(e) || e.length === 0)
    return [];
  const n = Array.isArray(e[0]) ? e[0] : e;
  if (!Array.isArray(n))
    return [];
  const o = [];
  for (const s of n) {
    if (!s || typeof s != "object")
      continue;
    const a = s, l = Number(a.state), c = typeof a.last_changed == "string" ? a.last_changed : typeof a.last_updated == "string" ? a.last_updated : "", d = Date.parse(c);
    !Number.isFinite(l) || !Number.isFinite(d) || o.push({ ts: d, value: l });
  }
  const i = r - t;
  return o.filter((s) => s.ts >= i).sort((s, a) => s.ts - a.ts);
}, at = async (e, t, r) => {
  if (!e.callApi)
    return [];
  const o = `history/period/${new Date(Date.now() - r).toISOString()}?filter_entity_id=${encodeURIComponent(t)}&minimal_response&no_attributes`;
  try {
    const i = await e.callApi("GET", o);
    return Pn(i, r);
  } catch {
    return [];
  }
}, Wt = {
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
}, lt = (e) => {
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
  if (t in Wt)
    return `var(--rgb-${t}, ${Wt[t]})`;
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
}, ct = (e, t = "") => {
  const r = lt(e);
  if (r)
    return `rgb(${r})`;
  if (typeof e == "string" && e.trim().length > 0) {
    const n = e.trim(), o = n.toLowerCase();
    if (o !== "none" && o !== "default")
      return n;
  }
  return t;
}, dt = (e) => {
  const t = lt(e);
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
}, ht = (e, t, r) => {
  const n = e.map((o) => ({
    x: o.x / 100 * t,
    y: o.y / 100 * r,
    value: o.value
  }));
  return kn(n, t);
}, kn = (e, t) => {
  if (e.length <= 3)
    return e;
  const r = Math.max(24, Math.min(e.length, Math.round(t)));
  if (e.length <= r)
    return qt(e);
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
  return n.push(e[e.length - 1]), qt(n);
}, qt = (e) => {
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
}, be = "0.1.9";
var Ln = Object.defineProperty, On = Object.getOwnPropertyDescriptor, ut = (e, t, r, n) => {
  for (var o = n > 1 ? void 0 : n ? On(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (n ? s(t, r, o) : s(o)) || o);
  return n && o && Ln(t, r, o), o;
};
const In = 4, Bn = 8, Xt = 2, Nn = (e, t) => {
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
}, Ce = (e, t, r, n) => ({
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
    schema: Nn(e, i + 1)
  }))
}), Hn = [
  { name: "name", selector: { text: {} } },
  {
    type: "grid",
    name: "",
    schema: [
      { name: "home_visible", selector: { boolean: {} } },
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
  Ce("solar", "Solar sub blocks", "mdi:solar-power-variant", In),
  Ce("grid", "Grid 1 sub blocks", "mdi:transmission-tower", Xt),
  Ce("grid_secondary", "Grid 2 sub blocks", "mdi:transmission-tower", Xt),
  Ce("home", "Home sub blocks", "mdi:flash", Bn),
  {
    type: "grid",
    name: "",
    schema: [
      { name: "unit", selector: { text: {} } },
      { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } }
    ]
  }
], Dn = {
  name: "Name",
  home_visible: "Show home node",
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
let Ae = class extends B {
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
      return Dn[t] ?? t;
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
      type: "custom:power-pilz-energy-card"
    };
  }
  render() {
    return !this.hass || !this._config ? C : g`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${be}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Hn}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
ut([
  L({ attribute: !1 })
], Ae.prototype, "hass", 2);
ut([
  P()
], Ae.prototype, "_config", 2);
Ae = ut([
  ie("power-pilz-energy-card-editor")
], Ae);
var Fn = Object.defineProperty, Un = Object.getOwnPropertyDescriptor, K = (e, t, r, n) => {
  for (var o = n > 1 ? void 0 : n ? Un(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (n ? s(t, r, o) : s(o)) || o);
  return n && o && Fn(t, r, o), o;
};
const D = 0.01, Qe = 1, $e = 1440 * 60 * 1e3, Yt = 300 * 1e3, jn = 4, Vn = 8, Gn = 2, Wn = 12, qn = 7, Xn = 400, Yn = 300, Kn = "var(--rgb-primary-text-color, 33, 33, 33)";
let V = class extends B {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._showSubBlocks = !1, this._subNodeConnectorSegments = [], this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._liveRuntimeActive = !1, this._trendDrawConfig = {}, this.handleCardClick = () => {
      this.executeTapAction();
    }, this.handleCardKeyDown = (e) => {
      e.key !== "Enter" && e.key !== " " || (e.preventDefault(), this.executeTapAction());
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-energy-card-editor");
  }
  static async getStubConfig(e) {
    const t = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(t), n = (...d) => d.find((h) => h in t), o = (d) => r.find((h) => h.startsWith(`${d}.`)), i = n("sensor.dev_home_power", "sensor.house_consumption_power") ?? o("sensor") ?? "sensor.dev_home_power", s = n("sensor.dev_solar_power", "sensor.solar_production_power") ?? o("sensor"), a = n("sensor.dev_grid_power", "sensor.grid_power") ?? o("sensor"), l = n("sensor.dev_battery_power", "sensor.home_battery_power") ?? o("sensor"), c = n("sensor.dev_battery_soc", "sensor.home_battery_soc") ?? o("sensor");
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
      solar_entity: s,
      grid_entity: a,
      battery_entity: l,
      battery_percentage_entity: c,
      decimals: Qe
    };
  }
  setConfig(e) {
    const t = e.home_entity ?? e.consumption_entity ?? "sensor.dev_home_power", r = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : Qe;
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
      return g`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return g``;
    const e = this._config, t = e.decimals ?? Qe, r = e.home_visible !== !1, n = e.solar_visible !== !1, o = e.grid_visible !== !1, i = o && e.grid_secondary_visible === !0, s = e.battery_visible !== !1, a = s && e.battery_secondary_visible === !0, l = this.normalizeBatteryDualAlignment(e.battery_dual_alignment), c = I(this.hass, e.home_entity), d = n ? I(this.hass, e.solar_entity) : null, h = o ? I(this.hass, e.grid_entity) : null, _ = i ? I(this.hass, e.grid_secondary_entity) : null, p = s ? I(this.hass, e.battery_entity) : null, u = I(this.hass, e.battery_percentage_entity), f = a ? I(this.hass, e.battery_secondary_entity) : null, b = I(this.hass, e.battery_secondary_percentage_entity), m = e.unit ?? "kW", w = F(this.hass, e.solar_entity) ?? m, $ = F(this.hass, e.home_entity) ?? m, T = F(this.hass, e.grid_entity) ?? m, x = F(this.hass, e.grid_secondary_entity) ?? m, y = F(this.hass, e.battery_entity) ?? m, v = F(this.hass, e.battery_secondary_entity) ?? m, S = this.toUnidirectionalFlow(d), M = this.toUnidirectionalFlow(c), R = this.toBidirectionalFlow(h), E = this.toBidirectionalFlow(_), k = h === null && _ === null ? "none" : this.toBidirectionalFlow((h ?? 0) + (_ ?? 0)), N = this.toBidirectionalFlow(p), H = this.toBidirectionalFlow(f), Mr = p === null && f === null ? "none" : this.toBidirectionalFlow((p ?? 0) + (f ?? 0)), Rr = this.resolveTapAction(e), Be = !this.isEditorPreview() && Rr.action !== "none", Er = this.iconColorStyle(e.solar_icon_color), Ar = this.iconColorStyle(e.grid_icon_color), Pr = this.iconColorStyle(e.grid_secondary_icon_color), kr = this.iconColorStyle(e.home_icon_color), Lr = this.iconShapeStyle(e.core_icon_color), Ne = n ? this.collectSubBlocks("solar", e) : [], bt = o ? this.collectSubBlocks("grid", e) : [], gt = i ? this.collectSubBlocks("grid_secondary", e) : [], He = r ? this.collectSubBlocks("home", e) : [], De = new Set(He.map((A) => A.index)), ae = new Set(Ne.map((A) => A.index)), Or = De.has(7) && De.has(8), Ir = [5, 6, 7, 8].some((A) => De.has(A)), Br = ae.has(1) && ae.has(2) && !ae.has(3) && !ae.has(4), Nr = ae.has(3) && ae.has(4), wt = i && (Br && Or || Nr && Ir), Hr = i && !wt, Fe = He.some((A) => A.index >= 7), xt = this.homeSubPositions(Fe), St = this.gridSubPositions(i), Ct = this.gridSecondarySubPositions(), $t = this.solarSubPositions(
      Fe,
      Hr,
      wt
    ), zt = He.filter((A) => A.index <= (Fe ? 8 : 6)), Ue = o ? { col: 1, row: i ? 2 : 3, colSpan: 2, rowSpan: 2 } : null, je = i ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 } : null, Ve = s ? {
      col: a && l === "center" ? 2 : 3,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, Ge = a ? {
      col: l === "left" ? 1 : l === "right" ? 5 : 4,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, O = this.computeGridBounds(
      r,
      n,
      o,
      i,
      s,
      a,
      Ue,
      je,
      Ve,
      Ge,
      Ne,
      bt,
      gt,
      zt,
      $t,
      St,
      Ct,
      xt
    ), We = n ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, O) : null, ge = Ue ? this.normalizePlacement(Ue, O) : null, we = je ? this.normalizePlacement(je, O) : null, qe = r ? this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, O) : null, xe = Ve ? this.normalizePlacement(Ve, O) : null, Se = Ge ? this.normalizePlacement(Ge, O) : null, Tt = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, O), Dr = this.normalizePositions($t, O), Fr = this.normalizePositions(St, O), Ur = this.normalizePositions(Ct, O), jr = this.normalizePositions(xt, O), Mt = this.normalizeBatteryThreshold(e.battery_low_threshold), Rt = !!e.battery_low_alert, Et = this.normalizeBatteryThreshold(e.battery_secondary_low_threshold), At = !!e.battery_secondary_low_alert, Pt = Rt && u !== null && u <= Mt, Vr = this.iconColorStyle(Pt ? "red" : e.battery_icon_color), Gr = this.batteryIcon(u, p, e.battery_icon), kt = At && b !== null && b <= Et, Wr = this.iconColorStyle(
      kt ? "red" : e.battery_secondary_icon_color
    ), qr = this.batteryIcon(
      b,
      f,
      e.battery_secondary_icon
    ), Xr = { "--flow-color-rgb": this.toRgbCss(e.flow_color) ?? Kn }, le = this.resolveColor("purple"), Yr = this.resolveColor(e.solar_trend_color, le), Kr = this.resolveColor(e.grid_trend_color, le), Jr = this.resolveColor(e.grid_secondary_trend_color, le), Zr = this.resolveColor(e.home_trend_color, le), Qr = this.resolveColor(e.battery_trend_color, le), en = this.resolveColor(e.battery_secondary_trend_color, le), Lt = this.resolveColor("red"), tn = Rt && (e.battery_percentage_entity || u !== null) ? Mt : null, rn = u ?? p, nn = At && (e.battery_secondary_percentage_entity || b !== null) ? Et : null, on = b ?? f, sn = this.buildFlowSegments(
      qe,
      Tt,
      We,
      [
        ...ge ? [{ placement: ge, direction: R }] : [],
        ...we ? [{ placement: we, direction: E }] : []
      ],
      k,
      [
        ...xe ? [{ placement: xe, direction: N }] : [],
        ...Se ? [{ placement: Se, direction: H }] : []
      ],
      Mr,
      S,
      M,
      O
    );
    return g`
      <ha-card
        class=${Be ? "interactive" : ""}
        tabindex=${Be ? 0 : -1}
        role=${Be ? "button" : "article"}
        @click=${this.handleCardClick}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div
            class="energy-grid"
            style=${z({
      ...Xr,
      "--grid-columns": `${O.cols}`,
      "--grid-rows": `${O.rows}`,
      "--grid-aspect": `${O.cols} / ${O.rows}`
    })}
          >
            ${sn.map(
      (A) => this.renderFlowLine(A.orientation, A.direction, {
        ...A.orientation === "horizontal" ? {
          left: `${A.left}%`,
          top: `calc(${A.top}% - (var(--flow-line-size) / 2))`,
          width: `${A.width}%`
        } : {
          left: `calc(${A.left}% - (var(--flow-line-size) / 2))`,
          top: `${A.top}%`,
          height: `${A.height}%`
        }
      })
    )}
            ${this.renderSubNodeConnectors()}

            ${n && We ? g`
                  <div
                    class="energy-value solar ${d === null ? "missing" : ""}"
                    style=${z(this.gridPlacementStyle(We))}
                  >
                    ${this.renderTrend("solar", d, !!e.solar_trend, Yr, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.solar_icon ?? "mdi:weather-sunny"}
                        style=${z(Er)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(d, w, t)}</div>
                      <div class="energy-label">${e.solar_label}</div>
                    </div>
                  </div>
                ` : C}

            ${o && ge ? g`
                  <div
                    class="energy-value grid ${h === null ? "missing" : ""}"
                    style=${z(this.gridPlacementStyle(ge))}
                  >
                    ${this.renderTrend("grid", h, !!e.grid_trend, Kr, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_icon ?? "mdi:transmission-tower"}
                        style=${z(Ar)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(h, T, t)}</div>
                      <div class="energy-label">${e.grid_label}</div>
                    </div>
                  </div>
                ` : C}

            ${i && we ? g`
                  <div
                    class="energy-value grid-secondary ${_ === null ? "missing" : ""}"
                    style=${z(this.gridPlacementStyle(we))}
                  >
                    ${this.renderTrend(
      "grid_secondary",
      _,
      !!e.grid_secondary_trend,
      Jr,
      null,
      ""
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${z(Pr)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(_, x, t)}</div>
                      <div class="energy-label">${e.grid_secondary_label}</div>
                    </div>
                  </div>
                ` : C}

            ${r && qe ? g`
                  <div
                    class="energy-value home ${c === null ? "missing" : ""}"
                    style=${z(this.gridPlacementStyle(qe))}
                  >
                    ${this.renderTrend("home", c, !!e.home_trend, Zr, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.home_icon ?? "mdi:home-lightning-bolt"}
                        style=${z(kr)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(c, $, t)}</div>
                      <div class="energy-label">${e.home_label}</div>
                    </div>
                  </div>
                ` : C}

            ${this._showSubBlocks ? this.renderSubNodes("solar", Ne, Dr, t) : C}
            ${this._showSubBlocks ? this.renderSubNodes("grid", bt, Fr, t) : C}
            ${this._showSubBlocks ? this.renderSubNodes("grid_secondary", gt, Ur, t) : C}
            ${this._showSubBlocks ? this.renderSubNodes("home", zt, jr, t) : C}

            ${s && xe ? g`
                  <div
                    class="energy-value battery ${p === null ? "missing" : ""}"
                    style=${z(this.gridPlacementStyle(xe))}
                  >
                    ${this.renderTrend(
      "battery",
      rn,
      !!e.battery_trend,
      Qr,
      tn,
      Lt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon class="energy-icon" .icon=${Gr} style=${z(Vr)}></ha-icon>
                        ${u !== null ? g`
                              <div class="battery-percentage ${Pt ? "alert" : ""}">
                                ${this.formatBatteryPercentage(u)}
                              </div>
                            ` : C}
                      </div>
                      <div class="energy-number">${this.formatValue(p, y, t)}</div>
                      <div class="energy-label">${e.battery_label}</div>
                    </div>
                  </div>
                ` : C}

            ${a && Se ? g`
                  <div
                    class="energy-value battery-secondary ${f === null ? "missing" : ""}"
                    style=${z(this.gridPlacementStyle(Se))}
                  >
                    ${this.renderTrend(
      "battery_secondary",
      on,
      !!e.battery_secondary_trend,
      en,
      nn,
      Lt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${qr}
                          style=${z(Wr)}
                        ></ha-icon>
                        ${b !== null ? g`
                              <div class="battery-percentage ${kt ? "alert" : ""}">
                                ${this.formatBatteryPercentage(b)}
                              </div>
                            ` : C}
                      </div>
                      <div class="energy-number">${this.formatValue(f, v, t)}</div>
                      <div class="energy-label">${e.battery_secondary_label}</div>
                    </div>
                  </div>
                ` : C}

            <div class="home-core" style=${z(this.gridPlacementStyle(Tt))}>
              <div class="home-core-icon" style=${z(Lr)}>
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
    return g`<div class=${n} style=${z(r)} aria-hidden="true"></div>`;
  }
  renderSubNodeConnectors() {
    return !this._showSubBlocks || this._subNodeConnectorSegments.length === 0 ? C : g`
      <div class="subnode-connectors" aria-hidden="true">
        ${this._subNodeConnectorSegments.map(
      (e) => g`
            <div
              class="subnode-connector-segment ${e.node}"
              style=${z({
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
    const r = [], n = e === "solar" ? "mdi:solar-power-variant" : e === "home" ? "mdi:flash" : "mdi:transmission-tower", o = e === "solar" ? "Solar" : e === "home" ? "Home" : e === "grid" ? "Grid" : "Grid 2", i = e === "solar" ? jn : e === "home" ? Vn : Gn;
    for (let h = 1; h <= i; h += 1) {
      const _ = t[`${e}_sub_${h}_enabled`] === !0, p = this.readConfigString(t[`${e}_sub_${h}_entity`]);
      !_ || !p || r.push({
        key: `${e}_${h}`,
        index: h,
        icon: this.readConfigString(t[`${e}_sub_${h}_icon`]) ?? n,
        iconStyle: this.iconColorStyle(t[`${e}_sub_${h}_icon_color`]),
        label: this.readConfigString(t[`${e}_sub_${h}_label`]) ?? `${o} ${h}`,
        value: I(this.hass, p),
        unit: F(this.hass, p) ?? t.unit ?? "kW"
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
        value: I(this.hass, a),
        unit: F(this.hass, a) ?? t.unit ?? "kW"
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
  computeGridBounds(e, t, r, n, o, i, s, a, l, c, d, h, _, p, u, f, b, m) {
    const w = [{ col: 3, row: 3, colSpan: 2, rowSpan: 2 }];
    e && w.push({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }), t && w.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }), r && s && w.push(s), n && a && w.push(a), o && l && w.push(l), i && c && w.push(c), d.forEach((v) => {
      const S = u[v.index];
      S && w.push({ col: S.col, row: S.row, colSpan: 1, rowSpan: 1 });
    }), h.forEach((v) => {
      const S = f[v.index];
      S && w.push({ col: S.col, row: S.row, colSpan: 1, rowSpan: 1 });
    }), _.forEach((v) => {
      const S = b[v.index];
      S && w.push({ col: S.col, row: S.row, colSpan: 1, rowSpan: 1 });
    }), p.forEach((v) => {
      const S = m[v.index];
      S && w.push({ col: S.col, row: S.row, colSpan: 1, rowSpan: 1 });
    });
    const $ = Math.min(...w.map((v) => v.col)), T = Math.max(...w.map((v) => v.col + (v.colSpan ?? 1) - 1)), x = Math.min(...w.map((v) => v.row)), y = Math.max(...w.map((v) => v.row + (v.rowSpan ?? 1) - 1));
    return {
      minCol: $,
      maxCol: T,
      minRow: x,
      maxRow: y,
      cols: T - $ + 1,
      rows: y - x + 1
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
    const d = this.placementCenter(t, c), h = [], _ = (u, f, b, m) => {
      const w = Math.min(u, f), $ = Math.abs(f - u);
      $ <= D || h.push({
        orientation: "horizontal",
        direction: m,
        left: w,
        top: b,
        width: $,
        height: 0
      });
    }, p = (u, f, b, m) => {
      const w = Math.min(u, f), $ = Math.abs(f - u);
      $ <= D || h.push({
        orientation: "vertical",
        direction: m,
        left: b,
        top: w,
        width: 0,
        height: $
      });
    };
    if (e) {
      const u = this.placementCenter(e, c);
      _(d.x, u.x, d.y, l);
    }
    if (r) {
      const u = this.placementCenter(r, c);
      p(u.y, d.y, d.x, a);
    }
    if (n.length === 1) {
      const [{ placement: u, direction: f }] = n, b = this.placementCenter(u, c);
      _(b.x, d.x, d.y, f);
    } else if (n.length >= 2) {
      const u = n.map((m) => ({
        direction: m.direction,
        center: this.placementCenter(m.placement, c)
      })).sort((m, w) => m.center.y - w.center.y), f = Math.min(...u.map((m) => m.center.x)), b = d.x - (d.x - f) * 0.5;
      _(d.x, b, d.y, o), u.forEach((m) => {
        const w = m.center.y > d.y + D ? this.reverseFlowDirection(m.direction) : m.direction;
        p(d.y, m.center.y, b, w), _(m.center.x, b, m.center.y, m.direction);
      });
    }
    if (i.length === 1) {
      const [{ placement: u, direction: f }] = i, b = this.placementCenter(u, c);
      p(d.y, b.y, d.x, f);
    } else if (i.length >= 2) {
      const u = i.map((m) => ({
        placement: m.placement,
        direction: m.direction,
        center: this.placementCenter(m.placement, c)
      })).sort((m, w) => m.center.y - w.center.y), f = Math.min(
        ...u.map((m) => (m.placement.row - 1) / c.rows * 100)
      ), b = Math.max(d.y + D, f);
      p(d.y, b, d.x, s), u.forEach((m) => {
        _(d.x, m.center.x, b, m.direction), p(b, m.center.y, m.center.x, m.direction);
      });
    }
    return h;
  }
  renderSubNodes(e, t, r, n) {
    return t.length === 0 ? C : g`
      ${t.map((o) => {
      const i = r[o.index];
      if (!i)
        return C;
      const s = {
        "grid-column": `${i.col}`,
        "grid-row": `${i.row}`
      };
      return g`
            <div
              class="energy-sub-value ${e}-sub sub-col-${i.col} ${o.value === null ? "missing" : ""}"
              data-key=${o.key}
              style=${z(s)}
            >
              <div class="energy-sub-content">
                <ha-icon class="energy-sub-icon" .icon=${o.icon} style=${z(o.iconStyle)}></ha-icon>
                <div class="energy-sub-number">${this.formatValue(o.value, o.unit, n)}</div>
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
    }, g`
      <div class="node-trend" aria-hidden="true">
        <canvas class="node-trend-canvas-area" data-node=${e}></canvas>
      </div>
      <div class="node-trend-line" aria-hidden="true">
        <canvas class="node-trend-canvas-line" data-node=${e}></canvas>
      </div>
    `) : (delete this._trendDrawConfig[e], C);
  }
  trendPoints(e, t) {
    const r = Date.now(), n = r - $e, i = [...(this._trendSeries[e] ?? []).filter((s) => s.ts >= n).sort((s, a) => s.ts - a.ts)];
    return t !== null && Number.isFinite(t) && i.push({ ts: r, value: t }), i;
  }
  buildThresholdTrendSegments(e, t) {
    const r = [];
    for (let n = 1; n < e.length; n += 1) {
      const o = e[n - 1], i = e[n], s = o.value <= t, a = i.value <= t;
      if (s === a || Math.abs(i.value - o.value) <= D) {
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
    var b, m;
    const r = Date.now() - $e, n = 0, o = 100, i = e.map((w) => w.value), s = Math.min(...i), a = Math.max(...i);
    if (!Number.isFinite(s) || !Number.isFinite(a))
      return [];
    const l = 20, c = 80, d = Math.max(a - s, D), h = e.map((w) => {
      const $ = Math.max(0, Math.min(100, (w.ts - r) / $e * 100)), T = n + $ / 100 * (o - n), x = d <= D ? 0.5 : (w.value - s) / d, y = c - x * (c - l);
      return { x: T, y, value: w.value };
    }), _ = ((b = h[0]) == null ? void 0 : b.x) ?? n, p = ((m = h[h.length - 1]) == null ? void 0 : m.x) ?? o, u = Math.max(0, p - _), f = 18;
    if (h.length >= 2 && u < f) {
      const w = o - f, $ = Math.max(n, Math.min(w, p - f));
      if (u <= D) {
        const x = f / (h.length - 1);
        return h.map((y, v) => ({
          ...y,
          x: Math.max(n, Math.min(o, $ + x * v))
        }));
      }
      const T = f / u;
      return h.map((x) => ({
        ...x,
        x: Math.max(n, Math.min(o, $ + (x.x - _) * T))
      }));
    }
    return h;
  }
  toCanvasPoints(e, t, r) {
    return ht(e, t, r);
  }
  updateSubBlockVisibility() {
    const e = this.renderRoot.querySelector(".energy-grid");
    if (!e) {
      this._showSubBlocks && (this._showSubBlocks = !1);
      return;
    }
    const t = this.findLayoutSpan("column"), r = this.findLayoutSpan("row"), n = t !== null && r !== null && t >= Wn && r >= qn, o = e.getBoundingClientRect(), i = o.width >= Xn && o.height >= Yn, s = t !== null && r !== null ? n : i;
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
    const i = e.getBoundingClientRect(), s = t == null ? void 0 : t.getBoundingClientRect(), a = r == null ? void 0 : r.getBoundingClientRect(), l = n == null ? void 0 : n.getBoundingClientRect(), c = o == null ? void 0 : o.getBoundingClientRect(), d = s ? s.left + s.width / 2 : 0, h = a ? a.top + a.height / 2 : 0, _ = l ? l.left + l.width / 2 : 0, p = c ? c.left + c.width / 2 : 0, u = (x) => x - i.left, f = (x) => x - i.top, b = (x) => Math.round(x * 10) / 10, m = [], w = (x, y, v, S) => {
      const M = Math.min(x, y), R = Math.abs(y - x);
      R <= 0.5 || m.push({
        node: S,
        left: b(M),
        top: b(v - 1),
        width: b(R),
        height: 2
      });
    }, $ = (x, y, v, S) => {
      const M = Math.min(x, y), R = Math.abs(y - x);
      R <= 0.5 || m.push({
        node: S,
        left: b(v - 1),
        top: b(M),
        width: 2,
        height: b(R)
      });
    };
    s && this.renderRoot.querySelectorAll(".energy-sub-value.home-sub").forEach((x) => {
      const y = x.getBoundingClientRect(), v = y.top + y.height / 2, S = y.left + y.width / 2 < d ? y.right : y.left, M = v, R = v < s.top ? s.top : v > s.bottom ? s.bottom : v, E = u(d), k = f(M), N = f(R), H = u(S);
      w(H, E, k, "home"), $(k, N, E, "home");
    }), a && this.renderRoot.querySelectorAll(".energy-sub-value.solar-sub").forEach((x) => {
      const y = x.getBoundingClientRect(), v = y.left + y.width / 2, S = y.top + y.height / 2 < h ? y.bottom : y.top, M = v, R = v < a.left ? a.left : v > a.right ? a.right : v, E = f(h), k = u(M), N = u(R), H = f(S);
      $(H, E, k, "solar"), w(k, N, E, "solar");
    }), l && this.renderRoot.querySelectorAll(".energy-sub-value.grid-sub").forEach((x) => {
      const y = x.getBoundingClientRect(), v = y.top + y.height / 2, S = y.left + y.width / 2 < _ ? y.right : y.left, M = v, R = v < l.top ? l.top : v > l.bottom ? l.bottom : v, E = u(_), k = f(M), N = f(R), H = u(S);
      w(H, E, k, "grid"), $(k, N, E, "grid");
    }), c && this.renderRoot.querySelectorAll(".energy-sub-value.grid_secondary-sub").forEach((x) => {
      const y = x.getBoundingClientRect(), v = y.top + y.height / 2, S = y.left + y.width / 2 < p ? y.right : y.left, M = v, R = v < c.top ? c.top : v > c.bottom ? c.bottom : v, E = u(p), k = f(M), N = f(R), H = u(S);
      w(H, E, k, "grid_secondary"), $(k, N, E, "grid_secondary");
    }), m.length === this._subNodeConnectorSegments.length && m.every(
      (x, y) => {
        var v, S, M, R, E;
        return x.node === ((v = this._subNodeConnectorSegments[y]) == null ? void 0 : v.node) && x.left === ((S = this._subNodeConnectorSegments[y]) == null ? void 0 : S.left) && x.top === ((M = this._subNodeConnectorSegments[y]) == null ? void 0 : M.top) && x.width === ((R = this._subNodeConnectorSegments[y]) == null ? void 0 : R.width) && x.height === ((E = this._subNodeConnectorSegments[y]) == null ? void 0 : E.height);
      }
    ) || (this._subNodeConnectorSegments = m);
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
    super.connectedCallback(), this.startLiveRuntime(!0), this.shouldRunLiveRuntime() || this.updateComplete.then(() => {
      this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw();
    });
  }
  disconnectedCallback() {
    this.stopLiveRuntime(), super.disconnectedCallback();
  }
  updated(e) {
    (e.has("preview") || e.has("editMode")) && (this.shouldRunLiveRuntime() ? this.startLiveRuntime(!0) : this.stopLiveRuntime()), this.shouldRunLiveRuntime() ? (e.has("_config") ? this.maybeRefreshTrendHistory(!0) : e.has("hass") && this.maybeRefreshTrendHistory(), this.syncTrendResizeObserver()) : this._trendResizeObserver && this._trendResizeObserver.disconnect(), this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw();
  }
  maybeRefreshTrendHistory(e = !1) {
    if (!this.shouldRunLiveRuntime())
      return;
    e && (this._lastTrendRefresh = 0);
    const t = Date.now();
    !e && t - this._lastTrendRefresh < Yt || (this._lastTrendRefresh = t, this.refreshTrendHistory());
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  shouldRunLiveRuntime() {
    return !this.isEditorPreview();
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Yt), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.syncTrendResizeObserver(), this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._subNodeConnectorRaf !== void 0 && (window.cancelAnimationFrame(this._subNodeConnectorRaf), this._subNodeConnectorRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
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
    return at(this.hass, e, $e);
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
    return ct(e, t);
  }
  toRgbCss(e) {
    return lt(e);
  }
};
V.styles = Oe`
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
K([
  L({ attribute: !1 })
], V.prototype, "hass", 2);
K([
  L({ type: Boolean })
], V.prototype, "preview", 2);
K([
  L({ type: Boolean })
], V.prototype, "editMode", 2);
K([
  P()
], V.prototype, "_config", 2);
K([
  P()
], V.prototype, "_trendSeries", 2);
K([
  P()
], V.prototype, "_showSubBlocks", 2);
K([
  P()
], V.prototype, "_subNodeConnectorSegments", 2);
V = K([
  ie("power-pilz-energy-card")
], V);
const j = (e) => {
  if (typeof e != "string")
    return;
  const t = e.trim();
  return t.length > 0 ? t : void 0;
}, hr = (e, t) => {
  switch (e) {
    case 1:
      return j(t.entity_1);
    case 2:
      return j(t.entity_2);
    case 3:
      return j(t.entity_3);
    case 4:
      return j(t.entity_4);
    default:
      return;
  }
}, ur = (e, t) => {
  switch (e) {
    case 1:
      return j(t.entity_1_name);
    case 2:
      return j(t.entity_2_name);
    case 3:
      return j(t.entity_3_name);
    case 4:
      return j(t.entity_4_name);
    default:
      return;
  }
}, _r = (e, t) => {
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
}, mr = (e, t) => {
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
}, pr = (e, t) => {
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
}, yr = (e, t) => {
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
}, vr = (e, t) => {
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
}, fr = (e) => e === "column" ? "column" : "row", _t = (e, t = 24) => {
  const r = typeof e == "number" ? e : typeof e == "string" ? Number.parseInt(e, 10) : NaN;
  return r === 6 || r === 12 || r === 24 ? r : t;
}, mt = (e) => typeof e != "number" || !Number.isFinite(e) ? 1.5 : Math.max(0.5, Math.min(6, e)), br = (e, t, r, n) => {
  var s;
  if (t)
    return t;
  const o = e[r], i = (s = o == null ? void 0 : o.attributes) == null ? void 0 : s.friendly_name;
  return typeof i == "string" && i.trim().length > 0 ? i.trim() : `Entity ${n}`;
}, gr = (e, t, r) => {
  if (e === null)
    return t ? `-- ${t}` : "--";
  const n = `${e.toFixed(r)} ${t}`.trim();
  return n.length > 0 ? n : "--";
}, Jn = 4, wr = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, Zn = {
  legend_layout: "Label layout",
  timeframe_hours: "Time range",
  hover_enabled: "Enable hover",
  fill_area_enabled: "Enable area fill",
  clip_graph_to_labels: "Clip graph below labels",
  line_thickness: "Line thickness",
  unit: "Unit override",
  decimals: "Decimals"
}, Qn = (e) => ({
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
              default_color: wr[e] ?? "purple"
            }
          }
        }
      ]
    }
  ]
}), xr = (e = !1) => {
  const t = [
    { name: "hover_enabled", selector: { boolean: {} } },
    { name: "fill_area_enabled", selector: { boolean: {} } }
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
        }
      ]
    },
    {
      type: "grid",
      name: "",
      schema: t
    },
    ...Array.from({ length: Jn }, (r, n) => Qn(n + 1)),
    {
      type: "grid",
      name: "",
      schema: [
        { name: "unit", selector: { text: {} } },
        { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } }
      ]
    }
  ];
}, q = (e) => {
  if (typeof e == "string")
    return e.length > 0 ? e : void 0;
}, Sr = (e) => e === "column" ? "column" : "row", Cr = (e) => _t(e), $r = (e) => mt(e), ze = (e, t, r) => {
  const n = e ?? t;
  return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : wr[r] ?? "purple";
}, zr = (e) => ({
  entity_1: q(e.entity_1) ?? q(e.entity),
  entity_1_name: q(e.entity_1_name),
  entity_1_enabled: e.entity_1_enabled ?? !0,
  entity_1_show_icon: e.entity_1_show_icon ?? !0,
  entity_1_icon: e.entity_1_icon ?? e.icon,
  entity_1_icon_color: e.entity_1_icon_color ?? e.icon_color,
  entity_1_trend_color: ze(e.entity_1_trend_color, e.trend_color, 1),
  entity_2: q(e.entity_2),
  entity_2_name: q(e.entity_2_name),
  entity_2_enabled: e.entity_2_enabled ?? !1,
  entity_2_show_icon: e.entity_2_show_icon ?? !0,
  entity_2_icon: e.entity_2_icon,
  entity_2_trend_color: ze(e.entity_2_trend_color, void 0, 2),
  entity_3: q(e.entity_3),
  entity_3_name: q(e.entity_3_name),
  entity_3_enabled: e.entity_3_enabled ?? !1,
  entity_3_show_icon: e.entity_3_show_icon ?? !0,
  entity_3_icon: e.entity_3_icon,
  entity_3_trend_color: ze(e.entity_3_trend_color, void 0, 3),
  entity_4: q(e.entity_4),
  entity_4_name: q(e.entity_4_name),
  entity_4_enabled: e.entity_4_enabled ?? !1,
  entity_4_show_icon: e.entity_4_show_icon ?? !0,
  entity_4_icon: e.entity_4_icon,
  entity_4_trend_color: ze(e.entity_4_trend_color, void 0, 4)
}), Tr = (e, t = {}) => {
  const r = e.name ?? "", n = r.match(/^entity_(\d+)_(enabled|name|show_icon|icon|icon_color|trend_color)$/);
  if (n) {
    const [, i, s] = n;
    return `Entity ${i} ${{
      enabled: "Enabled",
      name: "Name",
      show_icon: "Show icon",
      icon: "Icon",
      icon_color: "Icon color",
      trend_color: "Graph color"
    }[s] ?? s}`;
  }
  const o = r.match(/^entity_(\d+)$/);
  return o ? `Entity ${o[1]}` : t[r] ?? Zn[r] ?? r;
};
var eo = Object.defineProperty, to = Object.getOwnPropertyDescriptor, pt = (e, t, r, n) => {
  for (var o = n > 1 ? void 0 : n ? to(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (n ? s(t, r, o) : s(o)) || o);
  return n && o && eo(t, r, o), o;
};
const ro = xr(!1);
let Pe = class extends B {
  constructor() {
    super(...arguments), this.computeLabel = (e) => Tr(e), this.valueChanged = (e) => {
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
      legend_layout: Sr(e.legend_layout),
      timeframe_hours: Cr(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      line_thickness: $r(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...zr(e)
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? C : g`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${be}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ro}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
pt([
  L({ attribute: !1 })
], Pe.prototype, "hass", 2);
pt([
  P()
], Pe.prototype, "_config", 2);
Pe = pt([
  ie("power-pilz-graph-card-editor")
], Pe);
var no = Object.defineProperty, oo = Object.getOwnPropertyDescriptor, J = (e, t, r, n) => {
  for (var o = n > 1 ? void 0 : n ? oo(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (n ? s(t, r, o) : s(o)) || o);
  return n && o && no(t, r, o), o;
};
const et = 1, Kt = 24, Jt = 300 * 1e3, Te = 0.01, Zt = 4, io = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", Qt = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let G = class extends B {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._graphTopInset = 0, this._drawConfigs = [], this._linePointsBySlot = {}, this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._liveRuntimeActive = !1, this.handlePointerMove = (e) => {
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
    return document.createElement("power-pilz-graph-card-editor");
  }
  static async getStubConfig(e) {
    const t = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(t), n = (...c) => c.find((d) => d in t), o = (c) => r.find((d) => d.startsWith(`${c}.`)), i = n("sensor.dev_home_power", "sensor.home_power") ?? o("sensor") ?? "sensor.dev_home_power", s = n("sensor.dev_solar_power", "sensor.solar_power"), a = n("sensor.dev_grid_power", "sensor.grid_power"), l = n("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-card",
      legend_layout: "row",
      timeframe_hours: Kt,
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
      decimals: et
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : et, r = this.readConfigString(e.entity), n = this.readConfigString(e.icon), o = this.readConfigString(e.entity_1) ?? r ?? "sensor.dev_home_power";
    this._config = {
      ...e,
      type: "custom:power-pilz-graph-card",
      legend_layout: this.normalizeLegendLayout(e.legend_layout),
      timeframe_hours: this.normalizeTimeframeHours(e.timeframe_hours),
      line_thickness: this.normalizeLineThickness(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      entity_1: o,
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
      return g`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return g``;
    const e = this._config, t = e.decimals ?? et, r = this.normalizeLineThickness(e.line_thickness), n = this.collectSeriesEntries(e, t), o = this.normalizeLegendLayout(e.legend_layout), i = e.hover_enabled !== !1, s = this._hoverState, a = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, l = a > 0 ? { top: `${a}px` } : {}, c = s ? {
      left: `${s.x}px`,
      top: `${s.y + a}px`,
      "--hover-dot-color": s.color
    } : {};
    return this._drawConfigs = n.map((d) => ({
      slot: d.slot,
      currentValue: d.currentValue,
      color: d.trendColor,
      lineWidth: r
    })), g`
      <ha-card>
        <div
          class="container"
          @pointermove=${this.handlePointerMove}
          @pointerleave=${this.handlePointerLeave}
          @pointercancel=${this.handlePointerLeave}
        >
          <div class="card-trend" style=${z(l)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${z(l)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${i && s ? g`<div class="hover-dot" aria-hidden="true" style=${z(c)}></div>` : C}

          <div class="content">
            <div class="series-list layout-${o}">
              ${n.length === 0 ? g`
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
    return g`
      <div class="state-item" data-slot=${String(e.slot)}>
        ${e.showIcon ? g`
              <div class="icon-wrap">
                <div class="icon-shape" style=${z(e.iconStyle)}>
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
              </div>
            ` : C}
        <div class="info">
          <div class="primary">${e.name}</div>
          <div class="secondary">${r}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(e, t) {
    const r = [];
    for (let n = 1; n <= Zt; n += 1) {
      const o = n, i = this.slotEnabled(o, e), s = this.slotEntityId(o, e);
      if (!i || !s)
        continue;
      const a = this.entityName(this.slotCustomName(o, e), s, n), l = I(this.hass, s), c = e.unit ?? F(this.hass, s) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(o, e), _ = this.iconStyle(this.slotIconColor(o, e)), p = this.resolveColor(Qt[o], io), u = this.resolveColor(this.slotTrendColor(o, e), p);
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
        trendColor: u
      });
    }
    return r;
  }
  slotEntityId(e, t) {
    return hr(e, t);
  }
  slotCustomName(e, t) {
    return ur(e, t);
  }
  slotEnabled(e, t) {
    return _r(e, t);
  }
  slotShowIcon(e, t) {
    return mr(e, t);
  }
  slotIcon(e, t) {
    return pr(e, t);
  }
  slotIconColor(e, t) {
    return yr(e, t);
  }
  slotTrendColor(e, t) {
    return vr(e, t);
  }
  entityName(e, t, r) {
    return br(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    return gr(e, t, r);
  }
  readConfigString(e) {
    return j(e);
  }
  normalizeLegendLayout(e) {
    return fr(e);
  }
  normalizeTimeframeHours(e) {
    return _t(e, Kt);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return mt(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : Qt[r];
  }
  iconStyle(e) {
    return dt(e);
  }
  resolveColor(e, t = "") {
    return ct(e, t);
  }
  trendPoints(e, t) {
    const r = Date.now(), n = r - this.trendWindowMs(this._config), i = [...(this._trendSeries[e] ?? []).filter((s) => s.ts >= n).sort((s, a) => s.ts - a.ts)];
    return t !== null && Number.isFinite(t) && i.push({ ts: r, value: t }), i;
  }
  toTrendCoordinates(e, t) {
    var m, w;
    const n = Date.now() - t, o = 0, i = 100, s = e.map(($) => $.value), a = Math.min(...s), l = Math.max(...s);
    if (!Number.isFinite(a) || !Number.isFinite(l))
      return [];
    const c = 20, d = 80, h = Math.max(l - a, Te), _ = e.map(($) => {
      const T = Math.max(0, Math.min(100, ($.ts - n) / t * 100)), x = o + T / 100 * (i - o), y = h <= Te ? 0.5 : ($.value - a) / h, v = d - y * (d - c);
      return { x, y: v, value: $.value };
    }), p = ((m = _[0]) == null ? void 0 : m.x) ?? o, u = ((w = _[_.length - 1]) == null ? void 0 : w.x) ?? i, f = Math.max(0, u - p), b = 18;
    if (_.length >= 2 && f < b) {
      const $ = i - b, T = Math.max(o, Math.min($, u - b));
      if (f <= Te) {
        const y = b / (_.length - 1);
        return _.map((v, S) => ({
          ...v,
          x: Math.max(o, Math.min(i, T + y * S))
        }));
      }
      const x = b / f;
      return _.map((y) => ({
        ...y,
        x: Math.max(o, Math.min(i, T + (y.x - p) * x))
      }));
    }
    return _;
  }
  toCanvasPoints(e, t, r) {
    return ht(e, t, r);
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
      const _ = this.toCanvasPoints(h, r.width, r.height), p = this.toCanvasPoints(h, n.width, n.height);
      o && this.drawTrendArea(r.ctx, _, c.color, r.height), this.drawTrendLine(n.ctx, p, c.color, c.lineWidth), s[c.slot] = p;
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
      if (Math.abs(a) <= Te)
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
    super.connectedCallback(), this.startLiveRuntime(!0), this.shouldRunLiveRuntime() || this.updateComplete.then(() => {
      this.updateGraphTopInset(), this.scheduleTrendCanvasDraw();
    });
  }
  disconnectedCallback() {
    this.clearHoverState(), this.stopLiveRuntime(), super.disconnectedCallback();
  }
  updated(e) {
    var t;
    (e.has("preview") || e.has("editMode")) && (this.shouldRunLiveRuntime() ? this.startLiveRuntime(!0) : this.stopLiveRuntime()), this.shouldRunLiveRuntime() ? (e.has("_config") ? (this.maybeRefreshTrendHistory(!0), this.clearHoverState()) : e.has("hass") && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this.syncTrendResizeObserver()) : this._trendResizeObserver && this._trendResizeObserver.disconnect(), ((t = this._config) == null ? void 0 : t.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset(), this.scheduleTrendCanvasDraw();
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
    if (!this.shouldRunLiveRuntime())
      return;
    e && (this._lastTrendRefresh = 0);
    const t = Date.now();
    !e && t - this._lastTrendRefresh < Jt || (this._lastTrendRefresh = t, this.refreshTrendHistory());
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  shouldRunLiveRuntime() {
    return !this.isEditorPreview();
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, Jt), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.updateGraphTopInset(), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
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
    for (let r = 1; r <= Zt; r += 1) {
      const n = r;
      this.slotEnabled(n, e) && this.slotEntityId(n, e) && t.push(n);
    }
    return t;
  }
  async fetchTrendHistory(e, t) {
    return at(this.hass, e, t);
  }
};
G.styles = Oe`
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
J([
  L({ attribute: !1 })
], G.prototype, "hass", 2);
J([
  L({ type: Boolean })
], G.prototype, "preview", 2);
J([
  L({ type: Boolean })
], G.prototype, "editMode", 2);
J([
  P()
], G.prototype, "_config", 2);
J([
  P()
], G.prototype, "_trendSeries", 2);
J([
  P()
], G.prototype, "_graphTopInset", 2);
J([
  P()
], G.prototype, "_hoverState", 2);
G = J([
  ie("power-pilz-graph-card")
], G);
var so = Object.defineProperty, ao = Object.getOwnPropertyDescriptor, yt = (e, t, r, n) => {
  for (var o = n > 1 ? void 0 : n ? ao(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (n ? s(t, r, o) : s(o)) || o);
  return n && o && so(t, r, o), o;
};
const lo = xr(!0);
let ke = class extends B {
  constructor() {
    super(...arguments), this.computeLabel = (e) => Tr(e, {
      normalize_stack_to_percent: "Normalize stack to 100%"
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
      legend_layout: Sr(e.legend_layout),
      timeframe_hours: Cr(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      normalize_stack_to_percent: e.normalize_stack_to_percent ?? !1,
      line_thickness: $r(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...zr(e)
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? C : g`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${be}
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
yt([
  L({ attribute: !1 })
], ke.prototype, "hass", 2);
yt([
  P()
], ke.prototype, "_config", 2);
ke = yt([
  ie("power-pilz-graph-stack-card-editor")
], ke);
var co = Object.defineProperty, ho = Object.getOwnPropertyDescriptor, Z = (e, t, r, n) => {
  for (var o = n > 1 ? void 0 : n ? ho(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (n ? s(t, r, o) : s(o)) || o);
  return n && o && co(t, r, o), o;
};
const tt = 1, er = 24, tr = 300 * 1e3, ee = 0.01, rt = 4, uo = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", rr = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let W = class extends B {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._trendSeries = {}, this._graphTopInset = 0, this._drawConfigs = [], this._linePointsBySlot = {}, this._trendRefreshInFlight = !1, this._lastTrendRefresh = 0, this._liveRuntimeActive = !1, this.handlePointerMove = (e) => {
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
    return document.createElement("power-pilz-graph-stack-card-editor");
  }
  static async getStubConfig(e) {
    const t = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(t), n = (...c) => c.find((d) => d in t), o = (c) => r.find((d) => d.startsWith(`${c}.`)), i = n("sensor.dev_home_power", "sensor.home_power") ?? o("sensor") ?? "sensor.dev_home_power", s = n("sensor.dev_solar_power", "sensor.solar_power"), a = n("sensor.dev_grid_power", "sensor.grid_power"), l = n("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: "row",
      timeframe_hours: er,
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
      decimals: tt
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : tt, r = this.readConfigString(e.entity), n = this.readConfigString(e.icon), o = this.readConfigString(e.entity_1) ?? r ?? "sensor.dev_home_power";
    this._config = {
      ...e,
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: this.normalizeLegendLayout(e.legend_layout),
      timeframe_hours: this.normalizeTimeframeHours(e.timeframe_hours),
      line_thickness: this.normalizeLineThickness(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      normalize_stack_to_percent: e.normalize_stack_to_percent ?? !1,
      entity_1: o,
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
      return g`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return g``;
    const e = this._config, t = e.decimals ?? tt, r = this.normalizeLineThickness(e.line_thickness), n = e.normalize_stack_to_percent === !0, o = this.collectSeriesEntries(e, t), i = this.withStackedCurrentValues(o, n), s = this.normalizeLegendLayout(e.legend_layout), a = e.hover_enabled !== !1, l = this._hoverState, c = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, d = c > 0 ? { top: `${c}px` } : {}, h = l ? {
      left: `${l.x}px`,
      top: `${l.y + c}px`,
      "--hover-dot-color": l.color
    } : {};
    return this._drawConfigs = o.map((_) => ({
      slot: _.slot,
      currentValue: _.currentValue,
      color: _.trendColor,
      lineWidth: r
    })), g`
      <ha-card>
        <div
          class="container"
          @pointermove=${this.handlePointerMove}
          @pointerleave=${this.handlePointerLeave}
          @pointercancel=${this.handlePointerLeave}
        >
          <div class="card-trend" style=${z(d)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${z(d)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${a && l ? g`<div class="hover-dot" aria-hidden="true" style=${z(h)}></div>` : C}

          <div class="content">
            <div class="series-list layout-${s}">
              ${o.length === 0 ? g`
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
    return g`
      <div class="state-item" data-slot=${String(e.slot)}>
        ${e.showIcon ? g`
              <div class="icon-wrap">
                <div class="icon-shape" style=${z(e.iconStyle)}>
                  <ha-icon .icon=${e.icon}></ha-icon>
                </div>
              </div>
            ` : C}
        <div class="info">
          <div class="primary">${e.name}</div>
          <div class="secondary">${r}</div>
        </div>
      </div>
    `;
  }
  collectSeriesEntries(e, t) {
    const r = [];
    for (let n = 1; n <= rt; n += 1) {
      const o = n, i = this.slotEnabled(o, e), s = this.slotEntityId(o, e);
      if (!i || !s)
        continue;
      const a = this.entityName(this.slotCustomName(o, e), s, n), l = I(this.hass, s), c = e.unit ?? F(this.hass, s) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(o, e), _ = this.iconStyle(this.slotIconColor(o, e)), p = this.resolveColor(rr[o], uo), u = this.resolveColor(this.slotTrendColor(o, e), p);
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
        trendColor: u
      });
    }
    return r;
  }
  withStackedCurrentValues(e, t) {
    const r = e.reduce((s, a) => s + (a.currentValue ?? 0), 0), n = Number.isFinite(r) && Math.abs(r) > ee;
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
    return hr(e, t);
  }
  slotCustomName(e, t) {
    return ur(e, t);
  }
  slotEnabled(e, t) {
    return _r(e, t);
  }
  slotShowIcon(e, t) {
    return mr(e, t);
  }
  slotIcon(e, t) {
    return pr(e, t);
  }
  slotIconColor(e, t) {
    return yr(e, t);
  }
  slotTrendColor(e, t) {
    return vr(e, t);
  }
  entityName(e, t, r) {
    return br(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    return gr(e, t, r);
  }
  readConfigString(e) {
    return j(e);
  }
  normalizeLegendLayout(e) {
    return fr(e);
  }
  normalizeTimeframeHours(e) {
    return _t(e, er);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return mt(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : rr[r];
  }
  iconStyle(e) {
    return dt(e);
  }
  resolveColor(e, t = "") {
    return ct(e, t);
  }
  trendPoints(e, t) {
    const r = Date.now(), n = r - this.trendWindowMs(this._config), i = [...(this._trendSeries[e] ?? []).filter((s) => s.ts >= n).sort((s, a) => s.ts - a.ts)];
    return t !== null && Number.isFinite(t) && i.push({ ts: r, value: t }), i;
  }
  toTrendCoordinates(e, t, r) {
    var w, $;
    const o = Date.now() - t, i = 0, s = 100, a = e.map((T) => T.value), l = (r == null ? void 0 : r.min) ?? Math.min(...a), c = (r == null ? void 0 : r.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, _ = Math.max(c - l, ee), p = e.map((T) => {
      const x = Math.max(0, Math.min(100, (T.ts - o) / t * 100)), y = i + x / 100 * (s - i), v = _ <= ee ? 0.5 : (T.value - l) / _, S = h - v * (h - d);
      return { x: y, y: S, value: T.value };
    }), u = ((w = p[0]) == null ? void 0 : w.x) ?? i, f = (($ = p[p.length - 1]) == null ? void 0 : $.x) ?? s, b = Math.max(0, f - u), m = 18;
    if (p.length >= 2 && b < m) {
      const T = s - m, x = Math.max(i, Math.min(T, f - m));
      if (b <= ee) {
        const v = m / (p.length - 1);
        return p.map((S, M) => ({
          ...S,
          x: Math.max(i, Math.min(s, x + v * M))
        }));
      }
      const y = m / b;
      return p.map((v) => ({
        ...v,
        x: Math.max(i, Math.min(s, x + (v.x - u) * y))
      }));
    }
    return p;
  }
  toCanvasPoints(e, t, r) {
    return ht(e, t, r);
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
    var _, p;
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
    const o = ((_ = this._config) == null ? void 0 : _.fill_area_enabled) !== !1, i = ((p = this._config) == null ? void 0 : p.normalize_stack_to_percent) === !0, s = this.trendWindowMs(this._config), a = {}, l = this.buildStackedTrendSeries(s), c = i ? this.normalizeStackedSeriesToPercent(l) : l, d = i ? { min: 0, max: 100 } : this.computeStackedValueRange(c);
    [...this._drawConfigs].sort((u, f) => f.slot - u.slot).forEach((u) => {
      const f = c[u.slot] ?? [];
      if (f.length < 2)
        return;
      const b = this.toTrendCoordinates(f, s, d);
      if (b.length < 2)
        return;
      const m = this.toCanvasPoints(b, r.width, r.height), w = this.toCanvasPoints(b, n.width, n.height);
      o && this.drawTrendArea(r.ctx, m, u.color, r.height), this.drawTrendLine(n.ctx, w, u.color, u.lineWidth), a[u.slot] = w;
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
    if (Math.abs(l) <= ee)
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
    const t = {}, r = Object.keys(e).map((i) => Number(i)).filter((i) => Number.isFinite(i) && i >= 1 && i <= rt).sort((i, s) => i - s);
    if (r.length === 0)
      return t;
    const n = r[r.length - 1], o = e[n] ?? [];
    return o.length < 1 || r.forEach((i) => {
      const s = e[i] ?? [];
      s.length !== 0 && (t[i] = s.map((a) => {
        const l = this.interpolateTrendValue(o, a.ts);
        if (!Number.isFinite(l) || Math.abs(l) <= ee)
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
      if (Math.abs(a) <= ee)
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
    super.connectedCallback(), this.startLiveRuntime(!0), this.shouldRunLiveRuntime() || this.updateComplete.then(() => {
      this.updateGraphTopInset(), this.scheduleTrendCanvasDraw();
    });
  }
  disconnectedCallback() {
    this.clearHoverState(), this.stopLiveRuntime(), super.disconnectedCallback();
  }
  updated(e) {
    var t;
    (e.has("preview") || e.has("editMode")) && (this.shouldRunLiveRuntime() ? this.startLiveRuntime(!0) : this.stopLiveRuntime()), this.shouldRunLiveRuntime() ? (e.has("_config") ? (this.maybeRefreshTrendHistory(!0), this.clearHoverState()) : e.has("hass") && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this.syncTrendResizeObserver()) : this._trendResizeObserver && this._trendResizeObserver.disconnect(), ((t = this._config) == null ? void 0 : t.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset(), this.scheduleTrendCanvasDraw();
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
    if (!this.shouldRunLiveRuntime())
      return;
    e && (this._lastTrendRefresh = 0);
    const t = Date.now();
    !e && t - this._lastTrendRefresh < tr || (this._lastTrendRefresh = t, this.refreshTrendHistory());
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  shouldRunLiveRuntime() {
    return !this.isEditorPreview();
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, tr), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.updateGraphTopInset(), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
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
    for (let r = 1; r <= rt; r += 1) {
      const n = r;
      this.slotEnabled(n, e) && this.slotEntityId(n, e) && t.push(n);
    }
    return t;
  }
  async fetchTrendHistory(e, t) {
    return at(this.hass, e, t);
  }
};
W.styles = Oe`
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
Z([
  L({ attribute: !1 })
], W.prototype, "hass", 2);
Z([
  L({ type: Boolean })
], W.prototype, "preview", 2);
Z([
  L({ type: Boolean })
], W.prototype, "editMode", 2);
Z([
  P()
], W.prototype, "_config", 2);
Z([
  P()
], W.prototype, "_trendSeries", 2);
Z([
  P()
], W.prototype, "_graphTopInset", 2);
Z([
  P()
], W.prototype, "_hoverState", 2);
W = Z([
  ie("power-pilz-graph-stack-card")
], W);
var _o = Object.defineProperty, mo = Object.getOwnPropertyDescriptor, vt = (e, t, r, n) => {
  for (var o = n > 1 ? void 0 : n ? mo(t, r) : t, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = (n ? s(t, r, o) : s(o)) || o);
  return n && o && _o(t, r, o), o;
};
const po = [
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
], yo = {
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
let Le = class extends B {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = e.name ?? "";
      return yo[t] ?? t;
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
    return !this.hass || !this._config ? C : g`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${be}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${po}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
vt([
  L({ attribute: !1 })
], Le.prototype, "hass", 2);
vt([
  P()
], Le.prototype, "_config", 2);
Le = vt([
  ie("power-pilz-wallbox-card-editor")
], Le);
var vo = Object.defineProperty, se = (e, t, r, n) => {
  for (var o = void 0, i = e.length - 1, s; i >= 0; i--)
    (s = e[i]) && (o = s(t, r, o) || o);
  return o && vo(t, r, o), o;
};
const fo = 0.01, nr = "power-pilz-wallbox-mode-menu-portal-style", ft = class ft extends B {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._actionBusy = !1, this._modeMenuOpen = !1, this._modeMenuOptionCount = 0, this.toggleModeMenu = (t) => {
      var s;
      if (t.stopPropagation(), this.isEditorPreview() || !((s = this._config) != null && s.mode_entity) || this._actionBusy)
        return;
      const r = de(this.hass, this._config.mode_entity), n = (r == null ? void 0 : r.state) ?? "", o = this.getModeOptions(r);
      if (o.length === 0)
        return;
      if (this._modeMenuOpen) {
        this.closeModeMenuPortal();
        return;
      }
      const i = t.currentTarget;
      i && this.openModeMenuPortal(i, o, n || o[0] || "Mode");
    }, this.selectModeOption = async (t) => {
      var o;
      if (!((o = this._config) != null && o.mode_entity))
        return;
      const r = de(this.hass, this._config.mode_entity);
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
      const r = I(this.hass, this._config.power_entity), n = Ze(this.hass, this._config.status_entity), o = this.isCharging(n, r, this._config.command_entity), i = this.resolveActionCommand(o);
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
    const r = (t == null ? void 0 : t.states) ?? {}, n = Object.keys(r), o = (...c) => c.find((d) => d in r), i = (c) => n.find((d) => d.startsWith(`${c}.`)), s = o("sensor.dev_wallbox_power", "sensor.wallbox_power") ?? i("sensor") ?? "sensor.dev_wallbox_power", a = o("input_select.dev_wallbox_mode", "select.wallbox_charging_mode") ?? i("input_select") ?? i("select"), l = o("input_boolean.dev_wallbox_enabled", "switch.wallbox_charging_enabled") ?? i("input_boolean") ?? i("switch");
    return {
      type: "custom:power-pilz-wallbox-card",
      name: "Wallbox",
      power_entity: s,
      status_entity: o("sensor.dev_wallbox_status", "sensor.wallbox_status"),
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
      return g`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return g``;
    const t = this._config, r = I(this.hass, t.power_entity), n = F(this.hass, t.power_entity) ?? "kW", o = Ze(this.hass, t.status_entity), i = de(this.hass, t.mode_entity), s = (i == null ? void 0 : i.state) ?? "", a = this.getModeOptions(i), l = this.isCharging(o, r, t.command_entity), c = this.resolveActionCommand(l), d = l ? "Stop" : "Start", h = l ? "mdi:pause" : "mdi:play", _ = this.statusLabel(o, l), p = this.formatPower(r, n, t.decimals ?? 1), u = this.showModeSelector(t, a), f = this.showLiveValue(t), b = this.showCommandButton(t), m = this.isEditorPreview() || this._actionBusy || !t.mode_entity || a.length === 0, w = s || a[0] || "Mode", $ = this._modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down", T = this.iconStyle(t.icon_color), y = Number(f) + Number(b) === 1, v = u && f && b, S = y && f, M = y && b || v, R = S || M, E = f && !S, k = b && !M, N = u || E || k, H = u ? E || k ? k ? "actions" : "actions no-command" : "actions mode-only" : "actions no-mode";
    return (!u || m) && this._modeMenuOpen && this.closeModeMenuPortal(), g`
      <ha-card>
        <div class="container">
          <div class="state-item ${R ? "compact-state" : ""}">
            <div class="icon-wrap">
              <div class="icon-shape" style=${z(T)}>
                <ha-icon .icon=${t.icon ?? "mdi:ev-station"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${t.name}</div>
              <div class="secondary">EV charger</div>
            </div>

            ${R ? g`
                  <div class="compact-trailing ${M ? "button-only" : ""}">
                    ${S ? g`
                          <div class="compact-live-value">
                            <span>${_}</span>
                            <span class="dot">•</span>
                            <span>${p}</span>
                          </div>
                        ` : g``}

                    ${M ? g`
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
                        ` : g``}
                  </div>
                ` : g``}
          </div>

          ${N ? g`
                <div class=${H}>
                  ${u ? g`
                        <div class="mode-select-wrap">
                          <button
                            type="button"
                            class="mode-select"
                            ?disabled=${m}
                            @click=${this.toggleModeMenu}
                            aria-haspopup="listbox"
                            aria-expanded=${this._modeMenuOpen ? "true" : "false"}
                            title="Charging mode"
                          >
                            <span class="mode-select-label">${w}</span>
                            <ha-icon class="mode-select-chevron" .icon=${$}></ha-icon>
                          </button>
                        </div>
                      ` : g``}

                  ${E ? g`
                        <div class="live-value">
                          <span>${_}</span>
                          <span class="dot">•</span>
                          <span>${p}</span>
                        </div>
                      ` : g``}

                  ${k ? g`
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
                      ` : g``}
                </div>
              ` : g``}
        </div>
      </ha-card>
    `;
  }
  getModeOptions(t) {
    const r = t == null ? void 0 : t.attributes.options;
    if (Array.isArray(r)) {
      const n = r.filter(
        (o) => typeof o == "string" && o.trim().length > 0
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
    var o;
    if (t) {
      const i = t.toLowerCase();
      if (["charging", "active", "running", "on", "start", "started"].includes(i))
        return !0;
      if (["idle", "paused", "stopped", "off", "standby", "complete"].includes(i))
        return !1;
    }
    if (n) {
      const i = (o = Ze(this.hass, n)) == null ? void 0 : o.toLowerCase();
      if (i === "on")
        return !0;
      if (i === "off")
        return !1;
    }
    return r !== null && r > fo;
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
    return dt(t);
  }
  disconnectedCallback() {
    this.closeModeMenuPortal(), super.disconnectedCallback();
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  ensureModeMenuPortalStyles() {
    if (document.getElementById(nr))
      return;
    const t = document.createElement("style");
    t.id = nr, t.textContent = `
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
    const o = n.getBoundingClientRect(), i = 8, s = 6, a = Math.max(96, Math.min(280, window.innerHeight - i * 2)), l = Math.min(
      a,
      this._modeMenuOptionCount * 34 + Math.max(0, this._modeMenuOptionCount - 1) * 4 + 14
    ), c = r.offsetHeight > 0 ? Math.min(a, r.offsetHeight) : l, d = Math.max(120, Math.round(o.width)), h = window.innerHeight - o.bottom - i, _ = h < c + s && o.top - i > h;
    let p = o.left;
    p = Math.max(i, Math.min(p, window.innerWidth - d - i));
    let u = _ ? o.top - s - c : o.bottom + s;
    u = Math.max(i, Math.min(u, window.innerHeight - c - i)), r.style.maxHeight = `${a}px`, r.style.width = `${d}px`, r.style.left = `${Math.round(p)}px`, r.style.top = `${Math.round(u)}px`;
  }
  openModeMenuPortal(t, r, n) {
    this.closeModeMenuPortal(), this.ensureModeMenuPortalStyles();
    const o = document.createElement("div");
    o.className = "power-pilz-mode-menu-backdrop", o.addEventListener("click", () => {
      this.closeModeMenuPortal();
    });
    const i = document.createElement("div");
    i.className = "power-pilz-mode-menu-portal", i.setAttribute("role", "listbox"), r.forEach((s) => {
      const a = document.createElement("button");
      a.type = "button", a.className = `power-pilz-mode-menu-option ${s === n ? "selected" : ""}`, a.dataset.option = s, a.setAttribute("role", "option"), a.setAttribute("aria-selected", s === n ? "true" : "false"), a.textContent = s, a.addEventListener("click", (l) => {
        var d;
        l.stopPropagation();
        const c = ((d = l.currentTarget) == null ? void 0 : d.dataset.option) ?? "";
        c && (this.closeModeMenuPortal(), this.selectModeOption(c));
      }), i.append(a);
    }), document.body.append(o), document.body.append(i), this._modeMenuBackdrop = o, this._modeMenuPortal = i, this._modeMenuOptionCount = r.length, this._modeMenuOpen = !0, this.positionModeMenuPortal(t);
  }
  closeModeMenuPortal() {
    this._modeMenuPortal && (this._modeMenuPortal.remove(), this._modeMenuPortal = void 0), this._modeMenuBackdrop && (this._modeMenuBackdrop.remove(), this._modeMenuBackdrop = void 0), this._modeMenuOptionCount = 0, this._modeMenuOpen && (this._modeMenuOpen = !1);
  }
};
ft.styles = Oe`
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
let U = ft;
se([
  L({ attribute: !1 })
], U.prototype, "hass");
se([
  L({ type: Boolean })
], U.prototype, "preview");
se([
  L({ type: Boolean })
], U.prototype, "editMode");
se([
  L({ reflect: !0, type: String })
], U.prototype, "layout");
se([
  P()
], U.prototype, "_config");
se([
  P()
], U.prototype, "_actionBusy");
se([
  P()
], U.prototype, "_modeMenuOpen");
class bo extends U {
}
customElements.get("power-pilz-wallbox-card") || customElements.define("power-pilz-wallbox-card", U);
customElements.get("power-pilz-wallbox-card-v2") || customElements.define("power-pilz-wallbox-card-v2", bo);
window.customCards = window.customCards || [];
const go = [
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
for (const e of go)
  window.customCards.some((t) => t.type === e.type) || window.customCards.push(e);
console.info(
  `%cPOWER PILZ%c v${be}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
//# sourceMappingURL=power-pilz.js.map
