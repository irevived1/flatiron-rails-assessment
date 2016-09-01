# Flatiron School Rails Assessment

## Take Notes!

 1. In this assessment, user will have to signin via facebook or make an account through Devise.

 2. Uses will be able to make notes, edit, and delete their personal notes.  No notes are public.

 3. Though no notes will be public, users will be able to see the most popular subjects or least popular subjects across all users.

 4. There will be three tables: users, notes, and subjects.  Notes belongs to both users and subjects.  Users will have many subjects and notes while subjects will only have many notes.

 5. Nested routes will be in the following form: URL/subjects/:id/notes/:id?

 6. The nested form for subject allows you to see all subjects that have been previously added by all users.  Users may add new subject or choose a previous subject.

 7. All users must login to access the functionalities.

## Requirements

1. Use the Ruby on Rails framework.

2. Your models must include a `has_many`, a `belongs_to`, and a `has_many :through` relationship. You can include more models to fill out your domain, but there must be at least a model acting as a join table for the has_many through.

3. The join model must also store an additional attribute describing the relationship. For example, in a blog domain with comments by users, you'd have a posts table and a users table, with the comments table containing the foreign key for the `post_id` and the `user_id` along with the comment's content. In a TODO list application with shareable lists, you'd have a lists table and users table and then a `user_lists` table giving users access to lists via columns `user_id` and `list_id`, but you'd want to add a permission column to `user_lists` that described how a user relates to the list, whether they could edit it or just view it or delete it, etc.

4. Your models should include reasonable validations for the simple attributes. You don't need to add every possible validation or duplicates, such as presence and a minimum length, but the models should defend against invalid data.

5. You must include at least one class level ActiveRecord scope methods. To some extent these class scopes can be added to power a specific individual feature, such as "My Overdue Tasks" in a TODO application, scoping all tasks for the user by a datetime scope for overdue items, `@user.tasks.overdue`. Reports make for a good usage of class scopes, such as "Most Valuable Cart by Customer" where the code would implement a `Cart.most_valuable` and `Cart.by_customer` which could be combined as `Cart.most_valuable.by_customer(@customer)`.

6. You must include a nested form that writes to an associated model through a custom attribute writer. An example of this would be a New Recipe form that allowed you to add ingredients that are unique across recipes (thereby requiring a join model, or imagine being able to see all recipes that include Chicken), along with a quantity or description of the ingredient in the recipe. On this form you would have a series of fields named `recipe[ingredient_attributes][0][name]` and `recipe[ingredient_attributes][0][description]` which would write to the recipe model through a method `ingredient_attributes=`. This method cannot be provided via the `accepts_nested_attributes_for` macro because the custom writer would be responsible for finding or creating a recipe by name and then creating the row in the join model `recipe_ingredients` with the `recipe_id`, the `ingredient_id`, and the description from the form.

7. Your application must provide a standard user authentication, including signup, login, logout, and passwords. You can use [Devise](https://github.com/plataformatec/devise) but given the complexity of that system, you should also feel free to roll your own authentication logic. 

8. Your authentication system should allow login from some other service. Facebook, twitter, foursquare, github, etc...

9. You must make use of a nested resource with the appropriate RESTful URLs. Additionally, your nested resource must provide a form that relates to the parent resource. Imagine an application with user profiles. You might represent a person's profile via the RESTful URL of /profiles/1, where 1 is the primary key of the profile. If the person wanted to add pictures to their profile, you could represent that as a nested resource of /profiles/1/pictures, listing all pictures belonging to profile 1. The route `/profiles/1/pictures/new` would allow to me upload a new picture to profile 1.

10. Your forms should correctly display validation errors. Your fields should be enclosed within a fields_with_errors class and error messages describing the validation failures must be present within the view.

11. Your application must be, within reason, a DRY (Do-Not-Repeat-Yourself) rails app. Logic present in your controllers should be encapsulated as methods in your models. Your views should use helper methods and partials to be as logic-less as possible. Follow patterns in the [Rails Style Guide](https://github.com/bbatsov/rails-style-guide) and the [Ruby Style Guide](https://github.com/bbatsov/ruby-style-guide).




