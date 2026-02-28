/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ae = globalThis, lt = Ae.ShadowRoot && (Ae.ShadyCSS === void 0 || Ae.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ct = Symbol(), Ht = /* @__PURE__ */ new WeakMap();
let ur = class {
  constructor(t, r, n) {
    if (this._$cssResult$ = !0, n !== ct) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = r;
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (lt && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = Ht.get(r)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Ht.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const yn = (e) => new ur(typeof e == "string" ? e : e + "", void 0, ct), He = (e, ...t) => {
  const r = e.length === 1 ? e[0] : t.reduce((n, i, o) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + e[o + 1], e[0]);
  return new ur(r, e, ct);
}, pn = (e, t) => {
  if (lt) e.adoptedStyleSheets = t.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of t) {
    const n = document.createElement("style"), i = Ae.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = r.cssText, e.appendChild(n);
  }
}, Vt = lt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let r = "";
  for (const n of t.cssRules) r += n.cssText;
  return yn(r);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: fn, defineProperty: bn, getOwnPropertyDescriptor: vn, getOwnPropertyNames: gn, getOwnPropertySymbols: wn, getPrototypeOf: xn } = Object, X = globalThis, Dt = X.trustedTypes, Sn = Dt ? Dt.emptyScript : "", Ze = X.reactiveElementPolyfillSupport, ye = (e, t) => e, Oe = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Sn : null;
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
} }, dt = (e, t) => !fn(e, t), Ft = { attribute: !0, type: String, converter: Oe, reflect: !1, useDefault: !1, hasChanged: dt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), X.litPropertyMetadata ?? (X.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let de = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, r = Ft) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(t, r), !r.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, r);
      i !== void 0 && bn(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    const { get: i, set: o } = vn(this.prototype, t) ?? { get() {
      return this[r];
    }, set(s) {
      this[r] = s;
    } };
    return { get: i, set(s) {
      const a = i == null ? void 0 : i.call(this);
      o == null || o.call(this, s), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ft;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ye("elementProperties"))) return;
    const t = xn(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ye("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ye("properties"))) {
      const r = this.properties, n = [...gn(r), ...wn(r)];
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
      for (const i of n) r.unshift(Vt(i));
    } else t !== void 0 && r.push(Vt(t));
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
    return pn(t, this.constructor.elementStyles), t;
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
    var o;
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const s = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : Oe).toAttribute(r, n.type);
      this._$Em = t, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(t, r) {
    var o, s;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = n.getPropertyOptions(i), l = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : Oe;
      this._$Em = i;
      const c = l.fromAttribute(r, a.type);
      this[i] = c ?? ((s = this._$Ej) == null ? void 0 : s.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, r, n, i = !1, o) {
    var s;
    if (t !== void 0) {
      const a = this.constructor;
      if (i === !1 && (o = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? dt)(o, r) || n.useDefault && n.reflect && o === ((s = this._$Ej) == null ? void 0 : s.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, r, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, r, { useDefault: n, reflect: i, wrapped: o }, s) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, s ?? r ?? this[t]), o !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (r = void 0), this._$AL.set(t, r)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, s] of i) {
        const { wrapped: a } = s, l = this[o];
        a !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, s, l);
      }
    }
    let t = !1;
    const r = this._$AL;
    try {
      t = this.shouldUpdate(r), t ? (this.willUpdate(r), (n = this._$EO) == null || n.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
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
de.elementStyles = [], de.shadowRootOptions = { mode: "open" }, de[ye("elementProperties")] = /* @__PURE__ */ new Map(), de[ye("finalized")] = /* @__PURE__ */ new Map(), Ze == null || Ze({ ReactiveElement: de }), (X.reactiveElementVersions ?? (X.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pe = globalThis, Ut = (e) => e, Pe = pe.trustedTypes, jt = Pe ? Pe.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, _r = "$lit$", K = `lit$${Math.random().toFixed(9).slice(2)}$`, mr = "?" + K, Cn = `<${mr}>`, ne = document, fe = () => ne.createComment(""), be = (e) => e === null || typeof e != "object" && typeof e != "function", ht = Array.isArray, $n = (e) => ht(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Qe = `[ 	
\f\r]`, me = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Gt = /-->/g, Wt = />/g, Q = RegExp(`>|${Qe}(?:([^\\s"'>=/]+)(${Qe}*=${Qe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), qt = /'/g, Kt = /"/g, yr = /^(?:script|style|textarea|title)$/i, Tn = (e) => (t, ...r) => ({ _$litType$: e, strings: t, values: r }), S = Tn(1), ie = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), Xt = /* @__PURE__ */ new WeakMap(), te = ne.createTreeWalker(ne, 129);
function pr(e, t) {
  if (!ht(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return jt !== void 0 ? jt.createHTML(t) : t;
}
const Rn = (e, t) => {
  const r = e.length - 1, n = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = me;
  for (let a = 0; a < r; a++) {
    const l = e[a];
    let c, d, h = -1, y = 0;
    for (; y < l.length && (s.lastIndex = y, d = s.exec(l), d !== null); ) y = s.lastIndex, s === me ? d[1] === "!--" ? s = Gt : d[1] !== void 0 ? s = Wt : d[2] !== void 0 ? (yr.test(d[2]) && (i = RegExp("</" + d[2], "g")), s = Q) : d[3] !== void 0 && (s = Q) : s === Q ? d[0] === ">" ? (s = i ?? me, h = -1) : d[1] === void 0 ? h = -2 : (h = s.lastIndex - d[2].length, c = d[1], s = d[3] === void 0 ? Q : d[3] === '"' ? Kt : qt) : s === Kt || s === qt ? s = Q : s === Gt || s === Wt ? s = me : (s = Q, i = void 0);
    const p = s === Q && e[a + 1].startsWith("/>") ? " " : "";
    o += s === me ? l + Cn : h >= 0 ? (n.push(c), l.slice(0, h) + _r + l.slice(h) + K + p) : l + K + (h === -2 ? a : p);
  }
  return [pr(e, o + (e[r] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ve {
  constructor({ strings: t, _$litType$: r }, n) {
    let i;
    this.parts = [];
    let o = 0, s = 0;
    const a = t.length - 1, l = this.parts, [c, d] = Rn(t, r);
    if (this.el = ve.createElement(c, n), te.currentNode = this.el.content, r === 2 || r === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = te.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(_r)) {
          const y = d[s++], p = i.getAttribute(h).split(K), b = /([.?@])?(.*)/.exec(y);
          l.push({ type: 1, index: o, name: b[2], strings: p, ctor: b[1] === "." ? En : b[1] === "?" ? zn : b[1] === "@" ? An : Ve }), i.removeAttribute(h);
        } else h.startsWith(K) && (l.push({ type: 6, index: o }), i.removeAttribute(h));
        if (yr.test(i.tagName)) {
          const h = i.textContent.split(K), y = h.length - 1;
          if (y > 0) {
            i.textContent = Pe ? Pe.emptyScript : "";
            for (let p = 0; p < y; p++) i.append(h[p], fe()), te.nextNode(), l.push({ type: 2, index: ++o });
            i.append(h[y], fe());
          }
        }
      } else if (i.nodeType === 8) if (i.data === mr) l.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(K, h + 1)) !== -1; ) l.push({ type: 7, index: o }), h += K.length - 1;
      }
      o++;
    }
  }
  static createElement(t, r) {
    const n = ne.createElement("template");
    return n.innerHTML = t, n;
  }
}
function ue(e, t, r = e, n) {
  var s, a;
  if (t === ie) return t;
  let i = n !== void 0 ? (s = r._$Co) == null ? void 0 : s[n] : r._$Cl;
  const o = be(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((a = i == null ? void 0 : i._$AO) == null || a.call(i, !1), o === void 0 ? i = void 0 : (i = new o(e), i._$AT(e, r, n)), n !== void 0 ? (r._$Co ?? (r._$Co = []))[n] = i : r._$Cl = i), i !== void 0 && (t = ue(e, i._$AS(e, t.values), i, n)), t;
}
class Mn {
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
    let o = te.nextNode(), s = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (s === l.index) {
        let c;
        l.type === 2 ? c = new ge(o, o.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(o, l.name, l.strings, this, t) : l.type === 6 && (c = new On(o, this, t)), this._$AV.push(c), l = n[++a];
      }
      s !== (l == null ? void 0 : l.index) && (o = te.nextNode(), s++);
    }
    return te.currentNode = ne, i;
  }
  p(t) {
    let r = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, r), r += n.strings.length - 2) : n._$AI(t[r])), r++;
  }
}
class ge {
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
    t = ue(this, t, r), be(t) ? t === T || t == null || t === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== ie && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : $n(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== T && be(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ne.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: r, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ve.createElement(pr(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(r);
    else {
      const s = new Mn(i, this), a = s.u(this.options);
      s.p(r), this.T(a), this._$AH = s;
    }
  }
  _$AC(t) {
    let r = Xt.get(t.strings);
    return r === void 0 && Xt.set(t.strings, r = new ve(t)), r;
  }
  k(t) {
    ht(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let n, i = 0;
    for (const o of t) i === r.length ? r.push(n = new ge(this.O(fe()), this.O(fe()), this, this.options)) : n = r[i], n._$AI(o), i++;
    i < r.length && (this._$AR(n && n._$AB.nextSibling, i), r.length = i);
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, r); t !== this._$AB; ) {
      const i = Ut(t).nextSibling;
      Ut(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 && (this._$Cv = t, (r = this._$AP) == null || r.call(this, t));
  }
}
class Ve {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, r, n, i, o) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t, this.name = r, this._$AM = i, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = T;
  }
  _$AI(t, r = this, n, i) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) t = ue(this, t, r, 0), s = !be(t) || t !== this._$AH && t !== ie, s && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = o[0], l = 0; l < o.length - 1; l++) c = ue(this, a[n + l], r, l), c === ie && (c = this._$AH[l]), s || (s = !be(c) || c !== this._$AH[l]), c === T ? t = T : t !== T && (t += (c ?? "") + o[l + 1]), this._$AH[l] = c;
    }
    s && !i && this.j(t);
  }
  j(t) {
    t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class En extends Ve {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === T ? void 0 : t;
  }
}
class zn extends Ve {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== T);
  }
}
class An extends Ve {
  constructor(t, r, n, i, o) {
    super(t, r, n, i, o), this.type = 5;
  }
  _$AI(t, r = this) {
    if ((t = ue(this, t, r, 0) ?? T) === ie) return;
    const n = this._$AH, i = t === T && n !== T || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== T && (n === T || i);
    i && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class On {
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
const et = pe.litHtmlPolyfillSupport;
et == null || et(ve, ge), (pe.litHtmlVersions ?? (pe.litHtmlVersions = [])).push("3.3.2");
const Pn = (e, t, r) => {
  const n = (r == null ? void 0 : r.renderBefore) ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const o = (r == null ? void 0 : r.renderBefore) ?? null;
    n._$litPart$ = i = new ge(t.insertBefore(fe(), o), o, void 0, r ?? {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re = globalThis;
let H = class extends de {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Pn(r, this.renderRoot, this.renderOptions);
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
var hr;
H._$litElement$ = !0, H.finalized = !0, (hr = re.litElementHydrateSupport) == null || hr.call(re, { LitElement: H });
const tt = re.litElementPolyfillSupport;
tt == null || tt({ LitElement: H });
(re.litElementVersions ?? (re.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oe = (e) => (t, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ln = { attribute: !0, type: String, converter: Oe, reflect: !1, hasChanged: dt }, In = (e = Ln, t, r) => {
  const { kind: n, metadata: i } = r;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(r.name, e), n === "accessor") {
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
  return (t, r) => typeof r == "object" ? In(e, t, r) : ((n, i, o) => {
    const s = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, n), s ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(e, t, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function O(e) {
  return L({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kn = { ATTRIBUTE: 1 }, Nn = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Bn = class {
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
const fr = "important", Hn = " !" + fr, M = Nn(class extends Bn {
  constructor(e) {
    var t;
    if (super(e), e.type !== kn.ATTRIBUTE || e.name !== "style" || ((t = e.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
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
        const o = typeof i == "string" && i.endsWith(Hn);
        n.includes("-") || o ? r.setProperty(n, o ? i.slice(0, -11) : i, o ? fr : "") : r[n] = i;
      }
    }
    return ie;
  }
}), he = (e, t) => {
  if (t)
    return e.states[t];
}, k = (e, t) => {
  const r = he(e, t);
  if (!r)
    return null;
  const n = Number(r.state);
  return Number.isFinite(n) ? n : null;
}, B = (e, t) => {
  const r = he(e, t);
  if (!r)
    return;
  const n = r.attributes.unit_of_measurement;
  return typeof n == "string" ? n : void 0;
}, rt = (e, t) => {
  const r = he(e, t);
  return r == null ? void 0 : r.state;
}, Vn = 3e4, Yt = /* @__PURE__ */ new Map(), nt = /* @__PURE__ */ new Map(), Dn = (e) => {
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
  const n = [...e, ...t].filter((o) => Number.isFinite(o.ts) && Number.isFinite(o.value) && o.ts >= r).sort((o, s) => o.ts - s.ts);
  if (n.length <= 1)
    return n;
  const i = [];
  return n.forEach((o) => {
    const s = i[i.length - 1];
    if (s && Math.abs(s.ts - o.ts) <= 0.5) {
      i[i.length - 1] = o;
      return;
    }
    i.push(o);
  }), i;
}, Fn = (e, t, r = Date.now()) => {
  if (!Array.isArray(e))
    return { entityId: null, points: [] };
  const n = [];
  let i = null;
  for (const s of e) {
    if (!s || typeof s != "object")
      continue;
    const a = s;
    i === null && typeof a.entity_id == "string" && a.entity_id.length > 0 && (i = a.entity_id);
    const l = Number(a.state), c = Dn(a);
    !Number.isFinite(l) || c === null || n.push({ ts: c, value: l });
  }
  const o = r - t;
  return {
    entityId: i,
    points: n.filter((s) => s.ts >= o).sort((s, a) => s.ts - a.ts)
  };
}, Jt = (e, t) => `${e}|${t}`, Te = (e) => e.map((t) => ({ ts: t.ts, value: t.value })), _e = async (e, t, r, n) => {
  const i = e.callApi, o = Array.from(new Set(t.filter((m) => m.length > 0)));
  if (!i || o.length === 0)
    return {};
  const s = Date.now(), a = typeof (n == null ? void 0 : n.startMs) == "number" && Number.isFinite(n.startMs) ? Math.max(s - r, Math.floor(n.startMs)) : s - r, l = a <= s - r + 1e3, c = {}, d = [];
  if (o.forEach((m) => {
    if (l) {
      const _ = Jt(m, r), u = Yt.get(_);
      if (u && u.expiresAt > s) {
        c[m] = Te(u.points);
        return;
      }
    }
    d.push(m);
  }), d.length === 0)
    return c;
  const h = [...d].sort(), y = `${a}|${r}|${h.join(",")}`, p = nt.get(y);
  if (p) {
    const m = await p;
    return d.forEach((_) => {
      c[_] = Te(m[_] ?? []);
    }), c;
  }
  const b = (async () => {
    const m = new Date(a).toISOString(), _ = d.join(","), u = `history/period/${m}?filter_entity_id=${encodeURIComponent(_)}&minimal_response&no_attributes`;
    let f;
    try {
      f = await i("GET", u);
    } catch {
      const w = {};
      return d.forEach((g) => {
        w[g] = [];
      }), w;
    }
    const x = Array.isArray(f) ? f : [], C = {};
    return x.forEach((w, g) => {
      const v = Fn(w, r, s), $ = d[g], R = v.entityId ?? $;
      R && (C[R] = v.points);
    }), d.forEach((w) => {
      w in C || (C[w] = []), l && Yt.set(Jt(w, r), {
        expiresAt: s + Vn,
        points: Te(C[w])
      });
    }), C;
  })();
  nt.set(y, b);
  try {
    const m = await b;
    return d.forEach((_) => {
      c[_] = Te(m[_] ?? []);
    }), c;
  } finally {
    nt.delete(y);
  }
}, Zt = {
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
}, ut = (e) => {
  if (Array.isArray(e) && e.length >= 3) {
    const i = e.slice(0, 3).map((o) => Number(o));
    if (i.every((o) => Number.isFinite(o))) {
      const [o, s, a] = i.map((l) => Math.max(0, Math.min(255, Math.round(l))));
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
  if (t in Zt)
    return `var(--rgb-${t}, ${Zt[t]})`;
  const r = /^#([a-fA-F0-9]{3})$/, n = /^#([a-fA-F0-9]{6})$/;
  if (r.test(t)) {
    const [, i] = t.match(r) ?? [];
    if (!i)
      return null;
    const o = parseInt(i[0] + i[0], 16), s = parseInt(i[1] + i[1], 16), a = parseInt(i[2] + i[2], 16);
    return `${o}, ${s}, ${a}`;
  }
  if (n.test(t)) {
    const [, i] = t.match(n) ?? [];
    if (!i)
      return null;
    const o = parseInt(i.slice(0, 2), 16), s = parseInt(i.slice(2, 4), 16), a = parseInt(i.slice(4, 6), 16);
    return `${o}, ${s}, ${a}`;
  }
  return null;
}, _t = (e, t = "") => {
  const r = ut(e);
  if (r)
    return `rgb(${r})`;
  if (typeof e == "string" && e.trim().length > 0) {
    const n = e.trim(), i = n.toLowerCase();
    if (i !== "none" && i !== "default")
      return n;
  }
  return t;
}, mt = (e) => {
  const t = ut(e);
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
}, yt = (e, t, r) => {
  const n = e.map((i) => ({
    x: i.x / 100 * t,
    y: i.y / 100 * r,
    value: i.value
  }));
  return Un(n, t);
}, Un = (e, t) => {
  if (e.length <= 3)
    return e;
  const r = Math.max(24, Math.min(e.length, Math.round(t)));
  if (e.length <= r)
    return Qt(e);
  const n = [];
  n.push(e[0]);
  const i = (e.length - 1) / (r - 1);
  for (let o = 1; o < r - 1; o += 1) {
    const s = Math.floor(o * i), a = Math.max(s + 1, Math.floor((o + 1) * i)), l = e.slice(s, Math.min(e.length, a));
    if (l.length === 0)
      continue;
    const c = l.reduce(
      (h, y) => (h.x += y.x, h.y += y.y, h.value += y.value, h),
      { x: 0, y: 0, value: 0 }
    ), d = l.length;
    n.push({
      x: c.x / d,
      y: c.y / d,
      value: c.value / d
    });
  }
  return n.push(e[e.length - 1]), Qt(n);
}, Qt = (e) => {
  if (e.length <= 3)
    return e;
  const t = [e[0]];
  for (let r = 1; r < e.length - 1; r += 1) {
    const n = e[r - 1], i = e[r], o = e[r + 1];
    t.push({
      x: i.x,
      y: (n.y + i.y * 2 + o.y) / 4,
      value: (n.value + i.value * 2 + o.value) / 4
    });
  }
  return t.push(e[e.length - 1]), t;
}, we = "0.1.12";
var jn = Object.defineProperty, Gn = Object.getOwnPropertyDescriptor, pt = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Gn(t, r) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (i = (n ? s(t, r, i) : s(i)) || i);
  return n && i && jn(t, r, i), i;
};
const Wn = 4, qn = 8, er = 2, Kn = (e, t) => {
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
  schema: Array.from({ length: n }, (i, o) => ({
    type: "expandable",
    name: "",
    title: `Block ${o + 1}`,
    icon: "mdi:view-grid-outline",
    expanded: !1,
    schema: Kn(e, o + 1)
  }))
}), Xn = [
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
          { name: "shared_trend_scale", selector: { boolean: {} } }
        ]
      }
    ]
  },
  Re("solar", "Solar sub blocks", "mdi:solar-power-variant", Wn),
  Re("grid", "Grid 1 sub blocks", "mdi:transmission-tower", er),
  Re("grid_secondary", "Grid 2 sub blocks", "mdi:transmission-tower", er),
  Re("home", "Home sub blocks", "mdi:flash", qn),
  {
    type: "grid",
    name: "",
    schema: [
      { name: "unit", selector: { text: {} } },
      { name: "decimals", selector: { number: { mode: "box", min: 0, max: 3, step: 1 } } }
    ]
  }
], Yn = {
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
let Ie = class extends H {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = e.name ?? "", r = t.match(/^(solar|home|grid|grid_secondary)_sub_(\d+)_(enabled|entity|label|icon|icon_color)$/);
      if (r) {
        const [, n, i, o] = r;
        return `${n === "solar" ? "Solar" : n === "home" ? "Home" : n === "grid" ? "Grid 1" : "Grid 2"} block ${i} ${{
          enabled: "Enabled",
          entity: "Entity",
          label: "Label",
          icon: "Icon",
          icon_color: "Color"
        }[o] ?? o}`;
      }
      return Yn[t] ?? t;
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
      type: "custom:power-pilz-energy-card"
    };
  }
  render() {
    return !this.hass || !this._config ? T : S`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${we}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Xn}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
pt([
  L({ attribute: !1 })
], Ie.prototype, "hass", 2);
pt([
  O()
], Ie.prototype, "_config", 2);
Ie = pt([
  oe("power-pilz-energy-card-editor")
], Ie);
var Jn = Object.defineProperty, Zn = Object.getOwnPropertyDescriptor, Y = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Zn(t, r) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (i = (n ? s(t, r, i) : s(i)) || i);
  return n && i && Jn(t, r, i), i;
};
const N = 0.01, it = 1, ce = 1440 * 60 * 1e3, tr = 300 * 1e3, rr = 60 * 1e3, Qn = 350, ei = 4, ti = 8, ri = 2, ni = 12, nr = 7, ii = 6, oi = 400, si = 300, ai = "var(--rgb-primary-text-color, 33, 33, 33)";
let j = class extends H {
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
    const t = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(t), n = (...d) => d.find((h) => h in t), i = (d) => r.find((h) => h.startsWith(`${d}.`)), o = n("sensor.dev_home_power", "sensor.house_consumption_power") ?? i("sensor") ?? "sensor.dev_home_power", s = n("sensor.dev_solar_power", "sensor.solar_production_power") ?? i("sensor"), a = n("sensor.dev_grid_power", "sensor.grid_power") ?? i("sensor"), l = n("sensor.dev_battery_power", "sensor.home_battery_power") ?? i("sensor"), c = n("sensor.dev_battery_soc", "sensor.home_battery_soc") ?? i("sensor");
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
      solar_entity: s,
      grid_entity: a,
      battery_entity: l,
      battery_percentage_entity: c,
      shared_trend_scale: !1,
      decimals: it
    };
  }
  setConfig(e) {
    const t = e.home_entity ?? e.consumption_entity ?? "sensor.dev_home_power", r = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : it;
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
      return S`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return S``;
    const e = this._config, t = e.decimals ?? it, r = e.home_visible !== !1, n = e.solar_visible !== !1, i = e.grid_visible !== !1, o = i && e.grid_secondary_visible === !0, s = e.battery_visible !== !1, a = s && e.battery_secondary_visible === !0, l = this.normalizeBatteryDualAlignment(e.battery_dual_alignment), c = k(this.hass, e.home_entity), d = n ? k(this.hass, e.solar_entity) : null, h = i ? k(this.hass, e.grid_entity) : null, y = o ? k(this.hass, e.grid_secondary_entity) : null, p = s ? k(this.hass, e.battery_entity) : null, b = k(this.hass, e.battery_percentage_entity), m = a ? k(this.hass, e.battery_secondary_entity) : null, _ = k(this.hass, e.battery_secondary_percentage_entity), u = e.home_auto_calculate === !0 ? this.computeAutoHomeValueFromNodeValues({
      solar: d,
      grid: h,
      grid_secondary: y,
      battery: p,
      battery_secondary: m
    }) : c, f = e.unit ?? "kW", x = B(this.hass, e.solar_entity) ?? f, C = e.home_auto_calculate === !0 ? this.resolveAutoHomeUnit(e, f) : B(this.hass, e.home_entity) ?? f, w = B(this.hass, e.grid_entity) ?? f, g = B(this.hass, e.grid_secondary_entity) ?? f, v = B(this.hass, e.battery_entity) ?? f, $ = B(this.hass, e.battery_secondary_entity) ?? f, R = this.toUnidirectionalFlow(d), E = this.toUnidirectionalFlow(u), z = this.toBidirectionalFlow(h), P = this.toBidirectionalFlow(y), V = h === null && y === null ? "none" : this.toBidirectionalFlow((h ?? 0) + (y ?? 0)), D = this.toBidirectionalFlow(p), Ir = this.toBidirectionalFlow(m), kr = p === null && m === null ? "none" : this.toBidirectionalFlow((p ?? 0) + (m ?? 0)), Nr = this.resolveTapAction(e), De = !this.isEditorPreview() && Nr.action !== "none", Br = this.iconColorStyle(e.solar_icon_color), Hr = this.iconColorStyle(e.grid_icon_color), Vr = this.iconColorStyle(e.grid_secondary_icon_color), Dr = this.iconColorStyle(e.home_icon_color), Fr = this.iconShapeStyle(e.core_icon_color), Fe = n ? this.collectSubBlocks("solar", e) : [], St = i ? this.collectSubBlocks("grid", e) : [], Ct = o ? this.collectSubBlocks("grid_secondary", e) : [], Ue = r ? this.collectSubBlocks("home", e) : [], je = new Set(Ue.map((A) => A.index)), ae = new Set(Fe.map((A) => A.index)), Ur = je.has(7) && je.has(8), jr = [5, 6, 7, 8].some((A) => je.has(A)), Gr = ae.has(1) && ae.has(2) && !ae.has(3) && !ae.has(4), Wr = ae.has(3) && ae.has(4), $t = o && (Gr && Ur || Wr && jr), qr = o && !$t, Ge = Ue.some((A) => A.index >= 7), Tt = this.homeSubPositions(Ge), Rt = this.gridSubPositions(o), Mt = this.gridSecondarySubPositions(), Et = this.solarSubPositions(
      Ge,
      qr,
      $t
    ), zt = Ue.filter((A) => A.index <= (Ge ? 8 : 6)), We = i ? { col: 1, row: o ? 2 : 3, colSpan: 2, rowSpan: 2 } : null, qe = o ? { col: 1, row: 4, colSpan: 2, rowSpan: 2 } : null, Ke = s ? {
      col: a && l === "center" ? 2 : 3,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, Xe = a ? {
      col: l === "left" ? 1 : l === "right" ? 5 : 4,
      row: 5,
      colSpan: 2,
      rowSpan: 2
    } : null, I = this.computeGridBounds(
      r,
      n,
      i,
      o,
      s,
      a,
      We,
      qe,
      Ke,
      Xe,
      Fe,
      St,
      Ct,
      zt,
      Et,
      Rt,
      Mt,
      Tt
    ), Ye = n ? this.normalizePlacement({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }, I) : null, xe = We ? this.normalizePlacement(We, I) : null, Se = qe ? this.normalizePlacement(qe, I) : null, Je = r ? this.normalizePlacement({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }, I) : null, Ce = Ke ? this.normalizePlacement(Ke, I) : null, $e = Xe ? this.normalizePlacement(Xe, I) : null, At = this.normalizePlacement({ col: 3, row: 3, colSpan: 2, rowSpan: 2 }, I), Kr = this.normalizePositions(Et, I), Xr = this.normalizePositions(Rt, I), Yr = this.normalizePositions(Mt, I), Jr = this.normalizePositions(Tt, I), Ot = this.normalizeBatteryThreshold(e.battery_low_threshold), Pt = !!e.battery_low_alert, Lt = this.normalizeBatteryThreshold(e.battery_secondary_low_threshold), It = !!e.battery_secondary_low_alert, kt = Pt && b !== null && b <= Ot, Zr = this.iconColorStyle(kt ? "red" : e.battery_icon_color), Qr = this.batteryIcon(b, p, e.battery_icon), Nt = It && _ !== null && _ <= Lt, en = this.iconColorStyle(
      Nt ? "red" : e.battery_secondary_icon_color
    ), tn = this.batteryIcon(
      _,
      m,
      e.battery_secondary_icon
    ), rn = { "--flow-color-rgb": this.toRgbCss(e.flow_color) ?? ai }, le = this.resolveColor("purple"), nn = this.resolveColor(e.solar_trend_color, le), on = this.resolveColor(e.grid_trend_color, le), sn = this.resolveColor(e.grid_secondary_trend_color, le), an = this.resolveColor(e.home_trend_color, le), ln = this.resolveColor(e.battery_trend_color, le), cn = this.resolveColor(e.battery_secondary_trend_color, le), Bt = this.resolveColor("red"), dn = Pt && (e.battery_percentage_entity || b !== null) ? Ot : null, hn = b ?? p, un = It && (e.battery_secondary_percentage_entity || _ !== null) ? Lt : null, _n = _ ?? m, mn = this.buildFlowSegments(
      Je,
      At,
      Ye,
      [
        ...xe ? [{ placement: xe, direction: z }] : [],
        ...Se ? [{ placement: Se, direction: P }] : []
      ],
      V,
      [
        ...Ce ? [{ placement: Ce, direction: D }] : [],
        ...$e ? [{ placement: $e, direction: Ir }] : []
      ],
      kr,
      R,
      E,
      I
    );
    return S`
      <ha-card
        class=${De ? "interactive" : ""}
        tabindex=${De ? 0 : -1}
        role=${De ? "button" : "article"}
        @click=${this.handleCardClick}
        @keydown=${this.handleCardKeyDown}
      >
        <div class="energy-flow-container">
          <div
            class="energy-grid"
            style=${M({
      ...rn,
      "--grid-columns": `${I.cols}`,
      "--grid-rows": `${I.rows}`,
      "--grid-aspect": `${I.cols} / ${I.rows}`
    })}
          >
            ${mn.map(
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

            ${n && Ye ? S`
                  <div
                    class="energy-value solar ${d === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Ye))}
                  >
                    ${this.renderTrend("solar", d, !!e.solar_trend, nn, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.solar_icon ?? "mdi:weather-sunny"}
                        style=${M(Br)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(d, x, t)}</div>
                      <div class="energy-label">${e.solar_label}</div>
                    </div>
                  </div>
                ` : T}

            ${i && xe ? S`
                  <div
                    class="energy-value grid ${h === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(xe))}
                  >
                    ${this.renderTrend("grid", h, !!e.grid_trend, on, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_icon ?? "mdi:transmission-tower"}
                        style=${M(Hr)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(h, w, t)}</div>
                      <div class="energy-label">${e.grid_label}</div>
                    </div>
                  </div>
                ` : T}

            ${o && Se ? S`
                  <div
                    class="energy-value grid-secondary ${y === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Se))}
                  >
                    ${this.renderTrend(
      "grid_secondary",
      y,
      !!e.grid_secondary_trend,
      sn,
      null,
      ""
    )}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.grid_secondary_icon ?? "mdi:transmission-tower"}
                        style=${M(Vr)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(y, g, t)}</div>
                      <div class="energy-label">${e.grid_secondary_label}</div>
                    </div>
                  </div>
                ` : T}

            ${r && Je ? S`
                  <div
                    class="energy-value home ${u === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Je))}
                  >
                    ${this.renderTrend("home", u, !!e.home_trend, an, null, "")}
                    <div class="energy-content">
                      <ha-icon
                        class="energy-icon"
                        .icon=${e.home_icon ?? "mdi:home-lightning-bolt"}
                        style=${M(Dr)}
                      ></ha-icon>
                      <div class="energy-number">${this.formatValue(u, C, t)}</div>
                      <div class="energy-label">${e.home_label}</div>
                    </div>
                  </div>
                ` : T}

            ${this._showSubBlocks ? this.renderSubNodes("solar", Fe, Kr, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("grid", St, Xr, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("grid_secondary", Ct, Yr, t) : T}
            ${this._showSubBlocks ? this.renderSubNodes("home", zt, Jr, t) : T}

            ${s && Ce ? S`
                  <div
                    class="energy-value battery ${p === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle(Ce))}
                  >
                    ${this.renderTrend(
      "battery",
      hn,
      !!e.battery_trend,
      ln,
      dn,
      Bt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon class="energy-icon" .icon=${Qr} style=${M(Zr)}></ha-icon>
                        ${b !== null ? S`
                              <div class="battery-percentage ${kt ? "alert" : ""}">
                                ${this.formatBatteryPercentage(b)}
                              </div>
                            ` : T}
                      </div>
                      <div class="energy-number">${this.formatValue(p, v, t)}</div>
                      <div class="energy-label">${e.battery_label}</div>
                    </div>
                  </div>
                ` : T}

            ${a && $e ? S`
                  <div
                    class="energy-value battery-secondary ${m === null ? "missing" : ""}"
                    style=${M(this.gridPlacementStyle($e))}
                  >
                    ${this.renderTrend(
      "battery_secondary",
      _n,
      !!e.battery_secondary_trend,
      cn,
      un,
      Bt
    )}
                    <div class="energy-content">
                      <div class="battery-top-row">
                        <ha-icon
                          class="energy-icon"
                          .icon=${tn}
                          style=${M(en)}
                        ></ha-icon>
                        ${_ !== null ? S`
                              <div class="battery-percentage ${Nt ? "alert" : ""}">
                                ${this.formatBatteryPercentage(_)}
                              </div>
                            ` : T}
                      </div>
                      <div class="energy-number">${this.formatValue(m, $, t)}</div>
                      <div class="energy-label">${e.battery_secondary_label}</div>
                    </div>
                  </div>
                ` : T}

            <div class="home-core" style=${M(this.gridPlacementStyle(At))}>
              <div class="home-core-icon" style=${M(Fr)}>
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
    return S`<div class=${n} style=${M(r)} aria-hidden="true"></div>`;
  }
  renderSubNodeConnectors() {
    return !this._showSubBlocks || this._subNodeConnectorSegments.length === 0 ? T : S`
      <div class="subnode-connectors" aria-hidden="true">
        ${this._subNodeConnectorSegments.map(
      (e) => S`
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
    const r = [], n = e === "solar" ? "mdi:solar-power-variant" : e === "home" ? "mdi:flash" : "mdi:transmission-tower", i = e === "solar" ? "Solar" : e === "home" ? "Home" : e === "grid" ? "Grid" : "Grid 2", o = e === "solar" ? ei : e === "home" ? ti : ri;
    for (let h = 1; h <= o; h += 1) {
      const y = t[`${e}_sub_${h}_enabled`] === !0, p = this.readConfigString(t[`${e}_sub_${h}_entity`]);
      !y || !p || r.push({
        key: `${e}_${h}`,
        index: h,
        icon: this.readConfigString(t[`${e}_sub_${h}_icon`]) ?? n,
        iconStyle: this.iconColorStyle(t[`${e}_sub_${h}_icon_color`]),
        label: this.readConfigString(t[`${e}_sub_${h}_label`]) ?? `${i} ${h}`,
        value: k(this.hass, p),
        unit: B(this.hass, p) ?? t.unit ?? "kW"
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
        value: k(this.hass, a),
        unit: B(this.hass, a) ?? t.unit ?? "kW"
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
  computeGridBounds(e, t, r, n, i, o, s, a, l, c, d, h, y, p, b, m, _, u) {
    const f = [{ col: 3, row: 3, colSpan: 2, rowSpan: 2 }];
    e && f.push({ col: 5, row: 3, colSpan: 2, rowSpan: 2 }), t && f.push({ col: 3, row: 1, colSpan: 2, rowSpan: 2 }), r && s && f.push(s), n && a && f.push(a), i && l && f.push(l), o && c && f.push(c), d.forEach((v) => {
      const $ = b[v.index];
      $ && f.push({ col: $.col, row: $.row, colSpan: 1, rowSpan: 1 });
    }), h.forEach((v) => {
      const $ = m[v.index];
      $ && f.push({ col: $.col, row: $.row, colSpan: 1, rowSpan: 1 });
    }), y.forEach((v) => {
      const $ = _[v.index];
      $ && f.push({ col: $.col, row: $.row, colSpan: 1, rowSpan: 1 });
    }), p.forEach((v) => {
      const $ = u[v.index];
      $ && f.push({ col: $.col, row: $.row, colSpan: 1, rowSpan: 1 });
    });
    const x = Math.min(...f.map((v) => v.col)), C = Math.max(...f.map((v) => v.col + (v.colSpan ?? 1) - 1)), w = Math.min(...f.map((v) => v.row)), g = Math.max(...f.map((v) => v.row + (v.rowSpan ?? 1) - 1));
    return {
      minCol: x,
      maxCol: C,
      minRow: w,
      maxRow: g,
      cols: C - x + 1,
      rows: g - w + 1
    };
  }
  placementCenter(e, t) {
    const r = e.colSpan ?? 1, n = e.rowSpan ?? 1;
    return {
      x: (e.col - 1 + r / 2) / t.cols * 100,
      y: (e.row - 1 + n / 2) / t.rows * 100
    };
  }
  buildFlowSegments(e, t, r, n, i, o, s, a, l, c) {
    const d = this.placementCenter(t, c), h = [], y = (b, m, _, u) => {
      const f = Math.min(b, m), x = Math.abs(m - b);
      x <= N || h.push({
        orientation: "horizontal",
        direction: u,
        left: f,
        top: _,
        width: x,
        height: 0
      });
    }, p = (b, m, _, u) => {
      const f = Math.min(b, m), x = Math.abs(m - b);
      x <= N || h.push({
        orientation: "vertical",
        direction: u,
        left: _,
        top: f,
        width: 0,
        height: x
      });
    };
    if (e) {
      const b = this.placementCenter(e, c);
      y(d.x, b.x, d.y, l);
    }
    if (r) {
      const b = this.placementCenter(r, c);
      p(b.y, d.y, d.x, a);
    }
    if (n.length === 1) {
      const [{ placement: b, direction: m }] = n, _ = this.placementCenter(b, c);
      y(_.x, d.x, d.y, m);
    } else if (n.length >= 2) {
      const b = n.map((u) => ({
        direction: u.direction,
        center: this.placementCenter(u.placement, c)
      })).sort((u, f) => u.center.y - f.center.y), m = Math.min(...b.map((u) => u.center.x)), _ = d.x - (d.x - m) * 0.5;
      y(d.x, _, d.y, i), b.forEach((u) => {
        const f = u.center.y > d.y + N ? this.reverseFlowDirection(u.direction) : u.direction;
        p(d.y, u.center.y, _, f), y(u.center.x, _, u.center.y, u.direction);
      });
    }
    if (o.length === 1) {
      const [{ placement: b, direction: m }] = o, _ = this.placementCenter(b, c);
      p(d.y, _.y, d.x, m);
    } else if (o.length >= 2) {
      const b = o.map((u) => ({
        placement: u.placement,
        direction: u.direction,
        center: this.placementCenter(u.placement, c)
      })).sort((u, f) => u.center.y - f.center.y), m = Math.min(
        ...b.map((u) => (u.placement.row - 1) / c.rows * 100)
      ), _ = Math.max(d.y + N, m);
      p(d.y, _, d.x, s), b.forEach((u) => {
        y(d.x, u.center.x, _, u.direction), p(_, u.center.y, u.center.x, u.direction);
      });
    }
    return h;
  }
  renderSubNodes(e, t, r, n) {
    return t.length === 0 ? T : S`
      ${t.map((i) => {
      const o = r[i.index];
      if (!o)
        return T;
      const s = {
        "grid-column": `${o.col}`,
        "grid-row": `${o.row}`
      };
      return S`
            <div
              class="energy-sub-value ${e}-sub sub-col-${o.col} ${i.value === null ? "missing" : ""}"
              data-key=${i.key}
              style=${M(s)}
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
      const o = B(this.hass, i.entityId);
      if (o && o.trim().length > 0)
        return o;
    }
    return t;
  }
  computeAutoHomeValueFromNodeValues(e) {
    if (!Object.values(e).some((n) => n != null && Number.isFinite(n)))
      return null;
    const r = (e.solar ?? 0) + (e.grid ?? 0) + (e.grid_secondary ?? 0) - (e.battery ?? 0) - (e.battery_secondary ?? 0);
    return Number.isFinite(r) ? r <= N ? 0 : r : null;
  }
  renderTrend(e, t, r, n, i, o) {
    return r ? (this._trendDrawConfig[e] = {
      currentValue: t,
      color: n,
      threshold: i,
      thresholdColor: o
    }, S`
      <div class="node-trend" aria-hidden="true">
        <canvas class="node-trend-canvas-area" data-node=${e}></canvas>
      </div>
      <div class="node-trend-line" aria-hidden="true">
        <canvas class="node-trend-canvas-line" data-node=${e}></canvas>
      </div>
    `) : (delete this._trendDrawConfig[e], T);
  }
  trendPoints(e, t) {
    const r = Date.now(), n = r - ce, o = [...(this._trendSeries[e] ?? []).filter((s) => s.ts >= n).sort((s, a) => s.ts - a.ts)];
    return t !== null && Number.isFinite(t) && o.push({ ts: r, value: t }), o;
  }
  buildThresholdTrendSegments(e, t) {
    const r = [];
    for (let n = 1; n < e.length; n += 1) {
      const i = e[n - 1], o = e[n], s = i.value <= t, a = o.value <= t;
      if (s === a || Math.abs(o.value - i.value) <= N) {
        r.push({
          start: i,
          end: o,
          low: s
        });
        continue;
      }
      const l = (t - i.value) / (o.value - i.value), c = Math.max(0, Math.min(1, l)), d = {
        x: i.x + (o.x - i.x) * c,
        y: i.y + (o.y - i.y) * c,
        value: t
      };
      r.push({
        start: i,
        end: d,
        low: s
      }), r.push({
        start: d,
        end: o,
        low: a
      });
    }
    return r;
  }
  toTrendCoordinates(e, t) {
    var u, f;
    const n = Date.now() - ce, i = 0, o = 100, s = e.map((x) => x.value), a = (t == null ? void 0 : t.min) ?? Math.min(...s), l = (t == null ? void 0 : t.max) ?? Math.max(...s);
    if (!Number.isFinite(a) || !Number.isFinite(l))
      return [];
    const c = 20, d = 80, h = Math.max(l - a, N), y = e.map((x) => {
      const C = Math.max(0, Math.min(100, (x.ts - n) / ce * 100)), w = i + C / 100 * (o - i), g = h <= N ? 0.5 : (x.value - a) / h, v = d - g * (d - c);
      return { x: w, y: v, value: x.value };
    }), p = ((u = y[0]) == null ? void 0 : u.x) ?? i, b = ((f = y[y.length - 1]) == null ? void 0 : f.x) ?? o, m = Math.max(0, b - p), _ = 18;
    if (y.length >= 2 && m < _) {
      const x = o - _, C = Math.max(i, Math.min(x, b - _));
      if (m <= N) {
        const g = _ / (y.length - 1);
        return y.map((v, $) => ({
          ...v,
          x: Math.max(i, Math.min(o, C + g * $))
        }));
      }
      const w = _ / m;
      return y.map((g) => ({
        ...g,
        x: Math.max(i, Math.min(o, C + (g.x - p) * w))
      }));
    }
    return y;
  }
  toCanvasPoints(e, t, r) {
    return yt(e, t, r);
  }
  computeTrendValueRange(e) {
    const t = [];
    if (Object.values(e).forEach((i) => {
      i.forEach((o) => t.push(o.value));
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
    const t = this.findLayoutSpan("column"), r = this.findLayoutSpan("row"), n = this.subBlocksMinRows(), i = t !== null && r !== null && t >= ni && r >= n, o = e.getBoundingClientRect(), s = o.width >= oi && o.height >= si, a = t !== null && r !== null ? i : s;
    a !== this._showSubBlocks && (this._showSubBlocks = a);
  }
  subBlocksMinRows() {
    if (!this._config)
      return nr;
    const e = this._config.solar_visible !== !1, t = this._config.battery_visible !== !1, r = this._config.battery_secondary_visible === !0;
    return !e || !(t || r) ? ii : nr;
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
    const o = e.getBoundingClientRect(), s = t == null ? void 0 : t.getBoundingClientRect(), a = r == null ? void 0 : r.getBoundingClientRect(), l = n == null ? void 0 : n.getBoundingClientRect(), c = i == null ? void 0 : i.getBoundingClientRect(), d = s ? s.left + s.width / 2 : 0, h = a ? a.top + a.height / 2 : 0, y = l ? l.left + l.width / 2 : 0, p = c ? c.left + c.width / 2 : 0, b = (w) => w - o.left, m = (w) => w - o.top, _ = (w) => Math.round(w * 10) / 10, u = [], f = (w, g, v, $) => {
      const R = Math.min(w, g), E = Math.abs(g - w);
      E <= 0.5 || u.push({
        node: $,
        left: _(R),
        top: _(v - 1),
        width: _(E),
        height: 2
      });
    }, x = (w, g, v, $) => {
      const R = Math.min(w, g), E = Math.abs(g - w);
      E <= 0.5 || u.push({
        node: $,
        left: _(v - 1),
        top: _(R),
        width: 2,
        height: _(E)
      });
    };
    s && this.renderRoot.querySelectorAll(".energy-sub-value.home-sub").forEach((w) => {
      const g = w.getBoundingClientRect(), v = g.top + g.height / 2, $ = g.left + g.width / 2 < d ? g.right : g.left, R = v, E = v < s.top ? s.top : v > s.bottom ? s.bottom : v, z = b(d), P = m(R), V = m(E), D = b($);
      f(D, z, P, "home"), x(P, V, z, "home");
    }), a && this.renderRoot.querySelectorAll(".energy-sub-value.solar-sub").forEach((w) => {
      const g = w.getBoundingClientRect(), v = g.left + g.width / 2, $ = g.top + g.height / 2 < h ? g.bottom : g.top, R = v, E = v < a.left ? a.left : v > a.right ? a.right : v, z = m(h), P = b(R), V = b(E), D = m($);
      x(D, z, P, "solar"), f(P, V, z, "solar");
    }), l && this.renderRoot.querySelectorAll(".energy-sub-value.grid-sub").forEach((w) => {
      const g = w.getBoundingClientRect(), v = g.top + g.height / 2, $ = g.left + g.width / 2 < y ? g.right : g.left, R = v, E = v < l.top ? l.top : v > l.bottom ? l.bottom : v, z = b(y), P = m(R), V = m(E), D = b($);
      f(D, z, P, "grid"), x(P, V, z, "grid");
    }), c && this.renderRoot.querySelectorAll(".energy-sub-value.grid_secondary-sub").forEach((w) => {
      const g = w.getBoundingClientRect(), v = g.top + g.height / 2, $ = g.left + g.width / 2 < p ? g.right : g.left, R = v, E = v < c.top ? c.top : v > c.bottom ? c.bottom : v, z = b(p), P = m(R), V = m(E), D = b($);
      f(D, z, P, "grid_secondary"), x(P, V, z, "grid_secondary");
    }), u.length === this._subNodeConnectorSegments.length && u.every(
      (w, g) => {
        var v, $, R, E, z;
        return w.node === ((v = this._subNodeConnectorSegments[g]) == null ? void 0 : v.node) && w.left === (($ = this._subNodeConnectorSegments[g]) == null ? void 0 : $.left) && w.top === ((R = this._subNodeConnectorSegments[g]) == null ? void 0 : R.top) && w.width === ((E = this._subNodeConnectorSegments[g]) == null ? void 0 : E.width) && w.height === ((z = this._subNodeConnectorSegments[g]) == null ? void 0 : z.height);
      }
    ) || (this._subNodeConnectorSegments = u);
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
    var s;
    const e = this.collectTrendCanvases(".node-trend-canvas-area"), t = this.collectTrendCanvases(".node-trend-canvas-line"), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
    e.forEach((a, l) => {
      const c = this.prepareTrendCanvas(a);
      c && r.set(l, c);
    }), t.forEach((a, l) => {
      const c = this.prepareTrendCanvas(a);
      c && n.set(l, c);
    });
    const i = {};
    Object.keys(this._trendDrawConfig).forEach((a) => {
      const l = this._trendDrawConfig[a];
      if (!l)
        return;
      const c = this.trendPoints(a, l.currentValue);
      c.length >= 2 && (i[a] = c);
    });
    const o = ((s = this._config) == null ? void 0 : s.shared_trend_scale) === !0 ? this.computeTrendValueRange(i) : null;
    Object.keys(this._trendDrawConfig).forEach((a) => {
      const l = this._trendDrawConfig[a];
      if (!l)
        return;
      const c = r.get(a), d = n.get(a);
      if (!c || !d)
        return;
      const h = i[a];
      if (!h || h.length < 2)
        return;
      const y = this.toTrendCoordinates(h, o);
      if (y.length < 2)
        return;
      const p = this.toCanvasPoints(y, c.width, c.height), b = this.toCanvasPoints(y, d.width, d.height);
      this.drawTrendArea(
        c.ctx,
        p,
        l.color,
        c.height,
        l.threshold,
        l.thresholdColor
      ), this.drawTrendLine(d.ctx, b, l.color, l.threshold, l.thresholdColor);
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
    const r = e.getBoundingClientRect(), n = Math.max(1, Math.round(r.width)), i = Math.max(1, Math.round(r.height)), o = Math.max(1, window.devicePixelRatio || 1), s = Math.max(1, Math.round(n * o)), a = Math.max(1, Math.round(i * o));
    return (e.width !== s || e.height !== a) && (e.width = s, e.height = a), t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height), t.setTransform(o, 0, 0, o, 0, 0), { ctx: t, width: n, height: i };
  }
  drawTrendArea(e, t, r, n, i, o) {
    if (t.length < 2)
      return;
    const s = this.resolveCanvasColor(r);
    if (i === null) {
      this.fillTrendAreaRun(e, t, s, n);
      return;
    }
    const a = this.resolveCanvasColor(o), l = this.buildThresholdTrendSegments(t, i);
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
      const n = t[t.length - 1], i = n.points[n.points.length - 1], o = Math.abs(i.x - r.start.x) <= 0.01 && Math.abs(i.y - r.start.y) <= 0.01;
      n.low === r.low && o ? n.points.push(r.end) : t.push({
        low: r.low,
        points: [r.start, r.end]
      });
    }
    return t;
  }
  fillTrendAreaRun(e, t, r, n) {
    if (t.length < 2)
      return;
    const i = t[0], o = t[t.length - 1], s = Math.min(...t.map((l) => l.y)), a = e.createLinearGradient(0, s, 0, n);
    a.addColorStop(0, this.withAlpha(r, 0.24)), a.addColorStop(1, this.withAlpha(r, 0)), e.beginPath(), e.moveTo(i.x, i.y), t.slice(1).forEach((l) => e.lineTo(l.x, l.y)), e.lineTo(o.x, n), e.lineTo(i.x, n), e.closePath(), e.fillStyle = a, e.fill();
  }
  drawTrendLine(e, t, r, n, i) {
    if (t.length < 2)
      return;
    const o = this.resolveCanvasColor(r), s = this.resolveCanvasColor(i);
    if (n === null) {
      this.strokeTrendPolyline(e, t, o, 1.5);
      return;
    }
    this.buildThresholdTrendSegments(t, n).forEach((l) => {
      this.strokeTrendSegment(e, l.start, l.end, l.low ? s : o, 1.5);
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
    const i = n.fillStyle, s = (typeof i == "string" ? i.trim() : "").match(/^#([a-f\d]{6})$/i);
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
    this.teardownVisibilityObserver(), this.stopLiveRuntime(), super.disconnectedCallback();
  }
  updated(e) {
    (e.has("preview") || e.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (e.has("_config") ? this.scheduleConfigRefresh() : e.has("hass") && this._isVisible && this.maybeRefreshTrendHistory(), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (e.has("_config") ? this.scheduleConfigRefresh(!0) : e.has("hass") && this.maybeRefreshTrendHistory(!1, !0), this._trendResizeObserver && this._trendResizeObserver.disconnect()), this.updateSubBlockVisibility(), (!this.shouldRunLiveRuntime() || this._isVisible) && (this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
  }
  maybeRefreshTrendHistory(e = !1, t = !1) {
    if (!this.shouldRunLiveRuntime() && !t || !this._isVisible && !t || t && !this.isEditorPreview())
      return;
    e && (this._lastTrendRefresh = 0);
    const r = Date.now();
    !e && r - this._lastTrendRefresh < tr || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  shouldRunLiveRuntime() {
    return !this.isEditorPreview();
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
    }, Qn));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, tr), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.syncTrendResizeObserver(), this.updateSubBlockVisibility(), this.scheduleSubNodeConnectorDraw(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this.clearConfigRefreshTimer(), this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._subNodeConnectorRaf !== void 0 && (window.cancelAnimationFrame(this._subNodeConnectorRaf), this._subNodeConnectorRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
  }
  async refreshTrendHistory(e = !1, t = !1) {
    var i, o;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !t)
      return;
    const r = this._config, n = this.enabledTrendNodes(r);
    if (n.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const s = {}, a = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Set();
      let y = Number.POSITIVE_INFINITY;
      const p = Date.now() - ce;
      for (const u of n) {
        if (u === "home" && r.home_auto_calculate === !0) {
          const g = this.homeComputationDependencies(r);
          if (g.length === 0) {
            s[u] = [];
            continue;
          }
          l.set(u, g);
          const v = this._trendSeries[u] ?? [];
          if (e || v.length === 0) {
            c.add(u), g.forEach((E) => {
              d.add(E.entityId), h.delete(E.entityId);
            });
            continue;
          }
          const $ = ((i = v[v.length - 1]) == null ? void 0 : i.ts) ?? p, R = Math.max(p, $ - rr);
          y = Math.min(y, R), g.forEach((E) => {
            d.has(E.entityId) || h.add(E.entityId);
          });
          continue;
        }
        const f = this.trendEntityId(u, r);
        if (!f)
          continue;
        a.set(u, f);
        const x = this._trendSeries[u] ?? [];
        if (e || x.length === 0 || d.has(f)) {
          d.add(f), h.delete(f);
          continue;
        }
        if (d.has(f))
          continue;
        h.add(f);
        const C = ((o = x[x.length - 1]) == null ? void 0 : o.ts) ?? p, w = Math.max(p, C - rr);
        y = Math.min(y, w);
      }
      const b = d.size > 0 ? await _e(this.hass, Array.from(d), ce) : {}, m = h.size > 0 ? await _e(
        this.hass,
        Array.from(h),
        ce,
        { startMs: Number.isFinite(y) ? y : p }
      ) : {};
      a.forEach((u, f) => {
        const x = this._trendSeries[f] ?? [];
        if (d.has(u)) {
          const C = b[u] ?? [];
          s[f] = C.length > 0 ? C : x.filter((w) => w.ts >= p);
          return;
        }
        if (h.has(u)) {
          const C = m[u] ?? [];
          s[f] = Le(x, C, p);
          return;
        }
        s[f] = x.filter((C) => C.ts >= p);
      }), l.forEach((u, f) => {
        const x = this._trendSeries[f] ?? [], C = this.computeAutoHomeTrendFromFetchedDependencies(
          u,
          b,
          m,
          d,
          h,
          p
        );
        if (c.has(f)) {
          s[f] = C.length > 0 ? C : x.filter((w) => w.ts >= p);
          return;
        }
        s[f] = Le(x, C, p);
      }), this.sameTrendSeriesKeys(s, this._trendSeries) && Object.keys(s).every(
        (u) => this.areTrendSeriesEqual(s[u] ?? [], this._trendSeries[u] ?? [])
      ) || (this._trendSeries = s);
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
  computeAutoHomeTrendFromFetchedDependencies(e, t, r, n, i, o) {
    const s = {};
    return e.forEach((a) => {
      const l = n.has(a.entityId) ? t[a.entityId] ?? [] : i.has(a.entityId) ? r[a.entityId] ?? [] : [];
      s[a.role] = l.filter((c) => Number.isFinite(c.ts) && Number.isFinite(c.value) && c.ts >= o).sort((c, d) => c.ts - d.ts);
    }), this.computeAutoHomeTrendSeries(s, o);
  }
  computeAutoHomeTrendSeries(e, t) {
    const r = [];
    if (Object.values(e).forEach((i) => {
      i.forEach((o) => {
        Number.isFinite(o.ts) && o.ts >= t && r.push(o.ts);
      });
    }), r.length === 0)
      return [];
    r.sort((i, o) => i - o);
    const n = [];
    return r.forEach((i) => {
      const o = n[n.length - 1];
      (o === void 0 || Math.abs(o - i) > 0.5) && n.push(i);
    }), n.map((i) => {
      const o = this.computeAutoHomeValueFromNodeValues({
        solar: this.interpolateTrendSeriesValue(e.solar ?? [], i),
        grid: this.interpolateTrendSeriesValue(e.grid ?? [], i),
        grid_secondary: this.interpolateTrendSeriesValue(e.grid_secondary ?? [], i),
        battery: this.interpolateTrendSeriesValue(e.battery ?? [], i),
        battery_secondary: this.interpolateTrendSeriesValue(e.battery_secondary ?? [], i)
      });
      return o === null ? null : { ts: i, value: o };
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
    const o = Math.max(1, Math.min(e.length - 1, n)), s = e[o - 1], a = e[o], l = a.ts - s.ts;
    if (Math.abs(l) <= N)
      return a.value;
    const c = (t - s.ts) / l;
    return s.value + (a.value - s.value) * c;
  }
  sameTrendSeriesKeys(e, t) {
    const r = Object.keys(e).sort(), n = Object.keys(t).sort();
    return r.length === n.length && r.every((i, o) => i === n[o]);
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
    return _t(e, t);
  }
  toRgbCss(e) {
    return ut(e);
  }
};
j.styles = He`
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
  L({ attribute: !1 })
], j.prototype, "hass", 2);
Y([
  L({ type: Boolean })
], j.prototype, "preview", 2);
Y([
  L({ type: Boolean })
], j.prototype, "editMode", 2);
Y([
  O()
], j.prototype, "_config", 2);
Y([
  O()
], j.prototype, "_trendSeries", 2);
Y([
  O()
], j.prototype, "_showSubBlocks", 2);
Y([
  O()
], j.prototype, "_subNodeConnectorSegments", 2);
j = Y([
  oe("power-pilz-energy-card")
], j);
const U = (e) => {
  if (typeof e != "string")
    return;
  const t = e.trim();
  return t.length > 0 ? t : void 0;
}, br = (e, t) => {
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
}, vr = (e, t) => {
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
}, gr = (e, t) => {
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
}, wr = (e, t) => {
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
}, xr = (e, t) => {
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
}, Sr = (e, t) => {
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
}, Cr = (e, t) => {
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
}, $r = (e) => e === "column" ? "column" : "row", ft = (e, t = 24) => {
  const r = typeof e == "number" ? e : typeof e == "string" ? Number.parseInt(e, 10) : NaN;
  return r === 6 || r === 12 || r === 24 ? r : t;
}, bt = (e) => typeof e != "number" || !Number.isFinite(e) ? 1.5 : Math.max(0.5, Math.min(6, e)), Tr = (e, t, r, n) => {
  var s;
  if (t)
    return t;
  const i = e[r], o = (s = i == null ? void 0 : i.attributes) == null ? void 0 : s.friendly_name;
  return typeof o == "string" && o.trim().length > 0 ? o.trim() : `Entity ${n}`;
}, Rr = (e, t, r) => {
  if (e === null)
    return t ? `-- ${t}` : "--";
  const n = `${e.toFixed(r)} ${t}`.trim();
  return n.length > 0 ? n : "--";
}, li = 4, Mr = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
}, ci = {
  legend_layout: "Label layout",
  timeframe_hours: "Time range",
  hover_enabled: "Enable hover",
  fill_area_enabled: "Enable area fill",
  shared_trend_scale: "Shared trend scale",
  clip_graph_to_labels: "Clip graph below labels",
  line_thickness: "Line thickness",
  unit: "Unit override",
  decimals: "Decimals"
}, di = (e) => ({
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
              default_color: Mr[e] ?? "purple"
            }
          }
        }
      ]
    }
  ]
}), Er = (e = !1) => {
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
        }
      ]
    },
    {
      type: "grid",
      name: "",
      schema: t
    },
    ...Array.from({ length: li }, (r, n) => di(n + 1)),
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
}, zr = (e) => e === "column" ? "column" : "row", Ar = (e) => ft(e), Or = (e) => bt(e), Me = (e, t, r) => {
  const n = e ?? t;
  return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : Mr[r] ?? "purple";
}, Pr = (e) => ({
  entity_1: q(e.entity_1) ?? q(e.entity),
  entity_1_name: q(e.entity_1_name),
  entity_1_enabled: e.entity_1_enabled ?? !0,
  entity_1_show_icon: e.entity_1_show_icon ?? !0,
  entity_1_icon: e.entity_1_icon ?? e.icon,
  entity_1_icon_color: e.entity_1_icon_color ?? e.icon_color,
  entity_1_trend_color: Me(e.entity_1_trend_color, e.trend_color, 1),
  entity_2: q(e.entity_2),
  entity_2_name: q(e.entity_2_name),
  entity_2_enabled: e.entity_2_enabled ?? !1,
  entity_2_show_icon: e.entity_2_show_icon ?? !0,
  entity_2_icon: e.entity_2_icon,
  entity_2_trend_color: Me(e.entity_2_trend_color, void 0, 2),
  entity_3: q(e.entity_3),
  entity_3_name: q(e.entity_3_name),
  entity_3_enabled: e.entity_3_enabled ?? !1,
  entity_3_show_icon: e.entity_3_show_icon ?? !0,
  entity_3_icon: e.entity_3_icon,
  entity_3_trend_color: Me(e.entity_3_trend_color, void 0, 3),
  entity_4: q(e.entity_4),
  entity_4_name: q(e.entity_4_name),
  entity_4_enabled: e.entity_4_enabled ?? !1,
  entity_4_show_icon: e.entity_4_show_icon ?? !0,
  entity_4_icon: e.entity_4_icon,
  entity_4_trend_color: Me(e.entity_4_trend_color, void 0, 4)
}), Lr = (e, t = {}) => {
  const r = e.name ?? "", n = r.match(/^entity_(\d+)_(enabled|name|show_icon|icon|icon_color|trend_color)$/);
  if (n) {
    const [, o, s] = n;
    return `Entity ${o} ${{
      enabled: "Enabled",
      name: "Name",
      show_icon: "Show icon",
      icon: "Icon",
      icon_color: "Icon color",
      trend_color: "Graph color"
    }[s] ?? s}`;
  }
  const i = r.match(/^entity_(\d+)$/);
  return i ? `Entity ${i[1]}` : t[r] ?? ci[r] ?? r;
};
var hi = Object.defineProperty, ui = Object.getOwnPropertyDescriptor, vt = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? ui(t, r) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (i = (n ? s(t, r, i) : s(i)) || i);
  return n && i && hi(t, r, i), i;
};
const _i = Er(!1);
let ke = class extends H {
  constructor() {
    super(...arguments), this.computeLabel = (e) => Lr(e), this.valueChanged = (e) => {
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
      legend_layout: zr(e.legend_layout),
      timeframe_hours: Ar(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      line_thickness: Or(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...Pr(e)
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? T : S`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${we}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${_i}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
vt([
  L({ attribute: !1 })
], ke.prototype, "hass", 2);
vt([
  O()
], ke.prototype, "_config", 2);
ke = vt([
  oe("power-pilz-graph-card-editor")
], ke);
var mi = Object.defineProperty, yi = Object.getOwnPropertyDescriptor, J = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? yi(t, r) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (i = (n ? s(t, r, i) : s(i)) || i);
  return n && i && mi(t, r, i), i;
};
const ot = 1, ir = 24, or = 300 * 1e3, pi = 60 * 1e3, fi = 350, Ee = 0.01, st = 4, bi = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", sr = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let G = class extends H {
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
      const o = this.findNearestHoverPoint(n, i);
      if (!o) {
        this.clearHoverState();
        return;
      }
      const s = this._hoverState;
      s && s.slot === o.slot && Math.abs(s.x - o.x) <= 0.2 && Math.abs(s.y - o.y) <= 0.2 && Math.abs(s.value - o.value) <= 1e-4 && s.color === o.color || (this._hoverState = o);
    }, this.handlePointerLeave = () => {
      this.clearHoverState();
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-graph-card-editor");
  }
  static async getStubConfig(e) {
    const t = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(t), n = (...c) => c.find((d) => d in t), i = (c) => r.find((d) => d.startsWith(`${c}.`)), o = n("sensor.dev_home_power", "sensor.home_power") ?? i("sensor") ?? "sensor.dev_home_power", s = n("sensor.dev_solar_power", "sensor.solar_power"), a = n("sensor.dev_grid_power", "sensor.grid_power"), l = n("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-card",
      legend_layout: "row",
      timeframe_hours: ir,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
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
      decimals: ot
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : ot, r = this.readConfigString(e.entity), n = this.readConfigString(e.icon), i = this.readConfigString(e.entity_1) ?? r ?? "sensor.dev_home_power";
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
      return S`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return S``;
    const e = this._config, t = e.decimals ?? ot, r = this.normalizeLineThickness(e.line_thickness), n = this.collectSeriesEntries(e, t), i = this.normalizeLegendLayout(e.legend_layout), o = e.hover_enabled !== !1, s = this._hoverState, a = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, l = a > 0 ? { top: `${a}px` } : {}, c = s ? {
      left: `${s.x}px`,
      top: `${s.y + a}px`,
      "--hover-dot-color": s.color
    } : {};
    return this._drawConfigs = n.map((d) => ({
      slot: d.slot,
      currentValue: d.currentValue,
      color: d.trendColor,
      lineWidth: r
    })), S`
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
          ${o && s ? S`<div class="hover-dot" aria-hidden="true" style=${M(c)}></div>` : T}

          <div class="content">
            <div class="series-list layout-${i}">
              ${n.length === 0 ? S`
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
    return S`
      <div class="state-item" data-slot=${String(e.slot)}>
        ${e.showIcon ? S`
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
    for (let n = 1; n <= st; n += 1) {
      const i = n, o = this.slotEnabled(i, e), s = this.slotEntityId(i, e);
      if (!o || !s)
        continue;
      const a = this.entityName(this.slotCustomName(i, e), s, n), l = k(this.hass, s), c = e.unit ?? B(this.hass, s) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(i, e), y = this.iconStyle(this.slotIconColor(i, e)), p = this.resolveColor(sr[i], bi), b = this.resolveColor(this.slotTrendColor(i, e), p);
      r.push({
        slot: i,
        entityId: s,
        name: a,
        secondary: d,
        unit: c,
        decimals: t,
        currentValue: l,
        icon: h,
        showIcon: this.slotShowIcon(i, e),
        iconStyle: y,
        trendColor: b
      });
    }
    return r;
  }
  slotEntityId(e, t) {
    return br(e, t);
  }
  slotCustomName(e, t) {
    return vr(e, t);
  }
  slotEnabled(e, t) {
    return gr(e, t);
  }
  slotShowIcon(e, t) {
    return wr(e, t);
  }
  slotIcon(e, t) {
    return xr(e, t);
  }
  slotIconColor(e, t) {
    return Sr(e, t);
  }
  slotTrendColor(e, t) {
    return Cr(e, t);
  }
  entityName(e, t, r) {
    return Tr(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    return Rr(e, t, r);
  }
  readConfigString(e) {
    return U(e);
  }
  normalizeLegendLayout(e) {
    return $r(e);
  }
  normalizeTimeframeHours(e) {
    return ft(e, ir);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return bt(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : sr[r];
  }
  iconStyle(e) {
    return mt(e);
  }
  resolveColor(e, t = "") {
    return _t(e, t);
  }
  trendPoints(e, t) {
    const r = Date.now(), n = r - this.trendWindowMs(this._config), o = [...(this._trendSeries[e] ?? []).filter((s) => s.ts >= n).sort((s, a) => s.ts - a.ts)];
    return t !== null && Number.isFinite(t) && o.push({ ts: r, value: t }), o;
  }
  toTrendCoordinates(e, t, r) {
    var f, x;
    const i = Date.now() - t, o = 0, s = 100, a = e.map((C) => C.value), l = (r == null ? void 0 : r.min) ?? Math.min(...a), c = (r == null ? void 0 : r.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, y = Math.max(c - l, Ee), p = e.map((C) => {
      const w = Math.max(0, Math.min(100, (C.ts - i) / t * 100)), g = o + w / 100 * (s - o), v = y <= Ee ? 0.5 : (C.value - l) / y, $ = h - v * (h - d);
      return { x: g, y: $, value: C.value };
    }), b = ((f = p[0]) == null ? void 0 : f.x) ?? o, m = ((x = p[p.length - 1]) == null ? void 0 : x.x) ?? s, _ = Math.max(0, m - b), u = 18;
    if (p.length >= 2 && _ < u) {
      const C = s - u, w = Math.max(o, Math.min(C, m - u));
      if (_ <= Ee) {
        const v = u / (p.length - 1);
        return p.map(($, R) => ({
          ...$,
          x: Math.max(o, Math.min(s, w + v * R))
        }));
      }
      const g = u / _;
      return p.map((v) => ({
        ...v,
        x: Math.max(o, Math.min(s, w + (v.x - b) * g))
      }));
    }
    return p;
  }
  toCanvasPoints(e, t, r) {
    return yt(e, t, r);
  }
  computeTrendValueRange(e) {
    const t = [];
    if (Object.values(e).forEach((i) => {
      i.forEach((o) => t.push(o.value));
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
    var d, h;
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
    const i = ((d = this._config) == null ? void 0 : d.fill_area_enabled) !== !1, o = this.trendWindowMs(this._config), s = {};
    this._drawConfigs.forEach((y) => {
      const p = this.trendPoints(y.slot, y.currentValue);
      p.length >= 2 && (s[y.slot] = p);
    });
    const a = ((h = this._config) == null ? void 0 : h.shared_trend_scale) === !0 ? this.computeTrendValueRange(s) : null, l = {};
    [...this._drawConfigs].sort((y, p) => p.slot - y.slot).forEach((y) => {
      const p = s[y.slot];
      if (!p || p.length < 2)
        return;
      const b = this.toTrendCoordinates(p, o, a);
      if (b.length < 2)
        return;
      const m = this.toCanvasPoints(b, r.width, r.height), _ = this.toCanvasPoints(b, n.width, n.height);
      i && this.drawTrendArea(r.ctx, m, y.color, r.height), this.drawTrendLine(n.ctx, _, y.color, y.lineWidth), l[y.slot] = _;
    }), this._linePointsBySlot = l, this._hoverState && !l[this._hoverState.slot] && (this._hoverState = void 0);
  }
  prepareTrendCanvas(e) {
    const t = e.getContext("2d");
    if (!t)
      return null;
    const r = e.getBoundingClientRect(), n = Math.max(1, Math.round(r.width)), i = Math.max(1, Math.round(r.height)), o = Math.max(1, window.devicePixelRatio || 1), s = Math.max(1, Math.round(n * o)), a = Math.max(1, Math.round(i * o));
    return (e.width !== s || e.height !== a) && (e.width = s, e.height = a), t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height), t.setTransform(o, 0, 0, o, 0, 0), { ctx: t, width: n, height: i };
  }
  drawTrendArea(e, t, r, n) {
    if (t.length < 2)
      return;
    const i = this.resolveCanvasColor(r), o = t[0], s = t[t.length - 1], a = Math.min(...t.map((c) => c.y)), l = e.createLinearGradient(0, a, 0, n);
    l.addColorStop(0, this.withAlpha(i, 0.24)), l.addColorStop(1, this.withAlpha(i, 0)), e.beginPath(), e.moveTo(o.x, o.y), t.slice(1).forEach((c) => e.lineTo(c.x, c.y)), e.lineTo(s.x, n), e.lineTo(o.x, n), e.closePath(), e.fillStyle = l, e.fill();
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
      const o = this._linePointsBySlot[i.slot];
      if (!o || o.length < 2)
        continue;
      const s = this.interpolateCanvasPoint(o, e);
      if (!s)
        continue;
      const a = Math.abs(s.y - t);
      a < n && (n = a, r = {
        slot: i.slot,
        x: s.x,
        y: s.y,
        value: s.value,
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
      const o = e[i - 1], s = e[i];
      if (t > s.x)
        continue;
      const a = s.x - o.x;
      if (Math.abs(a) <= Ee)
        return { x: t, y: s.y, value: s.value };
      const l = (t - o.x) / a;
      return {
        x: t,
        y: o.y + (s.y - o.y) * l,
        value: o.value + (s.value - o.value) * l
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
    const i = n.fillStyle, s = (typeof i == "string" ? i.trim() : "").match(/^#([a-f\d]{6})$/i);
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
    this.clearHoverState(), this.teardownVisibilityObserver(), this.stopLiveRuntime(), super.disconnectedCallback();
  }
  updated(e) {
    var t;
    (e.has("preview") || e.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (e.has("_config") ? (this.scheduleConfigRefresh(), this.clearHoverState()) : e.has("hass") && this._isVisible && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (e.has("_config") ? (this.scheduleConfigRefresh(!0), this.clearHoverState()) : e.has("hass") && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((t = this._config) == null ? void 0 : t.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset(), (!this.shouldRunLiveRuntime() || this._isVisible) && this.scheduleTrendCanvasDraw();
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
    const n = t.getBoundingClientRect(), i = r.getBoundingClientRect(), o = Math.max(0, Math.ceil(i.bottom - n.top));
    Math.abs(o - this._graphTopInset) > 0.5 && (this._graphTopInset = o);
  }
  maybeRefreshTrendHistory(e = !1, t = !1) {
    if (!this.shouldRunLiveRuntime() && !t || !this._isVisible && !t || t && !this.isEditorPreview())
      return;
    e && (this._lastTrendRefresh = 0);
    const r = Date.now();
    !e && r - this._lastTrendRefresh < or || (this._lastTrendRefresh = r, this.refreshTrendHistory(e, t));
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  shouldRunLiveRuntime() {
    return !this.isEditorPreview();
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
    }, fi));
  }
  clearConfigRefreshTimer() {
    this._configRefreshTimer !== void 0 && (window.clearTimeout(this._configRefreshTimer), this._configRefreshTimer = void 0);
  }
  startLiveRuntime(e = !1) {
    !this.shouldRunLiveRuntime() || !this._isVisible || this._liveRuntimeActive || (this._liveRuntimeActive = !0, this.maybeRefreshTrendHistory(e), this._trendRefreshTimer = window.setInterval(() => {
      this.maybeRefreshTrendHistory();
    }, or), this.updateComplete.then(() => {
      this._liveRuntimeActive && (this.updateGraphTopInset(), this.syncTrendResizeObserver(), this.scheduleTrendCanvasDraw());
    }));
  }
  stopLiveRuntime() {
    this.clearConfigRefreshTimer(), this._liveRuntimeActive = !1, this._trendRefreshTimer !== void 0 && (window.clearInterval(this._trendRefreshTimer), this._trendRefreshTimer = void 0), this._trendCanvasRaf !== void 0 && (window.cancelAnimationFrame(this._trendCanvasRaf), this._trendCanvasRaf = void 0), this._trendResizeObserver && (this._trendResizeObserver.disconnect(), this._trendResizeObserver = void 0);
  }
  async refreshTrendHistory(e = !1, t = !1) {
    var s;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !t)
      return;
    const r = this._config, n = {}, i = this.trendWindowMs(r), o = this.enabledSlots(r);
    if (o.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const a = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set();
      let d = Number.POSITIVE_INFINITY;
      const h = Date.now() - i;
      for (const m of o) {
        const _ = this.slotEntityId(m, r);
        if (!_)
          continue;
        a.set(m, _);
        const u = this._trendSeries[m] ?? [];
        if (e || u.length === 0 || l.has(_)) {
          l.add(_), c.delete(_);
          continue;
        }
        if (l.has(_))
          continue;
        c.add(_);
        const f = ((s = u[u.length - 1]) == null ? void 0 : s.ts) ?? h, x = Math.max(h, f - pi);
        d = Math.min(d, x);
      }
      const y = l.size > 0 ? await _e(this.hass, Array.from(l), i) : {}, p = c.size > 0 ? await _e(
        this.hass,
        Array.from(c),
        i,
        { startMs: Number.isFinite(d) ? d : h }
      ) : {};
      a.forEach((m, _) => {
        const u = this._trendSeries[_] ?? [];
        if (l.has(m)) {
          const f = y[m] ?? [];
          n[_] = f.length > 0 ? f : u.filter((x) => x.ts >= h);
          return;
        }
        if (c.has(m)) {
          const f = p[m] ?? [];
          n[_] = Le(u, f, h);
          return;
        }
        n[_] = u.filter((f) => f.ts >= h);
      }), this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((m) => Number(m)).filter((m) => Number.isFinite(m) && m >= 1 && m <= st).every((m) => {
        const _ = m;
        return this.areTrendSeriesEqual(n[_] ?? [], this._trendSeries[_] ?? []);
      }) || (this._trendSeries = n);
    } finally {
      this._trendRefreshInFlight = !1;
    }
  }
  enabledSlots(e) {
    const t = [];
    for (let r = 1; r <= st; r += 1) {
      const n = r;
      this.slotEnabled(n, e) && this.slotEntityId(n, e) && t.push(n);
    }
    return t;
  }
  sameTrendSeriesKeys(e, t) {
    const r = Object.keys(e).sort(), n = Object.keys(t).sort();
    return r.length === n.length && r.every((i, o) => i === n[o]);
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
G.styles = He`
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
  O()
], G.prototype, "_config", 2);
J([
  O()
], G.prototype, "_trendSeries", 2);
J([
  O()
], G.prototype, "_graphTopInset", 2);
J([
  O()
], G.prototype, "_hoverState", 2);
G = J([
  oe("power-pilz-graph-card")
], G);
var vi = Object.defineProperty, gi = Object.getOwnPropertyDescriptor, gt = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? gi(t, r) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (i = (n ? s(t, r, i) : s(i)) || i);
  return n && i && vi(t, r, i), i;
};
const wi = Er(!0);
let Ne = class extends H {
  constructor() {
    super(...arguments), this.computeLabel = (e) => Lr(e, {
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
      legend_layout: zr(e.legend_layout),
      timeframe_hours: Ar(e.timeframe_hours),
      hover_enabled: e.hover_enabled ?? !0,
      fill_area_enabled: e.fill_area_enabled ?? !0,
      shared_trend_scale: e.shared_trend_scale ?? !1,
      normalize_stack_to_percent: e.normalize_stack_to_percent ?? !1,
      line_thickness: Or(e.line_thickness),
      clip_graph_to_labels: e.clip_graph_to_labels ?? !1,
      ...Pr(e)
    };
    this._config = t;
  }
  render() {
    return !this.hass || !this._config ? T : S`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${we}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${wi}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
gt([
  L({ attribute: !1 })
], Ne.prototype, "hass", 2);
gt([
  O()
], Ne.prototype, "_config", 2);
Ne = gt([
  oe("power-pilz-graph-stack-card-editor")
], Ne);
var xi = Object.defineProperty, Si = Object.getOwnPropertyDescriptor, Z = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Si(t, r) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (i = (n ? s(t, r, i) : s(i)) || i);
  return n && i && xi(t, r, i), i;
};
const at = 1, ar = 24, lr = 300 * 1e3, Ci = 60 * 1e3, $i = 350, ee = 0.01, ze = 4, Ti = "rgb(var(--rgb-primary-text-color, 33, 33, 33))", cr = {
  1: "purple",
  2: "blue",
  3: "amber",
  4: "green"
};
let W = class extends H {
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
      const o = this.findNearestHoverPoint(n, i);
      if (!o) {
        this.clearHoverState();
        return;
      }
      const s = this._hoverState;
      s && s.slot === o.slot && Math.abs(s.x - o.x) <= 0.2 && Math.abs(s.y - o.y) <= 0.2 && Math.abs(s.value - o.value) <= 1e-4 && s.color === o.color || (this._hoverState = o);
    }, this.handlePointerLeave = () => {
      this.clearHoverState();
    };
  }
  static async getConfigElement() {
    return document.createElement("power-pilz-graph-stack-card-editor");
  }
  static async getStubConfig(e) {
    const t = (e == null ? void 0 : e.states) ?? {}, r = Object.keys(t), n = (...c) => c.find((d) => d in t), i = (c) => r.find((d) => d.startsWith(`${c}.`)), o = n("sensor.dev_home_power", "sensor.home_power") ?? i("sensor") ?? "sensor.dev_home_power", s = n("sensor.dev_solar_power", "sensor.solar_power"), a = n("sensor.dev_grid_power", "sensor.grid_power"), l = n("sensor.dev_battery_power", "sensor.battery_power");
    return {
      type: "custom:power-pilz-graph-stack-card",
      legend_layout: "row",
      timeframe_hours: ar,
      hover_enabled: !0,
      fill_area_enabled: !0,
      shared_trend_scale: !1,
      normalize_stack_to_percent: !1,
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
      decimals: at
    };
  }
  setConfig(e) {
    const t = typeof e.decimals == "number" && Number.isFinite(e.decimals) ? Math.min(3, Math.max(0, Math.round(e.decimals))) : at, r = this.readConfigString(e.entity), n = this.readConfigString(e.icon), i = this.readConfigString(e.entity_1) ?? r ?? "sensor.dev_home_power";
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
      return S`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return S``;
    const e = this._config, t = e.decimals ?? at, r = this.normalizeLineThickness(e.line_thickness), n = e.normalize_stack_to_percent === !0, i = this.collectSeriesEntries(e, t), o = this.withStackedCurrentValues(i, n), s = this.normalizeLegendLayout(e.legend_layout), a = e.hover_enabled !== !1, l = this._hoverState, c = e.clip_graph_to_labels ?? !1 ? this._graphTopInset : 0, d = c > 0 ? { top: `${c}px` } : {}, h = l ? {
      left: `${l.x}px`,
      top: `${l.y + c}px`,
      "--hover-dot-color": l.color
    } : {};
    return this._drawConfigs = i.map((y) => ({
      slot: y.slot,
      currentValue: y.currentValue,
      color: y.trendColor,
      lineWidth: r
    })), S`
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
          ${a && l ? S`<div class="hover-dot" aria-hidden="true" style=${M(h)}></div>` : T}

          <div class="content">
            <div class="series-list layout-${s}">
              ${i.length === 0 ? S`
                    <div class="state-item empty">
                      <div class="info">
                        <div class="primary">Graph Stack card</div>
                        <div class="secondary">Select at least one entity</div>
                      </div>
                    </div>
                  ` : o.map(
      (y) => this.renderSeriesItem(
        y,
        l && l.slot === y.slot ? l.value : null
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
    return S`
      <div class="state-item" data-slot=${String(e.slot)}>
        ${e.showIcon ? S`
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
    for (let n = 1; n <= ze; n += 1) {
      const i = n, o = this.slotEnabled(i, e), s = this.slotEntityId(i, e);
      if (!o || !s)
        continue;
      const a = this.entityName(this.slotCustomName(i, e), s, n), l = k(this.hass, s), c = e.unit ?? B(this.hass, s) ?? "", d = this.formatValue(l, c, t), h = this.slotIcon(i, e), y = this.iconStyle(this.slotIconColor(i, e)), p = this.resolveColor(cr[i], Ti), b = this.resolveColor(this.slotTrendColor(i, e), p);
      r.push({
        slot: i,
        entityId: s,
        name: a,
        secondary: d,
        unit: c,
        decimals: t,
        currentValue: l,
        icon: h,
        showIcon: this.slotShowIcon(i, e),
        iconStyle: y,
        trendColor: b
      });
    }
    return r;
  }
  withStackedCurrentValues(e, t) {
    const r = e.reduce((s, a) => s + (a.currentValue ?? 0), 0), n = Number.isFinite(r) && Math.abs(r) > ee;
    let i = 0, o = !1;
    return e.map((s) => {
      s.currentValue !== null && Number.isFinite(s.currentValue) && (i += s.currentValue, o = !0);
      const a = o ? t ? n ? i / r * 100 : 0 : i : null, l = t ? "%" : s.unit;
      return {
        ...s,
        unit: l,
        secondary: this.formatValue(a, l, s.decimals)
      };
    });
  }
  slotEntityId(e, t) {
    return br(e, t);
  }
  slotCustomName(e, t) {
    return vr(e, t);
  }
  slotEnabled(e, t) {
    return gr(e, t);
  }
  slotShowIcon(e, t) {
    return wr(e, t);
  }
  slotIcon(e, t) {
    return xr(e, t);
  }
  slotIconColor(e, t) {
    return Sr(e, t);
  }
  slotTrendColor(e, t) {
    return Cr(e, t);
  }
  entityName(e, t, r) {
    return Tr(this.hass.states, e, t, r);
  }
  formatValue(e, t, r) {
    return Rr(e, t, r);
  }
  readConfigString(e) {
    return U(e);
  }
  normalizeLegendLayout(e) {
    return $r(e);
  }
  normalizeTimeframeHours(e) {
    return ft(e, ar);
  }
  trendWindowMs(e) {
    return this.normalizeTimeframeHours(e == null ? void 0 : e.timeframe_hours) * 60 * 60 * 1e3;
  }
  normalizeLineThickness(e) {
    return bt(e);
  }
  normalizeTrendColor(e, t, r) {
    const n = e ?? t;
    return Array.isArray(n) || typeof n == "string" && n.trim().length > 0 ? n : cr[r];
  }
  iconStyle(e) {
    return mt(e);
  }
  resolveColor(e, t = "") {
    return _t(e, t);
  }
  trendPoints(e, t) {
    const r = Date.now(), n = r - this.trendWindowMs(this._config), o = [...(this._trendSeries[e] ?? []).filter((s) => s.ts >= n).sort((s, a) => s.ts - a.ts)];
    return t !== null && Number.isFinite(t) && o.push({ ts: r, value: t }), o;
  }
  toTrendCoordinates(e, t, r) {
    var f, x;
    const i = Date.now() - t, o = 0, s = 100, a = e.map((C) => C.value), l = (r == null ? void 0 : r.min) ?? Math.min(...a), c = (r == null ? void 0 : r.max) ?? Math.max(...a);
    if (!Number.isFinite(l) || !Number.isFinite(c))
      return [];
    const d = 20, h = 80, y = Math.max(c - l, ee), p = e.map((C) => {
      const w = Math.max(0, Math.min(100, (C.ts - i) / t * 100)), g = o + w / 100 * (s - o), v = y <= ee ? 0.5 : (C.value - l) / y, $ = h - v * (h - d);
      return { x: g, y: $, value: C.value };
    }), b = ((f = p[0]) == null ? void 0 : f.x) ?? o, m = ((x = p[p.length - 1]) == null ? void 0 : x.x) ?? s, _ = Math.max(0, m - b), u = 18;
    if (p.length >= 2 && _ < u) {
      const C = s - u, w = Math.max(o, Math.min(C, m - u));
      if (_ <= ee) {
        const v = u / (p.length - 1);
        return p.map(($, R) => ({
          ...$,
          x: Math.max(o, Math.min(s, w + v * R))
        }));
      }
      const g = u / _;
      return p.map((v) => ({
        ...v,
        x: Math.max(o, Math.min(s, w + (v.x - b) * g))
      }));
    }
    return p;
  }
  toCanvasPoints(e, t, r) {
    return yt(e, t, r);
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
    var p, b, m;
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
    const i = ((p = this._config) == null ? void 0 : p.fill_area_enabled) !== !1, o = ((b = this._config) == null ? void 0 : b.normalize_stack_to_percent) === !0, s = ((m = this._config) == null ? void 0 : m.shared_trend_scale) === !0, a = this.trendWindowMs(this._config), l = {}, c = this.buildStackedTrendSeries(a), d = o ? this.normalizeStackedSeriesToPercent(c) : c, h = o ? s ? { min: 0, max: 100 } : null : s ? this.computeStackedValueRange(d) : null;
    [...this._drawConfigs].sort((_, u) => u.slot - _.slot).forEach((_) => {
      const u = d[_.slot] ?? [];
      if (u.length < 2)
        return;
      const f = this.toTrendCoordinates(u, a, h);
      if (f.length < 2)
        return;
      const x = this.toCanvasPoints(f, r.width, r.height), C = this.toCanvasPoints(f, n.width, n.height);
      i && this.drawTrendArea(r.ctx, x, _.color, r.height), this.drawTrendLine(n.ctx, C, _.color, _.lineWidth), l[_.slot] = C;
    }), this._linePointsBySlot = l, this._hoverState && !l[this._hoverState.slot] && (this._hoverState = void 0);
  }
  buildStackedTrendSeries(e) {
    const t = {}, r = [...this._drawConfigs].sort((i, o) => i.slot - o.slot);
    let n = null;
    return r.forEach((i) => {
      const o = this.trendPoints(i.slot, i.currentValue);
      if (o.length === 0)
        return;
      const s = this.normalizeTrendSeries(o, e);
      if (s.length === 0)
        return;
      const a = n ? this.sumTrendSeries(n, s) : s;
      t[i.slot] = a, n = a;
    }), t;
  }
  normalizeTrendSeries(e, t) {
    const r = Date.now() - t, n = [...e].filter((o) => Number.isFinite(o.ts) && Number.isFinite(o.value) && o.ts >= r).sort((o, s) => o.ts - s.ts);
    if (n.length === 0)
      return [];
    const i = [];
    return n.forEach((o) => {
      const s = i[i.length - 1];
      s && Math.abs(s.ts - o.ts) <= 0.5 ? i[i.length - 1] = o : i.push(o);
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
    const o = (s) => {
      const a = r[r.length - 1];
      (a === void 0 || Math.abs(a - s) > 0.5) && r.push(s);
    };
    for (; n < e.length || i < t.length; ) {
      const s = n < e.length ? e[n].ts : Number.POSITIVE_INFINITY, a = i < t.length ? t[i].ts : Number.POSITIVE_INFINITY;
      s <= a ? (o(s), n += 1, Math.abs(s - a) <= 0.5 && (i += 1)) : (o(a), i += 1);
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
    const o = Math.max(1, Math.min(e.length - 1, n)), s = e[o - 1], a = e[o], l = a.ts - s.ts;
    if (Math.abs(l) <= ee)
      return a.value;
    const c = (t - s.ts) / l;
    return s.value + (a.value - s.value) * c;
  }
  computeStackedValueRange(e) {
    const t = [];
    if (Object.values(e).forEach((i) => {
      i.forEach((o) => t.push(o.value));
    }), t.length === 0)
      return null;
    const r = Math.min(...t), n = Math.max(...t);
    return !Number.isFinite(r) || !Number.isFinite(n) ? null : { min: r, max: n };
  }
  normalizeStackedSeriesToPercent(e) {
    const t = {}, r = Object.keys(e).map((o) => Number(o)).filter((o) => Number.isFinite(o) && o >= 1 && o <= ze).sort((o, s) => o - s);
    if (r.length === 0)
      return t;
    const n = r[r.length - 1], i = e[n] ?? [];
    return i.length < 1 || r.forEach((o) => {
      const s = e[o] ?? [];
      s.length !== 0 && (t[o] = s.map((a) => {
        const l = this.interpolateTrendValue(i, a.ts);
        if (!Number.isFinite(l) || Math.abs(l) <= ee)
          return { ts: a.ts, value: 0 };
        if (o === n)
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
    const r = e.getBoundingClientRect(), n = Math.max(1, Math.round(r.width)), i = Math.max(1, Math.round(r.height)), o = Math.max(1, window.devicePixelRatio || 1), s = Math.max(1, Math.round(n * o)), a = Math.max(1, Math.round(i * o));
    return (e.width !== s || e.height !== a) && (e.width = s, e.height = a), t.setTransform(1, 0, 0, 1, 0, 0), t.clearRect(0, 0, e.width, e.height), t.setTransform(o, 0, 0, o, 0, 0), { ctx: t, width: n, height: i };
  }
  drawTrendArea(e, t, r, n) {
    if (t.length < 2)
      return;
    const i = this.resolveCanvasColor(r), o = t[0], s = t[t.length - 1], a = Math.min(...t.map((c) => c.y)), l = e.createLinearGradient(0, a, 0, n);
    l.addColorStop(0, this.withAlpha(i, 0.24)), l.addColorStop(1, this.withAlpha(i, 0)), e.beginPath(), e.moveTo(o.x, o.y), t.slice(1).forEach((c) => e.lineTo(c.x, c.y)), e.lineTo(s.x, n), e.lineTo(o.x, n), e.closePath(), e.fillStyle = l, e.fill();
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
      const o = this._linePointsBySlot[i.slot];
      if (!o || o.length < 2)
        continue;
      const s = this.interpolateCanvasPoint(o, e);
      if (!s)
        continue;
      const a = Math.abs(s.y - t);
      a < n && (n = a, r = {
        slot: i.slot,
        x: s.x,
        y: s.y,
        value: s.value,
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
      const o = e[i - 1], s = e[i];
      if (t > s.x)
        continue;
      const a = s.x - o.x;
      if (Math.abs(a) <= ee)
        return { x: t, y: s.y, value: s.value };
      const l = (t - o.x) / a;
      return {
        x: t,
        y: o.y + (s.y - o.y) * l,
        value: o.value + (s.value - o.value) * l
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
    const i = n.fillStyle, s = (typeof i == "string" ? i.trim() : "").match(/^#([a-f\d]{6})$/i);
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
    this.clearHoverState(), this.teardownVisibilityObserver(), this.stopLiveRuntime(), super.disconnectedCallback();
  }
  updated(e) {
    var t;
    (e.has("preview") || e.has("editMode")) && (this.shouldRunLiveRuntime() ? (this.setupVisibilityObserver(), this._isVisible ? this.startLiveRuntime(!0) : this.stopLiveRuntime()) : (this.teardownVisibilityObserver(), this.stopLiveRuntime(), this.maybeRefreshTrendHistory(!0, !0))), this.shouldRunLiveRuntime() ? (e.has("_config") ? (this.scheduleConfigRefresh(), this.clearHoverState()) : e.has("hass") && this._isVisible && (this.maybeRefreshTrendHistory(), this.clearHoverState()), this._isVisible ? this.syncTrendResizeObserver() : this._trendResizeObserver && this._trendResizeObserver.disconnect()) : (e.has("_config") ? (this.scheduleConfigRefresh(!0), this.clearHoverState()) : e.has("hass") && (this.maybeRefreshTrendHistory(!1, !0), this.clearHoverState()), this._trendResizeObserver && this._trendResizeObserver.disconnect()), ((t = this._config) == null ? void 0 : t.hover_enabled) === !1 && this.clearHoverState(), this.updateGraphTopInset(), (!this.shouldRunLiveRuntime() || this._isVisible) && this.scheduleTrendCanvasDraw();
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
    const n = t.getBoundingClientRect(), i = r.getBoundingClientRect(), o = Math.max(0, Math.ceil(i.bottom - n.top));
    Math.abs(o - this._graphTopInset) > 0.5 && (this._graphTopInset = o);
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
    }, $i));
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
    var s;
    if (this._trendRefreshInFlight || !this._config || !this.hass || typeof this.hass.callApi != "function" || !this._isVisible && !t)
      return;
    const r = this._config, n = {}, i = this.trendWindowMs(r), o = this.enabledSlots(r);
    if (o.length === 0) {
      Object.keys(this._trendSeries).length > 0 && (this._trendSeries = {});
      return;
    }
    this._trendRefreshInFlight = !0;
    try {
      const a = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set();
      let d = Number.POSITIVE_INFINITY;
      const h = Date.now() - i;
      for (const m of o) {
        const _ = this.slotEntityId(m, r);
        if (!_)
          continue;
        a.set(m, _);
        const u = this._trendSeries[m] ?? [];
        if (e || u.length === 0 || l.has(_)) {
          l.add(_), c.delete(_);
          continue;
        }
        if (l.has(_))
          continue;
        c.add(_);
        const f = ((s = u[u.length - 1]) == null ? void 0 : s.ts) ?? h, x = Math.max(h, f - Ci);
        d = Math.min(d, x);
      }
      const y = l.size > 0 ? await _e(this.hass, Array.from(l), i) : {}, p = c.size > 0 ? await _e(
        this.hass,
        Array.from(c),
        i,
        { startMs: Number.isFinite(d) ? d : h }
      ) : {};
      a.forEach((m, _) => {
        const u = this._trendSeries[_] ?? [];
        if (l.has(m)) {
          const f = y[m] ?? [];
          n[_] = f.length > 0 ? f : u.filter((x) => x.ts >= h);
          return;
        }
        if (c.has(m)) {
          const f = p[m] ?? [];
          n[_] = Le(u, f, h);
          return;
        }
        n[_] = u.filter((f) => f.ts >= h);
      }), this.sameTrendSeriesKeys(n, this._trendSeries) && Object.keys(n).map((m) => Number(m)).filter((m) => Number.isFinite(m) && m >= 1 && m <= ze).every((m) => {
        const _ = m;
        return this.areTrendSeriesEqual(n[_] ?? [], this._trendSeries[_] ?? []);
      }) || (this._trendSeries = n);
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
  sameTrendSeriesKeys(e, t) {
    const r = Object.keys(e).sort(), n = Object.keys(t).sort();
    return r.length === n.length && r.every((i, o) => i === n[o]);
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
W.styles = He`
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
  O()
], W.prototype, "_config", 2);
Z([
  O()
], W.prototype, "_trendSeries", 2);
Z([
  O()
], W.prototype, "_graphTopInset", 2);
Z([
  O()
], W.prototype, "_hoverState", 2);
W = Z([
  oe("power-pilz-graph-stack-card")
], W);
var Ri = Object.defineProperty, Mi = Object.getOwnPropertyDescriptor, wt = (e, t, r, n) => {
  for (var i = n > 1 ? void 0 : n ? Mi(t, r) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (i = (n ? s(t, r, i) : s(i)) || i);
  return n && i && Ri(t, r, i), i;
};
const Ei = [
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
], zi = {
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
let Be = class extends H {
  constructor() {
    super(...arguments), this.computeLabel = (e) => {
      const t = e.name ?? "";
      return zi[t] ?? t;
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
    return !this.hass || !this._config ? T : S`
      <div style="margin: 0 0 8px; color: var(--secondary-text-color); font-size: 12px;">
        PowerPilz v${we}
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${Ei}
        .computeLabel=${this.computeLabel}
        @value-changed=${this.valueChanged}
      ></ha-form>
    `;
  }
};
wt([
  L({ attribute: !1 })
], Be.prototype, "hass", 2);
wt([
  O()
], Be.prototype, "_config", 2);
Be = wt([
  oe("power-pilz-wallbox-card-editor")
], Be);
var Ai = Object.defineProperty, se = (e, t, r, n) => {
  for (var i = void 0, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (i = s(t, r, i) || i);
  return i && Ai(t, r, i), i;
};
const Oi = 0.01, dr = "power-pilz-wallbox-mode-menu-portal-style", xt = class xt extends H {
  constructor() {
    super(...arguments), this.preview = !1, this.editMode = !1, this._actionBusy = !1, this._modeMenuOpen = !1, this._modeMenuOptionCount = 0, this.toggleModeMenu = (t) => {
      var s;
      if (t.stopPropagation(), this.isEditorPreview() || !((s = this._config) != null && s.mode_entity) || this._actionBusy)
        return;
      const r = he(this.hass, this._config.mode_entity), n = (r == null ? void 0 : r.state) ?? "", i = this.getModeOptions(r);
      if (i.length === 0)
        return;
      if (this._modeMenuOpen) {
        this.closeModeMenuPortal();
        return;
      }
      const o = t.currentTarget;
      o && this.openModeMenuPortal(o, i, n || i[0] || "Mode");
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
      const r = k(this.hass, this._config.power_entity), n = rt(this.hass, this._config.status_entity), i = this.isCharging(n, r, this._config.command_entity), o = this.resolveActionCommand(i);
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
    const r = (t == null ? void 0 : t.states) ?? {}, n = Object.keys(r), i = (...c) => c.find((d) => d in r), o = (c) => n.find((d) => d.startsWith(`${c}.`)), s = i("sensor.dev_wallbox_power", "sensor.wallbox_power") ?? o("sensor") ?? "sensor.dev_wallbox_power", a = i("input_select.dev_wallbox_mode", "select.wallbox_charging_mode") ?? o("input_select") ?? o("select"), l = i("input_boolean.dev_wallbox_enabled", "switch.wallbox_charging_enabled") ?? o("input_boolean") ?? o("switch");
    return {
      type: "custom:power-pilz-wallbox-card",
      name: "Wallbox",
      power_entity: s,
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
      return S`<ha-card>Invalid configuration</ha-card>`;
    if (!this.hass)
      return S``;
    const t = this._config, r = k(this.hass, t.power_entity), n = B(this.hass, t.power_entity) ?? "kW", i = rt(this.hass, t.status_entity), o = he(this.hass, t.mode_entity), s = (o == null ? void 0 : o.state) ?? "", a = this.getModeOptions(o), l = this.isCharging(i, r, t.command_entity), c = this.resolveActionCommand(l), d = l ? "Stop" : "Start", h = l ? "mdi:pause" : "mdi:play", y = this.statusLabel(i, l), p = this.formatPower(r, n, t.decimals ?? 1), b = this.showModeSelector(t, a), m = this.showLiveValue(t), _ = this.showCommandButton(t), u = this.isEditorPreview() || this._actionBusy || !t.mode_entity || a.length === 0, f = s || a[0] || "Mode", x = this._modeMenuOpen ? "mdi:chevron-up" : "mdi:chevron-down", C = this.iconStyle(t.icon_color), g = Number(m) + Number(_) === 1, v = b && m && _, $ = g && m, R = g && _ || v, E = $ || R, z = m && !$, P = _ && !R, V = b || z || P, D = b ? z || P ? P ? "actions" : "actions no-command" : "actions mode-only" : "actions no-mode";
    return (!b || u) && this._modeMenuOpen && this.closeModeMenuPortal(), S`
      <ha-card>
        <div class="container">
          <div class="state-item ${E ? "compact-state" : ""}">
            <div class="icon-wrap">
              <div class="icon-shape" style=${M(C)}>
                <ha-icon .icon=${t.icon ?? "mdi:ev-station"}></ha-icon>
              </div>
            </div>
            <div class="info">
              <div class="primary">${t.name}</div>
              <div class="secondary">EV charger</div>
            </div>

            ${E ? S`
                  <div class="compact-trailing ${R ? "button-only" : ""}">
                    ${$ ? S`
                          <div class="compact-live-value">
                            <span>${y}</span>
                            <span class="dot">•</span>
                            <span>${p}</span>
                          </div>
                        ` : S``}

                    ${R ? S`
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
                        ` : S``}
                  </div>
                ` : S``}
          </div>

          ${V ? S`
                <div class=${D}>
                  ${b ? S`
                        <div class="mode-select-wrap">
                          <button
                            type="button"
                            class="mode-select"
                            ?disabled=${u}
                            @click=${this.toggleModeMenu}
                            aria-haspopup="listbox"
                            aria-expanded=${this._modeMenuOpen ? "true" : "false"}
                            title="Charging mode"
                          >
                            <span class="mode-select-label">${f}</span>
                            <ha-icon class="mode-select-chevron" .icon=${x}></ha-icon>
                          </button>
                        </div>
                      ` : S``}

                  ${z ? S`
                        <div class="live-value">
                          <span>${y}</span>
                          <span class="dot">•</span>
                          <span>${p}</span>
                        </div>
                      ` : S``}

                  ${P ? S`
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
                      ` : S``}
                </div>
              ` : S``}
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
      const o = t.toLowerCase();
      if (["charging", "active", "running", "on", "start", "started"].includes(o))
        return !0;
      if (["idle", "paused", "stopped", "off", "standby", "complete"].includes(o))
        return !1;
    }
    if (n) {
      const o = (i = rt(this.hass, n)) == null ? void 0 : i.toLowerCase();
      if (o === "on")
        return !0;
      if (o === "off")
        return !1;
    }
    return r !== null && r > Oi;
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
    return mt(t);
  }
  disconnectedCallback() {
    this.closeModeMenuPortal(), super.disconnectedCallback();
  }
  isEditorPreview() {
    return this.preview || this.editMode || !!this.closest("hui-card-preview");
  }
  ensureModeMenuPortalStyles() {
    if (document.getElementById(dr))
      return;
    const t = document.createElement("style");
    t.id = dr, t.textContent = `
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
    const i = n.getBoundingClientRect(), o = 8, s = 6, a = Math.max(96, Math.min(280, window.innerHeight - o * 2)), l = Math.min(
      a,
      this._modeMenuOptionCount * 34 + Math.max(0, this._modeMenuOptionCount - 1) * 4 + 14
    ), c = r.offsetHeight > 0 ? Math.min(a, r.offsetHeight) : l, d = Math.max(120, Math.round(i.width)), h = window.innerHeight - i.bottom - o, y = h < c + s && i.top - o > h;
    let p = i.left;
    p = Math.max(o, Math.min(p, window.innerWidth - d - o));
    let b = y ? i.top - s - c : i.bottom + s;
    b = Math.max(o, Math.min(b, window.innerHeight - c - o)), r.style.maxHeight = `${a}px`, r.style.width = `${d}px`, r.style.left = `${Math.round(p)}px`, r.style.top = `${Math.round(b)}px`;
  }
  openModeMenuPortal(t, r, n) {
    this.closeModeMenuPortal(), this.ensureModeMenuPortalStyles();
    const i = document.createElement("div");
    i.className = "power-pilz-mode-menu-backdrop", i.addEventListener("click", () => {
      this.closeModeMenuPortal();
    });
    const o = document.createElement("div");
    o.className = "power-pilz-mode-menu-portal", o.setAttribute("role", "listbox"), r.forEach((s) => {
      const a = document.createElement("button");
      a.type = "button", a.className = `power-pilz-mode-menu-option ${s === n ? "selected" : ""}`, a.dataset.option = s, a.setAttribute("role", "option"), a.setAttribute("aria-selected", s === n ? "true" : "false"), a.textContent = s, a.addEventListener("click", (l) => {
        var d;
        l.stopPropagation();
        const c = ((d = l.currentTarget) == null ? void 0 : d.dataset.option) ?? "";
        c && (this.closeModeMenuPortal(), this.selectModeOption(c));
      }), o.append(a);
    }), document.body.append(i), document.body.append(o), this._modeMenuBackdrop = i, this._modeMenuPortal = o, this._modeMenuOptionCount = r.length, this._modeMenuOpen = !0, this.positionModeMenuPortal(t);
  }
  closeModeMenuPortal() {
    this._modeMenuPortal && (this._modeMenuPortal.remove(), this._modeMenuPortal = void 0), this._modeMenuBackdrop && (this._modeMenuBackdrop.remove(), this._modeMenuBackdrop = void 0), this._modeMenuOptionCount = 0, this._modeMenuOpen && (this._modeMenuOpen = !1);
  }
};
xt.styles = He`
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
se([
  L({ attribute: !1 })
], F.prototype, "hass");
se([
  L({ type: Boolean })
], F.prototype, "preview");
se([
  L({ type: Boolean })
], F.prototype, "editMode");
se([
  L({ reflect: !0, type: String })
], F.prototype, "layout");
se([
  O()
], F.prototype, "_config");
se([
  O()
], F.prototype, "_actionBusy");
se([
  O()
], F.prototype, "_modeMenuOpen");
class Pi extends F {
}
customElements.get("power-pilz-wallbox-card") || customElements.define("power-pilz-wallbox-card", F);
customElements.get("power-pilz-wallbox-card-v2") || customElements.define("power-pilz-wallbox-card-v2", Pi);
window.customCards = window.customCards || [];
const Li = [
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
for (const e of Li)
  window.customCards.some((t) => t.type === e.type) || window.customCards.push(e);
console.info(
  `%cPOWER PILZ%c v${we}`,
  "background: #1f7a45; color: white; padding: 4px 8px; border-radius: 8px 0 0 8px; font-weight: 700;",
  "background: #3e4b53; color: white; padding: 4px 8px; border-radius: 0 8px 8px 0;"
);
//# sourceMappingURL=power-pilz.js.map
