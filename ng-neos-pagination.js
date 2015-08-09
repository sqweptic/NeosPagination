/**
 * 
 */

var _moduleNeosPagination = angular.module("neosPagination", []);

function getNgNeosPaginationTemplate() {
	var parentContainer = $("<div>"),
		baseContainer = $("<div>", {"class": "pagination-container row"});
		baseContainerPagesRow = $("<div>", {"class": "pagination-row pagination-row-pages"});
		baseContainerPageEnterRow = $("<div>", {"class": "pagination-row pagination-row-page-enter"});
		
	baseContainer.appendTo(parentContainer);
	baseContainerPagesRow.appendTo(baseContainer);
	baseContainerPageEnterRow.appendTo(baseContainer);
	
	var pagesNav = $("<nav>"),
		pagesContainer = $("<ul>", {"class": "pagination"}),
		leftArrow = $("<li ng-class=\"{'disabled': pageObj.previous == null}\"> <a href=\"javascript:void(0);\" ng-click=\"pageChange(pageObj.page - 1, $index)\" aria-label=\"Предыдущая\"> <span aria-hidden=\"true\">&laquo;</span></a></li>"),
		pages = $("<li ng-repeat=\"pageNum in pageObj.pages\" ng-class=\"{'active': pageNum == pageObj.page}\" ng-if=\"getPage(pageNum)\"><a href=\"javascript:void(0);\" ng-click=\"pageChange(pageNum, $index)\">{{ getPage(pageNum) }}</a></li>");
		rightArrow = $("<li ng-class=\"{'disabled': pageObj.next == null}\"><a href=\"javascript:void(0);\" ng-click=\"pageChange(pageObj.page + 1, $index)\" aria-label=\"Следующая\"><span aria-hidden=\"true\">&raquo;</span></a></li>");
		
	
	pagesNav.appendTo(baseContainerPagesRow);
	pagesContainer.appendTo(pagesNav);
	leftArrow.appendTo(pagesContainer);
	pages.appendTo(pagesContainer);
	rightArrow.appendTo(pagesContainer);
	
	return parentContainer.html();
};

function neosPaginationLink($scope, elem, attr) {
	
};

_moduleNeosPagination.directive("ngNeosPagination", function() {
	return {
		"restrict": "E",
		"scope": {
			"pageObj": "=",
		},
		"link": neosPaginationLink,
		"template": getNgNeosPaginationTemplate()
	}
});

var neosPaginationExampleApp = angular.module("neosPaginationExampleApp", ["neosPagination"])

neosPaginationExampleApp.controller("neosPaginationExampleController", function($scope) {
	$scope.data = window["_pagesExampleData"];
	
	$scope.pagesData = {
		"page": 1
	};
});