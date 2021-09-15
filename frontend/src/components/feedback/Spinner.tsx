import Loader, { LoaderProps } from 'react-loader-spinner'

export function Spinner({
  height = 24,
}: Pick<LoaderProps, 'height' | 'visible'>) {
  return <Loader type="TailSpin" color="rgba(30, 58, 138)" height={height} />
}
