import React from 'react'
import classNames from 'classnames'

import styles from './style.module.scss'

export enum Direction {
  row = 'row',
  column = 'column'
}

export enum Wrap {
  wrap = 'wrap',
  nowrap = 'no-wrap',
  reverse = 'wrap-reverse',
  none = 'wrap-none'
}

export enum Sort {
  left_top = 'left_top',
  left_center = 'left_center',
  left_bottom = 'left_bottom',

  center_top = 'center_top',
  center_center = 'center_center',
  center_bottom = 'center_bottom',

  right_top = 'right_top',
  right_center = 'right_center',
  right_bottom = 'right_bottom',

  space_between = 'space_between'
}

export enum Overflow {
  auto = 'auto',
  hidden = 'hidden',
  none = 'none'
}

export interface IProps {
  className: string
  children: React.ReactNode

  direction: Direction
  sort: Sort
  wrap: Wrap
  overflow: Overflow

  margin: number[]
  padding: number[]

  onClick(event: React.MouseEvent<HTMLDivElement>): void
}

const Block = (init: Partial<IProps>) => {
  const className: string = init.className ? init.className : ''
  const children: React.ReactNode = init.children ? init.children : null
  const direction: Direction = init.direction ? init.direction : Direction.row
  const sort: Sort = init.sort ? init.sort : Sort.center_center
  const wrap: Wrap = init.wrap ? init.wrap : Wrap.none
  const overflow: Overflow = init.overflow ? init.overflow : Overflow.none
  const onClick = init.onClick ? init.onClick : null

  const marginPos = (array: number[]) =>
    array.reduce(
      (iter, curr, idx) => {
        switch (idx) {
          case 0:
            iter.marginTop = `${curr}px`
            break
          case 1:
            iter.marginRight = `${curr}px`
            break
          case 2:
            iter.marginBottom = `${curr}px`
            break
          case 3:
            iter.marginLeft = `${curr}px`
            break
        }

        return iter
      },
      { marginTop: '0', marginBottom: '0', marginLeft: '0', marginRight: '0' }
    )

  const paddingPos = (array: number[]) =>
    array.reduce(
      (iter, curr, idx) => {
        switch (idx) {
          case 0:
            iter.paddingTop = `${curr}px`
            break
          case 1:
            iter.paddingRight = `${curr}px`
            break
          case 2:
            iter.paddingBottom = `${curr}px`
            break
          case 3:
            iter.paddingLeft = `${curr}px`
            break
        }

        return iter
      },
      { paddingTop: '0', paddingBottom: '0', paddingLeft: '0', paddingRight: '0' }
    )

  const margin = init.margin ? marginPos(init.margin) : ''
  const padding = init.padding ? paddingPos(init.padding) : ''

  const classProps = classNames(
    className,
    styles.default,
    styles[direction],
    styles[direction === Direction.row ? sort : `r_${sort}`],
    styles[wrap],
    styles[overflow]
  )

  return onClick ? (
    <div onClick={onClick} className={classProps} style={{ ...margin, ...padding }}>
      {children}
    </div>
  ) : (
      <div className={classProps} style={{ ...margin, ...padding }}>
        {children}
      </div>
    )
}

export default Block
