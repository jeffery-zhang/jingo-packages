## Project Overview

This project is a Monorepo built on pnpm workspace, with two main directories: apps and packages. It allows you to manage multiple packages and applications in a single repository efficiently.

## Getting Started

To start the Vite example project, you can run the following command:

```sh
pnpm dev
```

This command will start the development server for the Vite example project.

## Building the Project

To build the Vite example project, you can use the following command:

```sh
pnpm build
```

This command will build the Vite example project for production deployment.

## Directory Structure

- apps: Contains the applications developed in the Monorepo.
- packages: Contains the shared packages and libraries used across the applications.

## Installing and Removing Packages for Child Projects

### Installing Packages for the example Project in apps Directory

```sh
pnpm add -S lodash --filter example
```

### Installing Packages from packages Directory for example Project

```sh
pnpm add -S @packages/foo --filter example
```

### Removing Packages

```sh
pnpm remove lodash --filter example
pnpm remove @packages/foo --filter example
```

Use the --filter flag with pnpm add and pnpm remove to manage package installation and removal specifically for child projects in this Monorepo.
