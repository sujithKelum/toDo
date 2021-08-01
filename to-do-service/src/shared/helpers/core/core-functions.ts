/**
 * Check value is empty (empty returns true)
 */
const _isEmpty = (value: string | number | null) => {
  if (
    value === '' ||
    value == null ||
    !value ||
    value === undefined ||
    value === 'null' ||
    value === 'undefined'
  ) {
    return true;
  } else {
    return false;
  }
};

/**
 * Convert string 'true', 'false' to boolean true, false
 */
const _toBoolean = (value: string) => {
  if (value === 'false') {
    return false;
  } else {
    return true;
  }
};

export { _isEmpty, _toBoolean };
