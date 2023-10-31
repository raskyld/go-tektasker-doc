---
title: Getting Started
description: Getting Started with Tektasker.
---

## Introduction

In this guide, we will initiate a go project and turns it into an usable Tekton
Task using `go-tektasker`.

## Requirements

Ensure you followed the [installation instructions][install].

## Steps

### Step 1: Initiate the project

```shell
# Create a working directory for your task
mkdir my-task
cd my-task

# Initiate a Go module
go mod init example.com/my-task

# Scaffold an example task with an opinionated development environment
go-tektasker init my-task
```

### Step 2: Get familiar with the structure

You will find a `task.go` containing an example of a task using tektasker.

The opinionated [Development Environment][dev-env] is also present, you
can remove the `.env` and `Taskfile.yaml` if you prefer to use
`go-tektasker` as a standalone.

This environment behavior defaults to:
- Write your task manifest into the `deployment/` directory.
- Generate go helper code package in `internal/tekton`.

### Step 3: Understand the markers

Tektasker uses a concept borrowed from [kubebuilder][kb] that is
[markers][kb-markers].

Markers are go comments with a special syntax that are used to
*mark* your code constructs (structures, package, ...). You can use
markers to tell to Tektasker in which structure you would like
to receive a specific parameter or result.

At the package level, the marker `+tektasker:task` is used to give
a name to your task and specify its version and is mandatory.

You can see the list of available markers by using
`go-tektasker markers`. If you want to get a more verbose
help about a specific marker, specify it as an
argument to the previous command.

### Step 4: Follow the instruction in `task.go`

You will be asked to generate the go helper code and remove
the comments before the `MustRead` and `MustWrite` instructions.

If you want to use Tektasker as a standalone, you can use
`go-tektasker gen go internal/ tekton` to generate the go code in
`internal/tekton`, otherwise, if you use the
[Development Environment][dev-env], simply run `task generate`.

Feel free to change the format of the output message that will be stored
in the `lm` result.

By now, it should be clear to you that:
- `MustRead` tries to read a Tekton Task parameter or panic if it fails.
- `MustWrite` tries to write your result back to Tekton or panic if it fails.

If you prefer to not panic and handle errors gracefully, those functions
exists without the `Must` prefix.

### Step 5: Create the YAML manifest

Simply run `task manifest` in the dev env.

Otherwise, use `go-tektasker gen manifest deployment/`.

This will create a `base` Kustomization for your task in the
`deployment/` directory.

### Step 6: Deploy your task

Now that you have your YAML generated, you can deploy your task.

If you use the [Development Environment][dev-env], just run
`task apply`.

Otherwise, you need to manually:
- Build and push a container image of your go project.
- Create an overlay of the generated `base` Kustomization
  to replace the image of the `step`.
- Apply the overlay you created on your cluster.

## Conclusion