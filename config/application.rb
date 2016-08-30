require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module FlatironRailsAssessment
  class Application < Rails::Application
    config.to_prepare do
      Devise::SessionsController.skip_before_action :must_log_in
      Devise::RegistrationsController.skip_before_action :must_log_in
      Devise::OmniauthCallbacksController.skip_before_action :must_log_in
    end
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end
