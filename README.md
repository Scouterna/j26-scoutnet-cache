<div width="100%" style="text-align: left">
  <img align="right" width="80" src="./docs/jamboree26_logo_small_dark.png#gh-dark-mode-only" alt="Jamboree26 Logo">
  <img align="right" width="80" src="./docs/jamboree26_logo_small_light.png#gh-light-mode-only" alt="Jamboree26 Logo">

  <br />
  <br />
  <h1>Jamboree26 Scoutnet Cache</h1>
</div>

This server acts as a middleman between applications and Scoutnet. It:
- Reformats responses from Scoutnet to make them easier to work with. For
  example, it makes sections look like real groups.
- Provides an OpenAPI document on `/openapi` for better type safety.
- Provides human-readable API documentation on `/docs`.
- Caches responses to easen the burden on Scoutnet.

It _does not_ have any form of authorization built in. If a system can access
the server, they can access all data. This is subject to change.

## Running

For every commit on main we build a Docker image, tagged with the short hash of
the commit. We also publish the `latest` tag. You'll find the image
[here](https://github.com/Scouterna/j26-scoutnet-cache/pkgs/container/j26-scoutnet-cache).

```bash
# Copy and fill out the .env file
cp .env.example .env

# Run the cache server, making sure to expose port 80
docker run --env-file .env -p 8080:80 ghcr.io/scouterna/j26-scoutnet-cache
```

## Developing

Before getting started, make sure you have [pnpm installed](https://pnpm.io/installation).

Setting up your development environment is as easy as creating a `.env` file and
installing the dependencies.

```bash
# Copy and fill out the .env file
cp .env.example .env

# Install dependencies
pnpm install
```

The run the development server:
```bash
pnpm run dev
```

A [Bruno](https://www.usebruno.com/) collection is available to be opened in the
`bruno` directory. Please make sure to update this collection when making
changes to the application.

If you're using VS Code you'll be prompted to install the
[Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome).
When installed, restart VS Code to have linter errors show up in your IDE.
