_pagesExampleData = [
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"j",
	"i",
	"k",
	"l",
	"m",
	"n"
]
var _NEOS_PAGINATION_ELEMENT_NAME = "neos-pagination";


function getNeosPaginationTemplate() {
	var parentContainer = $("<div>"),
		baseContainer = $("<div>", {"class": "pagination-container row"});
		baseContainerPagesRow = $("<div>", {"class": "pagination-row pagination-row-pages"});
		baseContainerPageEnterRow = $("<div>", {"class": "pagination-row pagination-row-page-enter"});
		
	baseContainer.appendTo(parentContainer);
	baseContainerPagesRow.appendTo(baseContainer);
	baseContainerPageEnterRow.appendTo(baseContainer);
	
	var pagesNav = $("<nav>"),
		pagesContainer = $("<ul>", {"class": "pagination"}),
		leftArrow = $("<li> <a href=\"javascript:void(0);\"> <span>&laquo;</span></a></li>"),
		pages = $("<li\"><a href=\"javascript:void(0);\"></a></li>");
		rightArrow = $("<li ng-class=\"{'disabled': pageObj.next == null}\"><a href=\"javascript:void(0);\" ng-click=\"pageChange(pageObj.page + 1, $index)\" aria-label=\"Следующая\"><span aria-hidden=\"true\">&raquo;</span></a></li>");
		
	
	pagesNav.appendTo(baseContainerPagesRow);
	pagesContainer.appendTo(pagesNav);
	leftArrow.appendTo(pagesContainer);
	pages.appendTo(pagesContainer);
	rightArrow.appendTo(pagesContainer);
	
	return parentContainer.html();
};

var NEOS_PAGINATION_TEMPLATE = getNeosPaginationTemplate();

function processTemplate(template) {
	if (template instanceof $) {
		var wrapper = $("<div>");
		wrapper.append(template);
		return wrapper.html();
	};
	return template;
}
	
function _NeosPaginationOptions() {
	var self = this;
	self.pagesObject = {};
	self.offset = 3;
	self.pageRowCount = 10;
	self.manualEventHandling = true;
};

_NeosPaginationOptions.prototype.setManualEventHandling = function() {
	this.manualEventHandling = true;
};


/**
 * 
 */
_NeosPaginationOptions.prototype.parseFromElement = function(element) {
	var self = this;
	
	function objectAttr(value) {self.pageObject = window[value] ? window[value] : {}};
	
	var attributeOptionRelaton = {
		"offset": "offset",
		"page-object": objectAttr,
		"rows-count": "pagesRowCount"
	};
	
	var attrs = element.attributes;
	$.each(attrs, function(index, attr) {
		if (attributeOptionRelaton[attr.name]) {
			if (typeof(attributeOptionRelaton[attr.name]) == "function")
				attributeOptionRelaton[attr.name](attr.value);
			else
				self[attributeOptionRelaton[attr.name]] = attr.value;
		};
	});
	
};

function NeosPaginationEventHandler() {
	
};

function emptyOnPageChangeCallback() {
	console.log("emptyOnPageChangeCallback");
};

