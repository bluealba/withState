import { withState as originalWithState } from "@dump247/storybook-state";

export const withState = initialState => (story, context) => {
    const state = context.parameters.initialState || initialState;
	return originalWithState(state)(copiedContext => {
		context.store = copiedContext.store;
		return story(context);
	})(context)
}
