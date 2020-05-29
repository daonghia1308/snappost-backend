module.exports = function badRequest(err, viewOrRedirect) {
  var req = this.req;
  var res = this.res;

  function sendJSON(data) {
    if (!data) {
      return res.send();
    } else {
      if (typeof data !== 'object' || data instanceof Error) {
        if ('E_MISSING_OR_INVALID_PARAMS' === data.code) {
          data = {
            code: 1,
            message: 'Vui lòng nhập đầy đủ các dữ liệu bắt buộc.',
            data: data.message,
          };
        }
        if ('E_INVALID_VALUES_TO_SET' === data.code) {
          if (data.details.includes('email')) {
            data = {
              code: 1,
              message: 'Email không đúng định dạng, vui lòng thử lại.',
              data: data.message,
            };
          } else {
            data = {
              code: 1,
              message: 'Dữ liệu không đúng định dạng, vui lòng thử lại.',
              data: data.message,
            };
          }
        } else if ('E_UNIQUE' === data.code) {
          if (data.details.includes('email')) {
            data = {
              code: 1,
              message: 'Email đã tồn tại, vui lòng thử lại.',
              data: data.message,
            };
          } else {
            data = {
              code: 1,
              message: 'Đã có dữ liệu tương đương tồn tại, vui lòng tìm kiếm để sử dụng',
              data: data.message,
            };
          }
        } else {
          data = {
            code: 1,
            message: 'Hệ thống đang bận, vui lòng thử lại sau.',
            data: data.message,
          };
        }
      }
      if (req.options.jsonp && !req.isSocket) {
        return res.jsonp(data);
      } else {
        return res.json(data);
      }
    }
  }

  // Set status code
  res.status(400);

  // Log error to console
  this.req._sails.log.verbose('Sent 400 ("Bad Request") response');
  if (err) {
    this.req._sails.log.verbose(err);
  }

  // If the user-agent wants JSON, always respond with JSON
  if (req.wantsJSON) {
    return sendJSON(err);
  }

  // Make data more readable for view locals
  var locals;
  if (!err) {
    locals = {};
  } else if (typeof err !== 'object') {
    locals = { error: err };
  } else {
    var readabilify = function(value) {
      if (sails.util.isArray(value)) {
        return sails.util.map(value, readabilify);
      } else if (sails.util.isPlainObject(value)) {
        return sails.util.inspect(value);
      } else {
        return value;
      }
    };
    locals = { error: readabilify(err) };
  }

  // Serve HTML view or redirect to specified URL
  if (typeof viewOrRedirect === 'string') {
    if (viewOrRedirect.match(/^(\/|http:\/\/|https:\/\/)/)) {
      return res.redirect(viewOrRedirect);
    } else {
      return res.view(viewOrRedirect, locals, function viewReady(
        viewErr,
        html
      ) {
        if (viewErr) {
          return sendJSON(err);
        } else {
          return res.send(html);
        }
      });
    }
  } else {
    return res.view('400', locals, function viewReady(viewErr, html) {
      if (viewErr) {
        return sendJSON(err);
      } else {
        return res.send(html);
      }
    });
  }
};
