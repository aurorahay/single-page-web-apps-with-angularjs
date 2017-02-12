describe('menuservice.getitem', function () {

  var MenuService;
  var $httpBackend;
  var ApiPath;

  var mockResponse = {"short_name":"A1","name":"Won Ton Soup with Chicken"};
  var mockErrorResponse = {error: true, message: "No such menu number exists"};

  beforeEach(function () {
    module('common');

    inject(function (_$httpBackend_, _MenuService_, _ApiPath_) {
      MenuService = _MenuService_;
      $httpBackend =_$httpBackend_;
      ApiPath = _ApiPath_;
    });
  });

  it('should return a menu item', function() {
    var shortName = 'A1';
    $httpBackend.whenGET(ApiPath + '/menu_items/' + shortName + '.json').respond(mockResponse);
    MenuService.getMenuItem(shortName).then(function(response) {
      expect(response).toEqual({"short_name":"A1","name":"Won Ton Soup with Chicken"});
    });
    $httpBackend.flush();
  });

  it('should return an error if menu item does not exist', function() {
    var nonExistentItem = "does not exist";
    $httpBackend.whenGET(ApiPath + '/menu_items/'+ nonExistentItem + '.json').respond(500, mockErrorResponse);
    MenuService.getMenuItem(nonExistentItem).then(function(response) {
      expect(response).toEqual({error: true, message: "No such menu number exists"});
    });
    $httpBackend.flush();
  });

});
