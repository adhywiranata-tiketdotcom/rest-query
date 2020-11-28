import { useFetchable } from '../../../dist';

function Pokemon(props) {
  return (
    <div>
      <h2>{props.data?.name}</h2>
      <img src={props.data?.sprites?.front_default} alt="mg" height="96px" />
    </div>
  )
}

function Slowpoke() {
  const { data, isLoading, error } = useFetchable('https://pokeapi.co/api/v2/pokemon/slowpoke');
  console.log('Render <Slowpoke />');
  return (
    <div>
      <p>fetching only (same as cacheable network-only policy)</p>
      {isLoading && <img src="https://media.tenor.com/images/37acc4234291468b6bb1884e3916a341/tenor.gif" alt="load" />}
      {data && !isLoading && <Pokemon data={data} />}
      {error && <p>API error!</p>}
    </div>
  );
}

function UseCaseOne() {
  return (
    <div>
      <h1>Fetchable</h1>
      <Slowpoke />
    </div>
  );
}

export default UseCaseOne;
