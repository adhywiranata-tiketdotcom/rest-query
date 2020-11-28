# Tix Rest Query

Hooks for Fetching, Caching, and Updating RESTful Service Data in React. Heavily Inspired by [React Query](https://github.com/tannerlinsley/react-query) with tiket.com Flight Team use-cases.

## Motivation

Fetching data from REST API and storing it to state is arguably simple, but it is so easy to clutter the codebase when the size of the app grows. This hooks helps that issue by removing reliance on Redux or any other global state management mechanism for storing server data and to cache them efficiently based on current knows use cases.

## Features

- [x] Ability to fetch data from remote server once, then cache it for certain amount of time, declaratively.
- [ ] Normalize API responses right after fetching the data to avoid data normalization on UI components.
- [ ] API streaming based on POST API calls.

## Usage

### Setting Up

Wrap your outermost component with RestQueryProvider which is a [React Context Provider](https://reactjs.org/docs/context.html#contextprovider).

```javascript
import { RestQueryProvider } from 'tix-rest-query';

function App() {
  return (
    <RestQueryProvider>
      <App />
    </RestQueryProvider>
```

### useCacheable

> Fetch API from GET Resource and store the data inside React Context to be persisted until the page refreshes.

⚠️ Browser storage implementation upcoming (local storage / browser-based, non http-only cookie)

```javascript
const { data, isLoading, error } = useCacheable([REST GET API], [Hook Options]);
```

__quick example__

```javascript
import { useCacheable } from 'tix-react-query';

const { data, isLoading, error } = useCacheable('https://pokeapi.co/api/v2/pokemon/xerneas');
```

__Hook Options__

|Option|Description|Default Value|
|---|---|---|
|key|unique key to name the cache. <br />If null, the key will use the API endpoint as the unique key. <br />The same cache key will override the data|null|
|cachePolicy|Cache policy strategy, enum between `cache-first`, `network-only`, or `cache-only`. <br />Cache only works only as a Redux replacement (case by case)|`cache-first`|


__quick example 2__

```javascript
import { useCacheable } from 'tix-react-query';

const { data, isLoading, error } = useCacheable('https://pokeapi.co/api/v2/pokemon/yveltal', { key: 'yveltal', cachePolicy: 'network-only' });
```


### useFetchable

> Fetch streaming API with any HTTP Methods and returns the data as a stack or object structure without cache. Docs WIP

### useStreamable

> Fetch streaming API from POST Resource and returns the data as a stack or object structure. Docs WIP

## Contributors

<table>
  <tr>
    <td align="center"><a href="https://adhywiranata.com"><img src="https://avatars2.githubusercontent.com/u/72432393?s=460&u=712228020084b9c33c2608998432114f41e045a2&v=4" width="100px;" alt=""/><br /><sub><b>Adhy Wiranata</b></sub></a><br /></td>
  </tr>
</table>
