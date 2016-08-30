class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :must_log_in

  # before_action :authenticate_user!

  def after_sign_in_path_for(resource)
    request.env['omniauth.origin'] || root_path
  end

  def must_log_in
    @user = current_user
    unless @user
      redirect_to root_path
    end
  end

end
