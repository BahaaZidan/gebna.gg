---
title: How to Build a CI/CD Pipeline for Your Lambda Using SST and GitHub Actions
description: In this article, I'll give you two options to consider If you want to include your SST project in a CI/CD pipeline.
pubDate: "2022-09-18"
heroImage: "/hero-images/how-to-build-a-cicd-pipeline-for-your-lambda-using-sst-and-github-actions.jpg"
---

Many people developing on AWS Lambda have chosen to use [SST](https://sst.dev/) for it's great feature-set including: easy to use console, composable serverless constructs, and live lambda development.

In this article, I'll give you two options to consider If you want to include your SST project in a CI/CD pipeline.

## Seed

[Seed](https://seed.run/) is a platform created by the same folks who created SST. It integrates with your SST apps without requiring any fiddling with configuration or writing any scripts. It also handles other concerns like alerting. It's a great tool and If you want a zero-hassle CI/CD pipeline, it's the tool for you. I will be focusing on an alternative approach in this article. But I felt an honorable mention was due. They have extensive documentation that you can find [here](https://seed.run/docs/).

## GitHub Actions

There are many reasons why you'd want to use [GitHub actions](https://docs.github.com/en/actions). They offer you the most control over what happens in your pipelines. They're also extremely flexible. And are also extremely easy to develop. Anything you can do on your terminal can be easily ported to a GitHub workflow.

Here's how I was able to create a pipeline that deployed my lambda every time a commit was pushed to main:

In the root directory of your repo, run the following commands:

```shell
mkdir -p .github/workflows
```

```shell
cd ./.github/workflows
```

And create a new `.yml` file with any name you want:

```shell
touch deploy.yml
```

In this file we'll start to develop our pipeline. First we give it a name and a trigger. Here we're defining the trigger to be every time someone pushes a commit to main.

```yml
name: Deploy
on:
  push:
    branches:
      - main
```

Now we need to define the jobs that are going to run in this pipeline. Here we're defining a job named Prod (production staging for deployment). We're also telling it to run our job on the latest LTS version of [Ubuntu](https://ubuntu.com/).

```yml
jobs:
  prod:
    name: Prod
    runs-on: ubuntu-latest
```

Then we define the environment variables our SST app would need. We can write these directly but some of these environment variables are secrets, that is not secure as this file needs to be checked into git. So the better alternative is to use GitHub repo secrets. [Click here for a step by step guide](https://docs.github.com/en/actions/security-guides/encrypted-secrets) on how to do it.
Assuming you've already added your repository secrets, lets add them as environment variables to our pipeline:

```yml
jobs:
  prod:
    env:
      DATABASE_URI: ${{ secrets.DATABASE_URI}}
      JWT_SECRET: ${{ secrets.JWT_SECRET}}
```

Finally, we define the steps our pipeline will take.

```yml
jobs:
  prod:
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-west-1
      - run: npm ci
      - run: npx sst deploy --stage prod
```

To understand what's happening here we need to note that there's a big marketplace of ready made GitHub actions that we can make use of in our custom pipelines. These can be found [here](https://github.com/marketplace?type=actions). While defining our steps we've made use of a few of these ready-made GH actions.

Now if you read the previous code snippet again, it's actually very straight forward. We clone our repo, setup Node.js version 16, configure our AWS credentials which we'll need to be able to run SST, we npm install, and finally we run the SST deploy command with the stage argument `prod`.

Here's the final `deploy.yml` file content:

```yml
name: Deploy
on:
  push:
    branches:
      - main
jobs:
  prod:
    name: Prod
    runs-on: ubuntu-latest
    env:
      DATABASE_URI: ${{ secrets.DATABASE_URI}}
      JWT_SECRET: ${{ secrets.JWT_SECRET}}
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-west-1
      - run: npm ci
      - run: npx sst deploy --stage prod
```

## Conclusion

And here it is. Your own pipeline deploying your AWS Lambda. This pipeline can be enhanced to include multiple jobs for different environments or stages. It can be extended to include more steps. Of course, pipelines are not free. GitHub will charge you per minute so be careful and calculate your costs before you commit to any platform.
