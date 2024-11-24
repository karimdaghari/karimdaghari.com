(() => {
	var b = Object.defineProperty;
	var w = (i, e) => {
		for (var t in e) b(i, t, { get: e[t], enumerable: !0 });
	};
	var f = {};
	w(f, {
		FilterPills: () => h,
		Input: () => l,
		Instance: () => p,
		ResultList: () => a,
		Summary: () => o,
	});
	var r = class i {
		constructor(e) {
			this.element = document.createElement(e);
		}
		id(e) {
			return (this.element.id = e), this;
		}
		class(e) {
			return this.element.classList.add(e), this;
		}
		attrs(e) {
			for (let [t, s] of Object.entries(e)) this.element.setAttribute(t, s);
			return this;
		}
		text(e) {
			return (this.element.innerText = e), this;
		}
		html(e) {
			return (this.element.innerHTML = e), this;
		}
		handle(e, t) {
			return this.element.addEventListener(e, t), this;
		}
		addTo(e) {
			return (
				e instanceof i
					? e.element.appendChild(this.element)
					: e.appendChild(this.element),
				this.element
			);
		}
	};
	var T = async (i = 100) => new Promise((e) => setTimeout(e, i)),
		l = class {
			constructor(e = {}) {
				if (
					((this.inputEl = null),
					(this.clearEl = null),
					(this.instance = null),
					(this.searchID = 0),
					(this.debounceTimeoutMs = e.debounceTimeoutMs ?? 300),
					e.inputElement)
				) {
					if (e.containerElement) {
						console.warn(
							"[Pagefind Input component]: inputElement and containerElement both supplied. Ignoring the container option.",
						);
						return;
					}
					this.initExisting(e.inputElement);
				} else if (e.containerElement) this.initContainer(e.containerElement);
				else {
					console.error(
						"[Pagefind Input component]: No selector supplied for containerElement or inputElement",
					);
					return;
				}
				this.inputEl.addEventListener("input", async (t) => {
					if (this.instance && typeof t?.target?.value == "string") {
						this.updateState(t.target.value);
						let s = ++this.searchID;
						if ((await T(this.debounceTimeoutMs), s !== this.searchID))
							return null;
						this.instance?.triggerSearch(t.target.value);
					}
				}),
					this.inputEl.addEventListener("keydown", (t) => {
						t.key === "Escape" &&
							(++this.searchID,
							(this.inputEl.value = ""),
							this.instance?.triggerSearch(""),
							this.updateState("")),
							t.key === "Enter" && t.preventDefault();
					}),
					this.inputEl.addEventListener("focus", () => {
						this.instance?.triggerLoad();
					});
			}
			initContainer(e) {
				let t = document.querySelector(e);
				if (!t) {
					console.error(
						`[Pagefind Input component]: No container found for ${e} selector`,
					);
					return;
				}
				if (t.tagName === "INPUT")
					console.warn(
						`[Pagefind Input component]: Encountered input element for ${e} when a container was expected`,
					),
						console.warn(
							"[Pagefind Input component]: Treating containerElement option as inputElement and proceeding",
						),
						this.initExisting(e);
				else {
					t.innerHTML = "";
					let s = 0;
					while (document.querySelector(`#pfmod-input-${s}`)) s += 1;
					let n = new r("form").class("pagefind-modular-input-wrapper").attrs({
						role: "search",
						"aria-label": "Search this site",
						action: "javascript:void(0);",
					});
					new r("label")
						.attrs({ for: `pfmod-input-${s}`, "data-pfmod-sr-hidden": "true" })
						.text("Search this site")
						.addTo(n),
						(this.inputEl = new r("input")
							.id(`pfmod-input-${s}`)
							.class("pagefind-modular-input")
							.attrs({ autocapitalize: "none", enterkeyhint: "search" })
							.addTo(n)),
						(this.clearEl = new r("button")
							.class("pagefind-modular-input-clear")
							.attrs({ "data-pfmod-suppressed": "true" })
							.text("Clear")
							.handle("click", () => {
								(this.inputEl.value = ""),
									this.instance.triggerSearch(""),
									this.updateState("");
							})
							.addTo(n)),
						n.addTo(t);
				}
			}
			initExisting(e) {
				let t = document.querySelector(e);
				if (!t) {
					console.error(
						`[Pagefind Input component]: No input element found for ${e} selector`,
					);
					return;
				}
				if (t.tagName !== "INPUT") {
					console.error(
						`[Pagefind Input component]: Expected ${e} to be an <input> element`,
					);
					return;
				}
				this.inputEl = t;
			}
			updateState(e) {
				this.clearEl &&
					(e && e?.length
						? this.clearEl.removeAttribute("data-pfmod-suppressed")
						: this.clearEl.setAttribute("data-pfmod-suppressed", "true"));
			}
			register(e) {
				(this.instance = e),
					this.instance.on("search", (t, s) => {
						this.inputEl &&
							document.activeElement !== this.inputEl &&
							((this.inputEl.value = t), this.updateState(t));
					});
			}
			focus() {
				this.inputEl && this.inputEl.focus();
			}
		};
	var g = (i) => {
			if (i instanceof Element) return [i];
			if (Array.isArray(i) && i.every((e) => e instanceof Element)) return i;
			if (typeof i == "string" || i instanceof String) {
				let e = document.createElement("div");
				return (e.innerHTML = i), [...e.childNodes];
			} else
				return (
					console.error(
						`[Pagefind ResultList component]: Expected template function to return an HTML element or string, got ${typeof i}`,
					),
					[]
				);
		},
		v = () => {
			let i = (e = 30) => ". ".repeat(Math.floor(10 + Math.random() * e));
			return `<li class="pagefind-modular-list-result">
    <div class="pagefind-modular-list-thumb" data-pfmod-loading></div>
    <div class="pagefind-modular-list-inner">
        <p class="pagefind-modular-list-title" data-pfmod-loading>${i(30)}</p>
        <p class="pagefind-modular-list-excerpt" data-pfmod-loading>${i(40)}</p>
    </div>
</li>`;
		},
		y = (i) => {
			let e = new r("li").class("pagefind-modular-list-result"),
				t = new r("div").class("pagefind-modular-list-thumb").addTo(e);
			i?.meta?.image &&
				new r("img")
					.class("pagefind-modular-list-image")
					.attrs({ src: i.meta.image, alt: i.meta.image_alt || i.meta.title })
					.addTo(t);
			let s = new r("div").class("pagefind-modular-list-inner").addTo(e),
				n = new r("p").class("pagefind-modular-list-title").addTo(s);
			return (
				new r("a")
					.class("pagefind-modular-list-link")
					.text(i.meta?.title)
					.attrs({ href: i.meta?.url || i.url })
					.addTo(n),
				new r("p")
					.class("pagefind-modular-list-excerpt")
					.html(i.excerpt)
					.addTo(s),
				e.element
			);
		},
		E = (i) => {
			if (!(i instanceof HTMLElement)) return null;
			let e = window.getComputedStyle(i).overflowY;
			return e !== "visible" && e !== "hidden" ? i : E(i.parentNode);
		},
		d = class {
			constructor(e = {}) {
				(this.rawResult = e.result),
					(this.placeholderNodes = e.placeholderNodes),
					(this.resultFn = e.resultFn),
					(this.intersectionEl = e.intersectionEl),
					(this.result = null),
					this.waitForIntersection();
			}
			waitForIntersection() {
				if (!this.placeholderNodes?.length) return;
				let e = {
					root: this.intersectionEl,
					rootMargin: "0px",
					threshold: 0.01,
				};
				new IntersectionObserver((s, n) => {
					this.result === null &&
						s?.[0]?.isIntersecting &&
						(this.load(), n.disconnect());
				}, e).observe(this.placeholderNodes[0]);
			}
			async load() {
				if (!this.placeholderNodes?.length) return;
				this.result = await this.rawResult.data();
				let e = this.resultFn(this.result),
					t = g(e);
				while (this.placeholderNodes.length > 1)
					this.placeholderNodes.pop().remove();
				this.placeholderNodes[0].replaceWith(...t);
			}
		},
		a = class {
			constructor(e) {
				if (
					((this.intersectionEl = document.body),
					(this.containerEl = null),
					(this.results = []),
					(this.placeholderTemplate = e.placeholderTemplate ?? v),
					(this.resultTemplate = e.resultTemplate ?? y),
					e.containerElement)
				)
					this.initContainer(e.containerElement);
				else {
					console.error(
						"[Pagefind ResultList component]: No selector supplied for containerElement",
					);
					return;
				}
			}
			initContainer(e) {
				let t = document.querySelector(e);
				if (!t) {
					console.error(
						`[Pagefind ResultList component]: No container found for ${e} selector`,
					);
					return;
				}
				this.containerEl = t;
			}
			append(e) {
				for (let t of e) this.containerEl.appendChild(t);
			}
			register(e) {
				e.on("results", (t) => {
					this.containerEl &&
						((this.containerEl.innerHTML = ""),
						(this.intersectionEl = E(this.containerEl)),
						(this.results = t.results.map((s) => {
							let n = g(this.placeholderTemplate());
							return (
								this.append(n),
								new d({
									result: s,
									placeholderNodes: n,
									resultFn: this.resultTemplate,
									intersectionEl: this.intersectionEl,
								})
							);
						})));
				}),
					e.on("loading", () => {
						this.containerEl && (this.containerEl.innerHTML = "");
					});
			}
		};
	var o = class {
		constructor(e = {}) {
			if (
				((this.containerEl = null),
				(this.defaultMessage = e.defaultMessage ?? ""),
				(this.term = ""),
				e.containerElement)
			)
				this.initContainer(e.containerElement);
			else {
				console.error(
					"[Pagefind Summary component]: No selector supplied for containerElement",
				);
				return;
			}
		}
		initContainer(e) {
			let t = document.querySelector(e);
			if (!t) {
				console.error(
					`[Pagefind Summary component]: No container found for ${e} selector`,
				);
				return;
			}
			(this.containerEl = t),
				(this.containerEl.innerText = this.defaultMessage);
		}
		register(e) {
			e.on("search", (t, s) => {
				this.term = t;
			}),
				e.on("results", (t) => {
					if (!this.containerEl || !t) return;
					if (!this.term) {
						this.containerEl.innerText = this.defaultMessage;
						return;
					}
					let s = t?.results?.length ?? 0;
					this.containerEl.innerText = `${s} result${s === 1 ? "" : "s"} for ${this.term}`;
				}),
				e.on("loading", () => {
					this.containerEl &&
						(this.containerEl.innerText = `Searching for ${this.term}...`);
				});
		}
	};
	var h = class {
		constructor(e = {}) {
			if (
				((this.instance = null),
				(this.wrapper = null),
				(this.pillContainer = null),
				(this.available = {}),
				(this.selected = ["All"]),
				(this.total = 0),
				(this.filterMemo = ""),
				(this.filter = e.filter),
				(this.ordering = e.ordering ?? null),
				(this.alwaysShow = e.alwaysShow ?? !1),
				(this.selectMultiple = e.selectMultiple ?? !1),
				!this.filter?.length)
			) {
				console.error(
					"[Pagefind FilterPills component]: No filter option supplied, nothing to display",
				);
				return;
			}
			if (e.containerElement) this.initContainer(e.containerElement);
			else {
				console.error(
					"[Pagefind FilterPills component]: No selector supplied for containerElement",
				);
				return;
			}
		}
		initContainer(e) {
			let t = document.querySelector(e);
			if (!t) {
				console.error(
					`[Pagefind FilterPills component]: No container found for ${e} selector`,
				);
				return;
			}
			t.innerHTML = "";
			let s = `pagefind_modular_filter_pills_${this.filter}`,
				n = new r("div")
					.class("pagefind-modular-filter-pills-wrapper")
					.attrs({ role: "group", "aria-labelledby": s });
			this.alwaysShow || n.attrs({ "data-pfmod-hidden": !0 }),
				new r("div")
					.id(s)
					.class("pagefind-modular-filter-pills-label")
					.attrs({ "data-pfmod-sr-hidden": !0 })
					.text(`Filter results by ${this.filter}`)
					.addTo(n),
				(this.pillContainer = new r("div")
					.class("pagefind-modular-filter-pills")
					.addTo(n)),
				(this.wrapper = n.addTo(t));
		}
		update() {
			let e = this.available.map((t) => t[0]).join("~");
			e == this.filterMemo
				? this.updateExisting()
				: (this.renderNew(), (this.filterMemo = e));
		}
		pushFilters() {
			let e = this.selected.filter((t) => t !== "All");
			this.instance.triggerFilter(this.filter, e);
		}
		pillInner(e, t) {
			return this.total
				? `<span aria-label="${e}">${e} (${t})</span>`
				: `<span aria-label="${e}">${e}</span>`;
		}
		renderNew() {
			this.available.forEach(([e, t]) => {
				new r("button")
					.class("pagefind-modular-filter-pill")
					.html(this.pillInner(e, t))
					.attrs({ "aria-pressed": this.selected.includes(e), type: "button" })
					.handle("click", () => {
						e === "All"
							? (this.selected = ["All"])
							: this.selected.includes(e)
								? (this.selected = this.selected.filter((s) => s !== e))
								: this.selectMultiple
									? this.selected.push(e)
									: (this.selected = [e]),
							this.selected?.length
								? this.selected?.length > 1 &&
									(this.selected = this.selected.filter((s) => s !== "All"))
								: (this.selected = ["All"]),
							this.update(),
							this.pushFilters();
					})
					.addTo(this.pillContainer);
			});
		}
		updateExisting() {
			let e = [...this.pillContainer.childNodes];
			this.available.forEach(([t, s], n) => {
				(e[n].innerHTML = this.pillInner(t, s)),
					e[n].setAttribute("aria-pressed", this.selected.includes(t));
			});
		}
		register(e) {
			(this.instance = e),
				this.instance.on("filters", (t) => {
					if (!this.pillContainer) return;
					this.selectMultiple ? (t = t.available) : (t = t.total);
					let s = t[this.filter];
					if (!s) {
						console.warn(
							`[Pagefind FilterPills component]: No possible values found for the ${this.filter} filter`,
						);
						return;
					}
					(this.available = Object.entries(s)),
						Array.isArray(this.ordering)
							? this.available.sort((n, c) => {
									let m = this.ordering.indexOf(n[0]),
										_ = this.ordering.indexOf(c[0]);
									return (m === -1 ? 1 / 0 : m) - (_ === -1 ? 1 / 0 : _);
								})
							: this.available.sort((n, c) => n[0].localeCompare(c[0])),
						this.available.unshift(["All", this.total]),
						this.update();
				}),
				e.on("results", (t) => {
					this.pillContainer &&
						((this.total = t?.unfilteredResultCount || 0),
						this.available?.[0]?.[0] === "All" &&
							(this.available[0][1] = this.total),
						this.total || this.alwaysShow
							? this.wrapper.removeAttribute("data-pfmod-hidden")
							: this.wrapper.setAttribute("data-pfmod-hidden", "true"),
						this.update());
				});
		}
	};
	var F = async (i = 50) => await new Promise((e) => setTimeout(e, i)),
		u;
	try {
		u = new URL(document.currentScript.src).pathname.match(
			/^(.*\/)(?:pagefind-)?modular-ui.js.*$/,
		)[1];
	} catch {
		u = "/pagefind/";
	}
	var p = class {
		constructor(e = {}) {
			(this.__pagefind__ = null),
				(this.__initializing__ = null),
				(this.__searchID__ = 0),
				(this.__hooks__ = {
					search: [],
					filters: [],
					loading: [],
					results: [],
				}),
				(this.components = []),
				(this.searchTerm = ""),
				(this.searchFilters = {}),
				(this.searchResult = {}),
				(this.availableFilters = null),
				(this.totalFilters = null),
				(this.options = {
					bundlePath: e.bundlePath ?? u,
					mergeIndex: e.mergeIndex ?? [],
				}),
				delete e.bundlePath,
				delete e.resetStyles,
				delete e.processResult,
				delete e.processTerm,
				delete e.debounceTimeoutMs,
				delete e.mergeIndex,
				delete e.translations,
				(this.pagefindOptions = e);
		}
		add(e) {
			e?.register?.(this), this.components.push(e);
		}
		on(e, t) {
			if (!this.__hooks__[e]) {
				let s = Object.keys(this.__hooks__).join(", ");
				console.error(
					`[Pagefind Composable]: Unknown event type ${e}. Supported events: [${s}]`,
				);
				return;
			}
			if (typeof t != "function") {
				console.error(
					`[Pagefind Composable]: Expected callback to be a function, received ${typeof t}`,
				);
				return;
			}
			this.__hooks__[e].push(t);
		}
		triggerLoad() {
			this.__load__();
		}
		triggerSearch(e) {
			(this.searchTerm = e),
				this.__dispatch__("search", e, this.searchFilters),
				this.__search__(e, this.searchFilters);
		}
		triggerSearchWithFilters(e, t) {
			(this.searchTerm = e),
				(this.searchFilters = t),
				this.__dispatch__("search", e, t),
				this.__search__(e, t);
		}
		triggerFilters(e) {
			(this.searchFilters = e),
				this.__dispatch__("search", this.searchTerm, e),
				this.__search__(this.searchTerm, e);
		}
		triggerFilter(e, t) {
			(this.searchFilters = this.searchFilters || {}),
				(this.searchFilters[e] = t),
				this.__dispatch__("search", this.searchTerm, this.searchFilters),
				this.__search__(this.searchTerm, this.searchFilters);
		}
		__dispatch__(e, ...t) {
			this.__hooks__[e]?.forEach((s) => s?.(...t));
		}
		async __clear__() {
			this.__dispatch__("results", { results: [], unfilteredTotalCount: 0 }),
				(this.availableFilters = await this.__pagefind__.filters()),
				(this.totalFilters = this.availableFilters),
				this.__dispatch__("filters", {
					available: this.availableFilters,
					total: this.totalFilters,
				});
		}
		async __search__(e, t) {
			this.__dispatch__("loading"), await this.__load__();
			let s = ++this.__searchID__;
			if (!e || !e.length) return this.__clear__();
			let n = await this.__pagefind__.search(e, { filters: t });
			n &&
				this.__searchID__ === s &&
				(n.filters &&
					Object.keys(n.filters)?.length &&
					((this.availableFilters = n.filters),
					(this.totalFilters = n.totalFilters),
					this.__dispatch__("filters", {
						available: this.availableFilters,
						total: this.totalFilters,
					})),
				(this.searchResult = n),
				this.__dispatch__("results", this.searchResult));
		}
		async __load__() {
			if (this.__initializing__) {
				while (!this.__pagefind__) await F(50);
				return;
			}
			if (((this.__initializing__ = !0), !this.__pagefind__)) {
				let e;
				try {
					e = await import(`${this.options.bundlePath}pagefind.js`);
				} catch (t) {
					console.error(t),
						console.error(
							[
								`Pagefind couldn't be loaded from ${this.options.bundlePath}pagefind.js`,
								"You can configure this by passing a bundlePath option to PagefindComposable Instance",
								`[DEBUG: Loaded from ${document?.currentScript?.src ?? "no known script location"}]`,
							].join(`
`),
						);
				}
				await e.options(this.pagefindOptions || {});
				for (let t of this.options.mergeIndex) {
					if (!t.bundlePath)
						throw new Error("mergeIndex requires a bundlePath parameter");
					let s = t.bundlePath;
					delete t.bundlePath, await e.mergeIndex(s, t);
				}
				this.__pagefind__ = e;
			}
			(this.availableFilters = await this.__pagefind__.filters()),
				(this.totalFilters = this.availableFilters),
				this.__dispatch__("filters", {
					available: this.availableFilters,
					total: this.totalFilters,
				});
		}
	};
	window.PagefindModularUI = f;
})();
