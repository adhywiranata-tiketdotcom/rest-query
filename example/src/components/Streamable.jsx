import { useStreamable } from '../../../dist';

function UseCaseTwo() {
  const streamOpts = {
    streamEndFlag: 'isStreamingDone',
    reqBodyParamsKey: 'requestIds',
    initialRequestBodyParams: [1, 2, 3],
    responseReqBodyExtractorKey: 'requestIds',
    onStreamEnd: () => console.log('streaming ends...'),
    onNextTick: () => console.log('next tick'),
    stackDataMapper: (data) => ({
      results: data.results,
    }),
    stackDataReducer: (data, newData) => ({ results: [...data.results, ...newData.results] }),
    streamDataFlow: 'OBJECT'
  };

  const d = useStreamable('http://localhost:1234/streaming', streamOpts);
  console.log(d);

  return (
    <div>
      <h1>Use Case Two: Streaming</h1>
      <div>
        {JSON.stringify(d.data)}
      </div>
    </div>
  )
}

export default UseCaseTwo;