function NeosPagination($scope, element, attrs) {
	$scope.dataLoaded = false;
	
	function getRowPerPageCount(attrs) {
		var perPage = null;
		
		if (attrs.specificPage != undefined) {
			perPage = attrs.specificPage;
		} else if (attrs.modalPage != undefined) {
			perPage = _modalPageRowCount;
		} else {
			perPage = _pageRowCount;
		};
		return perPage;
	};
	
	function getOnPageChangeCallback($scope, attrs) {
		var callback = emptyOnPageChangeCallback;
		var objDeep = attrs.onPageChange.split(".");
		var objTop = $scope.$parent;
		
		for (var i = 0; i < objDeep.length; ++i) {
			objTop = objTop[objDeep[i]];	
		};
		if (objTop != undefined)
			callback = objTop;
		
		return callback;
	};
	
	function getPages($scope) {
		var pages = [];
		
		var overflowPage = ($scope.pageObj.totalCount % $scope.pageObj.perPage) == 0 ? 0 : 1;
		for(var i = 1; i <= ($scope.pageObj.totalCount / $scope.pageObj.perPage) + overflowPage; ++i) {
			pages.push(i);
        };
        
        if (pages.length == 0) {
        	pages.push(1);
        };
		return pages;
	};
	
	function getEmptyRows($scope) {
		var emptyRows = [];
		if ($scope.pageObj.perPage > $scope.pageObj.rowsCount) {
        	for(var i = 1; i <= $scope.pageObj.perPage - $scope.pageObj.rowsCount; ++i) {
        		emptyRows.push(i);
        	};
        };
        return emptyRows;
	};
	
	
	function run() {
		$scope.pageObj.perPage = getRowPerPageCount(attrs);
		$scope.pageObj.onPageChangeCallback = getOnPageChangeCallback($scope, attrs);
		$scope.pageObj.pages = getPages($scope);
		$scope.pageObj.emptyRows = getEmptyRows($scope);
	};
	
	$scope.$watch("pageObj.rowsCount", function(value) {
		run();
	});
	
	$scope.getPage = function(num) {
		if (num == $scope.pageObj.pages.length) {
			return num;
		} else if (num == 1) {
			return num;
		};
		if ($scope.pageObj.pages.length == 10) {
			if ($scope.pageObj.page <= 2 + LEFT_RIGHT_OFFSET) {
				if (num == $scope.pageObj.pages.length - 1) {
					return "...";
				} else {
					return num;
				};
				return num;
			} else if ($scope.pageObj.page > $scope.pageObj.pages.length - (2 + LEFT_RIGHT_OFFSET)) {
				if (num == 2) {
					return "...";
				} else {
					return num;
				};
			};
		} else if ($scope.pageObj.pages.length >= 11) {
			if ($scope.pageObj.page > 1 + LEFT_RIGHT_OFFSET && $scope.pageObj.page < $scope.pageObj.pages.length - LEFT_RIGHT_OFFSET) { 
				if (num <= $scope.pageObj.page + LEFT_RIGHT_OFFSET && num >= $scope.pageObj.page - LEFT_RIGHT_OFFSET ) {
					return num;
				}
				if (num == 2) {
					return "...";
				} else if (num == $scope.pageObj.pages.length - 1) {
					return "...";
				};
			};
			if ($scope.pageObj.page <= 1 + LEFT_RIGHT_OFFSET) {
				if (num == $scope.pageObj.pages.length - 1) {
					return "...";
				};
				if (num <= LEFT_RIGHT_OFFSET + $scope.pageObj.page)
					return num;
			};
			if ($scope.pageObj.page >= $scope.pageObj.pages.length - LEFT_RIGHT_OFFSET) {
				if (num == 2) {
					return "...";
				};
				if (num >= $scope.pageObj.page - LEFT_RIGHT_OFFSET)
					return num;
			};
		} else {
			return num;
		};
	};
	
	function changePageRules(newPage, currentPage, pages) {
		if (newPage != currentPage &&
			pages.indexOf(newPage) >= 0)
			return true;
		return false;
	};
	
	$scope.pageChange = function(_page, index) {
		var page = $scope.getPage(_page);
		if (index == 1 && page == '...') {
			page = $scope.pageObj.page - LEFT_RIGHT_OFFSET * 2;
		} else if (index != 2 && page == '...') {
			page = $scope.pageObj.page + LEFT_RIGHT_OFFSET * 2;
		};
		
		if (page < 1) {
			page = 1;
		} else if (page > $scope.pageObj.pages.length) {
			page = $scope.pageObj.pages.length;
		};
		
		if (changePageRules(page, $scope.pageObj.page, $scope.pageObj.pages)) {
			$scope.pageObj.page = page;
			$scope.pageObj.onPageChangeCallback();
		};
	};
};

function NeosPaginationManager() {
	var self = this;
	
	self.setTemplate = function(element) {
		element.innerHTML = processTemplate(NEOS_PAGINATION_TEMPLATE);
	};
	
	self.init = function() {
		$(_NEOS_PAGINATION_ELEMENT_NAME).each(function(index, neosPaginationElement) {
			self.setTemplate(neosPaginationElement);
			
			var options = new _NeosPaginationOptions();
			options.parseFromElement(neosPaginationElement);
			options.setManualEventHandling();
		});
	};
	
	$(function() {
		self.init();
	});
};

var data = window["_pagesExampleData"]
	pagesObj = {
		"page": 1
	}; 
	
new NeosPaginationManager();