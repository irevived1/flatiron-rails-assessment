class StaticController < ApplicationController
  skip_before_action :must_log_in, only: [:index]
  # skip_before_action :authenticate_user!
  def index
  end
end
