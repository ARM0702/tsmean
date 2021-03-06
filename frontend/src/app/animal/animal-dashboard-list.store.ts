import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AnimalDashboardListStore {
  private dashboardList: BehaviorSubject<number[]> = new BehaviorSubject([]);

  constructor() {}

  /**
   * Adds a resourceId to the list. If no position is provided, appends it to the end.
   */
  add(resourceId: number, index?: number): void {
    const currentValue: number[] = this.dashboardList.getValue(); // todo: check immutability
    if (index !== undefined) {
      if (index <= currentValue.length) {
        currentValue.splice(index, 0, resourceId);
        this.dashboardList.next(currentValue);
      } else {
        throw new Error('Index of bounds. Cannot add animal.');
      }
    } else {
      currentValue.push(resourceId);
      this.dashboardList.next(currentValue);
    }
  }

  /**
   * Resets the entire list
   */
  set(newList: number[]): void {
    this.dashboardList.next(newList);
  }

  /**
   * Remove a single item from the list by its id
   */
  removeById(resourceId: number): void {
    const currentValue = this.dashboardList.getValue();
    this.dashboardList.next(currentValue.filter(id => id !== resourceId));
  }

  /**
   * Remove a single item from the list by its position
   */
  removeByIndex(index: number): void {
    const currentValue = this.dashboardList.getValue();
    currentValue.splice(index, 1);
    this.dashboardList.next(currentValue);
  }

  /**
   * Get the list-observable
   */
  get(): BehaviorSubject<number[]> {
    return this.dashboardList;
  }

  /**
   * Update an item in the list by its index
   */
  updateByIndex(index: number, newResourceId: number): void {
    const currentValue = this.dashboardList.getValue();
    if (index <= currentValue.length) {
      currentValue[index] = newResourceId;
      this.dashboardList.next(currentValue);
    } else {
      throw new Error('Index of bounds. Cannot update animal.');
    }
  }

  /**
   * Update an item in the list by its id
   */
  updateById(id: number, newResourceId: number): void {
    const currentValue = this.dashboardList.getValue();
    const newValue = currentValue.map(x => (x === id ? newResourceId : x));
    this.dashboardList.next(newValue);
  }
}
