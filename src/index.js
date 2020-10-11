import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Popover, Button, Layout, Input, Col } from 'antd';
import $ from 'jquery';

const { Header, Footer, Sider, Content } = Layout;
const content1 = (
	<div>
		<p className="header-popover-div item">Content-1</p>
		<p className="header-popover-div item">Content-2</p>
	</div>
);

const content2 = (
	<div>
		<div className="menu-popover-row">
			<div className="item">Content-1-1</div>
			<div className="item">Content-1-2</div>
			<div className="item">Content-1-3</div>
			<div className="item">Content-1-4</div>
		</div>
		<div className="menu-popover-row">
			<div className="item">Content-2-1</div>
			<div className="item">Content-2-2</div>
			<div className="item">Content-2-3</div>
			<div className="item">Content-2-4</div>
		</div>
		<div className="menu-popover-row">
			<div className="item">Content-3-1</div>
			<div className="item">Content-3-2</div>
			<div className="item">Content-3-3</div>
			<div className="item">Content-3-4</div>
		</div>
	</div>
);

let activePopoverDom = null;
let activePopoverItem = null;

$(document.body).on('keydown', function (e) {
  console.log('activePopoverDom:', activePopoverDom);
  console.log('activePopoverItem:', activePopoverItem);
	if (activePopoverDom && activePopoverDom.length && [38, 40, 37, 39, 13].indexOf(e.keyCode) > -1) {
		if (!activePopoverItem) {
			if ((activePopoverDom.hasClass('ant-popover-placement-bottom') && e.keyCode === 40) || (activePopoverDom.hasClass('ant-popover-placement-right') && e.keyCode === 39)) {
				activePopoverItem = activePopoverDom.find('.item:first');
				setActiveStatus(null, activePopoverItem);
				return;
			}
		}
		if (activePopoverDom.hasClass('ant-popover-placement-bottom')) {
			switch (e.keyCode) {
				case 38:
          console.log('Top');
          if (activePopoverItem && activePopoverItem.prev().length) {
            setActiveStatus(activePopoverItem, activePopoverItem ? activePopoverItem.prev() : null);
          }
					break;
				case 40:
          console.log('Bottom');
          if (activePopoverItem && activePopoverItem.next().length) {
            setActiveStatus(activePopoverItem, activePopoverItem ? activePopoverItem.next() : null);
          }
					break;
				default:
					// 13 Enter
          console.log('Enter');
          itemEnter();
			}
		} else if (activePopoverDom.hasClass('ant-popover-placement-right')) {
			switch (e.keyCode) {
				case 38:
          console.log('Top');
          if (activePopoverItem) {
            if (activePopoverItem.parent().prev().length) {
              const parentPrev = activePopoverItem.parent().prev();
              const index = activePopoverItem.index();
              const nextActivePopoverItem = parentPrev.find(`.item:eq(${index})`);
              setActiveStatus(activePopoverItem, nextActivePopoverItem);
            }
          }
					break;
				case 40:
          console.log('Bottom');
          if (activePopoverItem) {
            if (activePopoverItem.parent().next().length) {
              const parentNext = activePopoverItem.parent().next();
              const index = activePopoverItem.index();
              const nextActivePopoverItem = parentNext.find(`.item:eq(${index})`);
              setActiveStatus(activePopoverItem, nextActivePopoverItem);
            }
          }
					break;
				case 37:
          console.log('Left');
          if (activePopoverItem && activePopoverItem.prev().length) {
            setActiveStatus(activePopoverItem, activePopoverItem ? activePopoverItem.prev() : null);
          }
					break;
				case 39:
          console.log('Right');
          if (activePopoverItem && activePopoverItem.next().length) {
            setActiveStatus(activePopoverItem, activePopoverItem ? activePopoverItem.next() : null);
          }
					break;
				default:
          // 13 Enter
          console.log('Enter');
          itemEnter();
			}
		}
	}
});

function onVisibleChange(visible) {
  console.log(visible);
  if (activePopoverItem) {
    activePopoverItem.removeClass('active');
  }
  if (!visible) {
    activePopoverDom = null;
    if (activePopoverItem) {
      activePopoverItem = null;
    }
  }
  // 動畫效果默認100ms
	setTimeout(() => {
		if (visible) {
			activePopoverDom = $('.ant-popover:not(.ant-popover-hidden)');
		}
	}, 401);
}

function setActiveStatus(itemDom, nextItemDom) {
	if (itemDom && itemDom.length) {
		itemDom.removeClass('active');
  }
  
  if (nextItemDom && nextItemDom.length) {
    nextItemDom.addClass('active');
	}
  activePopoverItem = nextItemDom;
}

function itemEnter() {
  const focusTxt = $(":focus").text();
  const itemTxt = activePopoverItem.text();
  alert(`${focusTxt}-${itemTxt} is clicked`);
}

ReactDOM.render(
	<Layout className="root">
		<Header className="flex header">
			<Col span={12} className="header-search-content">
				<Input placeholder="Basic usage" />
			</Col>
			<Col span={12} className="flex header-button-content">
				<div className="item">
					<Popover content={content1} trigger="hover focus" onVisibleChange={onVisibleChange}>
						<Button>header1</Button>
					</Popover>
				</div>
				<div className="item">
					<Popover content={content1} trigger="hover focus" onVisibleChange={onVisibleChange}>
						<Button>header2</Button>
					</Popover>
				</div>
				<div className="item">
					<Popover content={content1} trigger="hover focus" onVisibleChange={onVisibleChange}>
						<Button>header3</Button>
					</Popover>
				</div>
			</Col>
		</Header>
		<Layout>
			<Sider className="menu">
				<div className="item">
					<Popover content={content2} placement="right" trigger="hover focus" onVisibleChange={onVisibleChange}>
						<a href="javascript:void(0)">Menu1</a>
					</Popover>
				</div>
				<div className="item">
					<Popover content={content2} placement="right" trigger="hover focus" onVisibleChange={onVisibleChange}>
						<a href="javascript:void(0)">Menu2</a>
					</Popover>
				</div>
				<div className="item">
					<Popover content={content2} placement="right" trigger="hover focus" onVisibleChange={onVisibleChange}>
						<a href="javascript:void(0)">Menu3</a>
					</Popover>
				</div>
				<div className="item">
					<Popover content={content2} placement="right" trigger="hover focus" onVisibleChange={onVisibleChange}>
						<a href="javascript:void(0)">Menu4</a>
					</Popover>
				</div>
				<div className="item">
					<Popover content={content2} placement="right" trigger="hover focus" onVisibleChange={onVisibleChange}>
						<a href="javascript:void(0)">Menu5</a>
					</Popover>
				</div>
			</Sider>
			<Content>
				<div className="content-inner-div"></div>
			</Content>
		</Layout>
		<Footer></Footer>
	</Layout>,
	document.getElementById('root')
);
