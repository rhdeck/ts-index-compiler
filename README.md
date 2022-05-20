
<a name="__climd"></a>

# Usage
```bash
npx ts-index-compiler [options]
```
Auto-generate an index.ts file from typescript source files - build your libraries with freedom!
# Options
* -o --out \<`filepath`> Output file to be generated (default: `./src/index.ts`)
* -p --path \<`path`> Path to recursively examine for outputs (default: `./src`)

<a name="_librarymd"></a>


# ts-index-compiler - v1.1.3

## Index

### Variables

* [base](#const-base)
* [out](#out)
* [x](#const-x)

### Functions

* [getExports](#getexports)
* [makeIndex](#makeindex)

## Variables

### `Const` base

• **base**: *"."* = "."

*Defined in [index.ts:4](https://github.com/rhdeck/ts-index-compiler/blob/c940c4a/src/index.ts#L4)*

*Defined in [make-index.ts:5](https://github.com/rhdeck/ts-index-compiler/blob/c940c4a/src/make-index.ts#L5)*

___

###  out

• **out**: *string*

*Defined in [make-index.ts:87](https://github.com/rhdeck/ts-index-compiler/blob/c940c4a/src/make-index.ts#L87)*

___

### `Const` x

• **x**: *[string[], string[]][]* = getExports(".")

*Defined in [make-index.ts:88](https://github.com/rhdeck/ts-index-compiler/blob/c940c4a/src/make-index.ts#L88)*

## Functions

###  getExports

▸ **getExports**(`base`: string, `context`: string): *[][]*

*Defined in [index.ts:5](https://github.com/rhdeck/ts-index-compiler/blob/c940c4a/src/index.ts#L5)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`base` | string | "." |
`context` | string | join(process.cwd(), "src") |

**Returns:** *[][]*

___

###  makeIndex

▸ **makeIndex**(`exports`: [][], `indexPath`: string): *void*

*Defined in [index.ts:53](https://github.com/rhdeck/ts-index-compiler/blob/c940c4a/src/index.ts#L53)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`exports` | [][] | - |
`indexPath` | string | "./src/index.ts" |

**Returns:** *void*
