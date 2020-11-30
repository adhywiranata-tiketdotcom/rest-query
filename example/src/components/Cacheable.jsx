import { useCacheable } from '../../../dist';

function Pokemon(props) {
  return (
    <div>
      <h2>{props.data?.name}</h2>
      <img src={props.data?.sprites?.front_default} alt="mg" height="96px" />
    </div>
  )
}

function Xerneas() {
  const { data, isLoading, error } = useCacheable('https://pokeapi.co/api/v2/pokemon/xerneas', { shouldPersist: true });
  console.log('Render <Xerneas />');
  return (
    <div>
      <p>fetching + caching with url</p>
      {isLoading && <img src="https://media.tenor.com/images/37acc4234291468b6bb1884e3916a341/tenor.gif" alt="load" />}
      {data && !isLoading && <Pokemon data={data} />}
      {error && <p>API error!</p>}
    </div>
  );
}

function Yveltal() {
  const { data, isLoading, error } = useCacheable('https://pokeapi.co/api/v2/pokemon/yveltal', { key: 'yveltal', shouldPersist: true });
  console.log('Render <Yveltal />');
  return (
    <div>
      <p>fetching + caching with key</p>
      {isLoading && <img src="https://media.tenor.com/images/37acc4234291468b6bb1884e3916a341/tenor.gif" alt="load" />}
      {data && !isLoading && <Pokemon data={data} />}
      {error && <p>API error!</p>}
    </div>
  );
}

function Zygarde() {
  const { data, isLoading, error } = useCacheable('https://pokeapi.co/api/v2/pokemon/zygarde', { cachePolicy: 'network-only' });
  console.log('Render <Zygarde />');
  return (
    <div>
      <p>Network Always. No Cache</p>
      {isLoading && <img src="https://media.tenor.com/images/37acc4234291468b6bb1884e3916a341/tenor.gif" alt="load" />}
      {data && !isLoading && <Pokemon data={data} />}
      {error && <p>API error!</p>}
    </div>
  );
}

function IShouldNotBeRerendered() {
  console.log('Render <IShouldNotBeRerendered />');
  return (
    <div>
      STATIC COMPONENT. NO RERENDER
    </div>
  )
}

function UseCaseOne() {
  return (
    <div>
      <h1>Use Case 1</h1>
      <Xerneas />
      <Yveltal />
      <Zygarde />
      <IShouldNotBeRerendered />
    </div>
  );
}

export default UseCaseOne;
