@bluealba/withState
===
This is a wrapper around [@dump247/storybook-state](https://github.com/dump247/storybook-state) designed to be used as an storybook decorator. This is a VERY small and rather hacky util.

## Install
You can install it with `npm` using

```
npm install @bluealba/with-state
```

## Usage

Just add `withState` decorator using storybook's `addDecorator` function

```javascript
import React from "react";
import { storiesOf } from "@storybook/react";
import { withState } from "@bluealba/withState";
import { Checkbox } from "./Checkbox";

storiesOf("Checkbox", module)

	.addDecorator(withState({ isSelected: false }))

	.add("An ordinary unmanaged component", ({store}) => (
		<Checkbox
			className="checkbox size-check"
			isSelected={store.state.isSelected}
			onChange={() => {
				store.set({ isSelected: !store.state.isSelected });
			}}
		/>
	))
```

`withState` function receives as very first parameter the initial state that will be used for all the stories that don't
provide an initial state.

### Specifying the intial state

Stories can overwrite the `initialState` value through their story parameters


`withState` function receives as very first parameter the initial state that will be used for any story that doesn't 
specify it. Stories can overwrite such value through their parameters:

```javascript
storiesOf("Checkbox", module)

	.addDecorator(withState({ isSelected: false }))

	.add("An ordinary unmanaged component, checked by default", ({store}) => (
		<Checkbox
			className="checkbox size-check"
			isSelected={store.state.isSelected}
			onChange={() => {
				store.set({ isSelected: !store.state.isSelected });
			}}
		/>
	), { initialState: { isSelected: true } })
```

### Combining with other decorators

Since original `@dump247/storybook-state` HOC object is added later we are now able to combine this decorator with others that rely on component introspection. In other words, this now works perfectly:

```javascript
import React from "react";
import { storiesOf } from "@storybook/react";
import { withState } from "@bluealba/withState";
import { withInfo } from "@storybook/addon-info";
import { Checkbox } from "./Checkbox";

storiesOf("Checkbox", module)

	.addDecorator(withInfo(""))
	.addDecorator(withState({ isSelected: false }))

	.add("An ordinary unmanaged component", ({store}) => (
		<Checkbox
			className="checkbox size-check"
			isSelected={store.state.isSelected}
			onChange={() => {
				store.set({ isSelected: !store.state.isSelected });
			}}
		/>
	))
```
