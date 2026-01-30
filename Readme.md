# Prisma ORM and PostgreSQL

## Install Dependencies

Add package for prisma, prismaClient and postgres database

```
pnpm add -D prisma @types/pg
pnpm add @prisma/client @prisma/adapter-pg pg
```

## Configure ESM support

tsconfig.json

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2023",
    "strict": true,
    "esModuleInterop": true,
    "ignoreDeprecations": "6.0"
  }
}
```

package.json

```json
{
  // ...
  "type": "module"
  // ...
}
```

## Initialize Prisma ORM

```
pnpm exec prisma init --datasource-provider postgresql --output ../generated/prisma
```
