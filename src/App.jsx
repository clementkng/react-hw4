import React from 'react';
import Timer from './components/Timer';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';
import ClearButton from './components/ClearButton';
import EmptyState from './components/EmptyState';

import './styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clearCompletedItems = this.clearCompletedItems.bind(this);
    this.startSession = this.startSession.bind(this);
    this.increaseSessionsCompleted = this.increaseSessionsCompleted.bind(this);
    this.toggleItemIsCompleted = this.toggleItemIsCompleted.bind(this);

    this.state = {
      // TODO 1
      items: [],
      nextItemId: 0,
      sessionIsRunning: false,
      itemIdRunning: null,
      areItemsMarkedAsCompleted: false
    };
  }

  addItem(description) {
    const { nextItemId } = this.state;
    const newItem = {
      // TODO 2: initialize new item object
      id: this.state.nextItemId,
      description: description,
      sessionsCompleted: 0,
      isCompleted: false
    };
    this.setState((prevState => ({
      // TODO 2: append new items to list and increase nextItemId by 1
      nextItemId: prevState.nextItemId + 1,
      items: prevState.items.concat(newItem)
    })));
  }

  clearCompletedItems() {
    // TODO 6 (or 7?)
    this.setState((prevState => ({
      items: prevState.items.filter(item => !item.isCompleted)
    })));
    // Ensure timer disappears if clear entire list
    if (this.state.items.length === 0) {
      this.setState({
        sessionIsRunning: false
      })
    }
  }

  increaseSessionsCompleted(itemId) {
    // TODO 5
    // Can probably try w/ filter and spreading, but not sure how to get index or slicing
    const updatedItems = this.state.items.slice();
    for (let i = 0; i < this.state.items.length; i++) {
      if (updatedItems[i].id === itemId) {
        updatedItems[i].sessionsCompleted++;
        break;
      }
    }
    this.setState((setState => ({
      items: updatedItems,
    })));
  }

  toggleItemIsCompleted(itemId) {
    // TODO 6
    const updatedItems = this.state.items.slice();
    let areItems = false;
    for (let i = 0; i < this.state.items.length; i++) {
      if (updatedItems[i].id === itemId) {
        updatedItems[i].isCompleted = !updatedItems[i].isCompleted;
      }
      // Unsure if this is how we're supposed to update the areItems state
      if (updatedItems[i].isCompleted) {
        areItems = true;
      }
    }
    this.setState((setState => ({
      items: updatedItems,
      areItemsMarkedAsCompleted: areItems
    })));
  }

  startSession(id) {
    // TODO 4
    this.setState({
      sessionIsRunning: true,
      itemIdRunning: id
    })
  }

  render() {
    console.log(this.state.items);
    const {
      items,
      sessionIsRunning,
      itemIdRunning,
      areItemsMarkedAsCompleted,
    } = this.state;
    return (
      <div className="flex-wrapper">
        <div className="container">
          <header>
            <h1 className="heading">Today</h1>
            {areItemsMarkedAsCompleted &&
              <ClearButton onClick={this.clearCompletedItems} />
            }
          </header>
          {sessionIsRunning &&
            <Timer
              mode="WORK"
              // onSessionComplete={() => { console.log("complete") }}
              onSessionComplete={() => this.increaseSessionsCompleted(itemIdRunning)}
              autoPlays
              key={itemIdRunning}
            /> }
            <div className="items-container">
            {items.length !== 0 ?
            (items.map((item) => (
              <TodoItem
                description={item.description}
                sessionsCompleted={item.sessionsCompleted}
                isCompleted={item.isCompleted}
                startSession={() => this.startSession(item.id)}
                toggleIsCompleted={() => this.toggleItemIsCompleted(item.id)}
                key={item.id}
              />
            )
            )) : (
              <EmptyState />
            )
          }
            </div>
        </div>
        <footer>
          <TodoInput addItem={this.addItem} />
        </footer>
      </div>
    );
  }
}

export default App;
