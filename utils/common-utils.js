import { isArray } from "@/utils/lodash";

const storeActionCommit = (commitFn, actionType) => val =>
  commitFn(actionType, val);

const wrapInArray = val => (isArray(val) ? val : [val]);

export { storeActionCommit, wrapInArray };
