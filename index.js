import { withState as originalWithState } from "@dump247/storybook-state";

export const withState = initialState => (story, context) => {
	return originalWithState(initialState)(copiedContext => {
		context.store = copiedContext.store;
		return story(context);
	})(context)
}
