/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Oe = globalThis, ct = Oe.ShadowRoot && (Oe.ShadyCSS === void 0 || Oe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, dt = Symbol(), Vt = /* @__PURE__ */ new WeakMap();
let yr = class {
  constructor(t, r, n) {
    if (this._$cssResult$ = !0, n !== dt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (ct && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = Vt.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Vt.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const vn = (e) => new yr(typeof e == "string" ? e : e + "", void 0, dt), Ve = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, i, s) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[s + 1], e[0]);
  return new yr(r, e, dt);
}, gn = (e, t) => {
  if (ct) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), i = Oe.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = r.cssText, e.appendChild(n);
  }
}, Dt = ct ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return vn(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: wn, defineProperty: Sn, getOwnPropertyDescriptor: xn, getOwnPropertyNames: Cn, getOwnPropertySymbols: $n, getPrototypeOf: Tn } = Object, X = globalThis, Ft = X.trustedTypes, Mn = Ft ? Ft.emptyScript : "", Qe = X.reactiveElementPolyfillSupport, pe = (e, t) => e, Pe = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Mn : null;
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
} }, ht = (e, t) => !wn(e, t), Ut = { attribute: !0, type: String, converter: Pe, reflect: !1, useDefault: !1, hasChanged: ht };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), X.litPropertyMetadata ?? (X.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let de = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Ut) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, r);
      i !== void 0 && Sn(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: i, set: s } = xn(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Ut;
  }
  static _$Ei() {
    if (this.hasOwnProperty(pe("elementProperties"))) return;
    const t = Tn(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(pe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(pe("properties"))) {
      const r = this.properties, n = [...Cn(r), ...$n(r)];
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
      for (const i of n) r.unshift(Dt(i));
    } else t !== void 0 && r.push(Dt(t));
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
    return gn(t, this.constructor.elementStyles), t;
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
      const o = (((s = n.converter) == null ? void 0 : s.toAttribute) !== void 0 ? n.converter : Pe).toAttribute(r, n.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var s, o;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = n.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((s = a.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? a.converter : Pe;
      this._$Em = i;
      const c = l.fromAttribute(r, a.type);
      this[i] = c ?? ((o = this._$Ej) == null ? void 0 : o.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, r, n, i = !1, s) {
    var o;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (s = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? ht)(s, r) || n.useDefault && n.reflect && s === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
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
de.elementStyles = [], de.shadowRootOptions = { mode: "open" }, de[pe("elementProperties")] = /* @__PURE__ */ new Map(), de[pe("finalized")] = /* @__PURE__ */ new Map(), Qe == null || Qe({ ReactiveElement: de }), (X.reactiveElementVersions ?? (X.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fe = globalThis, jt = (e) => e, Ie = fe.trustedTypes, Gt = Ie ? Ie.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, pr = "$lit$", K = `lit$${Math.random().toFixed(9).slice(2)}$`, fr = "?" + K, Rn = `<${fr}>`, ne = document, be = () => ne.createComment(""), ve = (e) => e === null || typeof e != "object" && typeof e != "function", ut = Array.isArray, En = (e) => ut(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", et = `[ 	
\f\r]`, me = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Wt = /-->/g, qt = />/g, Q = RegExp(`>|${et}(?:([^\\s"'>=/]+)(${et}*=${et}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Kt = /'/g, Xt = /"/g, br = /^(?:script|style|textarea|title)$/i, zn = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), $ = zn(1), ie = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), Yt = /* @__PURE__ */ new WeakMap(), te = ne.createTreeWalker(ne, 129);
function vr(e, t) {
  if (!ut(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Gt !== void 0 ? Gt.createHTML(t) : t;
}
const An = (e, t) => {
  const r = e.length - 1, n = [];
  let i, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = me;
  for (let a = 0; a < r; a++) {
    const l = e[a];
    let c, d, h = -1, u = 0;
    for (; u < l.length && (o.lastIndex = u, d = o.exec(l), d !== null); ) u = o.lastIndex, o === me ? d[1] === "!--" ? o = Wt : d[1] !== void 0 ? o = qt : d[2] !== void 0 ? (br.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = Q) : d[3] !== void 0 && (o = Q) : o === Q ? d[0] === ">" ? (o = i ?? me, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? Q : d[3] === '"' ? Xt : Kt) : o === Xt || o === Kt ? o = Q : o === Wt || o === qt ? o = me : (o = Q, i = void 0);
    const _ = o === Q && e[a + 1].startsWith("/>") ? " " : "";
    s += o === me ? l + Rn : h >= 0 ? (n.push(c), l.slice(0, h) + pr + l.slice(h) + K + _) : l + K + (h === -2 ? a : _);
  }
  return [vr(e, s + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ge {
  constructor({ strings: t, _$litType$: r }, n) {
    let i;
    this.parts = [];
    let s = 0, o = 0;
    const a = t.length - 1, l = this.parts, [c, d] = An(t, r);
    if (this.el = ge.createElement(c, n), te.currentNode = this.el.content, r === 2 || r === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = te.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(pr)) {
          const u = d[o++], _ = i.getAttribute(h).split(K), y = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: s, name: y[2], strings: _, ctor: y[1] === "." ? Pn : y[1] === "?" ? In : y[1] === "@" ? kn : De }), i.removeAttribute(h);
        } else h.startsWith(K) && (l.push({ type: 6, index: s }), i.removeAttribute(h));
        if (br.test(i.tagName)) {
          const h = i.textContent.split(K), u = h.length - 1;
          if (u > 0) {
            i.textContent = Ie ? Ie.emptyScript : "";
            for (let _ = 0; _ < u; _++) i.append(h[_], be()), te.nextNode(), l.push({ type: 2, index: ++s });
            i.append(h[u], be());
          }
        }
      } else if (i.nodeType === 8) if (i.data === fr) l.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(K, h + 1)) !== -1; ) l.push({ type: 7, index: s }), h += K.length - 1;
      }
      s++;
    }
  }
  static createElement(t, r) {
    const n = ne.createElement("template");
    return n.innerHTML = t, n;
  }
}
function ue(e, t, r = e, n) {
  var o, a;
  if (t === ie) return t;
  let i = n !== void 0 ? (o = r._$Co) == null ? void 0 : o[n] : r._$Cl;
  const s = ve(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== s && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), s === void 0 ? i = void 0 : (i = new s(e), i._$AT(e, r, n)), n !== void 0 ? (r._$Co ?? (r._$Co = []))[n] = i : r._$Cl = i), i !== void 0 && (t = ue(e, i._$AS(e, t.values), i, n)), t;
}
class On {
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
    const { el: { content: r }, parts: n } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? ne).importNode(r, !0);
    te.currentNode = i;
    let s = te.nextNode(), o = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new we(s, s.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (c = new Nn(s, this, t)), this._$AV.push(c), l = n[++a];
      }
      o !== (l == null ? void 0 : l.index) && (s = te.nextNode(), o++);
    }
    return te.currentNode = ne, i;
  }
  p(t) {
    let r = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, r), r += n.strings.length - 2) : n._$AI(t[r])), r++;
  }
}
class we {
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
    t = ue(this, t, r), ve(t) ? t === T || t == null || t === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== ie && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : En(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== T && ve(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ne.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: r, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ge.createElement(vr(n.h, n.h[0]), this.options)), n);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === i) this._$AH.p(r);
    else {
      const o = new On(i, this), a = o.u(this.options);
      o.p(r), this.T(a), this._$AH = o;
    }
  }
  _$AC(t) {
    let r = Yt.get(t.strings);
    return r === void 0 && Yt.set(t.strings, r = new ge(t)), r;
  }
  k(t) {
    ut(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let n, i = 0;
    for (const s of t) i === r.length ? r.push(n = new we(this.O(be()), this.O(be()), this, this.options)) : n = r[i], n._$AI(s), i++;
    i < r.length && (this._$AR(n && n._$AB.nextSibling, i), r.length = i);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, r); t !== this._$AB; ) {
      const i = jt(t).nextSibling;
      jt(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 && (this._$Cv = t, (r = this._$AP) == null || r.call(this, t));
  }
}
class De {
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
    if (s === void 0) t = ue(this, t, r, 0), o = !ve(t) || t !== this._$AH && t !== ie, o && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = s[0], l = 0; l < s.length - 1; l++) c = ue(this, a[n + l], r, l), c === ie && (c = this._$AH[l]), o || (o = !ve(c) || c !== this._$AH[l]), c === T ? t = T : t !== T && (t += (c ?? "") + s[l + 1]), this._$AH[l] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Pn extends De {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }
}
class In extends De {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== T);
  }
}
class kn extends De {
  constructor(t, r, n, i, s) {
    super(t, r, n, i, s), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = ue(this, t, r, 0) ?? T) === ie) return;
    const n = this._$AH, i = t === T && n !== T || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== T && (n === T || i);
    i && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Nn {
  constructor(t, r, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ue(this, t);
  }
}
const tt = fe.litHtmlPolyfillSupport;
tt == null || tt(ge, we), (fe.litHtmlVersions ?? (fe.litHtmlVersions = [])).push("3.3.2");
const Ln = (e, t, r) => {
  const n = (r == null ? void 0 : r.renderBefore) ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const s = (r == null ? void 0 : r.renderBefore) ?? null;
    n._$litPart$ = i = new we(t.insertBefore(be(), s), s, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = globalThis;
let V = class extends de {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ln(r, this.renderRoot, this.renderOptions);
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
    return ie;
  }
};
var mr;
V._$litElement$ = !0, V.finalized = !0, (mr = re.litElementHydrateSupport) == null || mr.call(re, { LitElement: V });
const rt = re.litElementPolyfillSupport;
rt == null || rt({ LitElement: V });
(re.litElementVersions ?? (re.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bn = { attribute: !0, type: String, converter: Pe, reflect: !1, hasChanged: ht }, Hn = (e = Bn, t, r) => {
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
  return (t, r) => typeof r == "object" ? Hn(e, t, r) : ((n, i, s) => {
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
const Vn = { ATTRIBUTE: 1 }, Dn = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Fn = class {
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
const gr = "important", Un = " !" + gr, E = Dn(class extends Fn {
  constructor(e) {
    var t;
    if (super(e), e.type !== Vn.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const s = typeof i == "string" && i.endsWith(Un);
        n.includes("-") || s ? r.setProperty(n, s ? i.slice(0, -11) : i, s ? gr : "") : r[n] = i;
      }
    }
    return ie;
  }
}), he = (e, t) => {
  if (t)
    return e.states[t];
}, L = (e, t) => {
  const r = he(e, t);
  if (!r)
    return null;
  const n = Number(r.state);
  return Number.isFinite(n) ? n : null;
}, H = (e, t) => {
  const r = he(e, t);
  if (!r)
    return;
  const n = r.attributes.unit_of_measurement;
  return typeof n == "string" ? n : void 0;
}, nt = (e, t) => {
  const r = he(e, t);
  return r == null ? void 0 : r.state;
}, jn = 3e4, Gn = 1440, Wn = 1e4, qn = 2e3, Jt = /* @__PURE__ */ new Map(), it = /* @__PURE__ */ new Map(), wr = (e, t = Gn) => {
  if (e.length <= t)
    return e;
  if (t <= 2)
    return [e[0], e[e.length - 1]];
  const r = e.slice(1, -1), n = Math.max(1, Math.floor((t - 2) / 2)), i = r.length / n, s = [e[0]];
  for (let l = 0; l < n; l += 1) {
    const c = Math.floor(l * i), d = Math.max(c + 1, Math.floor((l + 1) * i)), h = r.slice(c, d);
    if (h.length === 0)
      continue;
    let u = h[0], _ = h[0];
    for (const y of h)
      y.value < u.value && (u = y), y.value > _.value && (_ = y);
    if (u.ts <= _.ts ? (s.push(u), _ !== u && s.push(_)) : (s.push(_), u !== _ && s.push(u)), s.length >= t - 1)
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
}, Kn = (e, t) => {
  const r = t ? Wn : qn;
  return !Number.isFinite(e) || e <= 0 || r <= 1 ? Math.max(0, Math.floor(e)) : Math.max(0, Math.floor(e / r) * r);
}, Xn = (e) => {
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
}, ke = (e, t, r) => {
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
  }), wr(i);
}, Yn = (e, t, r = Date.now()) => {
  if (!Array.isArray(e))
    return { entityId: null, points: [] };
  const n = [];
  let i = null;
  for (const a of e) {
    if (!a || typeof a != "object")
      continue;
    const l = a;
    i === null && typeof l.entity_id == "string" && l.entity_id.length > 0 && (i = l.entity_id);
    const c = Number(l.state), d = Xn(l);
    !Number.isFinite(c) || d === null || n.push({ ts: d, value: c });
  }
  const s = r - t, o = n.filter((a) => a.ts >= s).sort((a, l) => a.ts - l.ts);
  return {
    entityId: i,
    points: wr(o)
  };
}, Zt = (e, t) => `${e}|${t}`, Me = (e) => e.map((t) => ({ ts: t.ts, value: t.value })), _e = async (e, t, r, n) => {
  const i = e.callApi, s = Array.from(new Set(t.filter((v) => v.length > 0)));
  if (!i || s.length === 0)
    return {};
  const o = Date.now(), a = typeof (n == null ? void 0 : n.startMs) == "number" && Number.isFinite(n.startMs) ? Math.max(o - r, Math.floor(n.startMs)) : o - r, l = a <= o - r + 1e3, c = Kn(a, l), d = {}, h = [];
  if (s.forEach((v) => {
    if (l) {
      const p = Zt(v, r), m = Jt.get(p);
      if (m && m.expiresAt > o) {
        d[v] = Me(m.points);
        return;
      }
    }
    h.push(v);
  }), h.length === 0)
    return d;
  const u = [...h].sort(), _ = `${c}|${r}|${u.join(",")}`, y = it.get(_);
  if (y) {
    const v = await y;
    return h.forEach((p) => {
      d[p] = Me(v[p] ?? []);
    }), d;
  }
  const x = (async () => {
    const v = new Date(c).toISOString(), p = h.join(","), m = `history/period/${v}?filter_entity_id=${encodeURIComponent(p)}&minimal_response&no_attributes`;
    let g;
    try {
      g = await i("GET", m);
    } catch {
      const b = {};
      return h.forEach((w) => {
        b[w] = [];
      }), b;
    }
    const S = Array.isArray(g) ? g : [], f = {};
    return S.forEach((b, w) => {
      const C = Yn(b, r, o), M = h[w], R = C.entityId ?? M;
      R && (f[R] = C.points);
    }), h.forEach((b) => {
      b in f || (f[b] = []), l && Jt.set(Zt(b, r), {
        expiresAt: o + jn,
        points: Me(f[b])
      });
    }), f;
  })();
  it.set(_, x);
  try {
    const v = await x;
    return h.forEach((p) => {
      d[p] = Me(v[p] ?? []);
    }), d;
  } finally {
    it.delete(_);
  }
}, Qt = {
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
}, _t = (e) => {
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
  if (t in Qt)
    return `var(--rgb-${t}, ${Qt[t]})`;
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
}, mt = (e, t = "") => {
  const r = _t(e);
  if (r)
    return `rgb(${r})`;
  if (typeof e == "string" && e.trim().length > 0) {
    const n = e.trim(), i = n.toLowerCase();
    if (i !== "none" && i !== "default")
      return n;
  }
  return t;
}, yt = (e) => {
  const t = _t(e);
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
}, pt = (e, t, r) => {
  const n = e.map((i) => ({
    x: i.x / 100 * t,
    y: i.y / 100 * r,
    value: i.value
  }));
  return Jn(n, t);
}, Jn = (e, t) => {
  if (e.length <= 3)
    return e;
  const r = Math.max(24, Math.min(e.length, Math.round(t)));
  if (e.length <= r)
    return er(e);
  const n = [];
  n.push(e[0]);
  const i = (e.length - 1) / (r - 1);
  for (let s = 1; s < r - 1; s += 1) {
    const o = Math.floor(s * i), a = Math.max(o + 1, Math.floor((s + 1) * i)), l = e.slice(o, Math.min(e.length, a));
    if (l.length === 0)
      continue;
    const c = l.reduce(
      (h, u) => (h.x += u.x, h.y += u.y, h.value += u.value, h),
      { x: 0, y: 0, value: 0 }
    ), d = l.length;
    n.push({
      x: c.x / d,
      y: c.y / d,
      value: c.value / d
    });
  }
  return n.push(e[e.length - 1]), er(n);
}, er = (e) => {
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
}, Se = "0.1.14";
var Zn = Object.defineProperty, Qn = Object.getOwnPropertyDescriptor, ft = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Qn(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && Zn(t, r, i), i;
};
const ei = 4, ti = 8, tr = 2, ri = (e, t) => {
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
}, Re = (e, t, r, n) => ({
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
    schema: ri(e, s + 1)
  }))
}), ni = [
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
      { name: "home_auto_calculate", selector: { boolean: {} } },
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
      },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "shared_trend_scale", selector: { boolean: {} } },
          { name: "debug_performance", selector: { boolean: {} } }
        ]
      }
    ]
  },
  Re("solar", "Solar sub blocks", "mdi:solar-power-variant", ei),
  Re("grid", "Grid 1 sub blocks", "mdi:transmission-tower", tr),
  Re("grid_secondary", "Grid 2 sub blocks", "mdi:transmission-tower", tr),
  Re("home", "Home sub blocks", "mdi:flash", ti),
  {
    type: "grid",
    name: "",
    schema: [
      { name: "unit", selector: { text: {} } },
      { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } }
    ]
  }
], ii = {
  name: "Name",
  home_visible: "Show home node",
  solar_visible: "Show solar node",
  grid_visible: "Show grid node",
  grid_secondary_visible: "Show second grid node",
  battery_visible: "Show battery node",
  battery_secondary_visible: "Show second battery node",
  battery_dual_alignment: "Dual battery alignment",
  home_auto_calculate: "Auto-calculate home value",
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
  shared_trend_scale: "Shared scale for all node trends",
  debug_performance: "Enable debug performance logs",
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
let Ne = class extends V {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = e.name ?? "", r = t.match(/^(solar|home|grid|grid_secondary)_sub_(\d+)_(enabled|entity|label|icon|icon_color)$/);
      if (r) {
        const [, n, i, s] = r;
        return `${n === "solar" ? "Solar" : n === "home" ? "Home" : n === "grid" ? "Grid 1" : "Grid 2"} block ${i} ${{
          enabled: "Enabled",
          entity: "Entity",
          label: "Label",
          icon: "Icon",
          icon_color: "Color"
        }[s] ?? s}`;
      }
      return ii[t] ?? t;
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
      debug_performance: e.debug_performance ?? !1,
      type: "custom:power-pilz-energy-card"
    };
  }
  render() {
    return !this.hass || !this._config ? T : $`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Se}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${ni}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
ft([
  I({ attribute: !1 })
], Ne.prototype, "hass", 2);
ft([
  P()
], Ne.prototype, "_config", 2);
Ne = ft([
  se("power-pilz-energy-card-editor")
], Ne);
var si = Object.defineProperty, oi = Object.getOwnPropertyDescriptor, Y = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? oi(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && si(t, r, i), i;
};
const B = 0.01, st = 1, ce = 1440 * 60 * 1e3, rr = 300 * 1e3, nr = 60 * 1e3, ai = 350, ir = 4, sr = 8, ot = 2, li = 12, or = 7, ci = 6, di = 400, hi = 300, ui = "var(--rgb-primary-text-color, 33, 33, 33)";
let j = class extends V {
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
      decimals: st
    };
  }
  setConfig(e) {
    const t = e.home_entity ?? e.consumption_entity ?? "sensor.dev_home_power", r = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : st;
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
    const e = this._config, t = e.decimals ?? st, r = e.home_visible !== !1, n = e.solar_visible !== !1, i = e.grid_visible !== !1, s = i && e.grid_secondary_visible === !0, o = e.battery_visible !== !1, a = o && e.battery_secondary_visible === !0, l = this.normalizeBatteryDualAlignment(e.battery_dual_alignment), c = L(this.hass, e.home_entity), d = n ? L(this.hass, e.solar_entity) : null, h = i ? L(this.hass, e.grid_entity) : null, u = s ? L(this.hass, e.grid_secondary_entity) : null, _ = o ? L(this.hass, e.battery_entity) : null, y = L(this.hass, e.battery_percentage_entity), x = a ? L(this.hass, e.battery_secondary_entity) : null, v = L(this.hass, e.battery_secondary_percentage_entity), p = e.home_auto_calculate === !0 ? this.computeAutoHomeValueFromNodeValues({
      solar: d,
      grid: h,
      grid_secondary: u,
      battery: _,
      battery_secondary: x
    }) : c, m = e.unit ?? "kW", g = H(this.hass, e.solar_entity) ?? m, S = e.home_auto_calculate === !0 ? this.resolveAutoHomeUnit(e, m) : H(this.hass, e.home_entity) ?? m, f = H(this.hass, e.grid_entity) ?? m, b = H(this.hass, e.grid_secondary_entity) ?? m, w = H(this.hass, e.battery_entity) ?? m, C = H(this.hass, e.battery_secondary_entity) ?? m, M = this.toUnidirectionalFlow(d), R = this.toUnidirectionalFlow(p), z = this.toBidirectionalFlow(h), A = this.toBidirectionalFlow(u), k = h === null && u === null ? "none" : this.toBidirectionalFlow((h ?? 0) + (u ?? 0)), D = this.toBidirectionalFlow(_), Hr = this.toBidirectionalFlow(x), Vr = _ === null && x === null ? "none" : this.toBidirectionalFlow((_ ?? 0) + (x ?? 0)), Dr = this.resolveTapAction(e), Fe = !this.isEditorPreview() && Dr.action !== "none", Fr = this.iconColorStyle(e.solar_icon_color), Ur = this.iconColorStyle(e.grid_icon_color), jr = this.iconColorStyle(e.grid_secondary_icon_color), Gr = this.iconColorStyle(e.home_icon_color), Wr = this.iconShapeStyle(e.core_icon_color), Ue = n ? this.collectSubBlocks("solar", e) : [], Ct = i ? this.collectSubBlocks("grid", e) : [], $t = s ? this.collectSubBlocks("grid_secondary", e) : [], je = r ? this.collectSubBlocks("home", e) : [], Ge = new Set(je.map((O) => O.index)), ae = new Set(Ue.map((O) => O.index)), qr = Ge.has(7) && Ge.has(8), Kr = [5, 6, 7, 8].some((O) => Ge.has(O)), Xr = ae.has(1) && ae.has(2) && !ae.has(3) && !ae.has(4), Yr = ae.has(3) && ae.has(4), Tt = s && (Xr && qr || Yr && Kr), Jr = s && !Tt, We = je.some((O) => O.index >= 7), Mt = this.homeSubPositions(We), Rt = this.gridSubPositions(s), Et = this.gridSecondarySubPositions(), zt = this.solarSubPositions(
      We,
      Jr,
      Tt
    ), At = je.filter((O) => O.index <= (We ? 8 : 6)), qe = i ? { col: 1, row: s ? 2 : 3, colSpan: 2, rowSpan: 2 } : null, Ke = s ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 } : null, Xe = o ? {
      col: a && l === "center" ? 2 : 3,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, Ye = a ? {
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
      qe,
      Ke,
      Xe,
      Ye,
      Ue,
      Ct,
      $t,
      At,
      zt,
      Rt,
      Et,
      Mt
    ), Je = n ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, N) : null, xe = qe ? this.normalizePlacement(qe, N) : null, Ce = Ke ? this.normalizePlacement(Ke, N) : null, Ze = r ? this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, N) : null, $e = Xe ? this.normalizePlacement(Xe, N) : null, Te = Ye ? this.normalizePlacement(Ye, N) : null, Ot = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, N), Zr = this.normalizePositions(zt, N), Qr = this.normalizePositions(Rt, N), en = this.normalizePositions(Et, N), tn = this.normalizePositions(Mt, N), Pt = this.normalizeBatteryThreshold(e.battery_low_threshold), It = !!e.battery_low_alert, kt = this.normalizeBatteryThreshold(e.battery_secondary_low_threshold), Nt = !!e.battery_secondary_low_alert, Lt = It && y !== null && y <= Pt, rn = this.iconColorStyle(Lt ? "red" : e.battery_icon_color), nn = this.batteryIcon(y, _, e.battery_icon), Bt = Nt && v !== null && v <= kt, sn = this.iconColorStyle(
      Bt ? "red" : e.battery_secondary_icon_color
    ), on = this.batteryIcon(
      v,
      x,
      e.battery_secondary_icon
    ), an = { "--flow-color-rgb": this.toRgbCss(e.flow_color) ?? ui }, le = this.resolveColor("purple"), ln = this.resolveColor(e.solar_trend_color, le), cn = this.resolveColor(e.grid_trend_color, le), dn = this.resolveColor(e.grid_secondary_trend_color, le), hn = this.resolveColor(e.home_trend_color, le), un = this.resolveColor(e.battery_trend_color, le), _n = this.resolveColor(e.battery_secondary_trend_color, le), Ht = this.resolveColor("red"), mn = It && (e.battery_percentage_entity || y !== null) ? Pt : null, yn = y ?? _, pn = Nt && (e.battery_secondary_percentage_entity || v !== null) ? kt : null, fn = v ?? x, bn = this.buildFlowSegments(
      Ze,
      Ot,
      Je,
      [
        ...xe ? [{ placement: xe, direction: z }] : [],
        ...Ce ? [{ placement: Ce, direction: A }] : []
      ],
      k,
      [
        ...$e ? [{ placement: $e, direction: D }] : [],
        ...Te ? [{ placement: Te, direction: Hr }] : []
      ],
      Vr,
      M,
      R,
      N
    );
    return $`
      <ha-card
        class=${Fe ? "interactive" : ""}
        tabindex=${Fe ? 0 : -1}
        role=${Fe ? "button" : "article"}
        @click=${this.handleCardClick}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div
            class="energy-grid"
            style=${E({
      ...an,
      "--grid-columns": `${N.cols}`,
      "--grid-rows": `${N.rows}`,
      "--grid-aspect": `${N.cols} / ${N.rows}`
    })}
          >
            ${bn.map(
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

            ${n && Je ? $`
                  <div
                    class="energy-value solar ${d === null ? "missing" : ""}"
                    style=${E(this.gridPlacementStyle(Je))}
                  >
                    ${this.renderTrend("solar", d, !!e.solar_trend, ln, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.solar_icon ?? "mdi:weather-sunny"}
                        style=${E(Fr)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(d, g, t)}</div>
                      <div class="energy-label">${e.solar_label}</div>
                    </div>
                  </div>
                ` : T}

            ${i && xe ? $`
                  <div
                    class="energy-value grid ${h === null ? "missing" : ""}"
                    style=${E(this.gridPlacementStyle(xe))}
                  >
                    ${this.renderTrend("grid", h, !!e.grid_trend, cn, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_icon ?? "mdi:transmission-tower"}
                        style=${E(Ur)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(h, f, t)}</div>
                      <div class="energy-label">${e.grid_label}</div>
                    </div>
                  </div>
                ` : T}

            ${s && Ce ? $`
                  <div
                    class="energy-value grid-secondary ${u === null ? "missing" : ""}"
                    style=${E(this.gridPlacementStyle(Ce))}
                  >
                    ${this.renderTrend(
      "grid_secondary",
      u,
      !!e.grid_secondary_trend,
      dn,
      null,
      ""
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${E(jr)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(u, b, t)}</div>
                      <div class="energy-label">${e.grid_secondary_label}</div>
                    </div>
                  </div>
                ` : T}

            ${r && Ze ? $`
                  <div
                    class="energy-value home ${p === null ? "missing" : ""}"
                    style=${E(this.gridPlacementStyle(Ze))}
                  >
                    ${this.renderTrend("home", p, !!e.home_trend, hn, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.home_icon ?? "mdi:home-lightning-bolt"}
                        style=${E(Gr)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(p, S, t)}</div>
                      <div class="energy-label">${e.home_label}</div>
                    </div>
                  </div>
                ` : T}

            ${this._showSubBlocks ? this.renderSubNodes("solar", Ue, Zr, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("grid", Ct, Qr, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("grid_secondary", $t, en, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("home", At, tn, t) : T}

            ${o && $e ? $`
                  <div
                    class="energy-value battery ${_ === null ? "missing" : ""}"
                    style=${E(this.gridPlacementStyle($e))}
                  >
                    ${this.renderTrend(
      "battery",
      yn,
      !!e.battery_trend,
      un,
      mn,
      Ht
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon class="energy-icon" .icon=${nn} style=${E(rn)}></ha-icon>
                        ${y !== null ? $`
                              <div class="battery-percentage ${Lt ? "alert" : ""}">
                                ${this.formatBatteryPercentage(y)}
                              </div>
                            ` : T}
                      </div>
                      <div class="energy-number">${this.formatValue(_, w, t)}</div>
                      <div class="energy-label">${e.battery_label}</div>
                    </div>
                  </div>
                ` : T}

            ${a && Te ? $`
                  <div
                    class="energy-value battery-secondary ${x === null ? "missing" : ""}"
                    style=${E(this.gridPlacementStyle(Te))}
                  >
                    ${this.renderTrend(
      "battery_secondary",
      fn,
      !!e.battery_secondary_trend,
      _n,
      pn,
      Ht
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${on}
                          style=${E(sn)}
                        ></ha-icon>
                        ${v !== null ? $`
                              <div class="battery-percentage ${Bt ? "alert" : ""}">
                                ${this.formatBatteryPercentage(v)}
                              </div>
                            ` : T}
                      </div>
                      <div class="energy-number">${this.formatValue(x, C, t)}</div>
                      <div class="energy-label">${e.battery_secondary_label}</div>
                    </div>
                  </div>
                ` : T}

            <div class="home-core" style=${E(this.gridPlacementStyle(Ot))}>
              <div class="home-core-icon" style=${E(Wr)}>
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
    return $`<div class=${n} style=${E(r)} aria-hidden="true"></div>`;
  }
  renderSubNodeConnectors() {
    return !this._showSubBlocks || this._subNodeConnectorSegments.length === 0 ? T : $`
      <div class="subnode-connectors" aria-hidden="true">
        ${this._subNodeConnectorSegments.map(
      (e) => $`
            <div
              class="subnode-connector-segment ${e.node}"
              style=${E({
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
    const r = [], n = e === "solar" ? "mdi:solar-power-variant" : e === "home" ? "mdi:flash" : "mdi:transmission-tower", i = e === "solar" ? "Solar" : e === "home" ? "Home" : e === "grid" ? "Grid" : "Grid 2", s = e === "solar" ? ir : e === "home" ? sr : ot;
    for (let h = 1; h <= s; h += 1) {
      const u = t[`${e}_sub_${h}_enabled`] === !0, _ = this.readConfigString(t[`${e}_sub_${h}_entity`]);
      !u || !_ || r.push({
        key: `${e}_${h}`,
        index: h,
        icon: this.readConfigString(t[`${e}_sub_${h}_icon`]) ?? n,
        iconStyle: this.iconColorStyle(t[`${e}_sub_${h}_icon_color`]),
        label: this.readConfigString(t[`${e}_sub_${h}_label`]) ?? `${i} ${h}`,
        value: L(this.hass, _),
        unit: H(this.hass, _) ?? t.unit ?? "kW"
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
        unit: H(this.hass, a) ?? t.unit ?? "kW"
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
  computeGridBounds(e, t, r, n, i, s, o, a, l, c, d, h, u, _, y, x, v, p) {
    const m = [{ col: 3, row: 3, colSpan: 2, rowSpan: 2 }];
    e && m.push({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }), t && m.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }), r && o && m.push(o), n && a && m.push(a), i && l && m.push(l), s && c && m.push(c), d.forEach((w) => {
      const C = y[w.index];
      C && m.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), h.forEach((w) => {
      const C = x[w.index];
      C && m.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), u.forEach((w) => {
      const C = v[w.index];
      C && m.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    }), _.forEach((w) => {
      const C = p[w.index];
      C && m.push({ col: C.col, row: C.row, colSpan: 1, rowSpan: 1 });
    });
    const g = Math.min(...m.map((w) => w.col)), S = Math.max(...m.map((w) => w.col + (w.colSpan ?? 1) - 1)), f = Math.min(...m.map((w) => w.row)), b = Math.max(...m.map((w) => w.row + (w.rowSpan ?? 1) - 1));
    return {
      minCol: g,
      maxCol: S,
      minRow: f,
      maxRow: b,
      cols: S - g + 1,
      rows: b - f + 1
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
    const d = this.placementCenter(t, c), h = [], u = (y, x, v, p) => {
      const m = Math.min(y, x), g = Math.abs(x - y);
      g <= B || h.push({
        orientation: "horizontal",
        direction: p,
        left: m,
        top: v,
        width: g,
        height: 0
      });
    }, _ = (y, x, v, p) => {
      const m = Math.min(y, x), g = Math.abs(x - y);
      g <= B || h.push({
        orientation: "vertical",
        direction: p,
        left: v,
        top: m,
        width: 0,
        height: g
      });
    };
    if (e) {
      const y = this.placementCenter(e, c);
      u(d.x, y.x, d.y, l);
    }
    if (r) {
      const y = this.placementCenter(r, c);
      _(y.y, d.y, d.x, a);
    }
    if (n.length === 1) {
      const [{ placement: y, direction: x }] = n, v = this.placementCenter(y, c);
      u(v.x, d.x, d.y, x);
    } else if (n.length >= 2) {
      const y = n.map((p) => ({
        direction: p.direction,
        center: this.placementCenter(p.placement, c)
      })).sort((p, m) => p.center.y - m.center.y), x = Math.min(...y.map((p) => p.center.x)), v = d.x - (d.x - x) * 0.5;
      u(d.x, v, d.y, i), y.forEach((p) => {
        const m = p.center.y > d.y + B ? this.reverseFlowDirection(p.direction) : p.direction;
        _(d.y, p.center.y, v, m), u(p.center.x, v, p.center.y, p.direction);
      });
    }
    if (s.length === 1) {
      const [{ placement: y, direction: x }] = s, v = this.placementCenter(y, c);
      _(d.y, v.y, d.x, x);
    } else if (s.length >= 2) {
      const y = s.map((p) => ({
        placement: p.placement,
        direction: p.direction,
        center: this.placementCenter(p.placement, c)
      })).sort((p, m) => p.center.y - m.center.y), x = Math.min(
        ...y.map((p) => (p.placement.row - 1) / c.rows * 100)
      ), v = Math.max(d.y + B, x);
      _(d.y, v, d.x, o), y.forEach((p) => {
        u(d.x, p.center.x, v, p.direction), _(v, p.center.y, p.center.x, p.direction);
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
              style=${E(o)}
            >
              <div class="energy-sub-content">
                <ha-icon class="energy-sub-icon" .icon=${i.icon} style=${E(i.iconStyle)}></ha-icon>
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
      const s = H(this.hass, i.entityId);
      if (s && s.trim().length > 0)
        return s;
    }
    return t;
  }
  computeAutoHomeValueFromNodeValues(e) {
    if (!Object.values(e).some((n) => n != null && Number.isFinite(n)))
      return null;
    const r = (e.solar ?? 0) + (e.grid ?? 0) + (e.grid_secondary ?? 0) - (e.battery ?? 0) - (e.battery_secondary ?? 0);
    return Number.isFinite(r) ? r <= B ? 0 : r : null;
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
    const r = Date.now(), n = r - ce, i = this._trendSeries[e] ?? [];
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
      if (o === a || Math.abs(s.value - i.value) <= B) {
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
    var p, m;
    const n = Date.now() - ce, i = 0, s = 100, o = e.map((g) => g.value), a = (t == null ? void 0 : t.min) ?? Math.min(...o), l = (t == null ? void 0 : t.max) ?? Math.max(...o);
    if (!Number.isFinite(a) || !Number.isFinite(l))
      return [];
    const c = 20, d = 80, h = Math.max(l - a, B), u = e.map((g) => {
      const S = Math.max(0, Math.min(100, (g.ts - n) / ce * 100)), f = i + S / 100 * (s - i), b = h <= B ? 0.5 : (g.value - a) / h, w = d - b * (d - c);
      return { x: f, y: w, value: g.value };
    }), _ = ((p = u[0]) == null ? void 0 : p.x) ?? i, y = ((m = u[u.length - 1]) == null ? void 0 : m.x) ?? s, x = Math.max(0, y - _), v = 18;
    if (u.length >= 2 && x < v) {
      const g = s - v, S = Math.max(i, Math.min(g, y - v));
      if (x <= B) {
        const b = v / (u.length - 1);
        return u.map((w, C) => ({
          ...w,
          x: Math.max(i, Math.min(s, S + b * C))
        }));
      }
      const f = v / x;
      return u.map((b) => ({
        ...b,
        x: Math.max(i, Math.min(s, S + (b.x - _) * f))
      }));
    }
    return u;
  }
  toCanvasPoints(e, t, r) {
    return pt(e, t, r);
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
    const t = this.findLayoutSpan("column"), r = this.findLayoutSpan("row"), n = this.subBlocksMinRows(), i = t !== null && r !== null && t >= li && r >= n, s = e.getBoundingClientRect(), o = s.width >= di && s.height >= hi, a = t !== null && r !== null ? i : o;
    a !== this._showSubBlocks && (this._showSubBlocks = a);
  }
  subBlocksMinRows() {
    if (!this._config)
      return or;
    const e = this._config.solar_visible !== !1, t = this._config.battery_visible !== !1, r = this._config.battery_secondary_visible === !0;
    return !e || !(t || r) ? ci : or;
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
    const s = e.getBoundingClientRect(), o = t == null ? void 0 : t.getBoundingClientRect(), a = r == null ? void 0 : r.getBoundingClientRect(), l = n == null ? void 0 : n.getBoundingClientRect(), c = i == null ? void 0 : i.getBoundingClientRect(), d = o ? o.left + o.width / 2 : 0, h = a ? a.top + a.height / 2 : 0, u = l ? l.left + l.width / 2 : 0, _ = c ? c.left + c.width / 2 : 0, y = (f) => f - s.left, x = (f) => f - s.top, v = (f) => Math.round(f * 10) / 10, p = [], m = (f, b, w, C) => {
      const M = Math.min(f, b), R = Math.abs(b - f);
      R <= 0.5 || p.push({
        node: C,
        left: v(M),
        top: v(w - 1),
        width: v(R),
        height: 2
      });
    }, g = (f, b, w, C) => {
      const M = Math.min(f, b), R = Math.abs(b - f);
      R <= 0.5 || p.push({
        node: C,
        left: v(w - 1),
        top: v(M),
        width: 2,
        height: v(R)
      });
    };
    o && this.renderRoot.querySelectorAll(".energy-sub-value.home-sub").forEach((f) => {
      const b = f.getBoundingClientRect(), w = b.top + b.height / 2, C = b.left + b.width / 2 < d ? b.right : b.left, M = w, R = w < o.top ? o.top : w > o.bottom ? o.bottom : w, z = y(d), A = x(M), k = x(R), D = y(C);
      m(D, z, A, "home"), g(A, k, z, "home");
    }), a && this.renderRoot.querySelectorAll(".energy-sub-value.solar-sub").forEach((f) => {
      const b = f.getBoundingClientRect(), w = b.left + b.width / 2, C = b.top + b.height / 2 < h ? b.bottom : b.top, M = w, R = w < a.left ? a.left : w > a.right ? a.right : w, z = x(h), A = y(M), k = y(R), D = x(C);
      g(D, z, A, "solar"), m(A, k, z, "solar");
    }), l && this.renderRoot.querySelectorAll(".energy-sub-value.grid-sub").forEach((f) => {
      const b = f.getBoundingClientRect(), w = b.top + b.height / 2, C = b.left + b.width / 2 < u ? b.right : b.left, M = w, R = w < l.top ? l.top : w > l.bottom ? l.bottom : w, z = y(u), A = x(M), k = x(R), D = y(C);
      m(D, z, A, "grid"), g(A, k, z, "grid");
    }), c && this.renderRoot.querySelectorAll(".energy-sub-value.grid_secondary-sub").forEach((f) => {
      const b = f.getBoundingClientRect(), w = b.top + b.height / 2, C = b.left + b.width / 2 < _ ? b.right : b.left, M = w, R = w < c.top ? c.top : w > c.bottom ? c.bottom : w, z = y(_), A = x(M), k = x(R), D = y(C);
      m(D, z, A, "grid_secondary"), g(A, k, z, "grid_secondary");
    }), p.length === this._subNodeConnectorSegments.length && p.every(
      (f, b) => {
        var w, C, M, R, z;
        return f.node === ((w = this._subNodeConnectorSegments[b]) == null ? void 0 : w.node) && f.left === ((C = this._subNodeConnectorSegments[b]) == null ? void 0 : C.left) && f.top === ((M = this._subNodeConnectorSegments[b]) == null ? void 0 : M.top) && f.width === ((R = this._subNodeConnectorSegments[b]) == null ? void 0 : R.width) && f.height === ((z = this._subNodeConnectorSegments[b]) == null ? void 0 : z.height);
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
    var c, d;
    const e = this.perfNow(), t = this.collectTrendCanvases(".node-trend-canvas-area"), r = this.collectTrendCanvases(".node-trend-canvas-line"), n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    t.forEach((h, u) => {
      const _ = this.prepareTrendCanvas(h);
      _ && n.set(u, _);
    }), r.forEach((h, u) => {
      const _ = this.prepareTrendCanvas(h);
      _ && i.set(u, _);
    });
    const s = {};
    Object.keys(this._trendDrawConfig).forEach((h) => {
      const u = this._trendDrawConfig[h];
      if (!u)
        return;
      const _ = this.trendPoints(h, u.currentValue);
      _.length >= 2 && (s[h] = _);
    });
    const o = ((c = this._config) == null ? void 0 : c.shared_trend_scale) === !0 ? this.computeTrendValueRange(s) : null;
    let a = 0, l = 0;
    Object.keys(this._trendDrawConfig).forEach((h) => {
      const u = this._trendDrawConfig[h];
      if (!u)
        return;
      const _ = n.get(h), y = i.get(h);
      if (!_ || !y)
        return;
      const x = s[h];
      if (!x || x.length < 2)
        return;
      const v = this.toTrendCoordinates(x, o);
      if (v.length < 2)
        return;
      const p = this.toCanvasPoints(v, _.width, _.height), m = this.toCanvasPoints(v, y.width, y.height);
      this.drawTrendArea(
        _.ctx,
        p,
        u.color,
        _.height,
        u.threshold,
        u.thresholdColor
      ), this.drawTrendLine(y.ctx, m, u.color, u.threshold, u.thresholdColor), a += 1, l += m.length;
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
    !e && r - this._lastTrendRefresh < rr || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
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
    }, ai));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, rr), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.syncTrendResizeObserver(), this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this.clearConfigRefreshTimer(), this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._subNodeConnectorRaf !== void 0 && (window.cancelAnimationFrame(this._subNodeConnectorRaf), this._subNodeConnectorRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
  }
  async refreshTrendHistory(e = !1, t = !1) {
    var i, s;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !t)
      return;
    const r = this._config, n = this.enabledTrendNodes(r);
    if (n.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const o = this.perfNow(), a = {}, l = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set(), u = /* @__PURE__ */ new Set();
      let _ = Number.POSITIVE_INFINITY;
      const y = Date.now() - ce;
      for (const S of n) {
        if (S === "home" && r.home_auto_calculate === !0) {
          const M = this.homeComputationDependencies(r);
          if (M.length === 0) {
            a[S] = [];
            continue;
          }
          c.set(S, M);
          const R = this._trendSeries[S] ?? [];
          if (e || R.length === 0) {
            d.add(S), M.forEach((k) => {
              h.add(k.entityId), u.delete(k.entityId);
            });
            continue;
          }
          const z = ((i = R[R.length - 1]) == null ? void 0 : i.ts) ?? y, A = Math.max(y, z - nr);
          _ = Math.min(_, A), M.forEach((k) => {
            h.has(k.entityId) || u.add(k.entityId);
          });
          continue;
        }
        const f = this.trendEntityId(S, r);
        if (!f)
          continue;
        l.set(S, f);
        const b = this._trendSeries[S] ?? [];
        if (e || b.length === 0 || h.has(f)) {
          h.add(f), u.delete(f);
          continue;
        }
        if (h.has(f))
          continue;
        u.add(f);
        const w = ((s = b[b.length - 1]) == null ? void 0 : s.ts) ?? y, C = Math.max(y, w - nr);
        _ = Math.min(_, C);
      }
      let x = 0;
      const v = h.size > 0 ? await (async () => {
        const S = this.perfNow(), f = await _e(this.hass, Array.from(h), ce);
        return x = this.perfNow() - S, f;
      })() : {};
      let p = 0;
      const m = u.size > 0 ? await (async () => {
        const S = this.perfNow(), f = await _e(
          this.hass,
          Array.from(u),
          ce,
          { startMs: Number.isFinite(_) ? _ : y }
        );
        return p = this.perfNow() - S, f;
      })() : {};
      l.forEach((S, f) => {
        const b = this._trendSeries[f] ?? [];
        if (h.has(S)) {
          const w = v[S] ?? [];
          a[f] = w.length > 0 ? w : b.filter((C) => C.ts >= y);
          return;
        }
        if (u.has(S)) {
          const w = m[S] ?? [];
          a[f] = ke(b, w, y);
          return;
        }
        a[f] = b.filter((w) => w.ts >= y);
      }), c.forEach((S, f) => {
        const b = this._trendSeries[f] ?? [], w = this.computeAutoHomeTrendFromFetchedDependencies(
          S,
          v,
          m,
          h,
          u,
          y
        );
        if (d.has(f)) {
          a[f] = w.length > 0 ? w : b.filter((C) => C.ts >= y);
          return;
        }
        a[f] = ke(b, w, y);
      });
      const g = this.sameTrendSeriesKeys(a, this._trendSeries) && Object.keys(a).every(
        (S) => this.areTrendSeriesEqual(a[S] ?? [], this._trendSeries[S] ?? [])
      );
      g || (this._trendSeries = a), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - o),
        force_full: e,
        nodes: n.length,
        full_entities: h.size,
        incremental_entities: u.size,
        full_fetch_ms: this.toPerfMs(x),
        incremental_fetch_ms: this.toPerfMs(p),
        series_changed: !g
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
    return n("solar", ir), n("home", sr), n("grid", ot), n("grid_secondary", ot), Array.from(t);
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
    return this.enabledTrendNodes(e).forEach((r) => {
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
    if (Math.abs(l) <= B)
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
    return e === null || e <= B ? "none" : "forward";
  }
  toBidirectionalFlow(e) {
    return e === null || Math.abs(e) <= B ? "none" : e > 0 ? "forward" : "backward";
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
    if (t !== null && t > B)
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
    return mt(e, t);
  }
  toRgbCss(e) {
    return _t(e);
  }
};
j.styles = Ve`
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
Y([
  I({ attribute: !1 })
], j.prototype, "hass", 2);
Y([
  I({ type: Boolean })
], j.prototype, "preview", 2);
Y([
  I({ type: Boolean })
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
], j.prototype, "_subNodeConnectorSegments", 2);
j = Y([
  se("power-pilz-energy-card")
], j);
const U = (e) => {
  if (typeof e != "string")
    return;
  const t = e.trim();
  return t.length > 0 ? t : void 0;
}, Sr = (e, t) => {
  switch (e) {
    case 1:
      return U(t.entity_1);
    case 2:
      return U(t.entity_2);
    case 3:
      return U(t.entity_3);
    case 4:
      return U(t.entity_4);
    default:
      return;
  }
}, xr = (e, t) => {
  switch (e) {
    case 1:
      return U(t.entity_1_name);
    case 2:
      return U(t.entity_2_name);
    case 3:
      return U(t.entity_3_name);
    case 4:
      return U(t.entity_4_name);
    default:
      return;
  }
}, Cr = (e, t) => {
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
}, $r = (e, t) => {
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
}, Tr = (e, t) => {
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
}, Mr = (e, t) => {
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
}, Rr = (e, t) => {
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
}, Er = (e) => e === "column" ? "column" : "row", bt = (e, t = 24) => {
  const r = typeof e == "number" ? e : typeof e == "string" ? Number.parseInt(e, 10) : NaN;
  return r === 6 || r === 12 || r === 24 ? r : t;
}, vt = (e) => typeof e != "number" || !Number.isFinite(e) ? 1.5 : Math.max(0.5, Math.min(6, e)), zr = (e, t, r, n) => {
  var o;
  if (t)
    return t;
  const i = e[r], s = (o = i == null ? void 0 : i.attributes) == null ? void 0 : o.friendly_name;
  return typeof s == "string" && s.trim().length > 0 ? s.trim() : `Entity ${n}`;
}, Ar = (e, t, r) => {
  if (e === null)
    return t ? `-- ${t}` : "--";
  const n = `${e.toFixed(r)} ${t}`.trim();
  return n.length > 0 ? n : "--";
}, _i = 4, Or = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, mi = {
  legend_layout: "Label layout",
  timeframe_hours: "Time range",
  hover_enabled: "Enable hover",
  fill_area_enabled: "Enable area fill",
  shared_trend_scale: "Shared trend scale",
  debug_performance: "Enable debug performance logs",
  clip_graph_to_labels: "Clip graph below labels",
  line_thickness: "Line thickness",
  unit: "Unit override",
  decimals: "Decimals"
}, yi = (e) => ({
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
              default_color: Or[e] ?? "purple"
            }
          }
        }
      ]
    }
  ]
}), Pr = (e = !1) => {
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
        }
      ]
    },
    {
      type: "grid",
      name: "",
      schema: t
    },
    ...Array.from({ length: _i }, (r, n) => yi(n + 1)),
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
}, Ir = (e) => e === "column" ? "column" : "row", kr = (e) => bt(e), Nr = (e) => vt(e), Ee = (e, t, r) => {
  const n = e ?? t;
  return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : Or[r] ?? "purple";
}, Lr = (e) => ({
  entity_1: q(e.entity_1) ?? q(e.entity),
  entity_1_name: q(e.entity_1_name),
  entity_1_enabled: e.entity_1_enabled ?? !0,
  entity_1_show_icon: e.entity_1_show_icon ?? !0,
  entity_1_icon: e.entity_1_icon ?? e.icon,
  entity_1_icon_color: e.entity_1_icon_color ?? e.icon_color,
  entity_1_trend_color: Ee(e.entity_1_trend_color, e.trend_color, 1),
  entity_2: q(e.entity_2),
  entity_2_name: q(e.entity_2_name),
  entity_2_enabled: e.entity_2_enabled ?? !1,
  entity_2_show_icon: e.entity_2_show_icon ?? !0,
  entity_2_icon: e.entity_2_icon,
  entity_2_trend_color: Ee(e.entity_2_trend_color, void 0, 2),
  entity_3: q(e.entity_3),
  entity_3_name: q(e.entity_3_name),
  entity_3_enabled: e.entity_3_enabled ?? !1,
  entity_3_show_icon: e.entity_3_show_icon ?? !0,
  entity_3_icon: e.entity_3_icon,
  entity_3_trend_color: Ee(e.entity_3_trend_color, void 0, 3),
  entity_4: q(e.entity_4),
  entity_4_name: q(e.entity_4_name),
  entity_4_enabled: e.entity_4_enabled ?? !1,
  entity_4_show_icon: e.entity_4_show_icon ?? !0,
  entity_4_icon: e.entity_4_icon,
  entity_4_trend_color: Ee(e.entity_4_trend_color, void 0, 4)
}), Br = (e, t = {}) => {
  const r = e.name ?? "", n = r.match(/^entity_(\d+)_(enabled|name|show_icon|icon|icon_color|trend_color)$/);
  if (n) {
    const [, s, o] = n;
    return `Entity ${s} ${{
      enabled: "Enabled",
      name: "Name",
      show_icon: "Show icon",
      icon: "Icon",
      icon_color: "Icon color",
      trend_color: "Graph color"
    }[o] ?? o}`;
  }
  const i = r.match(/^entity_(\d+)$/);
  return i ? `Entity ${i[1]}` : t[r] ?? mi[r] ?? r;
};
var pi = Object.defineProperty, fi = Object.getOwnPropertyDescriptor, gt = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? fi(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && pi(t, r, i), i;
};
const bi = Pr(!1);
let Le = class extends V {
  constructor() {
    super(...arguments), this.computeLabel = (e) => Br(e), this.valueChanged = (e) => {
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
      legend_layout: Ir(e.legend_layout),
      timeframe_hours: kr(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      line_thickness: Nr(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...Lr(e)
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? T : $`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Se}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${bi}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
gt([
  I({ attribute: !1 })
], Le.prototype, "hass", 2);
gt([
  P()
], Le.prototype, "_config", 2);
Le = gt([
  se("power-pilz-graph-card-editor")
], Le);
var vi = Object.defineProperty, gi = Object.getOwnPropertyDescriptor, J = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? gi(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && vi(t, r, i), i;
};
const at = 1, ar = 24, lr = 300 * 1e3, wi = 60 * 1e3, Si = 350, ze = 0.01, Ae = 4, xi = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", cr = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let G = class extends V {
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
      timeframe_hours: ar,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
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
      decimals: at
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : at, r = this.readConfigString(e.entity), n = this.readConfigString(e.icon), i = this.readConfigString(e.entity_1) ?? r ?? "sensor.dev_home_power";
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
    const e = this._config, t = e.decimals ?? at, r = this.normalizeLineThickness(e.line_thickness), n = this.collectSeriesEntries(e, t), i = this.normalizeLegendLayout(e.legend_layout), s = e.hover_enabled !== !1, o = this._hoverState, a = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, l = a > 0 ? { top: `${a}px` } : {}, c = o ? {
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
          <div class="card-trend" style=${E(l)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${E(l)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${s && o ? $`<div class="hover-dot" aria-hidden="true" style=${E(c)}></div>` : T}

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
                <div class="icon-shape" style=${E(e.iconStyle)}>
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
    for (let n = 1; n <= Ae; n += 1) {
      const i = n, s = this.slotEnabled(i, e), o = this.slotEntityId(i, e);
      if (!s || !o)
        continue;
      const a = this.entityName(this.slotCustomName(i, e), o, n), l = L(this.hass, o), c = e.unit ?? H(this.hass, o) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(i, e), u = this.iconStyle(this.slotIconColor(i, e)), _ = this.resolveColor(cr[i], xi), y = this.resolveColor(this.slotTrendColor(i, e), _);
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
        iconStyle: u,
        trendColor: y
      });
    }
    return r;
  }
  slotEntityId(e, t) {
    return Sr(e, t);
  }
  slotCustomName(e, t) {
    return xr(e, t);
  }
  slotEnabled(e, t) {
    return Cr(e, t);
  }
  slotShowIcon(e, t) {
    return $r(e, t);
  }
  slotIcon(e, t) {
    return Tr(e, t);
  }
  slotIconColor(e, t) {
    return Mr(e, t);
  }
  slotTrendColor(e, t) {
    return Rr(e, t);
  }
  entityName(e, t, r) {
    return zr(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    return Ar(e, t, r);
  }
  readConfigString(e) {
    return U(e);
  }
  normalizeLegendLayout(e) {
    return Er(e);
  }
  normalizeTimeframeHours(e) {
    return bt(e, ar);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return vt(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : cr[r];
  }
  iconStyle(e) {
    return yt(e);
  }
  resolveColor(e, t = "") {
    return mt(e, t);
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
    var m, g;
    const i = Date.now() - t, s = 0, o = 100, a = e.map((S) => S.value), l = (r == null ? void 0 : r.min) ?? Math.min(...a), c = (r == null ? void 0 : r.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, u = Math.max(c - l, ze), _ = e.map((S) => {
      const f = Math.max(0, Math.min(100, (S.ts - i) / t * 100)), b = s + f / 100 * (o - s), w = u <= ze ? 0.5 : (S.value - l) / u, C = h - w * (h - d);
      return { x: b, y: C, value: S.value };
    }), y = ((m = _[0]) == null ? void 0 : m.x) ?? s, x = ((g = _[_.length - 1]) == null ? void 0 : g.x) ?? o, v = Math.max(0, x - y), p = 18;
    if (_.length >= 2 && v < p) {
      const S = o - p, f = Math.max(s, Math.min(S, x - p));
      if (v <= ze) {
        const w = p / (_.length - 1);
        return _.map((C, M) => ({
          ...C,
          x: Math.max(s, Math.min(o, f + w * M))
        }));
      }
      const b = p / v;
      return _.map((w) => ({
        ...w,
        x: Math.max(s, Math.min(o, f + (w.x - y) * b))
      }));
    }
    return _;
  }
  toCanvasPoints(e, t, r) {
    return pt(e, t, r);
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
    var _, y, x;
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
    const s = ((_ = this._config) == null ? void 0 : _.fill_area_enabled) !== !1, o = this.trendWindowMs(this._config), a = {};
    this._drawConfigs.forEach((v) => {
      const p = this.trendPoints(v.slot, v.currentValue);
      p.length >= 2 && (a[v.slot] = p);
    });
    const l = ((y = this._config) == null ? void 0 : y.shared_trend_scale) === !0 ? this.computeTrendValueRange(a) : null, c = {};
    let d = 0, h = 0;
    [...this._drawConfigs].sort((v, p) => p.slot - v.slot).forEach((v) => {
      const p = a[v.slot];
      if (!p || p.length < 2)
        return;
      const m = this.toTrendCoordinates(p, o, l);
      if (m.length < 2)
        return;
      const g = this.toCanvasPoints(m, n.width, n.height), S = this.toCanvasPoints(m, i.width, i.height);
      s && this.drawTrendArea(n.ctx, g, v.color, n.height), this.drawTrendLine(i.ctx, S, v.color, v.lineWidth), c[v.slot] = S, d += 1, h += S.length;
    }), this._linePointsBySlot = c, this._hoverState && !c[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: d,
      points: h,
      fill_area: s,
      shared_scale: ((x = this._config) == null ? void 0 : x.shared_trend_scale) === !0
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
      if (Math.abs(a) <= ze)
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
    !e && r - this._lastTrendRefresh < lr || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
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
    }, Si));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, lr), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.updateGraphTopInset(), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this.clearConfigRefreshTimer(), this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
  }
  async refreshTrendHistory(e = !1, t = !1) {
    var o;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !t)
      return;
    const r = this._config, n = {}, i = this.trendWindowMs(r), s = this.enabledSlots(r);
    if (s.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const a = this.perfNow(), l = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
      let h = Number.POSITIVE_INFINITY;
      const u = Date.now() - i;
      for (const m of s) {
        const g = this.slotEntityId(m, r);
        if (!g)
          continue;
        l.set(m, g);
        const S = this._trendSeries[m] ?? [];
        if (e || S.length === 0 || c.has(g)) {
          c.add(g), d.delete(g);
          continue;
        }
        if (c.has(g))
          continue;
        d.add(g);
        const f = ((o = S[S.length - 1]) == null ? void 0 : o.ts) ?? u, b = Math.max(u, f - wi);
        h = Math.min(h, b);
      }
      let _ = 0;
      const y = c.size > 0 ? await (async () => {
        const m = this.perfNow(), g = await _e(this.hass, Array.from(c), i);
        return _ = this.perfNow() - m, g;
      })() : {};
      let x = 0;
      const v = d.size > 0 ? await (async () => {
        const m = this.perfNow(), g = await _e(
          this.hass,
          Array.from(d),
          i,
          { startMs: Number.isFinite(h) ? h : u }
        );
        return x = this.perfNow() - m, g;
      })() : {};
      l.forEach((m, g) => {
        const S = this._trendSeries[g] ?? [];
        if (c.has(m)) {
          const f = y[m] ?? [];
          n[g] = f.length > 0 ? f : S.filter((b) => b.ts >= u);
          return;
        }
        if (d.has(m)) {
          const f = v[m] ?? [];
          n[g] = ke(S, f, u);
          return;
        }
        n[g] = S.filter((f) => f.ts >= u);
      });
      const p = this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((m) => Number(m)).filter((m) => Number.isFinite(m) && m >= 1 && m <= Ae).every((m) => {
        const g = m;
        return this.areTrendSeriesEqual(n[g] ?? [], this._trendSeries[g] ?? []);
      });
      p || (this._trendSeries = n), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - a),
        window_ms: i,
        force_full: e,
        slots: s.length,
        full_entities: c.size,
        incremental_entities: d.size,
        full_fetch_ms: this.toPerfMs(_),
        incremental_fetch_ms: this.toPerfMs(x),
        series_changed: !p
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let r = 1; r <= Ae; r += 1) {
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
    if (!e || !t || this.trendWindowMs(e) !== this.trendWindowMs(t))
      return !0;
    for (let r = 1; r <= Ae; r += 1) {
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
G.styles = Ve`
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
  I({ attribute: !1 })
], G.prototype, "hass", 2);
J([
  I({ type: Boolean })
], G.prototype, "preview", 2);
J([
  I({ type: Boolean })
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
  se("power-pilz-graph-card")
], G);
var Ci = Object.defineProperty, $i = Object.getOwnPropertyDescriptor, wt = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? $i(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && Ci(t, r, i), i;
};
const Ti = Pr(!0);
let Be = class extends V {
  constructor() {
    super(...arguments), this.computeLabel = (e) => Br(e, {
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
      legend_layout: Ir(e.legend_layout),
      timeframe_hours: kr(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      debug_performance: e.debug_performance ?? !1,
      normalize_stack_to_percent: e.normalize_stack_to_percent ?? !1,
      line_thickness: Nr(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...Lr(e)
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? T : $`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${Se}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ti}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
wt([
  I({ attribute: !1 })
], Be.prototype, "hass", 2);
wt([
  P()
], Be.prototype, "_config", 2);
Be = wt([
  se("power-pilz-graph-stack-card-editor")
], Be);
var Mi = Object.defineProperty, Ri = Object.getOwnPropertyDescriptor, Z = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Ri(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && Mi(t, r, i), i;
};
const lt = 1, dr = 24, hr = 300 * 1e3, Ei = 60 * 1e3, zi = 350, ee = 0.01, ye = 4, Ai = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", ur = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let W = class extends V {
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
      timeframe_hours: dr,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
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
      decimals: lt
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : lt, r = this.readConfigString(e.entity), n = this.readConfigString(e.icon), i = this.readConfigString(e.entity_1) ?? r ?? "sensor.dev_home_power";
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
    const e = this._config, t = e.decimals ?? lt, r = this.normalizeLineThickness(e.line_thickness), n = e.normalize_stack_to_percent === !0, i = this.collectSeriesEntries(e, t), s = this.withStackedCurrentValues(i, n), o = this.normalizeLegendLayout(e.legend_layout), a = e.hover_enabled !== !1, l = this._hoverState, c = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, d = c > 0 ? { top: `${c}px` } : {}, h = l ? {
      left: `${l.x}px`,
      top: `${l.y + c}px`,
      "--hover-dot-color": l.color
    } : {};
    return this._drawConfigs = i.map((u) => ({
      slot: u.slot,
      currentValue: u.currentValue,
      color: u.trendColor,
      lineWidth: r
    })), $`
      <ha-card>
        <div
          class="container"
          @pointermove=${this.handlePointerMove}
          @pointerleave=${this.handlePointerLeave}
          @pointercancel=${this.handlePointerLeave}
        >
          <div class="card-trend" style=${E(d)} aria-hidden="true">
            <canvas class="card-trend-canvas-area"></canvas>
          </div>
          <div class="card-trend-line" style=${E(d)} aria-hidden="true">
            <canvas class="card-trend-canvas-line"></canvas>
          </div>
          ${a && l ? $`<div class="hover-dot" aria-hidden="true" style=${E(h)}></div>` : T}

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
      (u) => this.renderSeriesItem(
        u,
        l && l.slot === u.slot ? l.value : null
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
                <div class="icon-shape" style=${E(e.iconStyle)}>
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
    for (let n = 1; n <= ye; n += 1) {
      const i = n, s = this.slotEnabled(i, e), o = this.slotEntityId(i, e);
      if (!s || !o)
        continue;
      const a = this.entityName(this.slotCustomName(i, e), o, n), l = L(this.hass, o), c = e.unit ?? H(this.hass, o) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(i, e), u = this.iconStyle(this.slotIconColor(i, e)), _ = this.resolveColor(ur[i], Ai), y = this.resolveColor(this.slotTrendColor(i, e), _);
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
        iconStyle: u,
        trendColor: y
      });
    }
    return r;
  }
  withStackedCurrentValues(e, t) {
    const r = e.reduce((o, a) => o + (a.currentValue ?? 0), 0), n = Number.isFinite(r) && Math.abs(r) > ee;
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
    return Sr(e, t);
  }
  slotCustomName(e, t) {
    return xr(e, t);
  }
  slotEnabled(e, t) {
    return Cr(e, t);
  }
  slotShowIcon(e, t) {
    return $r(e, t);
  }
  slotIcon(e, t) {
    return Tr(e, t);
  }
  slotIconColor(e, t) {
    return Mr(e, t);
  }
  slotTrendColor(e, t) {
    return Rr(e, t);
  }
  entityName(e, t, r) {
    return zr(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    return Ar(e, t, r);
  }
  readConfigString(e) {
    return U(e);
  }
  normalizeLegendLayout(e) {
    return Er(e);
  }
  normalizeTimeframeHours(e) {
    return bt(e, dr);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return vt(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : ur[r];
  }
  iconStyle(e) {
    return yt(e);
  }
  resolveColor(e, t = "") {
    return mt(e, t);
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
    var m, g;
    const i = Date.now() - t, s = 0, o = 100, a = e.map((S) => S.value), l = (r == null ? void 0 : r.min) ?? Math.min(...a), c = (r == null ? void 0 : r.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, u = Math.max(c - l, ee), _ = e.map((S) => {
      const f = Math.max(0, Math.min(100, (S.ts - i) / t * 100)), b = s + f / 100 * (o - s), w = u <= ee ? 0.5 : (S.value - l) / u, C = h - w * (h - d);
      return { x: b, y: C, value: S.value };
    }), y = ((m = _[0]) == null ? void 0 : m.x) ?? s, x = ((g = _[_.length - 1]) == null ? void 0 : g.x) ?? o, v = Math.max(0, x - y), p = 18;
    if (_.length >= 2 && v < p) {
      const S = o - p, f = Math.max(s, Math.min(S, x - p));
      if (v <= ee) {
        const w = p / (_.length - 1);
        return _.map((C, M) => ({
          ...C,
          x: Math.max(s, Math.min(o, f + w * M))
        }));
      }
      const b = p / v;
      return _.map((w) => ({
        ...w,
        x: Math.max(s, Math.min(o, f + (w.x - y) * b))
      }));
    }
    return _;
  }
  toCanvasPoints(e, t, r) {
    return pt(e, t, r);
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
    var v, p, m;
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
    const s = ((v = this._config) == null ? void 0 : v.fill_area_enabled) !== !1, o = ((p = this._config) == null ? void 0 : p.normalize_stack_to_percent) === !0, a = ((m = this._config) == null ? void 0 : m.shared_trend_scale) === !0, l = this.trendWindowMs(this._config), c = {}, d = this.buildStackedTrendSeries(l), h = o ? this.normalizeStackedSeriesToPercent(d) : d, u = o ? a ? { min: 0, max: 100 } : null : a ? this.computeStackedValueRange(h) : null;
    let _ = 0, y = 0;
    [...this._drawConfigs].sort((g, S) => S.slot - g.slot).forEach((g) => {
      const S = h[g.slot] ?? [];
      if (S.length < 2)
        return;
      const f = this.toTrendCoordinates(S, l, u);
      if (f.length < 2)
        return;
      const b = this.toCanvasPoints(f, n.width, n.height), w = this.toCanvasPoints(f, i.width, i.height);
      s && this.drawTrendArea(n.ctx, b, g.color, n.height), this.drawTrendLine(i.ctx, w, g.color, g.lineWidth), c[g.slot] = w, _ += 1, y += w.length;
    }), this._linePointsBySlot = c, this._hoverState && !c[this._hoverState.slot] && (this._hoverState = void 0), this.logPerformance("draw-complete", {
      duration_ms: this.toPerfMs(this.perfNow() - e),
      series: _,
      points: y,
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
    if (Math.abs(l) <= ee)
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
    const t = {}, r = Object.keys(e).map((s) => Number(s)).filter((s) => Number.isFinite(s) && s >= 1 && s <= ye).sort((s, o) => s - o);
    if (r.length === 0)
      return t;
    const n = r[r.length - 1], i = e[n] ?? [];
    return i.length < 1 || r.forEach((s) => {
      const o = e[s] ?? [];
      o.length !== 0 && (t[s] = o.map((a) => {
        const l = this.interpolateTrendValue(i, a.ts);
        if (!Number.isFinite(l) || Math.abs(l) <= ee)
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
      if (Math.abs(a) <= ee)
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
    !e && r - this._lastTrendRefresh < hr || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
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
    }, zi));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, hr), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.updateGraphTopInset(), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this.clearConfigRefreshTimer(), this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
  }
  async refreshTrendHistory(e = !1, t = !1) {
    var o;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !t)
      return;
    const r = this._config, n = {}, i = this.trendWindowMs(r), s = this.enabledSlots(r);
    if (s.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const a = this.perfNow(), l = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
      let h = Number.POSITIVE_INFINITY;
      const u = Date.now() - i;
      for (const m of s) {
        const g = this.slotEntityId(m, r);
        if (!g)
          continue;
        l.set(m, g);
        const S = this._trendSeries[m] ?? [];
        if (e || S.length === 0 || c.has(g)) {
          c.add(g), d.delete(g);
          continue;
        }
        if (c.has(g))
          continue;
        d.add(g);
        const f = ((o = S[S.length - 1]) == null ? void 0 : o.ts) ?? u, b = Math.max(u, f - Ei);
        h = Math.min(h, b);
      }
      let _ = 0;
      const y = c.size > 0 ? await (async () => {
        const m = this.perfNow(), g = await _e(this.hass, Array.from(c), i);
        return _ = this.perfNow() - m, g;
      })() : {};
      let x = 0;
      const v = d.size > 0 ? await (async () => {
        const m = this.perfNow(), g = await _e(
          this.hass,
          Array.from(d),
          i,
          { startMs: Number.isFinite(h) ? h : u }
        );
        return x = this.perfNow() - m, g;
      })() : {};
      l.forEach((m, g) => {
        const S = this._trendSeries[g] ?? [];
        if (c.has(m)) {
          const f = y[m] ?? [];
          n[g] = f.length > 0 ? f : S.filter((b) => b.ts >= u);
          return;
        }
        if (d.has(m)) {
          const f = v[m] ?? [];
          n[g] = ke(S, f, u);
          return;
        }
        n[g] = S.filter((f) => f.ts >= u);
      });
      const p = this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((m) => Number(m)).filter((m) => Number.isFinite(m) && m >= 1 && m <= ye).every((m) => {
        const g = m;
        return this.areTrendSeriesEqual(n[g] ?? [], this._trendSeries[g] ?? []);
      });
      p || (this._trendSeries = n), this.logPerformance("trend-refresh", {
        duration_ms: this.toPerfMs(this.perfNow() - a),
        window_ms: i,
        force_full: e,
        slots: s.length,
        full_entities: c.size,
        incremental_entities: d.size,
        full_fetch_ms: this.toPerfMs(_),
        incremental_fetch_ms: this.toPerfMs(x),
        series_changed: !p
      });
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let r = 1; r <= ye; r += 1) {
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
    if (!e || !t || this.trendWindowMs(e) !== this.trendWindowMs(t))
      return !0;
    for (let r = 1; r <= ye; r += 1) {
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
W.styles = Ve`
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
  I({ attribute: !1 })
], W.prototype, "hass", 2);
Z([
  I({ type: Boolean })
], W.prototype, "preview", 2);
Z([
  I({ type: Boolean })
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
  se("power-pilz-graph-stack-card")
], W);
var Oi = Object.defineProperty, Pi = Object.getOwnPropertyDescriptor, St = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Pi(t, r) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = (n ? o(t, r, i) : o(i)) || i);
  return n && i && Oi(t, r, i), i;
};
const Ii = [
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
], ki = {
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
let He = class extends V {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = e.name ?? "";
      return ki[t] ?? t;
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
        PowerPilz v${Se}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ii}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
St([
  I({ attribute: !1 })
], He.prototype, "hass", 2);
St([
  P()
], He.prototype, "_config", 2);
He = St([
  se("power-pilz-wallbox-card-editor")
], He);
var Ni = Object.defineProperty, oe = (e, t, r, n) => {
  for (var i = void 0, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (i = o(t, r, i) || i);
  return i && Ni(t, r, i), i;
};
const Li = 0.01, _r = "power-pilz-wallbox-mode-menu-portal-style", xt = class xt extends V {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._actionBusy = !1, this._modeMenuOpen = !1, this._modeMenuOptionCount = 0, this.toggleModeMenu = (t) => {
      var o;
      if (t.stopPropagation(), this.isEditorPreview() || !((o = this._config) != null && o.mode_entity) || this._actionBusy)
        return;
      const r = he(this.hass, this._config.mode_entity), n = (r == null ? void 0 : r.state) ?? "", i = this.getModeOptions(r);
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
      const r = he(this.hass, this._config.mode_entity);
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
      const r = L(this.hass, this._config.power_entity), n = nt(this.hass, this._config.status_entity), i = this.isCharging(n, r, this._config.command_entity), s = this.resolveActionCommand(i);
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
    const t = this._config, r = L(this.hass, t.power_entity), n = H(this.hass, t.power_entity) ?? "kW", i = nt(this.hass, t.status_entity), s = he(this.hass, t.mode_entity), o = (s == null ? void 0 : s.state) ?? "", a = this.getModeOptions(s), l = this.isCharging(i, r, t.command_entity), c = this.resolveActionCommand(l), d = l ? "Stop" : "Start", h = l ? "mdi:pause" : "mdi:play", u = this.statusLabel(i, l), _ = this.formatPower(r, n, t.decimals ?? 1), y = this.showModeSelector(t, a), x = this.showLiveValue(t), v = this.showCommandButton(t), p = this.isEditorPreview() || this._actionBusy || !t.mode_entity || a.length === 0, m = o || a[0] || "Mode", g = this._modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down", S = this.iconStyle(t.icon_color), b = Number(x) + Number(v) === 1, w = y && x && v, C = b && x, M = b && v || w, R = C || M, z = x && !C, A = v && !M, k = y || z || A, D = y ? z || A ? A ? "actions" : "actions no-command" : "actions mode-only" : "actions no-mode";
    return (!y || p) && this._modeMenuOpen && this.closeModeMenuPortal(), $`
      <ha-card>
        <div class="container">
          <div class="state-item ${R ? "compact-state" : ""}">
            <div class="icon-wrap">
              <div class="icon-shape" style=${E(S)}>
                <ha-icon .icon=${t.icon ?? "mdi:ev-station"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${t.name}</div>
              <div class="secondary">EV charger</div>
            </div>

            ${R ? $`
                  <div class="compact-trailing ${M ? "button-only" : ""}">
                    ${C ? $`
                          <div class="compact-live-value">
                            <span>${u}</span>
                            <span class="dot">•</span>
                            <span>${_}</span>
                          </div>
                        ` : $``}

                    ${M ? $`
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

          ${k ? $`
                <div class=${D}>
                  ${y ? $`
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
                            <span class="mode-select-label">${m}</span>
                            <ha-icon class="mode-select-chevron" .icon=${g}></ha-icon>
                          </button>
                        </div>
                      ` : $``}

                  ${z ? $`
                        <div class="live-value">
                          <span>${u}</span>
                          <span class="dot">•</span>
                          <span>${_}</span>
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
      const s = (i = nt(this.hass, n)) == null ? void 0 : i.toLowerCase();
      if (s === "on")
        return !0;
      if (s === "off")
        return !1;
    }
    return r !== null && r > Li;
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
    return yt(t);
  }
  disconnectedCallback() {
    this.closeModeMenuPortal(), super.disconnectedCallback();
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  ensureModeMenuPortalStyles() {
    if (document.getElementById(_r))
      return;
    const t = document.createElement("style");
    t.id = _r, t.textContent = `
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
    ), c = r.offsetHeight > 0 ? Math.min(a, r.offsetHeight) : l, d = Math.max(120, Math.round(i.width)), h = window.innerHeight - i.bottom - s, u = h < c + o && i.top - s > h;
    let _ = i.left;
    _ = Math.max(s, Math.min(_, window.innerWidth - d - s));
    let y = u ? i.top - o - c : i.bottom + o;
    y = Math.max(s, Math.min(y, window.innerHeight - c - s)), r.style.maxHeight = `${a}px`, r.style.width = `${d}px`, r.style.left = `${Math.round(_)}px`, r.style.top = `${Math.round(y)}px`;
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
xt.styles = Ve`
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
let F = xt;
oe([
  I({ attribute: !1 })
], F.prototype, "hass");
oe([
  I({ type: Boolean })
], F.prototype, "preview");
oe([
  I({ type: Boolean })
], F.prototype, "editMode");
oe([
  I({ reflect: !0, type: String })
], F.prototype, "layout");
oe([
  P()
], F.prototype, "_config");
oe([
  P()
], F.prototype, "_actionBusy");
oe([
  P()
], F.prototype, "_modeMenuOpen");
class Bi extends F {
}
customElements.get("power-pilz-wallbox-card") || customElements.define("power-pilz-wallbox-card", F);
customElements.get("power-pilz-wallbox-card-v2") || customElements.define("power-pilz-wallbox-card-v2", Bi);
window.customCards = window.customCards || [];
const Hi = [
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
for (const e of Hi)
  window.customCards.some((t) => t.type === e.type) || window.customCards.push(e);
console.info(
  `%cPOWER PILZ%c v${Se}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
//# sourceMappingURL=power-pilz.js.map
