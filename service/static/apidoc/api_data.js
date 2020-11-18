define({ "api": [
  {
    "type": "get",
    "url": "/duboku",
    "title": "获取独播库数据",
    "name": "getDuboku",
    "group": "独播库",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>接口请求是否成功</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data",
            "description": "<p>独播库数据数组</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功的响应:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/DubokuController.ts",
    "groupTitle": "独播库"
  },
  {
    "type": "get",
    "url": "/duboku/pull",
    "title": "拉取新数据",
    "name": "pullDuboku",
    "group": "独播库",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>接口请求是否成功</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data",
            "description": "<p>是否成功拉取数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功的响应:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/DubokuController.ts",
    "groupTitle": "独播库"
  },
  {
    "type": "get",
    "url": "/course",
    "title": "获取课程数据",
    "name": "getCourse",
    "group": "课程",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>接口请求是否成功</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>课程数据数组</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功的响应:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/CourseController.ts",
    "groupTitle": "课程"
  },
  {
    "type": "get",
    "url": "/course/pull",
    "title": "拉取新数据",
    "name": "pullCourse",
    "group": "课程",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>接口请求是否成功</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "data",
            "description": "<p>是否拉取数据成功</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "成功的响应:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controller/CourseController.ts",
    "groupTitle": "课程"
  }
] });
