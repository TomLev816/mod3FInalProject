class Api::V1::ItemsController < ApplicationController

  def index
    @items = Item.all
    render(json:@items, status: :ok)
  end

  def show
    find_item
    render(json: @item, status: :ok)

  end

  # def new
  #
  # end

  def create
    @item = Item.create(item_params)
    render(json: @item, status: :ok)
  end

  # def edit
  #
  # end

  def update

  end

  def destroy

  end

  private

  def find_item
    @item = Item.find_by(id: params[:id])
  end

  def item_params
    params.require(:item).permit(:name, :ability, :level_id)
  end
end
