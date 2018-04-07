# dev_website
SAFE Network Dev Website source.

To get started, run:
- `yarn`
- yarn start
- View at `localhost:3000`

### Overview of initial organisation:
- Instead of committing the files from [safe_ux_guidelines](https://github.com/maidsafe/safe_ux_guidelines), they are currently included as an dependency in `package.json`. The necessary files copied over during `postinstall` with `gulp`. Requires fixing however because the SCSS index is looking for files that are not in the repository.
- Regarding `i18n` and `versioning`, content is currently organised with `i18n` as the parent directory. See the `./src/locales` directory to view the structure. For example, `i18n`, `platform` and `version` is organised as `./src/locales/en-GB/platforms/node_js/versions/0.8.1.md`. This structure is used to generate React route objects. It may turn out to be inefficient to use `fs` operations but at the moment it works for POC. See how path objects are created based on `i18n`, `platform`, and `version` on line 15, at the time of writing, of `./static.config.js`
- Content, as far as the first iteration of this site goes, should be a combination of hard-coded components and markdown files. It's going to be very time consuming to rewrite markdown files in JSX component or JSON object format, especially for the content that's already been written and formatted in HackMD. Markdown integration is very easy. Included in this branch as an example.
