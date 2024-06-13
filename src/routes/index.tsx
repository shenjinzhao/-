import User from '@/pages/Home/components/User';

export default [
  {
    path: '/user',
    element: <User />,
  },
] as {
  path: string;
  element: JSX.Element;
}[]