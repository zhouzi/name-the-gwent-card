# Contributing

This project uses [create-react-app](https://create-react-app.dev/).

- Installation: `npm install`
- Start: `npm start`

## TODOs

Below is a list of things that could be improved, splitted into different categories.

### Design

- [ ] Pressing enter when the autocomplete is open should select the first item. Also, perhaps it should display a "No results" when there are no results. It'd make the autocomplete friendlier.
- [ ] The lifebar should be green when full, orange when reaching 50% and red when reaching 25%.
- [ ] Use a less-white color for the body text? Looking at the instructions, the body text seems really bright. The heading/body's hierarchy seems to suffer from that.
- [ ] Extract the colors into a theme and make sense of them. I liked the freedom of using colors without thinking too much about it in the beginning. But now they're all over the place. They can probably reduced to a smaller number that makes sense.
- [ ] Improve the design system's components reusability. Laziness led me to add margins to some reusable components, which makes them not so reusable. The thing is that there are still some places where they need a margin. [styled-system](https://styled-system.com/) could come handy here.

### Clean code

- [ ] Make the relation between cards and messages tighter. Currently, it's unclear when looking at the code that cards and messages are tightly related. It should not be possible to add a locale without the corresponding cards. A possible fix could be to isolate them in a localization folder.
- [ ] Remove `types.d.ts`. I didn't know where to put some types in the beginning but it's now easier.
- [ ] Create some more reusable types. A few types are duplicated and sometimes their declaration is quite complex (e.g `Array<keyof typeof messages>`).
- [ ] Move the link to google fonts to the public.html file. Or to `GlobalStyle` but right now it just feels out of place.

### Developer Experience

- [ ] Configure Typescript's root to avoid the long import paths (e.g replace "../../designSystem" with "designSystem")
- [ ] Configure GitHub actions to run ESLint.
