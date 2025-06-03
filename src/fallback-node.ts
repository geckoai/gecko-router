import { createElement } from 'react';

export function FallbackNode() {
  return createElement("div", {
    children: 'loading...'
  })
}