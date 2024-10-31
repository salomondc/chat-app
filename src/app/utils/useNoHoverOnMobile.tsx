import { useEffect } from "react";

export const useNoHoverOnMobile = () => {
	useEffect(() => {
		function hasTouch() {
			return (
				"ontouchstart" in document.documentElement ||
				navigator.maxTouchPoints > 0 ||
				//@ts-expect-error: other browsers property
				navigator.msMaxTouchPoints > 0
			);
		}

		if (hasTouch()) {
			// remove all the :hover stylesheets
			try {
				// prevent exception on browsers not supporting DOM styleSheets properly
				for (const si in document.styleSheets) {
					const styleSheet = document.styleSheets[si];
					if (!styleSheet.rules) continue;

					for (let ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
						//@ts-expect-error: other browsers property
						if (!styleSheet.rules[ri].selectorText) continue;
						//@ts-expect-error: other browsers property
						if (styleSheet.rules[ri].selectorText.match(":hover")) {
							styleSheet.deleteRule(ri);
						}
					}
				}
			} catch {}
		}
	}, []);
};
